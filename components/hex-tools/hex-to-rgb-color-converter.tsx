"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function HexToRgbColorConverter() {
  const [input, setInput] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const parseHexColor = useCallback((hex: string): { r: number; g: number; b: number } | null => {
    const cleanHex = hex.replace(/^#/, "").trim()
    
    // Handle 3-digit hex
    if (cleanHex.length === 3) {
      const r = parseInt(cleanHex[0] + cleanHex[0], 16)
      const g = parseInt(cleanHex[1] + cleanHex[1], 16)
      const b = parseInt(cleanHex[2] + cleanHex[2], 16)
      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
        return { r, g, b }
      }
    }
    
    // Handle 6-digit hex
    if (cleanHex.length === 6) {
      const r = parseInt(cleanHex.substr(0, 2), 16)
      const g = parseInt(cleanHex.substr(2, 2), 16)
      const b = parseInt(cleanHex.substr(4, 2), 16)
      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
        return { r, g, b }
      }
    }
    
    return null
  }, [])

  const rgb = useMemo(() => {
    if (!input) return null
    return parseHexColor(input)
  }, [input, parseHexColor])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)
    if (value && !parseHexColor(value)) {
      setError("Invalid hex color. Use 3 or 6 digit format (e.g., #FF5733 or #F53)")
    }
  }, [parseHexColor])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("").toUpperCase()
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            Hex Color Code
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(input, "input")}
              className="h-7"
              disabled={!input}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => {
                setInput("")
                setError(null)
              }}
              className="h-7"
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1">
            <Input
              id="input"
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              className={cn(
                "font-mono text-sm pl-10",
                error ? "border-destructive focus-visible:border-destructive" : ""
              )}
              placeholder="#FF5733"
            />
            <div
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded border"
              style={{ backgroundColor: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "transparent" }}
            />
          </div>
          {rgb && (
            <div
              className="w-16 h-10 rounded-lg border shadow-sm"
              style={{ backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }}
            />
          )}
        </div>

        {error && (
          <p className="text-sm text-destructive flex items-center gap-2">
            {error}
          </p>
        )}
      </section>

      {/* RGB Output */}
      {rgb && (
        <section className="space-y-4">
          <Label className="text-base font-medium">RGB Values</Label>
          
          <div className="grid grid-cols-3 gap-4">
            {(["r", "g", "b"] as const).map((channel) => (
              <div key={channel} className="space-y-2">
                <Label className="text-sm font-medium uppercase">{channel}</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    max="255"
                    value={rgb[channel]}
                    onChange={(e) => {
                      const value = Math.min(255, Math.max(0, parseInt(e.target.value) || 0))
                      const newRgb = { ...rgb, [channel]: value }
                      setInput(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
                    }}
                    className="font-mono"
                  />
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => copyToClipboard(rgb[channel].toString(), channel)}
                    className="h-9"
                  >
                    {copied === channel ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* CSS Output */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">CSS Formats</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2 p-2 rounded border bg-muted/30">
                <code className="text-sm">rgb({rgb.r}, {rgb.g}, {rgb.b})</code>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "rgb")}
                  className="h-7"
                >
                  {copied === "rgb" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                </Button>
              </div>
              <div className="flex items-center justify-between gap-2 p-2 rounded border bg-muted/30">
                <code className="text-sm">rgba({rgb.r}, {rgb.g}, {rgb.b}, 1)</code>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => copyToClipboard(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`, "rgba")}
                  className="h-7"
                >
                  {copied === "rgba" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                </Button>
              </div>
              <div className="flex items-center justify-between gap-2 p-2 rounded border bg-muted/30">
                <code className="text-sm">hsl({rgbToHsl(rgb.r, rgb.g, rgb.b)})</code>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => copyToClipboard(`hsl(${rgbToHsl(rgb.r, rgb.g, rgb.b)})`, "hsl")}
                  className="h-7"
                >
                  {copied === "hsl" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

function rgbToHsl(r: number, g: number, b: number): string {
  r /= 255
  g /= 255
  b /= 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
  
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  
  return `${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`
}
