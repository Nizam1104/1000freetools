'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check, Shield } from 'lucide-react'
import { toast } from 'sonner'

export default function JavaScriptEncryptionTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [key, setKey] = useState('')
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt')
  const [algorithm, setAlgorithm] = useState<'caesar' | 'xor' | 'vigenere'>('caesar')
  const [shift, setShift] = useState(3)
  const [copied, setCopied] = useState(false)

  const process = () => {
    try {
      let result = ''

      if (mode === 'encrypt') {
        switch (algorithm) {
          case 'caesar':
            result = caesarCipher(input, shift)
            break
          case 'xor':
            result = xorCipher(input, key || 'key')
            break
          case 'vigenere':
            result = vigenereCipher(input, key || 'key', true)
            break
        }
        toast.success('Encrypted successfully')
      } else {
        switch (algorithm) {
          case 'caesar':
            result = caesarCipher(input, -shift)
            break
          case 'xor':
            result = xorCipher(input, key || 'key')
            break
          case 'vigenere':
            result = vigenereCipher(input, key || 'key', false)
            break
        }
        toast.success('Decrypted successfully')
      }

      setOutput(result)
    } catch (err) {
      toast.error('Processing failed')
      setOutput('')
    }
  }

  const caesarCipher = (str: string, shift: number): string => {
    return str.replace(/[a-zA-Z]/g, (char) => {
      const base = char >= 'a' ? 97 : 65
      return String.fromCharCode(((char.charCodeAt(0) - base + shift + 26) % 26) + base)
    })
  }

  const xorCipher = (str: string, key: string): string => {
    let result = ''
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      result += String.fromCharCode(charCode)
    }
    // Encode non-printable characters
    return btoa(unescape(encodeURIComponent(result)))
  }

  const vigenereCipher = (str: string, key: string, encrypt: boolean): string => {
    let result = ''
    let keyIndex = 0
    
    for (let i = 0; i < str.length; i++) {
      const char = str[i]
      
      if (char.match(/[a-zA-Z]/)) {
        const base = char >= 'a' ? 97 : 65
        const keyChar = key[keyIndex % key.length].toLowerCase()
        const keyShift = keyChar.charCodeAt(0) - 97
        
        let newShift = encrypt ? keyShift : -keyShift
        let newChar = String.fromCharCode(((char.charCodeAt(0) - base + newShift + 26) % 26) + base)
        
        result += newChar
        keyIndex++
      } else {
        result += char
      }
    }
    
    return result
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
    a.download = mode === 'encrypt' ? 'encrypted.txt' : 'decrypted.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success(`Downloaded ${mode === 'encrypt' ? 'encrypted.txt' : 'decrypted.txt'}`)
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Encrypt and Decrypt Text</h2>
        <p className="text-muted-foreground mt-2">
          Client-side encryption and decryption using classic cipher algorithms.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={mode === 'encrypt' ? 'default' : 'outline'}
            onClick={() => setMode('encrypt')}
          >
            <Shield className="h-4 w-4 mr-2" />
            Encrypt
          </Button>
          <Button
            variant={mode === 'decrypt' ? 'default' : 'outline'}
            onClick={() => setMode('decrypt')}
          >
            Decrypt
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Algorithm:</Label>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={algorithm === 'caesar' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAlgorithm('caesar')}
              >
                Caesar Cipher
              </Button>
              <Button
                variant={algorithm === 'xor' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAlgorithm('xor')}
              >
                XOR Cipher
              </Button>
              <Button
                variant={algorithm === 'vigenere' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAlgorithm('vigenere')}
              >
                Vigenère Cipher
              </Button>
            </div>
          </div>

          {algorithm === 'caesar' && (
            <div className="space-y-2">
              <Label htmlFor="shift">Shift Value:</Label>
              <Input
                id="shift"
                type="number"
                value={shift}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShift(parseInt(e.target.value) || 0)}
                className="w-32"
              />
            </div>
          )}

          {(algorithm === 'xor' || algorithm === 'vigenere') && (
            <div className="space-y-2">
              <Label htmlFor="key">Encryption Key:</Label>
              <Input
                id="key"
                placeholder="Enter secret key"
                value={key}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKey(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input" className="text-base font-medium">
                {mode === 'encrypt' ? 'Text to Encrypt' : 'Text to Decrypt'}
              </Label>
              <Button variant="ghost" size="sm" onClick={handleClear}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
            <Textarea
              id="input"
              placeholder="Enter your text here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[200px]"
            />
            <Button onClick={process} className="w-full">
              {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">
                {mode === 'encrypt' ? 'Encrypted Output' : 'Decrypted Output'}
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
            <Card className="p-4 bg-muted min-h-[200px]">
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
