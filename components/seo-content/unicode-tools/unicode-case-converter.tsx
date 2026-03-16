import React from "react"

export default function UnicodeCaseConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool converts text between uppercase, lowercase, and title case
            using Unicode's case mapping rules. Unlike simple ASCII converters,
            it handles all Unicode characters including accented letters and
            non-Latin scripts.
          </p>
          <p>
            The converter applies Unicode's Case Folding algorithm, which maps
            each character to its uppercase or lowercase equivalent. This includes
            special cases like German ß (which becomes SS when uppercased) and
            Greek sigma (which has different forms depending on position).
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Case conversion examples:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">straße</code>
                <span>uppercase becomes STRASSE</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">HELLO WORLD</code>
                <span>lowercase becomes hello world</span>
              </div>
            </div>
          </div>
          <p>
            Type text and select the case transformation. The tool processes
            instantly with full Unicode support. Copy results for use in
            comparisons, formatting, or data normalization.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Implementing case-insensitive search</h3>
            <p className="text-sm text-muted-foreground">
              A developer builds search functionality that should find "hello"
              whether users type "HELLO", "Hello", or "hELLo". They convert
              both query and database text to lowercase for comparison.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Normalizing user input in forms</h3>
            <p className="text-sm text-muted-foreground">
              A form collects email addresses. The developer converts them to
              lowercase before storing to prevent duplicate accounts from
              "User@Example.com" and "user@example.com".
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Formatting names for display</h3>
            <p className="text-sm text-muted-foreground">
              A database stores customer names in uppercase. For a friendly
              interface, the developer converts to title case so "JOHN SMITH"
              displays as "John Smith" on the website.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Processing international text data</h3>
            <p className="text-sm text-muted-foreground">
              A data analyst works with text in multiple languages. They use
              Unicode-aware case conversion to ensure Turkish İ/i, Greek Σ/σ,
              and other special cases are handled correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating URL slugs from titles</h3>
            <p className="text-sm text-muted-foreground">
              A CMS converts article titles to URL slugs. The first step is
              lowercasing the title, then replacing spaces with hyphens.
              Unicode case conversion ensures international titles work.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Validating password case sensitivity</h3>
            <p className="text-sm text-muted-foreground">
              A security engineer tests whether their system correctly treats
              "Password" and "password" as different. They use case conversion
              to generate test variants for validation.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some case conversions are language-specific.</strong>
              Turkish has dotted and dotless I (İ/i and I/ı). Azerbaijani and
              Crimean Tatar have similar distinctions. Locale affects conversion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">German ß has special handling.</strong>
              The German sharp S (ß) uppercases to "SS", not a single character.
              This changes string length. The uppercase ẞ exists but is rarely used.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Greek sigma has two lowercase forms.</strong>
              Σ becomes σ at word end but ς in the middle. Case folding needs
              to know word boundaries for correct conversion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Case folding isn't always reversible.</strong>
              Converting "ß" to "SS" then back to lowercase gives "ss", not "ß".
              Information is lost in some case conversions.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For case-insensitive comparisons, use
              case folding (not just lowercase). Case folding handles more
              edge cases and is designed specifically for comparisons.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between lowercase and case folding?</h3>
            <p className="text-sm text-muted-foreground">
              Lowercase converts to lowercase form. Case folding converts to
              a form optimized for caseless matching. They're similar but
              case folding handles more edge cases for comparisons.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does Turkish need special handling?</h3>
            <p className="text-sm text-muted-foreground">
              Turkish has dotted İ (upper) / i (lower) and dotless I (upper) /
              ı (lower). Standard case conversion breaks Turkish text. Use
              locale-aware conversion for Turkish.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work with emoji?</h3>
            <p className="text-sm text-muted-foreground">
              Emoji don't have case, so they pass through unchanged. The
              converter only affects letters that have uppercase/lowercase
              variants.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert entire files?</h3>
            <p className="text-sm text-muted-foreground">
              This tool handles text input. For files, use command-line tools
              like tr for simple cases, or write a script using your language's
              Unicode-aware string functions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is title case?</h3>
            <p className="text-sm text-muted-foreground">
              Title case capitalizes the first letter of each word. "hello world"
              becomes "Hello World". Note that this tool capitalizes every word,
              not following style guide rules about articles and prepositions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle locale-specific conversion?</h3>
            <p className="text-sm text-muted-foreground">
              In code, use locale-aware functions. JavaScript: toLocaleLowerCase('tr').
              Python: use the locale module. This tool uses default Unicode
              mapping without locale specifics.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are there characters without case?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, many characters have no case: digits, punctuation, symbols,
              emoji, and letters from scripts without case distinctions like
              Hebrew, Arabic, or Chinese.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
