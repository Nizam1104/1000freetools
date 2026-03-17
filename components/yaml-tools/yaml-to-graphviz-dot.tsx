"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Network } from "lucide-react"

export function YamlToGraphvizDot() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [graphType, setGraphType] = useState<"digraph" | "graph">("digraph")
  const [graphName, setGraphName] = useState("YamlGraph")
  const [showValues, setShowValues] = useState(true)
  const [rankdir, setRankdir] = useState<"TB" | "LR" | "BT" | "RL">("TB")

  const parseYamlToGraph = useCallback((yaml: string): { nodes: Set<string>; edges: Array<[string, string, string]> } => {
    const lines = yaml.split('\n')
    const nodes = new Set<string>()
    const edges: Array<[string, string, string]> = []
    const stack: { name: string; indent: number }[] = []

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('-')) continue

      const indent = line.search(/\S/)

      if (trimmed.includes(':')) {
        const colonIndex = trimmed.indexOf(':')
        const key = trimmed.substring(0, colonIndex).trim()
        const value = trimmed.substring(colonIndex + 1).trim()

        // Pop stack until we find the right parent
        while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
          stack.pop()
        }

        const parentNode = stack.length > 0 ? stack[stack.length - 1].name : graphName
        const currentNode = key

        nodes.add(parentNode)
        nodes.add(currentNode)

        if (value) {
          // Leaf node with value
          if (showValues) {
            edges.push([currentNode, `"${value}"`, ''])
          }
        } else {
          // Parent node
          edges.push([parentNode, currentNode, ''])
          stack.push({ name: currentNode, indent })
        }
      }
    }

    return { nodes, edges }
  }, [graphName, showValues])

  const convertToDot = useCallback((yaml: string): string => {
    const { nodes, edges } = parseYamlToGraph(yaml)
    
    const lines: string[] = []
    lines.push(`${graphType} ${graphName} {`)
    lines.push(`  rankdir=${rankdir};`)
    lines.push('')
    lines.push('  // Node definitions')
    
    nodes.forEach(node => {
      const nodeId = node.replace(/[^a-zA-Z0-9_]/g, '_')
      const label = node === graphName ? graphName : node
      lines.push(`  ${nodeId} [label="${label}"];`)
    })
    
    lines.push('')
    lines.push('  // Edges')
    
    edges.forEach(([from, to, label]) => {
      const fromId = from.replace(/[^a-zA-Z0-9_]/g, '_')
      const toId = to.replace(/[^a-zA-Z0-9_]/g, '_')
      const edgeLabel = label ? ` [label="${label}"]` : ''
      lines.push(`  ${fromId} -> ${toId}${edgeLabel};`)
    })
    
    lines.push('}')
    
    return lines.join('\n')
  }, [parseYamlToGraph, graphType, graphName, rankdir])

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }
    const dot = convertToDot(input)
    setOutput(dot)
  }, [input, convertToDot])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setInput("")
    setOutput("")
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "graph.dot"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput(`database:
  host: localhost
  port: 5432
  credentials:
    username: admin
    password: secret
    
application:
  name: MyApp
  version: 1.0.0`)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">YAML to Graphviz DOT</h2>
            <p className="text-sm text-muted-foreground">
              Convert YAML structure to Graphviz DOT format for visualization
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Label>Graph Type:</Label>
          <Button
            variant={graphType === "digraph" ? "default" : "outline"}
            size="sm"
            onClick={() => setGraphType("digraph")}
          >
            Directed
          </Button>
          <Button
            variant={graphType === "graph" ? "default" : "outline"}
            size="sm"
            onClick={() => setGraphType("graph")}
          >
            Undirected
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Label>Graph Name:</Label>
          <input
            type="text"
            value={graphName}
            onChange={(e) => setGraphName(e.target.value)}
            className="border rounded px-2 py-1 text-sm w-32"
          />
        </div>

        <div className="flex items-center gap-2">
          <Label>Direction:</Label>
          <select
            value={rankdir}
            onChange={(e) => setRankdir(e.target.value as any)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="TB">Top to Bottom</option>
            <option value="LR">Left to Right</option>
            <option value="BT">Bottom to Top</option>
            <option value="RL">Right to Left</option>
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={showValues}
            onChange={(e) => setShowValues(e.target.checked)}
            className="rounded border-gray-300"
          />
          Show Values
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">YAML Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your YAML structure here..."
            className="min-h-[500px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleConvert} className="flex-1" disabled={!input}>
              <Network className="h-4 w-4 mr-2" />
              Generate DOT
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Graphviz DOT</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="DOT format will appear here..."
            className="min-h-[500px] font-mono text-sm bg-muted"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleCopy} disabled={!output} className="flex-1">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button variant="outline" onClick={handleDownload} disabled={!output} title="Download">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">How to Use</h3>
        <p className="text-sm text-muted-foreground">
          Copy the DOT output and use it with Graphviz tools like <code className="bg-background px-1 rounded">dot</code>, <code className="bg-background px-1 rounded">neato</code>, or online viewers like edotor.net
        </p>
      </div>
    </div>
  )
}
