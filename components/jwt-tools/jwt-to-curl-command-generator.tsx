"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Terminal } from "lucide-react";

export default function JWTToCurlCommandGenerator() {
  const [token, setToken] = useState("");
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("https://api.example.com/endpoint");
  const [contentType, setContentType] = useState("application/json");
  const [generatedCurl, setGeneratedCurl] = useState("");
  const [copied, setCopied] = useState(false);

  const generateCurl = useCallback(() => {
    const headerValue = `${method === "GET" ? "" : "Authorization: Bearer "}${token}`;
    
    let curl = `curl -X ${method} "${url}"`;
    
    if (token && method !== "GET") {
      curl += ` \\
  -H "Authorization: Bearer ${token}"`;
    } else if (token && method === "GET") {
      curl += ` \\
  -H "Authorization: Bearer ${token}"`;
    }

    if (contentType && method !== "GET") {
      curl += ` \\
  -H "Content-Type: ${contentType}"`;
    }

    if (method !== "GET") {
      curl += ` \\
  -d '{"key": "value"}'`;
    }

    setGeneratedCurl(curl);
  }, [token, method, url, contentType]);

  const generateNodeAxios = useCallback(() => {
    const config = {
      method,
      url,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(contentType && method !== "GET" && { "Content-Type": contentType }),
      },
    };

    if (method !== "GET") {
      (config as Record<string, unknown>).data = { key: "value" };
    }

    return `const axios = require('axios');

axios(${JSON.stringify(config, null, 2)})
  .then(response => console.log(response.data))
  .catch(error => console.error(error));`;
  }, [token, method, url, contentType]);

  const generatePythonRequests = useCallback(() => {
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    if (contentType && method !== "GET") headers["Content-Type"] = contentType;

    let code = `import requests

url = "${url}"
headers = ${JSON.stringify(headers, null, 2)}`;

    if (method === "GET") {
      code += `

response = requests.get(url, headers=headers)`;
    } else if (method === "POST") {
      code += `
data = {"key": "value"}

response = requests.post(url, json=data, headers=headers)`;
    } else {
      code += `

response = requests.${method.toLowerCase()}(url, headers=headers)`;
    }

    code += `

print(response.status_code)
print(response.json())`;

    return code;
  }, [token, method, url, contentType]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedCurl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [generatedCurl]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="w-5 h-5" />
            Request Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>HTTP Method</Label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="PATCH">PATCH</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
            <div>
              <Label>Content Type</Label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background"
              >
                <option value="application/json">application/json</option>
                <option value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</option>
                <option value="multipart/form-data">multipart/form-data</option>
                <option value="text/plain">text/plain</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="url">API Endpoint URL</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://api.example.com/endpoint"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="token">JWT Token</Label>
            <Textarea
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste your JWT token..."
              className="mt-1 h-20 font-mono text-xs"
            />
          </div>

          <Button onClick={generateCurl} className="w-full">
            Generate Commands
          </Button>
        </CardContent>
      </Card>

      {generatedCurl && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>cURL Command</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Textarea
                  value={generatedCurl}
                  readOnly
                  className="h-32 font-mono text-xs"
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={copyToClipboard}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Node.js (Axios)</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generateNodeAxios()}
                readOnly
                className="h-40 font-mono text-xs"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Python (requests)</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generatePythonRequests()}
                readOnly
                className="h-48 font-mono text-xs"
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full p-2 border rounded-md bg-background ${props.className}`} />;
}
