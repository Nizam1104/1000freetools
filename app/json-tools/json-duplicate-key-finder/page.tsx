"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface DuplicateKey {
  key: string;
  path: string;
  count: number;
}

// Find duplicate keys in JSON text before parsing
function findDuplicateKeysInText(jsonText: string): DuplicateKey[] {
  const duplicates: DuplicateKey[] = [];

  // Track keys seen at each object level
  const keysAtLevel: Map<string, { count: number; firstPath: string }>[] = [];
  const pathStack: string[] = [];

  let i = 0;

  function skipWhitespace() {
    while (i < jsonText.length && /\s/.test(jsonText[i])) i++;
  }

  function parseValue(path: string) {
    skipWhitespace();
    const char = jsonText[i];

    if (char === '"') {
      // String value - skip it
      i++; // skip opening quote
      while (i < jsonText.length) {
        if (jsonText[i] === '\\' && i + 1 < jsonText.length) {
          i += 2; // skip escaped char
        } else if (jsonText[i] === '"') {
          i++; // skip closing quote
          break;
        } else {
          i++;
        }
      }
    } else if (char === '{') {
      parseObject(path);
    } else if (char === '[') {
      parseArray(path);
    } else if (char === 't' || char === 'f') {
      // true or false
      while (i < jsonText.length && /[a-z]/.test(jsonText[i])) i++;
    } else if (char === 'n') {
      // null
      while (i < jsonText.length && /[a-z]/.test(jsonText[i])) i++;
    } else if (char === '-' || /[0-9]/.test(char)) {
      // Number
      if (jsonText[i] === '-') i++;
      while (i < jsonText.length && /[0-9.]/.test(jsonText[i])) i++;
      if (jsonText[i] === 'e' || jsonText[i] === 'E') {
        i++;
        if (jsonText[i] === '+' || jsonText[i] === '-') i++;
        while (i < jsonText.length && /[0-9]/.test(jsonText[i])) i++;
      }
    }
  }

  function parseObject(path: string) {
    skipWhitespace();
    if (jsonText[i] !== '{') return;
    i++; // skip '{'

    const keysSeen = new Map<string, { count: number; firstPath: string }>();
    pathStack.push(path);
    keysAtLevel.push(keysSeen);

    skipWhitespace();

    while (i < jsonText.length && jsonText[i] !== '}') {
      skipWhitespace();

      if (jsonText[i] === ',') {
        i++;
        skipWhitespace();
      }

      if (jsonText[i] === '}') break;

      // Read key (must be a string)
      if (jsonText[i] !== '"') {
        i++;
        continue;
      }

      i++; // skip opening quote
      let key = "";
      while (i < jsonText.length && jsonText[i] !== '"') {
        if (jsonText[i] === '\\' && i + 1 < jsonText.length) {
          key += jsonText[i + 1];
          i += 2;
        } else {
          key += jsonText[i];
          i++;
        }
      }
      i++; // skip closing quote

      skipWhitespace();

      // Expect ':'
      if (jsonText[i] === ':') {
        i++;
      }

      // Track this key
      const existing = keysSeen.get(key);
      if (existing) {
        existing.count++;
      } else {
        keysSeen.set(key, { count: 1, firstPath: path });
      }

      skipWhitespace();

      // Parse the value
      parseValue(`${path}.${key}`);

      skipWhitespace();
    }

    i++; // skip '}'

    // Collect duplicates from this object
    const currentKeys = keysAtLevel.pop();
    pathStack.pop();

    if (currentKeys) {
      for (const [key, data] of currentKeys.entries()) {
        if (data.count > 1) {
          duplicates.push({
            key,
            path: data.firstPath,
            count: data.count,
          });
        }
      }
    }
  }

  function parseArray(path: string) {
    skipWhitespace();
    if (jsonText[i] !== '[') return;
    i++; // skip '['

    skipWhitespace();
    let index = 0;

    while (i < jsonText.length && jsonText[i] !== ']') {
      skipWhitespace();

      if (jsonText[i] === ',') {
        i++;
        skipWhitespace();
      }

      if (jsonText[i] === ']') break;

      parseValue(`${path}[${index}]`);
      index++;

      skipWhitespace();
    }

    i++; // skip ']'
  }

  // Start parsing from root
  skipWhitespace();
  if (jsonText[i] === '{') {
    parseObject("$");
  } else if (jsonText[i] === '[') {
    parseArray("$");
  }

  return duplicates;
}

export default function JsonDuplicateKeyFinderPage() {
  const [input, setInput] = useState("");
  const [duplicates, setDuplicates] = useState<DuplicateKey[] | null>(null);

  const findDuplicateKeys = useCallback(() => {
    setDuplicates(null);

    // First, find duplicates in the raw text (before JSON.parse removes them)
    const textDuplicates = findDuplicateKeysInText(input);

    // Validate JSON syntax
    try {
      JSON.parse(input);
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
      return;
    }

    setDuplicates(textDuplicates);

    if (textDuplicates.length > 0) {
      toast.warning(`Found ${textDuplicates.length} duplicate key(s)`);
    } else {
      toast.success("No duplicate keys found");
    }
  }, [input]);

  const clearAll = () => {
    setInput("");
    setDuplicates(null);
  };

  const loadSample = () => {
    const sample = `{
  "name": "Test",
  "name": "Duplicate",
  "items": [
    {"id": 1, "id": 2},
    {"name": "item"}
  ]
}`;
    setInput(sample);
  };

  const copyResult = () => {
    if (duplicates) {
      navigator.clipboard.writeText(JSON.stringify(duplicates, null, 2));
      toast.success("Duplicate keys copied to clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Duplicate Key Finder – Detect Duplicate Keys</h1>
          <p className="text-muted-foreground">
            Find and flag duplicate keys in JSON objects that could cause silent data loss. Our free JSON Duplicate Key Finder helps you write cleaner, safer, and more reliable JSON.
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
                {duplicates && (
                  <Button variant="outline" size="sm" onClick={copyResult}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                )}
                <Button onClick={findDuplicateKeys}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Find Duplicates
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
              placeholder='{"name": "Test", "name": "Duplicate"}'
              className="min-h-[300px] font-mono text-sm resize-none"
            />
          </CardContent>
        </Card>

        {/* Result */}
        {duplicates && (
          <Card>
            <CardContent className="p-4">
              {duplicates.length === 0 ? (
                <div className="flex items-center gap-4 p-4 bg-green-500/10 rounded-lg">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
                    <AlertTriangle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">
                      No Duplicate Keys
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      All keys in your JSON are unique.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <span className="font-semibold">Found {duplicates.length} duplicate key(s)</span>
                  </div>
                  {duplicates.map((dup, index) => (
                    <div key={index} className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold text-yellow-600 dark:text-yellow-400">
                          "{dup.key}"
                        </span>
                        <span className="text-sm text-muted-foreground">
                          appears {dup.count} time(s) at {dup.path}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
