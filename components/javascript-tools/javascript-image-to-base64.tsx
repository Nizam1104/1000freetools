'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'

export default function JavaScriptImageToBase64() {
  const [base64, setBase64] = useState('')
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState('')
  const [copied, setCopied] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setFileSize(formatFileSize(file.size))

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setBase64(result)
      toast.success('Image converted to Base64')
    }
    reader.onerror = () => {
      toast.error('Failed to read file')
    }
    reader.readAsDataURL(file)
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const handleCopy = async () => {
    if (!base64) return
    try {
      await navigator.clipboard.writeText(base64)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleCopyDataUrl = async () => {
    if (!base64) return
    try {
      await navigator.clipboard.writeText(base64)
      setCopied(true)
      toast.success('Data URL copied')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = () => {
    if (!base64) return
    const blob = new Blob([base64], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${fileName.split('.')[0] || 'image'}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded Base64 string')
  }

  const handleClear = () => {
    setBase64('')
    setFileName('')
    setFileSize('')
  }

  const getImageType = () => {
    if (!base64) return 'Unknown'
    if (base64.startsWith('data:image/png')) return 'PNG'
    if (base64.startsWith('data:image/jpeg')) return 'JPEG'
    if (base64.startsWith('data:image/gif')) return 'GIF'
    if (base64.startsWith('data:image/webp')) return 'WebP'
    if (base64.startsWith('data:image/svg')) return 'SVG'
    return 'Unknown'
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Convert Images to Base64 Data URLs</h2>
        <p className="text-muted-foreground mt-2">
          Turn any image into a Base64 Data URL string for embedding directly in HTML or CSS.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ImageIcon className="w-10 h-10 mb-3 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">PNG, JPG, GIF, WebP, SVG</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </label>
            
            {fileName && (
              <div className="flex items-center gap-4 text-sm">
                <span className="font-medium">{fileName}</span>
                <span className="text-muted-foreground">{fileSize}</span>
                <span className="bg-muted px-2 py-1 rounded">{getImageType()}</span>
              </div>
            )}
          </div>
        </Card>

        {base64 && (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Base64 Output</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  Copy All
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
                value={base64}
                readOnly
                className="min-h-[200px] font-mono text-xs"
              />
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-4">
                <h3 className="font-semibold mb-2">CSS Usage</h3>
                <pre className="bg-muted p-3 rounded text-xs font-mono overflow-x-auto">
{`.image {
  background-image: url('${base64.slice(0, 100)}...');
  background-size: cover;
}`}
                </pre>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-2">HTML Usage</h3>
                <pre className="bg-muted p-3 rounded text-xs font-mono overflow-x-auto">
{`<img src="${base64.slice(0, 100)}..." alt="${fileName}" />`}
                </pre>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
