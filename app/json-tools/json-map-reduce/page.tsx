"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileJson, RotateCcw, Trash2, Copy, Download } from "lucide-react";
import { toast } from "sonner";

export default function JsonMapReducePage() {
  const [input, setInput] = useState("");
  const [mapFn, setMapFn] = useState("item => item");
  const [reduceFn, setReduceFn] = useState("");
  const [result, setResult] = useState<any>(null);

  const executeMapReduce = useCallback(() => {
    setResult(null);

    let arr: any[];
    try {
      const parsed = JSON.parse(input);
      if (!Array.isArray(parsed)) {
        toast.error("Input must be a JSON array");
        return;
      }
      arr = parsed;
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
      return;
    }

    try {
      // Create a safe evaluation context
      const createFunction = (fnStr: string) => {
        return new Function("item", "index", "arr", `return (${fnStr})`);
      };

      // Map phase
      let mapped: any[];
      try {
        const mapFunc = createFunction(mapFn);
        mapped = arr.map((item, index) => mapFunc(item, index, arr));
      } catch (e) {
        toast.error(`Map function error: ${(e as Error).message}`);
        return;
      }

      // Reduce phase (optional)
      let finalResult: any;
      if (reduceFn.trim()) {
        try {
          const reduceFunc = new Function("acc", "item", "index", "arr", `return (${reduceFn})`);
          finalResult = mapped.reduce((acc, item, index) => reduceFunc(acc, item, index, mapped), 0);
        } catch (e) {
          toast.error(`Reduce function error: ${(e as Error).message}`);
          return;
        }
      } else {
        finalResult = mapped;
      }

      setResult(finalResult);
      toast.success("Map/Reduce executed successfully");
    } catch (e) {
      toast.error(`Execution error: ${(e as Error).message}`);
    }
  }, [input, mapFn, reduceFn]);

  const clearAll = () => {
    setInput("");
    setMapFn("item => item");
    setReduceFn("");
    setResult(null);
  };

  const loadSample = () => {
    setInput(JSON.stringify([
      { name: "Apple", price: 1.5, quantity: 10 },
      { name: "Banana", price: 0.5, quantity: 20 },
      { name: "Orange", price: 2.0, quantity: 15 }
    ], null, 2));
    setMapFn("item => ({ name: item.name, total: item.price * item.quantity })");
    setReduceFn("acc + item.total");
  };

  const loadPreset = (preset: string) => {
    switch (preset) {
      case "extract":
        setMapFn("item => item.name");
        setReduceFn("");
        break;
      case "sum":
        setMapFn("item => item.price");
        setReduceFn("acc + item");
        break;
      case "transform":
        setMapFn("item => ({ ...item, doubled: item.price * 2 })");
        setReduceFn("");
        break;
      case "count":
        setMapFn("item => 1");
        setReduceFn("acc + item");
        break;
    }
  };

  const copyResult = () => {
    if (result !== null) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      toast.success("Result copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (result !== null) {
      const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "map-reduce-result.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Result downloaded");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Map Reduce Tool – Transform JSON Arrays</h1>
          <p className="text-muted-foreground">
            Apply map and reduce style transformations to JSON arrays online. Our free JSON Map Reduce Tool helps developers test data transformations quickly without a full code setup.
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
                {result !== null && (
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
                <Button onClick={executeMapReduce}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Execute
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Presets */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <Label className="text-sm font-medium text-muted-foreground mb-2 block">
              Quick Presets
            </Label>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => loadPreset("extract")}>
                Extract Property
              </Button>
              <Button variant="outline" size="sm" onClick={() => loadPreset("sum")}>
                Sum Values
              </Button>
              <Button variant="outline" size="sm" onClick={() => loadPreset("transform")}>
                Transform
              </Button>
              <Button variant="outline" size="sm" onClick={() => loadPreset("count")}>
                Count Items
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Input */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <Label htmlFor="input" className="text-sm font-medium text-muted-foreground mb-2 block">
              Input JSON Array
            </Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='[{"name": "Apple", "price": 1.5}, ...]'
              className="min-h-[150px] font-mono text-sm resize-none"
            />
          </CardContent>
        </Card>

        {/* Map/Reduce Functions */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardContent className="p-4">
              <Label htmlFor="mapFn" className="text-sm font-medium text-muted-foreground mb-2 block">
                Map Function (item, index, arr)
              </Label>
              <Textarea
                id="mapFn"
                value={mapFn}
                onChange={(e) => setMapFn(e.target.value)}
                placeholder="item => item.name"
                className="min-h-[100px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Label htmlFor="reduceFn" className="text-sm font-medium text-muted-foreground mb-2 block">
                Reduce Function (acc, item, index, arr) - Optional
              </Label>
              <Textarea
                id="reduceFn"
                value={reduceFn}
                onChange={(e) => setReduceFn(e.target.value)}
                placeholder="acc + item"
                className="min-h-[100px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>
        </div>

        {/* Result */}
        {result !== null && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Result
              </Label>
              <Textarea
                value={typeof result === "object" ? JSON.stringify(result, null, 2) : String(result)}
                readOnly
                className="min-h-[150px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
