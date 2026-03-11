"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, Download } from "lucide-react";

export default function YamlMergeTool() {
  const [yaml1, setYaml1] = useState("");
  const [yaml2, setYaml2] = useState("");
  const [mergeStrategy, setMergeStrategy] = useState<"overwrite" | "combine" | "deep">("deep");
  const [output, setOutput] = useState("");

  const parseYaml = (yaml: string): Record<string, unknown> => {
    const result: Record<string, unknown> = {};
    const lines = yaml.split("\n");
    const stack: { obj: Record<string, unknown>; indent: number }[] = [{ obj: result, indent: -1 }];
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      
      const indent = line.search(/\S/);
      const match = trimmed.match(/^(\w+):\s*(.*)$/);
      
      if (!match) continue;
      
      const [, key, value] = match;
      
      while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
        stack.pop();
      }
      
      const current = stack[stack.length - 1].obj;
      
      if (value === "" || value === "{}" || value === "[]") {
        current[key] = {};
        stack.push({ obj: current[key] as Record<string, unknown>, indent });
      } else {
        let parsedValue: unknown = value;
        
        if (value === "true") parsedValue = true;
        else if (value === "false") parsedValue = false;
        else if (value === "null" || value === "~") parsedValue = null;
        else if (/^-?\d+$/.test(value)) parsedValue = parseInt(value, 10);
        else if (/^-?\d*\.\d+$/.test(value)) parsedValue = parseFloat(value);
        else if ((value.startsWith('"') && value.endsWith('"')) || 
                 (value.startsWith("'") && value.endsWith("'"))) {
          parsedValue = value.slice(1, -1);
        }
        
        current[key] = parsedValue;
      }
    }
    
    return result;
  };

  const deepMerge = (target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> => {
    const result = { ...target };
    
    for (const [key, value] of Object.entries(source)) {
      if (typeof value === "object" && value !== null && !Array.isArray(value) &&
          key in result && typeof result[key] === "object" && result[key] !== null && !Array.isArray(result[key])) {
        result[key] = deepMerge(result[key] as Record<string, unknown>, value as Record<string, unknown>);
      } else {
        result[key] = value;
      }
    }
    
    return result;
  };

  const stringifyYaml = (obj: Record<string, unknown>, indent = 0): string => {
    let result = "";
    const spaces = "  ".repeat(indent);
    
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        result += `${spaces}${key}:\n`;
        result += stringifyYaml(value as Record<string, unknown>, indent + 1);
      } else {
        const strValue = typeof value === "string" ? value : String(value);
        result += `${spaces}${key}: ${strValue}\n`;
      }
    }
    
    return result;
  };

  const handleMerge = () => {
    if (!yaml1 || !yaml2) return;

    try {
      const obj1 = parseYaml(yaml1);
      const obj2 = parseYaml(yaml2);
      
      let merged: Record<string, unknown>;
      
      switch (mergeStrategy) {
        case "overwrite":
          merged = { ...obj1, ...obj2 };
          break;
        case "combine":
          merged = deepMerge(obj2, obj1); // obj1 takes precedence
          break;
        case "deep":
        default:
          merged = deepMerge(obj1, obj2);
          break;
      }
      
      setOutput(stringifyYaml(merged));
    } catch (e) {
      setOutput("Error: Invalid YAML format");
    }
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
    }
  };

  const handleDownload = () => {
    if (output) {
      const blob = new Blob([output], { type: "text/yaml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.yaml";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleClear = () => {
    setYaml1("");
    setYaml2("");
    setOutput("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">YAML Merge Tool</h2>
        <p className="text-sm text-muted-foreground">
          Merge two or more YAML documents into one
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex gap-2">
            {(["overwrite", "combine", "deep"] as const).map((s) => (
              <Button
                key={s}
                variant={mergeStrategy === s ? "default" : "outline"}
                size="sm"
                onClick={() => setMergeStrategy(s)}
              >
                {s === "overwrite" ? "Overwrite" : s === "combine" ? "Combine" : "Deep Merge"}
              </Button>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="yaml1">YAML Document 1</Label>
              <textarea
                id="yaml1"
                value={yaml1}
                onChange={(e) => setYaml1(e.target.value)}
                placeholder="database:
  host: localhost"
                className="w-full min-h-[200px] p-3 font-mono text-sm rounded-md border border-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yaml2">YAML Document 2</Label>
              <textarea
                id="yaml2"
                value={yaml2}
                onChange={(e) => setYaml2(e.target.value)}
                placeholder="database:
  port: 5432"
                className="w-full min-h-[200px] p-3 font-mono text-sm rounded-md border border-input"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleMerge} disabled={!yaml1 || !yaml2} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Merge YAML
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!yaml1 && !yaml2}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleMerge} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Merge
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!yaml1 && !yaml2}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {output && (
        <Card className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Merged YAML</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleCopy();
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          <pre className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto whitespace-pre-wrap">
            {output}
          </pre>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Merge Strategies</h3>
        <div className="space-y-2 text-sm">
          <div className="p-2 bg-muted rounded">
            <div className="font-semibold">Deep Merge (default)</div>
            <div className="text-muted-foreground">
              Recursively merges nested objects. Values from Document 2 override Document 1 for conflicts.
            </div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="font-semibold">Combine</div>
            <div className="text-muted-foreground">
              Similar to deep merge, but Document 1 values take precedence over Document 2.
            </div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="font-semibold">Overwrite</div>
            <div className="text-muted-foreground">
              Simple shallow merge. Top-level keys from Document 2 completely replace Document 1.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
