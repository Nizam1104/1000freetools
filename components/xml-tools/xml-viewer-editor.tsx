"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Upload, Eye } from "lucide-react"

export function XmlViewerEditor() {
  const [input, setInput] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")
  const [viewMode, setViewMode] = useState<"raw" | "tree">("tree")

  const parseXML = useCallback((xml: string): Element | null => {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(xml, "text/xml")
      const parseError = doc.querySelector("parsererror")
      if (parseError) {
        throw new Error(parseError.textContent || "XML parsing error")
      }
      return doc.documentElement
    } catch (e) {
      throw e
    }
  }, [])

  const renderTree = useCallback((element: Element, indent = 0): React.ReactNode => {
    const indentStr = "  ".repeat(indent)
    const attributes = Array.from(element.attributes).map(attr => `${attr.name}="${attr.value}"`).join(" ")
    const hasChildren = element.children.length > 0
    const hasText = element.textContent?.trim() && !hasChildren

    return (
      <div key={Math.random()} className="font-mono text-sm">
        <div className="flex items-start">
          <span className="text-muted-foreground">{indentStr}</span>
          <span className="text-purple-600 dark:text-purple-400">&lt;{element.tagName}</span>
          {attributes && <span className="text-blue-600 dark:text-blue-400"> {attributes}</span>}
          {hasChildren ? (
            <span className="text-purple-600 dark:text-purple-400">&gt;</span>
          ) : hasText ? (
            <span className="text-purple-600 dark:text-purple-400">&gt;</span>
          ) : (
            <span className="text-purple-600 dark:text-purple-400"> /&gt;</span>
          )}
        </div>
        {hasText && (
          <div>
            <span className="text-muted-foreground">{indentStr}  </span>
            <span className="text-foreground">{element.textContent?.trim()}</span>
          </div>
        )}
        {hasChildren && Array.from(element.children).map(child => renderTree(child, indent + 1))}
        {hasChildren && (
          <div>
            <span className="text-muted-foreground">{indentStr}</span>
            <span className="text-purple-600 dark:text-purple-400">&lt;/{element.tagName}&gt;</span>
          </div>
        )}
      </div>
    )
  }, [])

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setInput(content)
        setError("")
      }
      reader.readAsText(file)
    }
  }, [])

  const handleValidate = useCallback(() => {
    try {
      parseXML(input)
      setError("")
    } catch (e) {
      setError(`Invalid XML: ${e instanceof Error ? e.message : "Unknown error"}`)
    }
  }, [input, parseXML])

  const handleCopy = useCallback(async () => {
    if (input) {
      await navigator.clipboard.writeText(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [input])

  const handleClear = useCallback(() => {
    setInput("")
    setError("")
  }, [])

  const rootElement = input && !error ? parseXML(input) : null
  const lineCount = input.split('\n').length
  const charCount = input.length

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">XML Viewer & Editor</h2>
            <p className="text-sm text-muted-foreground">
              View, edit, and validate XML with a tree view
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{lineCount} lines</span>
            <span>{charCount} characters</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "raw" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("raw")}
            >
              Raw
            </Button>
            <Button
              variant={viewMode === "tree" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                handleValidate()
                setViewMode("tree")
              }}
              disabled={!input}
            >
              <Eye className="h-4 w-4 mr-2" />
              Tree View
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy} disabled={!input}>
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => document.getElementById("fileInput")?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
            <Button variant="outline" size="sm" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
            <input
              id="fileInput"
              type="file"
              accept=".xml"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>

        {viewMode === "raw" ? (
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your XML here or upload a file..."
            className="min-h-[600px] font-mono text-sm"
          />
        ) : (
          <div className="border rounded-lg p-4 bg-muted min-h-[600px] overflow-auto">
            {rootElement ? renderTree(rootElement) : (
              <p className="text-muted-foreground text-center py-8">
                {error ? "Invalid XML - cannot display tree view" : "Upload or paste XML to view tree"}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">XML Features</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Syntax-highlighted tree view</li>
          <li>Attribute display with color coding</li>
          <li>Nested element visualization</li>
          <li>XML validation on parse</li>
          <li>File upload support</li>
          <li>Copy to clipboard functionality</li>
        </ul>
      </div>
    </div>
  )
}
