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
        if (jsonText[i] === "\\" && i + 1 < jsonText.length) {
          i += 2; // skip escaped char
        } else if (jsonText[i] === '"') {
          i++; // skip closing quote
          break;
        } else {
          i++;
        }
      }
    } else if (char === "{") {
      parseObject(path);
    } else if (char === "[") {
      parseArray(path);
    } else if (char === "t" || char === "f") {
      // true or false
      while (i < jsonText.length && /[a-z]/.test(jsonText[i])) i++;
    } else if (char === "n") {
      // null
      while (i < jsonText.length && /[a-z]/.test(jsonText[i])) i++;
    } else if (char === "-" || /[0-9]/.test(char)) {
      // Number
      if (jsonText[i] === "-") i++;
      while (i < jsonText.length && /[0-9.]/.test(jsonText[i])) i++;
      if (jsonText[i] === "e" || jsonText[i] === "E") {
        i++;
        if (jsonText[i] === "+" || jsonText[i] === "-") i++;
        while (i < jsonText.length && /[0-9]/.test(jsonText[i])) i++;
      }
    }
  }

  function parseObject(path: string) {
    skipWhitespace();
    if (jsonText[i] !== "{") return;
    i++; // skip '{'

    const keysSeen = new Map<string, { count: number; firstPath: string }>();
    pathStack.push(path);
    keysAtLevel.push(keysSeen);

    skipWhitespace();

    while (i < jsonText.length && jsonText[i] !== "}") {
      skipWhitespace();

      if (jsonText[i] === ",") {
        i++;
        skipWhitespace();
      }

      if (jsonText[i] === "}") break;

      // Read key (must be a string)
      if (jsonText[i] !== '"') {
        i++;
        continue;
      }

      i++; // skip opening quote
      let key = "";
      while (i < jsonText.length && jsonText[i] !== '"') {
        if (jsonText[i] === "\\" && i + 1 < jsonText.length) {
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
      if (jsonText[i] === ":") {
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
    if (jsonText[i] !== "[") return;
    i++; // skip '['

    skipWhitespace();
    let index = 0;

    while (i < jsonText.length && jsonText[i] !== "]") {
      skipWhitespace();

      if (jsonText[i] === ",") {
        i++;
        skipWhitespace();
      }

      if (jsonText[i] === "]") break;

      parseValue(`${path}[${index}]`);
      index++;

      skipWhitespace();
    }

    i++; // skip ']'
  }

  // Start parsing from root
  skipWhitespace();
  if (jsonText[i] === "{") {
    parseObject("$");
  } else if (jsonText[i] === "[") {
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
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON Duplicate Key Finder – Detect Duplicate Keys
          </h1>
          <p className="text-muted-foreground">
            Find and flag duplicate keys in JSON objects that could cause silent
            data loss. Our free JSON Duplicate Key Finder helps you write
            cleaner, safer, and more reliable JSON.
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
            <Label
              htmlFor="input"
              className="text-sm font-medium text-muted-foreground mb-2 block"
            >
              Input JSON
            </Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"name": "Test", "name": "Duplicate"}'
              className="min-h-[300px] font-mono text-sm resize-none max-h-[500px] overflow-y-auto"
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
                    <span className="font-semibold">
                      Found {duplicates.length} duplicate key(s)
                    </span>
                  </div>
                  {duplicates.map((dup, index) => (
                    <div
                      key={index}
                      className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-4"
                    >
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

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            About JSON Duplicate Key Finder
          </h2>
          <p className="text-muted-foreground mb-6">
            Duplicate keys in JSON cause silent data loss since most parsers
            only keep the last value. This tool scans your JSON text before
            parsing to find duplicate keys that could cause bugs in your
            application or API.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            The tool analyzes your JSON as raw text, tracking keys at each
            object level. It finds keys that appear more than once in the same
            object and reports their location and count.
          </p>
          <p className="text-muted-foreground mb-8">
            Results show each duplicate key with its path and how many times it
            appears. Yellow warnings highlight problematic keys so you can fix
            them before they cause issues in production.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            You're manually editing large JSON config files and want to avoid
            accidental duplicate keys. Run this check before deploying to catch
            typos or copy-paste errors.
          </p>
          <p className="text-muted-foreground mb-8">
            This tool finds duplicates but doesn't fix them automatically.
            You'll need to manually remove or rename duplicate keys. Some JSON
            editors can help with this after you identify the issues.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">
                Why are duplicate keys a problem?
              </p>
              <p className="text-muted-foreground">
                Most JSON parsers silently keep only the last value when
                duplicates exist. This can cause unexpected behavior and data
                loss.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">How does this find duplicates?</p>
              <p className="text-muted-foreground">
                It scans the raw JSON text before parsing, tracking keys at each
                object level. Standard JSON.parse would lose this information.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">What does the path mean?</p>
              <p className="text-muted-foreground">
                The path shows where the duplicate occurs, like $ for root or
                $.items[0] for nested objects. This helps you locate the issue.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Can duplicates be intentional?</p>
              <p className="text-muted-foreground">
                Rarely. Some legacy systems might rely on duplicate keys, but
                this is non-standard and should be avoided in modern
                applications.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Does this validate JSON syntax?
              </p>
              <p className="text-muted-foreground">
                Yes, it also checks that your JSON is valid. Invalid JSON will
                show an error before duplicate checking runs.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a
                href="/json-tools/json-validator"
                className="text-primary hover:underline"
              >
                JSON Validator
              </a>{" "}
              – Check JSON syntax
            </li>
            <li>
              <a
                href="/json-tools/json-empty-field-finder"
                className="text-primary hover:underline"
              >
                JSON Empty Field Finder
              </a>{" "}
              – Find null and empty values
            </li>
            <li>
              <a
                href="/json-tools/json-formatter"
                className="text-primary hover:underline"
              >
                JSON Formatter
              </a>{" "}
              – Format and indent JSON
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
