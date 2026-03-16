"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, Download, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PasswordCsvToJsonConverter() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [format, setFormat] = useState<"csv-to-json" | "json-to-csv">("csv-to-json")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const csvToJson = useCallback((csv: string) => {
    const lines = csv.trim().split("\n")
    if (lines.length < 2) {
      throw new Error("CSV must have a header row and at least one data row")
    }

    const headers = lines[0].split(",").map(h => h.trim())
    const data = []

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map(v => v.trim())
      const obj: Record<string, string> = {}
      
      headers.forEach((header, idx) => {
        obj[header] = values[idx] || ""
      })
      
      data.push(obj)
    }

    return JSON.stringify(data, null, 2)
  }, [])

  const jsonToCsv = useCallback((json: string) => {
    const data = JSON.parse(json)
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("JSON must be a non-empty array of objects")
    }

    const headers = Object.keys(data[0])
    const lines = [headers.join(",")]

    for (const row of data) {
      const values = headers.map(h => {
        const value = row[h] || ""
        // Escape commas and quotes in values
        if (value.includes(",") || value.includes('"') || value.includes("\n")) {
          return `"${value.replace(/"/g, '""')}"`
        }
        return value
      })
      lines.push(values.join(","))
    }

    return lines.join("\n")
  }, [])

  const convert = useCallback(() => {
    setError(null)
    
    if (!input.trim()) {
      setOutput("")
      return
    }

    try {
      if (format === "csv-to-json") {
        const result = csvToJson(input)
        setOutput(result)
      } else {
        const result = jsonToCsv(input)
        setOutput(result)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      setOutput("")
    }
  }, [input, format, csvToJson, jsonToCsv])

  React.useEffect(() => {
    convert()
  }, [input, format, convert])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const handleClear = useCallback(() => {
    setInput("")
    setOutput("")
    setError(null)
  }, [])

  const downloadOutput = useCallback(() => {
    if (!output) return
    
    const blob = new Blob([output], { type: format === "csv-to-json" ? "application/json" : "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = format === "csv-to-json" ? "passwords.json" : "passwords.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [output, format])

  const sampleCsv = `username,password,website,notes
john_doe,SecurePass123,example.com,Work account
jane_smith,MyP@ssw0rd,gmail.com,Personal email
admin,Admin123!,localhost,Test account`

  const sampleJson = `[
  {
    "username": "john_doe",
    "password": "SecurePass123",
    "website": "example.com",
    "notes": "Work account"
  },
  {
    "username": "jane_smith",
    "password": "MyP@ssw0rd",
    "website": "gmail.com",
    "notes": "Personal email"
  }
]`

  const loadSample = useCallback(() => {
    setInput(format === "csv-to-json" ? sampleCsv : sampleJson)
  }, [format])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Format Selector */}
      <section className="space-y-3">
        <Label>Conversion Direction</Label>
        <div className="flex gap-2">
          <Button
            variant={format === "csv-to-json" ? "default" : "outline"}
            onClick={() => setFormat("csv-to-json")}
            className="flex-1"
          >
            CSV to JSON
          </Button>
          <Button
            variant={format === "json-to-csv" ? "default" : "outline"}
            onClick={() => setFormat("json-to-csv")}
            className="flex-1"
          >
            JSON to CSV
          </Button>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {format === "csv-to-json" ? "CSV Input" : "JSON Input"}
          </Label>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="xs" onClick={loadSample} className="h-7">
              Load Sample
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(input, "input")}
              className="h-7"
              disabled={!input}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={handleClear}
              className="h-7"
              disabled={!input}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={cn(
            "font-mono text-sm min-h-[200px]",
            error ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder={format === "csv-to-json" ? "Paste CSV data..." : "Paste JSON array..."}
        />

        {error && (
          <p className="text-sm text-destructive flex items-center gap-2">
            <Info className="size-4" />
            {error}
          </p>
        )}
      </section>

      {/* Output Section */}
      {output && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="output" className="text-base font-medium">
              {format === "csv-to-json" ? "JSON Output" : "CSV Output"}
            </Label>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="xs" onClick={downloadOutput} className="h-7">
                <Download className="size-3.5" />
                <span className="text-xs">Download</span>
              </Button>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(output, "output")}
                className="h-7"
              >
                {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            </div>
          </div>

          <Textarea
            id="output"
            value={output}
            readOnly
            className="font-mono text-sm min-h-[200px] bg-muted/30"
          />

          {/* Stats */}
          <div className="flex gap-4 text-sm text-muted-foreground">
            {format === "csv-to-json" ? (
              <span>Records: <span className="font-medium text-foreground">{JSON.parse(output).length}</span></span>
            ) : (
              <span>Lines: <span className="font-medium text-foreground">{output.split("\n").length}</span></span>
            )}
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Password Data Conversion</h4>
            <p className="text-sm text-muted-foreground">
              Convert password data between CSV and JSON formats for importing/exporting 
              from password managers, spreadsheets, or custom applications.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Security Note:</strong> This tool runs entirely in your browser. 
              No data is sent to any server. For sensitive data, consider encrypting 
              passwords before conversion.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
