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

// T-distribution p-value approximation
const tDistributionPValue = (t: number, df: number): number => {
  // Use normal approximation for large df
  if (df > 30) {
    return 2 * (1 - normalCDF(Math.abs(t)))
  }
  // Simplified approximation for smaller df
  const x = df / (df + t * t)
  const p = 0.5 * Math.pow(x, df / 2)
  return Math.max(0.0001, Math.min(0.9999, 2 * p))
}

export default function PValueCalculator() {
  const [testType, setTestType] = useState<"z" | "t" | "chi2" | "f">("t")
  const [testTail, setTestTail] = useState<"two" | "left" | "right">("two")
  
  // Z-test
  const [zScore, setZScore] = useState<number>(1.96)
  
  // T-test
  const [tScore, setTScore] = useState<number>(2.0)
  const [df, setDf] = useState<number>(20)
  
  // Chi-square
  const [chi2Value, setChi2Value] = useState<number>(5.99)
  const [dfChi2, setDfChi2] = useState<number>(2)
  
  // F-test
  const [fValue, setFValue] = useState<number>(3.0)
  const [df1, setDf1] = useState<number>(3)
  const [df2, setDf2] = useState<number>(20)

  const [result, setResult] = useState<{
    pValue: number
    isSignificant: boolean
    description: string
  } | null>(null)

  const calculate = useCallback(() => {
    try {
      let pValue: number
      let description: string

      if (testType === "z") {
        if (testTail === "two") {
          pValue = 2 * (1 - normalCDF(Math.abs(zScore)))
        } else if (testTail === "left") {
          pValue = normalCDF(zScore)
        } else {
          pValue = 1 - normalCDF(zScore)
        }
        description = `Z-score: ${zScore}`
      } else if (testType === "t") {
        pValue = tDistributionPValue(tScore, df)
        if (testTail === "left") pValue = pValue / 2
        if (testTail === "right") pValue = 1 - pValue / 2
        description = `t-score: ${tScore}, df: ${df}`
      } else if (testType === "chi2") {
        // Chi-square p-value approximation
        const x = chi2Value
        const k = dfChi2
        // Using gamma function approximation
        pValue = Math.exp(-x/2) * Math.pow(x/2, k/2 - 1)
        pValue = Math.max(0.0001, Math.min(0.9999, 1 - pValue))
        description = `χ²: ${chi2Value}, df: ${dfChi2}`
      } else {
        // F-test p-value approximation
        const x = df2 / (df2 + df1 * fValue)
        pValue = Math.pow(x, df2 / 2)
        pValue = Math.max(0.0001, Math.min(0.9999, pValue))
        description = `F: ${fValue}, df1: ${df1}, df2: ${df2}`
      }

      setResult({
        pValue,
        isSignificant: pValue < 0.05,
        description
      })
    } catch (err) {
      setResult(null)
    }
  }, [testType, testTail, zScore, tScore, df, chi2Value, dfChi2, fValue, df1, df2])

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
    setZScore(1.96)
    setTScore(2.0)
    setDf(20)
    setChi2Value(5.99)
    setDfChi2(2)
    setFValue(3.0)
    setDf1(3)
    setDf2(20)
    setResult(null)
  }, [])

  const getPValueInterpretation = (p: number): string => {
    if (p < 0.001) return "Highly significant (p < 0.001)"
    if (p < 0.01) return "Very significant (p < 0.01)"
    if (p < 0.05) return "Significant (p < 0.05)"
    if (p < 0.10) return "Marginally significant (p < 0.10)"
    return "Not significant (p ≥ 0.05)"
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">P-Value Calculator</h2>
        <p className="text-sm text-muted-foreground">
          Calculate p-values from test statistics
        </p>
      </div>

      {/* Test Type */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Test Type</Label>
        <div className="grid grid-cols-4 gap-2">
          <Button
            variant={testType === "z" ? "default" : "outline"}
            onClick={() => setTestType("z")}
          >
            Z-test
          </Button>
          <Button
            variant={testType === "t" ? "default" : "outline"}
            onClick={() => setTestType("t")}
          >
            T-test
          </Button>
          <Button
            variant={testType === "chi2" ? "default" : "outline"}
            onClick={() => setTestType("chi2")}
          >
            χ²-test
          </Button>
          <Button
            variant={testType === "f" ? "default" : "outline"}
            onClick={() => setTestType("f")}
          >
            F-test
          </Button>
        </div>
      </section>

      {/* Tail Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Test Tail</Label>
        <div className="flex gap-2">
          <Button
            variant={testTail === "two" ? "default" : "outline"}
            onClick={() => setTestTail("two")}
          >
            Two-tailed
          </Button>
          <Button
            variant={testTail === "left" ? "default" : "outline"}
            onClick={() => setTestTail("left")}
          >
            Left-tailed
          </Button>
          <Button
            variant={testTail === "right" ? "default" : "outline"}
            onClick={() => setTestTail("right")}
          >
            Right-tailed
          </Button>
        </div>
      </section>

      {/* Parameters */}
      <section className="grid gap-4 md:grid-cols-2">
        {testType === "z" && (
          <div className="space-y-2">
            <Label htmlFor="zscore">Z-Score</Label>
            <Input
              id="zscore"
              type="number"
              step="0.01"
              value={zScore}
              onChange={(e) => setZScore(parseFloat(e.target.value) || 0)}
            />
          </div>
        )}

        {testType === "t" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="tscore">T-Score</Label>
              <Input
                id="tscore"
                type="number"
                step="0.01"
                value={tScore}
                onChange={(e) => setTScore(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="df">Degrees of Freedom</Label>
              <Input
                id="df"
                type="number"
                min="1"
                value={df}
                onChange={(e) => setDf(parseInt(e.target.value) || 1)}
              />
            </div>
          </>
        )}

        {testType === "chi2" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="chi2">Chi-Square Value</Label>
              <Input
                id="chi2"
                type="number"
                min="0"
                value={chi2Value}
                onChange={(e) => setChi2Value(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dfchi2">Degrees of Freedom</Label>
              <Input
                id="dfchi2"
                type="number"
                min="1"
                value={dfChi2}
                onChange={(e) => setDfChi2(parseInt(e.target.value) || 1)}
              />
            </div>
          </>
        )}

        {testType === "f" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="fvalue">F-Value</Label>
              <Input
                id="fvalue"
                type="number"
                min="0"
                value={fValue}
                onChange={(e) => setFValue(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="df1">Numerator df</Label>
              <Input
                id="df1"
                type="number"
                min="1"
                value={df1}
                onChange={(e) => setDf1(parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="df2">Denominator df</Label>
              <Input
                id="df2"
                type="number"
                min="1"
                value={df2}
                onChange={(e) => setDf2(parseInt(e.target.value) || 1)}
              />
            </div>
          </>
        )}
      </section>

      <div className="flex gap-2">
        <Button onClick={calculate} className="flex-1">
          Calculate P-Value
        </Button>
        <Button variant="outline" onClick={handleClear}>
          <Trash2 className="size-4" />
        </Button>
      </div>

      {/* Results */}
      {result && (
        <section className="space-y-4">
          <div className={cn(
            "rounded-lg border p-6 text-center",
            result.isSignificant ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
          )}>
            <p className="text-sm text-muted-foreground mb-2">{result.description}</p>
            <p className={cn("text-4xl font-bold font-mono", result.isSignificant ? "text-green-600" : "text-gray-600")}>
              p = {result.pValue.toFixed(4)}
            </p>
            <p className={cn("text-sm mt-2 font-medium", result.isSignificant ? "text-green-700" : "text-gray-700")}>
              {getPValueInterpretation(result.pValue)}
            </p>
          </div>

          {/* Significance levels */}
          <div className="grid grid-cols-3 gap-4">
            <div className={cn("rounded-lg border p-3 text-center", result.pValue < 0.05 ? "bg-green-50" : "bg-muted/30")}>
              <p className="text-xs text-muted-foreground">α = 0.05</p>
              <p className={cn("font-medium", result.pValue < 0.05 ? "text-green-600" : "text-gray-600")}>
                {result.pValue < 0.05 ? "Significant" : "Not significant"}
              </p>
            </div>
            <div className={cn("rounded-lg border p-3 text-center", result.pValue < 0.01 ? "bg-green-50" : "bg-muted/30")}>
              <p className="text-xs text-muted-foreground">α = 0.01</p>
              <p className={cn("font-medium", result.pValue < 0.01 ? "text-green-600" : "text-gray-600")}>
                {result.pValue < 0.01 ? "Significant" : "Not significant"}
              </p>
            </div>
            <div className={cn("rounded-lg border p-3 text-center", result.pValue < 0.001 ? "bg-green-50" : "bg-muted/30")}>
              <p className="text-xs text-muted-foreground">α = 0.001</p>
              <p className={cn("font-medium", result.pValue < 0.001 ? "text-green-600" : "text-gray-600")}>
                {result.pValue < 0.001 ? "Significant" : "Not significant"}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About P-Values</h4>
            <p className="text-sm text-muted-foreground">
              The p-value is the probability of obtaining results as extreme as the observed
              data, assuming the null hypothesis is true. A small p-value (typically &lt; 0.05)
              suggests the observed data is unlikely under the null hypothesis.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Important:</strong> A p-value does NOT tell you the probability that the
              null hypothesis is true. It only indicates how compatible your data is with the
              null hypothesis.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
