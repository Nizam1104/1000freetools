"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Copy, Check, Download, Trash2 } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface ChartData {
  name: string
  value: number
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFC658", "#FF6B6B"]

export default function PieChartMaker() {
  const [dataInput, setDataInput] = useState("Category A, 35\nCategory B, 25\nCategory C, 20\nCategory D, 15\nCategory E, 5")
  const [chartTitle, setChartTitle] = useState("Sample Pie Chart")
  const [showLabels, setShowLabels] = useState(true)
  const [showLegend, setShowLegend] = useState(true)
  const [donutHole, setDonutHole] = useState(0)
  const [copied, setCopied] = useState<string | null>(null)

  const chartData = useMemo((): ChartData[] => {
    const lines = dataInput.split("\n").filter((line) => line.trim())
    return lines.map((line) => {
      const parts = line.split(",")
      const name = parts[0]?.trim() || "Unknown"
      const value = parseFloat(parts[1]) || 0
      return { name, value }
    }).filter((d) => d.value > 0)
  }, [dataInput])

  const total = useMemo(() => {
    return chartData.reduce((sum, d) => sum + d.value, 0)
  }, [chartData])

  const chartDataWithPercent = useMemo(() => {
    return chartData.map((d) => ({
      ...d,
      percent: ((d.value / total) * 100).toFixed(1),
    }))
  }, [chartData, total])

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
    // In a real implementation, you would use a library like html-to-image
    alert("Download functionality would export the chart as PNG/SVG")
  }, [])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="rounded-lg border bg-background p-3 shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            Value: {data.value} ({data.percent}%)
          </p>
        </div>
      )
    }
    return null
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
          placeholder="Label, Value&#10;Category A, 35&#10;Category B, 25"
        />
        <p className="text-sm text-muted-foreground">
          Enter data as comma-separated values (label, value), one per line
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
            <Label htmlFor="donut-hole" className="text-sm">Donut Hole Size</Label>
            <Input
              id="donut-hole"
              type="number"
              value={donutHole}
              onChange={(e) => setDonutHole(Number(e.target.value))}
              min={0}
              max={80}
            />
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="show-labels"
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="show-labels" className="text-sm cursor-pointer">Show Labels</Label>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="show-legend"
              checked={showLegend}
              onChange={(e) => setShowLegend(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="show-legend" className="text-sm cursor-pointer">Show Legend</Label>
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
                <PieChart>
                  <Pie
                    data={chartDataWithPercent}
                    cx="50%"
                    cy="50%"
                    innerRadius={donutHole}
                    outerRadius="80%"
                    paddingAngle={2}
                    dataKey="value"
                    label={showLabels ? ((entry) => `${entry.name}: ${entry.percent}%`) : undefined}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  {showLegend && <Legend />}
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
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
          <div className="rounded-lg border bg-background divide-y">
            {chartDataWithPercent.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  />
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">{item.value}</p>
                  <p className="text-xs text-muted-foreground">{item.percent}%</p>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between p-3 bg-muted/50">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">{total}</span>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
