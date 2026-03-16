"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download } from "lucide-react"

export function XmlMinifier() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")
  const [options, setOptions] = useState({
    removeComments: true,
    removeWhitespace: true,
    removeXmlDeclaration: false,
  })

  const minifyXML = useCallback((xml: string): string => {
    let result = xml

    if (options.removeComments) {
      result = result.replace(/<!--[\s\S]*?-->/g, "")
    }

    if (options.removeXmlDeclaration) {
      result = result.replace(/<\?xml[^?]*\?>/g, "")
    }

    if (options.removeWhitespace) {
      result = result.replace(/>\s+</g, "><")
      result = result.replace(/^\s+|\s+$/gm, "")
      result = result.replace(/\s+/g, " ")
    }

    return result.trim()
  }, [options])

  const handleMinify = useCallback(() => {
    try {
      setError("")
      const minified = minifyXML(input)
      setOutput(minified)
    } catch (e) {
      setError(`Minify error: ${e instanceof Error ? e.message : "Unknown error"}`)
      setOutput("")
    }
  }, [input, minifyXML])

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
    setError("")
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "minified.xml"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const compressionRatio = input && output ? ((1 - output.length / input.length) * 100).toFixed(1) : "0"

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">XML Minifier</h2>
            <p className="text-sm text-muted-foreground">
              Minify and compress XML by removing unnecessary characters
            </p>
          </div>
          {input && output && (
            <div className="text-sm text-muted-foreground">
              Compression: <span className="text-green-600 font-medium">{compressionRatio}%</span>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">Input XML</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your XML here...

<?xml version="1.0" encoding="UTF-8"?>
<root>
  <item id="1">
    <name>Item 1</name>
  </item>
</root>'
            className="min-h-[400px] font-mono text-sm"
          />
          
          <div className="space-y-2 p-4 bg-muted rounded-lg">
            <Label className="text-sm font-medium">Options</Label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(options).map(([key, value]) => (
                <label key={key} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={handleMinify} className="flex-1">
              Minify XML
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Minified XML</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Minified XML will appear here..."
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
