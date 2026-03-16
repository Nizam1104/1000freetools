"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Copy, Check } from "lucide-react"

const FONT_STYLES = [
  { name: "Normal", transform: (text: string) => text },
  { name: "Bold", transform: (text: string) => text.replace(/[a-z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 119744)).replace(/[A-Z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 119718)) },
  { name: "Italic", transform: (text: string) => text.replace(/[a-z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 119806)).replace(/[A-Z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 119780)) },
  { name: "Bold Italic", transform: (text: string) => text.replace(/[a-z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 119858)).replace(/[A-Z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 119832)) },
  { name: "Script", transform: (text: string) => text.replace(/[a-z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 119910)).replace(/[A-Z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 119884)) },
  { name: "Bold Script", transform: (text: string) => text.replace(/[a-z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 119962)).replace(/[A-Z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 119936)) },
  { name: "Fraktur", transform: (text: string) => text.replace(/[a-z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 120014)).replace(/[A-Z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 119988)) },
  { name: "Bold Fraktur", transform: (text: string) => text.replace(/[a-z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 120066)).replace(/[A-Z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 120040)) },
  { name: "Double-Struck", transform: (text: string) => text.replace(/[a-z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 120118)).replace(/[A-Z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 120092)) },
  { name: "Monospace", transform: (text: string) => text.replace(/[a-z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 120170)).replace(/[A-Z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 120144)) },
  { name: "Small Caps", transform: (text: string) => text.replace(/[a-z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 8256)).replace(/[A-Z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 120196)) },
  { name: "Circled", transform: (text: string) => text.replace(/[a-z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 9399)).replace(/[A-Z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 9343)) },
  { name: "Squared", transform: (text: string) => text.replace(/[a-z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 120222)).replace(/[A-Z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 120196)) },
  { name: "Fullwidth", transform: (text: string) => text.replace(/[a-z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 65248)).replace(/[A-Z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 65248)).replace(/[0-9]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 65248)) },
  { name: "Superscript", transform: (text: string) => text.replace(/[0-9]/g, (c) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[parseInt(c)]) },
  { name: "Subscript", transform: (text: string) => text.replace(/[0-9]/g, (c) => "₀₁₂₃₄₅₆₇₈₉"[parseInt(c)]) },
]

export default function FontGenerator() {
  const [inputText, setInputText] = useState("Hello World")
  const [selectedStyle, setSelectedStyle] = useState("Normal")
  const [fontSize, setFontSize] = useState([24])
  const [copied, setCopied] = useState<string | null>(null)

  const transformedText = useCallback(() => {
    const style = FONT_STYLES.find((s) => s.name === selectedStyle)
    return style ? style.transform(inputText) : inputText
  }, [inputText, selectedStyle])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const generateCSS = useCallback(() => {
    const style = FONT_STYLES.find((s) => s.name === selectedStyle)
    if (!style || selectedStyle === "Normal") return ""
    
    return `/* ${selectedStyle} Font Style */
.text {
  font-family: 'Your Font', sans-serif;
  font-size: ${fontSize[0]}px;
}`
  }, [selectedStyle, fontSize])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <Label htmlFor="input-text" className="text-base font-medium">
          Your Text
        </Label>
        <Input
          id="input-text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your text here..."
          className="text-lg"
        />
      </section>

      {/* Style Selection */}
      <section className="space-y-3">
        <Label htmlFor="font-style" className="text-base font-medium">
          Font Style
        </Label>
        <Select value={selectedStyle} onValueChange={setSelectedStyle}>
          <SelectTrigger id="font-style" className="w-full">
            <SelectValue placeholder="Select a font style" />
          </SelectTrigger>
          <SelectContent>
            {FONT_STYLES.map((style) => (
              <SelectItem key={style.name} value={style.name}>
                {style.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      {/* Font Size Slider */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Font Size</Label>
          <span className="text-sm text-muted-foreground font-mono">{fontSize[0]}px</span>
        </div>
        <Slider
          value={fontSize}
          onValueChange={setFontSize}
          min={12}
          max={72}
          step={1}
          className="w-full"
        />
      </section>

      {/* Preview Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Preview</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(transformedText(), "preview")}
          >
            {copied === "preview" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
            Copy Text
          </Button>
        </div>
        <div className="rounded-lg border bg-muted/30 p-6 min-h-[100px] flex items-center justify-center">
          <p style={{ fontSize: `${fontSize[0]}px` }} className="text-center break-words">
            {transformedText()}
          </p>
        </div>
      </section>

      {/* All Styles Preview */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">All Styles</h3>
        <div className="rounded-lg border bg-background divide-y">
          {FONT_STYLES.map((style) => (
            <div key={style.name} className="flex items-center justify-between p-3">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">{style.name}</p>
                <p className="text-lg">{style.transform(inputText)}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(style.transform(inputText), style.name)}
              >
                {copied === style.name ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* CSS Output */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">CSS Code</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(generateCSS(), "css")}
          >
            {copied === "css" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
            Copy CSS
          </Button>
        </div>
        <Textarea
          value={generateCSS()}
          readOnly
          className="font-mono text-sm min-h-[100px]"
        />
      </section>
    </div>
  )
}
