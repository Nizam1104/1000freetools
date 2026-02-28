"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Copy, Download, FileJson, RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function JsonPrettyPrintPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indentSize, setIndentSize] = useState("2");
  const [useTabs, setUseTabs] = useState(false);
  const [sortKeys, setSortKeys] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sortObjectKeys = (obj: any): any => {
    if (obj === null || typeof obj !== "object") return obj;
    if (Array.isArray(obj)) return obj.map(sortObjectKeys);
    
    const sorted: any = {};
    Object.keys(obj).sort().forEach((key) => {
      sorted[key] = sortObjectKeys(obj[key]);
    });
    return sorted;
  };

  const prettyPrint = useCallback(() => {
    if (!input.trim()) {
      setError("Please enter JSON to pretty print");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const dataToPrint = sortKeys ? sortObjectKeys(parsed) : parsed;
      const indent = useTabs ? "\t" : " ".repeat(parseInt(indentSize));
      const formatted = JSON.stringify(dataToPrint, null, indent);
      setOutput(formatted);
      setError(null);
      toast.success("JSON pretty printed successfully!");
    } catch (e) {
      setError(`Invalid JSON: ${(e as Error).message}`);
      setOutput("");
    }
  }, [input, indentSize, useTabs, sortKeys]);

  const copyToClipboard = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const downloadJson = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pretty-printed.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Downloaded as pretty-printed.json");
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const loadSample = () => {
    const sample = JSON.stringify({name:"Example",version:1,features:["fast","simple","reliable"],config:{debug:true,maxItems:100}}, null, 0);
    setInput(sample);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Pretty Print – Readable JSON Formatter</h1>
          <p className="text-muted-foreground">
            Pretty print JSON with customizable indentation for maximum readability. Convert compact, hard-to-read JSON into clean, human-friendly formatted output instantly.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="indent" className="text-sm font-medium whitespace-nowrap">
                    Indent:
                  </Label>
                  <Select value={indentSize} onValueChange={setIndentSize} disabled={useTabs}>
                    <SelectTrigger id="indent" className="w-24 h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 spaces</SelectItem>
                      <SelectItem value="4">4 spaces</SelectItem>
                      <SelectItem value="8">8 spaces</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="useTabs"
                    checked={useTabs}
                    onCheckedChange={(checked) => setUseTabs(checked as boolean)}
                  />
                  <Label htmlFor="useTabs" className="text-sm font-medium cursor-pointer">
                    Use tabs
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="sortKeys"
                    checked={sortKeys}
                    onCheckedChange={(checked) => setSortKeys(checked as boolean)}
                  />
                  <Label htmlFor="sortKeys" className="text-sm font-medium cursor-pointer">
                    Sort keys
                  </Label>
                </div>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Sample
                </Button>
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={prettyPrint}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Pretty Print
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input */}
          <Card>
            <CardContent className="p-4">
              <Label htmlFor="input" className="text-sm font-medium text-muted-foreground mb-2 block">
                Input JSON
              </Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Paste compact JSON here, e.g., {"name":"test","value":123}'
                className="min-h-[500px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Pretty Printed Output
                </Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    disabled={!output}
                  >
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={downloadJson}
                    disabled={!output}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Textarea
                  value={output}
                  readOnly
                  placeholder="Pretty printed JSON will appear here..."
                  className="min-h-[500px] font-mono text-sm resize-none bg-muted/50"
                />
                {error && (
                  <div className="absolute bottom-4 left-4 right-4 bg-destructive text-destructive-foreground px-4 py-3 rounded-md text-sm">
                    {error}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
