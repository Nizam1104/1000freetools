"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Shield } from "lucide-react"

export function YamlEscapeUnescape() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [mode, setMode] = useState<"escape" | "unescape">("escape")
  const [escapeSpecialChars, setEscapeSpecialChars] = useState(true)
  const [escapeQuotes, setEscapeQuotes] = useState(true)

  const escapeYaml = useCallback((text: string, options: { escapeSpecialChars: boolean; escapeQuotes: boolean }): string => {
    let result = text

    if (options.escapeSpecialChars) {
      // Escape special YAML characters
      result = result.replace(/\\/g, '\\\\')
      result = result.replace(/\n/g, '\\n')
      result = result.replace(/\r/g, '\\r')
      result = result.replace(/\t/g, '\\t')
    }

    if (options.escapeQuotes) {
      // Escape quotes
      result = result.replace(/"/g, '\\"')
      result = result.replace(/'/g, "\\'")
    }

    // Escape other special characters
    result = result.replace(/:/g, '\\:')
    result = result.replace(/#/g, '\\#')
    result = result.replace(/&/g, '\\&')
    result = result.replace(/\*/g, '\\*')
    result = result.replace(/!/g, '\\!')
    result = result.replace(/@/g, '\\@')
    result = result.replace(/`/g, '\\`')
    result = result.replace(/\|/g, '\\|')
    result = result.replace(/>/g, '\\>')
    result = result.replace(/%/g, '\\%')

    return result
  }, [])

  const unescapeYaml = useCallback((text: string): string => {
    let result = text

    // Unescape in reverse order
    result = result.replace(/\\`/g, '`')
    result = result.replace(/\\%/g, '%')
    result = result.replace(/\\>/g, '>')
    result = result.replace(/\\\|/g, '|')
    result = result.replace(/\\@/g, '@')
    result = result.replace(/\\!/g, '!')
    result = result.replace(/\\\*/g, '*')
    result = result.replace(/\\&/g, '&')
    result = result.replace(/\\#/g, '#')
    result = result.replace(/\\:/g, ':')
    result = result.replace(/\\'/g, "'")
    result = result.replace(/\\"/g, '"')
    result = result.replace(/\\t/g, '\t')
    result = result.replace(/\\r/g, '\r')
    result = result.replace(/\\n/g, '\n')
    result = result.replace(/\\\\/g, '\\')

    return result
  }, [])

  const handleProcess = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }

    if (mode === "escape") {
      const escaped = escapeYaml(input, { escapeSpecialChars, escapeQuotes })
      setOutput(escaped)
    } else {
      const unescaped = unescapeYaml(input)
      setOutput(unescaped)
    }
  }, [input, mode, escapeSpecialChars, escapeQuotes, escapeYaml, unescapeYaml])

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
      a.download = mode === "escape" ? "escaped.yaml" : "unescaped.yaml"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output, mode])

  const handleExample = useCallback(() => {
    if (mode === "escape") {
      setInput(`special: "Hello\nWorld"
path: C:\Users\test
chars: <>&'"`)
    } else {
      setInput(`special: "Hello\\nWorld"
path: C:\\\\Users\\\\test
chars: \\<\\>\&\\'\\"`)
    }
  }, [mode])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">YAML Escape/Unescape</h2>
            <p className="text-sm text-muted-foreground">
              Escape or unescape special characters in YAML strings
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant={mode === "escape" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("escape")}
          >
            <Shield className="h-4 w-4 mr-2" />
            Escape
          </Button>
          <Button
            variant={mode === "unescape" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("unescape")}
          >
            Unescape
          </Button>
        </div>

        {mode === "escape" && (
          <>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={escapeSpecialChars}
                onChange={(e) => setEscapeSpecialChars(e.target.checked)}
                className="rounded border-gray-300"
              />
              Escape Special Chars (\\n, \\t, etc.)
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={escapeQuotes}
                onChange={(e) => setEscapeQuotes(e.target.checked)}
                className="rounded border-gray-300"
              />
              Escape Quotes
            </label>
          </>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "escape" ? "Paste text to escape..." : "Paste escaped YAML to unescape..."}
            className="min-h-[500px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleProcess} className="flex-1" disabled={!input}>
              {mode === "escape" ? "Escape" : "Unescape"}
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
            placeholder="Result will appear here..."
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
        <h3 className="font-medium">Special Characters Handled</h3>
        <p className="text-sm text-muted-foreground">
          {mode === "escape" 
            ? "Escapes: \\n, \\r, \\t, quotes, colons, hashes, and other YAML special characters"
            : "Unescapes all YAML escaped characters back to their original form"}
        </p>
      </div>
    </div>
  )
}
