"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, ArrowRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function JsonToYamlConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const convertToYAML = useCallback((json: string, indent = 0): string => {
    const indentStr = "  ".repeat(indent)
    
    try {
      const obj = JSON.parse(json)
      return convertValueToYAML(obj, indentStr)
    } catch (e) {
      throw e
    }
  }, [])

  const convertValueToYAML = useCallback((value: any, indentStr: string): string => {
    if (value === null) {
      return "null"
    }

    if (typeof value === "boolean") {
      return value ? "true" : "false"
    }

    if (typeof value === "number") {
      return value.toString()
    }

    if (typeof value === "string") {
      // Check if string needs quoting
      if (value.includes("\n") || value.includes(":") || value.includes("#") || 
          value.startsWith(" ") || value.endsWith(" ") || value.startsWith("-") ||
          value === "true" || value === "false" || value === "null" ||
          value === "yes" || value === "no" || value === "on" || value === "off") {
        return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`
      }
      return value
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return "[]"
      }
      return value.map((item) => {
        const itemYAML = convertValueToYAML(item, indentStr + "  ")
        if (typeof item === "object" && item !== null) {
          const lines = itemYAML.split("\n")
          return `- ${lines[0]}\n` + lines.slice(1).map(line => indentStr + "  " + line).join("\n")
        }
        return `- ${itemYAML}`
      }).join("\n")
    }

    if (typeof value === "object") {
      const keys = Object.keys(value)
      if (keys.length === 0) {
        return "{}"
      }
      return keys.map((key) => {
        const val = value[key]
        const keyStr = convertValueToYAML(key, "")
        if (typeof val === "object" && val !== null && Object.keys(val).length > 0) {
          const valYAML = convertValueToYAML(val, indentStr + "  ")
          const lines = valYAML.split("\n")
          return `${keyStr}:\n${indentStr}  ${lines[0]}\n` + 
                 lines.slice(1).map(line => indentStr + "  " + line).join("\n")
        }
        const valStr = convertValueToYAML(val, indentStr + "  ")
        return `${keyStr}: ${valStr}`
      }).join("\n")
    }

    return String(value)
  }, [])

  const handleConvert = useCallback(() => {
    try {
      setError("")
      const yaml = convertToYAML(input)
      setOutput(yaml)
    } catch (e) {
      setError(`Invalid JSON: ${e instanceof Error ? e.message : "Unknown error"}`)
      setOutput("")
    }
  }, [input, convertToYAML])

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
      const blob = new Blob([output], { type: "text/yaml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "converted.yaml"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handlePrettifyJSON = useCallback(() => {
    try {
      const parsed = JSON.parse(input)
      setInput(JSON.stringify(parsed, null, 2))
      setError("")
    } catch (e) {
      setError(`Invalid JSON: ${e instanceof Error ? e.message : "Unknown error"}`)
    }
  }, [input])

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">JSON to YAML Converter</h2>
            <p className="text-sm text-muted-foreground">
              Convert JSON data to YAML format instantly
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="input">JSON Input</Label>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handlePrettifyJSON} disabled={!input}>
                Prettify
              </Button>
              <Button variant="outline" size="sm" onClick={handleClear} title="Clear">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your JSON here...

{
  "name": "John Doe",
  "age": 30,
  "hobbies": ["reading", "gaming"],
  "address": {
    "street": "123 Main St",
    "city": "Anytown"
  }
}'
            className="min-h-[500px] font-mono text-sm"
          />
          <Button onClick={handleConvert} className="w-full">
            Convert to YAML
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="output">YAML Output</Label>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!output}>
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!output} title="Download">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="YAML output will appear here..."
            className="min-h-[500px] font-mono text-sm bg-muted"
          />
        </div>
      </div>
    </div>
  )
}
