"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Copy, Trash2, Minimize2, Maximize2 } from "lucide-react";

export default function CssMinifierPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const minifyCSS = (css: string) => {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, "") // Remove comments
      .replace(/\s+/g, " ") // Collapse whitespace
      .replace(/\s*([{}:;,])\s*/g, "$1") // Remove spaces around special chars
      .replace(/;\}/g, "}") // Remove trailing semicolons
      .trim();
  };

  const beautifyCSS = (css: string) => {
    let result = "";
    let indent = 0;
    let i = 0;

    while (i < css.length) {
      const char = css[i];

      if (char === "{") {
        result += " {\n";
        indent++;
        result += "  ".repeat(indent);
      } else if (char === "}") {
        result += "\n";
        indent--;
        result += "  ".repeat(indent) + "}\n";
        if (i < css.length - 1) result += "  ".repeat(indent);
      } else if (char === ";") {
        result += ";\n" + "  ".repeat(indent);
      } else if (char === " " && css[i - 1] === ":") {
        result += " ";
      } else if (char !== "\n" && char !== "\r") {
        result += char;
      }

      i++;
    }

    return result.trim();
  };

  const handleMinify = () => {
    if (!input.trim()) {
      toast.error("Please enter CSS code");
      return;
    }
    const minified = minifyCSS(input);
    setOutput(minified);
    toast.success("CSS minified successfully!");
  };

  const handleBeautify = () => {
    if (!input.trim()) {
      toast.error("Please enter CSS code");
      return;
    }
    const beautified = beautifyCSS(input);
    setOutput(beautified);
    toast.success("CSS beautified successfully!");
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const stats = {
    original: input.length,
    minified: output.length,
    saved: input.length > 0 && output.length > 0
      ? Math.round(((input.length - output.length) / input.length) * 100)
      : 0,
  };

  return (
    <div className="w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSS Minifier & Beautifier</h1>
        <p className="text-muted-foreground">
          Compress CSS to reduce file size or format it for better readability.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Input CSS</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearAll}>
                <Trash2 className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </CardHeader>
            <CardContent>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your CSS code here..."
                className="min-h-[400px] font-mono text-sm"
              />
              <div className="flex gap-2 mt-4">
                <Button onClick={handleMinify} className="flex-1">
                  <Minimize2 className="w-4 h-4 mr-2" />
                  Minify
                </Button>
                <Button onClick={handleBeautify} variant="outline" className="flex-1">
                  <Maximize2 className="w-4 h-4 mr-2" />
                  Beautify
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Output */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Output</CardTitle>
              {stats.original > 0 && stats.minified > 0 && (
                <div className="text-sm text-muted-foreground">
                  {stats.original} → {stats.minified} bytes ({stats.saved > 0 ? "-" : "+"}{Math.abs(stats.saved)}%)
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Textarea
                  value={output}
                  readOnly
                  placeholder="Output will appear here..."
                  className="min-h-[400px] font-mono text-sm"
                />
                {output && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(output, "CSS")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                )}
              </div>
              {output && (
                <Button className="w-full mt-4" onClick={() => copyToClipboard(output, "CSS")}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Output
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Why Minify CSS?</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Faster Loading</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Smaller file sizes mean faster downloads and improved page load times, especially on slow connections.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Better Performance</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Reduced CSS size improves Core Web Vitals scores and overall website performance metrics.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bandwidth Savings</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Less data transferred means lower bandwidth costs, especially important for high-traffic sites.
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
