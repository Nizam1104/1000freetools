"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, RefreshCw, Info, Lock, Key, ArrowRight, User, Shield, AlertTriangle, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

// Predefined small primes for demonstration
const SMALL_PRIMES = [
  { p: 17, g: 3, name: "Tiny (17)" },
  { p: 23, g: 5, name: "Small (23)" },
  { p: 97, g: 5, name: "Medium (97)" },
  { p: 257, g: 3, name: "Large (257)" },
  { p: 65537, g: 3, name: "Very Large (65537)" },
]

// BigInt helper functions
const modPow = (base: bigint, exp: bigint, mod: bigint): bigint => {
  let result = 1n
  base = base % mod
  while (exp > 0n) {
    if (exp % 2n === 1n) {
      result = (result * base) % mod
    }
    exp = exp / 2n
    base = (base * base) % mod
  }
  return result
}

const isPrime = (n: number): boolean => {
  if (n < 2) return false
  if (n === 2) return true
  if (n % 2 === 0) return false
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false
  }
  return true
}

const findPrimitiveRoot = (p: number): number => {
  if (p === 2) return 1
  const phi = p - 1
  const factors: number[] = []

  let n = phi
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) {
      factors.push(i)
      while (n % i === 0) n = Math.floor(n / i)
    }
  }
  if (n > 1) factors.push(n)

  for (let g = 2; g < p; g++) {
    let isRoot = true
    for (const factor of factors) {
      if (modPow(BigInt(g), BigInt(phi / factor), BigInt(p)) === 1n) {
        isRoot = false
        break
      }
    }
    if (isRoot) return g
  }
  return 2
}

