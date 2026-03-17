"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy, Check, Trash2, Download, Plus, Trash } from "lucide-react"

interface Parameter {
  id: string
  name: string
  type: string
  mode: "IN" | "OUT" | "INOUT"
}

export function SqlStoredProcedureGenerator() {
  const [procName, setProcName] = useState("usp_GetData")
  const [description, setDescription] = useState("")
  const [parameters, setParameters] = useState<Parameter[]>([
    { id: "1", name: "@Id", type: "INT", mode: "IN" }
  ])
  const [body, setBody] = useState("SELECT * FROM Users WHERE Id = @Id")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [dbType, setDbType] = useState<"sqlserver" | "mysql" | "postgresql">("sqlserver")

  const addParameter = useCallback(() => {
    const newId = (parameters.length + 1).toString()
    setParameters([...parameters, { id: newId, name: `@Param${newId}`, type: "VARCHAR(50)", mode: "IN" }])
  }, [parameters])

  const removeParameter = useCallback((id: string) => {
    setParameters(parameters.filter(p => p.id !== id))
  }, [parameters])

  const updateParameter = useCallback((id: string, field: keyof Parameter, value: string) => {
    setParameters(parameters.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ))
  }, [parameters])

  const generateProcedure = useCallback(() => {
    let result = ""
    
    if (dbType === "sqlserver") {
      result = `-- =============================================
-- Stored Procedure: ${procName}
-- Description: ${description || "No description"}
-- =============================================
CREATE OR ALTER PROCEDURE ${procName}
`
      if (parameters.length > 0) {
        result += parameters.map(p => `    ${p.mode} ${p.name} ${p.type}`).join(",\n")
        result += "\n"
      }
      result += `AS
BEGIN
    SET NOCOUNT ON;

${body.split('\n').map(l => '    ' + l).join('\n')}
END
GO`
    } else if (dbType === "mysql") {
      result = `-- =============================================
-- Stored Procedure: ${procName}
-- Description: ${description || "No description"}
-- =============================================
DELIMITER $$

CREATE PROCEDURE ${procName}(
`
      if (parameters.length > 0) {
        result += parameters.map(p => `    ${p.mode} ${p.name} ${p.type}`).join(",\n")
        result += "\n"
      }
      result += `)
BEGIN
${body.split('\n').map(l => '    ' + l).join('\n')}
END$$

DELIMITER ;`
    } else if (dbType === "postgresql") {
      result = `-- =============================================
-- Stored Procedure: ${procName}
-- Description: ${description || "No description"}
-- =============================================
CREATE OR REPLACE FUNCTION ${procName}(
`
      if (parameters.length > 0) {
        result += parameters.map(p => `    ${p.name} ${p.type}`).join(",\n")
        result += "\n"
      }
      result += `)
RETURNS TABLE (
    -- Define return columns here
)
LANGUAGE plpgsql
AS $$
BEGIN
${body.split('\n').map(l => '    ' + l).join('\n')}
END;
$$;`
    }

    setOutput(result)
  }, [procName, description, parameters, body, dbType])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setParameters([{ id: "1", name: "@Id", type: "INT", mode: "IN" }])
    setBody("")
    setOutput("")
    setDescription("")
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const ext = dbType === "sqlserver" ? "sql" : dbType === "mysql" ? "sql" : "sql"
      const blob = new Blob([output], { type: "application/sql" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${procName}.${ext}`
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output, procName, dbType])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">SQL Stored Procedure Generator</h2>
            <p className="text-sm text-muted-foreground">
              Generate stored procedures for SQL Server, MySQL, or PostgreSQL
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="procName">Procedure Name</Label>
          <Input
            id="procName"
            value={procName}
            onChange={(e) => setProcName(e.target.value)}
            placeholder="usp_GetData"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dbType">Database Type</Label>
          <select
            id="dbType"
            value={dbType}
            onChange={(e) => setDbType(e.target.value as typeof dbType)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="sqlserver">SQL Server</option>
            <option value="mysql">MySQL</option>
            <option value="postgresql">PostgreSQL</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what this procedure does..."
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Parameters</Label>
          <Button type="button" variant="outline" size="sm" onClick={addParameter}>
            <Plus className="h-4 w-4 mr-2" />
            Add Parameter
          </Button>
        </div>
        <div className="space-y-2">
          {parameters.map((param) => (
            <div key={param.id} className="flex items-center gap-2">
              <Input
                value={param.name}
                onChange={(e) => updateParameter(param.id, "name", e.target.value)}
                placeholder="@ParamName"
                className="flex-1"
              />
              <Input
                value={param.type}
                onChange={(e) => updateParameter(param.id, "type", e.target.value)}
                placeholder="VARCHAR(50)"
                className="w-32"
              />
              <select
                value={param.mode}
                onChange={(e) => updateParameter(param.id, "mode", e.target.value)}
                className="w-24 rounded-md border border-input bg-background px-2 py-2 text-sm"
              >
                <option value="IN">IN</option>
                <option value="OUT">OUT</option>
                <option value="INOUT">INOUT</option>
              </select>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeParameter(param.id)}
                disabled={parameters.length === 1}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="body">Procedure Body</Label>
        <Textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="SELECT * FROM Users WHERE Id = @Id"
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={generateProcedure} className="flex-1">
          Generate Stored Procedure
        </Button>
        <Button variant="outline" onClick={handleClear} title="Clear">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {output && (
        <div className="space-y-2">
          <Label>Generated SQL</Label>
          <Textarea
            value={output}
            readOnly
            className="min-h-[400px] font-mono text-sm bg-muted"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleCopy} className="flex-1">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button variant="outline" onClick={handleDownload} title="Download">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
