'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check, FileUp, Palette } from 'lucide-react'
import { toast } from 'sonner'

export default function FontColorContrastChecker() {
  const [textColor, setTextColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [fontSize, setFontSize] = useState(16)
  const [isBold, setIsBold] = useState(false)
  const [result, setResult] = useState<{ ratio: number; aa: boolean; aaa: boolean; aaLarge: boolean; aaaLarge: boolean } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateContrast = () => {
    const getLuminance = (hex: string) => {
      const rgb = parseInt(hex.slice(1), 16)
      const r = (rgb >> 16) & 0xff
      const g = (rgb >> 8) & 0xff
      const b = (rgb >> 0) & 0xff

      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
      })

      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
    }

    const l1 = getLuminance(textColor)
    const l2 = getLuminance(bgColor)
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)

    // WCAG thresholds
    const aa = ratio >= 4.5
    const aaa = ratio >= 7
    const aaLarge = ratio >= 3
    const aaaLarge = ratio >= 4.5

    setResult({ ratio, aa, aaa, aaLarge, aaaLarge })
    
    if (ratio >= 7) {
      toast.success('Excellent contrast! Passes WCAG AAA')
    } else if (ratio >= 4.5) {
      toast.success('Good contrast! Passes WCAG AA')
    } else if (ratio >= 3) {
      toast.warning('Low contrast. Only passes AA for large text')
    } else {
      toast.error('Poor contrast. Fails WCAG requirements')
    }
  }

  const handleCopyResult = async () => {
    if (!result) return
    
    const text = `Color Contrast Report
---------------------
Text Color: ${textColor}
Background: ${bgColor}
Font Size: ${fontSize}px ${isBold ? '(Bold)' : ''}
Contrast Ratio: ${result.ratio.toFixed(2)}:1

WCAG Compliance:
- AA Normal: ${result.aa ? '✓ Pass' : '✗ Fail'}
- AAA Normal: ${result.aaa ? '✓ Pass' : '✗ Fail'}
- AA Large: ${result.aaLarge ? '✓ Pass' : '✗ Fail'}
- AAA Large: ${result.aaaLarge ? '✓ Pass' : '✗ Fail'}`
    
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success('Report copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleClear = () => {
    setTextColor('#000000')
    setBgColor('#ffffff')
    setFontSize(16)
    setIsBold(false)
    setResult(null)
  }

  const getContrastColor = () => {
    if (!result) return 'bg-muted'
    if (result.ratio >= 7) return 'bg-green-100 dark:bg-green-900'
    if (result.ratio >= 4.5) return 'bg-yellow-100 dark:bg-yellow-900'
    if (result.ratio >= 3) return 'bg-orange-100 dark:bg-orange-900'
    return 'bg-red-100 dark:bg-red-900'
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Text Color Contrast Checker</h1>
        <p className="text-muted-foreground mt-2">
          Test text color contrast against backgrounds for WCAG accessibility compliance.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <Label>Text Color:</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="flex-1 font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Background Color:</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1 font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Font Size: {fontSize}px</Label>
              <Input
                type="range"
                min="12"
                max="72"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="bold"
                checked={isBold}
                onChange={(e) => setIsBold(e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="bold" className="cursor-pointer">Bold Text</Label>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculateContrast} className="flex-1">
                <Palette className="h-4 w-4 mr-2" />
                Check Contrast
              </Button>
              <Button variant="ghost" onClick={handleClear}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </Card>

          <Card className={`p-6 ${getContrastColor()}`}>
            <Label className="mb-4 block">Preview:</Label>
            <div 
              className="p-8 rounded-lg text-center h-full flex items-center justify-center"
              style={{ backgroundColor: bgColor, color: textColor }}
            >
              <p 
                style={{ 
                  fontSize: `${fontSize}px`,
                  fontWeight: isBold ? 'bold' : 'normal'
                }}
              >
                The quick brown fox jumps over the lazy dog.
              </p>
            </div>
          </Card>
        </div>

        {result && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Contrast Analysis</h2>
              <Button variant="outline" size="sm" onClick={handleCopyResult}>
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                Copy Report
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-4">
                <div className="text-center">
                  <p className="text-4xl font-bold">{result.ratio.toFixed(2)}:1</p>
                  <p className="text-sm text-muted-foreground">Contrast Ratio</p>
                </div>
              </Card>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded">
                  <span>WCAG AA (Normal)</span>
                  <span className={result.aa ? 'text-green-600' : 'text-red-600'}>
                    {result.aa ? '✓ Pass' : '✗ Fail'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded">
                  <span>WCAG AAA (Normal)</span>
                  <span className={result.aaa ? 'text-green-600' : 'text-red-600'}>
                    {result.aaa ? '✓ Pass' : '✗ Fail'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded">
                  <span>WCAG AA (Large {fontSize >= 18 || (fontSize >= 14 && isBold) ? '✓' : ''})</span>
                  <span className={result.aaLarge ? 'text-green-600' : 'text-red-600'}>
                    {result.aaLarge ? '✓ Pass' : '✗ Fail'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded">
                  <span>WCAG AAA (Large)</span>
                  <span className={result.aaaLarge ? 'text-green-600' : 'text-red-600'}>
                    {result.aaaLarge ? '✓ Pass' : '✗ Fail'}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-4 bg-blue-50 dark:bg-blue-950">
          <h3 className="font-semibold mb-2">WCAG Guidelines</h3>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li><strong>AA Normal:</strong> 4.5:1 minimum for normal text</li>
            <li><strong>AAA Normal:</strong> 7:1 minimum for enhanced accessibility</li>
            <li><strong>AA Large:</strong> 3:1 for text 18px+ or 14px+ bold</li>
            <li><strong>AAA Large:</strong> 4.5:1 for large text</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
