"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, ArrowRight } from "lucide-react"

export function MarkdownToJiraConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const convertToJira = useCallback((markdown: string): string => {
    let result = markdown
    let inCodeBlock = false
    let codeBlockLang = ""

    const lines = result.split('\n')
    const processedLines: string[] = []

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i]
      const trimmed = line.trim()

      // Code blocks
      if (trimmed.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true
          codeBlockLang = trimmed.substring(3).trim()
          processedLines.push(`{code:${codeBlockLang || 'none'}}`)
        } else {
          inCodeBlock = false
          processedLines.push('{code}')
        }
        continue
      }

      if (inCodeBlock) {
        processedLines.push(line)
        continue
      }

      // Headers
      if (trimmed.startsWith('###### ')) {
        processedLines.push(`h6. ${trimmed.substring(7)}`)
      } else if (trimmed.startsWith('##### ')) {
        processedLines.push(`h5. ${trimmed.substring(6)}`)
      } else if (trimmed.startsWith('#### ')) {
        processedLines.push(`h4. ${trimmed.substring(5)}`)
      } else if (trimmed.startsWith('### ')) {
        processedLines.push(`h3. ${trimmed.substring(4)}`)
      } else if (trimmed.startsWith('## ')) {
        processedLines.push(`h2. ${trimmed.substring(3)}`)
      } else if (trimmed.startsWith('# ')) {
        processedLines.push(`h1. ${trimmed.substring(2)}`)
      }
      // Bold
      else if (trimmed.includes('**') || trimmed.includes('__')) {
        line = line.replace(/\*\*([^*]+)\*\*/g, '*$1*')
        line = line.replace(/__([^_]+)__/g, '*$1*')
        processedLines.push(line)
      }
      // Italic
      else if (trimmed.includes('*') || trimmed.includes('_')) {
        // Be careful not to match bold markers
        line = line.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '_$1_')
        line = line.replace(/(?<!_)_([^_]+)_(?!_)/g, '_$1_')
        processedLines.push(line)
      }
      // Strikethrough
      else if (trimmed.includes('~~')) {
        line = line.replace(/~~([^~]+)~~/g, '-$1-')
        processedLines.push(line)
      }
      // Inline code
      else if (trimmed.includes('`')) {
        line = line.replace(/`([^`]+)`/g, '{{$1}}')
        processedLines.push(line)
      }
      // Links
      else if (trimmed.includes('[') && trimmed.includes('](')) {
        line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '[$1|$2]')
        processedLines.push(line)
      }
      // Images
      else if (trimmed.includes('![')) {
        line = line.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '!$2!')
        if (trimmed.includes('"')) {
          const match = trimmed.match(/!\[([^\]]*)\]\(([^)]+)\s+"([^"]+)"\)/)
          if (match) {
            line = `!${match[2]}|alt="${match[1]}",title="${match[3]}"!`
          }
        }
        processedLines.push(line)
      }
      // Blockquotes
      else if (trimmed.startsWith('> ')) {
        processedLines.push(`{quote}${trimmed.substring(2)}{quote}`)
      }
      // Unordered lists
      else if (/^[-*+]\s/.test(trimmed)) {
        processedLines.push(`* ${trimmed.substring(2)}`)
      }
      // Ordered lists
      else if (/^\d+\.\s/.test(trimmed)) {
        const num = trimmed.match(/^\d+/)?.[0] || '1'
        processedLines.push(`# ${trimmed.replace(/^\d+\.\s/, '')}`)
      }
      // Horizontal rule
      else if (trimmed.startsWith('---') || trimmed.startsWith('***') || trimmed.startsWith('___')) {
        processedLines.push('----')
      }
      // Table row (Markdown tables not directly supported, convert to text)
      else if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        // Keep table format as Jira supports it
        if (trimmed.includes('---')) {
          // Skip separator line
          continue
        }
        // Convert header cells
        if (i === 0 || !lines[i - 1]?.trim().startsWith('|')) {
          line = line.replace(/\|([^|]+)/g, '||$1')
        }
        processedLines.push(line)
      }
      // Empty line
      else if (!trimmed) {
        processedLines.push('')
      }
      // Regular paragraph
      else {
        processedLines.push(line)
      }
    }

    return processedLines.join('\n')
  }, [])

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }
    const jira = convertToJira(input)
    setOutput(jira)
  }, [input, convertToJira])

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
      a.download = "jira.txt"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput(`# Welcome

This is **bold** and *italic* text.

## Features

- Feature 1
- Feature 2
- Feature 3

> This is a quote

[Visit our website](https://example.com)

\`\`\`javascript
console.log("Hello");
\`\`\``)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Markdown to Jira Converter</h2>
            <p className="text-sm text-muted-foreground">
              Convert Markdown to Jira Wiki markup
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
              Convert to Jira
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Jira Markup</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Jira markup will appear here..."
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
        <h3 className="font-medium">Jira Markup Reference</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li><strong>Headers:</strong> <code className="bg-background px-1 rounded">h1. Header</code></li>
          <li><strong>Bold:</strong> <code className="bg-background px-1 rounded">*text*</code></li>
          <li><strong>Italic:</strong> <code className="bg-background px-1 rounded">_text_</code></li>
          <li><strong>Code:</strong> <code className="bg-background px-1 rounded">{"{{code}}"}</code> or <code className="bg-background px-1 rounded">{"{code}block{code}"}</code></li>
          <li><strong>Links:</strong> <code className="bg-background px-1 rounded">[text|url]</code></li>
          <li><strong>Quotes:</strong> <code className="bg-background px-1 rounded">{"{quote}text{quote}"}</code></li>
        </ul>
      </div>
    </div>
  )
}
