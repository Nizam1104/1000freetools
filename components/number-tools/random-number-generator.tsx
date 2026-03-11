"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check, Download } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export default function RandomNumberGenerator() {
  const [min, setMin] = useState<string>("1")
  const [max, setMax] = useState<string>("100")
  const [count, setCount] = useState<string>("1")
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(false)
  const [sorted, setSorted] = useState<boolean>(false)
  const [results, setResults] = useState<number[]>([])
  const [copied, setCopied] = useState<string | null>(null)

  const generateRandomNumbers = useCallback(() => {
    const minNum = parseInt(min, 10)
    const maxNum = parseInt(max, 10)
    const countNum = parseInt(count, 10)

    if (isNaN(minNum) || isNaN(maxNum) || isNaN(countNum)) return
    if (minNum >= maxNum) return
    if (countNum < 1 || countNum > 10000) return

    const numbers: number[] = []

    if (allowDuplicates) {
      for (let i = 0; i < countNum; i++) {
        numbers.push(Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum)
      }
    } else {
      const availableNumbers = []
      for (let i = minNum; i <= maxNum; i++) {
        availableNumbers.push(i)
      }

      const maxPossible = Math.min(countNum, availableNumbers.length)
      for (let i = 0; i < maxPossible; i++) {
        const randomIndex = Math.floor(Math.random() * availableNumbers.length)
        numbers.push(availableNumbers[randomIndex])
        availableNumbers.splice(randomIndex, 1)
      }
    }

    if (sorted) {
      numbers.sort((a, b) => a - b)
    }

    setResults(numbers)
  }, [min, max, count, allowDuplicates, sorted])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const downloadAsCSV = useCallback(() => {
    if (results.length === 0) return
    const csv = results.join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "random-numbers.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [results])

  const canGenerate = () => {
    const minNum = parseInt(min, 10)
    const maxNum = parseInt(max, 10)
    const countNum = parseInt(count, 10)
    return (
      !isNaN(minNum) &&
      !isNaN(maxNum) &&
      !isNaN(countNum) &&
      minNum < maxNum &&
      countNum >= 1 &&
      countNum <= 10000
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Random Number Generator</h2>
        <p className="text-muted-foreground">
          Generate random numbers within a custom range with various options.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="min-input">Minimum</Label>
          <Input
            id="min-input"
            value={min}
            onChange={(e) => setMin(e.target.value.replace(/[^0-9-]/g, ""))}
            className="font-mono"
            placeholder="Min value"
            type="text"
            inputMode="numeric"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="max-input">Maximum</Label>
          <Input
            id="max-input"
            value={max}
            onChange={(e) => setMax(e.target.value.replace(/[^0-9-]/g, ""))}
            className="font-mono"
            placeholder="Max value"
            type="text"
            inputMode="numeric"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="count-input">Quantity</Label>
          <Input
            id="count-input"
            value={count}
            onChange={(e) => setCount(e.target.value.replace(/[^0-9]/g, ""))}
            className="font-mono"
            placeholder="How many numbers"
            type="text"
            inputMode="numeric"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <Checkbox
            id="allow-duplicates"
            checked={allowDuplicates}
            onCheckedChange={(checked) => setAllowDuplicates(checked as boolean)}
          />
          <Label htmlFor="allow-duplicates" className="text-sm font-normal cursor-pointer">
            Allow duplicates
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="sort-results"
            checked={sorted}
            onCheckedChange={(checked) => setSorted(checked as boolean)}
          />
          <Label htmlFor="sort-results" className="text-sm font-normal cursor-pointer">
            Sort results (ascending)
          </Label>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={generateRandomNumbers} disabled={!canGenerate()}>
          Generate
        </Button>
        {results.length > 0 && (
          <>
            <Button
              variant="outline"
              onClick={() => copyToClipboard(results.join(", "), "results")}
            >
              {copied === "results" ? <Check className="size-4" /> : <Copy className="size-4" />}
              <span className="ml-2">Copy</span>
            </Button>
            <Button variant="outline" onClick={downloadAsCSV}>
              <Download className="size-4" />
              <span className="ml-2">Download CSV</span>
            </Button>
          </>
        )}
      </div>

      {results.length > 0 && (
        <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              Generated {results.length} number{results.length !== 1 ? "s" : ""}
            </p>
            <p className="text-xs text-muted-foreground">
              Range: {min} to {max}
            </p>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 max-h-96 overflow-y-auto">
            {results.map((num, idx) => (
              <div
                key={idx}
                className="bg-background rounded border px-2 py-1 text-center font-mono text-sm"
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
