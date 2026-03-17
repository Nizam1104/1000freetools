"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Terminal } from "lucide-react";

export default function CliMinifierGenerator() {
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState<"javascript" | "css" | "html" | "json">("javascript");
  const [cliCommand, setCliCommand] = useState("");
  const [copied, setCopied] = useState(false);

  const generateCli = useCallback(() => {
    const minified = input
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/.*$/gm, "")
      .replace(/\s+/g, " ")
      .replace(/\s*([{};:,])\s*/g, "$1")
      .trim();

    const commands: Record<string, string> = {
      javascript: `# Using terser (Node.js)
npx terser input.js -o output.js

# Using uglify-js
npx uglifyjs input.js -o output.js

# One-liner for quick minification
echo '${minified.substring(0, 100)}...' | npx terser

# With options
npx terser input.js -c -m -o output.js

# Minify multiple files
npx terser file1.js file2.js -o bundle.min.js`,
      css: `# Using cssnano (PostCSS)
npx postcss input.css -u cssnano -o output.min.css

# Using clean-css-cli
npx cleancss -o output.min.css input.css

# One-liner
cat input.css | npx cleancss > output.min.css`,
      html: `# Using html-minifier
npx html-minifier input.html -o output.min.html --collapse-whitespace --remove-comments

# With all optimizations
npx html-minifier input.html -o output.min.html \\
  --collapse-whitespace \\
  --remove-comments \\
  --minify-css \\
  --minify-js`,
      json: `# Using json-minify
npx json-minify input.json > output.min.json

# Using jq (compact output)
jq -c . input.json > output.min.json

# One-liner
cat input.json | jq -c > output.min.json`,
    };

    setCliCommand(commands[language]);
  }, [input, language]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(cliCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [cliCommand]);

  const generateScript = useCallback(() => {
    return `#!/bin/bash
# Minifier Script for ${language.toUpperCase()}

INPUT_FILE="\${1:-input.${language === "javascript" ? "js" : language}}"
OUTPUT_FILE="\${2:-output.min.${language === "javascript" ? "js" : language}}"

if [ ! -f "$INPUT_FILE" ]; then
    echo "Error: $INPUT_FILE not found"
    exit 1
fi

${language === "javascript" ? `
# Using terser
npx terser "$INPUT_FILE" -o "$OUTPUT_FILE"
echo "Minified $INPUT_FILE -> $OUTPUT_FILE"
` : language === "css" ? `
# Using clean-css
npx cleancss -o "$OUTPUT_FILE" "$INPUT_FILE"
echo "Minified $INPUT_FILE -> $OUTPUT_FILE"
` : language === "html" ? `
# Using html-minifier
npx html-minifier "$INPUT_FILE" -o "$OUTPUT_FILE" --collapse-whitespace --remove-comments
echo "Minified $INPUT_FILE -> $OUTPUT_FILE"
` : `
# Using jq for JSON
jq -c . "$INPUT_FILE" > "$OUTPUT_FILE"
echo "Minified $INPUT_FILE -> $OUTPUT_FILE"
`}

# Show file sizes
echo ""
echo "Original: $(wc -c < "$INPUT_FILE") bytes"
echo "Minified: $(wc -c < "$OUTPUT_FILE") bytes"
echo "Reduction: $(echo "scale=2; (1 - $(wc -c < "$OUTPUT_FILE") / $(wc -c < "$INPUT_FILE")) * 100" | bc)%"
`;
  }, [language]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Language</Label>
              <div className="flex gap-2 mt-2">
                {["javascript", "css", "html", "json"].map((lang) => (
                  <Button
                    key={lang}
                    size="sm"
                    variant={language === lang ? "default" : "outline"}
                    onClick={() => setLanguage(lang as typeof language)}
                  >
                    {lang.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="input">Sample Code (for generating commands)</Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste code to generate specific minification commands..."
                className="mt-1 h-48 font-mono text-sm"
              />
            </div>

            <Button onClick={generateCli} className="w-full">
              Generate CLI Commands
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CLI Commands</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cliCommand ? (
              <>
                <div className="relative">
                  <Label>Minification Commands</Label>
                  <Textarea
                    value={cliCommand}
                    readOnly
                    className="mt-1 font-mono text-xs h-64"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-8 right-2"
                    onClick={copyToClipboard}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>

                <div className="relative">
                  <Label>Bash Script</Label>
                  <Textarea
                    value={generateScript()}
                    readOnly
                    className="mt-1 font-mono text-xs h-48"
                  />
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Terminal className="w-12 h-12 mx-auto mb-4" />
                <p>Enter code and click "Generate CLI Commands"</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Popular Minification Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold">JavaScript</h4>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• terser</li>
                <li>• uglify-js</li>
                <li>• esbuild</li>
                <li>• swc</li>
              </ul>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold">CSS</h4>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• cssnano</li>
                <li>• clean-css</li>
                <li>• csso</li>
                <li>• lightningcss</li>
              </ul>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold">HTML</h4>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• html-minifier</li>
                <li>• html-minifier-terser</li>
                <li>• minify</li>
              </ul>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold">JSON</h4>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• jq</li>
                <li>• json-minify</li>
                <li>• jsonpack</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
