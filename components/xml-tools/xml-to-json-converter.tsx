"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function XmlToJsonConverter() {
  const [xmlInput, setXmlInput] = useState<string>("")
  const [prettyPrint, setPrettyPrint] = useState<boolean>(true)
  const [copied, setCopied] = useState<string | null>(null)

  const xmlToJson = useCallback((xml: string): { json: string | null; error: string | null } => {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(xml, "text/xml")

      const parseError = doc.querySelector("parsererror")
      if (parseError) {
        return { json: null, error: parseError.textContent || "Invalid XML" }
      }

      const xmlToObj = (node: Element | Node): any => {
        if (node.nodeType === 3) {
          const text = node.nodeValue?.trim()
          return text || ""
        }

        if (node.nodeType === 1) {
          const element = node as Element
          const obj: Record<string, any> = {}

          for (let i = 0; i < element.attributes.length; i++) {
            const attr = element.attributes[i]
            obj[`@${attr.name}`] = attr.value
          }

          const children = Array.from(element.childNodes)
          if (children.length === 0) {
            return Object.keys(obj).length > 0 ? obj : ""
          }

          const childObj: Record<string, any> = {}
          children.forEach((child) => {
            const childResult = xmlToObj(child)
            if (child.nodeType === 1) {
              const tagName = (child as Element).tagName
              if (childObj[tagName]) {
                if (!Array.isArray(childObj[tagName])) {
                  childObj[tagName] = [childObj[tagName]]
                }
                childObj[tagName].push(childResult)
              } else {
                childObj[tagName] = childResult
              }
            } else if (child.nodeType === 3 && childResult) {
              childObj["#text"] = childResult
            }
          })

          return { ...obj, ...childObj }
        }

        return null
      }

      const rootElement = doc.documentElement
      if (!rootElement) {
        return { json: null, error: "No root element found" }
      }

      const result = { [rootElement.tagName]: xmlToObj(rootElement) }
      const jsonStr = prettyPrint ? JSON.stringify(result, null, 2) : JSON.stringify(result)

      return { json: jsonStr, error: null }
    } catch (err) {
      return {
        json: null,
        error: err instanceof Error ? err.message : "Failed to convert XML to JSON",
      }
    }
  }, [prettyPrint])

  const conversionResult = useMemo(() => {
    if (!xmlInput.trim()) return { json: null, error: null }
    return xmlToJson(xmlInput)
  }, [xmlInput, xmlToJson])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">XML to JSON Converter</h2>
        <p className="text-muted-foreground">
          Convert XML data to JSON format instantly.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="xml-input">XML Input</Label>
          <Textarea
            id="xml-input"
            value={xmlInput}
            onChange={(e) => setXmlInput(e.target.value)}
            className="font-mono text-sm min-h-[200px]"
            placeholder="Paste your XML here..."
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={prettyPrint}
              onChange={(e) => setPrettyPrint(e.target.checked)}
              className="rounded border-border"
            />
            Pretty print JSON
          </label>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>JSON Output</Label>
            {conversionResult.json && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(conversionResult.json!, "json")}
              >
                {copied === "json" ? <Check className="size-4" /> : <Copy className="size-4" />}
                <span className="ml-2">Copy JSON</span>
              </Button>
            )}
          </div>
          <div className="rounded-lg border bg-muted/30 p-4 max-h-96 overflow-auto">
            {conversionResult.error ? (
              <p className="text-destructive text-sm">{conversionResult.error}</p>
            ) : (
              <pre className="font-mono text-sm whitespace-pre-wrap">
                {conversionResult.json || <span className="text-muted-foreground">JSON output will appear here...</span>}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
