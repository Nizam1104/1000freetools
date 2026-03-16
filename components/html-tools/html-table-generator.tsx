"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Table as TableIcon } from "lucide-react"

export function HtmlTableGenerator() {
  const [data, setData] = useState<string[][]>([
    ["Header 1", "Header 2", "Header 3"],
    ["Row 1, Col 1", "Row 1, Col 2", "Row 1, Col 3"],
    ["Row 2, Col 1", "Row 2, Col 2", "Row 2, Col 3"],
  ])
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [includeStyles, setIncludeStyles] = useState(true)
  const [bordered, setBordered] = useState(true)
  const [striped, setStriped] = useState(false)

  const addRow = useCallback((index: number) => {
    setData(prev => {
      const newRow = prev[0]?.map(() => "") || data[0].map(() => "")
      const newData = [...prev]
      newData.splice(index + 1, 0, newRow)
      return newData
    })
  }, [])

  const removeRow = useCallback((index: number) => {
    setData(prev => prev.filter((_, i) => i !== index))
  }, [])

  const addColumn = useCallback((index: number) => {
    setData(prev => prev.map((row, i) => {
      const newRow = [...row]
      newRow.splice(index + 1, 0, "")
      return newRow
    }))
  }, [])

  const removeColumn = useCallback((index: number) => {
    setData(prev => prev.map(row => row.filter((_, i) => i !== index)))
  }, [])

  const updateCell = useCallback((rowIndex: number, colIndex: number, value: string) => {
    setData(prev => prev.map((row, i) => 
      i === rowIndex ? row.map((cell, j) => j === colIndex ? value : cell) : row
    ))
  }, [])

  const generateHTML = useCallback(() => {
    const style = includeStyles ? `
<style>
  .generated-table {
    border-collapse: collapse;
    width: 100%;
    font-family: Arial, sans-serif;
  }
  .generated-table th, .generated-table td {
    ${bordered ? 'border: 1px solid #ddd;' : ''}
    padding: 12px;
    text-align: left;
  }
  .generated-table th {
    background-color: #4CAF50;
    color: white;
    font-weight: bold;
  }
  ${striped ? '.generated-table tr:nth-child(even) { background-color: #f2f2f2; }' : ''}
  .generated-table tr:hover {
    background-color: #f5f5f5;
  }
</style>
` : ""

    const tableHeader = data[0]?.map((cell, i) => `<th>${cell || `Header ${i + 1}`}</th>`).join("\n      ")
    const tableRows = data.slice(1).map(row => 
      `    <tr>\n      ${row.map((cell, i) => `<td>${cell || `Row ${data.indexOf(row)}, Col ${i + 1}`}</td>`).join("\n      ")}\n    </tr>`
    ).join("\n")

    const html = `${style}
<table class="generated-table">
  <thead>
    <tr>
      ${tableHeader}
    </tr>
  </thead>
  <tbody>
${tableRows}
  </tbody>
</table>`

    setOutput(html)
  }, [data, includeStyles, bordered, striped])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "table.html"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">HTML Table Generator</h2>
            <p className="text-sm text-muted-foreground">
              Create custom HTML tables with editable cells and styling options
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Table Data</Label>
            <Button size="sm" onClick={generateHTML}>
              <TableIcon className="h-4 w-4 mr-2" />
              Generate HTML
            </Button>
          </div>
          
          <div className="border rounded-lg overflow-auto max-h-[500px]">
            <table className="w-full">
              <thead>
                <tr className="bg-muted">
                  <th className="p-2 text-left text-sm font-medium">
                    <Button variant="ghost" size="sm" onClick={() => addColumn(-1)} className="h-6 w-6 p-0">+</Button>
                  </th>
                  {data[0]?.map((_, colIndex) => (
                    <th key={colIndex} className="p-2">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" onClick={() => addColumn(colIndex)} className="h-6 w-6 p-0">+</Button>
                        <Button variant="ghost" size="sm" onClick={() => removeColumn(colIndex)} className="h-6 w-6 p-0 text-destructive">−</Button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="p-2 bg-muted">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" onClick={() => addRow(rowIndex)} className="h-6 w-6 p-0">+</Button>
                        <Button variant="ghost" size="sm" onClick={() => removeRow(rowIndex)} className="h-6 w-6 p-0 text-destructive">−</Button>
                      </div>
                    </td>
                    {row.map((cell, colIndex) => (
                      <td key={colIndex} className="p-1">
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                          className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-2 p-4 bg-muted rounded-lg">
            <Label className="text-sm font-medium">Table Options</Label>
            <div className="grid grid-cols-3 gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={includeStyles}
                  onChange={(e) => setIncludeStyles(e.target.checked)}
                  className="rounded border-gray-300"
                />
                Include CSS
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={bordered}
                  onChange={(e) => setBordered(e.target.checked)}
                  className="rounded border-gray-300"
                />
                Bordered
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={striped}
                  onChange={(e) => setStriped(e.target.checked)}
                  className="rounded border-gray-300"
                />
                Striped
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Generated HTML</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Click 'Generate HTML' to create your table..."
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
    </div>
  )
}
