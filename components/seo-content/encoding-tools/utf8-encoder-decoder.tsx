import React from "react"

export default function Utf8EncoderDecoderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool encodes text to UTF-8 byte sequences and decodes UTF-8
            bytes back to readable text. UTF-8 is the dominant character encoding
            for the web, supporting all Unicode characters.
          </p>
          <p>
            The encoder converts each character to its UTF-8 byte representation,
            showing results in hexadecimal, binary, or decimal formats. ASCII
            characters (0-127) encode as single bytes, while other characters
            use 2-4 bytes depending on their code point.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">UTF-8 encoding examples:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">A</code>
                <span>encodes to 0x41 (1 byte)</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">€</code>
                <span>encodes to 0xE2 0x82 0xAC (3 bytes)</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">😀</code>
                <span>encodes to 0xF0 0x9F 0x98 0x80 (4 bytes)</span>
              </div>
            </div>
          </div>
          <p>
            Type text to encode or paste hex bytes to decode. The tool validates
            UTF-8 sequences and shows results in multiple formats for copying.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging character encoding issues</h3>
            <p className="text-sm text-muted-foreground">
              A developer sees garbled text in their application. They encode
              the expected text to UTF-8 hex and compare against the actual
              bytes to find where encoding went wrong.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating byte arrays for code</h3>
            <p className="text-sm text-muted-foreground">
              A programmer needs a byte array containing specific Unicode text.
              They encode to UTF-8 hex and format as {"{0x48, 0x65, ...}"} for
              their C or Rust code.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing network protocol data</h3>
            <p className="text-sm text-muted-foreground">
              A network engineer inspects packet captures with text payloads.
              They decode UTF-8 hex dumps to read the actual message content
              being transmitted.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing internationalization</h3>
            <p className="text-sm text-muted-foreground">
              A QA engineer verifies their app handles all languages correctly.
              They encode test strings in various scripts to UTF-8 and verify
              the byte lengths match expectations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with binary file formats</h3>
            <p className="text-sm text-muted-foreground">
              A reverse engineer examines file formats that store strings as
              UTF-8. They decode hex dumps to extract text content from binary
              files for analysis.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Implementing custom serialization</h3>
            <p className="text-sm text-muted-foreground">
              A backend engineer writes a protocol that serializes strings as
              UTF-8 with length prefix. They use this tool to verify their
              encoding matches the specification.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">UTF-8 is variable-length.</strong>
              ASCII uses 1 byte, European characters often use 2, Asian
              characters use 3, and emoji use 4 bytes. String length in
              bytes differs from character count.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Invalid UTF-8 sequences exist.</strong>
              Not all byte sequences are valid UTF-8. The tool validates
              and rejects malformed sequences like incomplete multi-byte
              characters or overlong encodings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">BOM is optional in UTF-8.</strong>
              Some systems add a Byte Order Mark (0xEF 0xBB 0xBF) at the
              start. UTF-8 doesn't need it, but Windows sometimes adds it.
              The tool handles BOM detection.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Hex input accepts various formats.</strong>
              You can paste "E282AC", "E2 82 AC", "0xE2 0x82 0xAC", or
              "\xE2\x82\xAC". The tool parses all common hex formats.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Security note:</strong> UTF-8 validation is important
              for security. Invalid UTF-8 can bypass filters that assume
              valid encoding. Always validate input at trust boundaries.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does UTF-8 use different byte counts?</h3>
            <p className="text-sm text-muted-foreground">
              UTF-8 is designed to be backward compatible with ASCII. Common
              characters (ASCII) use 1 byte. Less common characters use more
              bytes. This optimizes space for English text while supporting
              all Unicode.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I know if text is valid UTF-8?</h3>
            <p className="text-sm text-muted-foreground">
              Paste the hex bytes into this tool. If it decodes successfully,
              it's valid UTF-8. If it shows an error, the bytes don't form
              valid UTF-8 sequences.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between UTF-8 and ASCII?</h3>
            <p className="text-sm text-muted-foreground">
              ASCII is a subset of UTF-8. Bytes 0-127 mean the same thing in
              both. UTF-8 extends ASCII to support all Unicode characters
              using multi-byte sequences.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I encode emoji to UTF-8?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, emoji encode as 4-byte UTF-8 sequences. 😀 becomes
              0xF0 0x9F 0x98 0x80. All Unicode characters including emoji
              have valid UTF-8 encodings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I convert UTF-8 to other encodings?</h3>
            <p className="text-sm text-muted-foreground">
              This tool handles UTF-8 specifically. For other encodings like
              UTF-16 or Latin-1, use dedicated converters or iconv command-line
              tool.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is a UTF-8 code point?</h3>
            <p className="text-sm text-muted-foreground">
              A code point is the Unicode number for a character (like U+0041
              for 'A'). UTF-8 encodes code points into bytes. The code point
              is the abstract character, UTF-8 is one way to encode it.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why use hex format for UTF-8?</h3>
            <p className="text-sm text-muted-foreground">
              Hex is compact and readable for binary data. Each byte is two
              hex digits. It's easier to work with than decimal or binary
              for most programming tasks.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
