"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

type LogicOperation = "AND" | "OR" | "XOR" | "NAND" | "NOR" | "XNOR"

export default function BinaryLogicGateCalculator() {
  const [input1, setInput1] = useState<string>("")
  const [input2, setInput2] = useState<string>("")
  const [operation, setOperation] = useState<LogicOperation>("AND")
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const validateBinary = (binary: string): boolean => {
    return /^[01\s]+$/.test(binary)
  }

  const performLogicOperation = useCallback((bit1: string, bit2: string, op: LogicOperation): string => {
    const a = parseInt(bit1)
    const b = parseInt(bit2)
    
    switch (op) {
      case "AND":
        return (a & b).toString()
      case "OR":
        return (a | b).toString()
      case "XOR":
        return (a ^ b).toString()
      case "NAND":
        return (a & b) === 1 ? "0" : "1"
      case "NOR":
        return (a | b) === 0 ? "1" : "0"
      case "XNOR":
        return (a ^ b) === 0 ? "1" : "0"
      default:
        return "0"
    }
  }, [])

  const calculate = useCallback(() => {
    setError(null)

    const bin1 = input1.replace(/\s/g, "")
    const bin2 = input2.replace(/\s/g, "")

    if (!bin1 || !validateBinary(input1)) {
      setError("Please enter a valid binary number for the first input")
      setResult("")
      return
    }

    if (!bin2 || !validateBinary(input2)) {
      setError("Please enter a valid binary number for the second input")
      setResult("")
      return
    }

    try {
      // Pad to same length
      const maxLength = Math.max(bin1.length, bin2.length)
      const padded1 = bin1.padStart(maxLength, "0")
      const padded2 = bin2.padStart(maxLength, "0")

      // Perform operation bit by bit
      let resultBinary = ""
      for (let i = 0; i < maxLength; i++) {
        resultBinary += performLogicOperation(padded1[i], padded2[i], operation)
      }

      // Format with spaces every 4 bits
      const formatted = resultBinary.replace(/(.{4})/g, "$1 ").trim()
      setResult(formatted)
    } catch (err) {
      setError("Calculation error")
      setResult("")
    }
  }, [input1, input2, operation, performLogicOperation])

  React.useEffect(() => {
    calculate()
  }, [input1, input2, operation, calculate])

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
    setInput1("")
    setInput2("")
    setResult("")
    setError(null)
  }, [])

  const cleanInput1 = input1.replace(/\s/g, "")
  const cleanInput2 = input2.replace(/\s/g, "")
  const cleanResult = result.replace(/\s/g, "")

  // Generate truth table
  const truthTable = useMemo(() => {
    const operations: LogicOperation[] = ["AND", "OR", "XOR", "NAND", "NOR", "XNOR"]
    
    return operations.map(op => ({
      operation: op,
      rows: [
        { a: "0", b: "0", result: performLogicOperation("0", "0", op) },
        { a: "0", b: "1", result: performLogicOperation("0", "1", op) },
        { a: "1", b: "0", result: performLogicOperation("1", "0", op) },
        { a: "1", b: "1", result: performLogicOperation("1", "1", op) },
      ],
    }))
  }, [performLogicOperation])

  const operationDescriptions: Record<LogicOperation, string> = {
    AND: "Output is 1 only if both inputs are 1",
    OR: "Output is 1 if at least one input is 1",
    XOR: "Output is 1 if exactly one input is 1",
    NAND: "Output is 0 only if both inputs are 1 (NOT AND)",
    NOR: "Output is 1 only if both inputs are 0 (NOT OR)",
    XNOR: "Output is 1 if both inputs are the same (NOT XOR)",
  }

  const isValidInput = validateBinary(input1) && validateBinary(input2) && cleanInput1.length > 0 && cleanInput2.length > 0

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Inputs Section */}
      <section className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="input1" className="text-sm font-medium">
              First Binary Number (A)
            </Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(cleanInput1, "input1")}
              className="h-7"
              disabled={!cleanInput1}
            >
              {copied === "input1" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>
          <Input
            id="input1"
            value={input1}
            onChange={(e) => setInput1(e.target.value.replace(/[^01\s]/g, ""))}
            className={cn(
              "font-mono text-base",
              !validateBinary(input1) && cleanInput1.length > 0 ? "border-destructive" : ""
            )}
            placeholder="e.g., 10101010"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="input2" className="text-sm font-medium">
              Second Binary Number (B)
            </Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(cleanInput2, "input2")}
              className="h-7"
              disabled={!cleanInput2}
            >
              {copied === "input2" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>
          <Input
            id="input2"
            value={input2}
            onChange={(e) => setInput2(e.target.value.replace(/[^01\s]/g, ""))}
            className={cn(
              "font-mono text-base",
              !validateBinary(input2) && cleanInput2.length > 0 ? "border-destructive" : ""
            )}
            placeholder="e.g., 11001100"
          />
        </div>

        {/* Operation Selector */}
        <div className="space-y-3">
          <Label htmlFor="operation" className="text-sm font-medium">
            Logic Operation
          </Label>
          <Select value={operation} onValueChange={(v) => setOperation(v as LogicOperation)}>
            <SelectTrigger id="operation">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AND">AND</SelectItem>
              <SelectItem value="OR">OR</SelectItem>
              <SelectItem value="XOR">XOR (Exclusive OR)</SelectItem>
              <SelectItem value="NAND">NAND (NOT AND)</SelectItem>
              <SelectItem value="NOR">NOR (NOT OR)</SelectItem>
              <SelectItem value="XNOR">XNOR (Exclusive NOR)</SelectItem>
            </SelectContent>
          </Select>
          {isValidInput && (
            <p className="text-xs text-muted-foreground">
              {operationDescriptions[operation]}
            </p>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 text-destructive">
            <Info className="size-4" />
            <p className="text-sm">{error}</p>
          </div>
        )}
      </section>

      {/* Result Section */}
      {isValidInput && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Result</Label>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(cleanResult, "result")}
                className="h-7"
              >
                {copied === "result" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
              <Button
                variant="ghost"
                size="xs"
                onClick={handleClear}
                className="h-7"
              >
                <Trash2 className="size-3.5" />
                <span className="text-xs">Clear</span>
              </Button>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="font-mono text-2xl text-center">{result}</p>
          </div>

          {/* Bit-by-bit breakdown */}
          <div className="rounded-lg border bg-background p-4 overflow-x-auto">
            <p className="text-sm font-medium mb-3">Bit-by-Bit Operation</p>
            <div className="flex gap-1 min-w-max">
              {cleanInput1.padStart(Math.max(cleanInput1.length, cleanInput2.length), "0").split("").map((bit1, idx) => {
                const bit2 = cleanInput2.padStart(Math.max(cleanInput1.length, cleanInput2.length), "0")[idx]
                const resultBit = cleanResult[idx]
                return (
                  <div key={idx} className="text-center">
                    <div className={cn(
                      "w-10 h-8 rounded font-mono text-sm flex items-center justify-center mb-1",
                      bit1 === "1" ? "bg-primary/20 text-primary" : "bg-muted"
                    )}>
                      {bit1}
                    </div>
                    <div className="text-xs text-muted-foreground">{operation}</div>
                    <div className={cn(
                      "w-10 h-8 rounded font-mono text-sm flex items-center justify-center my-1",
                      bit2 === "1" ? "bg-primary/20 text-primary" : "bg-muted"
                    )}>
                      {bit2}
                    </div>
                    <div className="text-xs text-muted-foreground">=</div>
                    <div className={cn(
                      "w-10 h-8 rounded font-mono text-sm flex items-center justify-center mt-1",
                      resultBit === "1" ? "bg-primary text-primary-foreground" : "bg-muted"
                    )}>
                      {resultBit}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Truth Tables */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium">Logic Gate Truth Tables</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {truthTable.map((table) => (
            <div key={table.operation} className={cn(
              "rounded-lg border bg-background p-3",
              table.operation === operation && "border-primary"
            )}>
              <p className="text-sm font-medium mb-2 text-center">{table.operation}</p>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b">
                    <th className="px-2 py-1 text-left">A</th>
                    <th className="px-2 py-1 text-left">B</th>
                    <th className="px-2 py-1 text-right">Output</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {table.rows.map((row, idx) => (
                    <tr key={idx}>
                      <td className="px-2 py-1 font-mono">{row.a}</td>
                      <td className="px-2 py-1 font-mono">{row.b}</td>
                      <td className="px-2 py-1 font-mono text-right">{row.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Logic Gates</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>AND:</strong> Output is HIGH (1) only when ALL inputs are HIGH</p>
              <p><strong>OR:</strong> Output is HIGH when ANY input is HIGH</p>
              <p><strong>XOR:</strong> Output is HIGH when inputs are DIFFERENT</p>
              <p><strong>NAND/NOR/XNOR:</strong> Inverted versions of AND/OR/XOR respectively</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
