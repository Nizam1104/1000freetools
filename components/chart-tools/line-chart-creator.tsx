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
import { Copy, Check, Download, Trash2, Upload, Plus } from "lucide-react"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, ReferenceDot } from "recharts"

interface ChartData {
  name: string
  series1: number
  series2?: number
  series3?: number
}

interface Annotation {
  id: string
  label: string
  value: number
  axis: 'x' | 'y'
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFC658", "#FF6B6B"]
const STROKE_DASHARRAYS = ["0 0", "5 5", "10 10", "3 3", "15 15"]

export default function LineChartCreator() {
  const [dataInput, setDataInput] = useState("Jan, 4000, 2400\nFeb, 3000, 1398\nMar, 5000, 9800\nApr, 2780, 3908\nMay, 1890, 4800\nJun, 2390, 3800\nJul, 3490, 4300")
  const [chartTitle, setChartTitle] = useState("Monthly Performance")
  const [xAxisLabel, setXAxisLabel] = useState("Month")
  const [yAxisLabel, setYAxisLabel] = useState("Value")
  const [chartType, setChartType] = useState<'line' | 'area'>('line')
  const [showMarkers, setShowMarkers] = useState(true)
  const [showGrid, setShowGrid] = useState(true)
  const [showArea, setShowArea] = useState(false)
  const [lineWidth, setLineWidth] = useState(3)
  const [fillOpacity, setFillOpacity] = useState(0.3)
  const [isTimeSeries, setIsTimeSeries] = useState(false)
  const [annotations, setAnnotations] = useState<Annotation[]>([])
  const [copied, setCopied] = useState<string | null>(null)

  const chartData = useMemo((): ChartData[] => {
    const lines = dataInput.split("\n").filter((line) => line.trim())
    return lines.map((line) => {
      const parts = line.split(",").map(p => p.trim())
      const name = parts[0] || "Unknown"
      const series1 = parseFloat(parts[1]) || 0
      const series2 = parts[2] ? parseFloat(parts[2]) : undefined
      const series3 = parts[3] ? parseFloat(parts[3]) : undefined
      return { name, series1, series2, series3 }
    }).filter((d) => d.series1 > 0 || (d.series2 && d.series2 > 0) || (d.series3 && d.series3 > 0))
  }, [dataInput])

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
    alert("Download functionality would export the chart as PNG/SVG/HTML")
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
              const values = Object.values(item).slice(1).join(', ')
              return `${Object.values(item)[0]}, ${values}`
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

  const addAnnotation = useCallback(() => {
    const newAnnotation: Annotation = {
      id: Date.now().toString(),
      label: 'New Annotation',
      value: 0,
      axis: 'y'
    }
    setAnnotations(prev => [...prev, newAnnotation])
  }, [])

  const removeAnnotation = useCallback((id: string) => {
    setAnnotations(prev => prev.filter(a => a.id !== id))
  }, [])

  const updateAnnotation = useCallback((id: string, updates: Partial<Annotation>) => {
    setAnnotations(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a))
  }, [])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-3 shadow-lg">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((p: any, idx: number) => (
            <p key={idx} className="text-sm" style={{ color: p.color }}>
              {p.name}: {p.value.toLocaleString()}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const renderLines = () => {
    const dataKeys = ['series1']
    if (chartData.some(d => d.series2)) dataKeys.push('series2')
    if (chartData.some(d => d.series3)) dataKeys.push('series3')

    const labels = ['Series 1', 'Series 2', 'Series 3']

    return dataKeys.map((key, idx) => (
      chartType === 'area' || showArea ? (
        <Area
          key={key}
          type="monotone"
          dataKey={key}
          name={labels[idx]}
          stroke={COLORS[idx % COLORS.length]}
          fill={COLORS[idx % COLORS.length]}
          fillOpacity={fillOpacity}
          strokeWidth={lineWidth}
          dot={showMarkers ? { r: 4 } : false}
        />
      ) : (
        <Line
          key={key}
          type="monotone"
          dataKey={key}
          name={labels[idx]}
          stroke={COLORS[idx % COLORS.length]}
          strokeWidth={lineWidth}
          dot={showMarkers ? { r: 4 } : false}
          activeDot={{ r: 6 }}
        />
      )
    ))
  }

  const renderAnnotations = () => {
    return annotations.map((annotation) => (
      annotation.axis === 'y' ? (
        <ReferenceLine
          key={annotation.id}
          y={annotation.value}
          stroke="#666"
          strokeDasharray="5 5"
          label={{ value: annotation.label, position: 'right', fill: '#666' }}
        />
      ) : (
        <ReferenceLine
          key={annotation.id}
          x={annotation.value}
          stroke="#666"
          strokeDasharray="5 5"
          label={{ value: annotation.label, angle: -90, position: 'top', fill: '#666' }}
        />
      )
    ))
  }

