"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy, Check, Trash2, Download } from "lucide-react"

const UUID_EPOCH_MS = Date.UTC(1582, 9, 15)

function hex(num: number, len: number) {
  return num.toString(16).padStart(len, "0")
}

function randomInt(maxExclusive: number) {
  const buf = new Uint32Array(1)
  crypto.getRandomValues(buf)
  return buf[0] % maxExclusive
}

function randomBytes(len: number): Uint8Array {
  const bytes = new Uint8Array(len)
  crypto.getRandomValues(bytes)
  return bytes
}

function generateUuidV1(): string {
  const nowMs = Date.now()
  const timestamp100ns = BigInt(nowMs - UUID_EPOCH_MS) * 10000n + BigInt(randomInt(10000))

  const timeLow = Number(timestamp100ns & 0xffffffffn)
  const timeMid = Number((timestamp100ns >> 32n) & 0xffffn)
  const timeHi = Number((timestamp100ns >> 48n) & 0x0fffn)
  const timeHiAndVersion = timeHi | 0x1000

  const clockSeq = randomInt(1 << 14)
  const clockSeqHiAndReserved = ((clockSeq >> 8) & 0x3f) | 0x80
  const clockSeqLow = clockSeq & 0xff

  const node = randomBytes(6)
  node[0] |= 0x01 // set multicast bit (random node id)

  return `${hex(timeLow, 8)}-${hex(timeMid, 4)}-${hex(timeHiAndVersion, 4)}-${hex(
    clockSeqHiAndReserved,
    2,
  )}${hex(clockSeqLow, 2)}-${Array.from(node, (b) => hex(b, 2)).join("")}`
}

export function UuidV1Generator() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const handleConvert = useCallback(() => {
    try {
      setError("")
      const raw = input.trim()
      const count = raw ? Number.parseInt(raw, 10) : 1
      if (!Number.isFinite(count) || count <= 0 || count > 5000) {
        throw new Error("Enter a number between 1 and 5000")
      }
      const uuids = Array.from({ length: count }, () => generateUuidV1())
      setOutput(uuids.join("\n"))
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion error")
      setOutput("")
    }
  }, [input])

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
    setError("")
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "output.txt"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">UUID v1 Generator</h2>
            <p className="text-sm text-muted-foreground">
              Generate time-based UUID version 1
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your data here..."
            className="min-h-[400px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleConvert} className="flex-1" disabled={!input}>
              Convert
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Output</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Output will appear here..."
            className="min-h-[400px] font-mono text-sm bg-muted"
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
      </div>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">How to use</h3>
        <p className="text-sm text-muted-foreground">
          Enter your data in the input field, click Convert, and the result will appear in the output field.
          You can then copy or download the result.
        </p>
      </div>
    </div>
  )
}
