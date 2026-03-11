"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Copy, Check, Download, Trash2, Plus } from "lucide-react"

interface Circle {
  id: string
  label: string
  items: string
  color: string
  opacity: number
}

interface VennSection {
  id: string
  circles: string[]
  items: string[]
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function VennDiagramMaker() {
  const [chartTitle, setChartTitle] = useState("Venn Diagram")
  const [circleCount, setCircleCount] = useState<2 | 3 | 4>(3)
  const [circles, setCircles] = useState<Circle[]>([
    { id: "A", label: "Set A", items: "Apples\nOranges\nBananas", color: COLORS[0], opacity: 0.5 },
    { id: "B", label: "Set B", items: "Bananas\nGrapes\nMelons", color: COLORS[1], opacity: 0.5 },
    { id: "C", label: "Set C", items: "Bananas\nOranges\nKiwi", color: COLORS[2], opacity: 0.5 },
  ])
  const [overlapSize, setOverlapSize] = useState(50)
  const [showLabels, setShowLabels] = useState(true)
  const [showItems, setShowItems] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const circlePositions = useMemo(() => {
    const basePositions = {
      2: [
        { cx: 300, cy: 250 },
        { cx: 500, cy: 250 },
      ],
      3: [
        { cx: 350, cy: 200 },
        { cx: 250, cy: 350 },
        { cx: 450, cy: 350 },
      ],
      4: [
        { cx: 300, cy: 200 },
        { cx: 200, cy: 320 },
        { cx: 400, cy: 320 },
        { cx: 300, cy: 350 },
      ],
    }
    return basePositions[circleCount] || basePositions[3]
  }, [circleCount])

  const radius = useMemo(() => {
    return 120 + (overlapSize / 100) * 40
  }, [overlapSize])

  const parseItems = (itemsStr: string) => {
    return itemsStr.split("\n").map(i => i.trim()).filter(i => i)
  }

  const vennSections = useMemo((): VennSection[] => {
    const sections: VennSection[] = []
    const circleItems = circles.map(c => ({ id: c.id, items: parseItems(c.items) }))

    // Single circle sections (exclusive)
    circles.forEach((circle, idx) => {
      const items = circleItems[idx].items
      sections.push({
        id: circle.id,
        circles: [circle.id],
        items: [...items]
      })
    })

    // Two-circle intersections
    for (let i = 0; i < circles.length; i++) {
      for (let j = i + 1; j < circles.length; j++) {
        const itemsA = circleItems[i].items
        const itemsB = circleItems[j].items
        const intersection = itemsA.filter(item => itemsB.includes(item))
        if (intersection.length > 0) {
          sections.push({
            id: `${circles[i].id}${circles[j].id}`,
            circles: [circles[i].id, circles[j].id],
            items: intersection
          })
        }
      }
    }

    // Three-circle intersection
    if (circles.length >= 3) {
      const itemsA = circleItems[0]?.items || []
      const itemsB = circleItems[1]?.items || []
      const itemsC = circleItems[2]?.items || []
      const intersection = itemsA.filter(item => itemsB.includes(item) && itemsC.includes(item))
      if (intersection.length > 0) {
        sections.push({
          id: "ABC",
          circles: [circles[0].id, circles[1].id, circles[2].id],
          items: intersection
        })
      }
    }

    return sections
  }, [circles, circleCount])

  const updateCircle = useCallback((id: string, updates: Partial<Circle>) => {
    setCircles(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c))
  }, [])

  const addCircle = useCallback(() => {
    if (circleCount >= 4) return
    const newCount = (circleCount + 1) as 2 | 3 | 4
    setCircleCount(newCount)
    const newCircle: Circle = {
      id: String.fromCharCode(65 + newCount - 1),
      label: `Set ${String.fromCharCode(65 + newCount - 1)}`,
      items: "",
      color: COLORS[newCount - 1] || COLORS[0],
      opacity: 0.5
    }
    setCircles(prev => [...prev, newCircle])
  }, [circleCount])

