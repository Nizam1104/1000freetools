"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"

export function HtmlIframeCodeGenerator() {
  const [url, setUrl] = useState("")
  const [width, setWidth] = useState("100%")
  const [height, setHeight] = useState("600")
  const [frameborder, setFrameborder] = useState("0")
  const [scrolling, setScrolling] = useState("auto")
  const [allowFullscreen, setAllowFullscreen] = useState(true)
  const [title, setTitle] = useState("Embedded Content")
  const [loading, setLoading] = useState<"eager" | "lazy">("lazy")
  const [copied, setCopied] = useState(false)
  const [sandbox, setSandbox] = useState(false)
  const [sandboxOptions, setSandboxOptions] = useState({
    allowScripts: false,
    allowSameOrigin: false,
    allowForms: false,
    allowPopups: false,
  })

  const generateIframe = useCallback(() => {
    let iframe = `<iframe
  src="${url}"
  width="${width}"
  height="${height}"
  frameborder="${frameborder}"
  scrolling="${scrolling}"`

    if (title) {
      iframe += `
  title="${title}"`
    }

    if (allowFullscreen) {
      iframe += `
  allowfullscreen`
    }

    if (loading === "lazy") {
      iframe += `
  loading="lazy"`
    }

    if (sandbox) {
      const options = []
      if (sandboxOptions.allowScripts) options.push("allow-scripts")
      if (sandboxOptions.allowSameOrigin) options.push("allow-same-origin")
      if (sandboxOptions.allowForms) options.push("allow-forms")
      if (sandboxOptions.allowPopups) options.push("allow-popups")
      iframe += `
  sandbox="${options.join(' ')}"`
    }

    iframe += `
></iframe>`

    return iframe
  }, [url, width, height, frameborder, scrolling, title, allowFullscreen, loading, sandbox, sandboxOptions])

  const handleCopy = useCallback(async () => {
    const code = generateIframe()
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [generateIframe])

  const handleClear = useCallback(() => {
    setUrl("")
    setWidth("100%")
    setHeight("600")
    setFrameborder("0")
    setScrolling("auto")
    setTitle("Embedded Content")
    setAllowFullscreen(true)
    setLoading("lazy")
    setSandbox(false)
  }, [])

  const output = generateIframe()

  const presetButtons = [
    { name: "YouTube", url: "https://www.youtube.com/embed/VIDEO_ID", width: "560", height: "315" },
    { name: "Google Maps", url: "https://www.google.com/maps/embed?pb=...", width: "600", height: "450" },
    { name: "Vimeo", url: "https://player.vimeo.com/video/VIDEO_ID", width: "640", height: "360" },
  ]

  const applyPreset = useCallback((preset: typeof presetButtons[0]) => {
    setUrl(preset.url)
    setWidth(preset.width)
    setHeight(preset.height)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">HTML Iframe Code Generator</h2>
            <p className="text-sm text-muted-foreground">
              Generate iframe embed code for any URL
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <Label htmlFor="url">Source URL</Label>
            <Textarea
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/embed"
              className="min-h-[80px] font-mono text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="100% or 600"
              />
            </div>
            <div>
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="frameborder">Frameborder</Label>
              <select
                id="frameborder"
                value={frameborder}
                onChange={(e) => setFrameborder(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-background text-sm"
              >
                <option value="0">0 (No border)</option>
                <option value="1">1 (With border)</option>
              </select>
            </div>
            <div>
              <Label htmlFor="scrolling">Scrolling</Label>
              <select
                id="scrolling"
                value={scrolling}
                onChange={(e) => setScrolling(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-background text-sm"
              >
                <option value="auto">Auto</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="title">Title (for accessibility)</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Embedded Content"
            />
          </div>

          <div className="space-y-2 p-4 bg-muted rounded-lg">
            <Label className="text-sm font-medium">Advanced Options</Label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={allowFullscreen}
                onChange={(e) => setAllowFullscreen(e.target.checked)}
                className="rounded border-gray-300"
              />
              Allow fullscreen
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={loading === "lazy"}
                onChange={(e) => setLoading(e.target.checked ? "lazy" : "eager")}
                className="rounded border-gray-300"
              />
              Lazy loading
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={sandbox}
                onChange={(e) => setSandbox(e.target.checked)}
                className="rounded border-gray-300"
              />
              Enable sandbox mode
            </label>
            {sandbox && (
              <div className="ml-6 mt-2 space-y-1">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={sandboxOptions.allowScripts}
                    onChange={(e) => setSandboxOptions({ ...sandboxOptions, allowScripts: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  allow-scripts
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={sandboxOptions.allowSameOrigin}
                    onChange={(e) => setSandboxOptions({ ...sandboxOptions, allowSameOrigin: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  allow-same-origin
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={sandboxOptions.allowForms}
                    onChange={(e) => setSandboxOptions({ ...sandboxOptions, allowForms: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  allow-forms
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={sandboxOptions.allowPopups}
                    onChange={(e) => setSandboxOptions({ ...sandboxOptions, allowPopups: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  allow-popups
                </label>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={handleClear} variant="outline" title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Quick Presets</Label>
          <div className="flex gap-2 flex-wrap">
            {presetButtons.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                onClick={() => applyPreset(preset)}
              >
                {preset.name}
              </Button>
            ))}
          </div>

          <Label htmlFor="output">Generated Iframe Code</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Iframe code will appear here..."
            className="min-h-[200px] font-mono text-sm bg-muted"
          />

          <div className="p-4 bg-muted rounded-lg">
            <Label>Preview</Label>
            <div className="mt-2 border rounded-lg overflow-hidden bg-background">
              {url ? (
                <iframe
                  src={url}
                  width="100%"
                  height={parseInt(height) || 300}
                  frameBorder={parseInt(frameborder)}
                  scrolling={scrolling as any}
                  title={title}
                  allowFullScreen={allowFullscreen}
                  loading={loading}
                  sandbox={sandbox ? Object.entries(sandboxOptions).filter(([_, v]) => v).map(([k]) => `allow-${k.replace('allow', '').toLowerCase()}`).join(' ') : undefined}
                />
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Enter a URL to preview
                </div>
              )}
            </div>
          </div>

          <Button onClick={handleCopy} disabled={!url} className="w-full">
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? "Copied" : "Copy Iframe Code"}
          </Button>
        </div>
      </div>
    </div>
  )
}

const Input = ({ className, ...props }: React.ComponentProps<"input">) => (
  <input
    className={`w-full px-3 py-2 border rounded-md bg-background text-sm ${className || ""}`}
    {...props}
  />
)
