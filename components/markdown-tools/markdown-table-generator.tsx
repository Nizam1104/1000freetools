"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MarkdownTableGenerator() {
  const [headers, setHeaders] = useState<string[]>(["Column 1", "Column 2", "Column 3"])
  const [rows, setRows] = useState<string[][]>([["Cell 1", "Cell 2", "Cell 3"], ["Cell 4", "Cell 5", "Cell 6"]])
  const [alignment, setAlignment] = useState<("left" | "center" | "right")[]>(["left", "left", "left"])
  const [markdown, setMarkdown] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const generateMarkdown = useCallback(() => {
    const headerRow = "| " + headers.join(" | ") + " |"
    const separator = "| " + alignment.map(a => {
      if (a === "center") return ":---:"
      if (a === "right") return "---:"
      return "---"
    }).join(" | ") + " |"
    const dataRows = rows.map(row => "| " + row.join(" | ") + " |").join("\n")
    
    return `${headerRow}\n${separator}\n${dataRows}`
  }, [headers, rows, alignment])

  const updateMarkdown = useCallback(() => {
    setMarkdown(generateMarkdown())
  }, [generateMarkdown])

  React.useEffect(() => {
    updateMarkdown()
  }, [updateMarkdown])

  const addColumn = useCallback(() => {
    const index = headers.length
    setHeaders([...headers, `Column ${index + 1}`])
    setAlignment([...alignment, "left"])
    setRows(rows.map(row => [...row, `Cell ${row.length + 1}`]))
  }, [headers, alignment, rows])

  const removeColumn = useCallback((index: number) => {
    if (headers.length <= 1) return
    setHeaders(headers.filter((_, i) => i !== index))
    setAlignment(alignment.filter((_, i) => i !== index))
    setRows(rows.map(row => row.filter((_, i) => i !== index)))
  }, [headers, alignment, rows])

  const addRow = useCallback(() => {
    setRows([...rows, new Array(headers.length).fill("New Cell")])
  }, [headers.length, rows])

  const removeRow = useCallback((index: number) => {
    if (rows.length <= 1) return
    setRows(rows.filter((_, i) => i !== index))
  }, [rows])

  const updateCell = useCallback((rowIndex: number, colIndex: number, value: string) => {
    const newRows = [...rows]
    newRows[rowIndex][colIndex] = value
    setRows(newRows)
  }, [rows])

  const updateHeader = useCallback((index: number, value: string) => {
    const newHeaders = [...headers]
    newHeaders[index] = value
    setHeaders(newHeaders)
  }, [headers])

  const updateAlignment = useCallback((index: number, value: "left" | "center" | "right") => {
    const newAlignment = [...alignment]
    newAlignment[index] = value
    setAlignment(newAlignment)
  }, [alignment])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Table Editor */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Table Editor</Label>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={addColumn}><Plus className="size-4 mr-1" />Add Column</Button>
            <Button variant="outline" size="sm" onClick={addRow}><Plus className="size-4 mr-1" />Add Row</Button>
          </div>
        </div>

        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                {headers.map((header, colIndex) => (
                  <th key={colIndex} className="border p-2 min-w-[150px]">
                    <div className="flex items-center gap-2">
                      <input value={header} onChange={(e) => updateHeader(colIndex, e.target.value)}
                        className="flex-1 px-2 py-1 border rounded text-sm bg-background" />
                      <select value={alignment[colIndex]} onChange={(e) => updateAlignment(colIndex, e.target.value as "left" | "center" | "right")}
                        className="px-2 py-1 border rounded text-xs">
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                      </select>
                      <Button variant="ghost" size="xs" onClick={() => removeColumn(colIndex)} disabled={headers.length <= 1}>
                        <X className="size-3.5" />
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-muted/30">
                  {row.map((cell, colIndex) => (
                    <td key={colIndex} className="border p-2">
                      <input value={cell} onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                        className="w-full px-2 py-1 border rounded text-sm bg-background" />
                    </td>
                  ))}
                  <td className="border p-2 w-10">
                    <Button variant="ghost" size="xs" onClick={() => removeRow(rowIndex)} disabled={rows.length <= 1}>
                      <X className="size-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Markdown Output */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Markdown Output</Label>
          <Button variant="ghost" size="xs" onClick={() => copyToClipboard(markdown, "markdown")} className="h-7">
            {copied === "markdown" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            <span className="text-xs">Copy</span>
          </Button>
        </div>
        <Textarea value={markdown} readOnly className="font-mono text-sm min-h-[150px] bg-muted/50" />
      </section>

      {/* Preview */}
      {markdown && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Preview</Label>
          <div className="rounded-lg border bg-background p-4 overflow-x-auto" dangerouslySetInnerHTML={{ __html: markdown.replace(/\n/g, "<br>") }} />
        </section>
      )}
    </div>
  )
}
