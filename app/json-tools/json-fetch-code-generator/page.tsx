"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/utils/json-editor";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileJson, RotateCcw, Trash2, Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { NativeSelect as Select } from "@/components/ui/native-select";

export default function JsonFetchCodeGeneratorPage() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("https://api.example.com/data");
  const [headers, setHeaders] = useState("");
  const [body, setBody] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const generateFetchCode = useCallback(() => {
    let code = `fetch("${url}", {\n`;
    code += `  method: "${method}",\n`;

    const headersObj = headers.trim() ? JSON.parse(headers) : {};
    if (method !== "GET" && method !== "HEAD" && body.trim()) {
      headersObj["Content-Type"] = "application/json";
    }

    if (Object.keys(headersObj).length > 0) {
      code += `  headers: {\n`;
      code += Object.entries(headersObj)
        .map(([key, value]) => `    "${key}": "${value}"`)
        .join(",\n");
      code += `\n  },\n`;
    }

    if (method !== "GET" && method !== "HEAD" && body.trim()) {
      code += `  body: ${JSON.stringify(JSON.parse(body))},\n`;
    }

    code += `})\n`;
    code += `.then(response => {\n`;
    code += `  if (!response.ok) {\n`;
    code += `    throw new Error(\`HTTP error! status: \${response.status}\`);\n`;
    code += `  }\n`;
    code += `  return response.json();\n`;
    code += `})\n`;
    code += `.then(data => {\n`;
    code += `  console.log(data);\n`;
    code += `})\n`;
    code += `.catch(error => {\n`;
    code += `  console.error('Error:', error);\n`;
    code += `});`;

    setResult(code);
    toast.success("Fetch code generated");
  }, [method, url, headers, body]);

  const clearAll = () => {
    setResult(null);
  };

  const loadSample = () => {
    setUrl("https://api.example.com/users");
    setMethod("POST");
    setHeaders(JSON.stringify({ "Authorization": "Bearer token123" }, null, 2));
    setBody(JSON.stringify({ name: "John", email: "john@example.com" }, null, 2));
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("Code copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (result) {
      const blob = new Blob([result], { type: "text/javascript;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "fetch-code.js";
      link.click();
      URL.revokeObjectURL(url);
      toast.success("Code downloaded!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON to Fetch Code Generator – Generate JS Fetch</h1>
          <p className="text-muted-foreground">
            Generate JavaScript Fetch API code snippets from JSON request definitions. Our free tool saves development time by auto-generating ready-to-use HTTP request code.
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

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                {result && (
                  <>
                    <Button variant="outline" size="sm" onClick={copyResult}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadResult}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </>
                )}
                <Button onClick={generateFetchCode}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Request Configuration */}
        <div className="grid gap-6 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="method" className="text-sm font-medium text-muted-foreground mb-2 block">
                    HTTP Method
                  </Label>
                  <Select
                    id="method"
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full h-10"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="PATCH">PATCH</option>
                    <option value="DELETE">DELETE</option>
                    <option value="HEAD">HEAD</option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="url" className="text-sm font-medium text-muted-foreground mb-2 block">
                    URL
                  </Label>
                  <Input
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://api.example.com/data"
                    className="h-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Label htmlFor="headers" className="text-sm font-medium text-muted-foreground mb-2 block">
                Headers (JSON)
              </Label>
              <JsonEditor
                id="headers"
                value={headers}
                onChange={setHeaders}
                placeholder='{"Authorization": "Bearer token"}'
              />
            </CardContent>
          </Card>

          {method !== "GET" && method !== "HEAD" && (
            <Card>
              <CardContent className="p-4">
                <Label htmlFor="body" className="text-sm font-medium text-muted-foreground mb-2 block">
                  Request Body (JSON)
                </Label>
                <JsonEditor
                  id="body"
                  value={body}
                  onChange={setBody}
                  placeholder='{"key": "value"}'
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Result */}
        {result && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Generated Fetch Code
              </Label>
              <JsonEditor
                value={result}
                readOnly
                placeholder="Generated code will appear here..."
              />
            </CardContent>
          </Card>
        )}
      </div>

      {/* SEO Content */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">About JSON Fetch Code Generator</h2>
        <p className="text-muted-foreground mb-6">
          Writing fetch requests with proper error handling is repetitive. This tool generates ready-to-use Fetch API code from your request configuration, including headers, body, and error handling boilerplate.
        </p>

        <h3 className="text-xl font-semibold mb-3">How it works</h3>
        <p className="text-muted-foreground mb-2">
          Select your HTTP method, enter the URL, and optionally add headers and request body as JSON. The generator creates complete fetch code with response validation and error handling.
        </p>
        <p className="text-muted-foreground mb-8">
          The generated code includes proper Content-Type headers for POST/PUT requests and handles non-OK responses by throwing descriptive errors for easier debugging.
        </p>

        <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
        <p className="text-muted-foreground mb-2">
          You need to quickly scaffold API calls in a new project. Generate the fetch code here and paste it into your service layer instead of typing it from scratch.
        </p>
        <p className="text-muted-foreground mb-8">
          This generates basic fetch code without advanced features like timeouts, retries, or request cancellation. For production use, consider wrapping fetch in a more robust HTTP client.
        </p>

        <h3 className="text-xl font-semibold mb-3">Questions</h3>
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-medium mb-1">Which HTTP methods are supported?</p>
            <p className="text-muted-foreground">GET, POST, PUT, PATCH, DELETE, and HEAD are all supported. The generator adjusts the code based on method requirements.</p>
          </div>
          <div>
            <p className="font-medium mb-1">How are headers handled?</p>
            <p className="text-muted-foreground">Enter headers as JSON. Content-Type is automatically added for POST/PUT requests with a body. Authorization headers are commonly included here.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Does it handle authentication?</p>
            <p className="text-muted-foreground">Add your auth token in the headers section as {"{ \"Authorization\": \"Bearer token\" }"}. The generator includes it in the fetch request.</p>
          </div>
          <div>
            <p className="font-medium mb-1">What error handling is included?</p>
            <p className="text-muted-foreground">The code checks response.ok and throws an error with the HTTP status for failed requests. The catch block logs the error for debugging.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I use this with async/await?</p>
            <p className="text-muted-foreground">The generated code uses .then() chains. You can easily convert it to async/await syntax or request that format in a future update.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
