"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Check, Trash2, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

type FilterMode = "keep" | "remove" | "extract"

export default function LineFilter() {
  const [pattern, setPattern] = useState<string>("")
  const [text, setText] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<FilterMode>("keep")
  const [error, setError] = useState<string | null>(null)
  const [flags, setFlags] = useState({
    ignoreCase: false,
    wholeLine: false,
    invert: false,
  })
  const [copied, setCopied] = useState<string | null>(null)

  const filterLines = useCallback(() => {
    try {
      setError(null)
      
      if (!pattern.trim()) {
        setOutput(text)
        return
      }
      
      let flagsStr = ""
      if (flags.ignoreCase) flagsStr += "i"
      if (flags.wholeLine) flagsStr += "m"
      
      const regex = new RegExp(flags.wholeLine ? `^${pattern}$` : pattern, flagsStr)
      const lines = text.split("\n")
      
      let resultLines: string[]
      
      if (mode === "keep") {
        resultLines = lines.filter(line => {
          const matches = regex.test(line)
          return flags.invert ? !matches : matches
        })
      } else if (mode === "remove") {
        resultLines = lines.filter(line => {
          const matches = regex.test(line)
          return flags.invert ? matches : !matches
        })
      } else { // extract
        resultLines = lines
          .filter(line => regex.test(line))
          .map(line => {
            const match = line.match(regex)
            return match ? match[0] : line
          })
      }
      
      setOutput(resultLines.join("\n"))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid regex pattern")
      setOutput("")
    }
  }, [pattern, text, mode, flags])

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
    const inputLines = text.split("\n").length
    const outputLines = output.split("\n").length
    const filtered = inputLines - outputLines
    return { inputLines, outputLines, filtered }
  }, [text, output])

  const presetPatterns = [
    { name: "Contains ERROR", pattern: "ERROR", desc: "Filter error lines" },
    { name: "Contains WARN", pattern: "WARN", desc: "Filter warning lines" },
    { name: "Email Lines", pattern: "[\\w.-]+@[\\w.-]+", desc: "Lines with emails" },
    { name: "Number Lines", pattern: "\\d+", desc: "Lines with numbers" },
    { name: "Empty Lines", pattern: "^\\s*$", desc: "Empty or whitespace lines" },
    { name: "Starts with #", pattern: "^#", desc: "Comment lines" },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Pattern Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="pattern-input" className="text-base font-medium">
            Filter Pattern (Regex)
          </Label>
          <div className="flex gap-2 flex-wrap">
            {presetPatterns.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="xs"
                onClick={() => setPattern(preset.pattern)}
                className="h-7"
              >
                {preset.name}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Input
            id="pattern-input"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className={cn(
              "font-mono text-sm",
              error ? "border-destructive" : ""
            )}
            placeholder="Enter regex pattern to filter by..."
          />
        </div>
        
        {/* Mode Selection */}
        <Tabs value={mode} onValueChange={(v) => setMode(v as FilterMode)}>
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="keep">Keep Matching</TabsTrigger>
            <TabsTrigger value="remove">Remove Matching</TabsTrigger>
            <TabsTrigger value="extract">Extract Matches</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Options */}
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <Checkbox
              checked={flags.ignoreCase}
              onCheckedChange={(checked) => setFlags({ ...flags, ignoreCase: checked as boolean })}
            />
            Ignore case
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <Checkbox
              checked={flags.wholeLine}
              onCheckedChange={(checked) => setFlags({ ...flags, wholeLine: checked as boolean })}
            />
            Match whole line
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <Checkbox
              checked={flags.invert}
              onCheckedChange={(checked) => setFlags({ ...flags, invert: checked as boolean })}
            />
            Invert result
          </label>
        </div>
        
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </section>

      {/* Text Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="text-input" className="text-base font-medium">
            Input Text
          </Label>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(text, "input")}
              className="h-7"
              disabled={!text}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setText("")}
              className="h-7"
              disabled={!text}
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        </div>
        
        <Textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="font-mono text-sm min-h-[200px]"
          placeholder="Enter text to filter lines..."
        />
        <div className="text-xs text-muted-foreground">
          {stats.inputLines} lines
        </div>
      </section>

      {/* Action Button */}
      <Button onClick={filterLines} className="w-full sm:w-auto" size="lg">
        <Filter className="size-4 mr-2" />
        Filter Lines
      </Button>

      {/* Output */}
      {output && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Filtered Output</h3>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(output, "output")}
            >
              {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            </Button>
          </div>
          
          <Textarea
            value={output}
            readOnly
            className="font-mono text-sm min-h-[200px] bg-muted/30"
          />
          <div className="text-xs text-muted-foreground flex gap-4">
            <span>{stats.outputLines} lines</span>
            <span>Filtered: {stats.filtered} lines</span>
          </div>
        </section>
      )}

      {/* Sample Text */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Sample Log Text</h3>
        <button
          onClick={() => setText(`INFO: Application started
DEBUG: Loading configuration
INFO: Connected to database
WARNING: High memory usage detected
ERROR: Failed to connect to API
INFO: Retrying connection
ERROR: Connection timeout
DEBUG: Cleanup complete
INFO: Application shutdown`)}
          className="w-full text-left rounded-lg border bg-background p-3 hover:bg-muted/50 transition-colors"
        >
          <code className="text-xs font-mono block">
            INFO: Application started...
          </code>
          <span className="text-xs text-muted-foreground">Click to load sample log text</span>
        </button>
      </section>
    </div>
  )
}
