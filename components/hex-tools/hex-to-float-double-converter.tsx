"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, ArrowRight } from "lucide-react"

export function HexToFloatDoubleConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [endianess, setEndianess] = useState<"big" | "little">("big")
  const [dataType, setDataType] = useState<"auto" | "float32" | "float64" | "int32" | "int64" | "uint32" | "uint64">("auto")

  const hexToNumber = useCallback((hex: string, type: string, isLittleEndian: boolean): number | string => {
    const cleanHex = hex.replace(/[^0-9a-fA-F]/g, '')
    
    if (cleanHex.length === 0) {
      return "Invalid hex value"
    }

    try {
      // Convert hex to bytes
      const bytes = new Uint8Array(cleanHex.length / 2)
      for (let i = 0; i < cleanHex.length; i += 2) {
        bytes[i / 2] = parseInt(cleanHex.substring(i, i + 2), 16)
      }

      // Handle endianess
      let dataView: DataView
      if (isLittleEndian) {
        const reversedBytes = new Uint8Array(bytes.length)
        for (let i = 0; i < bytes.length; i++) {
          reversedBytes[i] = bytes[bytes.length - 1 - i]
        }
        dataView = new DataView(reversedBytes.buffer)
      } else {
        dataView = new DataView(bytes.buffer)
      }

      switch (type) {
        case "float32":
          if (bytes.length < 4) return "Need 8 hex chars for float32"
          return dataView.getFloat32(0)
        case "float64":
          if (bytes.length < 8) return "Need 16 hex chars for float64"
          return dataView.getFloat64(0)
        case "int32":
          if (bytes.length < 4) return "Need 8 hex chars for int32"
          return dataView.getInt32(0)
        case "uint32":
          if (bytes.length < 4) return "Need 8 hex chars for uint32"
          return dataView.getUint32(0)
        case "int64":
          if (bytes.length < 8) return "Need 16 hex chars for int64"
          return dataView.getBigInt64(0).toString()
        case "uint64":
          if (bytes.length < 8) return "Need 16 hex chars for uint64"
          return dataView.getBigUint64(0).toString()
        default:
          // Auto detect based on length
          if (bytes.length === 4) {
            return `Float32: ${dataView.getFloat32(0)}\nInt32: ${dataView.getInt32(0)}\nUInt32: ${dataView.getUint32(0)}`
          } else if (bytes.length === 8) {
            return `Float64: ${dataView.getFloat64(0)}\nInt64: ${dataView.getBigInt64(0).toString()}\nUInt64: ${dataView.getBigUint64(0).toString()}`
          } else {
            return `Hex length (${bytes.length} bytes) doesn't match standard types. Use 4 bytes (32-bit) or 8 bytes (64-bit).`
          }
      }
    } catch (e) {
      return `Error: ${e instanceof Error ? e.message : 'Unknown error'}`
    }
  }, [])

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }

    let result = ""
    const cleanInput = input.replace(/[^0-9a-fA-F]/g, '').toUpperCase()

    if (dataType === "auto") {
      result = `# Auto-Detect Results for: 0x${cleanInput}\n\n`
      
      if (cleanInput.length === 8) {
        result += `## 32-bit Values\n`
        result += `Float32: ${hexToNumber(cleanInput, "float32", endianess === "little")}\n`
        result += `Int32: ${hexToNumber(cleanInput, "int32", endianess === "little")}\n`
        result += `UInt32: ${hexToNumber(cleanInput, "uint32", endianess === "little")}\n`
      } else if (cleanInput.length === 16) {
        result += `## 64-bit Values\n`
        result += `Float64: ${hexToNumber(cleanInput, "float64", endianess === "little")}\n`
        result += `Int64: ${hexToNumber(cleanInput, "int64", endianess === "little")}\n`
        result += `UInt64: ${hexToNumber(cleanInput, "uint64", endianess === "little")}\n`
      } else {
        result = `Invalid hex length. Use 8 characters for 32-bit or 16 characters for 64-bit.`
      }
    } else {
      result = hexToNumber(cleanInput, dataType, endianess === "little") as string
    }

    setOutput(result)
  }, [input, dataType, endianess, hexToNumber])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setInput("")
    setOutput("")
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "converted-value.txt"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput("40490FDB")
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Hex to Float/Double Converter</h2>
            <p className="text-sm text-muted-foreground">
              Convert hexadecimal values to floating-point numbers
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Label>Endianess:</Label>
          <Button
            variant={endianess === "big" ? "default" : "outline"}
            size="sm"
            onClick={() => setEndianess("big")}
          >
            Big Endian
          </Button>
          <Button
            variant={endianess === "little" ? "default" : "outline"}
            size="sm"
            onClick={() => setEndianess("little")}
          >
            Little Endian
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Label>Data Type:</Label>
          <select
            value={dataType}
            onChange={(e) => setDataType(e.target.value as any)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="auto">Auto Detect</option>
            <option value="float32">Float32</option>
            <option value="float64">Float64</option>
            <option value="int32">Int32</option>
            <option value="uint32">UInt32</option>
            <option value="int64">Int64</option>
            <option value="uint64">UInt64</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <Label htmlFor="input">Hexadecimal Input</Label>
        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter hex value (8 chars for 32-bit, 16 chars for 64-bit)..."
          className="min-h-[200px] font-mono text-sm"
        />
        <div className="flex items-center gap-2">
          <Button onClick={handleConvert} className="flex-1" disabled={!input}>
            <ArrowRight className="h-4 w-4 mr-2" />
            Convert
          </Button>
          <Button variant="outline" onClick={handleClear} title="Clear">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {output && (
        <div className="space-y-4">
          <Label htmlFor="output">Converted Value</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            className="min-h-[200px] font-mono text-sm bg-muted"
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
        <h3 className="font-medium">Examples</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li><strong>40490FDB</strong> → Float32: 3.1415927 (π)</li>
          <li><strong>400921FB54442D18</strong> → Float64: 3.141592653589793 (π)</li>
          <li><strong>00000001</strong> → Int32: 1, Float32: very small number</li>
        </ul>
      </div>
    </div>
  )
}
