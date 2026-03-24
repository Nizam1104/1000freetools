'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Copy, Download, RotateCcw, Check, Type } from 'lucide-react'
import { toast } from 'sonner'

export default function FontKerningAdjuster() {
  const [text, setText] = useState('AVATAR')
  const [kerning, setKerning] = useState(0)
  const [tracking, setTracking] = useState(0)
  const [fontSize, setFontSize] = useState(72)
  const [selectedPair, setSelectedPair] = useState<{ left: string; right: string }>({ left: 'A', right: 'V' })
  const [pairKerning, setPairKerning] = useState(0)
  const [copied, setCopied] = useState(false)

  const handleCopyCSS = async () => {
    const css = `.custom-text {
  font-size: ${fontSize}px;
  letter-spacing: ${tracking}px;
  font-kerning: normal;
}

/* Custom kerning for specific pairs */
.${selectedPair.left}${selectedPair.right} {
  margin-right: ${pairKerning}px;
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

  const handleDownload = () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="200">
  <text x="50%" y="50%" text-anchor="middle" 
        font-size="${fontSize}" 
        letter-spacing="${tracking}"
        font-family="Arial, sans-serif">
    ${text}
  </text>
</svg>`
    
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'kerned-text.svg'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded kerned-text.svg')
  }

  const handleClear = () => {
    setKerning(0)
    setTracking(0)
    setPairKerning(0)
    setFontSize(72)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Letter Spacing & Kerning Tool</h2>
        <p className="text-muted-foreground mt-2">
          Perfect the spacing between letters for logos, headlines, and display text.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="p-6 space-y-6">
          <div className="space-y-2">
            <Label>Text to Adjust:</Label>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value.toUpperCase())}
              placeholder="Enter text"
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label>Tracking (Overall Letter Spacing): {tracking}px</Label>
            <Slider
              value={[tracking]}
              onValueChange={(v) => setTracking(v[0])}
              min={-20}
              max={50}
              step={0.5}
            />
          </div>

          <div className="space-y-2">
            <Label>Font Size: {fontSize}px</Label>
            <Slider
              value={[fontSize]}
              onValueChange={(v) => setFontSize(v[0])}
              min={24}
              max={200}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <Label>Pair Kerning (Specific Letter Pairs):</Label>
            <div className="flex gap-4 items-center">
              <Input
                value={selectedPair.left}
                onChange={(e) => setSelectedPair({ ...selectedPair, left: e.target.value[0] || 'A' })}
                className="w-16 text-center text-xl"
                maxLength={1}
              />
              <Slider
                value={[pairKerning]}
                onValueChange={(v) => setPairKerning(v[0])}
                min={-20}
                max={20}
                step={0.5}
                className="flex-1"
              />
              <Input
                value={selectedPair.right}
                onChange={(e) => setSelectedPair({ ...selectedPair, right: e.target.value[0] || 'V' })}
                className="w-16 text-center text-xl"
                maxLength={1}
              />
              <span className="text-sm text-muted-foreground w-20">{pairKerning}px</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={handleClear}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </Card>

        <Card className="p-8">
          <Label className="mb-4 block">Preview:</Label>
          <div 
            className="text-center border-b pb-8"
            style={{
              fontSize: `${fontSize}px`,
              letterSpacing: `${tracking}px`,
            }}
          >
            {text.split('').map((char, i) => {
              const pairKey = `${char}${text[i + 1] || ''}`
              const isTargetPair = `${selectedPair.left}${selectedPair.right}` === pairKey
              return (
                <span
                  key={i}
                  style={{
                    marginRight: isTargetPair ? `${pairKerning}px` : undefined,
                    backgroundColor: isTargetPair ? 'rgba(59, 130, 246, 0.2)' : undefined,
                    borderRadius: isTargetPair ? '4px' : undefined,
                  }}
                >
                  {char}
                </span>
              )
            })}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Highlighted pair: {selectedPair.left}{selectedPair.right} ({pairKerning}px adjustment)
          </p>
        </Card>

        <div className="flex gap-4">
          <Button className="flex-1" onClick={handleCopyCSS}>
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            Copy CSS
          </Button>
          <Button className="flex-1" variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download SVG
          </Button>
        </div>

        <Card className="p-4 bg-blue-50 dark:bg-blue-950">
          <h3 className="font-semibold mb-2">Kerning Tips</h3>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Tighten spacing for large display text (headlines, logos)</li>
            <li>• Loosen spacing for small text or all-caps text</li>
            <li>• Common problem pairs: AV, WA, To, Yo, LT</li>
            <li>• Optically adjust, not mathematically - trust your eyes</li>
            <li>• View at actual size before finalizing</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
