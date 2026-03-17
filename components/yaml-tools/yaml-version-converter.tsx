"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, RefreshCw } from "lucide-react"

export function YamlVersionConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [targetVersion, setTargetVersion] = useState<"1.1" | "1.2">("1.2")
  const [updateDeclaration, setUpdateDeclaration] = useState(true)

  const convertVersion = useCallback((yaml: string, target: "1.1" | "1.2", updateDecl: boolean): string => {
    let result = yaml
    const lines = yaml.split('\n')
    const processedLines: string[] = []

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i]
      const trimmed = line.trim()

      // Handle YAML declaration
      if (trimmed.startsWith('%YAML')) {
        if (updateDecl) {
          line = line.replace(/%YAML\s+[\d.]+/, `%YAML ${target}`)
        }
        processedLines.push(line)
        continue
      }

      // Handle version-specific features
      if (target === "1.2") {
        // Convert 1.1 specific syntax to 1.2
        // Binary data: !!binary to base64
        line = line.replace(/!!binary\s+/g, '!!binary ')
        
        // Handle octal numbers (1.1: 0777, 1.2: 0o777)
        line = line.replace(/:\s*0([0-7]{3,})(\s*$|[\s,}#\n])/g, ': 0o$1$2')
        
        // Handle sexagesimal numbers (1.1: 1:23:45, 1.2: requires explicit tag)
        // This is complex, skip for now
        
      } else {
        // Convert 1.2 specific syntax to 1.1
        // Octal numbers: 0o777 to 0777
        line = line.replace(/:\s*0o([0-7]+)(\s*$|[\s,}#\n])/g, ': 0$1$2')
      }

      processedLines.push(line)
    }

    // Add declaration if missing and requested
    if (updateDecl && processedLines.length > 0 && !processedLines[0].trim().startsWith('%YAML')) {
      processedLines.unshift(`%YAML ${target}`)
      processedLines.unshift('---')
    }

    return processedLines.join('\n')
  }, [])

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }
    const converted = convertVersion(input, targetVersion, updateDeclaration)
    setOutput(converted)
  }, [input, targetVersion, updateDeclaration, convertVersion])

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
      const blob = new Blob([output], { type: "text/yaml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `yaml-${targetVersion.replace('.', '_')}.yaml`
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output, targetVersion])

  const handleExample = useCallback(() => {
    setInput(`%YAML 1.1
---
# Sample YAML
numbers:
  decimal: 42
  octal: 0o777
  hex: 0x2A
strings:
  plain: hello
  quoted: "world"`)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">YAML Version Converter</h2>
            <p className="text-sm text-muted-foreground">
              Convert YAML between version 1.1 and 1.2
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Label>Target Version:</Label>
          <Button
            variant={targetVersion === "1.1" ? "default" : "outline"}
            size="sm"
            onClick={() => setTargetVersion("1.1")}
          >
            YAML 1.1
          </Button>
          <Button
            variant={targetVersion === "1.2" ? "default" : "outline"}
            size="sm"
            onClick={() => setTargetVersion("1.2")}
          >
            YAML 1.2
          </Button>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={updateDeclaration}
            onChange={(e) => setUpdateDeclaration(e.target.checked)}
            className="rounded border-gray-300"
          />
          Update YAML Declaration
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">YAML Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your YAML here..."
            className="min-h-[500px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleConvert} className="flex-1" disabled={!input}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Convert to YAML {targetVersion}
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Converted YAML</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Converted YAML will appear here..."
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
        <h3 className="font-medium">Version Differences</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li><strong>YAML 1.1:</strong> Supports octal (0777), sexagesimal numbers, more implicit types</li>
          <li><strong>YAML 1.2:</strong> Based on JSON, stricter parsing, octal must use 0o prefix</li>
        </ul>
      </div>
    </div>
  )
}
