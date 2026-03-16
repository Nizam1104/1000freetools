"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { NativeSelect } from "@/components/ui/native-select"
import { Copy, Check, Trash2, Phone, CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface PhoneValidationResult {
  phone: string
  valid: boolean
  country: string
  formatted: string
  reason: string
}

export default function PhoneNumberValidator() {
  const [phones, setPhones] = useState<string>("")
  const [country, setCountry] = useState<"all" | "us" | "uk" | "international">("all")
  const [copied, setCopied] = useState<string | null>(null)

  const patterns = useMemo(() => ({
    us: {
      pattern: /^(\+1)?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
      format: (phone: string) => {
        const digits = phone.replace(/\D/g, "")
        if (digits.length === 10) {
          return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
        } else if (digits.length === 11 && digits[0] === "1") {
          return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
        }
        return phone
      },
      name: "US/Canada",
    },
    uk: {
      pattern: /^(\+44)?[-.\s]?\(?\d{2,5}\)?[-.\s]?\d{3,4}[-.\s]?\d{4}$/,
      format: (phone: string) => {
        const digits = phone.replace(/\D/g, "")
        if (digits.startsWith("44")) {
          return `+44 ${digits.slice(2, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`
        }
        return phone
      },
      name: "UK",
    },
    international: {
      pattern: /^\+?[\d\s().-]{8,20}$/,
      format: (phone: string) => phone,
      name: "International",
    },
  }), [])

  const validatePhone = useCallback((phone: string, selectedCountry: "all" | "us" | "uk" | "international"): PhoneValidationResult => {
    const trimmed = phone.trim()
    
    if (!trimmed) {
      return { phone: trimmed, valid: false, country: "Unknown", formatted: "", reason: "Empty phone number" }
    }
    
    const digits = trimmed.replace(/\D/g, "")
    
    if (digits.length < 8) {
      return { phone: trimmed, valid: false, country: "Unknown", formatted: "", reason: "Too few digits" }
    }
    
    if (digits.length > 15) {
      return { phone: trimmed, valid: false, country: "Unknown", formatted: "", reason: "Too many digits (max 15)" }
    }
    
    if (selectedCountry === "us" || selectedCountry === "all") {
      if (patterns.us.pattern.test(trimmed) && (digits.length === 10 || (digits.length === 11 && digits[0] === "1"))) {
        return { 
          phone: trimmed, 
          valid: true, 
          country: "US/Canada", 
          formatted: patterns.us.format(trimmed),
          reason: "Valid US/Canada format" 
        }
      }
    }
    
    if (selectedCountry === "uk" || selectedCountry === "all") {
      if (patterns.uk.pattern.test(trimmed) && (digits.length >= 10 && digits.length <= 13)) {
        return { 
          phone: trimmed, 
          valid: true, 
          country: "UK", 
          formatted: patterns.uk.format(trimmed),
          reason: "Valid UK format" 
        }
      }
    }
    
    if (selectedCountry === "international" || selectedCountry === "all") {
      if (patterns.international.pattern.test(trimmed)) {
        return { 
          phone: trimmed, 
          valid: true, 
          country: "International", 
          formatted: trimmed,
          reason: "Valid international format" 
        }
      }
    }
    
    return { phone: trimmed, valid: false, country: "Unknown", formatted: "", reason: "Invalid format" }
  }, [patterns])

  const results = useMemo(() => {
    const lines = phones.split(/[\n,;]/).map(p => p.trim()).filter(p => p)
    return lines.map(phone => validatePhone(phone, country))
  }, [phones, country, validatePhone])

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

  const validPhones = useMemo(() => results.filter(r => r.valid).map(r => r.formatted).join("\n"), [results])
  const invalidPhones = useMemo(() => results.filter(r => !r.valid).map(r => r.phone).join("\n"), [results])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Country Selection */}
      <section className="space-y-3">
        <Label htmlFor="country-select" className="text-base font-medium">
          Phone Number Format
        </Label>
        <NativeSelect
          id="country-select"
          value={country}
          onChange={(e) => setCountry(e.target.value as "all" | "us" | "uk" | "international")}
          className="w-full sm:w-72"
        >
          <option value="all">All Countries - International</option>
          <option value="us">United States & Canada</option>
          <option value="uk">United Kingdom</option>
          <option value="international">International Format</option>
        </NativeSelect>
      </section>

      {/* Phone Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="phone-input" className="text-base font-medium">
            Phone Numbers
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(phones, "input")}
              className="h-7"
              disabled={!phones}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setPhones("")}
              className="h-7"
              disabled={!phones}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>
        
        <Textarea
          id="phone-input"
          value={phones}
          onChange={(e) => setPhones(e.target.value)}
          className="font-mono text-sm min-h-[120px]"
          placeholder="Enter phone numbers (one per line, or separated by comma/semicolon)..."
        />
        <p className="text-xs text-muted-foreground">
          Tip: You can paste a list of phone numbers to validate them all at once
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
              {validPhones && (
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => copyToClipboard(validPhones, "valid")}
                >
                  <CheckCircle2 className="size-3.5 mr-1 text-green-600" />
                  Copy Valid
                </Button>
              )}
              {invalidPhones && (
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => copyToClipboard(invalidPhones, "invalid")}
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
                  <div className="font-mono text-sm break-all">{result.phone}</div>
                  {result.valid && result.formatted && (
                    <div className="text-sm mt-1">
                      <span className="text-muted-foreground">Formatted: </span>
                      <span className="font-medium">{result.formatted}</span>
                    </div>
                  )}
                  <div className={cn(
                    "text-xs mt-1",
                    result.valid ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"
                  )}>
                    {result.country} - {result.reason}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Format Examples */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Format Examples</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { phone: "+1 (555) 123-4567", country: "US", valid: true },
            { phone: "555-123-4567", country: "US", valid: true },
            { phone: "+44 20 7946 0958", country: "UK", valid: true },
            { phone: "12345", country: "Invalid", valid: false },
          ].map((example, idx) => (
            <button
              key={idx}
              onClick={() => setPhones(example.phone)}
              className="text-left rounded-lg border bg-background p-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                {example.valid ? (
                  <CheckCircle2 className="size-4 text-green-600" />
                ) : (
                  <XCircle className="size-4 text-red-600" />
                )}
                <code className="text-xs font-mono">{example.phone}</code>
              </div>
              <span className="text-xs text-muted-foreground">{example.country} format</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
