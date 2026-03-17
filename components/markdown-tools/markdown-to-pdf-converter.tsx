"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, FileText, Printer } from "lucide-react"

export function MarkdownToPdfConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [pageSize, setPageSize] = useState<"a4" | "letter" | "legal">("a4")
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait")
  const [includeStyles, setIncludeStyles] = useState(true)

  const convertToPdfHtml = useCallback((markdown: string, options: { 
    pageSize: string; 
    orientation: string;
    includeStyles: boolean 
  }): string => {
    let html = markdown

    // Process headers
    html = html.replace(/^###### (.+)$/gm, '<h6>$1</h6>')
    html = html.replace(/^##### (.+)$/gm, '<h5>$1</h5>')
    html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')

    // Bold and italic
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>')
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')
    html = html.replace(/_([^_]+)_/g, '<em>$1</em>')
    html = html.replace(/~~([^~]+)~~/g, '<del>$1</del>')

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1"/>')

    // Horizontal rule
    html = html.replace(/^---$/gm, '<hr/>')
    html = html.replace(/^\*\*\*$/gm, '<hr/>')

    // Blockquotes
    html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')

    // Code blocks
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
      const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      return `<pre><code class="language-${lang}">${escaped}</code></pre>`
    })

    // Lists
    html = html.replace(/^[-*+] (.+)$/gm, '<li>$1</li>')
    
    // Wrap consecutive list items
    html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
      if (match.includes('<li>')) {
        return '<ul>' + match + '</ul>'
      }
      return match
    })

    // Paragraphs (lines that aren't already HTML)
    const lines = html.split('\n')
    const processedLines = lines.map(line => {
      const trimmed = line.trim()
      if (!trimmed) return '<br/>'
      if (trimmed.startsWith('<')) return line
      return `<p>${trimmed}</p>`
    })

    html = processedLines.join('\n')

    const styles = options.includeStyles ? `
      <style>
        body {
          font-family: Georgia, serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        h1, h2, h3, h4, h5, h6 {
          color: #2c3e50;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        h1 { font-size: 2em; border-bottom: 2px solid #eee; padding-bottom: 0.3em; }
        h2 { font-size: 1.5em; border-bottom: 1px solid #eee; padding-bottom: 0.3em; }
        code {
          background: #f4f4f4;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
        }
        pre {
          background: #f4f4f4;
          padding: 15px;
          border-radius: 5px;
          overflow-x: auto;
        }
        pre code {
          background: none;
          padding: 0;
        }
        blockquote {
          border-left: 4px solid #ddd;
          margin: 1em 0;
          padding-left: 1em;
          color: #666;
        }
        a { color: #3498db; text-decoration: none; }
        a:hover { text-decoration: underline; }
        img { max-width: 100%; height: auto; }
        ul, ol { padding-left: 2em; }
        li { margin: 0.5em 0; }
        hr { border: none; border-top: 1px solid #ddd; margin: 2em 0; }
        @media print {
          body { max-width: none; }
          a { color: #000; }
        }
      </style>` : ''

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  ${styles}
</head>
<body>
${html}
</body>
</html>`
  }, [])

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }
    const html = convertToPdfHtml(input, { pageSize, orientation, includeStyles })
    setOutput(html)
  }, [input, convertToPdfHtml, pageSize, orientation, includeStyles])

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
      a.download = "document.html"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handlePrint = useCallback(() => {
    if (output) {
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.write(output)
        printWindow.document.close()
        printWindow.print()
      }
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput(`# My Document

This is a sample document converted to PDF-ready HTML.

## Section 1

This is **bold** and *italic* text.

### Subsection

- Item 1
- Item 2
- Item 3

> This is a quote

[Link example](https://example.com)

\`\`\`
code block
\`\`\``)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Markdown to PDF Converter</h2>
            <p className="text-sm text-muted-foreground">
              Convert Markdown to PDF-ready HTML
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Label>Page Size:</Label>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value as any)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="a4">A4</option>
            <option value="letter">Letter</option>
            <option value="legal">Legal</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Label>Orientation:</Label>
          <select
            value={orientation}
            onChange={(e) => setOrientation(e.target.value as any)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={includeStyles}
            onChange={(e) => setIncludeStyles(e.target.checked)}
            className="rounded border-gray-300"
          />
          Include Styles
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
          <Label htmlFor="output">PDF-Ready HTML</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="HTML output will appear here..."
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
          <Button onClick={handlePrint} disabled={!output} className="w-full">
            <Printer className="h-4 w-4 mr-2" />
            Print to PDF
          </Button>
        </div>
      </div>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">How to Create PDF</h3>
        <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
          <li>Click "Convert to HTML" to generate the HTML</li>
          <li>Click "Print to PDF" to open the print dialog</li>
          <li>Select "Save as PDF" as the destination</li>
          <li>Click "Save" to create your PDF file</li>
        </ol>
      </div>
    </div>
  )
}
