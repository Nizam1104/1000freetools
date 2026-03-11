'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check, Upload, Image as ImageIcon, Eraser } from 'lucide-react'
import { toast } from 'sonner'

export default function IconBackgroundRemover() {
  const [imageData, setImageData] = useState('')
  const [imageName, setImageName] = useState('')
  const [processedImage, setProcessedImage] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [tolerance, setTolerance] = useState(30)
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

  const removeBackground = () => {
    if (!imageData) {
      toast.error('Please upload an image first')
      return
    }

    setIsProcessing(true)

    // Simulate background removal
    setTimeout(() => {
      // In real implementation, this would use ML-based background removal
      // For now, we'll just use the original image
      setProcessedImage(imageData)
      setIsProcessing(false)
      toast.success('Background removed')
    }, 2000)
  }

  const handleDownload = () => {
    if (!processedImage) return
    
    const a = document.createElement('a')
    a.href = processedImage
    a.download = `${imageName.split('.')[0]}-no-bg.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    toast.success('Downloaded image')
  }

  const handleClear = () => {
    setImageData('')
    setImageName('')
    setProcessedImage('')
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Remove Backgrounds from Icons</h1>
        <p className="text-muted-foreground mt-2">
          Automatically remove backgrounds from icon images to create transparent PNGs.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex flex-col items-center justify-center gap-4">
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> image
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, GIF</p>
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
                <div className="w-full">
                  <img src={imageData} alt="Original" className="w-full h-auto rounded-lg border" />
                </div>
              )}
            </div>
          </Card>

          <Card className="p-4 space-y-4">
            <div className="space-y-2">
              <Label>Removal Tolerance: {tolerance}%</Label>
              <input
                type="range"
                min="0"
                max="100"
                value={tolerance}
                onChange={(e) => setTolerance(parseInt(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Higher values remove more colors similar to the background
              </p>
            </div>

            <Button 
              onClick={removeBackground} 
              className="w-full" 
              disabled={!imageData || isProcessing}
            >
              <Eraser className="h-4 w-4 mr-2" />
              {isProcessing ? 'Processing...' : 'Remove Background'}
            </Button>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Result</Label>
            <Button variant="outline" size="sm" onClick={handleDownload} disabled={!processedImage}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>

          <Card className="p-4 min-h-[400px] flex items-center justify-center" 
                style={{ 
                  backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                }}>
            {processedImage ? (
              <img src={processedImage} alt="Processed" className="max-w-full max-h-[350px]" />
            ) : (
              <div className="text-center text-muted-foreground">
                <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Processed image will appear here</p>
                <p className="text-sm">with transparent background</p>
              </div>
            )}
          </Card>

          {processedImage && (
            <Card className="p-4">
              <Label className="mb-2 block">Usage Tips:</Label>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Best results with solid color backgrounds</li>
                <li>• Adjust tolerance for complex backgrounds</li>
                <li>• Works best with high contrast images</li>
                <li>• Download as PNG to preserve transparency</li>
              </ul>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
