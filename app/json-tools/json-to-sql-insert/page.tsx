"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileJson, RotateCcw, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";

export default function JsonToSqlInsertPage() {
  const [input, setInput] = useState("");
  const [tableName, setTableName] = useState("users");
  const [result, setResult] = useState<string | null>(null);

  const generateSqlInsert = useCallback(() => {
    let data: any;
    try {
      data = JSON.parse(input);
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
      return;
    }

    const items = Array.isArray(data) ? data : [data];
    if (items.length === 0) {
      toast.error("No data to convert");
      return;
    }

    const columns = Object.keys(items[0]);
    const sqlStatements: string[] = [];

    for (const item of items) {
      const values = columns.map(col => {
        const value = item[col];
        if (value === null) return "NULL";
        if (typeof value === "number") return String(value);
        if (typeof value === "boolean") return value ? "TRUE" : "FALSE";
        // Escape single quotes in strings
        const escaped = String(value).replace(/'/g, "''");
        return `'${escaped}'`;
      });

      sqlStatements.push(
        `INSERT INTO ${tableName} (${columns.join(", ")})\nVALUES (${values.join(", ")});`
      );
    }

    setResult(sqlStatements.join("\n\n"));
    toast.success(`Generated ${sqlStatements.length} INSERT statement(s)`);
  }, [input, tableName]);

  const clearAll = () => {
    setResult(null);
  };

  const loadSample = () => {
    setInput(JSON.stringify([
      { id: 1, name: "John Doe", email: "john@example.com", active: true },
      { id: 2, name: "Jane Smith", email: "jane@example.com", active: false }
    ], null, 2));
    setTableName("users");
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("SQL copied to clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON to SQL INSERT Statement Generator</h1>
          <p className="text-muted-foreground">
            Generates SQL INSERT statements from JSON arrays
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Load Sample
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="tableName" className="text-sm whitespace-nowrap">Table Name:</Label>
                <Input
                  id="tableName"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  placeholder="users"
                  className="w-40 h-9"
                />
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                {result && (
                  <Button variant="outline" size="sm" onClick={copyResult}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                )}
                <Button onClick={generateSqlInsert}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <Label htmlFor="input" className="text-sm font-medium text-muted-foreground mb-2 block">
              Input JSON (Array or Object)
            </Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='[{"id": 1, "name": "John"}]'
              className="min-h-[200px] font-mono text-sm resize-none"
            />
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Generated SQL INSERT Statements
              </Label>
              <Textarea
                value={result}
                readOnly
                className="min-h-[200px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
