"use client"

import * as React from "react"
import { useState, useCallback, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Copy, Check, Trash2, Download, Upload, Wand2, Image as ImageIcon, ArrowLeftRight, RefreshCw, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BarcodeRepair() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [repairedImage, setRepairedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  
  // Repair settings
  const [contrast, setContrast] = useState<number>(100)
  const [brightness, setBrightness] = useState<number>(100)
  const [sharpness, setSharpness] = useState<number>(50)
  const [denoise, setDenoise] = useState<number>(30)
  const [threshold, setThreshold] = useState<number>(128)
  const [autoThreshold, setAutoThreshold] = useState<boolean>(true)
  const [invertColors, setInvertColors] = useState<boolean>(false)
  const [removeBackground, setRemoveBackground] = useState<boolean>(true)
  const [enhanceEdges, setEnhanceEdges] = useState<boolean>(true)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file")
      return
    }

    setError(null)
    setRepairedImage(null)

    const reader = new FileReader()
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
    event.target.value = ""
  }, [])

  const applyImageFilter = useCallback((
    imageData: ImageData,
    settings: {
      contrast: number
      brightness: number
      sharpness: number
      denoise: number
      threshold: number
      autoThreshold: boolean
      invertColors: boolean
      removeBackground: boolean
      enhanceEdges: boolean
    }
  ): ImageData => {
    const data = imageData.data
    const width = imageData.width
    const height = imageData.height
    const output = new Uint8ClampedArray(data.length)

    // Calculate auto threshold if enabled
    let autoThresholdValue = settings.threshold
    if (settings.autoThreshold) {
      let totalBrightness = 0
      for (let i = 0; i < data.length; i += 4) {
        totalBrightness += (data[i] + data[i + 1] + data[i + 2]) / 3
      }
      autoThresholdValue = totalBrightness / (data.length / 4)
    }

    // Contrast and brightness factors
    const contrastFactor = (259 * (settings.contrast + 255)) / (255 * (259 - settings.contrast))
    const brightnessAdjust = settings.brightness - 100

    // Apply filters
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4

        // Get original RGB values
        let r = data[idx]
        let g = data[idx + 1]
        let b = data[idx + 2]
        const a = data[idx + 3]

        // Apply brightness
        r += brightnessAdjust
        g += brightnessAdjust
        b += brightnessAdjust

        // Apply contrast
        r = contrastFactor * (r - 128) + 128
        g = contrastFactor * (g - 128) + 128
        b = contrastFactor * (b - 128) + 128

        // Convert to grayscale for barcode processing
        const gray = 0.299 * r + 0.587 * g + 0.114 * b

        // Apply threshold for binary conversion
        let finalGray: number
        if (settings.removeBackground) {
          finalGray = gray < autoThresholdValue ? 0 : 255
        } else {
          finalGray = gray < settings.threshold ? 0 : 255
        }

        // Invert if needed
        if (settings.invertColors) {
          finalGray = 255 - finalGray
        }

        output[idx] = finalGray
        output[idx + 1] = finalGray
        output[idx + 2] = finalGray
        output[idx + 3] = a
      }
    }

    // Apply edge enhancement if enabled
    if (settings.enhanceEdges) {
      const tempOutput = new Uint8ClampedArray(output)
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const idx = (y * width + x) * 4
          
          // Simple edge enhancement using neighbors
          const center = tempOutput[idx]
          const left = tempOutput[((y) * width + (x - 1)) * 4]
          const right = tempOutput[((y) * width + (x + 1)) * 4]
          const top = tempOutput[((y - 1) * width + x) * 4]
          const bottom = tempOutput[((y + 1) * width + x) * 4]

          const edgeValue = 4 * center - left - right - top - bottom
          const enhanced = Math.min(255, Math.max(0, center + edgeValue * 0.3))

          output[idx] = enhanced
          output[idx + 1] = enhanced
          output[idx + 2] = enhanced
        }
      }
    }

    // Apply denoise (simple median-like filter)
    if (settings.denoise > 0) {
      const tempOutput = new Uint8ClampedArray(output)
      const radius = Math.floor(settings.denoise / 20)
      
      if (radius > 0) {
        for (let y = radius; y < height - radius; y++) {
          for (let x = radius; x < width - radius; x++) {
            const idx = (y * width + x) * 4
            let sum = 0
            let count = 0

            for (let dy = -radius; dy <= radius; dy++) {
              for (let dx = -radius; dx <= radius; dx++) {
                const nIdx = ((y + dy) * width + (x + dx)) * 4
                sum += tempOutput[nIdx]
                count++
              }
            }

            const avg = sum / count
            // Blend with original based on denoise strength
            const blend = settings.denoise / 100
            output[idx] = tempOutput[idx] * (1 - blend) + avg * blend
            output[idx + 1] = output[idx]
            output[idx + 2] = output[idx]
          }
        }
      }
    }

    return new ImageData(output, width, height)
  }, [])

  const repairBarcode = useCallback(async () => {
    if (!originalImage) {
      setError("Please upload an image first")
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const img = new Image()
      img.src = originalImage

      await new Promise((resolve) => {
        img.onload = resolve
      })

      const canvas = canvasRef.current
      if (!canvas) return

      canvas.width = img.width
      canvas.height = img.height

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      const repaired = applyImageFilter(imageData, {
        contrast,
        brightness,
        sharpness,
        denoise,
        threshold,
        autoThreshold,
        invertColors,
        removeBackground,
        enhanceEdges,
      })

      ctx.putImageData(repaired, 0, 0)

      setRepairedImage(canvas.toDataURL("image/png"))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to repair barcode")
    } finally {
      setIsProcessing(false)
    }
  }, [originalImage, contrast, brightness, sharpness, denoise, threshold, autoThreshold, invertColors, removeBackground, enhanceEdges, applyImageFilter])

  const downloadRepaired = useCallback(() => {
    if (!repairedImage) return

    const a = document.createElement("a")
    a.href = repairedImage
    a.download = "repaired-barcode.png"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [repairedImage])

  const resetSettings = useCallback(() => {
    setContrast(100)
    setBrightness(100)
    setSharpness(50)
    setDenoise(30)
    setThreshold(128)
    setAutoThreshold(true)
    setInvertColors(false)
    setRemoveBackground(true)
    setEnhanceEdges(true)
  }, [])

  const clearAll = useCallback(() => {
    setOriginalImage(null)
    setRepairedImage(null)
    setError(null)
    resetSettings()
  }, [resetSettings])

  const autoOptimize = useCallback(() => {
    // Preset settings for common barcode issues
    setContrast(150)
    setBrightness(110)
    setSharpness(70)
    setDenoise(40)
    setAutoThreshold(true)
    setRemoveBackground(true)
    setEnhanceEdges(true)
    setInvertColors(false)
  }, [])

  React.useEffect(() => {
    if (originalImage) {
      repairBarcode()
    }
  }, [contrast, brightness, sharpness, denoise, threshold, autoThreshold, invertColors, removeBackground, enhanceEdges, originalImage, repairBarcode])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Upload Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Upload Damaged Barcode</Label>
          <Button variant="ghost" size="xs" onClick={clearAll} disabled={!originalImage}>
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            <Upload className="size-4 mr-2" />
            Select Image
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleFileUpload}
            className="hidden"
          />
          {originalImage && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={autoOptimize}>
                <Wand2 className="size-4 mr-1" />
                Auto Optimize
              </Button>
              <Button variant="outline" size="sm" onClick={resetSettings}>
                <RefreshCw className="size-4 mr-1" />
                Reset Settings
              </Button>
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          Upload a damaged, faded, or low-quality barcode image to repair and enhance it
        </p>
      </section>

      {/* Repair Settings */}
      {originalImage && (
        <section className="rounded-lg border p-4 space-y-4">
          <h3 className="text-sm font-medium">Repair Settings</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contrast" className="text-sm">Contrast: {contrast}%</Label>
              <Slider
                id="contrast"
                value={[contrast]}
                onValueChange={(v) => setContrast(v[0])}
                min={50}
                max={200}
                step={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brightness" className="text-sm">Brightness: {brightness}%</Label>
              <Slider
                id="brightness"
                value={[brightness]}
                onValueChange={(v) => setBrightness(v[0])}
                min={50}
                max={150}
                step={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sharpness" className="text-sm">Edge Enhancement: {sharpness}%</Label>
              <Slider
                id="sharpness"
                value={[sharpness]}
                onValueChange={(v) => setSharpness(v[0])}
                min={0}
                max={100}
                step={10}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="denoise" className="text-sm">Noise Reduction: {denoise}%</Label>
              <Slider
                id="denoise"
                value={[denoise]}
                onValueChange={(v) => setDenoise(v[0])}
                min={0}
                max={100}
                step={10}
              />
            </div>
          </div>

          {!autoThreshold && (
            <div className="space-y-2">
              <Label htmlFor="threshold" className="text-sm">Threshold: {threshold}</Label>
              <Slider
                id="threshold"
                value={[threshold]}
                onValueChange={(v) => setThreshold(v[0])}
                min={0}
                max={255}
                step={5}
              />
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-threshold" className="text-sm cursor-pointer">
                Auto Threshold
              </Label>
              <Switch
                id="auto-threshold"
                checked={autoThreshold}
                onCheckedChange={setAutoThreshold}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="remove-bg" className="text-sm cursor-pointer">
                Remove Background
              </Label>
              <Switch
                id="remove-bg"
                checked={removeBackground}
                onCheckedChange={setRemoveBackground}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="enhance-edges" className="text-sm cursor-pointer">
                Enhance Edges
              </Label>
              <Switch
                id="enhance-edges"
                checked={enhanceEdges}
                onCheckedChange={setEnhanceEdges}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="invert" className="text-sm cursor-pointer">
                Invert Colors
              </Label>
              <Switch
                id="invert"
                checked={invertColors}
                onCheckedChange={setInvertColors}
              />
            </div>
          </div>
        </section>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      {/* Comparison View */}
      {originalImage && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Before & After Comparison</Label>
            {repairedImage && (
              <Button variant="default" size="sm" onClick={downloadRepaired}>
                <Download className="size-4 mr-1" />
                Download Repaired
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm">Original (Damaged)</Label>
              <div className="rounded-lg border bg-muted/30 p-4 flex items-center justify-center min-h-[200px]">
                <img src={originalImage} alt="Original" className="max-w-full h-auto max-h-[300px]" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Repaired (Enhanced)</Label>
              <div className="rounded-lg border bg-muted/30 p-4 flex items-center justify-center min-h-[200px]">
                {isProcessing ? (
                  <div className="animate-pulse text-muted-foreground">
                    <Wand2 className="size-12 mx-auto mb-2 opacity-50" />
                    <p>Processing...</p>
                  </div>
                ) : repairedImage ? (
                  <img src={repairedImage} alt="Repaired" className="max-w-full h-auto max-h-[300px]" />
                ) : (
                  <p className="text-muted-foreground">Adjust settings to repair</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Repair Tips */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Barcode Repair Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Increase contrast to make bars more distinct from spaces</li>
              <li>Use auto-threshold for automatic binary conversion</li>
              <li>Enable edge enhancement to sharpen bar boundaries</li>
              <li>Apply noise reduction for grainy or speckled images</li>
              <li>Use invert colors if the barcode has light bars on dark background</li>
              <li>Remove background to eliminate distracting elements</li>
              <li>For faded barcodes, increase brightness and contrast together</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="text-sm font-medium mb-3">Common Barcode Issues & Solutions</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 rounded border bg-background">
            <div className="font-medium">Faded/Low Contrast</div>
            <div className="text-sm text-muted-foreground">
              Increase contrast to 150%, brightness to 110%, enable auto-threshold
            </div>
          </div>
          <div className="p-3 rounded border bg-background">
            <div className="font-medium">Blurry/Soft Edges</div>
            <div className="text-sm text-muted-foreground">
              Enable edge enhancement (70%+), increase sharpness
            </div>
          </div>
          <div className="p-3 rounded border bg-background">
            <div className="font-medium">Noisy/Grainy</div>
            <div className="text-sm text-muted-foreground">
              Apply noise reduction (40-60%), enable remove background
            </div>
          </div>
          <div className="p-3 rounded border bg-background">
            <div className="font-medium">Inverse Colors</div>
            <div className="text-sm text-muted-foreground">
              Enable invert colors, adjust threshold as needed
            </div>
          </div>
        </div>
      </section>

      {/* Empty State */}
      {!originalImage && (
        <div className="text-center py-12 text-muted-foreground">
          <ImageIcon className="size-12 mx-auto mb-4 opacity-50" />
          <p>Upload a damaged barcode image to repair and enhance it</p>
        </div>
      )}
    </div>
  )
}
