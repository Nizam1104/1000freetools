"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy, Check, Trash2, Info, Upload, Download, Plus, Trash } from "lucide-react"
import { cn } from "@/lib/utils"

interface GradientStop {
  id: string
  offset: number
  color: string
  opacity: number
}

export default function SvgGradientGeneratorEditor() {
  const [svgCode, setSvgCode] = useState<string>("")
  const [gradientType, setGradientType] = useState<"linear" | "radial">("linear")
  const [stops, setStops] = useState<GradientStop[]>([
    { id: "1", offset: 0, color: "#4F46E5", opacity: 1 },
    { id: "2", offset: 100, color: "#7C3AED", opacity: 1 }
  ])
  const [direction, setDirection] = useState<number>(90)
  const [centerX, setCenterX] = useState<number>(50)
  const [centerY, setCenterY] = useState<number>(50)
  const [radius, setRadius] = useState<number>(50)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const addStop = useCallback(() => {
    const newId = (stops.length + 1).toString()
    const lastOffset = stops[stops.length - 1]?.offset || 0
    setStops([...stops, { id: newId, offset: Math.min(100, lastOffset + 25), color: "#000000", opacity: 1 }])
  }, [stops])

  const removeStop = useCallback((id: string) => {
    if (stops.length <= 2) return
    setStops(stops.filter(s => s.id !== id))
  }, [stops])

  const updateStop = useCallback((id: string, field: keyof GradientStop, value: number | string) => {
    setStops(stops.map(s => s.id === id ? { ...s, [field]: value } : s))
  }, [stops])

  const generateGradient = useCallback(() => {
    const gradientId = `gradient-${Date.now()}`
    let gradientDef: string

    if (gradientType === "linear") {
      const radians = (direction * Math.PI) / 180
      const x2 = Math.cos(radians) * 100
      const y2 = Math.sin(radians) * 100

      gradientDef = `<linearGradient id="${gradientId}" x1="0%" y1="0%" x2="${Math.max(0, Math.min(100, x2))}%" y2="${Math.max(0, Math.min(100, y2))}%">
${stops.map(stop => `    <stop offset="${stop.offset}%" stop-color="${stop.color}" stop-opacity="${stop.opacity}" />`).join("\n")}
  </linearGradient>`
    } else {
      gradientDef = `<radialGradient id="${gradientId}" cx="${centerX}%" cy="${centerY}%" r="${radius}%">
${stops.map(stop => `    <stop offset="${stop.offset}%" stop-color="${stop.color}" stop-opacity="${stop.opacity}" />`).join("\n")}
  </radialGradient>`
    }

    const svg = `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${gradientDef}
  </defs>
  <rect width="400" height="400" fill="url(#${gradientId})" />
</svg>`

    setSvgCode(svg)
  }, [gradientType, direction, stops, centerX, centerY, radius])

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
    setStops([
      { id: "1", offset: 0, color: "#4F46E5", opacity: 1 },
      { id: "2", offset: 100, color: "#7C3AED", opacity: 1 }
    ])
    setSvgCode("")
    setError(null)
  }, [])

  const handleDownload = useCallback(() => {
    if (svgCode) {
      const blob = new Blob([svgCode], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "gradient.svg"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [svgCode])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">SVG Gradient Generator & Editor</h2>
        <p className="text-sm text-muted-foreground">
          Create and customize linear or radial gradients for SVG graphics
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Controls */}
        <section className="space-y-4 lg:col-span-1">
          {/* Gradient Type */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Gradient Type</Label>
            <div className="flex gap-2">
              <Button
                variant={gradientType === "linear" ? "default" : "outline"}
                onClick={() => setGradientType("linear")}
                className="flex-1"
              >
                Linear
              </Button>
              <Button
                variant={gradientType === "radial" ? "default" : "outline"}
                onClick={() => setGradientType("radial")}
                className="flex-1"
              >
                Radial
              </Button>
            </div>
          </div>

          {/* Direction for Linear */}
          {gradientType === "linear" && (
            <div className="space-y-2">
              <Label htmlFor="direction">Direction: {direction}°</Label>
              <Input
                id="direction"
                type="range"
                min="0"
                max="360"
                value={direction}
                onChange={(e) => setDirection(Number(e.target.value))}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0°</span>
                <span>90°</span>
                <span>180°</span>
                <span>270°</span>
                <span>360°</span>
              </div>
            </div>
          )}

          {/* Center for Radial */}
          {gradientType === "radial" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="centerX">Center X: {centerX}%</Label>
                <Input
                  id="centerX"
                  type="range"
                  min="0"
                  max="100"
                  value={centerX}
                  onChange={(e) => setCenterX(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="centerY">Center Y: {centerY}%</Label>
                <Input
                  id="centerY"
                  type="range"
                  min="0"
                  max="100"
                  value={centerY}
                  onChange={(e) => setCenterY(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="radius">Radius: {radius}%</Label>
                <Input
                  id="radius"
                  type="range"
                  min="0"
                  max="100"
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                />
              </div>
            </>
          )}

          {/* Color Stops */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Color Stops</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={addStop}
                disabled={stops.length >= 10}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>

            <div className="space-y-2">
              {stops.map((stop, index) => (
                <div key={stop.id} className="flex items-center gap-2 p-2 rounded-lg border">
                  <input
                    type="color"
                    value={stop.color}
                    onChange={(e) => updateStop(stop.id, "color", e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border-0"
                  />
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={stop.offset}
                    onChange={(e) => updateStop(stop.id, "offset", Number(e.target.value))}
                    className="w-16 h-8"
                    placeholder="%"
                  />
                  <span className="text-xs text-muted-foreground">%</span>
                  <Input
                    type="number"
                    min="0"
                    max="1"
                    step="0.1"
                    value={stop.opacity}
                    onChange={(e) => updateStop(stop.id, "opacity", Number(e.target.value))}
                    className="w-16 h-8"
                    placeholder="Opacity"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeStop(stop.id)}
                    disabled={stops.length <= 2}
                    className="h-8 w-8 p-0"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={generateGradient} className="w-full">
            Generate Gradient
          </Button>

          <Button variant="outline" onClick={handleClear} className="w-full">
            <Trash2 className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </section>

        {/* Preview & Code */}
        <section className="space-y-4 lg:col-span-2">
          {/* Preview */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Preview</Label>
            <div className="rounded-lg border bg-muted/30 p-4 min-h-[300px] flex items-center justify-center">
              {svgCode ? (
                <div dangerouslySetInnerHTML={{ __html: svgCode }} className="w-full h-full" />
              ) : (
                <p className="text-muted-foreground">Click "Generate Gradient" to preview</p>
              )}
            </div>
          </div>

          {/* Code */}
          {svgCode && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">SVG Code</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => copyToClipboard(svgCode, "code")}
                    className="h-7"
                  >
                    {copied === "code" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    <span className="text-xs">Copy</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={handleDownload}
                    className="h-7"
                  >
                    <Download className="size-3.5" />
                    <span className="text-xs">Download</span>
                  </Button>
                </div>
              </div>

              <Textarea
                value={svgCode}
                readOnly
                className="font-mono text-sm min-h-[150px] bg-muted/50"
              />
            </div>
          )}
        </section>
      </div>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About SVG Gradients</h4>
            <p className="text-sm text-muted-foreground">
              SVG supports two types of gradients: linear (colors transition along a line) and
              radial (colors transition from a center point outward). Gradients are defined in
              the &lt;defs&gt; section and referenced using fill="url(#gradientId)".
            </p>
            <p className="text-sm text-muted-foreground">
              Color stops define the colors and their positions along the gradient. You can add
              multiple stops to create complex gradient effects. Opacity can be adjusted for
              each stop independently.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
