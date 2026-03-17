"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Trash2, Download, Image as ImageIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function QrCodeAugmentedReality() {
  const [targetImage, setTargetImage] = useState<File | null>(null)
  const [arContent, setArContent] = useState<"video" | "image" | "text" | "3d">("video")
  const [contentUrl, setContentUrl] = useState("")
  const [textContent, setTextContent] = useState("")
  const [qrData, setQrData] = useState("")
  const [copied, setCopied] = useState(false)

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setTargetImage(file)
    }
  }, [])

  const generateAR = useCallback(() => {
    let data = ""
    
    if (arContent === "text") {
      data = `ar:text:${encodeURIComponent(textContent)}`
    } else {
      data = `ar:${arContent}:${contentUrl}`
    }
    
    setQrData(data)
  }, [arContent, contentUrl, textContent])

  const handleCopy = useCallback(async () => {
    if (qrData) {
      await navigator.clipboard.writeText(qrData)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [qrData])

  const handleClear = useCallback(() => {
    setTargetImage(null)
    setContentUrl("")
    setTextContent("")
    setQrData("")
  }, [])

  const handleDownload = useCallback(() => {
    if (qrData) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="white"/>
        <text x="100" y="80" text-anchor="middle" font-size="24" fill="black">AR</text>
        <text x="100" y="110" text-anchor="middle" font-size="12" fill="gray">QR Code</text>
        <text x="100" y="140" text-anchor="middle" font-size="10" fill="gray">${arContent}</text>
      </svg>`
      const blob = new Blob([svg], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "ar-qr-code.svg"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [qrData, arContent])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">QR Code with Augmented Reality</h2>
            <p className="text-sm text-muted-foreground">
              Create QR codes that trigger AR experiences
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Target Image (Marker)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="target-image"
                />
                <Label htmlFor="target-image" className="cursor-pointer">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {targetImage ? targetImage.name : "Click to upload target image"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    This image will be used as the AR marker
                  </p>
                </Label>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Label>AR Content Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={arContent === "video" ? "default" : "outline"}
                onClick={() => setArContent("video")}
              >
                Video
              </Button>
              <Button
                variant={arContent === "image" ? "default" : "outline"}
                onClick={() => setArContent("image")}
              >
                Image
              </Button>
              <Button
                variant={arContent === "text" ? "default" : "outline"}
                onClick={() => setArContent("text")}
              >
                Text
              </Button>
              <Button
                variant={arContent === "3d" ? "default" : "outline"}
                onClick={() => setArContent("3d")}
              >
                3D Model
              </Button>
            </div>
          </div>

          {arContent === "text" ? (
            <div className="space-y-2">
              <Label htmlFor="textContent">AR Text Content</Label>
              <Textarea
                id="textContent"
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Enter text to display in AR..."
                className="min-h-[100px]"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="contentUrl">Content URL</Label>
              <Input
                id="contentUrl"
                value={contentUrl}
                onChange={(e) => setContentUrl(e.target.value)}
                placeholder={
                  arContent === "video" ? "https://example.com/video.mp4" :
                  arContent === "image" ? "https://example.com/image.jpg" :
                  "https://example.com/model.glb"
                }
              />
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button onClick={generateAR} className="flex-1" disabled={!contentUrl && arContent !== "text"}>
              Generate AR QR Code
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">QR Code Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {qrData ? (
              <>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-4xl mb-4">🥽</div>
                    <p className="font-medium">AR QR Code</p>
                    <p className="text-sm text-muted-foreground">{arContent.toUpperCase()}</p>
                    <p className="text-xs text-muted-foreground mt-2 break-all">{qrData}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={handleCopy} className="flex-1" variant="outline">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? "Copied" : "Copy Data"}
                  </Button>
                  <Button onClick={handleDownload} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </>
            ) : (
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground text-center p-4">
                  Upload a target image and configure AR content to generate QR code
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">How It Works</h3>
        <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
          <li>Upload an image that will be used as the AR marker/target</li>
          <li>Choose the type of AR content to display (video, image, text, or 3D model)</li>
          <li>Provide the content URL or text</li>
          <li>Generate the QR code that links to the AR experience</li>
          <li>Users scan the QR code to launch the AR experience</li>
        </ol>
      </div>
    </div>
  )
}
