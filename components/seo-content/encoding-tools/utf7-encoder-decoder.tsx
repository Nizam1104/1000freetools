import React from "react"

export default function Utf7EncoderDecoderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the UTF-7 Encoder/Decoder Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter text to encode to UTF-7, or paste UTF-7 encoded text to decode. The tool processes the conversion with proper handling of shifted sequences.
          </p>
          <p>
            UTF-7 encodes Unicode using only 7-bit ASCII characters. ASCII characters pass through unchanged. Non-ASCII uses Base64-like encoding between + and - markers.
          </p>
          <p>
            The encoder shifts to Base64 mode for non-ASCII, then shifts back. The decoder detects shift sequences and converts back to Unicode. Handles optional direct characters.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Legacy email system support</h3>
            <p className="text-sm text-muted-foreground">
              Old email systems only handle 7-bit ASCII. UTF-7 enables Unicode in these systems. Rarely needed today but still in some legacy environments.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">IMAP folder name encoding</h3>
            <p className="text-sm text-muted-foreground">
              IMAP uses modified UTF-7 for folder names. International mailbox names need encoding. Decode folder names for display.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Security research</h3>
            <p className="text-sm text-muted-foreground">
              UTF-7 has known security issues. Research encoding-based attacks. Understand why UTF-7 is deprecated in many contexts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Protocol analysis</h3>
            <p className="text-sm text-muted-foreground">
              Some protocols historically used UTF-7. Decode captured traffic. Understand legacy protocol behavior.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Encoding education</h3>
            <p className="text-sm text-muted-foreground">
              UTF-7 demonstrates 7-bit Unicode encoding. Educational value for understanding encoding challenges. Historical interest in encoding evolution.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with old systems</h3>
            <p className="text-sm text-muted-foreground">
              Maintaining legacy applications? May encounter UTF-7. Decode for modern processing. Migrate to UTF-8 when possible.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">UTF-7 is deprecated.</strong>
              Modern systems use UTF-8. UTF-7 has security vulnerabilities. Only use when required by legacy systems.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Shift characters mark encoding.</strong>
              + starts Base64 shift, - ends it. + itself must be encoded as +- . Shift mechanism enables ASCII passthrough.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Modified Base64 is used.</strong>
              UTF-7 uses Base64 without padding. Alphabet differs slightly from standard Base64. Optimized for Unicode encoding.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Direct characters vary.</strong>
              Set A: always direct (alphanumeric). Set B: direct in some contexts. Set D: direct in UTF-7 but not IMAP. Know your variant.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Never use UTF-7 for web content. Browsers may interpret it differently, enabling XSS attacks. Always use UTF-8 for web applications.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is UTF-7?</h3>
            <p className="text-sm text-muted-foreground">
              7-bit Unicode encoding. Uses ASCII for common characters, Base64 for others. Designed for email systems that couldn't handle 8-bit data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why was UTF-7 created?</h3>
            <p className="text-sm text-muted-foreground">
              Early email systems were 7-bit only. UTF-7 enabled Unicode in these systems. Solution before 8-bit-clean systems were universal.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is UTF-7 still used?</h3>
            <p className="text-sm text-muted-foreground">
              Rarely. IMAP folder names use modified UTF-7. Some legacy systems. Deprecated for web and modern applications. Use UTF-8 instead.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What are the security issues?</h3>
            <p className="text-sm text-muted-foreground">
              Multiple interpretations possible. Can bypass filters. XSS attacks via UTF-7 encoding. Modern browsers block UTF-7 by default.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How does UTF-7 compare to UTF-8?</h3>
            <p className="text-sm text-muted-foreground">
              UTF-8 is more efficient and secure. UTF-7 is 7-bit safe but complex. UTF-8 is the universal standard today.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's IMAP UTF-7?</h3>
            <p className="text-sm text-muted-foreground">
              Modified UTF-7 for IMAP folder names. Uses & instead of +. Different direct character set. Specific to IMAP protocol.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I use UTF-7?</h3>
            <p className="text-sm text-muted-foreground">
              Only if required by legacy systems. For new development, always use UTF-8. UTF-7 is obsolete for most purposes.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
