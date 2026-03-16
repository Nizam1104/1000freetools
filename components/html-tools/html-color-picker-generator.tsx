"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download } from "lucide-react"

export function HtmlColorPickerGenerator() {
  const [color, setColor] = useState("#4F46E5")
  const [copied, setCopied] = useState("")
  const [format, setFormat] = useState<"hex" | "rgb" | "hsl" | "hwb">("hex")

  const hexToRgb = useCallback((hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }, [])

  const rgbToHsl = useCallback((r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
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
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
  }, [])

  const rgbToHwb = useCallback((r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    const l = (max + min) / 2
    let h = 0, w = min, b_val = 1 - max

    if (max !== min) {
      const d = max - min
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }
    return { h: Math.round(h * 360), w: Math.round(w * 100), b: Math.round(b_val * 100) }
  }, [])

  const handleColorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
  }, [])

  const handleCopy = useCallback(async (value: string, type: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(type)
    setTimeout(() => setCopied(""), 1500)
  }, [])

  const handleClear = useCallback(() => {
    setColor("#000000")
  }, [])

  const rgb = hexToRgb(color)
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null
  const hwb = rgb ? rgbToHwb(rgb.r, rgb.g, rgb.b) : null

  const colorFormats = [
    { name: "HEX", value: color.toUpperCase(), copy: () => handleCopy(color.toUpperCase(), "hex") },
    { name: "RGB", value: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "", copy: () => handleCopy(`rgb(${rgb!.r}, ${rgb!.g}, ${rgb!.b})`, "rgb") },
    { name: "HSL", value: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "", copy: () => handleCopy(`hsl(${hsl!.h}, ${hsl!.s}%, ${hsl!.l}%)`, "hsl") },
    { name: "HWB", value: hwb ? `hwb(${hwb.h} ${hwb.w}% ${hwb.b}%)` : "", copy: () => handleCopy(`hwb(${hwb!.h} ${hwb!.w}% ${hwb!.b}%)`, "hwb") },
  ]

  const cssVariables = `--color-primary: ${color.toUpperCase()};
--color-primary-rgb: ${rgb?.r}, ${rgb?.g}, ${rgb?.b};
--color-primary-hsl: ${hsl?.h}, ${hsl?.s}%, ${hsl?.l}%;`

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">HTML Color Picker & Generator</h2>
            <p className="text-sm text-muted-foreground">
              Pick colors and get CSS code in multiple formats
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleClear}>
            Reset
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={color}
              onChange={handleColorChange}
              className="w-20 h-20 rounded-lg border-2 border-border cursor-pointer"
            />
            <div className="flex-1 space-y-2">
              <Label htmlFor="colorInput">Hex Color</Label>
              <Input
                id="colorInput"
                type="text"
                value={color}
                onChange={handleColorChange}
                className="font-mono uppercase"
                placeholder="#000000"
              />
            </div>
          </div>

          <div className="p-4 rounded-lg border" style={{ backgroundColor: color, borderColor: color }}>
            <p className="text-sm font-medium" style={{ color: rgb && (rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) > 186 ? '#000' : '#fff' }}>
              Preview Text
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Color Formats</Label>
          <div className="space-y-2">
            {colorFormats.map((fmt) => (
              <div key={fmt.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <span className="text-sm font-medium">{fmt.name}</span>
                  <p className="text-sm text-muted-foreground font-mono">{fmt.value}</p>
                </div>
                <Button variant="outline" size="sm" onClick={fmt.copy}>
                  {copied === fmt.name ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label>CSS Variables</Label>
        <div className="p-4 bg-muted rounded-lg font-mono text-sm">
          <pre className="whitespace-pre-wrap">{cssVariables}</pre>
        </div>
        <Button onClick={() => handleCopy(cssVariables, "css")} className="w-full">
          {copied === "css" ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
          {copied === "css" ? "Copied" : "Copy CSS Variables"}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-4 bg-muted rounded-lg text-center">
          <p className="text-sm text-muted-foreground">Contrast Ratio</p>
          <p className="text-2xl font-bold">
            {rgb ? (rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114 > 186 ? "16.1:1" : "4.5:1") : "-"}
          </p>
        </div>
        <div className="p-4 bg-muted rounded-lg text-center">
          <p className="text-sm text-muted-foreground">Brightness</p>
          <p className="text-2xl font-bold">
            {rgb ? Math.round((rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) / 255 * 100) : 0}%
          </p>
        </div>
        <div className="p-4 bg-muted rounded-lg text-center">
          <p className="text-sm text-muted-foreground">Saturation</p>
          <p className="text-2xl font-bold">{hsl?.s || 0}%</p>
        </div>
      </div>
    </div>
  )
}
