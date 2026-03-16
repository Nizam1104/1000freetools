"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, Trash2, ArrowRight } from "lucide-react"

type CaseType = "uppercase" | "lowercase" | "title" | "sentence" | "camel" | "pascal" | "snake" | "kebab" | "constant" | "dot" | "slug" | "alternating"

export default function CaseConverter() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [caseType, setCaseType] = useState<CaseType>("camel")
  const [copied, setCopied] = useState<string | null>(null)

  const convertCase = useCallback((text: string, type: CaseType): string => {
    // Split text into words
    const words = text
      .replace(/[-_\s.]+/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .split(" ")
      .filter(w => w.length > 0)

    switch (type) {
      case "uppercase":
        return text.toUpperCase()
      
      case "lowercase":
        return text.toLowerCase()
      
      case "title":
        return words
          .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(" ")
      
      case "sentence":
        if (words.length === 0) return ""
        const sentence = words.join(" ").toLowerCase()
        return sentence.charAt(0).toUpperCase() + sentence.slice(1)
      
      case "camel":
        if (words.length === 0) return ""
        return words[0].toLowerCase() + words.slice(1)
          .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join("")
      
      case "pascal":
        return words
          .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join("")
      
      case "snake":
        return words
          .map(w => w.toLowerCase())
          .join("_")
      
      case "kebab":
        return words
          .map(w => w.toLowerCase())
          .join("-")
      
      case "constant":
        return words
          .map(w => w.toUpperCase())
          .join("_")
      
      case "dot":
        return words
          .map(w => w.toLowerCase())
          .join(".")
      
      case "slug":
        return words
          .map(w => w.toLowerCase())
          .join("-")
      
      case "alternating":
        return text.split("")
          .map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase())
          .join("")
      
      default:
        return text
    }
  }, [])

  const handleConvert = useCallback(() => {
    setOutput(convertCase(input, caseType))
  }, [input, caseType, convertCase])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const caseOptions: { value: CaseType; label: string; example: string }[] = [
    { value: "uppercase", label: "UPPERCASE", example: "HELLO WORLD" },
    { value: "lowercase", label: "lowercase", example: "hello world" },
    { value: "title", label: "Title Case", example: "Hello World" },
    { value: "sentence", label: "Sentence case", example: "Hello world" },
    { value: "camel", label: "camelCase", example: "helloWorld" },
    { value: "pascal", label: "PascalCase", example: "HelloWorld" },
    { value: "snake", label: "snake_case", example: "hello_world" },
    { value: "kebab", label: "kebab-case", example: "hello-world" },
    { value: "constant", label: "CONSTANT_CASE", example: "HELLO_WORLD" },
    { value: "dot", label: "dot.case", example: "hello.world" },
    { value: "slug", label: "slug-case", example: "hello-world" },
    { value: "alternating", label: "AlTeRnAtInG", example: "HeLlO wOrLd" },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Case Type Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Convert To</Label>
        <Tabs value={caseType} onValueChange={(v) => setCaseType(v as CaseType)}>
          <TabsList className="w-full justify-start flex-wrap h-auto p-1 gap-1 bg-transparent">
            {caseOptions.map((opt) => (
              <TabsTrigger
                key={opt.value}
                value={opt.value}
                className="text-xs px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                onClick={handleConvert}
              >
                {opt.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </section>

      {/* Input/Output */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="input-text" className="text-base font-medium">
              Input Text
            </Label>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(input, "input")}
                className="h-7"
                disabled={!input}
              >
                {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              </Button>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setInput("")}
                className="h-7"
                disabled={!input}
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </div>
          <Textarea
            id="input-text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="font-mono text-sm min-h-[200px]"
            placeholder="Enter text to convert..."
          />
          <div className="text-xs text-muted-foreground">
            {input.length} characters
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="output-text" className="text-base font-medium">
              Converted Output
            </Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(output, "output")}
              className="h-7"
              disabled={!output}
            >
              {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            </Button>
          </div>
          <Textarea
            id="output-text"
            value={output}
            readOnly
            className="font-mono text-sm min-h-[200px] bg-muted/30"
            placeholder="Converted text will appear here..."
          />
          <div className="text-xs text-muted-foreground">
            {output.length} characters
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Quick Examples</h3>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {[
            { text: "hello world", desc: "Simple text" },
            { text: "HelloWorld", desc: "PascalCase input" },
            { text: "hello-world", desc: "Kebab-case input" },
            { text: "hello_world", desc: "Snake_case input" },
            { text: "Hello World!", desc: "With punctuation" },
            { text: "the-quick-brown-fox", desc: "Multiple words" },
          ].map((example, idx) => (
            <button
              key={idx}
              onClick={() => setInput(example.text)}
              className="text-left rounded-lg border bg-background p-3 hover:bg-muted/50 transition-colors"
            >
              <code className="text-xs font-mono block truncate">{example.text}</code>
              <span className="text-xs text-muted-foreground">{example.desc}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
