'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Copy, Download, RotateCcw, Check, Upload, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'

export default function SvgToPngIconConverter() {
  const [svgData, setSvgData] = useState('')
  const [svgName, setSvgName] = useState('')
  const [size, setSize] = useState(512)
  const [scale, setScale] = useState(1)
  const [transparent, setTransparent] = useState(true)
  const [pngData, setPngData] = useState('')
  const [copied, setCopied] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setSvgName(file.name)
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setSvgData(content)
      toast.success(`Loaded ${file.name}`)
    }
    reader.readAsText(file)
  }

  const convertToPng = () => {
    if (!svgData) {
      toast.error('Please upload an SVG file first')
      return
    }

    try {
      // Create image from SVG
      const img = new Image()
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(svgBlob)
      
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const actualSize = size * scale
        canvas.width = actualSize
        canvas.height = actualSize
        
        const ctx = canvas.getContext('2d')
        if (ctx) {
          if (!transparent) {
            ctx.fillStyle = '#ffffff'
            ctx.fillRect(0, 0, actualSize, actualSize)
          }
          ctx.drawImage(img, 0, 0, actualSize, actualSize)
          
          const pngDataUrl = canvas.toDataURL('image/png')
          setPngData(pngDataUrl)
          toast.success('Converted to PNG')
        }
        
        URL.revokeObjectURL(url)
      }
      
      img.src = url
    } catch (err) {
      toast.error('Conversion failed')
    }
  }

  const handleDownload = () => {
    if (!pngData) return
    
    const a = document.createElement('a')
    a.href = pngData
    a.download = `${svgName.split('.')[0] || 'icon'}_${size}px.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    toast.success('Downloaded PNG')
  }

  const handleClear = () => {
    setSvgData('')
    setSvgName('')
    setPngData('')
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Convert SVG Icons to PNG</h1>
        <p className="text-muted-foreground mt-2">
          Convert SVG icon files to PNG format with customizable size and transparency.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex flex-col items-center justify-center gap-4">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> SVG
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".svg"
                  onChange={handleFileUpload}
                />
              </label>
              
              {svgName && (
                <div className="flex items-center gap-4 text-sm">
                  <span className="font-medium">{svgName}</span>
                  <Button variant="ghost" size="sm" onClick={handleClear}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-4 space-y-4">
            <div className="space-y-2">
              <Label>Output Size: {size}px</Label>
              <Slider
                value={[size]}
                onValueChange={(v) => setSize(v[0])}
                min={16}
                max={1024}
                step={16}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>16px</span>
                <span>512px</span>
                <span>1024px</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Scale: {scale}x</Label>
              <Slider
                value={[scale]}
                onValueChange={(v) => setScale(v[0])}
                min={1}
                max={3}
                step={0.5}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="transparent"
                checked={transparent}
                onChange={(e) => setTransparent(e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="transparent" className="cursor-pointer">Transparent Background</Label>
            </div>

            <Button onClick={convertToPng} className="w-full" disabled={!svgData}>
              <ImageIcon className="h-4 w-4 mr-2" />
              Convert to PNG
            </Button>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Preview</Label>
            <Button variant="outline" size="sm" onClick={handleDownload} disabled={!pngData}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>

          <Card className="p-4 bg-muted min-h-[400px] flex items-center justify-center">
            {pngData ? (
              <img src={pngData} alt="Converted PNG" className="max-w-full max-h-[350px]" />
            ) : svgData ? (
              <div dangerouslySetInnerHTML={{ __html: svgData }} className="max-w-[200px] max-h-[200px]" />
            ) : (
              <p className="text-muted-foreground text-sm">PNG preview will appear here</p>
            )}
          </Card>

          {pngData && (
            <Card className="p-4">
              <Label className="mb-2 block">Download Options:</Label>
              <div className="grid grid-cols-3 gap-2">
                {[16, 32, 64, 128, 256, 512].map((s) => (
                  <Button
                    key={s}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSize(s)
                      toast.info(`Size set to ${s}px`)
                    }}
                  >
                    {s}px
                  </Button>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
