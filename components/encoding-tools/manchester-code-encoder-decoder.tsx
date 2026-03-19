"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ManchesterCodeEncoderDecoder() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [manchesterType, setManchesterType] = useState<"standard" | "differential">("standard")

  const encodeManchester = useCallback((binary: string, differential: boolean): string => {
    const bits = binary.replace(/\s+/g, "")
    if (!/^[01]+$/.test(bits)) throw new Error("Invalid binary input. Only 0 and 1 are allowed.")

    const result: string[] = []
    let prevLevel = false

    for (const bit of bits) {
      if (differential) {
        // Differential Manchester: 0 = transition at start, 1 = no transition at start
        const hasStartTransition = bit === "0"
        let currentLevel: boolean = prevLevel
        currentLevel = hasStartTransition ? !prevLevel : prevLevel
        result.push(currentLevel ? "10" : "01")
        prevLevel = !currentLevel
      } else {
        // Standard Manchester: 0 = high-to-low, 1 = low-to-high
        result.push(bit === "0" ? "10" : "01")
      }
    }

    return result.join("")
  }, [])

  const decodeManchester = useCallback((encoded: string, differential: boolean): string => {
    const bits = encoded.replace(/\s+/g, "")
    if (!/^[01]+$/.test(bits)) throw new Error("Invalid Manchester code. Only 0 and 1 are allowed.")
    if (bits.length % 2 !== 0) throw new Error("Manchester code must have even length.")

    const result: string[] = []
    let prevLevel = false

    for (let i = 0; i < bits.length; i += 2) {
      const pair = bits.slice(i, i + 2)

      if (differential) {
        // Differential Manchester decoding
        const firstHalf = pair[0] === "1"
        const secondHalf = pair[1] === "1"

        // Check for start transition
        const hasStartTransition = firstHalf === prevLevel
        result.push(hasStartTransition ? "0" : "1")
        prevLevel = secondHalf
      } else {
        // Standard Manchester: 10 = 0, 01 = 1
        if (pair === "10") {
          result.push("0")
        } else if (pair === "01") {
          result.push("1")
        } else {
          throw new Error(`Invalid Manchester pair: ${pair}`)
        }
      }
    }

    return result.join("")
  }, [])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)
    try {
      if (mode === "encode") {
        setOutput(encodeManchester(value, manchesterType === "differential"))
      } else {
        setOutput(decodeManchester(value, manchesterType === "differential"))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      setOutput("")
    }
  }, [mode, manchesterType, encodeManchester, decodeManchester])

  const handleModeChange = useCallback((newMode: typeof mode) => {
    setMode(newMode)
    setError(null)
    if (newMode === "encode") {
      setOutput(encodeManchester(input, manchesterType === "differential"))
    } else {
      setOutput(decodeManchester(input, manchesterType === "differential"))
    }
  }, [input, manchesterType, encodeManchester, decodeManchester])

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
    setError(null)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Manchester Code Encoder/Decoder</h2>
        <p className="text-sm text-muted-foreground">
          Encode binary data to Manchester code or decode Manchester code back to binary
        </p>
      </div>

      {/* Mode Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Mode</Label>
        <div className="flex gap-2">
          <Button
            variant={mode === "encode" ? "default" : "outline"}
            onClick={() => handleModeChange("encode")}
            className="flex-1"
          >
            Encode
          </Button>
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => handleModeChange("decode")}
            className="flex-1"
          >
            Decode
          </Button>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <Label className="text-sm">Manchester Type:</Label>
          <div className="flex gap-2">
            <Button
              variant={manchesterType === "standard" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setManchesterType("standard")
                handleInputChange(input)
              }}
            >
              Standard
            </Button>
            <Button
              variant={manchesterType === "differential" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setManchesterType("differential")
                handleInputChange(input)
              }}
            >
              Differential
            </Button>
          </div>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "encode" ? "Binary Data" : "Manchester Code"}
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
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          className={cn(
            "font-mono text-sm min-h-[120px]",
            error ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder={
            mode === "encode"
              ? "Enter binary data (e.g., 10110011)..."
              : "Enter Manchester encoded data (e.g., 01101001)..."
          }
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
            {mode === "encode" ? "Manchester Code" : "Binary Data"}
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
          className="font-mono text-sm min-h-[120px] bg-muted/50"
          placeholder="Result will appear here..."
        />

        {output && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Input: <span className="font-medium text-foreground">{input.replace(/\s/g, "").length}</span> bits</span>
            <span>Output: <span className="font-medium text-foreground">{output.replace(/\s/g, "").length}</span> bits</span>
            <span>Ratio: <span className="font-medium text-foreground">{mode === "encode" ? "1:2" : "2:1"}</span></span>
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Manchester Code</h4>
            <p className="text-sm text-muted-foreground">
              Manchester code is a line code where each data bit is represented by a transition
              in the signal level. This provides self-clocking and DC balance, making it ideal
              for data transmission.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Standard Manchester:</strong> 0 = high-to-low transition, 1 = low-to-high transition.
              Used in Ethernet (10BASE-T).
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Differential Manchester:</strong> 0 = transition at bit start, 1 = no transition at start.
              Used in RFID, token ring networks, and magnetic stripe cards.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
