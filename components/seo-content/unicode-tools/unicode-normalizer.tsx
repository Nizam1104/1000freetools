import React from "react"

export default function UnicodeNormalizerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool normalizes Unicode text to standard forms (NFC, NFD, NFKC, NFKD).
            Unicode allows multiple ways to represent the same character—either as
            a single code point or as a base character plus combining marks.
          </p>
          <p>
            Normalization converts text to a consistent representation. NFC composes
            characters (single code point where possible). NFD decomposes them
            (base + combining marks). NFKC and NFKD also apply compatibility mappings.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Normalization forms:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">NFC</code>
                <span>Composed form (default for most uses)</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">NFD</code>
                <span>Decomposed form (useful for searching)</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">NFKC/D</code>
                <span>Compatibility forms (normalizes ligatures, etc.)</span>
              </div>
            </div>
          </div>
          <p>
            Paste text and select a normalization form. The tool shows the before
            and after code points so you can see exactly what changed.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fixing string comparison failures</h3>
            <p className="text-sm text-muted-foreground">
              A developer's code says "é" doesn't equal "é". One is U+00E9
              (composed), the other is e + U+0301 (decomposed). Normalizing
              both to NFC makes them match.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cleaning user input for storage</h3>
            <p className="text-sm text-muted-foreground">
              A database stores user names inconsistently—some with composed
              accents, some decomposed. Normalizing all input to NFC ensures
              consistent storage and reliable lookups.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Implementing search functionality</h3>
            <p className="text-sm text-muted-foreground">
              A search feature should find "café" whether users type composed
              or decomposed. The developer normalizes both the index and
              queries to NFD for consistent matching.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Processing text from multiple sources</h3>
            <p className="text-sm text-muted-foreground">
              A data pipeline ingests text from various systems—some use NFC,
              some NFD. Normalizing everything to one form prevents downstream
              comparison and sorting issues.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Handling compatibility characters</h3>
            <p className="text-sm text-muted-foreground">
              Text contains ligatures like "ﬁ" (U+FB01) that should match "fi".
              NFKC normalization converts compatibility characters to their
              canonical equivalents for consistent processing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging Unicode edge cases</h3>
            <p className="text-sm text-muted-foreground">
              A QA engineer investigates why two visually identical strings
              compare differently. They normalize and compare code points
              to find the hidden difference.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">NFC is the recommended default.</strong>
              W3C and Unicode recommend NFC for web content. It's the most
              compact form and what most systems expect. Use NFC unless you
              have a specific reason for another form.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Normalization can change string length.</strong>
              NFD expands characters—é (1 code point) becomes e + combining
              accent (2 code points). This affects length calculations and
              buffer allocations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">NFKC/D loses information.</strong>
              Compatibility normalization converts "ﬁ" to "fi" and superscript
              ² to regular 2. This is irreversible. Only use NFKC/D when you
              want to lose compatibility distinctions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some strings can't be normalized to match.</strong>
              Different characters that look similar (homoglyphs) won't
              normalize to the same form. Latin 'A' and Cyrillic 'А' remain
              different after normalization.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Always normalize before comparing
              strings for equality. But normalize both strings the same way.
              Comparing NFC to NFD will still fail even though they represent
              the same text.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between NFC and NFD?</h3>
            <p className="text-sm text-muted-foreground">
              NFC composes characters where possible (é as U+00E9). NFD
              decomposes them (e + U+0301 combining acute). Both display
              identically but have different code points.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When should I use NFKC or NFKD?</h3>
            <p className="text-sm text-muted-foreground">
              Use NFKC/D when you want to normalize compatibility variants—
              ligatures, full-width characters, superscripts. But be aware
              it's lossy. Don't use it for text that needs to preserve
              exact formatting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does normalization affect emoji?</h3>
            <p className="text-sm text-muted-foreground">
              Most emoji aren't affected. However, emoji with skin tone
              modifiers or ZWJ sequences may be normalized. Flag emoji
              (regional indicator pairs) stay as two code points.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I normalize in code?</h3>
            <p className="text-sm text-muted-foreground">
              JavaScript: str.normalize('NFC'). Python: unicodedata.normalize('NFC', str).
              Java: Normalizer.normalize(str, NFC). Most languages have
              built-in normalization support.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can normalization break text?</h3>
            <p className="text-sm text-muted-foreground">
              NFC and NFD are reversible and won't break text. NFKC/D can
              change meaning by converting compatibility characters. Use
              NFKC/D carefully and only when you understand the implications.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do I need Unicode normalization?</h3>
            <p className="text-sm text-muted-foreground">
              Without normalization, visually identical text can compare as
              different. This causes bugs in search, sorting, and data
              deduplication. Normalization ensures consistent representation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is normalization slow?</h3>
            <p className="text-sm text-muted-foreground">
              Modern normalization is fast. For most applications, the
              overhead is negligible. It's worth the cost to avoid Unicode
              comparison bugs. Batch normalize on input rather than every
              comparison for best performance.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
