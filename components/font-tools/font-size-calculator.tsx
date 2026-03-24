'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, RotateCcw, Check, Calculator } from 'lucide-react'
import { toast } from 'sonner'

export default function FontSizeCalculator() {
  const [baseSize, setBaseSize] = useState(16)
  const [targetUnit, setTargetUnit] = useState<'px' | 'pt' | 'em' | 'rem'>('rem')
  const [screenSize, setScreenSize] = useState(1920)
  const [results, setResults] = useState<{ unit: string; value: string }[]>([])
  const [copied, setCopied] = useState(false)

  const calculate = () => {
    const calculations = [
      { unit: 'px', value: baseSize.toString() },
      { unit: 'pt', value: (baseSize * 0.75).toFixed(2) },
      { unit: 'em', value: (baseSize / 16).toFixed(3) },
      { unit: 'rem', value: (baseSize / 16).toFixed(3) },
      { unit: '%', value: ((baseSize / 16) * 100).toFixed(1) },
      { unit: 'vw', value: ((baseSize / screenSize) * 100).toFixed(3) },
    ]
    
    setResults(calculations)
    toast.success('Calculations complete')
  }

  const convertFromUnit = () => {
    // Handle conversion from selected unit
    toast.success('Converted')
  }

  const handleCopyCSS = async () => {
    const css = `/* Font Size Conversions */
.element {
  font-size: ${baseSize}px;
  font-size: ${(baseSize * 0.75).toFixed(2)}pt;
  font-size: ${(baseSize / 16).toFixed(3)}em;
  font-size: ${(baseSize / 16).toFixed(3)}rem;
  font-size: ${((baseSize / 16) * 100).toFixed(1)}%;
}`
    
    try {
      await navigator.clipboard.writeText(css)
      setCopied(true)
      toast.success('CSS copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleClear = () => {
    setBaseSize(16)
    setTargetUnit('rem')
    setScreenSize(1920)
    setResults([])
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Font Size Calculator</h2>
        <p className="text-muted-foreground mt-2">
          Calculate and convert font sizes between pixels, points, ems, and rems for responsive design.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="p-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Base Size (px):</Label>
              <Input
                type="number"
                value={baseSize}
                onChange={(e) => setBaseSize(parseInt(e.target.value) || 16)}
              />
            </div>

            <div className="space-y-2">
              <Label>Screen Width (px):</Label>
              <Input
                type="number"
                value={screenSize}
                onChange={(e) => setScreenSize(parseInt(e.target.value) || 1920)}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={calculate}>
              <Calculator className="h-4 w-4 mr-2" />
              Calculate
            </Button>
            <Button variant="ghost" onClick={handleClear}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </Card>

        {results.length > 0 && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Conversion Results</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {results.map((result) => (
                <Card key={result.unit} className="p-4 bg-muted">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{result.unit}</span>
                    <span className="text-2xl font-bold">{result.value}</span>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between">
                <Label>CSS Output:</Label>
                <Button variant="outline" size="sm" onClick={handleCopyCSS}>
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  Copy CSS
                </Button>
              </div>
              <pre className="bg-muted p-4 rounded text-sm font-mono overflow-x-auto">
{`.element {
  font-size: ${baseSize}px; /* Base size */
  font-size: ${(baseSize * 0.75).toFixed(2)}pt; /* Points */
  font-size: ${(baseSize / 16).toFixed(3)}em; /* Relative to parent */
  font-size: ${(baseSize / 16).toFixed(3)}rem; /* Relative to root */
  font-size: ${((baseSize / 16) * 100).toFixed(1)}%; /* Percentage */
  font-size: ${((baseSize / screenSize) * 100).toFixed(3)}vw; /* Viewport width */
}`}
              </pre>
            </div>
          </Card>
        )}

        <Card className="p-4 bg-blue-50 dark:bg-blue-950">
          <h3 className="font-semibold mb-2">Unit Reference</h3>
          <div className="grid gap-2 md:grid-cols-2 text-sm">
            <div><strong>px:</strong> Absolute pixels</div>
            <div><strong>pt:</strong> Points (1pt = 1/72 inch)</div>
            <div><strong>em:</strong> Relative to parent font size</div>
            <div><strong>rem:</strong> Relative to root font size</div>
            <div><strong>%:</strong> Percentage of parent</div>
            <div><strong>vw:</strong> Viewport width percentage</div>
          </div>
        </Card>
      </div>
    </div>
  )
}
