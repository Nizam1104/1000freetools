"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"

export default function HtmlEntityEncoder() {
  const [inputText, setInputText] = useState<string>("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [entityType, setEntityType] = useState<"named" | "numeric" | "hex">("named")
  const [copied, setCopied] = useState<string | null>(null)

  const htmlEntities: Record<string, string> = {
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
    " ": "&nbsp;",
    "©": "&copy;",
    "®": "&reg;",
    "™": "&trade;",
    "€": "&euro;",
    "£": "&pound;",
    "¥": "&yen;",
    "¢": "&cent;",
    "°": "&deg;",
    "±": "&plusmn;",
    "×": "&times;",
    "÷": "&divide;",
    "¼": "&frac14;",
    "½": "&frac12;",
    "¾": "&frac34;",
  }

  const reverseEntities: Record<string, string> = Object.fromEntries(
    Object.entries(htmlEntities).map(([k, v]) => [v, k])
  )

  const output = useMemo(() => {
    if (!inputText) return ""

    if (mode === "encode") {
      let result = inputText
      if (entityType === "named") {
        Object.entries(htmlEntities).forEach(([char, entity]) => {
          result = result.split(char).join(entity)
        })
      } else if (entityType === "numeric") {
        result = result
          .split("")
          .map((char) => {
            const code = char.charCodeAt(0)
            if (code < 128 && !/[<>&"' ]/.test(char)) return char
            return `&#${code};`
          })
          .join("")
      } else {
        result = result
          .split("")
          .map((char) => {
            const code = char.charCodeAt(0)
            if (code < 128 && !/[<>&"' ]/.test(char)) return char
            return `&#x${code.toString(16).toUpperCase()};`
          })
          .join("")
      }
      return result
    } else {
      let result = inputText
      Object.entries(reverseEntities).forEach(([entity, char]) => {
        result = result.split(entity).join(char)
      })
      result = result.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
      result = result.replace(/&#x([0-9A-Fa-f]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
      return result
    }
  }, [inputText, mode, entityType, htmlEntities, reverseEntities])

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
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Mode Selection */}
      <section className="space-y-3">
        <Label>Mode</Label>
        <div className="flex gap-2">
          <Button
            variant={mode === "encode" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("encode")}
          >
            Encode
          </Button>
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("decode")}
          >
            Decode
          </Button>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input-text" className="text-base font-medium">
            {mode === "encode" ? "Input Text" : "HTML Entities"}
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
          className="font-mono text-sm min-h-[120px]"
          placeholder={mode === "encode" ? "Enter text to encode to HTML entities..." : "Enter HTML entities to decode..."}
        />
      </section>

      {/* Entity Type Selection */}
      {mode === "encode" && (
        <section className="space-y-3">
          <Label>Entity Type</Label>
          <div className="flex gap-2">
            <Button
              variant={entityType === "named" ? "default" : "outline"}
              size="sm"
              onClick={() => setEntityType("named")}
            >
              Named (&amp;)
            </Button>
            <Button
              variant={entityType === "numeric" ? "default" : "outline"}
              size="sm"
              onClick={() => setEntityType("numeric")}
            >
              Numeric (&#38;)
            </Button>
            <Button
              variant={entityType === "hex" ? "default" : "outline"}
              size="sm"
              onClick={() => setEntityType("hex")}
            >
              Hex (&#x26;)
            </Button>
          </div>
        </section>
      )}

      {/* Output Section */}
      {output && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              {mode === "encode" ? "Encoded Output" : "Decoded Text"}
            </Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(output, "output")}
            >
              {copied === "output" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
              {copied === "output" ? "Copied" : "Copy"}
            </Button>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="font-mono text-sm break-all whitespace-pre-wrap">{output}</p>
          </div>
        </section>
      )}

      {/* Common Entities Reference */}
      <section className="space-y-3">
        <h4 className="text-sm font-medium">Common HTML Entities</h4>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {Object.entries(htmlEntities).slice(0, 12).map(([char, entity]) => (
            <div
              key={char}
              className="rounded-lg border bg-background p-2 text-center"
            >
              <p className="text-lg">{char}</p>
              <p className="text-xs text-muted-foreground font-mono">{entity}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
