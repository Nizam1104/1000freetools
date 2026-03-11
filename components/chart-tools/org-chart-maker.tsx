"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Download, Trash2, Plus, Upload, User, Image as ImageIcon } from "lucide-react"

interface OrgNode {
  id: string
  name: string
  title: string
  email?: string
  photo?: string
  parentId: string | null
  color: string
  children: OrgNode[]
}

interface FlatOrgData {
  id: string
  name: string
  title: string
  email?: string
  parentId?: string
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFC658", "#FF6B6B"]

export default function OrgChartMaker() {
  const [chartTitle, setChartTitle] = useState("Organization Chart")
  const [nodes, setNodes] = useState<OrgNode[]>([
    {
      id: "1", name: "John Smith", title: "CEO", email: "john@company.com", parentId: null, color: COLORS[0],
      children: [
        {
          id: "2", name: "Sarah Johnson", title: "CTO", email: "sarah@company.com", parentId: "1", color: COLORS[1],
          children: [
            { id: "4", name: "Mike Brown", title: "Dev Lead", email: "mike@company.com", parentId: "2", color: COLORS[3], children: [] },
            { id: "5", name: "Emily Davis", title: "QA Lead", email: "emily@company.com", parentId: "2", color: COLORS[3], children: [] },
          ]
        },
        {
          id: "3", name: "David Wilson", title: "CFO", email: "david@company.com", parentId: "1", color: COLORS[2],
          children: [
            { id: "6", name: "Lisa Anderson", title: "Accountant", email: "lisa@company.com", parentId: "3", color: COLORS[4], children: [] },
          ]
        },
      ]
    }
  ])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [layout, setLayout] = useState<'vertical' | 'horizontal'>('vertical')
  const [showEmail, setShowEmail] = useState(true)
  const [showPhoto, setShowPhoto] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [csvInput, setCsvInput] = useState("id,name,title,email,parentId\n1,John Smith,CEO,john@company.com,\n2,Sarah Johnson,CTO,sarah@company.com,1\n3,David Wilson,CFO,david@company.com,1")

  const addNode = useCallback((parentId: string | null) => {
    const newNode: OrgNode = {
      id: Date.now().toString(),
      name: "New Employee",
      title: "Position",
      email: "",
      parentId,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      children: []
    }

    const addRecursive = (node: OrgNode): OrgNode => {
      if (node.id === parentId) {
        return { ...node, children: [...node.children, newNode] }
      }
      return { ...node, children: node.children.map(addRecursive) }
    }

    if (parentId === null) {
      setNodes(prev => [...prev, newNode])
    } else {
      setNodes(prev => prev.map(addRecursive))
    }
    setSelectedId(newNode.id)
  }, [])

  const removeNode = useCallback((id: string) => {
    const removeRecursive = (node: OrgNode): OrgNode | null => {
      if (node.id === id) return null
      return { ...node, children: node.children.flatMap(child => {
        const result = removeRecursive(child)
        return result ? [result] : []
      })}
    }
    setNodes(prev => prev.flatMap(node => {
      const result = removeRecursive(node)
      return result ? [result] : []
    }))
    if (selectedId === id) setSelectedId(null)
  }, [selectedId])

  const updateNode = useCallback((id: string, updates: Partial<OrgNode>) => {
    const updateRecursive = (node: OrgNode): OrgNode => {
      if (node.id === id) {
        return { ...node, ...updates }
      }
      return { ...node, children: node.children.map(updateRecursive) }
    }
    setNodes(prev => prev.map(updateRecursive))
  }, [])

  const findNode = useCallback((id: string): OrgNode | null => {
    const findRecursive = (node: OrgNode): OrgNode | null => {
      if (node.id === id) return node
      for (const child of node.children) {
        const found = findRecursive(child)
        if (found) return found
      }
      return null
    }
    for (const node of nodes) {
      const found = findRecursive(node)
      if (found) return found
    }
    return null
  }, [nodes])

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
    alert("Download functionality would export the org chart as PNG/PDF/HTML")
  }, [])

  const importCSV = useCallback(() => {
    const lines = csvInput.split("\n").filter(l => l.trim())
    if (lines.length < 2) return

    const headers = lines[0].split(",").map(h => h.trim())
    const data: FlatOrgData[] = lines.slice(1).map(line => {
      const values = line.split(",")
      const obj: Record<string, string> = {}
      headers.forEach((h, i) => obj[h] = values[i]?.trim() || "")
      return obj as unknown as FlatOrgData
    })

    // Build tree from flat data
    const nodeMap: Record<string, OrgNode> = {}
    data.forEach(d => {
      nodeMap[d.id] = {
        id: d.id,
        name: d.name,
        title: d.title,
        email: d.email,
        parentId: d.parentId || null,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        children: []
      }
    })

    const roots: OrgNode[] = []
    Object.values(nodeMap).forEach(node => {
      if (node.parentId && nodeMap[node.parentId]) {
        nodeMap[node.parentId].children.push(node)
      } else {
        roots.push(node)
      }
    })

    setNodes(roots)
  }, [csvInput])

  const exportCSV = useCallback(() => {
    const flatten = (node: OrgNode, rows: string[] = []) => {
      rows.push(`${node.id},${node.name},${node.title},${node.email || ''},${node.parentId || ''}`)
      node.children.forEach(child => flatten(child, rows))
      return rows
    }
    const headers = "id,name,title,email,parentId"
    const rows = nodes.flatMap(n => flatten(n)).join("\n")
    copyToClipboard(`${headers}\n${rows}`, "csv")
  }, [nodes, copyToClipboard])

  const totalEmployees = useMemo(() => {
    const count = (node: OrgNode): number => 1 + node.children.reduce((sum, c) => sum + count(c), 0)
    return nodes.reduce((sum, n) => sum + count(n), 0)
  }, [nodes])

  const maxDepth = useMemo(() => {
    const depth = (node: OrgNode): number => 1 + (node.children.length === 0 ? 0 : Math.max(...node.children.map(depth)))
    return nodes.length > 0 ? Math.max(...nodes.map(depth)) : 0
  }, [nodes])

  const selectedNode = selectedId ? findNode(selectedId) : null

  // Render org chart node
  const renderNode = (node: OrgNode, level: number = 0) => {
    const hasChildren = node.children.length > 0

    return (
      <div key={node.id} className={`flex ${layout === 'vertical' ? 'flex-col items-center' : 'flex-row items-center'}`}>
        <div
          className={`
            relative p-4 rounded-lg border-2 cursor-pointer transition-all
            ${selectedId === node.id ? 'border-primary ring-2 ring-primary/20' : 'border-muted'}
            hover:shadow-lg
          `}
          style={{ backgroundColor: `${node.color}20`, borderColor: node.color }}
          onClick={() => setSelectedId(node.id)}
        >
          <div className="flex items-center gap-3">
            {showPhoto && (
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                {node.photo ? (
                  <img src={node.photo} alt={node.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="size-5 text-muted-foreground" />
                )}
              </div>
            )}
            <div>
              <p className="font-semibold text-sm">{node.name}</p>
              <p className="text-xs text-muted-foreground">{node.title}</p>
              {showEmail && node.email && (
                <p className="text-xs text-muted-foreground">{node.email}</p>
              )}
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="xs"
              onClick={(e) => { e.stopPropagation(); addNode(node.id) }}
              className="h-6 w-6 p-0"
            >
              <Plus className="size-3" />
            </Button>
            {node.parentId !== null && (
              <Button
                variant="ghost"
                size="xs"
                onClick={(e) => { e.stopPropagation(); removeNode(node.id) }}
                className="h-6 w-6 p-0 text-destructive"
              >
                <Trash2 className="size-3" />
              </Button>
            )}
          </div>
        </div>

        {/* Children */}
        {hasChildren && (
          <>
            {layout === 'vertical' ? (
              <>
                <div className="w-px h-8 bg-border"></div>
                <div className="flex gap-8">
                  {node.children.length > 1 && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 h-8 w-[calc(100%-4rem)] border-t border-border"></div>
                  )}
                  {node.children.map(child => renderNode(child, level + 1))}
                </div>
              </>
            ) : (
              <>
                <div className="h-px w-8 bg-border"></div>
                <div className="flex flex-col gap-4">
                  {node.children.map(child => renderNode(child, level + 1))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="chart-title" className="text-base font-medium">Organization Chart</Label>
            <Input
              id="chart-title"
              value={chartTitle}
              onChange={(e) => setChartTitle(e.target.value)}
              placeholder="Enter chart title"
              className="max-w-md"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={exportCSV}>
              <Copy className="size-4 mr-1" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={downloadChart}>
              <Download className="size-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </section>

      {/* Options */}
      <section className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Layout:</span>
            <Button
              variant={layout === 'vertical' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLayout('vertical')}
            >
              Vertical
            </Button>
            <Button
              variant={layout === 'horizontal' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLayout('horizontal')}
            >
              Horizontal
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="show-email"
              checked={showEmail}
              onCheckedChange={setShowEmail}
            />
            <Label htmlFor="show-email" className="text-sm cursor-pointer">Show Email</Label>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="show-photo"
              checked={showPhoto}
              onCheckedChange={setShowPhoto}
            />
            <Label htmlFor="show-photo" className="text-sm cursor-pointer">Show Photo</Label>
          </div>

          <Button variant="outline" size="sm" onClick={() => addNode(null)}>
            <Plus className="size-4 mr-1" />
            Add Root
          </Button>
        </div>
      </section>

      {/* Import CSV */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Import from CSV</Label>
          <Button variant="outline" size="sm" onClick={importCSV}>
            <Upload className="size-4 mr-1" />
            Import
          </Button>
        </div>
        <Textarea
          value={csvInput}
          onChange={(e) => setCsvInput(e.target.value)}
          className="font-mono text-sm min-h-[100px]"
          placeholder="id,name,title,email,parentId&#10;1,John Smith,CEO,john@company.com,"
        />
        <p className="text-sm text-muted-foreground">
          Format: id, name, title, email, parentId (leave empty for root nodes)
        </p>
      </section>

      {/* Org Chart Preview */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Chart Preview</Label>
        <div className="rounded-lg border bg-background p-8 overflow-x-auto">
          <h3 className="text-lg font-semibold text-center mb-8">{chartTitle}</h3>
          <div className={`flex ${layout === 'vertical' ? 'flex-col items-center' : 'flex-row items-start'} gap-8 min-w-max`}>
            {nodes.map(node => renderNode(node))}
          </div>
        </div>
      </section>

      {/* Properties Panel */}
      {selectedNode && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Edit Node</Label>
            <Button variant="ghost" size="sm" onClick={() => removeNode(selectedNode.id)}>
              <Trash2 className="size-4 mr-1" />
              Delete
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded-lg border bg-background p-4">
            <div className="space-y-2">
              <Label htmlFor="node-name" className="text-sm">Name</Label>
              <Input
                id="node-name"
                value={selectedNode.name}
                onChange={(e) => updateNode(selectedNode.id, { name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="node-title" className="text-sm">Title</Label>
              <Input
                id="node-title"
                value={selectedNode.title}
                onChange={(e) => updateNode(selectedNode.id, { title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="node-email" className="text-sm">Email</Label>
              <Input
                id="node-email"
                value={selectedNode.email}
                onChange={(e) => updateNode(selectedNode.id, { email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="node-color" className="text-sm">Color</Label>
              <Input
                id="node-color"
                type="color"
                value={selectedNode.color}
                onChange={(e) => updateNode(selectedNode.id, { color: e.target.value })}
                className="w-full h-9"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => addNode(selectedNode.id)}>
              <Plus className="size-4 mr-1" />
              Add Subordinate
            </Button>
          </div>
        </section>
      )}

      {/* Summary */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Summary</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-lg border bg-background p-4">
            <p className="text-sm text-muted-foreground">Total Employees</p>
            <p className="text-2xl font-semibold">{totalEmployees}</p>
          </div>
          <div className="rounded-lg border bg-background p-4">
            <p className="text-sm text-muted-foreground">Organization Depth</p>
            <p className="text-2xl font-semibold">{maxDepth} levels</p>
          </div>
          <div className="rounded-lg border bg-background p-4">
            <p className="text-sm text-muted-foreground">Top Level Executives</p>
            <p className="text-2xl font-semibold">{nodes.length}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