  const ChartComponent = chartType === 'area' || showArea ? AreaChart : LineChart

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
          placeholder="Label, Value1, Value2, Value3&#10;Jan, 4000, 2400&#10;Feb, 3000, 1398"
        />
        <p className="text-sm text-muted-foreground">
          Enter data as comma-separated values (label, value1, value2, value3), one per line
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
            <Label htmlFor="chart-type" className="text-sm">Chart Type</Label>
            <Select value={chartType} onValueChange={(v) => setChartType(v as 'line' | 'area')}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="line">Line Chart</SelectItem>
                <SelectItem value="area">Area Chart</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="line-width" className="text-sm">Line Width: {lineWidth}px</Label>
            <Slider
              id="line-width"
              value={[lineWidth]}
              onValueChange={(v) => setLineWidth(v[0])}
              min={1}
              max={10}
              step={0.5}
            />
          </div>
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
          <div className="flex items-center gap-2 pt-6">
            <Switch
              id="show-markers"
              checked={showMarkers}
              onCheckedChange={setShowMarkers}
            />
            <Label htmlFor="show-markers" className="text-sm cursor-pointer">Show Markers</Label>
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
              id="is-time-series"
              checked={isTimeSeries}
              onCheckedChange={setIsTimeSeries}
            />
            <Label htmlFor="is-time-series" className="text-sm cursor-pointer">Time Series</Label>
          </div>
        </div>
      </section>

      {/* Annotations */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Annotations</Label>
          <Button variant="outline" size="sm" onClick={addAnnotation}>
            <Plus className="size-4 mr-1" />
            Add Annotation
          </Button>
        </div>
        {annotations.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {annotations.map((annotation) => (
              <div key={annotation.id} className="flex items-center gap-2 p-3 rounded-lg border">
                <Input
                  value={annotation.label}
                  onChange={(e) => updateAnnotation(annotation.id, { label: e.target.value })}
                  placeholder="Label"
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={annotation.value}
                  onChange={(e) => updateAnnotation(annotation.id, { value: parseFloat(e.target.value) || 0 })}
                  placeholder="Value"
                  className="w-20"
                />
                <Select value={annotation.axis} onValueChange={(v) => updateAnnotation(annotation.id, { axis: v as 'x' | 'y' })}>
                  <SelectTrigger className="w-16">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="x">X</SelectItem>
                    <SelectItem value="y">Y</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="xs" onClick={() => removeAnnotation(annotation.id)}>
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            ))}
          </div>
        )}
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
                <ChartComponent data={chartData}>
                  {showGrid && <CartesianGrid strokeDasharray="3 3" />}
                  <XAxis 
                    dataKey="name" 
                    label={{ value: xAxisLabel, position: 'insideBottom', offset: -5 }}
                    type={isTimeSeries ? 'category' : undefined}
                  />
                  <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  {renderLines()}
                  {renderAnnotations()}
                </ChartComponent>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Enter data to see the chart
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Data Summary */}
      {chartData.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold">Data Summary</h3>
          <div className="rounded-lg border bg-background overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-3 text-left font-medium">{xAxisLabel}</th>
                  <th className="p-3 text-right font-medium">Series 1</th>
                  {chartData.some(d => d.series2) && <th className="p-3 text-right font-medium">Series 2</th>}
                  {chartData.some(d => d.series3) && <th className="p-3 text-right font-medium">Series 3</th>}
                </tr>
              </thead>
              <tbody className="divide-y">
                {chartData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-muted/30">
                    <td className="p-3 font-medium">{item.name}</td>
                    <td className="p-3 text-right">{item.series1.toLocaleString()}</td>
                    {item.series2 !== undefined && <td className="p-3 text-right">{item.series2.toLocaleString()}</td>}
                    {item.series3 !== undefined && <td className="p-3 text-right">{item.series3.toLocaleString()}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Embed Code */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Embed Code</Label>
          <Button variant="ghost" size="xs" onClick={() => copyToClipboard(getEmbedCode(), "embed")} className="h-7">
            {copied === "embed" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            <span className="text-xs">Copy</span>
          </Button>
        </div>
        <Textarea
          readOnly
          value={getEmbedCode()}
          className="font-mono text-xs min-h-[80px]"
        />
      </section>
    </div>
  )

  function getEmbedCode() {
    return `<iframe src="your-chart-url" width="100%" height="400" frameborder="0"></iframe>`
  }
}
