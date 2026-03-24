'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check, Code, Play } from 'lucide-react'
import { toast } from 'sonner'

export default function AnimatedSvgIconCreator() {
  const [iconType, setIconType] = useState<'spinner' | 'bounce' | 'pulse' | 'slide' | 'morph'>('spinner')
  const [duration, setDuration] = useState(1)
  const [color, setColor] = useState('#3B82F6')
  const [size, setSize] = useState(64)
  const [generatedSvg, setGeneratedSvg] = useState('')
  const [copied, setCopied] = useState(false)

  const generateAnimation = () => {
    const animationId = `anim-${Date.now()}`
    let svg = ''

    switch (iconType) {
      case 'spinner':
        svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
  <defs>
    <style>
      @keyframes ${animationId} {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .spinner {
        animation: ${animationId} ${duration}s linear infinite;
        transform-origin: center;
      }
    </style>
  </defs>
  <circle class="spinner" cx="12" cy="12" r="10" stroke="${color}" stroke-width="2" fill="none" stroke-linecap="round" stroke-dasharray="31.4 31.4"/>
</svg>`
        break

      case 'bounce':
        svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
  <defs>
    <style>
      @keyframes ${animationId} {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      .bounce {
        animation: ${animationId} ${duration}s ease-in-out infinite;
        transform-origin: center;
      }
    </style>
  </defs>
  <circle class="bounce" cx="12" cy="12" r="8" fill="${color}"/>
</svg>`
        break

      case 'pulse':
        svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
  <defs>
    <style>
      @keyframes ${animationId} {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.3); opacity: 0.7; }
      }
      .pulse {
        animation: ${animationId} ${duration}s ease-in-out infinite;
        transform-origin: center;
      }
    </style>
  </defs>
  <circle class="pulse" cx="12" cy="12" r="8" fill="${color}"/>
</svg>`
        break

      case 'slide':
        svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
  <defs>
    <style>
      @keyframes ${animationId} {
        0%, 100% { transform: translateX(-6px); }
        50% { transform: translateX(6px); }
      }
      .slide {
        animation: ${animationId} ${duration}s ease-in-out infinite;
      }
    </style>
  </defs>
  <rect class="slide" x="8" y="6" width="8" height="12" rx="2" fill="${color}"/>
</svg>`
        break

      case 'morph':
        svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
  <defs>
    <style>
      @keyframes ${animationId} {
        0%, 100% { d: path("M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"); }
        50% { d: path("M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10z"); }
      }
      .morph {
        animation: ${animationId} ${duration}s ease-in-out infinite;
      }
    </style>
  </defs>
  <path class="morph" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="${color}"/>
</svg>`
        break
    }

    setGeneratedSvg(svg)
    toast.success('Animation generated')
  }

  const handleCopy = async () => {
    if (!generatedSvg) return
    try {
      await navigator.clipboard.writeText(generatedSvg)
      setCopied(true)
      toast.success('SVG copied')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = () => {
    if (!generatedSvg) return
    
    const blob = new Blob([generatedSvg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `animated-${iconType}.svg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded animated SVG')
  }

  const handleClear = () => {
    setGeneratedSvg('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Create Animated SVG Icons</h2>
        <p className="text-muted-foreground mt-2">
          Design engaging animated icons for your website or app with CSS or SMIL animations.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-4">
          <Card className="p-4 space-y-4">
            <div className="space-y-2">
              <Label>Animation Type:</Label>
              <div className="grid grid-cols-2 gap-2">
                {['spinner', 'bounce', 'pulse', 'slide', 'morph'].map((type) => (
                  <Button
                    key={type}
                    variant={iconType === type ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setIconType(type as any)}
                    className="capitalize"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Duration: {duration}s</Label>
              <Input
                type="range"
                min="0.3"
                max="5"
                step="0.1"
                value={duration}
                onChange={(e) => setDuration(parseFloat(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label>Color:</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="flex-1 font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Size: {size}px</Label>
              <Input
                type="range"
                min="24"
                max="128"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={generateAnimation} className="flex-1">
                <Play className="h-4 w-4 mr-2" />
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
            <Label className="text-base font-medium">Preview</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!generatedSvg}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!generatedSvg}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card className="p-8 bg-muted min-h-[300px] flex items-center justify-center">
            {generatedSvg ? (
              <div dangerouslySetInnerHTML={{ __html: generatedSvg }} />
            ) : (
              <div className="text-center text-muted-foreground">
                <Code className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Select animation type and click Generate</p>
              </div>
            )}
          </Card>

          {generatedSvg && (
            <Card className="p-4">
              <Label className="mb-2 block">SVG Code:</Label>
              <pre className="text-xs font-mono overflow-x-auto bg-muted p-2 rounded max-h-[200px] overflow-y-auto">
                {generatedSvg}
              </pre>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
