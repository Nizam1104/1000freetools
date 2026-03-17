"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

type EscapeType = "javascript" | "html" | "xml" | "json" | "url" | "css"

export default function EscapeUnescapeString() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"escape" | "unescape">("escape")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [escapeType, setEscapeType] = useState<EscapeType>("javascript")

  const escapeJavaScript = useCallback((text: string): string => {
    return text
      .replace(/\\/g, "\\\\")
      .replace(/'/g, "\\'")
      .replace(/"/g, '\\"')
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t")
      .replace(/\f/g, "\\f")
      .replace(/\v/g, "\\v")
      .replace(/\0/g, "\\0")
  }, [])

  const unescapeJavaScript = useCallback((text: string): string => {
    return text
      .replace(/\\n/g, "\n")
      .replace(/\\r/g, "\r")
      .replace(/\\t/g, "\t")
      .replace(/\\f/g, "\f")
      .replace(/\\v/g, "\\v")
      .replace(/\\0/g, "\0")
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\\\/g, "\\")
  }, [])

  const escapeHTML = useCallback((text: string): string => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
  }, [])

  const unescapeHTML = useCallback((text: string): string => {
    const doc = new DOMParser().parseFromString(text, "text/html")
    return doc.documentElement.textContent || text
  }, [])

  const escapeXML = useCallback((text: string): string => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;")
  }, [])

  const unescapeXML = useCallback((text: string): string => {
    return text
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
  }, [])

  const escapeJSON = useCallback((text: string): string => {
    try {
      return JSON.stringify(text)
    } catch {
      throw new Error("Failed to escape JSON string")
    }
  }, [])

  const unescapeJSON = useCallback((text: string): string => {
    try {
      return JSON.parse(text)
    } catch {
      throw new Error("Invalid JSON string")
    }
  }, [])

  const escapeURL = useCallback((text: string): string => {
    return encodeURIComponent(text)
  }, [])

  const unescapeURL = useCallback((text: string): string => {
    try {
      return decodeURIComponent(text)
    } catch {
      throw new Error("Invalid URL-encoded string")
    }
  }, [])

  const escapeCSS = useCallback((text: string): string => {
    return text.replace(/[^\w-]/g, (char) => {
      const code = char.charCodeAt(0)
      return `\\${code.toString(16).toUpperCase().padStart(6, "0")} `
    })
  }, [])

  const unescapeCSS = useCallback((text: string): string => {
    return text.replace(/\\([0-9A-Fa-f]{1,6})\s?/g, (_, hex) => {
      const code = parseInt(hex, 16)
      return String.fromCodePoint(code)
    })
  }, [])

  const escape = useCallback((text: string, type: EscapeType): string => {
    switch (type) {
      case "javascript": return escapeJavaScript(text)
      case "html": return escapeHTML(text)
      case "xml": return escapeXML(text)
      case "json": return escapeJSON(text)
      case "url": return escapeURL(text)
      case "css": return escapeCSS(text)
      default: return text
    }
  }, [escapeJavaScript, escapeHTML, escapeXML, escapeJSON, escapeURL, escapeCSS])

  const unescape = useCallback((text: string, type: EscapeType): string => {
    switch (type) {
      case "javascript": return unescapeJavaScript(text)
      case "html": return unescapeHTML(text)
      case "xml": return unescapeXML(text)
      case "json": return unescapeJSON(text)
      case "url": return unescapeURL(text)
      case "css": return unescapeCSS(text)
      default: return text
    }
  }, [unescapeJavaScript, unescapeHTML, unescapeXML, unescapeJSON, unescapeURL, unescapeCSS])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)
    try {
      if (mode === "escape") {
        setOutput(escape(value, escapeType))
      } else {
        setOutput(unescape(value, escapeType))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      setOutput("")
    }
  }, [mode, escapeType, escape, unescape])

  const handleModeChange = useCallback((newMode: typeof mode) => {
    setMode(newMode)
    setError(null)
    if (newMode === "escape") {
      setOutput(escape(input, escapeType))
    } else {
      setOutput(unescape(input, escapeType))
    }
  }, [input, escapeType, escape, unescape])

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
    setInput("")
    setOutput("")
    setError(null)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Escape/Unescape String</h2>
        <p className="text-sm text-muted-foreground">
          Escape or unescape strings for various contexts (JavaScript, HTML, XML, JSON, URL, CSS)
        </p>
      </div>

      {/* Mode Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Mode</Label>
        <div className="flex gap-2">
          <Button
            variant={mode === "escape" ? "default" : "outline"}
            onClick={() => handleModeChange("escape")}
            className="flex-1"
          >
            Escape
          </Button>
          <Button
            variant={mode === "unescape" ? "default" : "outline"}
            onClick={() => handleModeChange("unescape")}
            className="flex-1"
          >
            Unescape
          </Button>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <Label className="text-sm">Escape Type:</Label>
          <div className="flex flex-wrap gap-2">
            {(["javascript", "html", "xml", "json", "url", "css"] as EscapeType[]).map((type) => (
              <Button
                key={type}
                variant={escapeType === type ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setEscapeType(type)
                  handleInputChange(input)
                }}
              >
                {type.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "escape" ? "Original String" : "Escaped String"}
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(input, "input")}
              className="h-7"
              disabled={!input}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={handleClear}
              className="h-7"
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Textarea
          id="input"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          className={cn(
            "font-mono text-sm min-h-[120px]",
            error ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder={
            mode === "escape"
              ? "Enter string to escape..."
              : "Enter escaped string to unescape..."
          }
        />

        {error && (
          <p className="text-sm text-destructive flex items-center gap-2">
            {error}
          </p>
        )}
      </section>

      {/* Output Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="output" className="text-base font-medium">
            {mode === "escape" ? "Escaped String" : "Unescaped String"}
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => copyToClipboard(output, "output")}
            className="h-7"
            disabled={!output}
          >
            {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            <span className="text-xs">Copy</span>
          </Button>
        </div>

        <Textarea
          id="output"
          value={output}
          readOnly
          className="font-mono text-sm min-h-[120px] bg-muted/50"
          placeholder="Result will appear here..."
        />

        {output && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Input: <span className="font-medium text-foreground">{input.length}</span> chars</span>
            <span>Output: <span className="font-medium text-foreground">{output.length}</span> chars</span>
            <span>Change: <span className={cn("font-medium", output.length > input.length ? "text-amber-600" : output.length < input.length ? "text-green-600" : "text-foreground")}>{output.length - input.length > 0 ? "+" : ""}{output.length - input.length}</span></span>
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About String Escaping</h4>
            <p className="text-sm text-muted-foreground">
              String escaping converts special characters into a safe format for a specific context.
              This prevents syntax errors and security vulnerabilities like XSS attacks.
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li><strong>JavaScript:</strong> Escapes quotes, backslashes, and control characters</li>
              <li><strong>HTML:</strong> Converts &lt;, &gt;, &amp;, quotes to entities</li>
              <li><strong>XML:</strong> Similar to HTML with apostrophe support</li>
              <li><strong>JSON:</strong> Wraps string in quotes with proper escaping</li>
              <li><strong>URL:</strong> Percent-encodes special characters</li>
              <li><strong>CSS:</strong> Escapes non-alphanumeric characters</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
