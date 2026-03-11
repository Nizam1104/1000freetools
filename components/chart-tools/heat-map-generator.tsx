"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Download, Trash2, Upload } from "lucide-react"

interface HeatMapData {
  row: string
  col: string
  value: number
}

const COLOR_SCALES = {
  viridis: ['#440154', '#482777', '#3f4a8a', '#31678e', '#26838f', '#1f9d8a', '#6cce5a', '#b6de2b', '#fee825'],
  plasma: ['#0d0887', '#46039f', '#7201a8', '#9c179e', '#bd3786', '#d8576b', '#ed7953', '#fb9f3a', '#fdca26'],
  inferno: ['#000004', '#1b0c41', '#4a0c6b', '#781c6d', '#a52c60', '#cf4446', '#ed6925', '#fb9b06', '#f7d13d'],
  magma: ['#000004', '#140e36', '#3b0f70', '#641a80', '#8c2981', '#b73779', '#e1526e', '#f88759', '#febd2a'],
  blues: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'],
  greens: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'],
  reds: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#99000d', '#67000d'],
  warm: ['#ffffd9', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'],
  cool: ['#f7fcfd', '#e0f3f8', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#005824'],
  diverging: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837'],
}

export default function HeatMapGenerator() {
  const [dataInput, setDataInput] = useState("Mon, 9am, 5\nMon, 10am, 8\nMon, 11am, 12\nMon, 12pm, 15\nMon, 1pm, 10\nMon, 2pm, 7\nMon, 3pm, 4\nTue, 9am, 6\nTue, 10am, 9\nTue, 11am, 14\nTue, 12pm, 18\nTue, 1pm, 11\nTue, 2pm, 8\nTue, 3pm, 5\nWed, 9am, 4\nWed, 10am, 7\nWed, 11am, 10\nWed, 12pm, 13\nWed, 1pm, 9\nWed, 2pm, 6\nWed, 3pm, 3")
  const [chartTitle, setChartTitle] = useState("Activity Heat Map")
  const [colorScale, setColorScale] = useState<'viridis' | 'plasma' | 'inferno' | 'magma' | 'blues' | 'greens' | 'reds' | 'warm' | 'cool' | 'diverging'>('viridis')
  const [showValues, setShowValues] = useState(true)
  const [showLabels, setShowLabels] = useState(true)
  const [cellPadding, setCellPadding] = useState(2)
  const [cornerRadius, setCornerRadius] = useState(2)
  const [copied, setCopied] = useState<string | null>(null)
  const [hoveredCell, setHoveredCell] = useState<{ row: string; col: string; value: number } | null>(null)

  const { chartData, rows, cols, minValue, maxValue } = useMemo(() => {
    const lines = dataInput.split("\n").filter((line) => line.trim())
    const data: HeatMapData[] = []
    const rowSet = new Set<string>()
    const colSet = new Set<string>()
    let min = Infinity
    let max = -Infinity

    lines.forEach((line) => {
      const parts = line.split(",").map(p => p.trim())
      if (parts.length >= 3) {
        const row = parts[0]
        const col = parts[1]
        const value = parseFloat(parts[2]) || 0
        data.push({ row, col, value })
        rowSet.add(row)
        colSet.add(col)
        min = Math.min(min, value)
        max = Math.max(max, value)
      }
    })

    return {
      chartData: data,
      rows: Array.from(rowSet),
      cols: Array.from(colSet),
      minValue: min === Infinity ? 0 : min,
      maxValue: max === -Infinity ? 100 : max,
    }
  }, [dataInput])

  const getColor = useCallback((value: number) => {
    const scale = COLOR_SCALES[colorScale]
    if (maxValue === minValue) return scale[Math.floor(scale.length / 2)]
    const normalized = (value - minValue) / (maxValue - minValue)
    const index = Math.floor(normalized * (scale.length - 1))
    return scale[Math.max(0, Math.min(scale.length - 1, index))]
  }, [colorScale, minValue, maxValue])

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
    alert("Download functionality would export the chart as PNG")
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

  const statistics = useMemo(() => {
    if (chartData.length === 0) return null

    const values = chartData.map(d => d.value)
    const total = values.reduce((a, b) => a + b, 0)
    const mean = total / values.length
    const sorted = [...values].sort((a, b) => a - b)
    const median = sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)]

    return {
      count: values.length,
      total,
      mean: mean.toFixed(2),
      median: median.toFixed(2),
      min: minValue,
      max: maxValue,
    }
  }, [chartData, minValue, maxValue])

  const maxValueInRow = useMemo(() => {
    const max: Record<string, number> = {}
    chartData.forEach(d => {
      max[d.row] = Math.max(max[d.row] || 0, d.value)
    })
    return max
  }, [chartData])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Data Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="data-input" className="text-base font-medium">
            Heat Map Data
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
          placeholder="Row, Column, Value&#10;Mon, 9am, 5&#10;Mon, 10am, 8"
        />
        <p className="text-sm text-muted-foreground">
          Enter data as comma-separated values (row, column, value), one per line
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
            <Label htmlFor="color-scale" className="text-sm">Color Scale</Label>
            <Select value={colorScale} onValueChange={(v) => setColorScale(v as any)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="viridis">Viridis</SelectItem>
                <SelectItem value="plasma">Plasma</SelectItem>
                <SelectItem value="inferno">Inferno</SelectItem>
                <SelectItem value="magma">Magma</SelectItem>
                <SelectItem value="blues">Blues</SelectItem>
                <SelectItem value="greens">Greens</SelectItem>
                <SelectItem value="reds">Reds</SelectItem>
                <SelectItem value="warm">Warm</SelectItem>
                <SelectItem value="cool">Cool</SelectItem>
                <SelectItem value="diverging">Diverging</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cell-padding" className="text-sm">Cell Padding: {cellPadding}px</Label>
            <Input
              id="cell-padding"
              type="number"
              value={cellPadding}
              onChange={(e) => setCellPadding(parseInt(e.target.value) || 0)}
              min={0}
              max={10}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="corner-radius" className="text-sm">Corner Radius: {cornerRadius}px</Label>
            <Input
              id="corner-radius"
              type="number"
              value={cornerRadius}
              onChange={(e) => setCornerRadius(parseInt(e.target.value) || 0)}
              min={0}
              max={20}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="show-values"
              checked={showValues}
              onCheckedChange={setShowValues}
            />
            <Label htmlFor="show-values" className="text-sm cursor-pointer">Show Values</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="show-labels"
              checked={showLabels}
              onCheckedChange={setShowLabels}
            />
            <Label htmlFor="show-labels" className="text-sm cursor-pointer">Show Labels</Label>
          </div>
        </div>

        {/* Color Scale Preview */}
        <div className="space-y-2">
          <Label className="text-sm">Color Scale Preview</Label>
          <div className="flex h-8 rounded-md overflow-hidden">
            {COLOR_SCALES[colorScale].map((color, idx) => (
              <div
                key={idx}
                className="flex-1"
                style={{ backgroundColor: color }}
                title={`${((idx / (COLOR_SCALES[colorScale].length - 1)) * 100).toFixed(0)}%`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{minValue}</span>
            <span>{maxValue}</span>
          </div>
        </div>
      </section>

      {/* Chart Preview */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Heat Map Preview</Label>
          <Button variant="outline" size="sm" onClick={downloadChart}>
            <Download className="size-4 mr-1" />
            Download
          </Button>
        </div>
        <div className="rounded-lg border bg-background p-6">
          <h3 className="text-lg font-semibold text-center mb-4">{chartTitle}</h3>
          
          {hoveredCell && (
            <div className="text-center mb-4 text-sm text-muted-foreground">
              <span className="font-medium">{hoveredCell.row}</span> - {hoveredCell.col}: <span className="font-semibold">{hoveredCell.value}</span>
            </div>
          )}

          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              {rows.length > 0 && cols.length > 0 ? (
                <div className="grid" style={{ 
                  gridTemplateColumns: `auto repeat(${cols.length}, minmax(60px, 1fr))`,
                  gap: '2px'
                }}>
                  {/* Empty corner cell */}
                  <div className="p-2"></div>
                  
                  {/* Column headers */}
                  {showLabels && cols.map((col) => (
                    <div key={col} className="p-2 text-center text-xs font-medium text-muted-foreground rotate-0">
                      {col}
                    </div>
                  ))}
                  
                  {/* Rows */}
                  {rows.map((row) => (
                    <React.Fragment key={row}>
                      {showLabels && (
                        <div className="p-2 text-right text-xs font-medium text-muted-foreground">
                          {row}
                        </div>
                      )}
                      {cols.map((col) => {
                        const cellData = chartData.find(d => d.row === row && d.col === col)
                        const value = cellData?.value ?? 0
                        const color = getColor(value)
                        const isMaxInRow = maxValueInRow[row] === value && value > 0

                        return (
                          <div
                            key={`${row}-${col}`}
                            className="relative flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
                            style={{
                              backgroundColor: cellData ? color : 'transparent',
                              borderRadius: `${cornerRadius}px`,
                              margin: `${cellPadding}px`,
                              aspectRatio: '1',
                              minWidth: '40px',
                            }}
                            onMouseEnter={() => cellData && setHoveredCell(cellData)}
                            onMouseLeave={() => setHoveredCell(null)}
                            title={`${row} - ${col}: ${value}`}
                          >
                            {showValues && cellData && (
                              <span className={`text-xs font-medium ${
                                value > (maxValue - minValue) / 2 + minValue ? 'text-white' : 'text-foreground'
                              }`}>
                                {value}
                              </span>
                            )}
                          </div>
                        )
                      })}
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Enter data to see the heat map
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      {statistics && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold">Statistics</h3>
          <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Data Points</p>
              <p className="text-2xl font-semibold">{statistics.count}</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-semibold">{statistics.total}</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Mean</p>
              <p className="text-2xl font-semibold">{statistics.mean}</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Median</p>
              <p className="text-2xl font-semibold">{statistics.median}</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Min</p>
              <p className="text-2xl font-semibold">{statistics.min}</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Max</p>
              <p className="text-2xl font-semibold">{statistics.max}</p>
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
                  <th className="p-3 text-left font-medium">Row</th>
                  <th className="p-3 text-left font-medium">Column</th>
                  <th className="p-3 text-right font-medium">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {chartData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-muted/30">
                    <td className="p-3 font-medium">{item.row}</td>
                    <td className="p-3">{item.col}</td>
                    <td className="p-3 text-right font-medium">{item.value}</td>
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
