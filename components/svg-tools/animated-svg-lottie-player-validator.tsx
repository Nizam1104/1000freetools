"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, Upload, AlertCircle, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
  info: {
    width?: string
    height?: string
    viewBox?: string
    elements: number
    hasAnimation: boolean
  }
}

export default function AnimatedSvgLottiePlayerValidator() {
  const [svgCode, setSvgCode] = useState<string>("")
  const [lottieJson, setLottieJson] = useState<string>("")
  const [activeTab, setActiveTab] = useState<"svg" | "lottie">("svg")
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const validateSvg = useCallback((svg: string): ValidationResult => {
    const errors: string[] = []
    const warnings: string[] = []
    const info: ValidationResult["info"] = { elements: 0, hasAnimation: false }

    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(svg, "image/svg+xml")
      const parseError = doc.querySelector("parsererror")

      if (parseError) {
        errors.push("Invalid XML/SVG syntax: " + parseError.textContent)
        return { isValid: false, errors, warnings: [], info }
      }

      const svgElement = doc.documentElement

      // Check for required attributes
      if (!svgElement.hasAttribute("xmlns")) {
        warnings.push("Missing xmlns attribute")
      }

      // Get dimensions
      info.width = svgElement.getAttribute("width") || "not specified"
      info.height = svgElement.getAttribute("height") || "not specified"
      info.viewBox = svgElement.getAttribute("viewBox") || "not specified"

      // Check for viewBox
      if (!info.viewBox || info.viewBox === "not specified") {
        warnings.push("Missing viewBox attribute - SVG may not scale properly")
      }

      // Count elements
      const allElements = svgElement.querySelectorAll("*")
      info.elements = allElements.length

      // Check for animation elements
      const animationElements = svgElement.querySelectorAll("animate, animateTransform, animateMotion, set, smil")
      info.hasAnimation = animationElements.length > 0

      // Check for common issues
      if (info.width === "100%" || info.height === "100%") {
        warnings.push("Percentage dimensions may cause rendering issues in some contexts")
      }

      // Check for external references
      const externalRefs = svg.match(/url\(['"]?(?!data:|#[^)]*)['"]?[^)]*\)/g)
      if (externalRefs) {
        warnings.push(`Found ${externalRefs.length} external reference(s) that may not load`)
      }

      // Check for scripts
      if (svg.includes("<script")) {
        warnings.push("SVG contains script elements - may be blocked for security")
      }

      return {
        isValid: errors.length === 0,
        errors,
        warnings,
        info
      }
    } catch (err) {
      errors.push(err instanceof Error ? err.message : "Unknown validation error")
      return { isValid: false, errors, warnings: [], info }
    }
  }, [])

  const validateLottie = useCallback((json: string): ValidationResult => {
    const errors: string[] = []
    const warnings: string[] = []
    const info: ValidationResult["info"] = { elements: 0, hasAnimation: false }

    try {
      const data = JSON.parse(json)

      // Check for required Lottie properties
      if (!data.v) {
        errors.push("Missing version property (v)")
      }
      if (!data.fr) {
        errors.push("Missing frame rate property (fr)")
      }
      if (!data.ip) {
        errors.push("Missing in point property (ip)")
      }
      if (!data.op) {
        errors.push("Missing out point property (op)")
      }
      if (!data.layers || !Array.isArray(data.layers)) {
        errors.push("Missing or invalid layers array")
      } else {
        info.elements = data.layers.length

        // Check for animations in layers
        const hasAnimations = data.layers.some((layer: any) =>
          layer.ks?.p?.k?.length > 1 ||
          layer.ef ||
          layer.shapes?.some((s: any) => s.ks?.p?.k?.length > 1)
        )
        info.hasAnimation = hasAnimations
      }

      // Check dimensions
      if (data.w && data.h) {
        info.width = data.w.toString()
        info.height = data.h.toString()
      }

      // Warnings
      if (data.assets && data.assets.length > 10) {
        warnings.push(`Large number of assets (${data.assets.length}) may impact performance`)
      }

      if (info.hasAnimation && data.fr && data.fr > 60) {
        warnings.push(`High frame rate (${data.fr}fps) may impact performance`)
      }

      return {
        isValid: errors.length === 0,
        errors,
        warnings,
        info
      }
    } catch (err) {
      errors.push(err instanceof Error ? `Invalid JSON: ${err.message}` : "Unknown validation error")
      return { isValid: false, errors, warnings: [], info }
    }
  }, [])

  const handleValidate = useCallback(() => {
    setError(null)
    if (activeTab === "svg") {
      if (!svgCode.trim()) {
        setError("Please enter SVG code to validate")
        return
      }
      setValidationResult(validateSvg(svgCode))
    } else {
      if (!lottieJson.trim()) {
        setError("Please enter Lottie JSON to validate")
        return
      }
      setValidationResult(validateLottie(lottieJson))
    }
  }, [activeTab, svgCode, lottieJson, validateSvg, validateLottie])

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
    setSvgCode("")
    setLottieJson("")
    setValidationResult(null)
    setError(null)
  }, [])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        if (activeTab === "svg") {
          setSvgCode(result)
        } else {
          setLottieJson(result)
        }
        setError(null)
      }
      reader.readAsText(file)
    }
  }, [activeTab])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Animated SVG & Lottie Player Validator</h2>
        <p className="text-sm text-muted-foreground">
          Validate SVG animations and Lottie JSON files for compatibility and errors
        </p>
      </div>

      {/* Tab Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Validation Type</Label>
        <div className="flex gap-2">
          <Button
            variant={activeTab === "svg" ? "default" : "outline"}
            onClick={() => setActiveTab("svg")}
            className="flex-1"
          >
            SVG Animation
          </Button>
          <Button
            variant={activeTab === "lottie" ? "default" : "outline"}
            onClick={() => setActiveTab("lottie")}
            className="flex-1"
          >
            Lottie JSON
          </Button>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {activeTab === "svg" ? "SVG Code" : "Lottie JSON"}
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <Upload className="size-3.5 mr-2" />
              Upload
            </Button>
            <input
              id="file-upload"
              type="file"
              accept={activeTab === "svg" ? ".svg" : ".json"}
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(activeTab === "svg" ? svgCode : lottieJson, "input")}
              className="h-7"
              disabled={!svgCode && !lottieJson}
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
          id="input"
          value={activeTab === "svg" ? svgCode : lottieJson}
          onChange={(e) => activeTab === "svg" ? setSvgCode(e.target.value) : setLottieJson(e.target.value)}
          className={cn(
            "font-mono text-sm min-h-[200px]",
            error ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder={activeTab === "svg" ? "Paste SVG code with animations..." : "Paste Lottie JSON..."}
        />

        {error && (
          <p className="text-sm text-destructive flex items-center gap-2">
            <AlertCircle className="size-4" />
            {error}
          </p>
        )}
      </section>

      <Button onClick={handleValidate} className="w-full">
        Validate {activeTab === "svg" ? "SVG" : "Lottie"}
      </Button>

      {/* Results */}
      {validationResult && (
        <section className="space-y-4">
          <div className={cn(
            "p-4 rounded-lg flex items-center gap-3",
            validationResult.isValid ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          )}>
            {validationResult.isValid ? (
              <CheckCircle className="size-6" />
            ) : (
              <AlertCircle className="size-6" />
            )}
            <div>
              <p className="font-medium">
                {validationResult.isValid ? "Validation Passed" : "Validation Failed"}
              </p>
              <p className="text-sm">
                {validationResult.errors.length} errors, {validationResult.warnings.length} warnings
              </p>
            </div>
          </div>

          {/* Info */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <h4 className="text-sm font-medium mb-3">File Information</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Width:</span>
                <span className="ml-2 font-mono">{validationResult.info.width}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Height:</span>
                <span className="ml-2 font-mono">{validationResult.info.height}</span>
              </div>
              {validationResult.info.viewBox && (
                <div>
                  <span className="text-muted-foreground">ViewBox:</span>
                  <span className="ml-2 font-mono">{validationResult.info.viewBox}</span>
                </div>
              )}
              <div>
                <span className="text-muted-foreground">Elements:</span>
                <span className="ml-2 font-mono">{validationResult.info.elements}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Has Animation:</span>
                <span className={cn("ml-2 font-mono", validationResult.info.hasAnimation ? "text-green-600" : "text-muted-foreground")}>
                  {validationResult.info.hasAnimation ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>

          {/* Errors */}
          {validationResult.errors.length > 0 && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <h4 className="text-sm font-medium text-red-700 mb-2">Errors</h4>
              <ul className="text-sm text-red-600 space-y-1">
                {validationResult.errors.map((err, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    {err}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Warnings */}
          {validationResult.warnings.length > 0 && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <h4 className="text-sm font-medium text-amber-700 mb-2">Warnings</h4>
              <ul className="text-sm text-amber-600 space-y-1">
                {validationResult.warnings.map((warn, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    {warn}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Validation</h4>
            <p className="text-sm text-muted-foreground">
              This validator checks SVG files for proper syntax, required attributes, and potential
              compatibility issues. For Lottie files, it validates the JSON structure and required
              BodyMovin properties.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
