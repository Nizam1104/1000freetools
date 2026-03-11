"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download } from "lucide-react"

export function HtmlSitemapGenerator() {
  const [urls, setUrls] = useState("")
  const [output, setOutput] = useState("")
  const [format, setFormat] = useState<"xml" | "html">("xml")
  const [copied, setCopied] = useState(false)
  const [options, setOptions] = useState({
    includeLastmod: true,
    includeChangefreq: true,
    includePriority: true,
    changefreq: "weekly",
    priority: "0.5",
  })

  const generateSitemap = useCallback(() => {
    const urlList = urls.split('\n').filter(u => u.trim())
    
    if (format === "xml") {
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
      
      urlList.forEach(url => {
        const cleanUrl = url.trim()
        xml += '  <url>\n'
        xml += `    <loc>${cleanUrl}</loc>\n`
        
        if (options.includeLastmod) {
          xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`
        }
        
        if (options.includeChangefreq) {
          xml += `    <changefreq>${options.changefreq}</changefreq>\n`
        }
        
        if (options.includePriority) {
          xml += `    <priority>${options.priority}</priority>\n`
        }
        
        xml += '  </url>\n'
      })
      
      xml += '</urlset>'
      setOutput(xml)
    } else {
      let html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n'
      html += '  <meta charset="UTF-8">\n'
      html += '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
      html += '  <title>Sitemap</title>\n'
      html += '  <style>\n'
      html += '    body { font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }\n'
      html += '    h1 { color: #333; }\n'
      html += '    ul { list-style-type: none; padding-left: 0; }\n'
      html += '    li { margin: 5px 0; }\n'
      html += '    a { color: #0066cc; text-decoration: none; }\n'
      html += '    a:hover { text-decoration: underline; }\n'
      html += '    .level-1 { margin-left: 20px; }\n'
      html += '    .level-2 { margin-left: 40px; }\n'
      html += '    .level-3 { margin-left: 60px; }\n'
      html += '  </style>\n'
      html += '</head>\n<body>\n'
      html += '  <h1>Sitemap</h1>\n'
      html += '  <ul>\n'
      
      urlList.forEach(url => {
        const cleanUrl = url.trim()
        const displayUrl = cleanUrl.replace(/^https?:\/\//, '')
        html += `    <li><a href="${cleanUrl}">${displayUrl}</a></li>\n`
      })
      
      html += '  </ul>\n</body>\n</html>'
      setOutput(html)
    }
  }, [urls, format, options])

  const handleGenerate = useCallback(() => {
    if (!urls.trim()) return
    generateSitemap()
  }, [urls, generateSitemap])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setUrls("")
    setOutput("")
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const extension = format === "xml" ? "xml" : "html"
      const blob = new Blob([output], { type: format === "xml" ? "text/xml" : "text/html" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `sitemap.${extension}`
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output, format])

  const handleLoadExample = useCallback(() => {
    setUrls(`https://example.com
https://example.com/about
https://example.com/products
https://example.com/products/category-1
https://example.com/products/category-2
https://example.com/blog
https://example.com/contact`)
  }, [])

  const urlCount = urls.split('\n').filter(u => u.trim()).length

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">HTML Sitemap Generator</h2>
            <p className="text-sm text-muted-foreground">
              Generate XML or HTML sitemaps from your URLs
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLoadExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="urls">URLs (one per line)</Label>
            <span className="text-sm text-muted-foreground">{urlCount} URLs</span>
          </div>
          <Textarea
            id="urls"
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            placeholder="https://example.com/page1
https://example.com/page2
https://example.com/page3"
            className="min-h-[300px] font-mono text-sm"
          />

          <div className="space-y-4">
            <div className="flex gap-4">
              <Button
                variant={format === "xml" ? "default" : "outline"}
                onClick={() => setFormat("xml")}
                className="flex-1"
              >
                XML Sitemap
              </Button>
              <Button
                variant={format === "html" ? "default" : "outline"}
                onClick={() => setFormat("html")}
                className="flex-1"
              >
                HTML Sitemap
              </Button>
            </div>

            {format === "xml" && (
              <div className="space-y-2 p-4 bg-muted rounded-lg">
                <Label className="text-sm font-medium">XML Options</Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={options.includeLastmod}
                      onChange={(e) => setOptions({ ...options, includeLastmod: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    Include lastmod (last modified date)
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={options.includeChangefreq}
                      onChange={(e) => setOptions({ ...options, includeChangefreq: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    Include changefreq
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={options.includePriority}
                      onChange={(e) => setOptions({ ...options, includePriority: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    Include priority
                  </label>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="changefreq" className="text-sm">Change frequency:</Label>
                    <select
                      id="changefreq"
                      value={options.changefreq}
                      onChange={(e) => setOptions({ ...options, changefreq: e.target.value })}
                      className="text-sm border rounded px-2 py-1 bg-background"
                    >
                      <option value="always">always</option>
                      <option value="hourly">hourly</option>
                      <option value="daily">daily</option>
                      <option value="weekly">weekly</option>
                      <option value="monthly">monthly</option>
                      <option value="yearly">yearly</option>
                      <option value="never">never</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="priority" className="text-sm">Priority:</Label>
                    <input
                      id="priority"
                      type="number"
                      min="0"
                      max="1"
                      step="0.1"
                      value={options.priority}
                      onChange={(e) => setOptions({ ...options, priority: e.target.value })}
                      className="w-16 px-2 py-1 border rounded text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={handleGenerate} className="flex-1" disabled={!urls.trim()}>
              Generate Sitemap
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Generated Sitemap</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Sitemap will appear here..."
            className="min-h-[500px] font-mono text-sm bg-muted"
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
