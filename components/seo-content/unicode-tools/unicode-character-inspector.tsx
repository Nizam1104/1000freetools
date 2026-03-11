import React from "react"

export default function UnicodeCharacterInspectorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Unicode Character Inspector Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste or type any text into the input field. Click Inspect to analyze each character. The tool displays a table with detailed Unicode properties for every character in your text.
          </p>
          <p>
            Each row shows the character itself, its code point in U+XXXX format, the official Unicode name, general category (letter, number, symbol, etc.), and the Unicode block it belongs to. This reveals exactly what characters you're working with.
          </p>
          <p>
            Click the copy button on any row to copy that specific character. Useful for extracting individual characters from complex text or copying characters that are hard to type directly.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging text encoding issues</h3>
            <p className="text-sm text-muted-foreground">
              Text displays wrong? Inspect reveals the actual characters. That "quote mark" might be a curly quote (U+201C) instead of straight quote (U+0022).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Finding specific Unicode characters</h3>
            <p className="text-sm text-muted-foreground">
              Need the exact code point for a symbol? Type or paste it, inspect to get U+221E for infinity. Use the code point in documentation or code.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing text for security review</h3>
            <p className="text-sm text-muted-foreground">
              Check for homoglyph attacks. Cyrillic "a" (U+0430) looks like Latin "a" (U+0061). Inspection reveals the difference in mixed-script text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with emoji and special symbols</h3>
            <p className="text-sm text-muted-foreground">
              Emoji are complex. Family emoji use ZWJ sequences. Skin tones use modifiers. Inspection shows the component characters and their relationships.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Developing fonts or text rendering</h3>
            <p className="text-sm text-muted-foreground">
              Font developers need to know which blocks their font covers. Inspect sample text to verify character coverage and identify missing glyphs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning about Unicode structure</h3>
            <p className="text-sm text-muted-foreground">
              Students can explore how Unicode organizes characters. See which block a character belongs to, understand categories like "Math Symbol" vs "Letter".
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some characters are invisible.</strong>
              Zero-width space, combining marks, and format characters don't display but affect text. They show in the table with their code points and names.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Emoji may be sequences.</strong>
              A single visible emoji like "" can be multiple code points. The inspector shows each component - base emoji, skin tone modifier, ZWJ, etc.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Category names are technical.</strong>
              "Lu" means Uppercase Letter, "Nd" means Decimal Number. These are Unicode general categories used for character classification in algorithms.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Block names show character origin.</strong>
              Blocks group related characters. "Greek and Coptic" contains Greek letters. "Emoticons" has emoji faces. Some characters span multiple blocks.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> When debugging text issues, inspect both the expected and problematic strings side by side. Differences in code points reveal the root cause.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does U+ mean in code points?</h3>
            <p className="text-sm text-muted-foreground">
              U+ is the standard notation for Unicode code points. U+0041 means the character at hexadecimal position 41, which is "A". The U stands for Unicode.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why are some character names generic?</h3>
            <p className="text-sm text-muted-foreground">
              Not all characters have unique names in the tool's database. Private use characters, unassigned code points, and rare symbols show generic names.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I find characters by code point?</h3>
            <p className="text-sm text-muted-foreground">
              This tool inspects existing text. To find characters by code point, use a character map or enter the character directly if you can type it.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What are combining characters?</h3>
            <p className="text-sm text-muted-foreground">
              Combining marks modify the previous character. Accents, diacritics, and emoji modifiers are combining. They stack on the base character visually.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can this detect bidirectional text?</h3>
            <p className="text-sm text-muted-foreground">
              The inspector shows character properties but doesn't visualize bidirectional ordering. RTL characters like Arabic have their own category and block.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do some characters show as boxes?</h3>
            <p className="text-sm text-muted-foreground">
              Your system lacks a font for that character's block. The code point and name still display correctly. Install fonts that support the script.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is there a limit to how much text I can inspect?</h3>
            <p className="text-sm text-muted-foreground">
              Very long text creates large tables. Keep input under a few thousand characters for best performance. For longer text, inspect sections separately.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
