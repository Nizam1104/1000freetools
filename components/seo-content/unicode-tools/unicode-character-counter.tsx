import React from "react"

export default function UnicodeCharacterCounterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Unicode Character Counter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter or paste any text into the input field. The analyzer counts characters at multiple levels: UTF-16 code units, Unicode code points, and grapheme clusters. It also calculates byte sizes for UTF-8, UTF-16, and UTF-32 encodings.
          </p>
          <p>
            Characters counts UTF-16 code units (JavaScript string length). Code points count actual Unicode characters, handling emoji and special characters correctly. Grapheme clusters count user-perceived characters, accounting for combining marks and emoji modifiers.
          </p>
          <p>
            UTF-8 bytes vary based on character complexity. ASCII uses 1 byte, European characters use 2, most Asian characters use 3, and rare characters use 4. UTF-16 uses 2 or 4 bytes per character. UTF-32 always uses 4 bytes per code point.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Checking tweet length with emoji</h3>
            <p className="text-sm text-muted-foreground">
              Twitter counts characters, not bytes. Emoji can count as 2 characters due to surrogate pairs. This tool shows exactly how Twitter will count your tweet.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Database storage planning</h3>
            <p className="text-sm text-muted-foreground">
              Your database uses UTF-8. Calculate byte sizes to estimate storage needs. Text with many emoji or Asian characters uses more space than plain ASCII.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">API payload size estimation</h3>
            <p className="text-sm text-muted-foreground">
              JSON APIs transmit UTF-8. Knowing byte sizes helps estimate bandwidth and response times. Important for mobile apps with data limits.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging string length issues</h3>
            <p className="text-sm text-muted-foreground">
              Your validation says a string is too long but it looks short. Check grapheme clusters vs code points to find combining characters inflating the count.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">International text processing</h3>
            <p className="text-sm text-muted-foreground">
              Processing multilingual content? Different scripts have different byte costs. This helps plan buffer sizes and memory allocation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Understanding emoji complexity</h3>
            <p className="text-sm text-muted-foreground">
              A single emoji like "family" can be multiple code points joined by zero-width joiners. See how complex emoji affect character and byte counts.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Characters vs code points differ for emoji.</strong>
              Most emoji are single code points but use two UTF-16 code units (surrogate pairs). "Hello" is 5 characters and 5 code points. "Hello" is 5 characters but 7 code points.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Grapheme clusters match what users see.</strong>
              The letter "e" plus combining acute accent looks like "é" but is two code points. Grapheme cluster counting treats it as one user-perceived character.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">UTF-8 is variable-length.</strong>
              ASCII characters (0-127) use 1 byte. Latin, Greek, Cyrillic use 2 bytes. Most Asian characters use 3 bytes. Rare characters use 4 bytes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Zero-width joiners create compound emoji.</strong>
              Family emoji like "family: man, woman, boy, girl" uses multiple code points joined by zero-width joiner characters. It displays as one emoji but counts as many.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For Twitter, use grapheme cluster count. For database storage, use UTF-8 bytes. For JavaScript string operations, use character count. Each platform counts differently.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why are there three different character counts?</h3>
            <p className="text-sm text-muted-foreground">
              Different systems count differently. JavaScript uses UTF-16 code units. Unicode uses code points. Users perceive grapheme clusters. Each count is correct for its context.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many bytes does an emoji use?</h3>
            <p className="text-sm text-muted-foreground">
              Most emoji use 4 bytes in UTF-8. They're in the range U+1F000 to U+1F9FF, which requires 4 bytes in UTF-8 encoding. Some complex emoji use more due to modifiers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a surrogate pair?</h3>
            <p className="text-sm text-muted-foreground">
              UTF-16 uses two 16-bit code units to represent characters above U+FFFF. These pairs are called surrogate pairs. They count as 2 characters but 1 code point.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does UTF-32 always use 4 bytes?</h3>
            <p className="text-sm text-muted-foreground">
              UTF-32 uses fixed-width encoding. Every code point gets exactly 32 bits (4 bytes). This makes random access easy but wastes space for ASCII text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do skin tone modifiers affect the count?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. A thumbs-up with skin tone modifier is two code points: the base emoji plus the modifier. It displays as one emoji but counts as two code points.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Which count should I use for validation?</h3>
            <p className="text-sm text-muted-foreground">
              Use grapheme clusters for user-facing limits (like "max 100 characters"). Use bytes for storage limits. Use code points for Unicode-aware processing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I count Chinese characters accurately?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Chinese characters are single code points each. They use 3 bytes in UTF-8. The counter handles all Unicode scripts equally.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
