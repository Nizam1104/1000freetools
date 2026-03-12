"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Copy, Trash2 } from "lucide-react";

export default function CssVariableExtractorPage() {
  const [cssInput, setCssInput] = useState("");
  const [extractedVars, setExtractedVars] = useState<{ name: string; value: string; category: string }[]>([]);

  const extractVariables = () => {
    if (!cssInput.trim()) {
      toast.error("Please paste some CSS code");
      return;
    }

    // Match CSS custom properties (variables)
    const varRegex = /--([a-zA-Z0-9-]+)\s*:\s*([^;]+);/g;
    const matches = [...cssInput.matchAll(varRegex)];

    const vars = matches.map((match) => {
      const name = `--${match[1]}`;
      const value = match[2].trim();
      let category = "Other";

      if (value.includes("#") || value.includes("rgb") || value.includes("hsl") || value.includes("rgba") || value.includes("hsla")) {
        category = "Color";
      } else if (value.includes("px") || value.includes("rem") || value.includes("em") || value.includes("%") || value.includes("vw") || value.includes("vh")) {
        category = "Spacing";
      } else if (value.includes("font") || value.includes("weight") || value.includes("size")) {
        category = "Typography";
      } else if (value.includes("ease") || value.includes("cubic") || value.includes("s") || value.includes("ms")) {
        category = "Animation";
      } else if (value.includes("blur") || value.includes("shadow") || value.includes("radius")) {
        category = "Effect";
      }

      return { name, value, category };
    });

    setExtractedVars(vars);

    if (vars.length === 0) {
      toast.info("No CSS variables found in the input");
    } else {
      toast.success(`Found ${vars.length} CSS variables`);
    }
  };

  const generateCSS = () => {
    if (extractedVars.length === 0) return "";

    const categories = [...new Set(extractedVars.map((v) => v.category))];

    let output = ":root {\n";

    categories.forEach((category) => {
      const varsInCategory = extractedVars.filter((v) => v.category === category);
      if (varsInCategory.length > 0) {
        output += `\n  /* ${category} */\n`;
        varsInCategory.forEach((v) => {
          output += `  ${v.name}: ${v.value};\n`;
        });
      }
    });

    output += "}\n";

    return output;
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const clearInput = () => {
    setCssInput("");
    setExtractedVars([]);
  };

  const cssOutput = generateCSS();

  return (
    <div className="w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSS Variable Extractor</h1>
        <p className="text-muted-foreground">
          Paste CSS code and automatically extract all custom properties (CSS variables) into organized CSS custom property declarations.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>CSS Input</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={clearInput}>
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear
                </Button>
                <Button variant="outline" size="sm" onClick={extractVariables}>
                  Extract
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={cssInput}
                onChange={(e) => setCssInput(e.target.value)}
                placeholder={`Paste your CSS here...\n\nExample:\n.card {\n  --card-bg: #ffffff;\n  --card-padding: 16px;\n  --card-radius: 8px;\n}`}
                className="min-h-[400px] font-mono text-sm"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sample CSS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start text-left font-mono text-xs"
                onClick={() => setCssInput(":root {\n  --primary-color: #6366f1;\n  --secondary-color: #8b5cf6;\n  --background: #ffffff;\n  --text-color: #1f2937;\n  --spacing-sm: 8px;\n  --spacing-md: 16px;\n  --spacing-lg: 24px;\n  --font-size-base: 16px;\n  --font-size-lg: 18px;\n  --border-radius: 8px;\n  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  --transition: all 0.3s ease;\n}")}
              >
                Load Design System Example
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-mono text-xs"
                onClick={() => setCssInput(".button {\n  --btn-bg: #3b82f6;\n  --btn-color: #ffffff;\n  --btn-padding: 12px 24px;\n  --btn-radius: 6px;\n  --btn-hover-bg: #2563eb;\n}\n\n.card {\n  --card-bg: #ffffff;\n  --card-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  --card-radius: 12px;\n}")}
              >
                Load Component Example
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Output */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Extracted Variables ({extractedVars.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {extractedVars.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No variables extracted yet</p>
                  <p className="text-sm mt-2">Paste CSS and click "Extract" to find variables</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {["Color", "Spacing", "Typography", "Animation", "Effect", "Other"].map((category) => {
                    const varsInCategory = extractedVars.filter((v) => v.category === category);
                    if (varsInCategory.length === 0) return null;

                    return (
                      <div key={category}>
                        <h4 className="text-sm font-medium mb-2">{category}</h4>
                        <div className="space-y-2">
                          {varsInCategory.map((v) => (
                            <div key={v.name} className="flex items-center justify-between p-2 bg-muted rounded">
                              <code className="text-sm font-mono">{v.name}</code>
                              <code className="text-xs text-muted-foreground ml-2 truncate max-w-[150px]">{v.value}</code>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <pre className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono overflow-x-auto whitespace-pre max-h-[400px] overflow-y-auto">
                  {cssOutput || "/* Extracted CSS will appear here */"}
                </pre>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(cssOutput, "CSS Variables")}
                  disabled={!cssOutput}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <Button
                className="w-full"
                onClick={() => copyToClipboard(cssOutput, "CSS Variables")}
                disabled={!cssOutput}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy CSS Variables
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">About CSS Variables</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              CSS custom properties (also known as CSS variables) are entities defined by CSS authors that contain
              specific values to be reused throughout a document. They are set using custom property notation
              (e.g., <code>--main-color: #6366f1;</code>) and accessed using the <code>var()</code> function.
            </p>
            <p>
              CSS variables enable you to reuse values, make global changes easily, and create more maintainable
              stylesheets. They're particularly useful for design tokens, theming, and consistent styling.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Benefits of CSS Variables</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Reusability</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Define once, use everywhere. Change a value in one place and it updates throughout your entire stylesheet.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Theming</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Easily create light/dark modes or brand variations by overriding variables in different contexts.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Maintainability</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Organize related values together. Makes large stylesheets easier to understand and modify.
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Usage Examples</h2>
          <Card>
            <CardContent className="pt-6">
              <pre className="p-4 bg-muted rounded-lg text-sm font-mono overflow-x-auto">
                {`/* Define variables */
:root {
  --primary: #6366f1;
  --spacing-md: 16px;
}

/* Use variables */
.button {
  background: var(--primary);
  padding: var(--spacing-md);
}

/* Override in context */
.dark-mode {
  --primary: #818cf8;
}`}
              </pre>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
