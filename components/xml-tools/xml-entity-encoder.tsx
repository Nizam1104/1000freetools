"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function XmlEntityEncoder() {
  const [inputText, setInputText] = useState<string>("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [copied, setCopied] = useState<string | null>(null)

  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
  }

  const reverseEntities: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&apos;": "'",
    "&#39;": "'",
    "&nbsp;": " ",
  }

  const encodeXML = useCallback((text: string): string => {
    return text.replace(/[&<>"']/g, (char) => entities[char] || char)
  }, [])

  const decodeXML = useCallback((text: string): string => {
    return text.replace(/&(amp|lt|gt|quot|apos|#39|nbsp);/g, (match) => reverseEntities[match] || match)
  }, [])

  const result = useMemo(() => {
    if (!inputText) return ""
    return mode === "encode" ? encodeXML(inputText) : decodeXML(inputText)
  }, [inputText, mode, encodeXML, decodeXML])

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
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">XML Entity Encoder/Decoder</h2>
        <p className="text-muted-foreground">
          Encode special characters to XML entities or decode them back.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setMode("encode")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === "encode"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode("decode")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === "decode"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            Decode
          </button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="input-text">{mode === "encode" ? "Plain Text" : "XML Entities"}</Label>
          <Textarea
            id="input-text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="font-mono text-sm min-h-[150px]"
            placeholder={mode === "encode" ? "Enter text to encode..." : "Enter XML-encoded text..."}
          />
        </div>

        {result && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>{mode === "encode" ? "XML-Encoded" : "Decoded Text"}</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(result, "result")}
              >
                {copied === "result" ? <Check className="size-4" /> : <Copy className="size-4" />}
                <span className="ml-2">Copy</span>
              </Button>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <pre className="font-mono text-sm whitespace-pre-wrap break-all">
                {result}
              </pre>
            </div>
          </div>
        )}

        <div className="rounded-lg border bg-background p-4">
          <h3 className="text-sm font-medium mb-3">XML Entity Reference</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.entries(entities).map(([char, entity]) => (
              <div key={char} className="flex items-center gap-2 p-2 bg-muted rounded">
                <code className="font-mono text-sm bg-background px-2 py-1 rounded">{char}</code>
                <span className="text-muted-foreground">→</span>
                <code className="font-mono text-sm bg-background px-2 py-1 rounded">{entity}</code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
