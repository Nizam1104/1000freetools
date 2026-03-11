import React from "react"

export default function UnicodeSubscriptSuperscriptGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Unicode Subscript & Superscript Generator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Type your text into the input field and choose between superscript or subscript mode. The tool converts each letter, number, and symbol to its Unicode equivalent.
          </p>
          <p>
            Superscript uses characters from the Mathematical Alphanumeric Symbols block (U+1D400-U+1D7FF) and Spacing Modifier Letters. For example, "2" becomes "²" (U+00B2) and "x" becomes "ˣ" (U+02E3).
          </p>
          <p>
            Subscript pulls from a smaller set of characters, mainly used for chemical formulas. "H₂O" uses the subscript 2 (U+2082). Not all letters have subscript variants - only a, e, h, i, j, k, l, m, n, o, p, r, s, t, u, v, and x are available.
          </p>
          <p>
            The output is real Unicode text you can copy and paste anywhere - Word documents, social media posts, code comments, or chat messages. No special formatting required.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing chemical formulas in plain text</h3>
            <p className="text-sm text-muted-foreground">
              Need to write H₂SO₄ or CO₃²⁻ in a text message or code comment? Subscript numbers and superscript charges make formulas readable without LaTeX or equation editors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating mathematical expressions for social media</h3>
            <p className="text-sm text-muted-foreground">
              Facebook, Twitter, and Instagram don't support MathML. Write x² + y² = z² or E = mc² directly in posts using Unicode superscripts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Adding ordinal indicators to dates</h3>
            <p className="text-sm text-muted-foreground">
              Make "1st", "2nd", "3rd", and "4th" look professional with proper superscript ordinals: 1ˢᵗ, 2ⁿᵈ, 3ʳᵈ, 4ᵗʰ. Works great in invitations and certificates.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing phonetic transcriptions</h3>
            <p className="text-sm text-muted-foreground">
              Linguists use superscript letters for diacritics and secondary articulation. Write kʰ or tʷ without needing IPA-specific fonts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating footnotes in plain text documents</h3>
            <p className="text-sm text-muted-foreground">
              Add footnote markers like "See Smith²⁰²³ for details" in README files, emails, or documentation where HTML formatting isn't available.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Formatting exponents in code comments</h3>
            <p className="text-sm text-muted-foreground">
              Document algorithms with proper mathematical notation: "Time complexity: O(n²)" or "Calculate 2ⁿ possibilities" directly in source code comments.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Limited character support.</strong>
              Only specific letters and numbers have subscript/superscript Unicode equivalents. Most punctuation and symbols don't convert - they'll pass through unchanged.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Subscript has fewer options than superscript.</strong>
              Superscript supports all 26 letters (both cases) plus digits. Subscript only has lowercase a, e, h, i, j, k, l, m, n, o, p, r, s, t, u, v, x and digits 0-9.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Display depends on the viewer's font.</strong>
              Older systems or limited fonts may show boxes instead of characters. Superscript digits (⁰¹²³⁴⁵⁶⁷⁸⁹) are most widely supported across platforms.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Search engines may not index properly.</strong>
              "x²" won't match a search for "x2". Don't use superscript/subscript for critical searchable content like product names or technical terms users will search.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Accessibility note:</strong> Screen readers may read "x squared" correctly, but complex expressions like "x²⁺ʸ" could be confusing. Use sparingly for accessibility.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why can't I convert all letters to subscript?</h3>
            <p className="text-sm text-muted-foreground">
              Unicode only defines subscript variants for certain letters. The available subscript letters (a, e, h, i, j, k, l, m, n, o, p, r, s, t, u, v, x) come from phonetic notation needs, not comprehensive coverage.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will superscript work in Instagram bio?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, Instagram supports Unicode superscript characters. They'll display correctly on most devices. Test on both iOS and Android as rendering can vary slightly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for mathematical equations?</h3>
            <p className="text-sm text-muted-foreground">
              Simple equations work well: x² + y² = z². Complex math with fractions, integrals, or matrices needs LaTeX or MathML. This tool is best for inline expressions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I type the degree symbol?</h3>
            <p className="text-sm text-muted-foreground">
              The degree symbol (°) is U+00B0, not a superscript zero. Type "25°C" or "350°F" - the degree symbol is available in the Latin-1 Supplement block.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between ² and ^2?</h3>
            <p className="text-sm text-muted-foreground">
              "²" is a single Unicode character (U+00B2 SUPERSCRIPT TWO). "^2" uses ASCII caret notation. The Unicode version displays properly formatted; the caret is plain text markup.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert entire words to superscript?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but readability suffers. Superscript is designed for occasional characters, not running text. Use for emphasis sparingly: "This isⁱᵐᵖᵒʳᵗᵃⁿᵗ" looks unusual.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do these characters work in code?</h3>
            <p className="text-sm text-muted-foreground">
              In string literals, yes: console.log("x²"). But don't use them in variable names or operators - most programming languages require ASCII identifiers.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
