"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileJson, RotateCcw, Trash2, Copy, Download, Plus, X } from "lucide-react";
import { toast } from "sonner";

export default function JsonRemoveKeysPage() {
  const [input, setInput] = useState("");
  const [keysToRemove, setKeysToRemove] = useState<string[]>([""]);
  const [recursive, setRecursive] = useState(true);
  const [result, setResult] = useState<string | null>(null);

  const removeKeys = useCallback((obj: any, keys: Set<string>, isRecursive: boolean): any => {
    if (obj === null || typeof obj !== "object") return obj;

    if (Array.isArray(obj)) {
      return obj.map(item => removeKeys(item, keys, isRecursive));
    }

    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (!keys.has(key)) {
        result[key] = isRecursive ? removeKeys(value, keys, isRecursive) : value;
      }
    }
    return result;
  }, []);

  const removeJsonKeys = useCallback(() => {
    setResult(null);

    let obj: any;
    try {
      obj = JSON.parse(input);
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
      return;
    }

    const keysSet = new Set(keysToRemove.filter(k => k.trim()));
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
    setInput(JSON.stringify({
      id: 1,
      name: "John",
      password: "secret123",
      email: "john@example.com",
      token: "abc123",
      profile: {
        age: 30,
        secret: "hidden"
      }
    }, null, 2));
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
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Remove Keys Tool – Delete JSON Keys Online</h1>
          <p className="text-muted-foreground">
            Remove specified keys from JSON objects recursively with a single click. Our free JSON Remove Keys Tool is perfect for sanitizing API responses and stripping sensitive fields.
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
                  <Label htmlFor="recursive" className="text-sm cursor-pointer">Recursive</Label>
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
                    <Button variant="outline" size="sm" onClick={downloadResult}>
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
              placeholder='{"name": "John", "password": "secret"}'
              className="min-h-[150px] font-mono text-sm resize-none"
            />
          </CardContent>
        </Card>

        {/* Keys to Remove */}
        <Card className="mb-6">
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

        {/* Result */}
        {result && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Cleaned Result
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
