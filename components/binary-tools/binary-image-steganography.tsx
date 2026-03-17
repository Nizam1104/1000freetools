"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Upload, Download, Image as ImageIcon, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BinaryImageSteganography() {
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [message, setMessage] = useState<string>("")
  const [binaryMessage, setBinaryMessage] = useState<string>("")
  const [outputImage, setOutputImage] = useState<string | null>(null)
  const [extractedMessage, setExtractedMessage] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const textToBinary = useCallback((text: string): string => {
    return text.split("").map((char) => {
      return char.charCodeAt(0).toString(2).padStart(8, "0")
    }).join("")
  }, [])

  const binaryToText = useCallback((binary: string): string => {
    const bytes = binary.match(/.{1,8}/g) || []
    return bytes.map((byte) => {
      const charCode = parseInt(byte, 2)
      return charCode === 0 ? "" : String.fromCharCode(charCode)
    }).join("")
  }, [])

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
      setError(null)
    }
  }, [])

  const encodeMessageInImage = useCallback(async () => {
    if (!imageFile || !message) {
      setError("Please upload an image and enter a message")
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const img = new Image()
      const reader = new FileReader()

      reader.onload = (event) => {
        img.src = event.target?.result as string
        img.onload = async () => {
          const canvas = document.createElement("canvas")
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext("2d")

          if (!ctx) {
            setError("Failed to get canvas context")
            setIsProcessing(false)
            return
          }

          ctx.drawImage(img, 0, 0)
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const data = imageData.data

          // Convert message to binary with terminator
          const binaryMsg = textToBinary(message) + "00000000" // Null terminator
          
          if (binaryMsg.length > data.length / 4) {
            setError("Message too long for this image")
            setIsProcessing(false)
            return
          }

          let bitIndex = 0
          for (let i = 0; i < data.length && bitIndex < binaryMsg.length; i += 4) {
            // Modify RGB channels, skip alpha
            for (let j = 0; j < 3 && bitIndex < binaryMsg.length; j++) {
              const bit = parseInt(binaryMsg[bitIndex])
              data[i + j] = (data[i + j] & 0xFE) | bit
              bitIndex++
            }
          }

          ctx.putImageData(imageData, 0, 0)
          setOutputImage(canvas.toDataURL("image/png"))
          setBinaryMessage(binaryMsg)
          setIsProcessing(false)
        }
      }

      reader.readAsDataURL(imageFile)
    } catch (err) {
      setError("Failed to encode message in image")
      setIsProcessing(false)
    }
  }, [imageFile, message, textToBinary])

  const decodeMessageFromImage = useCallback(async () => {
    if (!imageFile) {
      setError("Please upload an image")
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const img = new Image()
      const reader = new FileReader()

      reader.onload = (event) => {
        img.src = event.target?.result as string
        img.onload = () => {
          const canvas = document.createElement("canvas")
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext("2d")

          if (!ctx) {
            setError("Failed to get canvas context")
            setIsProcessing(false)
            return
          }

          ctx.drawImage(img, 0, 0)
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const data = imageData.data

          // Extract binary from LSB
          let binary = ""
          for (let i = 0; i < data.length; i += 4) {
            for (let j = 0; j < 3; j++) {
              binary += data[i + j] & 1
            }
          }

          // Convert binary to text until null terminator
          let extractedText = ""
          for (let i = 0; i < binary.length; i += 8) {
            const byte = binary.substring(i, i + 8)
            if (byte === "00000000" || byte.length < 8) break
            const charCode = parseInt(byte, 2)
            if (charCode === 0) break
            extractedText += String.fromCharCode(charCode)
          }

          setExtractedMessage(extractedText)
          setBinaryMessage(binary.substring(0, Math.min(256, binary.length)))
          setIsProcessing(false)
        }
      }

      reader.readAsDataURL(imageFile)
    } catch (err) {
      setError("Failed to decode message from image")
      setIsProcessing(false)
    }
  }, [imageFile])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const downloadImage = useCallback(() => {
    if (outputImage) {
      const link = document.createElement("a")
      link.download = "steganography-output.png"
      link.href = outputImage
      link.click()
    }
  }, [outputImage])

  const handleClear = useCallback(() => {
    setImageFile(null)
    setImagePreview(null)
    setMessage("")
    setBinaryMessage("")
    setOutputImage(null)
    setExtractedMessage("")
    setError(null)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Mode Selector */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Mode</Label>
        <div className="flex gap-2">
          <Button
            variant={mode === "encode" ? "default" : "outline"}
            onClick={() => setMode("encode")}
            className="flex-1"
          >
            <ImageIcon className="size-4 mr-2" />
            Encode Message
          </Button>
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => setMode("decode")}
            className="flex-1"
          >
            <ImageIcon className="size-4 mr-2" />
            Decode Message
          </Button>
        </div>
      </section>

      {/* Image Upload */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="image-upload" className="text-base font-medium">
            Upload Image
          </Label>
          <Button variant="ghost" size="xs" onClick={handleClear} className="h-7">
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="flex-1"
          />
        </div>
        {imagePreview && (
          <div className="rounded-lg border bg-muted/30 p-4">
            <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded" />
          </div>
        )}
      </section>

      {/* Encode Mode */}
      {mode === "encode" && (
        <>
          <section className="space-y-3">
            <Label htmlFor="message" className="text-base font-medium">
              Secret Message
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="font-mono text-sm min-h-[100px]"
              placeholder="Enter your secret message here..."
            />
            <Button
              onClick={encodeMessageInImage}
              disabled={!imageFile || !message || isProcessing}
              className="w-full"
            >
              {isProcessing ? "Processing..." : "Encode Message in Image"}
            </Button>
          </section>

          {/* Output Image */}
          {outputImage && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Output Image</Label>
                <Button variant="outline" size="sm" onClick={downloadImage}>
                  <Download className="size-4 mr-1" />
                  Download
                </Button>
              </div>
              <div className="rounded-lg border bg-muted/30 p-4">
                <img src={outputImage} alt="Output" className="max-h-48 mx-auto rounded" />
              </div>
            </section>
          )}

          {/* Binary Preview */}
          {binaryMessage && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Binary Representation</Label>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => copyToClipboard(binaryMessage, "binary")}
                  className="h-7"
                >
                  {copied === "binary" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  <span className="text-xs">Copy</span>
                </Button>
              </div>
              <div className="rounded-lg border bg-muted/30 p-4 max-h-32 overflow-auto">
                <p className="font-mono text-xs break-all">{binaryMessage}</p>
              </div>
            </section>
          )}
        </>
      )}

      {/* Decode Mode */}
      {mode === "decode" && (
        <section className="space-y-3">
          <Button
            onClick={decodeMessageFromImage}
            disabled={!imageFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? "Processing..." : "Decode Message from Image"}
          </Button>

          {/* Extracted Message */}
          {extractedMessage && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Extracted Message</Label>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => copyToClipboard(extractedMessage, "extracted")}
                  className="h-7"
                >
                  {copied === "extracted" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  <span className="text-xs">Copy</span>
                </Button>
              </div>
              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="font-mono text-sm">{extractedMessage || "No message found"}</p>
              </div>
            </section>
          )}
        </section>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Steganography</h4>
            <p className="text-sm text-muted-foreground">
              Steganography hides secret messages within images by modifying the least significant bits (LSB) 
              of pixel colors. These changes are imperceptible to the human eye but can be decoded by 
              extracting the binary data. This tool uses PNG format for lossless encoding.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
