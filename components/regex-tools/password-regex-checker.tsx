"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Eye, EyeOff, Shield, ShieldAlert, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

interface PasswordStrengthResult {
  password: string
  score: number
  strength: "very-weak" | "weak" | "fair" | "strong" | "very-strong"
  checks: {
    minLength8: boolean
    minLength12: boolean
    hasUppercase: boolean
    hasLowercase: boolean
    hasNumber: boolean
    hasSpecial: boolean
    noCommonPatterns: boolean
  }
  suggestions: string[]
}

export default function PasswordStrengthChecker() {
  const [passwords, setPasswords] = useState<string>("")
  const [showPasswords, setShowPasswords] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  
  const [customRequirements, setCustomRequirements] = useState({
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecial: true,
    customPattern: "",
  })

  const commonPatterns = useMemo(() => [
    /123|234|345|456|567|678|789|890/i,
    /abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i,
    /password|qwerty|123456|12345678|123456789|111111|000000/i,
    /(.)\1{2,}/, // Repeated characters
  ], [])

  const checkPasswordStrength = useCallback((password: string): PasswordStrengthResult => {
    const checks = {
      minLength8: password.length >= 8,
      minLength12: password.length >= 12,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\;'`~]/.test(password),
      noCommonPatterns: !commonPatterns.some(p => p.test(password)),
    }
    
    // Calculate score (0-100)
    let score = 0
    if (checks.minLength8) score += 10
    if (checks.minLength12) score += 10
    if (checks.hasUppercase) score += 15
    if (checks.hasLowercase) score += 15
    if (checks.hasNumber) score += 15
    if (checks.hasSpecial) score += 15
    if (checks.noCommonPatterns) score += 20
    
    // Length bonus
    if (password.length >= 16) score += 10
    if (password.length >= 20) score += 10
    
    // Determine strength
    let strength: PasswordStrengthResult["strength"] = "very-weak"
    if (score >= 80) strength = "very-strong"
    else if (score >= 60) strength = "strong"
    else if (score >= 40) strength = "fair"
    else if (score >= 20) strength = "weak"
    
    // Generate suggestions
    const suggestions: string[] = []
    if (!checks.minLength12) suggestions.push("Use at least 12 characters for better security")
    if (!checks.hasUppercase) suggestions.push("Add uppercase letters (A-Z)")
    if (!checks.hasLowercase) suggestions.push("Add lowercase letters (a-z)")
    if (!checks.hasNumber) suggestions.push("Add numbers (0-9)")
    if (!checks.hasSpecial) suggestions.push("Add special characters (!@#$%^&*)")
    if (!checks.noCommonPatterns) suggestions.push("Avoid common patterns and sequences")
    
    return {
      password,
      score: Math.min(100, score),
      strength,
      checks,
      suggestions,
    }
  }, [commonPatterns])

  const results = useMemo(() => {
    const lines = passwords.split("\n").map(p => p.trim()).filter(p => p)
    return lines.map(password => checkPasswordStrength(password))
  }, [passwords, checkPasswordStrength])

  const stats = useMemo(() => {
    if (results.length === 0) return { avgScore: 0, strongest: 0, weakest: 0 }
    const scores = results.map(r => r.score)
    return {
      avgScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      strongest: Math.max(...scores),
      weakest: Math.min(...scores),
    }
  }, [results])

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
      case "very-weak": return "bg-red-500"
      case "weak": return "bg-orange-500"
      case "fair": return "bg-yellow-500"
      case "strong": return "bg-lime-500"
      case "very-strong": return "bg-green-500"
      default: return "bg-gray-300"
    }
  }

  const getStrengthIcon = (strength: string) => {
    switch (strength) {
      case "very-weak": return <ShieldAlert className="size-5 text-red-500" />
      case "weak": return <ShieldAlert className="size-5 text-orange-500" />
      case "fair": return <Shield className="size-5 text-yellow-500" />
      case "strong": return <ShieldCheck className="size-5 text-lime-500" />
      case "very-strong": return <ShieldCheck className="size-5 text-green-500" />
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Password Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="password-input" className="text-base font-medium">
            Passwords
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setShowPasswords(!showPasswords)}
              className="h-7"
            >
              {showPasswords ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
              <span className="text-xs">{showPasswords ? "Hide" : "Show"}</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(passwords, "input")}
              className="h-7"
              disabled={!passwords}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setPasswords("")}
              className="h-7"
              disabled={!passwords}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>
        
        <Textarea
          id="password-input"
          value={passwords}
          onChange={(e) => setPasswords(e.target.value)}
          className={cn(
            "font-mono text-sm min-h-[100px]",
            !showPasswords && "blur-sm focus:blur-none transition-all"
          )}
          placeholder="Enter passwords to test (one per line)..."
        />
        <p className="text-xs text-muted-foreground">
          Enter passwords to analyze their strength. Passwords are processed locally and never sent to any server.
        </p>
      </section>

      {/* Statistics */}
      {results.length > 0 && (
        <section className="grid grid-cols-3 gap-4">
          <div className="rounded-lg border bg-background p-4 text-center">
            <div className="text-2xl font-bold">{results.length}</div>
            <div className="text-sm text-muted-foreground">Passwords</div>
          </div>
          <div className="rounded-lg border bg-background p-4 text-center">
            <div className={cn(
              "text-2xl font-bold",
              stats.avgScore >= 80 ? "text-green-600" : stats.avgScore >= 60 ? "text-lime-600" : stats.avgScore >= 40 ? "text-yellow-600" : "text-red-600"
            )}>{stats.avgScore}%</div>
            <div className="text-sm text-muted-foreground">Avg Score</div>
          </div>
          <div className="rounded-lg border bg-background p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.strongest}%</div>
            <div className="text-sm text-muted-foreground">Strongest</div>
          </div>
        </section>
      )}

      {/* Results */}
      {results.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-base font-semibold">Strength Analysis</h3>
          
          <div className="space-y-3">
            {results.map((result, idx) => (
              <div
                key={idx}
                className="rounded-lg border bg-background p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStrengthIcon(result.strength)}
                    <div>
                      <div className="font-mono text-sm">
                        {showPasswords ? result.password : "•".repeat(Math.min(result.password.length, 20))}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {result.password.length} characters
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={cn(
                      "text-2xl font-bold",
                      result.score >= 80 ? "text-green-600" : result.score >= 60 ? "text-lime-600" : result.score >= 40 ? "text-yellow-600" : "text-red-600"
                    )}>{result.score}%</div>
                    <div className="text-xs text-muted-foreground capitalize">{result.strength.replace("-", " ")}</div>
                  </div>
                </div>
                
                <Progress value={result.score} className="h-2" />
                
                {/* Checks */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { key: "minLength8", label: "8+ chars" },
                    { key: "minLength12", label: "12+ chars" },
                    { key: "hasUppercase", label: "Uppercase" },
                    { key: "hasLowercase", label: "Lowercase" },
                    { key: "hasNumber", label: "Numbers" },
                    { key: "hasSpecial", label: "Special" },
                    { key: "noCommonPatterns", label: "No patterns" },
                  ].map((check) => (
                    <div
                      key={check.key}
                      className={cn(
                        "flex items-center gap-2 text-xs rounded px-2 py-1",
                        result.checks[check.key as keyof typeof result.checks]
                          ? "bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-300"
                          : "bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-300"
                      )}
                    >
                      {result.checks[check.key as keyof typeof result.checks] ? (
                        <CheckCircle2 className="size-3" />
                      ) : (
                        <XCircle className="size-3" />
                      )}
                      {check.label}
                    </div>
                  ))}
                </div>
                
                {/* Suggestions */}
                {result.suggestions.length > 0 && (
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-muted-foreground">Suggestions:</div>
                    <ul className="text-xs text-muted-foreground list-disc list-inside space-y-0.5">
                      {result.suggestions.map((suggestion, i) => (
                        <li key={i}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Requirements Reference */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Password Requirements Reference</h3>
        <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { level: "Very Weak", score: "0-19", desc: "Easily crackable" },
              { level: "Weak", score: "20-39", desc: "Could be cracked quickly" },
              { level: "Fair", score: "40-59", desc: "Moderate protection" },
              { level: "Strong", score: "60-79", desc: "Good protection" },
              { level: "Very Strong", score: "80-100", desc: "Excellent protection" },
            ].map((item) => (
              <div key={item.level} className="flex items-center gap-3">
                <div className={cn(
                  "w-3 h-3 rounded-full",
                  item.score.includes("0-19") ? "bg-red-500" :
                  item.score.includes("20-39") ? "bg-orange-500" :
                  item.score.includes("40-59") ? "bg-yellow-500" :
                  item.score.includes("60-79") ? "bg-lime-500" : "bg-green-500"
                )} />
                <div>
                  <div className="text-sm font-medium">{item.level}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

const XCircle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
)
