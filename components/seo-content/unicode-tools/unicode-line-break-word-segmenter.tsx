import React from "react"

export default function UnicodeLineBreakWordSegmenterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Unicode Line Break Tool Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your text into the input field. Use the slider to set your maximum line length. Click "Apply Line Breaks" to see where the text should wrap, or "Segment Words" to identify individual word boundaries.
          </p>
          <p>
            The tool follows Unicode Standard Annex #14 for line breaking and UAX #29 for word segmentation. These standards define where breaks are allowed based on character properties, not just spaces. This matters for languages like Thai, Japanese, and Chinese that don't use spaces between words.
          </p>
          <p>
            Word segmentation shows each token separately, including spaces as distinct segments. Line breaking shows how text wraps at your specified width, respecting word boundaries and Unicode break rules.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Implementing text wrapping in UI components</h3>
            <p className="text-sm text-muted-foreground">
              Building a custom text renderer? Test where breaks should occur before coding. Verify your implementation matches Unicode standards for different scripts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Processing CJK text without spaces</h3>
            <p className="text-sm text-muted-foreground">
              Chinese, Japanese, and Korean text has no spaces. Use word segmentation to identify word boundaries for search indexing, text selection, or translation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building text editors with smart selection</h3>
            <p className="text-sm text-muted-foreground">
              Double-click should select a word, not arbitrary characters. Use segmentation to determine word boundaries for selection, deletion, and navigation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating responsive typography</h3>
            <p className="text-sm text-muted-foreground">
              Test how your content wraps at different widths. See where breaks occur before and after hyphens, around punctuation, and with mixed scripts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Developing text-to-speech systems</h3>
            <p className="text-sm text-muted-foreground">
              TTS needs word boundaries for proper pronunciation and prosody. Segmentation identifies where pauses and stress patterns should occur in speech.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Handling emoji and complex scripts</h3>
            <p className="text-sm text-muted-foreground">
              Emoji sequences and scripts like Arabic have complex boundaries. Test how your system handles flag emoji, ZWJ sequences, and cursive connections.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Line breaking isn't just about spaces.</strong>
              Unicode defines break opportunities around punctuation, between scripts, and within words. A hyphenated word can break at the hyphen. Numbers have specific rules.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Word segmentation varies by language.</strong>
              The tool uses the Intl.Segmenter API which considers language rules. English segments differently than Thai. Results depend on the locale you're targeting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Emoji can span multiple code points.</strong>
              Flag emoji are two regional indicators. Family emoji use ZWJ to join multiple people. Segmentation should keep these together as single "words".
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">CSS and Unicode don't always match.</strong>
              CSS has its own word-break and overflow-wrap properties. They may produce different results than pure Unicode segmentation. Test in your target environment.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For production text rendering, use platform-native text layout engines. They handle edge cases like hyphenation, justification, and bidirectional text that simple segmentation doesn't cover.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does segmentation show spaces as separate?</h3>
            <p className="text-sm text-muted-foreground">
              Spaces are grapheme clusters too. Showing them separately helps you see the complete structure. Filter them out if you only want visible words.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can this handle right-to-left text?</h3>
            <p className="text-sm text-muted-foreground">
              Segmentation works for RTL scripts like Arabic and Hebrew. The segments are identified correctly, though display order depends on your rendering system.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the max line length for?</h3>
            <p className="text-sm text-muted-foreground">
              It simulates wrapping at a specific width. Set it to match your container's character capacity. Useful for previewing how text flows in your layout.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work for Thai text?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, Thai is a great use case. Thai has no spaces between words. Segmentation identifies word boundaries that aren't obvious from the raw text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are URLs and email addresses handled?</h3>
            <p className="text-sm text-muted-foreground">
              They're typically kept as single segments to avoid breaking in the middle. Line breaking rules prefer breaking after slashes or at hyphens in long URLs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about hyphenation?</h3>
            <p className="text-sm text-muted-foreground">
              This tool shows break opportunities, not automatic hyphenation. Adding hyphens at break points requires a hyphenation dictionary and algorithm.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for code formatting?</h3>
            <p className="text-sm text-muted-foreground">
              For source code, use language-specific tokenizers. Unicode segmentation treats code as text, not syntax. Identifiers and strings need different handling.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
