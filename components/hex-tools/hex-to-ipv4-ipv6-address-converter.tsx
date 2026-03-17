"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"

export function HexToIpAddressConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [ipVersion, setIpVersion] = useState<"auto" | "ipv4" | "ipv6">("auto")

  const hexToIpv4 = useCallback((hex: string): string | null => {
    const cleanHex = hex.replace(/[^0-9a-fA-F]/g, '')
    
    if (cleanHex.length !== 8) {
      return null
    }
    
    const bytes = []
    for (let i = 0; i < 8; i += 2) {
      bytes.push(parseInt(cleanHex.substring(i, i + 2), 16))
    }
    
    return bytes.join('.')
  }, [])

  const hexToIpv6 = useCallback((hex: string): string | null => {
    const cleanHex = hex.replace(/[^0-9a-fA-F:]/g, '')
    
    // Handle already formatted IPv6
    if (cleanHex.includes(':')) {
      return cleanHex
    }
    
    if (cleanHex.length !== 32) {
      return null
    }
    
    const groups = []
    for (let i = 0; i < 32; i += 4) {
      groups.push(cleanHex.substring(i, i + 4))
    }
    
    // Compress consecutive zero groups
    let result = groups.join(':')
    result = result.replace(/(:0000)+/g, '::').replace(/::+/g, '::')
    
    return result
  }, [])

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }

    const cleanInput = input.replace(/[^0-9a-fA-F:]/g, '')
    let results: string[] = []

    if (ipVersion === "auto" || ipVersion === "ipv4") {
      const ipv4 = hexToIpv4(cleanInput)
      if (ipv4) {
        results.push(`**IPv4:** ${ipv4}`)
      }
    }

    if (ipVersion === "auto" || ipVersion === "ipv6") {
      const ipv6 = hexToIpv6(cleanInput)
      if (ipv6) {
        results.push(`**IPv6:** ${ipv6}`)
      }
    }

    if (results.length === 0) {
      setOutput("Invalid hex format. For IPv4, use 8 hex digits. For IPv6, use 32 hex digits.")
    } else {
      setOutput(results.join('\n\n'))
    }
  }, [input, ipVersion, hexToIpv4, hexToIpv6])

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
      a.download = "ip-address.txt"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput("C0A80101")
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Hex to IP Address Converter</h2>
            <p className="text-sm text-muted-foreground">
              Convert hexadecimal values to IPv4 or IPv6 addresses
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Label>IP Version:</Label>
        <Button
          variant={ipVersion === "auto" ? "default" : "outline"}
          size="sm"
          onClick={() => setIpVersion("auto")}
        >
          Auto Detect
        </Button>
        <Button
          variant={ipVersion === "ipv4" ? "default" : "outline"}
          size="sm"
          onClick={() => setIpVersion("ipv4")}
        >
          IPv4
        </Button>
        <Button
          variant={ipVersion === "ipv6" ? "default" : "outline"}
          size="sm"
          onClick={() => setIpVersion("ipv6")}
        >
          IPv6
        </Button>
      </div>

      <div className="space-y-4">
        <Label htmlFor="input">Hexadecimal Input</Label>
        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter hex value (e.g., C0A80101 for IPv4 or 20010db8000000000000000000000001 for IPv6)..."
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
          <Label htmlFor="output">IP Address</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            className="min-h-[150px] font-mono text-sm bg-muted"
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
          <li><strong>IPv4:</strong> C0A80101 → 192.168.1.1</li>
          <li><strong>IPv4:</strong> 7F000001 → 127.0.0.1</li>
          <li><strong>IPv6:</strong> 20010db8000000000000000000000001 → 2001:db8::1</li>
        </ul>
      </div>
    </div>
  )
}
