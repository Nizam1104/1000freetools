"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, RotateCcw } from "lucide-react"

type OhmsLawCalc = "voltage" | "current" | "resistance" | "power_vi" | "power_i2r" | "power_v2r"

export default function OhmsLawCalculator() {
  const [calculationType, setCalculationType] = useState<OhmsLawCalc>("voltage")
  const [inputs, setInputs] = useState<Record<string, string>>({})
  const [result, setResult] = useState<{ value: number; unit: string; formula: string } | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const calculationOptions = [
    { value: "voltage", label: "Voltage (V)", formula: "V = I × R", inputs: ["current", "resistance"], unit: "V" },
    { value: "current", label: "Current (I)", formula: "I = V / R", inputs: ["voltage", "resistance"], unit: "A" },
    { value: "resistance", label: "Resistance (R)", formula: "R = V / I", inputs: ["voltage", "current"], unit: "Ω" },
    { value: "power_vi", label: "Power (P = V×I)", formula: "P = V × I", inputs: ["voltage", "current"], unit: "W" },
    { value: "power_i2r", label: "Power (P = I²×R)", formula: "P = I² × R", inputs: ["current", "resistance"], unit: "W" },
    { value: "power_v2r", label: "Power (P = V²/R)", formula: "P = V² / R", inputs: ["voltage", "resistance"], unit: "W" },
  ]

  const currentCalc = calculationOptions.find((c) => c.value === calculationType)!

  const inputLabels: Record<string, { label: string; unit: string }> = {
    voltage: { label: "Voltage", unit: "V" },
    current: { label: "Current", unit: "A" },
    resistance: { label: "Resistance", unit: "Ω" },
    power: { label: "Power", unit: "W" },
  }

  const calculate = useCallback(() => {
    const getNum = (key: string) => parseFloat(inputs[key]) || 0
    let value: number

    switch (calculationType) {
      case "voltage":
        value = getNum("current") * getNum("resistance")
        break
      case "current":
        value = getNum("voltage") / getNum("resistance")
        break
      case "resistance":
        value = getNum("voltage") / getNum("current")
        break
      case "power_vi":
        value = getNum("voltage") * getNum("current")
        break
      case "power_i2r":
        value = Math.pow(getNum("current"), 2) * getNum("resistance")
        break
      case "power_v2r":
        value = Math.pow(getNum("voltage"), 2) / getNum("resistance")
        break
      default:
        value = 0
    }

    setResult({ value, unit: currentCalc.unit, formula: currentCalc.formula })
  }, [calculationType, inputs, currentCalc])

  const reset = useCallback(() => {
    setInputs({})
    setResult(null)
  }, [])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const handleInputChange = (key: string, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  // Calculate all values when we have enough inputs
  const allValues = useMemo(() => {
    const v = parseFloat(inputs.voltage) || null
    const i = parseFloat(inputs.current) || null
    const r = parseFloat(inputs.resistance) || null

    if (!v || !i || !r) return null

    const p = v * i
    return { voltage: v, current: i, resistance: r, power: p }
  }, [inputs])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Calculation Type */}
      <section className="space-y-3">
        <Label htmlFor="calc-type" className="text-base font-medium">
          Calculate
        </Label>
        <Select value={calculationType} onValueChange={(v) => { setCalculationType(v as OhmsLawCalc); setResult(null) }}>
          <SelectTrigger id="calc-type" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {calculationOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      {/* Formula Display */}
      <section className="rounded-lg border bg-muted/30 p-4 text-center">
        <p className="text-sm text-muted-foreground mb-1">Formula</p>
        <p className="text-2xl font-mono font-semibold">{currentCalc.formula}</p>
      </section>

      {/* Input Fields */}
      <section className="space-y-4">
        <Label className="text-base font-medium">Input Values</Label>
        <div className="grid sm:grid-cols-2 gap-4">
          {currentCalc.inputs.map((inputKey) => {
            const labelInfo = inputLabels[inputKey]
            return (
              <div key={inputKey} className="space-y-2">
                <Label htmlFor={inputKey} className="text-sm">
                  {labelInfo.label} ({labelInfo.unit})
                </Label>
                <Input
                  id={inputKey}
                  type="number"
                  step="any"
                  value={inputs[inputKey] ?? ""}
                  onChange={(e) => handleInputChange(inputKey, e.target.value)}
                  placeholder={`Enter ${labelInfo.label.toLowerCase()}`}
                />
              </div>
            )
          })}
        </div>
      </section>

      {/* Action Buttons */}
      <section className="flex gap-2">
        <Button onClick={calculate} className="flex-1">
          Calculate
        </Button>
        <Button variant="outline" onClick={reset}>
          <RotateCcw className="size-4" />
        </Button>
      </section>

      {/* All Values Summary */}
      {allValues && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold">Circuit Summary</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground">Voltage</p>
              <p className="text-xl font-bold">{allValues.voltage.toFixed(2)} V</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground">Current</p>
              <p className="text-xl font-bold">{allValues.current.toFixed(4)} A</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground">Resistance</p>
              <p className="text-xl font-bold">{allValues.resistance.toFixed(2)} Ω</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground">Power</p>
              <p className="text-xl font-bold">{allValues.power.toFixed(2)} W</p>
            </div>
          </div>
        </section>
      )}

      {/* Result */}
      {result && (
        <section className="rounded-lg border bg-primary/10 p-6 text-center space-y-2">
          <p className="text-sm text-muted-foreground">Result</p>
          <p className="text-4xl font-bold">
            {result.value.toFixed(4)} <span className="text-xl">{result.unit}</span>
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(`${result.value.toFixed(4)} ${result.unit}`, "result")}
          >
            {copied === "result" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
            Copy Result
          </Button>
        </section>
      )}

      {/* Ohm's Law Triangle */}
      <section className="rounded-lg border bg-muted/30 p-6">
        <h3 className="text-base font-semibold mb-4 text-center">Ohm's Law Triangle</h3>
        <div className="flex justify-center">
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Triangle */}
              <polygon points="100,20 180,180 20,180" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
              {/* V at top */}
              <text x="100" y="50" textAnchor="middle" className="text-2xl font-bold fill-current">V</text>
              {/* I and R at bottom */}
              <text x="60" y="160" textAnchor="middle" className="text-2xl font-bold fill-current">I</text>
              <text x="140" y="160" textAnchor="middle" className="text-2xl font-bold fill-current">R</text>
              {/* Division line */}
              <line x1="40" y1="100" x2="160" y2="100" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
              {/* Multiplication symbol */}
              <text x="100" y="160" textAnchor="middle" className="text-xl fill-current">×</text>
            </svg>
          </div>
        </div>
        <p className="text-sm text-muted-foreground text-center mt-4">
          Cover the value you want to find. V over I×R means V = I × R
        </p>
      </section>
    </div>
  )
}
