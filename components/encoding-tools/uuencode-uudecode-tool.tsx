"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

export default function UuencodeUudecodeTool() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [filename, setFilename] = useState<string>("file.txt")
  const [fileMode, setFileMode] = useState<string>("644")

  const encodeUuencode = useCallback((text: string, name: string, mode: string): string => {
    const encoder = new TextEncoder()
    const bytes = encoder.encode(text)
    
    let result = `begin ${mode} ${name}\n`
    
    let i = 0
    while (i < bytes.length) {
      const chunk = bytes.slice(i, i + 45) // 45 bytes = 60 chars (standard line length)
      const length = chunk.length
      
      // Encode length character
      result += String.fromCharCode(32 + Math.ceil(length * 4 / 3))
      
      // Encode 3 bytes at a time into 4 characters
      for (let j = 0; j < chunk.length; j += 3) {
        const b0 = chunk[j]
        const b1 = j + 1 < chunk.length ? chunk[j + 1] : 0
        const b2 = j + 2 < chunk.length ? chunk[j + 2] : 0
        
        result += String.fromCharCode(32 + (b0 >> 2))
        result += String.fromCharCode(32 + (((b0 & 0x03) << 4) | (b1 >> 4)))
        
        if (j + 1 < chunk.length) {
          result += String.fromCharCode(32 + (((b1 & 0x0F) << 2) | (b2 >> 6)))
        }
        
        if (j + 2 < chunk.length) {
          result += String.fromCharCode(32 + (b2 & 0x3F))
        }
      }
      
      result += '\n'
      i += 45
    }
    
    result += '`\nend'
    return result
  }, [])

  const decodeUudecode = useCallback((text: string): { content: string; filename: string; mode: string } => {
    const lines = text.split('\n')
    let filename = "decoded.txt"
    let fileMode = "644"
    let content = ""
    let inData = false
    
    for (const line of lines) {
      if (line.startsWith('begin ')) {
        const parts = line.split(' ')
        if (parts.length >= 3) {
          fileMode = parts[1]
          filename = parts.slice(2).join(' ').trim()
        }
        inData = true
        continue
      }
      
      if (line === 'end') {
        break
      }
      
      if (!inData || line.length === 0) {
        continue
      }
      
      // Decode line
      const length = line.charCodeAt(0) - 32
      if (length === 0) continue
      
      let decoded = ''
      for (let i = 1; i < line.length && decoded.length < length; i += 4) {
        const c0 = line.charCodeAt(i) - 32
        const c1 = i + 1 < line.length ? line.charCodeAt(i + 1) - 32 : 0
        const c2 = i + 2 < line.length ? line.charCodeAt(i + 2) - 32 : 0
        const c3 = i + 3 < line.length ? line.charCodeAt(i + 3) - 32 : 0
        
        decoded += String.fromCharCode((c0 << 2) | (c1 >> 4))
        
        if (decoded.length < length) {
          decoded += String.fromCharCode(((c1 & 0x0F) << 4) | (c2 >> 2))
        }
        
        if (decoded.length < length) {
          decoded += String.fromCharCode(((c2 & 0x03) << 6) | c3)
        }
      }
      
      content += decoded
    }
    
    return { content, filename, mode: fileMode }
  }, [])

  const handleEncode = useCallback(() => {
    try {
      setError(null)
      const result = encodeUuencode(input, filename || "file.txt", fileMode || "644")
      setOutput(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Encoding failed")
      setOutput("")
    }
  }, [input, filename, fileMode, encodeUuencode])

  const handleDecode = useCallback(() => {
    try {
      setError(null)
      const result = decodeUudecode(input)
      setOutput(result.content)
      setFilename(result.filename)
      setFileMode(result.mode)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid Uuencode input")
      setOutput("")
    }
  }, [input, decodeUudecode])

  const handleCopy = useCallback(async (text: string, key: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 1500)
  }, [])

  const handleClear = useCallback(() => {
    setInput("")
    setOutput("")
    setError(null)
    setFilename("file.txt")
    setFileMode("644")
  }, [])

  const handleSwap = useCallback(() => {
    setMode(mode === "encode" ? "decode" : "encode")
    setInput(output)
    setOutput(input)
    setError(null)
  }, [mode, input, output])

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        setInput(text)
        setFilename(file.name)
      }
      reader.readAsText(file)
    }
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Uuencode/Uudecode Tool</h1>
        <p className="text-sm text-muted-foreground">
          Encode binary data to Uuencode format for email transmission and decode Uuencoded data back to binary.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant={mode === "encode" ? "default" : "outline"}
              onClick={() => setMode("encode")}
              className="text-sm"
            >
              Uuencode
            </Button>
            <Button
              variant={mode === "decode" ? "default" : "outline"}
              onClick={() => setMode("decode")}
              className="text-sm"
            >
              Uudecode
            </Button>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <input
              type="file"
              id="file-upload"
              onChange={handleFileUpload}
              className="hidden"
              accept=".txt,.bin"
            />
            <label htmlFor="file-upload">
              <Button variant="outline" size="sm" asChild className="cursor-pointer">
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </span>
              </Button>
            </label>
          </div>
        </div>

        {mode === "encode" && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="filename">Filename</Label>
              <input
                id="filename"
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                placeholder="file.txt"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="filemode">File Mode (Unix permissions)</Label>
              <input
                id="filemode"
                type="text"
                value={fileMode}
                onChange={(e) => setFileMode(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                placeholder="644"
                maxLength={3}
              />
            </div>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="input">
              {mode === "encode" ? "Text to Encode" : "Uuencoded Data"}
            </Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "encode" ? "Enter text to encode..." : "Paste Uuencoded data..."}
              className="min-h-[200px] font-mono text-sm"
            />
            <div className="flex gap-2">
              <Button
                onClick={mode === "encode" ? handleEncode : handleDecode}
                disabled={!input.trim()}
                className="flex-1"
              >
                {mode === "encode" ? "Uuencode" : "Uudecode"}
              </Button>
              <Button
                variant="outline"
                onClick={handleSwap}
                disabled={!input && !output}
                title="Swap input and output"
              >
                ⇅
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleClear}
                disabled={!input && !output}
                title="Clear all"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="output">
              {mode === "encode" ? "Uuencoded Output" : "Decoded Text"}
            </Label>
            <Textarea
              id="output"
              value={output}
              readOnly
              placeholder="Result will appear here..."
              className={cn(
                "min-h-[200px] font-mono text-sm",
                error && "border-destructive focus-visible:ring-destructive"
              )}
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handleCopy(output, "output")}
                disabled={!output}
                className="flex-1"
              >
                {copied === "output" ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium mb-2">About Uuencode</h3>
          <p className="text-sm text-muted-foreground">
            Uuencode (Unix-to-Unix encoding) is a binary-to-text encoding scheme that originated 
            on Unix systems. It converts binary data into ASCII text for safe transmission over 
            email or other text-only channels. The format includes a header with file permissions 
            and filename, followed by encoded data lines, and ends with "end". Each line encodes 
            up to 45 bytes of binary data into 60 ASCII characters.
          </p>
        </div>
      </div>
    </div>
  )
}
