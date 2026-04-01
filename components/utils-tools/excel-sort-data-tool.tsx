"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy, Check, Trash2, Download } from "lucide-react"

function parseDelimited(input: string, delimiter: string) {
  const rows = input.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n")
  return rows.map((r) => r.split(delimiter))
}

function serializeDelimited(rows: string[][], delimiter: string) {
  return rows.map((r) => r.join(delimiter)).join("\n")
}

export function ExcelSortDataTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")
  const [delimiter, setDelimiter] = useState("\\t")
  const [hasHeader, setHasHeader] = useState(true)
  const [columnIndex, setColumnIndex] = useState(1) // 1-based for UX
  const [direction, setDirection] = useState<"asc" | "desc">("asc")
  const [sortType, setSortType] = useState<"text" | "number">("text")

  const handleConvert = useCallback(() => {
    try {
      setError("")
      const delim = delimiter === "\\t" ? "\t" : delimiter
      if (!delim) throw new Error("Delimiter cannot be empty")
      const col = Math.max(1, Math.floor(columnIndex)) - 1

      const allRows = parseDelimited(input.trimEnd(), delim)
      if (!allRows.length) {
        setOutput("")
        return
      }

      const header = hasHeader ? allRows.shift() : undefined
      const rows = allRows.filter((r) => r.some((c) => c.trim().length))

      const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" })
      rows.sort((a, b) => {
        const av = (a[col] ?? "").trim()
        const bv = (b[col] ?? "").trim()

        let cmp = 0
        if (sortType === "number") {
          const an = Number(av)
          const bn = Number(bv)
          const aValid = Number.isFinite(an)
          const bValid = Number.isFinite(bn)
          if (aValid && bValid) cmp = an - bn
          else if (aValid) cmp = -1
          else if (bValid) cmp = 1
          else cmp = collator.compare(av, bv)
        } else {
          cmp = collator.compare(av, bv)
        }

        return direction === "asc" ? cmp : -cmp
      })

      const outRows = header ? [header, ...rows] : rows
      setOutput(serializeDelimited(outRows, delim))
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion error")
      setOutput("")
    }
  }, [input, delimiter, hasHeader, columnIndex, direction, sortType])

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
    setError("")
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "output.txt"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Excel Sort Data Tool</h2>
            <p className="text-sm text-muted-foreground">
              Sort data like in Excel
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">Input</Label>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="delimiter" className="text-xs text-muted-foreground">
                Delimiter (use \t for TSV)
              </Label>
              <Input
                id="delimiter"
                value={delimiter}
                onChange={(e) => setDelimiter(e.target.value)}
                placeholder="\\t"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="columnIndex" className="text-xs text-muted-foreground">
                Sort column (1-based)
              </Label>
              <Input
                id="columnIndex"
                inputMode="numeric"
                value={String(columnIndex)}
                onChange={(e) => setColumnIndex(Number(e.target.value || "1"))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sortType" className="text-xs text-muted-foreground">
                Sort as
              </Label>
              <select
                id="sortType"
                value={sortType}
                onChange={(e) => setSortType(e.target.value as "text" | "number")}
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="direction" className="text-xs text-muted-foreground">
                Direction
              </Label>
              <select
                id="direction"
                value={direction}
                onChange={(e) => setDirection(e.target.value as "asc" | "desc")}
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div className="flex items-center gap-2 sm:col-span-2">
              <input
                id="hasHeader"
                type="checkbox"
                checked={hasHeader}
                onChange={(e) => setHasHeader(e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="hasHeader" className="text-sm font-normal">
                First row is a header
              </Label>
            </div>
          </div>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"Paste TSV/CSV here...\nExample:\nname\tage\nAlice\t30\nBob\t25"}
            className="min-h-[400px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleConvert} className="flex-1" disabled={!input}>
              Convert
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Output</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Output will appear here..."
            className="min-h-[400px] font-mono text-sm bg-muted"
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
        <h3 className="font-medium">How to use</h3>
        <p className="text-sm text-muted-foreground">
          Enter your data in the input field, click Convert, and the result will appear in the output field.
          You can then copy or download the result.
        </p>
      </div>
    </div>
  )
}
