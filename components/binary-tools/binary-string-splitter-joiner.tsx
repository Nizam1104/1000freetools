"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BinaryStringSplitterJoiner() {
  const [input, setInput] = useState<string>("")
  const [mode, setMode] = useState<"split" | "join">("split")
  const [output, setOutput] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  
  // Split options
  const [chunkSize, setChunkSize] = useState<number>(8)
  const [delimiter, setDelimiter] = useState<string>(" ")
  const [removeExistingDelimiters, setRemoveExistingDelimiters] = useState<boolean>(true)

  // Join options
  const [joinDelimiter, setJoinDelimiter] = useState<string>(" ")

  const validateBinary = (binary: string): boolean => {
    return /^[01\s,.-]+$/.test(binary)
  }

  const splitBinary = useCallback((binary: string, size: number, delim: string) => {
    const cleanBinary = binary.replace(/[\s,.-]/g, "")
    
    if (!cleanBinary) return ""
    if (!/^[01]+$/.test(cleanBinary)) {
      throw new Error("Invalid binary input")
    }

    const chunks: string[] = []
    for (let i = 0; i < cleanBinary.length; i += size) {
      chunks.push(cleanBinary.slice(i, i + size))
    }

    return chunks.join(delim)
  }, [])

  const joinBinary = useCallback((binary: string, delim: string) => {
    // Split by common delimiters
    const parts = binary.split(/[\s,.-]+/).filter(p => p.length > 0)
    
    if (parts.length === 0) return ""
    
    // Validate all parts are binary
    for (const part of parts) {
      if (!/^[01]+$/.test(part)) {
        throw new Error(`Invalid binary chunk: "${part}"`)
      }
    }

    return parts.join("")
  }, [])

  const processInput = useCallback(() => {
    setError(null)

    if (!input.trim()) {
      setOutput("")
      return
    }

    try {
      if (mode === "split") {
        const result = splitBinary(input, chunkSize, delimiter)
        setOutput(result)
      } else {
        const result = joinBinary(input, joinDelimiter)
        setOutput(result)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Processing error")
      setOutput("")
    }
  }, [input, mode, chunkSize, delimiter, joinDelimiter, splitBinary, joinBinary])

  React.useEffect(() => {
    processInput()
  }, [input, mode, chunkSize, delimiter, joinDelimiter, processInput])

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

  const chunks = useMemo(() => {
    if (mode !== "split" || !output) return []
    return output.split(delimiter)
  }, [mode, output, delimiter])

  const cleanOutput = output.replace(/[\s,.-]/g, "")
  const isValidInput = validateBinary(input) && input.trim().length > 0

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Mode Selector */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Mode</Label>
        <div className="flex gap-2">
          <Button
            variant={mode === "split" ? "default" : "outline"}
            onClick={() => setMode("split")}
            className="flex-1"
          >
            Split Binary String
          </Button>
          <Button
            variant={mode === "join" ? "default" : "outline"}
            onClick={() => setMode("join")}
            className="flex-1"
          >
            Join Binary Fragments
          </Button>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "split" ? "Binary Input" : "Binary Fragments"}
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
            "font-mono text-base min-h-[120px]",
            error ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder={
            mode === "split" 
              ? "Enter binary string to split (e.g., 1010101011001100)..."
              : "Enter binary fragments (e.g., 1010 1100 1111 0000)..."
          }
        />

        {error && (
          <p className="text-sm text-destructive flex items-center gap-2">
            <Info className="size-4" />
            {error}
          </p>
        )}
      </section>

      {/* Options Section */}
      <section className="space-y-4">
        {mode === "split" ? (
          <>
            <div className="flex items-center gap-4">
              <Label htmlFor="chunk-size" className="text-sm font-medium whitespace-nowrap">
                Chunk Size (bits):
              </Label>
              <Input
                id="chunk-size"
                type="number"
                min="1"
                max="64"
                value={chunkSize}
                onChange={(e) => setChunkSize(Math.max(1, parseInt(e.target.value) || 8))}
                className="w-24 font-mono"
              />
              <div className="flex gap-1 flex-wrap">
                {[4, 8, 16, 32].map((size) => (
                  <Button
                    key={size}
                    variant={chunkSize === size ? "default" : "outline"}
                    size="xs"
                    onClick={() => setChunkSize(size)}
                    className="h-7 px-3"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Label htmlFor="delimiter" className="text-sm font-medium whitespace-nowrap">
                Delimiter:
              </Label>
              <Select value={delimiter} onValueChange={setDelimiter}>
                <SelectTrigger id="delimiter" className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">Space</SelectItem>
                  <SelectItem value=",">Comma</SelectItem>
                  <SelectItem value="-">Hyphen</SelectItem>
                  <SelectItem value=".">Dot</SelectItem>
                  <SelectItem value="">None</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remove-delimiters"
                checked={removeExistingDelimiters}
                onChange={(e) => setRemoveExistingDelimiters(e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="remove-delimiters" className="text-sm font-normal cursor-pointer">
                Remove existing delimiters before splitting
              </Label>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Label htmlFor="join-delimiter" className="text-sm font-medium whitespace-nowrap">
              Current Delimiter:
            </Label>
            <Select value={joinDelimiter} onValueChange={setJoinDelimiter}>
              <SelectTrigger id="join-delimiter" className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto-detect</SelectItem>
                <SelectItem value=" ">Space</SelectItem>
                <SelectItem value=",">Comma</SelectItem>
                <SelectItem value="-">Hyphen</SelectItem>
                <SelectItem value=".">Dot</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Auto-detect works with spaces, commas, hyphens, or dots
            </p>
          </div>
        )}
      </section>

      {/* Output Section */}
      {isValidInput && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="output" className="text-base font-medium">
              {mode === "split" ? "Split Result" : "Joined Result"}
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
            className="font-mono text-base min-h-[100px] bg-muted/30"
            placeholder="Output will appear here..."
          />

          {/* Stats */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {mode === "split" ? (
              <>
                <span>Input bits: <span className="font-medium text-foreground">{input.replace(/[\s,.-]/g, "").length}</span></span>
                <span>Chunks: <span className="font-medium text-foreground">{chunks.length}</span></span>
                <span>Bits per chunk: <span className="font-medium text-foreground">{chunkSize}</span></span>
              </>
            ) : (
              <>
                <span>Fragments: <span className="font-medium text-foreground">{input.split(/[\s,.-]+/).filter(p => p.length > 0).length}</span></span>
                <span>Total bits: <span className="font-medium text-foreground">{cleanOutput.length}</span></span>
                <span>Bytes: <span className="font-medium text-foreground">{Math.ceil(cleanOutput.length / 8)}</span></span>
              </>
            )}
          </div>
        </section>
      )}

      {/* Chunk Visualization for Split Mode */}
      {mode === "split" && chunks.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium">Chunk Visualization</h3>
          <div className="rounded-lg border bg-background p-4 overflow-x-auto">
            <div className="flex flex-wrap gap-2">
              {chunks.map((chunk, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">#{idx + 1}</div>
                  <div className="font-mono bg-primary/10 px-3 py-2 rounded">
                    {chunk}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {chunk.length} bits
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Binary String Splitter & Joiner</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                <strong>Split mode:</strong> Divides a long binary string into equal-sized chunks.
                Useful for formatting binary data for readability or protocol requirements.
              </p>
              <p>
                <strong>Join mode:</strong> Combines multiple binary fragments into a single string.
                Useful for assembling binary data from multiple sources.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
