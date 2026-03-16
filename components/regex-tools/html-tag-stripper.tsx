"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, Trash2, Download } from "lucide-react"

type Mode = "all" | "script" | "style" | "comments" | "specific"

export default function HtmlTagStripper() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<Mode>("all")
  const [tagsToRemove, setTagsToRemove] = useState<string>("")
  const [tagsToKeep, setTagsToKeep] = useState<string>("")
  const [normalizeWhitespace, setNormalizeWhitespace] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)

  const stripHtml = useCallback(() => {
    let result = input

    if (mode === "all") {
      // Remove all HTML tags
      result = result.replace(/<[^>]*>/g, "")
    } else if (mode === "script") {
      // Remove script tags and content
      result = result.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      result = result.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    } else if (mode === "style") {
      // Remove style tags and content
      result = result.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
      result = result.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    } else if (mode === "comments") {
      // Remove HTML comments
      result = result.replace(/<!--[\s\S]*?-->/g, "")
    } else if (mode === "specific") {
      // Remove specific tags
      if (tagsToRemove.trim()) {
        const tags = tagsToRemove.split(",").map(t => t.trim()).filter(t => t)
        tags.forEach(tag => {
          const regex = new RegExp(`<${tag}[^>]*>[\\s\\S]*?<\\/${tag}>|<${tag}[^>]*\\/?>`, "gi")
          result = result.replace(regex, "")
        })
      }
      // Keep specific tags (remove all others)
      if (tagsToKeep.trim()) {
        const keepTags = tagsToKeep.split(",").map(t => t.trim()).filter(t => t)
        if (keepTags.length > 0) {
          const allTags = input.match(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi) || []
          allTags.forEach(tag => {
            const tagName = tag.match(/<\/?([a-z][a-z0-9]*)/i)?.[1]?.toLowerCase()
            if (tagName && !keepTags.includes(tagName)) {
              const escapeRegex = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
              const regex = new RegExp(escapeRegex, "gi")
              result = result.replace(regex, "")
            }
          })
        }
      }
    }

    // Normalize whitespace if enabled
    if (normalizeWhitespace) {
      result = result.replace(/\s+/g, " ").trim()
    }

    setOutput(result)
  }, [input, mode, tagsToRemove, tagsToKeep, normalizeWhitespace])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const downloadOutput = useCallback(() => {
    const blob = new Blob([output], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "cleaned-text.txt"
    a.click()
    URL.revokeObjectURL(url)
  }, [output])

  const stats = useMemo(() => {
    const inputLength = input.length
    const outputLength = output.length
    const reduction = inputLength > 0 ? Math.round(((inputLength - outputLength) / inputLength) * 100) : 0
    return { inputLength, outputLength, reduction }
  }, [input, output])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Mode Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Strip Mode</Label>
        <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
          <TabsList className="w-full justify-start flex-wrap h-auto p-1 gap-1 bg-transparent">
            <TabsTrigger 
              value="all"
              className="text-xs px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              All Tags
            </TabsTrigger>
            <TabsTrigger 
              value="script"
              className="text-xs px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Script Tags
            </TabsTrigger>
            <TabsTrigger 
              value="style"
              className="text-xs px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Style Tags
            </TabsTrigger>
            <TabsTrigger 
              value="comments"
              className="text-xs px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Comments
            </TabsTrigger>
            <TabsTrigger 
              value="specific"
              className="text-xs px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Specific Tags
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </section>

      {/* Specific Tags Options */}
      {mode === "specific" && (
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="tags-remove" className="text-sm font-medium">
              Tags to Remove
            </Label>
            <Input
              id="tags-remove"
              value={tagsToRemove}
              onChange={(e) => setTagsToRemove(e.target.value)}
              placeholder="e.g., div, span, p"
              className="text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags-keep" className="text-sm font-medium">
              Tags to Keep (optional)
            </Label>
            <Input
              id="tags-keep"
              value={tagsToKeep}
              onChange={(e) => setTagsToKeep(e.target.value)}
              placeholder="e.g., b, i, br"
              className="text-sm"
            />
          </div>
        </section>
      )}

      {/* Options */}
      <section className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={normalizeWhitespace}
            onChange={(e) => setNormalizeWhitespace(e.target.checked)}
            className="rounded border-input"
          />
          Normalize whitespace
        </label>
      </section>

      {/* Input/Output */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="html-input" className="text-base font-medium">
              HTML Input
            </Label>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(input, "input")}
                className="h-7"
                disabled={!input}
              >
                {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              </Button>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setInput("")}
                className="h-7"
                disabled={!input}
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </div>
          <Textarea
            id="html-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="font-mono text-sm min-h-[200px]"
            placeholder="Paste HTML content here..."
          />
          <div className="text-xs text-muted-foreground">
            {input.length} characters
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="text-output" className="text-base font-medium">
              Plain Text Output
            </Label>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(output, "output")}
                className="h-7"
                disabled={!output}
              >
                {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              </Button>
              <Button
                variant="ghost"
                size="xs"
                onClick={downloadOutput}
                className="h-7"
                disabled={!output}
              >
                <Download className="size-3.5" />
              </Button>
            </div>
          </div>
          <Textarea
            id="text-output"
            value={output}
            readOnly
            className="font-mono text-sm min-h-[200px] bg-muted/30"
            placeholder="Cleaned text will appear here..."
          />
          <div className="text-xs text-muted-foreground">
            {output.length} characters
            {stats.reduction > 0 && (
              <span className="text-green-600 dark:text-green-400 ml-2">
                (-{stats.reduction}%)
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Action Button */}
      <Button onClick={stripHtml} className="w-full sm:w-auto" size="lg">
        Strip HTML Tags
      </Button>

      {/* Sample HTML */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Sample HTML</h3>
        <button
          onClick={() => setInput(`<div class="container">
  <h1>Hello World</h1>
  <p>This is a <strong>paragraph</strong> with <em>formatted</em> text.</p>
  <script>alert('Remove me!');</script>
  <style>.hidden { display: none; }</style>
  <!-- This is a comment -->
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>`)}
          className="w-full text-left rounded-lg border bg-background p-3 hover:bg-muted/50 transition-colors"
        >
          <code className="text-xs font-mono block whitespace-pre-wrap">
{`<div class="container">
  <h1>Hello World</h1>
  <p>This is a <strong>paragraph</strong>...`}
          </code>
          <span className="text-xs text-muted-foreground">Click to load sample HTML</span>
        </button>
      </section>
    </div>
  )
}

const Input = (props: React.ComponentProps<"input">) => (
  <input
    {...props}
    className={`w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 ${props.className || ""}`}
  />
)
