"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, RefreshCw, Plus } from "lucide-react"

export default function PasswordHistoryGenerator() {
  const [basePassword, setBasePassword] = useState<string>("")
  const [count, setCount] = useState<number>(5)
  const [variations, setVariations] = useState<string[]>([])
  const [copied, setCopied] = useState<string | null>(null)

  const generateVariations = useCallback(() => {
    if (!basePassword) return

    const vars: string[] = []
    const base = basePassword

    // Original
    vars.push(base)

    // Add year
    const year = new Date().getFullYear()
    vars.push(`${base}${year}`)
    vars.push(`${base}${year - 1}`)

    // Add special chars
    vars.push(`${base}!`)
    vars.push(`${base}@`)
    vars.push(`${base}#`)

    // Leet speak
    const leet = base
      .replace(/a/gi, "4")
      .replace(/e/gi, "3")
      .replace(/i/gi, "1")
      .replace(/o/gi, "0")
      .replace(/s/gi, "5")
      .replace(/t/gi, "7")
    if (leet !== base) vars.push(leet)

    // Capitalize first
    if (base[0]) {
      vars.push(base[0].toUpperCase() + base.slice(1))
    }

    // Reverse
    vars.push(base.split("").reverse().join(""))

    // Add numbers
    vars.push(`${base}123`)
    vars.push(`123${base}`)

    // Uppercase
    vars.push(base.toUpperCase())

    // Alternating case
    let alt = ""
    for (let i = 0; i < base.length; i++) {
      alt += i % 2 === 0 ? base[i].toUpperCase() : base[i].toLowerCase()
    }
    vars.push(alt)

    setVariations(vars.slice(0, count))
  }, [basePassword, count])

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
    setBasePassword("")
    setVariations([])
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="base-password" className="text-base font-medium">Base Password</Label>
          <Button variant="ghost" size="xs" onClick={handleClear} className="h-7">
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>
        <Input
          id="base-password"
          value={basePassword}
          onChange={(e) => setBasePassword(e.target.value)}
          placeholder="Enter base password..."
        />
      </section>

      {/* Count */}
      <section className="space-y-2">
        <Label htmlFor="count">Number of Variations</Label>
        <div className="flex gap-2">
          <Input
            id="count"
            type="number"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 5)}
            min="1"
            max="20"
            className="w-24"
          />
          <Button onClick={generateVariations} disabled={!basePassword} className="flex-1">
            <RefreshCw className="size-4 mr-2" />
            Generate Variations
          </Button>
        </div>
      </section>

      {/* Variations */}
      {variations.length > 0 && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Password Variations ({variations.length})</Label>
          <div className="rounded-lg border bg-background divide-y">
            {variations.map((variation, idx) => (
              <div key={idx} className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-6">{idx + 1}</span>
                  <span className="font-mono">{variation}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(variation, `var-${idx}`)}
                >
                  {copied === `var-${idx}` ? <Check className="size-4" /> : <Copy className="size-4" />}
                </Button>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            onClick={() => copyToClipboard(variations.join("\n"), "all")}
            className="w-full"
          >
            {copied === "all" ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
            Copy All
          </Button>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Password Variations</h4>
            <p className="text-sm text-muted-foreground">
              Generate variations of a base password for creating multiple related
              passwords. Useful for creating password patterns across different
              accounts. Note: Using similar passwords reduces security. Consider
              using a password manager for unique passwords instead.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
