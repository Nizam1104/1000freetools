"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

const caseOptions = [
  { value: "upper", label: "UPPERCASE" },
  { value: "lower", label: "lowercase" },
  { value: "sentence", label: "Sentence case" },
  { value: "title", label: "Title Case" },
  { value: "camel", label: "camelCase" },
  { value: "pascal", label: "PascalCase" },
  { value: "snake", label: "snake_case" },
  { value: "kebab", label: "kebab-case" },
  { value: "constant", label: "CONSTANT_CASE" },
  { value: "dot", label: "dot.case" },
  { value: "path", label: "path/case" },
  { value: "alternating", label: "aLtErNaTiNg cAsE" },
  { value: "inverse", label: "iNVERSE cASE" },
]

function toSentenceCase(str: string): string {
  return str.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase())
}

function toTitleCase(str: string): string {
  return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
}

function toCamelCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
    .replace(/^\w/, (c) => c.toLowerCase())
}

function toPascalCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
    .replace(/^\w/, (c) => c.toUpperCase())
}

function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[-\s]+/g, "_")
    .toLowerCase()
}

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[-_\s]+/g, "-")
    .toLowerCase()
}

function toConstantCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[-\s]+/g, "_")
    .toUpperCase()
}

function toDotCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1.$2")
    .replace(/[-_\s]+/g, ".")
    .toLowerCase()
}

function toPathCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1/$2")
    .replace(/[-_\s]+/g, "/")
    .toLowerCase()
}

function toAlternatingCase(str: string): string {
  return str
    .split("")
    .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
    .join("")
}

function toInverseCase(str: string): string {
  return str
    .split("")
    .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
    .join("")
}

export default function TextCaseConverter() {
  const [input, setInput] = useState<string>("")
  const [selectedCase, setSelectedCase] = useState<string>("upper")
  const [copied, setCopied] = useState<string | null>(null)

  const convertCase = useCallback((text: string, caseType: string): string => {
    switch (caseType) {
      case "upper":
        return text.toUpperCase()
      case "lower":
        return text.toLowerCase()
      case "sentence":
        return toSentenceCase(text)
      case "title":
        return toTitleCase(text)
      case "camel":
        return toCamelCase(text)
      case "pascal":
        return toPascalCase(text)
      case "snake":
        return toSnakeCase(text)
      case "kebab":
        return toKebabCase(text)
      case "constant":
        return toConstantCase(text)
      case "dot":
        return toDotCase(text)
      case "path":
        return toPathCase(text)
      case "alternating":
        return toAlternatingCase(text)
      case "inverse":
        return toInverseCase(text)
      default:
        return text
    }
  }, [])

  const output = convertCase(input, selectedCase)

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input-text" className="text-base font-medium">
            Input Text
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
              onClick={() => setInput("")}
              className="h-7"
              disabled={!input}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Textarea
          id="input-text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="font-mono text-sm min-h-[160px]"
          placeholder="Enter or paste your text here..."
        />

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Characters: {input.length}</span>
          <span>Words: {input.trim() ? input.trim().split(/\s+/).length : 0}</span>
        </div>
      </section>

      {/* Case Selection */}
      <section className="space-y-3">
        <Label htmlFor="case-select" className="text-base font-medium">
          Convert To
        </Label>
        <Select value={selectedCase} onValueChange={setSelectedCase}>
          <SelectTrigger id="case-select" className="w-full">
            <SelectValue placeholder="Select case style" />
          </SelectTrigger>
          <SelectContent>
            {caseOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      {/* Output Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="output-text" className="text-base font-medium">
            Result
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
          id="output-text"
          value={output}
          readOnly
          className={cn(
            "font-mono text-sm min-h-[160px] bg-muted/50",
            !output && "text-muted-foreground"
          )}
          placeholder="Converted text will appear here..."
        />
      </section>

      {/* Quick Actions */}
      {input && (
        <section className="space-y-3 pt-4 border-t">
          <h3 className="text-sm font-medium">Quick Convert</h3>
          <div className="flex flex-wrap gap-2">
            {["upper", "lower", "title", "camel", "snake", "kebab"].map((caseType) => (
              <Button
                key={caseType}
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCase(caseType)
                  const result = convertCase(input, caseType)
                  copyToClipboard(result, `quick-${caseType}`)
                }}
                className="text-xs"
              >
                {caseOptions.find((o) => o.value === caseType)?.label}
                {copied === `quick-${caseType}` && <Check className="size-3 ml-1" />}
              </Button>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
