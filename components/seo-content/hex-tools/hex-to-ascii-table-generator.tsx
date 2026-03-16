import * as React from "react"

export default function HexToAsciiTableGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Enter hexadecimal byte values to generate an ASCII table showing the character representation of each byte. The tool displays hex values alongside their decimal equivalents and corresponding ASCII characters.
          </p>
          <p>
            Printable characters (0x20-0x7E) are shown directly. Non-printable control characters (0x00-0x1F, 0x7F) are displayed with their standard names (NUL, SOH, LF, CR, etc.) or escape sequences.
          </p>
          <p>
            Extended ASCII (0x80-0xFF) shows the character if displayable, with Unicode code point information. Results are presented in a tabular format with configurable columns for easy reference.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Character Encoding Reference</h3>
            <p className="text-sm text-muted-foreground">
              Look up ASCII codes and their hex values for programming and data encoding tasks.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Binary File Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Interpret hex dumps by seeing which bytes correspond to printable ASCII characters.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Protocol Debugging</h3>
            <p className="text-sm text-muted-foreground">
              Analyze network protocol data to identify ASCII commands and responses in hex streams.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Education</h3>
            <p className="text-sm text-muted-foreground">
              Learn ASCII encoding and the relationship between character codes and hex values.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">String Manipulation</h3>
            <p className="text-sm text-muted-foreground">
              Find hex codes for specific characters when crafting strings for testing or exploits.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Data Validation</h3>
            <p className="text-sm text-muted-foreground">
              Verify that data expected to be ASCII doesn't contain unexpected control characters.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">ASCII range:</strong> Standard ASCII is 0-127 (0x00-0x7F). Extended ASCII (128-255, 0x80-0xFF) varies by code page.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Control characters:</strong> 0x00-0x1F and 0x7F are non-printable control codes like NUL, TAB, LF, CR used for device control.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Printable range:</strong> Printable ASCII is 0x20 (space) through 0x7E (~). This includes letters, digits, and punctuation.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Common codes:</strong> Space=0x20, '0'=0x30, 'A'=0x41, 'a'=0x61. Knowing these helps with quick mental conversion.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">UTF-8 compatibility:</strong> UTF-8 is backward compatible with ASCII for 0x00-0x7F. Higher values are multi-byte UTF-8 sequences.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">What is 'A' in hex?</h3>
            <p className="text-sm text-muted-foreground">
              'A' is 0x41 (decimal 65) in ASCII. Lowercase 'a' is 0x61 (decimal 97). The difference is 0x20 (32).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What does 0x0A mean?</h3>
            <p className="text-sm text-muted-foreground">
              0x0A is Line Feed (LF), the Unix newline character. Windows uses 0x0D 0x0A (CRLF) for line endings.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What is the hex for space?</h3>
            <p className="text-sm text-muted-foreground">
              Space character is 0x20 (decimal 32). It's the first printable ASCII character after the control codes.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I find hex for any character?</h3>
            <p className="text-sm text-muted-foreground">
              Use the text-to-hex converter for full strings, or note that ASCII letters are sequential: 'A'=0x41, 'B'=0x42, etc.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What are control characters?</h3>
            <p className="text-sm text-muted-foreground">
              Control characters (0x00-0x1F, 0x7F) control devices rather than display. Examples: 0x09=TAB, 0x0A=LF, 0x0D=CR, 0x1B=ESC.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What is 0x7F?</h3>
            <p className="text-sm text-muted-foreground">
              0x7F is DEL (delete), the last 7-bit ASCII code. It was used to mark deleted characters on paper tape.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I see extended ASCII?</h3>
            <p className="text-sm text-muted-foreground">
              Extended ASCII (0x80-0xFF) varies by code page. Modern systems use UTF-8 where these are multi-byte character starts.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
