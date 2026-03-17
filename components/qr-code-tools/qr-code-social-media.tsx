"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Share2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function QrCodeSocialMedia() {
  const [platform, setPlatform] = useState<"instagram" | "facebook" | "twitter" | "tiktok" | "youtube" | "linkedin" | "snapchat" | "pinterest">("instagram")
  const [username, setUsername] = useState("")
  const [profileUrl, setProfileUrl] = useState("")
  const [qrData, setQrData] = useState("")
  const [copied, setCopied] = useState(false)

  const platformConfig = {
    instagram: { name: "Instagram", color: "#E1306C", url: "https://instagram.com/" },
    facebook: { name: "Facebook", color: "#1877F2", url: "https://facebook.com/" },
    twitter: { name: "Twitter/X", color: "#000000", url: "https://twitter.com/" },
    tiktok: { name: "TikTok", color: "#000000", url: "https://tiktok.com/@" },
    youtube: { name: "YouTube", color: "#FF0000", url: "https://youtube.com/" },
    linkedin: { name: "LinkedIn", color: "#0A66C2", url: "https://linkedin.com/in/" },
    snapchat: { name: "Snapchat", color: "#FFFC00", url: "https://snapchat.com/add/" },
    pinterest: { name: "Pinterest", color: "#E60023", url: "https://pinterest.com/" }
  }

  const generateQR = useCallback(() => {
    let url = ""
    const config = platformConfig[platform]
    
    if (profileUrl) {
      url = profileUrl
    } else if (username) {
      url = config.url + username
    }
    
    const data = {
      type: "social_media",
      platform: platform,
      username: username,
      url: url
    }
    setQrData(JSON.stringify(data, null, 2))
  }, [platform, username, profileUrl, platformConfig])

  const handleCopy = useCallback(async () => {
    if (qrData) {
      await navigator.clipboard.writeText(qrData)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [qrData])

  const handleClear = useCallback(() => {
    setUsername("")
    setProfileUrl("")
    setQrData("")
  }, [])

  const handleDownload = useCallback(() => {
    if (qrData) {
      const config = platformConfig[platform]
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="white"/>
        <circle cx="100" cy="80" r="40" fill="${config.color}"/>
        <text x="100" y="140" text-anchor="middle" font-size="14" font-weight="bold" fill="#1f2937">${config.name}</text>
        <text x="100" y="165" text-anchor="middle" font-size="12" fill="#6b7280">@${username || "username"}</text>
        <text x="100" y="185" text-anchor="middle" font-size="10" fill="#9ca3af">Scan to Follow</text>
      </svg>`
      const blob = new Blob([svg], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${platform}-qr.svg`
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [qrData, platform, username, platformConfig])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">QR Code for Social Media</h2>
            <p className="text-sm text-muted-foreground">
              Generate QR codes for social media profiles
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Select Platform</Label>
            <div className="grid grid-cols-4 gap-2">
              {(Object.keys(platformConfig) as Array<keyof typeof platformConfig>).map((p) => (
                <Button
                  key={p}
                  variant={platform === p ? "default" : "outline"}
                  onClick={() => setPlatform(p)}
                  className="flex flex-col h-auto py-2"
                >
                  <span className="text-xs">{platformConfig[p].name}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username / Handle</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="@yourusername"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profileUrl">Custom Profile URL (Optional)</Label>
            <Input
              id="profileUrl"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={generateQR} className="flex-1" disabled={!username && !profileUrl}>
              <Share2 className="h-4 w-4 mr-2" />
              Generate QR Code
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
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl"
                      style={{ backgroundColor: platformConfig[platform].color }}
                    >
                      {platformConfig[platform].name[0]}
                    </div>
                    <p className="font-medium">{platformConfig[platform].name}</p>
                    <p className="text-sm text-muted-foreground">@{username || "username"}</p>
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
                <p className="text-muted-foreground">Select platform and enter username</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
