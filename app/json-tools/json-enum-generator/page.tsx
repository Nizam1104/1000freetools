"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileJson, RotateCcw, Trash2, Copy, Download, Plus, X } from "lucide-react";
import { toast } from "sonner";

export default function JsonEnumGeneratorPage() {
  const [enumName, setEnumName] = useState("Status");
  const [values, setValues] = useState<string[]>(["active", "inactive", "pending"]);
  const [outputFormat, setOutputFormat] = useState<"json" | "typescript" | "python" | "java">("json");
  const [result, setResult] = useState<string | null>(null);

  const addValue = () => {
    setValues([...values, ""]);
  };

  const removeValue = (index: number) => {
    setValues(values.filter((_, i) => i !== index));
  };

  const updateValue = (index: number, value: string) => {
    const updated = [...values];
    updated[index] = value;
    setValues(updated);
  };

  const generateEnum = useCallback(() => {
    const validValues = values.filter(v => v.trim());

    let output = "";

    switch (outputFormat) {
      case "json":
        output = JSON.stringify({
          name: enumName,
          type: "enum",
          values: validValues
        }, null, 2);
        break;
      case "typescript":
        output = `export enum ${enumName} {\n${validValues.map(v => `  ${v.toUpperCase()} = "${v}"`).join(",\n")}\n}`;
        break;
      case "python":
        output = `from enum import Enum\n\nclass ${enumName}(Enum):\n${validValues.map(v => `    ${v.toUpperCase()} = "${v}"`).join("\n")}`;
        break;
      case "java":
        output = `public enum ${enumName} {\n${validValues.map(v => `    ${v.toUpperCase()}("${v}")`).join(",\n")};\n\n    private final String value;\n\n    ${enumName}(String value) {\n        this.value = value;\n    }\n}`;
        break;
    }

    setResult(output);
    toast.success(`Enum generated in ${outputFormat} format`);
  }, [enumName, values, outputFormat]);

  const clearAll = () => {
    setResult(null);
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("Enum copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (result) {
      const ext = outputFormat === "typescript" ? "ts" : outputFormat === "python" ? "py" : outputFormat === "java" ? "java" : "json";
      const blob = new Blob([result], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${enumName.toLowerCase()}.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Enum downloaded");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Enum Generator – Generate JSON Enums Online</h1>
          <p className="text-muted-foreground">
            Generate JSON enums and allowed value lists for schema design and documentation. Our free JSON Enum Generator helps standardize field values across your API and data models.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="enumName" className="text-sm whitespace-nowrap">Enum Name:</Label>
                  <Input
                    id="enumName"
                    value={enumName}
                    onChange={(e) => setEnumName(e.target.value)}
                    placeholder="Status"
                    className="w-40 h-9"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="format" className="text-sm whitespace-nowrap">Format:</Label>
                  <select
                    id="format"
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value as any)}
                    className="h-9 px-3 text-sm border rounded-md bg-background"
                  >
                    <option value="json">JSON</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                  </select>
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
                <Button onClick={generateEnum}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enum Values */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-sm font-medium text-muted-foreground">
                Enum Values
              </Label>
              <Button variant="outline" size="sm" onClick={addValue}>
                <Plus className="h-4 w-4 mr-2" />
                Add Value
              </Button>
            </div>
            <div className="space-y-3">
              {values.map((value, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={value}
                    onChange={(e) => updateValue(index, e.target.value)}
                    placeholder="value"
                    className="font-mono text-sm h-9"
                    onKeyDown={(e) => e.key === "Enter" && addValue()}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeValue(index)}
                    disabled={values.length === 1}
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
                Generated Enum
              </Label>
              <Textarea
                value={result}
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
