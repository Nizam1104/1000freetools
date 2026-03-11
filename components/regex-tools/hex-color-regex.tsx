"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, CheckCircle2, XCircle, Palette } from "lucide-react"
import { cn } from "@/lib/utils"

interface ColorValidationResult {
  color: string
  valid: boolean
  format: string
  rgb?: string
  hsl?: string
  reason: string
}

export default function HexColorValidator() {
  const [colors, setColors] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const hex3Pattern = useMemo(() => /^#?[0-9a-fA-F]{3}$/, [])
  const hex6Pattern = useMemo(() => /^#?[0-9a-fA-F]{6}$/, [])
  const hex8Pattern = useMemo(() => /^#?[0-9a-fA-F]{8}$/, [])

  const hexToRgb = useCallback((hex: string): string => {
    const cleanHex = hex.replace("#", "")
    let r: number, g: number, b: number
    
    if (cleanHex.length === 3) {
      r = parseInt(cleanHex[0] + cleanHex[0], 16)
      g = parseInt(cleanHex[1] + cleanHex[1], 16)
      b = parseInt(cleanHex[2] + cleanHex[2], 16)
    } else if (cleanHex.length === 6) {
      r = parseInt(cleanHex.slice(0, 2), 16)
      g = parseInt(cleanHex.slice(2, 4), 16)
      b = parseInt(cleanHex.slice(4, 6), 16)
    } else if (cleanHex.length === 8) {
      r = parseInt(cleanHex.slice(0, 2), 16)
      g = parseInt(cleanHex.slice(2, 4), 16)
      b = parseInt(cleanHex.slice(4, 6), 16)
    } else {
      return ""
    }
    
    return `rgb(${r}, ${g}, ${b})`
  }, [])

  const hexToHsl = useCallback((hex: string): string => {
    const cleanHex = hex.replace("#", "")
    let r: number, g: number, b: number
    
    if (cleanHex.length === 3) {
      r = parseInt(cleanHex[0] + cleanHex[0], 16) / 255
      g = parseInt(cleanHex[1] + cleanHex[1], 16) / 255
      b = parseInt(cleanHex[2] + cleanHex[2], 16) / 255
    } else if (cleanHex.length >= 6) {
      r = parseInt(cleanHex.slice(0, 2), 16) / 255
      g = parseInt(cleanHex.slice(2, 4), 16) / 255
      b = parseInt(cleanHex.slice(4, 6), 16) / 255
    } else {
      return ""
    }
    
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0, s = 0, l = (max + min) / 2
    
    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }
    
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
  }, [])

  const validateColor = useCallback((color: string): ColorValidationResult => {
    const trimmed = color.trim()
    
    if (!trimmed) {
      return { color: trimmed, valid: false, format: "", reason: "Empty color" }
    }
    
    const cleanColor = trimmed.replace("#", "")
    
    if (hex3Pattern.test(trimmed)) {
      const withHash = trimmed.startsWith("#") ? trimmed : `#${trimmed}`
      return {
        color: trimmed,
        valid: true,
        format: "3-digit hex",
        rgb: hexToRgb(withHash),
        hsl: hexToHsl(withHash),
        reason: "Valid 3-digit hex color",
      }
    }
    
    if (hex6Pattern.test(trimmed)) {
      const withHash = trimmed.startsWith("#") ? trimmed : `#${trimmed}`
      return {
        color: trimmed,
        valid: true,
        format: "6-digit hex",
        rgb: hexToRgb(withHash),
        hsl: hexToHsl(withHash),
        reason: "Valid 6-digit hex color",
      }
    }
    
    if (hex8Pattern.test(trimmed)) {
      const withHash = trimmed.startsWith("#") ? trimmed : `#${trimmed}`
      return {
        color: trimmed,
        valid: true,
        format: "8-digit hex (with alpha)",
        rgb: hexToRgb(withHash),
        hsl: hexToHsl(withHash),
        reason: "Valid 8-digit hex color (RGBA)",
      }
    }
    
    return { color: trimmed, valid: false, format: "", reason: "Invalid hex color format" }
  }, [hex3Pattern, hex6Pattern, hex8Pattern, hexToRgb, hexToHsl])

  const results = useMemo(() => {
    const lines = colors.split(/[\n,;]/).map(c => c.trim()).filter(c => c)
    return lines.map(color => validateColor(color))
  }, [colors, validateColor])

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

  const validColors = useMemo(() => results.filter(r => r.valid).map(r => r.color).join("\n"), [results])
  const invalidColors = useMemo(() => results.filter(r => !r.valid).map(r => r.color).join("\n"), [results])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Color Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="color-input" className="text-base font-medium">
            Hex Colors
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(colors, "input")}
              className="h-7"
              disabled={!colors}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setColors("")}
              className="h-7"
              disabled={!colors}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>
        
        <Textarea
          id="color-input"
          value={colors}
          onChange={(e) => setColors(e.target.value)}
          className="font-mono text-sm min-h-[120px]"
          placeholder="Enter hex colors (one per line, or separated by comma/semicolon)..."
        />
        <p className="text-xs text-muted-foreground">
          Supports 3-digit (#FFF), 6-digit (#FFFFFF), and 8-digit (#FFFFFFFF) formats. Hash symbol is optional.
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
              {validColors && (
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => copyToClipboard(validColors, "valid")}
                >
                  <CheckCircle2 className="size-3.5 mr-1 text-green-600" />
                  Copy Valid
                </Button>
              )}
              {invalidColors && (
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => copyToClipboard(invalidColors, "invalid")}
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
                  <div className="flex items-center gap-3">
                    {result.valid && (
                      <div 
                        className="w-8 h-8 rounded border shrink-0"
                        style={{ backgroundColor: result.color.startsWith("#") ? result.color : `#${result.color}` }}
                      />
                    )}
                    <div>
                      <div className="font-mono text-sm">{result.color}</div>
                      {result.valid && (
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {result.format}
                        </div>
                      )}
                    </div>
                  </div>
                  {result.valid && result.rgb && (
                    <div className="grid gap-1 mt-2 text-xs">
                      <div className="flex gap-2">
                        <span className="text-muted-foreground">RGB:</span>
                        <span className="font-mono">{result.rgb}</span>
                      </div>
                      {result.hsl && (
                        <div className="flex gap-2">
                          <span className="text-muted-foreground">HSL:</span>
                          <span className="font-mono">{result.hsl}</span>
                        </div>
                      )}
                    </div>
                  )}
                  {!result.valid && (
                    <div className="text-xs mt-1 text-red-700 dark:text-red-300">
                      {result.reason}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Color Examples */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Test Examples</h3>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {[
            { color: "#FFF", valid: true, desc: "3-digit white" },
            { color: "#000000", valid: true, desc: "6-digit black" },
            { color: "FF5733", valid: true, desc: "Without hash" },
            { color: "#1E90FF80", valid: true, desc: "8-digit with alpha" },
            { color: "#GGG", valid: false, desc: "Invalid chars" },
            { color: "#12345", valid: false, desc: "Wrong length" },
          ].map((example, idx) => (
            <button
              key={idx}
              onClick={() => setColors(example.color)}
              className="text-left rounded-lg border bg-background p-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                {example.valid ? (
                  <CheckCircle2 className="size-4 text-green-600" />
                ) : (
                  <XCircle className="size-4 text-red-600" />
                )}
                <code className="text-xs font-mono">{example.color}</code>
              </div>
              <span className="text-xs text-muted-foreground">{example.desc}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
