"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info, Upload, File } from "lucide-react"
import { cn } from "@/lib/utils"

type HashAlgorithm = "crc32" | "md5" | "sha1" | "sha256" | "sha512"

export default function BinaryChecksumHashGenerator() {
  const [inputMode, setInputMode] = useState<"text" | "binary" | "file">("text")
  const [textInput, setTextInput] = useState<string>("")
  const [binaryInput, setBinaryInput] = useState<string>("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>("sha256")
  const [hashResult, setHashResult] = useState<string>("")
  const [checksumResult, setChecksumResult] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [fileContent, setFileContent] = useState<ArrayBuffer | null>(null)

  const textToBinary = useCallback((text: string): string => {
    return text.split("").map((char) => {
      return char.charCodeAt(0).toString(2).padStart(8, "0")
    }).join(" ")
  }, [])

  const binaryToText = useCallback((binary: string): string => {
    const bytes = binary.replace(/\s/g, "").match(/.{1,8}/g) || []
    return bytes.map((byte) => {
      return String.fromCharCode(parseInt(byte, 2))
    }).join("")
  }, [])

  const crc32 = useCallback((data: Uint8Array): string => {
    let crc = 0xFFFFFFFF
    const table: number[] = []

    for (let i = 0; i < 256; i++) {
      let c = i
      for (let j = 0; j < 8; j++) {
        c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1)
      }
      table[i] = c
    }

    for (let i = 0; i < data.length; i++) {
      crc = table[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8)
    }

    return (crc ^ 0xFFFFFFFF) >>> 0
  }, [])

  const md5 = useCallback(async (data: Uint8Array): Promise<string> => {
    const hashBuffer = await crypto.subtle.digest("MD5", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
  }, [])

  const sha1 = useCallback(async (data: Uint8Array): Promise<string> => {
    const hashBuffer = await crypto.subtle.digest("SHA-1", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
  }, [])

  const sha256 = useCallback(async (data: Uint8Array): Promise<string> => {
    const hashBuffer = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
  }, [])

  const sha512 = useCallback(async (data: Uint8Array): Promise<string> => {
    const hashBuffer = await crypto.subtle.digest("SHA-512", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
  }, [])

  const computeHash = useCallback(async (data: Uint8Array, algo: HashAlgorithm) => {
    try {
      setError(null)

      // Compute CRC32 synchronously
      const crcValue = crc32(data).toString(16).padStart(8, "0")
      setChecksumResult(crcValue)

      // Compute selected hash
      let hash: string
      switch (algo) {
        case "crc32":
          hash = crcValue
          break
        case "md5":
          hash = await md5(data)
          break
        case "sha1":
          hash = await sha1(data)
          break
        case "sha256":
          hash = await sha256(data)
          break
        case "sha512":
          hash = await sha512(data)
          break
        default:
          hash = await sha256(data)
      }

      setHashResult(hash)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to compute hash")
      setHashResult("")
      setChecksumResult("")
    }
  }, [crc32, md5, sha1, sha256, sha512])

  const handleTextCompute = useCallback(() => {
    if (!textInput.trim()) {
      setError("Please enter some text")
      return
    }
    const encoder = new TextEncoder()
    const data = encoder.encode(textInput)
    computeHash(data, algorithm)
  }, [textInput, algorithm, computeHash])

  const handleBinaryCompute = useCallback(() => {
    const cleanBinary = binaryInput.replace(/\s/g, "")
    if (!cleanBinary || !/^[01]+$/.test(cleanBinary)) {
      setError("Please enter valid binary data (0s and 1s only)")
      return
    }
    const bytes = new Uint8Array(cleanBinary.match(/.{1,8}/g)?.map(b => parseInt(b, 2)) || [])
    computeHash(bytes, algorithm)
  }, [binaryInput, algorithm, computeHash])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as ArrayBuffer
        setFileContent(content)
        const data = new Uint8Array(content)
        computeHash(data, algorithm)
      }
      reader.readAsArrayBuffer(file)
      setError(null)
    }
  }, [algorithm, computeHash])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const handleClear = useCallback(() => {
    setTextInput("")
    setBinaryInput("")
    setSelectedFile(null)
    setFileContent(null)
    setHashResult("")
    setChecksumResult("")
    setError(null)
  }, [])

  const binaryPreview = useMemo(() => {
    if (textInput) {
      return textToBinary(textInput)
    }
    return ""
  }, [textInput, textToBinary])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Mode Selector */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Input Mode</Label>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={inputMode === "text" ? "default" : "outline"}
            onClick={() => setInputMode("text")}
          >
            Text
          </Button>
          <Button
            variant={inputMode === "binary" ? "default" : "outline"}
            onClick={() => setInputMode("binary")}
          >
            Binary
          </Button>
          <Button
            variant={inputMode === "file" ? "default" : "outline"}
            onClick={() => setInputMode("file")}
          >
            File
          </Button>
        </div>
      </section>

      {/* Input Section */}
      {inputMode === "text" && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="text-input" className="text-base font-medium">
              Enter Text
            </Label>
            <Button variant="ghost" size="xs" onClick={handleClear} className="h-7">
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
          <Textarea
            id="text-input"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="font-mono text-sm min-h-[100px]"
            placeholder="Enter text to hash..."
          />
          {binaryPreview && (
            <div className="rounded-lg border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground mb-1">Binary representation:</p>
              <p className="font-mono text-xs break-all">{binaryPreview}</p>
            </div>
          )}
          <Button onClick={handleTextCompute} disabled={!textInput.trim()} className="w-full">
            Compute Hash
          </Button>
        </section>
      )}

      {inputMode === "binary" && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="binary-input" className="text-base font-medium">
              Enter Binary Data
            </Label>
            <Button variant="ghost" size="xs" onClick={handleClear} className="h-7">
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
          <Textarea
            id="binary-input"
            value={binaryInput}
            onChange={(e) => setBinaryInput(e.target.value.replace(/[^01\s]/g, ""))}
            className="font-mono text-sm min-h-[100px]"
            placeholder="Enter binary data (e.g., 01001000 01100101 01101100 01101100 01101111)"
          />
          <Button onClick={handleBinaryCompute} disabled={!binaryInput.replace(/\s/g, "")} className="w-full">
            Compute Hash
          </Button>
        </section>
      )}

      {inputMode === "file" && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="file-upload" className="text-base font-medium">
              Upload File
            </Label>
            <Button variant="ghost" size="xs" onClick={handleClear} className="h-7">
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
          <Input
            id="file-upload"
            type="file"
            onChange={handleFileUpload}
            className="cursor-pointer"
          />
          {selectedFile && (
            <div className="rounded-lg border bg-muted/30 p-4 flex items-center gap-3">
              <File className="size-8 text-muted-foreground" />
              <div>
                <p className="font-medium text-sm">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Algorithm Selector */}
      <section className="space-y-3">
        <Label htmlFor="algorithm" className="text-base font-medium">
          Hash Algorithm
        </Label>
        <Select value={algorithm} onValueChange={(v) => setAlgorithm(v as HashAlgorithm)}>
          <SelectTrigger id="algorithm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="crc32">CRC32</SelectItem>
            <SelectItem value="md5">MD5</SelectItem>
            <SelectItem value="sha1">SHA-1</SelectItem>
            <SelectItem value="sha256">SHA-256</SelectItem>
            <SelectItem value="sha512">SHA-512</SelectItem>
          </SelectContent>
        </Select>
      </section>

      {/* Results */}
      {(hashResult || checksumResult) && (
        <section className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Checksum (CRC32)</Label>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(checksumResult, "checksum")}
                className="h-7"
              >
                {copied === "checksum" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="font-mono text-lg">{checksumResult}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">
                Hash ({algorithm.toUpperCase()})
              </Label>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(hashResult, "hash")}
                className="h-7"
              >
                {copied === "hash" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="font-mono text-lg break-all">{hashResult}</p>
            </div>
          </div>
        </section>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Checksums & Hashes</h4>
            <p className="text-sm text-muted-foreground">
              <strong>CRC32</strong> is a checksum algorithm used to detect errors in data transmission.
              <strong>MD5</strong> produces a 128-bit hash (not recommended for security).
              <strong>SHA-1</strong> produces a 160-bit hash (deprecated for security).
              <strong>SHA-256</strong> and <strong>SHA-512</strong> are secure cryptographic hash functions
              from the SHA-2 family, producing 256-bit and 512-bit hashes respectively.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
