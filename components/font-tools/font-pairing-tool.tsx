'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Copy, Download, RotateCcw, Check, Palette } from 'lucide-react'
import { toast } from 'sonner'

export default function FontPairingTool() {
  const [headingFont, setHeadingFont] = useState('Playfair Display')
  const [bodyFont, setBodyFont] = useState('Source Sans Pro')
  const [sampleHeading, setSampleHeading] = useState('Beautiful Typography')
  const [sampleBody, setSampleBody] = useState('Good typography is invisible. It allows the reader to focus on the content rather than the design. The right font pairing can elevate your design and improve readability.')
  const [headingSize, setHeadingSize] = useState(48)
  const [bodySize, setBodySize] = useState(16)
  const [copied, setCopied] = useState(false)

  const fontPairs = [
    { heading: 'Playfair Display', body: 'Source Sans Pro', category: 'Classic' },
    { heading: 'Montserrat', body: 'Merriweather', category: 'Modern' },
    { heading: 'Oswald', body: 'Open Sans', category: 'Bold' },
    { heading: 'Lato', body: 'Lora', category: 'Clean' },
    { heading: 'Raleway', body: 'Roboto', category: 'Elegant' },
    { heading: 'Poppins', body: 'Nunito', category: 'Friendly' },
    { heading: 'Bebas Neue', body: 'Lato', category: 'Impact' },
    { heading: 'Anton', body: 'PT Sans', category: 'Strong' },
  ]

  const applyPair = (pair: typeof fontPairs[0]) => {
    setHeadingFont(pair.heading)
    setBodyFont(pair.body)
    toast.success(`Applied ${pair.category} pairing`)
  }

  const handleCopyCSS = async () => {
    const css = `/* Font Pairing CSS */
@import url('https://fonts.googleapis.com/css2?family=${headingFont.replace(/ /g, '+')}&family=${bodyFont.replace(/ /g, '+')}');

:root {
  --heading-font: '${headingFont}', serif;
  --body-font: '${bodyFont}', sans-serif;
  --heading-size: ${headingSize}px;
  --body-size: ${bodySize}px;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--heading-font);
  font-size: var(--heading-size);
  font-weight: 700;
  line-height: 1.2;
}

body, p, span, div {
  font-family: var(--body-font);
  font-size: var(--body-size);
  line-height: 1.6;
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
    setHeadingFont('Playfair Display')
    setBodyFont('Source Sans Pro')
    setHeadingSize(48)
    setBodySize(16)
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Font Pairing Generator</h1>
        <p className="text-muted-foreground mt-2">
          Discover perfect font combinations for your designs. Test and preview pairings in real-time.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-4">
          <Card className="p-4 space-y-4">
            <div className="space-y-2">
              <Label>Heading Font:</Label>
              <select
                value={headingFont}
                onChange={(e) => setHeadingFont(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                style={{ fontFamily: headingFont }}
              >
                {fontPairs.map(pair => (
                  <option key={pair.heading} value={pair.heading} style={{ fontFamily: pair.heading }}>
                    {pair.heading}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Body Font:</Label>
              <select
                value={bodyFont}
                onChange={(e) => setBodyFont(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                style={{ fontFamily: bodyFont }}
              >
                {fontPairs.map(pair => (
                  <option key={pair.body} value={pair.body} style={{ fontFamily: pair.body }}>
                    {pair.body}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Heading Size: {headingSize}px</Label>
              <Input
                type="range"
                min="24"
                max="96"
                value={headingSize}
                onChange={(e) => setHeadingSize(parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label>Body Size: {bodySize}px</Label>
              <Input
                type="range"
                min="12"
                max="32"
                value={bodySize}
                onChange={(e) => setBodySize(parseInt(e.target.value))}
              />
            </div>

            <Button variant="ghost" size="sm" onClick={handleClear} className="w-full">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </Card>

          <Card className="p-4">
            <Label className="mb-3 block">Quick Pairings:</Label>
            <div className="grid grid-cols-2 gap-2">
              {fontPairs.map((pair, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => applyPair(pair)}
                  className="h-auto py-2"
                >
                  <span className="text-xs">{pair.category}</span>
                </Button>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Live Preview</Label>
            <Button variant="outline" size="sm" onClick={handleCopyCSS}>
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              Copy CSS
            </Button>
          </div>

          <Card className="p-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Heading Preview</Label>
                <Input
                  value={sampleHeading}
                  onChange={(e) => setSampleHeading(e.target.value)}
                  className="text-muted-foreground"
                />
                <h1
                  style={{
                    fontFamily: headingFont,
                    fontSize: `${headingSize}px`,
                  }}
                  className="font-bold"
                >
                  {sampleHeading}
                </h1>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Body Text Preview</Label>
                <Textarea
                  value={sampleBody}
                  onChange={(e) => setSampleBody(e.target.value)}
                  className="text-muted-foreground min-h-[80px]"
                />
                <p
                  style={{
                    fontFamily: bodyFont,
                    fontSize: `${bodySize}px`,
                  }}
                  className="leading-relaxed"
                >
                  {sampleBody}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-muted">
            <h3 className="font-semibold mb-2">Generated CSS</h3>
            <pre className="text-xs font-mono overflow-x-auto">
{`@import url('https://fonts.googleapis.com/css2?family=${headingFont.replace(/ /g, '+')}&family=${bodyFont.replace(/ /g, '+')}');

h1 { font-family: '${headingFont}'; font-size: ${headingSize}px; }
p { font-family: '${bodyFont}'; font-size: ${bodySize}px; }`}
            </pre>
          </Card>
        </div>
      </div>
    </div>
  )
}
