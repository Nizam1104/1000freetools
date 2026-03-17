"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Trash2, Info, Type } from "lucide-react"

export default function UrlCaseConverter() {
  const [input, setInput] = useState<string>("https://Example.COM/Path/To/Page?Param=Value")
  const [output, setOutput] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const convertCase = useCallback((text: string, caseType: string) => {
    switch (caseType) {
      case "lower":
        return text.toLowerCase()
      case "upper":
        return text.toUpperCase()
      case "title":
        return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
      case "sentence":
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
      case "camel":
        return text.replace(/[-_\s]+(.)?/g, (_, chr) => chr ? chr.toUpperCase() : "")
      case "snake":
        return text.replace(/([A-Z])/g, "_$1").toLowerCase().replace(/^_/, "")
      case "kebab":
        return text.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "")
      default:
        return text
    }
  }, [])

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
  }, [])

  const caseButtons = [
    { label: "lowercase", value: "lower", example: "https://example.com/path" },
    { label: "UPPERCASE", value: "upper", example: "HTTPS://EXAMPLE.COM/PATH" },
    { label: "Title Case", value: "title", example: "Https://Example.Com/Path" },
    { label: "Sentence case", value: "sentence", example: "Https://example.com/path" },
    { label: "camelCase", value: "camel", example: "httpsExampleComPath" },
    { label: "snake_case", value: "snake", example: "https_example_com_path" },
    { label: "kebab-case", value: "kebab", example: "https-example-com-path" },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">Input URL/Text</Label>
          <Button variant="ghost" size="xs" onClick={handleClear} className="h-7">
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>
        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="font-mono text-sm min-h-[100px]"
          placeholder="Enter URL or text to convert..."
        />
      </section>

      {/* Case Conversion Buttons */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Convert To</Label>
        <div className="flex flex-wrap gap-2">
          {caseButtons.map((btn) => (
            <Button
              key={btn.value}
              variant="outline"
              size="sm"
              onClick={() => setOutput(convertCase(input, btn.value))}
              disabled={!input}
              title={btn.example}
            >
              <Type className="size-4 mr-1" />
              {btn.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Output */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Output</Label>
          {output && (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(output, "output")}
              className="h-7"
            >
              {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          )}
        </div>

        <div className="rounded-lg border bg-muted/30 p-4 min-h-[100px]">
          {output ? (
            <pre className="font-mono text-sm whitespace-pre-wrap break-all">{output}</pre>
          ) : (
            <p className="text-sm text-muted-foreground">Converted text will appear here...</p>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Case Conversion</h4>
            <p className="text-sm text-muted-foreground">
              Convert URLs and text between different case formats. Useful for normalizing
              URLs, formatting code identifiers, or preparing text for specific use cases.
              Note: URLs are case-sensitive in the path portion but case-insensitive in
              the domain portion.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
