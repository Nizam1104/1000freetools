"use client"

import * as React from "react"
import { useState, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Download, Trash2, Plus, Move, Type, Square, Diamond, Circle, ArrowRight, Undo, Redo } from "lucide-react"

interface FlowchartNode {
  id: string
  type: 'rectangle' | 'diamond' | 'circle' | 'ellipse' | 'parallelogram'
  x: number
  y: number
  width: number
  height: number
  text: string
  fill: string
  stroke: string
}

interface FlowchartConnection {
  id: string
  from: string
  to: string
  label?: string
}

const SHAPE_TEMPLATES = {
  rectangle: { width: 120, height: 60, fill: '#ffffff', stroke: '#000000' },
  diamond: { width: 100, height: 80, fill: '#ffffff', stroke: '#000000' },
  circle: { width: 80, height: 80, fill: '#ffffff', stroke: '#000000' },
  ellipse: { width: 120, height: 70, fill: '#ffffff', stroke: '#000000' },
  parallelogram: { width: 120, height: 60, fill: '#ffffff', stroke: '#000000' },
}

const TEMPLATES = {
  basic: [
    { type: 'ellipse', text: 'Start', x: 250, y: 30 },
    { type: 'parallelogram', text: 'Input Data', x: 250, y: 120 },
    { type: 'rectangle', text: 'Process', x: 250, y: 220 },
    { type: 'diamond', text: 'Decision?', x: 250, y: 320 },
    { type: 'rectangle', text: 'Action A', x: 100, y: 420 },
    { type: 'rectangle', text: 'Action B', x: 400, y: 420 },
    { type: 'ellipse', text: 'End', x: 250, y: 520 },
  ],
  process: [
    { type: 'ellipse', text: 'Start', x: 50, y: 150 },
    { type: 'rectangle', text: 'Step 1', x: 180, y: 150 },
    { type: 'rectangle', text: 'Step 2', x: 310, y: 150 },
    { type: 'rectangle', text: 'Step 3', x: 440, y: 150 },
    { type: 'ellipse', text: 'End', x: 570, y: 150 },
  ],
  decision: [
    { type: 'ellipse', text: 'Start', x: 250, y: 30 },
    { type: 'diamond', text: 'Condition?', x: 250, y: 120 },
    { type: 'rectangle', text: 'Yes Path', x: 100, y: 240 },
    { type: 'rectangle', text: 'No Path', x: 400, y: 240 },
    { type: 'ellipse', text: 'End', x: 250, y: 360 },
  ],
}

