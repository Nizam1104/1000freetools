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

export default function StatisticalPowerCalculator() {
  const [effectSize, setEffectSize] = useState<number>(0.5)
  const [sampleSize, setSampleSize] = useState<number>(64)
  const [alpha, setAlpha] = useState<number>(0.05)
  const [tails, setTails] = useState<1 | 2>(2)
  const [testType, setTestType] = useState<"t-test" | "z-test" | "anova" | "correlation">("t-test")
  const [groups, setGroups] = useState<number>(2)

  const [result, setResult] = useState<{
    power: number
    beta: number
    criticalValue: number
    nonCentrality: number
  } | null>(null)

  const calculatePower = useCallback(() => {
    try {
      let ncp: number // Non-centrality parameter
      let df: number // Degrees of freedom

      if (testType === "t-test") {
        ncp = effectSize * Math.sqrt(sampleSize / 2)
        df = sampleSize - 2
      } else if (testType === "z-test") {
        ncp = effectSize * Math.sqrt(sampleSize)
        df = sampleSize - 1
      } else if (testType === "anova") {
        ncp = effectSize * effectSize * sampleSize
        df = (groups - 1) * (sampleSize - 1)
      } else { // correlation
        ncp = effectSize * Math.sqrt(sampleSize - 3)
        df = sampleSize - 2
      }

      // Critical value
      const critZ = tails === 2 ? normalQuantile(1 - alpha/2) : normalQuantile(1 - alpha)

      // Power approximation using normal distribution
      const power = 1 - normalCDF(critZ - ncp) + normalCDF(-critZ - ncp)
      const beta = 1 - power

      setResult({
        power: Math.max(0, Math.min(1, power)),
        beta: Math.max(0, Math.min(1, beta)),
        criticalValue: critZ,
        nonCentrality: ncp
      })
    } catch (err) {
      setResult(null)
    }
  }, [effectSize, sampleSize, alpha, tails, testType, groups])

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
    setEffectSize(0.5)
    setSampleSize(64)
    setAlpha(0.05)
    setTails(2)
    setResult(null)
  }, [])

  const getPowerInterpretation = (power: number): string => {
    if (power >= 0.95) return "Excellent power"
    if (power >= 0.90) return "Very good power"
    if (power >= 0.80) return "Adequate power (recommended minimum)"
    if (power >= 0.70) return "Low power"
    return "Very low power - increase sample size"
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Statistical Power Calculator</h2>
        <p className="text-sm text-muted-foreground">
          Calculate statistical power for hypothesis tests
        </p>
      </div>

      {/* Test Type */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Test Type</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {(["t-test", "z-test", "anova", "correlation"] as const).map(type => (
            <Button
              key={type}
              variant={testType === type ? "default" : "outline"}
              onClick={() => setTestType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>
      </section>

      {/* Parameters */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="effect">Effect Size</Label>
          <Input
            id="effect"
            type="number"
            step="0.1"
            min="0"
            value={effectSize}
            onChange={(e) => setEffectSize(parseFloat(e.target.value) || 0)}
          />
          <p className="text-xs text-muted-foreground">
            Small: 0.2, Medium: 0.5, Large: 0.8
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="n">Sample Size {testType === "anova" ? "(per group)" : ""}</Label>
          <Input
            id="n"
            type="number"
            min="2"
            value={sampleSize}
            onChange={(e) => setSampleSize(parseInt(e.target.value) || 10)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="alpha">Significance Level (α)</Label>
          <Input
            id="alpha"
            type="number"
            step="0.01"
            min="0.001"
            max="0.1"
            value={alpha}
            onChange={(e) => setAlpha(parseFloat(e.target.value) || 0.05)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tails">Tails</Label>
          <div className="flex gap-2">
            <Button
              variant={tails === 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setTails(1)}
              className="flex-1"
            >
              One-tailed
            </Button>
            <Button
              variant={tails === 2 ? "default" : "outline"}
              size="sm"
              onClick={() => setTails(2)}
              className="flex-1"
            >
              Two-tailed
            </Button>
          </div>
        </div>

        {testType === "anova" && (
          <div className="space-y-2">
            <Label htmlFor="groups">Number of Groups</Label>
            <Input
              id="groups"
              type="number"
              min="2"
              value={groups}
              onChange={(e) => setGroups(parseInt(e.target.value) || 2)}
            />
          </div>
        )}
      </section>

      <div className="flex gap-2">
        <Button onClick={calculatePower} className="flex-1">
          Calculate Power
        </Button>
        <Button variant="outline" onClick={handleClear}>
          <Trash2 className="size-4" />
        </Button>
      </div>

      {/* Results */}
      {result && (
        <section className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={cn(
              "rounded-lg border p-4 space-y-1",
              result.power >= 0.8 ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"
            )}>
              <p className="text-xs text-muted-foreground">Statistical Power (1-β)</p>
              <p className={cn("text-2xl font-bold font-mono", result.power >= 0.8 ? "text-green-600" : "text-amber-600")}>
                {(result.power * 100).toFixed(1)}%
              </p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Type II Error (β)</p>
              <p className="text-2xl font-bold font-mono">{(result.beta * 100).toFixed(1)}%</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Critical Value</p>
              <p className="text-2xl font-bold font-mono">{result.criticalValue.toFixed(3)}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Non-centrality</p>
              <p className="text-2xl font-bold font-mono">{result.nonCentrality.toFixed(3)}</p>
            </div>
          </div>

          <div className={cn(
            "p-4 rounded-lg text-center",
            result.power >= 0.8 ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
          )}>
            <p className="font-medium">{getPowerInterpretation(result.power)}</p>
            <p className="text-sm">
              {result.power >= 0.8
                ? "Your study has adequate power to detect the effect."
                : "Consider increasing sample size to achieve 80% power."}
            </p>
          </div>

          {/* Sample size recommendation */}
          {result.power < 0.8 && (
            <div className="rounded-lg border bg-muted/30 p-4">
              <h4 className="text-sm font-medium mb-2">Recommended Sample Size</h4>
              <p className="text-sm text-muted-foreground">
                To achieve 80% power with effect size {effectSize}, you would need approximately{' '}
                <span className="font-medium text-foreground">
                  {Math.ceil(sampleSize * (0.8 / result.power))} {testType === "anova" ? `per group (${Math.ceil(sampleSize * (0.8 / result.power)) * groups} total)` : "participants"}
                </span>
              </p>
            </div>
          )}
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Statistical Power</h4>
            <p className="text-sm text-muted-foreground">
              Statistical power is the probability of correctly rejecting the null hypothesis
              when it is false (detecting a true effect). It equals 1 - β, where β is the
              Type II error rate.
            </p>
            <p className="text-sm text-muted-foreground">
              A power of 80% or higher is typically recommended. Power depends on effect size,
              sample size, significance level (α), and whether the test is one or two-tailed.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
