"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function WhitespaceNormalizer() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [options, setOptions] = useState({
    trimLines: true,
    normalizeSpaces: true,
    removeEmptyLines: true,
    normalizeLineEndings: true,
    tabsToSpaces: false,
    spacesToTabs: false,
    collapseBlankLines: true,
  })
  const [copied, setCopied] = useState<string | null>(null)

  const normalizeWhitespace = useCallback(() => {
    let result = input

    // Normalize line endings
    if (options.normalizeLineEndings) {
      result = result.replace(/\r\n/g, "\n").replace(/\r/g, "\n")
    }

    // Process line by line
    const lines = result.split("\n")
    const processedLines = lines.map((line) => {
      let processed = line

      // Trim leading/trailing whitespace
      if (options.trimLines) {
        processed = processed.trim()
      }

      // Normalize multiple spaces to single space
      if (options.normalizeSpaces) {
        processed = processed.replace(/[ \t]+/g, " ")
      }

      // Convert tabs to spaces
      if (options.tabsToSpaces) {
        processed = processed.replace(/\t/g, "    ")
      }

      // Convert spaces to tabs (4 spaces = 1 tab)
      if (options.spacesToTabs) {
        processed = processed.replace(/    /g, "\t")
      }

      return processed
    })

    // Remove empty lines
    let finalLines = processedLines
    if (options.removeEmptyLines) {
      finalLines = finalLines.filter((line) => line.trim().length > 0)
    }

    // Collapse consecutive blank lines
    if (options.collapseBlankLines) {
      finalLines = finalLines.reduce((acc: string[], line, i, arr) => {
        if (line.trim() === "" && i > 0 && arr[i - 1].trim() === "") {
          return acc
        }
        acc.push(line)
        return acc
      }, [])
    }

    result = finalLines.join("\n")
    setOutput(result)
  }, [input, options])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const stats = useMemo(() => {
    const inputLines = input.split("\n").length
    const outputLines = output.split("\n").length
    const inputChars = input.length
    const outputChars = output.length
    return { inputLines, outputLines, inputChars, outputChars }
  }, [input, output])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Options */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Options</Label>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {[
            { key: "trimLines", label: "Trim lines", desc: "Remove leading/trailing whitespace" },
            { key: "normalizeSpaces", label: "Normalize spaces", desc: "Multiple spaces to single" },
            { key: "removeEmptyLines", label: "Remove empty lines", desc: "Delete blank lines" },
            { key: "normalizeLineEndings", label: "Normalize line endings", desc: "Convert to LF" },
            { key: "tabsToSpaces", label: "Tabs to spaces", desc: "Convert tabs to 4 spaces" },
            { key: "spacesToTabs", label: "Spaces to tabs", desc: "Convert 4 spaces to tab" },
          ].map((opt) => (
            <label
              key={opt.key}
              className={cn(
                "flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors",
                options[opt.key as keyof typeof options] 
                  ? "bg-muted border-primary/50" 
                  : "bg-background"
              )}
            >
              <Checkbox
                checked={options[opt.key as keyof typeof options]}
                onCheckedChange={(checked) => setOptions({ ...options, [opt.key]: checked as boolean })}
                className="mt-0.5"
              />
              <div>
                <div className="text-sm font-medium">{opt.label}</div>
                <div className="text-xs text-muted-foreground">{opt.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* Input/Output */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="input-text" className="text-base font-medium">
              Input Text
            </Label>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(input, "input")}
                className="h-7"
                disabled={!input}
              >
                {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              </Button>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setInput("")}
                className="h-7"
                disabled={!input}
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </div>
          <Textarea
            id="input-text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="font-mono text-sm min-h-[250px]"
            placeholder="Paste text with inconsistent whitespace..."
          />
          <div className="text-xs text-muted-foreground flex gap-4">
            <span>{stats.inputLines} lines</span>
            <span>{stats.inputChars} characters</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="output-text" className="text-base font-medium">
              Normalized Output
            </Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(output, "output")}
              className="h-7"
              disabled={!output}
            >
              {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            </Button>
          </div>
          <Textarea
            id="output-text"
            value={output}
            readOnly
            className="font-mono text-sm min-h-[250px] bg-muted/30"
            placeholder="Normalized text will appear here..."
          />
          <div className="text-xs text-muted-foreground flex gap-4">
            <span>{stats.outputLines} lines</span>
            <span>{stats.outputChars} characters</span>
          </div>
        </div>
      </section>

      {/* Action Button */}
      <Button onClick={normalizeWhitespace} className="w-full sm:w-auto" size="lg">
        Normalize Whitespace
      </Button>

      {/* Sample Text */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Sample Text</h3>
        <button
          onClick={() => setInput(`  This   is    a   test   text.  
\tIt has\t\ttabs and   spaces.

  Multiple    blank lines above.  
   
    Indented line with spaces.    
Another line.  `)}
          className="w-full text-left rounded-lg border bg-background p-3 hover:bg-muted/50 transition-colors"
        >
          <code className="text-xs font-mono block whitespace-pre-wrap">
{`  This   is    a   test   text.  
\tIt has\t\ttabs...`}
          </code>
          <span className="text-xs text-muted-foreground">Click to load sample text</span>
        </button>
      </section>
    </div>
  )
}
