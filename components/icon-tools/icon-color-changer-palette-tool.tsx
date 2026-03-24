'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check, Palette } from 'lucide-react'
import { toast } from 'sonner'

export default function IconColorChanger() {
  const [svgData, setSvgData] = useState('')
  const [svgName, setSvgName] = useState('')
  const [originalColor, setOriginalColor] = useState('#000000')
  const [newColor, setNewColor] = useState('#3B82F6')
  const [convertedSvg, setConvertedSvg] = useState('')
  const [copied, setCopied] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setSvgName(file.name)
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setSvgData(content)
      
      // Try to detect the current color
      const colorMatch = content.match(/fill="([^"]+)"/)
      if (colorMatch && colorMatch[1] !== 'none' && colorMatch[1] !== 'transparent') {
        setOriginalColor(colorMatch[1])
      }
      
      toast.success(`Loaded ${file.name}`)
    }
    reader.readAsText(file)
  }

  const changeColor = () => {
    if (!svgData) {
      toast.error('Please upload an SVG first')
      return
    }

    try {
      // Replace fill colors
      let result = svgData
        .replace(/fill="[^"]*"/g, `fill="${newColor}"`)
        .replace(/fill:#[^;"]+/g, `fill:${newColor}`)
        .replace(/stroke="[^"]*"/g, `stroke="${newColor}"`)
      
      setConvertedSvg(result)
      toast.success('Color changed')
    } catch (err) {
      toast.error('Failed to change color')
    }
  }

  const handleDownload = () => {
    if (!convertedSvg) return
    
    const blob = new Blob([convertedSvg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${svgName.split('.')[0]}-colored.svg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded colored SVG')
  }

  const handleCopy = async () => {
    if (!convertedSvg) return
    try {
      await navigator.clipboard.writeText(convertedSvg)
      setCopied(true)
      toast.success('SVG code copied')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleClear = () => {
    setSvgData('')
    setSvgName('')
    setConvertedSvg('')
  }

  const presetColors = [
    '#000000', '#FFFFFF', '#EF4444', '#F97316', '#F59E0B', '#84CC16',
    '#10B981', '#06B6D4', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899',
  ]

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Change Icon Colors Instantly</h2>
        <p className="text-muted-foreground mt-2">
          Recolor SVG and PNG icons by adjusting hue, saturation, or applying custom colors.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex flex-col items-center justify-center gap-4">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50">
                <div className="flex flex-col items-center justify-center">
                  <Palette className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> SVG
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".svg"
                  onChange={handleFileUpload}
                />
              </label>
              
              {svgName && (
                <div className="flex items-center gap-4 text-sm">
                  <span className="font-medium">{svgName}</span>
                  <Button variant="ghost" size="sm" onClick={handleClear}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-4 space-y-4">
            <div className="space-y-2">
              <Label>Original Color:</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={originalColor}
                  onChange={(e) => setOriginalColor(e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={originalColor}
                  onChange={(e) => setOriginalColor(e.target.value)}
                  className="flex-1 font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>New Color:</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="flex-1 font-mono"
                />
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setNewColor(color)}
                    className="w-8 h-8 rounded border-2"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <Button onClick={changeColor} className="w-full" disabled={!svgData}>
              <Palette className="h-4 w-4 mr-2" />
              Change Color
            </Button>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Preview</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!convertedSvg}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!convertedSvg}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <Label className="mb-2 block text-sm">Original</Label>
              <div className="aspect-square bg-muted rounded flex items-center justify-center">
                {svgData ? (
                  <div dangerouslySetInnerHTML={{ __html: svgData }} className="w-24 h-24" />
                ) : (
                  <p className="text-muted-foreground text-sm">Upload SVG</p>
                )}
              </div>
            </Card>

            <Card className="p-4">
              <Label className="mb-2 block text-sm">New Color</Label>
              <div className="aspect-square bg-muted rounded flex items-center justify-center">
                {convertedSvg ? (
                  <div dangerouslySetInnerHTML={{ __html: convertedSvg }} className="w-24 h-24" />
                ) : (
                  <p className="text-muted-foreground text-sm">Result</p>
                )}
              </div>
            </Card>
          </div>

          {convertedSvg && (
            <Card className="p-4">
              <Label className="mb-2 block">SVG Code:</Label>
              <pre className="text-xs font-mono overflow-x-auto bg-muted p-2 rounded max-h-[200px] overflow-y-auto">
                {convertedSvg}
              </pre>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
