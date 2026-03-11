'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Copy, Download, RotateCcw, Check, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

export default function AnimatedFontGenerator() {
  const [text, setText] = useState('Hello World')
  const [animationType, setAnimationType] = useState<'gradient' | 'glow' | 'bounce' | 'slide' | 'fade'>('gradient')
  const [speed, setSpeed] = useState(2)
  const [colors, setColors] = useState(['#FF6B6B', '#4ECDC4', '#45B7D1'])
  const [fontSize, setFontSize] = useState(48)
  const [copied, setCopied] = useState(false)

  const addColor = () => {
    setColors([...colors, '#000000'])
  }

  const removeColor = (index: number) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index))
    }
  }

  const updateColor = (index: number, value: string) => {
    const newColors = [...colors]
    newColors[index] = value
    setColors(newColors)
  }

  const generateAnimation = () => {
    toast.success('Animation generated')
  }

  const getAnimationCSS = () => {
    switch (animationType) {
      case 'gradient':
        return `@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animated-text {
  font-size: ${fontSize}px;
  background: linear-gradient(270deg, ${colors.join(', ')});
  background-size: 600% 600%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient ${speed}s ease infinite;
}`
      case 'glow':
        return `@keyframes glow {
  0%, 100% { text-shadow: 0 0 10px ${colors[0]}, 0 0 20px ${colors[0]}, 0 0 30px ${colors[0]}; }
  50% { text-shadow: 0 0 20px ${colors[1] || colors[0]}, 0 0 30px ${colors[1] || colors[0]}, 0 0 40px ${colors[1] || colors[0]}; }
}

.animated-text {
  font-size: ${fontSize}px;
  color: ${colors[0]};
  animation: glow ${speed}s ease-in-out infinite;
}`
      case 'bounce':
        return `@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.animated-text {
  font-size: ${fontSize}px;
  display: inline-block;
  animation: bounce ${speed}s ease-in-out infinite;
}`
      case 'slide':
        return `@keyframes slide {
  0% { transform: translateX(-100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

.animated-text {
  font-size: ${fontSize}px;
  animation: slide ${speed}s ease-out;
}`
      case 'fade':
        return `@keyframes fade {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.animated-text {
  font-size: ${fontSize}px;
  color: ${colors[0]};
  animation: fade ${speed}s ease-in-out infinite;
}`
      default:
        return ''
    }
  }

  const handleCopyCSS = async () => {
    const css = getAnimationCSS()
    try {
      await navigator.clipboard.writeText(css)
      setCopied(true)
      toast.success('CSS copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = () => {
    const html = `<!DOCTYPE html>
<html>
<head>
<style>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background: #1a1a2e;
}
${getAnimationCSS()}
</style>
</head>
<body>
<h1 class="animated-text">${text}</h1>
</body>
</html>`
    
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'animated-text.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded animated-text.html')
  }

  const handleClear = () => {
    setText('Hello World')
    setAnimationType('gradient')
    setSpeed(2)
    setColors(['#FF6B6B', '#4ECDC4', '#45B7D1'])
    setFontSize(48)
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Animated Text Creator</h1>
        <p className="text-muted-foreground mt-2">
          Create animated text with moving, glowing, or gradient effects for social media and websites.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-4">
          <Card className="p-4 space-y-4">
            <div className="space-y-2">
              <Label>Text:</Label>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text"
              />
            </div>

            <div className="space-y-2">
              <Label>Animation Type:</Label>
              <div className="grid grid-cols-2 gap-2">
                {['gradient', 'glow', 'bounce', 'slide', 'fade'].map((type) => (
                  <Button
                    key={type}
                    variant={animationType === type ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setAnimationType(type as any)}
                    className="capitalize"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Speed: {speed}s</Label>
              <Input
                type="range"
                min="0.5"
                max="10"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label>Font Size: {fontSize}px</Label>
              <Input
                type="range"
                min="24"
                max="120"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Colors:</Label>
                <Button variant="outline" size="sm" onClick={addColor}>+ Add</Button>
              </div>
              <div className="space-y-2">
                {colors.map((color, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      type="color"
                      value={color}
                      onChange={(e) => updateColor(index, e.target.value)}
                      className="w-12 h-8"
                    />
                    <Input
                      value={color}
                      onChange={(e) => updateColor(index, e.target.value)}
                      className="flex-1 font-mono"
                    />
                    {colors.length > 2 && (
                      <Button variant="ghost" size="sm" onClick={() => removeColor(index)}>×</Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={generateAnimation} className="flex-1">
                <Sparkles className="h-4 w-4 mr-2" />
                Generate
              </Button>
              <Button variant="ghost" onClick={handleClear}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <Card className="p-8 bg-gray-900 min-h-[300px] flex items-center justify-center">
            <div 
              className="animated-text"
              style={{
                fontSize: `${fontSize}px`,
                background: animationType === 'gradient' ? `linear-gradient(270deg, ${colors.join(', ')})` : undefined,
                backgroundSize: animationType === 'gradient' ? '600% 600%' : undefined,
                WebkitBackgroundClip: animationType === 'gradient' ? 'text' : undefined,
                WebkitTextFillColor: animationType === 'gradient' ? 'transparent' : undefined,
                backgroundClip: animationType === 'gradient' ? 'text' : undefined,
                color: animationType !== 'gradient' ? colors[0] : undefined,
                animation: `${animationType} ${speed}s ${animationType === 'slide' ? 'ease-out' : 'ease'} ${animationType === 'slide' ? '' : 'infinite'}`,
              }}
            >
              {text}
            </div>
          </Card>

          <div className="flex gap-4">
            <Button className="flex-1" onClick={handleCopyCSS}>
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              Copy CSS
            </Button>
            <Button className="flex-1" variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download HTML
            </Button>
          </div>

          <Card className="p-4 bg-muted">
            <h3 className="font-semibold mb-2">Generated CSS</h3>
            <pre className="text-xs font-mono overflow-x-auto whitespace-pre-wrap">{getAnimationCSS()}</pre>
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor; }
          50% { text-shadow: 0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes slide {
          0% { transform: translateX(-100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes fade {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}
