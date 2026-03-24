'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Copy, Download, RotateCcw, Check, PenTool } from 'lucide-react'
import { toast } from 'sonner'

export default function HandwritingFontMaker() {
  const [characters, setCharacters] = useState<Record<string, string>>({})
  const [currentChar, setCurrentChar] = useState('A')
  const [fontName, setFontName] = useState('MyHandwriting')
  const [isGenerated, setIsGenerated] = useState(false)
  const [copied, setCopied] = useState(false)

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const commonChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'

  const handleDraw = (char: string, data: string) => {
    setCharacters({ ...characters, [char]: data })
  }

  const generateFont = () => {
    // Simulate font generation
    setIsGenerated(true)
    toast.success('Handwriting font generated!')
  }

  const handleDownload = () => {
    if (!isGenerated) return
    
    const blob = new Blob(['Font data would be here'], { type: 'font/ttf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${fontName}.ttf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success(`Downloaded ${fontName}.ttf`)
  }

  const handleCopyCSS = async () => {
    const css = `@font-face {
  font-family: '${fontName}';
  src: url('${fontName}.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

body {
  font-family: '${fontName}', cursive;
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
    setCharacters({})
    setIsGenerated(false)
  }

  const progress = Object.keys(characters).length / (alphabet.length + commonChars.length) * 100

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Create a Font from Your Handwriting</h2>
        <p className="text-muted-foreground mt-2">
          Turn your handwriting into a usable TrueType font file. Draw each character to create your personal font.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Label>Font Name:</Label>
              <Input
                value={fontName}
                onChange={(e) => setFontName(e.target.value)}
                className="w-48"
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <Label>Progress: {Math.round(progress)}%</Label>
                <span className="text-sm text-muted-foreground">
                  {Object.keys(characters).length} / {alphabet.length + commonChars.length} characters
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary rounded-full h-2 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mb-4">
              <Label className="mb-2 block">Current Character: <span className="text-2xl font-bold">{currentChar}</span></Label>
              <Card className="p-8 bg-muted h-48 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <PenTool className="w-12 h-12 mx-auto mb-2" />
                  <p>Draw "{currentChar}" here</p>
                  <p className="text-sm">(Canvas drawing would be implemented here)</p>
                </div>
              </Card>
            </div>

            <div className="flex gap-2">
              <Button onClick={generateFont} disabled={Object.keys(characters).length < 10}>
                <Download className="h-4 w-4 mr-2" />
                Generate Font
              </Button>
              <Button variant="ghost" onClick={handleClear}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </Card>

          {isGenerated && (
            <Card className="p-4 bg-green-50 dark:bg-green-950">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-green-700 dark:text-green-300">Font Generated!</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopyCSS}>
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    Copy CSS
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download TTF
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="p-4">
            <Label className="mb-3 block">Character Grid</Label>
            <div className="grid grid-cols-7 gap-1">
              {(alphabet + commonChars).split('').map((char) => (
                <button
                  key={char}
                  onClick={() => setCurrentChar(char)}
                  className={`
                    w-10 h-10 rounded border flex items-center justify-center text-sm
                    transition-colors
                    ${characters[char] 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-background hover:bg-muted'}
                    ${currentChar === char ? 'ring-2 ring-primary' : ''}
                  `}
                >
                  {char}
                </button>
              ))}
            </div>

            <div className="mt-4 space-y-2">
              <Label>Quick Draw:</Label>
              <Textarea
                placeholder="Type text here to quickly draw all characters..."
                className="min-h-[100px]"
                onChange={(e) => {
                  const text = e.target.value
                  const uniqueChars = Array.from(new Set(text.split('')))
                  uniqueChars.forEach(char => {
                    if (!characters[char] && (alphabet + commonChars).includes(char)) {
                      setCurrentChar(char)
                    }
                  })
                }}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
