"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy, Check, Trash2, Play, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SqlDateFunctionPlayground() {
  const [selectedDb, setSelectedDb] = useState<"mysql" | "postgresql" | "sqlserver" | "oracle" | "sqlite">("mysql")
  const [selectedFunction, setSelectedFunction] = useState<string>("")
  const [inputValue, setInputValue] = useState(new Date().toISOString().split('T')[0])
  const [interval, setInterval] = useState("1")
  const [intervalUnit, setIntervalUnit] = useState("DAY")
  const [result, setResult] = useState("")
  const [generatedSQL, setGeneratedSQL] = useState("")
  const [copied, setCopied] = useState(false)

  const dateFunctions = {
    mysql: [
      { name: "CURRENT_DATE", desc: "Returns current date", syntax: "CURRENT_DATE" },
      { name: "NOW", desc: "Returns current date and time", syntax: "NOW()" },
      { name: "DATE_ADD", desc: "Adds interval to date", syntax: "DATE_ADD(date, INTERVAL n UNIT)" },
      { name: "DATE_SUB", desc: "Subtracts interval from date", syntax: "DATE_SUB(date, INTERVAL n UNIT)" },
      { name: "DATEDIFF", desc: "Returns days between two dates", syntax: "DATEDIFF(date1, date2)" },
      { name: "DATE_FORMAT", desc: "Formats date", syntax: "DATE_FORMAT(date, format)" },
      { name: "EXTRACT", desc: "Extracts part of date", syntax: "EXTRACT(unit FROM date)" },
      { name: "LAST_DAY", desc: "Returns last day of month", syntax: "LAST_DAY(date)" },
      { name: "MONTHNAME", desc: "Returns month name", syntax: "MONTHNAME(date)" },
      { name: "DAYNAME", desc: "Returns day name", syntax: "DAYNAME(date)" },
      { name: "YEAR", desc: "Returns year", syntax: "YEAR(date)" },
      { name: "MONTH", desc: "Returns month", syntax: "MONTH(date)" },
      { name: "DAY", desc: "Returns day", syntax: "DAY(date)" },
      { name: "WEEK", desc: "Returns week number", syntax: "WEEK(date)" },
      { name: "QUARTER", desc: "Returns quarter", syntax: "QUARTER(date)" },
      { name: "TIMESTAMPDIFF", desc: "Difference between timestamps", syntax: "TIMESTAMPDIFF(unit, datetime1, datetime2)" },
    ],
    postgresql: [
      { name: "CURRENT_DATE", desc: "Returns current date", syntax: "CURRENT_DATE" },
      { name: "NOW", desc: "Returns current timestamp", syntax: "NOW()" },
      { name: "AGE", desc: "Interval between timestamps", syntax: "AGE(timestamp1, timestamp2)" },
      { name: "DATE_TRUNC", desc: "Truncates date to precision", syntax: "DATE_TRUNC('precision', timestamp)" },
      { name: "EXTRACT", desc: "Extracts subfield", syntax: "EXTRACT(field FROM source)" },
      { name: "TO_CHAR", desc: "Formats date", syntax: "TO_CHAR(timestamp, format)" },
      { name: "TO_DATE", desc: "Parses string to date", syntax: "TO_DATE(text, format)" },
      { name: "MAKE_DATE", desc: "Creates date", syntax: "MAKE_DATE(year, month, day)" },
      { name: "INTERVAL", desc: "Date arithmetic", syntax: "date + INTERVAL 'n unit'" },
      { name: "DATE_PART", desc: "Extracts subfield", syntax: "DATE_PART('field', source)" },
    ],
    sqlserver: [
      { name: "GETDATE", desc: "Returns current datetime", syntax: "GETDATE()" },
      { name: "SYSDATETIME", desc: "Returns current datetime2", syntax: "SYSDATETIME()" },
      { name: "DATEADD", desc: "Adds interval", syntax: "DATEADD(unit, n, date)" },
      { name: "DATEDIFF", desc: "Returns difference", syntax: "DATEDIFF(unit, date1, date2)" },
      { name: "DATENAME", desc: "Returns date part name", syntax: "DATENAME(unit, date)" },
      { name: "DATEPART", desc: "Returns date part", syntax: "DATEPART(unit, date)" },
      { name: "CONVERT", desc: "Converts/formats date", syntax: "CONVERT(varchar, date, style)" },
      { name: "FORMAT", desc: "Formats date", syntax: "FORMAT(date, format)" },
      { name: "EOMONTH", desc: "End of month", syntax: "EOMONTH(date)" },
    ],
    oracle: [
      { name: "SYSDATE", desc: "Returns current date/time", syntax: "SYSDATE" },
      { name: "ADD_MONTHS", desc: "Adds months", syntax: "ADD_MONTHS(date, n)" },
      { name: "MONTHS_BETWEEN", desc: "Months between dates", syntax: "MONTHS_BETWEEN(date1, date2)" },
      { name: "NEXT_DAY", desc: "Next occurrence of day", syntax: "NEXT_DAY(date, day)" },
      { name: "LAST_DAY", desc: "Last day of month", syntax: "LAST_DAY(date)" },
      { name: "TRUNC", desc: "Truncates date", syntax: "TRUNC(date, format)" },
      { name: "EXTRACT", desc: "Extracts subfield", syntax: "EXTRACT(field FROM date)" },
      { name: "TO_CHAR", desc: "Formats date", syntax: "TO_CHAR(date, format)" },
      { name: "TO_DATE", desc: "Parses string", syntax: "TO_DATE(text, format)" },
      { name: "ROUND", desc: "Rounds date", syntax: "ROUND(date, format)" },
    ],
    sqlite: [
      { name: "DATE", desc: "Returns date", syntax: "DATE('now')" },
      { name: "DATETIME", desc: "Returns datetime", syntax: "DATETIME('now')" },
      { name: "JULIANDAY", desc: "Julian day number", syntax: "JULIANDAY('now')" },
      { name: "STRFTIME", desc: "Formats date", syntax: "STRFTIME(format, date)" },
      { name: "DATE (modifier)", desc: "Date arithmetic", syntax: "DATE('now', '+n days')" },
      { name: "DATETIME (modifier)", desc: "Datetime arithmetic", syntax: "DATETIME('now', '+n hours')" },
    ],
  }

  const generateSQL = useCallback(() => {
    if (!selectedFunction) return

    let sql = ""
    const db = selectedDb
    const date = inputValue

    switch (db) {
      case "mysql":
        switch (selectedFunction) {
          case "CURRENT_DATE":
            sql = `SELECT CURRENT_DATE AS current_date;`
            break
          case "NOW":
            sql = `SELECT NOW() AS current_timestamp;`
            break
          case "DATE_ADD":
            sql = `SELECT DATE_ADD('${date}', INTERVAL ${interval} ${intervalUnit}) AS result;`
            break
          case "DATE_SUB":
            sql = `SELECT DATE_SUB('${date}', INTERVAL ${interval} ${intervalUnit}) AS result;`
            break
          case "DATEDIFF":
            sql = `SELECT DATEDIFF('${date}', CURRENT_DATE) AS days_difference;`
            break
          case "DATE_FORMAT":
            sql = `SELECT DATE_FORMAT('${date}', '%Y-%m-%d %H:%i:%s') AS formatted_date;`
            break
          case "EXTRACT":
            sql = `SELECT EXTRACT(YEAR FROM '${date}') AS year, EXTRACT(MONTH FROM '${date}') AS month;`
            break
          case "LAST_DAY":
            sql = `SELECT LAST_DAY('${date}') AS last_day_of_month;`
            break
          case "MONTHNAME":
            sql = `SELECT MONTHNAME('${date}') AS month_name;`
            break
          case "DAYNAME":
            sql = `SELECT DAYNAME('${date}') AS day_name;`
            break
          case "YEAR":
            sql = `SELECT YEAR('${date}') AS year;`
            break
          case "MONTH":
            sql = `SELECT MONTH('${date}') AS month;`
            break
          case "DAY":
            sql = `SELECT DAY('${date}') AS day;`
            break
          case "WEEK":
            sql = `SELECT WEEK('${date}') AS week_number;`
            break
          case "QUARTER":
            sql = `SELECT QUARTER('${date}') AS quarter;`
            break
          default:
            sql = `-- ${selectedFunction}\nSELECT ${selectedFunction}('${date}');`
        }
        break

      case "postgresql":
        switch (selectedFunction) {
          case "CURRENT_DATE":
            sql = `SELECT CURRENT_DATE AS current_date;`
            break
          case "NOW":
            sql = `SELECT NOW() AS current_timestamp;`
            break
          case "AGE":
            sql = `SELECT AGE('${date}'::timestamp, CURRENT_TIMESTAMP) AS age;`
            break
          case "DATE_TRUNC":
            sql = `SELECT DATE_TRUNC('month', '${date}'::timestamp) AS truncated_date;`
            break
          case "EXTRACT":
            sql = `SELECT EXTRACT(YEAR FROM '${date}'::date) AS year, EXTRACT(MONTH FROM '${date}'::date) AS month;`
            break
          case "TO_CHAR":
            sql = `SELECT TO_CHAR('${date}'::timestamp, 'YYYY-MM-DD HH24:MI:SS') AS formatted_date;`
            break
          case "TO_DATE":
            sql = `SELECT TO_DATE('${date}', 'YYYY-MM-DD') AS parsed_date;`
            break
          case "MAKE_DATE":
            sql = `SELECT MAKE_DATE(2024, 1, 15) AS created_date;`
            break
          case "INTERVAL":
            sql = `SELECT '${date}'::date + INTERVAL '${interval} ${intervalUnit.toLowerCase()}' AS result;`
            break
          default:
            sql = `-- ${selectedFunction}\nSELECT ${selectedFunction};`
        }
        break

      case "sqlserver":
        switch (selectedFunction) {
          case "GETDATE":
            sql = `SELECT GETDATE() AS current_datetime;`
            break
          case "SYSDATETIME":
            sql = `SELECT SYSDATETIME() AS current_datetime2;`
            break
          case "DATEADD":
            sql = `SELECT DATEADD(${intervalUnit.toLowerCase()}, ${interval}, '${date}') AS result;`
            break
          case "DATEDIFF":
            sql = `SELECT DATEDIFF(DAY, GETDATE(), '${date}') AS days_difference;`
            break
          case "DATENAME":
            sql = `SELECT DATENAME(WEEKDAY, '${date}') AS day_name;`
            break
          case "DATEPART":
            sql = `SELECT DATEPART(MONTH, '${date}') AS month;`
            break
          case "CONVERT":
            sql = `SELECT CONVERT(VARCHAR, '${date}', 120) AS formatted_date;`
            break
          case "FORMAT":
            sql = `SELECT FORMAT('${date}', 'yyyy-MM-dd HH:mm:ss') AS formatted_date;`
            break
          case "EOMONTH":
            sql = `SELECT EOMONTH('${date}') AS end_of_month;`
            break
          default:
            sql = `-- ${selectedFunction}\nSELECT ${selectedFunction};`
        }
        break

      case "oracle":
        switch (selectedFunction) {
          case "SYSDATE":
            sql = `SELECT SYSDATE AS current_date FROM dual;`
            break
          case "ADD_MONTHS":
            sql = `SELECT ADD_MONTHS(TO_DATE('${date}', 'YYYY-MM-DD'), ${interval}) AS result FROM dual;`
            break
          case "MONTHS_BETWEEN":
            sql = `SELECT MONTHS_BETWEEN(SYSDATE, TO_DATE('${date}', 'YYYY-MM-DD')) AS months FROM dual;`
            break
          case "NEXT_DAY":
            sql = `SELECT NEXT_DAY(TO_DATE('${date}', 'YYYY-MM-DD'), 'MONDAY') AS next_monday FROM dual;`
            break
          case "LAST_DAY":
            sql = `SELECT LAST_DAY(TO_DATE('${date}', 'YYYY-MM-DD')) AS last_day FROM dual;`
            break
          case "TRUNC":
            sql = `SELECT TRUNC(TO_DATE('${date}', 'YYYY-MM-DD'), 'MONTH') AS truncated FROM dual;`
            break
          case "EXTRACT":
            sql = `SELECT EXTRACT(YEAR FROM DATE '${date}') AS year FROM dual;`
            break
          case "TO_CHAR":
            sql = `SELECT TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') AS formatted FROM dual;`
            break
          default:
            sql = `-- ${selectedFunction}\nSELECT ${selectedFunction} FROM dual;`
        }
        break

      case "sqlite":
        switch (selectedFunction) {
          case "DATE":
            sql = `SELECT DATE('now') AS current_date;`
            break
          case "DATETIME":
            sql = `SELECT DATETIME('now') AS current_datetime;`
            break
          case "JULIANDAY":
            sql = `SELECT JULIANDAY('now') AS julian_day;`
            break
          case "STRFTIME":
            sql = `SELECT STRFTIME('%Y-%m-%d %H:%M:%S', 'now') AS formatted_date;`
            break
          case "DATE (modifier)":
            sql = `SELECT DATE('${date}', '+${interval} ${intervalUnit.toLowerCase()}s') AS result;`
            break
          case "DATETIME (modifier)":
            sql = `SELECT DATETIME('now', '+${interval} ${intervalUnit.toLowerCase()}s') AS result;`
            break
          default:
            sql = `-- ${selectedFunction}\nSELECT ${selectedFunction};`
        }
        break
    }

    setGeneratedSQL(sql)
    
    // Calculate result (simulated for demo)
    try {
      const dateObj = new Date(date)
      if (selectedFunction.includes("ADD") || selectedFunction.includes("ADD_MONTHS") || selectedFunction.includes("DATEADD")) {
        const newDate = new Date(dateObj)
        if (intervalUnit === "DAY") newDate.setDate(newDate.getDate() + parseInt(interval))
        else if (intervalUnit === "MONTH") newDate.setMonth(newDate.getMonth() + parseInt(interval))
        else if (intervalUnit === "YEAR") newDate.setFullYear(newDate.getFullYear() + parseInt(interval))
        setResult(newDate.toISOString().split('T')[0])
      } else if (selectedFunction.includes("SUB")) {
        const newDate = new Date(dateObj)
        if (intervalUnit === "DAY") newDate.setDate(newDate.getDate() - parseInt(interval))
        else if (intervalUnit === "MONTH") newDate.setMonth(newDate.getMonth() - parseInt(interval))
        else if (intervalUnit === "YEAR") newDate.setFullYear(newDate.getFullYear() - parseInt(interval))
        setResult(newDate.toISOString().split('T')[0])
      } else if (selectedFunction === "YEAR") {
        setResult(dateObj.getFullYear().toString())
      } else if (selectedFunction === "MONTH") {
        setResult((dateObj.getMonth() + 1).toString())
      } else if (selectedFunction === "DAY") {
        setResult(dateObj.getDate().toString())
      } else {
        setResult("Execute SQL to see result")
      }
    } catch {
      setResult("Execute SQL to see result")
    }
  }, [selectedDb, selectedFunction, inputValue, interval, intervalUnit])

  const handleCopy = useCallback(async () => {
    if (generatedSQL) {
      await navigator.clipboard.writeText(generatedSQL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [generatedSQL])

  const handleClear = useCallback(() => {
    setSelectedFunction("")
    setInputValue(new Date().toISOString().split('T')[0])
    setInterval("1")
    setResult("")
    setGeneratedSQL("")
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">SQL Date Function Playground</h2>
            <p className="text-sm text-muted-foreground">
              Explore and test date functions across different databases
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Label htmlFor="db">Database:</Label>
        <select
          id="db"
          value={selectedDb}
          onChange={(e) => {
            setSelectedDb(e.target.value as typeof selectedDb)
            setSelectedFunction("")
          }}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="mysql">MySQL</option>
          <option value="postgresql">PostgreSQL</option>
          <option value="sqlserver">SQL Server</option>
          <option value="oracle">Oracle</option>
          <option value="sqlite">SQLite</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Date Functions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-2">
                {(dateFunctions as any)[selectedDb].map((func: any) => (
                  <Button
                    key={func.name}
                    variant={selectedFunction === func.name ? "default" : "outline"}
                    className="justify-start text-left h-auto py-2 px-3"
                    onClick={() => setSelectedFunction(func.name)}
                  >
                    <div>
                      <div className="font-medium">{func.name}</div>
                      <div className="text-xs text-muted-foreground">{func.desc}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {selectedFunction && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Test Function
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="dateValue">Date Value</Label>
                    <Input
                      id="dateValue"
                      type="date"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interval">Interval</Label>
                    <Input
                      id="interval"
                      type="number"
                      value={interval}
                      onChange={(e) => setInterval(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <select
                      id="unit"
                      value={intervalUnit}
                      onChange={(e) => setIntervalUnit(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="DAY">Day</option>
                      <option value="MONTH">Month</option>
                      <option value="YEAR">Year</option>
                      <option value="HOUR">Hour</option>
                      <option value="MINUTE">Minute</option>
                      <option value="SECOND">Second</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button onClick={generateSQL} className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Generate SQL
                  </Button>
                  <Button variant="outline" onClick={handleClear} title="Clear">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Generated SQL</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {generatedSQL ? (
                <>
                  <div className="relative">
                    <pre className="p-4 bg-muted rounded-lg text-sm font-mono overflow-x-auto">
                      {generatedSQL}
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={handleCopy}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <Label className="text-sm">Expected Result</Label>
                    <p className="mt-1 font-mono">{result}</p>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Select a function to generate SQL
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
