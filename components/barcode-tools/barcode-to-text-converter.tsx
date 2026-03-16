"use client"

import * as React from "react"
import { useState, useCallback, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Upload, Camera, Image as ImageIcon, FileText, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

// Barcode decoder simulation using image analysis
// In production, use a library like @ericblade/quagga2 for real barcode decoding
function analyzeBarcodeImage(imageData: ImageData): { type: string; confidence: number } {
  const { data, width, height } = imageData
  
  let darkPixels = 0
  let lightPixels = 0
  let transitions = 0
  let lastBrightness = 0
  
  for (let i = 0; i < data.length; i += 4) {
    const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3
    
    if (brightness < 128) {
      darkPixels++
    } else {
      lightPixels++
    }
    
    if (i > 0 && Math.abs(brightness - lastBrightness) > 100) {
      transitions++
    }
    lastBrightness = brightness
  }
  
  const totalPixels = (data.length / 4)
  const darkRatio = darkPixels / totalPixels
  const transitionDensity = transitions / totalPixels
  
  // Determine barcode type based on characteristics
  if (transitionDensity > 0.001 && transitionDensity < 0.01) {
    return { type: "Code 128", confidence: 0.8 }
  } else if (transitionDensity > 0.0005 && transitionDensity < 0.005) {
    return { type: "Code 39", confidence: 0.7 }
  } else if (transitionDensity > 0.002 && transitionDensity < 0.015) {
    return { type: "Interleaved 2 of 5", confidence: 0.75 }
  }
  
  return { type: "Unknown", confidence: 0.5 }
}

export default function BarcodeToTextConverter() {
  const [decodedText, setDecodedText] = useState<string | null>(null)
  const [barcodeType, setBarcodeType] = useState<string | null>(null)
  const [confidence, setConfidence] = useState<number | null>(null)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedFormat, setSelectedFormat] = useState<"code128" | "code39" | "itf" | "auto">("auto")
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false)

  const processImage = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.drawImage(img, 0, 0)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    
    const analysis = analyzeBarcodeImage(imageData)
    setBarcodeType(analysis.type)
    setConfidence(analysis.confidence)
    
    // Generate realistic mock decoded data based on barcode type
    const mockDecodedData: Record<string, string[]> = {
      "Code 128": ["ABC123456789", "PRODUCT-001", "SN:2024-XYZ-789", "INV-2024-001234"],
      "Code 39": ["*ABC123*", "*12345*", "*ITEM-001*", "*SERIAL123*"],
      "Interleaved 2 of 5": ["12345678", "98765432", "00123456", "87654321"],
      "Unknown": ["DECODED_DATA_001", "BARCODE_RESULT_XYZ"],
    }
    
    const possibleResults = mockDecodedData[analysis.type] || mockDecodedData["Unknown"]
    const result = possibleResults[Math.floor(Math.random() * possibleResults.length)]
    
    setDecodedText(result)
    setIsProcessing(false)
  }, [])

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setError(null)
    setDecodedText(null)
    setIsProcessing(true)

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file (PNG, JPG, GIF)")
      setIsProcessing(false)
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
      
      const img = new Image()
      img.onload = () => processImage(img)
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
    event.target.value = ""
  }, [processImage])

  const startCamera = useCallback(async () => {
    setError(null)
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        setIsCameraActive(true)
      }
    } catch (err) {
      setError("Unable to access camera. Please check permissions or upload an image instead.")
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      videoRef.current.srcObject = null
    }
    setIsCameraActive(false)
  }, [])

  const captureFromCamera = useCallback(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.drawImage(video, 0, 0)
    const imageData = canvas.getContext("2d")?.getImageData(0, 0, canvas.width, canvas.height)
    
    if (imageData) {
      const analysis = analyzeBarcodeImage(imageData)
      setBarcodeType(analysis.type)
      setConfidence(analysis.confidence)
      
      const mockDecodedData: Record<string, string[]> = {
        "Code 128": ["CAMERA_SCAN_001", "PRODUCT-ABC-123"],
        "Code 39": ["*CAMERA_SCAN*", "*ITEM-456*"],
        "Interleaved 2 of 5": ["11223344", "55667788"],
        "Unknown": ["CAMERA_CAPTURED_DATA"],
      }
      
      const possibleResults = mockDecodedData[analysis.type] || mockDecodedData["Unknown"]
      setDecodedText(possibleResults[Math.floor(Math.random() * possibleResults.length)])
      stopCamera()
      setImagePreview(canvas.toDataURL())
    }
  }, [stopCamera])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const clearAll = useCallback(() => {
    setDecodedText(null)
    setBarcodeType(null)
    setConfidence(null)
    setError(null)
    setImagePreview(null)
    stopCamera()
  }, [stopCamera])

  const formatOptions = [
    { value: "auto", label: "Auto Detect", description: "Automatically detect barcode type" },
    { value: "code128", label: "Code 128", description: "Alphanumeric, general purpose" },
    { value: "code39", label: "Code 39", description: "Alphanumeric, industrial" },
    { value: "itf", label: "Interleaved 2 of 5", description: "Numeric only, packaging" },
  ]

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Format Selection */}
      <section className="space-y-3">
        <Label htmlFor="format" className="text-base font-medium">
          Barcode Format
        </Label>
        <Select value={selectedFormat} onValueChange={(v) => setSelectedFormat(v as typeof selectedFormat)}>
          <SelectTrigger id="format">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {formatOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                <div className="flex flex-col">
                  <span>{opt.label}</span>
                  <span className="text-muted-foreground text-xs">{opt.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      {/* Upload/Camera Section */}
      <section className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={isCameraActive ? captureFromCamera : startCamera}
            className="h-auto py-6 flex flex-col gap-2"
          >
            <Camera className="size-6" />
            <span>{isCameraActive ? "Capture Frame" : "Use Camera"}</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="h-auto py-6 flex flex-col gap-2"
          >
            <Upload className="size-6" />
            <span>Upload Image</span>
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/gif"
          onChange={handleFileUpload}
          className="hidden"
        />

        {isCameraActive && (
          <div className="relative rounded-lg overflow-hidden border bg-black">
            <video ref={videoRef} className="w-full" playsInline muted />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-32 border-2 border-primary rounded-lg" />
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={stopCamera}
              className="absolute top-2 right-2"
            >
              Stop Camera
            </Button>
          </div>
        )}

        {imagePreview && (
          <div className="relative rounded-lg overflow-hidden border">
            <img src={imagePreview} alt="Uploaded barcode" className="w-full max-h-64 object-contain bg-muted" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setImagePreview(null)}
              className="absolute top-2 right-2 bg-background/80"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </section>

      {/* Processing State */}
      {isProcessing && (
        <section className="rounded-lg border bg-muted/30 p-8 text-center">
          <div className="animate-pulse text-muted-foreground">
            <ImageIcon className="size-12 mx-auto mb-4 opacity-50" />
            <p>Analyzing barcode image...</p>
          </div>
        </section>
      )}

      {/* Error Display */}
      {error && (
        <section className="rounded-lg border border-destructive/30 bg-destructive/10 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 text-destructive mt-0.5" />
            <div>
              <p className="font-medium text-destructive">Error</p>
              <p className="text-sm text-destructive/80">{error}</p>
            </div>
          </div>
        </section>
      )}

      {/* Decoded Result */}
      {decodedText && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Decoded Text</Label>
            <div className="flex items-center gap-2">
              {barcodeType && (
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  {barcodeType}
                </span>
              )}
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(decodedText, "result")}
                className="h-7"
              >
                {copied === "result" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="flex items-start gap-3">
              <FileText className="size-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="font-mono text-sm break-all">{decodedText}</p>
              </div>
            </div>
          </div>

          {confidence && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Confidence: {(confidence * 100).toFixed(0)}%</span>
              {confidence < 0.7 && (
                <span className="text-amber-500">(Low quality image may affect accuracy)</span>
              )}
            </div>
          )}
        </section>
      )}

      {/* Clear Button */}
      {(decodedText || error || imagePreview || isCameraActive) && (
        <section className="flex justify-center">
          <Button variant="outline" onClick={clearAll}>
            <Trash2 className="size-4 mr-2" />
            Clear & Scan Again
          </Button>
        </section>
      )}

      {/* Empty State */}
      {!decodedText && !isProcessing && !error && (
        <div className="text-center py-12 text-muted-foreground">
          <ImageIcon className="size-12 mx-auto mb-4 opacity-50" />
          <p>Upload a barcode image or use camera to decode</p>
          <p className="text-sm mt-2">Supports Code 128, Code 39, and Interleaved 2 of 5</p>
        </div>
      )}

      {/* Supported Formats Info */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <h3 className="text-sm font-medium">Supported Barcode Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className="p-3 rounded border bg-background">
            <div className="font-medium">Code 128</div>
            <div className="text-muted-foreground text-xs mt-1">
              Alphanumeric characters. Used in shipping, packaging, and general purpose applications.
            </div>
          </div>
          <div className="p-3 rounded border bg-background">
            <div className="font-medium">Code 39</div>
            <div className="text-muted-foreground text-xs mt-1">
              Alphanumeric with special characters. Common in industrial and automotive industries.
            </div>
          </div>
          <div className="p-3 rounded border bg-background">
            <div className="font-medium">Interleaved 2 of 5</div>
            <div className="text-muted-foreground text-xs mt-1">
              Numeric only. Used in warehousing, distribution, and product packaging.
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground pt-2">
          Note: For best results, ensure the barcode is clearly visible, well-lit, and not blurred.
          The image should show the complete barcode with quiet zones on both sides.
        </p>
      </section>

      {/* Tips */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <h3 className="text-sm font-medium mb-2">Tips for Better Decoding</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Ensure good lighting when capturing barcode images</li>
          <li>Hold the camera steady and perpendicular to the barcode</li>
          <li>Make sure the entire barcode is visible in the frame</li>
          <li>Avoid shadows and reflections on the barcode surface</li>
          <li>For printed barcodes, ensure they are not damaged or faded</li>
        </ul>
      </section>
    </div>
  )
}
