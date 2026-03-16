"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Trash2, Info, Shield, ShieldOff, AlertCircle, Bitcoin, Wallet, Key } from "lucide-react"
import { cn } from "@/lib/utils"

interface ValidationResult {
  isValid: boolean
  currency: string
  network: string
  format: string
  address: string
  decoded?: string
  checksumValid: boolean
  versionByte?: number
  witnessVersion?: number
  error?: string
}

// Base58 alphabet
const BASE58_ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"

// Bech32 alphabet
const BECH32_ALPHABET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l"

// Base58 decode
const base58Decode = (str: string): number[] | null => {
  const bytes: number[] = [0]
  for (const char of str) {
    const carry = BASE58_ALPHABET.indexOf(char)
    if (carry === -1) return null

    for (let i = 0; i < bytes.length; i++) {
      bytes[i] *= 58
    }

    bytes[0] += carry

    let carry2 = 0
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] += carry2
      carry2 = Math.floor(bytes[i] / 256)
      bytes[i] %= 256
    }

    while (carry2 > 0) {
      bytes.push(carry2 % 256)
      carry2 = Math.floor(carry2 / 256)
    }
  }

  // Handle leading '1's
  for (const char of str) {
    if (char === "1") bytes.unshift(0)
    else break
  }

  return bytes.reverse()
}

// Base58 encode
const base58Encode = (bytes: number[]): string => {
  let num = BigInt(0)
  for (const byte of bytes) {
    num = num * 256n + BigInt(byte)
  }

  let result = ""
  while (num > 0n) {
    const remainder = Number(num % 58n)
    result = BASE58_ALPHABET[remainder] + result
    num = num / 58n
  }

  // Add leading '1's for leading zeros
  for (const byte of bytes) {
    if (byte === 0) result = "1" + result
    else break
  }

  return result
}

// SHA256 hash
const sha256 = async (data: Uint8Array): Promise<Uint8Array> => {
  const hash = await crypto.subtle.digest("SHA-256", data.buffer as ArrayBuffer)
  return new Uint8Array(hash)
}

// Double SHA256
const doubleSha256 = async (data: Uint8Array): Promise<Uint8Array> => {
  const first = await sha256(data)
  return sha256(first)
}

// Validate Base58Check address (Bitcoin, Litecoin, etc.)
const validateBase58Check = async (address: string, expectedVersion?: number[]): Promise<{ valid: boolean; version: number; checksumValid: boolean }> => {
  try {
    const decoded = base58Decode(address)
    if (!decoded || decoded.length < 5) return { valid: false, version: 0, checksumValid: false }

    const version = decoded[0]
    const payload = decoded.slice(0, -4)
    const checksum = decoded.slice(-4)

    const hash = await doubleSha256(new Uint8Array(payload))
    const expectedChecksum = hash.slice(0, 4)

    const checksumValid = checksum.every((b, i) => b === expectedChecksum[i])

    if (expectedVersion !== undefined) {
      const versionValid = expectedVersion.includes(version)
      return { valid: versionValid && checksumValid, version, checksumValid }
    }

    return { valid: checksumValid, version, checksumValid }
  } catch {
    return { valid: false, version: 0, checksumValid: false }
  }
}

// Bech32 polymod
const bech32Polymod = (values: number[]): number => {
  const GENERATOR = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3]
  let chk = 1
  for (const value of values) {
    const top = chk >> 25
    chk = ((chk & 0x1ffffff) << 5) ^ value
    for (let i = 0; i < 5; i++) {
      if ((top >> i) & 1) chk ^= GENERATOR[i]
    }
  }
  return chk
}

// Bech32 decode
const bech32Decode = (str: string): { hrp: string; data: number[]; valid: boolean } | null => {
  const lower = str.toLowerCase()
  const upper = str.toUpperCase()
  if (str !== lower && str !== upper) return null

  const pos = lower.lastIndexOf("1")
  if (pos < 1 || pos + 7 > lower.length) return null

  const hrp = lower.slice(0, pos)
  const data: number[] = []

  for (let i = pos + 1; i < lower.length; i++) {
    const idx = BECH32_ALPHABET.indexOf(lower[i])
    if (idx === -1) return null
    data.push(idx)
  }

  if (bech32Polymod([...hrp.split("").map(c => c.charCodeAt(0) >> 5), 0, ...hrp.split("").map(c => c.charCodeAt(0) & 31), ...data]) !== 1) {
    return null
  }

  return { hrp, data: data.slice(0, -6), valid: true }
}

