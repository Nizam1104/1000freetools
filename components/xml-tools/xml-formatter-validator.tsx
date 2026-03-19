"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info, Wand2 } from "lucide-react"

const DEFAULT_XMLINPUT = [
  '<root><item id="1"><name>Item One</name><value>100</value></item><item id="2"><name>Item Two</name><value>200</value></item></root>',
].join('\n')

export default function XmlFormatterValidator() {
  const [xmlInput, setXmlInput] = useState<string>(DEFAULT_XMLINPUT)
  const [indentSize, setIndentSize] = useState<string>("2")
  const [mode, setMode] = useState<"format" | "minify">("format")
  const [output, setOutput] = useState<string>("")
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
      formatted = formatted.replace(/\n\s*\n/g, "\n")

      return { formatted: formatted.trim(), error: null }
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

  const handleProcess = useCallback(() => {
    if (!xmlInput.trim()) {
      setError("Please enter XML")
      setOutput("")
      return
    }

    setError(null)

    if (mode === "format") {
      const result = formatXML(xmlInput, parseInt(indentSize, 10) || 2)
      setOutput(result.formatted)
      setError(result.error)
    } else {
      const result = minifyXML(xmlInput)
      setOutput(result.minified)
      setError(result.error)
    }
  }, [xmlInput, mode, indentSize, formatXML, minifyXML])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const handleClear = useCallback(() => {
    setXmlInput("")
    setOutput("")
    setError(null)
  }, [])

  const stats = useMemo(() => {
    if (!output) return null
    return {
      lines: output.split("\n").length,
      characters: output.length,
      elements: (output.match(/<[^/]/g) || []).length,
    }
  }, [output])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* XML Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="xml-input" className="text-base font-medium">XML Input</Label>
          <Button variant="ghost" size="xs" onClick={handleClear} className="h-7">
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>
        <Textarea
          id="xml-input"
          value={xmlInput}
          onChange={(e) => setXmlInput(e.target.value)}
          className="font-mono text-sm min-h-[200px]"
          placeholder="Paste your XML here..."
        />
      </section>

      {/* Options */}
      <section className="space-y-4">
        <div className="flex gap-2">
          <Button
            variant={mode === "format" ? "default" : "outline"}
            onClick={() => setMode("format")}
            className="flex-1"
          >
            <Wand2 className="size-4 mr-2" />
            Format
          </Button>
          <Button
            variant={mode === "minify" ? "default" : "outline"}
            onClick={() => setMode("minify")}
            className="flex-1"
          >
            Minify
          </Button>
        </div>

        {mode === "format" && (
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
        )}

        <Button onClick={handleProcess} disabled={!xmlInput} className="w-full sm:w-auto">
          {mode === "format" ? "Format XML" : "Minify XML"}
        </Button>
      </section>

      {/* Output */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">
            {mode === "format" ? "Formatted XML" : "Minified XML"}
          </Label>
          {output && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(output, "output")} className="h-8">
                {copied === "output" ? <Check className="size-4" /> : <Copy className="size-4" />}
                <span className="ml-1">Copy</span>
              </Button>
            </div>
          )}
        </div>

        {error ? (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        ) : (
          <div className="rounded-lg border bg-muted/30 p-4 min-h-[200px]">
            {output ? (
              <>
                {stats && (
                  <div className="flex gap-4 text-xs text-muted-foreground mb-3">
                    <span>{stats.lines} lines</span>
                    <span>{stats.characters} characters</span>
                    <span>{stats.elements} elements</span>
                  </div>
                )}
                <pre className="font-mono text-sm whitespace-pre-wrap overflow-auto max-h-96">{output}</pre>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Output will appear here...</p>
            )}
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About XML Formatter & Validator</h4>
            <p className="text-sm text-muted-foreground">
              Format XML for readability with proper indentation, or minify it for production use.
              The tool also validates XML structure and reports syntax errors. Formatted XML is
              easier to read and debug, while minified XML reduces file size for faster transmission.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
