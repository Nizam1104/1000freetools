"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info, ArrowRightLeft } from "lucide-react"

export default function XmlEntityEncoderDecoder() {
  const [input, setInput] = useState<string>("Hello <World> & \"Friends\"!")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [output, setOutput] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const xmlEntities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
  }

  const xmlEntitiesReverse: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&apos;": "'",
    "&#39;": "'",
    "&#34;": '"',
    "&#60;": "<",
    "&#62;": ">",
    "&#38;": "&",
  }

  const encode = useCallback((text: string): string => {
    let result = text
    Object.entries(xmlEntities).forEach(([char, entity]) => {
      result = result.split(char).join(entity)
    })
    return result
  }, [])

  const decode = useCallback((text: string): string => {
    let result = text
    // Decode numeric entities first
    result = result.replace(/&#(\d+);/g, (_, dec) => {
      return String.fromCharCode(parseInt(dec, 10))
    })
    result = result.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
      return String.fromCharCode(parseInt(hex, 16))
    })
    // Decode named entities
    Object.entries(xmlEntitiesReverse).forEach(([entity, char]) => {
      result = result.split(entity).join(char)
    })
    return result
  }, [])

  const handleConvert = useCallback(() => {
    if (mode === "encode") {
      setOutput(encode(input))
    } else {
      setOutput(decode(input))
    }
  }, [input, mode, encode, decode])

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

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Mode Selector */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Mode</Label>
        <div className="flex gap-2">
          <Button
            variant={mode === "encode" ? "default" : "outline"}
            onClick={() => setMode("encode")}
            className="flex-1"
          >
            Encode
          </Button>
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => setMode("decode")}
            className="flex-1"
          >
            Decode
          </Button>
        </div>
      </section>

      {/* Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "encode" ? "Plain Text" : "Encoded Text"}
          </Label>
          <Button variant="ghost" size="xs" onClick={handleClear} className="h-7">
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>
        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="font-mono text-sm min-h-[150px]"
          placeholder={mode === "encode" ? "Enter text to encode..." : "Enter encoded text to decode..."}
        />
        <Button onClick={handleConvert} disabled={!input} className="w-full">
          <ArrowRightLeft className="size-4 mr-2" />
          {mode === "encode" ? "Encode" : "Decode"}
        </Button>
      </section>

      {/* Output */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">
            {mode === "encode" ? "Encoded Output" : "Decoded Output"}
          </Label>
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
            <p className="text-sm text-muted-foreground">Output will appear here...</p>
          )}
        </div>
      </section>

      {/* Entity Reference */}
      <section className="space-y-3">
        <Label className="text-base font-medium">XML Entity Reference</Label>
        <div className="rounded-lg border bg-background overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-5 divide-x">
            {Object.entries(xmlEntities).map(([char, entity]) => (
              <div key={char} className="p-3 text-center">
                <p className="font-mono text-lg">{char}</p>
                <p className="text-xs text-muted-foreground">→</p>
                <p className="font-mono text-sm text-primary">{entity}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About XML Entities</h4>
            <p className="text-sm text-muted-foreground">
              XML entities are special characters that must be escaped in XML documents.
              The five predefined entities are: ampersand (&amp;), less-than (&lt;),
              greater-than (&gt;), double quote (&quot;), and apostrophe (&apos;).
              Use encoding to safely include these characters in XML content.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
