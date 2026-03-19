"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info, Code } from "lucide-react"

export default function DatePickerGenerator() {
  const [minDate, setMinDate] = useState<string>("")
  const [maxDate, setMaxDate] = useState<string>("")
  const [defaultValue, setDefaultValue] = useState<string>("")
  const [disabledDates, setDisabledDates] = useState<string>("")
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<"0" | "1">("0")
  const [showWeekNumbers, setShowWeekNumbers] = useState(false)
  const [format, setFormat] = useState<"YYYY-MM-DD" | "MM/DD/YYYY" | "DD/MM/YYYY">("YYYY-MM-DD")
  const [copied, setCopied] = useState<string | null>(null)

  const generateHTML = useMemo(() => {
    let html = `<input type="date"`
    
    if (minDate) html += ` min="${minDate}"`
    if (maxDate) html += ` max="${maxDate}"`
    if (defaultValue) html += ` value="${defaultValue}"`
    
    html += ` />`
    
    return html
  }, [minDate, maxDate, defaultValue])

  const generateReact = useMemo(() => {
    let code = `function DatePicker() {\n`
    code += `  const [date, setDate] = useState(${defaultValue ? `"${defaultValue}"` : '""'});\n\n`
    code += `  return (\n`
    code += `    <input\n`
    code += `      type="date"\n`
    code += `      value={date}\n`
    code += `      onChange={(e) => setDate(e.target.value)}\n`
    
    if (minDate) code += `      min="${minDate}"\n`
    if (maxDate) code += `      max="${maxDate}"\n`
    if (firstDayOfWeek === "1") code += `      // Note: Set locale for Monday start\n`
    
    code += `    />\n`
    code += `  );\n`
    code += `}`
    
    return code
  }, [minDate, maxDate, defaultValue, firstDayOfWeek])

  const generateVue = useMemo(() => {
    let code = `<template>\n`
    code += `  <input\n`
    code += `    type="date"\n`
    code += `    v-model="date"\n`
    
    if (minDate) code += `    :min="'${minDate}'"\n`
    if (maxDate) code += `    :max="'${maxDate}'"\n`
    
    code += `  />\n`
    code += `</template>\n\n`
    code += `<script setup>\n`
    code += `import { ref } from 'vue'\n`
    code += `const date = ref(${defaultValue ? `"${defaultValue}"` : '""'})\n`
    code += `</script>`
    
    return code
  }, [minDate, maxDate, defaultValue])

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
    setMinDate("")
    setMaxDate("")
    setDefaultValue("")
    setDisabledDates("")
  }, [])

  const previewDate = useMemo(() => {
    if (!defaultValue) return null
    const date = new Date(defaultValue)
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }, [defaultValue])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Configuration */}
      <section className="space-y-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="min-date">Minimum Date</Label>
            <Input
              id="min-date"
              type="date"
              value={minDate}
              onChange={(e) => setMinDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-date">Maximum Date</Label>
            <Input
              id="max-date"
              type="date"
              value={maxDate}
              onChange={(e) => setMaxDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="default-value">Default Value</Label>
            <Input
              id="default-value"
              type="date"
              value={defaultValue}
              onChange={(e) => setDefaultValue(e.target.value)}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-day">First Day of Week</Label>
            <Select value={firstDayOfWeek} onValueChange={(v) => setFirstDayOfWeek(v as "0" | "1")}>
              <SelectTrigger id="first-day">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Sunday</SelectItem>
                <SelectItem value="1">Monday</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="format">Date Format</Label>
            <Select value={format} onValueChange={(v) => setFormat(v as any)}>
              <SelectTrigger id="format">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="week-numbers"
              checked={showWeekNumbers}
              onChange={(e) => setShowWeekNumbers(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="week-numbers" className="text-sm cursor-pointer">Show Week Numbers</Label>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="disabled-dates">Disabled Dates (comma-separated)</Label>
          <Input
            id="disabled-dates"
            value={disabledDates}
            onChange={(e) => setDisabledDates(e.target.value)}
            placeholder="2024-12-25, 2024-01-01"
          />
        </div>

        <Button variant="ghost" size="sm" onClick={handleClear} className="w-full">
          <Trash2 className="size-4 mr-2" />
          Clear
        </Button>
      </section>

      {/* Preview */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Live Preview</Label>
        <div className="rounded-lg border bg-background p-6">
          <div className="flex items-center gap-4">
            <input
              type="date"
              min={minDate || undefined}
              max={maxDate || undefined}
              defaultValue={defaultValue || undefined}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            {previewDate && (
              <p className="text-sm text-muted-foreground">{previewDate}</p>
            )}
          </div>
        </div>
      </section>

      {/* Code Snippets */}
      <section className="space-y-4">
        <Label className="text-base font-medium">Generated Code</Label>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">HTML</Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(generateHTML, "html")}
              className="h-7"
            >
              {copied === "html" ? <Check className="size-3.5" /> : <Code className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <pre className="font-mono text-sm overflow-auto">{generateHTML}</pre>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">React</Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(generateReact, "react")}
              className="h-7"
            >
              {copied === "react" ? <Check className="size-3.5" /> : <Code className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <pre className="font-mono text-sm overflow-auto">{generateReact}</pre>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Vue</Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(generateVue, "vue")}
              className="h-7"
            >
              {copied === "vue" ? <Check className="size-3.5" /> : <Code className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <pre className="font-mono text-sm overflow-auto">{generateVue}</pre>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Date Picker</h4>
            <p className="text-sm text-muted-foreground">
              Generate date picker input code for HTML, React, or Vue. Configure min/max dates,
              default values, and formatting options. The native HTML5 date input provides
              built-in calendar functionality across modern browsers.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
