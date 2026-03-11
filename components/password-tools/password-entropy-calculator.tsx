"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Calculator, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PasswordEntropyCalculator() {
  const [password, setPassword] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const analysis = useMemo(() => {
    if (!password) return null

    // Calculate character set size
    let charsetSize = 0
    const hasLower = /[a-z]/.test(password)
    const hasUpper = /[A-Z]/.test(password)
    const hasDigit = /\d/.test(password)
    const hasSymbol = /[^a-zA-Z0-9]/.test(password)

    if (hasLower) charsetSize += 26
    if (hasUpper) charsetSize += 26
    if (hasDigit) charsetSize += 10
    if (hasSymbol) charsetSize += 32

    // Calculate entropy: log2(charset^length) = length * log2(charset)
    const entropy = password.length > 0 && charsetSize > 0 
      ? password.length * Math.log2(charsetSize)
      : 0

    // Calculate total combinations
    const combinations = charsetSize > 0 ? Math.pow(charsetSize, password.length) : 0

    // Determine strength based on entropy
    let strength: "very-weak" | "weak" | "moderate" | "strong" | "very-strong"
    let strengthDesc: string

    if (entropy < 40) {
      strength = "very-weak"
      strengthDesc = "Easily crackable"
    } else if (entropy < 60) {
      strength = "weak"
      strengthDesc = "Could be cracked with effort"
    } else if (entropy < 80) {
      strength = "moderate"
      strengthDesc = "Reasonably secure"
    } else if (entropy < 100) {
      strength = "strong"
      strengthDesc = "Very difficult to crack"
    } else {
      strength = "very-strong"
      strengthDesc = "Extremely secure"
    }

    // Estimate crack time at different speeds
    const crackSpeeds = [
      { name: "Online attack (100/s)", speed: 100 },
      { name: "Fast offline (10B/s)", speed: 10000000000 },
      { name: "Supercomputer (100T/s)", speed: 100000000000000 },
    ]

    const crackTimes = crackSpeeds.map(cs => {
      const seconds = combinations / cs.speed
      let time: string
      if (seconds < 1) time = "Instantly"
      else if (seconds < 60) time = `${Math.round(seconds)} seconds`
      else if (seconds < 3600) time = `${Math.round(seconds / 60)} minutes`
      else if (seconds < 86400) time = `${Math.round(seconds / 3600)} hours`
      else if (seconds < 31536000) time = `${Math.round(seconds / 86400)} days`
      else if (seconds < 31536000000) time = `${(seconds / 31536000).toFixed(1)} years`
      else time = `${(seconds / 31536000000).toFixed(1)} centuries`
      return { name: cs.name, time }
    })

    return {
      entropy: entropy.toFixed(2),
      charsetSize,
      combinations: combinations.toExponential(2),
      strength,
      strengthDesc,
      crackTimes,
      hasLower,
      hasUpper,
      hasDigit,
      hasSymbol,
      length: password.length,
    }
  }, [password])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "very-strong": return "text-green-500 bg-green-500/10 border-green-500/30"
      case "strong": return "text-green-500 bg-green-500/10 border-green-500/30"
      case "moderate": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/30"
      case "weak": return "text-orange-500 bg-orange-500/10 border-orange-500/30"
      case "very-weak": return "text-red-500 bg-red-500/10 border-red-500/30"
      default: return "text-muted-foreground"
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Password Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-base font-medium">
            Password
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => copyToClipboard(password, "password")}
            className="h-7"
            disabled={!password}
          >
            {copied === "password" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            <span className="text-xs">Copy</span>
          </Button>
        </div>

        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="font-mono text-lg"
          placeholder="Enter password to analyze..."
          autoComplete="off"
        />
      </section>

      {/* Results */}
      {analysis && (
        <section className="space-y-4">
          {/* Main Entropy Display */}
          <div className={cn(
            "rounded-lg border p-6 text-center",
            getStrengthColor(analysis.strength)
          )}>
            <p className="text-sm text-muted-foreground mb-2">Password Entropy</p>
            <p className="font-mono text-5xl font-bold">{analysis.entropy} bits</p>
            <p className="text-sm mt-2 capitalize">{analysis.strengthDesc}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Length</p>
              <p className="font-mono text-2xl font-bold">{analysis.length}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Charset Size</p>
              <p className="font-mono text-2xl font-bold">{analysis.charsetSize}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Combinations</p>
              <p className="font-mono text-lg font-bold">{analysis.combinations}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Strength</p>
              <p className={cn(
                "font-mono text-lg font-bold capitalize",
                analysis.strength === "very-strong" && "text-green-500",
                analysis.strength === "strong" && "text-green-500",
                analysis.strength === "moderate" && "text-yellow-500",
                analysis.strength === "weak" && "text-orange-500",
                analysis.strength === "very-weak" && "text-red-500"
              )}>{analysis.strength.replace("-", " ")}</p>
            </div>
          </div>

          {/* Character Set Breakdown */}
          <div className="rounded-lg border bg-background p-4">
            <p className="text-sm font-medium mb-3">Character Set Analysis</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Lowercase (a-z)</span>
                <span className={cn("font-mono", analysis.hasLower ? "text-green-500" : "text-muted-foreground")}>
                  {analysis.hasLower ? "+26" : "not used"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Uppercase (A-Z)</span>
                <span className={cn("font-mono", analysis.hasUpper ? "text-green-500" : "text-muted-foreground")}>
                  {analysis.hasUpper ? "+26" : "not used"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Digits (0-9)</span>
                <span className={cn("font-mono", analysis.hasDigit ? "text-green-500" : "text-muted-foreground")}>
                  {analysis.hasDigit ? "+10" : "not used"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Symbols</span>
                <span className={cn("font-mono", analysis.hasSymbol ? "text-green-500" : "text-muted-foreground")}>
                  {analysis.hasSymbol ? "+32" : "not used"}
                </span>
              </div>
              <div className="pt-2 border-t flex items-center justify-between font-medium">
                <span className="text-sm">Total Charset</span>
                <span className="font-mono">{analysis.charsetSize} characters</span>
              </div>
            </div>
          </div>

          {/* Crack Time Estimates */}
          <div className="rounded-lg border bg-background p-4">
            <p className="text-sm font-medium mb-3">Estimated Crack Time</p>
            <div className="space-y-2">
              {analysis.crackTimes.map((ct, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{ct.name}</span>
                  <span className="font-mono">{ct.time}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Understanding Password Entropy</h4>
            <p className="text-sm text-muted-foreground">
              Entropy measures password randomness in bits. Higher entropy means more possible 
              combinations and longer crack times. Formula: Entropy = Length × log₂(Charset Size)
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>40 bits: Minimum for low-security applications</li>
              <li>60 bits: Reasonable for most uses</li>
              <li>80+ bits: Recommended for sensitive data</li>
              <li>100+ bits: Excellent security</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
