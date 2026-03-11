"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MarkdownToHtmlConverter() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const convertMarkdownToHtml = useCallback((markdown: string): string => {
    let html = markdown

    // Code blocks (must be before other rules)
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
      return `<pre><code class="language-${lang || ""}">${code.trim()}</code></pre>`
    })

    // Inline code
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>")

    // Headers
    html = html.replace(/^###### (.*$)/gim, "<h6>$1</h6>")
    html = html.replace(/^##### (.*$)/gim, "<h5>$1</h5>")
    html = html.replace(/^#### (.*$)/gim, "<h4>$1</h4>")
    html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>")
    html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>")
    html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>")

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    html = html.replace(/__(.*?)__/g, "<strong>$1</strong>")

    // Italic
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>")
    html = html.replace(/_(.*?)_/g, "<em>$1</em>")

    // Strikethrough
    html = html.replace(/~~(.*?)~~/g, "<del>$1</del>")

    // Images (must be before links)
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" />')

    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')

    // Blockquotes
    html = html.replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")

    // Horizontal rule
    html = html.replace(/^---$/gim, "<hr />")

    // Unordered lists
    html = html.replace(/^\s*[-*+]\s+(.*$)/gim, "<li>$1</li>")
    html = html.replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")

    // Ordered lists
    html = html.replace(/^\s*\d+\.\s+(.*$)/gim, "<li>$1</li>")

    // Line breaks
    html = html.replace(/\n$/gim, "<br />")

    // Paragraphs (simple approach)
    html = html.split(/\n\n+/).map(para => {
      if (para.trim() && !para.startsWith("<h") && !para.startsWith("<ul") && !para.startsWith("<li") && !para.startsWith("<blockquote") && !para.startsWith("<pre")) {
        return `<p>${para}</p>`
      }
      return para
    }).join("\n")

    return html
  }, [])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setOutput(convertMarkdownToHtml(value))
  }, [convertMarkdownToHtml])

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
            <Label htmlFor="markdown-input" className="text-base font-medium">Markdown</Label>
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
          <Textarea id="markdown-input" value={input} onChange={(e) => handleInputChange(e.target.value)}
            className="font-mono text-sm min-h-[400px]" placeholder="# Enter Markdown here..." />
        </section>

        {/* Output Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="html-output" className="text-base font-medium">HTML</Label>
            <Button variant="ghost" size="xs" onClick={() => copyToClipboard(output, "output")} className="h-7" disabled={!output}>
              {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>
          <Textarea id="html-output" value={output} readOnly className="font-mono text-sm min-h-[400px] bg-muted/50" placeholder="HTML output..." />
        </section>
      </div>

      {/* Preview Section */}
      {output && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Preview</Label>
          <div className="rounded-lg border bg-background p-6 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: output }} />
        </section>
      )}
    </div>
  )
}
