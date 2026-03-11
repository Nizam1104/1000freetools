"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"

export function HtmlToMarkdownConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const convertToMarkdown = useCallback((html: string): string => {
    let md = html

    // Remove script and style tags
    md = md.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    md = md.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")

    // Headers
    md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "# $1\n\n")
    md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "## $1\n\n")
    md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "### $1\n\n")
    md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "#### $1\n\n")
    md = md.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, "##### $1\n\n")
    md = md.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, "###### $1\n\n")

    // Bold and italic
    md = md.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**")
    md = md.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**")
    md = md.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "*$1*")
    md = md.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, "*$1*")

    // Links
    md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")
    md = md.replace(/<a[^>]*href='([^']*)'[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")

    // Images
    md = md.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, "![$2]($1)\n")
    md = md.replace(/<img[^>]*src='([^']*)'[^>]*alt='([^']*)'[^>]*\/?>/gi, "![$2]($1)\n")
    md = md.replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, "![]($1)\n")

    // Lists
    md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (match, content) => {
      return content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n")
    })
    md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (match, content, offset, string) => {
      let index = 1
      return content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, () => `${index++}. $1\n`)
    })
    md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n")

    // Code
    md = md.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, "`$1`")
    md = md.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, "```\n$1\n```\n")

    // Blockquotes
    md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, "> $1\n")

    // Horizontal rules
    md = md.replace(/<hr[^>]*\/?>/gi, "\n---\n")
    md = md.replace(/<hr>/gi, "\n---\n")

    // Line breaks
    md = md.replace(/<br[^>]*\/?>/gi, "\n")
    md = md.replace(/<br>/gi, "\n")

    // Paragraphs
    md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "$1\n\n")

    // Tables
    md = md.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (match, content) => {
      const rows = content.match(/<t[rdh][^>]*>([\s\S]*?)<\/t[rdh]>/gi) || []
      if (rows.length === 0) return ""
      
      let table = ""
      let headerDone = false
      
      rows.forEach((row: string) => {
        const cells = row.match(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi) || []
        const cellContents = cells.map((cell: string) => {
          const match = cell.match(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/i)
          return match ? match[1].trim() : ""
        })
        
        if (!headerDone) {
          table += "| " + cellContents.join(" | ") + " |\n"
          table += "|" + cellContents.map(() => " --- ").join("|") + "|\n"
          headerDone = true
        } else {
          table += "| " + cellContents.join(" | ") + " |\n"
        }
      })
      
      return table + "\n"
    })

    // Remove remaining HTML tags
    md = md.replace(/<[^>]+>/g, "")

    // Clean up extra whitespace
    md = md.replace(/\n{3,}/g, "\n\n")
    md = md.trim()

    return md
  }, [])

  const handleConvert = useCallback(() => {
    try {
      setError("")
      const markdown = convertToMarkdown(input)
      setOutput(markdown)
    } catch (e) {
      setError(`Conversion error: ${e instanceof Error ? e.message : "Unknown error"}`)
      setOutput("")
    }
  }, [input, convertToMarkdown])

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
    setError("")
  }, [])

  const handleExample = useCallback(() => {
    setInput(`<h1>Welcome to My Blog</h1>
<p>This is a <strong>bold</strong> and <em>italic</em> text.</p>
<h2>Features</h2>
<ul>
  <li>Feature 1</li>
  <li>Feature 2</li>
  <li>Feature 3</li>
</ul>
<p>Visit <a href="https://example.com">our website</a> for more info.</p>
<blockquote>A famous quote</blockquote>
<pre><code>const hello = "world";</code></pre>`)
    setError("")
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">HTML to Markdown Converter</h2>
            <p className="text-sm text-muted-foreground">
              Convert HTML content to Markdown format
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">HTML Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your HTML here..."
            className="min-h-[500px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleConvert} className="flex-1" disabled={!input}>
              Convert to Markdown
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Markdown Output</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Markdown output will appear here..."
            className="min-h-[500px] font-mono text-sm bg-muted"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleCopy} disabled={!output} className="flex-1">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">Supported HTML Elements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
          <div>Headers (h1-h6)</div>
          <div>Bold/Italic</div>
          <div>Links</div>
          <div>Images</div>
          <div>Lists (ul, ol, li)</div>
          <div>Code blocks</div>
          <div>Blockquotes</div>
          <div>Tables</div>
          <div>Horizontal rules</div>
          <div>Line breaks</div>
        </div>
      </div>
    </div>
  )
}
