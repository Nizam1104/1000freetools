"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function HtmlToMarkdownConverter() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const convertHtmlToMarkdown = useCallback((html: string): string => {
    let md = html

    // Remove script and style tags
    md = md.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    md = md.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")

    // Headers
    md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n")
    md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n")
    md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n\n")
    md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, "#### $1\n\n")
    md = md.replace(/<h5[^>]*>(.*?)<\/h5>/gi, "##### $1\n\n")
    md = md.replace(/<h6[^>]*>(.*?)<\/h6>/gi, "###### $1\n\n")

    // Bold and italic
    md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**")
    md = md.replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**")
    md = md.replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*")
    md = md.replace(/<i[^>]*>(.*?)<\/i>/gi, "*$1*")

    // Links
    md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)")

    // Images
    md = md.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi, "![$2]($1)")
    md = md.replace(/<img[^>]*src="([^"]*)"[^>]*>/gi, "![]($1)")

    // Code blocks
    md = md.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, "```\n$1\n```\n\n")
    md = md.replace(/<code[^>]*>(.*?)<\/code>/gi, "`$1`")

    // Blockquotes
    md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, "> $1\n")

    // Line breaks
    md = md.replace(/<br\s*\/?>/gi, "\n")

    // Horizontal rules
    md = md.replace(/<hr\s*\/?>/gi, "\n---\n")

    // Lists
    md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (match, content) => {
      return content.replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n")
    })
    md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (match, content, offset, string) => {
      let index = 1
      return content.replace(/<li[^>]*>(.*?)<\/li>/gi, () => `${index++}. $1\n`)
    })
    md = md.replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n")

    // Paragraphs
    md = md.replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n")

    // Remove remaining HTML tags
    md = md.replace(/<[^>]+>/g, "")

    // Decode HTML entities
    md = md.replace(/&nbsp;/g, " ")
    md = md.replace(/&amp;/g, "&")
    md = md.replace(/&lt;/g, "<")
    md = md.replace(/&gt;/g, ">")
    md = md.replace(/&quot;/g, '"')
    md = md.replace(/&#39;/g, "'")

    // Clean up extra whitespace
    md = md.replace(/\n{3,}/g, "\n\n")
    md = md.trim()

    return md
  }, [])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setOutput(convertHtmlToMarkdown(value))
  }, [convertHtmlToMarkdown])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="html-input" className="text-base font-medium">HTML</Label>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="xs" onClick={() => copyToClipboard(input, "input")} className="h-7" disabled={!input}>
                {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
              <Button variant="ghost" size="xs" onClick={() => { setInput(""); setOutput(""); }} className="h-7">
                <Trash2 className="size-3.5" />
                <span className="text-xs">Clear</span>
              </Button>
            </div>
          </div>
          <Textarea id="html-input" value={input} onChange={(e) => handleInputChange(e.target.value)}
            className="font-mono text-sm min-h-[400px]" placeholder="<h1>Enter HTML here</h1>..." />
        </section>

        {/* Output Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="markdown-output" className="text-base font-medium">Markdown</Label>
            <Button variant="ghost" size="xs" onClick={() => copyToClipboard(output, "output")} className="h-7" disabled={!output}>
              {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>
          <Textarea id="markdown-output" value={output} readOnly className="font-mono text-sm min-h-[400px] bg-muted/50" placeholder="Markdown output..." />
        </section>
      </div>
    </div>
  )
}
