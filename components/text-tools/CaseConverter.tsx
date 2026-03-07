"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

const CASE_CONVERSIONS = [
  { name: "UPPERCASE", fn: (text: string) => text.toUpperCase() },
  { name: "lowercase", fn: (text: string) => text.toLowerCase() },
  { name: "Title Case", fn: toTitleCase },
  { name: "Sentence case", fn: toSentenceCase },
  { name: "camelCase", fn: toCamelCase },
  { name: "PascalCase", fn: toPascalCase },
  { name: "snake_case", fn: toSnakeCase },
  { name: "kebab-case", fn: toKebabCase },
  { name: "SCREAMING_SNAKE_CASE", fn: toScreamingSnakeCase },
  { name: "aLtErNaTiNg CaSe", fn: toAlternatingCase },
];

function toTitleCase(text: string): string {
  return text.replace(/\w\S*/g, (txt) =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

function toSentenceCase(text: string): string {
  return text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
}

function toCamelCase(text: string): string {
  return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
    index === 0 ? word.toLowerCase() : word.toUpperCase()
  ).replace(/\s+/g, "");
}

function toPascalCase(text: string): string {
  return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) =>
    word.toUpperCase()
  ).replace(/\s+/g, "");
}

function toSnakeCase(text: string): string {
  return text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map(x => x.toLowerCase()).join('_') || text.toLowerCase().replace(/\s+/g, '_');
}

function toKebabCase(text: string): string {
  return text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map(x => x.toLowerCase()).join('-') || text.toLowerCase().replace(/\s+/g, '-');
}

function toScreamingSnakeCase(text: string): string {
  return toSnakeCase(text).toUpperCase();
}

function toAlternatingCase(text: string): string {
  let result = '';
  let upper = true;
  for (const char of text) {
    if (/[a-zA-Z]/.test(char)) {
      result += upper ? char.toUpperCase() : char.toLowerCase();
      upper = !upper;
    } else {
      result += char;
    }
  }
  return result;
}

export default function CaseConverter() {
  const [text, setText] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = useCallback((result: string, index: number) => {
    navigator.clipboard.writeText(result);
    setCopiedIndex(index);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);

  return (
    <div className="w-full">
      <div className="mb-6">
        <Label htmlFor="text-input" className="text-base font-medium block mb-2">
          Enter your text
        </Label>
        <Textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          className="min-h-[120px] max-h-[500px] overflow-y-auto font-mono text-sm"
        />
      </div>

      <div className="space-y-4">
        {CASE_CONVERSIONS.map((conversion, index) => {
          const result = text ? conversion.fn(text) : "";
          return (
            <div key={conversion.name} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm text-muted-foreground">{conversion.name}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(result, index)}
                  disabled={!result}
                >
                  {copiedIndex === index ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copiedIndex === index ? "Copied" : "Copy"}
                </Button>
              </div>
              <div className="bg-muted rounded p-3 min-h-[40px] max-h-[200px] overflow-y-auto text-sm font-mono break-all">
                {result || <span className="text-muted-foreground">Result will appear here</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
