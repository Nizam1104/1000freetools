"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function DescriptiveStatisticsCalculator() {
  const [data, setData] = useState<string>("12, 15, 18, 20, 22, 25, 28, 30, 32, 35, 38, 40, 42, 45, 50, 55, 60, 65, 70, 80")
  const [copied, setCopied] = useState<string | null>(null)

  const stats = useMemo(() => {
    const values = data
      .split(/[\s,\n]+/)
      .map(s => parseFloat(s.trim()))
      .filter(n => !isNaN(n))

    if (values.length === 0) return null

    const n = values.length
    const sorted = [...values].sort((a, b) => a - b)
    
    // Basic statistics
    const sum = values.reduce((a, b) => a + b, 0)
    const mean = sum / n
    const min = sorted[0]
    const max = sorted[n - 1]
    const range = max - min
    
    // Median
    const median = n % 2 === 0
      ? (sorted[n/2 - 1] + sorted[n/2]) / 2
      : sorted[Math.floor(n/2)]
    
    // Mode
    const frequency: Record<number, number> = {}
    values.forEach(v => {
      frequency[v] = (frequency[v] || 0) + 1
    })
    const maxFreq = Math.max(...Object.values(frequency))
    const modes = Object.entries(frequency)
      .filter(([_, freq]) => freq === maxFreq)
      .map(([val]) => parseFloat(val))
    
    // Variance and Standard Deviation (sample)
    const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / (n - 1)
    const stdDev = Math.sqrt(variance)
    const stdDevPop = Math.sqrt(values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / n)
    
    // Quartiles
    const q1Index = Math.floor(n * 0.25)
    const q3Index = Math.floor(n * 0.75)
    const q1 = sorted[q1Index]
    const q3 = sorted[q3Index]
    const iqr = q3 - q1
    
    // Percentiles
    const p10 = sorted[Math.floor(n * 0.10)]
    const p90 = sorted[Math.floor(n * 0.90)]
    const p25 = q1
    const p75 = q3
    
    // Coefficient of Variation
    const cv = (stdDev / Math.abs(mean)) * 100
    
    // Standard Error
    const se = stdDev / Math.sqrt(n)
    
    // Skewness (Fisher-Pearson)
    const m3 = values.reduce((sum, v) => sum + Math.pow(v - mean, 3), 0) / n
    const skewness = m3 / Math.pow(stdDevPop, 3)
    
    // Kurtosis (excess)
    const m4 = values.reduce((sum, v) => sum + Math.pow(v - mean, 4), 0) / n
    const kurtosis = (m4 / Math.pow(stdDevPop, 4)) - 3
    
    // Sum of Squares
    const ss = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0)
    
    return {
      n, sum, mean, median, modes, maxFreq, min, max, range,
      variance, stdDev, stdDevPop, cv, se,
      q1, q3, iqr, p10, p90,
      skewness, kurtosis, ss,
      sorted, frequency
    }
  }, [data])

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
    setData("12, 15, 18, 20, 22, 25, 28, 30, 32, 35, 38, 40, 42, 45, 50, 55, 60, 65, 70, 80")
  }, [])

  const copyAllStats = useCallback(() => {
    if (!stats) return
    const text = `Descriptive Statistics
====================
Count (n): ${stats.n}
Sum: ${stats.sum.toFixed(4)}
Mean: ${stats.mean.toFixed(4)}
Median: ${stats.median.toFixed(4)}
Mode: ${stats.modes.length === stats.n ? 'No mode' : stats.modes.join(', ')}
Min: ${stats.min.toFixed(4)}
Max: ${stats.max.toFixed(4)}
Range: ${stats.range.toFixed(4)}

Variance (sample): ${stats.variance.toFixed(4)}
Std Dev (sample): ${stats.stdDev.toFixed(4)}
Std Dev (population): ${stats.stdDevPop.toFixed(4)}
Coefficient of Variation: ${stats.cv.toFixed(2)}%
Standard Error: ${stats.se.toFixed(4)}

Q1 (25th percentile): ${stats.q1.toFixed(4)}
Q3 (75th percentile): ${stats.q3.toFixed(4)}
IQR: ${stats.iqr.toFixed(4)}
10th Percentile: ${stats.p10.toFixed(4)}
90th Percentile: ${stats.p90.toFixed(4)}

Skewness: ${stats.skewness.toFixed(4)}
Kurtosis (excess): ${stats.kurtosis.toFixed(4)}
Sum of Squares: ${stats.ss.toFixed(4)}`
    copyToClipboard(text, "all")
  }, [stats, copyToClipboard])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Descriptive Statistics Calculator</h2>
        <p className="text-sm text-muted-foreground">
          Calculate comprehensive descriptive statistics for your dataset
        </p>
      </div>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="data" className="text-base font-medium">
            Data Values
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(data, "input")}
              className="h-7"
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
          id="data"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="font-mono text-sm min-h-[100px]"
          placeholder="Enter numbers separated by commas or spaces..."
        />
      </section>

      {/* Results */}
      {stats && (
        <section className="space-y-6">
          {/* Main Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Count (n)</p>
              <p className="text-2xl font-bold font-mono">{stats.n}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Sum</p>
              <p className="text-2xl font-bold font-mono">{stats.sum.toFixed(2)}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Mean</p>
              <p className="text-2xl font-bold font-mono">{stats.mean.toFixed(2)}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Median</p>
              <p className="text-2xl font-bold font-mono">{stats.median.toFixed(2)}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Mode</p>
              <p className="text-lg font-bold font-mono">
                {stats.modes.length === stats.n ? 'None' : stats.modes.join(', ')}
              </p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Min</p>
              <p className="text-2xl font-bold font-mono">{stats.min.toFixed(2)}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Max</p>
              <p className="text-2xl font-bold font-mono">{stats.max.toFixed(2)}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Range</p>
              <p className="text-2xl font-bold font-mono">{stats.range.toFixed(2)}</p>
            </div>
          </div>

          {/* Variability */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="text-sm font-medium mb-3">Variability</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Variance (sample)</p>
                <p className="font-mono">{stats.variance.toFixed(4)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Std Dev (sample)</p>
                <p className="font-mono">{stats.stdDev.toFixed(4)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Std Dev (population)</p>
                <p className="font-mono">{stats.stdDevPop.toFixed(4)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Coefficient of Variation</p>
                <p className="font-mono">{stats.cv.toFixed(2)}%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Standard Error</p>
                <p className="font-mono">{stats.se.toFixed(4)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Sum of Squares</p>
                <p className="font-mono">{stats.ss.toFixed(4)}</p>
              </div>
            </div>
          </div>

          {/* Distribution */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="text-sm font-medium mb-3">Distribution</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Skewness</p>
                <p className={cn("font-mono", Math.abs(stats.skewness) > 1 ? "text-amber-600" : "")}>
                  {stats.skewness.toFixed(4)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {stats.skewness > 0.5 ? "Positively skewed" : stats.skewness < -0.5 ? "Negatively skewed" : "Approximately symmetric"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Kurtosis (excess)</p>
                <p className="font-mono">{stats.kurtosis.toFixed(4)}</p>
                <p className="text-xs text-muted-foreground">
                  {stats.kurtosis > 0 ? "Leptokurtic (heavy tails)" : stats.kurtosis < 0 ? "Platykurtic (light tails)" : "Mesokurtic (normal)"}
                </p>
              </div>
            </div>
          </div>

          {/* Percentiles */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="text-sm font-medium mb-3">Percentiles & Quartiles</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">10th</p>
                <p className="font-mono">{stats.p10.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">25th (Q1)</p>
                <p className="font-mono">{stats.q1.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">50th (Median)</p>
                <p className="font-mono">{stats.median.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">75th (Q3)</p>
                <p className="font-mono">{stats.q3.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">90th</p>
                <p className="font-mono">{stats.p90.toFixed(2)}</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t">
              <p className="text-sm">
                <span className="text-muted-foreground">IQR (Q3 - Q1):</span>{' '}
                <span className="font-mono">{stats.iqr.toFixed(2)}</span>
              </p>
            </div>
          </div>

          {/* Copy All Button */}
          <Button variant="outline" onClick={copyAllStats} className="w-full">
            {copied === "all" ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
            {copied === "all" ? "Copied!" : "Copy All Statistics"}
          </Button>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Descriptive Statistics</h4>
            <p className="text-sm text-muted-foreground">
              Descriptive statistics summarize and describe the main features of a dataset.
              They include measures of central tendency (mean, median, mode), variability
              (variance, standard deviation), and distribution shape (skewness, kurtosis).
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Skewness:</strong> Measures asymmetry. Positive = right tail, Negative = left tail.
              <br />
              <strong>Kurtosis:</strong> Measures tail heaviness. Positive = heavy tails, Negative = light tails.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
