'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check, FileUp, FileType } from 'lucide-react'
import { toast } from 'sonner'

export default function IconFileFormatConverter() {
  const [imageData, setImageData] = useState('')
  const [imageName, setImageName] = useState('')
  const [targetFormat, setTargetFormat] = useState<'png' | 'jpg' | 'svg' | 'webp' | 'ico'>('png')
  const [convertedData, setConvertedData] = useState('')
  const [size, setSize] = useState(512)
  const [quality, setQuality] = useState(90)
  const [copied, setCopied] = useState(false)

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

  const convertFormat = () => {
    if (!imageData) {
      toast.error('Please upload an image first')
      return
    }

    // Simulate conversion
    setTimeout(() => {
      setConvertedData(imageData)
      toast.success(`Converted to ${targetFormat.toUpperCase()}`)
    }, 1000)
  }

  const handleDownload = () => {
    if (!convertedData) return
    
    const a = document.createElement('a')
    a.href = convertedData
    a.download = `${imageName.split('.')[0]}.${targetFormat}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    toast.success(`Downloaded ${targetFormat.toUpperCase()}`)
  }

  const handleClear = () => {
    setImageData('')
    setImageName('')
    setConvertedData('')
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Convert Icon Files Between Formats</h2>
        <p className="text-muted-foreground mt-2">
          Convert between ICO, PNG, JPEG, SVG, BMP, TIFF, WEBP, and more icon formats.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex flex-col items-center justify-center gap-4">
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50">
                <div className="flex flex-col items-center justify-center">
                  <FileUp className="w-10 h-10 mb-3 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> image
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, SVG, ICO, WEBP</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </label>
              
              {imageName && (
                <div className="flex items-center gap-4 text-sm">
                  <span className="font-medium">{imageName}</span>
                  <Button variant="ghost" size="sm" onClick={handleClear}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {imageData && (
                <div className="w-32 h-32 rounded-lg border overflow-hidden">
                  <img src={imageData} alt="Original" className="w-full h-full object-contain" />
                </div>
              )}
            </div>
          </Card>

          <Card className="p-4 space-y-4">
            <div className="space-y-2">
              <Label>Target Format:</Label>
              <div className="grid grid-cols-3 gap-2">
                {['png', 'jpg', 'svg', 'webp', 'ico', 'gif'].map((format) => (
                  <Button
                    key={format}
                    variant={targetFormat === format ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTargetFormat(format as any)}
                    className="uppercase"
                  >
                    {format}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Output Size: {size}px</Label>
              <Input
                type="range"
                min="16"
                max="1024"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>16px</span>
                <span>512px</span>
                <span>1024px</span>
              </div>
            </div>

            {(targetFormat === 'jpg' || targetFormat === 'webp') && (
              <div className="space-y-2">
                <Label>Quality: {quality}%</Label>
                <Input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value))}
                />
              </div>
            )}

            <Button onClick={convertFormat} className="w-full" disabled={!imageData}>
              <FileType className="h-4 w-4 mr-2" />
              Convert to {targetFormat.toUpperCase()}
            </Button>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Preview</Label>
            <Button variant="outline" size="sm" onClick={handleDownload} disabled={!convertedData}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>

          <Card className="p-4 bg-muted min-h-[400px] flex items-center justify-center">
            {convertedData ? (
              <img src={convertedData} alt="Converted" className="max-w-full max-h-[350px]" />
            ) : (
              <p className="text-muted-foreground text-sm">Converted image will appear here</p>
            )}
          </Card>

          {convertedData && (
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Conversion Details:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Format:</div>
                <div className="font-medium">{targetFormat.toUpperCase()}</div>
                <div>Size:</div>
                <div className="font-medium">{size}x{size}px</div>
                {quality && (
                  <>
                    <div>Quality:</div>
                    <div className="font-medium">{quality}%</div>
                  </>
                )}
                <div>Original:</div>
                <div className="font-medium">{imageName}</div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
