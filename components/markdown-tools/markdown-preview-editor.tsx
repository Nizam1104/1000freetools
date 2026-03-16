"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MarkdownPreviewEditor() {
  const [input, setInput] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const convertMarkdownToHtml = (markdown: string): string => {
    let html = markdown
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>")
    html = html.replace(/^###### (.*$)/gim, "<h6>$1</h6>")
    html = html.replace(/^##### (.*$)/gim, "<h5>$1</h5>")
    html = html.replace(/^#### (.*$)/gim, "<h4>$1</h4>")
    html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>")
    html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>")
    html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>")
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>")
    html = html.replace(/~~(.*?)~~/g, "<del>$1</del>")
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" />')
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    html = html.replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")
    html = html.replace(/^---$/gim, "<hr />")
    html = html.replace(/^\s*[-*+]\s+(.*$)/gim, "<li>$1</li>")
    html = html.replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
    html = html.replace(/\n$/gim, "<br />")
    return html
  }

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
  }, [])

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
        {/* Editor Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="markdown-editor" className="text-base font-medium">Markdown Editor</Label>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="xs" onClick={() => copyToClipboard(input, "input")} className="h-7" disabled={!input}>
                {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
              <Button variant="ghost" size="xs" onClick={() => setInput("")} className="h-7">
                <Trash2 className="size-3.5" />
                <span className="text-xs">Clear</span>
              </Button>
            </div>
          </div>
          <Textarea id="markdown-editor" value={input} onChange={(e) => handleInputChange(e.target.value)}
            className="font-mono text-sm min-h-[500px]" placeholder="# Start writing Markdown..." />
        </section>

        {/* Preview Section */}
        <section className="space-y-3">
          <Label className="text-base font-medium">Preview</Label>
          <div className="rounded-lg border bg-background p-6 min-h-[500px] overflow-auto prose prose-sm max-w-none">
            {input ? (
              <div dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(input) }} />
            ) : (
              <p className="text-muted-foreground italic">Preview will appear here...</p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
