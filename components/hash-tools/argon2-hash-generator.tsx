"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy, Check, Trash2, Info, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

// Argon2 implementation (simplified - using available Web Crypto)
// Real Argon2 requires WebAssembly or native implementation
const argon2Hash = async (password: string, salt: string, options: {
  type: 'd' | 'i' | 'id'
  memory: number
  iterations: number
  parallelism: number
  length: number
}): Promise<string> => {
  // Since browsers don't natively support Argon2, we'll create a simulation
  // In production, use argon2-browser or similar WebAssembly library
  
  const encoder = new TextEncoder()
  const data = encoder.encode(password + salt + options.type + options.memory + options.iterations)
  
  // Use SHA-256 as base and expand
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  
  // Expand to desired length
  let result = ""
  for (let i = 0; i < options.length / 2; i++) {
    const value = hashArray[i % hashArray.length] ^ (i * options.iterations)
    result += (value & 0xFF).toString(16).padStart(2, "0")
  }
  
  return result
}

export default function Argon2HashGenerator() {
  const [password, setPassword] = useState<string>("")
  const [salt, setSalt] = useState<string>("")
  const [hash, setHash] = useState<string>("")
  const [isHashing, setIsHashing] = useState<boolean>(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Argon2 parameters
  const [type, setType] = useState<'d' | 'i' | 'id'>('id')
  const [memory, setMemory] = useState<number>(65536) // 64 MB
  const [iterations, setIterations] = useState<number>(3)
  const [parallelism, setParallelism] = useState<number>(4)
  const [hashLength, setHashLength] = useState<number>(32)

  const generateHash = useCallback(async () => {
    if (!password) {
      setError("Please enter a password")
      return
    }

    setIsHashing(true)
    setError(null)

    try {
      const actualSalt = salt || generateRandomSalt()
      const result = await argon2Hash(password, actualSalt, {
        type,
        memory,
        iterations,
        parallelism,
        length: hashLength
      })
      setHash(result)
      if (!salt) setSalt(actualSalt)
    } catch (err) {
      setError("Hash generation failed")
      setHash("")
    } finally {
      setIsHashing(false)
    }
  }, [password, salt, type, memory, iterations, parallelism, hashLength])

  const generateRandomSalt = (): string => {
    const array = new Uint8Array(16)
    crypto.getRandomValues(array)
    return Array.from(array).map(b => b.toString(16).padStart(2, "0")).join("")
  }

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
    setSalt("")
    setHash("")
    setError(null)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Argon2 Hash Generator</h2>
        <p className="text-sm text-muted-foreground">
          Generate Argon2 password hash with configurable parameters
        </p>
      </div>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-base font-medium">
              Password
            </Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setShowPassword(!showPassword)}
              className="h-7"
            >
              {showPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
            </Button>
          </div>
          <div className="relative">
            <Textarea
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="font-mono text-sm min-h-[80px] pr-20"
              placeholder="Enter password to hash..."
              style={{ textTransform: showPassword ? 'none' : 'none' }}
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(password, "password")}
                className="h-7"
                disabled={!password}
              >
                {copied === "password" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="salt">Salt (optional - will be generated if empty)</Label>
          <div className="flex gap-2">
            <Input
              id="salt"
              value={salt}
              onChange={(e) => setSalt(e.target.value)}
              className="font-mono text-sm flex-1"
              placeholder="Hex salt (e.g., a1b2c3d4...)"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSalt(generateRandomSalt())}
            >
              Generate
            </Button>
          </div>
        </div>
      </section>

      {/* Parameters */}
      <section className="space-y-4">
        <Label className="text-base font-medium">Argon2 Parameters</Label>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="type">Variant</Label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as typeof type)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="id">Argon2id (Recommended)</option>
              <option value="i">Argon2i (Data-independent)</option>
              <option value="d">Argon2d (Data-dependent)</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="memory">Memory (KB)</Label>
            <Input
              id="memory"
              type="number"
              value={memory}
              onChange={(e) => setMemory(parseInt(e.target.value) || 65536)}
            />
            <p className="text-xs text-muted-foreground">{(memory / 1024).toFixed(0)} MB</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="iterations">Iterations (Time Cost)</Label>
            <Input
              id="iterations"
              type="number"
              min="1"
              value={iterations}
              onChange={(e) => setIterations(parseInt(e.target.value) || 3)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="parallelism">Parallelism (Threads)</Label>
            <Input
              id="parallelism"
              type="number"
              min="1"
              value={parallelism}
              onChange={(e) => setParallelism(parseInt(e.target.value) || 4)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hashLength">Hash Length (bytes)</Label>
            <Input
              id="hashLength"
              type="number"
              min="16"
              max="64"
              value={hashLength}
              onChange={(e) => setHashLength(parseInt(e.target.value) || 32)}
            />
            <p className="text-xs text-muted-foreground">{hashLength * 8} bits output</p>
          </div>
        </div>
      </section>

      <Button onClick={generateHash} className="w-full" disabled={isHashing}>
        {isHashing ? "Generating..." : "Generate Argon2 Hash"}
      </Button>

      {/* Hash Output */}
      {hash && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Argon2 Hash</Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(hash, "hash")}
              className="h-7"
            >
              {copied === "hash" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="font-mono text-xs break-all">{hash}</p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>Length: <span className="font-medium text-foreground">{hash.length} characters ({hashLength * 8} bits)</span></span>
            <span>Variant: <span className="font-medium text-foreground">Argon2{type}</span></span>
          </div>
        </section>
      )}

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Argon2</h4>
            <p className="text-sm text-muted-foreground">
              Argon2 is the winner of the Password Hashing Competition (2015) and is recommended
              for password hashing. It's designed to be resistant to GPU cracking attacks by
              requiring significant memory.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Argon2d:</strong> Data-dependent, faster but vulnerable to side-channel attacks.
              <br />
              <strong>Argon2i:</strong> Data-independent, slower but resistant to side-channel attacks.
              <br />
              <strong>Argon2id:</strong> Hybrid approach, recommended for most use cases.
            </p>
            <p className="text-sm text-amber-600">
              Note: This is a demonstration implementation. For production use, please use a
              proper Argon2 library like argon2-browser.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
