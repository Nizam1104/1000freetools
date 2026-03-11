"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, AlertCircle, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ValidationResult {
  isValid: boolean
  format: string
  checkDigit: number
  calculatedCheckDigit: number
  message: string
}

export default function BarcodeValidator() {
  const [barcode, setBarcode] = useState<string>("")
  const [result, setResult] = useState<ValidationResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const calculateEAN13CheckDigit = (code: string): number => {
    const digits = code.slice(0, 12).split("").map(Number)
    const sum = digits.reduce((acc, digit, index) => {
      return acc + (index % 2 === 0 ? digit : digit * 3)
    }, 0)
    return (10 - (sum % 10)) % 10
  }

  const calculateUPCCheckDigit = (code: string): number => {
    const digits = code.slice(0, 11).split("").map(Number)
    const sum = digits.reduce((acc, digit, index) => {
      return acc + (index % 2 === 0 ? digit * 3 : digit)
    }, 0)
    return (10 - (sum % 10)) % 10
  }

  const calculateISBN10CheckDigit = (code: string): number | string => {
    const digits = code.slice(0, 9).split("").map(Number)
    const sum = digits.reduce((acc, digit, index) => {
      return acc + digit * (10 - index)
    }, 0)
    const check = (11 - (sum % 11)) % 11
    return check === 10 ? "X" : check
  }

  const validateBarcode = useCallback((inputBarcode: string) => {
    const cleanBarcode = inputBarcode.replace(/[\s\-]/g, "")
    
    if (!cleanBarcode) {
      setResult(null)
      return
    }

    let validationResult: ValidationResult

    // EAN-13 (13 digits)
    if (/^\d{13}$/.test(cleanBarcode)) {
      const checkDigit = parseInt(cleanBarcode[12])
      const calculatedCheckDigit = calculateEAN13CheckDigit(cleanBarcode)
      validationResult = {
        isValid: checkDigit === calculatedCheckDigit,
        format: "EAN-13",
        checkDigit,
        calculatedCheckDigit,
        message: checkDigit === calculatedCheckDigit
          ? "Valid EAN-13 barcode"
          : `Invalid check digit. Expected: ${calculatedCheckDigit}`,
      }
    }
    // UPC-A (12 digits)
    else if (/^\d{12}$/.test(cleanBarcode)) {
      const checkDigit = parseInt(cleanBarcode[11])
      const calculatedCheckDigit = calculateUPCCheckDigit(cleanBarcode)
      validationResult = {
        isValid: checkDigit === calculatedCheckDigit,
        format: "UPC-A",
        checkDigit,
        calculatedCheckDigit,
        message: checkDigit === calculatedCheckDigit
          ? "Valid UPC-A barcode"
          : `Invalid check digit. Expected: ${calculatedCheckDigit}`,
      }
    }
    // ISBN-10 (10 digits, last can be X)
    else if (/^\d{9}[\dX]$/.test(cleanBarcode.toUpperCase())) {
      const checkDigit = cleanBarcode.toUpperCase()[9]
      const calculatedCheckDigit = calculateISBN10CheckDigit(cleanBarcode)
      validationResult = {
        isValid: checkDigit.toUpperCase() === calculatedCheckDigit.toString().toUpperCase(),
        format: "ISBN-10",
        checkDigit: checkDigit as unknown as number,
        calculatedCheckDigit: calculatedCheckDigit as unknown as number,
        message: checkDigit.toUpperCase() === calculatedCheckDigit.toString().toUpperCase()
          ? "Valid ISBN-10"
          : `Invalid check digit. Expected: ${calculatedCheckDigit}`,
      }
    }
    // ISBN-13 (13 digits starting with 978 or 979)
    else if (/^97[89]\d{10}$/.test(cleanBarcode)) {
      const checkDigit = parseInt(cleanBarcode[12])
      const calculatedCheckDigit = calculateEAN13CheckDigit(cleanBarcode)
      validationResult = {
        isValid: checkDigit === calculatedCheckDigit,
        format: "ISBN-13",
        checkDigit,
        calculatedCheckDigit,
        message: checkDigit === calculatedCheckDigit
          ? "Valid ISBN-13"
          : `Invalid check digit. Expected: ${calculatedCheckDigit}`,
      }
    }
    // Code 39 (alphanumeric, variable length)
    else if (/^[0-9A-Z\-\.\ \$\/\+\%]+$/.test(cleanBarcode)) {
      validationResult = {
        isValid: true,
        format: "Code 39",
        checkDigit: 0,
        calculatedCheckDigit: 0,
        message: "Valid Code 39 format (no check digit validation)",
      }
    }
    // Code 128 (any ASCII)
    else if (cleanBarcode.length > 0) {
      validationResult = {
        isValid: true,
        format: "Code 128 / Unknown",
        checkDigit: 0,
        calculatedCheckDigit: 0,
        message: "Valid format (check digit not validated)",
      }
    } else {
      validationResult = {
        isValid: false,
        format: "Unknown",
        checkDigit: 0,
        calculatedCheckDigit: 0,
        message: "Invalid barcode format",
      }
    }

    setResult(validationResult)
  }, [])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (barcode) {
        validateBarcode(barcode)
      } else {
        setResult(null)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [barcode, validateBarcode])

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

  const clearAll = useCallback(() => {
    setBarcode("")
    setResult(null)
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="barcode" className="text-base font-medium">
            Barcode Number
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={clearAll}
            className="h-7"
            disabled={!barcode}
          >
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>

        <Input
          id="barcode"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value.toUpperCase())}
          className="font-mono text-sm"
          placeholder="Enter barcode number (EAN-13, UPC, ISBN, etc.)"
        />
      </section>

      {/* Result */}
      {result && (
        <section className={cn(
          "rounded-lg border p-6 space-y-4",
          result.isValid
            ? "bg-green-50 dark:bg-green-950/20 border-green-200"
            : "bg-red-50 dark:bg-red-950/20 border-red-200"
        )}>
          <div className="flex items-center gap-4">
            {result.isValid ? (
              <CheckCircle className="size-12 text-green-600" />
            ) : (
              <AlertCircle className="size-12 text-red-600" />
            )}
            <div>
              <div className={cn(
                "text-xl font-bold",
                result.isValid ? "text-green-900 dark:text-green-100" : "text-red-900 dark:text-red-100"
              )}>
                {result.isValid ? "Valid" : "Invalid"}
              </div>
              <div className="text-sm text-muted-foreground">
                {result.format}
              </div>
            </div>
          </div>

          <div className="text-sm">
            {result.message}
          </div>

          {result.format.includes("EAN") || result.format.includes("UPC") || result.format.includes("ISBN") ? (
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Provided Check Digit</div>
                <div className="font-mono text-lg">{result.checkDigit}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Calculated Check Digit</div>
                <div className={cn(
                  "font-mono text-lg",
                  result.checkDigit === result.calculatedCheckDigit
                    ? "text-green-600"
                    : "text-red-600"
                )}>
                  {result.calculatedCheckDigit}
                </div>
              </div>
            </div>
          ) : null}
        </section>
      )}

      {/* Empty State */}
      {!result && (
        <div className="text-center py-12 text-muted-foreground">
          <p>Enter a barcode number to validate</p>
        </div>
      )}

      {/* Supported Formats */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <h3 className="text-sm font-medium">Supported Formats</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          <div className="p-3 rounded border bg-background">
            <div className="font-medium">EAN-13</div>
            <div className="text-muted-foreground text-xs">13 digits</div>
          </div>
          <div className="p-3 rounded border bg-background">
            <div className="font-medium">UPC-A</div>
            <div className="text-muted-foreground text-xs">12 digits</div>
          </div>
          <div className="p-3 rounded border bg-background">
            <div className="font-medium">ISBN-10</div>
            <div className="text-muted-foreground text-xs">10 digits (0-9, X)</div>
          </div>
          <div className="p-3 rounded border bg-background">
            <div className="font-medium">ISBN-13</div>
            <div className="text-muted-foreground text-xs">13 digits (978/979)</div>
          </div>
          <div className="p-3 rounded border bg-background">
            <div className="font-medium">Code 39</div>
            <div className="text-muted-foreground text-xs">Alphanumeric</div>
          </div>
          <div className="p-3 rounded border bg-background">
            <div className="font-medium">Code 128</div>
            <div className="text-muted-foreground text-xs">Any ASCII</div>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="space-y-3 pt-4 border-t">
        <h3 className="text-sm font-medium">Try Examples</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setBarcode("5901234123457")}
            className="text-xs"
          >
            Valid EAN-13
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setBarcode("036000291452")}
            className="text-xs"
          >
            Valid UPC-A
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setBarcode("9780306406157")}
            className="text-xs"
          >
            Valid ISBN-13
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setBarcode("043942089X")}
            className="text-xs"
          >
            ISBN-10 with X
          </Button>
        </div>
      </section>
    </div>
  )
}
