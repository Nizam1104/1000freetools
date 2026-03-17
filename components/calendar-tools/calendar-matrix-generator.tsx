"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info, Download, Plus, X } from "lucide-react"

interface MatrixItem {
  id: string
  label: string
  value: number
  color: string
}

const COLORS = ["#ef4444", "#f97316", "#f59e0b", "#84cc16", "#22c55e", "#14b8a6", "#3b82f6", "#8b5cf6", "#d946ef"]

export default function CalendarMatrixGenerator() {
  const [matrixName, setMatrixName] = useState("Priority Matrix")
  const [items, setItems] = useState<MatrixItem[]>([
    { id: "1", label: "Task A", value: 8, color: COLORS[0] },
    { id: "2", label: "Task B", value: 5, color: COLORS[1] },
    { id: "3", label: "Task C", value: 3, color: COLORS[2] },
  ])
  const [newItemLabel, setNewItemLabel] = useState("")
  const [newItemValue, setNewItemValue] = useState("5")
  const [newItemColor, setNewItemColor] = useState(COLORS[0])
  const [matrixSize, setMatrixSize] = useState("10")
  const [copied, setCopied] = useState<string | null>(null)

  const addItem = useCallback(() => {
    if (!newItemLabel) return
    const item: MatrixItem = {
      id: Date.now().toString(),
      label: newItemLabel,
      value: parseInt(newItemValue) || 5,
      color: newItemColor,
    }
    setItems((prev) => [...prev, item])
    setNewItemLabel("")
    setNewItemValue("5")
  }, [newItemLabel, newItemValue, newItemColor])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const matrix = useMemo(() => {
    const size = parseInt(matrixSize) || 10
    const grid: (MatrixItem | null)[][] = Array(size).fill(null).map(() => Array(size).fill(null))

    for (const item of items) {
      const row = Math.min(size - 1, Math.floor((item.value / 10) * size))
      const col = Math.floor(Math.random() * size)
      grid[row][col] = item
    }

    return { grid, size }
  }, [items, matrixSize])

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
    setItems([])
  }, [])

  const exportCSV = useCallback(() => {
    const csv = "Label,Value,Color\n" + items.map((i) => `${i.label},${i.value},${i.color}`).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${matrixName.replace(/\s+/g, "_")}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }, [items, matrixName])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Configuration */}
      <section className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="matrix-name">Matrix Name</Label>
            <Input
              id="matrix-name"
              value={matrixName}
              onChange={(e) => setMatrixName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="matrix-size">Matrix Size (1-20)</Label>
            <Input
              id="matrix-size"
              type="number"
              value={matrixSize}
              onChange={(e) => setMatrixSize(e.target.value)}
              min="1"
              max="20"
            />
          </div>
        </div>
      </section>

      {/* Add Item */}
      <section className="space-y-3">
        <Label>Add Matrix Item</Label>
        <div className="grid sm:grid-cols-4 gap-3">
          <Input
            value={newItemLabel}
            onChange={(e) => setNewItemLabel(e.target.value)}
            placeholder="Item label"
            className="sm:col-span-2"
          />
          <Input
            type="number"
            value={newItemValue}
            onChange={(e) => setNewItemValue(e.target.value)}
            placeholder="Value (0-10)"
            min="0"
            max="10"
          />
          <div className="flex gap-2">
            {COLORS.slice(0, 5).map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full border-2 ${newItemColor === color ? "border-primary" : "border-transparent"}`}
                style={{ backgroundColor: color }}
                onClick={() => setNewItemColor(color)}
              />
            ))}
            <Button onClick={addItem} disabled={!newItemLabel} className="flex-1">
              <Plus className="size-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </section>

      {/* Matrix Display */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">{matrixName}</Label>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportCSV} disabled={items.length === 0}>
              <Download className="size-4 mr-1" />
              Export CSV
            </Button>
            <Button variant="ghost" size="sm" onClick={handleClear} disabled={items.length === 0}>
              <Trash2 className="size-4 mr-1" />
              Clear
            </Button>
          </div>
        </div>

        <div className="rounded-lg border bg-background p-4 overflow-auto">
          <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${matrix.size}, minmax(0, 1fr))` }}>
            {matrix.grid.map((row, rowIdx) =>
              row.map((cell, colIdx) => (
                <div
                  key={`${rowIdx}-${colIdx}`}
                  className="aspect-square rounded border flex items-center justify-center text-xs"
                  style={{
                    backgroundColor: cell ? cell.color + "40" : "transparent",
                    borderColor: cell ? cell.color : "hsl(var(--border))",
                  }}
                  title={cell?.label}
                >
                  {cell?.label.substring(0, 2)}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Items List */}
      {items.length > 0 && (
        <section className="space-y-3">
          <Label>Items ({items.length})</Label>
          <div className="rounded-lg border bg-background divide-y">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
                  <span className="font-medium">{item.label}</span>
                  <span className="text-sm text-muted-foreground">Value: {item.value}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
                  <X className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Legend */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="font-medium mb-3">Value Scale</h4>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Low</span>
          <div className="flex-1 h-4 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" />
          <span className="text-sm text-muted-foreground">High</span>
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Calendar Matrix</h4>
            <p className="text-sm text-muted-foreground">
              A calendar matrix is a visual representation of items distributed across a grid.
              Use it for priority matrices, heat maps, resource allocation, or any scenario
              where you need to visualize data distribution across categories.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
