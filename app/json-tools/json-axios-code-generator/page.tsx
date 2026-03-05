"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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
      code += `  data: ${JSON.stringify(config.data, null, 4)
        .split("\n")
        .map((line, i) => (i === 0 ? line : "    " + line))
        .join("\n")},\n`;
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
    setHeaders(JSON.stringify({ Authorization: "Bearer token123" }, null, 2));
    setBody(
      JSON.stringify({ name: "John", email: "john@example.com" }, null, 2),
    );
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
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON to Axios Code Generator Online
          </h1>
          <p className="text-muted-foreground">
            Generate Axios request code from JSON input with proper headers,
            methods, and body. Our free JSON to Axios generator helps developers
            scaffold HTTP calls in seconds.
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
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="grid gap-4">
                <div>
                  <Label
                    htmlFor="method"
                    className="text-sm font-medium text-muted-foreground mb-2 block"
                  >
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
                  <Label
                    htmlFor="url"
                    className="text-sm font-medium text-muted-foreground mb-2 block"
                  >
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
              <Label
                htmlFor="headers"
                className="text-sm font-medium text-muted-foreground mb-2 block"
              >
                Headers (JSON)
              </Label>
              <Textarea
                id="headers"
                value={headers}
                onChange={(e) => setHeaders(e.target.value)}
                placeholder='{"Authorization": "Bearer token"}'
                className="min-h-[150px] font-mono text-sm resize-none max-h-[500px] overflow-y-auto"
              />
            </CardContent>
          </Card>
        </div>

        {method !== "GET" && method !== "HEAD" && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <Label
                htmlFor="body"
                className="text-sm font-medium text-muted-foreground mb-2 block"
              >
                Request Body (JSON)
              </Label>
              <Textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder='{"key": "value"}'
                className="min-h-[150px] font-mono text-sm resize-none max-h-[500px] overflow-y-auto"
              />
            </CardContent>
          </Card>
        )}

        {/* Result */}
        {result && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Generated Axios Code
              </Label>
              <Textarea
                value={result}
                readOnly
                className="min-h-[300px] font-mono text-sm resize-none max-h-[500px] overflow-y-auto"
              />
            </CardContent>
          </Card>
        )}

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            About JSON to Axios Code Generator
          </h2>
          <p className="text-muted-foreground mb-6">
            Writing Axios requests means remembering the right syntax for
            headers, request bodies, and error handling. This tool generates
            complete Axios code from your configuration, saving you from looking
            up documentation or copying from old projects.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Select your HTTP method from the dropdown, enter the URL, and
            optionally add headers and request body as JSON. Click Generate and
            the tool creates properly formatted Axios code with all your
            settings included.
          </p>
          <p className="text-muted-foreground mb-8">
            The generated code includes the axios import, configuration object
            with method and URL, headers if provided, request body for
            POST/PUT/PATCH requests, and then/catch blocks for handling
            responses and errors.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            You're starting a new React or Node project and need to make API
            calls. Generate the Axios code here and paste it into your service
            layer instead of typing it from memory.
          </p>
          <p className="text-muted-foreground mb-8">
            This generates basic Axios code without interceptors, request
            cancellation, or advanced configuration. For production apps,
            consider setting up an Axios instance with defaults and
            interceptors.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">
                Which HTTP methods are supported?
              </p>
              <p className="text-muted-foreground">
                GET, POST, PUT, PATCH, and DELETE are all supported. The
                generator adjusts the code based on whether the method typically
                includes a body.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                How do I add authentication headers?
              </p>
              <p className="text-muted-foreground">
                Enter headers as JSON like{" "}
                {'{ "Authorization": "Bearer token123" }'}. The generator
                includes them in the Axios config.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Does it handle request bodies?</p>
              <p className="text-muted-foreground">
                Yes, for POST, PUT, and PATCH methods you can enter a JSON body.
                It's included in the data property of the Axios config.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                What error handling is included?
              </p>
              <p className="text-muted-foreground">
                The generated code has a catch block that logs
                error.response.data if available, otherwise the error message.
                You can customize this after copying.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Can I use this with TypeScript?
              </p>
              <p className="text-muted-foreground">
                The generated code is plain JavaScript. For TypeScript, you'll
                need to add type annotations to the response data and error
                handling.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a
                href="/json-tools/json-fetch-code-generator"
                className="text-primary hover:underline"
              >
                JSON Fetch Code Generator
              </a>{" "}
              – Generate Fetch API code
            </li>
            <li>
              <a
                href="/json-tools/json-api-formatter"
                className="text-primary hover:underline"
              >
                JSON API Formatter
              </a>{" "}
              – Standardize API responses
            </li>
            <li>
              <a
                href="/json-tools/json-validator"
                className="text-primary hover:underline"
              >
                JSON Validator
              </a>{" "}
              – Validate request/response JSON
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
