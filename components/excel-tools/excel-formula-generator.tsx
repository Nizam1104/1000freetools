"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Plus, Minus } from "lucide-react"

export function ExcelFormulaGenerator() {
  const [formulas, setFormulas] = useState<Array<{ name: string; formula: string; description: string; example: string }>>([])
  const [selectedCategory, setSelectedCategory] = useState<"all" | "logical" | "text" | "math" | "date" | "lookup" | "statistical">("all")
  const [copied, setCopied] = useState("")

  const formulaCategories = {
    logical: [
      { name: "IF", formula: "=IF(condition, value_if_true, value_if_false)", description: "Returns one value if condition is true, another if false", example: '=IF(A1>10, "Yes", "No")' },
      { name: "IFS", formula: "=IFS(condition1, value1, condition2, value2, ...)", description: "Checks multiple conditions", example: '=IFS(A1>90, "A", A1>80, "B", A1>70, "C")' },
      { name: "IFERROR", formula: "=IFERROR(value, value_if_error)", description: "Returns a custom value if formula results in error", example: '=IFERROR(A1/B1, "Error")' },
      { name: "AND", formula: "=AND(condition1, condition2, ...)", description: "Returns TRUE if all conditions are true", example: '=AND(A1>0, A1<100)' },
      { name: "OR", formula: "=OR(condition1, condition2, ...)", description: "Returns TRUE if any condition is true", example: '=OR(A1="Yes", A1="Y")' },
      { name: "NOT", formula: "=NOT(condition)", description: "Reverses the logical value", example: '=NOT(A1="Complete")' },
      { name: "IF AND", formula: "=IF(AND(condition1, condition2), value_if_true, value_if_false)", description: "IF with multiple conditions", example: '=IF(AND(A1>0, B1>0), "Both positive", "Check values")' },
      { name: "IF OR", formula: "=IF(OR(condition1, condition2), value_if_true, value_if_false)", description: "IF with any condition true", example: '=IF(OR(A1="Yes", A1="Y"), "Approved", "Denied")' },
    ],
    text: [
      { name: "CONCATENATE", formula: "=CONCATENATE(text1, text2, ...)", description: "Joins multiple text strings", example: '=CONCATENATE(A1, " ", B1)' },
      { name: "TEXTJOIN", formula: "=TEXTJOIN(delimiter, ignore_empty, text1, ...)", description: "Joins text with delimiter", example: '=TEXTJOIN(", ", TRUE, A1:A10)' },
      { name: "LEFT", formula: "=LEFT(text, num_chars)", description: "Extracts characters from the left", example: '=LEFT(A1, 3)' },
      { name: "RIGHT", formula: "=RIGHT(text, num_chars)", description: "Extracts characters from the right", example: '=RIGHT(A1, 3)' },
      { name: "MID", formula: "=MID(text, start_num, num_chars)", description: "Extracts characters from the middle", example: '=MID(A1, 2, 3)' },
      { name: "LEN", formula: "=LEN(text)", description: "Returns the length of text", example: '=LEN(A1)' },
      { name: "TRIM", formula: "=TRIM(text)", description: "Removes extra spaces", example: '=TRIM(A1)' },
      { name: "UPPER", formula: "=UPPER(text)", description: "Converts to uppercase", example: '=UPPER(A1)' },
      { name: "LOWER", formula: "=LOWER(text)", description: "Converts to lowercase", example: '=LOWER(A1)' },
      { name: "PROPER", formula: "=PROPER(text)", description: "Capitalizes first letter of each word", example: '=PROPER(A1)' },
      { name: "SUBSTITUTE", formula: "=SUBSTITUTE(text, old_text, new_text)", description: "Replaces text in a string", example: '=SUBSTITUTE(A1, "old", "new")' },
      { name: "REPLACE", formula: "=REPLACE(old_text, start_num, num_chars, new_text)", description: "Replaces characters at specific position", example: '=REPLACE(A1, 1, 3, "XXX")' },
      { name: "FIND", formula: "=FIND(find_text, within_text)", description: "Finds position of text (case-sensitive)", example: '=FIND("a", A1)' },
      { name: "SEARCH", formula: "=SEARCH(find_text, within_text)", description: "Finds position of text (not case-sensitive)", example: '=SEARCH("a", A1)' },
    ],
    math: [
      { name: "SUM", formula: "=SUM(number1, number2, ...)", description: "Adds all numbers", example: '=SUM(A1:A10)' },
      { name: "SUMIF", formula: "=SUMIF(range, criteria, [sum_range])", description: "Sums cells that meet criteria", example: '=SUMIF(A1:A10, ">50", B1:B10)' },
      { name: "SUMIFS", formula: "=SUMIFS(sum_range, criteria_range1, criteria1, ...)", description: "Sums cells that meet multiple criteria", example: '=SUMIFS(C1:C10, A1:A10, ">50", B1:B10, "Yes")' },
      { name: "AVERAGE", formula: "=AVERAGE(number1, number2, ...)", description: "Returns the average", example: '=AVERAGE(A1:A10)' },
      { name: "AVERAGEIF", formula: "=AVERAGEIF(range, criteria, [average_range])", description: "Averages cells that meet criteria", example: '=AVERAGEIF(A1:A10, ">50")' },
      { name: "COUNT", formula: "=COUNT(value1, value2, ...)", description: "Counts cells with numbers", example: '=COUNT(A1:A10)' },
      { name: "COUNTA", formula: "=COUNTA(value1, value2, ...)", description: "Counts non-empty cells", example: '=COUNTA(A1:A10)' },
      { name: "COUNTIF", formula: "=COUNTIF(range, criteria)", description: "Counts cells that meet criteria", example: '=COUNTIF(A1:A10, ">50")' },
      { name: "COUNTIFS", formula: "=COUNTIFS(criteria_range1, criteria1, ...)", description: "Counts cells that meet multiple criteria", example: '=COUNTIFS(A1:A10, ">50", B1:B10, "Yes")' },
      { name: "ROUND", formula: "=ROUND(number, num_digits)", description: "Rounds to specified digits", example: '=ROUND(A1, 2)' },
      { name: "ROUNDUP", formula: "=ROUNDUP(number, num_digits)", description: "Rounds up", example: '=ROUNDUP(A1, 0)' },
      { name: "ROUNDDOWN", formula: "=ROUNDDOWN(number, num_digits)", description: "Rounds down", example: '=ROUNDDOWN(A1, 0)' },
      { name: "MOD", formula: "=MOD(number, divisor)", description: "Returns remainder after division", example: '=MOD(A1, 10)' },
      { name: "POWER", formula: "=POWER(number, power)", description: "Raises number to a power", example: '=POWER(A1, 2)' },
      { name: "SQRT", formula: "=SQRT(number)", description: "Returns square root", example: '=SQRT(A1)' },
    ],
    date: [
      { name: "TODAY", formula: "=TODAY()", description: "Returns current date", example: '=TODAY()' },
      { name: "NOW", formula: "=NOW()", description: "Returns current date and time", example: '=NOW()' },
      { name: "DATE", formula: "=DATE(year, month, day)", description: "Creates a date", example: '=DATE(2024, 1, 15)' },
      { name: "DATEDIF", formula: "=DATEDIF(start_date, end_date, unit)", description: "Calculates difference between dates", example: '=DATEDIF(A1, B1, "Y")' },
      { name: "YEAR", formula: "=YEAR(date)", description: "Extracts year from date", example: '=YEAR(A1)' },
      { name: "MONTH", formula: "=MONTH(date)", description: "Extracts month from date", example: '=MONTH(A1)' },
      { name: "DAY", formula: "=DAY(date)", description: "Extracts day from date", example: '=DAY(A1)' },
      { name: "WEEKDAY", formula: "=WEEKDAY(date, [return_type])", description: "Returns day of week", example: '=WEEKDAY(A1)' },
      { name: "WORKDAY", formula: "=WORKDAY(start_date, days, [holidays])", description: "Returns workday after specified days", example: '=WORKDAY(A1, 10)' },
      { name: "NETWORKDAYS", formula: "=NETWORKDAYS(start_date, end_date, [holidays])", description: "Returns workdays between dates", example: '=NETWORKDAYS(A1, B1)' },
      { name: "EOMONTH", formula: "=EOMONTH(start_date, months)", description: "Returns last day of month", example: '=EOMONTH(A1, 0)' },
    ],
    lookup: [
      { name: "VLOOKUP", formula: "=VLOOKUP(lookup_value, table_array, col_index, [range_lookup])", description: "Vertical lookup", example: '=VLOOKUP(A1, Sheet2!A:B, 2, FALSE)' },
      { name: "HLOOKUP", formula: "=HLOOKUP(lookup_value, table_array, row_index, [range_lookup])", description: "Horizontal lookup", example: '=HLOOKUP(A1, Sheet2!1:2, 2, FALSE)' },
      { name: "XLOOKUP", formula: "=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found])", description: "Modern lookup function", example: '=XLOOKUP(A1, B1:B10, C1:C10, "Not found")' },
      { name: "INDEX", formula: "=INDEX(array, row_num, [col_num])", description: "Returns value at position", example: '=INDEX(A1:C10, 5, 2)' },
      { name: "MATCH", formula: "=MATCH(lookup_value, lookup_array, [match_type])", description: "Returns position of value", example: '=MATCH(A1, B1:B10, 0)' },
      { name: "INDEX MATCH", formula: "=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))", description: "Flexible lookup combination", example: '=INDEX(C1:C10, MATCH(A1, B1:B10, 0))' },
    ],
    statistical: [
      { name: "MIN", formula: "=MIN(number1, number2, ...)", description: "Returns minimum value", example: '=MIN(A1:A10)' },
      { name: "MAX", formula: "=MAX(number1, number2, ...)", description: "Returns maximum value", example: '=MAX(A1:A10)' },
      { name: "MEDIAN", formula: "=MEDIAN(number1, number2, ...)", description: "Returns median value", example: '=MEDIAN(A1:A10)' },
      { name: "MODE", formula: "=MODE(number1, number2, ...)", description: "Returns most frequent value", example: '=MODE(A1:A10)' },
      { name: "STDEV", formula: "=STDEV(number1, number2, ...)", description: "Returns standard deviation", example: '=STDEV(A1:A10)' },
      { name: "VAR", formula: "=VAR(number1, number2, ...)", description: "Returns variance", example: '=VAR(A1:A10)' },
      { name: "LARGE", formula: "=LARGE(array, k)", description: "Returns k-th largest value", example: '=LARGE(A1:A10, 2)' },
      { name: "SMALL", formula: "=SMALL(array, k)", description: "Returns k-th smallest value", example: '=SMALL(A1:A10, 2)' },
      { name: "RANK", formula: "=RANK(number, ref, [order])", description: "Returns rank of number", example: '=RANK(A1, A1:A10, 0)' },
    ],
  }

  const allFormulas = React.useMemo(() => {
    const all: Array<{ name: string; formula: string; description: string; example: string; category: string }> = []
    Object.entries(formulaCategories).forEach(([category, formulas]) => {
      formulas.forEach(f => all.push({ ...f, category }))
    })
    return all
  }, [])

  const filteredFormulas = selectedCategory === "all" 
    ? allFormulas 
    : allFormulas.filter(f => f.category === selectedCategory)

  const handleCopy = useCallback(async (text: string, name: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(name)
    setTimeout(() => setCopied(""), 1500)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Excel Formula Generator</h2>
            <p className="text-sm text-muted-foreground">
              Browse and copy common Excel formulas
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          onClick={() => setSelectedCategory("all")}
        >
          All
        </Button>
        <Button
          variant={selectedCategory === "logical" ? "default" : "outline"}
          onClick={() => setSelectedCategory("logical")}
        >
          Logical
        </Button>
        <Button
          variant={selectedCategory === "text" ? "default" : "outline"}
          onClick={() => setSelectedCategory("text")}
        >
          Text
        </Button>
        <Button
          variant={selectedCategory === "math" ? "default" : "outline"}
          onClick={() => setSelectedCategory("math")}
        >
          Math & Stats
        </Button>
        <Button
          variant={selectedCategory === "date" ? "default" : "outline"}
          onClick={() => setSelectedCategory("date")}
        >
          Date & Time
        </Button>
        <Button
          variant={selectedCategory === "lookup" ? "default" : "outline"}
          onClick={() => setSelectedCategory("lookup")}
        >
          Lookup
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredFormulas.map((item) => (
          <div key={item.name} className="border rounded-lg p-4 space-y-2 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <Button variant="outline" size="sm" onClick={() => handleCopy(item.formula, item.name)}>
                {copied === item.name ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">{item.description}</p>
            <div className="bg-muted rounded p-2 font-mono text-sm break-all">
              {item.formula}
            </div>
            <div className="text-xs text-muted-foreground">
              Example: <code className="bg-background px-1 rounded">{item.example}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
