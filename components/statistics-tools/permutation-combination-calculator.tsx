"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

// Factorial with memoization
const factorialCache: Record<number, number> = { 0: 1, 1: 1 }
const factorial = (n: number): number => {
  if (factorialCache[n] !== undefined) return factorialCache[n]
  factorialCache[n] = n * factorial(n - 1)
  return factorialCache[n]
}

// Binomial coefficient
const binomialCoeff = (n: number, k: number): number => {
  if (k > n || k < 0) return 0
  if (k === 0 || k === n) return 1
  if (k > n / 2) k = n - k
  let result = 1
  for (let i = 0; i < k; i++) {
    result = result * (n - i) / (i + 1)
  }
  return result
}

export default function PermutationCombinationCalculator() {
  const [n, setN] = useState<number>(10)
  const [r, setR] = useState<number>(3)
  const [withRepetition, setWithRepetition] = useState<boolean>(false)
  const [calculationType, setCalculationType] = useState<"both" | "permutation" | "combination">("both")
  const [copied, setCopied] = useState<string | null>(null)

  const [result, setResult] = useState<{
    permutation?: number
    combination?: number
    permutationWithRep?: number
    combinationWithRep?: number
    description: string
  } | null>(null)

  const calculate = useCallback(() => {
    try {
      if (n < 0 || r < 0) {
        throw new Error("n and r must be non-negative")
      }

      let permutation: number | undefined
      let combination: number | undefined
      let permutationWithRep: number | undefined
      let combinationWithRep: number | undefined

      // Without repetition
      if (calculationType === "both" || calculationType === "permutation") {
        if (r <= n) {
          permutation = factorial(n) / factorial(n - r)
        } else {
          permutation = 0 // P(n,r) = 0 when r > n
        }
      }

      if (calculationType === "both" || calculationType === "combination") {
        if (r <= n) {
          combination = binomialCoeff(n, r)
        } else {
          combination = 0 // C(n,r) = 0 when r > n
        }
      }

      // With repetition
      if (withRepetition) {
        if (calculationType === "both" || calculationType === "permutation") {
          permutationWithRep = Math.pow(n, r)
        }
        if (calculationType === "both" || calculationType === "combination") {
          combinationWithRep = binomialCoeff(n + r - 1, r)
        }
      }

      let description = ""
      if (calculationType === "both") {
        description = `From ${n} items, selecting ${r}`
      } else if (calculationType === "permutation") {
        description = `Permutations: Order matters`
      } else {
        description = `Combinations: Order doesn't matter`
      }

      setResult({
        permutation,
        combination,
        permutationWithRep,
        combinationWithRep,
        description
      })
    } catch (err) {
      setResult(null)
    }
  }, [n, r, withRepetition, calculationType])

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
    setR(3)
    setWithRepetition(false)
    setResult(null)
  }, [])

  const formatNumber = (num: number | undefined): string => {
    if (num === undefined) return "-"
    if (num > 1e15) return num.toExponential(4)
    return num.toLocaleString()
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Permutation & Combination Calculator</h2>
        <p className="text-sm text-muted-foreground">
          Calculate permutations and combinations with or without repetition
        </p>
      </div>

      {/* Calculation Type */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Calculation Type</Label>
        <div className="flex gap-2">
          <Button
            variant={calculationType === "both" ? "default" : "outline"}
            onClick={() => setCalculationType("both")}
          >
            Both
          </Button>
          <Button
            variant={calculationType === "permutation" ? "default" : "outline"}
            onClick={() => setCalculationType("permutation")}
          >
            Permutation Only
          </Button>
          <Button
            variant={calculationType === "combination" ? "default" : "outline"}
            onClick={() => setCalculationType("combination")}
          >
            Combination Only
          </Button>
        </div>
      </section>

      {/* Parameters */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="n">Total Items (n)</Label>
          <Input
            id="n"
            type="number"
            min="0"
            max="1000"
            value={n}
            onChange={(e) => setN(Math.min(1000, Math.max(0, parseInt(e.target.value) || 0)))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="r">Items to Select (r)</Label>
          <Input
            id="r"
            type="number"
            min="0"
            max="1000"
            value={r}
            onChange={(e) => setR(Math.min(1000, Math.max(0, parseInt(e.target.value) || 0)))}
          />
        </div>
      </section>

      {/* Repetition Option */}
      <section className="space-y-2">
        <Label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={withRepetition}
            onChange={(e) => setWithRepetition(e.target.checked)}
            className="rounded border-border"
          />
          Allow Repetition (items can be selected multiple times)
        </Label>
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
          <p className="text-sm text-muted-foreground text-center">{result.description}</p>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Permutation */}
            {(calculationType === "both" || calculationType === "permutation") && (
              <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                <h3 className="font-medium">Permutation (P)</h3>
                <p className="text-xs text-muted-foreground">Order matters</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Without repetition:</span>
                    <span className="font-mono font-bold">
                      {formatNumber(result.permutation)}
                    </span>
                  </div>
                  {withRepetition && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm">With repetition:</span>
                      <span className="font-mono font-bold">
                        {formatNumber(result.permutationWithRep)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t text-xs text-muted-foreground">
                  <p>Formula: P(n,r) = n! / (n-r)!</p>
                  {withRepetition && <p>With repetition: n^r</p>}
                </div>
              </div>
            )}

            {/* Combination */}
            {(calculationType === "both" || calculationType === "combination") && (
              <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                <h3 className="font-medium">Combination (C)</h3>
                <p className="text-xs text-muted-foreground">Order doesn't matter</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Without repetition:</span>
                    <span className="font-mono font-bold">
                      {formatNumber(result.combination)}
                    </span>
                  </div>
                  {withRepetition && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm">With repetition:</span>
                      <span className="font-mono font-bold">
                        {formatNumber(result.combinationWithRep)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t text-xs text-muted-foreground">
                  <p>Formula: C(n,r) = n! / (r! × (n-r)!)</p>
                  {withRepetition && <p>With repetition: C(n+r-1, r)</p>}
                </div>
              </div>
            )}
          </div>

          {/* Examples */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <h4 className="text-sm font-medium mb-3">When to Use Each</h4>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-1">
                <p className="font-medium text-sm">Permutation (Order Matters)</p>
                <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
                  <li>Arranging books on a shelf</li>
                  <li>Creating passwords</li>
                  <li>Ranking contestants</li>
                  <li>Seating arrangements</li>
                </ul>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-sm">Combination (Order Doesn't Matter)</p>
                <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
                  <li>Selecting team members</li>
                  <li>Lottery numbers</li>
                  <li>Pizza toppings</li>
                  <li>Committee selection</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Permutations & Combinations</h4>
            <p className="text-sm text-muted-foreground">
              <strong>Permutation:</strong> The number of ways to arrange r items from n distinct
              items where order matters. For example, ABC and BAC are different permutations.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Combination:</strong> The number of ways to select r items from n distinct
              items where order doesn't matter. For example, ABC and BAC are the same combination.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>With Repetition:</strong> Items can be selected multiple times. For example,
              selecting 3 flavors from 5 ice cream flavors where you can pick the same flavor twice.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
