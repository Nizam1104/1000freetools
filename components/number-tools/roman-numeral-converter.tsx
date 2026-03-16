"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

export default function RomanNumeralConverter() {
  const [inputValue, setInputValue] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const romanMap: [number, string][] = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
  ]

  const romanValues: Record<string, number> = {
    I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
  }

  const toRoman = useCallback((num: number): string => {
    if (num < 1 || num > 3999) return ""
    let result = ""
    for (const [value, symbol] of romanMap) {
      while (num >= value) {
        result += symbol
        num -= value
      }
    }
    return result
  }, [])

  const fromRoman = useCallback((roman: string): number => {
    const upper = roman.toUpperCase()
    if (!/^[IVXLCDM]+$/.test(upper)) return NaN

    let result = 0
    let prevValue = 0

    for (let i = upper.length - 1; i >= 0; i--) {
      const value = romanValues[upper[i]]
      if (value < prevValue) {
        result -= value
      } else {
        result += value
      }
      prevValue = value
    }

    return result
  }, [])

  const number = useMemo(() => {
    const num = parseInt(inputValue, 10)
    return isNaN(num) ? null : num
  }, [inputValue])

  const roman = useMemo(() => {
    if (number === null || number < 1 || number > 3999) return ""
    return toRoman(number)
  }, [number, toRoman])

  const arabicFromRoman = useMemo(() => {
    const upper = inputValue.toUpperCase()
    if (!/^[IVXLCDM]+$/.test(upper)) return null
    return fromRoman(inputValue)
  }, [inputValue, fromRoman])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const isRomanInput = /^[IVXLCDMivxlcdm]+$/.test(inputValue) && inputValue.length > 0

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Roman Numeral Converter</h2>
        <p className="text-muted-foreground">
          Convert between Arabic numbers (1-3999) and Roman numerals.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="number-input">Arabic Number (1-3999)</Label>
          <div className="flex gap-2">
            <Input
              id="number-input"
              value={isRomanInput ? "" : inputValue}
              onChange={(e) => setInputValue(e.target.value.replace(/[^0-9]/g, ""))}
              className="font-mono"
              placeholder="Enter a number..."
              type="text"
              inputMode="numeric"
              disabled={isRomanInput}
            />
            {roman && (
              <Button
                variant="outline"
                onClick={() => copyToClipboard(roman, "roman")}
              >
                {copied === "roman" ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
            )}
          </div>
          {number !== null && (number < 1 || number > 3999) && (
            <p className="text-xs text-destructive">Please enter a number between 1 and 3999</p>
          )}
        </div>

        {roman && number !== null && number >= 1 && number <= 3999 && (
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground mb-2">Roman Numeral</p>
            <p className="text-4xl font-bold font-mono tracking-wider">{roman}</p>
          </div>
        )}

        <div className="border-t pt-6 space-y-2">
          <Label htmlFor="roman-input">Roman Numeral</Label>
          <div className="flex gap-2">
            <Input
              id="roman-input"
              value={isRomanInput ? inputValue : ""}
              onChange={(e) => setInputValue(e.target.value.replace(/[^IVXLCDMivxlcdm]/g, ""))}
              className="font-mono uppercase"
              placeholder="Enter Roman numeral..."
              type="text"
              disabled={!isRomanInput && inputValue !== ""}
            />
            {arabicFromRoman !== null && !isNaN(arabicFromRoman) && (
              <Button
                variant="outline"
                onClick={() => copyToClipboard(arabicFromRoman.toString(), "arabic")}
              >
                {copied === "arabic" ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
            )}
          </div>
        </div>

        {arabicFromRoman !== null && !isNaN(arabicFromRoman) && isRomanInput && (
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground mb-2">Arabic Number</p>
            <p className="text-4xl font-bold font-mono">{arabicFromRoman}</p>
          </div>
        )}

        <div className="rounded-lg border bg-background p-4">
          <h3 className="text-sm font-medium mb-2">Roman Numeral Reference</h3>
          <div className="grid grid-cols-7 gap-2 text-sm">
            {romanMap.slice(0, 7).map(([value, symbol]) => (
              <div key={symbol} className="text-center p-2 bg-muted rounded">
                <p className="font-bold">{symbol}</p>
                <p className="text-xs text-muted-foreground">{value}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Standard Roman numerals support numbers from 1 to 3,999 (MMMCMXCIX).
          </p>
        </div>
      </div>
    </div>
  )
}
