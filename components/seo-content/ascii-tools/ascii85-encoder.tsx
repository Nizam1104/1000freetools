import React from "react"

export default function Ascii85EncoderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            ASCII85 (also called Base85) encodes binary data into ASCII text
            using 85 printable characters. It's more efficient than Base64,
            producing 25% smaller output while remaining text-safe.
          </p>
          <p>
            The algorithm processes 4 bytes at a time, treating them as a
            32-bit number. This number converts to 5 base-85 digits, each
            mapped to a character from ! (0) to u (84). Four zero bytes
            compress to a single 'z' character.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example encoding:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">Hello</code>
                <span>becomes</span>
                <code className="font-mono bg-background px-2 py-1 rounded">87cURD_*#</code>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">Base64 vs ASCII85</code>
                <span>ASCII85 is ~25% smaller</span>
              </div>
            </div>
          </div>
          <p>
            Type or paste data to encode, or ASCII85 text to decode. The tool
            handles both standard ASCII85 (with &lt;~ ~&gt; delimiters) and
            raw ASCII85. Output appears instantly with copy functionality.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with PDF file internals</h3>
            <p className="text-sm text-muted-foreground">
              A developer parses PDF files and encounters ASCII85-encoded
              streams. They decode the content to extract embedded data,
              images, or compressed objects from the PDF structure.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Processing PostScript files</h3>
            <p className="text-sm text-muted-foreground">
              A graphic designer works with PostScript files that use ASCII85
              for binary data. They decode to modify embedded fonts or images
              before re-encoding for the final output.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Optimizing data URIs in web development</h3>
            <p className="text-sm text-muted-foreground">
              A frontend developer embeds small binary resources in CSS.
              ASCII85 produces shorter data URIs than Base64, reducing file
              size for embedded fonts and small images.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging Adobe file formats</h3>
            <p className="text-sm text-muted-foreground">
              A reverse engineer examines Adobe file formats that use ASCII85
              encoding. They decode sections to understand the binary structure
              and document embedded data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Implementing efficient text-safe encoding</h3>
            <p className="text-sm text-muted-foreground">
              A backend engineer needs to encode binary data for a text-only
              protocol. ASCII85 gives better efficiency than Base64 while
              maintaining compatibility with text systems.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing encoding library implementations</h3>
            <p className="text-sm text-muted-foreground">
              A QA engineer validates their ASCII85 implementation against
              known test vectors. They use this tool to generate expected
              outputs for comparison.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">ASCII85 uses characters ! through u.</strong>
              The 85 characters span ASCII 33 (!) to 117 (u). Some aren't
              URL-safe. Don't use ASCII85 in URLs without additional encoding.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Standard ASCII85 has delimiters.</strong>
              Adobe's ASCII85 wraps encoded data in &lt;~ and ~&gt;. Raw
              ASCII85 omits these. This tool handles both formats.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Input length affects padding.</strong>
              ASCII85 processes 4 bytes at a time. If input isn't divisible
              by 4, the last group gets padded. Decoding removes the padding
              automatically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">'z' is a special compression.</strong>
              Four zero bytes (0x00000000) encode as single 'z'. This compresses
              runs of zeros efficiently. Decoding expands 'z' back to four
              null bytes.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Note:</strong> ASCII85 is less common than Base64. Only
              use it when you specifically need it (PDF, PostScript) or when
              the 25% size savings matters and you control both encoder and
              decoder.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is ASCII85 better than Base64?</h3>
            <p className="text-sm text-muted-foreground">
              ASCII85 encodes 4 bytes as 5 characters (1.25 expansion). Base64
              encodes 3 bytes as 4 characters (1.33 expansion). ASCII85 output
              is about 25% smaller for the same input.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Where is ASCII85 commonly used?</h3>
            <p className="text-sm text-muted-foreground">
              PDF files use ASCII85 for streams. PostScript uses it for binary
              data. Some protocols like ZeroMQ use Z85 (a variant). It's less
              common than Base64 outside Adobe formats.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between ASCII85 and Base85?</h3>
            <p className="text-sm text-muted-foreground">
              They're essentially the same concept with different character
              sets. ASCII85 uses ! to u. Base85 variants like Z85 use different
              characters optimized for specific uses (Z85 is URL-safe).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I decode ASCII85 without the delimiters?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, raw ASCII85 works without &lt;~ ~&gt;. The delimiters are
              just markers. This tool accepts both formats and detects
              automatically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is ASCII85 safe for email?</h3>
            <p className="text-sm text-muted-foreground">
              Mostly, but some characters like backslash might cause issues
              with certain mail systems. Base64 is safer for email. Use
              quoted-printable or Base64 for email attachments.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How does the 'z' compression work?</h3>
            <p className="text-sm text-muted-foreground">
              When all 4 input bytes are zero, instead of outputting '!!!!!'
              (five exclamation marks), ASCII85 outputs single 'z'. This
              compresses runs of null bytes significantly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I encode text directly to ASCII85?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, text is just bytes. The encoder treats input as raw bytes
              regardless of whether it's text or binary. Text gets converted
              to its byte representation first.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
