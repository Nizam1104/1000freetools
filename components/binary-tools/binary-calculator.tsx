"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

type Operation = "add" | "subtract" | "multiply" | "divide" | "and" | "or" | "xor" | "not"

export default function BinaryCalculator() {
  const [input1, setInput1] = useState<string>("")
  const [input2, setInput2] = useState<string>("")
  const [operation, setOperation] = useState<Operation>("add")
  const [result, setResult] = useState<string>("")
  const [resultDecimal, setResultDecimal] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [showDecimal, setShowDecimal] = useState<boolean>(true)

  const validateBinary = (binary: string): boolean => {
    return /^[01]+$/.test(binary.replace(/\s/g, ""))
  }

  const binaryToDecimal = (binary: string): number => {
    return parseInt(binary.replace(/\s/g, ""), 2)
  }

  const decimalToBinary = (decimal: number, bits: number = 32): string => {
    if (decimal < 0) {
      // Two's complement for negative numbers
      const absBinary = Math.abs(decimal).toString(2).padStart(bits, "0")
      const inverted = absBinary.split("").map(b => b === "0" ? "1" : "0").join("")
      const twosComplement = (parseInt(inverted, 2) + 1) >>> 0
      return twosComplement.toString(2).padStart(bits, "0")
    }
    return (decimal >>> 0).toString(2).padStart(bits, "0")
  }

  const calculate = useCallback(() => {
    setError(null)

    const bin1 = input1.replace(/\s/g, "")
    const bin2 = input2.replace(/\s/g, "")

    if (!bin1 || !validateBinary(bin1)) {
      setError("Please enter a valid binary number for the first input")
      setResult("")
      setResultDecimal("")
      return
    }

    if (operation !== "not" && (!bin2 || !validateBinary(bin2))) {
      setError("Please enter a valid binary number for the second input")
      setResult("")
      setResultDecimal("")
      return
    }

    try {
      const num1 = binaryToDecimal(bin1)
      const num2 = operation !== "not" ? binaryToDecimal(bin2) : 0
      let resultNum: number

      switch (operation) {
        case "add":
          resultNum = num1 + num2
          break
        case "subtract":
          resultNum = num1 - num2
          break
        case "multiply":
          resultNum = num1 * num2
          break
        case "divide":
          if (num2 === 0) {
            throw new Error("Division by zero")
          }
          resultNum = Math.floor(num1 / num2)
          break
        case "and":
          resultNum = num1 & num2
          break
        case "or":
          resultNum = num1 | num2
          break
        case "xor":
          resultNum = num1 ^ num2
          break
        case "not":
          resultNum = ~num1
          break
        default:
          throw new Error("Invalid operation")
      }

      // Determine bit width based on result
      const absResult = Math.abs(resultNum)
      const bits = absResult > 255 ? (absResult > 65535 ? 32 : 16) : 8
      const binaryResult = decimalToBinary(resultNum, bits)

      setResult(binaryResult.replace(/(.{4})/g, "$1 ").trim())
      setResultDecimal(resultNum.toString())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation error")
      setResult("")
      setResultDecimal("")
    }
  }, [input1, input2, operation])

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
    setResultDecimal("")
    setError(null)
  }, [])

  const operationSymbols: Record<Operation, string> = {
    add: "+",
    subtract: "-",
    multiply: "×",
    divide: "÷",
    and: "AND",
    or: "OR",
    xor: "XOR",
    not: "NOT",
  }

  const stepByStep = useMemo(() => {
    if (!result || error) return null

    const bin1 = input1.replace(/\s/g, "")
    const bin2 = input2.replace(/\s/g, "")
    const num1 = binaryToDecimal(bin1)
    const num2 = operation !== "not" ? binaryToDecimal(bin2) : 0

    const steps = [
      { label: "First number (binary)", value: bin1 },
      { label: "First number (decimal)", value: num1.toString() },
    ]

    if (operation !== "not") {
      steps.push(
        { label: "Second number (binary)", value: bin2 },
        { label: "Second number (decimal)", value: num2.toString() }
      )
    }

    steps.push(
      { label: "Operation", value: operationSymbols[operation] },
      { label: "Result (decimal)", value: resultDecimal },
      { label: "Result (binary)", value: result.replace(/\s/g, "") }
    )

    return steps
  }, [input1, input2, operation, result, resultDecimal, error, operationSymbols])

  const isBitwiseOperation = ["and", "or", "xor", "not"].includes(operation)

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Operation Type Selector */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Operation Type</Label>
        <Tabs
          value={isBitwiseOperation ? "bitwise" : "arithmetic"}
          onValueChange={(v) => setOperation(v === "arithmetic" ? "add" : "and")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="arithmetic">Arithmetic</TabsTrigger>
            <TabsTrigger value="bitwise">Bitwise</TabsTrigger>
          </TabsList>
        </Tabs>
      </section>

      {/* Inputs Section */}
      <section className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="input1" className="text-sm font-medium">
              First Binary Number
            </Label>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(input1, "input1")}
                className="h-7"
                disabled={!input1}
              >
                {copied === "input1" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            </div>
          </div>
          <Input
            id="input1"
            value={input1}
            onChange={(e) => setInput1(e.target.value.replace(/[^01\s]/g, ""))}
            className="font-mono text-sm"
            placeholder="e.g., 10101010"
          />
          {input1 && !validateBinary(input1) && (
            <p className="text-xs text-destructive">Invalid binary number</p>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="input2" className="text-sm font-medium">
              Second Binary Number
            </Label>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(input2, "input2")}
                className="h-7"
                disabled={!input2}
              >
                {copied === "input2" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            </div>
          </div>
          <Input
            id="input2"
            value={input2}
            onChange={(e) => setInput2(e.target.value.replace(/[^01\s]/g, ""))}
            className={cn(
              "font-mono text-sm",
              operation === "not" && "opacity-50"
            )}
            placeholder={operation === "not" ? "Not required for NOT operation" : "e.g., 00110011"}
            disabled={operation === "not"}
          />
          {input2 && !validateBinary(input2) && operation !== "not" && (
            <p className="text-xs text-destructive">Invalid binary number</p>
          )}
        </div>

        {/* Operation Selector */}
        <div className="space-y-3">
          <Label htmlFor="operation" className="text-sm font-medium">
            Operation
          </Label>
          <Select value={operation} onValueChange={(v) => setOperation(v as Operation)}>
            <SelectTrigger id="operation" className="font-mono">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {!isBitwiseOperation ? (
                <>
                  <SelectItem value="add">Addition (+)</SelectItem>
                  <SelectItem value="subtract">Subtraction (-)</SelectItem>
                  <SelectItem value="multiply">Multiplication (×)</SelectItem>
                  <SelectItem value="divide">Division (÷)</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="and">AND</SelectItem>
                  <SelectItem value="or">OR</SelectItem>
                  <SelectItem value="xor">XOR</SelectItem>
                  <SelectItem value="not">NOT</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-destructive">
            <Info className="size-4" />
            <p className="text-sm">{error}</p>
          </div>
        )}
      </section>

      {/* Result Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Result</Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(result.replace(/\s/g, ""), "result")}
              className="h-7"
              disabled={!result}
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

        <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
          {result ? (
            <>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Binary Result</p>
                <p className="font-mono text-lg font-medium">{result}</p>
              </div>
              {showDecimal && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Decimal Result</p>
                  <p className="font-mono text-lg font-medium">{resultDecimal}</p>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Enter binary numbers to see the result</p>
          )}
        </div>
      </section>

      {/* Step by Step */}
      {stepByStep && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium">Step-by-Step Calculation</h3>
          <div className="rounded-lg border bg-background divide-y">
            {stepByStep.map((step, idx) => (
              <div key={idx} className="flex justify-between p-3 text-sm">
                <span className="text-muted-foreground">{step.label}</span>
                <span className="font-mono">{step.value}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Truth Table for Bitwise Operations */}
      {isBitwiseOperation && operation !== "not" && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium">Truth Table</h3>
          <div className="rounded-lg border bg-background overflow-hidden">
            <div className="grid grid-cols-4 gap-px bg-border border-b">
              <div className="bg-muted/50 px-3 py-2 text-xs font-medium">A</div>
              <div className="bg-muted/50 px-3 py-2 text-xs font-medium">B</div>
              <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Result</div>
              <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Operation</div>
            </div>
            <div className="divide-y">
              {[
                { a: 0, b: 0 },
                { a: 0, b: 1 },
                { a: 1, b: 0 },
                { a: 1, b: 1 },
              ].map((row, idx) => {
                let resultBit: number
                switch (operation) {
                  case "and":
                    resultBit = row.a & row.b
                    break
                  case "or":
                    resultBit = row.a | row.b
                    break
                  case "xor":
                    resultBit = row.a ^ row.b
                    break
                  default:
                    resultBit = 0
                }
                return (
                  <div key={idx} className="grid grid-cols-4 gap-px bg-border">
                    <div className="bg-background px-3 py-2 text-xs font-mono text-center">{row.a}</div>
                    <div className="bg-background px-3 py-2 text-xs font-mono text-center">{row.b}</div>
                    <div className="bg-background px-3 py-2 text-xs font-mono text-center font-medium">{resultBit}</div>
                    <div className="bg-background px-3 py-2 text-xs text-muted-foreground text-center">
                      {row.a} {operationSymbols[operation]} {row.b} = {resultBit}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Binary Operations</h4>
            <p className="text-sm text-muted-foreground">
              <strong>Arithmetic operations</strong> work like regular math but in base-2.
              <strong>Bitwise operations</strong> compare individual bits: AND (both must be 1), OR (at least one is 1),
              XOR (exactly one is 1), and NOT (inverts all bits).
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
