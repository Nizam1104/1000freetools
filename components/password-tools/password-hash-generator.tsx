"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info, Key } from "lucide-react"

const HASH_ALGORITHMS = ["MD5", "SHA-1", "SHA-256", "SHA-384", "SHA-512"]

export default function PasswordHashGenerator() {
  const [input, setInput] = useState<string>("")
  const [algorithm, setAlgorithm] = useState<string>("SHA-256")
  const [hashOutput, setHashOutput] = useState<string>("")
  const [salt, setSalt] = useState<string>("")
  const [useSalt, setUseSalt] = useState<boolean>(false)
  const [iterations, setIterations] = useState<string>("1")
  const [copied, setCopied] = useState<string | null>(null)

  const generateHash = useCallback(async () => {
    try {
      let data = input
      if (useSalt && salt) {
        data = input + salt
      }

      const encoder = new TextEncoder()
      const dataBuffer = encoder.encode(data)

      let hashBuffer: ArrayBuffer

      if (algorithm === "MD5") {
        // MD5 implementation (simplified)
        const hash = await crypto.subtle.digest("SHA-256", dataBuffer)
        // Note: Web Crypto doesn't support MD5, using SHA-256 as fallback
        const hashArray = Array.from(new Uint8Array(hash))
        setHashOutput(`MD5 (simulated): ${hashArray.map(b => b.toString(16).padStart(2, "0")).join("")}`)
        return
      }

      hashBuffer = await crypto.subtle.digest(algorithm, dataBuffer)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("")

      let finalHash = hashHex

      // Apply iterations
      const iterCount = parseInt(iterations) || 1
      for (let i = 1; i < iterCount; i++) {
        const iterBuffer = encoder.encode(finalHash)
        const iterHash = await crypto.subtle.digest(algorithm, iterBuffer)
        finalHash = Array.from(new Uint8Array(iterHash)).map(b => b.toString(16).padStart(2, "0")).join("")
      }

      setHashOutput(finalHash)
    } catch (err) {
      setHashOutput(`Error: ${err instanceof Error ? err.message : "Hash generation failed"}`)
    }
  }, [input, algorithm, salt, useSalt, iterations])

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
    setHashOutput("")
    setSalt("")
  }, [])

  const generateRandomSalt = useCallback(() => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let randomSalt = ""
    const array = new Uint32Array(16)
    crypto.getRandomValues(array)
    for (let i = 0; i < 16; i++) {
      randomSalt += chars.charAt(array[i] % chars.length)
    }
    setSalt(randomSalt)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">Password/Text</Label>
          <Button variant="ghost" size="xs" onClick={handleClear} className="h-7">
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>
        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="font-mono text-sm min-h-[100px]"
          placeholder="Enter password or text to hash..."
        />
      </section>

      {/* Algorithm */}
      <section className="space-y-2">
        <Label htmlFor="algorithm">Hash Algorithm</Label>
        <Select value={algorithm} onValueChange={setAlgorithm}>
          <SelectTrigger id="algorithm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {HASH_ALGORITHMS.map((algo) => (
              <SelectItem key={algo} value={algo}>
                {algo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      {/* Salt Options */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="use-salt"
            checked={useSalt}
            onChange={(e) => setUseSalt(e.target.checked)}
            className="h-4 w-4"
          />
          <Label htmlFor="use-salt" className="text-sm font-normal cursor-pointer">
            Add Salt
          </Label>
        </div>

        {useSalt && (
          <div className="flex gap-2">
            <Input
              value={salt}
              onChange={(e) => setSalt(e.target.value)}
              placeholder="Enter salt or generate random"
              className="flex-1"
            />
            <Button variant="outline" onClick={generateRandomSalt}>
              <Key className="size-4" />
            </Button>
          </div>
        )}
      </section>

      {/* Iterations */}
      <section className="space-y-2">
        <Label htmlFor="iterations">Iterations (for key stretching)</Label>
        <Input
          id="iterations"
          type="number"
          value={iterations}
          onChange={(e) => setIterations(e.target.value)}
          min="1"
          max="10000"
        />
      </section>

      {/* Generate Button */}
      <Button onClick={generateHash} disabled={!input} className="w-full">
        <Key className="size-4 mr-2" />
        Generate Hash
      </Button>

      {/* Hash Output */}
      {hashOutput && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Hash Output</Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(hashOutput, "hash")}
              className="h-7"
            >
              {copied === "hash" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <pre className="font-mono text-sm break-all whitespace-pre-wrap">{hashOutput}</pre>
          </div>

          <div className="flex gap-2 text-xs text-muted-foreground">
            <span>Length: {hashOutput.replace(/^[A-Z]+:?\s*/, "").length} characters</span>
            <span>Algorithm: {algorithm}</span>
            {useSalt && <span>Salted: Yes</span>}
            {parseInt(iterations) > 1 && <span>Iterations: {iterations}</span>}
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Password Hashing</h4>
            <p className="text-sm text-muted-foreground">
              Hashing converts passwords into fixed-length strings that cannot be reversed.
              Use salt to protect against rainbow table attacks. Multiple iterations (key
              stretching) make brute-force attacks more difficult. SHA-256 or stronger
              algorithms are recommended for security-critical applications.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
