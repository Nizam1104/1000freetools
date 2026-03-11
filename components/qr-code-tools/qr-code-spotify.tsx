"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download } from "lucide-react"
import { cn } from "@/lib/utils"

export default function QrCodeSpotify() {
  const [url, setUrl] = useState<string>("")
  const [uri, setUri] = useState<string>("")
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const extractSpotifyId = (input: string): { type: string; id: string } | null => {
    const patterns = [
      { type: "track", regex: /spotify\.com\/track\/([a-zA-Z0-9]+)/ },
      { type: "album", regex: /spotify\.com\/album\/([a-zA-Z0-9]+)/ },
      { type: "artist", regex: /spotify\.com\/artist\/([a-zA-Z0-9]+)/ },
      { type: "playlist", regex: /spotify\.com\/playlist\/([a-zA-Z0-9]+)/ },
      { type: "show", regex: /spotify\.com\/show\/([a-zA-Z0-9]+)/ },
      { type: "episode", regex: /spotify\.com\/episode\/([a-zA-Z0-9]+)/ },
    ]

    for (const pattern of patterns) {
      const match = input.match(pattern.regex)
      if (match) return { type: pattern.type, id: match[1] }
    }

    // Check for Spotify URI format
    const uriMatch = input.match(/^spotify:([a-z]+):([a-zA-Z0-9]+)/)
    if (uriMatch) return { type: uriMatch[1], id: uriMatch[2] }

    return null
  }

  const generateSpotifyQrCode = useCallback(async () => {
    let targetUrl = ""
    const extracted = url ? extractSpotifyId(url) : null

    if (uri) {
      // Convert URI to URL
      const uriParts = uri.replace("spotify:", "").split(":")
      if (uriParts.length >= 2) {
        targetUrl = `https://open.spotify.com/${uriParts[0]}/${uriParts[1]}`
      } else {
        targetUrl = uri
      }
    } else if (extracted) {
      targetUrl = `https://open.spotify.com/${extracted.type}/${extracted.id}`
    } else if (url) {
      targetUrl = url
    }

    if (!targetUrl) {
      setError("Please enter a valid Spotify URL or URI")
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
  }, [url, uri])

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
      a.download = `spotify-qr-${uri || url}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (err) {
      console.error("Failed to download:", err)
    }
  }, [qrCodeUrl, uri, url])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (url || uri) {
        generateSpotifyQrCode()
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [url, uri, generateSpotifyQrCode])

  const clearAll = useCallback(() => {
    setUrl("")
    setUri("")
    setQrCodeUrl("")
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* URL Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="url" className="text-base font-medium">
            Spotify URL
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={clearAll}
            className="h-7"
            disabled={!url && !uri}
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
            if (e.target.value) setUri("")
          }}
          className={cn(
            "text-sm font-mono",
            error && !uri && "border-destructive"
          )}
          placeholder="https://open.spotify.com/track/..."
        />
        <p className="text-xs text-muted-foreground">
          Supports tracks, albums, artists, playlists, podcasts, and episodes
        </p>
      </section>

      {/* Or URI */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground">Or enter Spotify URI</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <Input
          value={uri}
          onChange={(e) => {
            setUri(e.target.value)
            if (e.target.value) setUrl("")
          }}
          className="text-sm font-mono"
          placeholder="spotify:track:4cOdK2wGLETKBW3PvgPWqT"
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
            <Label className="text-base font-medium">Spotify QR Code</Label>
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
                alt="Spotify QR Code"
                className="w-48 h-48"
              />
            </div>

            <div className="space-y-4 flex-1">
              <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                <div className="font-medium">Spotify Content</div>
                <div className="text-sm font-mono text-muted-foreground break-all">
                  {uri || url}
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                When scanned, this QR code will open the content in the Spotify 
                app (if installed) or in a web browser.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!qrCodeUrl && (
        <div className="text-center py-12 text-muted-foreground">
          <svg className="size-12 mx-auto mb-4 opacity-50" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          <p>Enter a Spotify URL or URI to generate a QR code</p>
        </div>
      )}

      {/* Tips */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <h3 className="text-sm font-medium">Use Cases</h3>
        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
          <li>Share playlists at parties or events</li>
          <li>Promote your artist profile</li>
          <li>Link album art to streaming</li>
          <li>Podcast episode promotion</li>
          <li>Music venue setlists</li>
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
              setUrl("https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT")
              setUri("")
            }}
            className="text-xs"
          >
            Sample Track
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setUri("spotify:track:4cOdK2wGLETKBW3PvgPWqT")
              setUrl("")
            }}
            className="text-xs"
          >
            Track URI
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setUrl("https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M")
              setUri("")
            }}
            className="text-xs"
          >
            Playlist
          </Button>
        </div>
      </section>
    </div>
  )
}
