"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, ClipboardCheck, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function YamlLinter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [issues, setIssues] = useState<Array<{ line: number; column: number; severity: 'error' | 'warning' | 'info'; message: string }>>([])
  const [checkTabs, setCheckTabs] = useState(true)
  const [checkTrailingSpaces, setCheckTrailingSpaces] = useState(true)
  const [checkEmptyLines, setCheckEmptyLines] = useState(true)
  const [checkKeySpacing, setCheckKeySpacing] = useState(true)
  const [checkQuotes, setCheckQuotes] = useState(false)

  const lintYaml = useCallback((yaml: string, options: {
    checkTabs: boolean;
    checkTrailingSpaces: boolean;
    checkEmptyLines: boolean;
    checkKeySpacing: boolean;
    checkQuotes: boolean;
  }): Array<{ line: number; column: number; severity: 'error' | 'warning' | 'info'; message: string }> => {
    const issues: Array<{ line: number; column: number; severity: 'error' | 'warning' | 'info'; message: string }> = []
    const lines = yaml.split('\n')

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const lineNumber = i + 1
      const trimmed = line.trim()

      // Skip empty lines for most checks
      if (!trimmed) {
        if (options.checkEmptyLines && i > 0 && lines[i - 1]?.trim() === '') {
          issues.push({
            line: lineNumber,
            column: 1,
            severity: 'warning',
            message: 'Consecutive empty lines'
          })
        }
        continue
      }

      // Skip comments
      if (trimmed.startsWith('#')) {
        continue
      }

      // Check for tabs
      if (options.checkTabs && line.includes('\t')) {
        const tabIndex = line.indexOf('\t') + 1
        issues.push({
          line: lineNumber,
          column: tabIndex,
          severity: 'error',
          message: 'Tabs are not allowed in YAML. Use spaces for indentation.'
        })
      }

      // Check for trailing spaces
      if (options.checkTrailingSpaces && line !== line.trimEnd()) {
        issues.push({
          line: lineNumber,
          column: line.trimEnd().length + 1,
          severity: 'warning',
          message: 'Trailing whitespace detected'
        })
      }

      // Check key-value spacing
      if (options.checkKeySpacing && trimmed.includes(':')) {
        const colonIndex = trimmed.indexOf(':')
        const afterColon = trimmed.substring(colonIndex + 1)
        
        // Check if there's a value but no space after colon
        if (afterColon && !afterColon.startsWith(' ') && !afterColon.startsWith('#')) {
          // Exception for empty values and nested structures
          if (!afterColon.startsWith('{') && !afterColon.startsWith('[')) {
            issues.push({
              line: lineNumber,
              column: colonIndex + 1,
              severity: 'warning',
              message: 'Missing space after colon in key-value pair'
            })
          }
        }

        // Check for space before colon
        if (colonIndex > 0 && trimmed[colonIndex - 1] === ' ') {
          issues.push({
            line: lineNumber,
            column: colonIndex,
            severity: 'warning',
            message: 'Unexpected space before colon'
          })
        }
      }

      // Check for unquoted special characters
      if (options.checkQuotes && trimmed.includes(':')) {
        const colonIndex = trimmed.indexOf(':')
        const value = trimmed.substring(colonIndex + 1).trim()
        
        if (value && !value.startsWith('"') && !value.startsWith("'")) {
          // Check for values that should be quoted
          const shouldQuote = [
            /^[0-9]/.test(value), // Starts with number
            /[#:{}\[\],&*!|>'"@`%]/.test(value), // Contains special chars
            value === 'true' || value === 'false' || value === 'null' || value === '~',
            value.includes(' #') // Contains inline comment
          ].some(check => check)

          if (shouldQuote && value.length > 0) {
            issues.push({
              line: lineNumber,
              column: colonIndex + 2,
              severity: 'info',
              message: `Consider quoting this value: "${value}"`
            })
          }
        }
      }

      // Check for common YAML structure issues
      if (trimmed.startsWith('-') && !trimmed.startsWith('- ')) {
        if (trimmed.length > 1 && trimmed[1] !== ' ') {
          issues.push({
            line: lineNumber,
            column: 1,
            severity: 'warning',
            message: 'List items should be followed by a space: "- item"'
          })
        }
      }

      // Check for inconsistent indentation (basic check)
      const indent = line.search(/\S/)
      if (indent > 0 && indent % 2 !== 0) {
        issues.push({
          line: lineNumber,
          column: 1,
          severity: 'info',
          message: 'Odd indentation detected. Consider using 2-space indentation.'
        })
      }
    }

    // Check for balanced brackets/braces
    const openBrackets = (yaml.match(/\[/g) || []).length
    const closeBrackets = (yaml.match(/\]/g) || []).length
    const openBraces = (yaml.match(/\{/g) || []).length
    const closeBraces = (yaml.match(/\}/g) || []).length

    if (openBrackets !== closeBrackets) {
      issues.push({
        line: 1,
        column: 1,
        severity: 'error',
        message: `Unbalanced square brackets: ${openBrackets} opening, ${closeBrackets} closing`
      })
    }

    if (openBraces !== closeBraces) {
      issues.push({
        line: 1,
        column: 1,
        severity: 'error',
        message: `Unbalanced curly braces: ${openBraces} opening, ${closeBraces} closing`
      })
    }

    return issues
  }, [])

  const handleLint = useCallback(() => {
    if (!input.trim()) {
      setOutput("Please enter YAML to lint")
      setIssues([])
      return
    }

    const lintIssues = lintYaml(input, {
      checkTabs,
      checkTrailingSpaces,
      checkEmptyLines,
      checkKeySpacing,
      checkQuotes
    })

    setIssues(lintIssues)

    if (lintIssues.length === 0) {
      setOutput("✓ No issues found! YAML looks good.")
    } else {
      const errorCount = lintIssues.filter(i => i.severity === 'error').length
      const warningCount = lintIssues.filter(i => i.severity === 'warning').length
      const infoCount = lintIssues.filter(i => i.severity === 'info').length

      let outputText = `Found ${lintIssues.length} issue(s):\n`
      outputText += `  Errors: ${errorCount}\n`
      outputText += `  Warnings: ${warningCount}\n`
      outputText += `  Info: ${infoCount}\n\n`

      lintIssues.forEach(issue => {
        const icon = issue.severity === 'error' ? '✗' : issue.severity === 'warning' ? '⚠' : 'ℹ'
        outputText += `${icon} Line ${issue.line}:${issue.column} [${issue.severity.toUpperCase()}] ${issue.message}\n`
      })

      setOutput(outputText.trim())
    }
  }, [input, lintYaml, checkTabs, checkTrailingSpaces, checkEmptyLines, checkKeySpacing, checkQuotes])

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
    setIssues([])
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "lint-report.txt"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput(`# Sample YAML with issues
name:John Doe  
age: 30
email: john@example.com
hobbies:
  -reading
  - gaming
address:
  street: 123 Main St
  city:New York
`)
  }, [])

  const errorCount = issues.filter(i => i.severity === 'error').length
  const warningCount = issues.filter(i => i.severity === 'warning').length

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">YAML Linter</h2>
            <p className="text-sm text-muted-foreground">
              Check YAML for common errors and style issues
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      {issues.length > 0 && (
        <div className="flex gap-4">
          {errorCount > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorCount} error(s)</AlertDescription>
            </Alert>
          )}
          {warningCount > 0 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{warningCount} warning(s)</AlertDescription>
            </Alert>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={checkTabs}
            onChange={(e) => setCheckTabs(e.target.checked)}
            className="rounded border-gray-300"
          />
          Check Tabs
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={checkTrailingSpaces}
            onChange={(e) => setCheckTrailingSpaces(e.target.checked)}
            className="rounded border-gray-300"
          />
          Check Trailing Spaces
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={checkEmptyLines}
            onChange={(e) => setCheckEmptyLines(e.target.checked)}
            className="rounded border-gray-300"
          />
          Check Empty Lines
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={checkKeySpacing}
            onChange={(e) => setCheckKeySpacing(e.target.checked)}
            className="rounded border-gray-300"
          />
          Check Key Spacing
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={checkQuotes}
            onChange={(e) => setCheckQuotes(e.target.checked)}
            className="rounded border-gray-300"
          />
          Check Quotes
        </label>
      </div>

      <div className="space-y-4">
        <Label htmlFor="input">YAML Input</Label>
        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your YAML here to check for issues..."
          className="min-h-[400px] font-mono text-sm"
        />
        <div className="flex items-center gap-2">
          <Button onClick={handleLint} className="flex-1" disabled={!input}>
            <ClipboardCheck className="h-4 w-4 mr-2" />
            Lint YAML
          </Button>
          <Button variant="outline" onClick={handleClear} title="Clear">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {output && (
        <div className="space-y-4">
          <Label htmlFor="output">Lint Report</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            className="min-h-[300px] font-mono text-sm bg-muted"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleCopy} disabled={!output} className="flex-1">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy Report"}
            </Button>
            <Button variant="outline" onClick={handleDownload} disabled={!output} title="Download">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">YAML Best Practices</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Use spaces for indentation (not tabs)</li>
          <li>Add a space after colons in key-value pairs</li>
          <li>Avoid trailing whitespace</li>
          <li>Use consistent indentation (2 spaces recommended)</li>
          <li>Quote strings that contain special characters</li>
        </ul>
      </div>
    </div>
  )
}
