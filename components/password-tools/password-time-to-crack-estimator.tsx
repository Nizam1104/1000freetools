"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, Calculator } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PasswordTimeToCrackEstimator() {
  const [password, setPassword] = useState<string>("")
  const [attackSpeed, setAttackSpeed] = useState<number>(10000000000) // 10 billion guesses/second
  const [copied, setCopied] = useState<string | null>(null)

  const analysis = useMemo(() => {
    if (!password) return null

    // Calculate charset size
    let charsetSize = 0
    if (/[a-z]/.test(password)) charsetSize += 26
    if (/[A-Z]/.test(password)) charsetSize += 26
    if (/\d/.test(password)) charsetSize += 10
    if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32

    // Calculate entropy and combinations
    const entropy = password.length > 0 && charsetSize > 0 
      ? password.length * Math.log2(charsetSize)
      : 0
    
    const combinations = charsetSize > 0 ? Math.pow(charsetSize, password.length) : 0

    // Calculate time to crack
    const secondsToCrack = combinations / attackSpeed

    // Format time
    const formatTime = (seconds: number): string => {
      if (seconds < 0.001) return "Instantly (< 1ms)"
      if (seconds < 1) return `${(seconds * 1000).toFixed(0)} milliseconds`
      if (seconds < 60) return `${seconds.toFixed(1)} seconds`
      if (seconds < 3600) return `${(seconds / 60).toFixed(1)} minutes`
      if (seconds < 86400) return `${(seconds / 3600).toFixed(1)} hours`
      if (seconds < 604800) return `${(seconds / 86400).toFixed(1)} days`
      if (seconds < 2629746) return `${(seconds / 604800).toFixed(1)} weeks`
      if (seconds < 31536000) return `${(seconds / 2629746).toFixed(1)} months`
      if (seconds < 315360000) return `${(seconds / 31536000).toFixed(1)} years`
      if (seconds < 31536000000) return `${(seconds / 315360000).toFixed(1)} centuries`
      return "Effectively forever"
    }

    // Determine strength
    let strength: "very-weak" | "weak" | "moderate" | "strong" | "very-strong"
    if (entropy < 40) strength = "very-weak"
    else if (entropy < 60) strength = "weak"
    else if (entropy < 80) strength = "moderate"
    else if (entropy < 100) strength = "strong"
    else strength = "very-strong"

    return {
      entropy: entropy.toFixed(2),
      combinations: combinations.toExponential(2),
      secondsToCrack,
      formattedTime: formatTime(secondsToCrack),
      strength,
      charsetSize,
      length: password.length,
    }
  }, [password, attackSpeed])

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
    setPassword("")
  }, [])

  const attackSpeeds = [
    { name: "Slow online (100/s)", speed: 100 },
    { name: "Typical online (1000/s)", speed: 1000 },
    { name: "Fast offline (1M/s)", speed: 1000000 },
    { name: "GPU cracking (10B/s)", speed: 10000000000 },
    { name: "Supercomputer (100T/s)", speed: 100000000000000 },
  ]

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
            Password to Analyze
          </Label>
          <div className="flex items-center gap-2">
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
            <Button
              variant="ghost"
              size="xs"
              onClick={handleClear}
              className="h-7"
              disabled={!password}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="font-mono text-lg"
          placeholder="Enter password to estimate crack time..."
          autoComplete="off"
        />
      </section>

      {/* Attack Speed Selector */}
      <section className="space-y-3">
        <Label>Attack Speed (Guesses per Second)</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {attackSpeeds.map((as) => (
            <Button
              key={as.speed}
              variant={attackSpeed === as.speed ? "default" : "outline"}
              onClick={() => setAttackSpeed(as.speed)}
              className="justify-start h-auto py-2 px-3"
            >
              <div className="text-left">
                <p className="font-medium text-sm">{as.name}</p>
                <p className="text-xs text-muted-foreground font-mono">{as.speed.toLocaleString()} guesses/s</p>
              </div>
            </Button>
          ))}
        </div>
      </section>

      {/* Results */}
      {analysis && (
        <section className="space-y-4">
          {/* Main Result */}
          <div className={cn(
            "rounded-lg border p-6 text-center",
            getStrengthColor(analysis.strength)
          )}>
            <p className="text-sm text-muted-foreground mb-2">Estimated Time to Crack</p>
            <p className="font-mono text-3xl md:text-4xl font-bold">{analysis.formattedTime}</p>
            <p className="text-xs text-muted-foreground mt-2">
              at {attackSpeed.toLocaleString()} guesses/second
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Password Length</p>
              <p className="font-mono text-2xl font-bold">{analysis.length}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Entropy</p>
              <p className="font-mono text-2xl font-bold">{analysis.entropy}</p>
              <p className="text-xs text-muted-foreground">bits</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Charset Size</p>
              <p className="font-mono text-2xl font-bold">{analysis.charsetSize}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Combinations</p>
              <p className="font-mono text-sm font-bold">{analysis.combinations}</p>
            </div>
          </div>

          {/* Time Comparison */}
          <div className="rounded-lg border bg-background p-4">
            <p className="text-sm font-medium mb-3">Time at Different Attack Speeds</p>
            <div className="space-y-2">
              {attackSpeeds.map((as, idx) => {
                const seconds = (Math.pow(analysis.charsetSize, analysis.length)) / as.speed
                const formatTime = (s: number) => {
                  if (s < 1) return `${(s * 1000).toFixed(0)}ms`
                  if (s < 60) return `${s.toFixed(1)}s`
                  if (s < 3600) return `${(s / 60).toFixed(0)}m`
                  if (s < 86400) return `${(s / 3600).toFixed(1)}h`
                  if (s < 31536000) return `${(s / 86400).toFixed(0)}d`
                  if (s < 31536000000) return `${(s / 31536000).toFixed(1)}y`
                  return "centuries"
                }
                return (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{as.name}</span>
                    <span className={cn(
                      "font-mono",
                      attackSpeed === as.speed ? "font-bold text-primary" : ""
                    )}>{formatTime(seconds)}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Crack Time Estimation</h4>
            <p className="text-sm text-muted-foreground">
              This tool estimates how long it would take to brute-force crack a password by trying 
              every possible combination. Actual crack times may vary based on:
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Attack method (online vs offline)</li>
              <li>Hardware used (CPU, GPU, ASIC, quantum)</li>
              <li>Hash algorithm speed (MD5 is faster than bcrypt)</li>
              <li>Whether the password is in a dictionary</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
