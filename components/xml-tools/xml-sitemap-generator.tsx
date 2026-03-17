"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info, Download } from "lucide-react"

interface SitemapUrl {
  loc: string
  lastmod?: string
  changefreq?: string
  priority?: string
}

export default function XmlSitemapGenerator() {
  const [baseUrl, setBaseUrl] = useState<string>("https://example.com")
  const [urlsInput, setUrlsInput] = useState<string>("/\n/about\n/contact\n/products\n/blog")
  const [includeLastmod, setIncludeLastmod] = useState<boolean>(true)
  const [defaultChangefreq, setDefaultChangefreq] = useState<string>("weekly")
  const [defaultPriority, setDefaultPriority] = useState<string>("0.5")
  const [sitemapOutput, setSitemapOutput] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const generateSitemap = useCallback(() => {
    const urls = urlsInput.split("\n").filter((url) => url.trim())
    const today = new Date().toISOString().split("T")[0]

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`

    urls.forEach((url) => {
      const cleanUrl = url.trim()
      const fullUrl = cleanUrl.startsWith("http") ? cleanUrl : `${baseUrl}${cleanUrl.startsWith("/") ? "" : "/"}${cleanUrl}`
      
      xml += `  <url>\n`
      xml += `    <loc>${fullUrl}</loc>\n`
      
      if (includeLastmod) {
        xml += `    <lastmod>${today}</lastmod>\n`
      }
      
      xml += `    <changefreq>${defaultChangefreq}</changefreq>\n`
      xml += `    <priority>${defaultPriority}</priority>\n`
      xml += `  </url>\n`
    })

    xml += `</urlset>`
    setSitemapOutput(xml)
  }, [baseUrl, urlsInput, includeLastmod, defaultChangefreq, defaultPriority])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const downloadSitemap = useCallback(() => {
    if (!sitemapOutput) return
    const blob = new Blob([sitemapOutput], { type: "text/xml" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "sitemap.xml"
    link.click()
    URL.revokeObjectURL(url)
  }, [sitemapOutput])

  const handleClear = useCallback(() => {
    setUrlsInput("")
    setSitemapOutput("")
  }, [])

  const urlCount = useMemo(() => {
    return urlsInput.split("\n").filter((url) => url.trim()).length
  }, [urlsInput])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Configuration */}
      <section className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="base-url">Base URL</Label>
          <Input
            id="base-url"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="https://example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="urls">URLs (one per line)</Label>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{urlCount} URLs</p>
            <Button variant="ghost" size="xs" onClick={handleClear} className="h-7">
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
          <Textarea
            id="urls"
            value={urlsInput}
            onChange={(e) => setUrlsInput(e.target.value)}
            className="font-mono text-sm min-h-[200px]"
            placeholder="/page-1&#10;/page-2&#10;/about"
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="changefreq">Change Frequency</Label>
            <Select value={defaultChangefreq} onValueChange={setDefaultChangefreq}>
              <SelectTrigger id="changefreq">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="always">always</SelectItem>
                <SelectItem value="hourly">hourly</SelectItem>
                <SelectItem value="daily">daily</SelectItem>
                <SelectItem value="weekly">weekly</SelectItem>
                <SelectItem value="monthly">monthly</SelectItem>
                <SelectItem value="yearly">yearly</SelectItem>
                <SelectItem value="never">never</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Default Priority</Label>
            <Select value={defaultPriority} onValueChange={setDefaultPriority}>
              <SelectTrigger id="priority">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.1">0.1</SelectItem>
                <SelectItem value="0.2">0.2</SelectItem>
                <SelectItem value="0.3">0.3</SelectItem>
                <SelectItem value="0.4">0.4</SelectItem>
                <SelectItem value="0.5">0.5</SelectItem>
                <SelectItem value="0.6">0.6</SelectItem>
                <SelectItem value="0.7">0.7</SelectItem>
                <SelectItem value="0.8">0.8</SelectItem>
                <SelectItem value="0.9">0.9</SelectItem>
                <SelectItem value="1.0">1.0</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="include-lastmod"
              checked={includeLastmod}
              onChange={(e) => setIncludeLastmod(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="include-lastmod" className="text-sm cursor-pointer">Include lastmod</Label>
          </div>
        </div>

        <Button onClick={generateSitemap} disabled={!urlsInput.trim()} className="w-full sm:w-auto">
          Generate Sitemap
        </Button>
      </section>

      {/* Sitemap Output */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">XML Sitemap</Label>
          {sitemapOutput && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(sitemapOutput, "sitemap")} className="h-8">
                {copied === "sitemap" ? <Check className="size-4" /> : <Copy className="size-4" />}
                <span className="ml-1">Copy</span>
              </Button>
              <Button variant="outline" size="sm" onClick={downloadSitemap} className="h-8">
                <Download className="size-4 mr-1" />
                Download
              </Button>
            </div>
          )}
        </div>

        <div className="rounded-lg border bg-muted/30 p-4 min-h-[150px]">
          {sitemapOutput ? (
            <pre className="font-mono text-sm whitespace-pre-wrap overflow-auto max-h-96">{sitemapOutput}</pre>
          ) : (
            <p className="text-sm text-muted-foreground">Sitemap XML will appear here...</p>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About XML Sitemap</h4>
            <p className="text-sm text-muted-foreground">
              An XML sitemap helps search engines discover and index your website pages.
              Submit your sitemap.xml to Google Search Console and Bing Webmaster Tools.
              The sitemap includes URL locations, last modification dates, change frequency
              hints, and priority values for each page.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
