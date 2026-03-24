'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check, Upload, FileUp } from 'lucide-react'
import { toast } from 'sonner'

export default function FontConverter() {
  const [fontFile, setFontFile] = useState<File | null>(null)
  const [fontName, setFontName] = useState('')
  const [targetFormat, setTargetFormat] = useState<'woff2' | 'woff' | 'ttf' | 'otf' | 'eot'>('woff2')
  const [convertedData, setConvertedData] = useState('')
  const [isConverting, setIsConverting] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setFontFile(file)
    setFontName(file.name)
    toast.success(`Loaded ${file.name}`)
  }

  const convertFont = () => {
    if (!fontFile) {
      toast.error('Please upload a font file first')
      return
    }
    
    setIsConverting(true)
    
    // Simulate font conversion
    setTimeout(() => {
      // In real implementation, this would use a font conversion library
      const mockConvertedData = `Converted font data for ${fontName} to ${targetFormat.toUpperCase()}`
      setConvertedData(mockConvertedData)
      setIsConverting(false)
      toast.success(`Converted to ${targetFormat.toUpperCase()}`)
    }, 1500)
  }

  const handleDownload = () => {
    if (!convertedData) return
    
    const extension = targetFormat
    const blob = new Blob([convertedData], { type: 'font/' + targetFormat })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${fontName.split('.')[0]}.${extension}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success(`Downloaded ${fontName.split('.')[0]}.${extension}`)
  }

  const handleCopyCSS = async () => {
    if (!fontName) return
    
    const css = `@font-face {
  font-family: '${fontName.split('.')[0]}';
  src: url('${fontName.split('.')[0]}.${targetFormat}') format('${targetFormat}');
  font-weight: normal;
  font-style: normal;
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
    setConvertedData('')
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Font File Converter</h2>
        <p className="text-muted-foreground mt-2">
          Convert font files between TTF, OTF, WOFF, WOFF2, EOT, and SVG formats.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FileUp className="w-10 h-10 mb-3 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> font file
                </p>
                <p className="text-xs text-muted-foreground">TTF, OTF, WOFF, WOFF2, EOT</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".ttf,.otf,.woff,.woff2,.eot"
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
          <Label>Convert To:</Label>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={targetFormat === 'woff2' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTargetFormat('woff2')}
            >
              WOFF2
            </Button>
            <Button
              variant={targetFormat === 'woff' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTargetFormat('woff')}
            >
              WOFF
            </Button>
            <Button
              variant={targetFormat === 'ttf' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTargetFormat('ttf')}
            >
              TTF
            </Button>
            <Button
              variant={targetFormat === 'otf' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTargetFormat('otf')}
            >
              OTF
            </Button>
            <Button
              variant={targetFormat === 'eot' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTargetFormat('eot')}
            >
              EOT
            </Button>
          </div>
        </div>

        <Button 
          onClick={convertFont} 
          className="w-full" 
          disabled={!fontFile || isConverting}
        >
          {isConverting ? 'Converting...' : `Convert to ${targetFormat.toUpperCase()}`}
        </Button>

        {convertedData && (
          <div className="space-y-4">
            <Card className="p-4 bg-green-50 dark:bg-green-950">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-green-700 dark:text-green-300">Conversion Complete!</h3>
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
              <pre className="bg-white dark:bg-gray-900 p-4 rounded text-xs font-mono overflow-x-auto">
{`@font-face {
  font-family: '${fontName.split('.')[0]}';
  src: url('${fontName.split('.')[0]}.${targetFormat}') format('${targetFormat}');
  font-weight: normal;
  font-style: normal;
}`}
              </pre>
            </Card>
          </div>
        )}

        <Card className="p-4 bg-blue-50 dark:bg-blue-950">
          <h3 className="font-semibold mb-2">Font Format Guide</h3>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li><strong>WOFF2:</strong> Best compression, modern browsers</li>
            <li><strong>WOFF:</strong> Good compression, wide browser support</li>
            <li><strong>TTF:</strong> Universal support, larger file size</li>
            <li><strong>OTF:</strong> Advanced typography features</li>
            <li><strong>EOT:</strong> Legacy Internet Explorer support</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
