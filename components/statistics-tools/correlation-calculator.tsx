"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function factorial(n: number): number {
  if (n <= 1) return 1
  let result = 1
  for (let i = 2; i <= n; i++) result *= i
  return result
}

function combination(n: number, r: number): number {
  if (r > n || r < 0) return 0
  return factorial(n) / (factorial(r) * factorial(n - r))
}

function permutation(n: number, r: number): number {
  if (r > n || r < 0) return 0
  return factorial(n) / factorial(n - r)
}

export default function CorrelationCalculator() {
  const [dataX, setDataX] = useState<string>("")
  const [dataY, setDataY] = useState<string>("")
  const [correlationType, setCorrelationType] = useState<string>("pearson")
  const [copied, setCopied] = useState<string | null>(null)

  const parseData = useCallback((str: string): number[] => {
    return str
      .split(/[,\s\n]+/)
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n))
  }, [])

  const correlation = useMemo(() => {
    const x = parseData(dataX)
    const y = parseData(dataY)

    if (x.length !== y.length || x.length < 2) return null

    const n = x.length
    const meanX = x.reduce((a, b) => a + b, 0) / n
    const meanY = y.reduce((a, b) => a + b, 0) / n

    if (correlationType === "pearson") {
      let sumXY = 0
      let sumX2 = 0
      let sumY2 = 0

      for (let i = 0; i < n; i++) {
        const dx = x[i] - meanX
        const dy = y[i] - meanY
        sumXY += dx * dy
        sumX2 += dx * dx
        sumY2 += dy * dy
      }

      const denominator = Math.sqrt(sumX2 * sumY2)
      if (denominator === 0) return null

      const r = sumXY / denominator

      // Calculate p-value approximation (t-test)
      const t = r * Math.sqrt((n - 2) / (1 - r * r))
      // Simplified p-value (two-tailed)
      const pValue = 2 * (1 - standardNormalCDF(Math.abs(t)))

      return {
        type: "Pearson",
        coefficient: r,
        rSquared: r * r,
        pValue,
        strength: getCorrelationStrength(r),
      }
    } else {
      // Spearman's rank correlation
      const rankX = getRanks(x)
      const rankY = getRanks(y)

      let sumD2 = 0
      for (let i = 0; i < n; i++) {
        const d = rankX[i] - rankY[i]
        sumD2 += d * d
      }

      const rho = 1 - (6 * sumD2) / (n * (n * n - 1))

      return {
        type: "Spearman",
        coefficient: rho,
        rSquared: rho * rho,
        pValue: 0,
        strength: getCorrelationStrength(rho),
      }
    }
  }, [dataX, dataY, correlationType, parseData])

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
        <h2 className="text-2xl font-bold">Correlation Coefficient Calculator</h2>
        <p className="text-muted-foreground">
          Calculate Pearson's r or Spearman's rho correlation coefficient between two variables.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Label>Correlation Type:</Label>
          <Select value={correlationType} onValueChange={setCorrelationType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pearson">Pearson (Linear)</SelectItem>
              <SelectItem value="spearman">Spearman (Rank)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="data-x">Variable X</Label>
            <Textarea
              id="data-x"
              value={dataX}
              onChange={(e) => setDataX(e.target.value)}
              className="font-mono text-sm min-h-[150px]"
              placeholder="Enter values separated by commas..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="data-y">Variable Y</Label>
            <Textarea
              id="data-y"
              value={dataY}
              onChange={(e) => setDataY(e.target.value)}
              className="font-mono text-sm min-h-[150px]"
              placeholder="Enter values separated by commas..."
            />
          </div>
        </div>

        {correlation && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
                <p className="text-sm text-muted-foreground">{correlation.type} Correlation (r)</p>
                <div className="flex items-center justify-between">
                  <p className={`text-3xl font-bold font-mono ${
                    correlation.coefficient > 0.7 ? "text-green-600" :
                    correlation.coefficient < -0.7 ? "text-red-600" : ""
                  }`}>
                    {correlation.coefficient.toFixed(4)}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(correlation.coefficient.toString(), "r")}
                  >
                    {copied === "r" ? <Check className="size-4" /> : <Copy className="size-4" />}
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
                <p className="text-sm text-muted-foreground">R-Squared</p>
                <p className="text-3xl font-bold font-mono">{correlation.rSquared.toFixed(4)}</p>
                <p className="text-xs text-muted-foreground">
                  {(correlation.rSquared * 100).toFixed(2)}% variance explained
                </p>
              </div>

              <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
                <p className="text-sm text-muted-foreground">Strength</p>
                <p className="text-lg font-medium">{correlation.strength}</p>
              </div>
            </div>

            <div className="rounded-lg border bg-background p-4">
              <h3 className="text-sm font-medium mb-2">Interpretation Guide</h3>
              <div className="grid grid-cols-5 gap-2 text-xs">
                <div className="text-center p-2 bg-green-100 dark:bg-green-900/30 rounded">
                  <p className="font-medium">0.7 to 1.0</p>
                  <p className="text-muted-foreground">Strong Positive</p>
                </div>
                <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                  <p className="font-medium">0.3 to 0.7</p>
                  <p className="text-muted-foreground">Moderate Positive</p>
                </div>
                <div className="text-center p-2 bg-gray-50 dark:bg-gray-800/30 rounded">
                  <p className="font-medium">-0.3 to 0.3</p>
                  <p className="text-muted-foreground">Weak/None</p>
                </div>
                <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded">
                  <p className="font-medium">-0.7 to -0.3</p>
                  <p className="text-muted-foreground">Moderate Negative</p>
                </div>
                <div className="text-center p-2 bg-red-100 dark:bg-red-900/30 rounded">
                  <p className="font-medium">-1.0 to -0.7</p>
                  <p className="text-muted-foreground">Strong Negative</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function getRanks(values: number[]): number[] {
  const indexed = values.map((v, i) => ({ value: v, index: i }))
  indexed.sort((a, b) => a.value - b.value)

  const ranks = new Array(values.length)
  let i = 0
  while (i < indexed.length) {
    let j = i
    while (j < indexed.length && indexed[j].value === indexed[i].value) j++
    const avgRank = (i + j + 1) / 2
    for (let k = i; k < j; k++) {
      ranks[indexed[k].index] = avgRank
    }
    i = j
  }
  return ranks
}

function getCorrelationStrength(r: number): string {
  const absR = Math.abs(r)
  if (absR >= 0.9) return "Very Strong"
  if (absR >= 0.7) return "Strong"
  if (absR >= 0.5) return "Moderate"
  if (absR >= 0.3) return "Weak"
  return "Very Weak / None"
}

function standardNormalCDF(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z))
  const d = 0.3989423 * Math.exp(-z * z / 2)
  const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
  return z > 0 ? 1 - prob : prob
}