export default function DiffieHellmanSimulator() {
  const [primeMode, setPrimeMode] = useState<"preset" | "custom">("preset")
  const [selectedPreset, setSelectedPreset] = useState<string>("0")
  const [customP, setCustomP] = useState<string>("17")
  const [customG, setCustomG] = useState<string>("3")
  const [alicePrivate, setAlicePrivate] = useState<string>("")
  const [bobPrivate, setBobPrivate] = useState<string>("")
  const [step, setStep] = useState<number>(0)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const p = useMemo(() => {
    if (primeMode === "preset") {
      return SMALL_PRIMES[parseInt(selectedPreset)]?.p || 17
    }
    return parseInt(customP) || 17
  }, [primeMode, selectedPreset, customP])

  const g = useMemo(() => {
    if (primeMode === "preset") {
      return SMALL_PRIMES[parseInt(selectedPreset)]?.g || 3
    }
    return parseInt(customG) || 3
  }, [primeMode, selectedPreset, customG])

  // Validate custom prime
  const primeValidation = useMemo(() => {
    if (primeMode !== "custom") return { valid: true, message: "" }
    const num = parseInt(customP)
    if (isNaN(num) || num < 2) return { valid: false, message: "Must be >= 2" }
    if (!isPrime(num)) return { valid: false, message: "Must be prime" }
    if (num > 10000) return { valid: false, message: "Too large for demo" }
    return { valid: true, message: "Valid prime" }
  }, [primeMode, customP])

  // Calculate public values
  const alicePublic = useMemo(() => {
    if (!alicePrivate) return null
    const a = BigInt(alicePrivate)
    return modPow(BigInt(g), a, BigInt(p))
  }, [alicePrivate, g, p])

  const bobPublic = useMemo(() => {
    if (!bobPrivate) return null
    const b = BigInt(bobPrivate)
    return modPow(BigInt(g), b, BigInt(p))
  }, [bobPrivate, g, p])

  // Calculate shared secrets
  const aliceSharedSecret = useMemo(() => {
    if (!bobPublic || !alicePrivate) return null
    const a = BigInt(alicePrivate)
    return modPow(bobPublic, a, BigInt(p))
  }, [bobPublic, alicePrivate, p])

  const bobSharedSecret = useMemo(() => {
    if (!alicePublic || !bobPrivate) return null
    const b = BigInt(bobPrivate)
    return modPow(alicePublic, b, BigInt(p))
  }, [alicePublic, bobPrivate, p])

  const secretsMatch = aliceSharedSecret !== null && bobSharedSecret !== null && aliceSharedSecret === bobSharedSecret

  const handlePresetChange = useCallback((value: string) => {
    setSelectedPreset(value)
    setAlicePrivate("")
    setBobPrivate("")
    setStep(0)
    setError(null)
  }, [])

  const handleCustomPChange = useCallback((value: string) => {
    setCustomP(value)
    const num = parseInt(value)
    if (isPrime(num) && num > 2) {
      const newG = findPrimitiveRoot(num)
      setCustomG(newG.toString())
    }
    setAlicePrivate("")
    setBobPrivate("")
    setStep(0)
    setError(null)
  }, [])

  const generateRandomPrivate = useCallback((max: number): string => {
    const array = new Uint32Array(1)
    crypto.getRandomValues(array)
    return (array[0] % (max - 2) + 2).toString()
  }, [])

  const autoFillKeys = useCallback(() => {
    const maxPrivate = p - 2
    setAlicePrivate(generateRandomPrivate(maxPrivate))
    setBobPrivate(generateRandomPrivate(maxPrivate))
    setStep(0)
    setError(null)
  }, [p, generateRandomPrivate])

  const resetSimulation = useCallback(() => {
    setAlicePrivate("")
    setBobPrivate("")
    setStep(0)
    setError(null)
  }, [])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const nextStep = useCallback(() => {
    if (step < 5) setStep(step + 1)
  }, [step])

  const prevStep = useCallback(() => {
    if (step > 0) setStep(step - 1)
  }, [step])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Prime Selection */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Prime Number (p) and Generator (g)</Label>
          <Select value={primeMode} onValueChange={(v: "preset" | "custom") => { setPrimeMode(v); setStep(0); }}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="preset">Preset</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {primeMode === "preset" ? (
          <div className="grid grid-cols-5 gap-2">
            {SMALL_PRIMES.map((prime, idx) => (
              <Button
                key={prime.name}
                variant={selectedPreset === idx.toString() ? "default" : "outline"}
                onClick={() => handlePresetChange(idx.toString())}
                className="flex flex-col h-auto py-3"
              >
                <span className="font-mono">p={prime.p}</span>
                <span className="text-xs text-muted-foreground">g={prime.g}</span>
              </Button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="custom-p">Prime (p)</Label>
              <div className="relative">
                <Input
                  id="custom-p"
                  type="number"
                  value={customP}
                  onChange={(e) => handleCustomPChange(e.target.value)}
                  className={cn("font-mono", !primeValidation.valid && "border-destructive")}
                />
                <div className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2 text-xs",
                  primeValidation.valid ? "text-green-600" : "text-destructive"
                )}>
                  {primeValidation.message}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="custom-g">Generator (g)</Label>
              <Input
                id="custom-g"
                type="number"
                value={customG}
                onChange={(e) => setCustomG(e.target.value)}
                className="font-mono"
              />
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          These public values are shared openly. Security relies on the difficulty of the discrete logarithm problem.
        </p>
      </section>

      {/* Display Public Values */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="size-5 text-muted-foreground" />
            <span className="font-medium">Public Parameters</span>
          </div>
          <div className="flex gap-4 font-mono text-sm">
            <span><span className="text-muted-foreground">p =</span> {p}</span>
            <span><span className="text-muted-foreground">g =</span> {g}</span>
          </div>
        </div>
      </section>

      {/* Private Key Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Private Keys (Keep Secret!)</Label>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={autoFillKeys}>
              <RefreshCw className="size-4 mr-2" />
              Auto-Generate
            </Button>
            <Button variant="ghost" size="sm" onClick={resetSimulation}>
              <Trash2 className="size-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Alice */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <User className="size-4 text-blue-500" />
              Alice's Private Key (a)
            </Label>
            <Input
              type="number"
              value={alicePrivate}
              onChange={(e) => { setAlicePrivate(e.target.value); setStep(0); }}
              className="font-mono"
              placeholder="Enter a number (2 to p-1)"
              min={2}
              max={p - 1}
            />
            {alicePrivate && (
              <p className="text-xs text-muted-foreground">
                Range: 2 to {p - 1}
              </p>
            )}
          </div>

          {/* Bob */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <User className="size-4 text-green-500" />
              Bob's Private Key (b)
            </Label>
            <Input
              type="number"
              value={bobPrivate}
              onChange={(e) => { setBobPrivate(e.target.value); setStep(0); }}
              className="font-mono"
              placeholder="Enter a number (2 to p-1)"
              min={2}
              max={p - 1}
            />
            {bobPrivate && (
              <p className="text-xs text-muted-foreground">
                Range: 2 to {p - 1}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      {alicePrivate && bobPrivate && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Key Exchange Steps</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={prevStep} disabled={step === 0}>
                Previous
              </Button>
              <Button variant="outline" size="sm" onClick={nextStep} disabled={step === 5}>
                Next
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            {[0, 1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={cn(
                  "flex-1 h-2 rounded-full transition-colors",
                  s <= step ? "bg-blue-500" : "bg-muted"
                )}
              />
            ))}
          </div>
        </section>
      )}

      {/* Step-by-Step Visualization */}
      {alicePrivate && bobPrivate && (
        <div className="space-y-4">
          {/* Step 0: Initial State */}
          {step >= 0 && (
            <section className={cn(
              "rounded-lg border p-4 transition-all",
              step === 0 ? "border-blue-500 bg-blue-500/5" : "opacity-50"
            )}>
              <div className="flex items-center gap-2 mb-3">
                <div className="size-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium">0</div>
                <h4 className="font-medium">Initial Setup</h4>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-center p-3 bg-muted/50 rounded">
                  <p className="text-muted-foreground">Public</p>
                  <p className="font-mono">p = {p}, g = {g}</p>
                </div>
                <div className="text-center p-3 bg-blue-500/10 rounded border border-blue-500/30">
                  <p className="text-blue-600 dark:text-blue-400">Alice's Secret</p>
                  <p className="font-mono">a = {alicePrivate}</p>
                </div>
                <div className="text-center p-3 bg-green-500/10 rounded border border-green-500/30">
                  <p className="text-green-600 dark:text-green-400">Bob's Secret</p>
                  <p className="font-mono">b = {bobPrivate}</p>
                </div>
              </div>
            </section>
          )}

          {/* Step 1: Alice computes public key */}
          {step >= 1 && alicePublic && (
            <section className={cn(
              "rounded-lg border p-4 transition-all",
              step === 1 ? "border-blue-500 bg-blue-500/5" : "opacity-50"
            )}>
              <div className="flex items-center gap-2 mb-3">
                <div className="size-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium">1</div>
                <h4 className="font-medium">Alice Computes Public Key</h4>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="font-mono text-sm bg-muted/50 px-3 py-2 rounded">
                  A = g^a mod p = {g}^{alicePrivate} mod {p}
                </div>
                <ArrowRight className="size-4 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <User className="size-4 text-blue-500" />
                  <span className="font-mono font-medium text-blue-600 dark:text-blue-400">A = {alicePublic.toString()}</span>
                  <Button variant="ghost" size="xs" onClick={() => copyToClipboard(alicePublic.toString(), "alicePublic")}>
                    {copied === "alicePublic" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  </Button>
                </div>
              </div>
            </section>
          )}

          {/* Step 2: Bob computes public key */}
          {step >= 2 && bobPublic && (
            <section className={cn(
              "rounded-lg border p-4 transition-all",
              step === 2 ? "border-green-500 bg-green-500/5" : "opacity-50"
            )}>
              <div className="flex items-center gap-2 mb-3">
                <div className="size-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-medium">2</div>
                <h4 className="font-medium">Bob Computes Public Key</h4>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="font-mono text-sm bg-muted/50 px-3 py-2 rounded">
                  B = g^b mod p = {g}^{bobPrivate} mod {p}
                </div>
                <ArrowRight className="size-4 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <User className="size-4 text-green-500" />
                  <span className="font-mono font-medium text-green-600 dark:text-green-400">B = {bobPublic.toString()}</span>
                  <Button variant="ghost" size="xs" onClick={() => copyToClipboard(bobPublic.toString(), "bobPublic")}>
                    {copied === "bobPublic" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  </Button>
                </div>
              </div>
            </section>
          )}

          {/* Step 3: Exchange public keys */}
          {step >= 3 && (
            <section className={cn(
              "rounded-lg border p-4 transition-all",
              step === 3 ? "border-purple-500 bg-purple-500/5" : "opacity-50"
            )}>
              <div className="flex items-center gap-2 mb-3">
                <div className="size-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-medium">3</div>
                <h4 className="font-medium">Exchange Public Keys</h4>
              </div>
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <User className="size-8 mx-auto text-blue-500 mb-2" />
                  <p className="font-medium">Alice</p>
                  <p className="text-sm text-muted-foreground">Has: A = {alicePublic?.toString()}</p>
                  <ArrowRight className="size-4 mx-auto my-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Receives: B = {bobPublic?.toString()}</p>
                </div>
                <div className="text-center">
                  <User className="size-8 mx-auto text-green-500 mb-2" />
                  <p className="font-medium">Bob</p>
                  <p className="text-sm text-muted-foreground">Has: B = {bobPublic?.toString()}</p>
                  <ArrowRight className="size-4 mx-auto my-2 text-muted-foreground rotate-180" />
                  <p className="text-sm text-muted-foreground">Receives: A = {alicePublic?.toString()}</p>
                </div>
              </div>
            </section>
          )}

          {/* Step 4: Alice computes shared secret */}
          {step >= 4 && aliceSharedSecret && (
            <section className={cn(
              "rounded-lg border p-4 transition-all",
              step === 4 ? "border-blue-500 bg-blue-500/5" : "opacity-50"
            )}>
              <div className="flex items-center gap-2 mb-3">
                <div className="size-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium">4</div>
                <h4 className="font-medium">Alice Computes Shared Secret</h4>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="font-mono text-sm bg-muted/50 px-3 py-2 rounded">
                  s = B^a mod p = {bobPublic?.toString()}^{alicePrivate} mod {p}
                </div>
                <ArrowRight className="size-4 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <Key className="size-4 text-blue-500" />
                  <span className="font-mono font-medium text-blue-600 dark:text-blue-400">s = {aliceSharedSecret.toString()}</span>
                </div>
              </div>
            </section>
          )}

          {/* Step 5: Bob computes shared secret */}
          {step >= 5 && bobSharedSecret && (
            <section className={cn(
              "rounded-lg border p-4 transition-all",
              step === 5 ? "border-green-500 bg-green-500/5" : "opacity-50"
            )}>
              <div className="flex items-center gap-2 mb-3">
                <div className="size-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-medium">5</div>
                <h4 className="font-medium">Bob Computes Shared Secret</h4>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="font-mono text-sm bg-muted/50 px-3 py-2 rounded">
                  s = A^b mod p = {alicePublic?.toString()}^{bobPrivate} mod {p}
                </div>
                <ArrowRight className="size-4 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <Key className="size-4 text-green-500" />
                  <span className="font-mono font-medium text-green-600 dark:text-green-400">s = {bobSharedSecret.toString()}</span>
                </div>
              </div>

              {secretsMatch && (
                <div className="mt-4 p-4 bg-green-500/10 border border-green-500 rounded-lg">
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <Shield className="size-5" />
                    <span className="font-medium">Shared secrets match!</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Both Alice and Bob now have the same secret key: <span className="font-mono font-medium">{aliceSharedSecret.toString()}</span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    This secret was created without ever transmitting it over the network!
                  </p>
                </div>
              )}
            </section>
          )}
        </div>
      )}

      {/* Security Warning */}
      <section className="rounded-lg border border-amber-500/50 bg-amber-500/10 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="size-5 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-amber-600 dark:text-amber-400">Security Note</h4>
            <p className="text-sm text-muted-foreground">
              This demonstration uses small prime numbers for educational purposes. Real Diffie-Hellman
              implementations use much larger primes (2048+ bits) to prevent brute-force attacks.
              Also, basic DH is vulnerable to man-in-the-middle attacks - always authenticate the
              other party in real applications!
            </p>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">How Diffie-Hellman Works</h4>
            <p className="text-sm text-muted-foreground">
              The Diffie-Hellman key exchange allows two parties to create a shared secret over an
              insecure channel. It was published by Whitfield Diffie and Martin Hellman in 1976 and
              is one of the foundations of modern cryptography.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>The Math:</strong> Both parties agree on a prime p and generator g. Each picks a
              private number (a, b), computes their public value (g^a mod p, g^b mod p), and exchanges them.
              The magic: (g^b)^a mod p = (g^a)^b mod p = g^(ab) mod p. Both arrive at the same secret!
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Why it's secure:</strong> An eavesdropper sees p, g, A, and B, but cannot easily
              compute the shared secret without knowing a or b. This is the discrete logarithm problem,
              which is computationally infeasible for large primes.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
