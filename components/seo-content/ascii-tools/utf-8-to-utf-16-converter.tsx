import React from "react"

export default function Utf8ToUtf16ConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool converts text between UTF-8 and UTF-16 encodings. Both are
            Unicode transformation formats that represent the same characters
            using different byte sequences.
          </p>
          <p>
            UTF-8 uses 1-4 bytes per character, with ASCII characters staying as
            single bytes. UTF-16 uses 2 or 4 bytes, with common characters in
            the Basic Multilingual Plane using exactly 2 bytes. The converter
            reads the input encoding and transforms each character to the target
            encoding's byte representation.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Encoding comparison:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">A</code>
                <span>UTF-8: 0x41, UTF-16: 0x0041</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">€</code>
                <span>UTF-8: 0xE2 0x82 0xAC, UTF-16: 0x20AC</span>
              </div>
            </div>
          </div>
          <p>
            Paste text in either encoding and select the conversion direction.
            The tool shows the byte representation and converted output instantly.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging cross-platform text issues</h3>
            <p className="text-sm text-muted-foreground">
              A developer sees garbled text when moving data between Windows
              (often UTF-16) and Linux (typically UTF-8). They convert between
              encodings to identify where the corruption occurs in the pipeline.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with Windows API functions</h3>
            <p className="text-sm text-muted-foreground">
              A programmer calls Windows APIs that expect UTF-16 wide strings.
              They convert UTF-8 input from their cross-platform code to UTF-16
              before passing to Windows functions like CreateFileW.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Processing Java string data</h3>
            <p className="text-sm text-muted-foreground">
              Java uses UTF-16 internally for strings. A developer working with
              Java native interfaces converts between UTF-8 (from C/C++ code)
              and UTF-16 (Java strings) for proper text handling.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing binary file formats</h3>
            <p className="text-sm text-muted-foreground">
              A reverse engineer examines a file format that stores strings in
              UTF-16. They convert the hex dump to readable text by interpreting
              the bytes as UTF-16 and converting to UTF-8 for display.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fixing database encoding mismatches</h3>
            <p className="text-sm text-muted-foreground">
              A DBA discovers a column stores UTF-16 data but the application
              expects UTF-8. They convert existing data to match the application's
              encoding before fixing the schema definition.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing internationalization code</h3>
            <p className="text-sm text-muted-foreground">
              A QA engineer tests whether their app handles encoding conversions
              correctly. They generate test strings with various Unicode characters
              and verify UTF-8 to UTF-16 conversion preserves all characters.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">UTF-8 and UTF-16 represent the same characters.</strong>
              This isn't a character conversion—it's a byte representation change.
              The visible text stays identical. Only the underlying bytes differ.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Byte order matters for UTF-16.</strong>
              UTF-16 can be big-endian (UTF-16BE) or little-endian (UTF-16LE).
              Windows typically uses little-endian. This tool handles both but
              you need to know which your system expects.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">UTF-8 is more space-efficient for ASCII.</strong>
              English text takes half the space in UTF-8 versus UTF-16. For
              primarily ASCII content, UTF-8 is the better choice.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some characters need 4 bytes in both encodings.</strong>
              Emoji and rare CJK characters outside the Basic Multilingual Plane
              require 4 bytes in UTF-16 (as surrogate pairs) and 4 bytes in UTF-8.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> When debugging encoding issues, look at
              the raw hex bytes. UTF-8 ASCII is 00-7F. UTF-16 has null bytes
              between ASCII characters (41 00 42 00 for "AB" in little-endian).
              This pattern helps identify the encoding quickly.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Which encoding should I use?</h3>
            <p className="text-sm text-muted-foreground">
              For web, APIs, and Unix systems, use UTF-8. It's the standard.
              For Windows APIs and Java internals, you'll encounter UTF-16.
              When you control the format, prefer UTF-8 for compatibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does UTF-16 text look weird in a hex editor?</h3>
            <p className="text-sm text-muted-foreground">
              UTF-16 stores each 16-bit code unit as two bytes. ASCII text like
              "Hello" appears as "H\0e\0l\0l\0o\0" with null bytes between
              characters. This is normal for UTF-16.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a byte order mark (BOM)?</h3>
            <p className="text-sm text-muted-foreground">
              A BOM is a special character (U+FEFF) at the start of a file that
              indicates the encoding and byte order. UTF-8 doesn't need one but
              may have it. UTF-16 uses it to signal big or little endian.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert any text between these encodings?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, any valid Unicode text converts between UTF-8 and UTF-16
              without loss. Both encodings support the full Unicode range.
              Invalid byte sequences will fail conversion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is my UTF-16 file twice as large?</h3>
            <p className="text-sm text-muted-foreground">
              For ASCII-heavy text, UTF-16 uses 2 bytes per character while
              UTF-8 uses 1 byte. Your file size roughly doubles. For non-ASCII
              text, the difference shrinks as UTF-8 needs more bytes too.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I know if UTF-16 is big or little endian?</h3>
            <p className="text-sm text-muted-foreground">
              Check the BOM at the start: FE FF means big-endian, FF FE means
              little-endian. Without a BOM, you need to know the source system.
              Windows uses little-endian, network protocols often use big-endian.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work with emoji?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, emoji convert correctly. They use 4 bytes in both encodings.
              In UTF-16, they appear as surrogate pairs—two 16-bit values that
              together represent one character.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
