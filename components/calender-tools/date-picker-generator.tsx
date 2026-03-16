"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Code, Eye, Palette, Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"

interface DatePickerConfig {
  dateFormat: string
  minDate: string
  maxDate: string
  disabledDates: string[]
  firstDayOfWeek: number
  showWeekNumbers: boolean
  theme: "light" | "dark" | "auto"
  primaryColor: string
  borderRadius: number
  fontSize: number
  language: string
  enableTime: boolean
  mode: "single" | "multiple" | "range"
  inline: boolean
  showShortcuts: boolean
}

const DATE_FORMATS = [
  { value: "MM/dd/yyyy", label: "MM/DD/YYYY (US)" },
  { value: "dd/MM/yyyy", label: "DD/MM/YYYY (EU)" },
  { value: "yyyy-MM-dd", label: "YYYY-MM-DD (ISO)" },
  { value: "MMMM d, yyyy", label: "Month D, YYYY" },
  { value: "d MMMM yyyy", label: "D Month YYYY" },
  { value: "MMM d, yyyy", label: "Mon D, YYYY" },
  { value: "dd-MM-yyyy", label: "DD-MM-YYYY" },
]

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "it", label: "Italian" },
  { value: "pt", label: "Portuguese" },
  { value: "ru", label: "Russian" },
  { value: "zh", label: "Chinese" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
  { value: "ar", label: "Arabic" },
  { value: "hi", label: "Hindi" },
]

const COLORS = [
  { value: "#3b82f6", label: "Blue", class: "bg-blue-500" },
  { value: "#8b5cf6", label: "Purple", class: "bg-purple-500" },
  { value: "#ec4899", label: "Pink", class: "bg-pink-500" },
  { value: "#ef4444", label: "Red", class: "bg-red-500" },
  { value: "#f97316", label: "Orange", class: "bg-orange-500" },
  { value: "#eab308", label: "Yellow", class: "bg-yellow-500" },
  { value: "#22c55e", label: "Green", class: "bg-green-500" },
  { value: "#14b8a6", label: "Teal", class: "bg-teal-500" },
  { value: "#06b6d4", label: "Cyan", class: "bg-cyan-500" },
  { value: "#6366f1", label: "Indigo", class: "bg-indigo-500" },
]

