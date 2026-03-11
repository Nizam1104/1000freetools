"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

function gcd(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b !== 0) {
    const temp = b
    b = a % b
    a = temp
  }
  return a
}

function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0
  return Math.abs(a * b) / gcd(a, b)
}

function getPrimeFactorization(num: number): Record<number, number> {
  const factors: Record<number, number> = {}
  let n = Math.abs(num)
  let divisor = 2

  while (n > 1) {
    while (n % divisor === 0) {
      factors[divisor] = (factors[divisor] || 0) + 1
      n = n / divisor
    }
    divisor++
    if (divisor * divisor > n && n > 1) {
      factors[n] = (factors[n] || 0) + 1
      break
    }
  }

  return factors
}

export default function GCFLCMCalculator() {
  const [numbers, setNumbers] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const parsedNumbers = useMemo(() => {
    return numbers
      .split(/[,\s]+/)
      .map((n) => parseInt(n.trim(), 10))
      .filter((n) => !isNaN(n) && n !== 0)
  }, [numbers])

  const result = useMemo(() => {
    if (parsedNumbers.length < 2) return null

    let gcfValue = parsedNumbers[0]
    let lcmValue = parsedNumbers[0]

    for (let i = 1; i < parsedNumbers.length; i++) {
      gcfValue = gcd(gcfValue, parsedNumbers[i])
      lcmValue = lcm(lcmValue, parsedNumbers[i])
    }

    const factorizations = parsedNumbers.map((n) => ({
      number: n,
      factors: getPrimeFactorization(n),
    }))

    return {
      gcf: gcfValue,
      lcm: lcmValue,
      factorizations,
    }
  }, [parsedNumbers])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const formatFactorization = (factors: Record<number, number>): string => {
    return Object.entries(factors)
      .map(([base, exp]) => (exp === 1 ? base : `${base}^${exp}`))
      .join(" × ") || "1"
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">GCF and LCM Calculator</h2>
        <p className="text-muted-foreground">
          Calculate the Greatest Common Factor (GCF) and Least Common Multiple (LCM) of two or more numbers.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="numbers-input">Enter Numbers</Label>
          <Input
            id="numbers-input"
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
            className="font-mono"
            placeholder="Enter numbers separated by commas (e.g., 12, 18, 24)..."
            type="text"
            inputMode="numeric"
          />
          <p className="text-xs text-muted-foreground">
            Enter 2 or more positive integers separated by commas or spaces
          </p>
        </div>

        {result && parsedNumbers.length >= 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
                <p className="text-sm text-muted-foreground">Greatest Common Factor (GCF)</p>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold font-mono">{result.gcf.toLocaleString()}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(result.gcf.toString(), "gcf")}
                  >
                    {copied === "gcf" ? <Check className="size-4" /> : <Copy className="size-4" />}
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
                <p className="text-sm text-muted-foreground">Least Common Multiple (LCM)</p>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold font-mono">{result.lcm.toLocaleString()}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(result.lcm.toString(), "lcm")}
                  >
                    {copied === "lcm" ? <Check className="size-4" /> : <Copy className="size-4" />}
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-background p-4 space-y-3">
              <h3 className="text-sm font-medium">Prime Factorization</h3>
              <div className="space-y-2">
                {result.factorizations.map((item) => (
                  <div key={item.number} className="flex items-center gap-3 text-sm">
                    <span className="font-mono font-medium w-16">{item.number}:</span>
                    <span className="font-mono">{formatFactorization(item.factors)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border bg-muted/30 p-4">
              <h3 className="text-sm font-medium mb-2">Step-by-Step Explanation</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">GCF:</strong> The largest number that divides all
                  input numbers without a remainder.
                </p>
                <p>
                  <strong className="text-foreground">LCM:</strong> The smallest number that is divisible
                  by all input numbers.
                </p>
                <p className="text-xs">
                  Method: Using the Euclidean algorithm for GCF, and LCM(a,b) = |a×b| / GCF(a,b)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
