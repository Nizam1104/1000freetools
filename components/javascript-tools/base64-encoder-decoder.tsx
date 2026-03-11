'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check, ArrowRightLeft, FileUp } from 'lucide-react'
import { toast } from 'sonner'

export default function Base64EncoderDecoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    try {
      if (mode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(input)))
        setOutput(encoded)
        toast.success('Encoded to Base64')
      } else {
        const decoded = decodeURIComponent(escape(atob(input)))
        setOutput(decoded)
        toast.success('Decoded from Base64')
      }
    } catch (err) {
      toast.error(mode === 'encode' ? 'Encoding failed' : 'Invalid Base64 input')
      setOutput('')
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setInput(content)
      toast.success(`Loaded ${file.name}`)
    }
    reader.readAsText(file)
  }

  const handleCopy = async () => {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = () => {
    if (!output) return
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = mode === 'encode' ? 'encoded.txt' : 'decoded.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success(`Downloaded ${mode === 'encode' ? 'encoded.txt' : 'decoded.txt'}`)
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  const handleSwap = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode')
    setInput(output)
    setOutput(input)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Encode and Decode Base64</h1>
        <p className="text-muted-foreground mt-2">
          Convert text or files to Base64 encoding and decode Base64 strings back to original format.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant={mode === 'encode' ? 'default' : 'outline'}
            onClick={() => setMode('encode')}
          >
            Encode
          </Button>
          <Button variant="ghost" size="icon" onClick={handleSwap}>
            <ArrowRightLeft className="h-4 w-4" />
          </Button>
          <Button
            variant={mode === 'decode' ? 'default' : 'outline'}
            onClick={() => setMode('decode')}
          >
            Decode
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input" className="text-base font-medium">
                {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
              </Label>
              <div className="flex gap-2">
                <label>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".txt,.json,.xml,.csv"
                  />
                  <Button variant="outline" size="sm" asChild>
                    <span>
                      <FileUp className="h-4 w-4 mr-2" />
                      Upload
                    </span>
                  </Button>
                </label>
                <Button variant="ghost" size="sm" onClick={handleClear}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
            <Textarea
              id="input"
              placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string...'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
            />
            <Button onClick={convert} className="w-full">
              {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">
                {mode === 'encode' ? 'Encoded Output' : 'Decoded Output'}
              </Label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy} disabled={!output}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload} disabled={!output}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Card className="p-4 bg-muted min-h-[300px]">
              {output ? (
                <pre className="font-mono text-sm whitespace-pre-wrap break-all">{output}</pre>
              ) : (
                <p className="text-muted-foreground text-sm">Output will appear here</p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
