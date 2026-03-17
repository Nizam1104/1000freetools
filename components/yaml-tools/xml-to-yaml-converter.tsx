"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, ArrowRight } from "lucide-react"

export function XmlToYamlConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [preserveAttributes, setPreserveAttributes] = useState(true)

  const parseXml = useCallback((xml: string): any => {
    // Simple XML parser
    const removeComments = xml.replace(/<!--[\s\S]*?-->/g, '')
    const removeDeclaration = removeComments.replace(/<\?xml[^?]*\?>/g, '')
    
    const parseElement = (elementStr: string): any => {
      const tagMatch = elementStr.match(/<(\w+)([^>]*)>([\s\S]*?)<\/\1>/)
      if (!tagMatch) {
        // Self-closing tag or text
        const selfClosingMatch = elementStr.match(/<(\w+)([^/]*)\/>/)
        if (selfClosingMatch) {
          return { _tag: selfClosingMatch[1], ...parseAttributes(selfClosingMatch[2]) }
        }
        const text = elementStr.trim()
        return text ? text : ''
      }

      const [, tagName, attributes, content] = tagMatch
      const result: any = { _tag: tagName }

      // Parse attributes
      if (preserveAttributes) {
        const attrs = parseAttributes(attributes)
        Object.assign(result, attrs)
      }

      // Parse children
      const children = parseChildren(content)
      if (children.length === 1 && typeof children[0] === 'string') {
        result._text = children[0]
      } else if (children.length > 0) {
        children.forEach((child: any, index: number) => {
          if (typeof child === 'object' && child._tag) {
            const childTag = child._tag
            if (result[childTag]) {
              if (!Array.isArray(result[childTag])) {
                result[childTag] = [result[childTag]]
              }
              result[childTag].push(child)
            } else {
              result[childTag] = child
            }
          }
        })
      }

      return result
    }

    const parseAttributes = (attrStr: string): Record<string, string> => {
      const attrs: Record<string, string> = {}
      const attrRegex = /(\w+)="([^"]*)"/g
      let match
      
      while ((match = attrRegex.exec(attrStr)) !== null) {
        attrs[`@${match[1]}`] = match[2]
      }
      
      return attrs
    }

    const parseChildren = (content: string): any[] => {
      const children: any[] = []
      let depth = 0
      let start = 0

      for (let i = 0; i < content.length; i++) {
        if (content[i] === '<') {
          if (depth === 0) start = i
          depth++
        } else if (content[i] === '>') {
          depth--
          if (depth === 0) {
            const element = content.substring(start, i + 1)
            const result = parseElement(element)
            if (result) children.push(result)
          }
        } else if (depth === 0 && content[i].trim()) {
          // Text content
          const textEnd = content.indexOf('<', i)
          if (textEnd === -1) {
            const text = content.substring(i).trim()
            if (text) children.push(text)
            break
          }
          const text = content.substring(i, textEnd).trim()
          if (text) children.push(text)
          i = textEnd - 1
        }
      }

      return children
    }

    return parseElement(removeDeclaration.trim())
  }, [preserveAttributes])

  const convertToYaml = useCallback((xml: string): string => {
    try {
      const parsed = parseXml(xml)
      return objectToYaml(parsed, 0)
    } catch (e) {
      return `# Error converting: ${e instanceof Error ? e.message : 'Unknown error'}`
    }
  }, [parseXml])

  const objectToYaml = (obj: any, indent: number): string => {
    const spaces = '  '.repeat(indent)
    const lines: string[] = []

    if (typeof obj === 'string') {
      return obj
    }

    if (Array.isArray(obj)) {
      obj.forEach((item) => {
        if (typeof item === 'object') {
          lines.push(`${spaces}-`)
          lines.push(objectToYaml(item, indent + 1))
        } else {
          lines.push(`${spaces}- ${item}`)
        }
      })
      return lines.join('\n')
    }

    Object.entries(obj).forEach(([key, value]) => {
      if (key === '_tag') {
        return // Skip internal tag
      }

      if (typeof value === 'object' && value !== null) {
        if (Array.isArray(value)) {
          lines.push(`${spaces}${key}:`)
          value.forEach((item) => {
            if (typeof item === 'object') {
              lines.push(`${spaces}  -`)
              lines.push(objectToYaml(item, indent + 2))
            } else {
              lines.push(`${spaces}  - ${item}`)
            }
          })
        } else {
          lines.push(`${spaces}${key}:`)
          lines.push(objectToYaml(value, indent + 1))
        }
      } else {
        lines.push(`${spaces}${key}: ${value}`)
      }
    })

    return lines.join('\n')
  }

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }
    const yaml = convertToYaml(input)
    setOutput(yaml)
  }, [input, convertToYaml])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setInput("")
    setOutput("")
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/yaml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "converted.yaml"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput(`<?xml version="1.0"?>
<person>
  <name>John Doe</name>
  <age>30</age>
  <address city="New York">
    <street>123 Main St</street>
    <zip>10001</zip>
  </address>
</person>`)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">XML to YAML Converter</h2>
            <p className="text-sm text-muted-foreground">
              Convert XML documents to YAML format
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={preserveAttributes}
            onChange={(e) => setPreserveAttributes(e.target.checked)}
            className="rounded border-gray-300"
          />
          Preserve XML Attributes
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">XML Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your XML here...

<person>
  <name>John</name>
  <age>30</age>
</person>"
            className="min-h-[500px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleConvert} className="flex-1" disabled={!input}>
              <ArrowRight className="h-4 w-4 mr-2" />
              Convert to YAML
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">YAML Output</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="YAML output will appear here..."
            className="min-h-[500px] font-mono text-sm bg-muted"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleCopy} disabled={!output} className="flex-1">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button variant="outline" onClick={handleDownload} disabled={!output} title="Download">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
