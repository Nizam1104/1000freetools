"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MarkdownTableOfContentsGenerator() {
  const [input, setInput] = useState<string>("")
  const [toc, setToc] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)
  const [format, setFormat] = useState<"bullet" | "numbered" | "inline">("bullet")

  const generateToc = useCallback((markdown: string, fmt: string): string => {
    const headerRegex = /^(#{1,6})\s+(.+)$/gm
    const headers: { level: number; text: string; id: string }[] = []
    let match

    while ((match = headerRegex.exec(markdown)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")
      headers.push({ level, text, id })
    }

    if (headers.length === 0) return ""

    if (fmt === "bullet") {
      return headers.map(h => `${"  ".repeat(h.level - 1)}- [${h.text}](#${h.id})`).join("\n")
    } else if (fmt === "numbered") {
      return headers.map((h, i) => `${"  ".repeat(h.level - 1)}${i + 1}. [${h.text}](#${h.id})`).join("\n")
    } else {
      return headers.map(h => `[${h.text}](#${h.id})`).join(" | ")
    }
  }, [])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setToc(generateToc(value, format))
  }, [generateToc, format])

  const handleFormatChange = useCallback((newFormat: "bullet" | "numbered" | "inline") => {
    setFormat(newFormat)
    setToc(generateToc(input, newFormat))
  }, [input, generateToc])

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
      {/* Format Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">TOC Format</Label>
        <div className="flex gap-2">
          <Button variant={format === "bullet" ? "default" : "outline"} onClick={() => handleFormatChange("bullet")} className="flex-1">Bullet List</Button>
          <Button variant={format === "numbered" ? "default" : "outline"} onClick={() => handleFormatChange("numbered")} className="flex-1">Numbered List</Button>
          <Button variant={format === "inline" ? "default" : "outline"} onClick={() => handleFormatChange("inline")} className="flex-1">Inline Links</Button>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="markdown-input" className="text-base font-medium">Markdown Document</Label>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="xs" onClick={() => copyToClipboard(input, "input")} className="h-7" disabled={!input}>
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button variant="ghost" size="xs" onClick={() => { setInput(""); setToc(""); }} className="h-7">
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>
        <Textarea id="markdown-input" value={input} onChange={(e) => handleInputChange(e.target.value)}
          className="font-mono text-sm min-h-[300px]" placeholder="# Heading 1&#10;## Heading 2&#10;### Heading 3..." />
      </section>

      {/* TOC Output */}
      {toc && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Table of Contents</Label>
            <Button variant="ghost" size="xs" onClick={() => copyToClipboard(toc, "toc")} className="h-7">
              {copied === "toc" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>
          <Textarea value={toc} readOnly className="font-mono text-sm min-h-[150px] bg-muted/50" />
        </section>
      )}

      {/* Preview */}
      {toc && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Preview</Label>
          <div className="rounded-lg border bg-background p-4" dangerouslySetInnerHTML={{ __html: toc.replace(/\n/g, "<br>").replace(/\[([^\]]+)\]\(#([^)]+)\)/g, '<a href="#$2">$1</a>') }} />
        </section>
      )}
    </div>
  )
}
