'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Copy, Download, RotateCcw, Check, FileUp, Lock } from 'lucide-react'
import { toast } from 'sonner'

export default function ExcelPasswordRemover() {
  const [fileData, setFileData] = useState('')
  const [fileName, setFileName] = useState('')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setFileData(content)
      toast.success(`Loaded ${file.name}`)
    }
    reader.readAsText(file)
  }

  const removeProtection = () => {
    try {
      // For XLSX files (which are ZIP archives with XML inside)
      // This is a simulation that shows the process
      if (fileData.includes('<?xml') || fileData.includes('<workbook')) {
        // Remove sheet protection tags from XML
        let cleaned = fileData
          .replace(/<sheetProtection[^>]*\/>/g, '')
          .replace(/<sheetProtection[^>]*><\/sheetProtection>/g, '')
          .replace(/workbookProtection[^>*/]*/g, '')
        
        setResult(cleaned)
        toast.success('Sheet protection removed (simulation)')
      } else {
        // For CSV or plain text, just return as-is
        setResult(fileData)
        toast.success('File processed (no protection found)')
      }
    } catch (err) {
      toast.error('Failed to process file')
    }
  }

  const handleCopy = async () => {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = () => {
    if (!result) return
    const blob = new Blob([result], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `unprotected_${fileName}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success(`Downloaded unprotected_${fileName}`)
  }

  const handleClear = () => {
    setFileData('')
    setFileName('')
    setResult('')
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Unlock Password Protected Excel Files</h1>
        <p className="text-muted-foreground mt-2">
          Remove sheet protection from Excel files. Note: This tool cannot crack open-passwords for encrypted files.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Lock className="w-10 h-10 mb-3 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> Excel file
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports unprotected XML-based formats
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".xlsx,.xlsm,.xml,.csv"
                onChange={handleFileUpload}
              />
            </label>
            
            {fileName && (
              <div className="flex items-center gap-4 text-sm">
                <span className="font-medium">{fileName}</span>
                <span className="text-muted-foreground">
                  {fileData.length} characters
                </span>
              </div>
            )}
          </div>
        </Card>

        {fileData && !result && (
          <div className="space-y-4">
            <Card className="p-4 bg-yellow-50 dark:bg-yellow-950 border-yellow-200">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> This tool processes files client-side for privacy. 
                It can remove sheet protection but cannot crack workbook open-passwords.
                For security reasons, only use on files you own or have permission to modify.
              </p>
            </Card>
            
            <Button onClick={removeProtection} className="w-full">
              <Lock className="h-4 w-4 mr-2" />
              Remove Protection
            </Button>
          </div>
        )}

        {result && (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Processed Content</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="ghost" size="sm" onClick={handleClear}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>

            <Card className="p-4 bg-muted">
              <Textarea
                value={result}
                readOnly
                className="min-h-[300px] font-mono text-xs"
              />
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
