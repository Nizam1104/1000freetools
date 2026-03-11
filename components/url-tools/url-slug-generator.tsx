"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function UrlSlugGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [options, setOptions] = useState({
    lowercase: true,
    removeSpecial: true,
    replaceSpaces: true,
    separator: "-",
    maxLength: 60,
  });

  const generateSlug = (text: string) => {
    let slug = text;

    if (options.lowercase) {
      slug = slug.toLowerCase();
    }

    // Remove special characters
    if (options.removeSpecial) {
      slug = slug.replace(/[^\w\s-]/g, "");
    }

    // Replace spaces
    if (options.replaceSpaces) {
      slug = slug.replace(/[\s_]+/g, options.separator);
    }

    // Remove consecutive separators
    slug = slug.replace(new RegExp(`${options.separator}+`, "g"), options.separator);

    // Trim separators from ends
    slug = slug.replace(new RegExp(`^${options.separator}|${options.separator}$`, "g"), "");

    // Truncate to max length
    if (options.maxLength > 0 && slug.length > options.maxLength) {
      slug = slug.substring(0, options.maxLength);
      // Don't end with separator
      slug = slug.replace(new RegExp(`${options.separator}$`, "g"), "");
    }

    return slug;
  };

  const handleGenerate = () => {
    if (!input) return;
    setOutput(generateSlug(input));
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">URL Slug Generator</h2>
        <p className="text-sm text-muted-foreground">
          Convert page titles into URL-friendly slugs
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="lowercase"
                checked={options.lowercase}
                onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })}
                className="h-4 w-4"
              />
              <Label htmlFor="lowercase" className="text-sm">Lowercase</Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="removeSpecial"
                checked={options.removeSpecial}
                onChange={(e) => setOptions({ ...options, removeSpecial: e.target.checked })}
                className="h-4 w-4"
              />
              <Label htmlFor="removeSpecial" className="text-sm">Remove special chars</Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="replaceSpaces"
                checked={options.replaceSpaces}
                onChange={(e) => setOptions({ ...options, replaceSpaces: e.target.checked })}
                className="h-4 w-4"
              />
              <Label htmlFor="replaceSpaces" className="text-sm">Replace spaces</Label>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Label className="text-sm">Separator:</Label>
              <div className="flex gap-2">
                {["-", "_", "+", "."].map((sep) => (
                  <Button
                    key={sep}
                    variant={options.separator === sep ? "default" : "outline"}
                    size="sm"
                    onClick={() => setOptions({ ...options, separator: sep })}
                  >
                    {sep === " " ? "(space)" : sep}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="maxLength" className="text-sm">Max length:</Label>
              <Input
                id="maxLength"
                type="number"
                min="0"
                value={options.maxLength}
                onChange={(e) => setOptions({ ...options, maxLength: parseInt(e.target.value) || 0 })}
                className="w-20 h-8"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">Page Title or Text</Label>
            <Input
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="My Awesome Blog Post Title!"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleGenerate} disabled={!input} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Generate Slug
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleGenerate} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Generate
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!input}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {output && (
        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <Label className="text-sm text-muted-foreground">Generated Slug</Label>
              <div className="font-mono text-lg mt-1">/{output}</div>
              <div className="text-xs text-muted-foreground mt-1">
                Length: {output.length} characters
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                handleCopy();
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Examples</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between p-2 bg-muted rounded">
            <span>"Hello World!"</span>
            <span className="font-mono">hello-world</span>
          </div>
          <div className="flex justify-between p-2 bg-muted rounded">
            <span>"10 Tips for Better SEO"</span>
            <span className="font-mono">10-tips-for-better-seo</span>
          </div>
          <div className="flex justify-between p-2 bg-muted rounded">
            <span>"What's New in 2024?"</span>
            <span className="font-mono">whats-new-in-2024</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
