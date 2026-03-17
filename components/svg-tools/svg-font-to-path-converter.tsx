"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, Upload, Download } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SvgFontToPathConverter() {
  const [svgCode, setSvgCode] = useState<string>("")
  const [convertedSvg, setConvertedSvg] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isConverting, setIsConverting] = useState<boolean>(false)
  const [options, setOptions] = useState({
    removeText: false,
    addComments: true,
    preserveId: true
  })

  const convertTextToPaths = useCallback((svg: string, opts: typeof options): string => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(svg, "image/svg+xml")
    const parseError = doc.querySelector("parsererror")

    if (parseError) {
      throw new Error("Invalid SVG: " + parseError.textContent)
    }

    const svgElement = doc.documentElement
    const textElements = svgElement.querySelectorAll("text, tspan")

    if (textElements.length === 0) {
      throw new Error("No text elements found in SVG")
    }

    // Create a document fragment for new paths
    const convertedElements: string[] = []

    textElements.forEach((textEl) => {
      const text = textEl.textContent || ""
      const x = textEl.getAttribute("x") || "0"
      const y = textEl.getAttribute("y") || "0"
      const fontSize = textEl.getAttribute("font-size") || "16"
      const fontFamily = textEl.getAttribute("font-family") || "Arial"
      const fontWeight = textEl.getAttribute("font-weight") || "normal"
      const fontStyle = textEl.getAttribute("font-style") || "normal"
      const fill = textEl.getAttribute("fill") || "black"
      const id = textEl.getAttribute("id")

      // Create a comment describing the original text
      if (opts.addComments) {
        convertedElements.push(`  <!-- Original text: "${text}" at (${x}, ${y}) -->`)
      }

      // Create a placeholder path (in real implementation, this would use font data)
      // For now, we create a simplified representation
      const pathData = createTextPathPlaceholder(text, parseFloat(x), parseFloat(y), parseFloat(fontSize))

      const pathId = opts.preserveId && id ? id : `path-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      convertedElements.push(`  <path
    id="${pathId}"
    d="${pathData}"
    fill="${fill}"
    data-original-text="${text.replace(/"/g, "&quot;")}"
    data-font-family="${fontFamily}"
    data-font-size="${fontSize}"
    data-font-weight="${fontWeight}"
    data-font-style="${fontStyle}"
  />`)

      if (opts.removeText) {
        textEl.remove()
      } else {
        textEl.setAttribute("opacity", "0")
        textEl.setAttribute("aria-hidden", "true")
      }
    })

    // Serialize the modified SVG
    const serializer = new XMLSerializer()
    let result = serializer.serializeToString(svgElement)

    // Insert converted paths before closing SVG tag
    const closingTagIndex = result.lastIndexOf("</svg>")
    if (closingTagIndex !== -1) {
      const paths = convertedElements.join("\n")
      result = result.slice(0, closingTagIndex) + "\n" + paths + "\n" + result.slice(closingTagIndex)
    }

    return result
  }, [])

  // Create a simplified path representation for text
  // In a real implementation, this would use actual font glyph data
  const createTextPathPlaceholder = (text: string, x: number, y: number, fontSize: number): string => {
    // This is a simplified placeholder - real implementation needs font parsing
    const charWidth = fontSize * 0.6
    let path = ""

    for (let i = 0; i < text.length; i++) {
      const charX = x + (i * charWidth)
      // Create a simple rectangle as placeholder for each character
      path += `M ${charX} ${y - fontSize} `
      path += `L ${charX + charWidth * 0.8} ${y - fontSize} `
      path += `L ${charX + charWidth * 0.8} ${y} `
      path += `L ${charX} ${y} Z `
    }

    return path.trim()
  }

  const handleConvert = useCallback(async () => {
    if (!svgCode.trim()) {
      setError("Please enter SVG code to convert")
      return
    }

    setIsConverting(true)
    setError(null)

    try {
      const result = convertTextToPaths(svgCode, options)
      setConvertedSvg(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      setConvertedSvg(null)
    } finally {
      setIsConverting(false)
    }
  }, [svgCode, options, convertTextToPaths])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const handleClear = useCallback(() => {
    setSvgCode("")
    setConvertedSvg(null)
    setError(null)
  }, [])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setSvgCode(result)
        setError(null)
      }
      reader.readAsText(file)
    }
  }, [])

  const handleDownload = useCallback(() => {
    if (convertedSvg) {
      const blob = new Blob([convertedSvg], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "font-to-path.svg"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [convertedSvg])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">SVG Font to Path Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert text elements in SVG to paths for consistent rendering across devices
        </p>
      </div>

      {/* Options */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Conversion Options</Label>
        <div className="grid gap-3">
          <Label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={options.removeText}
              onChange={(e) => setOptions({ ...options, removeText: e.target.checked })}
              className="rounded border-border"
            />
            Remove original text elements (instead of hiding)
          </Label>
          <Label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={options.addComments}
              onChange={(e) => setOptions({ ...options, addComments: e.target.checked })}
              className="rounded border-border"
            />
            Add comments with original text content
          </Label>
          <Label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={options.preserveId}
              onChange={(e) => setOptions({ ...options, preserveId: e.target.checked })}
              className="rounded border-border"
            />
            Preserve original element IDs
          </Label>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="svg-input" className="text-base font-medium">
            SVG with Text
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => document.getElementById("svg-upload")?.click()}
            >
              <Upload className="size-3.5 mr-2" />
              Upload
            </Button>
            <input
              id="svg-upload"
              type="file"
              accept=".svg"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(svgCode, "input")}
              className="h-7"
              disabled={!svgCode}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={handleClear}
              className="h-7"
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Textarea
          id="svg-input"
          value={svgCode}
          onChange={(e) => setSvgCode(e.target.value)}
          className={cn(
            "font-mono text-sm min-h-[200px]",
            error ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder="Paste SVG code containing text elements..."
        />

        {error && (
          <p className="text-sm text-destructive flex items-center gap-2">
            {error}
          </p>
        )}
      </section>

      <Button onClick={handleConvert} className="w-full" disabled={isConverting}>
        {isConverting ? "Converting..." : "Convert Text to Paths"}
      </Button>

      {/* Output Section */}
      {convertedSvg && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Converted SVG</Label>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(convertedSvg, "output")}
                className="h-7"
              >
                {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
              <Button
                variant="ghost"
                size="xs"
                onClick={handleDownload}
                className="h-7"
              >
                <Download className="size-3.5" />
                <span className="text-xs">Download</span>
              </Button>
            </div>
          </div>

          <Textarea
            value={convertedSvg}
            readOnly
            className="font-mono text-sm min-h-[300px] bg-muted/50"
          />
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Font to Path Conversion</h4>
            <p className="text-sm text-muted-foreground">
              Converting text to paths ensures your SVG renders consistently across all devices,
              even if the original font is not installed. This is essential for logos, icons,
              and graphics that must maintain exact appearance.
            </p>
            <p className="text-sm text-muted-foreground">
              Note: This tool creates placeholder paths. For production use with accurate glyph
              outlines, use professional tools like Adobe Illustrator, Inkscape, or libraries
              like opentype.js for proper font parsing.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
