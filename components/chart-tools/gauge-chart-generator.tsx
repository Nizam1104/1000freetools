"use client"

import * as React from "react"
import { useState, useMemo, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Download } from "lucide-react"

export default function GaugeChartGenerator() {
  const [chartTitle, setChartTitle] = useState("Performance Gauge")
  const [currentValue, setCurrentValue] = useState(75)
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(100)
  const [gaugeType, setGaugeType] = useState<'semi' | 'full'>('semi')
  const [showZones, setShowZones] = useState(true)
  const [zone1End, setZone1End] = useState(33)
  const [zone2End, setZone2End] = useState(66)
  const [zone1Color, setZone1Color] = useState('#FF6B6B')
  const [zone2Color, setZone2Color] = useState('#FFC658')
  const [zone3Color, setZone3Color] = useState('#4CAF50')
  const [needleColor, setNeedleColor] = useState('#333333')
  const [showValue, setShowValue] = useState(true)
  const [showLabels, setShowLabels] = useState(true)
  const [gaugeThickness, setGaugeThickness] = useState(40)
  const [copied, setCopied] = useState<string | null>(null)

  const normalizedValue = useMemo(() => {
    const range = maxValue - minValue
    return ((currentValue - minValue) / range) * 100
  }, [currentValue, minValue, maxValue])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const downloadChart = useCallback(() => {
    alert("Download functionality would export the chart as PNG/SVG")
  }, [])

  // Calculate gauge angles
  const { startAngle, endAngle, valueAngle } = useMemo(() => {
    if (gaugeType === 'semi') {
      return {
        startAngle: 180,
        endAngle: 0,
        valueAngle: 180 - (normalizedValue / 100) * 180
      }
    } else {
      return {
        startAngle: 270,
        endAngle: 270,
        valueAngle: 270 - (normalizedValue / 100) * 360
      }
    }
  }, [gaugeType, normalizedValue])

  // Generate arc path
  const getArcPath = (
    cx: number,
    cy: number,
    innerRadius: number,
    outerRadius: number,
    startAngle: number,
    endAngle: number
  ) => {
    const start1 = polarToCartesian(cx, cy, outerRadius, startAngle)
    const end1 = polarToCartesian(cx, cy, outerRadius, endAngle)
    const start2 = polarToCartesian(cx, cy, innerRadius, startAngle)
    const end2 = polarToCartesian(cx, cy, innerRadius, endAngle)

    const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0
    const sweep = startAngle > endAngle ? 0 : 1

    return `M ${start1.x} ${start1.y}
            A ${outerRadius} ${outerRadius} 0 ${largeArc} ${sweep} ${end1.x} ${end1.y}
            L ${end2.x} ${end2.y}
            A ${innerRadius} ${innerRadius} 0 ${largeArc} ${1 - sweep} ${start2.x} ${start2.y}
            Z`
  }

  const polarToCartesian = (cx: number, cy: number, radius: number, angle: number) => {
    const rad = (angle - 90) * Math.PI / 180
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad)
    }
  }

  const getZonePath = (zoneStart: number, zoneEnd: number) => {
    if (gaugeType === 'semi') {
      return getArcPath(200, 200, 100, 100 + gaugeThickness, 
        180 - (zoneStart / 100) * 180, 
        180 - (zoneEnd / 100) * 180)
    } else {
      return getArcPath(200, 200, 100, 100 + gaugeThickness,
        270 - (zoneStart / 100) * 360,
        270 - (zoneEnd / 100) * 360)
    }
  }

  const getNeedlePath = () => {
    const cx = 200
    const cy = 200
    const needleLength = gaugeThickness + 20
    const angle = valueAngle

    const rad = (angle - 90) * Math.PI / 180
    const tipX = cx + needleLength * Math.cos(rad)
    const tipY = cy + needleLength * Math.sin(rad)

    // Needle base width
    const baseWidth = 10
    const baseRad = (angle + 90) * Math.PI / 180
    const baseLeftX = cx + baseWidth * Math.cos(baseRad)
    const baseLeftY = cy + baseWidth * Math.sin(baseRad)
    const baseRightX = cx - baseWidth * Math.cos(baseRad)
    const baseRightY = cy - baseWidth * Math.sin(baseRad)

    return `M ${baseLeftX} ${baseLeftY} L ${tipX} ${tipY} L ${baseRightX} ${baseRightY} Z`
  }

  const getTickMarks = () => {
    const ticks = []
    const count = gaugeType === 'semi' ? 6 : 9
    const step = 100 / (count - 1)

    for (let i = 0; i < count; i++) {
      const value = minValue + (maxValue - minValue) * (i / (count - 1))
      const angle = gaugeType === 'semi' 
        ? 180 - (i / (count - 1)) * 180
        : 270 - (i / (count - 1)) * 360

      const rad = (angle - 90) * Math.PI / 180
      const innerR = 100 + gaugeThickness + 5
      const outerR = 100 + gaugeThickness + 15

      const x1 = 200 + innerR * Math.cos(rad)
      const y1 = 200 + innerR * Math.sin(rad)
      const x2 = 200 + outerR * Math.cos(rad)
      const y2 = 200 + outerR * Math.sin(rad)

      ticks.push(
        <g key={i}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#666" strokeWidth={2} />
          {showLabels && (
            <text
              x={200 + (outerR + 20) * Math.cos(rad)}
              y={200 + (outerR + 20) * Math.sin(rad)}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs fill-muted-foreground"
            >
              {Math.round(value)}
            </text>
          )}
        </g>
      )
    }
    return ticks
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="chart-title" className="text-base font-medium">Gauge Chart</Label>
            <Input
              id="chart-title"
              value={chartTitle}
              onChange={(e) => setChartTitle(e.target.value)}
              placeholder="Enter chart title"
              className="max-w-md"
            />
          </div>
          <Button variant="outline" size="sm" onClick={downloadChart}>
            <Download className="size-4 mr-1" />
            Download
          </Button>
        </div>
      </section>

      {/* Value Input */}
      <section className="space-y-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="current-value" className="text-sm">Current Value</Label>
            <Input
              id="current-value"
              type="number"
              value={currentValue}
              onChange={(e) => setCurrentValue(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="min-value" className="text-sm">Minimum</Label>
            <Input
              id="min-value"
              type="number"
              value={minValue}
              onChange={(e) => setMinValue(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-value" className="text-sm">Maximum</Label>
            <Input
              id="max-value"
              type="number"
              value={maxValue}
              onChange={(e) => setMaxValue(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gauge-type" className="text-sm">Gauge Type</Label>
            <Select value={gaugeType} onValueChange={(v) => setGaugeType(v as 'semi' | 'full')}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semi">Semi-Circle</SelectItem>
                <SelectItem value="full">Full Circle</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="value-slider" className="text-sm">Value: {currentValue}</Label>
          <Slider
            id="value-slider"
            value={[currentValue]}
            onValueChange={(v) => setCurrentValue(v[0])}
            min={minValue}
            max={maxValue}
            step={(maxValue - minValue) / 100}
          />
        </div>
      </section>

      {/* Appearance Options */}
      <section className="space-y-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="thickness" className="text-sm">Thickness: {gaugeThickness}px</Label>
            <Slider
              id="thickness"
              value={[gaugeThickness]}
              onValueChange={(v) => setGaugeThickness(v[0])}
              min={20}
              max={80}
              step={5}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="needle-color" className="text-sm">Needle Color</Label>
            <Input
              id="needle-color"
              type="color"
              value={needleColor}
              onChange={(e) => setNeedleColor(e.target.value)}
              className="w-full h-9"
            />
          </div>
          <div className="flex items-center gap-2 pt-6">
            <Switch
              id="show-zones"
              checked={showZones}
              onCheckedChange={setShowZones}
            />
            <Label htmlFor="show-zones" className="text-sm cursor-pointer">Show Zones</Label>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <Switch
              id="show-value"
              checked={showValue}
              onCheckedChange={setShowValue}
            />
            <Label htmlFor="show-value" className="text-sm cursor-pointer">Show Value</Label>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <Switch
              id="show-labels"
              checked={showLabels}
              onCheckedChange={setShowLabels}
            />
            <Label htmlFor="show-labels" className="text-sm cursor-pointer">Show Labels</Label>
          </div>
        </div>

        {showZones && (
          <div className="grid sm:grid-cols-3 gap-4 p-4 rounded-lg border bg-muted/50">
            <div className="space-y-2">
              <Label className="text-xs">Zone 1 (0-{zone1End}%)</Label>
              <Input
                type="color"
                value={zone1Color}
                onChange={(e) => setZone1Color(e.target.value)}
                className="w-full h-8"
              />
              <Input
                type="number"
                value={zone1End}
                onChange={(e) => setZone1End(parseFloat(e.target.value) || 33)}
                className="h-8"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Zone 2 ({zone1End}-{zone2End}%)</Label>
              <Input
                type="color"
                value={zone2Color}
                onChange={(e) => setZone2Color(e.target.value)}
                className="w-full h-8"
              />
              <Input
                type="number"
                value={zone2End}
                onChange={(e) => setZone2End(parseFloat(e.target.value) || 66)}
                className="h-8"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Zone 3 ({zone2End}-100%)</Label>
              <Input
                type="color"
                value={zone3Color}
                onChange={(e) => setZone3Color(e.target.value)}
                className="w-full h-8"
              />
            </div>
          </div>
        )}
      </section>

      {/* Gauge Preview */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Gauge Preview</Label>
        <div className="rounded-lg border bg-background p-6">
          <h3 className="text-lg font-semibold text-center mb-4">{chartTitle}</h3>
          <div className="h-[350px] flex items-center justify-center">
            <svg viewBox="0 0 400 350" className="w-full h-full max-w-[400px]">
              {/* Background */}
              {gaugeType === 'semi' ? (
                <path
                  d={getArcPath(200, 200, 100, 100 + gaugeThickness, 180, 0)}
                  fill="#e5e5e5"
                />
              ) : (
                <circle cx="200" cy="200" r={100 + gaugeThickness} fill="#e5e5e5" />
              )}

              {/* Zones */}
              {showZones && gaugeType === 'semi' && (
                <>
                  <path d={getZonePath(0, zone1End)} fill={zone1Color} />
                  <path d={getZonePath(zone1End, zone2End)} fill={zone2Color} />
                  <path d={getZonePath(zone2End, 100)} fill={zone3Color} />
                </>
              )}

              {showZones && gaugeType === 'full' && (
                <>
                  <path d={getArcPath(200, 200, 100, 100 + gaugeThickness, 270, 270 - (zone1End / 100) * 360)} fill={zone1Color} />
                  <path d={getArcPath(200, 200, 100, 100 + gaugeThickness, 270 - (zone1End / 100) * 360, 270 - (zone2End / 100) * 360)} fill={zone2Color} />
                  <path d={getArcPath(200, 200, 100, 100 + gaugeThickness, 270 - (zone2End / 100) * 360, 270)} fill={zone3Color} />
                </>
              )}

              {/* Value arc */}
              <path
                d={gaugeType === 'semi' 
                  ? getArcPath(200, 200, 100, 100 + gaugeThickness, 180, valueAngle)
                  : getArcPath(200, 200, 100, 100 + gaugeThickness, 270, valueAngle)
                }
                fill="url(#gradient)"
              />

              {/* Gradient definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={zone1Color} />
                  <stop offset="50%" stopColor={zone2Color} />
                  <stop offset="100%" stopColor={zone3Color} />
                </linearGradient>
              </defs>

              {/* Tick marks */}
              {getTickMarks()}

              {/* Needle */}
              <path d={getNeedlePath()} fill={needleColor} />
              <circle cx="200" cy="200" r={8} fill={needleColor} />

              {/* Center value display */}
              {showValue && (
                <g transform="translate(200, 280)">
                  <text
                    textAnchor="middle"
                    className="text-4xl font-bold fill-foreground"
                  >
                    {currentValue}
                  </text>
                  <text
                    y="25"
                    textAnchor="middle"
                    className="text-sm fill-muted-foreground"
                  >
                    out of {maxValue}
                  </text>
                </g>
              )}

              {/* Zone labels */}
              {showZones && showLabels && gaugeType === 'semi' && (
                <>
                  <text x="100" y="320" textAnchor="middle" className="text-xs fill-muted-foreground">Low</text>
                  <text x="200" y="335" textAnchor="middle" className="text-xs fill-muted-foreground">Medium</text>
                  <text x="300" y="320" textAnchor="middle" className="text-xs fill-muted-foreground">High</text>
                </>
              )}
            </svg>
          </div>
        </div>
      </section>

      {/* Status Indicator */}
      <section className="space-y-3">
        <div className={`rounded-lg p-4 text-center ${
          normalizedValue < zone1End 
            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
            : normalizedValue < zone2End
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
        }`}>
          <p className="text-lg font-semibold">
            {normalizedValue < zone1End 
              ? '⚠️ Low Range'
              : normalizedValue < zone2End
              ? '⚡ Medium Range'
              : '✅ High Range'
            }
          </p>
          <p className="text-sm opacity-80">
            Current value is in the {normalizedValue < zone1End ? 'low' : normalizedValue < zone2End ? 'medium' : 'high'} performance zone
          </p>
        </div>
      </section>
    </div>
  )
}
