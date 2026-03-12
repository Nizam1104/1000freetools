"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Copy, Trash2 } from "lucide-react";

interface Specificity {
  a: number; // ID selectors
  b: number; // Class, attribute, pseudo-class selectors
  c: number; // Type, pseudo-element selectors
}

export default function CssSpecificityCalculatorPage() {
  const [selector, setSelector] = useState("");
  const [history, setHistory] = useState<{ selector: string; specificity: Specificity }[]>([]);

  const calculateSpecificity = (sel: string): Specificity => {
    let a = 0, b = 0, c = 0;

    // Remove :not(), :is(), :where() content but count their contents
    const notMatches = sel.match(/:not\(([^)]+)\)/g);
    if (notMatches) {
      notMatches.forEach((match) => {
        const inner = match.replace(/:not\(|\)/g, "");
        const innerSpec = calculateSpecificity(inner);
        a += innerSpec.a;
        b += innerSpec.b;
        c += innerSpec.c;
      });
    }
    sel = sel.replace(/:not\([^)]+\)/g, "");

    // Count IDs (#id)
    const ids = sel.match(/#[a-zA-Z_-][a-zA-Z0-9_-]*/g);
    if (ids) a += ids.length;

    // Count classes (.class)
    const classes = sel.match(/\.[a-zA-Z_-][a-zA-Z0-9_-]*/g);
    if (classes) b += classes.length;

    // Count attribute selectors ([attr], [attr=value], etc.)
    const attributes = sel.match(/\[[^\]]+\]/g);
    if (attributes) b += attributes.length;

    // Count pseudo-classes (:hover, :focus, etc.) but not pseudo-elements
    const pseudoClasses = sel.match(/:(?!:)[a-zA-Z-]+(\([^)]*\))?/g);
    if (pseudoClasses) {
      const excluded = [":before", ":after", ":first-line", ":first-letter"];
      const filtered = pseudoClasses.filter((p) => !excluded.includes(p.split("(")[0]));
      b += filtered.length;
    }

    // Count pseudo-elements (::before, ::after, etc.)
    const pseudoElements = sel.match(/::?[a-zA-Z-]+/g);
    if (pseudoElements) {
      const onlyPseudoElements = pseudoElements.filter((p) =>
        p.startsWith("::") || [":before", ":after", ":first-line", ":first-letter"].includes(p)
      );
      c += onlyPseudoElements.length;
    }

    // Count type selectors (element names)
    const cleaned = sel
      .replace(/#[a-zA-Z_-][a-zA-Z0-9_-]*/g, "") // Remove IDs
      .replace(/\.[a-zA-Z_-][a-zA-Z0-9_-]*/g, "") // Remove classes
      .replace(/\[[^\]]+\]/g, "") // Remove attributes
      .replace(/::?[a-zA-Z-]+(\([^)]*\))?/g, ""); // Remove pseudo-classes/elements
    const types = cleaned.match(/\b[a-zA-Z][a-zA-Z0-9-]*\b/g);
    if (types) c += types.length;

    return { a, b, c };
  };

  const specificity = useMemo(() => {
    if (!selector.trim()) return { a: 0, b: 0, c: 0 };
    return calculateSpecificity(selector);
  }, [selector]);

  const specificityString = `(${specificity.a}, ${specificity.b}, ${specificity.c})`;

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const addToHistory = () => {
    if (!selector.trim()) {
      toast.error("Please enter a selector");
      return;
    }
    setHistory([...history, { selector, specificity: { ...specificity } }]);
    toast.success("Added to history");
  };

  const clearHistory = () => {
    setHistory([]);
    toast.info("History cleared");
  };

  return (
    <div className="w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSS Specificity Calculator</h1>
        <p className="text-muted-foreground">
          Calculate the specificity of CSS selectors to understand cascade priority.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>CSS Selector</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Enter Selector</Label>
                <Input
                  value={selector}
                  onChange={(e) => setSelector(e.target.value)}
                  placeholder="e.g., #header .nav ul li a:hover"
                  className="mt-2 font-mono"
                />
              </div>

              <Button onClick={addToHistory} className="w-full">
                Add to History
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Understanding Specificity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    A
                  </div>
                  <div>
                    <p className="font-semibold">ID Selectors</p>
                    <p className="text-muted-foreground">#header, #main, etc.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-secondary text-secondary-foreground flex items-center justify-center font-bold">
                    B
                  </div>
                  <div>
                    <p className="font-semibold">Classes, Attributes, Pseudo-classes</p>
                    <p className="text-muted-foreground">.btn, [type="text"], :hover</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-muted text-muted-foreground flex items-center justify-center font-bold">
                    C
                  </div>
                  <div>
                    <p className="font-semibold">Elements, Pseudo-elements</p>
                    <p className="text-muted-foreground">div, p, ::before</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Specificity Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold font-mono mb-2">{specificityString}</div>
                <p className="text-muted-foreground">
                  ID: {specificity.a} | Classes: {specificity.b} | Elements: {specificity.c}
                </p>
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <div className="h-4 bg-primary rounded-l" style={{ width: `${Math.min(100, specificity.a * 33)}%` }} />
                  <p className="text-center text-sm mt-1">IDs ({specificity.a})</p>
                </div>
                <div className="flex-1">
                  <div className="h-4 bg-secondary" style={{ width: `${Math.min(100, specificity.b * 10)}%` }} />
                  <p className="text-center text-sm mt-1">Classes ({specificity.b})</p>
                </div>
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded-r" style={{ width: `${Math.min(100, specificity.c * 10)}%` }} />
                  <p className="text-center text-sm mt-1">Elements ({specificity.c})</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => copyToClipboard(`${selector} { } /* Specificity: ${specificityString} */`, "Selector")}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Selector
                </Button>
              </div>
            </CardContent>
          </Card>

          {history.length > 0 && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>History</CardTitle>
                <Button variant="ghost" size="sm" onClick={clearHistory}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {history.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <code className="text-sm font-mono flex-1">{item.selector}</code>
                      <span className="text-sm font-mono ml-4">
                        ({item.specificity.a},{item.specificity.b},{item.specificity.c})
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">How Specificity Works</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              CSS specificity determines which styles are applied when multiple rules target the same element.
              It's calculated as a three-part value (A, B, C) representing different selector types.
            </p>
            <p>
              Higher values take precedence. For example, (1, 0, 0) beats (0, 10, 10) because IDs (A) are more
              specific than classes (B) or elements (C).
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
