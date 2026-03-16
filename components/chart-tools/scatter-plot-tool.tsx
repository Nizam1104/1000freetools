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
import { Copy, Check, Download, Trash2, Upload, Plus, ZoomIn, ZoomOut } from "lucide-react"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ZAxis, ReferenceLine, Line, Cell } from "recharts"

interface ChartData {
  x: number
  y: number
  z?: number
  label?: string
  fill?: string
}

interface TrendLine {
  type: 'linear' | 'polynomial'
  show: boolean
  rSquared?: number
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFC658", "#FF6B6B", "#4CAF50", "#E91E63"]
const SHAPES = ['circle', 'cross', 'diamond', 'square', 'star', 'triangle', 'wye']

export default function ScatterPlotTool() {
  const [dataInput, setDataInput] = useState("Point A, 10, 20, 5\nPoint B, 15, 25, 8\nPoint C, 20, 30, 12\nPoint D, 25, 35, 15\nPoint E, 30, 40, 18\nPoint F, 35, 45, 22\nPoint G, 40, 50, 25")
  const [chartTitle, setChartTitle] = useState("Scatter Plot Analysis")
  const [xAxisLabel, setXAxisLabel] = useState("X Value")
  const [yAxisLabel, setYAxisLabel] = useState("Y Value")
  const [pointSize, setPointSize] = useState(8)
  const [pointShape, setPointShape] = useState('circle')
  const [showGrid, setShowGrid] = useState(true)
  const [showLabels, setShowLabels] = useState(false)
  const [isBubbleChart, setIsBubbleChart] = useState(true)
  const [zoom, setZoom] = useState(1)
  const [trendLine, setTrendLine] = useState<TrendLine>({ type: 'linear', show: false })
  const [copied, setCopied] = useState<string | null>(null)

  const chartData = useMemo((): ChartData[] => {
    const lines = dataInput.split("\n").filter((line) => line.trim())
    return lines.map((line, idx) => {
      const parts = line.split(",").map(p => p.trim())
      const label = parts[0] || `Point ${idx + 1}`
      const x = parseFloat(parts[1]) || 0
      const y = parseFloat(parts[2]) || 0
      const z = parts[3] ? parseFloat(parts[3]) : 10
      return { x, y, z, label, fill: COLORS[idx % COLORS.length] }
    }).filter((d) => !isNaN(d.x) && !isNaN(d.y))
  }, [dataInput])

  const trendLineData = useMemo(() => {
    if (!trendLine.show || chartData.length < 2) return []

    const n = chartData.length
    const sumX = chartData.reduce((sum, d) => sum + d.x, 0)
    const sumY = chartData.reduce((sum, d) => sum + d.y, 0)
    const sumXY = chartData.reduce((sum, d) => sum + d.x * d.y, 0)
    const sumX2 = chartData.reduce((sum, d) => sum + d.x * d.x, 0)

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
    const intercept = (sumY - slope * sumX) / n

    // Calculate R-squared
    const meanY = sumY / n
    const ssTot = chartData.reduce((sum, d) => sum + Math.pow(d.y - meanY, 2), 0)
    const ssRes = chartData.reduce((sum, d) => sum + Math.pow(d.y - (slope * d.x + intercept), 2), 0)
    const rSquared = 1 - (ssRes / ssTot)

    setTrendLine(prev => ({ ...prev, rSquared }))

    const minX = Math.min(...chartData.map(d => d.x))
    const maxX = Math.max(...chartData.map(d => d.x))

    return [
      { x: minX, y: slope * minX + intercept },
      { x: maxX, y: slope * maxX + intercept }
    ]
  }, [chartData, trendLine.show])

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
      if (file.name.endsWith('.json')) {
        try {
          const json = JSON.parse(content)
          if (Array.isArray(json)) {
            const formatted = json.map((item: any) => {
              const values = [item.label || item.name, item.x, item.y, item.z || item.size].filter(v => v !== undefined).join(', ')
              return values
            }).join('\n')
            setDataInput(formatted)
          }
        } catch (err) {
          console.error("Failed to parse JSON:", err)
        }
      } else {
        setDataInput(content)
      }
    }
    reader.readAsText(file)
  }, [])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="rounded-lg border bg-background p-3 shadow-lg">
          <p className="font-medium">{data.label || 'Data Point'}</p>
          <p className="text-sm text-muted-foreground">
            X: {data.x?.toFixed(2)} | Y: {data.y?.toFixed(2)}
          </p>
          {data.z && (
            <p className="text-sm text-muted-foreground">
              Size: {data.z}
            </p>
          )}
        </div>
      )
    }
    return null
  }

  const getShape = (shape: string) => {
    switch (shape) {
      case 'cross': return 'cross'
      case 'diamond': return 'diamond'
      case 'square': return 'square'
      case 'star': return 'star'
      case 'triangle': return 'triangle'
      case 'wye': return 'wye'
      default: return 'circle'
    }
  }

  const statistics = useMemo(() => {
    if (chartData.length === 0) return null

    const xValues = chartData.map(d => d.x)
    const yValues = chartData.map(d => d.y)

    const mean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length
    const median = (arr: number[]) => {
      const sorted = [...arr].sort((a, b) => a - b)
      const mid = Math.floor(sorted.length / 2)
      return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
    }
    const stdDev = (arr: number[]) => {
      const m = mean(arr)
      return Math.sqrt(arr.reduce((sum, v) => sum + Math.pow(v - m, 2), 0) / arr.length)
    }

    return {
      count: chartData.length,
      xMean: mean(xValues).toFixed(2),
      xMedian: median(xValues).toFixed(2),
      xStdDev: stdDev(xValues).toFixed(2),
      yMean: mean(yValues).toFixed(2),
      yMedian: median(yValues).toFixed(2),
      yStdDev: stdDev(yValues).toFixed(2),
      xMin: Math.min(...xValues).toFixed(2),
      xMax: Math.max(...xValues).toFixed(2),
      yMin: Math.min(...yValues).toFixed(2),
      yMax: Math.max(...yValues).toFixed(2),
    }
  }, [chartData])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Data Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="data-input" className="text-base font-medium">
            Chart Data
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
          className="font-mono text-sm min-h-[150px]"
          placeholder="Label, X, Y, Size&#10;Point A, 10, 20, 5&#10;Point B, 15, 25, 8"
        />
        <p className="text-sm text-muted-foreground">
          Enter data as comma-separated values (label, x, y, size), one per line
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
            <Label htmlFor="point-shape" className="text-sm">Point Shape</Label>
            <Select value={pointShape} onValueChange={setPointShape}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SHAPES.map(shape => (
                  <SelectItem key={shape} value={shape}>{shape.charAt(0).toUpperCase() + shape.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="point-size" className="text-sm">Point Size: {pointSize}px</Label>
            <Slider
              id="point-size"
              value={[pointSize]}
              onValueChange={(v) => setPointSize(v[0])}
              min={4}
              max={30}
              step={1}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zoom" className="text-sm">Zoom: {(zoom * 100).toFixed(0)}%</Label>
            <Slider
              id="zoom"
              value={[zoom]}
              onValueChange={(v) => setZoom(v[0])}
              min={0.5}
              max={2}
              step={0.1}
            />
          </div>
          <div className="flex items-center gap-2 pt-6">
            <Switch
              id="show-grid"
              checked={showGrid}
              onCheckedChange={setShowGrid}
            />
            <Label htmlFor="show-grid" className="text-sm cursor-pointer">Show Grid</Label>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <Switch
              id="show-labels"
              checked={showLabels}
              onCheckedChange={setShowLabels}
            />
            <Label htmlFor="show-labels" className="text-sm cursor-pointer">Show Labels</Label>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <Switch
              id="is-bubble"
              checked={isBubbleChart}
              onCheckedChange={setIsBubbleChart}
            />
            <Label htmlFor="is-bubble" className="text-sm cursor-pointer">Bubble Chart</Label>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <Switch
              id="show-trend"
              checked={trendLine.show}
              onCheckedChange={(v) => setTrendLine(prev => ({ ...prev, show: v }))}
            />
            <Label htmlFor="show-trend" className="text-sm cursor-pointer">Trend Line</Label>
          </div>
        </div>
      </section>

      {/* Chart Preview */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Chart Preview</Label>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="xs" onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}>
              <ZoomOut className="size-3.5" />
            </Button>
            <Button variant="outline" size="xs" onClick={() => setZoom(z => Math.min(2, z + 0.1))}>
              <ZoomIn className="size-3.5" />
            </Button>
            <Button variant="outline" size="sm" onClick={downloadChart}>
              <Download className="size-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
        <div className="rounded-lg border bg-background p-6">
          <h3 className="text-lg font-semibold text-center mb-4">{chartTitle}</h3>
          <div className="h-[400px]">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  {showGrid && <CartesianGrid strokeDasharray="3 3" />}
                  <XAxis 
                    type="number" 
                    dataKey="x" 
                    name="X"
                    label={{ value: xAxisLabel, position: 'insideBottom', offset: -5 }}
                    domain={['auto', 'auto']}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="y" 
                    name="Y"
                    label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
                    domain={['auto', 'auto']}
                  />
                  {isBubbleChart && <ZAxis type="number" dataKey="z" range={[20, 400]} name="Size" />}
                  <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                  <Legend />
                  <Scatter
                    name="Data Points"
                    data={chartData}
                    fill={COLORS[0]}
                    shape={getShape(pointShape)}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.fill || COLORS[index % COLORS.length]}
                        r={isBubbleChart ? undefined : pointSize}
                      />
                    ))}
                  </Scatter>
                  {trendLine.show && trendLineData.length > 0 && (
                    <Line
                      type="monotone"
                      data={trendLineData}
                      dataKey="y"
                      stroke="#666"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  )}
                </ScatterChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Enter data to see the chart
              </div>
            )}
          </div>
          {trendLine.show && trendLine.rSquared !== undefined && (
            <p className="text-sm text-muted-foreground text-center mt-2">
              R² = {trendLine.rSquared.toFixed(4)}
            </p>
          )}
        </div>
      </section>

      {/* Statistics */}
      {statistics && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold">Statistics</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-lg border bg-background p-4 space-y-2">
              <h4 className="font-medium">{xAxisLabel} (X)</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-muted-foreground">Count:</span>
                <span className="text-right font-medium">{statistics.count}</span>
                <span className="text-muted-foreground">Min:</span>
                <span className="text-right font-medium">{statistics.xMin}</span>
                <span className="text-muted-foreground">Max:</span>
                <span className="text-right font-medium">{statistics.xMax}</span>
                <span className="text-muted-foreground">Mean:</span>
                <span className="text-right font-medium">{statistics.xMean}</span>
                <span className="text-muted-foreground">Median:</span>
                <span className="text-right font-medium">{statistics.xMedian}</span>
                <span className="text-muted-foreground">Std Dev:</span>
                <span className="text-right font-medium">{statistics.xStdDev}</span>
              </div>
            </div>
            <div className="rounded-lg border bg-background p-4 space-y-2">
              <h4 className="font-medium">{yAxisLabel} (Y)</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-muted-foreground">Count:</span>
                <span className="text-right font-medium">{statistics.count}</span>
                <span className="text-muted-foreground">Min:</span>
                <span className="text-right font-medium">{statistics.yMin}</span>
                <span className="text-muted-foreground">Max:</span>
                <span className="text-right font-medium">{statistics.yMax}</span>
                <span className="text-muted-foreground">Mean:</span>
                <span className="text-right font-medium">{statistics.yMean}</span>
                <span className="text-muted-foreground">Median:</span>
                <span className="text-right font-medium">{statistics.yMedian}</span>
                <span className="text-muted-foreground">Std Dev:</span>
                <span className="text-right font-medium">{statistics.yStdDev}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Data Summary */}
      {chartData.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold">Data Points</h3>
          <div className="rounded-lg border bg-background overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-3 text-left font-medium">Label</th>
                  <th className="p-3 text-right font-medium">X</th>
                  <th className="p-3 text-right font-medium">Y</th>
                  {isBubbleChart && <th className="p-3 text-right font-medium">Size</th>}
                </tr>
              </thead>
              <tbody className="divide-y">
                {chartData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-muted/30">
                    <td className="p-3 font-medium">{item.label}</td>
                    <td className="p-3 text-right">{item.x.toFixed(2)}</td>
                    <td className="p-3 text-right">{item.y.toFixed(2)}</td>
                    {isBubbleChart && <td className="p-3 text-right">{item.z?.toFixed(2) || '-'}</td>}
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
