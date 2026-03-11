"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function UnicodeCaseConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [caseType, setCaseType] = useState<"upper" | "lower" | "title" | "sentence" | "fold">("upper");
  const [locale, setLocale] = useState("en-US");

  const convertCase = (text: string, type: string) => {
    switch (type) {
      case "upper":
        return text.toLocaleUpperCase(locale);
      case "lower":
        return text.toLocaleLowerCase(locale);
      case "title":
        return text.replace(/\w\S*/g, (txt) => 
          txt.charAt(0).toLocaleUpperCase(locale) + txt.substr(1).toLocaleLowerCase(locale)
        );
      case "sentence":
        return text.replace(/([.!?]\s*)(\w)/g, (match, space, char) => 
          space + char.toLocaleUpperCase(locale)
        ).charAt(0).toLocaleUpperCase(locale) + text.slice(1).toLocaleLowerCase(locale);
      case "fold":
        // Case folding for case-insensitive comparison
        return text.toLocaleLowerCase(locale);
      default:
        return text;
    }
  };

  const handleConvert = () => {
    if (!input) return;
    setOutput(convertCase(input, caseType));
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
        <h2 className="text-2xl font-bold">Unicode Case Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert text between uppercase, lowercase, title case, and other Unicode case mappings
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {([
              { value: "upper", label: "UPPERCASE" },
              { value: "lower", label: "lowercase" },
              { value: "title", label: "Title Case" },
              { value: "sentence", label: "Sentence case" },
              { value: "fold", label: "Case Fold" },
            ] as const).map((c) => (
              <Button
                key={c.value}
                variant={caseType === c.value ? "default" : "outline"}
                size="sm"
                onClick={() => setCaseType(c.value)}
              >
                {c.label}
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="locale">Locale</Label>
            <select
              id="locale"
              value={locale}
              onChange={(e) => setLocale(e.target.value)}
              className="w-full p-2 rounded-md border border-input bg-background"
            >
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="de-DE">German</option>
              <option value="fr-FR">French</option>
              <option value="es-ES">Spanish</option>
              <option value="tr-TR">Turkish</option>
              <option value="el-GR">Greek</option>
              <option value="ru-RU">Russian</option>
              <option value="ja-JP">Japanese</option>
              <option value="zh-CN">Chinese (Simplified)</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">Text Input</Label>
            <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to convert..."
              className="w-full min-h-[100px] p-3 rounded-md border border-input"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!input} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Convert
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleConvert} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Convert
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!input}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {output && (
        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <Label className="text-sm text-muted-foreground">Output</Label>
              <p className="mt-2 whitespace-pre-wrap">{output}</p>
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
        <h3 className="font-semibold mb-2">Case Conversion Notes</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p><strong>Locale-aware:</strong> Different languages have different case rules</p>
          <p><strong>Turkish I:</strong> Turkish has dotted and dotless I (İ/ı vs I/i)</p>
          <p><strong>Greek Sigma:</strong> Greek has special final sigma (ς) in lowercase</p>
          <p><strong>German ß:</strong> German sharp S becomes SS in uppercase</p>
        </div>
      </Card>
    </div>
  );
}
