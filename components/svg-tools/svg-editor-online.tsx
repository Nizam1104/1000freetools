"use client"

import * as React from "react"
import { useState, useCallback, useRef } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, Upload, Download, ZoomIn, ZoomOut } from "lucide-react"
import { cn } from "@/lib/utils"

const defaultSvg = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="80" fill="#4F46E5" />
  <text x="100" y="110" text-anchor="middle" fill="white" font-size="24">SVG</text>
</svg>`

export function SvgEditorOnline() {
  const [svgCode, setSvgCode] = useState<string>(defaultSvg)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [zoom, setZoom] = useState<number>(100)
  const [showGrid, setShowGrid] = useState<boolean>(true)
  const svgRef = useRef<HTMLDivElement>(null)

  const handleSvgChange = useCallback((value: string) => {
    setSvgCode(value)
    setError(null)
  }, [])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const handleClear = useCallback(() => {
    setSvgCode(defaultSvg)
    setError(null)
  }, [])

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 10, 200))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 10, 50))
  }, [])

  const handleDownload = useCallback(() => {
    const blob = new Blob([svgCode], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "edited.svg"
    a.click()
    URL.revokeObjectURL(url)
  }, [svgCode])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">SVG Code</Label>
          <Textarea
            id="input"
            value={svgCode}
            onChange={(e) => handleSvgChange(e.target.value)}
            placeholder="Enter or paste SVG code here..."
            className="min-h-[500px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleClear} title="Reset to default">
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => copyToClipboard(svgCode, "svg")} className="flex-1">
              {copied === "svg" ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied === "svg" ? "Copied" : "Copy SVG"}
            </Button>
            <Button variant="outline" onClick={handleDownload} title="Download SVG">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Preview</Label>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground w-12 text-center">{zoom}%</span>
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant={showGrid ? "default" : "outline"}
                size="sm"
                onClick={() => setShowGrid(!showGrid)}
              >
                Grid
              </Button>
            </div>
          </div>
          <div
            ref={svgRef}
            className={cn(
              "min-h-[500px] border rounded-lg flex items-center justify-center overflow-auto",
              showGrid && "bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]"
            )}
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top left" }}
            dangerouslySetInnerHTML={{ __html: svgCode }}
          />
        </div>
      </div>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">SVG Editor Tips</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Edit SVG code in the left panel and see changes in real-time</li>
          <li>Use the zoom controls to adjust the preview size</li>
          <li>Toggle the grid to help with alignment</li>
          <li>Download your edited SVG or copy the code</li>
        </ul>
      </div>
    </div>
  )
}
