"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Copy, Check, Download, Trash2, Upload, ChevronDown, ChevronUp } from "lucide-react"

interface SunburstNode {
  id: string
  name: string
  value: number
  color: string
  children?: SunburstNode[]
  depth: number
}

interface FlatNode {
  id: string
  name: string
  parent: string
  value: number
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFC658", "#FF6B6B", "#4CAF50", "#E91E63", "#9C27B0", "#3F51B5"]

export default function SunburstChartCreator() {
  const [jsonInput, setJsonInput] = useState(JSON.stringify({
    name: "Root",
    children: [
      {
        name: "Category A",
        children: [
          { name: "Sub A1", value: 30 },
          { name: "Sub A2", value: 25 },
          { name: "Sub A3", value: 20 }
        ]
      },
      {
        name: "Category B",
        children: [
          { name: "Sub B1", value: 35 },
          { name: "Sub B2", value: 15 }
        ]
      },
      {
        name: "Category C",
        value: 40
      }
    ]
  }, null, 2))
  const [chartTitle, setChartTitle] = useState("Sunburst Chart")
  const [innerRadius, setInnerRadius] = useState(50)
  const [outerRadius, setOuterRadius] = useState(180)
  const [showLabels, setShowLabels] = useState(true)
  const [showValues, setShowValues] = useState(true)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const treeData = useMemo((): SunburstNode | null => {
    try {
      const parsed = JSON.parse(jsonInput)
      
      const buildTree = (node: any, depth: number = 0): SunburstNode => {
        const children = node.children?.map((child: any) => buildTree(child, depth + 1))
        const value = node.value || (children?.reduce((sum: number, c: any) => sum + c.value, 0) || 0)
        
        return {
          id: `${depth}-${node.name}-${Math.random().toString(36).substr(2, 9)}`,
          name: node.name,
          value,
          color: COLORS[depth % COLORS.length],
          children: children?.length ? children : undefined,
          depth
        }
      }
      
      return buildTree(parsed)
    } catch (e) {
      return null
    }
  }, [jsonInput])

  const flattenNodes = useMemo(() => {
    const nodes: SunburstNode[] = []
    
    const traverse = (node: SunburstNode) => {
      nodes.push(node)
      node.children?.forEach(traverse)
    }
    
    if (treeData) traverse(treeData)
    return nodes
  }, [treeData])

  const totalValue = useMemo(() => {
    return treeData?.value || 0
  }, [treeData])

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
      setJsonInput(content)
    }
    reader.readAsText(file)
  }, [])

  const loadSample = useCallback((type: 'simple' | 'complex') => {
    if (type === 'simple') {
      setJsonInput(JSON.stringify({
        name: "Products",
        children: [
          {
            name: "Electronics",
            children: [
              { name: "Phones", value: 45 },
              { name: "Laptops", value: 35 },
              { name: "Tablets", value: 20 }
            ]
          },
          {
            name: "Clothing",
            children: [
              { name: "Men", value: 30 },
              { name: "Women", value: 40 },
              { name: "Kids", value: 25 }
            ]
          }
        ]
      }, null, 2))
    } else {
      setJsonInput(JSON.stringify({
        name: "Company",
        children: [
          {
            name: "Sales",
            children: [
              {
                name: "North",
                children: [
                  { name: "Enterprise", value: 150 },
                  { name: "SMB", value: 80 }
                ]
              },
              {
                name: "South",
                children: [
                  { name: "Enterprise", value: 120 },
                  { name: "SMB", value: 60 }
                ]
              }
            ]
          },
          {
            name: "Marketing",
            children: [
              { name: "Digital", value: 100 },
              { name: "Traditional", value: 50 }
            ]
          },
          {
            name: "Support",
            value: 75
          }
        ]
      }, null, 2))
    }
  }, [])

  // Generate arc path for a segment
  const getArcPath = (
    innerR: number,
    outerR: number,
    startAngle: number,
    endAngle: number,
    cx: number,
    cy: number
  ) => {
    const start1 = {
      x: cx + innerR * Math.cos(startAngle),
      y: cy + innerR * Math.sin(startAngle)
    }
    const end1 = {
      x: cx + innerR * Math.cos(endAngle),
      y: cy + innerR * Math.sin(endAngle)
    }
    const start2 = {
      x: cx + outerR * Math.cos(startAngle),
      y: cy + outerR * Math.sin(startAngle)
    }
    const end2 = {
      x: cx + outerR * Math.cos(endAngle),
      y: cy + outerR * Math.sin(endAngle)
    }

    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0

    return `M ${start1.x} ${start1.y}
            A ${innerR} ${innerR} 0 ${largeArc} 1 ${end1.x} ${end1.y}
            L ${end2.x} ${end2.y}
            A ${outerR} ${outerR} 0 ${largeArc} 0 ${start2.x} ${start2.y}
            Z`
  }

  // Calculate node positions for sunburst
  const getNodeSegments = useCallback((node: SunburstNode, startAngle: number, endAngle: number, depth: number) => {
    const segments: { node: SunburstNode; startAngle: number; endAngle: number }[] = []
    
    const totalValue = node.value
    let currentAngle = startAngle
    
    segments.push({ node, startAngle, endAngle })
    
    if (node.children) {
      node.children.forEach(child => {
        const childAngle = ((child.value / totalValue) || 0) * (endAngle - startAngle)
        segments.push(...getNodeSegments(child, currentAngle, currentAngle + childAngle, depth + 1))
        currentAngle += childAngle
      })
    }
    
    return segments
  }, [])

  const segments = useMemo(() => {
    if (!treeData) return []
    return getNodeSegments(treeData, -Math.PI / 2, 3 * Math.PI / 2, 0)
  }, [treeData, getNodeSegments])

  const selectedNodeData = useMemo(() => {
    return flattenNodes.find(n => n.id === selectedNode)
  }, [flattenNodes, selectedNode])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="chart-title" className="text-base font-medium">Sunburst Chart</Label>
            <Input
              id="chart-title"
              value={chartTitle}
              onChange={(e) => setChartTitle(e.target.value)}
              placeholder="Enter chart title"
              className="max-w-md"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => loadSample('simple')}>
              Sample Simple
            </Button>
            <Button variant="outline" size="sm" onClick={() => loadSample('complex')}>
              Sample Complex
            </Button>
            <Button variant="outline" size="sm" onClick={downloadChart}>
              <Download className="size-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </section>

      {/* JSON Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="json-input" className="text-base font-medium">
            Hierarchical Data (JSON)
          </Label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              id="file-upload"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button variant="ghost" size="xs" onClick={() => document.getElementById('file-upload')?.click()} className="h-7">
              <Upload className="size-3.5 mr-1" />
              <span className="text-xs">Import</span>
            </Button>
            <Button variant="ghost" size="xs" onClick={() => copyToClipboard(jsonInput, "input")} className="h-7">
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>
        </div>
        <Textarea
          id="json-input"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="font-mono text-sm min-h-[200px]"
          placeholder='{"name": "Root", "children": [...]}'
        />
        <p className="text-sm text-muted-foreground">
          Enter hierarchical data in JSON format. Each node can have a "value" and/or "children" array.
        </p>
      </section>

      {/* Options */}
      <section className="space-y-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="inner-radius" className="text-sm">Inner Radius: {innerRadius}px</Label>
            <Slider
              id="inner-radius"
              value={[innerRadius]}
              onValueChange={(v) => setInnerRadius(v[0])}
              min={0}
              max={150}
              step={5}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="outer-radius" className="text-sm">Outer Radius: {outerRadius}px</Label>
            <Slider
              id="outer-radius"
              value={[outerRadius]}
              onValueChange={(v) => setOuterRadius(v[0])}
              min={100}
              max={250}
              step={10}
            />
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
          {selectedNodeData && (
            <Button variant="ghost" size="xs" onClick={() => setSelectedNode(null)}>
              Clear Selection
            </Button>
          )}
        </div>
        <div className="rounded-lg border bg-background p-6">
          <h3 className="text-lg font-semibold text-center mb-4">{chartTitle}</h3>
          <div className="h-[500px] flex items-center justify-center">
            {treeData ? (
              <svg viewBox="0 0 500 500" className="w-full h-full max-w-[500px]">
                <g transform="translate(250, 250)">
                  {segments.map(({ node, startAngle, endAngle }) => {
                    const midAngle = (startAngle + endAngle) / 2
                    const labelRadius = innerRadius + (outerRadius - innerRadius) / 2 / (node.depth + 1)
                    const labelX = labelRadius * Math.cos(midAngle)
                    const labelY = labelRadius * Math.sin(midAngle)
                    const percent = ((node.value / totalValue) * 100).toFixed(1)

                    return (
                      <g
                        key={node.id}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setSelectedNode(node.id)}
                      >
                        <path
                          d={getArcPath(
                            innerRadius + node.depth * 30,
                            innerRadius + (node.depth + 1) * 30,
                            startAngle,
                            endAngle,
                            0,
                            0
                          )}
                          fill={node.color}
                          stroke="#fff"
                          strokeWidth={1}
                        />
                        {showLabels && endAngle - startAngle > 0.3 && (
                          <text
                            x={labelX}
                            y={labelY}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-xs fill-white font-medium pointer-events-none"
                            transform={`rotate(${midAngle * 180 / Math.PI + 90}, ${labelX}, ${labelY})`}
                          >
                            {node.name.length > 15 ? node.name.substring(0, 12) + '...' : node.name}
                          </text>
                        )}
                        {showValues && endAngle - startAngle > 0.5 && (
                          <text
                            x={labelX}
                            y={labelY + 12}
                            textAnchor="middle"
                            className="text-xs fill-white/80 pointer-events-none"
                            transform={`rotate(${midAngle * 180 / Math.PI + 90}, ${labelX}, ${labelY + 12})`}
                          >
                            {node.value}
                          </text>
                        )}
                      </g>
                    )
                  })}
                </g>
              </svg>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Enter valid JSON to see the sunburst chart
              </div>
            )}
          </div>
          {selectedNodeData && (
            <div className="mt-4 p-4 rounded-lg border bg-muted">
              <p className="font-medium">Selected: {selectedNodeData.name}</p>
              <p className="text-sm text-muted-foreground">
                Value: {selectedNodeData.value} ({((selectedNodeData.value / totalValue) * 100).toFixed(1)}%)
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Hierarchy View */}
      {treeData && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold">Hierarchy View</h3>
          <div className="rounded-lg border bg-background overflow-hidden">
            <HierarchyView node={treeData} totalValue={totalValue} onSelect={setSelectedNode} selectedId={selectedNode} />
          </div>
        </section>
      )}
    </div>
  )
}

