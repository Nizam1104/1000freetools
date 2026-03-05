"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/ui/json-editor";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  FileJson,
  RotateCcw,
  Trash2,
  Copy,
  Download,
  Plus,
  X,
} from "lucide-react";
import { toast } from "sonner";

export default function JsonRemoveKeysPage() {
  const [input, setInput] = useState("");
  const [keysToRemove, setKeysToRemove] = useState<string[]>([""]);
  const [recursive, setRecursive] = useState(true);
  const [result, setResult] = useState<string | null>(null);

  const removeKeys = useCallback(
    (obj: any, keys: Set<string>, isRecursive: boolean): any => {
      if (obj === null || typeof obj !== "object") return obj;

      if (Array.isArray(obj)) {
        return obj.map((item) => removeKeys(item, keys, isRecursive));
      }

      const result: any = {};
      for (const [key, value] of Object.entries(obj)) {
        if (!keys.has(key)) {
          result[key] = isRecursive
            ? removeKeys(value, keys, isRecursive)
            : value;
        }
      }
      return result;
    },
    [],
  );

  const removeJsonKeys = useCallback(() => {
    setResult(null);

    let obj: any;
    try {
      obj = JSON.parse(input);
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
      return;
    }

    const keysSet = new Set(keysToRemove.filter((k) => k.trim()));
    const removed = removeKeys(obj, keysSet, recursive);

    setResult(JSON.stringify(removed, null, 2));
    toast.success(`Removed ${keysSet.size} key type(s)`);
  }, [input, keysToRemove, recursive, removeKeys]);

  const addKey = () => {
    setKeysToRemove([...keysToRemove, ""]);
  };

  const removeKey = (index: number) => {
    setKeysToRemove(keysToRemove.filter((_, i) => i !== index));
  };

  const updateKey = (index: number, value: string) => {
    const updated = [...keysToRemove];
    updated[index] = value;
    setKeysToRemove(updated);
  };

  const clearAll = () => {
    setInput("");
    setKeysToRemove([""]);
    setResult(null);
  };

  const loadSample = () => {
    setInput(
      JSON.stringify(
        {
          id: 1,
          name: "John",
          password: "secret123",
          email: "john@example.com",
          token: "abc123",
          profile: {
            age: 30,
            secret: "hidden",
          },
        },
        null,
        2,
      ),
    );
    setKeysToRemove(["password", "token", "secret"]);
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("Cleaned JSON copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (result) {
      const blob = new Blob([result], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cleaned.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Cleaned JSON downloaded");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON Remove Keys – Delete JSON Properties Online
          </h1>
          <p className="text-muted-foreground">
            Remove specified keys from JSON objects recursively with a single
            click. Our free JSON Remove Keys Tool is perfect for sanitizing API
            responses and stripping sensitive fields.
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
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="recursive"
                    checked={recursive}
                    onChange={(e) => setRecursive(e.target.checked)}
                    className="rounded border-input"
                  />
                  <Label htmlFor="recursive" className="text-sm cursor-pointer">
                    Recursive
                  </Label>
                </div>
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadResult}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </>
                )}
                <Button onClick={removeJsonKeys}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input and Result */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Input */}
          <Card>
            <CardContent className="p-4">
              <Label
                htmlFor="input"
                className="text-sm font-medium text-muted-foreground mb-2 block"
              >
                Input JSON
              </Label>
              <JsonEditor
                value={input}
                onChange={setInput}
                placeholder='{"name": "John", "password": "secret"}'
              />
            </CardContent>
          </Card>

          {/* Keys to Remove */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-sm font-medium text-muted-foreground">
                  Keys to Remove
                </Label>
                <Button variant="outline" size="sm" onClick={addKey}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Key
                </Button>
              </div>
              <div className="space-y-3">
                {keysToRemove.map((key, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={key}
                      onChange={(e) => updateKey(index, e.target.value)}
                      placeholder="Key name (e.g., password)"
                      className="font-mono text-sm h-9"
                      onKeyDown={(e) => e.key === "Enter" && addKey()}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeKey(index)}
                      disabled={keysToRemove.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Result */}
        {result && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Cleaned Result
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
          <h2 className="text-2xl font-semibold mb-4">
            About JSON Remove Keys
          </h2>
          <p className="text-muted-foreground mb-6">
            You have a JSON response with fields you don't need. Maybe it's API
            data with internal IDs, debug info, or sensitive fields you want to
            strip before logging. Pasting into a text editor and manually
            deleting properties gets messy fast, especially with nested
            structures. This tool removes specified keys from your JSON while
            keeping everything else intact.
          </p>

          <h3 className="text-xl font-semibold mb-3">How to use this tool</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-8">
            <li>Paste your JSON object into the input field</li>
            <li>Add the key names you want to remove (one per line)</li>
            <li>Toggle recursive mode if you need to delete nested keys</li>
            <li>Click Remove and get clean JSON output</li>
          </ol>

          <h3 className="text-xl font-semibold mb-3">What makes this useful</h3>
          <p className="text-muted-foreground mb-2">
            The recursive option deletes matching keys at any depth. Turn it on
            and the tool searches through all nested levels, removing every
            instance of keys like "password" or "token" wherever they hide.
          </p>
          <p className="text-muted-foreground mb-2">
            Multiple key removal means you don't repeat the process. Add all the
            keys you want gone and hit remove once.
          </p>
          <p className="text-muted-foreground mb-8">
            Your original JSON stays in the input field. If you need to start
            over or try different keys, just clear the key list and run again.
          </p>

          <h3 className="text-xl font-semibold mb-3">Common questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">
                Can this remove keys from nested objects?
              </p>
              <p className="text-muted-foreground">
                Yes, enable the recursive checkbox and the tool finds matching
                keys at any nesting level. You don't need to specify full paths.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                What if I enter a key that doesn't exist?
              </p>
              <p className="text-muted-foreground">
                Nothing breaks. The tool skips non-existent keys and removes
                only what's found. No errors for missing keys.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Does this work on arrays of objects?
              </p>
              <p className="text-muted-foreground">
                Yes. If your JSON contains an array of objects, recursive mode
                iterates through each object and removes matching keys from all
                of them.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Can I remove array items by index?
              </p>
              <p className="text-muted-foreground">
                This tool removes object properties by key name, not array
                elements. For filtering array items, try the JSON Filter tool
                instead.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Is there a size limit?</p>
              <p className="text-muted-foreground">
                The tool runs in your browser with no server limits. Very large
                files may slow down depending on your available memory.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a
                href="/json-tools/json-filter"
                className="text-primary hover:underline"
              >
                JSON Filter
              </a>{" "}
              – Filter JSON arrays by field conditions
            </li>
            <li>
              <a
                href="/json-tools/json-obfuscator"
                className="text-primary hover:underline"
              >
                JSON Obfuscator
              </a>{" "}
              – Replace sensitive values with random data
            </li>
            <li>
              <a
                href="/json-tools/json-key-extractor"
                className="text-primary hover:underline"
              >
                JSON Key Extractor
              </a>{" "}
              – List all property names from a JSON object
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
