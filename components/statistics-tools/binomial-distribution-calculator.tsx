"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

// Factorial
const factorial = (n: number): number => {
  if (n <= 1) return 1
  let result = 1
  for (let i = 2; i <= n; i++) result *= i
  return result
}

// Binomial coefficient
const binomialCoeff = (n: number, k: number): number => {
  if (k > n || k < 0) return 0
  return factorial(n) / (factorial(k) * factorial(n - k))
}

export default function BinomialDistributionCalculator() {
  const [n, setN] = useState<number>(10)
  const [p, setP] = useState<number>(0.5)
  const [k, setK] = useState<number>(5)
  const [calculationType, setCalculationType] = useState<"exact" | "cumulative" | "complement">("exact")

  const [result, setResult] = useState<{
    probability: number
    mean: number
    variance: number
    stdDev: number
    description: string
    distribution?: { k: number; prob: number }[]
  } | null>(null)

  const calculate = useCallback(() => {
    try {
      const mean = n * p
      const variance = n * p * (1 - p)
      const stdDev = Math.sqrt(variance)

      let prob: number
      let description: string
      let distribution: { k: number; prob: number }[] | undefined

      if (calculationType === "exact") {
        prob = binomialCoeff(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k)
        description = `P(X = ${k}) = ${(prob * 100).toFixed(4)}%`
      } else if (calculationType === "cumulative") {
        prob = 0
        for (let i = 0; i <= k; i++) {
          prob += binomialCoeff(n, i) * Math.pow(p, i) * Math.pow(1 - p, n - i)
        }
        description = `P(X ≤ ${k}) = ${(prob * 100).toFixed(4)}%`
      } else { // complement
        prob = 0
        for (let i = 0; i < k; i++) {
          prob += binomialCoeff(n, i) * Math.pow(p, i) * Math.pow(1 - p, n - i)
        }
        prob = 1 - prob
        description = `P(X ≥ ${k}) = ${(prob * 100).toFixed(4)}%`
      }

      // Generate distribution table
      distribution = []
      for (let i = 0; i <= n; i++) {
        const p = binomialCoeff(n, i) * Math.pow(p, i) * Math.pow(1 - p, n - i)
        if (p > 0.0001) {
          distribution.push({ k: i, prob: p })
        }
      }

      setResult({ probability: prob, mean, variance, stdDev, description, distribution })
    } catch (err) {
      setResult(null)
    }
  }, [n, p, k, calculationType])

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
    setN(10)
    setP(0.5)
    setK(5)
    setResult(null)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Binomial Distribution Calculator</h2>
        <p className="text-sm text-muted-foreground">
          Calculate probabilities for binomial distributions
        </p>
      </div>

      {/* Parameters */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="n">Number of Trials (n)</Label>
          <Input
            id="n"
            type="number"
            min="1"
            max="100"
            value={n}
            onChange={(e) => setN(Math.min(100, Math.max(1, parseInt(e.target.value) || 10)))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="p">Probability of Success (p)</Label>
          <Input
            id="p"
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={p}
            onChange={(e) => setP(Math.min(1, Math.max(0, parseFloat(e.target.value) || 0.5)))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="k">Number of Successes (k)</Label>
          <Input
            id="k"
            type="number"
            min="0"
            max={n}
            value={k}
            onChange={(e) => setK(Math.min(n, Math.max(0, parseInt(e.target.value) || 5)))}
          />
        </div>
      </section>

      {/* Calculation Type */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Calculation Type</Label>
        <div className="flex gap-2">
          <Button
            variant={calculationType === "exact" ? "default" : "outline"}
            onClick={() => setCalculationType("exact")}
          >
            Exact P(X = k)
          </Button>
          <Button
            variant={calculationType === "cumulative" ? "default" : "outline"}
            onClick={() => setCalculationType("cumulative")}
          >
            Cumulative P(X ≤ k)
          </Button>
          <Button
            variant={calculationType === "complement" ? "default" : "outline"}
            onClick={() => setCalculationType("complement")}
          >
            Complement P(X ≥ k)
          </Button>
        </div>
      </section>

      <div className="flex gap-2">
        <Button onClick={calculate} className="flex-1">
          Calculate
        </Button>
        <Button variant="outline" onClick={handleClear}>
          <Trash2 className="size-4" />
        </Button>
      </div>

      {/* Results */}
      {result && (
        <section className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-6 text-center">
            <p className="text-3xl font-bold text-primary">{(result.probability * 100).toFixed(4)}%</p>
            <p className="text-sm text-muted-foreground mt-2 font-mono">{result.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Mean (np)</p>
              <p className="text-xl font-bold font-mono">{result.mean.toFixed(2)}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Variance</p>
              <p className="text-xl font-bold font-mono">{result.variance.toFixed(2)}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Std Dev</p>
              <p className="text-xl font-bold font-mono">{result.stdDev.toFixed(2)}</p>
            </div>
          </div>

          {/* Distribution Table */}
          {result.distribution && (
            <div className="rounded-lg border bg-muted/30 p-4">
              <h4 className="text-sm font-medium mb-3">Probability Distribution</h4>
              <div className="max-h-[200px] overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left">k</th>
                      <th className="px-4 py-2 text-left">P(X = k)</th>
                      <th className="px-4 py-2 text-left">Visual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.distribution.map(({ k, prob }) => (
                      <tr key={k} className="border-b">
                        <td className="px-4 py-2 font-mono">{k}</td>
                        <td className="px-4 py-2 font-mono">{(prob * 100).toFixed(2)}%</td>
                        <td className="px-4 py-2">
                          <div className="h-4 bg-indigo-200 rounded" style={{ width: `${prob * 100 * 3}%` }} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Binomial Distribution</h4>
            <p className="text-sm text-muted-foreground">
              The binomial distribution models the number of successes in a fixed number of
              independent trials, where each trial has the same probability of success.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Requirements:</strong> Fixed number of trials (n), two possible outcomes
              (success/failure), constant probability (p), and independent trials.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Formula:</strong> P(X = k) = C(n,k) × p^k × (1-p)^(n-k)
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
