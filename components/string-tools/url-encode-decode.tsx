"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, ArrowLeftRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function UrlEncodeDecode() {
  const [input, setInput] = useState<string>("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [encodeFullUrl, setEncodeFullUrl] = useState<boolean>(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const encodeUrl = (str: string): string => {
    try {
      if (encodeFullUrl) {
        // Encode the entire URL including protocol and slashes
        return encodeURIComponent(str)
      } else {
        // Only encode special characters, preserve URL structure
        return str
          .split("/")
          .map((part) => encodeURIComponent(part))
          .join("/")
      }
    } catch (err) {
      return ""
    }
  }

  const decodeUrl = (str: string): string => {
    try {
      return decodeURIComponent(str)
    } catch (err) {
      throw new Error("Invalid URL-encoded string")
    }
  }

  const output = React.useMemo(() => {
    setError(null)
    if (!input) return ""

    try {
      if (mode === "encode") {
        return encodeUrl(input)
      } else {
        return decodeUrl(input)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      return ""
    }
  }, [input, mode, encodeFullUrl])

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

  const clearInput = useCallback(() => {
    setInput("")
    setError(null)
  }, [])

  const swapMode = useCallback(() => {
    setMode(mode === "encode" ? "decode" : "encode")
    setInput(output)
    setError(null)
  }, [mode, output])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Mode Selection */}
      <section className="flex items-center gap-4">
        <Button
          variant={mode === "encode" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("encode")}
          className="flex-1"
        >
          URL Encode
        </Button>
        <Button
          variant={mode === "decode" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("decode")}
          className="flex-1"
        >
          URL Decode
        </Button>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "encode" ? "URL or Text to Encode" : "Encoded URL to Decode"}
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
              onClick={clearInput}
              className="h-7"
              disabled={!input}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={cn(
            "font-mono text-sm min-h-[120px]",
            error && "border-destructive"
          )}
          placeholder={
            mode === "encode"
              ? "Enter URL or text to percent-encode..."
              : "Enter URL-encoded string to decode..."
          }
        />

        {error && (
          <p className="text-sm text-destructive flex items-center gap-2">
            {error}
          </p>
        )}

        <div className="text-sm text-muted-foreground">
          Input length: {input.length} characters
        </div>
      </section>

      {/* Options */}
      {mode === "encode" && (
        <section className="rounded-lg border p-4 space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="encode-full-url"
              checked={encodeFullUrl}
              onChange={(e) => setEncodeFullUrl(e.target.checked)}
              className="rounded border-input"
            />
            <Label htmlFor="encode-full-url" className="text-sm cursor-pointer">
              Encode entire URL (including :// and /)
            </Label>
          </div>
          <p className="text-xs text-muted-foreground">
            When unchecked, only special characters are encoded while preserving URL structure.
            When checked, the entire string is encoded for use as a query parameter.
          </p>
        </section>
      )}

      {/* Swap Button */}
      {output && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={swapMode}
            className="gap-2"
          >
            <ArrowLeftRight className="size-4" />
            Convert Output Back
          </Button>
        </div>
      )}

      {/* Output Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="output" className="text-base font-medium">
            {mode === "encode" ? "Encoded URL" : "Decoded URL"}
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
          className={cn(
            "font-mono text-sm min-h-[120px] bg-muted/50",
            !output && "text-muted-foreground"
          )}
          placeholder="Result will appear here..."
        />

        {output && (
          <div className="text-sm text-muted-foreground">
            Output length: {output.length} characters
            {mode === "encode" && (
              <span className="ml-2">
                ({((output.length / (input.length || 1)) * 100).toFixed(0)}% of original)
              </span>
            )}
          </div>
        )}
      </section>

      {/* Examples */}
      <section className="space-y-3 pt-4 border-t">
        <h3 className="text-sm font-medium">Try Examples</h3>
        <div className="flex flex-wrap gap-2">
          {mode === "encode" ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput("https://example.com/search?q=hello world")}
                className="text-xs"
              >
                URL with Space
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput("Hello & Welcome!")}
                className="text-xs"
              >
                Special Chars
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput("https://example.com/path?name=日本語")}
                className="text-xs"
              >
                Unicode
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput("https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world")}
                className="text-xs"
              >
                Full Encoded
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput("Hello%20%26%20Welcome%21")}
                className="text-xs"
              >
                Text Encoded
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput("https%3A%2F%2Fexample.com%2Fpath%3Fname%3D%E6%97%A5%E6%9C%AC%E8%AA%9E")}
                className="text-xs"
              >
                Unicode Encoded
              </Button>
            </>
          )}
        </div>
      </section>

      {/* Common Encodings Reference */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <h3 className="text-sm font-medium">Common URL Encodings</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Space</span>
            <code className="font-mono">%20</code>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">&amp;</span>
            <code className="font-mono">%26</code>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">=</span>
            <code className="font-mono">%3D</code>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">?</span>
            <code className="font-mono">%3F</code>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">#</span>
            <code className="font-mono">%23</code>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">/</span>
            <code className="font-mono">%2F</code>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">+</span>
            <code className="font-mono">%2B</code>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">%</span>
            <code className="font-mono">%25</code>
          </div>
        </div>
      </section>
    </div>
  )
}
