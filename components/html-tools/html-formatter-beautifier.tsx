"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Upload } from "lucide-react"

export function HtmlFormatterBeautifier() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [indentSize, setIndentSize] = useState(2)
  const [copied, setCopied] = useState(false)

  const formatHTML = useCallback((html: string, indent: number): string => {
    let formatted = ""
    const tab = " ".repeat(indent)
    let indentLevel = 0
    const inlinedTags = ["b", "i", "u", "span", "a", "strong", "em", "small", "sub", "sup"]

    // Remove extra whitespace and split by tags
    const tokens = html
      .replace(/>\s+</g, "><")
      .split(/(<[^>]+>)/g)
      .filter((t) => t.trim())

    for (let token of tokens) {
      const isClosing = token.startsWith("</")
      const isSelfClosing = token.endsWith("/>")
      const isComment = token.startsWith("<!--")
      const tagName = token.match(/^<\/?([a-zA-Z0-9]+)/)?.[1]?.toLowerCase()
      const isInlined = tagName && inlinedTags.includes(tagName)

      if (isClosing && !isInlined) {
        indentLevel = Math.max(0, indentLevel - 1)
      }

      const indentation = tab.repeat(indentLevel)

      if (isComment) {
        formatted += indentation + token + "\n"
      } else if (isSelfClosing || (isClosing && !isInlined)) {
        formatted += indentation + token + "\n"
      } else if (!isClosing && !isInlined) {
        formatted += indentation + token + "\n"
        indentLevel++
      } else {
        formatted += token
      }
    }

    return formatted.trim()
  }, [])

  const handleFormat = useCallback(() => {
    try {
      const formatted = formatHTML(input, indentSize)
      setOutput(formatted)
    } catch (error) {
      setOutput("Error: Invalid HTML format")
    }
  }, [input, indentSize, formatHTML])

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

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setInput(content)
      }
      reader.readAsText(file)
    }
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "formatted.html"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">HTML Formatter & Beautifier</h2>
            <p className="text-sm text-muted-foreground">
              Format and beautify your HTML code with proper indentation
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="input">Input HTML</Label>
            <div className="flex items-center gap-2">
              <Label htmlFor="indentSize" className="text-xs">
                Indent:
              </Label>
              <select
                id="indentSize"
                value={indentSize}
                onChange={(e) => setIndentSize(Number(e.target.value))}
                className="text-sm border rounded px-2 py-1 bg-background"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value={8}>8 spaces</option>
              </select>
            </div>
          </div>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your HTML code here..."
            className="min-h-[400px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleFormat} className="flex-1">
              Format HTML
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => document.getElementById("fileInput")?.click()} title="Upload File">
              <Upload className="h-4 w-4" />
            </Button>
            <input
              id="fileInput"
              type="file"
              accept=".html,.htm"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Formatted HTML</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Formatted HTML will appear here..."
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
    </div>
  )
}
