"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileJson, RotateCcw, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";
import { NativeSelect as Select } from "@/components/ui/native-select";

export default function JsonAxiosCodeGeneratorPage() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("https://api.example.com/data");
  const [headers, setHeaders] = useState("");
  const [body, setBody] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const generateAxiosCode = useCallback(() => {
    const headersObj = headers.trim() ? JSON.parse(headers) : {};
    const config: any = {
      method: method.toLowerCase(),
      url,
    };

    if (Object.keys(headersObj).length > 0) {
      config.headers = headersObj;
    }

    if (method !== "GET" && method !== "HEAD" && body.trim()) {
      config.data = JSON.parse(body);
    }

    let code = `import axios from 'axios';\n\n`;
    code += `axios({\n`;
    code += `  method: '${config.method}',\n`;
    code += `  url: '${config.url}',\n`;
    
    if (config.headers) {
      code += `  headers: {\n`;
      code += Object.entries(config.headers)
        .map(([key, value]) => `    '${key}': '${value}'`)
        .join(",\n");
      code += `\n  },\n`;
    }
    
    if (config.data) {
      code += `  data: ${JSON.stringify(config.data, null, 4).split('\n').map((line, i) => i === 0 ? line : '    ' + line).join('\n')},\n`;
    }
    
    code += `})\n`;
    code += `.then(response => {\n`;
    code += `  console.log(response.data);\n`;
    code += `})\n`;
    code += `.catch(error => {\n`;
    code += `  console.error('Error:', error.response?.data || error.message);\n`;
    code += `});`;

    setResult(code);
    toast.success("Axios code generated");
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON to Axios Code Generator Online</h1>
          <p className="text-muted-foreground">
            Generate Axios request code from JSON input with proper headers, methods, and body. Our free JSON to Axios generator helps developers scaffold HTTP calls in seconds.
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
                  <Button variant="outline" size="sm" onClick={copyResult}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                )}
                <Button onClick={generateAxiosCode}>
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
              <Textarea
                id="headers"
                value={headers}
                onChange={(e) => setHeaders(e.target.value)}
                placeholder='{"Authorization": "Bearer token"}'
                className="min-h-[100px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>

          {method !== "GET" && method !== "HEAD" && (
            <Card>
              <CardContent className="p-4">
                <Label htmlFor="body" className="text-sm font-medium text-muted-foreground mb-2 block">
                  Request Body (JSON)
                </Label>
                <Textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder='{"key": "value"}'
                  className="min-h-[100px] font-mono text-sm resize-none"
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
                Generated Axios Code
              </Label>
              <Textarea
                value={result}
                readOnly
                className="min-h-[300px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
