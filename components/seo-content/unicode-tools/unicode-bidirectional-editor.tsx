import React from "react"

export default function UnicodeBidirectionalEditorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Unicode Bidirectional Editor Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter text containing mixed left-to-right and right-to-left content. The editor shows how Unicode's bidirectional algorithm renders your text.
          </p>
          <p>
            Each character has a directionality property: L (left-to-right), R (right-to-left), AL (Arabic letter), EN (European number), etc. The algorithm determines visual order from logical order.
          </p>
          <p>
            Visualize the directionality of each character. See how embedding levels work. Test with Arabic, Hebrew, and mixed LTR/RTL text. Understand complex text rendering.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Developing RTL language support</h3>
            <p className="text-sm text-muted-foreground">
              Adding Arabic or Hebrew to your app? Test how mixed text renders. Debug bidirectional text issues. Ensure proper display for RTL users.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging text rendering bugs</h3>
            <p className="text-sm text-muted-foreground">
              Text displaying backwards? Numbers appearing wrong in RTL context? Use this to understand the bidirectional algorithm's behavior.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating multilingual content</h3>
            <p className="text-sm text-muted-foreground">
              Writing content with mixed scripts? See how LTR and RTL text interact. Ensure proper quotation and punctuation placement.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with URLs in RTL text</h3>
            <p className="text-sm text-muted-foreground">
              URLs in RTL context can display incorrectly. Understand how to embed LTR URLs in RTL text. Use proper isolation techniques.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing Unicode implementations</h3>
            <p className="text-sm text-muted-foreground">
              Building a text engine? Test your bidirectional algorithm implementation. Compare against this reference. Ensure Unicode compliance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning Unicode bidirectional behavior</h3>
            <p className="text-sm text-muted-foreground">
              The bidirectional algorithm is complex. This tool makes it visible. Educational resource for understanding Unicode text processing.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Logical vs visual order differs.</strong>
              Text is stored in logical order (reading order). Displayed in visual order (left-to-right on screen). Bidirectional algorithm converts between them.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Paragraph direction matters.</strong>
              The base direction (LTR or RTL) affects the entire paragraph. Same text can display differently with different base directions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Numbers have special behavior.</strong>
              European numbers adapt to surrounding text. In RTL context, they may display differently. This causes common confusion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Control characters affect direction.</strong>
              LRM, RLM, LRE, RLE, PDF, and isolate characters control directionality. Use them to override default behavior when needed.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For embedding LTR text in RTL (or vice versa), use Unicode isolates (U+2066-LRI, U+2067-RLI, U+2068-FSI) instead of deprecated embedding characters. They're safer and more predictable.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is the bidirectional algorithm?</h3>
            <p className="text-sm text-muted-foreground">
              Unicode Standard Annex #9 defines how mixed LTR/RTL text is ordered. Determines visual display from logical storage order. Essential for Arabic, Hebrew, and mixed scripts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do numbers display wrong in RTL?</h3>
            <p className="text-sm text-muted-foreground">
              Numbers are "weak" characters. Their direction depends on surrounding text. In RTL context, digit order may appear reversed. This is by design.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I force text direction?</h3>
            <p className="text-sm text-muted-foreground">
              Use Unicode directionality marks. LRM (U+200E) for LTR, RLM (U+200F) for RTL. Or use HTML dir attribute and &lrm;/&rlm; entities.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between R and AL?</h3>
            <p className="text-sm text-muted-foreground">
              R is generic right-to-left. AL is specifically Arabic letters. AL has different behavior with numbers. Important for proper Arabic text handling.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for Hebrew?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, Hebrew uses the same bidirectional algorithm as Arabic. Both are RTL scripts. Tool works for any RTL language.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What are embedding levels?</h3>
            <p className="text-sm text-muted-foreground">
              Nested LTR/RTL content creates embedding levels. Each level reverses direction. Complex text can have multiple levels. Algorithm handles this automatically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I debug bidirectional issues?</h3>
            <p className="text-sm text-muted-foreground">
              Use this tool to visualize character directionality. Compare expected vs actual display. Add direction marks where needed. Test with real RTL users.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
