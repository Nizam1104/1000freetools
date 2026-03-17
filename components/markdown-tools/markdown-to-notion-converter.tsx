"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, ArrowRight } from "lucide-react"

export function MarkdownToNotionConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const convertToNotion = useCallback((markdown: string): string => {
    const lines = markdown.split('\n')
    const result: string[] = []

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i]

      // Headers
      if (line.startsWith('###### ')) {
        result.push(`[H6] ${line.substring(7)}`)
      } else if (line.startsWith('##### ')) {
        result.push(`[H5] ${line.substring(6)}`)
      } else if (line.startsWith('#### ')) {
        result.push(`[H4] ${line.substring(5)}`)
      } else if (line.startsWith('### ')) {
        result.push(`[H3] ${line.substring(4)}`)
      } else if (line.startsWith('## ')) {
        result.push(`[H2] ${line.substring(3)}`)
      } else if (line.startsWith('# ')) {
        result.push(`[H1] ${line.substring(2)}`)
      }
      // Blockquotes
      else if (line.startsWith('> ')) {
        result.push(`[QUOTE] ${line.substring(2)}`)
      } else if (line.startsWith('>')) {
        result.push(`[QUOTE] ${line.substring(1)}`)
      }
      // Code blocks
      else if (line.startsWith('```')) {
        if (line === '```') {
          result.push(result[result.length - 1]?.startsWith('[CODE]') ? '[/CODE]' : '[CODE]')
        } else {
          const lang = line.substring(3)
          result.push(lang ? `[CODE language="${lang}"]` : '[CODE]')
        }
      }
      // Inline code
      else if (line.includes('`')) {
        line = line.replace(/`([^`]+)`/g, '[CODE inline]$1[/CODE]')
        result.push(line)
      }
      // Bold and italic
      else if (line.includes('**') || line.includes('__') || line.includes('*') || line.includes('_')) {
        line = line.replace(/\*\*([^*]+)\*\*/g, '[B]$1[/B]')
        line = line.replace(/__([^_]+)__/g, '[B]$1[/B]')
        line = line.replace(/\*([^*]+)\*/g, '[I]$1[/I]')
        line = line.replace(/_([^_]+)_/g, '[I]$1[/I]')
        result.push(line)
      }
      // Links
      else if (line.includes('[') && line.includes('](')) {
        line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '[LINK href="$2"]$1[/LINK]')
        result.push(line)
      }
      // Images
      else if (line.includes('![')) {
        line = line.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '[IMAGE src="$2" alt="$1"]')
        result.push(line)
      }
      // Unordered lists
      else if (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('+ ')) {
        result.push(`[LIST] ${line.substring(2)}`)
      }
      // Ordered lists
      else if (/^\d+\.\s/.test(line)) {
        result.push(`[LIST numbered] ${line.replace(/^\d+\.\s/, '')}`)
      }
      // Checkboxes
      else if (line.startsWith('- [ ] ') || line.startsWith('* [ ] ')) {
        result.push(`[TODO] ${line.substring(6)}`)
      } else if (line.startsWith('- [x] ') || line.startsWith('* [x] ')) {
        result.push(`[TODO checked] ${line.substring(6)}`)
      }
      // Horizontal rule
      else if (line.startsWith('---') || line.startsWith('***') || line.startsWith('___')) {
        result.push('[DIVIDER]')
      }
      // Empty line
      else if (!line.trim()) {
        result.push('')
      }
      // Regular paragraph
      else {
        result.push(`[P] ${line}`)
      }
    }

    return result.join('\n')
  }, [])

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }
    const notion = convertToNotion(input)
    setOutput(notion)
  }, [input, convertToNotion])

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
      a.download = "notion-format.txt"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput(`# Welcome to My Document

This is a **bold** and *italic* text example.

## Features

- Feature 1
- Feature 2
- Feature 3

> This is a quote

[Link example](https://example.com)

\`\`\`javascript
const hello = "world";
\`\`\``)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Markdown to Notion Converter</h2>
            <p className="text-sm text-muted-foreground">
              Convert Markdown to Notion-compatible format
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
              Convert to Notion
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Notion Format</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Notion format will appear here..."
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
