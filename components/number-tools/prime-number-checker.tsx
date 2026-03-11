"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

function isPrime(num: number): boolean {
  if (num <= 1) return false
  if (num <= 3) return true
  if (num % 2 === 0 || num % 3 === 0) return false
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false
  }
  return true
}

function getDivisors(num: number): number[] {
  const divisors: number[] = []
  for (let i = 1; i <= num; i++) {
    if (num % i === 0) divisors.push(i)
  }
  return divisors
}

function findNextPrime(num: number): number {
  let next = num + 1
  while (!isPrime(next)) next++
  return next
}

function findPreviousPrime(num: number): number {
  let prev = num - 1
  while (prev > 1 && !isPrime(prev)) prev--
  return prev > 1 ? prev : -1
}

function getPrimeRange(start: number, end: number): number[] {
  const primes: number[] = []
  for (let i = start; i <= end; i++) {
    if (isPrime(i)) primes.push(i)
  }
  return primes
}

export default function PrimeNumberChecker() {
  const [inputValue, setInputValue] = useState<string>("")
  const [rangeStart, setRangeStart] = useState<string>("")
  const [rangeEnd, setRangeEnd] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const number = useMemo(() => {
    const num = parseInt(inputValue, 10)
    return isNaN(num) ? null : num
  }, [inputValue])

  const primeResult = useMemo(() => {
    if (number === null) return null
    const prime = isPrime(number)
    return {
      isPrime: prime,
      divisors: prime ? [] : getDivisors(number),
      nextPrime: findNextPrime(number),
      previousPrime: findPreviousPrime(number),
    }
  }, [number])

  const primeRange = useMemo(() => {
    const start = parseInt(rangeStart, 10)
    const end = parseInt(rangeEnd, 10)
    if (isNaN(start) || isNaN(end) || start > end || end - start > 10000) return null
    return getPrimeRange(start, end)
  }, [rangeStart, rangeEnd])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Prime Number Checker</h2>
        <p className="text-muted-foreground">
          Check if a number is prime, view its divisors, and find neighboring prime numbers.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="number-input">Enter a Number</Label>
          <Input
            id="number-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.replace(/[^0-9]/g, ""))}
            className="font-mono"
            placeholder="Enter a positive integer..."
            type="text"
            inputMode="numeric"
          />
        </div>

        {primeResult && (
          <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-lg font-medium">
                {number?.toLocaleString()} is{" "}
                <span className={primeResult.isPrime ? "text-green-600" : "text-destructive"}>
                  {primeResult.isPrime ? "PRIME" : "NOT PRIME"}
                </span>
              </span>
            </div>

            {!primeResult.isPrime && primeResult.divisors.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Divisors:</p>
                <div className="flex flex-wrap gap-2">
                  {primeResult.divisors.map((div) => (
                    <span
                      key={div}
                      className="px-2 py-1 bg-background rounded border text-sm font-mono"
                    >
                      {div}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Previous Prime</p>
                <p className="font-mono text-lg">
                  {primeResult.previousPrime !== -1 ? primeResult.previousPrime.toLocaleString() : "None"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Next Prime</p>
                <p className="font-mono text-lg">{primeResult.nextPrime.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t pt-6 space-y-4">
        <h3 className="text-lg font-semibold">Find Primes in Range</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="range-start">Start</Label>
            <Input
              id="range-start"
              value={rangeStart}
              onChange={(e) => setRangeStart(e.target.value.replace(/[^0-9]/g, ""))}
              className="font-mono"
              placeholder="From..."
              type="text"
              inputMode="numeric"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="range-end">End</Label>
            <Input
              id="range-end"
              value={rangeEnd}
              onChange={(e) => setRangeEnd(e.target.value.replace(/[^0-9]/g, ""))}
              className="font-mono"
              placeholder="To..."
              type="text"
              inputMode="numeric"
            />
          </div>
        </div>

        {primeRange && (
          <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                Found {primeRange.length} prime{primeRange.length !== 1 ? "s" : ""}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(primeRange.join(", "), "range")}
              >
                {copied === "range" ? <Check className="size-4" /> : <Copy className="size-4" />}
                <span className="ml-2">Copy</span>
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
              {primeRange.map((prime) => (
                <span
                  key={prime}
                  className="px-2 py-1 bg-background rounded border text-sm font-mono"
                >
                  {prime}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
