import React from "react"

export default function UnicodeBidirectionalTextEditorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Unicode Bidirectional Text Editor Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This editor lets you insert Unicode directional control characters - invisible codes that tell text renderers how to display mixed left-to-right (LTR) and right-to-left (RTL) content.
          </p>
          <p>
            Click LRM or RLM to insert a Left-to-Right Mark (U+200E) or Right-to-Left Mark (U+200F). These zero-width characters influence the direction of adjacent text without displaying anything visible.
          </p>
          <p>
            For stronger control, use LRE/RLE (embeddings) or LRO/RLO (overrides). Embeddings respect the natural direction of nested text, while overrides force all text to follow the specified direction.
          </p>
          <p>
            The "Visualized Control Characters" output shows invisible codes as [LRM], [RLM], etc. This helps you see exactly where directional markers sit in your text.
          </p>
          <p>
            The rendered output displays your text with proper bidirectional formatting applied. Mix English with Arabic (العربية), Hebrew (עברית), or Persian (فارسی) and control how they interact.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fixing punctuation placement in mixed-language text</h3>
            <p className="text-sm text-muted-foreground">
              When English punctuation appears at the end of Arabic sentences, it sometimes jumps to the wrong side. Insert an RLM after the punctuation to anchor it correctly: "مرحبا.[RLM]"
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Formatting product names with RTL and LTR parts</h3>
            <p className="text-sm text-muted-foreground">
              Brand names like "iPhone 15 برو" (iPhone 15 Pro in Arabic) can display backwards. Use LRM around the model number: "آيفون [LRM]15[LRM] برو" keeps numbers in correct order.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing code examples with RTL comments</h3>
            <p className="text-sm text-muted-foreground">
              Documentation mixing Hebrew/Arabic comments with English code can render incorrectly. Wrap RTL comments with RLM/LRM to prevent code from appearing inside the comment visually.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating UI labels for multilingual applications</h3>
            <p className="text-sm text-muted-foreground">
              Apps supporting both RTL and LTR languages need proper bidi handling. Test your labels with directional marks to ensure they display correctly in all language combinations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Formatting academic citations with mixed scripts</h3>
            <p className="text-sm text-muted-foreground">
              Bibliographies citing sources in Arabic, Hebrew, or Syriac alongside English titles need bidi control. Use embeddings to keep author names and titles in their proper directions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging text rendering issues in web apps</h3>
            <p className="text-sm text-muted-foreground">
              When user-generated content displays incorrectly, paste it here and visualize the bidi structure. See if missing directional marks cause the problem, then add them to fix rendering.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Directional characters are invisible.</strong>
              Once inserted, you can't see LRM, RLM, or other control characters. Use the visualization feature to confirm their positions before copying the final text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Different platforms handle bidi differently.</strong>
              Browsers, word processors, and mobile apps implement Unicode bidi algorithm with slight variations. Test your formatted text in the target environment.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">PDF (Pop Directional Formatting) closes embeddings.</strong>
              Every LRE/RLE/LRO/RLO should be followed by PDF to return to normal text direction. Unpaired directional codes can affect all subsequent text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Screen readers may announce control characters.</strong>
              Some assistive technologies read directional marks as "left-to-right mark" or skip them entirely. Test with your target screen reader for accessibility.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Security note:</strong> Directional overrides can be used for malicious purposes (like hiding file extensions). Don't use RLO/LRO to disguise content.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between LRM and LRE?</h3>
            <p className="text-sm text-muted-foreground">
              LRM (U+200E) is a weak mark that influences adjacent character direction. LRE (U+202A) starts a directional embedding that affects all text until PDF. Use LRM for small fixes, LRE for longer passages.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my Arabic text display backwards?</h3>
            <p className="text-sm text-muted-foreground">
              Numbers and Latin text inside Arabic can flip the reading order. Insert LRM after numbers: "العربية 123[LRM] text" keeps the number anchored to the Arabic side.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I remove directional characters?</h3>
            <p className="text-sm text-muted-foreground">
              Use a text editor with regex support. Search for [\u200E\u200F\u202A-\u202E] to find all bidi control characters and delete them. Or paste into this tool and manually remove them.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for Hebrew text?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, Hebrew uses the same RTL direction as Arabic. All bidi control characters work identically for Hebrew, Yiddish, Ladino, and other Hebrew-script languages.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does the "Auto" setting do?</h3>
            <p className="text-sm text-muted-foreground">
              Auto lets the browser apply the Unicode Bidirectional Algorithm automatically based on content. Use LTR or RTL when you need to override the default behavior.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do I need PDF after every RLM/LRM?</h3>
            <p className="text-sm text-muted-foreground">
              No. RLM and LRM are standalone marks - they don't start an embedding. PDF only closes LRE, RLE, LRO, and RLO. Think of marks as punctuation, embeddings as containers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will this work in email clients?</h3>
            <p className="text-sm text-muted-foreground">
              Most modern email clients (Gmail, Outlook, Apple Mail) support Unicode bidi. But some older clients strip control characters. Test before sending critical emails.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
