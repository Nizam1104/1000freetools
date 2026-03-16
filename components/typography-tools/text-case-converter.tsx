"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"

interface CaseOption {
  id: string
  label: string
  transform: (text: string) => string
  example: string
}

const CASE_OPTIONS: CaseOption[] = [
  {
    id: "lowercase",
    label: "lowercase",
    transform: (text) => text.toLowerCase(),
    example: "hello world",
  },
  {
    id: "uppercase",
    label: "UPPERCASE",
    transform: (text) => text.toUpperCase(),
    example: "HELLO WORLD",
  },
  {
    id: "titlecase",
    label: "Title Case",
    transform: (text) =>
      text.replace(/\w\S*/g, (word) => {
        const lower = word.toLowerCase()
        if (["a", "an", "and", "the", "but", "or", "for", "nor", "on", "at", "to", "from", "by", "in", "of"].includes(lower) && word !== lower) {
          return lower
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      }),
    example: "Hello World",
  },
  {
    id: "sentencecase",
    label: "Sentence case",
    transform: (text) => {
      const sentences = text.split(/([.!?]+\s*)/)
      return sentences
        .map((s, i) => {
          if (i % 2 === 0 && s.trim()) {
            return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
          }
          return s
        })
        .join("")
    },
    example: "Hello world. This is a sentence.",
  },
  {
    id: "camelcase",
    label: "camelCase",
    transform: (text) =>
      text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase()),
    example: "helloWorld",
  },
  {
    id: "pascalcase",
    label: "PascalCase",
    transform: (text) => {
      const camel = text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      return camel.charAt(0).toUpperCase() + camel.slice(1)
    },
    example: "HelloWorld",
  },
  {
    id: "snakecase",
    label: "snake_case",
    transform: (text) =>
      text
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/[\s\-]+/g, "_")
        .toLowerCase(),
    example: "hello_world",
  },
  {
    id: "kebabcase",
    label: "kebab-case",
    transform: (text) =>
      text
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, "-")
        .toLowerCase(),
    example: "hello-world",
  },
  {
    id: "constantcase",
    label: "CONSTANT_CASE",
    transform: (text) =>
      text
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/[\s\-]+/g, "_")
        .toUpperCase(),
    example: "HELLO_WORLD",
  },
  {
    id: "dotcase",
    label: "dot.case",
    transform: (text) =>
      text
        .replace(/([a-z])([A-Z])/g, "$1.$2")
        .replace(/[\s_\-]+/g, ".")
        .toLowerCase(),
    example: "hello.world",
  },
  {
    id: "pathcase",
    label: "path/case",
    transform: (text) =>
      text
        .replace(/([a-z])([A-Z])/g, "$1/$2")
        .replace(/[\s_\-]+/g, "/")
        .toLowerCase(),
    example: "hello/world",
  },
  {
    id: "alternatingcase",
    label: "aLtErNaTiNg CaSe",
    transform: (text) =>
      text
        .split("")
        .map((char, i) => (i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
        .join(""),
    example: "hElLo WoRlD",
  },
  {
    id: "inversecase",
    label: "INVERSE CASE",
    transform: (text) =>
      text
        .split("")
        .map((char) =>
          char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
        )
        .join(""),
    example: "HELLO wORLD",
  },
  {
    id: "randomcase",
    label: "RaNdOm CaSe",
    transform: (text) =>
      text
        .split("")
        .map((char) => (Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()))
        .join(""),
    example: "HeLlO wOrLd",
  },
]

export default function TextCaseConverter() {
  const [input, setInput] = useState("Hello World")
  const [copied, setCopied] = useState<string | null>(null)

  const convert = useCallback((caseId: string): string => {
    const option = CASE_OPTIONS.find((o) => o.id === caseId)
    return option ? option.transform(input) : input
  }, [input])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const convertAll = useCallback(() => {
    return CASE_OPTIONS.map((option) => ({
      ...option,
      result: option.transform(input),
    }))
  }, [input])

  const results = convertAll()

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="text-input" className="text-base font-medium">
            Your Text
          </Label>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="xs" onClick={() => copyToClipboard(input, "input")} className="h-7">
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button variant="ghost" size="xs" onClick={() => setInput("")} className="h-7">
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>
        <Input
          id="text-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="text-lg"
          placeholder="Type or paste your text here..."
        />
      </section>

      {/* Quick Convert Buttons */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Quick Convert</Label>
        <div className="flex flex-wrap gap-2">
          {CASE_OPTIONS.slice(0, 8).map((option) => (
            <Button
              key={option.id}
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(option.transform(input), option.id)}
            >
              {copied === option.id ? <Check className="size-3.5 mr-1" /> : null}
              {option.label}
            </Button>
          ))}
        </div>
      </section>

      {/* All Conversions */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">All Conversions</h3>
        <div className="rounded-lg border bg-background divide-y">
          {results.map((option) => (
            <div key={option.id} className="flex items-center justify-between p-4">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-1">{option.label}</p>
                <p className="font-mono text-sm truncate">{option.result}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(option.result, option.id)}
              >
                {copied === option.id ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <h3 className="text-base font-semibold">When to Use Each Case</h3>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium">camelCase</p>
            <p className="text-muted-foreground">JavaScript variables, JSON keys</p>
          </div>
          <div>
            <p className="font-medium">PascalCase</p>
            <p className="text-muted-foreground">Class names, React components</p>
          </div>
          <div>
            <p className="font-medium">snake_case</p>
            <p className="text-muted-foreground">Python variables, database columns</p>
          </div>
          <div>
            <p className="font-medium">kebab-case</p>
            <p className="text-muted-foreground">URL slugs, CSS classes, HTML attributes</p>
          </div>
          <div>
            <p className="font-medium">CONSTANT_CASE</p>
            <p className="text-muted-foreground">Constants, environment variables</p>
          </div>
          <div>
            <p className="font-medium">Title Case</p>
            <p className="text-muted-foreground">Headlines, book titles, headings</p>
          </div>
        </div>
      </section>
    </div>
  )
}
