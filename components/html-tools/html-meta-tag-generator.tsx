"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download } from "lucide-react"

export function HtmlMetaTagGenerator() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [keywords, setKeywords] = useState("")
  const [author, setAuthor] = useState("")
  const [ogImage, setOgImage] = useState("")
  const [twitterCard, setTwitterCard] = useState("summary_large_image")
  const [canonical, setCanonical] = useState("")
  const [copied, setCopied] = useState(false)

  const generateMetaTags = useCallback(() => {
    const tags: string[] = []

    // Basic meta tags
    if (title) {
      tags.push(`  <title>${title}</title>`)
      tags.push(`  <meta name="title" content="${title}">`)
    }
    if (description) {
      tags.push(`  <meta name="description" content="${description}">`)
    }
    if (keywords) {
      tags.push(`  <meta name="keywords" content="${keywords}">`)
    }
    if (author) {
      tags.push(`  <meta name="author" content="${author}">`)
    }

    // Open Graph / Facebook
    tags.push(`  <!-- Open Graph / Facebook -->`)
    tags.push(`  <meta property="og:type" content="website">`)
    if (canonical) {
      tags.push(`  <meta property="og:url" content="${canonical}">`)
    }
    if (title) {
      tags.push(`  <meta property="og:title" content="${title}">`)
    }
    if (description) {
      tags.push(`  <meta property="og:description" content="${description}">`)
    }
    if (ogImage) {
      tags.push(`  <meta property="og:image" content="${ogImage}">`)
    }

    // Twitter
    tags.push(`  <!-- Twitter -->`)
    tags.push(`  <meta property="twitter:card" content="${twitterCard}">`)
    if (canonical) {
      tags.push(`  <meta property="twitter:url" content="${canonical}">`)
    }
    if (title) {
      tags.push(`  <meta property="twitter:title" content="${title}">`)
    }
    if (description) {
      tags.push(`  <meta property="twitter:description" content="${description}">`)
    }
    if (ogImage) {
      tags.push(`  <meta property="twitter:image" content="${ogImage}">`)
    }

    return tags.join('\n')
  }, [title, description, keywords, author, ogImage, twitterCard, canonical])

  const handleCopy = useCallback(async () => {
    const output = generateMetaTags()
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [generateMetaTags])

  const handleClear = useCallback(() => {
    setTitle("")
    setDescription("")
    setKeywords("")
    setAuthor("")
    setOgImage("")
    setCanonical("")
  }, [])

  const output = generateMetaTags()

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">HTML Meta Tag Generator</h2>
            <p className="text-sm text-muted-foreground">
              Generate SEO-friendly meta tags for your website
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleClear}>
            Clear All
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Page Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              placeholder="My Awesome Page"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              placeholder="A brief description of your page (150-160 characters)"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="keywords">Keywords (comma-separated)</Label>
            <Input
              id="keywords"
              value={keywords}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeywords(e.target.value)}
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>

          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={author}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
              placeholder="John Doe"
            />
          </div>

          <div>
            <Label htmlFor="canonical">Canonical URL</Label>
            <Input
              id="canonical"
              value={canonical}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCanonical(e.target.value)}
              placeholder="https://example.com/page"
            />
          </div>

          <div>
            <Label htmlFor="ogImage">Open Graph Image URL</Label>
            <Input
              id="ogImage"
              value={ogImage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOgImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <Label htmlFor="twitterCard">Twitter Card Type</Label>
            <select
              id="twitterCard"
              value={twitterCard}
              onChange={(e) => setTwitterCard(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background text-sm"
            >
              <option value="summary">Summary</option>
              <option value="summary_large_image">Summary with Large Image</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Generated Meta Tags</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            className="min-h-[500px] font-mono text-sm bg-muted"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleCopy} disabled={!output} className="flex-1">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>

          <div className="p-4 bg-muted rounded-lg space-y-2">
            <h3 className="font-medium text-sm">Preview</h3>
            <div className="space-y-2 text-sm">
              <p className="font-medium text-blue-600 dark:text-blue-400">
                {title || "Page Title"}
              </p>
              <p className="text-muted-foreground">
                {canonical || "https://example.com"}
              </p>
              <p className="text-muted-foreground">
                {description || "Page description will appear here..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
