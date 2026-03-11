"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function YamlValidator() {
  const [input, setInput] = useState("")
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [copied, setCopied] = useState(false)

  const validateYAML = useCallback((yaml: string): { valid: boolean; error?: string } => {
    try {
      // Basic YAML validation
      const lines = yaml.split('\n')
      const indentStack: number[] = []
      let inMultilineString = false
      let multilineIndent = -1

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const trimmed = line.trim()

        // Skip empty lines and comments
        if (!trimmed || trimmed.startsWith('#')) continue

        // Check for tabs (YAML requires spaces)
        if (line.includes('\t') && !trimmed.startsWith('#')) {
          return { valid: false, error: `Line ${i + 1}: Tabs are not allowed in YAML. Use spaces for indentation.` }
        }

        // Handle multiline strings
        if (inMultilineString) {
          const currentIndent = line.search(/\S/)
          if (currentIndent <= multilineIndent && trimmed) {
            inMultilineString = false
          } else {
            continue
          }
        }

        // Check for multiline string indicators
        if (trimmed.includes('|') || trimmed.includes('>')) {
          inMultilineString = true
          multilineIndent = line.search(/\S/)
          continue
        }

        // Check for key-value pairs
        if (trimmed.includes(':')) {
          const colonIndex = trimmed.indexOf(':')
          const key = trimmed.substring(0, colonIndex).trim()
          
          // Validate key
          if (!key) {
            return { valid: false, error: `Line ${i + 1}: Empty key found.` }
          }

          // Check if key starts with invalid character
          if (key.match(/^[0-9]/)) {
            return { valid: false, error: `Line ${i + 1}: Keys cannot start with a number.` }
          }
        } else if (trimmed.startsWith('-')) {
          // List item - check format
          const afterDash = trimmed.substring(1).trim()
          if (afterDash && !afterDash.includes(':') && afterDash.includes(': ')) {
            // This might be okay
          }
        } else if (!trimmed.startsWith('-')) {
          // Line should be a key-value pair or list item
          const currentIndent = line.search(/\S/)
          if (indentStack.length > 0 && currentIndent > indentStack[indentStack.length - 1]) {
            // This is nested content, which is okay
          }
        }

        // Track indentation
        const currentIndent = line.search(/\S/)
        if (currentIndent >= 0) {
          while (indentStack.length > 0 && currentIndent < indentStack[indentStack.length - 1]) {
            indentStack.pop()
          }
          if (indentStack.length === 0 || currentIndent > indentStack[indentStack.length - 1]) {
            indentStack.push(currentIndent)
          }
        }
      }

      // Check for balanced structures
      const openBrackets = (yaml.match(/\[/g) || []).length
      const closeBrackets = (yaml.match(/\]/g) || []).length
      const openBraces = (yaml.match(/\{/g) || []).length
      const closeBraces = (yaml.match(/\}/g) || []).length

      if (openBrackets !== closeBrackets) {
        return { valid: false, error: `Unbalanced square brackets. Found ${openBrackets} opening and ${closeBrackets} closing.` }
      }

      if (openBraces !== closeBraces) {
        return { valid: false, error: `Unbalanced curly braces. Found ${openBraces} opening and ${closeBraces} closing.` }
      }

      return { valid: true }
    } catch (error) {
      return { valid: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }, [])

  const handleValidate = useCallback(() => {
    if (!input.trim()) {
      setIsValid(null)
      setErrorMessage("")
      return
    }

    const result = validateYAML(input)
    setIsValid(result.valid)
    setErrorMessage(result.error || "")
  }, [input, validateYAML])

  const handleCopy = useCallback(async () => {
    if (input) {
      await navigator.clipboard.writeText(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [input])

  const handleClear = useCallback(() => {
    setInput("")
    setIsValid(null)
    setErrorMessage("")
  }, [])

  const lineCount = input.split('\n').length
  const charCount = input.length

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">YAML Validator</h2>
            <p className="text-sm text-muted-foreground">
              Validate YAML syntax and check for common errors
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{lineCount} lines</span>
            <span>{charCount} characters</span>
          </div>
        </div>
      </div>

      {isValid !== null && (
        <Alert variant={isValid ? "default" : "destructive"}>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {isValid ? "YAML is valid! No syntax errors detected." : `Invalid YAML: ${errorMessage}`}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="input">YAML Input</Label>
          <div className="flex items-center gap-2">
            <Button onClick={handleCopy} disabled={!input} variant="outline" size="sm">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your YAML here...

# Example:
name: John Doe
age: 30
hobbies:
  - reading
  - gaming
address:
  street: 123 Main St
  city: Anytown"
          className="min-h-[500px] font-mono text-sm"
        />

        <div className="flex items-center gap-2">
          <Button onClick={handleValidate} className="flex-1">
            Validate YAML
          </Button>
        </div>
      </div>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">YAML Validation Rules</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Use spaces for indentation (not tabs)</li>
          <li>Key-value pairs use colon followed by space: <code className="bg-background px-1 rounded">key: value</code></li>
          <li>List items start with dash and space: <code className="bg-background px-1 rounded">- item</code></li>
          <li>Strings can be quoted or unquoted</li>
          <li>Comments start with hash: <code className="bg-background px-1 rounded"># comment</code></li>
          <li>Ensure proper indentation for nested structures</li>
        </ul>
      </div>
    </div>
  )
}
