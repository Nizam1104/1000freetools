import React from "react"

export default function UnicodeEscapeSequenceEncoderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Unicode Escape Encoder Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Type or paste your text into the input field. Select the escape format for your target language or system. Click Encode to convert each character to its escape sequence representation.
          </p>
          <p>
            The encoder supports multiple formats. Unicode uses {"\\uXXXX"} for basic characters and {"\\U{XXXXXXXX}"} for extended. JavaScript and Java use {"\\uXXXX"} with surrogate pairs for emoji. Python supports both {"\\uXXXX"} and {"\\UXXXXXXXX"}. HTML uses {"&#xXXXX;"} entities. CSS uses {"\\XXXXXX"} with optional trailing space.
          </p>
          <p>
            Decoding works the same way in reverse. Paste escape sequences and select the matching format. The decoder recognizes the syntax for each format and converts back to readable text.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing portable string literals</h3>
            <p className="text-sm text-muted-foreground">
              Your code needs to work across systems with different default encodings. Use escape sequences to ensure "cafe" renders correctly everywhere as "caf\u00E9".
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fixing corrupted JSON data</h3>
            <p className="text-sm text-muted-foreground">
              API returns strings like "Hello\\u0020World" that display literally. Decode them to get "Hello World". Or encode your strings properly before sending.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating CSS content values</h3>
            <p className="text-sm text-muted-foreground">
              Need to insert special characters via CSS? Use escape sequences in content: property. "\00A9" produces the copyright symbol without encoding issues.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging string encoding bugs</h3>
            <p className="text-sm text-muted-foreground">
              See exactly what characters are in a string. "test" becomes "\u0074\u0065\u0073\u0074". Helps identify invisible characters or unexpected Unicode.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Generating test data for parsers</h3>
            <p className="text-sm text-muted-foreground">
              Test your JSON or string parser with edge cases. Generate escape sequences for boundary code points like U+D7FF, U+E000, U+FFFF to test surrogate handling.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with legacy ASCII systems</h3>
            <p className="text-sm text-muted-foreground">
              Old systems only handle ASCII. Encode Unicode text as escape sequences they can store. Decode when reading back to display proper characters to users.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Surrogate pairs matter for emoji.</strong>
              JavaScript and Java use two \u escapes for characters above U+FFFF. "" is \uD83D\uDE00, not a single escape. Python's \U0001F600 is cleaner for these.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">CSS escapes need trailing space sometimes.</strong>
              If a CSS escape could be followed by a hex digit, add a space. "\0041B" is ambiguous, but "\0041 B" clearly means "A" followed by "B".
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">HTML entities have decimal and hex forms.</strong>
              This tool generates hex (&#x00E9;). Decimal (&#233;) works too. Both produce "e". Hex is more readable when you know the code point.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Not all escapes are valid in all contexts.</strong>
              JSON only allows \uXXXX, not \UXXXXXXXX. JavaScript template literals support \u{} syntax. Know your target format's rules.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> When encoding for source code, use escape sequences sparingly. Readable text like "naive" is better than "na\u00EFve" unless you have a specific encoding requirement.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between \u and \U?</h3>
            <p className="text-sm text-muted-foreground">
              \u takes exactly 4 hex digits (U+0000 to U+FFFF). \U takes 8 hex digits for any code point. Python uses both. JavaScript uses \u with surrogate pairs for high characters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does JavaScript use two escapes for emoji?</h3>
            <p className="text-sm text-muted-foreground">
              JavaScript strings are UTF-16. Characters above U+FFFF need two 16-bit code units (surrogate pair). "" at U+1F600 becomes \uD83D\uDE00.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I decode mixed escape formats?</h3>
            <p className="text-sm text-muted-foreground">
              Select the format that matches your input. If you have mixed formats, decode each section separately. The decoder expects consistent syntax.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do escape sequences work in all programming languages?</h3>
            <p className="text-sm text-muted-foreground">
              Most languages support \uXXXX. C, C++, Java, JavaScript, Python, C#, and PHP all recognize Unicode escapes. Syntax varies slightly between them.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about control characters like newline?</h3>
            <p className="text-sm text-muted-foreground">
              Common escapes like \n (newline), \t (tab), \r (carriage return) are recognized. They're shorthand for \u000A, \u0009, \u000D respectively.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I include a literal backslash?</h3>
            <p className="text-sm text-muted-foreground">
              Escape the backslash itself: \\ becomes one backslash. In escape sequences, \\\\u0041 gives you "\u0041" as literal text, not the letter "A".
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for regex patterns?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but be careful with escaping. Regex has its own escape rules. \u0041 in a regex string literal matches "A". You may need double-escaping in some languages.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
