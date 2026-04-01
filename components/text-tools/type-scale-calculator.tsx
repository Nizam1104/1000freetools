"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download } from "lucide-react"

function parseNumbers(input: string) {
  return input
    .match(/-?\d+(\.\d+)?/g)
    ?.map((n) => Number(n))
    .filter((n) => Number.isFinite(n)) ?? []
}

export function TypeScaleCalculator() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const handleConvert = useCallback(() => {
    try {
      setError("")
      const trimmed = input.trim()
      if (!trimmed) {
        setOutput("")
        return
      }

      let basePx = 16
      let ratio = 1.25
      let minStep = -2
      let maxStep = 6
      let rootPx = 16

      try {
        const parsed = JSON.parse(trimmed)
        if (parsed && typeof parsed === "object") {
          if (typeof (parsed as any).basePx === "number") basePx = (parsed as any).basePx
          if (typeof (parsed as any).ratio === "number") ratio = (parsed as any).ratio
          if (typeof (parsed as any).minStep === "number") minStep = (parsed as any).minStep
          if (typeof (parsed as any).maxStep === "number") maxStep = (parsed as any).maxStep
          if (typeof (parsed as any).rootPx === "number") rootPx = (parsed as any).rootPx
        }
      } catch {
        const nums = parseNumbers(trimmed)
        if (nums.length >= 1) basePx = nums[0]
        if (nums.length >= 2) ratio = nums[1]
        if (nums.length >= 3) minStep = Math.trunc(nums[2])
        if (nums.length >= 4) maxStep = Math.trunc(nums[3])
        if (nums.length >= 5) rootPx = nums[4]
      }

      if (!(basePx > 0)) throw new Error("basePx must be > 0")
      if (!(ratio > 0)) throw new Error("ratio must be > 0")
      if (minStep > maxStep) throw new Error("minStep must be <= maxStep")
      if (!(rootPx > 0)) throw new Error("rootPx must be > 0")

      const rows: Array<{ step: number; px: number; rem: number }> = []
      for (let step = minStep; step <= maxStep; step++) {
        const px = basePx * Math.pow(ratio, step)
        const rem = px / rootPx
        rows.push({ step, px, rem })
      }

      const table = rows
        .map((r) => {
          const step = r.step.toString().padStart(3, " ")
          const px = r.px.toFixed(3).replace(/\.?0+$/, "").padStart(8, " ")
          const rem = r.rem.toFixed(4).replace(/0+$/, "").replace(/\.$/, "").padStart(8, " ")
          return `${step} | ${px} px | ${rem} rem`
        })
        .join("\n")

      setOutput(
        [
          `basePx=${basePx}, ratio=${ratio}, steps=${minStep}..${maxStep}, rootPx=${rootPx}`,
          "",
          "step | size | rem",
          "-----|------|-----",
          table,
        ].join("\n")
      )
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
            <h2 className="text-2xl font-semibold tracking-tight">Type Scale Calculator</h2>
            <p className="text-sm text-muted-foreground">
              Calculate typography scales
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
