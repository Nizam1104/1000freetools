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

// T-distribution critical values (simplified)
const tCritical = (df: number, alpha: number): number => {
  // Approximation using normal for large df
  if (df > 30) return normalQuantile(1 - alpha / 2)
  // Simplified lookup for small df
  const table: Record<number, Record<number, number>> = {
    1: { 0.05: 12.706, 0.01: 63.657 },
    2: { 0.05: 4.303, 0.01: 9.925 },
    3: { 0.05: 3.182, 0.01: 5.841 },
    4: { 0.05: 2.776, 0.01: 4.604 },
    5: { 0.05: 2.571, 0.01: 4.032 },
    10: { 0.05: 2.228, 0.01: 3.169 },
    20: { 0.05: 2.086, 0.01: 2.845 },
    30: { 0.05: 2.042, 0.01: 2.750 },
  }
  const closestDf = Object.keys(table).map(Number).reduce((prev, curr) =>
    Math.abs(curr - df) < Math.abs(prev - df) ? curr : prev
  )
  return table[closestDf]?.[alpha] || normalQuantile(1 - alpha / 2)
}

export default function ConfidenceIntervalCalculator() {
  const [calculationType, setCalculationType] = useState<"mean" | "proportion" | "difference">("mean")
  const [copied, setCopied] = useState<string | null>(null)

  // For mean
  const [sampleMean, setSampleMean] = useState<number>(100)
  const [sampleStdDev, setSampleStdDev] = useState<number>(15)
  const [sampleSize, setSampleSize] = useState<number>(30)
  
  // For proportion
  const [successes, setSuccesses] = useState<number>(150)
  const [totalTrials, setTotalTrials] = useState<number>(200)
  
  // For difference of means
  const [mean1, setMean1] = useState<number>(100)
  const [stdDev1, setStdDev1] = useState<number>(15)
  const [n1, setN1] = useState<number>(30)
  const [mean2, setMean2] = useState<number>(95)
  const [stdDev2, setStdDev2] = useState<number>(12)
  const [n2, setN2] = useState<number>(30)

  const [confidenceLevel, setConfidenceLevel] = useState<number>(0.95)
  const [result, setResult] = useState<{
    lower: number
    upper: number
    marginOfError: number
    pointEstimate: number
    description: string
  } | null>(null)

  const calculate = useCallback(() => {
    try {
      const alpha = 1 - confidenceLevel
      let lower: number, upper: number, marginOfError: number, pointEstimate: number, description: string

      if (calculationType === "mean") {
        const standardError = sampleStdDev / Math.sqrt(sampleSize)
        const df = sampleSize - 1
        const t = tCritical(df, alpha)
        marginOfError = t * standardError
        pointEstimate = sampleMean
        lower = sampleMean - marginOfError
        upper = sampleMean + marginOfError
        description = `${confidenceLevel * 100}% CI for Mean`
      } else if (calculationType === "proportion") {
        const p = successes / totalTrials
        const standardError = Math.sqrt(p * (1 - p) / totalTrials)
        const z = normalQuantile(1 - alpha / 2)
        marginOfError = z * standardError
        pointEstimate = p
        lower = p - marginOfError
        upper = p + marginOfError
        description = `${confidenceLevel * 100}% CI for Proportion`
      } else {
        // Difference of means
        const standardError = Math.sqrt(stdDev1 * stdDev1 / n1 + stdDev2 * stdDev2 / n2)
        const df = n1 + n2 - 2
        const t = tCritical(df, alpha)
        marginOfError = t * standardError
        pointEstimate = mean1 - mean2
        lower = pointEstimate - marginOfError
        upper = pointEstimate + marginOfError
        description = `${confidenceLevel * 100}% CI for Difference of Means`
      }

      setResult({ lower, upper, marginOfError, pointEstimate, description })
    } catch (err) {
      setResult(null)
    }
  }, [calculationType, sampleMean, sampleStdDev, sampleSize, successes, totalTrials, mean1, stdDev1, n1, mean2, stdDev2, n2, confidenceLevel])

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
    setSampleMean(100)
    setSampleStdDev(15)
    setSampleSize(30)
    setSuccesses(150)
    setTotalTrials(200)
    setMean1(100)
    setStdDev1(15)
    setN1(30)
    setMean2(95)
    setStdDev2(12)
    setN2(30)
    setResult(null)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Confidence Interval Calculator</h2>
        <p className="text-sm text-muted-foreground">
          Calculate confidence intervals for means, proportions, and differences
        </p>
      </div>

      {/* Calculation Type */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Calculation Type</Label>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={calculationType === "mean" ? "default" : "outline"}
            onClick={() => setCalculationType("mean")}
          >
            Mean
          </Button>
          <Button
            variant={calculationType === "proportion" ? "default" : "outline"}
            onClick={() => setCalculationType("proportion")}
          >
            Proportion
          </Button>
          <Button
            variant={calculationType === "difference" ? "default" : "outline"}
            onClick={() => setCalculationType("difference")}
          >
            Difference
          </Button>
        </div>
      </section>

      {/* Confidence Level */}
      <section className="space-y-2">
        <Label>Confidence Level</Label>
        <div className="flex gap-2">
          {[0.90, 0.95, 0.99].map(level => (
            <Button
              key={level}
              variant={confidenceLevel === level ? "default" : "outline"}
              size="sm"
              onClick={() => setConfidenceLevel(level)}
            >
              {level * 100}%
            </Button>
          ))}
        </div>
      </section>

      {/* Parameters */}
      <section className="grid gap-4 md:grid-cols-2">
        {calculationType === "mean" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="sampleMean">Sample Mean (x̄)</Label>
              <Input
                id="sampleMean"
                type="number"
                value={sampleMean}
                onChange={(e) => setSampleMean(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sampleStdDev">Sample Standard Deviation (s)</Label>
              <Input
                id="sampleStdDev"
                type="number"
                min="0"
                value={sampleStdDev}
                onChange={(e) => setSampleStdDev(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sampleSize">Sample Size (n)</Label>
              <Input
                id="sampleSize"
                type="number"
                min="2"
                value={sampleSize}
                onChange={(e) => setSampleSize(parseInt(e.target.value) || 30)}
              />
            </div>
          </>
        )}

        {calculationType === "proportion" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="successes">Number of Successes</Label>
              <Input
                id="successes"
                type="number"
                min="0"
                value={successes}
                onChange={(e) => setSuccesses(parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalTrials">Total Sample Size (n)</Label>
              <Input
                id="totalTrials"
                type="number"
                min="1"
                value={totalTrials}
                onChange={(e) => setTotalTrials(parseInt(e.target.value) || 100)}
              />
            </div>
          </>
        )}

        {calculationType === "difference" && (
          <>
            <div className="space-y-2">
              <Label>Group 1 Mean</Label>
              <Input
                type="number"
                value={mean1}
                onChange={(e) => setMean1(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label>Group 1 Std Dev</Label>
              <Input
                type="number"
                min="0"
                value={stdDev1}
                onChange={(e) => setStdDev1(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label>Group 1 N</Label>
              <Input
                type="number"
                min="2"
                value={n1}
                onChange={(e) => setN1(parseInt(e.target.value) || 30)}
              />
            </div>
            <div className="space-y-2">
              <Label>Group 2 Mean</Label>
              <Input
                type="number"
                value={mean2}
                onChange={(e) => setMean2(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label>Group 2 Std Dev</Label>
              <Input
                type="number"
                min="0"
                value={stdDev2}
                onChange={(e) => setStdDev2(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label>Group 2 N</Label>
              <Input
                type="number"
                min="2"
                value={n2}
                onChange={(e) => setN2(parseInt(e.target.value) || 30)}
              />
            </div>
          </>
        )}
      </section>

      <div className="flex gap-2">
        <Button onClick={calculate} className="flex-1">
          Calculate Confidence Interval
        </Button>
        <Button variant="outline" onClick={handleClear}>
          <Trash2 className="size-4" />
        </Button>
      </div>

      {/* Results */}
      {result && (
        <section className="space-y-4">
          <div className="rounded-lg border bg-primary/10 p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">{result.description}</p>
            <p className="text-2xl font-bold font-mono">
              [{result.lower.toFixed(4)}, {result.upper.toFixed(4)}]
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Point Estimate: {result.pointEstimate.toFixed(4)} ± {result.marginOfError.toFixed(4)}
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h4 className="text-sm font-medium mb-3">Interpretation</h4>
            <p className="text-sm text-muted-foreground">
              We are {confidenceLevel * 100}% confident that the true population parameter
              lies between <span className="font-medium text-foreground">{result.lower.toFixed(4)}</span> and{' '}
              <span className="font-medium text-foreground">{result.upper.toFixed(4)}</span>.
            </p>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Confidence Intervals</h4>
            <p className="text-sm text-muted-foreground">
              A confidence interval provides a range of plausible values for a population
              parameter. A 95% confidence level means that if we repeated the sampling
              process many times, 95% of the resulting intervals would contain the true parameter.
            </p>
            <p className="text-sm text-muted-foreground">
              For means with small samples (n &lt; 30), the t-distribution is used. For
              proportions and large samples, the normal (z) distribution is appropriate.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
