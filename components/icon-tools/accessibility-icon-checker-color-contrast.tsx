'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check, Shield, FileText } from 'lucide-react'
import { toast } from 'sonner'

export default function AccessibilityIconChecker() {
  const [iconColor, setIconColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [iconSize, setIconSize] = useState(24)
  const [result, setResult] = useState<{
    contrastRatio: number
    wcagAA: boolean
    wcagAAA: boolean
    recommendations: string[]
  } | null>(null)
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

    const l1 = getLuminance(iconColor)
    const l2 = getLuminance(bgColor)
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)

    const recommendations: string[] = []
    
    if (ratio < 3) {
      recommendations.push('Increase contrast between icon and background')
      recommendations.push('Consider using a darker icon color or lighter background')
      recommendations.push('Minimum 3:1 ratio required for icons (WCAG AA)')
    } else if (ratio < 4.5) {
      recommendations.push('Good for large icons, but consider increasing contrast for small icons')
    }
    
    if (iconSize < 24) {
      recommendations.push('Consider increasing icon size for better visibility')
    }

    setResult({
      contrastRatio: ratio,
      wcagAA: ratio >= 3,
      wcagAAA: ratio >= 4.5,
      recommendations,
    })

    if (ratio >= 4.5) {
      toast.success('Excellent! Passes WCAG AAA')
    } else if (ratio >= 3) {
      toast.success('Passes WCAG AA for icons')
    } else {
      toast.error('Fails WCAG requirements')
    }
  }

  const handleCopyReport = async () => {
    if (!result) return
    
    const report = `Icon Accessibility Report
========================
Icon Color: ${iconColor}
Background: ${bgColor}
Icon Size: ${iconSize}px

Contrast Ratio: ${result.contrastRatio.toFixed(2)}:1
WCAG AA (3:1): ${result.wcagAA ? '✓ Pass' : '✗ Fail'}
WCAG AAA (4.5:1): ${result.wcagAAA ? '✓ Pass' : '✗ Fail'}

Recommendations:
${result.recommendations.map(r => `• ${r}`).join('\n')}`
    
    try {
      await navigator.clipboard.writeText(report)
      setCopied(true)
      toast.success('Report copied')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleClear = () => {
    setIconColor('#000000')
    setBgColor('#ffffff')
    setIconSize(24)
    setResult(null)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Check Icon Accessibility</h1>
        <p className="text-muted-foreground mt-2">
          Analyze icons for accessibility compliance. Check color contrast and get improvement suggestions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <Label>Icon Color:</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={iconColor}
                  onChange={(e) => setIconColor(e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={iconColor}
                  onChange={(e) => setIconColor(e.target.value)}
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
                  className="w-16 h-10"
                />
                <Input
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1 font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Icon Size: {iconSize}px</Label>
              <Input
                type="range"
                min="12"
                max="64"
                value={iconSize}
                onChange={(e) => setIconSize(parseInt(e.target.value))}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculateContrast} className="flex-1">
                <Shield className="h-4 w-4 mr-2" />
                Check Accessibility
              </Button>
              <Button variant="ghost" onClick={handleClear}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </Card>

          <Card className="p-4 bg-blue-50 dark:bg-blue-950">
            <h3 className="font-semibold mb-2">WCAG Requirements for Icons</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Minimum 3:1 contrast ratio (AA)</li>
              <li>• Recommended 4.5:1 for small icons (AAA)</li>
              <li>• Minimum 24x24px for touch targets</li>
              <li>• Include text labels when possible</li>
            </ul>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-8 flex items-center justify-center"
                style={{ backgroundColor: bgColor }}>
            <div 
              style={{ 
                color: iconColor,
                width: iconSize,
                height: iconSize
              }}
              className="flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </Card>

          {result && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Accessibility Report</h2>
                <Button variant="outline" size="sm" onClick={handleCopyReport}>
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <FileText className="h-4 w-4 mr-2" />}
                  Copy Report
                </Button>
              </div>

              <div className="space-y-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-4xl font-bold">{result.contrastRatio.toFixed(2)}:1</p>
                  <p className="text-sm text-muted-foreground">Contrast Ratio</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card className={`p-4 text-center ${result.wcagAA ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950'}`}>
                    <p className="text-2xl font-bold">{result.wcagAA ? '✓' : '✗'}</p>
                    <p className="text-sm">WCAG AA (3:1)</p>
                  </Card>
                  <Card className={`p-4 text-center ${result.wcagAAA ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950'}`}>
                    <p className="text-2xl font-bold">{result.wcagAAA ? '✓' : '✗'}</p>
                    <p className="text-sm">WCAG AAA (4.5:1)</p>
                  </Card>
                </div>

                {result.recommendations.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Recommendations:</h3>
                    <ul className="text-sm space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
