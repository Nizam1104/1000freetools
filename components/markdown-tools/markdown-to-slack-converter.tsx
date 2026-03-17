"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, ArrowRight } from "lucide-react"

export function MarkdownToSlackConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const convertToSlack = useCallback((markdown: string): string => {
    let result = markdown

    // Headers (Slack doesn't support headers, convert to bold)
    result = result.replace(/^###### (.+)$/gm, '*$1*')
    result = result.replace(/^##### (.+)$/gm, '*$1*')
    result = result.replace(/^#### (.+)$/gm, '*$1*')
    result = result.replace(/^### (.+)$/gm, '*$1*')
    result = result.replace(/^## (.+)$/gm, '*$1*')
    result = result.replace(/^# (.+)$/gm, '*$1*')

    // Bold
    result = result.replace(/\*\*([^*]+)\*\*/g, '*$1*')
    result = result.replace(/__([^_]+)__/g, '*$1*')

    // Italic
    result = result.replace(/\*([^*]+)\*/g, '_$1_')

    // Strikethrough (Slack supports ~text~)
    result = result.replace(/~~([^~]+)~~/g, '~$1~')

    // Inline code
    result = result.replace(/`([^`]+)`/g, '`$1`')

    // Code blocks
    result = result.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
      return '```\n' + code.trim() + '\n```'
    })

    // Links
    result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<$2|$1>')

    // Images (Slack doesn't support inline images in messages)
    result = result.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<$2|$1 Image>')

    // Blockquotes (Slack doesn't support blockquotes, convert to regular text)
    result = result.replace(/^> (.+)$/gm, '$1')

    // Unordered lists
    result = result.replace(/^[-*+] (.+)$/gm, '• $1')

    // Ordered lists
    result = result.replace(/^\d+\. (.+)$/gm, (match, item) => {
      return `• ${item}`
    })

    // Remove horizontal rules
    result = result.replace(/^[-*_]{3,}$/gm, '')

    return result
  }, [])

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }
    const slack = convertToSlack(input)
    setOutput(slack)
  }, [input, convertToSlack])

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
      a.download = "slack-message.txt"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput(`# Welcome Message

This is **bold** and *italic* text.

## Features

- Feature 1
- Feature 2
- Feature 3

> This is a quote

[Visit our website](https://example.com)

\`\`\`
code block here
\`\`\``)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Markdown to Slack Converter</h2>
            <p className="text-sm text-muted-foreground">
              Convert Markdown to Slack-compatible formatting
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">Markdown Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your Markdown here..."
            className="min-h-[500px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleConvert} className="flex-1" disabled={!input}>
              <ArrowRight className="h-4 w-4 mr-2" />
              Convert to Slack
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Slack Format</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Slack format will appear here..."
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
        <h3 className="font-medium">Slack Formatting Reference</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li><strong>Bold:</strong> <code className="bg-background px-1 rounded">*text*</code></li>
          <li><strong>Italic:</strong> <code className="bg-background px-1 rounded">_text_</code></li>
          <li><strong>Strikethrough:</strong> <code className="bg-background px-1 rounded">~text~</code></li>
          <li><strong>Code:</strong> <code className="bg-background px-1 rounded">`code`</code> or <code className="bg-background px-1 rounded">```code```</code></li>
          <li><strong>Links:</strong> <code className="bg-background px-1 rounded">&lt;url|text&gt;</code></li>
        </ul>
      </div>
    </div>
  )
}
