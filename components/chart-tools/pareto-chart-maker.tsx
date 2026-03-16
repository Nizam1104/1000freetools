"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Copy, Check, Download, Trash2, Upload, RefreshCw } from "lucide-react"
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, ReferenceLine } from "recharts"

interface ParetoData {
  category: string
  frequency: number
  cumulative: number
  cumulativePercent: number
  color: string
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFC658", "#FF6B6B"]

export default function ParetoChartMaker() {
  const [dataInput, setDataInput] = useState("Defect A, 45\nDefect B, 32\nDefect C, 28\nDefect D, 18\nDefect E, 12\nDefect F, 8\nDefect G, 5\nDefect H, 3")
  const [chartTitle, setChartTitle] = useState("Pareto Analysis")
  const [xAxisLabel, setXAxisLabel] = useState("Category")
  const [yAxisLabel, setYAxisLabel] = useState("Frequency")
  const [show80Line, setShow80Line] = useState(true)
  const [showValues, setShowValues] = useState(true)
  const [barColor, setBarColor] = useState("#0088FE")
  const [lineColor, setLineColor] = useState("#FF6B6B")
  const [copied, setCopied] = useState<string | null>(null)

  const chartData = useMemo((): ParetoData[] => {
    const lines = dataInput.split("\n").filter((line) => line.trim())
    const data: { category: string; frequency: number }[] = []

    lines.forEach((line) => {
      const parts = line.split(",").map(p => p.trim())
      const category = parts[0] || "Unknown"
      const frequency = parseFloat(parts[1]) || 0
      data.push({ category, frequency })
    })

    // Sort by frequency descending
    data.sort((a, b) => b.frequency - a.frequency)

    // Calculate cumulative values
    const total = data.reduce((sum, d) => sum + d.frequency, 0)
    let cumulative = 0

    return data.map((d, idx) => {
      cumulative += d.frequency
      return {
        category: d.category,
        frequency: d.frequency,
        cumulative,
        cumulativePercent: total > 0 ? (cumulative / total) * 100 : 0,
        color: COLORS[idx % COLORS.length]
      }
    })
  }, [dataInput])

  const eightyPercentThreshold = useMemo(() => {
    const item80 = chartData.find(d => d.cumulativePercent >= 80)
    return item80 ? {
      category: item80.category,
      cumulativePercent: item80.cumulativePercent.toFixed(1)
    } : null
  }, [chartData])

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

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const barPayload = payload.find((p: any) => p.dataKey === 'frequency')
      const linePayload = payload.find((p: any) => p.dataKey === 'cumulativePercent')

      return (
        <div className="rounded-lg border bg-background p-3 shadow-lg">
          <p className="font-medium mb-2">{barPayload?.payload.category}</p>
          {barPayload && (
            <p className="text-sm" style={{ color: barPayload.color }}>
              Frequency: {barPayload.value}
            </p>
          )}
          {linePayload && (
            <p className="text-sm" style={{ color: linePayload.color }}>
              Cumulative: {linePayload.value.toFixed(1)}%
            </p>
          )}
        </div>
      )
    }
    return null
  }

  const statistics = useMemo(() => {
    if (chartData.length === 0) return null

    const total = chartData.reduce((sum, d) => sum + d.frequency, 0)
    const vital = chartData.filter(d => d.cumulativePercent <= 80)
    const trivial = chartData.filter(d => d.cumulativePercent > 80)

    return {
      total,
      categories: chartData.length,
      vitalCount: vital.length,
      vitalPercent: ((vital.length / chartData.length) * 100).toFixed(1),
      trivialCount: trivial.length,
      trivialPercent: ((trivial.length / chartData.length) * 100).toFixed(1),
      topCategory: chartData[0]?.category,
      topFrequency: chartData[0]?.frequency,
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
          placeholder="Category, Frequency&#10;Defect A, 45&#10;Defect B, 32"
        />
        <p className="text-sm text-muted-foreground">
          Enter data as comma-separated values (category, frequency), one per line. Data will be sorted automatically.
        </p>
      </section>

      {/* Chart Options */}
      <section className="space-y-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
          <div className="space-y-2">
            <Label htmlFor="line-color" className="text-sm">Line Color</Label>
            <Input
              id="line-color"
              type="color"
              value={lineColor}
              onChange={(e) => setLineColor(e.target.value)}
              className="w-full h-9"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="show-80-line"
              checked={show80Line}
              onCheckedChange={setShow80Line}
            />
            <Label htmlFor="show-80-line" className="text-sm cursor-pointer">Show 80% Line</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="show-values"
              checked={showValues}
              onCheckedChange={setShowValues}
            />
            <Label htmlFor="show-values" className="text-sm cursor-pointer">Show Values</Label>
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
          <div className="h-[450px]">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="category" 
                    label={{ value: xAxisLabel, position: 'insideBottom', offset: -5 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    yAxisId="left"
                    label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    domain={[0, 100]}
                    label={{ value: 'Cumulative %', angle: 90, position: 'insideRight' }}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    yAxisId="left"
                    dataKey="frequency" 
                    name="Frequency" 
                    fill={barColor}
                    label={showValues ? { 
                      position: 'top', 
                      formatter: (v: number) => v.toLocaleString()
                    } : undefined}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={barColor} />
                    ))}
                  </Bar>
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="cumulativePercent" 
                    name="Cumulative %"
                    stroke={lineColor}
                    strokeWidth={3}
                    dot={{ r: 5, fill: lineColor }}
                    activeDot={{ r: 7 }}
                  />
                  {show80Line && (
                    <ReferenceLine 
                      yAxisId="right"
                      y={80} 
                      stroke="#666" 
                      strokeDasharray="5 5"
                      label={{ value: '80%', position: 'right', fill: '#666' }}
                    />
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Enter data to see the Pareto chart
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 80/20 Analysis */}
      {eightyPercentThreshold && (
        <section className="space-y-3">
          <div className="rounded-lg border bg-gradient-to-r from-primary/10 to-transparent p-4">
            <div className="flex items-center gap-2 mb-2">
              <RefreshCw className="size-5 text-primary" />
              <h3 className="text-base font-semibold">80/20 Analysis</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">{eightyPercentThreshold.category}</span> and the categories before it account for <span className="font-semibold">{eightyPercentThreshold.cumulativePercent}%</span> of the total frequency.
              These are your "vital few" that should be prioritized for maximum impact.
            </p>
          </div>
        </section>
      )}

      {/* Statistics */}
      {statistics && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold">Summary Statistics</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Total Frequency</p>
              <p className="text-2xl font-semibold">{statistics.total.toLocaleString()}</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Categories</p>
              <p className="text-2xl font-semibold">{statistics.categories}</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Vital Few ({statistics.vitalPercent}%)</p>
              <p className="text-2xl font-semibold">{statistics.vitalCount} categories</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Trivial Many</p>
              <p className="text-2xl font-semibold">{statistics.trivialCount} categories</p>
            </div>
          </div>
        </section>
      )}

      {/* Data Summary */}
      {chartData.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold">Data Summary</h3>
          <div className="rounded-lg border bg-background overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-3 text-left font-medium">Category</th>
                  <th className="p-3 text-right font-medium">Frequency</th>
                  <th className="p-3 text-right font-medium">Percentage</th>
                  <th className="p-3 text-right font-medium">Cumulative %</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {chartData.map((item, idx) => {
                  const total = chartData.reduce((sum, d) => sum + d.frequency, 0)
                  const percent = ((item.frequency / total) * 100).toFixed(1)
                  return (
                    <tr key={idx} className={`hover:bg-muted/30 ${item.cumulativePercent <= 80 ? 'bg-primary/5' : ''}`}>
                      <td className="p-3 font-medium">{item.category}</td>
                      <td className="p-3 text-right">{item.frequency.toLocaleString()}</td>
                      <td className="p-3 text-right">{percent}%</td>
                      <td className="p-3 text-right font-medium">{item.cumulativePercent.toFixed(1)}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground">
            Categories highlighted in blue are part of the "vital few" (≤80% cumulative)
          </p>
        </section>
      )}
    </div>
  )
}
