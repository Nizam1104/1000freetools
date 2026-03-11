"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Copy, Check, Download, Trash2, Upload } from "lucide-react"
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, ReferenceLine } from "recharts"

interface BoxPlotData {
  name: string
  min: number
  q1: number
  median: number
  q3: number
  max: number
  outliers: number[]
  color: string
}

interface RawDataPoint {
  group: string
  value: number
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFC658", "#FF6B6B"]

export default function BoxPlotMaker() {
  const [mode, setMode] = useState<'summary' | 'raw'>('raw')
  const [summaryInput, setSummaryInput] = useState("Group A, 10, 25, 35, 50, 60\nGroup B, 15, 30, 40, 55, 70\nGroup C, 5, 20, 30, 45, 55")
  const [rawInput, setRawInput] = useState("A, 23\nA, 28\nA, 31\nA, 35\nA, 38\nA, 42\nA, 45\nA, 52\nA, 58\nA, 65\nB, 25\nB, 32\nB, 38\nB, 42\nB, 48\nB, 55\nB, 62\nB, 68\nB, 75\nC, 15\nC, 22\nC, 28\nC, 32\nC, 38\nC, 45\nC, 50\nC, 58")
  const [chartTitle, setChartTitle] = useState("Box Plot Comparison")
  const [yAxisLabel, setYAxisLabel] = useState("Value")
  const [showOutliers, setShowOutliers] = useState(true)
  const [showMean, setShowMean] = useState(true)
  const [boxWidth, setBoxWidth] = useState(40)
  const [copied, setCopied] = useState<string | null>(null)

  const boxPlotData = useMemo((): BoxPlotData[] => {
    if (mode === 'summary') {
      const lines = summaryInput.split("\n").filter((line) => line.trim())
      return lines.map((line, idx) => {
        const parts = line.split(",").map(p => parseFloat(p.trim()) || 0)
        const name = parts.shift()?.toString() || `Group ${idx + 1}`
        return {
          name,
          min: parts[0] || 0,
          q1: parts[1] || 0,
          median: parts[2] || 0,
          q3: parts[3] || 0,
          max: parts[4] || 0,
          outliers: [],
          color: COLORS[idx % COLORS.length]
        }
      })
    } else {
      const lines = rawInput.split("\n").filter((line) => line.trim())
      const groups: Record<string, number[]> = {}

      lines.forEach((line) => {
        const parts = line.split(",").map(p => p.trim())
        const group = parts[0] || 'Unknown'
        const value = parseFloat(parts[1]) || 0
        if (!groups[group]) groups[group] = []
        groups[group].push(value)
      })

      return Object.entries(groups).map(([name, values], idx) => {
        const sorted = [...values].sort((a, b) => a - b)
        const n = sorted.length

        const min = sorted[0]
        const max = sorted[n - 1]
        const median = n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)]
        const q1 = sorted[Math.floor(n * 0.25)]
        const q3 = sorted[Math.floor(n * 0.75)]
        const iqr = q3 - q1

        const lowerFence = q1 - 1.5 * iqr
        const upperFence = q3 + 1.5 * iqr
        const outliers = sorted.filter(v => v < lowerFence || v > upperFence)

        return {
          name,
          min: Math.max(min, lowerFence),
          q1,
          median,
          q3,
          max: Math.min(max, upperFence),
          outliers,
          color: COLORS[idx % COLORS.length],
          mean: values.reduce((a, b) => a + b, 0) / n
        }
      })
    }
  }, [mode, summaryInput, rawInput])

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

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>, target: 'summary' | 'raw') => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      if (target === 'summary') {
        setSummaryInput(content)
      } else {
        setRawInput(content)
      }
    }
    reader.readAsText(file)
  }, [])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="rounded-lg border bg-background p-3 shadow-lg">
          <p className="font-medium mb-2">{data.name}</p>
          <div className="text-sm space-y-1">
            <p className="text-muted-foreground">Min: <span className="text-foreground">{data.min?.toFixed(2)}</span></p>
            <p className="text-muted-foreground">Q1: <span className="text-foreground">{data.q1?.toFixed(2)}</span></p>
            <p className="text-muted-foreground">Median: <span className="text-foreground">{data.median?.toFixed(2)}</span></p>
            <p className="text-muted-foreground">Q3: <span className="text-foreground">{data.q3?.toFixed(2)}</span></p>
            <p className="text-muted-foreground">Max: <span className="text-foreground">{data.max?.toFixed(2)}</span></p>
            {data.mean && (
              <p className="text-muted-foreground">Mean: <span className="text-foreground">{data.mean.toFixed(2)}</span></p>
            )}
            {data.outliers && data.outliers.length > 0 && (
              <p className="text-muted-foreground">Outliers: <span className="text-foreground">{data.outliers.join(', ')}</span></p>
            )}
          </div>
        </div>
      )
    }
    return null
  }

  const statistics = useMemo(() => {
    return boxPlotData.map(d => ({
      name: d.name,
      min: d.min,
      q1: d.q1,
      median: d.median,
      q3: d.q3,
      max: d.max,
      iqr: d.q3 - d.q1,
      range: d.max - d.min,
      outliers: d.outliers?.length || 0,
    }))
  }, [boxPlotData])

  // Custom box plot rendering
  const renderBoxPlots = () => {
    return boxPlotData.map((data, idx) => {
      const xPos = idx * (boxWidth + 60) + 50
      const boxHeight = data.q3 - data.q1
      const medianY = data.median

      return (
        <g key={data.name}>
          {/* Whisker lines */}
          <line
            x1={xPos + boxWidth / 2}
            y1={400 - data.min * 3}
            x2={xPos + boxWidth / 2}
            y2={400 - data.q1 * 3}
            stroke={data.color}
            strokeWidth={2}
          />
          <line
            x1={xPos + boxWidth / 2}
            y1={400 - data.q3 * 3}
            x2={xPos + boxWidth / 2}
            y2={400 - data.max * 3}
            stroke={data.color}
            strokeWidth={2}
          />

          {/* Whisker caps */}
          <line
            x1={xPos + 5}
            y1={400 - data.min * 3}
            x2={xPos + boxWidth - 5}
            y2={400 - data.min * 3}
            stroke={data.color}
            strokeWidth={2}
          />
          <line
            x1={xPos + 5}
            y1={400 - data.max * 3}
            x2={xPos + boxWidth - 5}
            y2={400 - data.max * 3}
            stroke={data.color}
            strokeWidth={2}
          />

          {/* Box */}
          <rect
            x={xPos}
            y={400 - data.q3 * 3}
            width={boxWidth}
            height={boxHeight * 3}
            fill={data.color}
            fillOpacity={0.3}
            stroke={data.color}
            strokeWidth={2}
          />

          {/* Median line */}
          <line
            x1={xPos}
            y1={400 - medianY * 3}
            x2={xPos + boxWidth}
            y2={400 - medianY * 3}
            stroke={data.color}
            strokeWidth={3}
          />

          {/* Mean point */}
          {showMean && (data as any).mean && (
            <circle
              cx={xPos + boxWidth / 2}
              cy={400 - (data as any).mean * 3}
              r={5}
              fill="#FF6B6B"
              stroke="#fff"
              strokeWidth={2}
            />
          )}

          {/* Outliers */}
          {showOutliers && data.outliers?.map((outlier, oIdx) => (
            <circle
              key={oIdx}
              cx={xPos + boxWidth / 2}
              cy={400 - outlier * 3}
              r={4}
              fill={data.color}
              stroke="#fff"
              strokeWidth={1}
            />
          ))}
        </g>
      )
    })
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Mode Selection */}
      <section className="space-y-3">
        <div className="flex items-center gap-4">
          <Label className="text-base font-medium">Input Mode:</Label>
          <div className="flex items-center gap-2">
            <Button
              variant={mode === 'raw' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMode('raw')}
            >
              Raw Data
            </Button>
            <Button
              variant={mode === 'summary' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMode('summary')}
            >
              Summary Statistics
            </Button>
          </div>
        </div>
      </section>

      {/* Data Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="data-input" className="text-base font-medium">
            {mode === 'raw' ? 'Raw Data' : 'Summary Data'}
          </Label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              id="file-upload"
              accept=".csv,.json,.txt"
              onChange={(e) => handleFileUpload(e, mode)}
              className="hidden"
            />
            <Button variant="ghost" size="xs" onClick={() => document.getElementById('file-upload')?.click()} className="h-7">
              <Upload className="size-3.5 mr-1" />
              <span className="text-xs">Import</span>
            </Button>
            <Button variant="ghost" size="xs" onClick={() => copyToClipboard(mode === 'raw' ? rawInput : summaryInput, "input")} className="h-7">
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button variant="ghost" size="xs" onClick={() => mode === 'raw' ? setRawInput("") : setSummaryInput("")} className="h-7">
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>
        <Textarea
          id="data-input"
          value={mode === 'raw' ? rawInput : summaryInput}
          onChange={(e) => mode === 'raw' ? setRawInput(e.target.value) : setSummaryInput(e.target.value)}
          className="font-mono text-sm min-h-[150px]"
          placeholder={mode === 'raw' 
            ? "Group, Value&#10;A, 23&#10;A, 28&#10;B, 25"
            : "Group, Min, Q1, Median, Q3, Max&#10;Group A, 10, 25, 35, 50, 60"
          }
        />
        <p className="text-sm text-muted-foreground">
          {mode === 'raw' 
            ? 'Enter raw data values (group, value), one per line. Outliers will be calculated automatically.'
            : 'Enter summary statistics (group, min, Q1, median, Q3, max), one per line.'
          }
        </p>
      </section>

      {/* Chart Options */}
      <section className="space-y-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <Label htmlFor="y-axis-label" className="text-sm">Y-Axis Label</Label>
            <Input
              id="y-axis-label"
              value={yAxisLabel}
              onChange={(e) => setYAxisLabel(e.target.value)}
              placeholder="Y-axis label"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="box-width" className="text-sm">Box Width: {boxWidth}px</Label>
            <Slider
              id="box-width"
              value={[boxWidth]}
              onValueChange={(v) => setBoxWidth(v[0])}
              min={20}
              max={80}
              step={5}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="show-outliers"
              checked={showOutliers}
              onCheckedChange={setShowOutliers}
            />
            <Label htmlFor="show-outliers" className="text-sm cursor-pointer">Show Outliers</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="show-mean"
              checked={showMean}
              onCheckedChange={setShowMean}
            />
            <Label htmlFor="show-mean" className="text-sm cursor-pointer">Show Mean</Label>
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
            {boxPlotData.length > 0 ? (
              <div className="h-full w-full overflow-x-auto">
                <svg className="h-full min-w-[600px]" viewBox="0 0 800 450">
                  {/* Y-axis */}
                  <line x1="50" y1="20" x2="50" y2="400" stroke="#666" strokeWidth={2} />
                  {/* X-axis */}
                  <line x1="50" y1="400" x2="780" y2="400" stroke="#666" strokeWidth={2} />
                  
                  {/* Y-axis label */}
                  <text x="20" y="210" textAnchor="middle" className="text-sm fill-muted-foreground" transform="rotate(-90, 20, 210)">
                    {yAxisLabel}
                  </text>

                  {/* Grid lines */}
                  {[0, 25, 50, 75, 100].map((val) => (
                    <g key={val}>
                      <line
                        x1="50"
                        y1={400 - val * 3}
                        x2="780"
                        y2={400 - val * 3}
                        stroke="#e5e5e5"
                        strokeDasharray="3 3"
                      />
                      <text x="45" y={405 - val * 3} textAnchor="end" className="text-xs fill-muted-foreground">
                        {val}
                      </text>
                    </g>
                  ))}

                  {/* Box plots */}
                  {renderBoxPlots()}

                  {/* X-axis labels */}
                  {boxPlotData.map((data, idx) => (
                    <text
                      key={data.name}
                      x={idx * (boxWidth + 60) + 50 + boxWidth / 2}
                      y="425"
                      textAnchor="middle"
                      className="text-sm fill-muted-foreground"
                    >
                      {data.name}
                    </text>
                  ))}

                  {/* Legend */}
                  <g transform="translate(50, 450)">
                    <text x="0" y="0" className="text-xs fill-muted-foreground">
                      ■ Box: IQR (Q1-Q3)  │  — Median  │  ● Mean  │  ○ Outliers
                    </text>
                  </g>
                </svg>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Enter data to see the box plot
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Statistics Table */}
      {statistics.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold">Summary Statistics</h3>
          <div className="rounded-lg border bg-background overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-3 text-left font-medium">Group</th>
                  <th className="p-3 text-right font-medium">Min</th>
                  <th className="p-3 text-right font-medium">Q1</th>
                  <th className="p-3 text-right font-medium">Median</th>
                  <th className="p-3 text-right font-medium">Q3</th>
                  <th className="p-3 text-right font-medium">Max</th>
                  <th className="p-3 text-right font-medium">IQR</th>
                  <th className="p-3 text-right font-medium">Range</th>
                  <th className="p-3 text-right font-medium">Outliers</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {statistics.map((stat, idx) => (
                  <tr key={idx} className="hover:bg-muted/30">
                    <td className="p-3 font-medium">{stat.name}</td>
                    <td className="p-3 text-right">{stat.min.toFixed(2)}</td>
                    <td className="p-3 text-right">{stat.q1.toFixed(2)}</td>
                    <td className="p-3 text-right font-medium">{stat.median.toFixed(2)}</td>
                    <td className="p-3 text-right">{stat.q3.toFixed(2)}</td>
                    <td className="p-3 text-right">{stat.max.toFixed(2)}</td>
                    <td className="p-3 text-right">{stat.iqr.toFixed(2)}</td>
                    <td className="p-3 text-right">{stat.range.toFixed(2)}</td>
                    <td className="p-3 text-right">{stat.outliers}</td>
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
