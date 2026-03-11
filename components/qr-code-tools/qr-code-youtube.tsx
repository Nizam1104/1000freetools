"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Youtube } from "lucide-react"
import { cn } from "@/lib/utils"

export default function QrCodeYoutube() {
  const [url, setUrl] = useState<string>("")
  const [videoId, setVideoId] = useState<string>("")
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const extractVideoId = (inputUrl: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/,
    ]
    
    for (const pattern of patterns) {
      const match = inputUrl.match(pattern)
      if (match) return match[1]
    }
    return null
  }

  const generateYoutubeQrCode = useCallback(async () => {
    let targetUrl = ""
    let extractedId = ""

    if (videoId) {
      extractedId = videoId
      targetUrl = `https://www.youtube.com/watch?v=${videoId}`
    } else if (url) {
      extractedId = extractVideoId(url) || ""
      if (extractedId) {
        targetUrl = `https://www.youtube.com/watch?v=${extractedId}`
      } else {
        // Use the URL as-is (could be channel URL)
        targetUrl = url
      }
    }

    if (!targetUrl) {
      setError("Please enter a valid YouTube URL or video ID")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Using qrserver.com API for QR code generation
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(targetUrl)}&margin=10`
      
      setQrCodeUrl(qrUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate QR code")
    } finally {
      setLoading(false)
    }
  }, [url, videoId])

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

  const downloadQrCode = useCallback(async () => {
    if (!qrCodeUrl) return
    
    try {
      const response = await fetch(qrCodeUrl)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = downloadUrl
      a.download = `youtube-qr-${videoId || "video"}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (err) {
      console.error("Failed to download:", err)
    }
  }, [qrCodeUrl, videoId])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (url || videoId) {
        generateYoutubeQrCode()
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [url, videoId, generateYoutubeQrCode])

  const clearAll = useCallback(() => {
    setUrl("")
    setVideoId("")
    setQrCodeUrl("")
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* URL Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="url" className="text-base font-medium">
            YouTube URL
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={clearAll}
            className="h-7"
            disabled={!url && !videoId}
          >
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>

        <Input
          id="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value)
            if (e.target.value) setVideoId("")
          }}
          className={cn(
            "text-sm font-mono",
            error && !videoId && "border-destructive"
          )}
          placeholder="https://youtube.com/watch?v=..."
        />
        <p className="text-xs text-muted-foreground">
          Supports video URLs, short URLs (youtu.be), and embed URLs
        </p>
      </section>

      {/* Or Video ID */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground">Or enter Video ID</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <Input
          value={videoId}
          onChange={(e) => {
            setVideoId(e.target.value)
            if (e.target.value) setUrl("")
          }}
          className="text-sm font-mono"
          placeholder="dQw4w9WgXcQ"
          maxLength={11}
        />
      </section>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      {/* QR Code Result */}
      {qrCodeUrl && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">YouTube QR Code</Label>
            <Button
              variant="default"
              size="sm"
              onClick={downloadQrCode}
            >
              <Download className="size-4 mr-1" />
              Download
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="rounded-lg border bg-background p-6">
              <img
                src={qrCodeUrl}
                alt="YouTube QR Code"
                className="w-48 h-48"
              />
            </div>

            <div className="space-y-4 flex-1">
              <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Youtube className="size-5 text-red-600" />
                  <span className="font-medium">YouTube Video</span>
                </div>
                <div className="text-sm font-mono text-muted-foreground break-all">
                  {videoId || url}
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                When scanned, this QR code will open the YouTube video in the 
                YouTube app (if installed) or in a web browser.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!qrCodeUrl && (
        <div className="text-center py-12 text-muted-foreground">
          <Youtube className="size-12 mx-auto mb-4 opacity-50" />
          <p>Enter a YouTube URL or video ID to generate a QR code</p>
        </div>
      )}

      {/* Tips */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <h3 className="text-sm font-medium">Use Cases</h3>
        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
          <li>Link product packaging to demo videos</li>
          <li>Share tutorial videos in presentations</li>
          <li>Promote your YouTube channel</li>
          <li>Connect print ads to video content</li>
          <li>Event recordings access</li>
        </ul>
      </section>

      {/* Examples */}
      <section className="space-y-3 pt-4 border-t">
        <h3 className="text-sm font-medium">Quick Fill</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
              setVideoId("")
            }}
            className="text-xs"
          >
            Sample Video
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setVideoId("dQw4w9WgXcQ")
              setUrl("")
            }}
            className="text-xs"
          >
            Video ID Only
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setUrl("https://youtu.be/dQw4w9WgXcQ")
              setVideoId("")
            }}
            className="text-xs"
          >
            Short URL
          </Button>
        </div>
      </section>
    </div>
  )
}
