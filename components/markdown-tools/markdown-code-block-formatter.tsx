"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Code2 } from "lucide-react"

export function MarkdownCodeBlockFormatter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [defaultLanguage, setDefaultLanguage] = useState("")
  const [addLineNumbers, setAddLineNumbers] = useState(false)

  const formatCodeBlocks = useCallback((markdown: string, options: { defaultLanguage: string; addLineNumbers: boolean }): string => {
    const lines = markdown.split('\n')
    const result: string[] = []
    let inCodeBlock = false
    let codeBlockLines: string[] = []
    let codeLanguage = ""

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          // Starting code block
          inCodeBlock = true
          codeLanguage = line.substring(3).trim() || options.defaultLanguage
          codeBlockLines = []
        } else {
          // Ending code block
          inCodeBlock = false
          
          // Format the code block
          let formattedCode = '```' + codeLanguage + '\n'
          
          if (options.addLineNumbers && codeBlockLines.length > 0) {
            const maxLineNum = codeBlockLines.length.toString().length
            codeBlockLines.forEach((codeLine, idx) => {
              const lineNum = (idx + 1).toString().padStart(maxLineNum, ' ')
              formattedCode += `${lineNum} | ${codeLine}\n`
            })
          } else {
            formattedCode += codeBlockLines.join('\n') + '\n'
          }
          
          formattedCode += '```'
          result.push(formattedCode)
        }
      } else if (inCodeBlock) {
        codeBlockLines.push(line)
      } else {
        result.push(line)
      }
    }

    return result.join('\n')
  }, [])

  const handleFormat = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }
    const formatted = formatCodeBlocks(input, { defaultLanguage, addLineNumbers })
    setOutput(formatted)
  }, [input, formatCodeBlocks, defaultLanguage, addLineNumbers])

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
      const blob = new Blob([output], { type: "text/markdown" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "formatted.md"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput(`# Example Document

Here's some code:

\`\`\`
function hello() {
console.log("Hello, World!");
}
\`\`\`

And some more:

\`\`\`javascript
const x = 1;
const y = 2;
\`\`\``)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Markdown Code Block Formatter</h2>
            <p className="text-sm text-muted-foreground">
              Format and add line numbers to code blocks in Markdown
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Label>Default Language:</Label>
          <input
            type="text"
            value={defaultLanguage}
            onChange={(e) => setDefaultLanguage(e.target.value)}
            placeholder="e.g., javascript"
            className="border rounded px-2 py-1 text-sm w-32"
          />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={addLineNumbers}
            onChange={(e) => setAddLineNumbers(e.target.checked)}
            className="rounded border-gray-300"
          />
          Add Line Numbers
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">Markdown Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your Markdown with code blocks here..."
            className="min-h-[500px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleFormat} className="flex-1" disabled={!input}>
              <Code2 className="h-4 w-4 mr-2" />
              Format Code Blocks
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Formatted Markdown</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Formatted Markdown will appear here..."
            className="min-h-[500px] font-mono text-sm bg-muted"
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
