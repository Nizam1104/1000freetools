import React from "react"

export default function UnicodeRegexTesterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Unicode Regex Tester Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your regular expression pattern and test text. The tester highlights all matches with Unicode-aware matching. See match groups, positions, and captured text.
          </p>
          <p>
            Unicode regex supports character properties: {"\\p{L}"} for any letter, {"\\p{Emoji}"} for emoji, {"\\p{Script=Han}"} for Chinese characters. Match by category, not just specific characters.
          </p>
          <p>
            Test flags affect matching: case-insensitive, multiline, dot-all, Unicode mode. Visualize how each flag changes matching behavior. Essential for international text processing.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Validating international input</h3>
            <p className="text-sm text-muted-foreground">
              Names from any language? Use {"\\p{L}"}+ for letters. Not just A-Z. Accept all valid names. Better user experience.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Extracting emoji from text</h3>
            <p className="text-sm text-muted-foreground">
              Find all emoji in user content? Use {"\\p{Emoji}"}+. Extract for analysis or filtering. Process emoji separately.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Parsing multilingual content</h3>
            <p className="text-sm text-muted-foreground">
              Text with mixed scripts? Match specific scripts. {"\\p{Script=Arabic}"} for Arabic text. Process each script appropriately.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building search functionality</h3>
            <p className="text-sm text-muted-foreground">
              Search needs to work globally. Unicode regex handles case folding across languages. Better search results.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing regex patterns</h3>
            <p className="text-sm text-muted-foreground">
              Built a Unicode regex? Test it here before deploying. Verify it matches expected text. Catch edge cases early.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning Unicode regex</h3>
            <p className="text-sm text-muted-foreground">
              Unicode regex is powerful but complex. Experiment with patterns. See what matches. Educational tool for developers.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Unicode mode must be enabled.</strong>
              Many regex engines need /u flag for Unicode. Without it, \p{} doesn't work. Enable Unicode mode for full support.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Character properties are powerful.</strong>
              {"\\p{L}"} = any letter in any script. {"\\p{N}"} = any number. {"\\p{P}"} = punctuation. More flexible than character classes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Case folding is complex.</strong>
              Turkish 'i' case folds differently. Greek has final sigma. Unicode handles these correctly with proper flags.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Script detection is available.</strong>
              {"\\p{Script=Latin}"}, {"\\p{Script=Han}"}, etc. Match text by writing system. Useful for language detection.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For production regex, test with real user data. Edge cases always appear. Emoji, combining characters, and rare scripts can break patterns.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is Unicode regex?</h3>
            <p className="text-sm text-muted-foreground">
              Regular expressions with Unicode support. Character properties, script matching, proper case folding. Beyond ASCII regex.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I match any letter?</h3>
            <p className="text-sm text-muted-foreground">
              Use {"\\p{L}"} or {"\\p{Letter}"}. Matches A-Z, à-ü, Cyrillic, Arabic, CJK, all letters. Much better than [a-zA-Z].
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I match emoji?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, {"\\p{Emoji}"} matches all emoji. {"\\p{Emoji_Presentation}"} for emoji that display as emoji. Useful for filtering.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the /u flag?</h3>
            <p className="text-sm text-muted-foreground">
              Unicode mode flag. Enables Unicode features in regex. Required for {"\\p{}"} in JavaScript. Other languages have similar flags.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I match a specific script?</h3>
            <p className="text-sm text-muted-foreground">
              {"\\p{Script=Name}"}. {"\\p{Script=Han}"} for Chinese. {"\\p{Script=Arabic}"} for Arabic. Match by writing system.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work in all languages?</h3>
            <p className="text-sm text-muted-foreground">
              Most modern languages support Unicode regex. JavaScript, Python, Java, .NET all support it. Syntax varies slightly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about combining characters?</h3>
            <p className="text-sm text-muted-foreground">
              Combining marks are separate characters. e + combining acute = é. Regex can match base or combined. Consider normalization.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
