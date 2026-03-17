"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, FileCheck, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function YamlSchemaValidator() {
  const [yamlInput, setYamlInput] = useState("")
  const [schemaInput, setSchemaInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [errors, setErrors] = useState<string[]>([])

  const parseSimpleSchema = useCallback((schema: string): any => {
    const lines = schema.split('\n')
    const result: any = {}
    
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue

      if (trimmed.includes(':')) {
        const colonIndex = trimmed.indexOf(':')
        const key = trimmed.substring(0, colonIndex).trim()
        const type = trimmed.substring(colonIndex + 1).trim()

        // Parse type with constraints
        const typeMatch = type.match(/^(\w+)(?:\(([^)]*)\))?/)
        if (typeMatch) {
          const [, baseType, constraints] = typeMatch
          result[key] = {
            type: baseType,
            constraints: constraints ? parseConstraints(constraints) : {}
          }
        }
      }
    }

    return result
  }, [])

  const parseConstraints = (constraints: string): Record<string, any> => {
    const result: Record<string, any> = {}
    const parts = constraints.split(',').map(s => s.trim())

    for (const part of parts) {
      if (part.startsWith('min:')) {
        result.min = parseFloat(part.substring(4))
      } else if (part.startsWith('max:')) {
        result.max = parseFloat(part.substring(4))
      } else if (part.startsWith('pattern:')) {
        result.pattern = part.substring(8).replace(/['"]/g, '')
      } else if (part === 'required' || part === 'true') {
        result.required = true
      } else if (part === 'optional' || part === 'false') {
        result.required = false
      }
    }

    return result
  }

  const validateYamlAgainstSchema = useCallback((yaml: string, schema: any): { valid: boolean; errors: string[] } => {
    const errors: string[] = []
    const yamlObj = parseYamlSimple(yaml)

    // Check required fields
    Object.entries(schema).forEach(([key, schemaDef]: [string, any]) => {
      const value = yamlObj[key]
      const isRequired = schemaDef.constraints?.required

      if (value === undefined || value === null) {
        if (isRequired) {
          errors.push(`Missing required field: "${key}"`)
        }
        return
      }

      // Type validation
      const expectedType = schemaDef.type
      const actualType = getTypeOf(value)

      if (!typeMatches(actualType, expectedType)) {
        errors.push(`Field "${key}": expected ${expectedType}, got ${actualType}`)
      }

      // Constraint validation
      const constraints = schemaDef.constraints || {}

      if (typeof value === 'number') {
        if (constraints.min !== undefined && value < constraints.min) {
          errors.push(`Field "${key}": value ${value} is less than minimum ${constraints.min}`)
        }
        if (constraints.max !== undefined && value > constraints.max) {
          errors.push(`Field "${key}": value ${value} is greater than maximum ${constraints.max}`)
        }
      }

      if (typeof value === 'string' && constraints.pattern) {
        const regex = new RegExp(constraints.pattern)
        if (!regex.test(value)) {
          errors.push(`Field "${key}": value "${value}" does not match pattern "${constraints.pattern}"`)
        }
      }

      if (Array.isArray(value) && constraints.minItems !== undefined && value.length < constraints.minItems) {
        errors.push(`Field "${key}": array has ${value.length} items, minimum is ${constraints.minItems}`)
      }
    })

    return { valid: errors.length === 0, errors }
  }, [])

  const parseYamlSimple = (yaml: string): Record<string, any> => {
    const lines = yaml.split('\n')
    const result: Record<string, any> = {}

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('-')) continue

      const indent = line.search(/\S/)
      if (indent !== 0) continue

      if (trimmed.includes(':')) {
        const colonIndex = trimmed.indexOf(':')
        const key = trimmed.substring(0, colonIndex).trim()
        const value = trimmed.substring(colonIndex + 1).trim()
        result[key] = parseValue(value)
      }
    }

    return result
  }

  const parseValue = (value: string): any => {
    if (value === 'null' || value === '~') return null
    if (value === 'true' || value === 'True' || value === 'TRUE') return true
    if (value === 'false' || value === 'False' || value === 'FALSE') return false
    if (/^-?\d+$/.test(value)) return parseInt(value, 10)
    if (/^-?\d*\.\d+$/.test(value)) return parseFloat(value)
    
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      return value.slice(1, -1)
    }
    
    return value
  }

  const getTypeOf = (value: any): string => {
    if (value === null) return 'null'
    if (Array.isArray(value)) return 'array'
    if (typeof value === 'boolean') return 'boolean'
    if (typeof value === 'number') return Number.isInteger(value) ? 'integer' : 'number'
    if (typeof value === 'string') return 'string'
    if (typeof value === 'object') return 'object'
    return 'unknown'
  }

  const typeMatches = (actual: string, expected: string): boolean => {
    if (expected === 'any') return true
    if (expected === 'number' && (actual === 'number' || actual === 'integer')) return true
    if (expected === 'int' && actual === 'integer') return true
    if (expected === 'str' && actual === 'string') return true
    if (expected === 'bool' && actual === 'boolean') return true
    return actual === expected
  }

  const handleValidate = useCallback(() => {
    if (!yamlInput.trim()) {
      setOutput("Please enter YAML to validate")
      setIsValid(null)
      setErrors([])
      return
    }

    if (!schemaInput.trim()) {
      setOutput("Please enter a schema definition")
      setIsValid(null)
      setErrors([])
      return
    }

    const schema = parseSimpleSchema(schemaInput)
    const result = validateYamlAgainstSchema(yamlInput, schema)

    setIsValid(result.valid)
    setErrors(result.errors)

    if (result.valid) {
      setOutput("✓ YAML is valid according to the schema!")
    } else {
      setOutput(`✗ Validation failed with ${result.errors.length} error(s):\n\n${result.errors.join('\n')}`)
    }
  }, [yamlInput, schemaInput, parseSimpleSchema, validateYamlAgainstSchema])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setYamlInput("")
    setSchemaInput("")
    setOutput("")
    setIsValid(null)
    setErrors([])
  }, [])

  const handleLoadExample = useCallback(() => {
    setYamlInput(`name: John Doe
age: 30
email: john@example.com
is_active: true`)

    setSchemaInput(`# Schema definition
# Format: field_name: type(constraints)
# Types: string, integer, number, boolean, any
# Constraints: required, min:N, max:N, pattern:regex

name: string(required)
age: integer(min:0, max:150)
email: string(required, pattern:^[^@]+@[^@]+\\.[^@]+$)
is_active: boolean`)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">YAML Schema Validator</h2>
            <p className="text-sm text-muted-foreground">
              Validate YAML data against a schema definition
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLoadExample}>
            Load Example
          </Button>
        </div>
      </div>

      {isValid !== null && (
        <Alert variant={isValid ? "default" : "destructive"}>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {isValid ? "Validation passed! YAML conforms to the schema." : `Validation failed: ${errors.length} error(s) found`}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="yaml">YAML Input</Label>
          <Textarea
            id="yaml"
            value={yamlInput}
            onChange={(e) => setYamlInput(e.target.value)}
            placeholder="Paste your YAML data here..."
            className="min-h-[300px] font-mono text-sm"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="schema">Schema Definition</Label>
          <Textarea
            id="schema"
            value={schemaInput}
            onChange={(e) => setSchemaInput(e.target.value)}
            placeholder="Enter schema definition...

name: string(required)
age: integer(min:0, max:150)
email: string(required)"
            className="min-h-[300px] font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={handleValidate} className="flex-1" disabled={!yamlInput || !schemaInput}>
          <FileCheck className="h-4 w-4 mr-2" />
          Validate YAML
        </Button>
        <Button variant="outline" onClick={handleClear} title="Clear">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {output && (
        <div className="space-y-4">
          <Label htmlFor="output">Validation Result</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            className="min-h-[200px] font-mono text-sm bg-muted"
          />
          <Button onClick={handleCopy} disabled={!output} variant="outline">
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? "Copied" : "Copy Result"}
          </Button>
        </div>
      )}

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">Schema Syntax</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li><strong>Types:</strong> string, integer, number, boolean, any</li>
          <li><strong>Constraints:</strong> required, min:N, max:N, pattern:regex</li>
          <li><strong>Example:</strong> <code className="bg-background px-1 rounded">age: integer(required, min:0, max:150)</code></li>
        </ul>
      </div>
    </div>
  )
}
