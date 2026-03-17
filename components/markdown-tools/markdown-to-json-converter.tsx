"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, ArrowRight } from "lucide-react"

export function MarkdownToJsonConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [prettify, setPrettify] = useState(true)

  const parseMarkdown = useCallback((markdown: string): any => {
    const lines = markdown.split('\n')
    const result: any = {
      headings: [] as Array<{ level: number; text: string }>,
      paragraphs: [] as string[],
      links: [] as Array<{ text: string; url: string }>,
      images: [] as Array<{ alt: string; url: string }>,
      codeBlocks: [] as Array<{ language: string; code: string }>,
      lists: [] as Array<{ type: 'ordered' | 'unordered'; items: string[] }>,
      blockquotes: [] as string[],
      frontMatter: {} as Record<string, any>
    }

    let inCodeBlock = false
    let codeBlockContent: string[] = []
    let codeBlockLanguage = ""
    let inFrontMatter = false
    let frontMatterContent: string[] = []
    let currentList: { type: 'ordered' | 'unordered'; items: string[] } | null = null

    for (const line of lines) {
      // Front matter
      if (line.trim() === '---') {
        if (!inFrontMatter) {
          inFrontMatter = true
          frontMatterContent = []
        } else {
          inFrontMatter = false
          // Parse front matter as YAML-like
          frontMatterContent.forEach(fmLine => {
            const colonIndex = fmLine.indexOf(':')
            if (colonIndex > 0) {
              const key = fmLine.substring(0, colonIndex).trim()
              const value = fmLine.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '')
              result.frontMatter[key] = value
            }
          })
        }
        continue
      }

      if (inFrontMatter) {
        frontMatterContent.push(line)
        continue
      }

      // Code blocks
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true
          codeBlockLanguage = line.substring(3).trim()
          codeBlockContent = []
        } else {
          inCodeBlock = false
          result.codeBlocks.push({
            language: codeBlockLanguage,
            code: codeBlockContent.join('\n')
          })
        }
        continue
      }

      if (inCodeBlock) {
        codeBlockContent.push(line)
        continue
      }

      // Skip if inside code block
      if (inCodeBlock) continue

      const trimmed = line.trim()

      // Headings
      const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/)
      if (headingMatch) {
        result.headings.push({
          level: headingMatch[1].length,
          text: headingMatch[2]
        })
        if (currentList) {
          result.lists.push(currentList)
          currentList = null
        }
        continue
      }

      // Blockquotes
      if (trimmed.startsWith('> ')) {
        result.blockquotes.push(trimmed.substring(2))
        if (currentList) {
          result.lists.push(currentList)
          currentList = null
        }
        continue
      }

      // Links
      const linkMatch = trimmed.match(/\[([^\]]+)\]\(([^)]+)\)/g)
      if (linkMatch) {
        linkMatch.forEach(link => {
          const match = link.match(/\[([^\]]+)\]\(([^)]+)\)/)
          if (match) {
            result.links.push({ text: match[1], url: match[2] })
          }
        })
      }

      // Images
      const imageMatch = trimmed.match(/!\[([^\]]*)\]\(([^)]+)\)/g)
      if (imageMatch) {
        imageMatch.forEach(img => {
          const match = img.match(/!\[([^\]]*)\]\(([^)]+)\)/)
          if (match) {
            result.images.push({ alt: match[1], url: match[2] })
          }
        })
      }

      // Unordered lists
      if (/^[-*+]\s+/.test(trimmed)) {
        if (!currentList || currentList.type === 'ordered') {
          if (currentList) result.lists.push(currentList)
          currentList = { type: 'unordered', items: [] }
        }
        currentList.items.push(trimmed.replace(/^[-*+]\s+/, ''))
        continue
      }

      // Ordered lists
      if (/^\d+\.\s+/.test(trimmed)) {
        if (!currentList || currentList.type === 'unordered') {
          if (currentList) result.lists.push(currentList)
          currentList = { type: 'ordered', items: [] }
        }
        currentList.items.push(trimmed.replace(/^\d+\.\s+/, ''))
        continue
      }

      // Regular paragraph
      if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('>')) {
        result.paragraphs.push(trimmed)
        if (currentList) {
          result.lists.push(currentList)
          currentList = null
        }
      }
    }

    // Push any remaining list
    if (currentList) {
      result.lists.push(currentList)
    }

    return result
  }, [])

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }
    const parsed = parseMarkdown(input)
    const json = prettify ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed)
    setOutput(json)
  }, [input, prettify, parseMarkdown])

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
      const blob = new Blob([output], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "markdown.json"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput(`---
title: My Document
author: John Doe
---

# Introduction

This is a paragraph with a [link](https://example.com).

## Features

- Feature 1
- Feature 2
- Feature 3

## Code Example

\`\`\`javascript
console.log("Hello");
\`\`\`

> This is a quote

![Image](https://example.com/image.png)`)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Markdown to JSON Converter</h2>
            <p className="text-sm text-muted-foreground">
              Parse Markdown and convert to structured JSON
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={prettify}
            onChange={(e) => setPrettify(e.target.checked)}
            className="rounded border-gray-300"
          />
          Prettify JSON
        </label>
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
              Convert to JSON
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">JSON Output</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="JSON output will appear here..."
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
