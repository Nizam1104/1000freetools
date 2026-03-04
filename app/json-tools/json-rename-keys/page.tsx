"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileJson, RotateCcw, Trash2, Copy, Download, Plus, X } from "lucide-react";
import { toast } from "sonner";

interface RenameRule {
  id: string;
  oldKey: string;
  newKey: string;
}

export default function JsonRenameKeysPage() {
  const [input, setInput] = useState("");
  const [rules, setRules] = useState<RenameRule[]>([
    { id: "1", oldKey: "", newKey: "" }
  ]);
  const [recursive, setRecursive] = useState(true);
  const [result, setResult] = useState<string | null>(null);

  const renameKeys = useCallback((obj: any, rulesMap: Map<string, string>, isRecursive: boolean): any => {
    if (obj === null || typeof obj !== "object") return obj;

    if (Array.isArray(obj)) {
      return obj.map(item => renameKeys(item, rulesMap, isRecursive));
    }

    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      const newKey = rulesMap.get(key) || key;
      result[newKey] = isRecursive ? renameKeys(value, rulesMap, isRecursive) : value;
    }
    return result;
  }, []);

  const renameJsonKeys = useCallback(() => {
    setResult(null);

    let obj: any;
    try {
      obj = JSON.parse(input);
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
      return;
    }

    const rulesMap = new Map(rules.filter(r => r.oldKey.trim()).map(r => [r.oldKey, r.newKey]));
    const renamed = renameKeys(obj, rulesMap, recursive);

    setResult(JSON.stringify(renamed, null, 2));
    toast.success(`Renamed ${rulesMap.size} key(s)`);
  }, [input, rules, recursive, renameKeys]);

  const addRule = () => {
    setRules([...rules, { id: Date.now().toString(), oldKey: "", newKey: "" }]);
  };

  const removeRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  const updateRule = (id: string, field: keyof RenameRule, value: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const clearAll = () => {
    setInput("");
    setRules([{ id: "1", oldKey: "", newKey: "" }]);
    setResult(null);
  };

  const loadSample = () => {
    setInput(JSON.stringify({
      user_name: "John",
      user_email: "john@example.com",
      profile: {
        first_name: "John",
        last_name: "Doe"
      }
    }, null, 2));
    setRules([
      { id: "1", oldKey: "user_name", newKey: "username" },
      { id: "2", oldKey: "user_email", newKey: "email" },
      { id: "3", oldKey: "first_name", newKey: "firstName" },
      { id: "4", oldKey: "last_name", newKey: "lastName" }
    ]);
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("Renamed JSON copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (result) {
      const blob = new Blob([result], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "renamed.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Renamed JSON downloaded");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Rename Keys Tool – Rename JSON Keys Online</h1>
          <p className="text-muted-foreground">
            Rename selected keys across nested JSON structures in bulk. Our free JSON Rename Keys Tool makes API response normalization and data migration fast and error-free.
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
                <Button onClick={renameJsonKeys}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Rename
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
              placeholder='{"user_name": "John", "profile": {"first_name": "John"}}'
              className="min-h-[150px] font-mono text-sm resize-none"
            />
          </CardContent>
        </Card>

        {/* Rules */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-sm font-medium text-muted-foreground">
                Rename Rules
              </Label>
              <Button variant="outline" size="sm" onClick={addRule}>
                <Plus className="h-4 w-4 mr-2" />
                Add Rule
              </Button>
            </div>
            <div className="space-y-3">
              {rules.map((rule, index) => (
                <div key={rule.id} className="flex items-center gap-2 p-3 bg-muted rounded-md">
                  <span className="text-sm text-muted-foreground w-6">{index + 1}.</span>
                  <Input
                    value={rule.oldKey}
                    onChange={(e) => updateRule(rule.id, "oldKey", e.target.value)}
                    placeholder="Old key name"
                    className="flex-1 font-mono text-sm h-9"
                  />
                  <span className="text-muted-foreground">→</span>
                  <Input
                    value={rule.newKey}
                    onChange={(e) => updateRule(rule.id, "newKey", e.target.value)}
                    placeholder="New key name"
                    className="flex-1 font-mono text-sm h-9"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRule(rule.id)}
                    disabled={rules.length === 1}
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
                Renamed Result
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
