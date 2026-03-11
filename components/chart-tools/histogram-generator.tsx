"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Download, Trash2, Upload } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, Line, ComposedChart } from "recharts"

interface HistogramData {
  range: string
  count: number
  fill: string
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFC658", "#FF6B6B"]

export default function HistogramGenerator() {
  const [dataInput, setDataInput] = useState("23, 25, 28, 30, 32, 35, 38, 40, 42, 45, 48, 50, 52, 55, 58, 60, 62, 65, 68, 70, 72, 75, 78, 80, 82, 85, 88, 90, 92, 95")
  const [chartTitle, setChartTitle] = useState("Data Distribution Histogram")
  const [xAxisLabel, setXAxisLabel] = useState("Value")
  const [yAxisLabel, setYAxisLabel] = useState("Frequency")
  const [binCount, setBinCount] = useState(10)
  const [useAutoBins, setUseAutoBins] = useState(true)
  const [showNormalCurve, setShowNormalCurve] = useState(false)
  const [showStats, setShowStats] = useState(true)
  const [barColor, setBarColor] = useState("#0088FE")
  const [copied, setCopied] = useState<string | null>(null)

  const rawData = useMemo((): number[] => {
    const values = dataInput.split(/[,\s\n]+/).filter((v) => v.trim())
    return values.map((v) => parseFloat(v)).filter((n) => !isNaN(n))
  }, [dataInput])

  const statistics = useMemo(() => {
    if (rawData.length === 0) return null

    const sorted = [...rawData].sort((a, b) => a - b)
    const n = sorted.length

    const mean = sorted.reduce((a, b) => a + b, 0) / n
    const variance = sorted.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / n
    const stdDev = Math.sqrt(variance)

    const median = n % 2 === 0
      ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
      : sorted[Math.floor(n / 2)]

    const q1 = sorted[Math.floor(n * 0.25)]
    const q3 = sorted[Math.floor(n * 0.75)]

    const min = sorted[0]
    const max = sorted[n - 1]

    return { mean, median, stdDev, q1, q3, min, max, count: n }
  }, [rawData])

  const histogramData = useMemo((): HistogramData[] => {
    if (rawData.length === 0 || !statistics) return []

    const min = statistics.min
    const max = statistics.max
    const actualBinCount = useAutoBins ? Math.round(Math.sqrt(rawData.length)) : binCount
    const binWidth = (max - min) / actualBinCount

    const bins: { start: number; end: number; count: number }[] = []
    for (let i = 0; i < actualBinCount; i++) {
      bins.push({
        start: min + i * binWidth,
        end: min + (i + 1) * binWidth,
        count: 0
      })
    }

    rawData.forEach((value) => {
      const binIndex = Math.min(
        Math.floor((value - min) / binWidth),
        actualBinCount - 1
      )
      bins[binIndex].count++
    })

    return bins.map((bin) => ({
      range: `${bin.start.toFixed(1)} - ${bin.end.toFixed(1)}`,
      count: bin.count,
      fill: barColor
    }))
  }, [rawData, statistics, useAutoBins, binCount, barColor])

  const normalCurveData = useMemo(() => {
    if (!statistics || !showNormalCurve) return []

    const { mean, stdDev } = statistics
    const min = statistics.min
    const max = statistics.max
    const total = rawData.length

    const actualBinCount = useAutoBins ? Math.round(Math.sqrt(rawData.length)) : binCount
    const binWidth = (max - min) / actualBinCount

    const points: { x: number; y: number }[] = []
    for (let x = min; x <= max; x += binWidth / 4) {
      const z = (x - mean) / stdDev
      const pdf = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z)
      const expected = pdf * total * binWidth
      points.push({ x, y: expected })
    }

    return points
  }, [statistics, showNormalCurve, rawData.length, useAutoBins, binCount])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const downloadChart = useCallback(() => {
    alert("Download functionality would export the chart as PNG/SVG")
  }, [])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setDataInput(content)
    }
    reader.readAsText(file)
  }, [])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">
            Frequency: {payload[0].value}
          </p>
          {payload[0].payload.percentage && (
            <p className="text-sm text-muted-foreground">
              Percentage: {payload[0].payload.percentage.toFixed(1)}%
            </p>
          )}
        </div>
      )
    }
    return null
  }

  const total = histogramData.reduce((sum, d) => sum + d.count, 0)
  const histogramWithPercent = histogramData.map(d => ({
    ...d,
    percentage: total > 0 ? (d.count / total) * 100 : 0
  }))

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Data Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="data-input" className="text-base font-medium">
            Raw Data
          </Label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              id="file-upload"
              accept=".csv,.json,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button variant="ghost" size="xs" onClick={() => document.getElementById('file-upload')?.click()} className="h-7">
              <Upload className="size-3.5 mr-1" />
              <span className="text-xs">Import</span>
            </Button>
            <Button variant="ghost" size="xs" onClick={() => copyToClipboard(dataInput, "input")} className="h-7">
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button variant="ghost" size="xs" onClick={() => setDataInput("")} className="h-7">
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>
        <Textarea
          id="data-input"
          value={dataInput}
          onChange={(e) => setDataInput(e.target.value)}
          className="font-mono text-sm min-h-[100px]"
          placeholder="Enter numeric values separated by commas, spaces, or newlines&#10;23, 25, 28, 30, 32, 35..."
        />
        <p className="text-sm text-muted-foreground">
          Enter raw numeric data values. The histogram will automatically bin the data.
        </p>
      </section>

      {/* Chart Options */}
      <section className="space-y-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="chart-title" className="text-sm">Chart Title</Label>
            <Input
              id="chart-title"
              value={chartTitle}
              onChange={(e) => setChartTitle(e.target.value)}
              placeholder="Enter chart title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="x-axis-label" className="text-sm">X-Axis Label</Label>
            <Input
              id="x-axis-label"
              value={xAxisLabel}
              onChange={(e) => setXAxisLabel(e.target.value)}
              placeholder="X-axis label"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="y-axis-label" className="text-sm">Y-Axis Label</Label>
            <Input
              id="y-axis-label"
              value={yAxisLabel}
              onChange={(e) => setYAxisLabel(e.target.value)}
              placeholder="Y-axis label"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bar-color" className="text-sm">Bar Color</Label>
            <Input
              id="bar-color"
              type="color"
              value={barColor}
              onChange={(e) => setBarColor(e.target.value)}
              className="w-full h-9"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bin-count" className="text-sm">Number of Bins: {binCount}</Label>
            <Slider
              id="bin-count"
              value={[binCount]}
              onValueChange={(v) => setBinCount(v[0])}
              min={3}
              max={30}
              step={1}
              disabled={useAutoBins}
            />
          </div>
          <div className="flex items-center gap-2 pt-6">
            <Switch
              id="use-auto-bins"
              checked={useAutoBins}
              onCheckedChange={setUseAutoBins}
            />
            <Label htmlFor="use-auto-bins" className="text-sm cursor-pointer">Auto Bins</Label>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <Switch
              id="show-normal-curve"
              checked={showNormalCurve}
              onCheckedChange={setShowNormalCurve}
            />
            <Label htmlFor="show-normal-curve" className="text-sm cursor-pointer">Normal Curve</Label>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <Switch
              id="show-stats"
              checked={showStats}
              onCheckedChange={setShowStats}
            />
            <Label htmlFor="show-stats" className="text-sm cursor-pointer">Show Statistics</Label>
          </div>
        </div>
      </section>

      {/* Chart Preview */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Chart Preview</Label>
          <Button variant="outline" size="sm" onClick={downloadChart}>
            <Download className="size-4 mr-1" />
            Download
          </Button>
        </div>
        <div className="rounded-lg border bg-background p-6">
          <h3 className="text-lg font-semibold text-center mb-4">{chartTitle}</h3>
          <div className="h-[400px]">
            {histogramData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={histogramWithPercent}>
                  {showNormalCurve && normalCurveData.length > 0 && (
                    <Line
                      type="monotone"
                      data={normalCurveData}
                      dataKey="y"
                      stroke="#FF6B6B"
                      strokeWidth={2}
                      dot={false}
                      isAnimationActive={false}
                    />
                  )}
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="range" 
                    label={{ value: xAxisLabel, position: 'insideBottom', offset: -5 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="count" name="Frequency" fill={barColor}>
                    {histogramWithPercent.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={barColor} />
                    ))}
                  </Bar>
                </ComposedChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Enter data to see the histogram
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Statistics */}
      {statistics && showStats && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold">Summary Statistics</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Count</p>
              <p className="text-2xl font-semibold">{statistics.count}</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Mean</p>
              <p className="text-2xl font-semibold">{statistics.mean.toFixed(2)}</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Median</p>
              <p className="text-2xl font-semibold">{statistics.median.toFixed(2)}</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Std Dev</p>
              <p className="text-2xl font-semibold">{statistics.stdDev.toFixed(2)}</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Min</p>
              <p className="text-2xl font-semibold">{statistics.min.toFixed(2)}</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Q1 (25%)</p>
              <p className="text-2xl font-semibold">{statistics.q1.toFixed(2)}</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Q3 (75%)</p>
              <p className="text-2xl font-semibold">{statistics.q3.toFixed(2)}</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Max</p>
              <p className="text-2xl font-semibold">{statistics.max.toFixed(2)}</p>
            </div>
          </div>
        </section>
      )}

      {/* Histogram Data */}
      {histogramData.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold">Histogram Data</h3>
          <div className="rounded-lg border bg-background overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-3 text-left font-medium">Range</th>
                  <th className="p-3 text-right font-medium">Frequency</th>
                  <th className="p-3 text-right font-medium">Percentage</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {histogramWithPercent.map((item, idx) => (
                  <tr key={idx} className="hover:bg-muted/30">
                    <td className="p-3 font-medium">{item.range}</td>
                    <td className="p-3 text-right">{item.count}</td>
                    <td className="p-3 text-right">{item.percentage.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  )
}
