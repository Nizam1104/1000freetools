"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy, Check, Trash2, Download } from "lucide-react"

type WatermarkMode = "header_footer" | "prefix_lines" | "surround"

function applyWatermark(text: string, watermark: string, mode: WatermarkMode, linePrefix = "") {
  const wm = watermark.trim()
  if (!text.trim()) return ""
  if (!wm) return text

  if (mode === "header_footer") {
    const bar = `${linePrefix}${wm}`
    return `${bar}\n\n${text}\n\n${bar}`
  }

  if (mode === "prefix_lines") {
    const prefix = `${linePrefix}${wm} `
    return text
      .split(/\r?\n/)
      .map((line) => (line.trim().length ? `${prefix}${line}` : line))
      .join("\n")
  }

  // surround
  return `${linePrefix}${wm}\n${text}\n${linePrefix}${wm}`
}

export function TextWatermarkAdder() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")
  const [watermark, setWatermark] = useState("CONFIDENTIAL")
  const [mode, setMode] = useState<WatermarkMode>("header_footer")
  const [linePrefix, setLinePrefix] = useState("")

  const handleConvert = useCallback(() => {
    try {
      setError("")
      setOutput(applyWatermark(input, watermark, mode, linePrefix))
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion error")
      setOutput("")
    }
  }, [input, watermark, mode, linePrefix])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setInput("")
    setOutput("")
    setError("")
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "output.txt"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Text Watermark Adder</h2>
            <p className="text-sm text-muted-foreground">
              Add watermarks to text documents
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">Input</Label>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="watermark" className="text-xs text-muted-foreground">
                Watermark text
              </Label>
              <Input
                id="watermark"
                value={watermark}
                onChange={(e) => setWatermark(e.target.value)}
                placeholder="CONFIDENTIAL"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mode" className="text-xs text-muted-foreground">
                Mode
              </Label>
              <select
                id="mode"
                value={mode}
                onChange={(e) => setMode(e.target.value as WatermarkMode)}
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="header_footer">Header + footer</option>
                <option value="prefix_lines">Prefix each non-empty line</option>
                <option value="surround">Surround block</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="linePrefix" className="text-xs text-muted-foreground">
                Optional prefix (e.g. “# ”)
              </Label>
              <Input
                id="linePrefix"
                value={linePrefix}
                onChange={(e) => setLinePrefix(e.target.value)}
                placeholder=""
              />
            </div>
          </div>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your data here..."
            className="min-h-[400px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleConvert} className="flex-1" disabled={!input}>
              Convert
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Output</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Output will appear here..."
            className="min-h-[400px] font-mono text-sm bg-muted"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleCopy} disabled={!output} className="flex-1">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button variant="outline" onClick={handleDownload} disabled={!output} title="Download">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">How to use</h3>
        <p className="text-sm text-muted-foreground">
          Enter your data in the input field, click Convert, and the result will appear in the output field.
          You can then copy or download the result.
        </p>
      </div>
    </div>
  )
}
