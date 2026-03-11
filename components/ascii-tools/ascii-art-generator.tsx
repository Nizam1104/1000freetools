"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Copy, Check, Download, Upload } from "lucide-react"

export default function AsciiArtGenerator() {
  const [inputText, setInputText] = useState<string>("Hello World")
  const [asciiOutput, setAsciiOutput] = useState<string>("")
  const [fontSize, setFontSize] = useState<number>(12)
  const [characterSet, setCharacterSet] = useState<string>("standard")
  const [brightness, setBrightness] = useState<number>(50)
  const [contrast, setContrast] = useState<number>(50)
  const [copied, setCopied] = useState<boolean>(false)

  const generateAsciiArt = useCallback(() => {
    const fonts: Record<string, string[][]> = {
      standard: [
        ["███", "  █", "███", "█  █", "███"],
        ["█  █", "  █", "█  █", "█  █", "█  █"],
        ["█  █", "  █", "█  █", "█  █", "█  █"],
        ["███", "  █", "███", "█  █", "███"],
        ["█  █", "  █", "█    ", "█  █", "█  █"],
        ["█  █", "  █", "█    ", "█  █", "█  █"],
        ["███", "  █", "█    ", " ███", "███"],
      ],
      simple: [
        ["###", "  #", "###", "#  #", "###"],
        ["#  #", "  #", "#  #", "#  #", "#  #"],
        ["#  #", "  #", "#  #", "#  #", "#  #"],
        ["###", "  #", "###", "#  #", "###"],
        ["#  #", "  #", "#    ", "#  #", "#  #"],
        ["#  #", "  #", "#    ", "#  #", "#  #"],
        ["###", "  #", "#    ", " ###", "###"],
      ],
      minimal: [
        ["**", " *", "**", "* *", "**"],
        ["* *", " *", "* *", "* *", "* *"],
        ["* *", " *", "* *", "* *", "* *"],
        ["**", " *", "**", "* *", "**"],
        ["* *", " *", "*   ", "* *", "* *"],
        ["* *", " *", "*   ", "* *", "* *"],
        ["**", " *", "*   ", " **", "**"],
      ],
    }

    const chars = fonts[characterSet] || fonts.standard
    let result = ""
    
    for (let line = 0; line < 5; line++) {
      for (let char of inputText.toUpperCase()) {
        const charIndex = char.charCodeAt(0) - 32
        if (charIndex >= 0 && charIndex < chars.length) {
          result += chars[line][charIndex % 5] + " "
        } else {
          result += "     "
        }
      }
      result += "\n"
    }

    setAsciiOutput(result)
  }, [inputText, characterSet])

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(asciiOutput)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [asciiOutput])

  const downloadAscii = useCallback(() => {
    const blob = new Blob([asciiOutput], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "ascii-art.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [asciiOutput])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <Label htmlFor="input-text" className="text-base font-medium">
          Input Text
        </Label>
        <Textarea
          id="input-text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="font-mono text-sm min-h-[80px]"
          placeholder="Enter text to convert to ASCII art..."
          maxLength={50}
        />
        <p className="text-xs text-muted-foreground">
          Maximum 50 characters
        </p>
      </section>

      {/* Settings Section */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold">Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="character-set">Character Set</Label>
            <Select value={characterSet} onValueChange={setCharacterSet}>
              <SelectTrigger id="character-set">
                <SelectValue placeholder="Select character set" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard (███)</SelectItem>
                <SelectItem value="simple">Simple (###)</SelectItem>
                <SelectItem value="minimal">Minimal (**)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
            <Slider
              id="font-size"
              value={[fontSize]}
              onValueChange={(v) => setFontSize(v[0])}
              min={8}
              max={24}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="brightness">Brightness: {brightness}%</Label>
            <Slider
              id="brightness"
              value={[brightness]}
              onValueChange={(v) => setBrightness(v[0])}
              min={0}
              max={100}
              step={5}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contrast">Contrast: {contrast}%</Label>
            <Slider
              id="contrast"
              value={[contrast]}
              onValueChange={(v) => setContrast(v[0])}
              min={0}
              max={100}
              step={5}
            />
          </div>
        </div>
      </section>

      {/* Generate Button */}
      <Button onClick={generateAsciiArt} className="w-full">
        Generate ASCII Art
      </Button>

      {/* Output Section */}
      {asciiOutput && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">ASCII Art Output</Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
              >
                {copied ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadAscii}
              >
                <Download className="size-4 mr-1" />
                Download
              </Button>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4 overflow-x-auto">
            <pre
              className="font-mono text-sm whitespace-pre"
              style={{ fontSize: `${fontSize}px` }}
            >
              {asciiOutput}
            </pre>
          </div>
        </section>
      )}
    </div>
  )
}
