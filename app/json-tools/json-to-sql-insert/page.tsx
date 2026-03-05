"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/utils/json-editor";
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

        {/* When to Use */}
        <Card className="mb-6 border-l-4 border-l-primary">
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold mb-3">When to Use This Tool</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground mb-3">
                  You have JSON data that needs to go into a database. Writing INSERT statements by hand for hundreds of records is not happening. You need to transform your JSON array into valid SQL that you can run immediately.
                </p>
                <h3 className="font-medium mb-2">Perfect for:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✓ Bulk data imports from APIs</li>
                  <li>✓ Database seeding scripts</li>
                  <li>✓ Migration data transfers</li>
                  <li>✓ Test data generation</li>
                </ul>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium mb-2">Supported Databases:</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-background border rounded text-sm">MySQL</span>
                  <span className="px-2 py-1 bg-background border rounded text-sm">PostgreSQL</span>
                  <span className="px-2 py-1 bg-background border rounded text-sm">SQLite</span>
                  <span className="px-2 py-1 bg-background border rounded text-sm">SQL Server</span>
                  <span className="px-2 py-1 bg-background border rounded text-sm">MariaDB</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* The Process */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">The Process</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-card border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">1</span>
                <h3 className="font-medium">Input JSON</h3>
              </div>
              <p className="text-sm text-muted-foreground ml-11">Paste your JSON array of objects with the data to insert</p>
            </div>
            <div className="flex-1 bg-card border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">2</span>
                <h3 className="font-medium">Specify Table</h3>
              </div>
              <p className="text-sm text-muted-foreground ml-11">Enter your target database table name</p>
            </div>
            <div className="flex-1 bg-card border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">3</span>
                <h3 className="font-medium">Get SQL</h3>
              </div>
              <p className="text-sm text-muted-foreground ml-11">Copy the generated INSERT statements ready to execute</p>
            </div>
          </div>
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
            <JsonEditor
              value={input}
              onChange={setInput}
              placeholder='[{"id": 1, "name": "John"}]'
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
              <JsonEditor
                value={result}
                readOnly
              />
            </CardContent>
          </Card>
        )}
      </div>

      {/* SEO Content */}
      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">About JSON to SQL INSERT Generator</h2>
        <p className="text-muted-foreground mb-6">
          Turning JSON data into SQL INSERT statements by hand is error-prone and slow. This generator automates the conversion, handling proper escaping of strings, type conversion for booleans and numbers, and NULL handling. You get ready-to-execute SQL that works with MySQL, PostgreSQL, SQLite, and other databases.
        </p>

        <h3 className="text-xl font-semibold mb-3">How the generation works</h3>
        <p className="text-muted-foreground mb-2">
          Paste your JSON array or single object in the input box. Enter your target table name. Click Generate and the tool extracts column names from the first object's keys, then creates an INSERT statement for each row in your data.
        </p>
        <p className="text-muted-foreground mb-8">
          String values get properly escaped with single quotes. Boolean true becomes TRUE, false becomes FALSE. Null values become NULL without quotes. Numbers are inserted as-is. The result is a series of INSERT statements ready to run.
        </p>

        <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
        <p className="text-muted-foreground mb-2">
          Your API exports data as JSON but you need to seed a database. Or you're migrating from a NoSQL system to a relational database. This tool also helps when creating test data scripts or importing configuration from JSON files.
        </p>
        <p className="text-muted-foreground mb-8">
          This generator creates basic INSERT statements. It doesn't handle upserts, batch inserts, or database-specific features like ON CONFLICT. For large datasets you may want to use COPY or LOAD DATA commands instead.
        </p>

        <h3 className="text-xl font-semibold mb-3">Questions</h3>
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-medium mb-1">Does this work with nested JSON?</p>
            <p className="text-muted-foreground">Nested objects get stringified as JSON. The nested structure becomes a JSON string in the database, assuming your column supports JSON type.</p>
          </div>
          <div>
            <p className="font-medium mb-1">How are special characters escaped?</p>
            <p className="text-muted-foreground">Single quotes in strings are doubled (escaped) following SQL standards. This prevents SQL injection and syntax errors.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I specify column types?</p>
            <p className="text-muted-foreground">No, column types are inferred from the data. You'll need to create your table schema separately before running the INSERT statements.</p>
          </div>
          <div>
            <p className="font-medium mb-1">What if my JSON has inconsistent keys?</p>
            <p className="text-muted-foreground">Only the keys from the first object are used. Objects missing those keys will have NULL values for missing columns.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Is this safe for production data?</p>
            <p className="text-muted-foreground">For production use, consider parameterized queries or prepared statements. This tool is best for seeding, migrations, and development work.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3">Related tools</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <a href="/json-tools/json-to-csv" className="text-primary hover:underline">JSON to CSV</a> – Convert JSON arrays to CSV format for spreadsheets
          </li>
          <li>
            <a href="/json-tools/json-to-excel" className="text-primary hover:underline">JSON to Excel</a> – Export JSON data to Excel spreadsheets
          </li>
          <li>
            <a href="/json-tools/csv-to-json" className="text-primary hover:underline">CSV to JSON</a> – Convert CSV files to JSON format
          </li>
        </ul>
      </div>
    </div>
  );
}
