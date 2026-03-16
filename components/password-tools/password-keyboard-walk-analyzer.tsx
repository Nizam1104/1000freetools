"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PasswordKeyboardWalkAnalyzer() {
  const [password, setPassword] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  // Keyboard layouts
  const keyboardRows = [
    "`1234567890-=",
    "qwertyuiop[]",
    "asdfghjkl;'",
    "zxcvbnm,./",
  ]

  const keyboardCols = [
    "`qaz",
    "1ws",
    "2ed",
    "3rf",
    "4tg",
    "5yh",
    "6uj",
    "7ik",
    "8ol",
    "9p;",
    "0['",
    "-]",
    "=\\",
  ]

  const analyzeKeyboardWalk = useCallback((pwd: string) => {
    if (!pwd) return null

    const lowerPwd = pwd.toLowerCase()
    const walks: { type: string; pattern: string; positions: number[]; length: number }[] = []

    // Check horizontal walks (rows)
    for (const row of keyboardRows) {
      for (let i = 0; i < row.length - 2; i++) {
        // Forward walk
        const forwardPattern = row.slice(i, i + 3)
        const forwardIndex = lowerPwd.indexOf(forwardPattern)
        if (forwardIndex !== -1) {
          walks.push({
            type: "horizontal",
            pattern: forwardPattern,
            positions: [forwardIndex, forwardIndex + 1, forwardIndex + 2],
            length: 3,
          })
        }

        // Backward walk
        const backwardPattern = row.slice(i, i + 3).split("").reverse().join("")
        const backwardIndex = lowerPwd.indexOf(backwardPattern)
        if (backwardIndex !== -1) {
          walks.push({
            type: "horizontal",
            pattern: backwardPattern,
            positions: [backwardIndex, backwardIndex + 1, backwardIndex + 2],
            length: 3,
          })
        }
      }
    }

    // Check vertical walks (columns)
    for (const col of keyboardCols) {
      if (col.length >= 3) {
        const forwardPattern = col.slice(0, 3)
        const forwardIndex = lowerPwd.indexOf(forwardPattern)
        if (forwardIndex !== -1) {
          walks.push({
            type: "vertical",
            pattern: forwardPattern,
            positions: [forwardIndex, forwardIndex + 1, forwardIndex + 2],
            length: 3,
          })
        }

        const backwardPattern = col.slice(0, 3).split("").reverse().join("")
        const backwardIndex = lowerPwd.indexOf(backwardPattern)
        if (backwardIndex !== -1) {
          walks.push({
            type: "vertical",
            pattern: backwardPattern,
            positions: [backwardIndex, backwardIndex + 1, backwardIndex + 2],
            length: 3,
          })
        }
      }
    }

    // Common keyboard patterns
    const commonPatterns = [
      "qwerty", "qwertz", "azerty", "asdf", "zxcv", "qazwsx",
      "1qaz", "2wsx", "3edc", "4rfv", "5tgb", "6yhn", "7ujm", "8ik",
      "qweasd", "asdzxc", "1234", "4321", "abcd", "dcba",
      "!@#$", "$#@!",
    ]

    for (const pattern of commonPatterns) {
      if (lowerPwd.includes(pattern)) {
        const index = lowerPwd.indexOf(pattern)
        walks.push({
          type: "common",
          pattern,
          positions: Array.from({ length: pattern.length }, (_, i) => index + i),
          length: pattern.length,
        })
      }
    }

    // Remove duplicates and sort by position
    const uniqueWalks = walks.filter(
      (walk, index, self) =>
        index === self.findIndex((w) => w.pattern === walk.pattern)
    )

    return {
      walks: uniqueWalks,
      hasWalks: uniqueWalks.length > 0,
      severity: uniqueWalks.length === 0 ? "none" : uniqueWalks.some(w => w.length >= 5) ? "high" : "medium",
    }
  }, [])

  const analysis = useMemo(() => analyzeKeyboardWalk(password), [password, analyzeKeyboardWalk])

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
          placeholder="Enter password to check for keyboard patterns..."
          autoComplete="off"
        />
      </section>

      {/* Results */}
      {analysis && (
        <section className="space-y-4">
          {/* Summary */}
          <div className={cn(
            "rounded-lg border p-4 text-center",
            analysis.severity === "high" && "bg-red-500/10 border-red-500/30",
            analysis.severity === "medium" && "bg-yellow-500/10 border-yellow-500/30",
            analysis.severity === "none" && "bg-green-500/10 border-green-500/30"
          )}>
            {analysis.hasWalks ? (
              <>
                <AlertTriangle className={cn(
                  "size-8 mx-auto mb-2",
                  analysis.severity === "high" ? "text-red-500" : "text-yellow-500"
                )} />
                <p className={cn(
                  "font-bold",
                  analysis.severity === "high" ? "text-red-500" : "text-yellow-500"
                )}>
                  Keyboard Pattern Detected!
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  This password contains easy-to-guess keyboard walks
                </p>
              </>
            ) : (
              <>
                <p className="text-green-500 font-bold">No Keyboard Patterns Found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Good! This password doesn't contain obvious keyboard walks
                </p>
              </>
            )}
          </div>

          {/* Detected Walks */}
          {analysis.walks.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Detected Patterns</h3>
              {analysis.walks.map((walk, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border bg-background p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full font-medium",
                        walk.type === "horizontal" && "bg-blue-500/10 text-blue-500",
                        walk.type === "vertical" && "bg-purple-500/10 text-purple-500",
                        walk.type === "common" && "bg-red-500/10 text-red-500"
                      )}>
                        {walk.type}
                      </span>
                      <span className="font-mono font-bold">{walk.pattern}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{walk.length} characters</span>
                  </div>
                  
                  {/* Visual representation */}
                  <div className="flex gap-1 font-mono">
                    {password.split("").map((char, charIdx) => {
                      const isInPattern = walk.positions.includes(charIdx)
                      return (
                        <span
                          key={charIdx}
                          className={cn(
                            "w-8 h-8 rounded flex items-center justify-center",
                            isInPattern
                              ? "bg-red-500 text-white"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {char}
                        </span>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Suggestions */}
          {analysis.hasWalks && (
            <div className="rounded-lg border bg-blue-500/10 border-blue-500/30 p-4">
              <p className="text-sm font-medium text-blue-500 mb-2">Suggestions</p>
              <ul className="text-sm text-blue-600 list-disc list-inside space-y-1">
                <li>Avoid sequential keyboard patterns like "qwerty" or "asdf"</li>
                <li>Use a password generator for truly random passwords</li>
                <li>Consider using a passphrase with random words instead</li>
                <li>Mix characters from different keyboard areas</li>
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Keyboard Reference */}
      <section className="rounded-lg border bg-background p-4">
        <p className="text-sm font-medium mb-3">Common Keyboard Walks to Avoid</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm font-mono">
          {["qwerty", "asdf", "zxcv", "qazwsx", "1qaz2wsx", "qweasd", "1234", "abcd"].map((pattern) => (
            <div key={pattern} className="bg-muted px-2 py-1 rounded text-center">
              {pattern}
            </div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Keyboard Walk Patterns</h4>
            <p className="text-sm text-muted-foreground">
              Keyboard walks are passwords formed by typing adjacent keys on a keyboard,
              like "qwerty", "asdf", or "1234". These patterns are extremely common and
              are among the first guesses in password cracking attempts.
            </p>
            <p className="text-sm text-muted-foreground">
              This analyzer detects horizontal, vertical, and common keyboard patterns
              to help you create stronger, less predictable passwords.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