export default function FlowchartCreator() {
  const [nodes, setNodes] = useState<FlowchartNode[]>([])
  const [connections, setConnections] = useState<FlowchartConnection[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null)
  const [chartTitle, setChartTitle] = useState("Flowchart")
  const [copied, setCopied] = useState<string | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const addNode = useCallback((type: FlowchartNode['type']) => {
    const template = SHAPE_TEMPLATES[type]
    const newNode: FlowchartNode = {
      id: Date.now().toString(),
      type,
      x: 100 + nodes.length * 20,
      y: 100 + nodes.length * 20,
      width: template.width,
      height: template.height,
      text: 'New Node',
      fill: template.fill,
      stroke: template.stroke,
    }
    setNodes(prev => [...prev, newNode])
    setSelectedId(newNode.id)
  }, [nodes.length])

  const removeNode = useCallback((id: string) => {
    setNodes(prev => prev.filter(n => n.id !== id))
    setConnections(prev => prev.filter(c => c.from !== id && c.to !== id))
    if (selectedId === id) setSelectedId(null)
  }, [selectedId])

  const updateNode = useCallback((id: string, updates: Partial<FlowchartNode>) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n))
  }, [])

  const addConnection = useCallback((from: string, to: string) => {
    if (from === to) return
    const exists = connections.some(c => c.from === from && c.to === to)
    if (exists) return

    const newConnection: FlowchartConnection = {
      id: Date.now().toString(),
      from,
      to,
    }
    setConnections(prev => [...prev, newConnection])
  }, [connections])

  const removeConnection = useCallback((id: string) => {
    setConnections(prev => prev.filter(c => c.id !== id))
  }, [])

  const loadTemplate = useCallback((templateName: keyof typeof TEMPLATES) => {
    const template = TEMPLATES[templateName]
    const newNodes: FlowchartNode[] = template.map((t, idx) => ({
      id: `template-${idx}`,
      type: t.type as FlowchartNode['type'],
      x: t.x,
      y: t.y,
      ...SHAPE_TEMPLATES[t.type as keyof typeof SHAPE_TEMPLATES],
      text: t.text,
    }))
    setNodes(newNodes)

    // Create default connections
    const newConnections: FlowchartConnection[] = []
    for (let i = 0; i < newNodes.length - 1; i++) {
      newConnections.push({
        id: `conn-${i}`,
        from: newNodes[i].id,
        to: newNodes[i + 1].id,
      })
    }
    setConnections(newConnections)
  }, [])

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
    alert("Download functionality would export the flowchart as PNG/SVG/PDF")
  }, [])

  const exportJSON = useCallback(() => {
    const data = JSON.stringify({ nodes, connections }, null, 2)
    copyToClipboard(data, "json")
  }, [nodes, connections, copyToClipboard])

  const handleMouseDown = useCallback((e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation()
    if (connectingFrom) {
      addConnection(connectingFrom, nodeId)
      setConnectingFrom(null)
      return
    }

    const node = nodes.find(n => n.id === nodeId)
    if (!node) return

    setSelectedId(nodeId)
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - node.x,
      y: e.clientY - node.y,
    })
  }, [nodes, connectingFrom, addConnection])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !selectedId) return

    const svg = svgRef.current
    if (!svg) return

    const rect = svg.getBoundingClientRect()
    const x = e.clientX - rect.left - dragOffset.x
    const y = e.clientY - rect.top - dragOffset.y

    updateNode(selectedId, { x: Math.max(0, x), y: Math.max(0, y) })
  }, [isDragging, selectedId, dragOffset, updateNode])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleCanvasClick = useCallback(() => {
    if (connectingFrom) {
      setConnectingFrom(null)
    }
  }, [connectingFrom])

  const getShapePath = (node: FlowchartNode) => {
    const { x, y, width, height, type } = node
    const cx = x + width / 2
    const cy = y + height / 2

    switch (type) {
      case 'rectangle':
        return `M ${x} ${y} L ${x + width} ${y} L ${x + width} ${y + height} L ${x} ${y + height} Z`
      case 'diamond':
        return `M ${cx} ${y} L ${x + width} ${cy} L ${cx} ${y + height} L ${x} ${cy} Z`
      case 'circle':
        return `M ${cx} ${cy} m -${width/2}, 0 a ${width/2},${height/2} 0 1,0 ${width},0 a ${width/2},${height/2} 0 1,0 -${width},0`
      case 'ellipse':
        return `M ${cx} ${cy} m -${width/2}, 0 a ${width/2},${height/2} 0 1,0 ${width},0 a ${width/2},${height/2} 0 1,0 -${width},0`
      case 'parallelogram':
        const offset = width * 0.15
        return `M ${x + offset} ${y} L ${x + width} ${y} L ${x + width - offset} ${y + height} L ${x} ${y + height} Z`
      default:
        return `M ${x} ${y} L ${x + width} ${y} L ${x + width} ${y + height} L ${x} ${y + height} Z`
    }
  }

  const getConnectionPath = (from: FlowchartNode, to: FlowchartNode) => {
    const fromCx = from.x + from.width / 2
    const fromCy = from.y + from.height / 2
    const toCx = to.x + to.width / 2
    const toCy = to.y + to.height / 2

    // Simple straight line
    return `M ${fromCx} ${fromCy} L ${toCx} ${toCy}`
  }

  const selectedNode = nodes.find(n => n.id === selectedId)

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="chart-title" className="text-base font-medium">Flowchart</Label>
            <Input
              id="chart-title"
              value={chartTitle}
              onChange={(e) => setChartTitle(e.target.value)}
              placeholder="Enter chart title"
              className="max-w-md"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={exportJSON}>
              <Copy className="size-4 mr-1" />
              Export JSON
            </Button>
            <Button variant="outline" size="sm" onClick={downloadChart}>
              <Download className="size-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <section className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Add Shape:</span>
            <Button variant="outline" size="sm" onClick={() => addNode('rectangle')} title="Rectangle">
              <Square className="size-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => addNode('diamond')} title="Diamond">
              <Diamond className="size-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => addNode('circle')} title="Circle">
              <Circle className="size-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => addNode('ellipse')} title="Ellipse">
              <span className="text-xs">⬭</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => addNode('parallelogram')} title="Parallelogram">
              <span className="text-xs">▱</span>
            </Button>
          </div>

          <div className="h-6 w-px bg-border"></div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Templates:</span>
            <Select onValueChange={loadTemplate}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic Flow</SelectItem>
                <SelectItem value="process">Process</SelectItem>
                <SelectItem value="decision">Decision</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="h-6 w-px bg-border"></div>

          {connectingFrom ? (
            <Button variant="destructive" size="sm" onClick={() => setConnectingFrom(null)}>
              Cancel Connection
            </Button>
          ) : (
            <span className="text-sm text-muted-foreground">Click a node, then click another to connect</span>
          )}
        </div>
      </section>

      {/* Canvas */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Canvas</Label>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Move className="size-4" />
            <span>Drag nodes to move • Click two nodes to connect</span>
          </div>
        </div>
        <div className="rounded-lg border bg-background overflow-hidden">
          <svg
            ref={svgRef}
            className="w-full h-[500px] cursor-crosshair"
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Grid pattern */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e5e5" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Connections */}
            {connections.map((conn) => {
              const fromNode = nodes.find(n => n.id === conn.from)
              const toNode = nodes.find(n => n.id === conn.to)
              if (!fromNode || !toNode) return null

              return (
                <g key={conn.id}>
                  <path
                    d={getConnectionPath(fromNode, toNode)}
                    stroke="#666"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrowhead)"
                  />
                  {conn.label && (
                    <text
                      x={(fromNode.x + fromNode.width / 2 + toNode.x + toNode.width / 2) / 2}
                      y={(fromNode.y + fromNode.height / 2 + toNode.y + toNode.height / 2) / 2}
                      textAnchor="middle"
                      className="text-xs fill-muted-foreground bg-background"
                    >
                      {conn.label}
                    </text>
                  )}
                </g>
              )
            })}

            {/* Arrow marker */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
              </marker>
            </defs>

            {/* Nodes */}
            {nodes.map((node) => (
              <g
                key={node.id}
                onMouseDown={(e) => handleMouseDown(e, node.id)}
                className="cursor-move"
              >
                <path
                  d={getShapePath(node)}
                  fill={node.fill}
                  stroke={selectedId === node.id ? '#0088FE' : node.stroke}
                  strokeWidth={selectedId === node.id ? 3 : 2}
                  className="transition-colors"
                />
                <text
                  x={node.x + node.width / 2}
                  y={node.y + node.height / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-sm fill-foreground pointer-events-none select-none"
                  style={{ fontSize: Math.min(14, node.width / 8) }}
                >
                  {node.text}
                </text>
                {connectingFrom === node.id && (
                  <circle
                    cx={node.x + node.width / 2}
                    cy={node.y + node.height / 2}
                    r={Math.max(node.width, node.height) / 1.5}
                    fill="none"
                    stroke="#0088FE"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    className="animate-pulse"
                  />
                )}
              </g>
            ))}
          </svg>
        </div>
      </section>

      {/* Properties Panel */}
      {selectedNode && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Node Properties</Label>
            <Button variant="ghost" size="sm" onClick={() => removeNode(selectedNode.id)}>
              <Trash2 className="size-4 mr-1" />
              Delete Node
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded-lg border bg-background p-4">
            <div className="space-y-2">
              <Label htmlFor="node-text" className="text-sm">Text</Label>
              <Input
                id="node-text"
                value={selectedNode.text}
                onChange={(e) => updateNode(selectedNode.id, { text: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="node-fill" className="text-sm">Fill Color</Label>
              <Input
                id="node-fill"
                type="color"
                value={selectedNode.fill}
                onChange={(e) => updateNode(selectedNode.id, { fill: e.target.value })}
                className="w-full h-9"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="node-stroke" className="text-sm">Border Color</Label>
              <Input
                id="node-stroke"
                type="color"
                value={selectedNode.stroke}
                onChange={(e) => updateNode(selectedNode.id, { stroke: e.target.value })}
                className="w-full h-9"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="node-type" className="text-sm">Shape</Label>
              <Select
                value={selectedNode.type}
                onValueChange={(v) => updateNode(selectedNode.id, { type: v as FlowchartNode['type'] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rectangle">Rectangle</SelectItem>
                  <SelectItem value="diamond">Diamond</SelectItem>
                  <SelectItem value="circle">Circle</SelectItem>
                  <SelectItem value="ellipse">Ellipse</SelectItem>
                  <SelectItem value="parallelogram">Parallelogram</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>
      )}

      {/* Connections List */}
      {connections.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold">Connections</h3>
          <div className="rounded-lg border bg-background overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-3 text-left font-medium">From</th>
                  <th className="p-3 text-left font-medium">To</th>
                  <th className="p-3 text-left font-medium">Label</th>
                  <th className="p-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {connections.map((conn) => {
                  const fromNode = nodes.find(n => n.id === conn.from)
                  const toNode = nodes.find(n => n.id === conn.to)
                  return (
                    <tr key={conn.id} className="hover:bg-muted/30">
                      <td className="p-3">{fromNode?.text || 'Unknown'}</td>
                      <td className="p-3">{toNode?.text || 'Unknown'}</td>
                      <td className="p-3">
                        <Input
                          value={conn.label || ''}
                          onChange={(e) => {
                            setConnections(prev => prev.map(c =>
                              c.id === conn.id ? { ...c, label: e.target.value } : c
                            ))
                          }}
                          placeholder="Add label..."
                          className="w-32"
                        />
                      </td>
                      <td className="p-3 text-right">
                        <Button variant="ghost" size="xs" onClick={() => removeConnection(conn.id)}>
                          <Trash2 className="size-3.5" />
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Nodes List */}
      {nodes.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold">Nodes ({nodes.length})</h3>
          <div className="rounded-lg border bg-background overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-3 text-left font-medium">Shape</th>
                  <th className="p-3 text-left font-medium">Text</th>
                  <th className="p-3 text-right font-medium">Position</th>
                  <th className="p-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {nodes.map((node) => (
                  <tr key={node.id} className="hover:bg-muted/30">
                    <td className="p-3">
                      <span className="text-lg">
                        {node.type === 'rectangle' && '▢'}
                        {node.type === 'diamond' && '◇'}
                        {node.type === 'circle' && '○'}
                        {node.type === 'ellipse' && '⬭'}
                        {node.type === 'parallelogram' && '▱'}
                      </span>
                    </td>
                    <td className="p-3">{node.text}</td>
                    <td className="p-3 text-right text-sm text-muted-foreground">
                      ({Math.round(node.x)}, {Math.round(node.y)})
                    </td>
                    <td className="p-3 text-right">
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => {
                          setSelectedId(node.id)
                          setConnectingFrom(node.id)
                        }}
                      >
                        <ArrowRight className="size-3.5" />
                      </Button>
                      <Button variant="ghost" size="xs" onClick={() => removeNode(node.id)}>
                        <Trash2 className="size-3.5" />
                      </Button>
                    </td>
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
