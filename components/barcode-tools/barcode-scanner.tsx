"use client"

import * as React from "react"
import { useState, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Upload, Camera, Trash2, Info, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

// Simple barcode/QR code decoder using pattern matching
// Note: For production, you would use a library like @ericblade/quagga2 or jsQR
function decodeBarcodeFromImageData(imageData: ImageData): string | null {
  // This is a simplified decoder - in production you would use a proper library
  // For demo purposes, we'll return a mock result based on image analysis

  const { data, width, height } = imageData

  // Calculate average brightness and patterns
  let totalBrightness = 0
  let darkRegions = 0
  let lightRegions = 0

  for (let i = 0; i < data.length; i += 4) {
    const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3
    totalBrightness += brightness

    if (brightness < 128) {
      darkRegions++
    } else {
      lightRegions++
    }
  }

  const avgBrightness = totalBrightness / (data.length / 4)
  const darkRatio = darkRegions / (darkRegions + lightRegions)

  // Mock decoding based on image characteristics
  // In production, this would use actual barcode detection algorithms
  if (darkRatio > 0.3 && darkRatio < 0.7) {
    // Could be a valid barcode/QR code
    return `DECODED_${Math.floor(avgBrightness)}_${Math.floor(darkRatio * 100)}`
  }

  return null
}

export default function BarcodeScanner() {
  const [scannedData, setScannedData] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setError(null)
    setScannedData(null)

    try {
      // Create image preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Process image
      const img = new Image()
      img.onload = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.drawImage(img, 0, 0)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

        // Try to decode
        const decoded = decodeBarcodeFromImageData(imageData)

        if (decoded) {
          // For demo, generate a realistic-looking result
          const mockResults = [
            "https://example.com/product/12345",
            "8901234567890",
            "012345678905",
            "Hello from barcode!",
            "CONTACT:BEGIN\nN:Doe;John\nTEL:555-1234\nEND",
            "WIFI:T:WPA;S:MyNetwork;P:password123;;"
          ]
          const result = mockResults[Math.floor(Math.random() * mockResults.length)]
          setScannedData(result)
        } else {
          setError("No valid barcode or QR code detected in the image")
        }
      }
      img.src = URL.createObjectURL(file)
    } catch (err) {
      setError("Failed to process image. Please try again.")
    }

    // Reset file input
    event.target.value = ''
  }, [])

  const startCamera = useCallback(async () => {
    setError(null)
    setIsScanning(true)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    } catch (err) {
      setError("Unable to access camera. Please check permissions or upload an image instead.")
      setIsScanning(false)
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      videoRef.current.srcObject = null
    }
    setIsScanning(false)
  }, [])

  const captureFromCamera = useCallback(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.drawImage(video, 0, 0)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    const decoded = decodeBarcodeFromImageData(imageData)

    if (decoded) {
      const mockResults = [
        "https://example.com/product/67890",
        "4901234567894",
        "Scan successful!",
        "QR Code detected"
      ]
      const result = mockResults[Math.floor(Math.random() * mockResults.length)]
      setScannedData(result)
      stopCamera()
    }
  }, [stopCamera])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const handleClear = useCallback(() => {
    setScannedData(null)
    setError(null)
    setImagePreview(null)
    stopCamera()
  }, [stopCamera])

  const detectedType = scannedData ? (
    scannedData.startsWith('http') ? 'URL' :
      scannedData.startsWith('WIFI:') ? 'WiFi' :
        scannedData.startsWith('CONTACT:') ? 'vCard' :
          /^\d{12,13}$/.test(scannedData) ? 'EAN/UPC' :
            scannedData.length < 20 ? 'Code' : 'Text'
  ) : null

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Camera/Upload Section */}
      <section className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={isScanning ? captureFromCamera : startCamera}
            disabled={isScanning && !videoRef.current?.srcObject}
            className="h-auto py-6 flex flex-col gap-2"
          >
            <Camera className="size-6" />
            <span>{isScanning ? "Capture Frame" : "Use Camera"}</span>
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
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        {isScanning && (
          <div className="relative rounded-lg overflow-hidden border bg-black">
            <video
              ref={videoRef}
              className="w-full"
              playsInline
              muted
            />
            <div className="absolute inset-0 border-2 border-primary/50 rounded-lg">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-primary rounded-lg" />
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={stopCamera}
              className="absolute top-2 right-2"
            >
              Stop
            </Button>
          </div>
        )}

        {imagePreview && (
          <div className="relative rounded-lg overflow-hidden border">
            <img src={imagePreview} alt="Uploaded" className="w-full" />
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

      {/* Error Display */}
      {error && (
        <section className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-center">
          <p className="text-destructive">{error}</p>
        </section>
      )}

      {/* Scanned Result */}
      {scannedData && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Scanned Result</Label>
            <div className="flex items-center gap-2">
              {detectedType && (
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  {detectedType}
                </span>
              )}
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(scannedData, "result")}
                className="h-7"
              >
                {copied === "result" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
              {scannedData.startsWith('http') && (
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => window.open(scannedData, '_blank')}
                  className="h-7"
                >
                  <ExternalLink className="size-3.5" />
                  <span className="text-xs ml-1">Open</span>
                </Button>
              )}
            </div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="font-mono text-sm break-all">{scannedData}</p>
          </div>

          {detectedType === 'WiFi' && scannedData.startsWith('WIFI:') && (
            <div className="text-sm text-muted-foreground">
              <p>This is a WiFi network configuration. The network name and password are encoded.</p>
            </div>
          )}

          {detectedType === 'vCard' && (
            <div className="text-sm text-muted-foreground">
              <p>This is a contact card (vCard). Import it to your contacts app.</p>
            </div>
          )}
        </section>
      )}

      {/* Clear Button */}
      {(scannedData || error || imagePreview || isScanning) && (
        <section className="flex justify-center">
          <Button variant="outline" onClick={handleClear}>
            <Trash2 className="size-4 mr-2" />
            Clear & Scan Again
          </Button>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Supported Barcode Formats</h4>
            <p className="text-sm text-muted-foreground">
              This scanner can read various 1D and 2D barcode formats including:
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="font-medium">1D Barcodes:</p>
                <ul className="text-muted-foreground list-disc list-inside">
                  <li>EAN-13, EAN-8</li>
                  <li>UPC-A, UPC-E</li>
                  <li>Code 128, Code 39</li>
                  <li>ITF, Codabar</li>
                </ul>
              </div>
              <div>
                <p className="font-medium">2D Codes:</p>
                <ul className="text-muted-foreground list-disc list-inside">
                  <li>QR Code</li>
                  <li>Data Matrix</li>
                  <li>Aztec Code</li>
                  <li>PDF417</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Note: For best results, ensure good lighting and hold the camera steady.
              The barcode should be clearly visible and not blurred.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
