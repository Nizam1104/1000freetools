"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface RegressionResult {
  slope: number
  intercept: number
  rSquared: number
  r: number
  stdError: number
  predictions: { x: number; y: number; predicted: number; residual: number }[]
  equation: string
}

export default function LinearRegressionCalculator() {
  const [dataX, setDataX] = useState<string>("1, 2, 3, 4, 5, 6, 7, 8, 9, 10")
  const [dataY, setDataY] = useState<string>("2.1, 3.9, 6.2, 7.8, 10.1, 12.3, 14.2, 16.1, 18.2, 20.1")
  const [predictX, setPredictX] = useState<number>(15)
  const [result, setResult] = useState<RegressionResult | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calculateRegression = useCallback(() => {
    try {
      const xValues = dataX.split(/[\s,\n]+/).map(s => parseFloat(s.trim())).filter(n => !isNaN(n))
      const yValues = dataY.split(/[\s,\n]+/).map(s => parseFloat(s.trim())).filter(n => !isNaN(n))

      if (xValues.length !== yValues.length || xValues.length < 2) {
        throw new Error("Please enter matching X and Y values (at least 2 pairs)")
      }

      const n = xValues.length

      // Calculate means
      const meanX = xValues.reduce((a, b) => a + b, 0) / n
      const meanY = yValues.reduce((a, b) => a + b, 0) / n

      // Calculate slope (b) and intercept (a)
      let sumXY = 0, sumXX = 0
      for (let i = 0; i < n; i++) {
        sumXY += (xValues[i] - meanX) * (yValues[i] - meanY)
        sumXX += Math.pow(xValues[i] - meanX, 2)
      }

      const slope = sumXY / sumXX
      const intercept = meanY - slope * meanX

      // Calculate R-squared
      let ssRes = 0, ssTot = 0
      const predictions: RegressionResult["predictions"] = []

      for (let i = 0; i < n; i++) {
        const predicted = slope * xValues[i] + intercept
        const residual = yValues[i] - predicted
        ssRes += Math.pow(residual, 2)
        ssTot += Math.pow(yValues[i] - meanY, 2)
        predictions.push({ x: xValues[i], y: yValues[i], predicted, residual })
      }

      const rSquared = 1 - (ssRes / ssTot)
      const r = Math.sqrt(rSquared) * (slope >= 0 ? 1 : -1)

      // Standard error of estimate
      const stdError = Math.sqrt(ssRes / (n - 2))

      // Prediction
      const predictedY = slope * predictX + intercept

      setResult({
        slope,
        intercept,
        rSquared,
        r,
        stdError,
        predictions,
        equation: `y = ${slope.toFixed(4)}x ${intercept >= 0 ? "+" : ""}${intercept.toFixed(4)}`
      })
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation failed")
      setResult(null)
    }
  }, [dataX, dataY, predictX])

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
    setDataX("1, 2, 3, 4, 5, 6, 7, 8, 9, 10")
    setDataY("2.1, 3.9, 6.2, 7.8, 10.1, 12.3, 14.2, 16.1, 18.2, 20.1")
    setPredictX(15)
    setResult(null)
    setError(null)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Linear Regression Calculator</h2>
        <p className="text-sm text-muted-foreground">
          Calculate linear regression and make predictions
        </p>
      </div>

      {/* Input Section */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="dataX">X Values (Independent Variable)</Label>
          <Textarea
            id="dataX"
            value={dataX}
            onChange={(e) => setDataX(e.target.value)}
            className="font-mono text-sm min-h-[120px]"
            placeholder="Enter X values separated by commas..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dataY">Y Values (Dependent Variable)</Label>
          <Textarea
            id="dataY"
            value={dataY}
            onChange={(e) => setDataY(e.target.value)}
            className="font-mono text-sm min-h-[120px]"
            placeholder="Enter Y values separated by commas..."
          />
        </div>
      </section>

      {/* Prediction */}
      <section className="space-y-2">
        <Label htmlFor="predictX">Predict Y for X =</Label>
        <div className="flex gap-2">
          <Input
            id="predictX"
            type="number"
            value={predictX}
            onChange={(e) => setPredictX(parseFloat(e.target.value) || 0)}
            className="w-32"
          />
        </div>
      </section>

      <div className="flex gap-2">
        <Button onClick={calculateRegression} className="flex-1">
          Calculate Regression
        </Button>
        <Button variant="outline" onClick={handleClear}>
          <Trash2 className="size-4" />
        </Button>
      </div>

      {/* Results */}
      {result && (
        <section className="space-y-4">
          {/* Main Results */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Slope (β₁)</p>
              <p className="text-2xl font-bold font-mono">{result.slope.toFixed(4)}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Intercept (β₀)</p>
              <p className="text-2xl font-bold font-mono">{result.intercept.toFixed(4)}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">R²</p>
              <p className="text-2xl font-bold font-mono">{result.rSquared.toFixed(4)}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-xs text-muted-foreground">R</p>
              <p className="text-2xl font-bold font-mono">{result.r.toFixed(4)}</p>
            </div>
          </div>

          {/* Equation */}
          <div className="rounded-lg border bg-primary/10 p-4 text-center">
            <p className="text-lg font-mono">{result.equation}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Standard Error: {result.stdError.toFixed(4)}
            </p>
          </div>

          {/* Prediction */}
          <div className="rounded-lg border bg-green-50 p-4">
            <p className="text-sm text-muted-foreground">Prediction for X = {predictX}</p>
            <p className="text-2xl font-bold text-green-700">
              ŷ = {(result.slope * predictX + result.intercept).toFixed(4)}
            </p>
          </div>

          {/* Data Table */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <h4 className="text-sm font-medium mb-3">Data & Residuals</h4>
            <div className="max-h-[200px] overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">X</th>
                    <th className="px-4 py-2 text-left">Y (Actual)</th>
                    <th className="px-4 py-2 text-left">Ŷ (Predicted)</th>
                    <th className="px-4 py-2 text-left">Residual</th>
                  </tr>
                </thead>
                <tbody>
                  {result.predictions.map((p, i) => (
                    <tr key={i} className="border-b">
                      <td className="px-4 py-2 font-mono">{p.x}</td>
                      <td className="px-4 py-2 font-mono">{p.y.toFixed(2)}</td>
                      <td className="px-4 py-2 font-mono">{p.predicted.toFixed(2)}</td>
                      <td className={cn("px-4 py-2 font-mono", p.residual > 0 ? "text-green-600" : "text-red-600")}>
                        {p.residual.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Linear Regression</h4>
            <p className="text-sm text-muted-foreground">
              Linear regression models the relationship between a dependent variable (Y) and one
              or more independent variables (X) using a straight line: y = β₀ + β₁x
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>R² (Coefficient of Determination):</strong> Proportion of variance in Y
              explained by X. Values range from 0 to 1.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Residuals:</strong> Differences between actual and predicted values.
              Smaller residuals indicate better fit.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
