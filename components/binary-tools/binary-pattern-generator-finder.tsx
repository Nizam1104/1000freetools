"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BinaryPatternGeneratorFinder() {
  const [mode, setMode] = useState<"generate" | "find">("generate")
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  
  // Generate options
  const [patternType, setPatternType] = useState<"zeros" | "ones" | "alternating" | "custom">("alternating")
  const [length, setLength] = useState<number>(32)
  const [customPattern, setCustomPattern] = useState<string>("10")

  // Find options
  const [searchPattern, setSearchPattern] = useState<string>("")
  const [useWildcards, setUseWildcards] = useState<boolean>(true)

  const validateBinary = (binary: string): boolean => {
    return /^[01xX\s]+$/.test(binary)
  }

  const generatePattern = useCallback((type: typeof patternType, len: number, custom: string): string => {
    switch (type) {
      case "zeros":
        return "0".repeat(len)
      case "ones":
        return "1".repeat(len)
      case "alternating":
        const pattern = custom || "10"
        let result = ""
        while (result.length < len) {
          result += pattern
        }
        return result.slice(0, len)
      default:
        return "0".repeat(len)
    }
  }, [])

  const findPattern = useCallback((binary: string, pattern: string, wildcards: boolean): { matches: number; positions: number[] } => {
    const cleanBinary = binary.replace(/\s/g, "")
    const cleanPattern = pattern.replace(/\s/g, "")
    
    if (!cleanBinary || !cleanPattern) {
      return { matches: 0, positions: [] }
    }

    const matches: number[] = []
    
    for (let i = 0; i <= cleanBinary.length - cleanPattern.length; i++) {
      const substring = cleanBinary.slice(i, i + cleanPattern.length)
      let isMatch = true

      if (wildcards) {
        // Check with wildcard support (x or X matches any bit)
        for (let j = 0; j < cleanPattern.length; j++) {
          const patternChar = cleanPattern[j].toLowerCase()
          if (patternChar !== "x" && patternChar !== substring[j]) {
            isMatch = false
            break
          }
        }
      } else {
        isMatch = substring === cleanPattern
      }

      if (isMatch) {
        matches.push(i)
      }
    }

    return { matches: matches.length, positions: matches }
  }, [])

  const processInput = useCallback(() => {
    setError(null)

    if (mode === "generate") {
      if (length <= 0 || length > 10000) {
        setError("Length must be between 1 and 10000")
        setOutput("")
        return
      }

      if (patternType === "custom" && customPattern && !/^[01]+$/.test(customPattern)) {
        setError("Custom pattern must contain only 0s and 1s")
        setOutput("")
        return
      }

      try {
        const result = generatePattern(patternType, length, customPattern)
        // Format with spaces every 8 bits
        const formatted = result.replace(/(.{8})/g, "$1 ").trim()
        setOutput(formatted)
      } catch (err) {
        setError("Generation error")
        setOutput("")
      }
    } else {
      if (!input.trim()) {
        setOutput("")
        return
      }

      if (!validateBinary(input)) {
        setError("Invalid binary input. Only 0s, 1s, and spaces are allowed.")
        setOutput("")
        return
      }

      if (!searchPattern.trim()) {
        setOutput("")
        return
      }

      if (!validateBinary(searchPattern)) {
        setError("Invalid search pattern. Use 0s, 1s, and x for wildcards.")
        setOutput("")
        return
      }

      try {
        const result = findPattern(input, searchPattern, useWildcards)
        setOutput(`Found ${result.matches} occurrence(s) at positions: ${result.positions.join(", ") || "none"}`)
      } catch (err) {
        setError("Search error")
        setOutput("")
      }
    }
  }, [mode, length, patternType, customPattern, input, searchPattern, useWildcards, generatePattern, findPattern])

  React.useEffect(() => {
    processInput()
  }, [processInput])

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

  const cleanOutput = output.replace(/\s/g, "")
  const isNumericOutput = !isNaN(parseInt(cleanOutput.split(":")[1]?.trim() || "0"))

  // Highlight matches in input for find mode
  const highlightedInput = useMemo(() => {
    if (mode !== "find" || !input || !searchPattern) return input

    const cleanBinary = input.replace(/\s/g, "")
    const cleanPattern = searchPattern.replace(/\s/g, "")
    const result = findPattern(input, searchPattern, useWildcards)

    if (result.matches === 0) return input

    // Create highlighted version
    let highlighted = ""
    let lastEnd = 0

    result.positions.forEach((pos) => {
      highlighted += cleanBinary.slice(lastEnd, pos)
      highlighted += `<mark>${cleanBinary.slice(pos, pos + cleanPattern.length)}</mark>`
      lastEnd = pos + cleanPattern.length
    })
    highlighted += cleanBinary.slice(lastEnd)

    return highlighted
  }, [mode, input, searchPattern, useWildcards, findPattern])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Mode Selector */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Mode</Label>
        <div className="flex gap-2">
          <Button
            variant={mode === "generate" ? "default" : "outline"}
            onClick={() => setMode("generate")}
            className="flex-1"
          >
            Generate Pattern
          </Button>
          <Button
            variant={mode === "find" ? "default" : "outline"}
            onClick={() => setMode("find")}
            className="flex-1"
          >
            Find Pattern
          </Button>
        </div>
      </section>

      {mode === "generate" ? (
        <>
          {/* Generate Options */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="pattern-type" className="text-sm font-medium whitespace-nowrap">
                Pattern Type:
              </Label>
              <div className="flex gap-1 flex-wrap">
                {[
                  { value: "zeros", label: "All Zeros" },
                  { value: "ones", label: "All Ones" },
                  { value: "alternating", label: "Alternating" },
                ].map((type) => (
                  <Button
                    key={type.value}
                    variant={patternType === type.value ? "default" : "outline"}
                    size="xs"
                    onClick={() => setPatternType(type.value as typeof patternType)}
                    className="h-7 px-3"
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>

            {patternType === "alternating" && (
              <div className="flex items-center gap-4">
                <Label htmlFor="custom-pattern" className="text-sm font-medium whitespace-nowrap">
                  Pattern:
                </Label>
                <Input
                  id="custom-pattern"
                  value={customPattern}
                  onChange={(e) => setCustomPattern(e.target.value.replace(/[^01]/g, ""))}
                  className="w-32 font-mono"
                  placeholder="10"
                />
                <p className="text-xs text-muted-foreground">Repeating pattern (e.g., 10, 110, 1010)</p>
              </div>
            )}

            <div className="flex items-center gap-4">
              <Label htmlFor="length" className="text-sm font-medium whitespace-nowrap">
                Length (bits):
              </Label>
              <Input
                id="length"
                type="number"
                min="1"
                max="10000"
                value={length}
                onChange={(e) => setLength(Math.max(1, Math.min(10000, parseInt(e.target.value) || 32)))}
                className="w-24 font-mono"
              />
              <div className="flex gap-1">
                {[8, 16, 32, 64, 128].map((len) => (
                  <Button
                    key={len}
                    variant={length === len ? "default" : "outline"}
                    size="xs"
                    onClick={() => setLength(len)}
                    className="h-7 px-3"
                  >
                    {len}
                  </Button>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Find Options */}
          <section className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="binary-input" className="text-base font-medium">
                  Binary Input
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
                id="binary-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={cn(
                  "font-mono text-sm min-h-[100px]",
                  error ? "border-destructive focus-visible:border-destructive" : ""
                )}
                placeholder="Enter binary string to search in..."
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="search-pattern" className="text-sm font-medium">
                Search Pattern
              </Label>
              <div className="flex gap-2">
                <Input
                  id="search-pattern"
                  value={searchPattern}
                  onChange={(e) => setSearchPattern(e.target.value.replace(/[^01xX]/g, ""))}
                  className="font-mono flex-1"
                  placeholder="e.g., 101 or 10xx01 (x = wildcard)"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="use-wildcards"
                  checked={useWildcards}
                  onChange={(e) => setUseWildcards(e.target.checked)}
                  className="h-4 w-4"
                />
                <Label htmlFor="use-wildcards" className="text-sm font-normal cursor-pointer">
                  Enable wildcards (x matches any bit)
                </Label>
              </div>
            </div>
          </section>
        </>
      )}

      {error && (
        <div className="flex items-center gap-2 text-destructive">
          <Info className="size-4" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Output Section */}
      {output && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              {mode === "generate" ? "Generated Pattern" : "Search Results"}
            </Label>
            {mode === "generate" && (
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

          <Textarea
            value={output}
            readOnly
            className={cn(
              "font-mono text-base min-h-[80px] bg-muted/30",
              mode === "find" && "min-h-[60px]"
            )}
          />

          {mode === "generate" && (
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>Total bits: <span className="font-medium text-foreground">{length}</span></span>
              <span>Bytes: <span className="font-medium text-foreground">{Math.ceil(length / 8)}</span></span>
            </div>
          )}
        </section>
      )}

      {/* Pattern Preview for Generate Mode */}
      {mode === "generate" && output && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium">Pattern Preview</h3>
          <div className="rounded-lg border bg-background p-4 overflow-x-auto">
            <div className="flex gap-1 flex-wrap">
              {output.replace(/\s/g, "").split("").map((bit, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "w-6 h-8 rounded font-mono text-xs flex items-center justify-center",
                    bit === "1" ? "bg-primary text-primary-foreground" : "bg-muted"
                  )}
                >
                  {bit}
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
            <h4 className="text-sm font-medium">Binary Pattern Tool</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                <strong>Generate:</strong> Create common binary patterns for testing, debugging, or educational purposes.
                Patterns include all zeros, all ones, and alternating sequences.
              </p>
              <p>
                <strong>Find:</strong> Search for specific bit patterns within binary data.
                Wildcards (x) allow flexible pattern matching where any bit value is acceptable.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
