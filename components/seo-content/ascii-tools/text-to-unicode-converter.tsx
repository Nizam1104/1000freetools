import React from "react"

export default function TextToUnicodeConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool converts text to its Unicode code point representation.
            Each character maps to a unique number (code point) in the Unicode
            standard, written as U+XXXX where XXXX is a hexadecimal number.
          </p>
          <p>
            The converter reads each character, finds its Unicode code point,
            and outputs it in various formats: U+XXXX notation, hex values,
            decimal values, or escape sequences like \uXXXX for programming.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example conversions:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">A</code>
                <span>U+0041 (hex: 41, dec: 65)</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">€</code>
                <span>U+20AC (hex: 20AC, dec: 8364)</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">😀</code>
                <span>U+1F600 (hex: 1F600, dec: 128512)</span>
              </div>
            </div>
          </div>
          <p>
            Type text to see Unicode values for each character. The tool handles
            all Unicode characters including emoji, CJK characters, and special
            symbols. Copy results in your preferred format.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Looking up Unicode values for documentation</h3>
            <p className="text-sm text-muted-foreground">
              A technical writer documents a character encoding issue. They look
              up the exact Unicode code points to specify which characters are
              affected, making the bug report precise and actionable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating regex patterns for specific characters</h3>
            <p className="text-sm text-muted-foreground">
              A developer writes a regex to match specific Unicode ranges. They
              use this tool to find the code points for characters they want to
              include or exclude in patterns like [\u0080-\uFFFF].
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging character encoding issues</h3>
            <p className="text-sm text-muted-foreground">
              A programmer sees a weird character in output and needs to identify
              it. They convert to Unicode to see it's U+00A0 (non-breaking space)
              not U+0020 (regular space), explaining the layout issue.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing Unicode escape sequences in code</h3>
            <p className="text-sm text-muted-foreground">
              A developer needs to include special characters in source code
              without encoding issues. They find the Unicode value and write
              \uXXXX escape sequences that work across all systems.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing text for character set requirements</h3>
            <p className="text-sm text-muted-foreground">
              A database admin checks if text fits within a character set. They
              convert to Unicode to see if any characters exceed the supported
              range, determining if migration to UTF-8 is needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating font glyph mappings</h3>
            <p className="text-sm text-muted-foreground">
              A type designer maps Unicode code points to glyph IDs in a font.
              They use this tool to verify which code points their characters
              should correspond to in the Unicode standard.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Unicode code points aren't the same as bytes.</strong>
              U+0041 is the abstract code point. How it's stored (UTF-8, UTF-16,
              UTF-32) determines the actual bytes. This tool shows code points,
              not encoded bytes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some characters are combining sequences.</strong>
              É can be one character (U+00C9) or two (E + combining acute accent
              U+0301). Both display the same but have different code points.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Emoji may be multiple code points.</strong>
              Family emoji like 👨‍👩‍👧‍👦 are sequences of multiple code points joined
              by zero-width joiners (U+200D). They appear as one glyph but are
              several characters internally.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Not all code points display everywhere.</strong>
              Your system needs fonts that support the characters. Some Unicode
              ranges (like Linear A or Cuneiform) have limited font support.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> When debugging Unicode issues, check for
              invisible characters like U+200B (zero-width space), U+FEFF (BOM),
              or U+200E/U+200F (direction marks). They don't display but affect
              text processing.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between ASCII and Unicode?</h3>
            <p className="text-sm text-muted-foreground">
              ASCII defines 128 characters (codes 0-127). Unicode includes ASCII
              plus over 140,000 additional characters from all writing systems.
              ASCII U+0041 is the same as Unicode U+0041 for 'A'.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I write Unicode in JavaScript?</h3>
            <p className="text-sm text-muted-foreground">
              Use {"\\uXXXX"} for characters up to U+FFFF. For higher characters like
              emoji, use {"\\u{XXXXX}"} with curly braces. Example: {"'\\u0041'"} is 'A',
              {"'\\u{1F600}'"} is 😀.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the highest Unicode code point?</h3>
            <p className="text-sm text-muted-foreground">
              The maximum is U+10FFFF, giving about 1.1 million possible code
              points. About 15% are assigned so far. The rest are reserved for
              future characters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do some characters show as boxes?</h3>
            <p className="text-sm text-muted-foreground">
              Boxes (tofu) mean your font lacks a glyph for that code point.
              Install fonts with broader Unicode coverage like Noto Sans, or
              accept that rare characters may not display on all systems.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert Unicode back to text?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, paste Unicode escape sequences like \u0041 or U+0041 and
              the tool converts them back to characters. It recognizes multiple
              input formats.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What are surrogate pairs?</h3>
            <p className="text-sm text-muted-foreground">
              UTF-16 uses two 16-bit values (a surrogate pair) to represent
              characters above U+FFFF. JavaScript strings use UTF-16, so emoji
              appear as two characters when you check .length.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I find a character's Unicode value?</h3>
            <p className="text-sm text-muted-foreground">
              Paste the character into this tool. It shows the code point in
              U+XXXX format, hex value, and decimal. You can also use character
              map tools or look up in the Unicode charts.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
