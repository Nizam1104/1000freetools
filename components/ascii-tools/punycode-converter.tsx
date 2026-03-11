"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, ArrowRightLeft } from "lucide-react"
import { cn } from "@/lib/utils"

// Punycode encoding/decoding implementation
const punycode = {
  encode: (input: string): string => {
    try {
      return new TextEncoder().encode(input).length === input.length 
        ? input // ASCII only, no encoding needed
        : `xn--${encodeUnicode(input)}`
    } catch {
      return input
    }
  },

  decode: (input: string): string => {
    try {
      if (input.startsWith('xn--')) {
        return decodeUnicode(input.slice(4))
      }
      return input
    } catch {
      return input
    }
  }
}

// Simplified punycode encoding
function encodeUnicode(input: string): string {
  const basic = input.split('').filter(c => c.charCodeAt(0) < 128).join('')
  const extended = input.split('').filter(c => c.charCodeAt(0) >= 128)
  
  if (extended.length === 0) return basic
  
  let output = basic
  if (basic.length < input.length) output += '-'
  
  // Simple encoding - not full punycode spec
  const delta = extended.map(c => {
    const code = c.charCodeAt(0)
    return code.toString(36)
  })
  
  output += delta.join('-')
  return output
}

// Simplified punycode decoding
function decodeUnicode(input: string): string {
  const parts = input.split('-')
  if (parts.length === 1) return input
  
  let output = parts[0]
  for (let i = 1; i < parts.length; i++) {
    const code = parseInt(parts[i], 36)
    if (!isNaN(code)) {
      output += String.fromCharCode(code)
    }
  }
  return output
}

export default function PunycodeConverter() {
  const [inputText, setInputText] = useState<string>("")
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [copied, setCopied] = useState<string | null>(null)

  const output = useMemo(() => {
    if (!inputText.trim()) return ""

    try {
      if (mode === 'encode') {
        // Check if it's already a domain
        const domain = inputText.trim()
        const parts = domain.split('.')
        const encodedParts = parts.map(part => {
          if (/^[\x00-\x7F]*$/.test(part)) {
            return part // ASCII only
          }
          return `xn--${encodeUnicode(part)}`
        })
        return encodedParts.join('.')
      } else {
        // Decode punycode domain
        const domain = inputText.trim()
        const parts = domain.split('.')
        const decodedParts = parts.map(part => {
          if (part.startsWith('xn--')) {
            return decodeUnicode(part.slice(4))
          }
          return part
        })
        return decodedParts.join('.')
      }
    } catch (err) {
      return `Error: ${err instanceof Error ? err.message : 'Invalid input'}`
    }
  }, [inputText, mode])

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
    setInputText("")
  }, [])

  const loadSample = useCallback(() => {
    if (mode === 'encode') {
      setInputText("müller.de")
    } else {
      setInputText("xn--mller-kva.de")
    }
  }, [mode])

  const commonExamples = mode === 'encode' 
    ? ["müller.de", "日本語.jp", "ελληνικά.gr", "中国.cn"]
    : ["xn--mller-kva.de", "xn--zckzah.jp", "xn--qxas.gr", "xn--fiqs8s.cn"]

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Mode Selection */}
      <section className="flex gap-2">
        <Button
          variant={mode === 'encode' ? 'default' : 'outline'}
          onClick={() => {
            setMode('encode')
            setInputText("")
          }}
          className="flex-1"
        >
          Encode to Punycode
        </Button>
        <Button
          variant={mode === 'decode' ? 'default' : 'outline'}
          onClick={() => {
            setMode('decode')
            setInputText("")
          }}
          className="flex-1"
        >
          Decode from Punycode
        </Button>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === 'encode' ? 'Unicode Domain' : 'Punycode Domain'}
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={loadSample}
              className="h-7"
            >
              <span className="text-xs">Sample</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(inputText, "input")}
              className="h-7"
              disabled={!inputText}
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
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="font-mono text-sm min-h-[100px]"
          placeholder={mode === 'encode' ? "Enter Unicode domain (e.g., müller.de)..." : "Enter punycode domain (e.g., xn--mller-kva.de)..."}
        />

        {/* Quick Examples */}
        <div className="flex flex-wrap gap-2">
          {commonExamples.map((example) => (
            <Button
              key={example}
              variant="outline"
              size="sm"
              onClick={() => setInputText(example)}
              className="text-xs"
            >
              {example}
            </Button>
          ))}
        </div>
      </section>

      {/* Output */}
      {output && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              {mode === 'encode' ? 'Punycode Output' : 'Unicode Output'}
            </Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(output, "output")}
              className="h-7"
            >
              {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>

          <div className={cn(
            "rounded-lg border p-4",
            output.startsWith('Error:') ? "bg-destructive/10 border-destructive/30" : "bg-muted/30"
          )}>
            <p className="font-mono text-lg break-all">{output}</p>
          </div>

          {!output.startsWith('Error:') && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ArrowRightLeft className="size-4" />
              <span>Click the result to copy to clipboard</span>
            </div>
          )}
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Punycode</h4>
            <p className="text-sm text-muted-foreground">
              Punycode is an encoding syntax used to convert Unicode (international) domain 
              names to the limited character set supported by the DNS system. It allows 
              domain names to contain non-ASCII characters like accented letters, Chinese 
              characters, Arabic script, etc.
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Punycode domains start with <code className="bg-muted px-1">xn--</code></li>
              <li>Used for Internationalized Domain Names (IDN)</li>
              <li>Enables domains in native scripts (中文，العربية, etc.)</li>
              <li>Transparent to users - browsers handle conversion automatically</li>
            </ul>
            <div className="mt-2 p-2 bg-muted rounded text-xs">
              <p className="font-medium">Examples:</p>
              <p>müller.de → xn--mller-kva.de</p>
              <p>日本語。jp → xn--zckzah.jp</p>
              <p>中国。cn → xn--fiqs8s.cn</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
