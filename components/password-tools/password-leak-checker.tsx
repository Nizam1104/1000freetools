"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, Shield, AlertTriangle } from "lucide-react"

export function PasswordLeakChecker() {
  const [password, setPassword] = useState<string>("")
  const [checkResult, setCheckResult] = useState<{
    leaked: boolean
    count: number
    message: string
  } | null>(null)
  const [isChecking, setIsChecking] = useState<boolean>(false)
  const [copied, setCopied] = useState<string | null>(null)

  const checkPasswordLeak = useCallback(async () => {
    if (!password) return

    setIsChecking(true)
    setCheckResult(null)

    try {
      // Hash the password using SHA-1
      const encoder = new TextEncoder()
      const inputData = encoder.encode(password)
      const hashBuffer = await crypto.subtle.digest("SHA-1", inputData)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("").toUpperCase()

      // Use k-anonymity: send only first 5 characters
      const prefix = hashHex.substring(0, 5)
      const suffix = hashHex.substring(5)

      // Query Have I Been Pwned API
      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`)
      const responseData = await response.text()

      // Parse results
      const lines = responseData.split("\n")
      let foundCount = 0

      for (const line of lines) {
        const [hashSuffix, count] = line.trim().split(":")
        if (hashSuffix.toUpperCase() === suffix) {
          foundCount = parseInt(count) || 0
          break
        }
      }

      setCheckResult({
        leaked: foundCount > 0,
        count: foundCount,
        message: foundCount > 0
          ? `This password has been found in ${foundCount.toLocaleString()} known data breaches.`
          : "This password was not found in known data breaches.",
      })
    } catch (err) {
      setCheckResult({
        leaked: false,
        count: 0,
        message: "Unable to check password. Please try again later.",
      })
    } finally {
      setIsChecking(false)
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
    setCheckResult(null)
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-base font-medium">Password to Check</Label>
          <Button variant="ghost" size="xs" onClick={handleClear} className="h-7">
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password to check..."
        />
        <p className="text-xs text-muted-foreground">
          Your password is hashed locally and only the first 5 characters of the hash are sent to the API.
        </p>
      </section>

      {/* Check Button */}
      <Button onClick={checkPasswordLeak} disabled={!password || isChecking} className="w-full">
        <Shield className="size-4 mr-2" />
        {isChecking ? "Checking..." : "Check for Leaks"}
      </Button>

      {/* Result */}
      {checkResult && (
        <section className="space-y-3">
          <div className={cn(
            "rounded-lg border p-6 text-center",
            checkResult.leaked
              ? "border-destructive bg-destructive/10"
              : "border-green-500 bg-green-50 dark:bg-green-900/20"
          )}>
            <div className="flex items-center justify-center gap-2 mb-3">
              {checkResult.leaked ? (
                <AlertTriangle className="size-8 text-destructive" />
              ) : (
                <Shield className="size-8 text-green-600" />
              )}
            </div>
            <p className={cn(
              "text-lg font-semibold",
              checkResult.leaked ? "text-destructive" : "text-green-600"
            )}>
              {checkResult.leaked ? "Password Found in Breaches" : "Password Not Found"}
            </p>
            <p className="text-sm text-muted-foreground mt-2">{checkResult.message}</p>
            {checkResult.leaked && (
              <p className="text-sm text-destructive mt-2">
                We recommend changing this password immediately.
              </p>
            )}
          </div>

          {checkResult.leaked && (
            <div className="rounded-lg border bg-muted/30 p-4">
              <h4 className="font-medium mb-2">Recommendations:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Change this password on all accounts where you use it</li>
                <li>Use a unique password for each account</li>
                <li>Consider using a password manager</li>
                <li>Enable two-factor authentication where available</li>
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Leak Checking</h4>
            <p className="text-sm text-muted-foreground">
              This tool uses the Have I Been Pwned API to check if your password
              has appeared in known data breaches. The check uses k-anonymity
              to protect your privacy - only a partial hash is sent to the API.
              If your password is found, change it immediately on all accounts.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ")
}
