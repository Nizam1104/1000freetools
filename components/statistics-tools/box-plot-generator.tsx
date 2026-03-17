"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, Download } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BoxPlotGenerator() {
  const [data, setData] = useState<string>("12, 15, 18, 20, 22, 25, 28, 30, 32, 35, 38, 40, 42, 45, 50, 55, 60, 65, 70, 80")
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal")
  const [showOutliers, setShowOutliers] = useState<boolean>(true)
  const [svgCode, setSvgCode] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calculateBoxPlot = useCallback((values: number[]) => {
    const sorted = [...values].sort((a, b) => a - b)
    const n = sorted.length

    // Minimum (excluding outliers)
    const q1Index = Math.floor(n * 0.25)
    const q3Index = Math.floor(n * 0.75)

    const q1 = sorted[q1Index]
    const median = n % 2 === 0
      ? (sorted[n/2 - 1] + sorted[n/2]) / 2
      : sorted[Math.floor(n/2)]
    const q3 = sorted[q3Index]

    // IQR and fences
    const iqr = q3 - q1
    const lowerFence = q1 - 1.5 * iqr
    const upperFence = q3 + 1.5 * iqr

    // Whisker ends
    const min = sorted.find(v => v >= lowerFence) || sorted[0]
    const max = sorted.findLast(v => v <= upperFence) || sorted[n-1]

    // Outliers
    const outliers = sorted.filter(v => v < lowerFence || v > upperFence)

    return { min, q1, median, q3, max, iqr, lowerFence, upperFence, outliers, sorted }
  }, [])

  const generateBoxPlot = useCallback(() => {
    try {
      const values = data
        .split(/[\s,\n]+/)
        .map(s => parseFloat(s.trim()))
        .filter(n => !isNaN(n))

      if (values.length < 4) {
        throw new Error("Please enter at least 4 data points")
      }

      const stats = calculateBoxPlot(values)

      // Generate SVG
      const width = orientation === "horizontal" ? 600 : 200
      const height = orientation === "horizontal" ? 150 : 400
      const padding = 40

      const range = stats.max - stats.min || 1
      const scale = (orientation === "horizontal" ? width - 2 * padding : height - 2 * padding) / range

      const pos = (v: number) => {
        const scaled = (v - stats.min) * scale
        return orientation === "horizontal"
          ? padding + scaled
          : height - padding - scaled
      }

      const boxStart = pos(stats.q1)
      const boxEnd = pos(stats.q3)
      const boxSize = boxEnd - boxStart
      const medianPos = pos(stats.median)
      const whiskerMin = pos(stats.min)
      const whiskerMax = pos(stats.max)

      let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <!-- Whiskers -->
  <line x1="${orientation === "horizontal" ? whiskerMin : width/2}" y1="${orientation === "horizontal" ? height/2 : whiskerMin}"
        x2="${orientation === "horizontal" ? whiskerMax : width/2}" y2="${orientation === "horizontal" ? height/2 : whiskerMax}"
        stroke="#374151" stroke-width="2" />

  <!-- Whisker caps -->
  <line x1="${orientation === "horizontal" ? whiskerMin : width/2 - 15}" y1="${orientation === "horizontal" ? height/2 : whiskerMin}"
        x2="${orientation === "horizontal" ? whiskerMin : width/2 + 15}" y2="${orientation === "horizontal" ? height/2 : whiskerMin}"
        stroke="#374151" stroke-width="2" />
  <line x1="${orientation === "horizontal" ? whiskerMax : width/2 - 15}" y1="${orientation === "horizontal" ? height/2 : whiskerMax}"
        x2="${orientation === "horizontal" ? whiskerMax : width/2 + 15}" y2="${orientation === "horizontal" ? height/2 : whiskerMax}"
        stroke="#374151" stroke-width="2" />

  <!-- Box -->
  <rect x="${orientation === "horizontal" ? boxStart : width/2 - 30}" y="${orientation === "horizontal" ? height/2 - 25 : boxStart}"
        width="${orientation === "horizontal" ? boxSize : 60}" height="${orientation === "horizontal" ? 50 : boxSize}"
        fill="#E0E7FF" stroke="#4F46E5" stroke-width="2" />

  <!-- Median line -->
  <line x1="${orientation === "horizontal" ? medianPos : width/2 - 30}" y1="${orientation === "horizontal" ? height/2 - 25 : medianPos}"
        x2="${orientation === "horizontal" ? medianPos : width/2 + 30}" y2="${orientation === "horizontal" ? height/2 + 25 : medianPos}"
        stroke="#4F46E5" stroke-width="3" />

  <!-- Mean marker -->
  <circle cx="${orientation === "horizontal" ? pos(values.reduce((a,b) => a+b, 0) / values.length) : width/2}"
          cy="${orientation === "horizontal" ? height/2 : pos(values.reduce((a,b) => a+b, 0) / values.length)}"
          r="5" fill="#DC2626" />

  ${showOutliers && stats.outliers.length > 0 ? stats.outliers.map(o => `
  <!-- Outlier at ${o} -->
  <circle cx="${orientation === "horizontal" ? pos(o) : width/2}"
          cy="${orientation === "horizontal" ? height/2 : pos(o)}"
          r="4" fill="#DC2626" stroke="#991B1B" />`).join("\n  ") : ""}

  <!-- Labels -->
  <text x="${padding}" y="${height - 10}" font-size="10" fill="#6B7280">${stats.min.toFixed(1)}</text>
  <text x="${width - padding}" y="${height - 10}" font-size="10" fill="#6B7280" text-anchor="end">${stats.max.toFixed(1)}</text>
</svg>`

      setSvgCode(svg)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed")
      setSvgCode("")
    }
  }, [data, orientation, showOutliers, calculateBoxPlot])

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
    setData("12, 15, 18, 20, 22, 25, 28, 30, 32, 35, 38, 40, 42, 45, 50, 55, 60, 65, 70, 80")
    setSvgCode("")
    setError(null)
  }, [])

  const handleDownload = useCallback(() => {
    if (svgCode) {
      const blob = new Blob([svgCode], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "boxplot.svg"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [svgCode])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Box Plot Generator</h2>
        <p className="text-sm text-muted-foreground">
          Create box and whisker plots to visualize data distribution
        </p>
      </div>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="data" className="text-base font-medium">
            Data Values
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(data, "input")}
              className="h-7"
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
          id="data"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="font-mono text-sm min-h-[100px]"
          placeholder="Enter numbers separated by commas or spaces..."
        />
      </section>

      {/* Options */}
      <section className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Label className="text-sm">Orientation:</Label>
          <Button
            variant={orientation === "horizontal" ? "default" : "outline"}
            size="sm"
            onClick={() => setOrientation("horizontal")}
          >
            Horizontal
          </Button>
          <Button
            variant={orientation === "vertical" ? "default" : "outline"}
            size="sm"
            onClick={() => setOrientation("vertical")}
          >
            Vertical
          </Button>
        </div>

        <Label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={showOutliers}
            onChange={(e) => setShowOutliers(e.target.checked)}
            className="rounded border-border"
          />
          Show Outliers
        </Label>
      </section>

      <Button onClick={generateBoxPlot} className="w-full">
        Generate Box Plot
      </Button>

      {/* Preview */}
      {svgCode && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Box Plot Preview</Label>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(svgCode, "svg")}
                className="h-7"
              >
                {copied === "svg" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy SVG</span>
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

          <div className="rounded-lg border bg-white p-4 flex items-center justify-center">
            <div dangerouslySetInnerHTML={{ __html: svgCode }} />
          </div>

          <Textarea
            value={svgCode}
            readOnly
            className="font-mono text-xs min-h-[150px] bg-muted/50"
          />
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Box Plots</h4>
            <p className="text-sm text-muted-foreground">
              A box plot (box and whisker plot) displays the five-number summary: minimum,
              first quartile (Q1), median, third quartile (Q3), and maximum. The box shows
              the interquartile range (IQR = Q3 - Q1), containing the middle 50% of data.
            </p>
            <p className="text-sm text-muted-foreground">
              Whiskers extend to the furthest points within 1.5 × IQR from the quartiles.
              Points beyond this range are shown as outliers (red dots).
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
