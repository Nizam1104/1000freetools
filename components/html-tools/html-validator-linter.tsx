"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"

export function HtmlValidatorLinter() {
  const [input, setInput] = useState("")
  const [errors, setErrors] = useState<Array<{ line: number; message: string; severity: "error" | "warning" }>>([])
  const [warnings, setWarnings] = useState<Array<{ line: number; message: string; severity: "error" | "warning" }>>([])

  const validateHTML = useCallback((html: string) => {
    const errors: Array<{ line: number; message: string; severity: "error" | "warning" }> = []
    const warnings: Array<{ line: number; message: string; severity: "error" | "warning" }> = []
    const lines = html.split('\n')

    // Check for unclosed tags
    const voidElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']
    const tagStack: Array<{ tag: string; line: number }> = []

    const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*>|<!--[\s\S]*?-->/g
    let match

    while ((match = tagRegex.exec(html)) !== null) {
      const fullMatch = match[0]
      
      // Skip comments
      if (fullMatch.startsWith('<!--')) continue

      const isClosing = fullMatch.startsWith('</')
      const tagName = match[1]?.toLowerCase() || ''

      if (!isClosing && !voidElements.includes(tagName) && !fullMatch.endsWith('/>')) {
        tagStack.push({ tag: tagName, line: html.substring(0, match.index).split('\n').length })
      } else if (isClosing) {
        const lastOpen = tagStack.pop()
        if (!lastOpen || lastOpen.tag !== tagName) {
          const lineNum = html.substring(0, match.index).split('\n').length
          errors.push({
            line: lineNum,
            message: lastOpen 
              ? `Mismatched closing tag: expected </${lastOpen.tag}>, found </${tagName}>`
              : `Closing tag </${tagName}> without opening tag`,
            severity: "error"
          })
        }
      }
    }

    // Check for unclosed tags
    tagStack.forEach(({ tag, line }) => {
      errors.push({
        line,
        message: `Unclosed tag: <${tag}>`,
        severity: "error"
      })
    })

    // Check for deprecated tags
    const deprecatedTags = ['acronym', 'applet', 'basefont', 'big', 'center', 'dir', 'font', 'frame', 'frameset', 'marquee', 's', 'strike', 'tt', 'u']
    lines.forEach((line, index) => {
      deprecatedTags.forEach(tag => {
        if (new RegExp(`<${tag}[\\s>]`, 'i').test(line)) {
          warnings.push({
            line: index + 1,
            message: `Deprecated tag: <${tag}>`,
            severity: "warning"
          })
        }
      })
    })

    // Check for missing DOCTYPE
    if (!html.trim().toLowerCase().startsWith('<!doctype')) {
      warnings.push({
        line: 1,
        message: 'Missing DOCTYPE declaration',
        severity: "warning"
      })
    }

    // Check for missing lang attribute on html
    if (html.includes('<html') && !html.match(/<html[^>]*lang=/i)) {
      warnings.push({
        line: 1,
        message: 'Missing lang attribute on <html> tag',
        severity: "warning"
      })
    }

    // Check for missing alt attributes on images
    lines.forEach((line, index) => {
      if (line.includes('<img') && !line.match(/alt\s*=/i)) {
        warnings.push({
          line: index + 1,
          message: 'Missing alt attribute on <img> tag',
          severity: "warning"
        })
      }
    })

    // Check for inline styles
    lines.forEach((line, index) => {
      if (line.match(/style\s*=\s*["']/i)) {
        warnings.push({
          line: index + 1,
          message: 'Inline style detected - consider using external CSS',
          severity: "warning"
        })
      }
    })

    // Check for tables without proper structure
    if (html.includes('<table')) {
      const hasThead = html.includes('<thead')
      const hasTbody = html.includes('<tbody')
      if (!hasThead || !hasTbody) {
        warnings.push({
          line: 1,
          message: 'Table missing <thead> or <tbody> elements',
          severity: "warning"
        })
      }
    }

    setErrors(errors)
    setWarnings(warnings)
  }, [])

  const handleValidate = useCallback(() => {
    if (!input.trim()) {
      setErrors([])
      setWarnings([])
      return
    }
    validateHTML(input)
  }, [input, validateHTML])

  const handleClear = useCallback(() => {
    setInput("")
    setErrors([])
    setWarnings([])
  }, [])

  const errorCount = errors.length
  const warningCount = warnings.length

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">HTML Validator & Linter</h2>
            <p className="text-sm text-muted-foreground">
              Validate HTML syntax and check for common issues
            </p>
          </div>
          {(errorCount > 0 || warningCount > 0) && (
            <div className="flex items-center gap-4 text-sm">
              <span className="text-destructive font-medium">{errorCount} errors</span>
              <span className="text-yellow-600 font-medium">{warningCount} warnings</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="input">HTML Input</Label>
          <Button variant="outline" size="sm" onClick={handleClear} title="Clear">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your HTML here to validate..."
          className="min-h-[400px] font-mono text-sm"
        />
        <Button onClick={handleValidate} className="w-full" disabled={!input}>
          Validate HTML
        </Button>
      </div>

      {(errors.length > 0 || warnings.length > 0) && (
        <div className="space-y-4">
          {errors.length > 0 && (
            <div className="border border-destructive rounded-lg overflow-hidden">
              <div className="bg-destructive/10 px-4 py-2 font-medium text-destructive">
                Errors ({errors.length})
              </div>
              <div className="divide-y">
                {errors.map((error, index) => (
                  <div key={index} className="px-4 py-2 text-sm">
                    <span className="text-muted-foreground">Line {error.line}:</span>{" "}
                    <span className="text-destructive">{error.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {warnings.length > 0 && (
            <div className="border border-yellow-600 rounded-lg overflow-hidden">
              <div className="bg-yellow-50 dark:bg-yellow-950/20 px-4 py-2 font-medium text-yellow-700 dark:text-yellow-500">
                Warnings ({warnings.length})
              </div>
              <div className="divide-y">
                {warnings.map((warning, index) => (
                  <div key={index} className="px-4 py-2 text-sm">
                    <span className="text-muted-foreground">Line {warning.line}:</span>{" "}
                    <span className="text-yellow-700 dark:text-yellow-500">{warning.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {errors.length === 0 && warnings.length === 0 && input && (
        <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-600 rounded-lg text-green-700 dark:text-green-500 text-center">
          ✓ No issues found! Your HTML looks good.
        </div>
      )}
    </div>
  )
}
