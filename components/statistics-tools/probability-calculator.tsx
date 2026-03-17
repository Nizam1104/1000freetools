"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

// Standard normal CDF approximation
const normalCDF = (z: number): number => {
  const t = 1 / (1 + 0.2316419 * Math.abs(z))
  const d = 0.3989423 * Math.exp(-z * z / 2)
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
  return z > 0 ? 1 - p : p
}

// Inverse normal CDF (quantile function) approximation
const normalQuantile = (p: number): number => {
  if (p <= 0) return -10
  if (p >= 1) return 10
  if (p === 0.5) return 0

  const t = Math.sqrt(-2 * Math.log(p < 0.5 ? p : 1 - p))
  const c0 = 2.515517
  const c1 = 0.802853
  const c2 = 0.010328
  const d1 = 1.432788
  const d2 = 0.189269
  const d3 = 0.001308

  const z = t - (c0 + c1 * t + c2 * t * t) / (1 + d1 * t + d2 * t * t + d3 * t * t * t)
  return p < 0.5 ? -z : z
}

export default function ProbabilityCalculator() {
  const [distribution, setDistribution] = useState<"normal" | "binomial" | "poisson" | "exponential">("normal")
  const [calculationType, setCalculationType] = useState<"cdf" | "pdf" | "inverse">("cdf")

  // Normal distribution parameters
  const [mean, setMean] = useState<number>(0)
  const [stdDev, setStdDev] = useState<number>(1)
  const [xValue, setXValue] = useState<number>(1.96)

  // Binomial distribution parameters
  const [n, setN] = useState<number>(10)
  const [p, setP] = useState<number>(0.5)
  const [k, setK] = useState<number>(5)

  // Poisson distribution parameters
  const [lambda, setLambda] = useState<number>(3)
  const [kPoisson, setKPoisson] = useState<number>(2)

  // Exponential distribution parameters
  const [rate, setRate] = useState<number>(1)
  const [xExp, setXExp] = useState<number>(1)

  const [result, setResult] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  // Factorial function
  const factorial = (num: number): number => {
    if (num <= 1) return 1
    let result = 1
    for (let i = 2; i <= num; i++) result *= i
    return result
  }

  // Binomial coefficient
  const binomialCoeff = (n: number, k: number): number => {
    return factorial(n) / (factorial(k) * factorial(n - k))
  }

  const calculate = useCallback(() => {
    try {
      let res = ""

      if (distribution === "normal") {
        const z = (xValue - mean) / stdDev

        if (calculationType === "cdf") {
          const prob = normalCDF(z)
          res = `P(X ≤ ${xValue}) = ${prob.toFixed(6)}\nZ-score: ${z.toFixed(4)}`
        } else if (calculationType === "pdf") {
          const pdf = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z)
          res = `f(${xValue}) = ${pdf.toFixed(6)}\nZ-score: ${z.toFixed(4)}`
        } else {
          const zScore = normalQuantile(xValue)
          const value = mean + zScore * stdDev
          res = `P(X ≤ ${value.toFixed(4)}) = ${xValue}\nZ-score: ${zScore.toFixed(4)}`
        }
      } else if (distribution === "binomial") {
        if (calculationType === "cdf") {
          let prob = 0
          for (let i = 0; i <= k; i++) {
            prob += binomialCoeff(n, i) * Math.pow(p, i) * Math.pow(1 - p, n - i)
          }
          res = `P(X ≤ ${k}) = ${prob.toFixed(6)}\nMean: ${(n * p).toFixed(2)}, Variance: ${(n * p * (1 - p)).toFixed(2)}`
        } else if (calculationType === "pdf") {
          const prob = binomialCoeff(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k)
          res = `P(X = ${k}) = ${prob.toFixed(6)}\nMean: ${(n * p).toFixed(2)}, Variance: ${(n * p * (1 - p)).toFixed(2)}`
        } else {
          res = "Inverse calculation not available for binomial distribution"
        }
      } else if (distribution === "poisson") {
        if (calculationType === "cdf") {
          let prob = 0
          for (let i = 0; i <= kPoisson; i++) {
            prob += (Math.pow(lambda, i) * Math.exp(-lambda)) / factorial(i)
          }
          res = `P(X ≤ ${kPoisson}) = ${prob.toFixed(6)}\nMean: ${lambda}, Variance: ${lambda}`
        } else if (calculationType === "pdf") {
          const prob = (Math.pow(lambda, kPoisson) * Math.exp(-lambda)) / factorial(kPoisson)
          res = `P(X = ${kPoisson}) = ${prob.toFixed(6)}\nMean: ${lambda}, Variance: ${lambda}`
        } else {
          res = "Inverse calculation not available for Poisson distribution"
        }
      } else if (distribution === "exponential") {
        if (calculationType === "cdf") {
          const prob = 1 - Math.exp(-rate * xExp)
          res = `P(X ≤ ${xExp}) = ${prob.toFixed(6)}\nMean: ${(1/rate).toFixed(4)}, Variance: ${(1/rate/rate).toFixed(4)}`
        } else if (calculationType === "pdf") {
          const pdf = rate * Math.exp(-rate * xExp)
          res = `f(${xExp}) = ${pdf.toFixed(6)}\nMean: ${(1/rate).toFixed(4)}, Variance: ${(1/rate/rate).toFixed(4)}`
        } else {
          const value = -Math.log(1 - xExp) / rate
          res = `P(X ≤ ${value.toFixed(4)}) = ${xExp}\nMean: ${(1/rate).toFixed(4)}`
        }
      }

      setResult(res)
    } catch (err) {
      setResult("Calculation error. Please check your inputs.")
    }
  }, [distribution, calculationType, mean, stdDev, xValue, n, p, k, lambda, kPoisson, rate, xExp])

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
    setResult("")
    setXValue(1.96)
    setK(5)
    setKPoisson(2)
    setXExp(1)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Probability Calculator</h2>
        <p className="text-sm text-muted-foreground">
          Calculate probabilities for common statistical distributions
        </p>
      </div>

      {/* Distribution Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Distribution</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {(["normal", "binomial", "poisson", "exponential"] as const).map(dist => (
            <Button
              key={dist}
              variant={distribution === dist ? "default" : "outline"}
              onClick={() => setDistribution(dist)}
            >
              {dist.charAt(0).toUpperCase() + dist.slice(1)}
            </Button>
          ))}
        </div>
      </section>

      {/* Calculation Type */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Calculation Type</Label>
        <div className="flex gap-2">
          <Button
            variant={calculationType === "cdf" ? "default" : "outline"}
            onClick={() => setCalculationType("cdf")}
          >
            CDF (P(X ≤ x))
          </Button>
          <Button
            variant={calculationType === "pdf" ? "default" : "outline"}
            onClick={() => setCalculationType("pdf")}
          >
            PDF/PMF (P(X = x))
          </Button>
          {distribution !== "binomial" && distribution !== "poisson" && (
            <Button
              variant={calculationType === "inverse" ? "default" : "outline"}
              onClick={() => setCalculationType("inverse")}
            >
              Inverse CDF
            </Button>
          )}
        </div>
      </section>

      {/* Parameters */}
      <section className="grid gap-4 md:grid-cols-3">
        {distribution === "normal" && (
          <>
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
                value={stdDev}
                onChange={(e) => setStdDev(parseFloat(e.target.value) || 1)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="xvalue">{calculationType === "inverse" ? "Probability (p)" : "X Value"}</Label>
              <Input
                id="xvalue"
                type="number"
                value={xValue}
                onChange={(e) => setXValue(parseFloat(e.target.value) || 0)}
              />
            </div>
          </>
        )}

        {distribution === "binomial" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="n">Number of Trials (n)</Label>
              <Input
                id="n"
                type="number"
                min="1"
                value={n}
                onChange={(e) => setN(parseInt(e.target.value) || 10)}
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
                onChange={(e) => setP(parseFloat(e.target.value) || 0.5)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="k">{calculationType === "cdf" ? "Max Successes (k)" : "Number of Successes (k)"}</Label>
              <Input
                id="k"
                type="number"
                min="0"
                value={k}
                onChange={(e) => setK(parseInt(e.target.value) || 5)}
              />
            </div>
          </>
        )}

        {distribution === "poisson" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="lambda">Rate (λ)</Label>
              <Input
                id="lambda"
                type="number"
                min="0"
                step="0.1"
                value={lambda}
                onChange={(e) => setLambda(parseFloat(e.target.value) || 3)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kpoisson">{calculationType === "cdf" ? "Max Events (k)" : "Number of Events (k)"}</Label>
              <Input
                id="kpoisson"
                type="number"
                min="0"
                value={kPoisson}
                onChange={(e) => setKPoisson(parseInt(e.target.value) || 2)}
              />
            </div>
          </>
        )}

        {distribution === "exponential" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="rate">Rate (λ)</Label>
              <Input
                id="rate"
                type="number"
                min="0"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value) || 1)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="xexp">{calculationType === "inverse" ? "Probability (p)" : "X Value"}</Label>
              <Input
                id="xexp"
                type="number"
                min="0"
                value={xExp}
                onChange={(e) => setXExp(parseFloat(e.target.value) || 1)}
              />
            </div>
          </>
        )}
      </section>

      <div className="flex gap-2">
        <Button onClick={calculate} className="flex-1">
          Calculate
        </Button>
        <Button variant="outline" onClick={handleClear}>
          <Trash2 className="size-4" />
        </Button>
      </div>

      {/* Result */}
      {result && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Result</Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(result, "result")}
              className="h-7"
            >
              {copied === "result" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="font-mono text-sm whitespace-pre-wrap">{result}</p>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Probability Distributions</h4>
            <p className="text-sm text-muted-foreground">
              <strong>Normal:</strong> Continuous distribution for naturally occurring phenomena.
              Defined by mean (μ) and standard deviation (σ).
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Binomial:</strong> Discrete distribution for number of successes in n trials.
              Defined by trials (n) and success probability (p).
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Poisson:</strong> Discrete distribution for count of events in fixed interval.
              Defined by rate (λ).
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Exponential:</strong> Continuous distribution for time between events.
              Defined by rate (λ).
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
