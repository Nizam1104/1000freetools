"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, FileText } from "lucide-react"

export function MarkdownToWordpressHtmlConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [addComments, setAddComments] = useState(true)
  const [preserveShortcodes, setPreserveShortcodes] = useState(true)

  const convertToWordpressHtml = useCallback((markdown: string, options: { addComments: boolean; preserveShortcodes: boolean }): string => {
    let html = markdown
    let inCodeBlock = false

    // Process line by line for block elements
    const lines = html.split('\n')
    const processedLines: string[] = []

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i]

      // Preserve shortcodes
      if (options.preserveShortcodes && /\[\/?\w+/.test(line)) {
        processedLines.push(line)
        continue
      }

      // Code blocks
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true
          const lang = line.trim().substring(3)
          processedLines.push(options.addComments ? `<!-- wp:code -->` : '')
          processedLines.push(`<pre><code class="language-${lang}">`)
        } else {
          inCodeBlock = false
          processedLines.push(`</code></pre>`)
          processedLines.push(options.addComments ? `<!-- /wp:code -->` : '')
        }
        continue
      }

      if (inCodeBlock) {
        // Escape HTML in code
        line = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        processedLines.push(line)
        continue
      }

      const trimmed = line.trim()

      // Headers
      if (trimmed.startsWith('###### ')) {
        processedLines.push(options.addComments ? `<!-- wp:heading {"level":6} -->` : '')
        processedLines.push(`<h6>${processInline(trimmed.substring(7))}</h6>`)
        processedLines.push(options.addComments ? `<!-- /wp:heading -->` : '')
      } else if (trimmed.startsWith('##### ')) {
        processedLines.push(options.addComments ? `<!-- wp:heading {"level":5} -->` : '')
        processedLines.push(`<h5>${processInline(trimmed.substring(6))}</h5>`)
        processedLines.push(options.addComments ? `<!-- /wp:heading -->` : '')
      } else if (trimmed.startsWith('#### ')) {
        processedLines.push(options.addComments ? `<!-- wp:heading {"level":4} -->` : '')
        processedLines.push(`<h4>${processInline(trimmed.substring(5))}</h4>`)
        processedLines.push(options.addComments ? `<!-- /wp:heading -->` : '')
      } else if (trimmed.startsWith('### ')) {
        processedLines.push(options.addComments ? `<!-- wp:heading {"level":3} -->` : '')
        processedLines.push(`<h3>${processInline(trimmed.substring(4))}</h3>`)
        processedLines.push(options.addComments ? `<!-- /wp:heading -->` : '')
      } else if (trimmed.startsWith('## ')) {
        processedLines.push(options.addComments ? `<!-- wp:heading {"level":2} -->` : '')
        processedLines.push(`<h2>${processInline(trimmed.substring(3))}</h2>`)
        processedLines.push(options.addComments ? `<!-- /wp:heading -->` : '')
      } else if (trimmed.startsWith('# ')) {
        processedLines.push(options.addComments ? `<!-- wp:heading -->` : '')
        processedLines.push(`<h1>${processInline(trimmed.substring(2))}</h1>`)
        processedLines.push(options.addComments ? `<!-- /wp:heading -->` : '')
      }
      // Blockquotes
      else if (trimmed.startsWith('> ')) {
        processedLines.push(options.addComments ? `<!-- wp:quote -->` : '')
        processedLines.push(`<blockquote class="wp-block-quote"><p>${processInline(trimmed.substring(2))}</p></blockquote>`)
        processedLines.push(options.addComments ? `<!-- /wp:quote -->` : '')
      }
      // Images
      else if (trimmed.startsWith('![')) {
        const match = trimmed.match(/!\[([^\]]*)\]\(([^)]+)\)/)
        if (match) {
          processedLines.push(options.addComments ? `<!-- wp:image -->` : '')
          processedLines.push(`<figure class="wp-block-image"><img src="${match[2]}" alt="${match[1]}"/></figure>`)
          processedLines.push(options.addComments ? `<!-- /wp:image -->` : '')
        }
      }
      // Horizontal rule
      else if (trimmed.startsWith('---') || trimmed.startsWith('***') || trimmed.startsWith('___')) {
        processedLines.push(options.addComments ? `<!-- wp:separator -->` : '')
        processedLines.push(`<hr class="wp-block-separator"/>`)
        processedLines.push(options.addComments ? `<!-- /wp:separator -->` : '')
      }
      // Unordered lists
      else if (/^[-*+]\s/.test(trimmed)) {
        processedLines.push(options.addComments ? `<!-- wp:list -->` : '')
        processedLines.push(`<ul class="wp-block-list">`)
        // Process list items
        let j = i
        while (j < lines.length && /^[-*+]\s/.test(lines[j].trim())) {
          const itemMatch = lines[j].trim().match(/^[-*+]\s+(.+)$/)
          if (itemMatch) {
            processedLines.push(`<li>${processInline(itemMatch[1])}</li>`)
          }
          j++
        }
        processedLines.push(`</ul>`)
        processedLines.push(options.addComments ? `<!-- /wp:list -->` : '')
        i = j - 1
      }
      // Ordered lists
      else if (/^\d+\.\s/.test(trimmed)) {
        processedLines.push(options.addComments ? `<!-- wp:list {"ordered":true} -->` : '')
        processedLines.push(`<ol class="wp-block-list">`)
        let j = i
        while (j < lines.length && /^\d+\.\s/.test(lines[j].trim())) {
          const itemMatch = lines[j].trim().match(/^\d+\.\s+(.+)$/)
          if (itemMatch) {
            processedLines.push(`<li>${processInline(itemMatch[1])}</li>`)
          }
          j++
        }
        processedLines.push(`</ol>`)
        processedLines.push(options.addComments ? `<!-- /wp:list -->` : '')
        i = j - 1
      }
      // Empty line
      else if (!trimmed) {
        processedLines.push('')
      }
      // Paragraph
      else {
        processedLines.push(options.addComments ? `<!-- wp:paragraph -->` : '')
        processedLines.push(`<p>${processInline(trimmed)}</p>`)
        processedLines.push(options.addComments ? `<!-- /wp:paragraph -->` : '')
      }
    }

    return processedLines.join('\n')
  }, [])

  const processInline = (text: string): string => {
    let result = text

    // Bold
    result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    result = result.replace(/__([^_]+)__/g, '<strong>$1</strong>')

    // Italic
    result = result.replace(/\*([^*]+)\*/g, '<em>$1</em>')
    result = result.replace(/_([^_]+)_/g, '<em>$1</em>')

    // Strikethrough
    result = result.replace(/~~([^~]+)~~/g, '<del>$1</del>')

    // Inline code
    result = result.replace(/`([^`]+)`/g, '<code>$1</code>')

    // Links
    result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

    return result
  }

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }
    const html = convertToWordpressHtml(input, { addComments, preserveShortcodes })
    setOutput(html)
  }, [input, convertToWordpressHtml, addComments, preserveShortcodes])

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
      const blob = new Blob([output], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "wordpress.html"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput(`# Welcome to My Blog

This is my **first post** using Markdown.

## Features

- Easy to write
- Converts to WordPress
- Saves time

> Markdown is awesome!

[Visit our website](https://example.com)

\`\`\`javascript
console.log("Hello World");
\`\`\``)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Markdown to WordPress HTML</h2>
            <p className="text-sm text-muted-foreground">
              Convert Markdown to WordPress Gutenberg HTML blocks
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={addComments}
            onChange={(e) => setAddComments(e.target.checked)}
            className="rounded border-gray-300"
          />
          Add WordPress Block Comments
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={preserveShortcodes}
            onChange={(e) => setPreserveShortcodes(e.target.checked)}
            className="rounded border-gray-300"
          />
          Preserve Shortcodes
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
              <FileText className="h-4 w-4 mr-2" />
              Convert to HTML
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">WordPress HTML</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="WordPress HTML will appear here..."
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
