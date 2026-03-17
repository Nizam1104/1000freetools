"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Shield } from "lucide-react"

export function MarkdownEscapeTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [mode, setMode] = useState<"escape" | "unescape">("escape")
  const [escapeOptions, setEscapeOptions] = useState({
    headers: true,
    emphasis: true,
    code: true,
    links: true,
    lists: true,
    special: true
  })

  const escapeMarkdown = useCallback((text: string, options: typeof escapeOptions): string => {
    let result = text

    // Escape special characters
    if (options.special) {
      result = result.replace(/\\/g, '\\\\')
    }

    // Escape headers
    if (options.headers) {
      result = result.replace(/^#/gm, '\\#')
    }

    // Escape emphasis
    if (options.emphasis) {
      result = result.replace(/(?<!\\)\*(?!\*)/g, '\\*')
      result = result.replace(/(?<!\\)_(?!_)/g, '\\_')
      result = result.replace(/(?<!\\)~~/g, '\\~~')
    }

    // Escape code
    if (options.code) {
      result = result.replace(/(?<!\\)`/g, '\\`')
    }

    // Escape links
    if (options.links) {
      result = result.replace(/(?<!\\)\[/g, '\\[')
      result = result.replace(/(?<!\\)\]/g, '\\]')
      result = result.replace(/(?<!\\)\(/g, '\\(')
      result = result.replace(/(?<!\\)\)/g, '\\)')
    }

    // Escape lists
    if (options.lists) {
      result = result.replace(/^([-*+])\s/gm, '\\$1 ')
      result = result.replace(/^(\d+)\.\s/gm, '\\$1. ')
    }

    // Escape other special chars
    if (options.special) {
      result = result.replace(/(?<!\\)&/g, '\\&')
      result = result.replace(/(?<!\\)@/g, '\\@')
      result = result.replace(/(?<!\\)!/g, '\\!')
    }

    return result
  }, [])

  const unescapeMarkdown = useCallback((text: string): string => {
    return text
      .replace(/\\\\/g, '\x00')
      .replace(/\\#/g, '#')
      .replace(/\\\*/g, '*')
      .replace(/\\_/g, '_')
      .replace(/\\~/g, '~')
      .replace(/\\`/g, '`')
      .replace(/\\\[/g, '[')
      .replace(/\\\]/g, ']')
      .replace(/\\\(/g, '(')
      .replace(/\\\)/g, ')')
      .replace(/\\-/g, '-')
      .replace(/\\\./g, '.')
      .replace(/\\&/g, '&')
      .replace(/\\@/g, '@')
      .replace(/\\!/g, '!')
      .replace(/\x00/g, '\\')
  }, [])

  const handleProcess = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }

    if (mode === "escape") {
      const escaped = escapeMarkdown(input, escapeOptions)
      setOutput(escaped)
    } else {
      const unescaped = unescapeMarkdown(input)
      setOutput(unescaped)
    }
  }, [input, mode, escapeOptions, escapeMarkdown, unescapeMarkdown])

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
      const blob = new Blob([output], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = mode === "escape" ? "escaped.md" : "unescaped.md"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output, mode])

  const handleExample = useCallback(() => {
    if (mode === "escape") {
      setInput(`# This is a header
This is **bold** and *italic*.
- List item
1. Numbered item
[Link](url)
\`code\``)
    } else {
      setInput(`\\# This is a header
This is \\*\\*bold\\*\\* and \\*italic\\*.
\\- List item
\\1. Numbered item
\\[Link\\](url)
\\\`code\\\``)
    }
  }, [mode])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Markdown Escape/Unescape</h2>
            <p className="text-sm text-muted-foreground">
              Escape or unescape Markdown special characters
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
                checked={escapeOptions.headers}
                onChange={(e) => setEscapeOptions({ ...escapeOptions, headers: e.target.checked })}
                className="rounded border-gray-300"
              />
              Headers (#)
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={escapeOptions.emphasis}
                onChange={(e) => setEscapeOptions({ ...escapeOptions, emphasis: e.target.checked })}
                className="rounded border-gray-300"
              />
              Emphasis (*, _, ~)
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={escapeOptions.code}
                onChange={(e) => setEscapeOptions({ ...escapeOptions, code: e.target.checked })}
                className="rounded border-gray-300"
              />
              Code (`)
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={escapeOptions.links}
                onChange={(e) => setEscapeOptions({ ...escapeOptions, links: e.target.checked })}
                className="rounded border-gray-300"
              />
              Links ([], ())
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={escapeOptions.lists}
                onChange={(e) => setEscapeOptions({ ...escapeOptions, lists: e.target.checked })}
                className="rounded border-gray-300"
              />
              Lists (-, 1.)
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
            placeholder={mode === "escape" ? "Paste Markdown to escape..." : "Paste escaped Markdown to unescape..."}
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
        <h3 className="font-medium">Escapable Characters</h3>
        <p className="text-sm text-muted-foreground">
          {mode === "escape" 
            ? "Add backslashes before special Markdown characters to display them literally."
            : "Remove backslashes from escaped Markdown characters."}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {['\\', '#', '*', '_', '`', '[', ']', '(', ')', '-', '+', '.', '!', '|', '{', '}', '<', '>'].map(char => (
            <span key={char} className="px-2 py-1 bg-background rounded text-sm font-mono">
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
