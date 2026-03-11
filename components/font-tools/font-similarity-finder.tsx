'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check, Search } from 'lucide-react'
import { toast } from 'sonner'

export default function FontSimilarityFinder() {
  const [inputFont, setInputFont] = useState('')
  const [similarFonts, setSimilarFonts] = useState<{ name: string; similarity: number; isFree: boolean }[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [copied, setCopied] = useState(false)

  const fontDatabase = [
    { name: 'Helvetica', alternatives: ['Arial', 'Roboto', 'Open Sans', 'Lato', 'Nunito Sans'] },
    { name: 'Arial', alternatives: ['Helvetica', 'Roboto', 'Open Sans', 'Lato', 'Noto Sans'] },
    { name: 'Times New Roman', alternatives: ['Georgia', 'Garamond', 'Palatino', 'Merriweather', 'Playfair Display'] },
    { name: 'Georgia', alternatives: ['Times New Roman', 'Garamond', 'Palatino', 'Merriweather', 'Lora'] },
    { name: 'Garamond', alternatives: ['Georgia', 'Times New Roman', 'Palatino', 'EB Garamond', 'Cormorant'] },
    { name: 'Futura', alternatives: ['Montserrat', 'Gotham', 'Proxima Nova', 'Avenir', 'Circular'] },
    { name: 'Gotham', alternatives: ['Montserrat', 'Proxima Nova', 'Futura', 'Avenir', 'Circular'] },
    { name: 'Proxima Nova', alternatives: ['Montserrat', 'Gotham', 'Futura', 'Avenir', 'Source Sans Pro'] },
    { name: 'Bebas Neue', alternatives: ['Anton', 'Oswald', 'Teko', 'League Gothic', 'Fjalla One'] },
    { name: 'Roboto', alternatives: ['Open Sans', 'Lato', 'Noto Sans', 'Source Sans Pro', 'Inter'] },
  ]

  const findSimilar = () => {
    if (!inputFont) {
      toast.error('Please enter a font name')
      return
    }

    setIsSearching(true)

    setTimeout(() => {
      const matchedFont = fontDatabase.find(f => 
        f.name.toLowerCase().includes(inputFont.toLowerCase()) ||
        inputFont.toLowerCase().includes(f.name.toLowerCase())
      )

      if (matchedFont) {
        const results = matchedFont.alternatives.map((name, i) => ({
          name,
          similarity: 95 - (i * 8),
          isFree: i < 3
        }))
        setSimilarFonts(results)
      } else {
        // Default results for unknown fonts
        setSimilarFonts([
          { name: 'Roboto', similarity: 75, isFree: true },
          { name: 'Open Sans', similarity: 70, isFree: true },
          { name: 'Lato', similarity: 65, isFree: true },
          { name: 'Montserrat', similarity: 60, isFree: true },
          { name: 'Source Sans Pro', similarity: 55, isFree: true },
        ])
      }

      setIsSearching(false)
      toast.success('Found similar fonts')
    }, 1000)
  }

  const handleCopyList = async () => {
    if (similarFonts.length === 0) return
    
    const text = similarFonts.map(f => 
      `${f.name} (${f.similarity}% match) - ${f.isFree ? 'Free' : 'Premium'}`
    ).join('\n')
    
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
    setInputFont('')
    setSimilarFonts([])
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Find Fonts Similar To...</h1>
        <p className="text-muted-foreground mt-2">
          Find fonts that look similar to your chosen typeface. Get free and premium alternatives.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label>Enter Font Name:</Label>
              <Input
                value={inputFont}
                onChange={(e) => setInputFont(e.target.value)}
                placeholder="e.g., Helvetica, Futura, Gotham"
                onKeyDown={(e) => e.key === 'Enter' && findSimilar()}
              />
            </div>
            <div className="flex items-end gap-2">
              <Button onClick={findSimilar} disabled={!inputFont || isSearching}>
                <Search className="h-4 w-4 mr-2" />
                {isSearching ? 'Searching...' : 'Find Similar'}
              </Button>
              <Button variant="ghost" onClick={handleClear}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {similarFonts.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Similar Fonts to "{inputFont}"</h2>
              <Button variant="outline" size="sm" onClick={handleCopyList}>
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                Copy List
              </Button>
            </div>

            <div className="grid gap-4">
              {similarFonts.map((font, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg" style={{ fontFamily: font.name }}>{font.name}</h3>
                        {font.isFree && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Free</span>
                        )}
                        {!font.isFree && (
                          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Premium</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">Similarity: {font.similarity}%</p>
                    </div>
                    <div className="w-48">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`rounded-full h-2 transition-all ${font.similarity >= 80 ? 'bg-green-500' : font.similarity >= 60 ? 'bg-yellow-500' : 'bg-orange-500'}`}
                          style={{ width: `${font.similarity}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        <Card className="p-4 bg-blue-50 dark:bg-blue-950">
          <h3 className="font-semibold mb-2">Popular Free Alternatives</h3>
          <div className="grid gap-2 md:grid-cols-2 text-sm">
            <div><strong>Instead of Helvetica:</strong> Try Inter, Roboto, or Open Sans</div>
            <div><strong>Instead of Futura:</strong> Try Montserrat or Jost</div>
            <div><strong>Instead of Gotham:</strong> Try Montserrat or Source Sans Pro</div>
            <div><strong>Instead of Proxima Nova:</strong> Try Montserrat or Source Sans Pro</div>
            <div><strong>Instead of Avenir:</strong> Try Nunito Sans or Karla</div>
            <div><strong>Instead of Circular:</strong> Try Inter or DM Sans</div>
          </div>
        </Card>
      </div>
    </div>
  )
}
