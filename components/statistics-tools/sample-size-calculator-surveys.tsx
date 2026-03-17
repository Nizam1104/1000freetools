"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

// Standard normal quantile
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

export default function SampleSizeCalculatorSurveys() {
  const [calculationType, setCalculationType] = useState<"proportion" | "mean" | "compare">("proportion")
  
  // For proportion
  const [marginOfError, setMarginOfError] = useState<number>(0.05)
  const [confidenceLevel, setConfidenceLevel] = useState<number>(0.95)
  const [proportion, setProportion] = useState<number>(0.5)
  const [populationSize, setPopulationSize] = useState<number>(10000)
  const [useFinite, setUseFinite] = useState<boolean>(true)

  // For mean
  const [stdDev, setStdDev] = useState<number>(15)
  const [marginOfErrorMean, setMarginOfErrorMean] = useState<number>(3)

  // For comparison
  const [effectSize, setEffectSize] = useState<number>(0.5)
  const [power, setPower] = useState<number>(0.8)
  const [alphaCompare, setAlphaCompare] = useState<number>(0.05)

  const [result, setResult] = useState<{
    sampleSize: number
    adjustedSampleSize?: number
    description: string
    details: string[]
  } | null>(null)

  const calculate = useCallback(() => {
    try {
      const z = normalQuantile(1 - (1 - confidenceLevel) / 2)
      let n: number
      let details: string[] = []

      if (calculationType === "proportion") {
        // Cochran's formula
        n = (Math.pow(z, 2) * proportion * (1 - proportion)) / Math.pow(marginOfError, 2)
        
        details = [
          `Z-score (${confidenceLevel * 100}% confidence): ${z.toFixed(3)}`,
          `Expected proportion: ${proportion}`,
          `Margin of error: ±${(marginOfError * 100).toFixed(1)}%`,
          `Initial sample size: ${Math.ceil(n)}`
        ]

        // Finite population correction
        let adjustedN: number | undefined
        if (useFinite && populationSize < Infinity) {
          adjustedN = n / (1 + (n - 1) / populationSize)
          details.push(`Population size: ${populationSize.toLocaleString()}`)
          details.push(`After finite population correction: ${Math.ceil(adjustedN)}`)
        }

        setResult({
          sampleSize: Math.ceil(n),
          adjustedSampleSize: adjustedN ? Math.ceil(adjustedN) : undefined,
          description: `Required Sample Size: ${adjustedN ? Math.ceil(adjustedN).toLocaleString() : Math.ceil(n).toLocaleString()}`,
          details
        })
      } else if (calculationType === "mean") {
        n = (Math.pow(z * stdDev, 2)) / Math.pow(marginOfErrorMean, 2)
        
        details = [
          `Z-score (${confidenceLevel * 100}% confidence): ${z.toFixed(3)}`,
          `Standard deviation: ${stdDev}`,
          `Margin of error: ±${marginOfErrorMean}`,
          `Required sample size: ${Math.ceil(n)}`
        ]

        setResult({
          sampleSize: Math.ceil(n),
          description: `Required Sample Size: ${Math.ceil(n).toLocaleString()}`,
          details
        })
      } else {
        // Comparing two means (two-sample t-test)
        const zBeta = normalQuantile(power)
        n = 2 * Math.pow((z + zBeta) / effectSize, 2)
        
        details = [
          `Z-score (α = ${alphaCompare}): ${z.toFixed(3)}`,
          `Z-score (power = ${power * 100}%): ${zBeta.toFixed(3)}`,
          `Effect size (Cohen's d): ${effectSize}`,
          `Sample size per group: ${Math.ceil(n)}`,
          `Total sample size: ${Math.ceil(n * 2)}`
        ]

        setResult({
          sampleSize: Math.ceil(n),
          description: `Sample Size per Group: ${Math.ceil(n).toLocaleString()} (Total: ${Math.ceil(n * 2).toLocaleString()})`,
          details
        })
      }
    } catch (err) {
      setResult(null)
    }
  }, [calculationType, marginOfError, confidenceLevel, proportion, populationSize, useFinite, stdDev, marginOfErrorMean, effectSize, power, alphaCompare])

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
    setMarginOfError(0.05)
    setConfidenceLevel(0.95)
    setProportion(0.5)
    setPopulationSize(10000)
    setStdDev(15)
    setMarginOfErrorMean(3)
    setEffectSize(0.5)
    setPower(0.8)
    setResult(null)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Sample Size Calculator for Surveys</h2>
        <p className="text-sm text-muted-foreground">
          Calculate required sample sizes for surveys and experiments
        </p>
      </div>

      {/* Calculation Type */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Calculation Type</Label>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={calculationType === "proportion" ? "default" : "outline"}
            onClick={() => setCalculationType("proportion")}
          >
            Proportion
          </Button>
          <Button
            variant={calculationType === "mean" ? "default" : "outline"}
            onClick={() => setCalculationType("mean")}
          >
            Mean
          </Button>
          <Button
            variant={calculationType === "compare" ? "default" : "outline"}
            onClick={() => setCalculationType("compare")}
          >
            Compare Groups
          </Button>
        </div>
      </section>

      {/* Parameters */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="confidence">Confidence Level</Label>
          <select
            id="confidence"
            value={confidenceLevel}
            onChange={(e) => setConfidenceLevel(parseFloat(e.target.value))}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="0.90">90%</option>
            <option value="0.95">95%</option>
            <option value="0.99">99%</option>
          </select>
        </div>

        {calculationType === "proportion" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="moe">Margin of Error</Label>
              <Input
                id="moe"
                type="number"
                step="0.01"
                min="0.01"
                max="0.5"
                value={marginOfError}
                onChange={(e) => setMarginOfError(parseFloat(e.target.value) || 0.05)}
              />
              <p className="text-xs text-muted-foreground">±{(marginOfError * 100).toFixed(1)}%</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="proportion">Expected Proportion</Label>
              <Input
                id="proportion"
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={proportion}
                onChange={(e) => setProportion(Math.min(1, Math.max(0, parseFloat(e.target.value) || 0.5)))}
              />
              <p className="text-xs text-muted-foreground">Use 0.5 for maximum sample size</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="popsize">Population Size (optional)</Label>
              <Input
                id="popsize"
                type="number"
                min="100"
                value={populationSize}
                onChange={(e) => setPopulationSize(parseInt(e.target.value) || 10000)}
              />
              <Label className="flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={useFinite}
                  onChange={(e) => setUseFinite(e.target.checked)}
                  className="rounded border-border"
                />
                Apply finite population correction
              </Label>
            </div>
          </>
        )}

        {calculationType === "mean" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="stddev">Standard Deviation</Label>
              <Input
                id="stddev"
                type="number"
                min="0"
                value={stdDev}
                onChange={(e) => setStdDev(parseFloat(e.target.value) || 15)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="moemean">Margin of Error</Label>
              <Input
                id="moemean"
                type="number"
                min="0"
                value={marginOfErrorMean}
                onChange={(e) => setMarginOfErrorMean(parseFloat(e.target.value) || 3)}
              />
            </div>
          </>
        )}

        {calculationType === "compare" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="effect">Effect Size (Cohen's d)</Label>
              <Input
                id="effect"
                type="number"
                step="0.1"
                min="0"
                value={effectSize}
                onChange={(e) => setEffectSize(parseFloat(e.target.value) || 0.5)}
              />
              <p className="text-xs text-muted-foreground">Small: 0.2, Medium: 0.5, Large: 0.8</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="power">Statistical Power</Label>
              <Input
                id="power"
                type="number"
                step="0.05"
                min="0.5"
                max="0.99"
                value={power}
                onChange={(e) => setPower(parseFloat(e.target.value) || 0.8)}
              />
              <p className="text-xs text-muted-foreground">{(power * 100).toFixed(0)}% (recommended: 80%)</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="alpha">Significance Level (α)</Label>
              <Input
                id="alpha"
                type="number"
                step="0.01"
                min="0.001"
                max="0.1"
                value={alphaCompare}
                onChange={(e) => setAlphaCompare(parseFloat(e.target.value) || 0.05)}
              />
            </div>
          </>
        )}
      </section>

      <div className="flex gap-2">
        <Button onClick={calculate} className="flex-1">
          Calculate Sample Size
        </Button>
        <Button variant="outline" onClick={handleClear}>
          <Trash2 className="size-4" />
        </Button>
      </div>

      {/* Results */}
      {result && (
        <section className="space-y-4">
          <div className="rounded-lg border bg-primary/10 p-6 text-center">
            <p className="text-3xl font-bold text-primary">{result.description}</p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h4 className="text-sm font-medium mb-3">Calculation Details</h4>
            <ul className="space-y-2 text-sm">
              {result.details.map((detail, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-muted-foreground">•</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Sample Size Calculation</h4>
            <p className="text-sm text-muted-foreground">
              <strong>Proportion:</strong> Uses Cochran's formula for estimating population proportions
              (e.g., survey responses, approval ratings).
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Mean:</strong> Calculates sample size for estimating a population mean with
              specified precision.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Compare Groups:</strong> Determines sample size for detecting differences
              between two groups (two-sample t-test).
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
