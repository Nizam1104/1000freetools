"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Trash2, Info, GitCompare } from "lucide-react"

const DEFAULT_XML1 = [
  '<root>',
  '  <item id="1">',
  '    <name>Item One</name>',
  '    <value>100</value>',
  '  </item>',
  '</root>',
].join('\n')

const DEFAULT_XML2 = [
  '<root>',
  '  <item id="1">',
  '    <name>Item One Updated</name>',
  '    <value>200</value>',
  '  </item>',
  '  <item id="2">',
  '    <name>Item Two</name>',
  '    <value>300</value>',
  '  </item>',
  '</root>',
].join('\n')

export default function XmlDiffCompare() {
  const [xml1, setXml1] = useState<string>(DEFAULT_XML1)
  const [xml2, setXml2] = useState<string>(DEFAULT_XML2)
  const [diffResult, setDiffResult] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const compareXml = useCallback(() => {
    try {
      const parser = new DOMParser()
      const doc1 = parser.parseFromString(xml1, "text/xml")
      const doc2 = parser.parseFromString(xml2, "text/xml")

      const parseError1 = doc1.querySelector("parsererror")
      const parseError2 = doc2.querySelector("parsererror")

      if (parseError1 || parseError2) {
        throw new Error("Invalid XML in one or both inputs")
      }

      const differences: string[] = []

      const compareNodes = (node1: Node, node2: Node, path: string = "/") => {
        if (node1.nodeType !== node2.nodeType) {
          differences.push(`[TYPE] ${path}: Different node types`)
          return
        }

        if (node1.nodeType === Node.ELEMENT_NODE) {
          const el1 = node1 as Element
          const el2 = node2 as Element

          if (el1.tagName !== el2.tagName) {
            differences.push(`[TAG] ${path}: ${el1.tagName} vs ${el2.tagName}`)
          }

          // Compare attributes
          const attrs1 = Array.from(el1.attributes)
          const attrs2 = Array.from(el2.attributes)

          attrs1.forEach((attr) => {
            const attr2 = el2.getAttribute(attr.name)
            if (attr2 === null) {
              differences.push(`[ATTR MISSING] ${path}@${attr.name}`)
            } else if (attr.value !== attr2) {
              differences.push(`[ATTR VALUE] ${path}@${attr.name}: "${attr.value}" vs "${attr2}"`)
            }
          })

          attrs2.forEach((attr) => {
            if (!el1.hasAttribute(attr.name)) {
              differences.push(`[ATTR ADDED] ${path}@${attr.name}: "${attr.value}"`)
            }
          })

          // Compare children
          const children1 = Array.from(el1.children)
          const children2 = Array.from(el2.children)

          const maxLen = Math.max(children1.length, children2.length)
          for (let i = 0; i < maxLen; i++) {
            if (!children1[i]) {
              differences.push(`[ADDED] ${path}/${children2[i].tagName}: ${children2[i].textContent}`)
            } else if (!children2[i]) {
              differences.push(`[REMOVED] ${path}/${children1[i].tagName}: ${children1[i].textContent}`)
            } else {
              compareNodes(children1[i], children2[i], `${path}/${children1[i].tagName}`)
            }
          }

          // Compare text content if no children
          if (children1.length === 0 && children2.length === 0) {
            const text1 = el1.textContent?.trim() || ""
            const text2 = el2.textContent?.trim() || ""
            if (text1 !== text2) {
              differences.push(`[TEXT] ${path}: "${text1}" vs "${text2}"`)
            }
          }
        }
      }

      compareNodes(doc1.documentElement, doc2.documentElement, `/${doc1.documentElement.tagName}`)

      if (differences.length === 0) {
        setDiffResult("✓ No differences found. The XML documents are identical.")
      } else {
        setDiffResult(`Found ${differences.length} difference(s):\n\n${differences.join("\n")}`)
      }
    } catch (err) {
      setDiffResult(`Error: ${err instanceof Error ? err.message : "Comparison failed"}`)
    }
  }, [xml1, xml2])

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
    setXml1("")
    setXml2("")
    setDiffResult("")
  }, [])

  const stats = useMemo(() => {
    const count1 = xml1.match(/<[^/]/g)?.length || 0
    const count2 = xml2.match(/<[^/]/g)?.length || 0
    return { elements1: count1, elements2: count2 }
  }, [xml1, xml2])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* XML Inputs */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Compare XML Documents</Label>
          <Button variant="ghost" size="xs" onClick={handleClear} className="h-7">
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="xml1" className="text-sm font-medium">XML Document 1</Label>
            <p className="text-xs text-muted-foreground">{stats.elements1} elements</p>
            <Textarea
              id="xml1"
              value={xml1}
              onChange={(e) => setXml1(e.target.value)}
              className="font-mono text-sm min-h-[300px]"
              placeholder="Paste first XML document..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="xml2" className="text-sm font-medium">XML Document 2</Label>
            <p className="text-xs text-muted-foreground">{stats.elements2} elements</p>
            <Textarea
              id="xml2"
              value={xml2}
              onChange={(e) => setXml2(e.target.value)}
              className="font-mono text-sm min-h-[300px]"
              placeholder="Paste second XML document..."
            />
          </div>
        </div>

        <Button onClick={compareXml} disabled={!xml1 || !xml2} className="w-full">
          <GitCompare className="size-4 mr-2" />
          Compare XML
        </Button>
      </section>

      {/* Diff Result */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Comparison Result</Label>
          {diffResult && (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(diffResult, "result")}
              className="h-7"
            >
              {copied === "result" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          )}
        </div>

        <div className="rounded-lg border bg-muted/30 p-4 min-h-[150px]">
          {diffResult ? (
            <pre className={`font-mono text-sm whitespace-pre-wrap ${diffResult.startsWith("✓") ? "text-green-600" : diffResult.startsWith("Error") ? "text-destructive" : ""}`}>
              {diffResult}
            </pre>
          ) : (
            <p className="text-sm text-muted-foreground">Enter two XML documents and click Compare to see differences</p>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About XML Diff</h4>
            <p className="text-sm text-muted-foreground">
              Compare two XML documents to find differences in elements, attributes, and text content.
              The tool identifies added, removed, and modified nodes. Useful for version control,
              configuration comparison, and debugging XML transformations.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
