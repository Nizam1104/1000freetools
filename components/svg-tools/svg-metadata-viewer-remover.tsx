"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, Upload, FileText, Image } from "lucide-react"
import { cn } from "@/lib/utils"

interface SvgMetadata {
  width?: string
  height?: string
  viewBox?: string
  xmlns?: string
  version?: string
  id?: string
  title?: string
  desc?: string
  elements: Record<string, number>
  hasDefs: boolean
  hasGradients: boolean
  hasFilters: boolean
  hasAnimations: boolean
  hasScripts: boolean
  hasExternalRefs: boolean
  fileSize: number
}

export default function SvgMetadataViewerRemover() {
  const [svgCode, setSvgCode] = useState<string>("")
  const [metadata, setMetadata] = useState<SvgMetadata | null>(null)
  const [cleanedSvg, setCleanedSvg] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"view" | "clean">("view")
  const [cleanOptions, setCleanOptions] = useState({
    removeTitle: false,
    removeDesc: false,
    removeComments: true,
    removeUnusedDefs: false,
    removeIds: false,
    minify: false
  })

  const analyzeSvg = useCallback((svg: string): SvgMetadata => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(svg, "image/svg+xml")
    const svgElement = doc.documentElement

    const elements: Record<string, number> = {}
    const allElements = svgElement.querySelectorAll("*")
    allElements.forEach(el => {
      const tagName = el.tagName.toLowerCase()
      elements[tagName] = (elements[tagName] || 0) + 1
    })

    const titleElement = svgElement.querySelector("title")
    const descElement = svgElement.querySelector("desc")
    const defsElement = svgElement.querySelector("defs")
    const gradientElements = svgElement.querySelectorAll("linearGradient, radialGradient, stop")
    const filterElements = svgElement.querySelectorAll("filter, feGaussianBlur, feDropShadow")
    const animationElements = svgElement.querySelectorAll("animate, animateTransform, animateMotion")
    const scriptElements = svgElement.querySelectorAll("script")

    // Check for external references
    const externalRefs = svg.match(/url\(['"]?(?!data:|#[^)]*)['"]?[^)]*\)/g) || []

    return {
      width: svgElement.getAttribute("width") || undefined,
      height: svgElement.getAttribute("height") || undefined,
      viewBox: svgElement.getAttribute("viewBox") || undefined,
      xmlns: svgElement.getAttribute("xmlns") || undefined,
      version: svgElement.getAttribute("version") || undefined,
      id: svgElement.getAttribute("id") || undefined,
      title: titleElement?.textContent || undefined,
      desc: descElement?.textContent || undefined,
      elements,
      hasDefs: !!defsElement,
      hasGradients: gradientElements.length > 0,
      hasFilters: filterElements.length > 0,
      hasAnimations: animationElements.length > 0,
      hasScripts: scriptElements.length > 0,
      hasExternalRefs: externalRefs.length > 0,
      fileSize: new Blob([svg]).size
    }
  }, [])

  const cleanSvg = useCallback((svg: string, options: typeof cleanOptions): string => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(svg, "image/svg+xml")
    const svgElement = doc.documentElement

    if (options.removeTitle) {
      svgElement.querySelector("title")?.remove()
    }

    if (options.removeDesc) {
      svgElement.querySelector("desc")?.remove()
    }

    if (options.removeComments) {
      // Remove XML comments (regex approach for comments in string)
      svg = svg.replace(/<!--[\s\S]*?-->/g, "")
    }

    if (options.removeIds) {
      const allElements = svgElement.querySelectorAll("*")
      allElements.forEach(el => el.removeAttribute("id"))
    }

    if (options.removeUnusedDefs) {
      const defs = svgElement.querySelector("defs")
      if (defs) {
        // Simplified: remove defs if empty after other cleaning
        if (!defs.innerHTML.trim()) {
          defs.remove()
        }
      }
    }

    const serializer = new XMLSerializer()
    let result = serializer.serializeToString(svgElement)

    if (options.minify) {
      result = result
        .replace(/\s+/g, " ")
        .replace(/>\s+</g, "><")
        .trim()
    }

    return result
  }, [])

  const handleAnalyze = useCallback(() => {
    if (!svgCode.trim()) {
      setError("Please enter SVG code to analyze")
      return
    }

    setError(null)
    try {
      const meta = analyzeSvg(svgCode)
      setMetadata(meta)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze SVG")
      setMetadata(null)
    }
  }, [svgCode, analyzeSvg])

  const handleClean = useCallback(() => {
    if (!svgCode.trim()) {
      setError("Please enter SVG code to clean")
      return
    }

    setError(null)
    try {
      const cleaned = cleanSvg(svgCode, cleanOptions)
      setCleanedSvg(cleaned)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to clean SVG")
      setCleanedSvg(null)
    }
  }, [svgCode, cleanOptions, cleanSvg])

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
    setMetadata(null)
    setCleanedSvg(null)
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

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">SVG Metadata Viewer & Remover</h2>
        <p className="text-sm text-muted-foreground">
          View, analyze, and clean metadata from SVG files
        </p>
      </div>

      {/* Tab Selection */}
      <section className="space-y-3">
        <div className="flex gap-2">
          <Button
            variant={activeTab === "view" ? "default" : "outline"}
            onClick={() => setActiveTab("view")}
            className="flex-1"
          >
            <FileText className="size-4 mr-2" />
            View Metadata
          </Button>
          <Button
            variant={activeTab === "clean" ? "default" : "outline"}
            onClick={() => setActiveTab("clean")}
            className="flex-1"
          >
            <Image className="size-4 mr-2" />
            Clean SVG
          </Button>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="svg-input" className="text-base font-medium">
            SVG Code
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
            "font-mono text-sm min-h-[150px]",
            error ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder="Paste SVG code or upload an SVG file..."
        />

        {error && (
          <p className="text-sm text-destructive flex items-center gap-2">
            {error}
          </p>
        )}
      </section>

      {/* View Metadata Tab */}
      {activeTab === "view" && (
        <Button onClick={handleAnalyze} className="w-full">
          Analyze SVG
        </Button>
      )}

      {/* Clean Tab */}
      {activeTab === "clean" && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Cleaning Options</Label>
          <div className="grid gap-2">
            <Label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={cleanOptions.removeTitle}
                onChange={(e) => setCleanOptions({ ...cleanOptions, removeTitle: e.target.checked })}
                className="rounded border-border"
              />
              Remove &lt;title&gt; element
            </Label>
            <Label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={cleanOptions.removeDesc}
                onChange={(e) => setCleanOptions({ ...cleanOptions, removeDesc: e.target.checked })}
                className="rounded border-border"
              />
              Remove &lt;desc&gt; element
            </Label>
            <Label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={cleanOptions.removeComments}
                onChange={(e) => setCleanOptions({ ...cleanOptions, removeComments: e.target.checked })}
                className="rounded border-border"
              />
              Remove XML comments
            </Label>
            <Label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={cleanOptions.removeIds}
                onChange={(e) => setCleanOptions({ ...cleanOptions, removeIds: e.target.checked })}
                className="rounded border-border"
              />
              Remove all IDs
            </Label>
            <Label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={cleanOptions.minify}
                onChange={(e) => setCleanOptions({ ...cleanOptions, minify: e.target.checked })}
                className="rounded border-border"
              />
              Minify output
            </Label>
          </div>

          <Button onClick={handleClean} className="w-full">
            Clean SVG
          </Button>
        </section>
      )}

      {/* Results */}
      {metadata && activeTab === "view" && (
        <section className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h4 className="text-sm font-medium mb-3">Basic Information</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {metadata.width && (
                <div>
                  <span className="text-muted-foreground">Width:</span>
                  <span className="ml-2 font-mono">{metadata.width}</span>
                </div>
              )}
              {metadata.height && (
                <div>
                  <span className="text-muted-foreground">Height:</span>
                  <span className="ml-2 font-mono">{metadata.height}</span>
                </div>
              )}
              {metadata.viewBox && (
                <div className="col-span-2">
                  <span className="text-muted-foreground">ViewBox:</span>
                  <span className="ml-2 font-mono">{metadata.viewBox}</span>
                </div>
              )}
              {metadata.title && (
                <div className="col-span-2">
                  <span className="text-muted-foreground">Title:</span>
                  <span className="ml-2">{metadata.title}</span>
                </div>
              )}
              {metadata.desc && (
                <div className="col-span-2">
                  <span className="text-muted-foreground">Description:</span>
                  <span className="ml-2">{metadata.desc}</span>
                </div>
              )}
              <div>
                <span className="text-muted-foreground">File Size:</span>
                <span className="ml-2 font-mono">{metadata.fileSize} bytes</span>
              </div>
              <div>
                <span className="text-muted-foreground">Total Elements:</span>
                <span className="ml-2 font-mono">{Object.values(metadata.elements).reduce((a, b) => a + b, 0)}</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h4 className="text-sm font-medium mb-3">Features</h4>
            <div className="flex flex-wrap gap-2">
              <span className={cn("px-2 py-1 rounded text-xs", metadata.hasDefs ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700")}>
                Defs: {metadata.hasDefs ? "Yes" : "No"}
              </span>
              <span className={cn("px-2 py-1 rounded text-xs", metadata.hasGradients ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700")}>
                Gradients: {metadata.hasGradients ? "Yes" : "No"}
              </span>
              <span className={cn("px-2 py-1 rounded text-xs", metadata.hasFilters ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700")}>
                Filters: {metadata.hasFilters ? "Yes" : "No"}
              </span>
              <span className={cn("px-2 py-1 rounded text-xs", metadata.hasAnimations ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700")}>
                Animations: {metadata.hasAnimations ? "Yes" : "No"}
              </span>
              <span className={cn("px-2 py-1 rounded text-xs", metadata.hasScripts ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700")}>
                Scripts: {metadata.hasScripts ? "Yes" : "No"}
              </span>
              <span className={cn("px-2 py-1 rounded text-xs", metadata.hasExternalRefs ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-700")}>
                External Refs: {metadata.hasExternalRefs ? "Yes" : "No"}
              </span>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h4 className="text-sm font-medium mb-3">Element Count</h4>
            <div className="grid grid-cols-3 gap-2 text-sm">
              {Object.entries(metadata.elements)
                .sort((a, b) => b[1] - a[1])
                .map(([name, count]) => (
                  <div key={name} className="flex justify-between">
                    <span className="font-mono">{name}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Cleaned SVG Output */}
      {cleanedSvg && activeTab === "clean" && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Cleaned SVG</Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(cleanedSvg, "cleaned")}
              className="h-7"
            >
              {copied === "cleaned" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>

          <Textarea
            value={cleanedSvg}
            readOnly
            className="font-mono text-sm min-h-[200px] bg-muted/50"
          />

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Original: <span className="font-medium text-foreground">{svgCode.length}</span> chars</span>
            <span>Cleaned: <span className="font-medium text-foreground">{cleanedSvg.length}</span> chars</span>
            <span>Reduced: <span className="font-medium text-green-600">{Math.round((1 - cleanedSvg.length / svgCode.length) * 100)}%</span></span>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About SVG Metadata</h4>
            <p className="text-sm text-muted-foreground">
              SVG files can contain metadata like titles, descriptions, IDs, and comments that
              increase file size. Cleaning removes unnecessary elements for optimization.
            </p>
            <p className="text-sm text-muted-foreground">
              Be cautious when removing IDs as they may be referenced by gradients, filters,
              or animations. Scripts and external references can pose security risks.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
