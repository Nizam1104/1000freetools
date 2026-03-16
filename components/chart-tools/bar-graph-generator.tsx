"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Copy, Check, Download, Trash2, Upload, Plus, Minus } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"

interface ChartData {
  name: string
  value: number
  value2?: number
  value3?: number
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFC658", "#FF6B6B", "#4CAF50", "#E91E63"]

export default function BarGraphGenerator() {
  const [dataInput, setDataInput] = useState("January, 4000, 2400, 1000\nFebruary, 3000, 1398, 800\nMarch, 5000, 9800, 2000\nApril, 2780, 3908, 1500\nMay, 1890, 4800, 2500\nJune, 2390, 3800, 1800")
  const [chartTitle, setChartTitle] = useState("Monthly Sales Report")
  const [xAxisLabel, setXAxisLabel] = useState("Month")
  const [yAxisLabel, setYAxisLabel] = useState("Sales ($)")
  const [isHorizontal, setIsHorizontal] = useState(false)
  const [isGrouped, setIsGrouped] = useState(true)
  const [showValues, setShowValues] = useState(true)
  const [showGrid, setShowGrid] = useState(true)
  const [barSize, setBarSize] = useState(40)
  const [barGap, setBarGap] = useState(4)
  const [copied, setCopied] = useState<string | null>(null)

  const chartData = useMemo((): ChartData[] => {
    const lines = dataInput.split("\n").filter((line) => line.trim())
    return lines.map((line) => {
      const parts = line.split(",").map(p => p.trim())
      const name = parts[0] || "Unknown"
      const value = parseFloat(parts[1]) || 0
      const value2 = parts[2] ? parseFloat(parts[2]) : undefined
      const value3 = parts[3] ? parseFloat(parts[3]) : undefined
      return { name, value, value2, value3 }
    }).filter((d) => d.value > 0 || (d.value2 && d.value2 > 0) || (d.value3 && d.value3 > 0))
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

  const renderBars = () => {
    const dataKeys = ['value']
    if (chartData.some(d => d.value2)) dataKeys.push('value2')
    if (chartData.some(d => d.value3)) dataKeys.push('value3')

    const labels = [xAxisLabel, 'Series 2', 'Series 3']

    return dataKeys.map((key, idx) => (
      <Bar
        key={key}
        dataKey={key}
        name={labels[idx]}
        fill={COLORS[idx % COLORS.length]}
        barSize={barSize}
        label={showValues ? {
          position: isHorizontal ? 'right' : 'top',
          formatter: (value: number) => value.toLocaleString()
        } : undefined}
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[idx % COLORS.length]} />
        ))}
      </Bar>
    ))
  }

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
          placeholder="Label, Value1, Value2, Value3&#10;January, 4000, 2400, 1000&#10;February, 3000, 1398, 800"
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
            <Label htmlFor="bar-size" className="text-sm">Bar Size: {barSize}px</Label>
            <Slider
              id="bar-size"
              value={[barSize]}
              onValueChange={(v) => setBarSize(v[0])}
              min={10}
              max={100}
              step={1}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bar-gap" className="text-sm">Bar Gap: {barGap}px</Label>
            <Slider
              id="bar-gap"
              value={[barGap]}
              onValueChange={(v) => setBarGap(v[0])}
              min={0}
              max={20}
              step={1}
            />
          </div>
          <div className="flex items-center gap-2 pt-6">
            <Switch
              id="is-horizontal"
              checked={isHorizontal}
              onCheckedChange={setIsHorizontal}
            />
            <Label htmlFor="is-horizontal" className="text-sm cursor-pointer">Horizontal Bars</Label>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <Switch
              id="is-grouped"
              checked={isGrouped}
              onCheckedChange={setIsGrouped}
            />
            <Label htmlFor="is-grouped" className="text-sm cursor-pointer">Grouped Bars</Label>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <Switch
              id="show-values"
              checked={showValues}
              onCheckedChange={setShowValues}
            />
            <Label htmlFor="show-values" className="text-sm cursor-pointer">Show Values</Label>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <Switch
              id="show-grid"
              checked={showGrid}
              onCheckedChange={setShowGrid}
            />
            <Label htmlFor="show-grid" className="text-sm cursor-pointer">Show Grid</Label>
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
                <BarChart
                  data={chartData}
                  layout={isHorizontal ? "vertical" : "horizontal"}
                  barGap={barGap}
                >
                  {showGrid && <CartesianGrid strokeDasharray="3 3" />}
                  <XAxis type="number" label={{ value: yAxisLabel, position: 'insideTop', angle: -90, offset: 0 }} />
                  <YAxis type="category" dataKey="name" label={{ value: xAxisLabel, position: 'insideBottom', offset: -5 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  {renderBars()}
                </BarChart>
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
                  {chartData.some(d => d.value2) && <th className="p-3 text-right font-medium">Series 2</th>}
                  {chartData.some(d => d.value3) && <th className="p-3 text-right font-medium">Series 3</th>}
                </tr>
              </thead>
              <tbody className="divide-y">
                {chartData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-muted/30">
                    <td className="p-3 font-medium">{item.name}</td>
                    <td className="p-3 text-right">{item.value.toLocaleString()}</td>
                    {item.value2 !== undefined && <td className="p-3 text-right">{item.value2.toLocaleString()}</td>}
                    {item.value3 !== undefined && <td className="p-3 text-right">{item.value3.toLocaleString()}</td>}
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
