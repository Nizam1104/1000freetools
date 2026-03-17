"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface TTestResult {
  mean1: number
  mean2: number
  stdDev1: number
  stdDev2: number
  n1: number
  n2: number
  tStatistic: number
  df: number
  pValue: number
  meanDifference: number
  standardError: number
  confidenceInterval: { lower: number; upper: number }
  isSignificant: boolean
  testType: "paired" | "independent" | "one-sample"
}

export default function TTestCalculator() {
  const [testType, setTestType] = useState<"paired" | "independent" | "one-sample">("independent")
  
  // For independent/paired t-test
  const [group1Data, setGroup1Data] = useState<string>("23, 25, 28, 30, 32, 35, 38, 40, 42, 45")
  const [group2Data, setGroup2Data] = useState<string>("35, 38, 40, 42, 45, 48, 50, 52, 55, 58")
  
  // For one-sample t-test
  const [sampleData, setSampleData] = useState<string>("23, 25, 28, 30, 32, 35, 38, 40, 42, 45")
  const [hypothesizedMean, setHypothesizedMean] = useState<number>(30)
  
  const [confidenceLevel, setConfidenceLevel] = useState<number>(0.95)
  const [equalVariance, setEqualVariance] = useState<boolean>(true)
  const [result, setResult] = useState<TTestResult | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calculateStats = (data: number[]) => {
    const n = data.length
    const mean = data.reduce((a, b) => a + b, 0) / n
    const variance = data.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / (n - 1)
    const stdDev = Math.sqrt(variance)
    return { n, mean, stdDev, variance }
  }

  const calculate = useCallback(() => {
    try {
      let tStat: number, df: number, pValue: number
      let mean1: number, mean2: number, stdDev1: number, stdDev2: number, n1: number, n2: number
      let meanDiff: number, se: number

      if (testType === "one-sample") {
        const values = sampleData.split(/[\s,\n]+/).map(s => parseFloat(s.trim())).filter(n => !isNaN(n))
        if (values.length < 2) throw new Error("Please enter at least 2 values")
        
        const stats = calculateStats(values)
        mean1 = stats.mean
        stdDev1 = stats.stdDev
        n1 = stats.n
        mean2 = hypothesizedMean
        stdDev2 = 0
        n2 = 0
        
        se = stdDev1 / Math.sqrt(n1)
        tStat = (mean1 - hypothesizedMean) / se
        df = n1 - 1
        meanDiff = mean1 - hypothesizedMean
      } else {
        const values1 = group1Data.split(/[\s,\n]+/).map(s => parseFloat(s.trim())).filter(n => !isNaN(n))
        const values2 = group2Data.split(/[\s,\n]+/).map(s => parseFloat(s.trim())).filter(n => !isNaN(n))
        
        if (values1.length < 2 || values2.length < 2) {
          throw new Error("Please enter at least 2 values for each group")
        }

        if (testType === "paired" && values1.length !== values2.length) {
          throw new Error("For paired t-test, both groups must have the same number of values")
        }

        const stats1 = calculateStats(values1)
        const stats2 = calculateStats(values2)
        
        mean1 = stats1.mean
        mean2 = stats2.mean
        stdDev1 = stats1.stdDev
        stdDev2 = stats2.stdDev
        n1 = stats1.n
        n2 = stats2.n
        meanDiff = mean1 - mean2

        if (testType === "paired") {
          // Paired t-test
          const differences = values1.map((v, i) => v - values2[i])
          const diffStats = calculateStats(differences)
          se = diffStats.stdDev / Math.sqrt(n1)
          tStat = diffStats.mean / se
          df = n1 - 1
        } else if (equalVariance) {
          // Independent t-test with equal variance (pooled)
          const pooledVariance = ((n1 - 1) * stats1.variance + (n2 - 1) * stats2.variance) / (n1 + n2 - 2)
          se = Math.sqrt(pooledVariance * (1/n1 + 1/n2))
          tStat = (mean1 - mean2) / se
          df = n1 + n2 - 2
        } else {
          // Welch's t-test (unequal variance)
          se = Math.sqrt(stats1.variance/n1 + stats2.variance/n2)
          tStat = (mean1 - mean2) / se
          // Welch-Satterthwaite degrees of freedom
          const num = Math.pow(stats1.variance/n1 + stats2.variance/n2, 2)
          const denom = Math.pow(stats1.variance/n1, 2)/(n1-1) + Math.pow(stats2.variance/n2, 2)/(n2-1)
          df = num / denom
        }
      }

      // P-value approximation (two-tailed)
      pValue = tDistributionPValue(Math.abs(tStat), df) * 2

      // Confidence interval
      const tCrit = tCritical(df, 1 - confidenceLevel)
      const ciLower = meanDiff - tCrit * se
      const ciUpper = meanDiff + tCrit * se

      setResult({
        mean1, mean2, stdDev1, stdDev2, n1, n2,
        tStatistic: tStat,
        df,
        pValue,
        meanDifference: meanDiff,
        standardError: se,
        confidenceInterval: { lower: ciLower, upper: ciUpper },
        isSignificant: pValue < (1 - confidenceLevel),
        testType
      })
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation failed")
      setResult(null)
    }
  }, [testType, group1Data, group2Data, sampleData, hypothesizedMean, confidenceLevel, equalVariance])

  // T-distribution p-value approximation
  const tDistributionPValue = (t: number, df: number): number => {
    if (df > 30) {
      // Normal approximation
      const z = t
      const p = 1 / (1 + Math.exp(-1.7 * z))
      return 1 - p
    }
    // Simplified approximation
    const x = df / (df + t * t)
    return 0.5 * Math.pow(x, df / 2)
  }

  // T critical value
  const tCritical = (df: number, alpha: number): number => {
    if (df > 30) return normalQuantile(1 - alpha / 2)
    const table: Record<number, Record<number, number>> = {
      1: { 0.05: 12.706, 0.10: 6.314 },
      5: { 0.05: 2.571, 0.10: 2.015 },
      10: { 0.05: 2.228, 0.10: 1.812 },
      20: { 0.05: 2.086, 0.10: 1.725 },
      30: { 0.05: 2.042, 0.10: 1.697 },
    }
    const closestDf = Object.keys(table).map(Number).reduce((prev, curr) =>
      Math.abs(curr - df) < Math.abs(prev - df) ? curr : prev
    )
    return table[closestDf]?.[alpha] || 2.0
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
    setGroup1Data("23, 25, 28, 30, 32, 35, 38, 40, 42, 45")
    setGroup2Data("35, 38, 40, 42, 45, 48, 50, 52, 55, 58")
    setSampleData("23, 25, 28, 30, 32, 35, 38, 40, 42, 45")
    setHypothesizedMean(30)
    setResult(null)
    setError(null)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">T-Test Calculator</h2>
        <p className="text-sm text-muted-foreground">
          Perform one-sample, independent, or paired t-tests
        </p>
      </div>

      {/* Test Type */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Test Type</Label>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={testType === "independent" ? "default" : "outline"}
            onClick={() => setTestType("independent")}
          >
            Independent
          </Button>
          <Button
            variant={testType === "paired" ? "default" : "outline"}
            onClick={() => setTestType("paired")}
          >
            Paired
          </Button>
          <Button
            variant={testType === "one-sample" ? "default" : "outline"}
            onClick={() => setTestType("one-sample")}
          >
            One-Sample
          </Button>
        </div>
      </section>

      {/* Options */}
      {testType === "independent" && (
        <section className="space-y-2">
          <Label>Variance Assumption</Label>
          <div className="flex gap-2">
            <Button
              variant={equalVariance ? "default" : "outline"}
              size="sm"
              onClick={() => setEqualVariance(true)}
            >
              Equal (Pooled)
            </Button>
            <Button
              variant={!equalVariance ? "default" : "outline"}
              size="sm"
              onClick={() => setEqualVariance(false)}
            >
              Unequal (Welch's)
            </Button>
          </div>
        </section>
      )}

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

      {/* Data Input */}
      <section className="space-y-4">
        {testType === "one-sample" ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="sampleData">Sample Data</Label>
              <Textarea
                id="sampleData"
                value={sampleData}
                onChange={(e) => setSampleData(e.target.value)}
                className="font-mono text-sm min-h-[100px]"
                placeholder="Enter values separated by commas..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hypMean">Hypothesized Mean (μ₀)</Label>
              <Input
                id="hypMean"
                type="number"
                value={hypothesizedMean}
                onChange={(e) => setHypothesizedMean(parseFloat(e.target.value) || 0)}
              />
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="group1Data">{testType === "paired" ? "Before/Group 1" : "Group 1"} Data</Label>
              <Textarea
                id="group1Data"
                value={group1Data}
                onChange={(e) => setGroup1Data(e.target.value)}
                className="font-mono text-sm min-h-[100px]"
                placeholder="Enter values separated by commas..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="group2Data">{testType === "paired" ? "After/Group 2" : "Group 2"} Data</Label>
              <Textarea
                id="group2Data"
                value={group2Data}
                onChange={(e) => setGroup2Data(e.target.value)}
                className="font-mono text-sm min-h-[100px]"
                placeholder="Enter values separated by commas..."
              />
            </div>
          </>
        )}
      </section>

      <div className="flex gap-2">
        <Button onClick={calculate} className="flex-1">
          Calculate T-Test
        </Button>
        <Button variant="outline" onClick={handleClear}>
          <Trash2 className="size-4" />
        </Button>
      </div>

      {/* Results */}
      {result && (
        <section className="space-y-4">
          {/* Group Statistics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">{testType === "one-sample" ? "Sample" : "Group 1"} Mean</p>
              <p className="text-2xl font-bold font-mono">{result.mean1.toFixed(3)}</p>
              <p className="text-xs text-muted-foreground">N = {result.n1}, SD = {result.stdDev1.toFixed(3)}</p>
            </div>
            {testType !== "one-sample" && (
              <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
                <p className="text-xs text-muted-foreground">Group 2 Mean</p>
                <p className="text-2xl font-bold font-mono">{result.mean2.toFixed(3)}</p>
                <p className="text-xs text-muted-foreground">N = {result.n2}, SD = {result.stdDev2.toFixed(3)}</p>
              </div>
            )}
          </div>

          {/* Test Results */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">t-statistic</p>
              <p className="text-2xl font-bold font-mono">{result.tStatistic.toFixed(3)}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">df</p>
              <p className="text-2xl font-bold font-mono">{result.df.toFixed(1)}</p>
            </div>
            <div className={cn("rounded-lg border p-4 space-y-1", result.isSignificant ? "bg-green-50" : "bg-muted/30")}>
              <p className="text-xs text-muted-foreground">p-value</p>
              <p className={cn("text-2xl font-bold font-mono", result.isSignificant ? "text-green-600" : "")}>
                {result.pValue.toFixed(4)}
              </p>
            </div>
          </div>

          {/* Confidence Interval */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <h4 className="text-sm font-medium mb-2">
              {confidenceLevel * 100}% CI for Mean {testType === "one-sample" ? "" : "Difference"}
            </h4>
            <p className="text-xl font-mono">
              [{result.confidenceInterval.lower.toFixed(3)}, {result.confidenceInterval.upper.toFixed(3)}]
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Mean Difference: {result.meanDifference.toFixed(3)} (SE = {result.standardError.toFixed(3)})
            </p>
          </div>

          {/* Conclusion */}
          <div className={cn(
            "rounded-lg border p-4 text-center",
            result.isSignificant ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
          )}>
            <p className="font-medium">
              {result.isSignificant 
                ? "Statistically Significant (reject H₀)" 
                : "Not Statistically Significant (fail to reject H₀)"}
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
            <h4 className="text-sm font-medium">About T-Tests</h4>
            <p className="text-sm text-muted-foreground">
              <strong>One-sample:</strong> Compares a sample mean to a known value.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Independent:</strong> Compares means from two independent groups.
              Use Welch's t-test when variances are unequal.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Paired:</strong> Compares means from the same subjects at two time points
              or under two conditions.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
