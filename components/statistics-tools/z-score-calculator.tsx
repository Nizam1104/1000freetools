"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

// Standard normal cumulative distribution function approximation
function standardNormalCDF(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z))
  const d = 0.3989423 * Math.exp(-z * z / 2)
  const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
  return z > 0 ? 1 - prob : prob
}

// Inverse standard normal CDF (percent point function)
function inverseNormalCDF(p: number): number {
  if (p <= 0 || p >= 1) return NaN
  if (p === 0.5) return 0

  const a = [
    -3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2,
    1.383577518672690e2, -3.066479806614716e1, 2.506628277459239e0
  ]
  const b = [
    -5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2,
    6.680131188771972e1, -1.328068155288572e1
  ]
  const c = [
    -7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838e0,
    -2.549732539343734e0, 4.374664141464968e0, 2.938163982698783e0
  ]
  const d = [
    7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996e0,
    3.754408661907416e0
  ]

  const pLow = 0.02425
  const pHigh = 1 - pLow

  let q: number, r: number, x: number

  if (p < pLow) {
    q = Math.sqrt(-2 * Math.log(p))
    x = (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
        ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
  } else if (p <= pHigh) {
    q = p - 0.5
    r = q * q
    x = (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
        (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
  } else {
    q = Math.sqrt(-2 * Math.log(1 - p))
    x = -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
         ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
  }

  return x
}

export default function ZScoreCalculator() {
  const [rawScore, setRawScore] = useState<string>("")
  const [mean, setMean] = useState<string>("")
  const [stdDev, setStdDev] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const zScore = useMemo(() => {
    const x = parseFloat(rawScore)
    const mu = parseFloat(mean)
    const sigma = parseFloat(stdDev)

    if (isNaN(x) || isNaN(mu) || isNaN(sigma) || sigma === 0) return null

    return (x - mu) / sigma
  }, [rawScore, mean, stdDev])

  const probability = useMemo(() => {
    if (zScore === null) return null

    const pValue = standardNormalCDF(zScore)
    const percentile = pValue * 100

    return {
      pValue,
      percentile,
      pValueLess: pValue,
      pValueGreater: 1 - pValue,
    }
  }, [zScore])

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
        <h2 className="text-2xl font-bold">Z-Score Calculator</h2>
        <p className="text-muted-foreground">
          Calculate the z-score (standard score) and find the probability in a normal distribution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="raw-score">Raw Score (X)</Label>
          <Input
            id="raw-score"
            value={rawScore}
            onChange={(e) => setRawScore(e.target.value.replace(/[^0-9.-]/g, ""))}
            className="font-mono"
            placeholder="e.g., 85"
            type="text"
            inputMode="decimal"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mean">Mean (μ)</Label>
          <Input
            id="mean"
            value={mean}
            onChange={(e) => setMean(e.target.value.replace(/[^0-9.-]/g, ""))}
            className="font-mono"
            placeholder="e.g., 75"
            type="text"
            inputMode="decimal"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="std-dev">Standard Deviation (σ)</Label>
          <Input
            id="std-dev"
            value={stdDev}
            onChange={(e) => setStdDev(e.target.value.replace(/[^0-9.-]/g, ""))}
            className="font-mono"
            placeholder="e.g., 10"
            type="text"
            inputMode="decimal"
          />
        </div>
      </div>

      {zScore !== null && probability && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
              <p className="text-sm text-muted-foreground">Z-Score</p>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold font-mono">{zScore.toFixed(4)}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(zScore.toString(), "zscore")}
                >
                  {copied === "zscore" ? <Check className="size-4" /> : <Copy className="size-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Formula: z = (X - μ) / σ
              </p>
            </div>

            <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
              <p className="text-sm text-muted-foreground">Percentile</p>
              <p className="text-3xl font-bold font-mono">{probability.percentile.toFixed(2)}%</p>
              <p className="text-xs text-muted-foreground">
                {zScore > 0
                  ? "Above average"
                  : zScore < 0
                  ? "Below average"
                  : "Exactly at the mean"}
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-background p-4 space-y-3">
            <h3 className="text-sm font-medium">Probabilities</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">P(X &lt; raw score)</p>
                <p className="text-lg font-mono">{probability.pValueLess.toFixed(6)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">P(X &gt; raw score)</p>
                <p className="text-lg font-mono">{probability.pValueGreater.toFixed(6)}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="text-sm font-medium mb-2">Interpretation</h3>
            <p className="text-sm text-muted-foreground">
              A z-score of {zScore.toFixed(4)} means the raw score is{" "}
              <strong>{Math.abs(zScore).toFixed(4)} standard deviations</strong>{" "}
              {zScore > 0 ? "above" : zScore < 0 ? "below" : "at"} the mean.
              This places it at the {probability.percentile.toFixed(2)}th percentile,
              meaning {probability.percentile.toFixed(2)}% of values fall below this score.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
