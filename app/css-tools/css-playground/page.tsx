"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Copy, RotateCcw, Play } from "lucide-react";

const defaultHTML = `<div class="container">
  <h1>Hello World</h1>
  <p>Edit this HTML and see live preview!</p>
  <button class="btn">Click Me</button>
</div>`;

const defaultCSS = `.container {
  max-width: 400px;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  text-align: center;
  font-family: system-ui, -apple-system, sans-serif;
}

h1 {
  color: #ffffff;
  margin-bottom: 10px;
  font-size: 28px;
}

p {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 20px;
}

.btn {
  padding: 12px 24px;
  background: #ffffff;
  color: #667eea;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn:hover {
  transform: scale(1.05);
}`;

export default function CSSPlaygroundPage() {
  const [html, setHtml] = useState(defaultHTML);
  const [css, setCss] = useState(defaultCSS);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fullHTML = `
<!DOCTYPE html>
<html>
  <head>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f5f5f5;
        padding: 20px;
      }
      ${css}
    </style>
  </head>
  <body>
    ${html}
  </body>
</html>`;
    setPreview(fullHTML);
  }, [html, css]);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  const resetToDefault = () => {
    setHtml(defaultHTML);
    setCss(defaultCSS);
    toast.success("Reset to default template!");
  };

  const clearAll = () => {
    setHtml("");
    setCss("");
    toast.success("Cleared all content!");
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">CSS Playground</h1>
        <p className="text-muted-foreground">
          Live HTML & CSS editor with instant preview.
        </p>
      </div>

      {/* MAIN LAYOUT */}
      <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-160px)]">
        {/* ================= EDITOR PANEL (SCROLLABLE) ================= */}
        <div className="space-y-6 overflow-y-auto pr-2">
          {/* HTML Editor */}
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>HTML</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(html, "HTML")}
              >
                <Copy className="w-3 h-3 mr-1" />
                Copy
              </Button>
            </CardHeader>
            <CardContent>
              <Textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                className="font-mono text-sm min-h-[300px]"
                placeholder="Enter your HTML here..."
              />
            </CardContent>
          </Card>

          {/* CSS Editor */}
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>CSS</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(css, "CSS")}
              >
                <Copy className="w-3 h-3 mr-1" />
                Copy
              </Button>
            </CardHeader>
            <CardContent>
              <Textarea
                value={css}
                onChange={(e) => setCss(e.target.value)}
                className="font-mono text-sm min-h-[300px]"
                placeholder="Enter your CSS here..."
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={resetToDefault}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Template
            </Button>
            <Button variant="outline" className="flex-1" onClick={clearAll}>
              Clear All
            </Button>
          </div>
        </div>

        {/* ================= PREVIEW PANEL (STICKY) ================= */}
        <div className="lg:sticky lg:top-6 h-full space-y-6 self-start">
          <Card className="h-full flex flex-col">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                Live Preview
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(preview, "Full HTML")}
              >
                <Copy className="w-3 h-3 mr-1" />
                Copy Full
              </Button>
            </CardHeader>

            <CardContent className="flex-1 overflow-hidden p-0">
              <iframe
                srcDoc={preview}
                title="Live Preview"
                className="w-full h-full border-0"
                sandbox="allow-scripts"
              />
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Edit HTML and CSS to see instant changes</p>
              <p>• Use standard HTML tags and CSS selectors</p>
              <p>• Copy Full exports a ready-to-use HTML file</p>
              <p>• Reset restores the starter template</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
