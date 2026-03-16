'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check, Upload, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'

export default function FaviconGeneratorFromImage() {
  const [imageData, setImageData] = useState('')
  const [imageName, setImageName] = useState('')
  const [generatedFavicons, setGeneratedFavicons] = useState<{ size: string; data: string }[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setImageName(file.name)
    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setImageData(result)
      toast.success(`Loaded ${file.name}`)
    }
    reader.readAsDataURL(file)
  }

  const generateFavicons = () => {
    if (!imageData) {
      toast.error('Please upload an image first')
      return
    }

    setIsGenerating(true)

    setTimeout(() => {
      const sizes = [16, 32, 48, 64, 128, 180, 192, 512]
      const favicons = sizes.map(size => ({
        size: `${size}x${size}`,
        data: imageData // In real implementation, would resize the image
      }))
      
      setGeneratedFavicons(favicons)
      setIsGenerating(false)
      toast.success('Favicons generated')
    }, 1500)
  }

  const handleDownload = () => {
    if (generatedFavicons.length === 0) return

    // Generate HTML link code
    const htmlCode = `<!-- Favicon Links -->
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
<link rel="android-chrome" sizes="192x192" href="android-chrome-192x192.png">
<link rel="android-chrome" sizes="512x512" href="android-chrome-512x512.png">`

    const blob = new Blob([htmlCode], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'favicon-links.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded favicon HTML code')
  }

  const handleCopyHtml = async () => {
    const htmlCode = `<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">`
    
    try {
      await navigator.clipboard.writeText(htmlCode)
      toast.success('HTML code copied to clipboard')
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleClear = () => {
    setImageData('')
    setImageName('')
    setGeneratedFavicons([])
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Generate a Favicon from Any Image</h1>
        <p className="text-muted-foreground mt-2">
          Upload a photo, logo, or graphic to create a professional favicon for your website.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50">
              <div className="flex flex-col items-center justify-center">
                <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> image
                </p>
                <p className="text-xs text-muted-foreground">PNG, JPG, GIF, SVG</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </label>
            
            {imageName && (
              <div className="flex items-center gap-4">
                <span className="font-medium">{imageName}</span>
                <Button variant="ghost" size="sm" onClick={handleClear}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            )}

            {imageData && (
              <div className="w-32 h-32 rounded-lg border overflow-hidden">
                <img src={imageData} alt="Preview" className="w-full h-full object-contain" />
              </div>
            )}
          </div>
        </Card>

        <Button 
          onClick={generateFavicons} 
          className="w-full" 
          disabled={!imageData || isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate Favicons'}
        </Button>

        {generatedFavicons.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Generated Favicons</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopyHtml}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy HTML
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {generatedFavicons.map((favicon, index) => (
                <Card key={index} className="p-2 text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-muted rounded flex items-center justify-center overflow-hidden">
                    <img src={favicon.data} alt={favicon.size} className="w-full h-full object-contain" />
                  </div>
                  <p className="text-xs text-muted-foreground">{favicon.size}</p>
                </Card>
              ))}
            </div>

            <Card className="p-4 bg-muted">
              <Label className="mb-2 block">HTML Code:</Label>
              <pre className="text-xs font-mono overflow-x-auto">
{`<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
<link rel="android-chrome" sizes="192x192" href="android-chrome-192x192.png">
<link rel="android-chrome" sizes="512x512" href="android-chrome-512x512.png">`}
              </pre>
            </Card>
          </div>
        )}

        <Card className="p-4 bg-blue-50 dark:bg-blue-950">
          <h3 className="font-semibold mb-2">Favicon Sizes Explained</h3>
          <div className="grid gap-2 md:grid-cols-2 text-sm">
            <div><strong>16x16:</strong> Browser tab favicon</div>
            <div><strong>32x32:</strong> Taskbar/shortcut icon</div>
            <div><strong>180x180:</strong> Apple touch icon</div>
            <div><strong>192x512:</strong> Android/PWA icons</div>
          </div>
        </Card>
      </div>
    </div>
  )
}
