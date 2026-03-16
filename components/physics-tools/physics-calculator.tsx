"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, RotateCcw } from "lucide-react"

type CalculationType = "velocity" | "acceleration" | "force" | "kinetic_energy" | "potential_energy" | "momentum" | "power" | "pressure" | "density" | "work"

interface PhysicsResult {
  value: number
  unit: string
  formula: string
  steps: string[]
}

interface CalculationOption {
  value: CalculationType
  label: string
  formula: string
  inputs: { key: string; label: string; unit: string; defaultValue?: string }[]
}

export default function PhysicsCalculator() {
  const [calculationType, setCalculationType] = useState<CalculationType>("velocity")
  const [inputs, setInputs] = useState<Record<string, string>>({})
  const [result, setResult] = useState<PhysicsResult | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const calculationOptions: CalculationOption[] = [
    {
      value: "velocity",
      label: "Velocity",
      formula: "v = d / t",
      inputs: [
        { key: "distance", label: "Distance", unit: "m" },
        { key: "time", label: "Time", unit: "s" },
      ],
    },
    {
      value: "acceleration",
      label: "Acceleration",
      formula: "a = (v_f - v_i) / t",
      inputs: [
        { key: "vf", label: "Final Velocity", unit: "m/s" },
        { key: "vi", label: "Initial Velocity", unit: "m/s" },
        { key: "time", label: "Time", unit: "s" },
      ],
    },
    {
      value: "force",
      label: "Force",
      formula: "F = m × a",
      inputs: [
        { key: "mass", label: "Mass", unit: "kg" },
        { key: "acceleration", label: "Acceleration", unit: "m/s²" },
      ],
    },
    {
      value: "kinetic_energy",
      label: "Kinetic Energy",
      formula: "KE = ½ × m × v²",
      inputs: [
        { key: "mass", label: "Mass", unit: "kg" },
        { key: "velocity", label: "Velocity", unit: "m/s" },
      ],
    },
    {
      value: "potential_energy",
      label: "Potential Energy",
      formula: "PE = m × g × h",
      inputs: [
        { key: "mass", label: "Mass", unit: "kg" },
        { key: "height", label: "Height", unit: "m" },
        { key: "gravity", label: "Gravity", unit: "m/s²", defaultValue: "9.81" },
      ],
    },
    {
      value: "momentum",
      label: "Momentum",
      formula: "p = m × v",
      inputs: [
        { key: "mass", label: "Mass", unit: "kg" },
        { key: "velocity", label: "Velocity", unit: "m/s" },
      ],
    },
    {
      value: "power",
      label: "Power",
      formula: "P = W / t",
      inputs: [
        { key: "work", label: "Work", unit: "J" },
        { key: "time", label: "Time", unit: "s" },
      ],
    },
    {
      value: "pressure",
      label: "Pressure",
      formula: "P = F / A",
      inputs: [
        { key: "force", label: "Force", unit: "N" },
        { key: "area", label: "Area", unit: "m²" },
      ],
    },
    {
      value: "density",
      label: "Density",
      formula: "ρ = m / V",
      inputs: [
        { key: "mass", label: "Mass", unit: "kg" },
        { key: "volume", label: "Volume", unit: "m³" },
      ],
    },
    {
      value: "work",
      label: "Work",
      formula: "W = F × d × cos(θ)",
      inputs: [
        { key: "force", label: "Force", unit: "N" },
        { key: "distance", label: "Distance", unit: "m" },
        { key: "angle", label: "Angle", unit: "degrees", defaultValue: "0" },
      ],
    },
  ]

  const currentCalculation = calculationOptions.find((c) => c.value === calculationType)!

  const calculate = useCallback(() => {
    const getNum = (key: string) => parseFloat(inputs[key]) || 0

    let value: number
    let unit: string
    let steps: string[] = []

    switch (calculationType) {
      case "velocity":
        value = getNum("distance") / getNum("time")
        unit = "m/s"
        steps = [
          `v = d / t`,
          `v = ${getNum("distance")} m / ${getNum("time")} s`,
          `v = ${value.toFixed(4)} m/s`,
        ]
        break
      case "acceleration":
        value = (getNum("vf") - getNum("vi")) / getNum("time")
        unit = "m/s²"
        steps = [
          `a = (v_f - v_i) / t`,
          `a = (${getNum("vf")} - ${getNum("vi")}) / ${getNum("time")}`,
          `a = ${value.toFixed(4)} m/s²`,
        ]
        break
      case "force":
        value = getNum("mass") * getNum("acceleration")
        unit = "N"
        steps = [
          `F = m × a`,
          `F = ${getNum("mass")} kg × ${getNum("acceleration")} m/s²`,
          `F = ${value.toFixed(4)} N`,
        ]
        break
      case "kinetic_energy":
        value = 0.5 * getNum("mass") * Math.pow(getNum("velocity"), 2)
        unit = "J"
        steps = [
          `KE = ½ × m × v²`,
          `KE = 0.5 × ${getNum("mass")} kg × (${getNum("velocity")} m/s)²`,
          `KE = ${value.toFixed(4)} J`,
        ]
        break
      case "potential_energy":
        const g = getNum("gravity") || 9.81
        value = getNum("mass") * g * getNum("height")
        unit = "J"
        steps = [
          `PE = m × g × h`,
          `PE = ${getNum("mass")} kg × ${g} m/s² × ${getNum("height")} m`,
          `PE = ${value.toFixed(4)} J`,
        ]
        break
      case "momentum":
        value = getNum("mass") * getNum("velocity")
        unit = "kg·m/s"
        steps = [
          `p = m × v`,
          `p = ${getNum("mass")} kg × ${getNum("velocity")} m/s`,
          `p = ${value.toFixed(4)} kg·m/s`,
        ]
        break
      case "power":
        value = getNum("work") / getNum("time")
        unit = "W"
        steps = [
          `P = W / t`,
          `P = ${getNum("work")} J / ${getNum("time")} s`,
          `P = ${value.toFixed(4)} W`,
        ]
        break
      case "pressure":
        value = getNum("force") / getNum("area")
        unit = "Pa"
        steps = [
          `P = F / A`,
          `P = ${getNum("force")} N / ${getNum("area")} m²`,
          `P = ${value.toFixed(4)} Pa`,
        ]
        break
      case "density":
        value = getNum("mass") / getNum("volume")
        unit = "kg/m³"
        steps = [
          `ρ = m / V`,
          `ρ = ${getNum("mass")} kg / ${getNum("volume")} m³`,
          `ρ = ${value.toFixed(4)} kg/m³`,
        ]
        break
      case "work":
        const angleRad = (getNum("angle") * Math.PI) / 180
        value = getNum("force") * getNum("distance") * Math.cos(angleRad)
        unit = "J"
        steps = [
          `W = F × d × cos(θ)`,
          `W = ${getNum("force")} N × ${getNum("distance")} m × cos(${getNum("angle")}°)`,
          `W = ${value.toFixed(4)} J`,
        ]
        break
      default:
        value = 0
        unit = ""
        steps = []
    }

    setResult({ value, unit, formula: currentCalculation.formula, steps })
  }, [calculationType, inputs, currentCalculation])

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

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Calculation Type */}
      <section className="space-y-3">
        <Label htmlFor="calc-type" className="text-base font-medium">
          Calculation Type
        </Label>
        <Select value={calculationType} onValueChange={(v) => { setCalculationType(v as CalculationType); setResult(null); setInputs({}) }}>
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
      <section className="rounded-lg border bg-muted/30 p-4">
        <p className="text-sm text-muted-foreground mb-1">Formula</p>
        <p className="text-xl font-mono font-semibold">{currentCalculation.formula}</p>
      </section>

      {/* Input Fields */}
      <section className="space-y-4">
        <Label className="text-base font-medium">Input Values</Label>
        <div className="grid sm:grid-cols-2 gap-4">
          {currentCalculation.inputs.map((input) => (
            <div key={input.key} className="space-y-2">
              <Label htmlFor={input.key} className="text-sm">
                {input.label} ({input.unit})
              </Label>
              <Input
                id={input.key}
                type="number"
                step="any"
                value={inputs[input.key] ?? input.defaultValue ?? ""}
                onChange={(e) => handleInputChange(input.key, e.target.value)}
                placeholder={`Enter ${input.label.toLowerCase()}`}
              />
            </div>
          ))}
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

      {/* Result */}
      {result && (
        <section className="space-y-4">
          <div className="rounded-lg border bg-primary/10 p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Result</p>
            <p className="text-4xl font-bold">
              {result.value.toFixed(4)} <span className="text-xl">{result.unit}</span>
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Step-by-Step Solution</h3>
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(result.steps.join("\n"), "steps")}>
                {copied === "steps" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                Copy Steps
              </Button>
            </div>
            <div className="rounded-lg border bg-background divide-y">
              {result.steps.map((step, idx) => (
                <div key={idx} className="p-3 font-mono text-sm">
                  <span className="text-muted-foreground mr-3">{idx + 1}.</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
