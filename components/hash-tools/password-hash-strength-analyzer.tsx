"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, Shield, ShieldAlert, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface HashAnalysis {
  algorithm: string
  bitLength: number
  strength: "strong" | "moderate" | "weak" | "broken"
  issues: string[]
  recommendations: string[]
}

export default function PasswordHashStrengthAnalyzer() {
  const [hashInput, setHashInput] = useState<string>("")
  const [passwordInput, setPasswordInput] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const analyzeHash = useMemo((): HashAnalysis | null => {
    const hash = hashInput.trim()
    if (!hash) return null

    const length = hash.replace(/[^a-fA-F0-9]/g, "").length

    // Detect algorithm based on length and format
    if (/^\$2[aby]\$/.test(hash)) {
      return {
        algorithm: "bcrypt",
        bitLength: 184,
        strength: "strong",
        issues: [],
        recommendations: ["Ensure cost factor is at least 12 for new applications"],
      }
    }

    if (/^\$argon2/.test(hash)) {
      return {
        algorithm: "Argon2",
        bitLength: 256,
        strength: "strong",
        issues: [],
        recommendations: ["Use Argon2id variant for best security"],
      }
    }

    if (/^\$7\$/.test(hash)) {
      return {
        algorithm: "scrypt",
        bitLength: 512,
        strength: "strong",
        issues: [],
        recommendations: ["Ensure N parameter is at least 2^14"],
      }
    }

    if (length === 64) {
      return {
        algorithm: "SHA-256",
        bitLength: 256,
        strength: "moderate",
        issues: ["Not designed for password hashing", "Too fast - vulnerable to brute force", "Should use with salt and key stretching"],
        recommendations: ["Use bcrypt, Argon2, or scrypt instead", "Add salt and use PBKDF2 if SHA-256 is required"],
      }
    }

    if (length === 128) {
      return {
        algorithm: "SHA-512",
        bitLength: 512,
        strength: "moderate",
        issues: ["Not designed for password hashing", "Too fast - vulnerable to brute force", "Should use with salt and key stretching"],
        recommendations: ["Use bcrypt, Argon2, or scrypt instead"],
      }
    }

    if (length === 32) {
      return {
        algorithm: "MD5",
        bitLength: 128,
        strength: "broken",
        issues: ["Cryptographically broken", "Vulnerable to collision attacks", "Can be cracked instantly", "Never use for passwords"],
        recommendations: ["Migrate to bcrypt or Argon2 immediately", "Never use MD5 for security purposes"],
      }
    }

    if (length === 40) {
      return {
        algorithm: "SHA-1",
        bitLength: 160,
        strength: "broken",
        issues: ["Cryptographically broken", "Collision attacks demonstrated", "Deprecated by NIST", "Never use for passwords"],
        recommendations: ["Migrate to SHA-256 or better", "Use bcrypt or Argon2 for passwords"],
      }
    }

    return {
      algorithm: "Unknown",
      bitLength: length * 4,
      strength: "weak",
      issues: ["Unable to identify hash algorithm", "May use custom or obscure algorithm"],
      recommendations: ["Verify the hash algorithm used", "Consider using standard algorithms like bcrypt or Argon2"],
    }
  }, [hashInput])

  const analyzePassword = useMemo(() => {
    const password = passwordInput
    if (!password) return null

    const issues: string[] = []
    const score = { length: 0, variety: 0, patterns: 0 }

    // Length check
    if (password.length < 8) {
      issues.push("Too short (minimum 8 characters)")
      score.length = 0
    } else if (password.length < 12) {
      score.length = 1
    } else if (password.length < 16) {
      score.length = 2
    } else {
      score.length = 3
    }

    // Character variety
    const hasLower = /[a-z]/.test(password)
    const hasUpper = /[A-Z]/.test(password)
    const hasDigit = /\d/.test(password)
    const hasSymbol = /[^a-zA-Z0-9]/.test(password)

    const varietyCount = [hasLower, hasUpper, hasDigit, hasSymbol].filter(Boolean).length
    score.variety = varietyCount

    if (varietyCount < 3) {
      issues.push("Limited character variety")
    }

    // Common patterns
    const commonPatterns = [
      { pattern: /^(123|abc|qwerty|password|admin)/i, name: "Common prefix" },
      { pattern: /(123|abc|qwerty)$/i, name: "Common suffix" },
      { pattern: /(.)\1{2,}/, name: "Repeated characters" },
      { pattern: /(123456|qwerty|password|123456789|12345678|12345|1234567|1234567890)/i, name: "Common password" },
      { pattern: /^[a-z]+$/i, name: "Only lowercase letters" },
      { pattern: /^[A-Z]+$/, name: "Only uppercase letters" },
      { pattern: /^\d+$/, name: "Only numbers" },
    ]

    for (const { pattern, name } of commonPatterns) {
      if (pattern.test(password)) {
        issues.push(name)
      }
    }

    // Keyboard patterns
    const keyboardPatterns = ["qwerty", "asdf", "zxcv", "1234", "qazwsx"]
    for (const kp of keyboardPatterns) {
      if (password.toLowerCase().includes(kp)) {
        issues.push("Keyboard pattern detected")
        break
      }
    }

    // Calculate strength
    const totalScore = score.length + score.variety - (issues.length > 3 ? 3 : issues.length)
    let strength: "very-weak" | "weak" | "moderate" | "strong" | "very-strong"

    if (totalScore <= 1) strength = "very-weak"
    else if (totalScore <= 3) strength = "weak"
    else if (totalScore <= 5) strength = "moderate"
    else if (totalScore <= 7) strength = "strong"
    else strength = "very-strong"

    return {
      strength,
      issues,
      score: totalScore,
      maxScore: 10,
    }
  }, [passwordInput])

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
    setHashInput("")
    setPasswordInput("")
  }, [])

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "strong": return "text-green-500"
      case "moderate": return "text-yellow-500"
      case "weak": return "text-orange-500"
      case "broken": return "text-red-500"
      default: return "text-muted-foreground"
    }
  }

  const getPasswordStrengthColor = (strength: string) => {
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
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Hash Analysis Section */}
      <section className="space-y-3">
        <h3 className="text-base font-medium">Hash Algorithm Analysis</h3>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="hash-input" className="text-sm font-medium">
            Hash to Analyze
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => copyToClipboard(hashInput, "hash-input")}
            className="h-7"
            disabled={!hashInput}
          >
            {copied === "hash-input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            <span className="text-xs">Copy</span>
          </Button>
        </div>

        <Textarea
          id="hash-input"
          value={hashInput}
          onChange={(e) => setHashInput(e.target.value)}
          className="font-mono text-sm min-h-[80px]"
          placeholder="Paste hash to analyze..."
        />

        {analyzeHash && (
          <div className={cn(
            "rounded-lg border p-4",
            analyzeHash.strength === "strong" && "bg-green-500/10 border-green-500/30",
            analyzeHash.strength === "moderate" && "bg-yellow-500/10 border-yellow-500/30",
            analyzeHash.strength === "weak" && "bg-orange-500/10 border-orange-500/30",
            analyzeHash.strength === "broken" && "bg-red-500/10 border-red-500/30"
          )}>
            <div className="flex items-center gap-2 mb-3">
              {analyzeHash.strength === "strong" && <ShieldCheck className="size-5 text-green-500" />}
              {analyzeHash.strength === "moderate" && <Shield className="size-5 text-yellow-500" />}
              {(analyzeHash.strength === "weak" || analyzeHash.strength === "broken") && <ShieldAlert className="size-5 text-red-500" />}
              <span className={cn("font-bold", getStrengthColor(analyzeHash.strength))}>
                {analyzeHash.algorithm} - {analyzeHash.strength.toUpperCase()}
              </span>
            </div>
            
            <p className="text-sm mb-3">{analyzeHash.bitLength}-bit hash</p>
            
            {analyzeHash.issues.length > 0 && (
              <div className="mb-3">
                <p className="text-sm font-medium mb-1">Issues:</p>
                <ul className="text-sm list-disc list-inside space-y-1">
                  {analyzeHash.issues.map((issue, idx) => (
                    <li key={idx} className="text-destructive">{issue}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {analyzeHash.recommendations.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-1">Recommendations:</p>
                <ul className="text-sm list-disc list-inside space-y-1">
                  {analyzeHash.recommendations.map((rec, idx) => (
                    <li key={idx} className="text-muted-foreground">{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Password Strength Section */}
      <section className="space-y-3">
        <h3 className="text-base font-medium">Password Strength Analysis</h3>
        
        <div className="space-y-3">
          <Label htmlFor="password-input" className="text-sm font-medium">
            Password to Test
          </Label>
          <Input
            id="password-input"
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="font-mono"
            placeholder="Enter password to analyze..."
          />

          {analyzePassword && (
            <div className="space-y-3">
              {/* Strength Bar */}
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn("h-full transition-all", getPasswordStrengthColor(analyzePassword.strength))}
                  style={{ width: `${(analyzePassword.score / analyzePassword.maxScore) * 100}%` }}
                />
              </div>
              
              <div className={cn(
                "rounded-lg border p-4",
                analyzePassword.strength === "very-strong" && "bg-green-500/10 border-green-500/30",
                analyzePassword.strength === "strong" && "bg-green-500/10 border-green-500/30",
                analyzePassword.strength === "moderate" && "bg-yellow-500/10 border-yellow-500/30",
                analyzePassword.strength === "weak" && "bg-orange-500/10 border-orange-500/30",
                analyzePassword.strength === "very-weak" && "bg-red-500/10 border-red-500/30"
              )}>
                <p className={cn(
                  "font-bold capitalize",
                  analyzePassword.strength === "very-strong" && "text-green-500",
                  analyzePassword.strength === "strong" && "text-green-500",
                  analyzePassword.strength === "moderate" && "text-yellow-500",
                  analyzePassword.strength === "weak" && "text-orange-500",
                  analyzePassword.strength === "very-weak" && "text-red-500"
                )}>
                  {analyzePassword.strength.replace("-", " ")} Password
                </p>
                
                {analyzePassword.issues.length > 0 && (
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    {analyzePassword.issues.map((issue, idx) => (
                      <li key={idx} className="text-muted-foreground">{issue}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Password Hash Security</h4>
            <p className="text-sm text-muted-foreground">
              Not all hash algorithms are suitable for password storage. Fast hashes like MD5 and SHA-256
              are vulnerable to brute-force attacks. Use specialized password hashing algorithms like
              bcrypt, Argon2, or scrypt that are intentionally slow and memory-hard.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
