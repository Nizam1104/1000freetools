"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"user.name": "John", "user.address.city": "NYC"}'
              className="min-h-[300px] font-mono text-sm resize-none"
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
              <Textarea
                value={unflattened}
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
