"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CustomSaltedHashGenerator() {
  const [input, setInput] = useState<string>("")
  const [salt, setSalt] = useState<string>("")
  const [useRandomSalt, setUseRandomSalt] = useState<boolean>(false)
  const [hash, setHash] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  // Simple hash function combining input and salt
  const generateSaltedHash = useCallback(async (text: string, saltValue: string) => {
    if (!text || !saltValue) {
      setHash("")
      return
    }

    try {
      // Combine salt and input (salt prefix method)
      const combined = saltValue + text + saltValue
      
      // Use Web Crypto API for SHA-256
      const encoder = new TextEncoder()
      const data = encoder.encode(combined)
      const hashBuffer = await crypto.subtle.digest("SHA-256", data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
      
      setHash(hashHex)
    } catch (err) {
      setHash("")
    }
  }, [])

  const generateRandomSalt = useCallback(() => {
    const array = new Uint8Array(16)
    crypto.getRandomValues(array)
    const randomSalt = Array.from(array).map(b => b.toString(16).padStart(2, "0")).join("")
    setSalt(randomSalt)
  }, [])

  React.useEffect(() => {
    if (useRandomSalt && !salt) {
      generateRandomSalt()
    }
    generateSaltedHash(input, salt)
  }, [input, salt, useRandomSalt, generateSaltedHash, generateRandomSalt])

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
    setInput("")
    setSalt("")
    setHash("")
    setUseRandomSalt(false)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            Input Text / Password
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => copyToClipboard(input, "input")}
            className="h-7"
            disabled={!input}
          >
            {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            <span className="text-xs">Copy</span>
          </Button>
        </div>

        <Input
          id="input"
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="font-mono"
          placeholder="Enter text or password..."
        />
      </section>

      {/* Salt Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="salt" className="text-base font-medium">
            Salt
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="xs"
              onClick={generateRandomSalt}
              className="h-7"
            >
              <RefreshCw className="size-3.5 mr-1" />
              Generate Random
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(salt, "salt")}
              className="h-7"
              disabled={!salt}
            >
              {copied === "salt" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            id="random-salt"
            checked={useRandomSalt}
            onChange={(e) => {
              setUseRandomSalt(e.target.checked)
              if (e.target.checked && !salt) {
                generateRandomSalt()
              }
            }}
            className="h-4 w-4"
          />
          <Label htmlFor="random-salt" className="text-sm font-normal cursor-pointer">
            Use random salt (recommended for security)
          </Label>
        </div>

        <Input
          id="salt"
          value={salt}
          onChange={(e) => {
            setSalt(e.target.value)
            setUseRandomSalt(false)
          }}
          className="font-mono"
          placeholder="Enter custom salt or generate random..."
          disabled={useRandomSalt}
        />
        <p className="text-xs text-muted-foreground">
          A salt is random data added to input before hashing to prevent rainbow table attacks.
        </p>
      </section>

      {/* Hash Output */}
      {hash && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Salted Hash (SHA-256)</Label>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(hash, "hash")}
                className="h-7"
              >
                {copied === "hash" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
              <Button
                variant="ghost"
                size="xs"
                onClick={handleClear}
                className="h-7"
              >
                <Trash2 className="size-3.5" />
                <span className="text-xs">Clear</span>
              </Button>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="font-mono text-sm break-all">{hash}</p>
          </div>

          <div className="rounded-lg border bg-background p-4 space-y-2">
            <p className="text-sm font-medium">Hash Components</p>
            <div className="font-mono text-xs space-y-1">
              <p><span className="text-muted-foreground">Salt:</span> {salt}</p>
              <p><span className="text-muted-foreground">Input:</span> {"*".repeat(input.length)}</p>
              <p><span className="text-muted-foreground">Combined:</span> {salt} + [input] + {salt}</p>
              <p className="pt-2 border-t"><span className="text-muted-foreground">Result:</span> {hash}</p>
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Salted Hashes</h4>
            <p className="text-sm text-muted-foreground">
              Salting adds random data to input before hashing, making each hash unique even for 
              identical inputs. This prevents:
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Rainbow table attacks (pre-computed hash databases)</li>
              <li>Identifying users with the same password</li>
              <li>Parallel cracking of multiple hashes</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">
              <strong>Best Practice:</strong> Use a unique, random salt for each password and store 
              it alongside the hash.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
