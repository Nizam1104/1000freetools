"use client"

import * as React from "react"
import { useState, useCallback, useRef } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Check, Trash2, Download, Upload, Eye, EyeOff, Lock, Unlock, Image as ImageIcon, Info, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SteganographyTool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [imageData, setImageData] = useState<ImageData | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [outputImage, setOutputImage] = useState<string>("")
  const [extractedMessage, setExtractedMessage] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [stats, setStats] = useState<{ capacity: number; used: number; percentage: number } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Hash password to create a seed for XOR encryption
  const hashPassword = useCallback((pwd: string): number[] => {
    if (!pwd) return []
    const encoder = new TextEncoder()
    const data = encoder.encode(pwd)
    const hash = new Uint8Array(32)

    // Simple hash function for demo (in production use proper crypto)
    for (let i = 0; i < data.length; i++) {
      hash[i % 32] ^= data[i]
      hash[(i + 1) % 32] = ((hash[(i + 1) % 32] + data[i]) & 0xFF)
    }

    return Array.from(hash)
  }, [])

  // XOR encrypt/decrypt message with password
  const xorCipher = useCallback((text: string, pwd: string): string => {
    if (!pwd) return text
    const hash = hashPassword(pwd)
    const encoder = new TextEncoder()
    const bytes = encoder.encode(text)
    const xored = bytes.map((b, i) => b ^ hash[i % hash.length])
    return String.fromCharCode(...xored)
  }, [hashPassword])

  // Convert string to binary
  const stringToBinary = useCallback((str: string): string => {
    return str.split("").map(c => c.charCodeAt(0).toString(2).padStart(8, "0")).join("")
  }, [])

  // Convert binary to string
  const binaryToString = useCallback((binary: string): string => {
    const bytes = binary.match(/.{1,8}/g) || []
    return bytes.map(b => String.fromCharCode(parseInt(b, 2))).join("")
  }, [])

  // Handle image upload
  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file")
      return
    }

    setError(null)
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        setImage(img)
        setImagePreview(event.target?.result as string)
        setOutputImage("")
        setExtractedMessage("")
        setStats(null)

        // Calculate capacity
        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.drawImage(img, 0, 0)
          const data = ctx.getImageData(0, 0, img.width, img.height)
          setImageData(data)
          // LSB capacity: 1 bit per color channel (RGBA), 8 bits = 1 char
          const capacity = Math.floor((data.data.length / 4) / 8) - 32 // Reserve 32 bits for length
          setStats({ capacity, used: 0, percentage: 0 })
        }
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }, [])

  // Encode message into image using LSB
  const encodeMessage = useCallback(() => {
    if (!image || !imageData) {
      setError("Please upload an image first")
      return
    }
    if (!message) {
      setError("Please enter a message to hide")
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      // Apply password encryption if provided
      let messageToEncode = message
      if (password) {
        messageToEncode = xorCipher(message, password)
      }

      // Create length header (32 bits)
      const messageBinary = stringToBinary(messageToEncode)
      const lengthBinary = messageToEncode.length.toString(2).padStart(32, "0")
      const fullBinary = lengthBinary + messageBinary

      // Check capacity
      const maxCapacity = Math.floor((imageData.data.length / 4) / 8)
      if (fullBinary.length > imageData.data.length) {
        setError(`Message too long! Max capacity: ${maxCapacity} characters`)
        setIsProcessing(false)
        return
      }

      // Create new canvas
      const canvas = document.createElement("canvas")
      canvas.width = image.width
      canvas.height = image.height
      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("Failed to get canvas context")

      // Draw original image
      ctx.drawImage(image, 0, 0)
      const outputData = ctx.getImageData(0, 0, image.width, image.height)

      // Encode message using LSB
      let bitIndex = 0
      for (let i = 0; i < outputData.data.length && bitIndex < fullBinary.length; i++) {
        if (i % 4 < 3) { // Only modify RGB channels, not alpha
          const bit = parseInt(fullBinary[bitIndex])
          outputData.data[i] = (outputData.data[i] & 0xFE) | bit
          bitIndex++
        }
      }

      ctx.putImageData(outputData, 0, 0)
      const outputUrl = canvas.toDataURL("image/png")
      setOutputImage(outputUrl)

      // Update stats
      setStats({
        capacity: maxCapacity,
        used: messageToEncode.length,
        percentage: Math.round((messageToEncode.length / maxCapacity) * 100),
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to encode message")
    } finally {
      setIsProcessing(false)
    }
  }, [image, imageData, message, password, stringToBinary, xorCipher])

  // Decode message from image using LSB
  const decodeMessage = useCallback(() => {
    if (!image || !imageData) {
      setError("Please upload an image first")
      return
    }

    setIsProcessing(true)
    setError(null)
    setExtractedMessage("")

    try {
      // Extract length header (first 32 bits)
      let lengthBinary = ""
      let bitIndex = 0
      for (let i = 0; i < imageData.data.length && bitIndex < 32; i++) {
        if (i % 4 < 3) {
          lengthBinary += imageData.data[i] & 1
          bitIndex++
        }
      }

      const messageLength = parseInt(lengthBinary, 2)
      if (isNaN(messageLength) || messageLength <= 0 || messageLength > 1000000) {
        setError("No valid message found in this image")
        setIsProcessing(false)
        return
      }

      // Extract message bits
      let messageBinary = ""
      bitIndex = 0
      const totalBits = messageLength * 8
      for (let i = 0; i < imageData.data.length && bitIndex < totalBits; i++) {
        if (i % 4 < 3) {
          messageBinary += imageData.data[i] & 1
          bitIndex++
        }
      }

      // Convert to string
      let decodedMessage = binaryToString(messageBinary)

      // Apply password decryption if provided
      if (password) {
        decodedMessage = xorCipher(decodedMessage, password)
      }

      setExtractedMessage(decodedMessage)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to decode message")
    } finally {
      setIsProcessing(false)
    }
  }, [image, imageData, password, binaryToString, xorCipher])

  const downloadOutputImage = useCallback(() => {
    if (!outputImage) return
    const a = document.createElement("a")
    a.href = outputImage
    a.download = "steganography_output.png"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [outputImage])

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
    setImage(null)
    setImageData(null)
    setImagePreview("")
    setMessage("")
    setPassword("")
    setOutputImage("")
    setExtractedMessage("")
    setStats(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Mode Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Mode</Label>
        <div className="flex gap-2">
          <Button
            variant={mode === "encode" ? "default" : "outline"}
            onClick={() => setMode("encode")}
            className="flex-1"
          >
            <Lock className="size-4 mr-2" />
            Hide Message
          </Button>
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => setMode("decode")}
            className="flex-1"
          >
            <Unlock className="size-4 mr-2" />
            Extract Message
          </Button>
        </div>
      </section>

      {/* Image Upload */}
      <section className="space-y-3">
        <Label>Upload PNG Image</Label>
        <div className="grid md:grid-cols-2 gap-4">
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
              imagePreview ? "border-green-500 bg-green-500/5" : "hover:border-muted-foreground/50"
            )}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={handleImageUpload}
              className="hidden"
            />
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded" />
            ) : (
              <>
                <ImageIcon className="size-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PNG recommended for best results</p>
              </>
            )}
          </div>

          {outputImage && mode === "encode" && (
            <div className="border-2 border-green-500 rounded-lg p-6 text-center">
              <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">Output Image</p>
              <img src={outputImage} alt="Output" className="max-h-48 mx-auto rounded" />
            </div>
          )}
        </div>

        {image && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Size: {image.width} x {image.height} px</span>
            {stats && (
              <>
                <span>Capacity: {stats.capacity} chars</span>
                {mode === "encode" && message && (
                  <span>Used: {stats.used} chars ({stats.percentage}%)</span>
                )}
              </>
            )}
          </div>
        )}
      </section>

      {/* Message Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="message">
            {mode === "encode" ? "Message to Hide" : "Extracted Message"}
          </Label>
          {extractedMessage && (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="xs" onClick={() => copyToClipboard(extractedMessage, "extracted")} className="h-7">
                {copied === "extracted" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
              <Button variant="ghost" size="xs" onClick={handleClear} className="h-7">
                <Trash2 className="size-3.5" />
                <span className="text-xs">Clear</span>
              </Button>
            </div>
          )}
        </div>

        {mode === "encode" ? (
          <Textarea
            id="message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
              setError(null)
            }}
            className="font-mono text-sm min-h-[100px]"
            placeholder="Enter the secret message to hide in the image..."
          />
        ) : (
          <Textarea
            id="extracted-message"
            value={extractedMessage}
            readOnly
            className="font-mono text-sm min-h-[100px] bg-muted/50"
            placeholder="Extracted message will appear here..."
          />
        )}
      </section>

      {/* Password Protection */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password Protection (Optional)</Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => setShowPassword(!showPassword)}
            className="h-7"
          >
            {showPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
          </Button>
        </div>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password to encrypt the hidden message..."
          className="font-mono"
        />
        <p className="text-xs text-muted-foreground">
          The message will be XOR encrypted with the password before hiding. You'll need the same password to extract it.
        </p>
      </section>

      {/* Action Button */}
      <section className="flex gap-2">
        <Button
          onClick={mode === "encode" ? encodeMessage : decodeMessage}
          disabled={!image || isProcessing || (mode === "encode" && !message)}
          className="flex-1"
        >
          {isProcessing ? "Processing..." : mode === "encode" ? "Hide Message in Image" : "Extract Message from Image"}
        </Button>

        {outputImage && mode === "encode" && (
          <Button variant="outline" onClick={downloadOutputImage}>
            <Download className="size-4 mr-2" />
            Download
          </Button>
        )}
      </section>

      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-3 text-destructive text-sm flex items-center gap-2">
          <AlertCircle className="size-4" />
          {error}
        </div>
      )}

      {/* Capacity Indicator */}
      {stats && mode === "encode" && message && (
        <section className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Storage Capacity</span>
            <span>{stats.percentage}% used</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full transition-all",
                stats.percentage > 90 ? "bg-destructive" :
                stats.percentage > 70 ? "bg-yellow-500" : "bg-green-500"
              )}
              style={{ width: `${Math.min(stats.percentage, 100)}%` }}
            />
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Steganography</h4>
            <p className="text-sm text-muted-foreground">
              Steganography is the practice of hiding secret information within ordinary, non-secret data.
              This tool uses LSB (Least Significant Bit) steganography, which modifies the least significant
              bits of pixel colors to store hidden data.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>How LSB works:</strong> Each pixel has RGB values (0-255). Changing the last bit of
              these values creates imperceptible color changes. For example, changing red from 255 (11111111)
              to 254 (11111110) is invisible to the human eye but stores 1 bit of data.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Security Tips:</strong><br />
              - Use password protection for sensitive messages<br />
              - PNG format preserves data better than JPEG (which uses lossy compression)<br />
              - Larger images can store more data<br />
              - The hidden data is not encrypted by default - use the password option
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
