"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Image as ImageIcon, Link2 } from "lucide-react"

export function MarkdownImageSyntaxGenerator() {
  const [url, setUrl] = useState("")
  const [alt, setAlt] = useState("")
  const [title, setTitle] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [mode, setMode] = useState<"image" | "link">("image")
  const [linkUrl, setLinkUrl] = useState("")

  const generateSyntax = useCallback(() => {
    if (mode === "image") {
      let syntax = `![${alt}](${url}`
      if (title) {
        syntax += ` "${title}"`
      }
      syntax += ')'
      setOutput(syntax)
    } else {
      // Link with image
      let imageSyntax = `![${alt}](${url}`
      if (title) {
        imageSyntax += ` "${title}"`
      }
      imageSyntax += ')'
      setOutput(`[${imageSyntax}](${linkUrl})`)
    }
  }, [mode, url, alt, title, linkUrl])

  const generateHtml = useCallback(() => {
    if (mode === "image") {
      let html = `<img src="${url}" alt="${alt}"`
      if (title) {
        html += ` title="${title}"`
      }
      html += ' />'
      setOutput(html)
    } else {
      let html = `<a href="${linkUrl}"><img src="${url}" alt="${alt}"`
      if (title) {
        html += ` title="${title}"`
      }
      html += ' /></a>'
      setOutput(html)
    }
  }, [mode, url, alt, title, linkUrl])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setUrl("")
    setAlt("")
    setTitle("")
    setLinkUrl("")
    setOutput("")
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = mode === "image" ? "image-syntax.md" : "linked-image.md"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output, mode])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Markdown Image Syntax Generator</h2>
            <p className="text-sm text-muted-foreground">
              Generate Markdown image syntax with alt text and title
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant={mode === "image" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("image")}
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          Image Only
        </Button>
        <Button
          variant={mode === "link" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("link")}
        >
          <Link2 className="h-4 w-4 mr-2" />
          Linked Image
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="url">Image URL</Label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/image.png"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="alt">Alt Text</Label>
          <input
            type="text"
            id="alt"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="Description of image"
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

        {mode === "link" && (
          <div className="space-y-2">
            <Label htmlFor="linkUrl">Link URL</Label>
            <input
              type="url"
              id="linkUrl"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={generateSyntax} className="flex-1" disabled={!url}>
          Generate Markdown
        </Button>
        <Button onClick={generateHtml} variant="outline" disabled={!url}>
          Generate HTML
        </Button>
        <Button variant="outline" onClick={handleClear} title="Clear">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {output && (
        <div className="space-y-4">
          <Label htmlFor="output">Generated Syntax</Label>
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
        <h3 className="font-medium">Syntax Reference</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li><strong>Basic:</strong> <code className="bg-background px-1 rounded">![alt](url)</code></li>
          <li><strong>With title:</strong> <code className="bg-background px-1 rounded">![alt](url "title")</code></li>
          <li><strong>Linked:</strong> <code className="bg-background px-1 rounded">[![alt](url)](link)</code></li>
        </ul>
      </div>
    </div>
  )
}
