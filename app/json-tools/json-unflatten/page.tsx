"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/utils/json-editor";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy, Download } from "lucide-react";
import { toast } from "sonner";

export default function JsonUnflattenPage() {
  const [input, setInput] = useState("");
  const [separator, setSeparator] = useState(".");
  const [unflattened, setUnflattened] = useState<string | null>(null);

  const unflattenObject = useCallback((obj: any): any => {
    const result: any = {};

    for (const [key, value] of Object.entries(obj)) {
      const keys = key.split(separator);
      let current = result;

      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        const nextKey = keys[i + 1];
        const isNextIndex = /^\d+$/.test(nextKey);

        if (!(k in current)) {
          current[k] = isNextIndex ? [] : {};
        }
        current = current[k];
      }

      const lastKey = keys[keys.length - 1];
      const index = parseInt(lastKey, 10);

      if (!isNaN(index) && Array.isArray(current)) {
        current[index] = value;
      } else {
        current[lastKey] = value;
      }
    }

    return result;
  }, [separator]);

  const unflattenJson = useCallback(() => {
    setUnflattened(null);

    let obj: any;
    try {
      obj = JSON.parse(input);
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
      return;
    }

    const unflattened = unflattenObject(obj);
    setUnflattened(JSON.stringify(unflattened, null, 2));
    toast.success("JSON unflattened successfully");
  }, [input, unflattenObject]);

  const clearAll = () => {
    setInput("");
    setUnflattened(null);
  };

  const loadSample = () => {
    setInput(JSON.stringify({
      "user.name": "John",
      "user.address.city": "NYC",
      "user.address.zip": "10001",
      "user.hobbies.0": "reading",
      "user.hobbies.1": "coding",
      "active": true
    }, null, 2));
  };

  const copyResult = () => {
    if (unflattened) {
      navigator.clipboard.writeText(unflattened);
      toast.success("Unflattened JSON copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (unflattened) {
      const blob = new Blob([unflattened], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "unflattened.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Unflattened JSON downloaded");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Unflatten Tool – Restore Nested Structure</h1>
          <p className="text-muted-foreground">
            Convert flattened dot-notation JSON back into a fully nested JSON structure. Our free JSON Unflatten Tool reverses flattening to restore your original data hierarchy.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Load Sample
                </Button>
                <div className="flex items-center gap-2">
                  <Label htmlFor="separator" className="text-sm whitespace-nowrap">Separator:</Label>
                  <input
                    id="separator"
                    type="text"
                    value={separator}
                    onChange={(e) => setSeparator(e.target.value)}
                    className="w-16 h-9 px-3 text-sm border rounded-md bg-background"
                    maxLength={3}
                  />
                </div>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                {unflattened && (
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
                <Button onClick={unflattenJson}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Unflatten
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <Label htmlFor="input" className="text-sm font-medium text-muted-foreground mb-2 block">
              Flattened JSON
            </Label>
            <JsonEditor
              id="input"
              value={input}
              onChange={setInput}
              placeholder='{"user.name": "John", "user.address.city": "NYC"}'
            />
          </CardContent>
        </Card>

        {/* Result */}
        {unflattened && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Unflattened Result
              </Label>
              <JsonEditor
                value={unflattened}
                readOnly
              />
            </CardContent>
          </Card>
        )}

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">About JSON Unflatten</h2>
          <p className="text-muted-foreground mb-6">
            Flattened JSON with dot-notation keys is common in form data and NoSQL databases, but sometimes you need the original nested structure back. This tool reverses the flattening process, restoring your JSON hierarchy automatically.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            The tool parses each flattened key by splitting on your chosen separator character. It then rebuilds the nested structure by creating objects and arrays as needed based on the key path.
          </p>
          <p className="text-muted-foreground mb-8">
            Numeric key segments are treated as array indices, allowing the tool to reconstruct arrays from flattened data. The default separator is a dot, but you can customize it to match your data format.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            You received form submission data where each field is a flattened key like user.address.city. Convert it back to nested JSON before processing or storing in your database.
          </p>
          <p className="text-muted-foreground mb-8">
            This tool assumes well-formed flattened keys. If your data has inconsistent separators or mixed nesting patterns, you may need to preprocess it before unflattening.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">What separator should I use?</p>
              <p className="text-muted-foreground">The default dot separator works for most cases. Use a different character if your keys contain dots, like user.profile.name instead of user.name.</p>
            </div>
            <div>
              <p className="font-medium mb-1">How are arrays reconstructed?</p>
              <p className="text-muted-foreground">Numeric key segments become array indices. Keys like items.0 and items.1 will create an array with those values at positions 0 and 1.</p>
            </div>
            <div>
              <p className="font-medium mb-1">What if I have conflicting paths?</p>
              <p className="text-muted-foreground">If the same path appears with different types (object vs value), the last value wins. Ensure your flattened data doesn't have conflicting definitions.</p>
            </div>
            <div>
              <p className="font-medium mb-1">Can this handle deeply nested data?</p>
              <p className="text-muted-foreground">Yes, there's no practical limit to nesting depth. Very deep structures may take slightly longer to process but will unflatten correctly.</p>
            </div>
            <div>
              <p className="font-medium mb-1">Can I download the result?</p>
              <p className="text-muted-foreground">Yes. Use the Download button to save the unflattened JSON as a file, or Copy to paste it directly into your application code.</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a href="/json-tools/json-flatten" className="text-primary hover:underline">JSON Flatten</a> – Convert nested JSON to dot notation
            </li>
            <li>
              <a href="/json-tools/json-transformer" className="text-primary hover:underline">JSON Transformer</a> – Reshape JSON structures
            </li>
            <li>
              <a href="/json-tools/json-rename-keys" className="text-primary hover:underline">JSON Rename Keys</a> – Bulk rename JSON keys
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