export default function DatePickerGenerator() {
  const [config, setConfig] = useState<DatePickerConfig>({
    dateFormat: "MM/dd/yyyy",
    minDate: "",
    maxDate: "",
    disabledDates: [],
    firstDayOfWeek: 0,
    showWeekNumbers: false,
    theme: "light",
    primaryColor: "#3b82f6",
    borderRadius: 8,
    fontSize: 14,
    language: "en",
    enableTime: false,
    mode: "single",
    inline: false,
    showShortcuts: true,
  })

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [copied, setCopied] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(true)
  const [disabledDateInput, setDisabledDateInput] = useState("")

  const generateHTML = useMemo(() => {
    const shortcuts = config.showShortcuts ? `
    <div class="dp-shortcuts">
      <button type="button" data-shortcut="today">Today</button>
      <button type="button" data-shortcut="tomorrow">Tomorrow</button>
      <button type="button" data-shortcut="next-week">Next Week</button>
      <button type="button" data-shortcut="next-month">Next Month</button>
    </div>` : ""

    return `<!-- Date Picker Container -->
<div class="date-picker-container" id="date-picker-${Math.random().toString(36).substr(2, 9)}">
  <input type="text" class="date-picker-input" placeholder="Select date" readonly />
  ${shortcuts}
  <div class="date-picker-calendar"></div>
</div>`
  }, [config.showShortcuts])

  const generateCSS = useMemo(() => {
    return `/* Date Picker Styles */
.date-picker-container {
  position: relative;
  width: 100%;
  max-width: 300px;
  font-family: system-ui, -apple-system, sans-serif;
}

.date-picker-input {
  width: 100%;
  padding: 10px 14px;
  font-size: ${config.fontSize}px;
  border: 1px solid #d1d5db;
  border-radius: ${config.borderRadius}px;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.date-picker-input:focus {
  outline: none;
  border-color: ${config.primaryColor};
  box-shadow: 0 0 0 3px ${config.primaryColor}20;
}

.date-picker-calendar {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  padding: 12px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: ${config.borderRadius}px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: none;
}

.date-picker-calendar.open {
  display: block;
}

.dp-shortcuts {
  display: flex;
  gap: 4px;
  padding: 8px 0;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 8px;
}

.dp-shortcuts button {
  padding: 4px 8px;
  font-size: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background: #f9fafb;
  cursor: pointer;
  transition: all 0.2s;
}

.dp-shortcuts button:hover {
  background: ${config.primaryColor};
  color: #fff;
  border-color: ${config.primaryColor};
}

/* Calendar Grid */
.dp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.dp-month-label {
  font-weight: 600;
  font-size: ${config.fontSize}px;
}

.dp-nav-btn {
  padding: 4px 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 4px;
}

.dp-nav-btn:hover {
  background: #f3f4f6;
}

.dp-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin-bottom: 4px;
}

.dp-weekday {
  text-align: center;
  font-size: 11px;
  font-weight: 500;
  color: #6b7280;
  padding: 4px;
}

.dp-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.dp-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${config.fontSize - 2}px;
  border-radius: ${config.borderRadius / 2}px;
  cursor: pointer;
  transition: all 0.15s;
}

.dp-day:hover:not(.disabled) {
  background: #f3f4f6;
}

.dp-day.selected {
  background: ${config.primaryColor};
  color: #fff;
}

.dp-day.today {
  border: 2px solid ${config.primaryColor};
}

.dp-day.disabled {
  color: #d1d5db;
  cursor: not-allowed;
}

.dp-day.other-month {
  color: #d1d5db;
}`
  }, [config])

  const generateJS = useMemo(() => {
    return `// Date Picker JavaScript
(function() {
  const config = {
    dateFormat: "${config.dateFormat}",
    minDate: ${config.minDate ? `"${config.minDate}"` : "null"},
    maxDate: ${config.maxDate ? `"${config.maxDate}"` : "null"},
    firstDayOfWeek: ${config.firstDayOfWeek},
    language: "${config.language}",
    mode: "${config.mode}",
    enableTime: ${config.enableTime},
  };

  class DatePicker {
    constructor(container) {
      this.container = container;
      this.input = container.querySelector('.date-picker-input');
      this.calendar = container.querySelector('.date-picker-calendar');
      this.selectedDate = null;
      this.currentMonth = new Date().getMonth();
      this.currentYear = new Date().getFullYear();
      
      this.init();
    }

    init() {
      this.input.addEventListener('click', () => this.toggle());
      document.addEventListener('click', (e) => {
        if (!this.container.contains(e.target)) {
          this.close();
        }
      });

      // Shortcut handlers
      container.querySelectorAll('[data-shortcut]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const shortcut = e.target.dataset.shortcut;
          this.handleShortcut(shortcut);
        });
      });

      this.render();
    }

    toggle() {
      this.calendar.classList.toggle('open');
      if (this.calendar.classList.contains('open')) {
        this.render();
      }
    }

    close() {
      this.calendar.classList.remove('open');
    }

    handleShortcut(shortcut) {
      const today = new Date();
      let date = new Date(today);

      switch(shortcut) {
        case 'today':
          break;
        case 'tomorrow':
          date.setDate(date.getDate() + 1);
          break;
        case 'next-week':
          date.setDate(date.getDate() + 7);
          break;
        case 'next-month':
          date.setMonth(date.getMonth() + 1);
          break;
      }

      this.selectDate(date);
    }

    selectDate(date) {
      this.selectedDate = date;
      this.input.value = this.formatDate(date);
      this.close();
      
      // Dispatch custom event
      this.container.dispatchEvent(new CustomEvent('dateSelected', {
        detail: { date, formatted: this.input.value }
      }));
    }

    formatDate(date) {
      const formats = {
        'MM/dd/yyyy': d => \`\${(d.getMonth()+1).toString().padStart(2,'0')}/\${d.getDate().toString().padStart(2,'0')}/\${d.getFullYear()}\`,
        'dd/MM/yyyy': d => \`\${d.getDate().toString().padStart(2,'0')}/\${(d.getMonth()+1).toString().padStart(2,'0')}/\${d.getFullYear()}\`,
        'yyyy-MM-dd': d => \`\${d.getFullYear()}-\${(d.getMonth()+1).toString().padStart(2,'0')}-\${d.getDate().toString().padStart(2,'0')}\`,
        'MMMM d, yyyy': d => d.toLocaleDateString('${config.language}', { month: 'long', day: 'numeric', year: 'numeric' }),
        'd MMMM yyyy': d => d.toLocaleDateString('${config.language}', { day: 'numeric', month: 'long', year: 'numeric' }),
        'MMM d, yyyy': d => d.toLocaleDateString('${config.language}', { month: 'short', day: 'numeric', year: 'numeric' }),
        'dd-MM-yyyy': d => \`\${d.getDate().toString().padStart(2,'0')}-\${(d.getMonth()+1).toString().padStart(2,'0')}-\${d.getFullYear()}\`,
      };
      return (formats['${config.dateFormat}'] || formats['MM/dd/yyyy'])(date);
    }

    render() {
      // Render calendar implementation
      console.log('Rendering calendar for', this.currentMonth, this.currentYear);
    }
  }

  // Initialize all date pickers
  document.querySelectorAll('.date-picker-container').forEach(container => {
    new DatePicker(container);
  });
})();`
  }, [config])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const addDisabledDate = useCallback(() => {
    if (disabledDateInput && !config.disabledDates.includes(disabledDateInput)) {
      setConfig(prev => ({
        ...prev,
        disabledDates: [...prev.disabledDates, disabledDateInput]
      }))
      setDisabledDateInput("")
    }
  }, [disabledDateInput, config.disabledDates])

  const removeDisabledDate = useCallback((date: string) => {
    setConfig(prev => ({
      ...prev,
      disabledDates: prev.disabledDates.filter(d => d !== date)
    }))
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Configuration Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="size-5" />
            Date Picker Configuration
          </CardTitle>
          <CardDescription>
            Customize your embeddable date picker widget
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Settings */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Basic Settings</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date-format">Date Format</Label>
                <Select
                  value={config.dateFormat}
                  onValueChange={(v) => setConfig(prev => ({ ...prev, dateFormat: v }))}
                >
                  <SelectTrigger id="date-format">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DATE_FORMATS.map((fmt) => (
                      <SelectItem key={fmt.value} value={fmt.value}>{fmt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={config.language}
                  onValueChange={(v) => setConfig(prev => ({ ...prev, language: v }))}
                >
                  <SelectTrigger id="language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mode">Selection Mode</Label>
                <Select
                  value={config.mode}
                  onValueChange={(v) => setConfig(prev => ({ ...prev, mode: v as typeof config.mode }))}
                >
                  <SelectTrigger id="mode">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single Date</SelectItem>
                    <SelectItem value="multiple">Multiple Dates</SelectItem>
                    <SelectItem value="range">Date Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Date Constraints */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Date Constraints</h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min-date">Minimum Date</Label>
                <Input
                  id="min-date"
                  type="date"
                  value={config.minDate}
                  onChange={(e) => setConfig(prev => ({ ...prev, minDate: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-date">Maximum Date</Label>
                <Input
                  id="max-date"
                  type="date"
                  value={config.maxDate}
                  onChange={(e) => setConfig(prev => ({ ...prev, maxDate: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Disabled Dates</Label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={disabledDateInput}
                  onChange={(e) => setDisabledDateInput(e.target.value)}
                  placeholder="Select date to disable"
                />
                <Button onClick={addDisabledDate} variant="outline" size="sm">Add</Button>
              </div>
              {config.disabledDates.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {config.disabledDates.map((date) => (
                    <button
                      key={date}
                      onClick={() => removeDisabledDate(date)}
                      className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-muted rounded-md hover:bg-destructive/20 hover:text-destructive transition-colors"
                    >
                      {date}
                      <span className="text-muted-foreground hover:text-destructive">×</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Appearance */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Appearance</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select
                  value={config.theme}
                  onValueChange={(v) => setConfig(prev => ({ ...prev, theme: v as typeof config.theme }))}
                >
                  <SelectTrigger id="theme">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="auto">Auto (System)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <Select
                  value={config.primaryColor}
                  onValueChange={(v) => setConfig(prev => ({ ...prev, primaryColor: v }))}
                >
                  <SelectTrigger id="primary-color">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COLORS.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center gap-2">
                          <div className={cn("size-4 rounded", color.class)} />
                          {color.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="border-radius">Border Radius: {config.borderRadius}px</Label>
                <Slider
                  id="border-radius"
                  min={0}
                  max={16}
                  step={1}
                  value={[config.borderRadius]}
                  onValueChange={([v]) => setConfig(prev => ({ ...prev, borderRadius: v }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="font-size">Font Size: {config.fontSize}px</Label>
                <Slider
                  id="font-size"
                  min={10}
                  max={20}
                  step={1}
                  value={[config.fontSize]}
                  onValueChange={([v]) => setConfig(prev => ({ ...prev, fontSize: v }))}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="show-week-numbers"
                  checked={config.showWeekNumbers}
                  onCheckedChange={(checked) => setConfig(prev => ({ ...prev, showWeekNumbers: checked as boolean }))}
                />
                <Label htmlFor="show-week-numbers" className="cursor-pointer text-sm">Show Week Numbers</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="enable-time"
                  checked={config.enableTime}
                  onCheckedChange={(checked) => setConfig(prev => ({ ...prev, enableTime: checked as boolean }))}
                />
                <Label htmlFor="enable-time" className="cursor-pointer text-sm">Enable Time Selection</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="inline"
                  checked={config.inline}
                  onCheckedChange={(checked) => setConfig(prev => ({ ...prev, inline: checked as boolean }))}
                />
                <Label htmlFor="inline" className="cursor-pointer text-sm">Inline Mode</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="show-shortcuts"
                  checked={config.showShortcuts}
                  onCheckedChange={(checked) => setConfig(prev => ({ ...prev, showShortcuts: checked as boolean }))}
                />
                <Label htmlFor="show-shortcuts" className="cursor-pointer text-sm">Show Shortcuts</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Eye className="size-5" />
                Live Preview
              </CardTitle>
              <CardDescription>See how your date picker will look</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? "Hide" : "Show"} Preview
            </Button>
          </div>
        </CardHeader>
        {showPreview && (
          <CardContent>
            <div className="flex items-center justify-center p-8 border rounded-lg bg-muted/30">
              <div
                className="relative"
                style={{
                  borderRadius: config.borderRadius,
                  fontSize: config.fontSize,
                }}
              >
                <div className="space-y-2">
                  <div
                    className="w-64 p-3 border rounded-lg cursor-pointer bg-background hover:border-primary/50 transition-colors"
                    style={{
                      borderRadius: config.borderRadius,
                      borderColor: config.primaryColor,
                    }}
                  >
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CalendarIcon className="size-4" style={{ color: config.primaryColor }} />
                      <span>{selectedDate ? selectedDate.toLocaleDateString() : "Select a date"}</span>
                    </div>
                  </div>
                  {config.showShortcuts && (
                    <div className="flex gap-1">
                      {["Today", "Tomorrow", "Next Week"].map((shortcut) => (
                        <button
                          key={shortcut}
                          className="px-2 py-1 text-xs border rounded hover:text-white transition-colors"
                          style={{
                            borderRadius: config.borderRadius / 2,
                            borderColor: "#e5e7eb",
                          }}
                        >
                          {shortcut}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div
                  className="absolute top-full left-0 mt-2 p-4 border rounded-lg shadow-lg bg-background"
                  style={{
                    borderRadius: config.borderRadius,
                    borderColor: "#e5e7eb",
                  }}
                >
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border-0"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Generated Code */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="size-5" />
            Generated Code
          </CardTitle>
          <CardDescription>
            Copy and paste this code into your website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* HTML */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>HTML</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(generateHTML, "html")}
              >
                {copied === "html" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                Copy
              </Button>
            </div>
            <Textarea
              value={generateHTML}
              readOnly
              className="font-mono text-xs h-24"
            />
          </div>

          {/* CSS */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>CSS</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(generateCSS, "css")}
              >
                {copied === "css" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                Copy
              </Button>
            </div>
            <Textarea
              value={generateCSS}
              readOnly
              className="font-mono text-xs h-48"
            />
          </div>

          {/* JavaScript */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>JavaScript</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(generateJS, "js")}
              >
                {copied === "js" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                Copy
              </Button>
            </div>
            <Textarea
              value={generateJS}
              readOnly
              className="font-mono text-xs h-64"
            />
          </div>

          <div className="pt-4">
            <Button
              onClick={() => copyToClipboard(
                `${generateHTML}\n\n<style>\n${generateCSS}\n</style>\n\n<script>\n${generateJS}\n</script>`,
                "all"
              )}
              className="w-full"
            >
              {copied === "all" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
              Copy All Code
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
