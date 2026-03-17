"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Calculator } from "lucide-react"
import { Input } from "@/components/ui/input"

export function HexMemoryAddressCalculator() {
  const [baseAddress, setBaseAddress] = useState("")
  const [offset, setOffset] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [operation, setOperation] = useState<"add" | "subtract" | "multiply" | "divide">("add")
  const [addressSize, setAddressSize] = useState<32 | 64>(64)

  const calculateAddress = useCallback((base: string, off: string, op: string, size: number): string => {
    const cleanBase = base.replace(/[^0-9a-fA-Fx]/g, '')
    const cleanOffset = off.replace(/[^0-9a-fA-Fx]/g, '')

    let baseNum: bigint
    let offsetNum: bigint

    try {
      baseNum = BigInt(cleanBase.startsWith('0x') ? cleanBase : `0x${cleanBase}`)
      offsetNum = BigInt(cleanOffset.startsWith('0x') ? cleanOffset : `0x${cleanOffset}`)
    } catch {
      return "Invalid hex value"
    }

    let result: bigint

    switch (op) {
      case "add":
        result = baseNum + offsetNum
        break
      case "subtract":
        result = baseNum - offsetNum
        break
      case "multiply":
        result = baseNum * offsetNum
        break
      case "divide":
        if (offsetNum === 0n) return "Cannot divide by zero"
        result = baseNum / offsetNum
        break
      default:
        result = baseNum + offsetNum
    }

    // Apply address size limit
    const maxAddress = size === 32 ? 0xFFFFFFFFn : 0xFFFFFFFFFFFFFFFFn
    const maskedResult = result & maxAddress

    // Handle negative results for subtraction
    const displayResult = result < 0n ? `Negative result: ${result.toString(16).toUpperCase()}` : `0x${maskedResult.toString(16).toUpperCase().padStart(size / 4, '0')}`

    return displayResult
  }, [])

  const handleCalculate = useCallback(() => {
    if (!baseAddress.trim()) {
      setOutput("")
      return
    }

    const offsetValue = offset.trim() || "0"
    const result = calculateAddress(baseAddress, offsetValue, operation, addressSize)

    const cleanBase = baseAddress.replace(/[^0-9a-fA-Fx]/g, '')
    const cleanOffset = offsetValue.replace(/[^0-9a-fA-Fx]/g, '')

    setOutput(`
# Memory Address Calculation Results

## Input
| Parameter | Value |
|-----------|-------|
| **Base Address** | 0x${cleanBase.replace('0x', '').toUpperCase()} |
| **Offset** | 0x${cleanOffset.replace('0x', '').toUpperCase()} |
| **Operation** | ${operation.charAt(0).toUpperCase() + operation.slice(1)} |
| **Address Size** | ${addressSize}-bit |

## Result
**Calculated Address:** ${result}

## Additional Information
- **Decimal Base:** ${BigInt(cleanBase.startsWith('0x') ? cleanBase : `0x${cleanBase}`).toString()}
- **Decimal Offset:** ${BigInt(cleanOffset.startsWith('0x') ? cleanOffset : `0x${cleanOffset}`).toString()}
- **Max Address (${addressSize}-bit):** 0x${addressSize === 32 ? 'FFFFFFFF' : 'FFFFFFFFFFFFFFFF'}
`.trim())
  }, [baseAddress, offset, operation, addressSize, calculateAddress])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setBaseAddress("")
    setOffset("")
    setOutput("")
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "memory-address.txt"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setBaseAddress("0x7FFF0000")
    setOffset("0x1000")
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Hex Memory Address Calculator</h2>
            <p className="text-sm text-muted-foreground">
              Calculate memory addresses with offsets
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="baseAddress">Base Address</Label>
          <Input
            id="baseAddress"
            value={baseAddress}
            onChange={(e) => setBaseAddress(e.target.value)}
            placeholder="0x7FFF0000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="offset">Offset</Label>
          <Input
            id="offset"
            value={offset}
            onChange={(e) => setOffset(e.target.value)}
            placeholder="0x1000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="operation">Operation</Label>
          <select
            id="operation"
            value={operation}
            onChange={(e) => setOperation(e.target.value as any)}
            className="w-full border rounded px-3 py-2 text-sm"
          >
            <option value="add">Add (+)</option>
            <option value="subtract">Subtract (-)</option>
            <option value="multiply">Multiply (×)</option>
            <option value="divide">Divide (÷)</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="addressSize">Address Size</Label>
          <select
            id="addressSize"
            value={addressSize}
            onChange={(e) => setAddressSize(Number(e.target.value) as 32 | 64)}
            className="w-full border rounded px-3 py-2 text-sm"
          >
            <option value={64}>64-bit</option>
            <option value={32}>32-bit</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={handleCalculate} className="flex-1" disabled={!baseAddress}>
          <Calculator className="h-4 w-4 mr-2" />
          Calculate Address
        </Button>
        <Button variant="outline" onClick={handleClear} title="Clear">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {output && (
        <div className="space-y-4">
          <Label htmlFor="output">Calculation Results</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            className="min-h-[300px] font-mono text-sm bg-muted"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleCopy} disabled={!output} className="flex-1">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button variant="outline" onClick={handleDownload} disabled={!output} title="Download">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">Common Use Cases</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li><strong>Array indexing:</strong> base + (index × element_size)</li>
          <li><strong>Structure member:</strong> struct_base + member_offset</li>
          <li><strong>Pointer arithmetic:</strong> ptr + offset</li>
          <li><strong>Memory mapping:</strong> map_base + file_offset</li>
        </ul>
      </div>
    </div>
  )
}
