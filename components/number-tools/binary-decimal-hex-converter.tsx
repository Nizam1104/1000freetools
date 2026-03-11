"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

export default function BinaryDecimalHexConverter() {
  const [decimalValue, setDecimalValue] = useState<string>("")
  const [binaryValue, setBinaryValue] = useState<string>("")
  const [hexValue, setHexValue] = useState<string>("")
  const [octalValue, setOctalValue] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const handleDecimalChange = useCallback((value: string) => {
    setDecimalValue(value)
    if (value === "" || value === "-") {
      setBinaryValue("")
      setHexValue("")
      setOctalValue("")
      return
    }
    const num = parseInt(value, 10)
    if (!isNaN(num)) {
      setBinaryValue(num.toString(2))
      setHexValue(num.toString(16).toUpperCase())
      setOctalValue(num.toString(8))
    } else {
      setBinaryValue("")
      setHexValue("")
      setOctalValue("")
    }
  }, [])

  const handleBinaryChange = useCallback((value: string) => {
    const validBinary = value.replace(/[^01-]/g, "")
    setBinaryValue(validBinary)
    if (validBinary === "" || validBinary === "-") {
      setDecimalValue("")
      setHexValue("")
      setOctalValue("")
      return
    }
    const num = parseInt(validBinary, 2)
    if (!isNaN(num)) {
      setDecimalValue(num.toString(10))
      setHexValue(num.toString(16).toUpperCase())
      setOctalValue(num.toString(8))
    } else {
      setDecimalValue("")
      setHexValue("")
      setOctalValue("")
    }
  }, [])

  const handleHexChange = useCallback((value: string) => {
    const validHex = value.replace(/[^0-9A-Fa-f-]/g, "").toUpperCase()
    setHexValue(validHex)
    if (validHex === "" || validHex === "-") {
      setDecimalValue("")
      setBinaryValue("")
      setOctalValue("")
      return
    }
    const num = parseInt(validHex, 16)
    if (!isNaN(num)) {
      setDecimalValue(num.toString(10))
      setBinaryValue(num.toString(2))
      setOctalValue(num.toString(8))
    } else {
      setDecimalValue("")
      setBinaryValue("")
      setOctalValue("")
    }
  }, [])

  const handleOctalChange = useCallback((value: string) => {
    const validOctal = value.replace(/[^0-7-]/g, "")
    setOctalValue(validOctal)
    if (validOctal === "" || validOctal === "-") {
      setDecimalValue("")
      setBinaryValue("")
      setHexValue("")
      return
    }
    const num = parseInt(validOctal, 8)
    if (!isNaN(num)) {
      setDecimalValue(num.toString(10))
      setBinaryValue(num.toString(2))
      setHexValue(num.toString(16).toUpperCase())
    } else {
      setDecimalValue("")
      setBinaryValue("")
      setHexValue("")
    }
  }, [])

  const clearAll = useCallback(() => {
    setDecimalValue("")
    setBinaryValue("")
    setHexValue("")
    setOctalValue("")
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Binary, Decimal, Hex Converter</h2>
        <p className="text-muted-foreground">
          Convert numbers between binary, decimal, hexadecimal, and octal number systems in real-time.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="decimal-input">Decimal (Base 10)</Label>
          <div className="flex gap-2">
            <Input
              id="decimal-input"
              value={decimalValue}
              onChange={(e) => handleDecimalChange(e.target.value)}
              className="font-mono"
              placeholder="Enter decimal number..."
              type="text"
              inputMode="numeric"
            />
            {decimalValue && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(decimalValue, "decimal")}
              >
                {copied === "decimal" ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="binary-input">Binary (Base 2)</Label>
          <div className="flex gap-2">
            <Input
              id="binary-input"
              value={binaryValue}
              onChange={(e) => handleBinaryChange(e.target.value)}
              className="font-mono"
              placeholder="Enter binary number..."
              type="text"
              inputMode="text"
            />
            {binaryValue && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(binaryValue, "binary")}
              >
                {copied === "binary" ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hex-input">Hexadecimal (Base 16)</Label>
          <div className="flex gap-2">
            <Input
              id="hex-input"
              value={hexValue}
              onChange={(e) => handleHexChange(e.target.value)}
              className="font-mono"
              placeholder="Enter hex number..."
              type="text"
              inputMode="text"
            />
            {hexValue && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(hexValue, "hex")}
              >
                {copied === "hex" ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="octal-input">Octal (Base 8)</Label>
          <div className="flex gap-2">
            <Input
              id="octal-input"
              value={octalValue}
              onChange={(e) => handleOctalChange(e.target.value)}
              className="font-mono"
              placeholder="Enter octal number..."
              type="text"
              inputMode="text"
            />
            {octalValue && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(octalValue, "octal")}
              >
                {copied === "octal" ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" onClick={clearAll}>
          Clear All
        </Button>
      </div>
    </div>
  )
}