// Recursive hierarchy view component
function HierarchyView({ 
  node, 
  totalValue, 
  onSelect, 
  selectedId,
  level = 0 
}: { 
  node: SunburstNode
  totalValue: number
  onSelect: (id: string | null) => void
  selectedId: string | null
  level?: number
}) {
  const [expanded, setExpanded] = useState(true)
  const hasChildren = node.children && node.children.length > 0
  const percent = ((node.value / totalValue) * 100).toFixed(1)

  return (
    <div>
      <div
        className={`flex items-center gap-2 p-2 hover:bg-muted/50 cursor-pointer ${selectedId === node.id ? 'bg-primary/10' : ''}`}
        style={{ paddingLeft: `${level * 20 + 8}px` }}
        onClick={() => onSelect(node.id)}
      >
        {hasChildren && (
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded) }}
            className="p-1 hover:bg-muted rounded"
          >
            {expanded ? <ChevronDown className="size-4" /> : <ChevronUp className="size-4" />}
          </button>
        )}
        {!hasChildren && <div className="w-6" />}
        <div className="w-3 h-3 rounded" style={{ backgroundColor: node.color }} />
        <span className="font-medium flex-1">{node.name}</span>
        <span className="text-sm text-muted-foreground">{node.value}</span>
        <span className="text-xs text-muted-foreground">({percent}%)</span>
      </div>
      {expanded && hasChildren && (
        <div>
          {node.children!.map(child => (
            <HierarchyView
              key={child.id}
              node={child}
              totalValue={totalValue}
              onSelect={onSelect}
              selectedId={selectedId}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
