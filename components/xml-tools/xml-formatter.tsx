"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function XmlFormatter() {
  const [inputXml, setInputXml] = useState<string>("")
  const [indentSize, setIndentSize] = useState<string>("2")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const formatXML = useCallback((xml: string, indent: number): { formatted: string; error: string | null } => {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(xml, "text/xml")

      const parseError = doc.querySelector("parsererror")
      if (parseError) {
        return { formatted: "", error: parseError.textContent || "Invalid XML" }
      }

      const serializer = new XMLSerializer()
      const xmlStr = serializer.serializeToString(doc)

      let formatted = ""
      let pad = 0
      const indentStr = " ".repeat(indent)

      xmlStr.split(/>\s*</).forEach((node) => {
        if (node.match(/^\/\w/)) pad -= indent
        const prefix = pad > 0 ? "\n" + " ".repeat(pad) : ""
        formatted += prefix + "<" + node + ">"
        if (node.match(/^<?\w[^>]*[^/]$/)) pad += indent
      })

      formatted = formatted.substring(1, formatted.length - 1)
      formatted = formatted.replace(/>\s*</g, "><")

      let result = ""
      let level = 0
      const inContent = false

      for (let i = 0; i < formatted.length; i++) {
        const char = formatted[i]
        if (char === "<") {
          if (formatted[i + 1] === "/") {
            level--
          }
          result += "\n" + indentStr.repeat(Math.max(0, level))
          if (formatted[i + 1] !== "?" && formatted[i + 1] !== "!") {
            if (formatted[i + 1] === "/") {
              level = Math.max(0, level)
            } else {
              level++
            }
          }
        }
        result += char
      }

      result = result.trim()
      result = result.replace(/\n\s*\n/g, "\n")

      return { formatted: result, error: null }
    } catch (err) {
      return {
        formatted: "",
        error: err instanceof Error ? err.message : "Failed to format XML",
      }
    }
  }, [])

  const minifyXML = useCallback((xml: string): { minified: string; error: string | null } => {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(xml, "text/xml")

      const parseError = doc.querySelector("parsererror")
      if (parseError) {
        return { minified: "", error: parseError.textContent || "Invalid XML" }
      }

      const serializer = new XMLSerializer()
      let minified = serializer.serializeToString(doc)

      minified = minified.replace(/>\s+</g, "><")
      minified = minified.replace(/^\s+|\s+$/g, "")

      return { minified, error: null }
    } catch (err) {
      return {
        minified: "",
        error: err instanceof Error ? err.message : "Failed to minify XML",
      }
    }
  }, [])

  const formatResult = useMemo(() => {
    if (!inputXml.trim()) return { formatted: "", error: null }
    return formatXML(inputXml, parseInt(indentSize, 10) || 2)
  }, [inputXml, indentSize, formatXML])

  const minifyResult = useMemo(() => {
    if (!inputXml.trim()) return { minified: "", error: null }
    return minifyXML(inputXml)
  }, [inputXml, minifyXML])

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
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">XML Formatter & Minifier</h2>
        <p className="text-muted-foreground">
          Format XML for readability or minify it for production use.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="xml-input">XML Input</Label>
          <Textarea
            id="xml-input"
            value={inputXml}
            onChange={(e) => {
              setInputXml(e.target.value)
              setError(null)
            }}
            className="font-mono text-sm min-h-[200px]"
            placeholder="Paste your XML here..."
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="indent-size" className="shrink-0">Indent:</Label>
            <Input
              id="indent-size"
              value={indentSize}
              onChange={(e) => setIndentSize(e.target.value.replace(/[^0-9]/g, ""))}
              className="w-20"
              type="text"
              inputMode="numeric"
            />
            <span className="text-sm text-muted-foreground">spaces</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => copyToClipboard(formatResult.formatted, "formatted")}
            disabled={!formatResult.formatted}
          >
            {copied === "formatted" ? <Check className="size-4" /> : <Copy className="size-4" />}
            <span className="ml-2">Copy Formatted</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => copyToClipboard(minifyResult.minified, "minified")}
            disabled={!minifyResult.minified}
          >
            {copied === "minified" ? <Check className="size-4" /> : <Copy className="size-4" />}
            <span className="ml-2">Copy Minified</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Formatted XML</Label>
            {formatResult.formatted && (
              <span className="text-xs text-muted-foreground">
                {formatResult.formatted.split("\n").length} lines
              </span>
            )}
          </div>
          <div className="rounded-lg border bg-muted/30 p-4 max-h-96 overflow-auto">
            {formatResult.error ? (
              <p className="text-destructive text-sm">{formatResult.error}</p>
            ) : (
              <pre className="font-mono text-sm whitespace-pre-wrap">
                {formatResult.formatted || <span className="text-muted-foreground">Formatted output will appear here...</span>}
              </pre>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Minified XML</Label>
            {minifyResult.minified && (
              <span className="text-xs text-muted-foreground">
                {minifyResult.minified.length} characters
              </span>
            )}
          </div>
          <div className="rounded-lg border bg-muted/30 p-4 max-h-96 overflow-auto">
            {minifyResult.error ? (
              <p className="text-destructive text-sm">{minifyResult.error}</p>
            ) : (
              <pre className="font-mono text-sm whitespace-pre-wrap">
                {minifyResult.minified || <span className="text-muted-foreground">Minified output will appear here...</span>}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
