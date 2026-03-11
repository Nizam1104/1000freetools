"use client"

import * as React from "react"
import { useState, useCallback, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Upload, Camera, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

// Note: This is a UI placeholder. Real QR scanning requires libraries like @zxing/library
export default function QrCodeScanner() {
  const [decodedData, setDecodedData] = useState<string>("")
  const [dataType, setDataType] = useState<string>("unknown")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const detectDataType = (data: string): string => {
    if (!data) return "unknown"
    if (data.startsWith("http://") || data.startsWith("https://")) return "url"
    if (data.includes("@") && data.includes(".")) return "email"
    if (/^\+?[0-9\s-]+$/.test(data)) return "phone"
    if (data.startsWith("BEGIN:VCARD")) return "vcard"
    if (data.startsWith("WIFI:")) return "wifi"
    if (data.startsWith("mailto:")) return "email"
    if (data.startsWith("tel:")) return "phone"
    if (data.startsWith("SMSTO:")) return "sms"
    return "text"
  }

  const processImage = useCallback(async (file: File) => {
    setError(null)
    setDecodedData("")
    
    try {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setImageUrl(previewUrl)

      // Note: In production, use a QR scanning library like:
      // - @zxing/library for browser-based scanning
      // - Or send to backend for processing
      
      // Simulated scan result for demo
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock result
      const mockResults: Record<string, string> = {
        "default": "https://example.com",
      }
      
      const result = mockResults.default || "https://example.com/scanned-content"
      setDecodedData(result)
      setDataType(detectDataType(result))
    } catch (err) {
      setError("Failed to process image. Please try a clearer image.")
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processImage(file)
    }
  }, [processImage])

  const startCameraScan = useCallback(async () => {
    setIsScanning(true)
    setError(null)
    
    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      // Note: In production, use a library like @zxing/library to decode QR from video
      // This is a placeholder for the actual scanning logic
      
      // Simulated result
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setDecodedData("https://example.com/scanned-from-camera")
      setDataType("url")
      setIsScanning(false)
      
      // Stop camera
      stream.getTracks().forEach(track => track.stop())
    } catch (err) {
      setError("Camera access denied or not available. Please upload an image instead.")
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
    setDecodedData("")
    setDataType("unknown")
    setError(null)
    setImageUrl("")
    stopCamera()
  }, [stopCamera])

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Scan Options */}
      <section className="space-y-4">
        <Label className="text-base font-medium">Scan Method</Label>
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant={!isScanning ? "default" : "outline"}
            size="lg"
            onClick={() => fileInputRef.current?.click()}
            disabled={isScanning}
            className="h-24 flex-col gap-2"
          >
            <Upload className="size-6" />
            <span>Upload Image</span>
          </Button>
          
          <Button
            variant={isScanning ? "default" : "outline"}
            size="lg"
            onClick={isScanning ? stopCamera : startCameraScan}
            className="h-24 flex-col gap-2"
          >
            {isScanning ? (
              <>
                <div className="size-6 rounded-full border-2 border-current border-t-transparent animate-spin" />
                <span>Stop Camera</span>
              </>
            ) : (
              <>
                <Camera className="size-6" />
                <span>Use Camera</span>
              </>
            )}
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </section>

      {/* Camera Preview */}
      {isScanning && (
        <section className="rounded-lg border overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-48 h-48 border-2 border-white/50 rounded-lg" />
          </div>
        </section>
      )}

      {/* Image Preview */}
      {imageUrl && !isScanning && (
        <section className="rounded-lg border overflow-hidden">
          <img src={imageUrl} alt="Uploaded" className="w-full h-64 object-contain bg-muted" />
        </section>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      {/* Result */}
      {decodedData && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Scanned Content</Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(decodedData, "result")}
              className="h-7"
            >
              {copied === "result" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className={cn(
                "text-xs font-medium px-2 py-0.5 rounded",
                dataType === "url" && "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                dataType === "email" && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                dataType === "phone" && "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
                dataType === "text" && "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
              )}>
                {dataType.toUpperCase()}
              </span>
            </div>
            <code className="font-mono text-sm break-all">
              {decodedData}
            </code>
          </div>

          {dataType === "url" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(decodedData, "_blank")}
            >
              Open Link
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={clearAll}
          >
            Scan Another
          </Button>
        </section>
      )}

      {/* Empty State */}
      {!decodedData && !error && (
        <div className="text-center py-12 text-muted-foreground">
          <Camera className="size-12 mx-auto mb-4 opacity-50" />
          <p>Upload a QR code image or use your camera to scan</p>
        </div>
      )}

      {/* Info */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <h3 className="text-sm font-medium">Supported QR Code Types</h3>
        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
          <li>URLs and website links</li>
          <li>Plain text content</li>
          <li>Email addresses and mailto links</li>
          <li>Phone numbers</li>
          <li>vCard contact information</li>
          <li>WiFi network credentials</li>
          <li>SMS messages</li>
        </ul>
        <p className="text-xs text-muted-foreground pt-2">
          Note: This is a demo implementation. For production use, integrate a QR scanning library 
          like @zxing/library or @ericblade/quagga2 for browser-based decoding.
        </p>
      </section>
    </div>
  )
}
