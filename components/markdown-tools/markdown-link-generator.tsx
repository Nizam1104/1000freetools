"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Link2 } from "lucide-react"

export function MarkdownLinkGenerator() {
  const [text, setText] = useState("")
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [linkType, setLinkType] = useState<"inline" | "reference" | "autolink">("inline")
  const [referenceLabel, setReferenceLabel] = useState("")

  const generateLink = useCallback(() => {
    switch (linkType) {
      case "inline":
        let inline = `[${text}](${url}`
        if (title) {
          inline += ` "${title}"`
        }
        inline += ')'
        setOutput(inline)
        break

      case "reference":
        const refLabel = referenceLabel || text
        setOutput(`[${text}][${refLabel}]\n\n[${refLabel}]: ${url}${title ? ` "${title}"` : ''}`)
        break

      case "autolink":
        setOutput(`<${url}>`)
        break
    }
  }, [linkType, text, url, title, referenceLabel])

  const generateHtml = useCallback(() => {
    let html = `<a href="${url}"`
    if (title) {
      html += ` title="${title}"`
    }
    html += `>${text}</a>`
    setOutput(html)
  }, [url, title, text])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setText("")
    setUrl("")
    setTitle("")
    setReferenceLabel("")
    setOutput("")
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "link.md"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Markdown Link Generator</h2>
            <p className="text-sm text-muted-foreground">
              Generate Markdown link syntax in various formats
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant={linkType === "inline" ? "default" : "outline"}
          size="sm"
          onClick={() => setLinkType("inline")}
        >
          Inline Link
        </Button>
        <Button
          variant={linkType === "reference" ? "default" : "outline"}
          size="sm"
          onClick={() => setLinkType("reference")}
        >
          Reference Link
        </Button>
        <Button
          variant={linkType === "autolink" ? "default" : "outline"}
          size="sm"
          onClick={() => setLinkType("autolink")}
        >
          Autolink
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="text">Link Text</Label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Click here"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="url">URL</Label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Title (Optional)</Label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tooltip text"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        {linkType === "reference" && (
          <div className="space-y-2">
            <Label htmlFor="refLabel">Reference Label</Label>
            <input
              type="text"
              id="refLabel"
              value={referenceLabel}
              onChange={(e) => setReferenceLabel(e.target.value)}
              placeholder="Defaults to link text"
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={generateLink} className="flex-1" disabled={!text || !url}>
          <Link2 className="h-4 w-4 mr-2" />
          Generate Markdown
        </Button>
        <Button onClick={generateHtml} variant="outline" disabled={!text || !url}>
          Generate HTML
        </Button>
        <Button variant="outline" onClick={handleClear} title="Clear">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {output && (
        <div className="space-y-4">
          <Label htmlFor="output">Generated Link</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            className="min-h-[100px] font-mono text-sm bg-muted"
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
      )}

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">Link Types</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li><strong>Inline:</strong> <code className="bg-background px-1 rounded">[text](url "title")</code></li>
          <li><strong>Reference:</strong> <code className="bg-background px-1 rounded">[text][label]</code> with <code className="bg-background px-1 rounded">[label]: url</code></li>
          <li><strong>Autolink:</strong> <code className="bg-background px-1 rounded">&lt;url&gt;</code></li>
        </ul>
      </div>
    </div>
  )
}
