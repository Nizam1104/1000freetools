"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface OutlierResult {
  method: string
  outliers: number[]
  outlierIndices: number[]
  lowerBound?: number
  upperBound?: number
  threshold?: number
}

export default function OutlierDetector() {
  const [data, setData] = useState<string>("12, 15, 18, 20, 22, 25, 28, 30, 32, 35, 38, 40, 42, 45, 50, 55, 60, 65, 70, 150")
  const [methods, setMethods] = useState<{[key: string]: boolean}>({
    iqr: true,
    zscore: true,
    modifiedZ: true,
    mad: false
  })
  const [zThreshold, setZThreshold] = useState<number>(3)
  const [iqrMultiplier, setIqrMultiplier] = useState<number>(1.5)

  const [results, setResults] = useState<OutlierResult[]>([])
  const [copied, setCopied] = useState<string | null>(null)

  const parseData = useCallback((): number[] => {
    return data
      .split(/[\s,\n]+/)
      .map(s => parseFloat(s.trim()))
      .filter(n => !isNaN(n))
  }, [data])

  const calculateStats = useCallback((values: number[]) => {
    const n = values.length
    const sorted = [...values].sort((a, b) => a - b)
    const mean = values.reduce((a, b) => a + b, 0) / n
    
    // Standard deviation
    const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / (n - 1)
    const stdDev = Math.sqrt(variance)
    
    // Median
    const median = n % 2 === 0
      ? (sorted[n/2 - 1] + sorted[n/2]) / 2
      : sorted[Math.floor(n/2)]
    
    // Quartiles
    const q1Index = Math.floor(n * 0.25)
    const q3Index = Math.floor(n * 0.75)
    const q1 = sorted[q1Index]
    const q3 = sorted[q3Index]
    const iqr = q3 - q1
    
    // MAD (Median Absolute Deviation)
    const absDeviations = values.map(v => Math.abs(v - median)).sort((a, b) => a - b)
    const mad = absDeviations[Math.floor(n/2)]
    
    return { n, mean, stdDev, median, q1, q3, iqr, mad, sorted }
  }, [])

  const detectOutliers = useCallback(() => {
    const values = parseData()
    if (values.length < 4) return
    
    const stats = calculateStats(values)
    const newResults: OutlierResult[] = []

    // IQR Method
    if (methods.iqr) {
      const lowerBound = stats.q1 - iqrMultiplier * stats.iqr
      const upperBound = stats.q3 + iqrMultiplier * stats.iqr
      const outliers: number[] = []
      const indices: number[] = []
      
      values.forEach((v, i) => {
        if (v < lowerBound || v > upperBound) {
          outliers.push(v)
          indices.push(i)
        }
      })
      
      newResults.push({
        method: "IQR Method",
        outliers,
        outlierIndices: indices,
        lowerBound,
        upperBound
      })
    }

    // Z-Score Method
    if (methods.zscore && stats.stdDev > 0) {
      const outliers: number[] = []
      const indices: number[] = []
      
      values.forEach((v, i) => {
        const zScore = Math.abs((v - stats.mean) / stats.stdDev)
        if (zScore > zThreshold) {
          outliers.push(v)
          indices.push(i)
        }
      })
      
      newResults.push({
        method: `Z-Score Method (threshold: ${zThreshold})`,
        outliers,
        outlierIndices: indices,
        threshold: zThreshold
      })
    }

    // Modified Z-Score Method (using MAD)
    if (methods.modifiedZ && stats.mad > 0) {
      const outliers: number[] = []
      const indices: number[] = []
      const k = 0.6745 // Consistency constant for normal distribution
      
      values.forEach((v, i) => {
        const modifiedZ = Math.abs((v - stats.median) / (stats.mad / k))
        if (modifiedZ > 3.5) {
          outliers.push(v)
          indices.push(i)
        }
      })
      
      newResults.push({
        method: "Modified Z-Score Method",
        outliers,
        outlierIndices: indices,
        threshold: 3.5
      })
    }

    // MAD Method
    if (methods.mad && stats.mad > 0) {
      const outliers: number[] = []
      const indices: number[] = []
      const threshold = 3 * stats.mad
      
      values.forEach((v, i) => {
        if (Math.abs(v - stats.median) > threshold) {
          outliers.push(v)
          indices.push(i)
        }
      })
      
      newResults.push({
        method: "MAD Method",
        outliers,
        outlierIndices: indices,
        lowerBound: stats.median - threshold,
        upperBound: stats.median + threshold
      })
    }

    setResults(newResults)
  }, [data, methods, zThreshold, iqrMultiplier, parseData, calculateStats])

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
    setData("12, 15, 18, 20, 22, 25, 28, 30, 32, 35, 38, 40, 42, 45, 50, 55, 60, 65, 70, 150")
    setResults([])
  }, [])

  const stats = useMemo(() => {
    const values = parseData()
    if (values.length < 4) return null
    return calculateStats(values)
  }, [data, parseData, calculateStats])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Outlier Detector</h2>
        <p className="text-sm text-muted-foreground">
          Detect outliers in your data using multiple statistical methods
        </p>
      </div>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="data" className="text-base font-medium">
            Data Values
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(data, "input")}
              className="h-7"
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={handleClear}
              className="h-7"
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Textarea
          id="data"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="font-mono text-sm min-h-[100px]"
          placeholder="Enter numbers separated by commas or spaces..."
        />
      </section>

      {/* Methods Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Detection Methods</Label>
        <div className="grid gap-3 md:grid-cols-2">
          <Label className="flex items-center gap-2 text-sm cursor-pointer p-3 rounded-lg border">
            <input
              type="checkbox"
              checked={methods.iqr}
              onChange={(e) => setMethods({...methods, iqr: e.target.checked})}
              className="rounded border-border"
            />
            <div>
              <p className="font-medium">IQR Method</p>
              <p className="text-xs text-muted-foreground">Interquartile Range (most common)</p>
            </div>
          </Label>

          <Label className="flex items-center gap-2 text-sm cursor-pointer p-3 rounded-lg border">
            <input
              type="checkbox"
              checked={methods.zscore}
              onChange={(e) => setMethods({...methods, zscore: e.target.checked})}
              className="rounded border-border"
            />
            <div>
              <p className="font-medium">Z-Score Method</p>
              <p className="text-xs text-muted-foreground">Standard deviations from mean</p>
            </div>
          </Label>

          <Label className="flex items-center gap-2 text-sm cursor-pointer p-3 rounded-lg border">
            <input
              type="checkbox"
              checked={methods.modifiedZ}
              onChange={(e) => setMethods({...methods, modifiedZ: e.target.checked})}
              className="rounded border-border"
            />
            <div>
              <p className="font-medium">Modified Z-Score</p>
              <p className="text-xs text-muted-foreground">Using MAD (robust)</p>
            </div>
          </Label>

          <Label className="flex items-center gap-2 text-sm cursor-pointer p-3 rounded-lg border">
            <input
              type="checkbox"
              checked={methods.mad}
              onChange={(e) => setMethods({...methods, mad: e.target.checked})}
              className="rounded border-border"
            />
            <div>
              <p className="font-medium">MAD Method</p>
              <p className="text-xs text-muted-foreground">Median Absolute Deviation</p>
            </div>
          </Label>
        </div>
      </section>

      {/* Threshold Settings */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="zThreshold">Z-Score Threshold</Label>
          <Input
            id="zThreshold"
            type="number"
            step="0.5"
            min="1"
            max="5"
            value={zThreshold}
            onChange={(e) => setZThreshold(parseFloat(e.target.value) || 3)}
          />
          <p className="text-xs text-muted-foreground">Common values: 2, 2.5, 3</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="iqrMultiplier">IQR Multiplier</Label>
          <Input
            id="iqrMultiplier"
            type="number"
            step="0.1"
            min="1"
            max="3"
            value={iqrMultiplier}
            onChange={(e) => setIqrMultiplier(parseFloat(e.target.value) || 1.5)}
          />
          <p className="text-xs text-muted-foreground">1.5 = mild, 3.0 = extreme outliers</p>
        </div>
      </section>

      <Button onClick={detectOutliers} className="w-full">
        Detect Outliers
      </Button>

      {/* Statistics Summary */}
      {stats && (
        <section className="rounded-lg border bg-muted/30 p-4">
          <h4 className="text-sm font-medium mb-3">Data Summary</h4>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">N</p>
              <p className="font-mono">{stats.n}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Mean</p>
              <p className="font-mono">{stats.mean.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Median</p>
              <p className="font-mono">{stats.median.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Std Dev</p>
              <p className="font-mono">{stats.stdDev.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">IQR</p>
              <p className="font-mono">{stats.iqr.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">MAD</p>
              <p className="font-mono">{stats.mad.toFixed(2)}</p>
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {results.length > 0 && (
        <section className="space-y-4">
          {results.map((result, index) => (
            <div key={index} className="rounded-lg border bg-muted/30 p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium">{result.method}</h4>
                {result.outliers.length > 0 && (
                  <span className="flex items-center gap-1 text-amber-600 text-sm">
                    <AlertTriangle className="size-4" />
                    {result.outliers.length} outlier(s) found
                  </span>
                )}
              </div>

              {result.outliers.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-muted-foreground">Outliers:</span>{' '}
                    <span className="font-mono text-red-600">{result.outliers.join(", ")}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-muted-foreground">At indices:</span>{' '}
                    <span className="font-mono">{result.outlierIndices.join(", ")}</span>
                  </p>
                  {result.lowerBound !== undefined && result.upperBound !== undefined && (
                    <p className="text-sm">
                      <span className="text-muted-foreground">Bounds:</span>{' '}
                      <span className="font-mono">[{result.lowerBound.toFixed(2)}, {result.upperBound.toFixed(2)}]</span>
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-green-600">No outliers detected</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Outlier Detection</h4>
            <p className="text-sm text-muted-foreground">
              <strong>IQR Method:</strong> Values below Q1 - 1.5×IQR or above Q3 + 1.5×IQR are outliers.
              Most robust for skewed distributions.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Z-Score Method:</strong> Values more than k standard deviations from the mean.
              Assumes normal distribution.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Modified Z-Score:</strong> Uses median and MAD instead of mean and std dev.
              More robust to outliers themselves.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
