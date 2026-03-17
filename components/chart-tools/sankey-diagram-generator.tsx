"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy, Check, Download, Trash2, Info } from "lucide-react"
import { ResponsiveContainer, Sankey, Tooltip, Legend } from "recharts"

interface SankeyData {
  name: string
}

interface SankeyLink {
  source: number
  target: number
  value: number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: any[]
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFC658", "#FF6B6B", "#4ECDC4", "#95E1D3"]

export default function SankeyDiagramGenerator() {
  const [dataInput, setDataInput] = useState("Source A, Target B, 50\nSource A, Target C, 30\nSource B, Target D, 40\nTarget B, Target E, 25\nTarget C, Target E, 35")
  const [chartTitle, setChartTitle] = useState("Sankey Flow Diagram")
  const [nodeWidth, setNodeWidth] = useState(20)
  const [linkOpacity, setLinkOpacity] = useState(0.5)
  const [showLabels, setShowLabels] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { nodes, links } = useMemo(() => {
    const nodeMap = new Map<string, number>()
    const nodesList: SankeyData[] = []
    const linksList: SankeyLink[] = []

    const lines = dataInput.split("\n").filter((line) => line.trim())
    
    for (const line of lines) {
      const parts = line.split(",").map(p => p.trim())
      if (parts.length < 3) continue

      const source = parts[0]
      const target = parts[1]
      const value = parseFloat(parts[2]) || 0

      if (!nodeMap.has(source)) {
        nodeMap.set(source, nodesList.length)
        nodesList.push({ name: source })
      }
      if (!nodeMap.has(target)) {
        nodeMap.set(target, nodesList.length)
        nodesList.push({ name: target })
      }

      linksList.push({
        source: nodeMap.get(source)!,
        target: nodeMap.get(target)!,
        value,
      })
    }

    return { nodes: nodesList, links: linksList }
  }, [dataInput])

  const totalFlow = useMemo(() => {
    return links.reduce((sum, link) => sum + link.value, 0)
  }, [links])

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

  const handleClear = useCallback(() => {
    setDataInput("")
    setError(null)
  }, [])

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="rounded-lg border bg-background p-3 shadow-lg">
          <p className="font-medium">{data.name || `Flow: ${data.value}`}</p>
          {data.value && (
            <p className="text-sm text-muted-foreground">
              Value: {data.value}
            </p>
          )}
          {data.source && data.target && (
            <>
              <p className="text-sm text-muted-foreground">
                From: {nodes[data.source]?.name}
              </p>
              <p className="text-sm text-muted-foreground">
                To: {nodes[data.target]?.name}
              </p>
            </>
          )}
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
            Flow Data
          </Label>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="xs" onClick={() => copyToClipboard(dataInput, "input")} className="h-7">
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button variant="ghost" size="xs" onClick={handleClear} className="h-7">
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
          placeholder="Source, Target, Value&#10;A, B, 50&#10;A, C, 30&#10;B, D, 40"
        />
        <p className="text-sm text-muted-foreground">
          Enter flow data as comma-separated values (source, target, value), one per line
        </p>
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
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
            <Label htmlFor="node-width" className="text-sm">Node Width</Label>
            <Input
              id="node-width"
              type="number"
              value={nodeWidth}
              onChange={(e) => setNodeWidth(Number(e.target.value))}
              min={5}
              max={50}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="link-opacity" className="text-sm">Link Opacity</Label>
            <Input
              id="link-opacity"
              type="number"
              value={linkOpacity}
              onChange={(e) => setLinkOpacity(Number(e.target.value))}
              min={0.1}
              max={1}
              step={0.1}
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
        </div>
      </section>

      {/* Chart Preview */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Diagram Preview</Label>
          <Button variant="outline" size="sm" onClick={downloadChart}>
            <Download className="size-4 mr-1" />
            Download
          </Button>
        </div>
        <div className="rounded-lg border bg-background p-6">
          <h3 className="text-lg font-semibold text-center mb-4">{chartTitle}</h3>
          <div className="h-[400px]">
            {nodes.length > 0 && links.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <Sankey data={{ nodes, links }}>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </Sankey>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Enter flow data to see the Sankey diagram
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Data Summary */}
      {links.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold">Flow Summary</h3>
          <div className="rounded-lg border bg-background divide-y">
            {links.map((link, idx) => (
              <div key={idx} className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  />
                  <span className="font-medium text-sm">
                    {nodes[link.source]?.name} → {nodes[link.target]?.name}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-medium">{link.value}</p>
                  <p className="text-xs text-muted-foreground">
                    {((link.value / totalFlow) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between p-3 bg-muted/50">
              <span className="font-semibold">Total Flow</span>
              <span className="font-semibold">{totalFlow}</span>
            </div>
          </div>
        </section>
      )}

      {/* Node Summary */}
      {nodes.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold">Nodes ({nodes.length})</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {nodes.map((node, idx) => {
              const incoming = links.filter(l => l.target === idx).reduce((s, l) => s + l.value, 0)
              const outgoing = links.filter(l => l.source === idx).reduce((s, l) => s + l.value, 0)
              return (
                <div key={idx} className="rounded-lg border bg-background p-3">
                  <p className="font-medium">{node.name}</p>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>In: {incoming}</span>
                    <span>Out: {outgoing}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Sankey Diagrams</h4>
            <p className="text-sm text-muted-foreground">
              Sankey diagrams visualize flows and transfers between nodes. The width of each link 
              is proportional to the flow quantity. They are commonly used for energy flow, 
              material flow, cost breakdown, and website traffic analysis.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