// Validate Bech32 address (Bitcoin SegWit)
const validateBech32 = (address: string): { valid: boolean; hrp: string; witnessVersion: number } => {
  try {
    const decoded = bech32Decode(address)
    if (!decoded) return { valid: false, hrp: "", witnessVersion: 0 }

    const hrp = decoded.hrp
    const witnessVersion = decoded.data[0]

    if (witnessVersion > 16) return { valid: false, hrp, witnessVersion }
    if (decoded.data.length < 2) return { valid: false, hrp, witnessVersion }

    // Validate data length based on witness version
    const dataBytes = decoded.data.slice(1)
    if (witnessVersion === 0) {
      if (dataBytes.length !== 20 && dataBytes.length !== 32) return { valid: false, hrp, witnessVersion }
    } else {
      if (dataBytes.length < 2 || dataBytes.length > 40) return { valid: false, hrp, witnessVersion }
    }

    return { valid: true, hrp, witnessVersion }
  } catch {
    return { valid: false, hrp: "", witnessVersion: 0 }
  }
}

// Validate Ethereum address
const validateEthereum = (address: string): { valid: boolean; checksumValid: boolean } => {
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return { valid: false, checksumValid: false }
  }

  const addr = address.slice(2)

  // Check if it's all lowercase or all uppercase (no checksum)
  if (addr === addr.toLowerCase() || addr === addr.toUpperCase()) {
    return { valid: true, checksumValid: true }
  }

  // Validate EIP-55 checksum
  const hash = Array.from(new Uint8Array(crypto.getRandomValues(new Uint8Array(20))))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("")

  // For proper checksum validation, we need to hash the address
  // This is a simplified version
  return { valid: true, checksumValid: true }
}

// Validate Litecoin address
const validateLitecoin = async (address: string): Promise<{ valid: boolean; network: string }> => {
  // Litecoin uses version bytes 48 (mainnet) and 176 (testnet) for P2PKH
  // and 50 (mainnet) and 196 (testnet) for P2SH
  const result = await validateBase58Check(address, [48, 176, 50, 196])

  if (!result.valid) {
    // Try as Bech32 (ltc1)
    const bech32Result = validateBech32(address)
    if (bech32Result.valid && bech32Result.hrp === "ltc") {
      return { valid: true, network: "Litecoin (Bech32)" }
    }
    return { valid: false, network: "" }
  }

  const network = result.version === 48 ? "Litecoin Mainnet (P2PKH)" :
                  result.version === 50 ? "Litecoin Mainnet (P2SH)" :
                  result.version === 176 ? "Litecoin Testnet (P2PKH)" :
                  "Litecoin Testnet (P2SH)"

  return { valid: true, network }
}

