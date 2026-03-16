'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, RotateCcw, Check, Palette } from 'lucide-react'
import { toast } from 'sonner'

export default function JavaScriptColorConverter() {
  const [color, setColor] = useState('#3B82F6')
  const [conversions, setConversions] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  const convert = () => {
    try {
      const rgb = parseColor(color)
      if (!rgb) {
        throw new Error('Invalid color')
      }

      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
      const hslStr = `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%)`
      
      setConversions({
        hex: rgbToHex(rgb.r, rgb.g, rgb.b),
        rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
        rgba: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`,
        hsl: hslStr,
        hsla: `hsla(${Math.round(hsl.h)}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%, 1)`,
        int: (rgb.r << 16) | (rgb.g << 8) | rgb.b,
        css: {
          hex: rgbToHex(rgb.r, rgb.g, rgb.b),
          rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
          hsl: hslStr,
        },
      })
      toast.success('Color converted')
    } catch (err) {
      toast.error('Invalid color. Use HEX, RGB, or HSL format.')
      setConversions(null)
    }
  }

  const parseColor = (colorStr: string): { r: number; g: number; b: number } | null => {
    colorStr = colorStr.trim()
    
    // HEX
    if (colorStr.startsWith('#')) {
      const hex = colorStr.slice(1)
      if (hex.length === 3) {
        return {
          r: parseInt(hex[0] + hex[0], 16),
          g: parseInt(hex[1] + hex[1], 16),
          b: parseInt(hex[2] + hex[2], 16),
        }
      }
      if (hex.length === 6) {
        return {
          r: parseInt(hex.slice(0, 2), 16),
          g: parseInt(hex.slice(2, 4), 16),
          b: parseInt(hex.slice(4, 6), 16),
        }
      }
    }
    
    // RGB
    const rgbMatch = colorStr.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
    if (rgbMatch) {
      return {
        r: parseInt(rgbMatch[1]),
        g: parseInt(rgbMatch[2]),
        b: parseInt(rgbMatch[3]),
      }
    }
    
    // HSL
    const hslMatch = colorStr.match(/hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%/)
    if (hslMatch) {
      const h = parseInt(hslMatch[1])
      const s = parseInt(hslMatch[2]) / 100
      const l = parseInt(hslMatch[3]) / 100
      const rgb = hslToRgb(h, s, l)
      return rgb
    }
    
    // Named colors
    const namedColors: Record<string, string> = {
      red: '#FF0000',
      green: '#008000',
      blue: '#0000FF',
      white: '#FFFFFF',
      black: '#000000',
      yellow: '#FFFF00',
      cyan: '#00FFFF',
      magenta: '#FF00FF',
      orange: '#FFA500',
      purple: '#800080',
      pink: '#FFC0CB',
      gray: '#808080',
      grey: '#808080',
      navy: '#000080',
      lime: '#00FF00',
      aqua: '#00FFFF',
      teal: '#008080',
      maroon: '#800000',
      olive: '#808000',
    }
    
    if (colorStr.toLowerCase() in namedColors) {
      return parseColor(namedColors[colorStr.toLowerCase()])
    }
    
    return null
  }

  const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('').toUpperCase()
  }

  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
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
    
    return { h: h * 360, s, l }
  }

  const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }
    
    if (s === 0) {
      const v = Math.round(l * 255)
      return { r: v, g: v, b: v }
    }
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    const hNorm = h / 360
    
    return {
      r: Math.round(hue2rgb(p, q, hNorm + 1/3) * 255),
      g: Math.round(hue2rgb(p, q, hNorm) * 255),
      b: Math.round(hue2rgb(p, q, hNorm - 1/3) * 255),
    }
  }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleClear = () => {
    setColor('#3B82F6')
    setConversions(null)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Convert Colors and Generate JavaScript Code</h1>
        <p className="text-muted-foreground mt-2">
          Convert between HEX, RGB, HSL, and named colors with visual preview and code snippets.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex gap-4 items-end">
          <div className="flex-1 space-y-2">
            <Label htmlFor="color">Color Input</Label>
            <div className="flex gap-2">
              <Input
                id="color"
                placeholder="#3B82F6, rgb(59, 130, 246), hsl(217, 91%, 60%), blue"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="font-mono"
              />
              <Button onClick={convert}>
                <Palette className="h-4 w-4 mr-2" />
                Convert
              </Button>
              <Button variant="ghost" onClick={handleClear}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Preview</Label>
            <div 
              className="w-20 h-10 rounded-md border-2 border-border"
              style={{ backgroundColor: color }}
            />
          </div>
        </div>

        {conversions && (
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Color Values</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">HEX:</span>
                  <div className="flex items-center gap-2">
                    <code className="bg-muted px-2 py-1 rounded">{conversions.hex}</code>
                    <Button variant="ghost" size="sm" onClick={() => handleCopy(conversions.hex)}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">RGB:</span>
                  <div className="flex items-center gap-2">
                    <code className="bg-muted px-2 py-1 rounded">{conversions.rgb}</code>
                    <Button variant="ghost" size="sm" onClick={() => handleCopy(conversions.rgb)}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">RGBA:</span>
                  <div className="flex items-center gap-2">
                    <code className="bg-muted px-2 py-1 rounded">{conversions.rgba}</code>
                    <Button variant="ghost" size="sm" onClick={() => handleCopy(conversions.rgba)}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">HSL:</span>
                  <div className="flex items-center gap-2">
                    <code className="bg-muted px-2 py-1 rounded">{conversions.hsl}</code>
                    <Button variant="ghost" size="sm" onClick={() => handleCopy(conversions.hsl)}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Integer:</span>
                  <div className="flex items-center gap-2">
                    <code className="bg-muted px-2 py-1 rounded">{conversions.int}</code>
                    <Button variant="ghost" size="sm" onClick={() => handleCopy(String(conversions.int))}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">JavaScript Code</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">CSS in JS:</p>
                  <pre className="bg-muted p-2 rounded text-xs font-mono overflow-x-auto">
{`const styles = {
  color: '${conversions.css.hex}',
  backgroundColor: '${conversions.css.rgb}',
  borderColor: '${conversions.css.hsl}'
}`}
                  </pre>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleCopy(`const styles = {
  color: '${conversions.css.hex}',
  backgroundColor: '${conversions.css.rgb}',
  borderColor: '${conversions.css.hsl}'
}`)}
                  >
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    Copy
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
