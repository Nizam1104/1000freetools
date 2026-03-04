"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileJson, RotateCcw, Trash2, Copy, Download } from "lucide-react";
import { toast } from "sonner";

export default function JsonpathQueryPage() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);

  const evaluateJsonPath = useCallback((json: any, path: string): any[] => {
    const results: any[] = [];
    
    if (!path || path === "$") {
      results.push(json);
      return results;
    }

    const parts = path.replace(/^\$/, "").split(/\.|\[|\]/).filter(p => p !== "");
    
    function traverse(obj: any, remainingParts: string[]) {
      if (remainingParts.length === 0) {
        results.push(obj);
        return;
      }

      const [current, ...rest] = remainingParts;
      
      if (current === "*") {
        if (Array.isArray(obj)) {
          obj.forEach(item => traverse(item, rest));
        } else if (obj && typeof obj === "object") {
          Object.values(obj).forEach(value => traverse(value, rest));
        }
      } else if (current === "..") {
        function deepSearch(o: any) {
          if (rest.length === 0) {
            results.push(o);
          }
          if (Array.isArray(o)) {
            o.forEach(item => {
              traverse(item, rest);
              deepSearch(item);
            });
          } else if (o && typeof o === "object") {
            Object.values(o).forEach(value => {
              traverse(value, rest);
              deepSearch(value);
            });
          }
        }
        deepSearch(obj);
      } else if (Array.isArray(obj)) {
        const index = parseInt(current, 10);
        if (!isNaN(index) && index >= 0 && index < obj.length) {
          traverse(obj[index], rest);
        } else if (current.match(/^\[\d+,\d+\]$/)) {
          const indices = current.slice(1, -1).split(",").map(Number);
          indices.forEach(i => {
            if (i >= 0 && i < obj.length) {
              traverse(obj[i], rest);
            }
          });
        }
      } else if (obj && typeof obj === "object" && current in obj) {
        traverse(obj[current], rest);
      }
    }

    traverse(json, parts);
    return results;
  }, []);

  const executeQuery = useCallback(() => {
    setResult(null);

    let obj: any;
    try {
      obj = JSON.parse(input);
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
      return;
    }

    if (!query.trim()) {
      toast.error("Please enter a JSONPath query");
      return;
    }

    try {
      const results = evaluateJsonPath(obj, query);
      setResult(results);
      toast.success(`Found ${results.length} result(s)`);
    } catch (e) {
      toast.error(`Query error: ${(e as Error).message}`);
    }
  }, [input, query, evaluateJsonPath]);

  const clearAll = () => {
    setInput("");
    setQuery("");
    setResult(null);
  };

  const loadSample = () => {
    setInput(JSON.stringify({
      store: {
        books: [
          { title: "Book 1", author: "Author A", price: 10 },
          { title: "Book 2", author: "Author B", price: 20 }
        ],
        name: "My Store"
      }
    }, null, 2));
    setQuery("$.store.books[*].title");
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      toast.success("Query result copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (result) {
      const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "jsonpath-result.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Query result downloaded");
    }
  };

  const quickQueries = [
    { label: "Root", query: "$" },
    { label: "All children", query: "$.*" },
    { label: "Array item", query: "$[0]" },
    { label: "Nested", query: "$.store.books" },
    { label: "All array", query: "$.store.books[*]" },
    { label: "Property", query: "$.store.books[*].title" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSONPath Query Tool – Run JSONPath Online</h1>
          <p className="text-muted-foreground">
            Execute JSONPath expressions against JSON data and view matching results instantly. Our free JSONPath Query Tool is perfect for testing queries before integrating them in code.
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
                <Button onClick={executeQuery}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Query
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Queries */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <Label className="text-sm font-medium text-muted-foreground mb-2 block">
              Quick Queries
            </Label>
            <div className="flex flex-wrap gap-2">
              {quickQueries.map(q => (
                <Button
                  key={q.query}
                  variant="outline"
                  size="sm"
                  onClick={() => setQuery(q.query)}
                >
                  {q.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Input Section */}
        <div className="grid gap-6 mb-6">
          <Card>
            <CardContent className="p-4">
              <Label htmlFor="input" className="text-sm font-medium text-muted-foreground mb-2 block">
                Input JSON
              </Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"store": {"books": [...]}}'
                className="min-h-[200px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Label htmlFor="query" className="text-sm font-medium text-muted-foreground mb-2 block">
                JSONPath Query
              </Label>
              <div className="flex gap-2">
                <Input
                  id="query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="$.store.books[*].title"
                  className="font-mono text-sm flex-1"
                  onKeyDown={(e) => e.key === "Enter" && executeQuery()}
                />
                <Button onClick={executeQuery}>Run</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Result */}
        {result && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Query Result ({result.length} item(s))
              </Label>
              <Textarea
                value={JSON.stringify(result, null, 2)}
                readOnly
                className="min-h-[200px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>
        )}

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">About JSONPath Query Tool</h2>
          <p className="text-muted-foreground mb-6">
            Extracting specific data from large JSON documents manually is tedious. JSONPath provides a concise syntax for navigating JSON structures, similar to XPath for XML. This tool lets you test queries instantly.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Enter your JSON and a JSONPath expression starting with $ for root. Use dot notation for properties, brackets for array indices, and [*] for all array elements.
          </p>
          <p className="text-muted-foreground mb-8">
            The tool evaluates your expression and returns all matching values. Results are shown as an array, even for single matches, making it easy to see what your query selects.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            You're working with a large API response and need to extract just the user emails from nested data. A JSONPath like $.data.users[*].email gets exactly what you need.
          </p>
          <p className="text-muted-foreground mb-8">
            This implements basic JSONPath features. Advanced features like filter expressions [?(@.age&gt;18)] or recursive descent may not work. Use a full JSONPath library for complex queries.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">What does $ mean in JSONPath?</p>
              <p className="text-muted-foreground">$ represents the root of your JSON document. All paths start from here, like $.users for the users property at root level.</p>
            </div>
            <div>
              <p className="font-medium mb-1">How do I access array elements?</p>
              <p className="text-muted-foreground">Use brackets with the index: $[0] for first element. Use [*] to select all elements: $.items[*] gets all array items.</p>
            </div>
            <div>
              <p className="font-medium mb-1">Can I query nested properties?</p>
              <p className="text-muted-foreground">Yes, chain property names with dots: $.user.address.city navigates through nested objects to get the city value.</p>
            </div>
            <div>
              <p className="font-medium mb-1">What do the Quick Query buttons do?</p>
              <p className="text-muted-foreground">They insert common JSONPath patterns to help you learn. Click one to see the expression, then modify it for your needs.</p>
            </div>
            <div>
              <p className="font-medium mb-1">Can I download query results?</p>
              <p className="text-muted-foreground">Yes. Use Download to save results as JSON or Copy to paste into your code. Results are always valid JSON arrays.</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a href="/json-tools/jmespath-query" className="text-primary hover:underline">JMESPath Query</a> – Advanced JSON querying
            </li>
            <li>
              <a href="/json-tools/json-filter" className="text-primary hover:underline">JSON Filter</a> – Filter arrays by conditions
            </li>
            <li>
              <a href="/json-tools/json-extract-subjson" className="text-primary hover:underline">JSON Extract Sub-JSON</a> – Extract by path
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
