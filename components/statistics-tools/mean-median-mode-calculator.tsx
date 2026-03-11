"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function MeanMedianModeCalculator() {
  const [inputData, setInputData] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const statistics = useMemo(() => {
    const numbers = inputData
      .split(/[,\s\n]+/)
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n))

    if (numbers.length === 0) return null

    const n = numbers.length
    const sorted = [...numbers].sort((a, b) => a - b)
    const sum = numbers.reduce((a, b) => a + b, 0)
    const mean = sum / n

    const median =
      n % 2 === 0
        ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
        : sorted[Math.floor(n / 2)]

    const frequency: Record<number, number> = {}
    numbers.forEach((num) => {
      frequency[num] = (frequency[num] || 0) + 1
    })

    const maxFreq = Math.max(...Object.values(frequency))
    const modes = Object.entries(frequency)
      .filter(([_, freq]) => freq === maxFreq)
      .map(([num]) => parseFloat(num))

    const range = sorted[sorted.length - 1] - sorted[0]

    return {
      count: n,
      sum,
      mean,
      median,
      modes: modes.length === n ? [] : modes,
      isNoMode: modes.length === n || maxFreq === 1,
      range,
      min: sorted[0],
      max: sorted[sorted.length - 1],
    }
  }, [inputData])

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
        <h2 className="text-2xl font-bold">Mean, Median, Mode Calculator</h2>
        <p className="text-muted-foreground">
          Calculate mean, median, mode, and other descriptive statistics for your dataset.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="data-input">Enter Data</Label>
          <Textarea
            id="data-input"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            className="font-mono text-sm min-h-[100px]"
            placeholder="Enter numbers separated by commas or spaces..."
          />
        </div>

        {statistics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Count</p>
              <p className="text-2xl font-bold font-mono">{statistics.count}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Sum</p>
              <p className="text-2xl font-bold font-mono">{statistics.sum.toFixed(4)}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Mean (Average)</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold font-mono">{statistics.mean.toFixed(4)}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(statistics.mean.toString(), "mean")}
                >
                  {copied === "mean" ? <Check className="size-3" /> : <Copy className="size-3" />}
                </Button>
              </div>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Median</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold font-mono">{statistics.median.toFixed(4)}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(statistics.median.toString(), "median")}
                >
                  {copied === "median" ? <Check className="size-3" /> : <Copy className="size-3" />}
                </Button>
              </div>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1 md:col-span-2">
              <p className="text-xs text-muted-foreground">Mode</p>
              <p className="text-lg font-mono">
                {statistics.isNoMode
                  ? "No mode"
                  : statistics.modes.length > 1
                  ? `${statistics.modes.map((m) => m.toFixed(4)).join(", ")} (${statistics.modes.length} modes)`
                  : statistics.modes[0]?.toFixed(4)}
              </p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Min</p>
              <p className="text-2xl font-bold font-mono">{statistics.min.toFixed(4)}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Max</p>
              <p className="text-2xl font-bold font-mono">{statistics.max.toFixed(4)}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1 md:col-span-2">
              <p className="text-xs text-muted-foreground">Range</p>
              <p className="text-2xl font-bold font-mono">{statistics.range.toFixed(4)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
