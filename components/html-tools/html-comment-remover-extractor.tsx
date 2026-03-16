"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"

export function HtmlCommentRemoverExtractor() {
  const [input, setInput] = useState("")
  const [output, setInputWithoutComments] = useState("")
  const [extractedComments, setExtractedComments] = useState<string[]>([])
  const [mode, setMode] = useState<"remove" | "extract">("remove")
  const [copied, setCopied] = useState(false)

  const removeComments = useCallback((html: string): string => {
    return html.replace(/<!--[\s\S]*?-->/g, '')
  }, [])

  const extractComments = useCallback((html: string): string[] => {
    const comments: string[] = []
    const commentRegex = /<!--([\s\S]*?)-->/g
    let match

    while ((match = commentRegex.exec(html)) !== null) {
      comments.push(match[1].trim())
    }

    return comments
  }, [])

  const handleProcess = useCallback(() => {
    if (mode === "remove") {
      setInputWithoutComments(removeComments(input))
      setExtractedComments([])
    } else {
      setExtractedComments(extractComments(input))
      setInputWithoutComments("")
    }
  }, [input, mode, removeComments, extractComments])

  const handleCopy = useCallback(async () => {
    const text = mode === "remove" ? output : extractedComments.join('\n\n---\n\n')
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [output, extractedComments, mode])

  const handleClear = useCallback(() => {
    setInput("")
    setInputWithoutComments("")
    setExtractedComments([])
  }, [])

  const commentCount = extractComments(input).length

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">HTML Comment Remover & Extractor</h2>
            <p className="text-sm text-muted-foreground">
              Remove or extract HTML comments
            </p>
          </div>
          {commentCount > 0 && (
            <div className="text-sm text-muted-foreground">
              {commentCount} comments found
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <Button
          variant={mode === "remove" ? "default" : "outline"}
          onClick={() => setMode("remove")}
        >
          Remove Comments
        </Button>
        <Button
          variant={mode === "extract" ? "default" : "outline"}
          onClick={() => setMode("extract")}
        >
          Extract Comments
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">HTML Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your HTML with comments here..."
            className="min-h-[400px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleProcess} className="flex-1" disabled={!input}>
              {mode === "remove" ? "Remove Comments" : "Extract Comments"}
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">
            {mode === "remove" ? "HTML Without Comments" : "Extracted Comments"}
          </Label>
          <Textarea
            id="output"
            value={mode === "remove" ? output : extractedComments.join('\n\n---\n\n')}
            readOnly
            placeholder={mode === "remove" 
              ? "Clean HTML will appear here..."
              : "Extracted comments will appear here..."
            }
            className="min-h-[400px] font-mono text-sm bg-muted"
          />
          <div className="flex items-center gap-2">
            <Button 
              onClick={handleCopy} 
              disabled={mode === "remove" ? !output : extractedComments.length === 0} 
              className="flex-1"
            >
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
      </div>

      {mode === "extract" && extractedComments.length > 0 && (
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-medium mb-2">Extracted Comments ({extractedComments.length})</h3>
          <div className="space-y-2">
            {extractedComments.map((comment, index) => (
              <div key={index} className="p-3 bg-background rounded border">
                <p className="text-sm font-mono whitespace-pre-wrap">{comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
