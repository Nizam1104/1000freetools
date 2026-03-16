"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function PercentageCalculator() {
  const [activeTab, setActiveTab] = useState<string>("percentage-of")
  const [value1, setValue1] = useState<string>("")
  const [value2, setValue2] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const num1 = useMemo(() => parseFloat(value1) || 0, [value1])
  const num2 = useMemo(() => parseFloat(value2) || 0, [value2])

  const results = useMemo(() => {
    switch (activeTab) {
      case "percentage-of":
        // What is X% of Y?
        if (!value1 || !value2) return null
        return {
          result: (num1 / 100) * num2,
          formula: `(${num1} / 100) × ${num2} = ${((num1 / 100) * num2).toFixed(4)}`,
        }
      case "percentage-what":
        // X is what % of Y?
        if (!value1 || !value2 || num2 === 0) return null
        return {
          result: (num1 / num2) * 100,
          formula: `(${num1} / ${num2}) × 100 = ${((num1 / num2) * 100).toFixed(4)}%`,
        }
      case "percentage-change":
        // Percentage increase/decrease from X to Y
        if (!value1 || !value2 || num1 === 0) return null
        const change = ((num2 - num1) / num1) * 100
        return {
          result: change,
          formula: `((${num2} - ${num1}) / ${num1}) × 100 = ${change.toFixed(4)}%`,
          type: change > 0 ? "increase" : change < 0 ? "decrease" : "no change",
        }
      case "percentage-from":
        // X is Y% of what number?
        if (!value1 || !value2 || num2 === 0) return null
        return {
          result: num1 / (num2 / 100),
          formula: `${num1} / (${num2} / 100) = ${(num1 / (num2 / 100)).toFixed(4)}`,
        }
      default:
        return null
    }
  }, [activeTab, num1, num2, value1, value2])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const getLabels = () => {
    switch (activeTab) {
      case "percentage-of":
        return { label1: "Percentage (%)", label2: "Number" }
      case "percentage-what":
        return { label1: "Part", label2: "Whole" }
      case "percentage-change":
        return { label1: "Original Value", label2: "New Value" }
      case "percentage-from":
        return { label1: "Value", label2: "Percentage (%)" }
      default:
        return { label1: "Value 1", label2: "Value 2" }
    }
  }

  const labels = getLabels()

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Percentage Calculator</h2>
        <p className="text-muted-foreground">
          Calculate percentages, percentage changes, and solve percentage problems.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-1">
          <TabsTrigger value="percentage-of" className="text-xs">
            What is X% of Y?
          </TabsTrigger>
          <TabsTrigger value="percentage-what" className="text-xs">
            X is what % of Y?
          </TabsTrigger>
          <TabsTrigger value="percentage-change" className="text-xs">
            % Change
          </TabsTrigger>
          <TabsTrigger value="percentage-from" className="text-xs">
            X is Y% of what?
          </TabsTrigger>
        </TabsList>

        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value1">{labels.label1}</Label>
              <Input
                id="value1"
                value={value1}
                onChange={(e) => setValue1(e.target.value.replace(/[^0-9.-]/g, ""))}
                className="font-mono"
                placeholder="Enter value..."
                type="text"
                inputMode="decimal"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="value2">{labels.label2}</Label>
              <Input
                id="value2"
                value={value2}
                onChange={(e) => setValue2(e.target.value.replace(/[^0-9.-]/g, ""))}
                className="font-mono"
                placeholder="Enter value..."
                type="text"
                inputMode="decimal"
              />
            </div>
          </div>

          {results && (
            <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Result</p>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold font-mono">
                    {activeTab === "percentage-change"
                      ? `${results.result > 0 ? "+" : ""}${results.result.toFixed(4)}%`
                      : activeTab === "percentage-what"
                      ? `${results.result.toFixed(4)}%`
                      : results.result.toFixed(4)}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(results.result.toString(), "result")}
                  >
                    {copied === "result" ? <Check className="size-4" /> : <Copy className="size-4" />}
                  </Button>
                </div>
              </div>

              {activeTab === "percentage-change" && results.type && (
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      results.type === "increase"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : results.type === "decrease"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {results.type === "increase" ? "↑ Increase" : results.type === "decrease" ? "↓ Decrease" : "No Change"}
                  </span>
                </div>
              )}

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Formula</p>
                <code className="text-sm bg-background rounded px-3 py-2 block font-mono">
                  {results.formula}
                </code>
              </div>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  )
}
