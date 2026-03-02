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

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What Is CSS Playground?</h2>
          <p className="text-muted-foreground mb-4">
            CSS Playground is a live HTML and CSS editor with instant preview. Write HTML and CSS
            in separate panels and see the result update as you type - no page refresh needed.
          </p>
          <p className="text-muted-foreground">
            It's useful for testing CSS snippets, learning how HTML and CSS work together, or
            prototyping components before adding them to your project. Think of it as a sandbox
            for web development.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How To Use It</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Write HTML in the left panel</h3>
                <p className="text-sm text-muted-foreground">
                  Start with standard HTML tags like <code className="bg-muted px-1 rounded">&lt;div&gt;</code>,
                  <code className="bg-muted px-1 rounded">&lt;h1&gt;</code>, <code className="bg-muted px-1 rounded">&lt;p&gt;</code>.
                  Add classes to target elements with CSS.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Add CSS in the CSS panel</h3>
                <p className="text-sm text-muted-foreground">
                  Write CSS rules targeting your HTML classes or elements. The preview updates
                  automatically - no need to save or refresh.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Copy your code</h3>
                <p className="text-sm text-muted-foreground">
                  Use the Copy buttons to grab HTML, CSS, or the full combined HTML file. Paste
                  directly into your project.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">What You Can Build</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Components</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Buttons, cards, forms, navigation bars, modals, and other UI components. Test
                different styles before committing.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Layouts</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Experiment with flexbox, grid, and positioning. See how elements flow and adjust
                spacing in real-time.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Animations</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Create and test CSS animations and transitions. Fine-tune timing functions and
                keyframes visually.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Email Templates</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Build HTML email layouts with inline styles. Test how different email clients
                might render your code.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Landing Pages</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Prototype entire page sections quickly. Get the structure right before integrating
                with your backend.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Learning & Testing</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Try new CSS properties, debug issues, or learn by modifying existing code. Perfect
                for beginners and experts alike.
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Tips for Better Results</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Use classes, not IDs</h3>
                <p className="text-sm text-muted-foreground">
                  Classes are reusable and easier to override. IDs should be reserved for unique
                  elements and JavaScript hooks.
                </p>
                <code className="block p-3 bg-muted rounded-lg text-sm font-mono mt-2">
                  {`/* Good */
.card { }
.button { }

/* Avoid for styling */
#main-card { }`}
                </code>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Keep CSS organized</h3>
                <p className="text-sm text-muted-foreground">
                  Group related styles together. Comment your code if it's complex. Future you
                  (and your teammates) will thank you.
                </p>
                <code className="block p-3 bg-muted rounded-lg text-sm font-mono mt-2">
                  {`/* Layout */
.container { }
.grid { }

/* Typography */
.heading { }
.body-text { }

/* Components */
.button { }
.card { }`}
                </code>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Test responsive behavior</h3>
                <p className="text-sm text-muted-foreground">
                  Resize your browser window to check how layouts adapt. Use media queries to
                  adjust styles for different screen sizes.
                </p>
                <code className="block p-3 bg-muted rounded-lg text-sm font-mono mt-2">
                  {`@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}`}
                </code>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Questions</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Does my code save automatically?</h3>
                <p className="text-sm text-muted-foreground">
                  No, the playground runs in your browser. Copy your code before closing the tab,
                  or use your browser's local storage if available.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Can I use JavaScript?</h3>
                <p className="text-sm text-muted-foreground">
                  This playground focuses on HTML and CSS only. For JavaScript testing, use a
                  dedicated code playground like CodePen or JSFiddle.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Why does my preview look different from my site?</h3>
                <p className="text-sm text-muted-foreground">
                  Different sites have different base styles, resets, and browser defaults. The
                  playground uses minimal defaults. Copy your CSS into your actual project for
                  accurate results.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Is this tool free?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, completely free to use. No sign-up required. Share it with anyone who needs
                  to test HTML and CSS quickly.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
