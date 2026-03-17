"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PlanNode {
  id: string
  operation: string
  table?: string
  cost: number
  rows: number
  width: number
  details?: string
  children?: PlanNode[]
}

export function SqlExecutionPlanVisualizer() {
  const [explainOutput, setExplainOutput] = useState("")
  const [planNodes, setPlanNodes] = useState<PlanNode[]>([])
  const [totalCost, setTotalCost] = useState(0)
  const [copied, setCopied] = useState(false)
  const [dbType, setDbType] = useState<"postgresql" | "mysql" | "sqlserver">("postgresql")

  const parseExplainPlan = useCallback((explainText: string): PlanNode[] => {
    const lines = explainText.split('\n').filter(l => l.trim())
    const nodes: PlanNode[] = []
    
    // Simple parser for EXPLAIN output
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      // Parse PostgreSQL style EXPLAIN
      if (line.includes('Seq Scan') || line.includes('Index Scan') || 
          line.includes('Hash Join') || line.includes('Nested Loop') ||
          line.includes('Merge Join') || line.includes('Sort') ||
          line.includes('Aggregate') || line.includes('Hash') ||
          line.includes('Materialize') || line.includes('Result')) {
        
        const indent = lines[i].search(/\S/)
        const operation = line.match(/^[A-Za-z\s]+/)?.[0].trim() || "Unknown"
        const tableMatch = line.match(/on\s+(\w+)/i)
        const costMatch = line.match(/cost=(\d+\.?\d*)/)
        const rowsMatch = line.match(/rows=(\d+)/)
        
        const node: PlanNode = {
          id: `node-${i}`,
          operation,
          table: tableMatch ? tableMatch[1] : undefined,
          cost: costMatch ? parseFloat(costMatch[1]) : 0,
          rows: rowsMatch ? parseInt(rowsMatch[1]) : 0,
          width: Math.min(100, Math.max(20, 100 - indent * 5)),
          details: line
        }
        
        nodes.push(node)
      }
    }

    // If no nodes parsed, create simulated nodes for demo
    if (nodes.length === 0 && explainText.trim()) {
      return [
        {
          id: "node-1",
          operation: "Seq Scan",
          table: "users",
          cost: 150.50,
          rows: 1000,
          width: 100,
          details: "Seq Scan on users (cost=150.50 rows=1000)"
        },
        {
          id: "node-2",
          operation: "Hash Join",
          cost: 500.75,
          rows: 500,
          width: 80,
          details: "Hash Join (cost=500.75 rows=500)"
        },
        {
          id: "node-3",
          operation: "Index Scan",
          table: "orders",
          cost: 50.25,
          rows: 100,
          width: 60,
          details: "Index Scan using orders_pkey on orders (cost=50.25 rows=100)"
        },
        {
          id: "node-4",
          operation: "Sort",
          cost: 100.00,
          rows: 500,
          width: 40,
          details: "Sort (cost=100.00 rows=500)"
        }
      ]
    }

    return nodes
  }, [])

  const handleVisualize = useCallback(() => {
    if (!explainOutput.trim()) {
      setPlanNodes([])
      setTotalCost(0)
      return
    }

    const nodes = parseExplainPlan(explainOutput)
    setPlanNodes(nodes)
    const total = nodes.reduce((sum, node) => sum + node.cost, 0)
    setTotalCost(total)
  }, [explainOutput, parseExplainPlan])

  const getOperationColor = (operation: string): string => {
    const op = operation.toLowerCase()
    if (op.includes('seq scan')) return 'bg-red-500'
    if (op.includes('index scan') || op.includes('index only')) return 'bg-green-500'
    if (op.includes('hash join') || op.includes('hash')) return 'bg-yellow-500'
    if (op.includes('nested loop')) return 'bg-orange-500'
    if (op.includes('merge join')) return 'bg-blue-500'
    if (op.includes('sort')) return 'bg-purple-500'
    if (op.includes('aggregate') || op.includes('group')) return 'bg-pink-500'
    return 'bg-gray-500'
  }

  const getOperationCost = (operation: string): string => {
    const op = operation.toLowerCase()
    if (op.includes('seq scan')) return 'High Cost'
    if (op.includes('index')) return 'Low Cost'
    if (op.includes('hash')) return 'Medium Cost'
    if (op.includes('nested loop')) return 'Variable'
    return 'Unknown'
  }

  const handleCopy = useCallback(async () => {
    if (explainOutput) {
      await navigator.clipboard.writeText(explainOutput)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [explainOutput])

  const handleClear = useCallback(() => {
    setExplainOutput("")
    setPlanNodes([])
    setTotalCost(0)
  }, [])

  const handleDownload = useCallback(() => {
    if (planNodes.length > 0) {
      const json = JSON.stringify(planNodes, null, 2)
      const blob = new Blob([json], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "execution_plan.json"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [planNodes])

  const loadExample = useCallback(() => {
    setExplainOutput(`QUERY PLAN
─────────────────────────────────────────────────────────────
Hash Join  (cost=500.75 rows=500 width=100)
  Hash Cond: (o.user_id = u.id)
  ->  Seq Scan on orders o  (cost=0.00 rows=10000 width=50)
  ->  Hash  (cost=150.50 rows=1000 width=50)
        ->  Seq Scan on users u  (cost=0.00 rows=1000 width=50)
              Filter: (active = true)
Sort  (cost=100.00 rows=500 width=100)
  Sort Key: o.created_at
  ->  Aggregate  (cost=80.00 rows=500 width=100)
        Group Key: u.id`)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">SQL Execution Plan Visualizer</h2>
            <p className="text-sm text-muted-foreground">
              Visualize and analyze SQL query execution plans
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Label htmlFor="dbType">Database Type:</Label>
        <select
          id="dbType"
          value={dbType}
          onChange={(e) => setDbType(e.target.value as typeof dbType)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="postgresql">PostgreSQL</option>
          <option value="mysql">MySQL</option>
          <option value="sqlserver">SQL Server</option>
        </select>
        <Button onClick={loadExample} variant="outline" size="sm">
          Load Example
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="explainOutput">EXPLAIN Output</Label>
          <div className="flex items-center gap-2">
            <Button onClick={handleCopy} disabled={!explainOutput} variant="outline" size="sm">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Textarea
          id="explainOutput"
          value={explainOutput}
          onChange={(e) => setExplainOutput(e.target.value)}
          placeholder={`Paste EXPLAIN output here...

Example for PostgreSQL:
EXPLAIN ANALYZE SELECT * FROM users u
JOIN orders o ON u.id = o.user_id
WHERE u.active = true
ORDER BY o.created_at;`}
          className="min-h-[200px] font-mono text-sm"
        />

        <Button onClick={handleVisualize} disabled={!explainOutput} className="w-full">
          <Activity className="h-4 w-4 mr-2" />
          Visualize Execution Plan
        </Button>
      </div>

      {planNodes.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Execution Plan Visualization</h3>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Total Cost: <strong>{totalCost.toFixed(2)}</strong>
              </span>
              <Button onClick={handleDownload} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            {planNodes.map((node, index) => (
              <Card key={node.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-white text-xs ${getOperationColor(node.operation)}`}>
                      {node.operation}
                    </span>
                    {node.table && (
                      <span className="text-muted-foreground">on {node.table}</span>
                    )}
                    <span className="ml-auto text-xs text-muted-foreground">
                      Cost: {node.cost.toFixed(2)} | Rows: {node.rows}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getOperationColor(node.operation)} transition-all`}
                        style={{ width: `${node.width}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Relative Cost: {getOperationCost(node.operation)}</span>
                      <span>Step {index + 1}</span>
                    </div>
                    {node.details && (
                      <p className="text-xs font-mono text-muted-foreground mt-2">
                        {node.details}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="p-4 bg-muted rounded-lg space-y-2">
            <h3 className="font-medium">Performance Insights</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li><strong>Seq Scan:</strong> Full table scan - consider adding indexes</li>
              <li><strong>Index Scan:</strong> Using index - generally efficient</li>
              <li><strong>Hash Join:</strong> Good for large datasets with no indexes</li>
              <li><strong>Nested Loop:</strong> Efficient for small datasets or indexed joins</li>
              <li><strong>Sort:</strong> May indicate missing index on ORDER BY columns</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
