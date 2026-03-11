"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function StandardDeviationCalculator() {
  const [inputData, setInputData] = useState<string>("")
  const [isSample, setIsSample] = useState<boolean>(true)
  const [copied, setCopied] = useState<string | null>(null)

  const parseNumbers = useCallback((str: string): number[] => {
    return str
      .split(/[,\s\n]+/)
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n))
  }, [])

  const statistics = useMemo(() => {
    const numbers = parseNumbers(inputData)
    if (numbers.length === 0) return null

    const n = numbers.length
    const mean = numbers.reduce((a, b) => a + b, 0) / n

    // Sort for median
    const sorted = [...numbers].sort((a, b) => a - b)
    const median =
      n % 2 === 0
        ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
        : sorted[Math.floor(n / 2)]

    // Variance and Standard Deviation
    const squaredDiffs = numbers.map((x) => Math.pow(x - mean, 2))
    const sumSquaredDiffs = squaredDiffs.reduce((a, b) => a + b, 0)
    const varianceDivisor = isSample && n > 1 ? n - 1 : n
    const variance = sumSquaredDiffs / varianceDivisor
    const stdDev = Math.sqrt(variance)

    // Min, Max, Range
    const min = Math.min(...numbers)
    const max = Math.max(...numbers)
    const range = max - min

    return {
      count: n,
      mean,
      median,
      variance,
      stdDev,
      min,
      max,
      range,
      sum: numbers.reduce((a, b) => a + b, 0),
    }
  }, [inputData, isSample, parseNumbers])

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
        <h2 className="text-2xl font-bold">Standard Deviation Calculator</h2>
        <p className="text-muted-foreground">
          Calculate standard deviation, variance, and other descriptive statistics for your dataset.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="data-input">Enter Data</Label>
          <Textarea
            id="data-input"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            className="font-mono text-sm min-h-[120px]"
            placeholder="Enter numbers separated by commas or spaces (e.g., 10, 20, 30, 40, 50)..."
          />
          <p className="text-xs text-muted-foreground">
            Enter at least 2 numbers for sample standard deviation
          </p>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              checked={isSample}
              onChange={() => setIsSample(true)}
              className="rounded border-border"
            />
            Sample Standard Deviation (n-1)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              checked={!isSample}
              onChange={() => setIsSample(false)}
              className="rounded border-border"
            />
            Population Standard Deviation (n)
          </label>
        </div>

        {statistics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Count</p>
              <p className="text-2xl font-bold font-mono">{statistics.count}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Mean</p>
              <p className="text-2xl font-bold font-mono">{statistics.mean.toFixed(4)}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Median</p>
              <p className="text-2xl font-bold font-mono">{statistics.median.toFixed(4)}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Std Deviation</p>
              <p className="text-2xl font-bold font-mono">{statistics.stdDev.toFixed(4)}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Variance</p>
              <p className="text-2xl font-bold font-mono">{statistics.variance.toFixed(4)}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Min</p>
              <p className="text-2xl font-bold font-mono">{statistics.min.toFixed(4)}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Max</p>
              <p className="text-2xl font-bold font-mono">{statistics.max.toFixed(4)}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Range</p>
              <p className="text-2xl font-bold font-mono">{statistics.range.toFixed(4)}</p>
            </div>
          </div>
        )}

        {statistics && (
          <div className="rounded-lg border bg-background p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Step-by-Step Calculation</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  copyToClipboard(
                    `Mean: ${statistics.mean.toFixed(4)}\nVariance: ${statistics.variance.toFixed(4)}\nStd Dev: ${statistics.stdDev.toFixed(4)}`,
                    "steps"
                  )
                }
              >
                {copied === "steps" ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                1. <strong>Mean</strong> = Sum of all values / Count = {statistics.sum.toFixed(2)} / {statistics.count} = {statistics.mean.toFixed(4)}
              </p>
              <p>
                2. <strong>Variance</strong> = Σ(x - mean)² / {isSample ? "n-1" : "n"} = {statistics.variance.toFixed(4)}
              </p>
              <p>
                3. <strong>Standard Deviation</strong> = √Variance = √{statistics.variance.toFixed(4)} = {statistics.stdDev.toFixed(4)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
