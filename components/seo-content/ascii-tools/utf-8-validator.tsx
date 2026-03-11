import React from "react"

export default function Utf8ValidatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool validates whether text or byte sequences form valid UTF-8
            encoded data. UTF-8 has strict rules about which byte sequences are
            legal, and this validator checks each byte against those rules.
          </p>
          <p>
            UTF-8 uses 1-4 bytes per character. Single-byte characters (0-127)
            are ASCII. Multi-byte sequences must follow specific patterns:
            continuation bytes must start with 10xxxxxx, and the total length
            must match the leading byte's indication.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">UTF-8 byte patterns:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">0xxxxxxx</code>
                <span>1-byte character (ASCII)</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">110xxxxx 10xxxxxx</code>
                <span>2-byte character</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">1110xxxx 10xxxxxx 10xxxxxx</code>
                <span>3-byte character</span>
              </div>
            </div>
          </div>
          <p>
            Paste text or hex bytes to validate. The tool highlights invalid
            sequences and explains what went wrong—missing continuation bytes,
            overlong encoding, or invalid code points.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging character encoding corruption</h3>
            <p className="text-sm text-muted-foreground">
              A developer sees garbled text in logs and suspects encoding issues.
              They validate the byte sequence to find where invalid UTF-8 starts,
              pinpointing where data got corrupted in the pipeline.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing file upload validation</h3>
            <p className="text-sm text-muted-foreground">
              A backend engineer builds an API that accepts text files. They
              test with invalid UTF-8 sequences to ensure the validator rejects
              malformed input before it causes database issues.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing network packet captures</h3>
            <p className="text-sm text-muted-foreground">
              A security analyst examines HTTP traffic and needs to verify
              whether payload data is valid UTF-8. Invalid sequences might
              indicate encoding attacks or data exfiltration attempts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fixing database encoding errors</h3>
            <p className="text-sm text-muted-foreground">
              A DBA encounters "invalid byte sequence for UTF-8" errors during
              import. They validate the source file to identify problematic
              bytes before cleaning and re-importing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building robust text parsers</h3>
            <p className="text-sm text-muted-foreground">
              A developer writes a parser that must handle potentially malformed
              input. They use this validator to test edge cases and ensure their
              error handling covers all invalid UTF-8 patterns.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Forensic analysis of corrupted files</h3>
            <p className="text-sm text-muted-foreground">
              A forensic examiner recovers text from damaged storage. They
              validate UTF-8 sequences to separate recoverable text from
              corrupted regions that need reconstruction.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Valid UTF-8 isn't always valid text.</strong>
              A sequence can be valid UTF-8 but represent nonsense characters
              or unassigned code points. This validator checks encoding rules,
              not semantic meaning.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Overlong encodings are invalid.</strong>
              Encoding ASCII 'A' (0x41) as a 2-byte sequence is technically
              decodable but violates UTF-8 rules. This validator catches
              overlong encodings that some decoders might accept.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Surrogate codes are forbidden in UTF-8.</strong>
              Code points U+D800 to U+DFFF are reserved for UTF-16 surrogates
              and must not appear in valid UTF-8. This validator rejects them.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Truncated sequences are common errors.</strong>
              A 3-byte character cut off after 2 bytes is invalid. This happens
              when files are truncated or strings are cut at byte boundaries
              instead of character boundaries.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Security note:</strong> Invalid UTF-8 can bypass security
              filters that assume valid encoding. Always validate input before
              processing, especially for paths, URLs, and database queries.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What makes UTF-8 invalid?</h3>
            <p className="text-sm text-muted-foreground">
              Common issues: continuation bytes without a leading byte, wrong
              number of continuation bytes, overlong encodings, surrogate code
              points, or bytes above 0xF4. Any of these make UTF-8 invalid.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I fix invalid UTF-8?</h3>
            <p className="text-sm text-muted-foreground">
              Options: remove invalid bytes, replace with replacement character
              (U+FFFD), or re-encode from the original source if available.
              The right fix depends on your use case and data importance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can ASCII be invalid UTF-8?</h3>
            <p className="text-sm text-muted-foreground">
              No, pure ASCII (bytes 0-127) is always valid UTF-8. UTF-8 was
              designed to be backward compatible with ASCII. Invalid UTF-8
              always involves bytes 128-255.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the replacement character?</h3>
            <p className="text-sm text-muted-foreground">
              U+FFFD () is the Unicode replacement character. It marks where
              invalid or unrepresentable characters were encountered. Many
              systems use it to replace invalid UTF-8 sequences.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do I see  instead of text?</h3>
            <p className="text-sm text-muted-foreground">
              The  diamond-question mark indicates invalid or unrenderable
              characters. Your system encountered bytes that aren't valid
              UTF-8 or characters your font can't display.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is UTF-8 the same as ASCII?</h3>
            <p className="text-sm text-muted-foreground">
              ASCII is a subset of UTF-8. Bytes 0-127 mean the same thing in
              both. UTF-8 extends ASCII to support all Unicode characters
              using multi-byte sequences.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I prevent UTF-8 errors?</h3>
            <p className="text-sm text-muted-foreground">
              Always declare UTF-8 encoding (in HTML meta tags, HTTP headers,
              database connections). Validate input at system boundaries. Use
              libraries that handle UTF-8 correctly.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
