'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Copy, Download, RotateCcw, Check, Type, Image } from 'lucide-react'
import { toast } from 'sonner'

export default function _3DIconGeneratorFromText() {
  const [text, setText] = useState('A')
  const [fontSize, setFontSize] = useState(200)
  const [depth, setDepth] = useState(20)
  const [lightAngle, setLightAngle] = useState(45)
  const [material, setMaterial] = useState<'plastic' | 'metal' | 'glass'>('plastic')
  const [baseColor, setBaseColor] = useState('#3B82F6')
  const [generatedIcon, setGeneratedIcon] = useState('')
  const [copied, setCopied] = useState(false)

  const generate3DIcon = () => {
    // Generate SVG with 3D-like effect using filters and gradients
    const gradientId = `gradient-${Date.now()}`
    
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${lightenColor(baseColor, 30)}" />
      <stop offset="50%" style="stop-color:${baseColor}" />
      <stop offset="100%" style="stop-color:${darkenColor(baseColor, 30)}" />
    </linearGradient>
    <filter id="shadow">
      <feDropShadow dx="${Math.cos(lightAngle * Math.PI / 180) * 5}" dy="${Math.sin(lightAngle * Math.PI / 180) * 5}" stdDeviation="3" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <!-- 3D Depth layers -->
  ${Array.from({ length: Math.floor(depth / 2) }).map((_, i) => `
  <text x="50%" y="50%" text-anchor="middle" dy=".3em" 
        font-size="${fontSize}" font-weight="bold" 
        fill="${darkenColor(baseColor, i * 5)}"
        style="filter: url(#shadow)">
    ${text}
  </text>
  `).join('')}
  
  <!-- Main text -->
  <text x="50%" y="50%" text-anchor="middle" dy=".3em" 
        font-size="${fontSize}" font-weight="bold" 
        fill="url(#${gradientId})"
        style="filter: url(#shadow)">
    ${text}
  </text>
</svg>`

    setGeneratedIcon(svg)
    toast.success('3D icon generated')
  }

  const lightenColor = (hex: string, percent: number): string => {
    const num = parseInt(hex.replace('#', ''), 16)
    const amt = Math.round(2.55 * percent)
    const R = Math.min(255, (num >> 16) + amt)
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt)
    const B = Math.min(255, (num & 0x0000FF) + amt)
    return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`
  }

  const darkenColor = (hex: string, percent: number): string => {
    return lightenColor(hex, -percent)
  }

  const handleDownload = () => {
    if (!generatedIcon) return
    
    const blob = new Blob([generatedIcon], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${text}-3d-icon.svg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded 3D icon')
  }

  const handleCopy = async () => {
    if (!generatedIcon) return
    try {
      await navigator.clipboard.writeText(generatedIcon)
      setCopied(true)
      toast.success('SVG copied')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleClear = () => {
    setText('A')
    setGeneratedIcon('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Create 3D Icons from Text</h2>
        <p className="text-muted-foreground mt-2">
          Generate 3D-style icons from any letter, number, or symbol with customizable materials and lighting.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-4">
          <Card className="p-4 space-y-4">
            <div className="space-y-2">
              <Label>Text/Symbol:</Label>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, 2))}
                placeholder="Enter text"
                maxLength={2}
                className="text-center text-2xl"
              />
            </div>

            <div className="space-y-2">
              <Label>Font Size: {fontSize}px</Label>
              <Slider
                value={[fontSize]}
                onValueChange={(v: number[]) => setFontSize(v[0])}
                min={100}
                max={300}
                step={10}
              />
            </div>

            <div className="space-y-2">
              <Label>3D Depth: {depth}px</Label>
              <Slider
                value={[depth]}
                onValueChange={(v: number[]) => setDepth(v[0])}
                min={0}
                max={50}
                step={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Light Angle: {lightAngle}°</Label>
              <Slider
                value={[lightAngle]}
                onValueChange={(v: number[]) => setLightAngle(v[0])}
                min={0}
                max={360}
                step={15}
              />
            </div>

            <div className="space-y-2">
              <Label>Material:</Label>
              <div className="flex gap-2">
                {['plastic', 'metal', 'glass'].map((m) => (
                  <Button
                    key={m}
                    variant={material === m ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setMaterial(m as any)}
                    className="flex-1 capitalize"
                  >
                    {m}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Base Color:</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="flex-1 font-mono"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={generate3DIcon} className="flex-1">
                <Image className="h-4 w-4 mr-2" />
                Generate
              </Button>
              <Button variant="ghost" onClick={handleClear}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">3D Icon Preview</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!generatedIcon}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!generatedIcon}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 min-h-[400px] flex items-center justify-center">
            {generatedIcon ? (
              <div dangerouslySetInnerHTML={{ __html: generatedIcon }} className="w-64 h-64" />
            ) : (
              <div className="text-center text-muted-foreground">
                <Type className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Enter text and click Generate to create a 3D icon</p>
              </div>
            )}
          </Card>

          {generatedIcon && (
            <Card className="p-4">
              <Label className="mb-2 block">SVG Code:</Label>
              <pre className="text-xs font-mono overflow-x-auto bg-muted p-2 rounded max-h-[200px] overflow-y-auto">
                {generatedIcon}
              </pre>
            </Card>
          )}
        </div>
      </div>

      <style>{`
        .slider { -webkit-appearance: none; width: 100%; height: 8px; border-radius: 4px; background: #e2e8f0; outline: none; }
        .slider::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%; background: #3b82f6; cursor: pointer; }
      `}</style>
    </div>
  )
}

const Slider = ({ value, onValueChange, min, max, step }: any) => (
  <input
    type="range"
    min={min}
    max={max}
    step={step}
    value={value[0]}
    onChange={(e) => onValueChange([parseInt(e.target.value)])}
    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
  />
)
