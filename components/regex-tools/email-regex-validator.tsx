"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { NativeSelect } from "@/components/ui/native-select"
import { Copy, Check, Trash2, Mail, CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmailValidationResult {
  email: string
  valid: boolean
  reason: string
  pattern: string
}

export default function RegexEmailValidator() {
  const [emails, setEmails] = useState<string>("")
  const [validationLevel, setValidationLevel] = useState<"basic" | "rfc" | "strict">("basic")
  const [copied, setCopied] = useState<string | null>(null)

  const patterns = useMemo(() => ({
    basic: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      description: "Basic format check (contains @ and domain)",
      name: "Basic",
    },
    rfc: {
      pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      description: "RFC 5322 compliant (allows special characters)",
      name: "RFC 5322",
    },
    strict: {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      description: "Strict format (alphanumeric + common special chars)",
      name: "Strict",
    },
  }), [])

  const validateEmail = useCallback((email: string, level: "basic" | "rfc" | "strict"): EmailValidationResult => {
    const trimmed = email.trim()
    
    if (!trimmed) {
      return { email: trimmed, valid: false, reason: "Empty email", pattern: patterns[level].name }
    }
    
    if (trimmed.length > 254) {
      return { email: trimmed, valid: false, reason: "Email too long (max 254 characters)", pattern: patterns[level].name }
    }
    
    const parts = trimmed.split("@")
    if (parts.length !== 2) {
      return { email: trimmed, valid: false, reason: "Must contain exactly one @", pattern: patterns[level].name }
    }
    
    const [local, domain] = parts
    
    if (!local) {
      return { email: trimmed, valid: false, reason: "Missing local part (before @)", pattern: patterns[level].name }
    }
    
    if (!domain) {
      return { email: trimmed, valid: false, reason: "Missing domain (after @)", pattern: patterns[level].name }
    }
    
    if (local.length > 64) {
      return { email: trimmed, valid: false, reason: "Local part too long (max 64 characters)", pattern: patterns[level].name }
    }
    
    if (!domain.includes(".")) {
      return { email: trimmed, valid: false, reason: "Domain must contain a dot", pattern: patterns[level].name }
    }
    
    const tld = domain.split(".").pop()
    if (!tld || tld.length < 2) {
      return { email: trimmed, valid: false, reason: "Invalid TLD", pattern: patterns[level].name }
    }
    
    const regex = patterns[level].pattern
    if (!regex.test(trimmed)) {
      return { email: trimmed, valid: false, reason: "Contains invalid characters", pattern: patterns[level].name }
    }
    
    return { email: trimmed, valid: true, reason: "Valid email format", pattern: patterns[level].name }
  }, [patterns])

  const results = useMemo(() => {
    const lines = emails.split(/[\n,;]/).map(e => e.trim()).filter(e => e)
    return lines.map(email => validateEmail(email, validationLevel))
  }, [emails, validationLevel, validateEmail])

  const stats = useMemo(() => {
    const valid = results.filter(r => r.valid).length
    const invalid = results.filter(r => !r.valid).length
    return { valid, invalid, total: results.length }
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

  const validEmails = useMemo(() => results.filter(r => r.valid).map(r => r.email).join("\n"), [results])
  const invalidEmails = useMemo(() => results.filter(r => !r.valid).map(r => r.email).join("\n"), [results])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Validation Level */}
      <section className="space-y-3">
        <Label htmlFor="validation-level" className="text-base font-medium">
          Validation Level
        </Label>
        <NativeSelect
          id="validation-level"
          value={validationLevel}
          onChange={(e) => setValidationLevel(e.target.value as "basic" | "rfc" | "strict")}
          className="w-full sm:w-72"
        >
          <option value="basic">Basic - Simple format check</option>
          <option value="rfc">RFC 5322 - Full specification</option>
          <option value="strict">Strict - Common format only</option>
        </NativeSelect>
        <p className="text-sm text-muted-foreground">
          {patterns[validationLevel].description}
        </p>
      </section>

      {/* Email Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="email-input" className="text-base font-medium">
            Email Addresses
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(emails, "input")}
              className="h-7"
              disabled={!emails}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setEmails("")}
              className="h-7"
              disabled={!emails}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>
        
        <Textarea
          id="email-input"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          className="font-mono text-sm min-h-[120px]"
          placeholder="Enter email addresses (one per line, or separated by comma/semicolon)..."
        />
        <p className="text-xs text-muted-foreground">
          Tip: You can paste a list of emails to validate them all at once
        </p>
      </section>

      {/* Statistics */}
      {stats.total > 0 && (
        <section className="grid grid-cols-3 gap-4">
          <div className="rounded-lg border bg-background p-4 text-center">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </div>
          <div className="rounded-lg border bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900 p-4 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.valid}</div>
            <div className="text-sm text-green-700 dark:text-green-300">Valid</div>
          </div>
          <div className="rounded-lg border bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900 p-4 text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.invalid}</div>
            <div className="text-sm text-red-700 dark:text-red-300">Invalid</div>
          </div>
        </section>
      )}

      {/* Results */}
      {results.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Validation Results</h3>
            <div className="flex gap-2">
              {validEmails && (
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => copyToClipboard(validEmails, "valid")}
                >
                  <CheckCircle2 className="size-3.5 mr-1 text-green-600" />
                  Copy Valid
                </Button>
              )}
              {invalidEmails && (
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => copyToClipboard(invalidEmails, "invalid")}
                >
                  <XCircle className="size-3.5 mr-1 text-red-600" />
                  Copy Invalid
                </Button>
              )}
            </div>
          </div>
          
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {results.map((result, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-3",
                  result.valid 
                    ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900" 
                    : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900"
                )}
              >
                {result.valid ? (
                  <CheckCircle2 className="size-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="size-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-sm break-all">{result.email}</div>
                  <div className={cn(
                    "text-xs mt-1",
                    result.valid ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"
                  )}>
                    {result.reason}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Pattern Info */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Pattern Details</h3>
        <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Mail className="size-4 text-muted-foreground" />
            <span className="text-sm font-medium">{patterns[validationLevel].name} Pattern</span>
          </div>
          <code className="block text-xs font-mono bg-background rounded p-2 break-all">
            {patterns[validationLevel].pattern.source}
          </code>
          <p className="text-xs text-muted-foreground">
            {patterns[validationLevel].description}
          </p>
        </div>
      </section>

      {/* Common Examples */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Test Examples</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { email: "user@example.com", valid: true, desc: "Standard format" },
            { email: "john.doe+tag@company.co.uk", valid: true, desc: "With + tag and subdomain" },
            { email: "invalid@", valid: false, desc: "Missing domain" },
            { email: "@example.com", valid: false, desc: "Missing local part" },
          ].map((example, idx) => (
            <button
              key={idx}
              onClick={() => setEmails(example.email)}
              className="text-left rounded-lg border bg-background p-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                {example.valid ? (
                  <CheckCircle2 className="size-4 text-green-600" />
                ) : (
                  <XCircle className="size-4 text-red-600" />
                )}
                <code className="text-xs font-mono">{example.email}</code>
              </div>
              <span className="text-xs text-muted-foreground">{example.desc}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