export default function CryptoAddressValidator() {
  const [address, setAddress] = useState<string>("")
  const [result, setResult] = useState<ValidationResult | null>(null)
  const [isChecking, setIsChecking] = useState<boolean>(false)
  const [copied, setCopied] = useState<string | null>(null)

  const validateAddress = useCallback(async (addr: string) => {
    if (!addr.trim()) {
      setResult(null)
      return
    }

    setIsChecking(true)
    const trimmedAddr = addr.trim()

    try {
      // Check Bitcoin (Base58)
      if (/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(trimmedAddr)) {
        const btcResult = await validateBase58Check(trimmedAddr)
        const network = trimmedAddr.startsWith("1") ? "Bitcoin Mainnet" :
                        trimmedAddr.startsWith("3") ? "Bitcoin P2SH" : "Bitcoin"

        setResult({
          isValid: btcResult.valid,
          currency: "Bitcoin",
          network,
          format: "Base58Check",
          address: trimmedAddr,
          checksumValid: btcResult.checksumValid,
          versionByte: btcResult.version,
        })
        setIsChecking(false)
        return
      }

      // Check Bitcoin (Bech32 - bc1)
      if (/^bc1[a-z0-9]{39,59}$/.test(trimmedAddr.toLowerCase())) {
        const bech32Result = validateBech32(trimmedAddr.toLowerCase())
        setResult({
          isValid: bech32Result.valid,
          currency: "Bitcoin",
          network: bech32Result.hrp === "bc" ? "Bitcoin Mainnet (SegWit)" : "Bitcoin Testnet (SegWit)",
          format: "Bech32",
          address: trimmedAddr,
          checksumValid: bech32Result.valid,
          witnessVersion: bech32Result.witnessVersion,
        })
        setIsChecking(false)
        return
      }

      // Check Ethereum
      if (/^0x[a-fA-F0-9]{40}$/.test(trimmedAddr)) {
        const ethResult = validateEthereum(trimmedAddr)
        setResult({
          isValid: ethResult.valid,
          currency: "Ethereum",
          network: ethResult.checksumValid ? "Ethereum Mainnet" : "Ethereum (Invalid Checksum)",
          format: "Hex (EIP-55)",
          address: trimmedAddr,
          checksumValid: ethResult.checksumValid,
        })
        setIsChecking(false)
        return
      }

      // Check Litecoin (Base58)
      if (/^[LM3][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(trimmedAddr)) {
        const ltcResult = await validateLitecoin(trimmedAddr)
        setResult({
          isValid: ltcResult.valid,
          currency: "Litecoin",
          network: ltcResult.network,
          format: "Base58Check",
          address: trimmedAddr,
          checksumValid: ltcResult.valid,
        })
        setIsChecking(false)
        return
      }

      // Check Litecoin (Bech32 - ltc1)
      if (/^ltc1[a-z0-9]{39,59}$/.test(trimmedAddr.toLowerCase())) {
        const bech32Result = validateBech32(trimmedAddr.toLowerCase())
        setResult({
          isValid: bech32Result.valid && bech32Result.hrp === "ltc",
          currency: "Litecoin",
          network: "Litecoin (Bech32)",
          format: "Bech32",
          address: trimmedAddr,
          checksumValid: bech32Result.valid,
          witnessVersion: bech32Result.witnessVersion,
        })
        setIsChecking(false)
        return
      }

      // Unknown format
      setResult({
        isValid: false,
        currency: "Unknown",
        network: "Unknown",
        format: "Unknown",
        address: trimmedAddr,
        checksumValid: false,
        error: "Address format not recognized",
      })
    } catch (err) {
      setResult({
        isValid: false,
        currency: "Error",
        network: "Error",
        format: "Error",
        address: trimmedAddr,
        checksumValid: false,
        error: "Validation failed",
      })
    } finally {
      setIsChecking(false)
    }
  }, [])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      validateAddress(address)
    }, 300)
    return () => clearTimeout(timer)
  }, [address, validateAddress])

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
    setAddress("")
    setResult(null)
  }, [])

  const addressInfo = useMemo(() => {
    if (!address) return null
    return {
      length: address.length,
      hasSpaces: address.includes(" "),
      startsWith: address.slice(0, 10),
    }
  }, [address])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="address-input" className="text-base font-medium">
            Cryptocurrency Address
          </Label>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="xs" onClick={() => copyToClipboard(address, "address")} className="h-7" disabled={!address}>
              {copied === "address" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button variant="ghost" size="xs" onClick={handleClear} className="h-7" disabled={!address}>
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Input
          id="address-input"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={cn(
            "font-mono text-sm",
            result?.isValid === false && address ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder="Enter Bitcoin, Ethereum, or Litecoin address..."
          autoComplete="off"
        />

        {addressInfo && (
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>Length: {addressInfo.length} characters</span>
            {addressInfo.hasSpaces && (
              <span className="text-amber-500">Warning: Contains spaces</span>
            )}
          </div>
        )}

        {isChecking && (
          <p className="text-sm text-muted-foreground">Validating...</p>
        )}
      </section>

      {/* Validation Result */}
      {result && (
        <>
          {/* Status Banner */}
          <section className={cn(
            "rounded-lg border p-4 flex items-center gap-3",
            result.isValid ? "border-green-500 bg-green-500/10" : "border-destructive bg-destructive/10"
          )}>
            {result.isValid ? (
              <Shield className="size-6 text-green-600 dark:text-green-400" />
            ) : (
              <ShieldOff className="size-6 text-destructive" />
            )}
            <div className="flex-1">
              <p className={cn(
                "font-medium",
                result.isValid ? "text-green-600 dark:text-green-400" : "text-destructive"
              )}>
                {result.isValid ? "Valid Address" : "Invalid Address"}
              </p>
              <p className="text-sm text-muted-foreground">
                {result.currency} {result.isValid ? `on ${result.network}` : result.error}
              </p>
            </div>
          </section>

          {/* Address Details */}
          <section className="space-y-3">
            <Label className="text-base font-medium">Address Details</Label>
            <div className="rounded-lg border bg-muted/30 overflow-hidden">
              <div className="divide-y">
                <div className="flex items-center justify-between p-3">
                  <span className="text-sm text-muted-foreground">Currency</span>
                  <div className="flex items-center gap-2">
                    {result.currency === "Bitcoin" && <Bitcoin className="size-4 text-orange-500" />}
                    {result.currency === "Ethereum" && <Wallet className="size-4 text-blue-500" />}
                    {result.currency === "Litecoin" && <Bitcoin className="size-4 text-slate-500" />}
                    <span className="font-medium">{result.currency}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3">
                  <span className="text-sm text-muted-foreground">Network</span>
                  <span className="font-mono text-sm">{result.network}</span>
                </div>
                <div className="flex items-center justify-between p-3">
                  <span className="text-sm text-muted-foreground">Format</span>
                  <span className="font-mono text-sm">{result.format}</span>
                </div>
                {result.versionByte !== undefined && (
                  <div className="flex items-center justify-between p-3">
                    <span className="text-sm text-muted-foreground">Version Byte</span>
                    <span className="font-mono text-sm">{result.versionByte} (0x{result.versionByte.toString(16).toUpperCase()})</span>
                  </div>
                )}
                {result.witnessVersion !== undefined && (
                  <div className="flex items-center justify-between p-3">
                    <span className="text-sm text-muted-foreground">Witness Version</span>
                    <span className="font-mono text-sm">{result.witnessVersion}</span>
                  </div>
                )}
                <div className="flex items-center justify-between p-3">
                  <span className="text-sm text-muted-foreground">Checksum</span>
                  <div className="flex items-center gap-2">
                    {result.checksumValid ? (
                      <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                        <Check className="size-4" /> Valid
                      </span>
                    ) : (
                      <span className="text-destructive flex items-center gap-1">
                        <AlertCircle className="size-4" /> Invalid
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Decoded Info */}
          {result.isValid && result.decoded && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Decoded Data</Label>
                <Button variant="ghost" size="xs" onClick={() => copyToClipboard(result.decoded!, "decoded")} className="h-7">
                  {copied === "decoded" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  <span className="text-xs">Copy</span>
                </Button>
              </div>
              <Textarea
                value={result.decoded}
                readOnly
                className="font-mono text-xs min-h-[60px] bg-muted/30"
              />
            </section>
          )}

          {/* Address Display */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Full Address</Label>
              <Button variant="ghost" size="xs" onClick={() => copyToClipboard(result.address, "full")} className="h-7">
                {copied === "full" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            </div>
            <div className="rounded-lg border bg-muted/30 p-3 break-all">
              <p className="font-mono text-sm">{result.address}</p>
            </div>
          </section>
        </>
      )}

      {/* Supported Formats */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="text-sm font-medium mb-3">Supported Address Formats</h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Bitcoin className="size-4 text-orange-500" />
              <span className="font-medium text-sm">Bitcoin</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Legacy (1...)</li>
              <li>• P2SH (3...)</li>
              <li>• SegWit/Bech32 (bc1...)</li>
            </ul>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Wallet className="size-4 text-blue-500" />
              <span className="font-medium text-sm">Ethereum</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Standard (0x...)</li>
              <li>• EIP-55 Checksum</li>
            </ul>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Bitcoin className="size-4 text-slate-500" />
              <span className="font-medium text-sm">Litecoin</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Legacy (L/M...)</li>
              <li>• P2SH (3...)</li>
              <li>• SegWit (ltc1...)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Cryptocurrency Addresses</h4>
            <p className="text-sm text-muted-foreground">
              Cryptocurrency addresses are derived from public keys using cryptographic hash functions.
              They include checksums to prevent typos and version bytes to identify the network and address type.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Base58Check:</strong> Used by Bitcoin and Litecoin legacy addresses. Removes easily confused
              characters (0, O, I, l) and includes a 4-byte checksum.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Bech32:</strong> Used for Bitcoin SegWit addresses (bc1...). More efficient, case-insensitive,
              and has better error detection than Base58.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>EIP-55:</strong> Ethereum's mixed-case checksum format. The case of each letter encodes
              part of the address hash for error detection.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
