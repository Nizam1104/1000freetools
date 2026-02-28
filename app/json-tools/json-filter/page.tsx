"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileJson, RotateCcw, Trash2, Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { NativeSelect as Select } from "@/components/ui/native-select";

type Condition = "equals" | "contains" | "greaterThan" | "lessThan" | "startsWith" | "endsWith";

export default function JsonFilterPage() {
  const [input, setInput] = useState("");
  const [keyPath, setKeyPath] = useState("");
  const [condition, setCondition] = useState<Condition>("equals");
  const [value, setValue] = useState("");
  const [result, setResult] = useState<any>(null);

  const getValueByPath = (obj: any, path: string): any => {
    return path.split(".").reduce((acc, part) => acc?.[part], obj);
  };

  const checkCondition = useCallback((itemValue: any, condition: Condition, compareValue: string): boolean => {
    const strValue = String(itemValue ?? "");
    const numValue = Number(itemValue);
    const compareNum = Number(compareValue);

    switch (condition) {
      case "equals":
        return String(itemValue) === compareValue;
      case "contains":
        return strValue.includes(compareValue);
      case "greaterThan":
        return !isNaN(numValue) && !isNaN(compareNum) && numValue > compareNum;
      case "lessThan":
        return !isNaN(numValue) && !isNaN(compareNum) && numValue < compareNum;
      case "startsWith":
        return strValue.startsWith(compareValue);
      case "endsWith":
        return strValue.endsWith(compareValue);
      default:
        return false;
    }
  }, []);

  const filterJson = useCallback(() => {
    setResult(null);

    let obj: any;
    try {
      obj = JSON.parse(input);
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
      return;
    }

    if (!Array.isArray(obj)) {
      toast.error("Input must be a JSON array");
      return;
    }

    if (!keyPath.trim()) {
      toast.error("Please enter a key path");
      return;
    }

    const filtered = obj.filter(item => {
      const itemValue = getValueByPath(item, keyPath);
      return checkCondition(itemValue, condition, value);
    });

    setResult(filtered);
    toast.success(`Filtered to ${filtered.length} item(s)`);
  }, [input, keyPath, condition, value, checkCondition]);

  const clearAll = () => {
    setInput("");
    setKeyPath("");
    setCondition("equals");
    setValue("");
    setResult(null);
  };

  const loadSample = () => {
    setInput(JSON.stringify([
      { name: "John", age: 30, city: "NYC", active: true },
      { name: "Jane", age: 25, city: "LA", active: true },
      { name: "Bob", age: 35, city: "NYC", active: false },
      { name: "Alice", age: 28, city: "SF", active: true }
    ], null, 2));
    setKeyPath("city");
    setValue("NYC");
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      toast.success("Filtered result copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (result) {
      const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "filtered.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Filtered result downloaded");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Filter Tool – Filter JSON Arrays Online</h1>
          <p className="text-muted-foreground">
            Filter JSON arrays based on conditions like equals, contains, and range. Our free JSON Filter Tool lets you extract exactly the data you need without writing any code.
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
                <Button onClick={filterJson}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
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
              placeholder='[{"name": "John", "age": 30}, ...]'
              className="min-h-[200px] font-mono text-sm resize-none"
            />
          </CardContent>
        </Card>

        {/* Filter Options */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="keyPath" className="text-sm font-medium mb-2 block">Key Path</Label>
                <Input
                  id="keyPath"
                  value={keyPath}
                  onChange={(e) => setKeyPath(e.target.value)}
                  placeholder="city"
                  className="font-mono text-sm"
                />
              </div>
              <div>
                <Label htmlFor="condition" className="text-sm font-medium mb-2 block">Condition</Label>
                <Select
                  id="condition"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as Condition)}
                  className="w-full"
                >
                  <option value="equals">Equals</option>
                  <option value="contains">Contains</option>
                  <option value="greaterThan">Greater Than</option>
                  <option value="lessThan">Less Than</option>
                  <option value="startsWith">Starts With</option>
                  <option value="endsWith">Ends With</option>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="value" className="text-sm font-medium mb-2 block">Compare Value</Label>
                <Input
                  id="value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="NYC"
                  className="font-mono text-sm"
                  onKeyDown={(e) => e.key === "Enter" && filterJson()}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Filtered Result ({result.length} item(s))
              </Label>
              <Textarea
                value={JSON.stringify(result, null, 2)}
                readOnly
                className="min-h-[200px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
