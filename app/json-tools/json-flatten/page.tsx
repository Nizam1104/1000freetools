"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

export default function JsonFlattenPage() {
  const [input, setInput] = useState("");
  const [separator, setSeparator] = useState(".");
  const [preserveArrays, setPreserveArrays] = useState(false);
  const [flattened, setFlattened] = useState<string | null>(null);

  const flattenObject = useCallback((obj: any, prefix = "", result: any = {}): any => {
    if (obj !== null && typeof obj === "object") {
      if (Array.isArray(obj)) {
        if (preserveArrays) {
          result[prefix] = obj;
        } else {
          obj.forEach((item, index) => {
            flattenObject(item, `${prefix}${prefix ? separator : ""}${index}`, result);
          });
        }
      } else {
        Object.entries(obj).forEach(([key, value]) => {
          flattenObject(value, `${prefix}${prefix ? separator : ""}${key}`, result);
        });
      }
    } else {
      result[prefix] = obj;
    }
    return result;
  }, [separator, preserveArrays]);

  const flattenJson = useCallback(() => {
    setFlattened(null);

    let obj: any;
    try {
      obj = JSON.parse(input);
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
      return;
    }

    const flattened = flattenObject(obj);
    setFlattened(JSON.stringify(flattened, null, 2));
    toast.success("JSON flattened successfully");
  }, [input, flattenObject]);

  const clearAll = () => {
    setInput("");
    setFlattened(null);
  };

  const loadSample = () => {
    setInput(JSON.stringify({
      user: {
        name: "John",
        address: {
          city: "NYC",
          zip: "10001"
        },
        hobbies: ["reading", "coding"]
      },
      active: true
    }, null, 2));
  };

  const copyResult = () => {
    if (flattened) {
      navigator.clipboard.writeText(flattened);
      toast.success("Flattened JSON copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (flattened) {
      const blob = new Blob([flattened], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "flattened.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Flattened JSON downloaded");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Flatten Tool – Flatten Nested JSON Online</h1>
          <p className="text-muted-foreground">
            Flatten deeply nested JSON into simple dot-notation key-value pairs. Our free JSON Flatten Tool makes complex data easier to process, store, and analyze in flat systems.
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
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="preserveArrays"
                    checked={preserveArrays}
                    onCheckedChange={(checked) => setPreserveArrays(checked as boolean)}
                  />
                  <Label htmlFor="preserveArrays" className="text-sm">Preserve Arrays</Label>
                </div>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                {flattened && (
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
                <Button onClick={flattenJson}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Flatten
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
              placeholder='{"user": {"name": "John", "address": {"city": "NYC"}}}'
              className="min-h-[300px] font-mono text-sm resize-none"
            />
          </CardContent>
        </Card>

        {/* Result */}
        {flattened && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Flattened Result
              </Label>
              <Textarea
                value={flattened}
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
