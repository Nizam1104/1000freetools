"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy, Check, Trash2, Info, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

// Chi-square distribution critical values (simplified lookup table)
const CHI_SQUARE_CRITICAL_VALUES: Record<number, Record<number, number>> = {
  1: { 0.05: 3.841, 0.01: 6.635, 0.001: 10.828 },
  2: { 0.05: 5.991, 0.01: 9.210, 0.001: 13.816 },
  3: { 0.05: 7.815, 0.01: 11.345, 0.001: 16.266 },
  4: { 0.05: 9.488, 0.01: 13.277, 0.001: 18.467 },
  5: { 0.05: 11.070, 0.01: 15.086, 0.001: 20.515 },
  6: { 0.05: 12.592, 0.01: 16.812, 0.001: 22.458 },
  7: { 0.05: 14.067, 0.01: 18.475, 0.001: 24.322 },
  8: { 0.05: 15.507, 0.01: 20.090, 0.001: 26.124 },
  9: { 0.05: 16.919, 0.01: 21.666, 0.001: 27.877 },
  10: { 0.05: 18.307, 0.01: 23.209, 0.001: 29.588 },
}

interface ChiSquareResult {
  chiSquare: number
  degreesOfFreedom: number
  pValue: number
  isSignificant: boolean
  criticalValue: number
  observed: number[][]
  expected: number[][]
  contributions: number[][]
}

