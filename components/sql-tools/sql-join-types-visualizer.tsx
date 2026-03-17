"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SqlJoinTypesVisualizer() {
  const [selectedJoin, setSelectedJoin] = useState<"inner" | "left" | "right" | "full" | "cross">("inner")
  const [copied, setCopied] = useState(false)

  const joinTypes = {
    inner: {
      name: "INNER JOIN",
      description: "Returns only rows where there is a match in both tables",
      sql: `SELECT *
FROM table_a a
INNER JOIN table_b b ON a.id = b.a_id;`,
      result: "Returns matching rows from both tables",
      vennDiagram: "Both circles overlapping - only the intersection is highlighted",
      useCase: "When you need only records that exist in both tables"
    },
    left: {
      name: "LEFT JOIN (LEFT OUTER JOIN)",
      description: "Returns all rows from the left table and matched rows from the right table",
      sql: `SELECT *
FROM table_a a
LEFT JOIN table_b b ON a.id = b.a_id;`,
      result: "All rows from left table, NULLs for unmatched right table rows",
      vennDiagram: "Left circle fully highlighted, including the overlap",
      useCase: "When you need all records from the left table regardless of matches"
    },
    right: {
      name: "RIGHT JOIN (RIGHT OUTER JOIN)",
      description: "Returns all rows from the right table and matched rows from the left table",
      sql: `SELECT *
FROM table_a a
RIGHT JOIN table_b b ON a.id = b.a_id;`,
      result: "All rows from right table, NULLs for unmatched left table rows",
      vennDiagram: "Right circle fully highlighted, including the overlap",
      useCase: "When you need all records from the right table regardless of matches"
    },
    full: {
      name: "FULL JOIN (FULL OUTER JOIN)",
      description: "Returns all rows when there is a match in either table",
      sql: `SELECT *
FROM table_a a
FULL OUTER JOIN table_b b ON a.id = b.a_id;`,
      result: "All rows from both tables, NULLs where no match exists",
      vennDiagram: "Both circles fully highlighted",
      useCase: "When you need all records from both tables"
    },
    cross: {
      name: "CROSS JOIN",
      description: "Returns the Cartesian product of both tables (all possible combinations)",
      sql: `SELECT *
FROM table_a a
CROSS JOIN table_b b;
-- Or without JOIN keyword:
SELECT * FROM table_a, table_b;`,
      result: "Every row from table_a combined with every row from table_b",
      vennDiagram: "No Venn diagram - creates a grid of all combinations",
      useCase: "When you need all possible combinations of rows"
    }
  }

  const handleCopy = useCallback(async () => {
    const sql = joinTypes[selectedJoin].sql
    await navigator.clipboard.writeText(sql)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [selectedJoin, joinTypes])

  const handleClear = useCallback(() => {
    setSelectedJoin("inner")
  }, [])

  const currentJoin = joinTypes[selectedJoin]

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">SQL JOIN Types Visualizer</h2>
            <p className="text-sm text-muted-foreground">
              Learn and visualize different SQL JOIN types with examples
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(Object.keys(joinTypes) as Array<keyof typeof joinTypes>).map((join) => (
          <Button
            key={join}
            variant={selectedJoin === join ? "default" : "outline"}
            onClick={() => setSelectedJoin(join)}
          >
            {joinTypes[join].name.split(' ')[0]}
          </Button>
        ))}
        <Button variant="outline" onClick={handleClear}>
          <Trash2 className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{currentJoin.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm text-muted-foreground">Description</Label>
              <p className="mt-1">{currentJoin.description}</p>
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">SQL Syntax</Label>
              <div className="relative mt-1">
                <pre className="p-4 bg-muted rounded-lg text-sm font-mono overflow-x-auto">
                  {currentJoin.sql}
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={handleCopy}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Result</Label>
              <p className="mt-1">{currentJoin.result}</p>
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Use Case</Label>
              <p className="mt-1">{currentJoin.useCase}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visual Representation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-8 bg-muted rounded-lg flex items-center justify-center">
              {selectedJoin === "inner" && (
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <circle cx="80" cy="100" r="60" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="120" cy="100" r="60" fill="#22c55e" fillOpacity="0.3" stroke="#22c55e" strokeWidth="2" />
                    <ellipse cx="100" cy="100" rx="20" ry="60" fill="#fbbf24" fillOpacity="0.6" />
                    <text x="100" y="105" textAnchor="middle" fontSize="10" fill="#000">MATCH</text>
                  </svg>
                </div>
              )}
              {selectedJoin === "left" && (
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <circle cx="80" cy="100" r="60" fill="#3b82f6" fillOpacity="0.6" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="120" cy="100" r="60" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" strokeWidth="2" />
                    <text x="60" y="105" textAnchor="middle" fontSize="10" fill="#000">ALL</text>
                  </svg>
                </div>
              )}
              {selectedJoin === "right" && (
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <circle cx="80" cy="100" r="60" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="120" cy="100" r="60" fill="#22c55e" fillOpacity="0.6" stroke="#22c55e" strokeWidth="2" />
                    <text x="140" y="105" textAnchor="middle" fontSize="10" fill="#000">ALL</text>
                  </svg>
                </div>
              )}
              {selectedJoin === "full" && (
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <circle cx="80" cy="100" r="60" fill="#3b82f6" fillOpacity="0.5" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="120" cy="100" r="60" fill="#22c55e" fillOpacity="0.5" stroke="#22c55e" strokeWidth="2" />
                    <text x="60" y="80" textAnchor="middle" fontSize="10" fill="#000">ALL</text>
                    <text x="140" y="80" textAnchor="middle" fontSize="10" fill="#000">ALL</text>
                  </svg>
                </div>
              )}
              {selectedJoin === "cross" && (
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <rect x="40" y="40" width="120" height="120" fill="#fbbf24" fillOpacity="0.5" stroke="#f59e0b" strokeWidth="2" />
                    <line x1="40" y1="70" x2="160" y2="70" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4" />
                    <line x1="40" y1="100" x2="160" y2="100" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4" />
                    <line x1="40" y1="130" x2="160" y2="130" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4" />
                    <line x1="70" y1="40" x2="70" y2="160" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4" />
                    <line x1="100" y1="40" x2="100" y2="160" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4" />
                    <line x1="130" y1="40" x2="130" y2="160" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4" />
                    <text x="100" y="180" textAnchor="middle" fontSize="10" fill="#000">Cartesian Product</text>
                  </svg>
                </div>
              )}
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Diagram Explanation</Label>
              <p className="mt-1 text-sm">{currentJoin.vennDiagram}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Example Tables</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-2 text-left">table_a</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t"><td className="px-4 py-2">id=1, name="Alice"</td></tr>
                  <tr className="border-t"><td className="px-4 py-2">id=2, name="Bob"</td></tr>
                  <tr className="border-t"><td className="px-4 py-2">id=3, name="Charlie"</td></tr>
                </tbody>
              </table>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-2 text-left">table_b</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t"><td className="px-4 py-2">id=1, a_id=1, order="A"</td></tr>
                  <tr className="border-t"><td className="px-4 py-2">id=2, a_id=1, order="B"</td></tr>
                  <tr className="border-t"><td className="px-4 py-2">id=3, a_id=4, order="C"</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">JOIN Tips</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Always specify the join condition with ON clause for INNER, LEFT, RIGHT joins</li>
          <li>LEFT JOIN is more commonly used than RIGHT JOIN (same results, just table order differs)</li>
          <li>FULL OUTER JOIN is not supported in MySQL (use UNION of LEFT and RIGHT JOIN)</li>
          <li>CROSS JOIN can produce very large result sets - use with caution</li>
          <li>Use table aliases to make queries more readable</li>
        </ul>
      </div>
    </div>
  )
}
