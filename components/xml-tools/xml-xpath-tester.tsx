"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Trash2, Info, Search } from "lucide-react"

export default function XmlXpathTester() {
  const [xmlInput, setXmlInput] = useState<string(`<root>
  <book id="1">
    <title>Book One</title>
    <author>Author A</author>
    <price>29.99</price>
  </book>
  <book id="2">
    <title>Book Two</title>
    <author>Author B</author>
    <price>39.99</price>
  </book>
</root>`)}
  const [xpathQuery, setXpathQuery] = useState<string>("//book")
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const evaluateXPath = useCallback(() => {
    try {
      setError(null)
      const parser = new DOMParser()
      const doc = parser.parseFromString(xmlInput, "text/xml")

      const parseError = doc.querySelector("parsererror")
      if (parseError) {
        throw new Error(parseError.textContent || "Invalid XML")
      }

      const evaluator = new XPathEvaluator()
      const expression = evaluator.createExpression(xpathQuery)
      const result = expression.evaluate(doc, XPathResult.ANY_TYPE)

      let output = ""
      let node: Node | null

      switch (result.resultType) {
        case XPathResult.NUMBER_TYPE:
          output = `Number: ${result.numberValue}`
          break
        case XPathResult.STRING_TYPE:
          output = `String: ${result.stringValue}`
          break
        case XPathResult.BOOLEAN_TYPE:
          output = `Boolean: ${result.booleanValue}`
          break
        case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
          const nodes: string[] = []
          while ((node = result.iterateNext())) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element
              nodes.push(element.outerHTML)
            } else if (node.nodeType === Node.TEXT_NODE) {
              nodes.push(node.textContent || "")
            } else if (node.nodeType === Node.ATTRIBUTE_NODE) {
              nodes.push((node as Attr).value)
            }
          }
          output = `Found ${nodes.length} node(s):\n\n${nodes.join("\n\n")}`
          break
        default:
          output = `Result type: ${result.resultType}`
      }

      setResult(output)
    } catch (err) {
      setError(err instanceof Error ? err.message : "XPath evaluation failed")
      setResult("")
    }
  }, [xmlInput, xpathQuery])

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
    setXmlInput("")
    setXpathQuery("")
    setResult("")
    setError(null)
  }, [])

  const commonXpaths = [
    "//element",
    "//element[@attribute]",
    "//element[@attribute='value']",
    "//parent/child",
    "//element[position()=1]",
    "//element[last()]",
    "count(//element)",
    "//element[contains(text(),'text')]",
  ]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* XML Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="xml-input" className="text-base font-medium">XML Input</Label>
          <Button variant="ghost" size="xs" onClick={handleClear} className="h-7">
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>
        <Textarea
          id="xml-input"
          value={xmlInput}
          onChange={(e) => setXmlInput(e.target.value)}
          className="font-mono text-sm min-h-[200px]"
          placeholder="Paste your XML here..."
        />
      </section>

      {/* XPath Query */}
      <section className="space-y-3">
        <Label htmlFor="xpath-query" className="text-base font-medium">XPath Query</Label>
        <div className="flex gap-2">
          <Input
            id="xpath-query"
            value={xpathQuery}
            onChange={(e) => setXpathQuery(e.target.value)}
            className="font-mono flex-1"
            placeholder="//element[@attribute]"
          />
          <Button onClick={evaluateXPath} disabled={!xmlInput || !xpathQuery}>
            <Search className="size-4 mr-1" />
            Evaluate
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Common XPath:</span>
          {commonXpaths.map((xpath) => (
            <Button
              key={xpath}
              variant="outline"
              size="sm"
              onClick={() => setXpathQuery(xpath)}
            >
              {xpath}
            </Button>
          ))}
        </div>
      </section>

      {/* Result */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Result</Label>
          {result && (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(result, "result")}
              className="h-7"
            >
              {copied === "result" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          )}
        </div>

        {error ? (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        ) : (
          <div className="rounded-lg border bg-muted/30 p-4 min-h-[100px]">
            {result ? (
              <pre className="font-mono text-sm whitespace-pre-wrap">{result}</pre>
            ) : (
              <p className="text-sm text-muted-foreground">Enter XML and XPath query, then click Evaluate</p>
            )}
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About XPath</h4>
            <p className="text-sm text-muted-foreground">
              XPath (XML Path Language) is a query language for selecting nodes from an XML document.
              Use <code className="bg-muted px-1 rounded">//</code> for descendant selection,
              <code className="bg-muted px-1 rounded">[@attribute]</code> for attribute filtering,
              and functions like <code className="bg-muted px-1 rounded">count()</code>,
              <code className="bg-muted px-1 rounded">contains()</code>,
              <code className="bg-muted px-1 rounded">position()</code> for advanced queries.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
