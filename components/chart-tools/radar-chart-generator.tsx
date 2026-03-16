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
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip, ResponsiveContainer } from "recharts"

interface ChartData {
  subject: string
  A: number
  B?: number
  C?: number
  D?: number
  E?: number
  F?: number
  fullMark: number
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

export default function RadarChartGenerator() {
  const [dataInput, setDataInput] = useState("Communication, 85, 75\nTeamwork, 90, 80\nProblem Solving, 78, 85\nLeadership, 88, 70\nTechnical Skills, 92, 88\nCreativity, 80, 90")
  const [chartTitle, setChartTitle] = useState("Performance Comparison")
  const [seriesLabels, setSeriesLabels] = useState("Employee A, Employee B")
  const [maxValue, setMaxValue] = useState(100)
  const [showGrid, setShowGrid] = useState(true)
  const [showLabels, setShowLabels] = useState(true)
  const [fillOpacity, setFillOpacity] = useState(0.4)
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [shape, setShape] = useState<'polygon' | 'circle'>('polygon')
  const [copied, setCopied] = useState<string | null>(null)

  const chartData = useMemo((): ChartData[] => {
    const lines = dataInput.split("\n").filter((line) => line.trim())
    const labels = seriesLabels.split(",").map(s => s.trim())

    return lines.map((line) => {
      const parts = line.split(",").map(p => parseFloat(p.trim()) || 0)
      const subject = parts.shift()?.toString() || "Unknown"
      const values = parts

      const data: ChartData = {
        subject,
        A: values[0] || 0,
        fullMark: maxValue
      }

      if (values[1]) data.B = values[1]
      if (values[2]) data.C = values[2]
      if (values[3]) data.D = values[3]
      if (values[4]) data.E = values[4]
      if (values[5]) data.F = values[5]

      return data
    })
  }, [dataInput, seriesLabels, maxValue])

  const seriesKeys = useMemo(() => {
    const keys = ['A']
    if (chartData.some(d => d.B)) keys.push('B')
    if (chartData.some(d => d.C)) keys.push('C')
    if (chartData.some(d => d.D)) keys.push('D')
    if (chartData.some(d => d.E)) keys.push('E')
    if (chartData.some(d => d.F)) keys.push('F')
    return keys
  }, [chartData])

  const seriesNames = useMemo(() => {
    const labels = seriesLabels.split(",").map(s => s.trim()).filter(s => s)
    return seriesKeys.map((key, idx) => labels[idx] || `Series ${String.fromCharCode(65 + seriesKeys.indexOf(key))}`)
  }, [seriesLabels, seriesKeys])

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
      return (
        <div className="rounded-lg border bg-background p-3 shadow-lg">
          <p className="font-medium mb-2">{payload[0].payload.subject}</p>
          {payload.map((p: any, idx: number) => (
            <p key={idx} className="text-sm" style={{ color: p.color }}>
              {p.name}: {p.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const statistics = useMemo(() => {
    if (chartData.length === 0) return null

    const stats: Record<string, { total: number; avg: number; max: number; min: number }> = {}

    seriesKeys.forEach((key, idx) => {
      const values = chartData.map(d => d[key as keyof ChartData] as number).filter(v => v !== undefined)
      if (values.length > 0) {
        const total = values.reduce((a, b) => a + b, 0)
        stats[seriesNames[idx]] = {
          total,
          avg: total / values.length,
          max: Math.max(...values),
          min: Math.min(...values)
        }
      }
    })

    return stats
  }, [chartData, seriesKeys, seriesNames])

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
          placeholder="Subject, Value1, Value2, Value3&#10;Communication, 85, 75&#10;Teamwork, 90, 80"
        />
        <p className="text-sm text-muted-foreground">
          Enter data as comma-separated values (subject, value1, value2, value3), one per line
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
            <Label htmlFor="series-labels" className="text-sm">Series Labels</Label>
            <Input
              id="series-labels"
              value={seriesLabels}
              onChange={(e) => setSeriesLabels(e.target.value)}
              placeholder="Series A, Series B"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-value" className="text-sm">Max Value</Label>
            <Input
              id="max-value"
              type="number"
              value={maxValue}
              onChange={(e) => setMaxValue(parseInt(e.target.value) || 100)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shape" className="text-sm">Grid Shape</Label>
            <select
              id="shape"
              value={shape}
              onChange={(e) => setShape(e.target.value as 'polygon' | 'circle')}
              className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
            >
              <option value="polygon">Polygon</option>
              <option value="circle">Circle</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fill-opacity" className="text-sm">Fill Opacity: {fillOpacity}</Label>
            <Slider
              id="fill-opacity"
              value={[fillOpacity]}
              onValueChange={(v) => setFillOpacity(v[0])}
              min={0}
              max={1}
              step={0.05}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stroke-width" className="text-sm">Stroke Width: {strokeWidth}px</Label>
            <Slider
              id="stroke-width"
              value={[strokeWidth]}
              onValueChange={(v) => setStrokeWidth(v[0])}
              min={1}
              max={5}
              step={0.5}
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
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                  {showGrid && (
                    <PolarGrid gridType={shape} />
                  )}
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#666', fontSize: 12 }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, maxValue]}
                    tick={{ fill: '#666', fontSize: 10 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  {seriesKeys.map((key, idx) => (
                    <Radar
                      key={key}
                      name={seriesNames[idx]}
                      dataKey={key}
                      stroke={COLORS[idx % COLORS.length]}
                      fill={COLORS[idx % COLORS.length]}
                      fillOpacity={fillOpacity}
                      strokeWidth={strokeWidth}
                    />
                  ))}
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Enter data to see the chart
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Statistics */}
      {statistics && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold">Series Statistics</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(statistics).map(([name, stats]) => (
              <div key={name} className="rounded-lg border bg-background p-4 space-y-2">
                <h4 className="font-medium">{name}</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Average:</span>
                  <span className="text-right font-medium">{stats.avg.toFixed(1)}</span>
                  <span className="text-muted-foreground">Max:</span>
                  <span className="text-right font-medium">{stats.max}</span>
                  <span className="text-muted-foreground">Min:</span>
                  <span className="text-right font-medium">{stats.min}</span>
                  <span className="text-muted-foreground">Total:</span>
                  <span className="text-right font-medium">{stats.total.toFixed(1)}</span>
                </div>
              </div>
            ))}
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
                  <th className="p-3 text-left font-medium">Subject</th>
                  {seriesNames.map((name, idx) => (
                    <th key={idx} className="p-3 text-right font-medium">{name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {chartData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-muted/30">
                    <td className="p-3 font-medium">{item.subject}</td>
                    {seriesKeys.map((key, keyIdx) => (
                      <td key={keyIdx} className="p-3 text-right">
                        {(item[key as keyof ChartData] as number)?.toFixed(0) || '-'}
                      </td>
                    ))}
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
