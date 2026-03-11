"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, Trash2, Code } from "lucide-react"

type Language = "javascript" | "python" | "java" | "c" | "html" | "css" | "sql" | "shell"

export default function CommentStripper() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [language, setLanguage] = useState<Language>("javascript")
  const [copied, setCopied] = useState<string | null>(null)

  const stripComments = useCallback(() => {
    let result = input
    
    switch (language) {
      case "javascript":
      case "java":
      case "c":
        // Remove single-line comments (//)
        result = result.replace(/\/\/.*$/gm, "")
        // Remove multi-line comments (/* */)
        result = result.replace(/\/\*[\s\S]*?\*\//g, "")
        break
      
      case "python":
      case "shell":
        // Remove single-line comments (#)
        result = result.replace(/#.*$/gm, "")
        // Remove triple-quoted strings (docstrings in Python)
        result = result.replace(/"""[\s\S]*?"""/g, "")
        result = result.replace(/'''[\s\S]*?'''/g, "")
        break
      
      case "html":
        // Remove HTML comments
        result = result.replace(/<!--[\s\S]*?-->/g, "")
        break
      
      case "css":
        // Remove CSS comments
        result = result.replace(/\/\*[\s\S]*?\*\//g, "")
        break
      
      case "sql":
        // Remove SQL comments (-- and /* */)
        result = result.replace(/--.*$/gm, "")
        result = result.replace(/\/\*[\s\S]*?\*\//g, "")
        result = result.replace(/#.*$/gm, "") // MySQL style
        break
    }
    
    // Clean up empty lines created by comment removal
    result = result.replace(/^\s*\n/gm, "\n")
    result = result.replace(/\n{3,}/g, "\n\n")
    result = result.trim()
    
    setOutput(result)
  }, [input, language])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const stats = useMemo(() => {
    const removed = input.length - output.length
    const percentage = input.length > 0 ? Math.round((removed / input.length) * 100) : 0
    return { removed, percentage, inputLength: input.length, outputLength: output.length }
  }, [input, output])

  const languages: { value: Language; label: string; commentStyles: string[] }[] = [
    { value: "javascript", label: "JavaScript", commentStyles: ["//", "/* */"] },
    { value: "python", label: "Python", commentStyles: ["#", '"""', "'''"] },
    { value: "java", label: "Java", commentStyles: ["//", "/* */"] },
    { value: "c", label: "C/C++", commentStyles: ["//", "/* */"] },
    { value: "html", label: "HTML", commentStyles: ["<!-- -->"] },
    { value: "css", label: "CSS", commentStyles: ["/* */"] },
    { value: "sql", label: "SQL", commentStyles: ["--", "/* */", "#"] },
    { value: "shell", label: "Shell", commentStyles: ["#"] },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Language Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Programming Language</Label>
        <Tabs value={language} onValueChange={(v) => setLanguage(v as Language)}>
          <TabsList className="w-full justify-start flex-wrap h-auto p-1 gap-1 bg-transparent">
            {languages.map((lang) => (
              <TabsTrigger
                key={lang.value}
                value={lang.value}
                className="text-xs px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {lang.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Code className="size-4" />
          <span>
            Comment styles:{" "}
            {languages.find(l => l.value === language)?.commentStyles.join(", ")}
          </span>
        </div>
      </section>

      {/* Input/Output */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="input-code" className="text-base font-medium">
              Code with Comments
            </Label>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(input, "input")}
                className="h-7"
                disabled={!input}
              >
                {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              </Button>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setInput("")}
                className="h-7"
                disabled={!input}
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </div>
          <Textarea
            id="input-code"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="font-mono text-sm min-h-[300px]"
            placeholder="Paste code with comments..."
          />
          <div className="text-xs text-muted-foreground">
            {stats.inputLength} characters
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="output-code" className="text-base font-medium">
              Code without Comments
            </Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(output, "output")}
              className="h-7"
              disabled={!output}
            >
              {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            </Button>
          </div>
          <Textarea
            id="output-code"
            value={output}
            readOnly
            className="font-mono text-sm min-h-[300px] bg-muted/30"
            placeholder="Cleaned code will appear here..."
          />
          <div className="text-xs text-muted-foreground">
            {stats.outputLength} characters
            {stats.percentage > 0 && (
              <span className="text-green-600 dark:text-green-400 ml-2">
                (-{stats.percentage}%, {stats.removed} chars removed)
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Action Button */}
      <Button onClick={stripComments} className="w-full sm:w-auto" size="lg">
        Strip Comments
      </Button>

      {/* Sample Code */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Sample Code</h3>
        <button
          onClick={() => {
            if (language === "python") {
              setInput(`# This is a comment
def hello():
    """Docstring comment"""
    print("Hello")  # Inline comment
`)
            } else if (language === "html") {
              setInput(`<!-- Header comment -->
<div>
  <!-- Navigation -->
  <nav>Links</nav>
  <!-- Main content -->
  <main>Content</main>
</div>
`)
            } else {
              setInput(`// Single line comment
function example() {
  /* Multi-line
     comment */
  return true; // Inline comment
}
`)
            }
          }}
          className="w-full text-left rounded-lg border bg-background p-3 hover:bg-muted/50 transition-colors"
        >
          <code className="text-xs font-mono block">
            {language === "python" ? `# This is a comment...` : 
             language === "html" ? `<!-- Header comment -->...` :
             `// Single line comment...`}
          </code>
          <span className="text-xs text-muted-foreground">Click to load sample {language} code</span>
        </button>
      </section>
    </div>
  )
}
