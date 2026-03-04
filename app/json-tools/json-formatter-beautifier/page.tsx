"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Copy, Download, FileJson, RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function JsonFormatterBeautifierPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indentSize, setIndentSize] = useState("2");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatJson = useCallback(() => {
    if (!input.trim()) {
      setError("Please enter JSON to format");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, parseInt(indentSize));
      setOutput(formatted);
      setError(null);
      toast.success("JSON formatted successfully!");
    } catch (e) {
      setError(`Invalid JSON: ${(e as Error).message}`);
      setOutput("");
    }
  }, [input, indentSize]);

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
    a.download = "formatted.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Downloaded as formatted.json");
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const loadSample = () => {
    const sample = JSON.stringify({ name: "Example", version: 1, features: ["fast", "simple", "reliable"] }, null, 0);
    setInput(sample);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Formatter & Beautifier Online</h1>
          <p className="text-muted-foreground">
            Format and beautify raw JSON instantly with our free online JSON Formatter. Customize indentation, collapse nodes, and download clean, readable JSON in one click.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="indent" className="text-sm font-medium whitespace-nowrap">
                  Indent Size:
                </Label>
                <Select value={indentSize} onValueChange={setIndentSize}>
                  <SelectTrigger id="indent" className="w-24 h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 spaces</SelectItem>
                    <SelectItem value="4">4 spaces</SelectItem>
                    <SelectItem value="8">8 spaces</SelectItem>
                    <SelectItem value="1">1 tab</SelectItem>
                  </SelectContent>
                </Select>
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
                <Button onClick={formatJson}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Format
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
                placeholder='Paste your JSON here, e.g., {"name":"test","value":123}'
                className="min-h-[500px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Formatted Output
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
                  placeholder="Formatted JSON will appear here..."
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

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">About JSON Formatter & Beautifier</h2>
          <p className="text-muted-foreground mb-6">
            Raw JSON from APIs is often minified into a single line, making it nearly impossible to read or debug. This JSON Formatter takes that compressed data and transforms it into a clean, indented structure that you can actually work with. It runs entirely in your browser, so your data never leaves your machine.
          </p>

          <h3 className="text-xl font-semibold mb-3">How the formatter works</h3>
          <p className="text-muted-foreground mb-2">
            Paste your minified or poorly formatted JSON into the input box and click the Format button. The tool parses your JSON to validate it, then rebuilds it with consistent indentation using your chosen indent size from the dropdown (2 spaces, 4 spaces, 8 spaces, or tabs).
          </p>
          <p className="text-muted-foreground mb-8">
            The formatted output appears in the right panel with syntax highlighting. Use the Copy button to grab the result or Download to save it as a .json file. If your JSON has errors, the error message shows at the bottom of the output panel pointing to the issue.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            You're debugging an API response that came back as a single line of text. Or you received a JSON config file from a teammate and need to understand its structure before making changes. This tool also helps when preparing JSON for documentation or presentations where readability matters.
          </p>
          <p className="text-muted-foreground mb-8">
            Note that this formatter only handles valid JSON. If your input has syntax errors, you'll see an error message instead of formatted output. For fixing broken JSON, try our JSON Error Explanation tool which tells you exactly what's wrong.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">Does this tool work with large JSON files?</p>
              <p className="text-muted-foreground">Yes, but browser performance may slow down with files over 10MB. For very large files, consider using a desktop editor like VS Code with JSON extensions.</p>
            </div>
            <div>
              <p className="font-medium mb-1">Can I customize the indentation style?</p>
              <p className="text-muted-foreground">Use the Indent Size dropdown to choose between 2 spaces, 4 spaces, 8 spaces, or tab characters. The default is 2 spaces which is the most common convention.</p>
            </div>
            <div>
              <p className="font-medium mb-1">Is my JSON data sent to a server?</p>
              <p className="text-muted-foreground">No, all formatting happens locally in your browser using JavaScript. Your data never leaves your computer, making this safe for sensitive information.</p>
            </div>
            <div>
              <p className="font-medium mb-1">What happens if my JSON is invalid?</p>
              <p className="text-muted-foreground">The tool will display an error message explaining what went wrong. The error includes the position and type of syntax issue so you can fix it.</p>
            </div>
            <div>
              <p className="font-medium mb-1">Can I format JSONP or JSON with comments?</p>
              <p className="text-muted-foreground">No, this tool only handles standard JSON. JSONP wrappers and comments are not part of the JSON specification and will cause parsing errors.</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a href="/json-tools/json-minifier" className="text-primary hover:underline">JSON Minifier</a> – Compress formatted JSON back into a single line
            </li>
            <li>
              <a href="/json-tools/json-validator" className="text-primary hover:underline">JSON Validator</a> – Check if your JSON is valid without formatting
            </li>
            <li>
              <a href="/json-tools/json-error-explanation" className="text-primary hover:underline">JSON Error Explanation</a> – Get plain-language explanations of JSON syntax errors
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
