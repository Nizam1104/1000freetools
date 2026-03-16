"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check, Trash2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function SQLDiffChecker() {
  const [sql1, setSql1] = useState<string>("")
  const [sql2, setSql2] = useState<string>("")
  const [ignoreWhitespace, setIgnoreWhitespace] = useState<boolean>(true)
  const [ignoreCase, setIgnoreCase] = useState<boolean>(true)
  const [copied, setCopied] = useState<string | null>(null)

  const normalizeSQL = useCallback((sql: string, ignoreWS: boolean, ignoreC: boolean): string => {
    let result = sql
    if (ignoreWS) {
      result = result.replace(/\s+/g, " ").trim()
    }
    if (ignoreC) {
      result = result.toUpperCase()
    }
    return result
  }, [])

  const diffResult = useMemo(() => {
    if (!sql1.trim() || !sql2.trim()) return null

    const normalized1 = normalizeSQL(sql1, ignoreWhitespace, ignoreCase)
    const normalized2 = normalizeSQL(sql2, ignoreWhitespace, ignoreCase)

    const areEqual = normalized1 === normalized2

    // Simple line-by-line diff
    const lines1 = sql1.split("\n")
    const lines2 = sql2.split("\n")
    const maxLines = Math.max(lines1.length, lines2.length)

    const diff: { line: number; type: "same" | "added" | "removed"; content: string }[] = []

    for (let i = 0; i < maxLines; i++) {
      const line1 = normalizeSQL(lines1[i] || "", ignoreWhitespace, ignoreCase)
      const line2 = normalizeSQL(lines2[i] || "", ignoreWhitespace, ignoreCase)

      if (line1 === line2 && line1) {
        diff.push({ line: i + 1, type: "same", content: lines1[i] })
      } else {
        if (line1) {
          diff.push({ line: i + 1, type: "removed", content: lines1[i] })
        }
        if (line2) {
          diff.push({ line: i + 1, type: "added", content: lines2[i] })
        }
      }
    }

    return {
      areEqual,
      diff,
      addedCount: diff.filter(d => d.type === "added").length,
      removedCount: diff.filter(d => d.type === "removed").length,
    }
  }, [sql1, sql2, ignoreWhitespace, ignoreCase, normalizeSQL])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const clearAll = useCallback(() => {
    setSql1("")
    setSql2("")
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">SQL Diff Checker</h2>
        <p className="text-muted-foreground">
          Compare two SQL queries or schemas and highlight the differences.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={ignoreWhitespace}
            onChange={(e) => setIgnoreWhitespace(e.target.checked)}
            className="rounded border-border"
          />
          Ignore whitespace
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={ignoreCase}
            onChange={(e) => setIgnoreCase(e.target.checked)}
            className="rounded border-border"
          />
          Ignore case
        </label>
        <Button variant="outline" size="sm" onClick={clearAll} className="ml-auto">
          <Trash2 className="size-4" />
          <span className="ml-2">Clear All</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sql1">SQL Query 1</Label>
          <Textarea
            id="sql1"
            value={sql1}
            onChange={(e) => setSql1(e.target.value)}
            className="font-mono text-sm min-h-[200px]"
            placeholder="Paste first SQL query..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sql2">SQL Query 2</Label>
          <Textarea
            id="sql2"
            value={sql2}
            onChange={(e) => setSql2(e.target.value)}
            className="font-mono text-sm min-h-[200px]"
            placeholder="Paste second SQL query..."
          />
        </div>
      </div>

      {diffResult && (
        <div className="space-y-4">
          <div className={`rounded-lg border p-4 ${diffResult.areEqual ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" : "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800"}`}>
            <div className="flex items-center justify-between">
              <p className={`font-medium ${diffResult.areEqual ? "text-green-800 dark:text-green-200" : "text-yellow-800 dark:text-yellow-200"}`}>
                {diffResult.areEqual ? "✓ SQL queries are identical" : "⚠ SQL queries have differences"}
              </p>
              {!diffResult.areEqual && (
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-red-600 dark:text-red-400">
                    -{diffResult.removedCount} removed
                  </span>
                  <span className="text-green-600 dark:text-green-400">
                    +{diffResult.addedCount} added
                  </span>
                </div>
              )}
            </div>
          </div>

          {!diffResult.areEqual && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Diff View</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(sql2, "result")}
                >
                  {copied === "result" ? <Check className="size-4" /> : <Copy className="size-4" />}
                  <span className="ml-2">Copy Result</span>
                </Button>
              </div>
              <div className="rounded-lg border bg-muted/30 p-4 max-h-96 overflow-auto">
                <pre className="font-mono text-sm">
                  {diffResult.diff.map((item, idx) => (
                    <div
                      key={idx}
                      className={`${
                        item.type === "added"
                          ? "bg-green-100 dark:bg-green-900/30"
                          : item.type === "removed"
                          ? "bg-red-100 dark:bg-red-900/30"
                          : ""
                      }`}
                    >
                      <span className="text-muted-foreground w-8 inline-block">{item.line}</span>
                      <span className={item.type === "same" ? "text-muted-foreground" : ""}>
                        {item.type === "added" ? "+ " : item.type === "removed" ? "- " : "  "}
                        {item.content || " "}
                      </span>
                    </div>
                  ))}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
