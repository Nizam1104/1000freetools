"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download } from "lucide-react"

export function HtmlTagRemoverStripper() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [options, setOptions] = useState({
    keepLinks: false,
    keepImages: false,
    keepFormatting: false,
    preserveWhitespace: true,
  })

  const stripTags = useCallback((html: string): string => {
    let result = html

    if (options.keepLinks) {
      // Extract links before stripping
      const links: string[] = []
      result = result.replace(/<a\s+href="([^"]*)"[^>]*>([^<]*)<\/a>/gi, (match, href, text) => {
        links.push(`${text} (${href})`)
        return options.preserveWhitespace ? text : text
      })
    }

    if (options.keepImages) {
      // Keep image alt text
      result = result.replace(/<img[^>]*alt="([^"]*)"[^>]*\/?>/gi, '[Image: $1]')
      result = result.replace(/<img[^>]*\/?>/gi, '[Image]')
    }

    // Remove all HTML tags
    result = result.replace(/<[^>]+>/g, '')

    // Decode HTML entities
    result = result
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ')

    if (options.preserveWhitespace) {
      // Normalize whitespace but preserve paragraphs
      result = result.replace(/\s+/g, ' ').trim()
    } else {
      result = result.trim()
    }

    return result
  }, [options])

  const handleStrip = useCallback(() => {
    const stripped = stripTags(input)
    setOutput(stripped)
  }, [input, stripTags])

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
      a.download = "stripped-text.txt"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const charCount = output.length
  const wordCount = output.trim() ? output.trim().split(/\s+/).length : 0

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">HTML Tag Remover / Stripper</h2>
            <p className="text-sm text-muted-foreground">
              Remove HTML tags and extract plain text
            </p>
          </div>
          {output && (
            <div className="text-sm text-muted-foreground">
              {wordCount} words • {charCount} characters
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">HTML Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your HTML here..."
            className="min-h-[400px] font-mono text-sm"
          />
          
          <div className="space-y-2 p-4 bg-muted rounded-lg">
            <Label className="text-sm font-medium">Options</Label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={options.keepLinks}
                  onChange={(e) => setOptions({ ...options, keepLinks: e.target.checked })}
                  className="rounded border-gray-300"
                />
                Keep links (extract as text)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={options.keepImages}
                  onChange={(e) => setOptions({ ...options, keepImages: e.target.checked })}
                  className="rounded border-gray-300"
                />
                Keep images (as [Image] placeholders)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={options.preserveWhitespace}
                  onChange={(e) => setOptions({ ...options, preserveWhitespace: e.target.checked })}
                  className="rounded border-gray-300"
                />
                Preserve whitespace
              </label>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={handleStrip} className="flex-1" disabled={!input}>
              Strip HTML Tags
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Plain Text Output</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Plain text will appear here..."
            className="min-h-[400px] font-mono text-sm bg-muted"
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