export default function ChiSquareTestCalculator() {
  const [observedData, setObservedData] = useState<string>("25 30\n40 35")
  const [significanceLevel, setSignificanceLevel] = useState<number>(0.05)
  const [result, setResult] = useState<ChiSquareResult | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calculateChiSquare = useCallback(() => {
    try {
      // Parse observed data
      const rows = observedData.trim().split("\n").map(row =>
        row.split(/[\s,]+/).map(val => parseFloat(val.trim())).filter(v => !isNaN(v))
      )

      if (rows.length < 2 || rows.some(r => r.length < 2)) {
        throw new Error("Please enter at least a 2x2 contingency table")
      }

      const r = rows.length
      const c = rows[0].length

      if (rows.some(row => row.length !== c)) {
        throw new Error("All rows must have the same number of columns")
      }

      // Calculate row and column totals
      const rowTotals = rows.map(row => row.reduce((a, b) => a + b, 0))
      const colTotals: number[] = []
      for (let j = 0; j < c; j++) {
        colTotals[j] = rows.reduce((sum, row) => sum + row[j], 0)
      }
      const grandTotal = rowTotals.reduce((a, b) => a + b, 0)

      // Calculate expected frequencies
      const expected: number[][] = []
      for (let i = 0; i < r; i++) {
        expected[i] = []
        for (let j = 0; j < c; j++) {
          expected[i][j] = (rowTotals[i] * colTotals[j]) / grandTotal
        }
      }

      // Calculate chi-square statistic
      let chiSquare = 0
      const contributions: number[][] = []
      for (let i = 0; i < r; i++) {
        contributions[i] = []
        for (let j = 0; j < c; j++) {
          const contribution = Math.pow(rows[i][j] - expected[i][j], 2) / expected[i][j]
          contributions[i][j] = contribution
          chiSquare += contribution
        }
      }

      // Degrees of freedom
      const df = (r - 1) * (c - 1)

      // Get critical value
      const criticalValue = CHI_SQUARE_CRITICAL_VALUES[df]?.[significanceLevel] ||
        CHI_SQUARE_CRITICAL_VALUES[10]?.[significanceLevel] || 18.307

      // Approximate p-value (simplified)
      const pValue = approximatePValue(chiSquare, df)

      setResult({
        chiSquare,
        degreesOfFreedom: df,
        pValue,
        isSignificant: chiSquare > criticalValue,
        criticalValue,
        observed: rows,
        expected,
        contributions
      })
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation failed")
      setResult(null)
    }
  }, [observedData, significanceLevel])

  // Simplified p-value approximation
  const approximatePValue = (chiSquare: number, df: number): number => {
    // Wilson-Hilferty approximation
    const z = (Math.pow(chiSquare / df, 1/3) - (1 - 2/(9*df))) / Math.sqrt(2/(9*df))
    // Standard normal CDF approximation
    const p = 1 - (1 / (1 + Math.exp(-1.7 * z)))
    return Math.max(0.0001, Math.min(0.9999, p))
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
    setObservedData("25 30\n40 35")
    setResult(null)
    setError(null)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Chi-Square Test Calculator</h2>
        <p className="text-sm text-muted-foreground">
          Perform chi-square test of independence for contingency tables
        </p>
      </div>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="observed" className="text-base font-medium">
            Observed Frequencies
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(observedData, "input")}
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
          id="observed"
          value={observedData}
          onChange={(e) => setObservedData(e.target.value)}
          className="font-mono text-sm min-h-[150px]"
          placeholder="Enter observed frequencies (rows separated by newlines, columns by spaces)...&#10;Example:&#10;25 30 20&#10;40 35 25&#10;30 25 30"
        />

        <p className="text-xs text-muted-foreground">
          Enter each row on a new line, separate values with spaces or commas.
        </p>
      </section>

      {/* Significance Level */}
      <section className="space-y-2">
        <Label htmlFor="alpha">Significance Level (α)</Label>
        <div className="flex gap-2">
          {[0.10, 0.05, 0.01, 0.001].map(alpha => (
            <Button
              key={alpha}
              variant={significanceLevel === alpha ? "default" : "outline"}
              size="sm"
              onClick={() => setSignificanceLevel(alpha)}
            >
              α = {alpha}
            </Button>
          ))}
        </div>
      </section>

      <Button onClick={calculateChiSquare} className="w-full">
        Calculate Chi-Square Test
      </Button>

      {/* Results */}
      {result && (
        <section className="space-y-4">
          {/* Main Results */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Chi-Square (χ²)</p>
              <p className="text-2xl font-bold font-mono">{result.chiSquare.toFixed(4)}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Degrees of Freedom</p>
              <p className="text-2xl font-bold font-mono">{result.degreesOfFreedom}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Critical Value</p>
              <p className="text-2xl font-bold font-mono">{result.criticalValue.toFixed(3)}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">P-Value</p>
              <p className="text-2xl font-bold font-mono">{result.pValue.toFixed(4)}</p>
            </div>
          </div>

          {/* Conclusion */}
          <div className={cn(
            "p-4 rounded-lg flex items-center gap-3",
            result.isSignificant ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-700"
          )}>
            {result.isSignificant ? (
              <AlertCircle className="size-6 text-green-600" />
            ) : (
              <Info className="size-6 text-gray-600" />
            )}
            <div>
              <p className="font-medium">
                {result.isSignificant
                  ? "Statistically Significant (p < α)"
                  : "Not Statistically Significant (p ≥ α)"}
              </p>
              <p className="text-sm">
                {result.isSignificant
                  ? "Reject the null hypothesis. There is a significant association between variables."
                  : "Fail to reject the null hypothesis. No significant association found."}
              </p>
            </div>
          </div>

          {/* Expected Frequencies */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <h4 className="text-sm font-medium mb-3">Expected Frequencies</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  {result.expected.map((row, i) => (
                    <tr key={i} className="border-t">
                      {row.map((val, j) => (
                        <td key={j} className="px-4 py-2 text-center font-mono">
                          {val.toFixed(2)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Contributions to Chi-Square */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <h4 className="text-sm font-medium mb-3">Contributions to χ²</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  {result.contributions.map((row, i) => (
                    <tr key={i} className="border-t">
                      {row.map((val, j) => (
                        <td key={j} className="px-4 py-2 text-center font-mono">
                          {val.toFixed(3)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Chi-Square Test</h4>
            <p className="text-sm text-muted-foreground">
              The chi-square test of independence determines whether there is a significant
              association between two categorical variables. It compares observed frequencies
              to expected frequencies under the assumption of independence.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Null Hypothesis (H₀):</strong> The variables are independent (no association).
              <br />
              <strong>Alternative Hypothesis (H₁):</strong> The variables are associated.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
