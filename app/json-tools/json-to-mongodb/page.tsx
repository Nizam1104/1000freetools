"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";

export default function JsonToMongodbPage() {
  const [input, setInput] = useState("");
  const [collectionName, setCollectionName] = useState("documents");
  const [result, setResult] = useState<string | null>(null);

  const generateMongoDb = useCallback(() => {
    let data: any;
    try {
      data = JSON.parse(input);
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
      return;
    }

    const items = Array.isArray(data) ? data : [data];

    // Convert _id if present and generate MongoDB insert code
    let code = `// MongoDB Insert Commands\n`;
    code += `db.${collectionName}.insertMany([\n`;

    code += items.map((item: any, index: number) => {
      const doc = { ...item };
      // Add _id if not present
      if (!doc._id) {
        doc._id = `new ObjectId()`;
      }
      return `  ${JSON.stringify(doc, null, 4).split('\n').map((line, i) => i === 0 ? line : '  ' + line).join('\n')}`;
    }).join(',\n');

    code += `\n]);`;

    // Also generate Node.js driver code
    code += `\n\n// Node.js Driver\n`;
    code += `const { MongoClient } = require('mongodb');\n\n`;
    code += `async function insertDocuments() {\n`;
    code += `  const client = new MongoClient('mongodb://localhost:27017');\n`;
    code += `  try {\n`;
    code += `    await client.connect();\n`;
    code += `    const database = client.db('mydb');\n`;
    code += `    const collection = database.collection('${collectionName}');\n`;
    code += `    const result = await collection.insertMany(${JSON.stringify(items, null, 4)});\n`;
    code += `    console.log(\`\${result.insertedCount} documents inserted\`);\n`;
    code += `  } finally {\n`;
    code += `    await client.close();\n`;
    code += `  }\n`;
    code += `}`;

    setResult(code);
    toast.success(`Generated MongoDB insert code for ${items.length} document(s)`);
  }, [input, collectionName]);

  const clearAll = () => {
    setResult(null);
  };

  const loadSample = () => {
    setInput(JSON.stringify([
      { name: "John Doe", email: "john@example.com", age: 30, tags: ["developer", "admin"] },
      { name: "Jane Smith", email: "jane@example.com", age: 25, tags: ["user"] }
    ], null, 2));
    setCollectionName("users");
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("MongoDB code copied to clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON to MongoDB Document Converter Online</h1>
          <p className="text-muted-foreground">
            Convert JSON into MongoDB-compatible document format with proper types and structure. Our free tool helps developers prepare JSON data for insertion into MongoDB collections.
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
                <Label htmlFor="collectionName" className="text-sm whitespace-nowrap">Collection:</Label>
                <input
                  id="collectionName"
                  value={collectionName}
                  onChange={(e) => setCollectionName(e.target.value)}
                  placeholder="users"
                  className="h-9 px-3 text-sm border rounded-md bg-background"
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
                <Button onClick={generateMongoDb}>
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
              Input JSON
            </Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='[{"name": "John", "email": "john@example.com"}]'
              className="min-h-[200px] font-mono text-sm resize-none"
            />
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Generated MongoDB Code
              </Label>
              <Textarea
                value={result}
                readOnly
                className="min-h-[400px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
