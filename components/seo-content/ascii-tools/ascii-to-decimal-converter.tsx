import React from "react"

export default function AsciiToDecimalConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool converts ASCII characters to their decimal code values.
            Each character in the ASCII table has a unique number from 0 to 127.
            The converter looks up each character and outputs its decimal equivalent.
          </p>
          <p>
            For example, 'A' is 65, 'a' is 97, '0' is 48, and space is 32. The
            tool processes each character independently and shows the decimal
            values separated by spaces for readability.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example conversions:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">ABC</code>
                <span>becomes</span>
                <code className="font-mono bg-background px-2 py-1 rounded">65 66 67</code>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">Hello</code>
                <span>becomes</span>
                <code className="font-mono bg-background px-2 py-1 rounded">72 101 108 108 111</code>
              </div>
            </div>
          </div>
          <p>
            Type text to see decimal values instantly. The reverse conversion
            (decimal to ASCII) also works—paste space-separated numbers to get
            the text back.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning ASCII encoding in computer science</h3>
            <p className="text-sm text-muted-foreground">
              A student studies how computers represent text internally. They
              convert their name to decimal ASCII values to understand that
              "72 101 108 108 111" is how the computer stores "Hello".
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging character encoding issues</h3>
            <p className="text-sm text-muted-foreground">
              A developer sees unexpected characters in output. They convert
              to decimal to discover a non-breaking space (160) instead of
              regular space (32), explaining the layout bug.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing character validation code</h3>
            <p className="text-sm text-muted-foreground">
              A programmer needs to validate input contains only digits. They
              check that character codes fall between 48 and 57 (ASCII for
              '0' through '9') to verify numeric input.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating CTF cryptography challenges</h3>
            <p className="text-sm text-muted-foreground">
              A cybersecurity competition organizer encodes flags as ASCII
              decimal values. Participants must recognize the pattern and
              convert back to text to find the hidden flag.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Processing legacy data formats</h3>
            <p className="text-sm text-muted-foreground">
              An engineer works with old systems that store text as decimal
              ASCII values. They convert between human-readable text and the
              decimal format for data migration.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing input sanitization functions</h3>
            <p className="text-sm text-muted-foreground">
              A QA engineer tests whether their sanitizer blocks control
              characters. They generate test cases with specific ASCII codes
              (like 0-31) to verify proper handling.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">ASCII only covers codes 0-127.</strong>
              Standard ASCII has 128 characters. Extended ASCII (128-255) varies
              by code page. Unicode characters above 255 need different handling
              than simple decimal conversion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Control characters (0-31) aren't printable.</strong>
              Codes 0-31 are control characters like null, tab, newline. They
              don't display as visible characters but affect text formatting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Case matters in ASCII.</strong>
              Uppercase 'A' is 65, lowercase 'a' is 97. The 32-point difference
              is consistent—flip bit 5 to toggle case in ASCII.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Space is ASCII 32, not zero.</strong>
              The space character has code 32. Code 0 is the null character,
              which marks string endings in C and can't be stored in regular
              strings.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Memorize key ASCII values: 32=space,
              48-57=digits, 65-90=uppercase, 97-122=lowercase. These ranges
              help you quickly identify character types when debugging.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is ASCII code for 'A'?</h3>
            <p className="text-sm text-muted-foreground">
              'A' is ASCII code 65. Uppercase letters run from 65 ('A') to
              90 ('Z'). Lowercase 'a' is 97, running to 122 for 'z'.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I convert decimal back to text?</h3>
            <p className="text-sm text-muted-foreground">
              Paste space-separated decimal numbers like "72 101 108 108 111"
              and the tool converts each to its ASCII character. 72 becomes
              'H', 101 becomes 'e', spelling "Hello".
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the ASCII code for newline?</h3>
            <p className="text-sm text-muted-foreground">
              Line feed (newline) is ASCII 10. Carriage return is 13. Windows
              uses both (13, 10) for line endings. Unix uses just 10. Old
              Mac used just 13.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert emoji to decimal?</h3>
            <p className="text-sm text-muted-foreground">
              Emoji are Unicode, not ASCII. They have code points above 127
              and need multiple bytes in UTF-8. This tool handles ASCII only.
              Use a Unicode converter for emoji.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why are there 128 ASCII characters?</h3>
            <p className="text-sm text-muted-foreground">
              ASCII uses 7 bits, giving 2^7 = 128 possible values (0-127).
              The 8th bit was sometimes used for parity checking or extended
              character sets.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What character is ASCII 0?</h3>
            <p className="text-sm text-muted-foreground">
              ASCII 0 is the null character, written as '\0'. It marks the
              end of strings in C and C++. You can't display it—it's a
              control character with no visual representation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is ASCII still used today?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, ASCII is the foundation of Unicode. The first 128 Unicode
              code points match ASCII exactly. Most English text is still
              pure ASCII even in UTF-8 encoding.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
