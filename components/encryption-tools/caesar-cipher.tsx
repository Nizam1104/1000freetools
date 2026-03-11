"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CaesarCipher() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [shift, setShift] = useState<number>(3)
  const [copied, setCopied] = useState<string | null>(null)
  const [bruteForceResults, setBruteForceResults] = useState<string[]>([])
  const [showBruteForce, setShowBruteForce] = useState<boolean>(false)

  const caesarCipher = useCallback((text: string, shiftAmount: number): string => {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const base = char >= 'a' ? 97 : 65
      const code = char.charCodeAt(0) - base
      const shifted = ((code + shiftAmount) % 26 + 26) % 26
      return String.fromCharCode(base + shifted)
    })
  }, [])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    if (mode === "encode") {
      setOutput(caesarCipher(value, shift))
    } else {
      setOutput(caesarCipher(value, -shift))
    }
  }, [mode, shift, caesarCipher])

  const handleModeChange = useCallback((newMode: "encode" | "decode") => {
    setMode(newMode)
    if (newMode === "encode") {
      setOutput(caesarCipher(input, shift))
    } else {
      setOutput(caesarCipher(input, -shift))
    }
  }, [input, shift, caesarCipher])

  const handleShiftChange = useCallback((newShift: number) => {
    setShift(newShift)
    if (mode === "encode") {
      setOutput(caesarCipher(input, newShift))
    } else {
      setOutput(caesarCipher(input, -newShift))
    }
  }, [input, mode, caesarCipher])

  const runBruteForce = useCallback(() => {
    const results: string[] = []
    for (let i = 0; i < 26; i++) {
      results.push(caesarCipher(input, i))
    }
    setBruteForceResults(results)
    setShowBruteForce(true)
  }, [input, caesarCipher])

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
            Encode (Shift Forward)
          </Button>
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => handleModeChange("decode")}
            className="flex-1"
          >
            Decode (Shift Backward)
          </Button>
        </div>
      </section>

      {/* Shift Amount */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="shift" className="text-base font-medium">
            Shift Amount
          </Label>
          <span className="text-sm font-mono bg-muted px-2 py-1 rounded">{shift}</span>
        </div>
        <input
          id="shift"
          type="range"
          min="0"
          max="25"
          value={shift}
          onChange={(e) => handleShiftChange(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0</span>
          <span>13</span>
          <span>25</span>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "encode" ? "Text to Encode" : "Text to Decode"}
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={runBruteForce}
              className="h-7"
              disabled={!input}
            >
              Brute Force
            </Button>
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
                setBruteForceResults([])
                setShowBruteForce(false)
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
          className="font-mono text-sm min-h-[100px]"
          placeholder="Enter text to encode/decode with Caesar cipher..."
        />
      </section>

      {/* Output Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="output" className="text-base font-medium">
            {mode === "encode" ? "Encoded Text" : "Decoded Text"}
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

      {/* Brute Force Results */}
      {showBruteForce && bruteForceResults.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Brute Force Results (All 26 Shifts)</Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setShowBruteForce(false)}
              className="h-7"
            >
              Hide
            </Button>
          </div>

          <div className="max-h-96 overflow-y-auto space-y-2 border rounded-lg p-3">
            {bruteForceResults.map((result, index) => (
              <div key={index} className="flex items-center gap-3 text-sm">
                <span className="text-muted-foreground w-8 font-mono">+{index}</span>
                <span className="font-mono flex-1">{result}</span>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => {
                    setInput(result)
                    setShift(index)
                    setMode("encode")
                    setOutput(caesarCipher(result, index))
                    setShowBruteForce(false)
                  }}
                  className="h-6"
                >
                  Use
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="text-sm font-medium mb-2">About Caesar Cipher</h4>
        <p className="text-sm text-muted-foreground">
          The Caesar cipher is one of the simplest encryption techniques, where each letter is shifted by a
          fixed number of positions in the alphabet. It's named after Julius Caesar who used it for secret
          communications. The cipher is easily broken using frequency analysis or brute force (trying all 26 shifts).
        </p>
      </section>
    </div>
  )
}
