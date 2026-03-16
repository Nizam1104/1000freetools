"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BinaryPalindromeChecker() {
  const [binaryInput, setBinaryInput] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const validateBinary = (binary: string): boolean => {
    return /^[01\s]+$/.test(binary)
  }

  const cleanBinary = useMemo(() => {
    return binaryInput.replace(/\s/g, "")
  }, [binaryInput])

  const isPalindrome = useMemo(() => {
    if (!cleanBinary || !validateBinary(binaryInput)) return false
    const reversed = cleanBinary.split("").reverse().join("")
    return cleanBinary === reversed
  }, [cleanBinary, binaryInput])

  const bits = useMemo(() => {
    if (!cleanBinary || !validateBinary(binaryInput)) return []
    return cleanBinary.split("").map((bit, idx) => ({
      value: bit,
      index: idx,
      mirrorIndex: cleanBinary.length - 1 - idx,
      isMirror: bit === cleanBinary[cleanBinary.length - 1 - idx],
    }))
  }, [cleanBinary, binaryInput])

  const stats = useMemo(() => {
    if (!cleanBinary || !validateBinary(binaryInput)) return null
    
    const zeros = cleanBinary.split("").filter(b => b === "0").length
    const ones = cleanBinary.split("").filter(b => b === "1").length
    const length = cleanBinary.length
    
    return {
      length,
      zeros,
      ones,
      zeroRatio: ((zeros / length) * 100).toFixed(1),
      oneRatio: ((ones / length) * 100).toFixed(1),
    }
  }, [cleanBinary, binaryInput])

  // Generate palindromes
  const [generateLength, setGenerateLength] = useState<number>(8)
  const [generatedPalindromes, setGeneratedPalindromes] = useState<string[]>([])

  const generatePalindromes = useCallback((length: number) => {
    const palindromes: string[] = []
    const halfLength = Math.ceil(length / 2)
    const total = Math.pow(2, halfLength)

    for (let i = 0; i < total && palindromes.length < 20; i++) {
      const half = i.toString(2).padStart(halfLength, "0")
      let palindrome: string

      if (length % 2 === 0) {
        // Even length: mirror the entire half
        palindrome = half + half.split("").reverse().join("")
      } else {
        // Odd length: mirror excluding the middle bit
        palindrome = half + half.slice(0, -1).split("").reverse().join("")
      }

      palindromes.push(palindrome)
    }

    setGeneratedPalindromes(palindromes)
  }, [])

  React.useEffect(() => {
    generatePalindromes(generateLength)
  }, [generateLength, generatePalindromes])

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
    setBinaryInput("")
  }, [])

  const isValidInput = validateBinary(binaryInput) && cleanBinary.length > 0

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="binary-input" className="text-base font-medium">
            Binary Input
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(cleanBinary, "input")}
              className="h-7"
              disabled={!cleanBinary}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={handleClear}
              className="h-7"
              disabled={!binaryInput}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Input
          id="binary-input"
          value={binaryInput}
          onChange={(e) => setBinaryInput(e.target.value.replace(/[^01\s]/g, ""))}
          className={cn(
            "font-mono text-base",
            !isValidInput && cleanBinary.length > 0 ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder="Enter binary number (e.g., 1001 or 11011)..."
        />

        {!isValidInput && cleanBinary.length > 0 && (
          <p className="text-sm text-destructive flex items-center gap-2">
            <Info className="size-4" />
            Invalid binary number. Only 0s and 1s are allowed.
          </p>
        )}
      </section>

      {/* Result Section */}
      {isValidInput && (
        <section className="space-y-4">
          <div className={cn(
            "rounded-lg border p-6 text-center",
            isPalindrome 
              ? "bg-green-500/10 border-green-500/30" 
              : "bg-muted/30"
          )}>
            <p className="text-sm text-muted-foreground mb-2">Palindrome Check Result</p>
            <p className={cn(
              "text-2xl font-bold",
              isPalindrome ? "text-green-500" : "text-muted-foreground"
            )}>
              {isPalindrome ? "✓ Is a Palindrome" : "✗ Not a Palindrome"}
            </p>
          </div>

          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="rounded-lg border bg-muted/30 p-3 text-center">
                <p className="text-xs text-muted-foreground">Length</p>
                <p className="font-mono text-lg font-medium">{stats.length}</p>
              </div>
              <div className="rounded-lg border bg-muted/30 p-3 text-center">
                <p className="text-xs text-muted-foreground">Zeros</p>
                <p className="font-mono text-lg font-medium">{stats.zeros}</p>
              </div>
              <div className="rounded-lg border bg-muted/30 p-3 text-center">
                <p className="text-xs text-muted-foreground">Ones</p>
                <p className="font-mono text-lg font-medium">{stats.ones}</p>
              </div>
              <div className="rounded-lg border bg-muted/30 p-3 text-center">
                <p className="text-xs text-muted-foreground">Zero %</p>
                <p className="font-mono text-lg font-medium">{stats.zeroRatio}%</p>
              </div>
              <div className="rounded-lg border bg-muted/30 p-3 text-center">
                <p className="text-xs text-muted-foreground">One %</p>
                <p className="font-mono text-lg font-medium">{stats.oneRatio}%</p>
              </div>
            </div>
          )}

          {/* Bit Visualization */}
          <div className="rounded-lg border bg-background p-4 overflow-x-auto">
            <p className="text-sm font-medium mb-3 text-center">Bit Symmetry Visualization</p>
            <div className="flex gap-1 justify-center min-w-max">
              {bits.map((bit, idx) => (
                <div key={idx} className="text-center">
                  <div className={cn(
                    "w-10 h-12 rounded font-mono text-sm flex items-center justify-center mb-1",
                    bit.isMirror 
                      ? bit.value === "1" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted"
                      : "bg-destructive/20 text-destructive border border-destructive/30"
                  )}>
                    {bit.value}
                  </div>
                  <div className="text-xs text-muted-foreground">{idx}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Green bits match their mirror position. Red bits do not.
            </p>
          </div>

          {/* Mirror Comparison */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Mirror Comparison</p>
            <div className="font-mono text-center space-y-1">
              <p>Original:  <span className="text-primary">{cleanBinary}</span></p>
              <p>Reversed:  <span className="text-primary">{cleanBinary.split("").reverse().join("")}</span></p>
              <p className={cn(
                "pt-2 border-t",
                isPalindrome ? "text-green-500" : "text-destructive"
              )}>
                {isPalindrome ? "Match!" : "No Match"}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Generate Palindromes */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium">Generate Binary Palindromes</h3>
        
        <div className="flex items-center gap-4">
          <Label htmlFor="gen-length" className="text-sm font-medium whitespace-nowrap">
            Length (bits):
          </Label>
          <Input
            id="gen-length"
            type="number"
            min="1"
            max="16"
            value={generateLength}
            onChange={(e) => setGenerateLength(Math.max(1, Math.min(16, parseInt(e.target.value) || 8)))}
            className="w-20 font-mono"
          />
          <div className="flex gap-1">
            {[4, 6, 8, 10, 12].map((len) => (
              <Button
                key={len}
                variant={generateLength === len ? "default" : "outline"}
                size="xs"
                onClick={() => setGenerateLength(len)}
                className="h-7 px-3"
              >
                {len}
              </Button>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-background p-4">
          <div className="flex flex-wrap gap-2">
            {generatedPalindromes.map((palindrome, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="xs"
                onClick={() => setBinaryInput(palindrome)}
                className="font-mono h-8"
              >
                {palindrome}
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Click a palindrome to check it
          </p>
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Binary Palindromes</h4>
            <p className="text-sm text-muted-foreground">
              A binary palindrome reads the same forwards and backwards. 
              For example: 1001, 11011, 11111111 are all palindromes.
            </p>
            <p className="text-sm text-muted-foreground">
              Binary palindromes have applications in error detection codes, 
              data compression, and are interesting mathematical objects.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
