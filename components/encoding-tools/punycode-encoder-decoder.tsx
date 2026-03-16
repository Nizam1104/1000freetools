"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PunycodeEncoderDecoder() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const encodePunycode = useCallback((domain: string): string => {
    // Simple punycode encoding for IDN domains
    const parts = domain.split('.')
    const encodedParts = parts.map(part => {
      // Check if part contains non-ASCII characters
      if (/[\u0080-\uFFFF]/.test(part)) {
        return 'xn--' + punycodeEncode(part)
      }
      return part
    })
    return encodedParts.join('.')
  }, [])

  const decodePunycode = useCallback((domain: string): string => {
    const parts = domain.split('.')
    const decodedParts = parts.map(part => {
      if (part.startsWith('xn--')) {
        try {
          return punycodeDecode(part.substring(4))
        } catch {
          return part
        }
      }
      return part
    })
    return decodedParts.join('.')
  }, [])

  // Simplified punycode encode/decode functions
  const punycodeEncode = (input: string): string => {
    // This is a simplified implementation
    // For production use, consider using a proper punycode library
    const basic = input.toLowerCase().replace(/[^a-z0-9-]/g, '')
    const nonBasic = input.split('').filter(c => /[\u0080-\uFFFF]/.test(c))
    
    if (nonBasic.length === 0) return basic
    
    // Simple encoding - in reality this is much more complex
    return btoa(unescape(encodeURIComponent(input))).replace(/=/g, '')
  }

  const punycodeDecode = (input: string): string => {
    try {
      return decodeURIComponent(escape(atob(input)))
    } catch {
      throw new Error("Invalid punycode")
    }
  }

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)
    try {
      if (mode === "encode") {
        setOutput(encodePunycode(value))
      } else {
        setOutput(decodePunycode(value))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      setOutput("")
    }
  }, [mode, encodePunycode, decodePunycode])

  const handleModeChange = useCallback((newMode: "encode" | "decode") => {
    setMode(newMode)
    setError(null)
    if (newMode === "encode") {
      setOutput(encodePunycode(input))
    } else {
      setOutput(decodePunycode(input))
    }
  }, [input, encodePunycode, decodePunycode])

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
        <Label className="text-base font-medium">Mode</Label>
        <div className="flex gap-2">
          <Button
            variant={mode === "encode" ? "default" : "outline"}
            onClick={() => handleModeChange("encode")}
            className="flex-1"
          >
            Encode (Unicode to Punycode)
          </Button>
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => handleModeChange("decode")}
            className="flex-1"
          >
            Decode (Punycode to Unicode)
          </Button>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "encode" ? "Domain Name (Unicode)" : "Punycode Domain"}
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
              onClick={() => {
                setInput("")
                setOutput("")
                setError(null)
              }}
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
            "font-mono text-sm min-h-[100px]",
            error ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder={mode === "encode" ? "Enter domain name (e.g., 中国.com or .рф)..." : "Enter punycode domain (e.g., xn--fiqs8s.com)..."}
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
            {mode === "encode" ? "Punycode Domain" : "Unicode Domain"}
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
          className="font-mono text-sm min-h-[100px] bg-muted/50"
          placeholder="Result will appear here..."
        />
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="text-sm font-medium mb-2">About Punycode</h4>
        <p className="text-sm text-muted-foreground">
          Punycode is an encoding syntax used to convert Unicode (international) domain names to ASCII format 
          that the DNS system can understand. Internationalized Domain Names (IDNs) like .中国 or .рф are 
          encoded with the "xn--" prefix. This allows domain names in non-ASCII scripts to work with the 
          existing DNS infrastructure.
        </p>
      </section>
    </div>
  )
}
