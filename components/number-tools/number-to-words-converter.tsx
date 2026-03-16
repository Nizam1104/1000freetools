"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

function numberToWords(num: number): string {
  if (num === 0) return "zero"

  const ones = [
    "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
    "seventeen", "eighteen", "nineteen"
  ]
  const tens = [
    "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
  ]

  const convertHundreds = (n: number): string => {
    let result = ""
    if (n >= 100) {
      result += ones[Math.floor(n / 100)] + " hundred"
      n %= 100
      if (n > 0) result += " "
    }
    if (n >= 20) {
      result += tens[Math.floor(n / 10)]
      if (n % 10 > 0) result += "-" + ones[n % 10]
    } else if (n > 0) {
      result += ones[n]
    }
    return result
  }

  const scales = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion"]
  let result = ""
  let scaleIndex = 0
  let isNegative = num < 0
  num = Math.abs(num)

  while (num > 0) {
    const chunk = num % 1000
    if (chunk > 0) {
      const chunkStr = convertHundreds(chunk)
      const scale = scales[scaleIndex]
      const chunkWithScale = scale ? chunkStr + " " + scale : chunkStr
      result = chunkWithScale + (result ? " " + result : "")
    }
    num = Math.floor(num / 1000)
    scaleIndex++
  }

  return isNegative ? "negative " + result : result
}

export default function NumberToWordsConverter() {
  const [inputValue, setInputValue] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const number = useMemo(() => {
    const num = parseFloat(inputValue)
    return isNaN(num) ? null : num
  }, [inputValue])

  const wordsResult = useMemo(() => {
    if (number === null) return null

    const isNegative = number < 0
    const absNum = Math.abs(number)
    const integerPart = Math.floor(absNum)
    const decimalPart = Math.round((absNum - integerPart) * 100)

    let result = numberToWords(integerPart)

    if (decimalPart > 0) {
      result += " point " + decimalPart.toString().split("").map(d => numberToWords(parseInt(d))).join(" ")
    }

    return isNegative ? "negative " + result : result
  }, [number])

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
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Number to Words Converter</h2>
        <p className="text-muted-foreground">
          Convert any number to its written English word form.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="number-input">Enter a Number</Label>
          <Input
            id="number-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.replace(/[^0-9.-]/g, ""))}
            className="font-mono"
            placeholder="Enter any number (e.g., 1234.56)..."
            type="text"
            inputMode="decimal"
          />
        </div>

        {number !== null && (
          <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">In Words</p>
              <div className="flex items-start justify-between gap-4">
                <p className="text-lg font-medium capitalize">
                  {wordsResult}
                </p>
                {wordsResult && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(wordsResult, "words")}
                    className="shrink-0"
                  >
                    {copied === "words" ? <Check className="size-4" /> : <Copy className="size-4" />}
                  </Button>
                )}
              </div>
            </div>

            <div className="pt-4 border-t space-y-2">
              <p className="text-sm text-muted-foreground">Number Breakdown</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Integer Part:</span>
                  <span className="ml-2 font-mono">{Math.floor(Math.abs(number))}</span>
                </div>
                {number % 1 !== 0 && (
                  <div>
                    <span className="text-muted-foreground">Decimal Part:</span>
                    <span className="ml-2 font-mono">{(Math.abs(number) % 1).toFixed(2).slice(2)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
