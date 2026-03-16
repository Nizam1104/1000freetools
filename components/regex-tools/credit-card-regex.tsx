"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, CheckCircle2, XCircle, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"

interface CardValidationResult {
  number: string
  valid: boolean
  type: string
  reason: string
}

export default function CreditCardValidator() {
  const [cards, setCards] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const cardPatterns = useMemo(() => [
    { name: "Visa", pattern: /^4[0-9]{12}(?:[0-9]{3})?$/ },
    { name: "MasterCard", pattern: /^5[1-5][0-9]{14}$|^2(22[1-9]|2[3-9][0-9]|[3-6][0-9]{2}|7[0-1][0-9]|720)[0-9]{12}$/ },
    { name: "American Express", pattern: /^3[47][0-9]{13}$/ },
    { name: "Discover", pattern: /^6(?:011|5[0-9]{2})[0-9]{12}$/ },
    { name: "JCB", pattern: /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/ },
    { name: "Diners Club", pattern: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/ },
  ], [])

  const luhnCheck = useCallback((cardNumber: string): boolean => {
    const digits = cardNumber.replace(/\D/g, "")
    let sum = 0
    let isEven = false
    
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i], 10)
      
      if (isEven) {
        digit *= 2
        if (digit > 9) {
          digit -= 9
        }
      }
      
      sum += digit
      isEven = !isEven
    }
    
    return sum % 10 === 0
  }, [])

  const validateCard = useCallback((cardNumber: string): CardValidationResult => {
    const cleaned = cardNumber.replace(/[\s-]/g, "")
    
    if (!cleaned) {
      return { number: cleaned, valid: false, type: "", reason: "Empty card number" }
    }
    
    if (!/^\d+$/.test(cleaned)) {
      return { number: cleaned, valid: false, type: "", reason: "Contains non-numeric characters" }
    }
    
    if (cleaned.length < 13 || cleaned.length > 19) {
      return { number: cleaned, valid: false, type: "", reason: "Invalid length (expected 13-19 digits)" }
    }
    
    // Check card type
    let cardType = "Unknown"
    for (const card of cardPatterns) {
      if (card.pattern.test(cleaned)) {
        cardType = card.name
        break
      }
    }
    
    // Luhn algorithm check
    if (!luhnCheck(cleaned)) {
      return { 
        number: cleaned, 
        valid: false, 
        type: cardType !== "Unknown" ? cardType : "", 
        reason: "Failed Luhn algorithm check (invalid checksum)" 
      }
    }
    
    return {
      number: cleaned,
      valid: true,
      type: cardType,
      reason: "Valid card number",
    }
  }, [cardPatterns, luhnCheck])

  const results = useMemo(() => {
    const lines = cards.split(/[\n,;]/).map(c => c.trim()).filter(c => c)
    return lines.map(card => validateCard(card))
  }, [cards, validateCard])

  const stats = useMemo(() => {
    const valid = results.filter(r => r.valid).length
    const invalid = results.filter(r => !r.valid).length
    const types = results.filter(r => r.valid && r.type).reduce((acc, r) => {
      acc[r.type] = (acc[r.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    return { valid, invalid, types, total: results.length }
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

  const validCards = useMemo(() => results.filter(r => r.valid).map(r => r.number).join("\n"), [results])
  const invalidCards = useMemo(() => results.filter(r => !r.valid).map(r => r.number).join("\n"), [results])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Card Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="card-input" className="text-base font-medium">
            Card Numbers
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(cards, "input")}
              className="h-7"
              disabled={!cards}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setCards("")}
              className="h-7"
              disabled={!cards}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>
        
        <Textarea
          id="card-input"
          value={cards}
          onChange={(e) => setCards(e.target.value)}
          className="font-mono text-sm min-h-[120px]"
          placeholder="Enter card numbers (one per line, or separated by comma/semicolon)..."
        />
        <p className="text-xs text-muted-foreground">
          Validates format and Luhn checksum. Supports Visa, MasterCard, Amex, Discover, JCB, and Diners Club.
        </p>
      </section>

      {/* Statistics */}
      {stats.total > 0 && (
        <section className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border bg-background p-4 text-center">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
            <div className="rounded-lg border bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900 p-4 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.valid}</div>
              <div className="text-sm text-green-700 dark:text-green-300">Valid</div>
            </div>
          </div>
          
          {Object.keys(stats.types).length > 0 && (
            <div className="rounded-lg border bg-background p-4">
              <div className="text-sm font-medium mb-3">Card Types</div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(stats.types).map(([type, count]) => (
                  <div
                    key={type}
                    className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 px-3 py-1"
                  >
                    <CreditCard className="size-3 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{type}</span>
                    <span className="text-xs text-blue-600 dark:text-blue-400">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Results */}
      {results.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Validation Results</h3>
            <div className="flex gap-2">
              {validCards && (
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => copyToClipboard(validCards, "valid")}
                >
                  <CheckCircle2 className="size-3.5 mr-1 text-green-600" />
                  Copy Valid
                </Button>
              )}
              {invalidCards && (
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => copyToClipboard(invalidCards, "invalid")}
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
                  <div className="font-mono text-sm break-all">
                    {result.number.slice(0, 4)} •••• •••• {result.number.slice(-4)}
                  </div>
                  {result.valid && result.type && (
                    <div className="mt-1">
                      <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-0.5 text-xs font-medium">
                        {result.type}
                      </span>
                    </div>
                  )}
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

      {/* Test Cards */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Test Card Numbers</h3>
        <p className="text-xs text-muted-foreground">
          These are test card numbers used for development. They pass the Luhn check but are not real cards.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { number: "4532015112830366", type: "Visa", valid: true },
            { number: "5425233430109903", type: "MasterCard", valid: true },
            { number: "374245455400126", type: "American Express", valid: true },
            { number: "6011000990139424", type: "Discover", valid: true },
            { number: "1234567890123456", type: "Invalid", valid: false },
          ].map((example, idx) => (
            <button
              key={idx}
              onClick={() => setCards(example.number)}
              className="text-left rounded-lg border bg-background p-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                {example.valid ? (
                  <CheckCircle2 className="size-4 text-green-600" />
                ) : (
                  <XCircle className="size-4 text-red-600" />
                )}
                <code className="text-xs font-mono">
                  {example.number.slice(0, 4)} •••• •••• {example.number.slice(-4)}
                </code>
              </div>
              <span className="text-xs text-muted-foreground">{example.type}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