  const removeCircle = useCallback((id: string) => {
    if (circleCount <= 2) return
    setCircles(prev => prev.filter(c => c.id !== id))
    setCircleCount((circleCount - 1) as 2 | 3 | 4)
  }, [circleCount])

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
    alert("Download functionality would export the diagram as PNG/SVG")
  }, [])

  // Generate circle path for intersections
  const getCirclePath = (cx: number, cy: number, r: number) => {
    return `M ${cx - r} ${cy} 
            A ${r} ${r} 0 1 1 ${cx + r} ${cy} 
            A ${r} ${r} 0 1 1 ${cx - r} ${cy}`
  }

  // Calculate intersection area center
  const getIntersectionCenter = (circleIds: string[]) => {
    const positions = circleIds.map(id => {
      const idx = circles.findIndex(c => c.id === id)
      return circlePositions[idx] || { cx: 400, cy: 250 }
    })
    
    const cx = positions.reduce((sum, p) => sum + p.cx, 0) / positions.length
    const cy = positions.reduce((sum, p) => sum + p.cy, 0) / positions.length
    return { cx, cy }
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="chart-title" className="text-base font-medium">Venn Diagram</Label>
            <Input
              id="chart-title"
              value={chartTitle}
              onChange={(e) => setChartTitle(e.target.value)}
              placeholder="Enter chart title"
              className="max-w-md"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={addCircle} disabled={circleCount >= 4}>
              <Plus className="size-4 mr-1" />
              Add Circle
            </Button>
            <Button variant="outline" size="sm" onClick={downloadChart}>
              <Download className="size-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </section>

      {/* Circle Configuration */}
      <section className="space-y-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {circles.map((circle, idx) => (
            <div key={circle.id} className="rounded-lg border bg-background p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Label className="font-medium">Set {circle.id}</Label>
                {circleCount > 2 && (
                  <Button variant="ghost" size="xs" onClick={() => removeCircle(circle.id)}>
                    <Trash2 className="size-3.5" />
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor={`label-${circle.id}`} className="text-xs">Label</Label>
                <Input
                  id={`label-${circle.id}`}
                  value={circle.label}
                  onChange={(e) => updateCircle(circle.id, { label: e.target.value })}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`items-${circle.id}`} className="text-xs">Items (one per line)</Label>
                <Textarea
                  id={`items-${circle.id}`}
                  value={circle.items}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateCircle(circle.id, { items: e.target.value })}
                  className="font-mono text-xs min-h-[80px]"
                  placeholder="Item 1&#10;Item 2&#10;Item 3"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`color-${circle.id}`} className="text-xs">Color</Label>
                <Input
                  id={`color-${circle.id}`}
                  type="color"
                  value={circle.color}
                  onChange={(e) => updateCircle(circle.id, { color: e.target.value })}
                  className="w-full h-8"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`opacity-${circle.id}`} className="text-xs">Opacity: {circle.opacity}</Label>
                <Slider
                  id={`opacity-${circle.id}`}
                  value={[circle.opacity]}
                  onValueChange={(v) => updateCircle(circle.id, { opacity: v[0] })}
                  min={0.1}
                  max={1}
                  step={0.1}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Options */}
      <section className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="overlap-size" className="text-sm">Overlap Size: {overlapSize}%</Label>
            <Slider
              id="overlap-size"
              value={[overlapSize]}
              onValueChange={(v) => setOverlapSize(v[0])}
              min={20}
              max={80}
              step={5}
            />
          </div>
          <div className="flex items-center gap-4 pt-6">
            <div className="flex items-center gap-2">
              <Switch
                id="show-labels"
                checked={showLabels}
                onCheckedChange={setShowLabels}
              />
              <Label htmlFor="show-labels" className="text-sm cursor-pointer">Show Labels</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="show-items"
                checked={showItems}
                onCheckedChange={setShowItems}
              />
              <Label htmlFor="show-items" className="text-sm cursor-pointer">Show Items in Diagram</Label>
            </div>
          </div>
        </div>
      </section>

      {/* Venn Diagram Preview */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Diagram Preview</Label>
        <div className="rounded-lg border bg-background p-6">
          <h3 className="text-lg font-semibold text-center mb-4">{chartTitle}</h3>
          <div className="h-[500px] flex items-center justify-center">
            <svg viewBox="0 0 800 500" className="w-full h-full max-w-[600px]">
              {/* Define clips for intersections */}
              <defs>
                {circles.map((circle, idx) => (
                  <clipPath key={`clip-${circle.id}`} id={`clip-${circle.id}`}>
                    <circle
                      cx={circlePositions[idx]?.cx || 400}
                      cy={circlePositions[idx]?.cy || 250}
                      r={radius}
                    />
                  </clipPath>
                ))}
              </defs>

              {/* Draw circles with transparency */}
              {circles.map((circle, idx) => {
                const pos = circlePositions[idx]
                if (!pos) return null
                return (
                  <g key={circle.id}>
                    <circle
                      cx={pos.cx}
                      cy={pos.cy}
                      r={radius}
                      fill={circle.color}
                      fillOpacity={circle.opacity}
                      stroke={circle.color}
                      strokeWidth={3}
                    />
                    {showLabels && (
                      <text
                        x={pos.cx}
                        y={pos.cy - radius + 30}
                        textAnchor="middle"
                        className="text-sm font-semibold fill-foreground"
                      >
                        {circle.label}
                      </text>
                    )}
                  </g>
                )
              })}

              {/* Intersection labels */}
              {showItems && vennSections.filter(s => s.circles.length > 1).map((section) => {
                const center = getIntersectionCenter(section.circles)
                return (
                  <g key={section.id}>
                    <foreignObject x={center.cx - 50} y={center.cy - 30} width={100} height={60}>
                      <div className="text-center text-xs bg-background/80 rounded p-1">
                        {section.items.slice(0, 3).map((item, i) => (
                          <div key={i} className="truncate">{item}</div>
                        ))}
                        {section.items.length > 3 && (
                          <div className="text-muted-foreground">+{section.items.length - 3} more</div>
                        )}
                      </div>
                    </foreignObject>
                  </g>
                )
              })}
            </svg>
          </div>
        </div>
      </section>

      {/* Intersection Summary */}
      {vennSections.filter(s => s.circles.length > 1).length > 0 && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold">Intersections</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vennSections.filter(s => s.circles.length > 1).map((section) => (
              <div key={section.id} className="rounded-lg border bg-background p-4">
                <h4 className="font-medium mb-2">
                  {section.circles.join(" ∩ ")}
                </h4>
                <div className="text-sm text-muted-foreground">
                  {section.items.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {section.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No common items</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All Items Summary */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Items by Set</h3>
        <div className="rounded-lg border bg-background overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                {circles.map(circle => (
                  <th key={circle.id} className="p-3 text-left font-medium">{circle.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {circles.map(circle => (
                  <td key={circle.id} className="p-3 align-top">
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {parseItems(circle.items).map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
