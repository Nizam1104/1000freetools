"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Upload, Download, Trash2, Info, File, Search } from "lucide-react"
import { cn } from "@/lib/utils"

type ViewMode = "hex" | "binary" | "decimal" | "ascii"

export default function BinaryFileViewerEditor() {
  const [fileData, setFileData] = useState<Uint8Array | null>(null)
  const [fileName, setFileName] = useState<string>("")
  const [viewMode, setViewMode] = useState<ViewMode>("hex")
  const [bytesPerRow, setBytesPerRow] = useState<number>(16)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [searchResults, setSearchResults] = useState<number[]>([])
  const [currentSearchIndex, setCurrentSearchIndex] = useState<number>(0)
  const [selectedOffset, setSelectedOffset] = useState<number | null>(null)
  const [editValue, setEditValue] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as ArrayBuffer
        setFileData(new Uint8Array(content))
        setError(null)
      }
      reader.onerror = () => {
        setError("Failed to read file")
      }
      reader.readAsArrayBuffer(file)
    }
  }, [])

  const formatByte = useCallback((byte: number, mode: ViewMode): string => {
    switch (mode) {
      case "hex":
        return byte.toString(16).padStart(2, "0").toUpperCase()
      case "binary":
        return byte.toString(2).padStart(8, "0")
      case "decimal":
        return byte.toString().padStart(3, " ")
      case "ascii":
        return byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : "."
      default:
        return byte.toString(16).padStart(2, "0").toUpperCase()
    }
  }, [])

  const getHexDump = useCallback((): React.JSX.Element[] => {
    if (!fileData) return []

    const rows: React.JSX.Element[] = []
    for (let i = 0; i < fileData.length; i += bytesPerRow) {
      const rowBytes = fileData.slice(i, i + bytesPerRow)
      const offset = i.toString(16).padStart(8, "0").toUpperCase()
      const isMatch = searchResults.includes(i)

      const hexCells: React.JSX.Element[] = []
      const asciiCells: React.JSX.Element[] = []

      for (let j = 0; j < bytesPerRow; j++) {
        const byte = rowBytes[j]
        const absoluteOffset = i + j
        const isSelected = selectedOffset === absoluteOffset
        const isSearchMatch = searchResults.includes(absoluteOffset)

        hexCells.push(
          <span
            key={j}
            className={cn(
              "inline-block w-8 text-center font-mono text-sm cursor-pointer hover:bg-muted rounded px-1",
              isSelected && "bg-primary text-primary-foreground",
              isSearchMatch && "bg-yellow-200 dark:bg-yellow-800"
            )}
            onClick={() => {
              setSelectedOffset(absoluteOffset)
              setEditValue(formatByte(byte, viewMode))
            }}
          >
            {byte !== undefined ? formatByte(byte, viewMode) : "  "}
          </span>
        )

        if (byte !== undefined) {
          const char = byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : "."
          asciiCells.push(
            <span
              key={`ascii-${j}`}
              className={cn(
                "inline-block w-4 text-center font-mono text-sm",
                isSearchMatch && "bg-yellow-200 dark:bg-yellow-800"
              )}
            >
              {char}
            </span>
          )
        }
      }

      rows.push(
        <div key={i} className={cn("flex items-center gap-2 py-1", isMatch && "bg-yellow-100 dark:bg-yellow-900")}>
          <span className="font-mono text-xs text-muted-foreground w-20">{offset}</span>
          <span className="font-mono">{hexCells}</span>
          <span className="font-mono text-muted-foreground border-l pl-2">{asciiCells}</span>
        </div>
      )
    }

    return rows
  }, [fileData, bytesPerRow, viewMode, formatByte, searchResults, selectedOffset])

  const handleSearch = useCallback(() => {
    if (!fileData || !searchTerm) {
      setSearchResults([])
      setCurrentSearchIndex(0)
      return
    }

    const results: number[] = []
    const searchBytes = new TextEncoder().encode(searchTerm)

    for (let i = 0; i <= fileData.length - searchBytes.length; i++) {
      let found = true
      for (let j = 0; j < searchBytes.length; j++) {
        if (fileData[i + j] !== searchBytes[j]) {
          found = false
          break
        }
      }
      if (found) {
        results.push(i)
      }
    }

    setSearchResults(results)
    setCurrentSearchIndex(0)
    if (results.length > 0) {
      setSelectedOffset(results[0])
    }
  }, [fileData, searchTerm])

  const handleNextResult = useCallback(() => {
    if (searchResults.length === 0) return
    const nextIndex = (currentSearchIndex + 1) % searchResults.length
    setCurrentSearchIndex(nextIndex)
    setSelectedOffset(searchResults[nextIndex])
  }, [searchResults, currentSearchIndex])

  const handlePrevResult = useCallback(() => {
    if (searchResults.length === 0) return
    const prevIndex = (currentSearchIndex - 1 + searchResults.length) % searchResults.length
    setCurrentSearchIndex(prevIndex)
    setSelectedOffset(searchResults[prevIndex])
  }, [searchResults, currentSearchIndex])

  const handleEditByte = useCallback(() => {
    if (selectedOffset === null || !fileData || !editValue) return

    const newData = new Uint8Array(fileData)
    let newValue: number

    switch (viewMode) {
      case "hex":
        newValue = parseInt(editValue, 16)
        break
      case "binary":
        newValue = parseInt(editValue, 2)
        break
      case "decimal":
        newValue = parseInt(editValue, 10)
        break
      case "ascii":
        newValue = editValue.charCodeAt(0)
        break
      default:
        return
    }

    if (!isNaN(newValue) && newValue >= 0 && newValue <= 255) {
      newData[selectedOffset] = newValue
      setFileData(newData)
    }
  }, [selectedOffset, fileData, editValue, viewMode])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const downloadFile = useCallback(() => {
    if (!fileData) return
    const blob = new Blob([fileData.buffer as ArrayBuffer])
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = fileName || "edited-file.bin"
    link.click()
    URL.revokeObjectURL(url)
  }, [fileData, fileName])

  const handleClear = useCallback(() => {
    setFileData(null)
    setFileName("")
    setSearchTerm("")
    setSearchResults([])
    setSelectedOffset(null)
    setEditValue("")
    setError(null)
  }, [])

  const stats = useMemo(() => {
    if (!fileData) return null
    return {
      size: fileData.length,
      sizeKB: (fileData.length / 1024).toFixed(2),
      sizeMB: (fileData.length / (1024 * 1024)).toFixed(4),
    }
  }, [fileData])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* File Upload */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="file-upload" className="text-base font-medium">
            Upload File
          </Label>
          <Button variant="ghost" size="xs" onClick={handleClear} className="h-7" disabled={!fileData}>
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
        {fileData && (
          <div className="rounded-lg border bg-muted/30 p-4 flex items-center gap-3">
            <File className="size-8 text-muted-foreground" />
            <div className="flex-1">
              <p className="font-medium text-sm">{fileName}</p>
              <p className="text-xs text-muted-foreground">
                {stats?.size} bytes ({stats?.sizeKB} KB / {stats?.sizeMB} MB)
              </p>
            </div>
          </div>
        )}
      </section>

      {/* View Options */}
      {fileData && (
        <>
          <section className="space-y-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="view-mode" className="text-sm">View Mode</Label>
                <Select value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
                  <SelectTrigger id="view-mode">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hex">Hexadecimal</SelectItem>
                    <SelectItem value="binary">Binary</SelectItem>
                    <SelectItem value="decimal">Decimal</SelectItem>
                    <SelectItem value="ascii">ASCII</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bytes-per-row" className="text-sm">Bytes Per Row</Label>
                <Select value={bytesPerRow.toString()} onValueChange={(v) => setBytesPerRow(parseInt(v))}>
                  <SelectTrigger id="bytes-per-row">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8">8</SelectItem>
                    <SelectItem value="16">16</SelectItem>
                    <SelectItem value="24">24</SelectItem>
                    <SelectItem value="32">32</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Search */}
            <div className="space-y-2">
              <Label className="text-sm">Search in File</Label>
              <div className="flex gap-2">
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search text..."
                  className="flex-1"
                />
                <Button onClick={handleSearch} size="sm">
                  <Search className="size-4 mr-1" />
                  Search
                </Button>
                {searchResults.length > 0 && (
                  <>
                    <Button variant="outline" size="sm" onClick={handlePrevResult}>
                      Prev
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleNextResult}>
                      Next
                    </Button>
                    <span className="text-sm text-muted-foreground self-center">
                      {currentSearchIndex + 1} / {searchResults.length}
                    </span>
                  </>
                )}
              </div>
              {searchResults.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  Found {searchResults.length} matches
                </p>
              )}
            </div>
          </section>

          {/* Hex Dump */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">
                File Contents ({viewMode.toUpperCase()} View)
              </Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(
                    Array.from(fileData).map(b => formatByte(b, viewMode)).join(" "),
                    "content"
                  )}
                >
                  {copied === "content" ? <Check className="size-4" /> : <Copy className="size-4" />}
                  <span className="ml-1">Copy</span>
                </Button>
                <Button variant="outline" size="sm" onClick={downloadFile}>
                  <Download className="size-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 max-h-96 overflow-auto font-mono text-sm">
              {getHexDump()}
            </div>
          </section>

          {/* Byte Editor */}
          {selectedOffset !== null && (
            <section className="space-y-3">
              <Label className="text-base font-medium">Edit Byte</Label>
              <div className="flex gap-2 items-end">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="edit-value" className="text-xs">
                    Offset: 0x{selectedOffset.toString(16).padStart(8, "0").toUpperCase()} ({selectedOffset})
                  </Label>
                  <Input
                    id="edit-value"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    placeholder={`Enter ${viewMode} value`}
                  />
                </div>
                <Button onClick={handleEditByte}>
                  Update
                </Button>
              </div>
            </section>
          )}

          {/* Statistics */}
          <section className="rounded-lg border bg-muted/30 p-4">
            <h3 className="text-sm font-medium mb-3">File Statistics</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Total Bytes</p>
                <p className="font-mono font-medium">{stats?.size.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Size (KB)</p>
                <p className="font-mono font-medium">{stats?.sizeKB}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Size (MB)</p>
                <p className="font-mono font-medium">{stats?.sizeMB}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Search Matches</p>
                <p className="font-mono font-medium">{searchResults.length}</p>
              </div>
            </div>
          </section>
        </>
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
            <h4 className="text-sm font-medium">About Binary File Viewer</h4>
            <p className="text-sm text-muted-foreground">
              This hex editor allows you to view and edit any file at the byte level. 
              Click on any byte to edit it. Use the search function to find text patterns.
              Changes are made in memory - download the file to save your edits.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
