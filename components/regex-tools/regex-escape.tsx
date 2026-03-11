"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Copy, Check, Trash2 } from "lucide-react"

type Language = "javascript" | "python" | "php" | "java" | "csharp" | "generic"

export default function RegexEscapeTool() {
  const [input, setInput] = useState<string>("")
  const [language, setLanguage] = useState<Language>("javascript")
  const [copied, setCopied] = useState<string | null>(null)

  const escapeRegex = useCallback((str: string, lang: Language): string => {
    // First escape all regex special characters
    const escaped = str.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
    
    switch (lang) {
      case "javascript":
        // JavaScript: escape backslashes and quotes for string literal
        return escaped
          .replace(/\\/g, "\\\\")
          .replace(/'/g, "\\'")
          .replace(/"/g, '\\"')
          .replace(/\n/g, "\\n")
          .replace(/\r/g, "\\r")
          .replace(/\t/g, "\\t")
      
      case "python":
        // Python: use raw string
        return "r'" + escaped.replace(/'/g, "\\'") + "'"
      
      case "php":
        // PHP: escape for double-quoted string
        return "'" + escaped.replace(/'/g, "\\'") + "'"
      
      case "java":
        // Java: escape backslashes and quotes
        return "\"" + escaped
          .replace(/\\/g, "\\\\")
          .replace(/"/g, "\\\"")
          .replace(/\n/g, "\\n")
          .replace(/\r/g, "\\r")
          .replace(/\t/g, "\\t") + "\""
      
      case "csharp":
        // C#: use verbatim string
        return "@\"" + escaped.replace(/"/g, "\"\"") + "\""
      
      case "generic":
      default:
        return escaped
    }
  }, [])

  const escapedOutput = useMemo(() => {
    if (!input) return ""
    return escapeRegex(input, language)
  }, [input, language, escapeRegex])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const specialChars = [
    { char: "\\", name: "Backslash", escaped: "\\\\" },
    { char: "^", name: "Caret", escaped: "\\^" },
    { char: "$", name: "Dollar", escaped: "\\$" },
    { char: ".", name: "Dot", escaped: "\\." },
    { char: "*", name: "Asterisk", escaped: "\\*" },
    { char: "+", name: "Plus", escaped: "\\+" },
    { char: "?", name: "Question", escaped: "\\?" },
    { char: "(", name: "Opening Paren", escaped: "\\(" },
    { char: ")", name: "Closing Paren", escaped: "\\)" },
    { char: "[", name: "Opening Bracket", escaped: "\\[" },
    { char: "]", name: "Closing Bracket", escaped: "\\]" },
    { char: "{", name: "Opening Brace", escaped: "\\{" },
    { char: "}", name: "Closing Brace", escaped: "\\}" },
    { char: "|", name: "Pipe", escaped: "\\|" },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input-text" className="text-base font-medium">
            Input Text
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(input, "input")}
              className="h-7"
              disabled={!input}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setInput("")}
              className="h-7"
              disabled={!input}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>
        
        <Textarea
          id="input-text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="font-mono text-sm min-h-[100px]"
          placeholder="Enter text to escape for regex (e.g., file paths, user input)..."
        />
      </section>

      {/* Language Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Output Language</Label>
        <Tabs value={language} onValueChange={(v) => setLanguage(v as Language)}>
          <TabsList className="w-full justify-start flex-wrap h-auto p-1 gap-1 bg-transparent">
            <TabsTrigger 
              value="generic" 
              className="text-xs px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Generic
            </TabsTrigger>
            <TabsTrigger 
              value="javascript"
              className="text-xs px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              JavaScript
            </TabsTrigger>
            <TabsTrigger 
              value="python"
              className="text-xs px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Python
            </TabsTrigger>
            <TabsTrigger 
              value="php"
              className="text-xs px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              PHP
            </TabsTrigger>
            <TabsTrigger 
              value="java"
              className="text-xs px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Java
            </TabsTrigger>
            <TabsTrigger 
              value="csharp"
              className="text-xs px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              C#
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </section>

      {/* Output Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="output-text" className="text-base font-medium">
            Escaped Output
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => copyToClipboard(escapedOutput, "output")}
            className="h-7"
            disabled={!escapedOutput}
          >
            {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            <span className="text-xs">Copy</span>
          </Button>
        </div>
        
        <Textarea
          id="output-text"
          value={escapedOutput}
          readOnly
          className="font-mono text-sm min-h-[100px] bg-muted/30"
          placeholder="Escaped output will appear here..."
        />
        
        {escapedOutput && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Length:</span>
            <span className="font-medium text-foreground">{escapedOutput.length} characters</span>
          </div>
        )}
      </section>

      {/* Special Characters Reference */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Special Characters Reference</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {specialChars.map((item) => (
            <div
              key={item.char}
              className="rounded-lg border bg-background p-2 text-sm"
            >
              <div className="flex items-center justify-between">
                <code className="font-mono text-muted-foreground">{item.char}</code>
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
              <div className="mt-1 font-mono text-xs text-primary">
                {item.escaped}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Usage Examples */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Usage Examples</h3>
        <div className="space-y-2">
          {[
            { input: "C:\\Program Files\\App", desc: "Windows file path" },
            { input: "user@example.com", desc: "Email address" },
            { input: "https://example.com/path?query=1", desc: "URL with query" },
            { input: "$100.00", desc: "Price with currency" },
          ].map((example, idx) => (
            <button
              key={idx}
              onClick={() => setInput(example.input)}
              className="w-full text-left rounded-lg border bg-background p-3 hover:bg-muted/50 transition-colors"
            >
              <div className="font-mono text-sm truncate">{example.input}</div>
              <div className="text-xs text-muted-foreground">{example.desc}</div>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
