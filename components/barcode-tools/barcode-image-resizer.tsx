"use client"

import * as React from "react"
import { useState, useCallback, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Copy, Check, Trash2, Download, Upload, Image as ImageIcon, Settings2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageInfo {
  originalWidth: number
  originalHeight: number
  fileSize: number
  format: string
  dpi?: number
}

export default function BarcodeImageResizer() {
  const [sourceImage, setSourceImage] = useState<string | null>(null)
  const [resizedImage, setResizedImage] = useState<string | null>(null)
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  
  // Resize settings
  const [resizeMode, setResizeMode] = useState<"pixels" | "inches" | "mm" | "percent">("pixels")
  const [targetWidth, setTargetWidth] = useState<string>("")
  const [targetHeight, setTargetHeight] = useState<string>("")
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(true)
  const [targetDPI, setTargetDPI] = useState<number>(300)
  const [outputFormat, setOutputFormat] = useState<"png" | "jpeg" | "webp">("png")
  const [quality, setQuality] = useState<number>(90)
  const [sharpen, setSharpen] = useState<boolean>(true)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(2) + " MB"
  }

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file")
      return
    }

    setError(null)
    setResizedImage(null)

    const reader = new FileReader()
    reader.onload = (e) => {
      const imageData = e.target?.result as string
      setSourceImage(imageData)

      // Get image info
      const img = new Image()
      img.onload = () => {
        setImageInfo({
          originalWidth: img.width,
          originalHeight: img.height,
          fileSize: file.size,
          format: file.type.split("/")[1].toUpperCase(),
        })
        setTargetWidth(img.width.toString())
        setTargetHeight(img.height.toString())
      }
      img.src = imageData
    }
    reader.readAsDataURL(file)
    event.target.value = ""
  }, [])

  const convertToPixels = useCallback((value: string, mode: string, dpi: number): number => {
    const numValue = parseFloat(value) || 0
    switch (mode) {
      case "inches":
        return Math.round(numValue * dpi)
      case "mm":
        return Math.round((numValue / 25.4) * dpi)
      case "percent":
        if (!imageInfo) return numValue
        return Math.round((imageInfo.originalWidth * numValue) / 100)
      default:
        return Math.round(numValue)
    }
  }, [imageInfo])

  const resizeImage = useCallback(async () => {
    if (!sourceImage || !imageInfo) {
      setError("Please upload an image first")
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const img = new Image()
      img.src = sourceImage

      await new Promise((resolve) => {
        img.onload = resolve
      })

      const canvas = canvasRef.current
      if (!canvas) return

      // Calculate dimensions
      let newWidth = convertToPixels(targetWidth, resizeMode, targetDPI)
      let newHeight = convertToPixels(targetHeight, resizeMode, targetDPI)

      if (maintainAspectRatio) {
        const aspectRatio = imageInfo.originalWidth / imageInfo.originalHeight
        if (resizeMode === "percent") {
          newWidth = Math.round(imageInfo.originalWidth * (parseFloat(targetWidth) || 100) / 100)
          newHeight = Math.round(imageInfo.originalHeight * (parseFloat(targetWidth) || 100) / 100)
        } else {
          if (targetWidth && !targetHeight) {
            newHeight = Math.round(newWidth / aspectRatio)
          } else if (!targetWidth && targetHeight) {
            newWidth = Math.round(newHeight * aspectRatio)
          }
        }
      }

      // Ensure minimum dimensions for barcode scannability
      newWidth = Math.max(newWidth, 100)
      newHeight = Math.max(newHeight, 50)

      canvas.width = newWidth
      canvas.height = newHeight

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Set DPI metadata (for formats that support it)
      // Note: Canvas doesn't directly support DPI, but we can set it in the output

      // Apply image smoothing for better quality
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"

      // Draw resized image
      ctx.drawImage(img, 0, 0, newWidth, newHeight)

      // Apply sharpening if enabled
      if (sharpen && outputFormat !== "png") {
        const imageData = ctx.getImageData(0, 0, newWidth, newHeight)
        const sharpened = applySharpen(imageData, 0.5)
        ctx.putImageData(sharpened, 0, 0)
      }

      // Export with quality settings
      const mimeType = `image/${outputFormat}`
      const resizedDataUrl = canvas.toDataURL(mimeType, quality / 100)
      setResizedImage(resizedDataUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resize image")
    } finally {
      setIsProcessing(false)
    }
  }, [sourceImage, imageInfo, targetWidth, targetHeight, resizeMode, maintainAspectRatio, targetDPI, outputFormat, quality, sharpen, convertToPixels])

  // Simple sharpening filter
  const applySharpen = (imageData: ImageData, amount: number): ImageData => {
    const data = imageData.data
    const width = imageData.width
    const height = imageData.height
    const output = new Uint8ClampedArray(data)

    const mix = 1 - amount
    const kernel = [
      0, -1, 0,
      -1, 5, -1,
      0, -1, 0
    ]

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        for (let c = 0; c < 3; c++) {
          const idx = (y * width + x) * 4 + c
          let sum = data[idx] * kernel[4]

          sum += data[((y - 1) * width + x) * 4 + c] * kernel[1]
          sum += data[((y + 1) * width + x) * 4 + c] * kernel[7]
          sum += data[(y * width + (x - 1)) * 4 + c] * kernel[3]
          sum += data[(y * width + (x + 1)) * 4 + c] * kernel[5]

          output[idx] = Math.min(255, Math.max(0, sum * amount + data[idx] * mix))
        }
      }
    }

    return new ImageData(output, width, height)
  }

  const downloadResized = useCallback(() => {
    if (!resizedImage) return

    const a = document.createElement("a")
    a.href = resizedImage
    a.download = `resized-barcode.${outputFormat}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [resizedImage, outputFormat])

  const copyToClipboard = useCallback(async () => {
    if (!resizedImage) return
    try {
      const blob = await (await fetch(resizedImage)).blob()
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ])
      setCopied("image")
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [resizedImage])

  const clearAll = useCallback(() => {
    setSourceImage(null)
    setResizedImage(null)
    setImageInfo(null)
    setError(null)
    setTargetWidth("")
    setTargetHeight("")
  }, [])

  const presetSizes = [
    { name: "Small Label", width: 200, height: 100 },
    { name: "Standard", width: 400, height: 200 },
    { name: "Large", width: 600, height: 300 },
    { name: "Print (300 DPI, 2\"x1\")", width: 600, height: 300, dpi: true },
    { name: "Print (300 DPI, 4\"x2\")", width: 1200, height: 600, dpi: true },
  ]

  const applyPreset = (preset: typeof presetSizes[0]) => {
    setTargetWidth(preset.width.toString())
    setTargetHeight(preset.height.toString())
    setResizeMode("pixels")
    if (preset.dpi) {
      setTargetDPI(300)
    }
  }

  React.useEffect(() => {
    if (sourceImage && imageInfo && targetWidth && targetHeight) {
      resizeImage()
    }
  }, [targetWidth, targetHeight, resizeMode, maintainAspectRatio, targetDPI, outputFormat, quality, sharpen])

  const getDimensionLabel = (mode: string): string => {
    switch (mode) {
      case "pixels": return "px"
      case "inches": return "\""
      case "mm": return "mm"
      case "percent": return "%"
      default: return "px"
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Upload Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Upload Barcode Image</Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={clearAll}
            className="h-7"
            disabled={!sourceImage}
          >
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2"
          >
            <Upload className="size-4" />
            <span>Select Image</span>
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
            onChange={handleFileUpload}
            className="hidden"
          />
          {sourceImage && (
            <span className="text-sm text-muted-foreground">Image loaded</span>
          )}
        </div>

        {imageInfo && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="rounded border bg-muted/30 p-3">
              <div className="text-muted-foreground">Original Size</div>
              <div className="font-mono">{imageInfo.originalWidth} x {imageInfo.originalHeight}px</div>
            </div>
            <div className="rounded border bg-muted/30 p-3">
              <div className="text-muted-foreground">File Size</div>
              <div className="font-mono">{formatFileSize(imageInfo.fileSize)}</div>
            </div>
            <div className="rounded border bg-muted/30 p-3">
              <div className="text-muted-foreground">Format</div>
              <div className="font-mono">{imageInfo.format}</div>
            </div>
            <div className="rounded border bg-muted/30 p-3">
              <div className="text-muted-foreground">Aspect Ratio</div>
              <div className="font-mono">{(imageInfo.originalWidth / imageInfo.originalHeight).toFixed(2)}</div>
            </div>
          </div>
        )}
      </section>

      {/* Resize Settings */}
      <section className="rounded-lg border p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Settings2 className="size-4 text-muted-foreground" />
          <h3 className="text-sm font-medium">Resize Settings</h3>
        </div>

        {/* Preset Sizes */}
        <div className="space-y-2">
          <Label className="text-sm">Quick Presets</Label>
          <div className="flex flex-wrap gap-2">
            {presetSizes.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                onClick={() => applyPreset(preset)}
                className="text-xs"
              >
                {preset.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Dimension Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="resize-mode" className="text-sm">Unit</Label>
            <Select value={resizeMode} onValueChange={(v) => setResizeMode(v as typeof resizeMode)}>
              <SelectTrigger id="resize-mode">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pixels">Pixels</SelectItem>
                <SelectItem value="inches">Inches</SelectItem>
                <SelectItem value="mm">Millimeters</SelectItem>
                <SelectItem value="percent">Percentage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="target-width" className="text-sm">Width</Label>
            <div className="relative">
              <Input
                id="target-width"
                type="number"
                value={targetWidth}
                onChange={(e) => setTargetWidth(e.target.value)}
                className="font-mono text-sm pr-12"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                {getDimensionLabel(resizeMode)}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="target-height" className="text-sm">Height</Label>
            <div className="relative">
              <Input
                id="target-height"
                type="number"
                value={targetHeight}
                onChange={(e) => setTargetHeight(e.target.value)}
                className="font-mono text-sm pr-12"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                {getDimensionLabel(resizeMode)}
              </span>
            </div>
          </div>
        </div>

        {/* Aspect Ratio */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="maintain-aspect"
            checked={maintainAspectRatio}
            onChange={(e) => setMaintainAspectRatio(e.target.checked)}
            className="rounded border-input"
          />
          <Label htmlFor="maintain-aspect" className="text-sm cursor-pointer">
            Maintain aspect ratio
          </Label>
        </div>

        {/* DPI Setting */}
        <div className="space-y-2">
          <Label htmlFor="dpi" className="text-sm">Target DPI: {targetDPI}</Label>
          <Slider
            id="dpi"
            value={[targetDPI]}
            onValueChange={(v) => setTargetDPI(v[0])}
            min={72}
            max={600}
            step={72}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>72 (Screen)</span>
            <span>150 (Draft)</span>
            <span>300 (Print)</span>
            <span>600 (High Quality)</span>
          </div>
        </div>
      </section>

      {/* Output Settings */}
      <section className="rounded-lg border p-4 space-y-4">
        <h3 className="text-sm font-medium">Output Settings</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="output-format" className="text-sm">Format</Label>
            <Select value={outputFormat} onValueChange={(v) => setOutputFormat(v as typeof outputFormat)}>
              <SelectTrigger id="output-format">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">PNG (Lossless, best for barcodes)</SelectItem>
                <SelectItem value="jpeg">JPEG (Smaller file size)</SelectItem>
                <SelectItem value="webp">WebP (Modern, efficient)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quality" className="text-sm">Quality: {quality}%</Label>
            <Slider
              id="quality"
              value={[quality]}
              onValueChange={(v) => setQuality(v[0])}
              min={10}
              max={100}
              step={5}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="sharpen"
            checked={sharpen}
            onChange={(e) => setSharpen(e.target.checked)}
            className="rounded border-input"
          />
          <Label htmlFor="sharpen" className="text-sm cursor-pointer">
            Apply sharpening filter (improves barcode edge clarity)
          </Label>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      {/* Preview */}
      {sourceImage && resizedImage && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Resized Image</Label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
              >
                {copied === "image" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                Copy Image
              </Button>
              <Button variant="default" size="sm" onClick={downloadResized}>
                <Download className="size-4 mr-1" />
                Download
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm">Original</Label>
              <div className="rounded-lg border bg-muted/30 p-4 flex items-center justify-center">
                <img src={sourceImage} alt="Original" className="max-w-full h-auto max-h-40" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Resized</Label>
              <div className="rounded-lg border bg-muted/30 p-4 flex items-center justify-center">
                <img src={resizedImage} alt="Resized" className="max-w-full h-auto max-h-40" />
              </div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground text-center">
            New dimensions: {targetWidth} x {targetHeight} {getDimensionLabel(resizeMode)} @ {targetDPI} DPI
          </div>
        </section>
      )}

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Empty State */}
      {!sourceImage && (
        <div className="text-center py-12 text-muted-foreground">
          <ImageIcon className="size-12 mx-auto mb-4 opacity-50" />
          <p>Upload a barcode image to resize and optimize</p>
        </div>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Barcode Image Optimization Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Use 300 DPI or higher for print applications</li>
              <li>PNG format preserves sharp edges better than JPEG</li>
              <li>Maintain aspect ratio to prevent barcode distortion</li>
              <li>Minimum recommended size: 200x100 pixels for reliable scanning</li>
              <li>Sharpening can improve edge detection in scanners</li>
              <li>Avoid excessive compression which can blur barcode edges</li>
            </ul>
          </div>
        </div>
      </section>

      {/* DPI Reference */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="text-sm font-medium mb-2">DPI Reference Guide</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <div className="p-3 rounded border bg-background">
            <div className="font-medium">72 DPI</div>
            <div className="text-muted-foreground text-xs">Screen display, web use</div>
          </div>
          <div className="p-3 rounded border bg-background">
            <div className="font-medium">150 DPI</div>
            <div className="text-muted-foreground text-xs">Draft printing, internal use</div>
          </div>
          <div className="p-3 rounded border bg-background">
            <div className="font-medium">300 DPI</div>
            <div className="text-muted-foreground text-xs">Standard print quality</div>
          </div>
          <div className="p-3 rounded border bg-background">
            <div className="font-medium">600 DPI</div>
            <div className="text-muted-foreground text-xs">High quality, professional</div>
          </div>
        </div>
      </section>
    </div>
  )
}
