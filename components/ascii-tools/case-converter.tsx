"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"

type CaseType = "upper" | "lower" | "title" | "sentence" | "camel" | "pascal" | "snake" | "kebab" | "constant"

export default function CaseConverter() {
  const [inputText, setInputText] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const convertCase = useCallback((text: string, caseType: CaseType): string => {
    const words = text
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[_-]+/g, " ")
      .split(/\s+/)
      .filter((w) => w)

    switch (caseType) {
      case "upper":
        return text.toUpperCase()
      case "lower":
        return text.toLowerCase()
      case "title":
        return words
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(" ")
      case "sentence":
        return text
          .toLowerCase()
          .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase())
      case "camel":
        return words
          .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
          .join("")
      case "pascal":
        return words
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join("")
      case "snake":
        return words.map((w) => w.toLowerCase()).join("_")
      case "kebab":
        return words.map((w) => w.toLowerCase()).join("-")
      case "constant":
        return words.map((w) => w.toUpperCase()).join("_")
      default:
        return text
    }
  }, [])

  const outputs = useMemo(() => {
    if (!inputText) return {}
    
    const cases: Record<CaseType, string> = {
      upper: convertCase(inputText, "upper"),
      lower: convertCase(inputText, "lower"),
      title: convertCase(inputText, "title"),
      sentence: convertCase(inputText, "sentence"),
      camel: convertCase(inputText, "camel"),
      pascal: convertCase(inputText, "pascal"),
      snake: convertCase(inputText, "snake"),
      kebab: convertCase(inputText, "kebab"),
      constant: convertCase(inputText, "constant"),
    }
    return cases
  }, [inputText, convertCase])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const caseButtons: { type: CaseType; label: string; example: string }[] = [
    { type: "upper", label: "UPPERCASE", example: "HELLO WORLD" },
    { type: "lower", label: "lowercase", example: "hello world" },
    { type: "title", label: "Title Case", example: "Hello World" },
    { type: "sentence", label: "Sentence case", example: "Hello world" },
    { type: "camel", label: "camelCase", example: "helloWorld" },
    { type: "pascal", label: "PascalCase", example: "HelloWorld" },
    { type: "snake", label: "snake_case", example: "hello_world" },
    { type: "kebab", label: "kebab-case", example: "hello-world" },
    { type: "constant", label: "CONSTANT_CASE", example: "HELLO_WORLD" },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input-text" className="text-base font-medium">
            Input Text
          </Label>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(inputText, "input")}
            >
              {copied === "input" ? <Check className="size-4" /> : <Copy className="size-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setInputText("")}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>

        <Textarea
          id="input-text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="font-mono text-sm min-h-[100px]"
          placeholder="Enter text to convert between cases..."
        />
      </section>

      {/* Quick Convert Buttons */}
      {inputText && (
        <section className="space-y-3">
          <Label>Quick Convert</Label>
          <div className="flex flex-wrap gap-2">
            {caseButtons.map((btn) => (
              <Button
                key={btn.type}
                variant="outline"
                size="sm"
                onClick={() => {
                  const result = convertCase(inputText, btn.type)
                  copyToClipboard(result, btn.type)
                }}
                title={btn.example}
              >
                {copied === btn.type ? <Check className="size-4 mr-1" /> : null}
                {btn.label}
              </Button>
            ))}
          </div>
        </section>
      )}

      {/* Output Cards */}
      {Object.keys(outputs).length > 0 && (
        <section className="space-y-4">
          <h3 className="text-base font-semibold">All Conversions</h3>
          <div className="grid gap-4">
            {(Object.entries(outputs) as [CaseType, string][]).map(([type, value]) => (
              <div key={type} className="rounded-lg border bg-background p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium capitalize">{type}</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(value, `output-${type}`)}
                  >
                    {copied === `output-${type}` ? (
                      <Check className="size-4" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </Button>
                </div>
                <div className="rounded bg-muted/50 p-3">
                  <p className="font-mono text-sm break-all">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
