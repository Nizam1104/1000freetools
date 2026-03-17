"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Save, Plus, X } from "lucide-react"
import { Input } from "@/components/ui/input"

export function MarkdownFrontMatterEditor() {
  const [frontMatter, setFrontMatter] = useState<Record<string, string>>({})
  const [content, setContent] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [newKey, setNewKey] = useState("")
  const [newValue, setNewValue] = useState("")

  const parseInput = useCallback((text: string) => {
    const lines = text.split('\n')
    let inFrontMatter = false
    let frontMatterEnd = -1
    const fmLines: string[] = []
    const contentLines: string[] = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      
      if (line.trim() === '---') {
        if (!inFrontMatter) {
          inFrontMatter = true
        } else {
          frontMatterEnd = i
          break
        }
      } else if (inFrontMatter) {
        fmLines.push(line)
      }
    }

    // Parse front matter
    const fm: Record<string, string> = {}
    fmLines.forEach(line => {
      const colonIndex = line.indexOf(':')
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim()
        const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '')
        fm[key] = value
      }
    })

    setFrontMatter(fm)

    // Get content after front matter
    if (frontMatterEnd >= 0) {
      setContent(lines.slice(frontMatterEnd + 1).join('\n').trimStart())
    } else {
      setContent(text)
    }
  }, [])

  const addField = useCallback(() => {
    if (newKey.trim()) {
      setFrontMatter({ ...frontMatter, [newKey.trim()]: newValue })
      setNewKey("")
      setNewValue("")
    }
  }, [frontMatter, newKey, newValue])

  const removeField = useCallback((key: string) => {
    const { [key]: _, ...rest } = frontMatter
    setFrontMatter(rest)
  }, [frontMatter])

  const updateField = useCallback((key: string, value: string) => {
    setFrontMatter({ ...frontMatter, [key]: value })
  }, [frontMatter])

  const generateOutput = useCallback(() => {
    let output = '---\n'
    Object.entries(frontMatter).forEach(([key, value]) => {
      output += `${key}: ${value}\n`
    })
    output += '---\n\n'
    output += content
    setOutput(output)
  }, [frontMatter, content])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setFrontMatter({})
    setContent("")
    setOutput("")
    setNewKey("")
    setNewValue("")
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/markdown" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "document.md"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleLoadExample = useCallback(() => {
    const example = `---
title: My Blog Post
author: John Doe
date: 2024-01-15
tags: javascript, react, tutorial
category: Development
---

# Welcome to My Post

This is the content of my blog post.`
    parseInput(example)
  }, [parseInput])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Markdown Front Matter Editor</h2>
            <p className="text-sm text-muted-foreground">
              Edit YAML front matter for Markdown files
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLoadExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label>Front Matter Fields</Label>
          
          <div className="space-y-2">
            {Object.entries(frontMatter).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <input
                  type="text"
                  value={key}
                  onChange={(e) => {
                    const newKey = e.target.value
                    const { [key]: _, ...rest } = frontMatter
                    setFrontMatter({ ...rest, [newKey]: value })
                  }}
                  className="flex-1 border rounded px-2 py-1 text-sm"
                />
                <span className="text-muted-foreground">:</span>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => updateField(key, e.target.value)}
                  className="flex-1 border rounded px-2 py-1 text-sm"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeField(key)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2 border-t">
            <input
              type="text"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="Key"
              className="flex-1 border rounded px-2 py-1 text-sm"
            />
            <span className="text-muted-foreground">:</span>
            <input
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="Value"
              className="flex-1 border rounded px-2 py-1 text-sm"
            />
            <Button size="sm" onClick={addField}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="content">Markdown Content</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your Markdown content here..."
            className="min-h-[400px] font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={generateOutput} className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          Generate Markdown
        </Button>
        <Button variant="outline" onClick={() => {
          const text = output || `---\n${Object.entries(frontMatter).map(([k, v]) => `${k}: ${v}`).join('\n')}\n---\n\n${content}`
          parseInput(text)
        }}>
          Parse Input
        </Button>
        <Button variant="outline" onClick={handleClear} title="Clear">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {output && (
        <div className="space-y-4">
          <Label htmlFor="output">Output</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            className="min-h-[300px] font-mono text-sm bg-muted"
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
      )}
    </div>
  )
}
