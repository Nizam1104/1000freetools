"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/utils/json-editor";
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
      <div className="container mx-auto px-2 md:px-4 py-2 md:py-8">
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
            <JsonEditor
              value={input}
              onChange={setInput}
              placeholder='[{"name": "John", "email": "john@example.com"}]'
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
              <JsonEditor
                value={result}
                readOnly
              />
            </CardContent>
          </Card>
        )}

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">About JSON to MongoDB Converter</h2>
          <p className="text-muted-foreground mb-6">
            Migrating JSON data into MongoDB requires proper insert statements and driver code. Writing boilerplate MongoDB insertion code for each collection gets repetitive. This JSON to MongoDB converter generates ready-to-use insert commands and Node.js driver code for quick data import.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Paste your JSON array or object into the Input area. Enter your Collection Name in the designated field. Click Generate and the tool produces MongoDB shell insertMany commands with ObjectId placeholders for each document.
          </p>
          <p className="text-muted-foreground mb-8">
            The output also includes complete Node.js driver code showing connection setup, database selection, and insertion logic. Copy the generated code and adapt the connection string for your MongoDB instance.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            Developers seeding MongoDB collections with initial data need quick insert statements. Teams migrating from JSON-based storage to MongoDB benefit from generated insertion scripts that handle document structure correctly.
          </p>
          <p className="text-muted-foreground mb-8">
            The generated code is a starting point. Production imports should include error handling, connection pooling, and bulk operation considerations. Always test with a small dataset before importing large volumes.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div><p className="font-medium mb-1">Does it add _id fields?</p><p className="text-muted-foreground">Yes. Documents without _id get new ObjectId() placeholders that MongoDB will replace on actual insertion.</p></div>
            <div><p className="font-medium mb-1">Can I use this with MongoDB Atlas?</p><p className="text-muted-foreground">Yes. Update the connection string in the Node.js code to your Atlas URI with proper authentication.</p></div>
            <div><p className="font-medium mb-1">What about nested documents?</p><p className="text-muted-foreground">Nested objects are preserved as-is in the generated insert statements, matching MongoDB document structure.</p></div>
            <div><p className="font-medium mb-1">Does it handle arrays?</p><p className="text-muted-foreground">Yes. Input arrays generate insertMany calls. Single objects are wrapped for insertion as a single-document array.</p></div>
            <div><p className="font-medium mb-1">Is the Node.js driver required?</p><p className="text-muted-foreground">The generated code uses the official mongodb npm package. Install it with npm install mongodb before running.</p></div>
          </div>

        </div>
      </div>
    </div>
  );
}
