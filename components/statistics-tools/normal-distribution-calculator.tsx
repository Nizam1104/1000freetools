"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

// Standard normal CDF
const normalCDF = (z: number): number => {
  const t = 1 / (1 + 0.2316419 * Math.abs(z))
  const d = 0.3989423 * Math.exp(-z * z / 2)
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
  return z > 0 ? 1 - p : p
}

// Inverse normal CDF
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

export default function NormalDistributionCalculator() {
  const [mean, setMean] = useState<number>(100)
  const [stdDev, setStdDev] = useState<number>(15)
  const [calculationType, setCalculationType] = useState<"between" | "above" | "below" | "outside">("between")
  const [x1, setX1] = useState<number>(85)
  const [x2, setX2] = useState<number>(115)
  const [percentile, setPercentile] = useState<number>(95)

  const [result, setResult] = useState<{
    probability: number
    z1?: number
    z2?: number
    xValue?: number
    description: string
  } | null>(null)

  const calculate = useCallback(() => {
    try {
      if (calculationType === "between") {
        const z1 = (x1 - mean) / stdDev
        const z2 = (x2 - mean) / stdDev
        const prob = normalCDF(z2) - normalCDF(z1)
        setResult({
          probability: prob,
          z1,
          z2,
          description: `P(${x1} < X < ${x2}) = ${(prob * 100).toFixed(2)}%`
        })
      } else if (calculationType === "above") {
        const z = (x1 - mean) / stdDev
        const prob = 1 - normalCDF(z)
        setResult({
          probability: prob,
          z1: z,
          description: `P(X > ${x1}) = ${(prob * 100).toFixed(2)}%`
        })
      } else if (calculationType === "below") {
        const z = (x1 - mean) / stdDev
        const prob = normalCDF(z)
        setResult({
          probability: prob,
          z1: z,
          description: `P(X < ${x1}) = ${(prob * 100).toFixed(2)}%`
        })
      } else if (calculationType === "outside") {
        const z1 = (x1 - mean) / stdDev
        const z2 = (x2 - mean) / stdDev
        const prob = normalCDF(z1) + (1 - normalCDF(z2))
        setResult({
          probability: prob,
          z1,
          z2,
          description: `P(X < ${x1} or X > ${x2}) = ${(prob * 100).toFixed(2)}%`
        })
      }
    } catch (err) {
      setResult(null)
    }
  }, [calculationType, mean, stdDev, x1, x2])

  const calculatePercentile = useCallback(() => {
    try {
      const z = normalQuantile(percentile / 100)
      const xValue = mean + z * stdDev
      setResult({
        probability: percentile / 100,
        z1: z,
        xValue,
        description: `The ${percentile}th percentile is ${xValue.toFixed(2)}`
      })
    } catch (err) {
      setResult(null)
    }
  }, [percentile, mean, stdDev])

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
    setMean(100)
    setStdDev(15)
    setX1(85)
    setX2(115)
    setPercentile(95)
    setResult(null)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Normal Distribution Calculator</h2>
        <p className="text-sm text-muted-foreground">
          Calculate probabilities and percentiles for normal distributions
        </p>
      </div>

      {/* Parameters */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="mean">Mean (μ)</Label>
          <Input
            id="mean"
            type="number"
            value={mean}
            onChange={(e) => setMean(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stddev">Standard Deviation (σ)</Label>
          <Input
            id="stddev"
            type="number"
            min="0"
            value={stdDev}
            onChange={(e) => setStdDev(parseFloat(e.target.value) || 1)}
          />
        </div>
      </section>

      {/* Calculation Type */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Calculation Type</Label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <Button
            variant={calculationType === "between" ? "default" : "outline"}
            onClick={() => setCalculationType("between")}
          >
            Between
          </Button>
          <Button
            variant={calculationType === "above" ? "default" : "outline"}
            onClick={() => setCalculationType("above")}
          >
            Above
          </Button>
          <Button
            variant={calculationType === "below" ? "default" : "outline"}
            onClick={() => setCalculationType("below")}
          >
            Below
          </Button>
          <Button
            variant={calculationType === "outside" ? "default" : "outline"}
            onClick={() => setCalculationType("outside")}
          >
            Outside
          </Button>
          <Button
            variant="secondary"
            onClick={calculatePercentile}
          >
            Percentile
          </Button>
        </div>
      </section>

      {/* Input Values */}
      <section className="grid gap-4 md:grid-cols-2">
        {calculationType !== "percentile" ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="x1">
                {calculationType === "between" || calculationType === "outside" ? "Lower Value (X₁)" : "Value (X)"}
              </Label>
              <Input
                id="x1"
                type="number"
                value={x1}
                onChange={(e) => setX1(parseFloat(e.target.value) || 0)}
              />
            </div>
            {(calculationType === "between" || calculationType === "outside") && (
              <div className="space-y-2">
                <Label htmlFor="x2">Upper Value (X₂)</Label>
                <Input
                  id="x2"
                  type="number"
                  value={x2}
                  onChange={(e) => setX2(parseFloat(e.target.value) || 0)}
                />
              </div>
            )}
          </>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="percentile">Percentile (0-100)</Label>
            <Input
              id="percentile"
              type="number"
              min="0"
              max="100"
              value={percentile}
              onChange={(e) => setPercentile(parseFloat(e.target.value) || 50)}
            />
          </div>
        )}
      </section>

      <div className="flex gap-2">
        {calculationType !== "percentile" && (
          <Button onClick={calculate} className="flex-1">
            Calculate Probability
          </Button>
        )}
        <Button variant="outline" onClick={handleClear}>
          <Trash2 className="size-4" />
        </Button>
      </div>

      {/* Results */}
      {result && (
        <section className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-6 text-center">
            <p className="text-3xl font-bold text-primary">{(result.probability * 100).toFixed(2)}%</p>
            <p className="text-sm text-muted-foreground mt-2 font-mono">{result.description}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {result.z1 !== undefined && (
              <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
                <p className="text-xs text-muted-foreground">Z-Score 1</p>
                <p className="text-xl font-bold font-mono">{result.z1.toFixed(3)}</p>
              </div>
            )}
            {result.z2 !== undefined && (
              <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
                <p className="text-xs text-muted-foreground">Z-Score 2</p>
                <p className="text-xl font-bold font-mono">{result.z2.toFixed(3)}</p>
              </div>
            )}
            {result.xValue !== undefined && (
              <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
                <p className="text-xs text-muted-foreground">X Value</p>
                <p className="text-xl font-bold font-mono">{result.xValue.toFixed(2)}</p>
              </div>
            )}
          </div>

          {/* Visual representation */}
          <div className="rounded-lg border bg-white p-4">
            <div className="relative h-32">
              {/* Bell curve approximation */}
              <svg viewBox="0 0 200 80" className="w-full h-full">
                <path
                  d="M 10 75 Q 50 75 70 40 Q 85 10 100 10 Q 115 10 130 40 Q 150 75 190 75"
                  fill="none"
                  stroke="#4F46E5"
                  strokeWidth="2"
                />
                <line x1="100" y1="10" x2="100" y2="75" stroke="#9CA3AF" strokeDasharray="2,2" />
                <text x="100" y="78" textAnchor="middle" fontSize="8" fill="#6B7280">μ={mean}</text>
                {result.z1 !== undefined && (
                  <>
                    <line x1={100 + result.z1 * 20} y1="10" x2={100 + result.z1 * 20} y2="75"
                          stroke="#DC2626" strokeWidth="2" />
                    <text x={100 + result.z1 * 20} y="78" textAnchor="middle" fontSize="8" fill="#DC2626">
                      {calculationType === "between" || calculationType === "outside" ? "X₁" : "X"}
                    </text>
                  </>
                )}
                {result.z2 !== undefined && (
                  <>
                    <line x1={100 + result.z2 * 20} y1="10" x2={100 + result.z2 * 20} y2="75"
                          stroke="#16A34A" strokeWidth="2" />
                    <text x={100 + result.z2 * 20} y="78" textAnchor="middle" fontSize="8" fill="#16A34A">X₂</text>
                  </>
                )}
              </svg>
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Normal Distribution</h4>
            <p className="text-sm text-muted-foreground">
              The normal (Gaussian) distribution is a continuous probability distribution characterized
              by its bell-shaped curve. It's defined by two parameters: mean (μ) which determines
              the center, and standard deviation (σ) which determines the spread.
            </p>
            <p className="text-sm text-muted-foreground">
              The empirical rule states that approximately 68% of data falls within 1σ of the mean,
              95% within 2σ, and 99.7% within 3σ.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
