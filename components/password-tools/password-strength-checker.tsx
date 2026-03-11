"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Shield, ShieldAlert, ShieldCheck, Clock, Calculator } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const analysis = useMemo(() => {
    if (!password) return null

    const issues: string[] = []
    const suggestions: string[] = []
    let score = 0

    // Length scoring
    if (password.length < 8) {
      issues.push("Too short (minimum 8 characters recommended)")
      suggestions.push("Increase password length to at least 12 characters")
    } else if (password.length < 12) {
      score += 1
      suggestions.push("Consider using 12+ characters for better security")
    } else if (password.length < 16) {
      score += 2
    } else {
      score += 3
    }

    // Character variety scoring
    const hasLower = /[a-z]/.test(password)
    const hasUpper = /[A-Z]/.test(password)
    const hasDigit = /\d/.test(password)
    const hasSymbol = /[^a-zA-Z0-9]/.test(password)

    const varietyCount = [hasLower, hasUpper, hasDigit, hasSymbol].filter(Boolean).length
    score += varietyCount

    if (varietyCount < 3) {
      issues.push("Limited character variety")
      if (!hasLower) suggestions.push("Add lowercase letters")
      if (!hasUpper) suggestions.push("Add uppercase letters")
      if (!hasDigit) suggestions.push("Add numbers")
      if (!hasSymbol) suggestions.push("Add special characters (!@#$...)")
    }

    // Pattern detection
    const patterns: { name: string; pattern: RegExp }[] = [
      { name: "Common password", pattern: /^(password|123456|qwerty|abc123|monkey|1234567|letmein|trustno1|dragon|baseball|iloveyou|master|sunshine|ashley|bailey|shadow|123123|654321|superman|qazwsx|michael|football|password1|password123|welcome|jesus|ninja|mustang|password1234)$/i },
      { name: "Sequential numbers", pattern: /(012|123|234|345|456|567|678|789|890)/ },
      { name: "Sequential letters", pattern: /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i },
      { name: "Repeated characters", pattern: /(.)\1{2,}/ },
      { name: "Keyboard pattern", pattern: /(qwerty|asdf|zxcv|qazwsx|1qaz2wsx)/i },
    ]

    for (const { name, pattern } of patterns) {
      if (pattern.test(password)) {
        issues.push(`${name} detected`)
        score -= 1
      }
    }

    // Check for common substitutions
    const leetSpeak = /[!@#$][a-zA-Z]|[0o][a-zA-Z]|[1l][a-zA-Z]/i.test(password)
    if (leetSpeak && password.length < 12) {
      issues.push("Simple character substitutions detected (e.g., @ for a)")
      suggestions.push("Avoid predictable substitutions like @ for 'a' or 0 for 'o'")
    }

    // Calculate entropy
    let charsetSize = 0
    if (hasLower) charsetSize += 26
    if (hasUpper) charsetSize += 26
    if (hasDigit) charsetSize += 10
    if (hasSymbol) charsetSize += 32

    const entropy = password.length > 0 && charsetSize > 0 
      ? Math.log2(Math.pow(charsetSize, password.length))
      : 0

    // Determine strength
    let strength: "very-weak" | "weak" | "moderate" | "strong" | "very-strong"
    if (score <= 2 || entropy < 40) strength = "very-weak"
    else if (score <= 4 || entropy < 60) strength = "weak"
    else if (score <= 6 || entropy < 80) strength = "moderate"
    else if (score <= 8 || entropy < 100) strength = "strong"
    else strength = "very-strong"

    // Estimate crack time
    const guessesPerSecond = 10000000000 // 10 billion guesses/second (modern GPU)
    const secondsToCrack = Math.pow(2, entropy) / guessesPerSecond
    
    let crackTime: string
    if (secondsToCrack < 1) crackTime = "Instantly"
    else if (secondsToCrack < 60) crackTime = `${Math.round(secondsToCrack)} seconds`
    else if (secondsToCrack < 3600) crackTime = `${Math.round(secondsToCrack / 60)} minutes`
    else if (secondsToCrack < 86400) crackTime = `${Math.round(secondsToCrack / 3600)} hours`
    else if (secondsToCrack < 31536000) crackTime = `${Math.round(secondsToCrack / 86400)} days`
    else if (secondsToCrack < 31536000000) crackTime = `${Math.round(secondsToCrack / 31536000)} years`
    else crackTime = "Centuries"

    return {
      strength,
      score,
      maxScore: 10,
      issues,
      suggestions,
      entropy: entropy.toFixed(1),
      crackTime,
      hasLower,
      hasUpper,
      hasDigit,
      hasSymbol,
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

  const handleClear = useCallback(() => {
    setPassword("")
  }, [])

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "very-strong": return "bg-green-500"
      case "strong": return "bg-green-500"
      case "moderate": return "bg-yellow-500"
      case "weak": return "bg-orange-500"
      case "very-weak": return "bg-red-500"
      default: return "bg-muted"
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Password Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-base font-medium">
            Password to Check
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
          placeholder="Enter password to check..."
          autoComplete="off"
        />
      </section>

      {/* Results */}
      {analysis && (
        <section className="space-y-4">
          {/* Strength Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Strength</span>
              <span className={cn(
                "text-sm font-bold capitalize",
                analysis.strength === "very-strong" && "text-green-500",
                analysis.strength === "strong" && "text-green-500",
                analysis.strength === "moderate" && "text-yellow-500",
                analysis.strength === "weak" && "text-orange-500",
                analysis.strength === "very-weak" && "text-red-500"
              )}>
                {analysis.strength.replace("-", " ")}
              </span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className={cn("h-full transition-all", getStrengthColor(analysis.strength))}
                style={{ width: `${(analysis.score / analysis.maxScore) * 100}%` }}
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="size-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Entropy</span>
              </div>
              <p className="font-mono text-2xl font-bold">{analysis.entropy} bits</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="size-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Time to Crack</span>
              </div>
              <p className="font-mono text-lg font-bold">{analysis.crackTime}</p>
            </div>
          </div>

          {/* Character Types */}
          <div className="rounded-lg border bg-background p-4">
            <p className="text-sm font-medium mb-3">Character Types Used</p>
            <div className="grid grid-cols-4 gap-2">
              <div className={cn(
                "text-center p-2 rounded-lg",
                analysis.hasLower ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground"
              )}>
                <p className="font-mono text-lg font-bold">a-z</p>
                <p className="text-xs">Lowercase</p>
              </div>
              <div className={cn(
                "text-center p-2 rounded-lg",
                analysis.hasUpper ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground"
              )}>
                <p className="font-mono text-lg font-bold">A-Z</p>
                <p className="text-xs">Uppercase</p>
              </div>
              <div className={cn(
                "text-center p-2 rounded-lg",
                analysis.hasDigit ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground"
              )}>
                <p className="font-mono text-lg font-bold">0-9</p>
                <p className="text-xs">Numbers</p>
              </div>
              <div className={cn(
                "text-center p-2 rounded-lg",
                analysis.hasSymbol ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground"
              )}>
                <p className="font-mono text-lg font-bold">!@#</p>
                <p className="text-xs">Symbols</p>
              </div>
            </div>
          </div>

          {/* Issues */}
          {analysis.issues.length > 0 && (
            <div className="rounded-lg border bg-red-500/10 border-red-500/30 p-4">
              <p className="text-sm font-medium text-red-500 mb-2">Issues Found</p>
              <ul className="text-sm space-y-1">
                {analysis.issues.map((issue, idx) => (
                  <li key={idx} className="text-red-600">• {issue}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Suggestions */}
          {analysis.suggestions.length > 0 && (
            <div className="rounded-lg border bg-blue-500/10 border-blue-500/30 p-4">
              <p className="text-sm font-medium text-blue-500 mb-2">Suggestions</p>
              <ul className="text-sm space-y-1">
                {analysis.suggestions.map((suggestion, idx) => (
                  <li key={idx} className="text-blue-600">• {suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}
    </div>
  )
}
