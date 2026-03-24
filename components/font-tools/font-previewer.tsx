'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Copy, RotateCcw, Check, Download } from 'lucide-react'
import { toast } from 'sonner'

export default function FontPreviewer() {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog')
  const [fontSize, setFontSize] = useState(48)
  const [fontWeight, setFontWeight] = useState(400)
  const [fontStyle, setFontStyle] = useState<'normal' | 'italic'>('normal')
  const [letterSpacing, setLetterSpacing] = useState(0)
  const [lineHeight, setLineHeight] = useState(1.5)
  const [textColor, setTextColor] = useState('#000000')
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [selectedFonts, setSelectedFonts] = useState<string[]>(['Arial', 'Georgia', 'Times New Roman'])
  const [copied, setCopied] = useState(false)

  const availableFonts = [
    'Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana', 'Tahoma',
    'Trebuchet MS', 'Impact', 'Comic Sans MS', 'Courier New', 'Lucida Console',
    'Palatino Linotype', 'Garamond', 'Bookman', 'Avant Garde', 'Optima'
  ]

  const addFont = (font: string) => {
    if (!selectedFonts.includes(font) && selectedFonts.length < 6) {
      setSelectedFonts([...selectedFonts, font])
    }
  }

  const removeFont = (font: string) => {
    if (selectedFonts.length > 1) {
      setSelectedFonts(selectedFonts.filter(f => f !== font))
    }
  }

  const handleCopyCSS = async () => {
    const css = `.custom-text {
  font-family: ${selectedFonts[0]};
  font-size: ${fontSize}px;
  font-weight: ${fontWeight};
  font-style: ${fontStyle};
  letter-spacing: ${letterSpacing}px;
  line-height: ${lineHeight};
  color: ${textColor};
  background-color: ${backgroundColor};
}`
    
    try {
      await navigator.clipboard.writeText(css)
      setCopied(true)
      toast.success('CSS copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleClear = () => {
    setFontSize(48)
    setFontWeight(400)
    setFontStyle('normal')
    setLetterSpacing(0)
    setLineHeight(1.5)
    setTextColor('#000000')
    setBackgroundColor('#ffffff')
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Live Font Preview Tool</h2>
        <p className="text-muted-foreground mt-2">
          Test and compare fonts with your own text. Adjust size, weight, spacing, and colors.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-4">
          <Card className="p-4 space-y-4">
            <div className="space-y-2">
              <Label>Sample Text:</Label>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to preview"
              />
            </div>

            <div className="space-y-2">
              <Label>Font Size: {fontSize}px</Label>
              <Slider
                value={[fontSize]}
                onValueChange={(v) => setFontSize(v[0])}
                min={12}
                max={120}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <Label>Font Weight: {fontWeight}</Label>
              <Slider
                value={[fontWeight]}
                onValueChange={(v) => setFontWeight(v[0])}
                min={100}
                max={900}
                step={100}
              />
            </div>

            <div className="space-y-2">
              <Label>Letter Spacing: {letterSpacing}px</Label>
              <Slider
                value={[letterSpacing]}
                onValueChange={(v) => setLetterSpacing(v[0])}
                min={-5}
                max={20}
                step={0.5}
              />
            </div>

            <div className="space-y-2">
              <Label>Line Height: {lineHeight}</Label>
              <Slider
                value={[lineHeight]}
                onValueChange={(v) => setLineHeight(v[0])}
                min={0.8}
                max={3}
                step={0.1}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Text Color:</Label>
                <Input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-full h-10"
                />
              </div>
              <div className="space-y-2">
                <Label>Background:</Label>
                <Input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-full h-10"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant={fontStyle === 'normal' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFontStyle('normal')}
              >
                Normal
              </Button>
              <Button
                variant={fontStyle === 'italic' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFontStyle('italic')}
              >
                Italic
              </Button>
            </div>

            <Button variant="ghost" size="sm" onClick={handleClear} className="w-full">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Settings
            </Button>
          </Card>

          <Card className="p-4">
            <Label className="mb-2 block">Add Font:</Label>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  addFont(e.target.value)
                  e.target.value = ''
                }
              }}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Select a font...</option>
              {availableFonts.filter(f => !selectedFonts.includes(f)).map(font => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Font Previews</Label>
            <Button variant="outline" size="sm" onClick={handleCopyCSS}>
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              Copy CSS
            </Button>
          </div>

          <div className="grid gap-4">
            {selectedFonts.map((font) => (
              <Card key={font} className="p-4 relative group">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-2">{font}</p>
                    <p
                      style={{
                        fontFamily: font,
                        fontSize: `${fontSize}px`,
                        fontWeight: fontWeight,
                        fontStyle: fontStyle,
                        letterSpacing: `${letterSpacing}px`,
                        lineHeight: lineHeight,
                        color: textColor,
                        backgroundColor: backgroundColor,
                      }}
                      className="transition-all"
                    >
                      {text}
                    </p>
                  </div>
                  {selectedFonts.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFont(font)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
