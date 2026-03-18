import React from "react"

export default function UnicodeSuperscriptGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Unicode Superscript Generator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Type or paste your text into the input field. Select whether you want superscript, subscript, or both. The conversion happens instantly as you type.
          </p>
          <p>
            The generator maps regular characters to their Unicode superscript/subscript equivalents. Letters use modifier letters from the IPA and phonetic extensions. Numbers use dedicated superscript/subscript digits.
          </p>
          <p>
            Copy the output with one click. The result is plain text with real Unicode characters. Works in any app that supports Unicode - social media, documents, messaging apps, and code comments.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing math in plain text</h3>
            <p className="text-sm text-muted-foreground">
              Can't use LaTeX? Write x² + y² = z² with Unicode superscripts. Perfect for chat, comments, or documentation. No formatting needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating chemical formulas</h3>
            <p className="text-sm text-muted-foreground">
              Write H₂O, CO₂, H₂SO₄ in plain text. Subscripts for atom counts. Works in emails, chats, and documents without special formatting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Adding footnotes in social media</h3>
            <p className="text-sm text-muted-foreground">
              Twitter and Instagram don't support footnotes. Use superscript numbers¹ to mark notes. Add explanations at the end of your post.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing phonetic transcriptions</h3>
            <p className="text-sm text-muted-foreground">
              IPA uses superscript for secondary articulation. Write tʰ for aspirated t. Linguistics notation in plain text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating styled text for bios</h3>
            <p className="text-sm text-muted-foreground">
              Make your social media bio stand out. Use superscript for decorative text. Works in Twitter, Instagram, TikTok bios.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Documenting code without Markdown</h3>
            <p className="text-sm text-muted-foreground">
              Some systems don't support Markdown. Use Unicode superscripts for exponents in code comments. x^2 becomes x².
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Not all characters have superscripts.</strong>
              Numbers 0-9 have superscripts. Most letters a-z have superscripts. Many symbols don't. Unsupported characters pass through unchanged.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">These are real characters, not formatting.</strong>
              Unlike Word's superscript formatting, these are actual Unicode characters. They're text, not styled text. Works anywhere Unicode works.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Font support varies.</strong>
              Most modern fonts support superscript numbers. Superscript letters may not display in all fonts. Test in your target application.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Search may not work as expected.</strong>
              Searching for "x2" won't find "x²". They're different characters. Consider this for accessibility and searchability.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For math in documents, use proper equation editors when possible. Unicode superscripts work for simple cases but lack proper mathematical formatting and spacing.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What characters are supported?</h3>
            <p className="text-sm text-muted-foreground">
              Numbers 0-9, most Latin letters a-z, some Greek letters, and common symbols like +, -, =. Not all characters have superscript equivalents.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will this work on all devices?</h3>
            <p className="text-sm text-muted-foreground">
              Most modern devices support these Unicode characters. Older devices may show boxes. Test on your target platforms before widespread use.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this in code?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, in comments and strings. Don't use in actual code syntax. Variable names with superscripts may cause issues in some languages.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How is this different from HTML sup tag?</h3>
            <p className="text-sm text-muted-foreground">
              HTML &lt;sup&gt; is formatting that requires HTML. Unicode superscripts are plain text characters. Work in any text context, not just HTML.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are there subscript characters too?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, subscript numbers and some letters exist. Commonly used for chemical formulas. This tool generates both superscript and subscript.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can screen readers read these?</h3>
            <p className="text-sm text-muted-foreground">
              Screen readers may read them as regular characters. "x²" might be read as "x two" not "x squared". Consider accessibility implications.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I type these manually?</h3>
            <p className="text-sm text-muted-foreground">
              Use character map tools or Unicode input methods. Some have keyboard shortcuts (Alt+0178 for ²). This generator is faster for conversion.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
