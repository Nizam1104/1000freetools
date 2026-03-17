"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnovaResult {
  groupStats: { name: string; n: number; mean: number; variance: number }[]
  anovaTable: {
    source: string
    ss: number
    df: number
    ms: number
    f: number
    pValue: number
  }[]
  fCritical: number
  isSignificant: boolean
  etaSquared: number
}

export default function AnovaCalculator() {
  const [groupData, setGroupData] = useState<string>("Group A: 23, 25, 28, 30, 32\nGroup B: 35, 38, 40, 42, 45\nGroup C: 48, 50, 52, 55, 58")
  const [alpha, setAlpha] = useState<number>(0.05)
  const [result, setResult] = useState<AnovaResult | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calculateAnova = useCallback(() => {
    try {
      // Parse group data
      const lines = groupData.trim().split("\n")
      const groups: { name: string; values: number[] }[] = []

      lines.forEach(line => {
        const [name, valuesStr] = line.split(":")
        if (name && valuesStr) {
          const values = valuesStr
            .split(/[\s,]+/)
            .map(s => parseFloat(s.trim()))
            .filter(v => !isNaN(v))
          if (values.length > 0) {
            groups.push({ name: name.trim(), values })
          }
        }
      })

      if (groups.length < 2) {
        throw new Error("Please enter at least 2 groups")
      }

      // Calculate group statistics
      const groupStats = groups.map(g => {
        const n = g.values.length
        const mean = g.values.reduce((a, b) => a + b, 0) / n
        const variance = g.values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / (n - 1)
        return { name: g.name, n, mean, variance }
      })

      // Overall statistics
      const totalN = groupStats.reduce((sum, g) => sum + g.n, 0)
      const grandMean = groupStats.reduce((sum, g) => sum + g.mean * g.n, 0) / totalN
      const k = groups.length // Number of groups

      // Sum of Squares Between (SSB)
      const ssb = groupStats.reduce((sum, g) => sum + g.n * Math.pow(g.mean - grandMean, 2), 0)

      // Sum of Squares Within (SSW)
      const ssw = groupStats.reduce((sum, g) => sum + (g.n - 1) * g.variance, 0)

      // Sum of Squares Total (SST)
      const sst = ssb + ssw

      // Degrees of freedom
      const dfBetween = k - 1
      const dfWithin = totalN - k
      const dfTotal = totalN - 1

      // Mean Squares
      const msb = ssb / dfBetween
      const msw = ssw / dfWithin

      // F-statistic
      const f = msb / msw

      // P-value approximation (using F-distribution approximation)
      const pValue = approximateFPValue(f, dfBetween, dfWithin)

      // F critical value (approximation)
      const fCritical = approximateFCritical(dfBetween, dfWithin, alpha)

      // Effect size (Eta-squared)
      const etaSquared = ssb / sst

      // ANOVA table
      const anovaTable = [
        { source: "Between Groups", ss: ssb, df: dfBetween, ms: msb, f, pValue },
        { source: "Within Groups", ss: ssw, df: dfWithin, ms: msw, f: 0, pValue: 0 },
        { source: "Total", ss: sst, df: dfTotal, ms: 0, f: 0, pValue: 0 }
      ]

      setResult({
        groupStats,
        anovaTable,
        fCritical,
        isSignificant: f > fCritical,
        etaSquared
      })
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation failed")
      setResult(null)
    }
  }, [groupData, alpha])

  // Approximate F-distribution p-value
  const approximateFPValue = (f: number, df1: number, df2: number): number => {
    // Using beta distribution approximation
    const x = df2 / (df2 + df1 * f)
    // Incomplete beta function approximation
    const a = df2 / 2
    const b = df1 / 2
    // Simple approximation
    const p = Math.pow(x, a) * Math.pow(1 - x, b)
    return Math.max(0.0001, Math.min(0.9999, 1 - p))
  }

  // Approximate F critical value
  const approximateFCritical = (df1: number, df2: number, alpha: number): number => {
    // Simplified approximation using chi-square
    const chiSqCrit = df1 * (1 + 2 / (9 * df1) + normalQuantile(1 - alpha) * Math.sqrt(2 / (9 * df1))) ** 3
    return chiSqCrit / df1
  }

  const normalQuantile = (p: number): number => {
    if (p <= 0) return -10
    if (p >= 1) return 10
    if (p === 0.5) return 0
    const t = Math.sqrt(-2 * Math.log(p < 0.5 ? p : 1 - p))
    const c0 = 2.515517, c1 = 0.802853, c2 = 0.010328
    const d1 = 1.432788, d2 = 0.189269, d3 = 0.001308
    const z = t - (c0 + c1 * t + c2 * t * t) / (1 + d1 * t + d2 * t * t + d3 * t * t * t)
    return p < 0.5 ? -z : z
  }

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
    setGroupData("Group A: 23, 25, 28, 30, 32\nGroup B: 35, 38, 40, 42, 45\nGroup C: 48, 50, 52, 55, 58")
    setResult(null)
    setError(null)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">ANOVA Calculator</h2>
        <p className="text-sm text-muted-foreground">
          One-way Analysis of Variance (ANOVA) for comparing multiple group means
        </p>
      </div>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="data" className="text-base font-medium">
            Group Data
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(groupData, "input")}
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
          value={groupData}
          onChange={(e) => setGroupData(e.target.value)}
          className="font-mono text-sm min-h-[150px]"
          placeholder="Enter group data (one group per line):&#10;Group A: 23, 25, 28, 30, 32&#10;Group B: 35, 38, 40, 42, 45&#10;Group C: 48, 50, 52, 55, 58"
        />

        <p className="text-xs text-muted-foreground">
          Format: Group Name: value1, value2, value3, ...
        </p>
      </section>

      {/* Alpha */}
      <section className="space-y-2">
        <Label htmlFor="alpha">Significance Level (α)</Label>
        <div className="flex gap-2">
          {[0.10, 0.05, 0.01].map(a => (
            <Button
              key={a}
              variant={alpha === a ? "default" : "outline"}
              size="sm"
              onClick={() => setAlpha(a)}
            >
              α = {a}
            </Button>
          ))}
        </div>
      </section>

      <Button onClick={calculateAnova} className="w-full">
        Calculate ANOVA
      </Button>

      {/* Results */}
      {result && (
        <section className="space-y-4">
          {/* Group Statistics */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <h4 className="text-sm font-medium mb-3">Group Statistics</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">Group</th>
                    <th className="px-4 py-2 text-right">N</th>
                    <th className="px-4 py-2 text-right">Mean</th>
                    <th className="px-4 py-2 text-right">Variance</th>
                    <th className="px-4 py-2 text-right">Std Dev</th>
                  </tr>
                </thead>
                <tbody>
                  {result.groupStats.map((g, i) => (
                    <tr key={i} className="border-b">
                      <td className="px-4 py-2 font-medium">{g.name}</td>
                      <td className="px-4 py-2 text-right font-mono">{g.n}</td>
                      <td className="px-4 py-2 text-right font-mono">{g.mean.toFixed(2)}</td>
                      <td className="px-4 py-2 text-right font-mono">{g.variance.toFixed(2)}</td>
                      <td className="px-4 py-2 text-right font-mono">{Math.sqrt(g.variance).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ANOVA Table */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <h4 className="text-sm font-medium mb-3">ANOVA Table</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">Source</th>
                    <th className="px-4 py-2 text-right">SS</th>
                    <th className="px-4 py-2 text-right">df</th>
                    <th className="px-4 py-2 text-right">MS</th>
                    <th className="px-4 py-2 text-right">F</th>
                    <th className="px-4 py-2 text-right">p-value</th>
                  </tr>
                </thead>
                <tbody>
                  {result.anovaTable.map((row, i) => (
                    <tr key={i} className={cn("border-b", i === 0 && "font-medium")}>
                      <td className="px-4 py-2">{row.source}</td>
                      <td className="px-4 py-2 text-right font-mono">{row.ss.toFixed(2)}</td>
                      <td className="px-4 py-2 text-right font-mono">{row.df}</td>
                      <td className="px-4 py-2 text-right font-mono">{row.ms.toFixed(2)}</td>
                      <td className="px-4 py-2 text-right font-mono">{row.f > 0 ? row.f.toFixed(2) : "-"}</td>
                      <td className={cn("px-4 py-2 text-right font-mono", row.pValue < alpha ? "text-green-600" : "")}>
                        {row.pValue > 0 ? row.pValue.toFixed(4) : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Conclusion */}
          <div className={cn(
            "p-4 rounded-lg",
            result.isSignificant ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-700"
          )}>
            <p className="font-medium">
              {result.isSignificant
                ? `Significant difference found (F(${result.anovaTable[0].df}, ${result.anovaTable[1].df}) = ${result.anovaTable[0].f.toFixed(2)}, p < ${alpha})`
                : `No significant difference (F(${result.anovaTable[0].df}, ${result.anovaTable[1].df}) = ${result.anovaTable[0].f.toFixed(2)}, p ≥ ${alpha})`}
            </p>
            <p className="text-sm mt-1">
              Effect size (η²): {result.etaSquared.toFixed(3)} - {
                result.etaSquared < 0.01 ? "negligible" :
                result.etaSquared < 0.06 ? "small" :
                result.etaSquared < 0.14 ? "medium" : "large"
              } effect
            </p>
          </div>
        </section>
      )}

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About ANOVA</h4>
            <p className="text-sm text-muted-foreground">
              One-way ANOVA tests whether there are statistically significant differences
              between the means of three or more independent groups. It compares the variance
              between groups to the variance within groups.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Null Hypothesis (H₀):</strong> All group means are equal.
              <br />
              <strong>Alternative Hypothesis (H₁):</strong> At least one group mean is different.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
