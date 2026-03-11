"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PasswordRegexTester() {
  const [password, setPassword] = useState<string>("")
  const [regexPattern, setRegexPattern] = useState<string>("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$")
  const [copied, setCopied] = useState<string | null>(null)

  const testResult = useMemo(() => {
    if (!password || !regexPattern) return null

    try {
      const regex = new RegExp(regexPattern)
      const matches = regex.test(password)
      
      // Get match details
      const match = password.match(regex)
      
      return {
        matches,
        matchDetails: match ? match[0] : null,
        groups: match?.groups || null,
      }
    } catch (err) {
      return {
        matches: false,
        error: err instanceof Error ? err.message : "Invalid regex pattern",
      }
    }
  }, [password, regexPattern])

  const commonPatterns = useMemo(() => [
    {
      name: "Minimum 8 characters",
      pattern: "^.{8,}$",
      description: "At least 8 characters long",
    },
    {
      name: "Contains uppercase",
      pattern: "(?=.*[A-Z])",
      description: "At least one uppercase letter",
    },
    {
      name: "Contains lowercase",
      pattern: "(?=.*[a-z])",
      description: "At least one lowercase letter",
    },
    {
      name: "Contains number",
      pattern: "(?=.*\\d)",
      description: "At least one digit",
    },
    {
      name: "Contains special character",
      pattern: "(?=.*[!@#$%^&*(),.?\":{}|<>])",
      description: "At least one special character",
    },
    {
      name: "Strong password (8+ chars, mixed case, number)",
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$",
      description: "Common strong password requirement",
    },
    {
      name: "Very strong password",
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[a-zA-Z\\d!@#$%^&*]{12,}$",
      description: "12+ chars with all character types",
    },
    {
      name: "No consecutive repeats",
      pattern: "^(?!.*(.)\\1{2,})",
      description: "No character repeated 3+ times",
    },
  ], [])

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

  const loadPattern = useCallback((pattern: string) => {
    setRegexPattern(pattern)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Password Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-base font-medium">
            Password to Test
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
          placeholder="Enter password to test..."
          autoComplete="off"
        />
      </section>

      {/* Regex Pattern Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="regex" className="text-base font-medium">
            Regex Pattern
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => copyToClipboard(regexPattern, "regex")}
            className="h-7"
          >
            {copied === "regex" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            <span className="text-xs">Copy</span>
          </Button>
        </div>

        <div className="flex gap-2">
          <span className="flex items-center px-3 bg-muted rounded-l-lg font-mono">/</span>
          <Input
            id="regex"
            value={regexPattern}
            onChange={(e) => setRegexPattern(e.target.value)}
            className="font-mono rounded-none flex-1"
            placeholder="Enter regex pattern..."
          />
          <span className="flex items-center px-3 bg-muted rounded-r-lg font-mono">/</span>
        </div>
      </section>

      {/* Test Result */}
      {testResult && (
        <section className="space-y-3">
          <div className={cn(
            "rounded-lg border p-6 text-center",
            testResult.error 
              ? "bg-destructive/10 border-destructive/30"
              : testResult.matches 
              ? "bg-green-500/10 border-green-500/30"
              : "bg-red-500/10 border-red-500/30"
          )}>
            {testResult.error ? (
              <p className="text-destructive font-bold">Invalid Pattern</p>
            ) : testResult.matches ? (
              <p className="text-green-500 font-bold">✓ Password Matches Pattern</p>
            ) : (
              <p className="text-red-500 font-bold">✗ Password Does Not Match</p>
            )}
            
            {!testResult.error && testResult.matchDetails && (
              <p className="font-mono text-sm mt-2">Match: {testResult.matchDetails}</p>
            )}
            
            {testResult.error && (
              <p className="text-sm text-muted-foreground mt-2">{testResult.error}</p>
            )}
          </div>
        </section>
      )}

      {/* Common Patterns */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium">Common Password Patterns</h3>
        <div className="grid gap-2">
          {commonPatterns.map((item, idx) => (
            <div
              key={idx}
              className="rounded-lg border bg-background p-3 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => loadPattern(item.pattern)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
                  {item.pattern.length > 30 ? item.pattern.slice(0, 30) + "..." : item.pattern}
                </code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Regex Pattern Guide</h4>
            <p className="text-sm text-muted-foreground">
              Regular expressions (regex) are patterns used to match character combinations.
              Common password regex components:
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li><code className="bg-muted px-1 rounded">(?=.*[a-z])</code> - Positive lookahead for lowercase</li>
              <li><code className="bg-muted px-1 rounded">(?=.*[A-Z])</code> - Positive lookahead for uppercase</li>
              <li><code className="bg-muted px-1 rounded">(?=.*\d)</code> - Positive lookahead for digit</li>
              <li><code className="bg-muted px-1 rounded">.&#123;8,&#125;</code> - At least 8 characters</li>
              <li><code className="bg-muted px-1 rounded">^...$</code> - Match entire string</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
