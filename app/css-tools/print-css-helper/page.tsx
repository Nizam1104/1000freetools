"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export default function PrintCssHelperPage() {
  const [includeReset, setIncludeReset] = useState(true);
  const [hideNavigation, setHideNavigation] = useState(true);
  const [hideButtons, setHideButtons] = useState(true);
  const [hideSidebar, setHideSidebar] = useState(true);
  const [ensureColors, setEnsureColors] = useState(true);
  const [optimizeFonts, setOptimizeFonts] = useState(true);
  const [addPageBreaks, setAddPageBreaks] = useState(true);
  const [showUrls, setShowUrls] = useState(false);
  const [paperSize, setPaperSize] = useState<"letter" | "a4">("letter");
  const [margins, setMargins] = useState("0.5in");

  const generateCSS = () => {
    const lines: string[] = [];
    
    lines.push("@print {");
    lines.push("");
    
    // Page setup
    lines.push("  @page {");
    lines.push(`    size: ${paperSize};`);
    lines.push(`    margin: ${margins};`);
    lines.push("  }");
    lines.push("");
    
    // Body styles
    lines.push("  body {");
    if (optimizeFonts) {
      lines.push("    font-size: 12pt;");
      lines.push("    font-family: Georgia, serif;");
      lines.push("    line-height: 1.5;");
      lines.push("    color: #000;");
    }
    if (ensureColors) {
      lines.push("    background: #fff !important;");
    }
    lines.push("  }");
    lines.push("");
    
    // Color adjustments
    if (ensureColors) {
      lines.push("  /* Ensure black text on white background */");
      lines.push("  * {");
      lines.push("    background: #fff !important;");
      lines.push("    color: #000 !important;");
      lines.push("    box-shadow: none !important;");
      lines.push("  }");
      lines.push("");
      
      lines.push("  /* Make links distinguishable */");
      lines.push("  a, a:visited {");
      lines.push("    color: #000;");
      lines.push("    text-decoration: underline;");
      lines.push("  }");
      lines.push("");
      
      if (showUrls) {
        lines.push("  /* Show URLs for links */");
        lines.push("  a[href]::after {");
        lines.push("    content: \" (\" attr(href) \")\";");
        lines.push("  }");
        lines.push("");
      }
    }
    
    // Hidden elements
    const hiddenSelectors: string[] = [];
    if (hideNavigation) hiddenSelectors.push("nav", ".nav", ".navigation", "header");
    if (hideButtons) hiddenSelectors.push("button", ".btn", ".button", "[role=\"button\"]");
    if (hideSidebar) hiddenSelectors.push("aside", ".sidebar", ".side-nav");
    
    if (hiddenSelectors.length > 0) {
      lines.push("  /* Hide non-essential elements */");
      lines.push(`  ${hiddenSelectors.join(", ")} {`);
      lines.push("    display: none !important;");
      lines.push("  }");
      lines.push("");
    }
    
    // Page breaks
    if (addPageBreaks) {
      lines.push("  /* Prevent awkward page breaks */");
      lines.push("  h1, h2, h3, h4, h5, h6 {");
      lines.push("    page-break-after: avoid;");
      lines.push("    page-break-inside: avoid;");
      lines.push("  }");
      lines.push("");
      
      lines.push("  img, figure, table {");
      lines.push("    page-break-inside: avoid;");
      lines.push("  }");
      lines.push("");
      
      lines.push("  pre, code {");
      lines.push("    page-break-inside: avoid;");
      lines.push("    white-space: pre-wrap;");
      lines.push("    word-wrap: break-word;");
      lines.push("  }");
      lines.push("");
    }
    
    // Images
    lines.push("  /* Image adjustments */");
    lines.push("  img {");
    lines.push("    max-width: 100% !important;");
    lines.push("    height: auto;");
    lines.push("  }");
    lines.push("");
    
    // Tables
    lines.push("  /* Table styling */");
    lines.push("  table {");
    lines.push("    border-collapse: collapse;");
    lines.push("    width: 100%;");
    lines.push("  }");
    lines.push("");
    
    lines.push("  th, td {");
    lines.push("    border: 1px solid #000;");
    lines.push("    padding: 8px;");
    lines.push("  }");
    lines.push("");
    
    // Utility classes
    lines.push("  /* Print utilities */");
    lines.push("  .no-print {");
    lines.push("    display: none !important;");
    lines.push("  }");
    lines.push("");
    lines.push("  .print-only {");
    lines.push("    display: block !important;");
    lines.push("  }");
    
    lines.push("}");
    
    return lines.join("\n");
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const cssCode = generateCSS();

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Print CSS Helper</h1>
        <p className="text-muted-foreground">
          Generate @print media query boilerplate for printer-friendly stylesheets. Optimize your website for printing.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Page Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Paper Size</Label>
                <Select value={paperSize} onValueChange={(v) => setPaperSize(v as typeof paperSize)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="letter">Letter (8.5" × 11")</SelectItem>
                    <SelectItem value="a4">A4 (210mm × 297mm)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Page Margins</Label>
                <Select value={margins} onValueChange={setMargins}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.25in">Minimal (0.25")</SelectItem>
                    <SelectItem value="0.5in">Default (0.5")</SelectItem>
                    <SelectItem value="0.75in">Large (0.75")</SelectItem>
                    <SelectItem value="1in">Extra Large (1")</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Hide Navigation</Label>
                  <p className="text-xs text-muted-foreground">Remove nav, header elements</p>
                </div>
                <Switch checked={hideNavigation} onCheckedChange={setHideNavigation} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Hide Buttons</Label>
                  <p className="text-xs text-muted-foreground">Remove interactive elements</p>
                </div>
                <Switch checked={hideButtons} onCheckedChange={setHideButtons} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Hide Sidebar</Label>
                  <p className="text-xs text-muted-foreground">Remove aside, sidebar</p>
                </div>
                <Switch checked={hideSidebar} onCheckedChange={setHideSidebar} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Show Link URLs</Label>
                  <p className="text-xs text-muted-foreground">Append href after links</p>
                </div>
                <Switch checked={showUrls} onCheckedChange={setShowUrls} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Styling Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Reset Background</Label>
                  <p className="text-xs text-muted-foreground">White bg, black text</p>
                </div>
                <Switch checked={ensureColors} onCheckedChange={setEnsureColors} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Optimize Fonts</Label>
                  <p className="text-xs text-muted-foreground">Print-friendly typography</p>
                </div>
                <Switch checked={optimizeFonts} onCheckedChange={setOptimizeFonts} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Add Page Break Rules</Label>
                  <p className="text-xs text-muted-foreground">Prevent awkward breaks</p>
                </div>
                <Switch checked={addPageBreaks} onCheckedChange={setAddPageBreaks} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom CSS</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add additional print styles here..."
                className="min-h-[100px] font-mono text-sm"
              />
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Print Preview Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">How to Test</h4>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Press Ctrl+P (Cmd+P on Mac)</li>
                  <li>Select "Save as PDF" or your printer</li>
                  <li>Check the preview to see print styles</li>
                  <li>Look for proper margins and formatting</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <pre className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono overflow-x-auto whitespace-pre max-h-[500px] overflow-y-auto">
                  {cssCode}
                </pre>
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(cssCode, "Print CSS")}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <Button className="w-full" onClick={() => copyToClipboard(cssCode, "Print CSS")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Print CSS
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="p-3 bg-muted rounded">
                <strong>Option 1:</strong> Add to existing CSS file
                <pre className="mt-2 p-2 bg-background rounded text-xs font-mono">@print {'{'} /* ... */ {'}'}</pre>
              </div>
              <div className="p-3 bg-muted rounded">
                <strong>Option 2:</strong> Create separate print.css
                <pre className="mt-2 p-2 bg-background rounded text-xs font-mono">&lt;link rel="stylesheet" media="print" href="print.css"&gt;</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">About Print Stylesheets</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              Print stylesheets optimize your website for printing by removing unnecessary elements, 
              adjusting typography for readability on paper, and ensuring content fits properly on pages.
            </p>
            <p>
              The <code>@print</code> media query contains styles that only apply when printing or 
              viewing print preview. This is essential for creating professional printed documents 
              from web pages.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Print Best Practices</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hide Non-Essential Elements</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Remove navigation, buttons, ads, and other interactive elements that don't make sense 
                in print. Focus on the main content.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Optimize Colors</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Use high contrast (black on white) to save ink and improve readability. Remove 
                background colors and images.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Adjust Typography</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Use print-friendly fonts (serif often works better), increase font size slightly, 
                and ensure proper line height.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Control Page Breaks</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Prevent awkward breaks in headings, images, and tables. Use page-break-inside: avoid 
                to keep elements together.
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Print Utilities</h2>
          <Card>
            <CardContent className="pt-6">
              <pre className="p-4 bg-muted rounded-lg text-sm font-mono overflow-x-auto">
{`/* Add to HTML for print-specific content */
&lt;div class="no-print"&gt;Hidden when printing&lt;/div&gt;
&lt;div class="print-only"&gt;Only visible when printing&lt;/div&gt;

/* Add print button to trigger printing */
&lt;button onclick="window.print()"&gt;Print Page&lt;/button&gt;`}
              </pre>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
