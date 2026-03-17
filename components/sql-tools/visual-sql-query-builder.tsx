"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Trash2, Download, Plus, Trash, Table } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TableField {
  id: string
  name: string
  selected: boolean
}

interface QueryTable {
  id: string
  name: string
  alias: string
  fields: TableField[]
}

interface JoinCondition {
  id: string
  leftTable: string
  leftField: string
  rightTable: string
  rightField: string
  type: "INNER" | "LEFT" | "RIGHT" | "FULL"
}

interface WhereCondition {
  id: string
  field: string
  operator: string
  value: string
  conjunction: "AND" | "OR"
}

export function VisualSqlQueryBuilder() {
  const [tables, setTables] = useState<QueryTable[]>([
    {
      id: "1",
      name: "users",
      alias: "u",
      fields: [
        { id: "1-1", name: "id", selected: true },
        { id: "1-2", name: "name", selected: true },
        { id: "1-3", name: "email", selected: false },
        { id: "1-4", name: "created_at", selected: false },
      ]
    }
  ])
  const [joins, setJoins] = useState<JoinCondition[]>([])
  const [whereConditions, setWhereConditions] = useState<WhereCondition[]>([])
  const [orderBy, setOrderBy] = useState<{ field: string; direction: "ASC" | "DESC" }[]>([])
  const [groupBy, setGroupBy] = useState<string[]>([])
  const [limit, setLimit] = useState("")
  const [generatedSQL, setGeneratedSQL] = useState("")
  const [copied, setCopied] = useState(false)

  const addTable = useCallback(() => {
    const newId = (tables.length + 1).toString()
    setTables([...tables, {
      id: newId,
      name: "table" + newId,
      alias: "t" + newId,
      fields: [
        { id: `${newId}-1`, name: "id", selected: false },
        { id: `${newId}-2`, name: "name", selected: false },
      ]
    }])
  }, [tables])

  const removeTable = useCallback((id: string) => {
    if (tables.length > 1) {
      setTables(tables.filter(t => t.id !== id))
      setJoins(joins.filter(j => j.leftTable !== id && j.rightTable !== id))
    }
  }, [tables, joins])

  const updateTable = useCallback((id: string, field: keyof QueryTable, value: string) => {
    setTables(tables.map(t => t.id === id ? { ...t, [field]: value } : t))
  }, [tables])

  const toggleField = useCallback((tableId: string, fieldId: string) => {
    setTables(tables.map(t => 
      t.id === tableId 
        ? { ...t, fields: t.fields.map(f => f.id === fieldId ? { ...f, selected: !f.selected } : f) }
        : t
    ))
  }, [tables])

  const addJoin = useCallback(() => {
    if (tables.length < 2) return
    const newJoin: JoinCondition = {
      id: `join-${joins.length + 1}`,
      leftTable: tables[0].id,
      leftField: tables[0].fields[0]?.name || "",
      rightTable: tables[1]?.id || "",
      rightField: tables[1]?.fields[0]?.name || "",
      type: "INNER"
    }
    setJoins([...joins, newJoin])
  }, [tables, joins])

  const removeJoin = useCallback((id: string) => {
    setJoins(joins.filter(j => j.id !== id))
  }, [joins])

  const updateJoin = useCallback((id: string, field: keyof JoinCondition, value: string) => {
    setJoins(joins.map(j => j.id === id ? { ...j, [field]: value } : j))
  }, [joins])

  const addWhere = useCallback(() => {
    const allFields = tables.flatMap(t => t.fields.map(f => ({ table: t.alias, field: f.name })))
    const newWhere: WhereCondition = {
      id: `where-${whereConditions.length + 1}`,
      field: allFields[0]?.table + "." + allFields[0]?.field || "",
      operator: "=",
      value: "",
      conjunction: "AND"
    }
    setWhereConditions([...whereConditions, newWhere])
  }, [tables, whereConditions])

  const removeWhere = useCallback((id: string) => {
    setWhereConditions(whereConditions.filter(w => w.id !== id))
  }, [whereConditions])

  const updateWhere = useCallback((id: string, field: keyof WhereCondition, value: string) => {
    setWhereConditions(whereConditions.map(w => w.id === id ? { ...w, [field]: value } : w))
  }, [whereConditions])

  const generateSQL = useCallback(() => {
    // Build SELECT clause
    const selectedFields = tables.flatMap(t => 
      t.fields.filter(f => f.selected).map(f => `${t.alias}.${f.name}`)
    )
    const selectClause = selectedFields.length > 0 ? selectedFields.join(", ") : "*"

    // Build FROM clause
    const fromTable = tables[0]
    if (!fromTable) return

    let sql = `SELECT ${selectClause}\nFROM ${fromTable.name} ${fromTable.alias}`

    // Build JOIN clauses
    joins.forEach(join => {
      const leftTable = tables.find(t => t.id === join.leftTable)
      const rightTable = tables.find(t => t.id === join.rightTable)
      if (leftTable && rightTable) {
        sql += `\n${join.type} JOIN ${rightTable.name} ${rightTable.alias} ON ${leftTable.alias}.${join.leftField} = ${rightTable.alias}.${join.rightField}`
      }
    })

    // Build WHERE clause
    if (whereConditions.length > 0) {
      sql += "\nWHERE "
      sql += whereConditions.map((w, i) => {
        const conj = i > 0 ? ` ${w.conjunction} ` : ""
        const value = isNaN(Number(w.value)) ? `'${w.value}'` : w.value
        return `${conj}${w.field} ${w.operator} ${value}`
      }).join("")
    }

    // Build GROUP BY clause
    if (groupBy.length > 0) {
      sql += `\nGROUP BY ${groupBy.join(", ")}`
    }

    // Build ORDER BY clause
    if (orderBy.length > 0) {
      sql += `\nORDER BY ${orderBy.map(o => `${o.field} ${o.direction}`).join(", ")}`
    }

    // Build LIMIT clause
    if (limit) {
      sql += `\nLIMIT ${limit}`
    }

    setGeneratedSQL(sql)
  }, [tables, joins, whereConditions, groupBy, orderBy, limit])

  const handleCopy = useCallback(async () => {
    if (generatedSQL) {
      await navigator.clipboard.writeText(generatedSQL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [generatedSQL])

  const handleClear = useCallback(() => {
    setTables([{
      id: "1",
      name: "users",
      alias: "u",
      fields: [
        { id: "1-1", name: "id", selected: true },
        { id: "1-2", name: "name", selected: true },
      ]
    }])
    setJoins([])
    setWhereConditions([])
    setOrderBy([])
    setGroupBy([])
    setLimit("")
    setGeneratedSQL("")
  }, [])

  const handleDownload = useCallback(() => {
    if (generatedSQL) {
      const blob = new Blob([generatedSQL], { type: "application/sql" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "query.sql"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [generatedSQL])

  const allFields = tables.flatMap(t => t.fields.map(f => ({ alias: t.alias, name: f.name, value: `${t.alias}.${f.name}` })))

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Visual SQL Query Builder</h2>
            <p className="text-sm text-muted-foreground">
              Build SQL queries visually with drag-and-drop interface
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Tables</span>
                <Button variant="outline" size="sm" onClick={addTable}>
                  <Plus className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {tables.map((table) => (
                <div key={table.id} className="p-3 border rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <Input
                      value={table.name}
                      onChange={(e) => updateTable(table.id, "name", e.target.value)}
                      placeholder="Table name"
                      className="w-24 text-sm"
                    />
                    <span className="text-sm text-muted-foreground">AS</span>
                    <Input
                      value={table.alias}
                      onChange={(e) => updateTable(table.id, "alias", e.target.value)}
                      placeholder="Alias"
                      className="w-16 text-sm"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTable(table.id)}
                      disabled={tables.length === 1}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    {table.fields.map((field) => (
                      <label key={field.id} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={field.selected}
                          onChange={() => toggleField(table.id, field.id)}
                          className="rounded border-gray-300"
                        />
                        {field.name}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Joins</span>
                <Button variant="outline" size="sm" onClick={addJoin} disabled={tables.length < 2}>
                  <Plus className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {joins.map((join) => (
                <div key={join.id} className="p-3 border rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <select
                      value={join.type}
                      onChange={(e) => updateJoin(join.id, "type", e.target.value)}
                      className="rounded-md border border-input bg-background px-2 py-1 text-sm"
                    >
                      <option value="INNER">INNER</option>
                      <option value="LEFT">LEFT</option>
                      <option value="RIGHT">RIGHT</option>
                      <option value="FULL">FULL</option>
                    </select>
                    <span className="text-sm">JOIN</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <select
                      value={join.leftTable}
                      onChange={(e) => updateJoin(join.id, "leftTable", e.target.value)}
                      className="rounded-md border border-input bg-background px-2 py-1"
                    >
                      {tables.map(t => <option key={t.id} value={t.id}>{t.alias}</option>)}
                    </select>
                    <Input
                      value={join.leftField}
                      onChange={(e) => updateJoin(join.id, "leftField", e.target.value)}
                      placeholder="field"
                      className="w-20"
                    />
                    <span>=</span>
                    <select
                      value={join.rightTable}
                      onChange={(e) => updateJoin(join.id, "rightTable", e.target.value)}
                      className="rounded-md border border-input bg-background px-2 py-1"
                    >
                      {tables.map(t => <option key={t.id} value={t.id}>{t.alias}</option>)}
                    </select>
                    <Input
                      value={join.rightField}
                      onChange={(e) => updateJoin(join.id, "rightField", e.target.value)}
                      placeholder="field"
                      className="w-20"
                    />
                    <Button variant="ghost" size="sm" onClick={() => removeJoin(join.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {joins.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No joins added</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>WHERE Conditions</span>
                <Button variant="outline" size="sm" onClick={addWhere}>
                  <Plus className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {whereConditions.map((where) => (
                <div key={where.id} className="flex items-center gap-2">
                  {whereConditions.indexOf(where) > 0 && (
                    <select
                      value={where.conjunction}
                      onChange={(e) => updateWhere(where.id, "conjunction", e.target.value)}
                      className="rounded-md border border-input bg-background px-2 py-1 text-sm"
                    >
                      <option value="AND">AND</option>
                      <option value="OR">OR</option>
                    </select>
                  )}
                  <select
                    value={where.field}
                    onChange={(e) => updateWhere(where.id, "field", e.target.value)}
                    className="rounded-md border border-input bg-background px-2 py-1 text-sm flex-1"
                  >
                    {allFields.map(f => <option key={f.value} value={f.value}>{f.value}</option>)}
                  </select>
                  <select
                    value={where.operator}
                    onChange={(e) => updateWhere(where.id, "operator", e.target.value)}
                    className="rounded-md border border-input bg-background px-2 py-1 text-sm"
                  >
                    <option value="=">=</option>
                    <option value="!=">!=</option>
                    <option value=">">&gt;</option>
                    <option value=">=">&gt;=</option>
                    <option value="<">&lt;</option>
                    <option value="<=">&lt;=</option>
                    <option value="LIKE">LIKE</option>
                    <option value="IN">IN</option>
                    <option value="IS NULL">IS NULL</option>
                    <option value="IS NOT NULL">IS NOT NULL</option>
                  </select>
                  <Input
                    value={where.value}
                    onChange={(e) => updateWhere(where.id, "value", e.target.value)}
                    placeholder="Value"
                    className="w-24"
                    disabled={where.operator.includes("NULL")}
                  />
                  <Button variant="ghost" size="sm" onClick={() => removeWhere(where.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {whereConditions.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No conditions added</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">ORDER BY / GROUP BY / LIMIT</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm">ORDER BY</Label>
                <div className="flex gap-2">
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        setOrderBy([...orderBy, { field: e.target.value, direction: "ASC" }])
                      }
                    }}
                    className="rounded-md border border-input bg-background px-2 py-1 text-sm flex-1"
                    defaultValue=""
                  >
                    <option value="">Select field...</option>
                    {allFields.map(f => <option key={f.value} value={f.value}>{f.value}</option>)}
                  </select>
                </div>
                {orderBy.map((o, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-sm">{o.field}</span>
                    <select
                      value={o.direction}
                      onChange={(e) => {
                        const newOrderBy = [...orderBy]
                        newOrderBy[i].direction = e.target.value as "ASC" | "DESC"
                        setOrderBy(newOrderBy)
                      }}
                      className="rounded-md border border-input bg-background px-2 py-1 text-sm"
                    >
                      <option value="ASC">ASC</option>
                      <option value="DESC">DESC</option>
                    </select>
                    <Button variant="ghost" size="sm" onClick={() => setOrderBy(orderBy.filter((_, idx) => idx !== i))}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label className="text-sm">GROUP BY</Label>
                <div className="flex flex-wrap gap-2">
                  {allFields.map(f => (
                    <label key={f.value} className="flex items-center gap-1 text-sm">
                      <input
                        type="checkbox"
                        checked={groupBy.includes(f.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setGroupBy([...groupBy, f.value])
                          } else {
                            setGroupBy(groupBy.filter(g => g !== f.value))
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      {f.value}
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">LIMIT</Label>
                <Input
                  type="number"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  placeholder="100"
                  className="w-32"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={generateSQL} className="flex-1">
          <Table className="h-4 w-4 mr-2" />
          Generate SQL
        </Button>
        <Button variant="outline" onClick={handleClear} title="Clear">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {generatedSQL && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Generated SQL Query</Label>
            <div className="flex items-center gap-2">
              <Button onClick={handleCopy} variant="outline" size="sm">
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button onClick={handleDownload} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          <Textarea
            value={generatedSQL}
            readOnly
            className="min-h-[200px] font-mono text-sm bg-muted"
          />
        </div>
      )}
    </div>
  )
}
