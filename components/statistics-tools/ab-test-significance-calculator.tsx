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

export default function AbTestSignificanceCalculator() {
  const [variantAVisitors, setVariantAVisitors] = useState<number>(1000)
  const [variantAConversions, setVariantAConversions] = useState<number>(100)
  const [variantBVisitors, setVariantBVisitors] = useState<number>(1000)
  const [variantBConversions, setVariantBConversions] = useState<number>(120)
  const [confidenceLevel, setConfidenceLevel] = useState<number>(0.95)

  const [result, setResult] = useState<{
    conversionRateA: number
    conversionRateB: number
    relativeImprovement: number
    zScore: number
    pValue: number
    isSignificant: boolean
    confidenceInterval: { lower: number; upper: number }
    standardError: number
    pooledRate: number
  } | null>(null)

  const calculate = useCallback(() => {
    try {
      const p1 = variantAConversions / variantAVisitors
      const p2 = variantBConversions / variantBVisitors
      
      // Pooled proportion
      const pooledP = (variantAConversions + variantBConversions) / (variantAVisitors + variantBVisitors)
      
      // Standard error
      const se = Math.sqrt(pooledP * (1 - pooledP) * (1/variantAVisitors + 1/variantBVisitors))
      
      // Z-score
      const z = (p2 - p1) / se
      
      // P-value (two-tailed)
      const pValue = 2 * (1 - normalCDF(Math.abs(z)))
      
      // Relative improvement
      const relativeImprovement = (p2 - p1) / p1
      
      // Confidence interval for difference
      const zCrit = normalQuantile(1 - (1 - confidenceLevel) / 2)
      const diff = p2 - p1
      const ciLower = diff - zCrit * se
      const ciUpper = diff + zCrit * se

      setResult({
        conversionRateA: p1,
        conversionRateB: p2,
        relativeImprovement,
        zScore: z,
        pValue,
        isSignificant: pValue < (1 - confidenceLevel),
        confidenceInterval: { lower: ciLower, upper: ciUpper },
        standardError: se,
        pooledRate: pooledP
      })
    } catch (err) {
      setResult(null)
    }
  }, [variantAVisitors, variantAConversions, variantBVisitors, variantBConversions, confidenceLevel])

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
    setVariantAVisitors(1000)
    setVariantAConversions(100)
    setVariantBVisitors(1000)
    setVariantBConversions(120)
    setResult(null)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">A/B Test Significance Calculator</h2>
        <p className="text-sm text-muted-foreground">
          Determine if the difference between two variants is statistically significant
        </p>
      </div>

      {/* Input Section */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* Variant A */}
        <div className="rounded-lg border p-4 space-y-4">
          <h3 className="font-medium text-lg">Variant A (Control)</h3>
          <div className="space-y-2">
            <Label htmlFor="aVisitors">Total Visitors</Label>
            <Input
              id="aVisitors"
              type="number"
              min="1"
              value={variantAVisitors}
              onChange={(e) => setVariantAVisitors(parseInt(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="aConversions">Conversions</Label>
            <Input
              id="aConversions"
              type="number"
              min="0"
              max={variantAVisitors}
              value={variantAConversions}
              onChange={(e) => setVariantAConversions(parseInt(e.target.value) || 0)}
            />
          </div>
          {result && (
            <div className="pt-2 border-t">
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              <p className="text-2xl font-bold">{(result.conversionRateA * 100).toFixed(2)}%</p>
            </div>
          )}
        </div>

        {/* Variant B */}
        <div className="rounded-lg border p-4 space-y-4">
          <h3 className="font-medium text-lg">Variant B (Treatment)</h3>
          <div className="space-y-2">
            <Label htmlFor="bVisitors">Total Visitors</Label>
            <Input
              id="bVisitors"
              type="number"
              min="1"
              value={variantBVisitors}
              onChange={(e) => setVariantBVisitors(parseInt(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bConversions">Conversions</Label>
            <Input
              id="bConversions"
              type="number"
              min="0"
              max={variantBVisitors}
              value={variantBConversions}
              onChange={(e) => setVariantBConversions(parseInt(e.target.value) || 0)}
            />
          </div>
          {result && (
            <div className="pt-2 border-t">
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              <p className="text-2xl font-bold">{(result.conversionRateB * 100).toFixed(2)}%</p>
            </div>
          )}
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

      <div className="flex gap-2">
        <Button onClick={calculate} className="flex-1">
          Calculate Significance
        </Button>
        <Button variant="outline" onClick={handleClear}>
          <Trash2 className="size-4" />
        </Button>
      </div>

      {/* Results */}
      {result && (
        <section className="space-y-4">
          {/* Main Result */}
          <div className={cn(
            "rounded-lg border p-6 text-center",
            result.isSignificant ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"
          )}>
            <p className="text-sm text-muted-foreground mb-2">
              {result.isSignificant ? "Statistically Significant" : "Not Statistically Significant"}
            </p>
            <p className="text-4xl font-bold">
              {result.relativeImprovement >= 0 ? "+" : ""}{(result.relativeImprovement * 100).toFixed(2)}%
            </p>
            <p className="text-sm text-muted-foreground mt-1">Relative Improvement</p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Z-Score</p>
              <p className="text-xl font-bold font-mono">{result.zScore.toFixed(3)}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">P-Value</p>
              <p className={cn("text-xl font-bold font-mono", result.pValue < 0.05 ? "text-green-600" : "")}>
                {result.pValue.toFixed(4)}
              </p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Std Error</p>
              <p className="text-xl font-bold font-mono">{result.standardError.toFixed(4)}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Pooled Rate</p>
              <p className="text-xl font-bold font-mono">{(result.pooledRate * 100).toFixed(2)}%</p>
            </div>
          </div>

          {/* Confidence Interval */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <h4 className="text-sm font-medium mb-2">
              {confidenceLevel * 100}% Confidence Interval for Difference
            </h4>
            <p className="text-xl font-mono">
              [{(result.confidenceInterval.lower * 100).toFixed(2)}%, {(result.confidenceInterval.upper * 100).toFixed(2)}%]
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {result.confidenceInterval.lower > 0 
                ? "We can be confident that Variant B performs better than Variant A."
                : result.confidenceInterval.upper < 0
                ? "We can be confident that Variant B performs worse than Variant A."
                : "The interval includes 0, so we cannot conclude there's a difference."}
            </p>
          </div>

          {/* Recommendation */}
          <div className={cn(
            "rounded-lg border p-4",
            result.isSignificant && result.relativeImprovement > 0 
              ? "bg-green-50 border-green-200" 
              : result.isSignificant && result.relativeImprovement < 0
              ? "bg-red-50 border-red-200"
              : "bg-gray-50 border-gray-200"
          )}>
            <h4 className="font-medium mb-2">Recommendation</h4>
            <p className="text-sm">
              {result.isSignificant && result.relativeImprovement > 0
                ? "✓ Variant B shows a statistically significant improvement. Consider implementing it."
                : result.isSignificant && result.relativeImprovement < 0
                ? "✗ Variant B performs significantly worse. Stick with Variant A."
                : "⚠ No statistically significant difference detected. Consider running the test longer or with more traffic."}
            </p>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About A/B Testing</h4>
            <p className="text-sm text-muted-foreground">
              A/B testing compares two variants to determine which performs better. This calculator
              uses a two-proportion z-test to determine if the difference in conversion rates is
              statistically significant.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Important:</strong> Wait until you have sufficient sample size before
              concluding. Peeking at results early can lead to false positives.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
