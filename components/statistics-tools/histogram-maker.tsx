"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy, Check, Trash2, Info, Download } from "lucide-react"
import { cn } from "@/lib/utils"

export default function HistogramMaker() {
  const [data, setData] = useState<string>("23, 25, 28, 30, 32, 35, 38, 40, 42, 45, 48, 50, 52, 55, 58, 60, 62, 65, 68, 70, 72, 75, 78, 80, 82, 85, 88, 90")
  const [binCount, setBinCount] = useState<number>(8)
  const [barColor, setBarColor] = useState<string>("#4F46E5")
  const [showLabels, setShowLabels] = useState<boolean>(true)
  const [svgCode, setSvgCode] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generateHistogram = useCallback(() => {
    try {
      const values = data
        .split(/[\s,\n]+/)
        .map(s => parseFloat(s.trim()))
        .filter(n => !isNaN(n))

      if (values.length < 3) {
        throw new Error("Please enter at least 3 data points")
      }

      const min = Math.min(...values)
      const max = Math.max(...values)
      const range = max - min || 1
      const binWidth = range / binCount

      // Create bins
      const bins: { start: number; end: number; count: number }[] = []
      for (let i = 0; i < binCount; i++) {
        bins.push({
          start: min + i * binWidth,
          end: min + (i + 1) * binWidth,
          count: 0
        })
      }

      // Count values in each bin
      values.forEach(v => {
        const binIndex = Math.min(Math.floor((v - min) / binWidth), binCount - 1)
        bins[binIndex].count++
      })

      const maxCount = Math.max(...bins.map(b => b.count))

      // Generate SVG
      const width = 600
      const height = 400
      const padding = { top: 40, right: 40, bottom: 60, left: 60 }
      const chartWidth = width - padding.left - padding.right
      const chartHeight = height - padding.top - padding.bottom
      const barWidth = chartWidth / binCount - 4

      let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <!-- Title -->
  <text x="${width/2}" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#1F2937">Histogram</text>

  <!-- Y-axis -->
  <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${height - padding.bottom}"
        stroke="#9CA3AF" stroke-width="1" />

  <!-- X-axis -->
  <line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}"
        stroke="#9CA3AF" stroke-width="1" />

  <!-- Y-axis labels -->
  <text x="${padding.left - 10}" y="${padding.top + 5}" text-anchor="end" font-size="10" fill="#6B7280">${maxCount}</text>
  <text x="${padding.left - 10}" y="${height - padding.bottom}" text-anchor="end" font-size="10" fill="#6B7280">0</text>

  <!-- Bars -->
`

      bins.forEach((bin, i) => {
        const barHeight = maxCount > 0 ? (bin.count / maxCount) * chartHeight : 0
        const x = padding.left + i * (chartWidth / binCount) + 2
        const y = height - padding.bottom - barHeight

        svg += `  <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}"
        fill="${barColor}" opacity="0.8" stroke="#374151" stroke-width="1" />
`

        if (showLabels && bin.count > 0) {
          svg += `  <text x="${x + barWidth/2}" y="${y - 5}" text-anchor="middle" font-size="10" fill="#374151">${bin.count}</text>
`
        }

        // X-axis labels
        svg += `  <text x="${x + barWidth/2}" y="${height - padding.bottom + 20}" text-anchor="middle" font-size="9" fill="#6B7280">${bin.start.toFixed(1)}</text>
`
      })

      // X-axis label
      svg += `
  <!-- Axis labels -->
  <text x="${width/2}" y="${height - 10}" text-anchor="middle" font-size="12" fill="#374151">Value</text>
  <text x="15" y="${height/2}" text-anchor="middle" font-size="12" fill="#374151" transform="rotate(-90, 15, ${height/2})">Frequency</text>
</svg>`

      setSvgCode(svg)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed")
      setSvgCode("")
    }
  }, [data, binCount, barColor, showLabels])

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
    setData("23, 25, 28, 30, 32, 35, 38, 40, 42, 45, 48, 50, 52, 55, 58, 60, 62, 65, 68, 70, 72, 75, 78, 80, 82, 85, 88, 90")
    setSvgCode("")
    setError(null)
  }, [])

  const handleDownload = useCallback(() => {
    if (svgCode) {
      const blob = new Blob([svgCode], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "histogram.svg"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [svgCode])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Histogram Maker</h2>
        <p className="text-sm text-muted-foreground">
          Create histograms to visualize the distribution of your data
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
      <section className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="bins">Number of Bins</Label>
          <Input
            id="bins"
            type="number"
            min="3"
            max="30"
            value={binCount}
            onChange={(e) => setBinCount(Math.max(3, Math.min(30, parseInt(e.target.value) || 8)))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="color">Bar Color</Label>
          <div className="flex items-center gap-2">
            <input
              id="color"
              type="color"
              value={barColor}
              onChange={(e) => setBarColor(e.target.value)}
              className="w-10 h-10 rounded cursor-pointer border"
            />
            <span className="text-sm font-mono">{barColor}</span>
          </div>
        </div>

        <div className="flex items-end">
          <Label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
              className="rounded border-border"
            />
            Show count labels
          </Label>
        </div>
      </section>

      <Button onClick={generateHistogram} className="w-full">
        Generate Histogram
      </Button>

      {/* Preview */}
      {svgCode && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Histogram Preview</Label>
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
            <h4 className="text-sm font-medium">About Histograms</h4>
            <p className="text-sm text-muted-foreground">
              A histogram is a graphical representation of data distribution. It divides the
              range of values into bins (intervals) and shows how many data points fall into
              each bin using bars.
            </p>
            <p className="text-sm text-muted-foreground">
              The number of bins affects the level of detail: too few bins oversimplify the
              distribution, while too many bins can make patterns hard to see. A common rule
              of thumb is to use between 5-20 bins depending on your data size.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
