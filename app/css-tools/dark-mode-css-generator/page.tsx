"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export default function DarkModeCssGeneratorPage() {
  const [lightBg, setLightBg] = useState("#ffffff");
  const [lightText, setLightText] = useState("#1f2937");
  const [darkBg, setDarkBg] = useState("#1f2937");
  const [darkText, setDarkText] = useState("#f9fafb");
  const [primaryColor, setPrimaryColor] = useState("#6366f1");
  const [generateVariables, setGenerateVariables] = useState(true);
  const [generateClasses, setGenerateClasses] = useState(true);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [transitionDuration, setTransitionDuration] = useState(300);

  const generateCSS = () => {
    const lines: string[] = [];
    
    if (generateVariables) {
      lines.push("/* CSS Custom Properties for theming */");
      lines.push(":root {");
      lines.push(`  --bg-primary: ${lightBg};`);
      lines.push(`  --text-primary: ${lightText};`);
      lines.push(`  --color-primary: ${primaryColor};`);
      lines.push("}");
      lines.push("");
      lines.push("/* Dark mode overrides */");
      lines.push("@media (prefers-color-scheme: dark) {");
      lines.push("  :root {");
      lines.push(`    --bg-primary: ${darkBg};`);
      lines.push(`    --text-primary: ${darkText};`);
      lines.push("  }");
      lines.push("}");
      lines.push("");
    }
    
    if (generateClasses) {
      lines.push("/* Manual dark mode class */");
      lines.push(".dark {");
      lines.push(`  --bg-primary: ${darkBg};`);
      lines.push(`    --text-primary: ${darkText};`);
      lines.push("}");
      lines.push("");
    }
    
    lines.push("/* Base styles using variables */");
    lines.push("body {");
    lines.push("  background-color: var(--bg-primary);");
    lines.push("  color: var(--text-primary);");
    if (transitionEnabled) {
      lines.push(`  transition: background-color ${transitionDuration}ms ease, color ${transitionDuration}ms ease;`);
    }
    lines.push("}");
    lines.push("");
    
    lines.push("/* Example component */");
    lines.push(".card {");
    lines.push("  background-color: var(--bg-primary);");
    lines.push("  border: 1px solid var(--text-primary);");
    lines.push("  opacity: 0.1;");
    lines.push("}");
    lines.push("");
    
    lines.push("/* Links */");
    lines.push("a {");
    lines.push("  color: var(--color-primary);");
    lines.push("}");
    lines.push("");
    
    if (transitionEnabled) {
      lines.push("/* Smooth transitions for theme switching */");
      lines.push("* {");
      lines.push(`  transition: background-color ${transitionDuration}ms ease,`);
      lines.push(`    color ${transitionDuration}ms ease,`);
      lines.push(`    border-color ${transitionDuration}ms ease;`);
      lines.push("}");
    }
    
    return lines.join("\n");
  };

  const generateJS = () => {
    return `// JavaScript for manual dark mode toggle
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
  
  // Save preference
  const isDark = document.documentElement.classList.contains('dark');
  localStorage.setItem('darkMode', isDark);
}

// Check saved preference
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'true') {
  document.documentElement.classList.add('dark');
}

// Check system preference
if (!savedDarkMode && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark');
}`;
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
  const jsCode = generateJS();

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Dark Mode CSS Generator</h1>
        <p className="text-muted-foreground">
          Generate CSS for dark mode support using prefers-color-scheme and manual toggle. Create theme-aware stylesheets.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Light Mode Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Background</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input type="color" value={lightBg} onChange={(e) => setLightBg(e.target.value)} className="w-12 h-9" />
                  <Input type="text" value={lightBg} onChange={(e) => setLightBg(e.target.value)} className="font-mono text-sm" />
                </div>
              </div>
              <div>
                <Label>Text Color</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input type="color" value={lightText} onChange={(e) => setLightText(e.target.value)} className="w-12 h-9" />
                  <Input type="text" value={lightText} onChange={(e) => setLightText(e.target.value)} className="font-mono text-sm" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dark Mode Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Background</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input type="color" value={darkBg} onChange={(e) => setDarkBg(e.target.value)} className="w-12 h-9" />
                  <Input type="text" value={darkBg} onChange={(e) => setDarkBg(e.target.value)} className="font-mono text-sm" />
                </div>
              </div>
              <div>
                <Label>Text Color</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input type="color" value={darkText} onChange={(e) => setDarkText(e.target.value)} className="w-12 h-9" />
                  <Input type="text" value={darkText} onChange={(e) => setDarkText(e.target.value)} className="font-mono text-sm" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Primary/Accent Color</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-12 h-9" />
                  <Input type="text" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="font-mono text-sm" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label>Generate CSS Variables</Label>
                <Switch checked={generateVariables} onCheckedChange={setGenerateVariables} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Generate .dark Class</Label>
                <Switch checked={generateClasses} onCheckedChange={setGenerateClasses} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Enable Transitions</Label>
                <Switch checked={transitionEnabled} onCheckedChange={setTransitionEnabled} />
              </div>
              {transitionEnabled && (
                <div>
                  <Label>Transition Duration: {transitionDuration}ms</Label>
                  <Slider value={[transitionDuration]} onValueChange={([v]) => setTransitionDuration(v)} min={100} max={1000} step={50} className="mt-2" />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Presets</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setLightBg("#ffffff");
                  setLightText("#1f2937");
                  setDarkBg("#1f2937");
                  setDarkText("#f9fafb");
                }}
              >
                Classic Light/Dark
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setLightBg("#fafafa");
                  setLightText("#262626");
                  setDarkBg("#0a0a0a");
                  setDarkText("#a3a3a3");
                }}
              >
                High Contrast
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setLightBg("#fefefe");
                  setLightText("#334155");
                  setDarkBg("#0f172a");
                  setDarkText("#cbd5e1");
                }}
              >
                Slate Theme
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setLightBg("#fffbeb");
                  setLightText("#451a03");
                  setDarkBg("#451a03");
                  setDarkText("#fef3c7");
                }}
              >
                Warm Amber
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className="p-6 rounded-lg"
                  style={{ backgroundColor: lightBg, color: lightText }}
                >
                  <h3 className="text-lg font-semibold mb-2">Light Mode Preview</h3>
                  <p className="text-sm mb-3">Background: {lightBg} | Text: {lightText}</p>
                  <button
                    className="px-4 py-2 rounded text-white text-sm"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Primary Button
                  </button>
                </div>
                <div
                  className="p-6 rounded-lg"
                  style={{ backgroundColor: darkBg, color: darkText }}
                >
                  <h3 className="text-lg font-semibold mb-2">Dark Mode Preview</h3>
                  <p className="text-sm mb-3">Background: {darkBg} | Text: {darkText}</p>
                  <button
                    className="px-4 py-2 rounded text-white text-sm"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Primary Button
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <pre className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono overflow-x-auto whitespace-pre max-h-[300px] overflow-y-auto">
                  {cssCode}
                </pre>
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(cssCode, "Dark Mode CSS")}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>JavaScript Toggle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <pre className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono overflow-x-auto whitespace-pre max-h-[200px] overflow-y-auto">
                  {jsCode}
                </pre>
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(jsCode, "JavaScript Code")}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <Button className="w-full" onClick={() => copyToClipboard(`${cssCode}\n\n${jsCode}`, "Complete Code")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Complete Code
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">About Dark Mode</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              Dark mode has become an expected feature in modern websites and applications. It reduces eye strain 
              in low-light conditions, saves battery on OLED screens, and provides users with choice over their 
              viewing experience.
            </p>
            <p>
              CSS dark mode can be implemented using the <code>prefers-color-scheme</code> media query for 
              automatic system-based switching, or with CSS custom properties and JavaScript for manual toggle 
              functionality.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Implementation Approaches</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Preference</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Uses <code>@media (prefers-color-scheme: dark)</code> to automatically match the user's 
                system settings. No JavaScript required, respects user's OS-level preference.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Manual Toggle</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Uses a <code>.dark</code> class on the document root with JavaScript toggle. Gives users 
                explicit control and can persist preference across sessions.
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Dark Mode Tips</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Don't use pure black:</strong> Use dark gray (#1f2937) to reduce eye strain</li>
                <li><strong>Adjust contrast:</strong> Dark mode needs different contrast ratios than light mode</li>
                <li><strong>Test colors:</strong> Some colors that look good in light mode may vibrate in dark mode</li>
                <li><strong>Smooth transitions:</strong> Add transitions for pleasant theme switching</li>
                <li><strong>Save preference:</strong> Use localStorage to remember user's choice</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
