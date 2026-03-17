"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, BookOpen } from "lucide-react"

export function MarkdownCheatSheetGenerator() {
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [selectedSections, setSelectedSections] = useState<Record<string, boolean>>({
    headers: true,
    emphasis: true,
    lists: true,
    links: true,
    code: true,
    quotes: true,
    tables: true,
    images: true,
    tasks: true,
    other: true
  })

  const generateCheatSheet = useCallback((): string => {
    const sections: string[] = []

    if (selectedSections.headers) {
      sections.push(`## Headers

| Syntax | Description |
|--------|-------------|
| \`# Heading 1\` | Heading level 1 |
| \`## Heading 2\` | Heading level 2 |
| \`### Heading 3\` | Heading level 3 |
| \`#### Heading 4\` | Heading level 4 |
| \`##### Heading 5\` | Heading level 5 |
| \`###### Heading 6\` | Heading level 6 |

**Example:**
\`\`\`
# Main Title
## Section Title
### Subsection
\`\`\`
`)
    }

    if (selectedSections.emphasis) {
      sections.push(`## Emphasis

| Style | Syntax | Example |
|-------|--------|---------|
| **Bold** | \`**text**\` or \`__text__\` | **bold text** |
| *Italic* | \`*text*\` or \`_text_\` | *italic text* |
| ~~Strikethrough~~ | \`~~text~~\` | ~~deleted text~~ |
| \`Inline Code\` | \\\`\\\`code\\\`\\\` | \`code\` |

**Example:**
\`\`\`
This is **bold** and *italic* text.
This is ~~strikethrough~~ and \`inline code\`.
\`\`\`
`)
    }

    if (selectedSections.lists) {
      sections.push(`## Lists

### Unordered List
\`\`\`
- Item 1
- Item 2
  - Nested item
  - Another nested
* Alternative marker
+ Another alternative
\`\`\`

### Ordered List
\`\`\`
1. First item
2. Second item
3. Third item
\`\`\`

### Definition List
\`\`\`
Term 1
: Definition 1

Term 2
: Definition 2
\`\`\`
`)
    }

    if (selectedSections.links) {
      sections.push(`## Links

| Type | Syntax | Example |
|------|--------|---------|
| Inline | \`[text](url)\` | [Google](https://google.com) |
| With title | \`[text](url "title")\` | [Link](url "Tooltip") |
| Reference | \`[text][ref]\` + \`[ref]: url\` | See below |
| Autolink | \`<url>\` | <https://example.com> |

**Reference Example:**
\`\`\`
Check out [this link][1].

[1]: https://example.com "Example Site"
\`\`\`
`)
    }

    if (selectedSections.code) {
      sections.push(`## Code

### Inline Code
\`\`\`
Use \\\`\\\`backticks\\\`\\\` for inline code.
\`\`\`

### Code Blocks
\\\`\\\`\\\`language
function hello() {
  console.log("Hello, World!");
}
\\\`\\\`\\\`

### Supported Languages
- javascript, js
- python, py
- typescript, ts
- html, css
- json, yaml
- bash, sh
- And many more...
`)
    }

    if (selectedSections.quotes) {
      sections.push(`## Blockquotes

### Basic Quote
\`\`\`
> This is a quote.
> It can span multiple lines.
\`\`\`

### Nested Quotes
\`\`\`
> Outer quote
> > Inner quote
> > > Deeper nesting
\`\`\`

### Quote with Content
\`\`\`
> ## Quote with header
> This quote has **bold** and *italic*.
> - And a list item
\`\`\`
`)
    }

    if (selectedSections.tables) {
      sections.push(`## Tables

### Basic Table
\`\`\`
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
\`\`\`

### Alignment
\`\`\`
| Left | Center | Right |
|:-----|:------:|------:|
| L    | C      | R     |
\`\`\`

| Column | Description |
|--------|-------------|
| :---   | Left aligned |
| :---:  | Center aligned |
| ---:   | Right aligned |
`)
    }

    if (selectedSections.images) {
      sections.push(`## Images

### Basic Image
\`\`\`
![Alt text](image.png)
\`\`\`

### Image with Title
\`\`\`
![Alt text](image.png "Image title")
\`\`\`

### Linked Image
\`\`\`
[![Alt text](image.png)](https://example.com)
\`\`\`

### Image with Dimensions (HTML)
\`\`\`
<img src="image.png" alt="Alt text" width="200" height="100"/>
\`\`\`
`)
    }

    if (selectedSections.tasks) {
      sections.push(`## Task Lists

\`\`\`
- [ ] Incomplete task
- [x] Completed task
- [ ] Another task
  - [x] Nested completed
  - [ ] Nested incomplete
\`\`\`

**Rendered:**
- [ ] Incomplete task
- [x] Completed task
- [ ] Another task
  - [x] Nested completed
  - [ ] Nested incomplete
`)
    }

    if (selectedSections.other) {
      sections.push(`## Other Elements

### Horizontal Rule
\`\`\`
---
***
___
\`\`\`

### Line Break
End a line with two spaces for a line break.

### Escaping Characters
Use backslash to escape special characters:
\`\`\`
\\* Not italic \\*
\\# Not a header
\\[ Not a link
\`\`\`

### HTML in Markdown
You can use raw HTML:
\`\`\`
<details>
<summary>Click to expand</summary>
Hidden content
</details>
\`\`\`
`)
    }

    return `# Markdown Cheat Sheet

${sections.join('\n---\n\n')}`
  }, [selectedSections])

  const handleGenerate = useCallback(() => {
    const cheatSheet = generateCheatSheet()
    setOutput(cheatSheet)
  }, [generateCheatSheet])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setOutput("")
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/markdown" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "markdown-cheat-sheet.md"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const toggleSection = (section: string) => {
    setSelectedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Markdown Cheat Sheet Generator</h2>
            <p className="text-sm text-muted-foreground">
              Generate a comprehensive Markdown reference guide
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Label>Include Sections:</Label>
        {Object.entries(selectedSections).map(([key, value]) => (
          <Button
            key={key}
            variant={value ? "default" : "outline"}
            size="sm"
            onClick={() => toggleSection(key)}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={handleGenerate} className="flex-1">
          <BookOpen className="h-4 w-4 mr-2" />
          Generate Cheat Sheet
        </Button>
        <Button variant="outline" onClick={handleClear} title="Clear">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {output && (
        <div className="space-y-4">
          <Label htmlFor="output">Cheat Sheet</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            className="min-h-[600px] font-mono text-sm bg-muted"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleCopy} disabled={!output} className="flex-1">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button variant="outline" onClick={handleDownload} disabled={!output} title="Download">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
