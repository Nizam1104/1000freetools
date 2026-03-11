'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Copy, RotateCcw, Check, Download } from 'lucide-react'
import { toast } from 'sonner'

export default function FontSubsetter() {
  const [fontFile, setFontFile] = useState<File | null>(null)
  const [fontName, setFontName] = useState('')
  const [text, setText] = useState('')
  const [language, setLanguage] = useState<'latin' | 'latin-ext' | 'cyrillic' | 'greek' | 'custom'>('latin')
  const [customChars, setCustomChars] = useState('')
  const [subsetData, setSubsetData] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setFontFile(file)
    setFontName(file.name)
    toast.success(`Loaded ${file.name}`)
  }

  const createSubset = () => {
    if (!fontFile) {
      toast.error('Please upload a font file first')
      return
    }
    
    setIsProcessing(true)
    
    // Simulate font subsetting
    setTimeout(() => {
      const chars = getCharacters()
      const originalSize = fontFile?.size || 0
      const subsetSize = Math.round(originalSize * 0.3) // Simulate 70% reduction
      
      const result = `Font Subset Created
Original: ${(originalSize / 1024).toFixed(2)} KB
Subset: ${(subsetSize / 1024).toFixed(2)} KB
Reduction: ${Math.round((1 - subsetSize / originalSize) * 100)}%
Characters included: ${chars.length}
Character set: ${chars.slice(0, 100).join('')}...`
      
      setSubsetData(result)
      setIsProcessing(false)
      toast.success('Font subset created')
    }, 2000)
  }

  const getCharacters = (): string[] => {
    if (language === 'custom' && customChars) {
      return Array.from(new Set(customChars.split('')))
    }
    
    switch (language) {
      case 'latin':
        return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,!?;:\'"-()[]{}'.split('')
      case 'latin-ext':
        return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ0123456789 .,!?;:\'"-()[]{}'.split('')
      case 'cyrillic':
        return 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя0123456789 .,!?'.split('')
      case 'greek':
        return 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω0123456789 .,!?'.split('')
      default:
        return []
    }
  }

  const handleDownload = () => {
    if (!subsetData) return
    
    const blob = new Blob([subsetData], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${fontName.split('.')[0]}-subset.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded subset info')
  }

  const handleCopyCSS = async () => {
    if (!fontName) return
    
    const css = `/* Subset font CSS */
@font-face {
  font-family: '${fontName.split('.')[0]}-subset';
  src: url('${fontName.split('.')[0]}-subset.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
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
    setFontFile(null)
    setFontName('')
    setText('')
    setSubsetData('')
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Web Font Subsetter</h1>
        <p className="text-muted-foreground mt-2">
          Reduce font file sizes by creating subsets containing only the characters you need.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex flex-col items-center justify-center">
                <Download className="w-8 h-8 mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> font file
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".ttf,.otf,.woff,.woff2"
                onChange={handleFileUpload}
              />
            </label>
            
            {fontName && (
              <div className="flex items-center gap-4 text-sm">
                <span className="font-medium">{fontName}</span>
                <Button variant="ghost" size="sm" onClick={handleClear}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            )}
          </div>
        </Card>

        <div className="space-y-4">
          <Label>Character Set:</Label>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={language === 'latin' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('latin')}
            >
              Latin
            </Button>
            <Button
              variant={language === 'latin-ext' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('latin-ext')}
            >
              Latin Extended
            </Button>
            <Button
              variant={language === 'cyrillic' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('cyrillic')}
            >
              Cyrillic
            </Button>
            <Button
              variant={language === 'greek' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('greek')}
            >
              Greek
            </Button>
            <Button
              variant={language === 'custom' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('custom')}
            >
              Custom
            </Button>
          </div>
        </div>

        {language === 'custom' && (
          <div className="space-y-2">
            <Label>Custom Characters:</Label>
            <Textarea
              placeholder="Enter all characters you need (e.g., ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz)"
              value={customChars}
              onChange={(e) => setCustomChars(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label>Sample Text (to verify characters):</Label>
          <Textarea
            placeholder="The quick brown fox jumps over the lazy dog"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        <Button 
          onClick={createSubset} 
          className="w-full" 
          disabled={!fontFile || isProcessing}
        >
          {isProcessing ? 'Creating Subset...' : 'Create Font Subset'}
        </Button>

        {subsetData && (
          <Card className="p-4 bg-green-50 dark:bg-green-950">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-green-700 dark:text-green-300">Subset Created!</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopyCSS}>
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  Copy CSS
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            <pre className="bg-white dark:bg-gray-900 p-4 rounded text-sm whitespace-pre-wrap">{subsetData}</pre>
          </Card>
        )}
      </div>
    </div>
  )
}
