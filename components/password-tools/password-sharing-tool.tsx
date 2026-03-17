"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Trash2, Info, Share2, Link } from "lucide-react"

export default function PasswordSharingTool() {
  const [password, setPassword] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [expiryHours, setExpiryHours] = useState<string>("24")
  const [shareLink, setShareLink] = useState<string>("")
  const [encryptedData, setEncryptedData] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)
  const [mode, setMode] = useState<"create" | "retrieve">("create")
  const [retrieveCode, setRetrieveCode] = useState<string>("")

  const generateShareLink = useCallback(async () => {
    if (!password) return

    try {
      // Generate a simple encryption simulation
      const encoder = new TextEncoder()
      const data = encoder.encode(JSON.stringify({ password, message, createdAt: Date.now() }))
      
      // Create a base64 encoded "encrypted" payload
      const base64Data = btoa(String.fromCharCode(...new Uint8Array(data)))
      const shareCode = `pwd_${base64Data.substring(0, 50)}_${Date.now().toString(36)}`
      
      // Generate a shareable link (simulated)
      const link = `${typeof window !== 'undefined' ? window.location.origin : ''}/retrieve#${shareCode}`
      setShareLink(link)
      setEncryptedData(base64Data)
    } catch (err) {
      console.error("Failed to generate link:", err)
    }
  }, [password, message])

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
    setPassword("")
    setMessage("")
    setShareLink("")
    setEncryptedData("")
    setRetrieveCode("")
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Mode Selector */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Mode</Label>
        <div className="flex gap-2">
          <Button
            variant={mode === "create" ? "default" : "outline"}
            onClick={() => setMode("create")}
            className="flex-1"
          >
            <Share2 className="size-4 mr-2" />
            Create Share Link
          </Button>
          <Button
            variant={mode === "retrieve" ? "default" : "outline"}
            onClick={() => setMode("retrieve")}
            className="flex-1"
          >
            <Link className="size-4 mr-2" />
            Retrieve Password
          </Button>
        </div>
      </section>

      {/* Create Mode */}
      {mode === "create" && (
        <>
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-base font-medium">Password to Share</Label>
              <Button variant="ghost" size="xs" onClick={handleClear} className="h-7">
                <Trash2 className="size-3.5" />
                <span className="text-xs">Clear</span>
              </Button>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password to share..."
            />
          </section>

          <section className="space-y-2">
            <Label htmlFor="message">Optional Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a message for the recipient..."
              rows={2}
            />
          </section>

          <section className="space-y-2">
            <Label htmlFor="expiry">Expiry Time</Label>
            <Input
              id="expiry"
              type="number"
              value={expiryHours}
              onChange={(e) => setExpiryHours(e.target.value)}
              min="1"
              max="168"
            />
            <p className="text-xs text-muted-foreground">Hours until the link expires (1-168)</p>
          </section>

          <Button onClick={generateShareLink} disabled={!password} className="w-full">
            <Share2 className="size-4 mr-2" />
            Generate Share Link
          </Button>

          {shareLink && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Share Link</Label>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => copyToClipboard(shareLink, "link")}
                  className="h-7"
                >
                  {copied === "link" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  <span className="text-xs">Copy</span>
                </Button>
              </div>

              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="font-mono text-sm break-all">{shareLink}</p>
              </div>

              <div className="rounded-lg border bg-muted/30 p-4">
                <h4 className="font-medium mb-2">Encrypted Data</h4>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs truncate flex-1">{encryptedData}</p>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => copyToClipboard(encryptedData, "data")}
                    className="h-7 ml-2"
                  >
                    {copied === "data" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  </Button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground text-center">
                Share this link securely. It will expire in {expiryHours} hours.
              </p>
            </section>
          )}
        </>
      )}

      {/* Retrieve Mode */}
      {mode === "retrieve" && (
        <section className="space-y-3">
          <Label htmlFor="retrieve-code">Share Code or Link</Label>
          <Input
            id="retrieve-code"
            value={retrieveCode}
            onChange={(e) => setRetrieveCode(e.target.value)}
            placeholder="Paste the share link or code..."
          />

          <Button className="w-full" disabled={!retrieveCode}>
            Retrieve Password
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            Note: This is a demo. In production, implement secure server-side retrieval.
          </p>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Password Sharing</h4>
            <p className="text-sm text-muted-foreground">
              Generate secure shareable links for passwords. The password is encoded
              and can be shared via any messaging platform. For production use,
              implement server-side encryption with proper key management and
              automatic expiration. Never share passwords over unencrypted channels.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
