"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Type } from "lucide-react"

export function UnicodeSortingTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [sortType, setSortType] = useState<"codepoint" | "alphabetical" | "category">("codepoint")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [removeDuplicates, setRemoveDuplicates] = useState(false)
  const [groupBy, setGroupBy] = useState<"none" | "category" | "script">("none")

  const getUnicodeCategory = useCallback((char: string): string => {
    const code = char.codePointAt(0) || 0
    
    if (code >= 0x0041 && code <= 0x005A) return "Uppercase Letter"
    if (code >= 0x0061 && code <= 0x007A) return "Lowercase Letter"
    if (code >= 0x0030 && code <= 0x0039) return "Decimal Number"
    if (code >= 0x0020 && code <= 0x002F) return "Punctuation"
    if (code >= 0x003A && code <= 0x0040) return "Symbol"
    if (code >= 0x005B && code <= 0x0060) return "Symbol"
    if (code >= 0x007B && code <= 0x007E) return "Symbol"
    if (code >= 0x00A0 && code <= 0x00BF) return "Punctuation/Symbol"
    if (code >= 0x0370 && code <= 0x03FF) return "Greek"
    if (code >= 0x0400 && code <= 0x04FF) return "Cyrillic"
    if (code >= 0x0600 && code <= 0x06FF) return "Arabic"
    if (code >= 0x4E00 && code <= 0x9FFF) return "CJK"
    if (code >= 0x3040 && code <= 0x309F) return "Hiragana"
    if (code >= 0x30A0 && code <= 0x30FF) return "Katakana"
    if (code >= 0xAC00 && code <= 0xD7AF) return "Hangul"
    if (code >= 0x0900 && code <= 0x097F) return "Devanagari"
    if (code >= 0x1F600 && code <= 0x1F64F) return "Emoticons"
    if (code >= 0x1F300 && code <= 0x1F5FF) return "Misc Symbols"
    if (code >= 0x1F680 && code <= 0x1F6FF) return "Transport Symbols"
    
    return "Other"
  }, [])

  const getUnicodeScript = useCallback((char: string): string => {
    const code = char.codePointAt(0) || 0
    
    if (code >= 0x0041 && code <= 0x007A) return "Latin"
    if (code >= 0x0370 && code <= 0x03FF) return "Greek"
    if (code >= 0x0400 && code <= 0x04FF) return "Cyrillic"
    if (code >= 0x0600 && code <= 0x06FF) return "Arabic"
    if (code >= 0x4E00 && code <= 0x9FFF) return "Han"
    if (code >= 0x3040 && code <= 0x309F) return "Hiragana"
    if (code >= 0x30A0 && code <= 0x30FF) return "Katakana"
    if (code >= 0xAC00 && code <= 0xD7AF) return "Hangul"
    if (code >= 0x0900 && code <= 0x097F) return "Devanagari"
    if (code >= 0x1F600 && code <= 0x1F64F) return "Emoji"
    
    return "Common"
  }, [])

  const sortCharacters = useCallback((text: string): string => {
    const chars = Array.from(text)
    
    let sorted = [...chars]
    
    // Remove duplicates if requested
    if (removeDuplicates) {
      sorted = Array.from(new Set(sorted))
    }
    
    // Sort
    sorted.sort((a, b) => {
      let comparison = 0
      
      switch (sortType) {
        case "codepoint":
          comparison = (a.codePointAt(0) || 0) - (b.codePointAt(0) || 0)
          break
        case "alphabetical":
          comparison = a.localeCompare(b)
          break
        case "category":
          const catA = getUnicodeCategory(a)
          const catB = getUnicodeCategory(b)
          comparison = catA.localeCompare(catB)
          if (comparison === 0) {
            comparison = (a.codePointAt(0) || 0) - (b.codePointAt(0) || 0)
          }
          break
      }
      
      return sortOrder === "desc" ? -comparison : comparison
    })
    
    // Group if requested
    if (groupBy !== "none") {
      const groups: Record<string, string[]> = {}
      
      sorted.forEach(char => {
        const key = groupBy === "category" ? getUnicodeCategory(char) : getUnicodeScript(char)
        if (!groups[key]) groups[key] = []
        groups[key].push(char)
      })
      
      const result: string[] = []
      Object.entries(groups).forEach(([group, chars]) => {
        result.push(`\n=== ${group} ===\n`)
        result.push(chars.join(' '))
      })
      
      return result.join('\n').trim()
    }
    
    return sorted.join(' ')
  }, [sortType, sortOrder, removeDuplicates, groupBy, getUnicodeCategory, getUnicodeScript])

  const handleSort = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }
    const sorted = sortCharacters(input)
    setOutput(sorted)
  }, [input, sortCharacters])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setInput("")
    setOutput("")
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "sorted-unicode.txt"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput("Hello 世界！🌍 Привет 123 مرحبا")
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Unicode Sorting Tool</h2>
            <p className="text-sm text-muted-foreground">
              Sort and organize Unicode characters
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Label>Sort By:</Label>
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value as any)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="codepoint">Code Point</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="category">Category</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Label>Order:</Label>
          <Button
            variant={sortOrder === "asc" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortOrder("asc")}
          >
            Ascending
          </Button>
          <Button
            variant={sortOrder === "desc" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortOrder("desc")}
          >
            Descending
          </Button>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={removeDuplicates}
            onChange={(e) => setRemoveDuplicates(e.target.checked)}
            className="rounded border-gray-300"
          />
          Remove Duplicates
        </label>

        <div className="flex items-center gap-2">
          <Label>Group By:</Label>
          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value as any)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="none">None</option>
            <option value="category">Category</option>
            <option value="script">Script</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">Input Text</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text with Unicode characters to sort..."
            className="min-h-[400px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleSort} className="flex-1" disabled={!input}>
              <Type className="h-4 w-4 mr-2" />
              Sort Characters
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Sorted Output</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Sorted characters will appear here..."
            className="min-h-[400px] font-mono text-sm bg-muted"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleCopy} disabled={!output} className="flex-1">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button variant="outline" onClick={handleDownload} disabled={!output} title="Download">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
