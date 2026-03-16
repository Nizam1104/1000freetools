import React from "react"

export default function Base64EncoderDecoderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Base64 encoding converts binary data into ASCII text by grouping bytes into
            6-bit chunks and mapping each to a character from a 64-character set
            (A-Z, a-z, 0-9, +, /). This allows binary data to travel through systems
            designed for text.
          </p>
          <p>
            The encoder takes 3 bytes (24 bits) and splits them into 4 groups of 6 bits.
            Each 6-bit value becomes a character. If the input isn't divisible by 3,
            padding characters (=) fill the remaining space. Decoding reverses this
            process exactly.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example encoding:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">Hello</code>
                <span>becomes</span>
                <code className="font-mono bg-background px-2 py-1 rounded">SGVsbG8=</code>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">123</code>
                <span>becomes</span>
                <code className="font-mono bg-background px-2 py-1 rounded">MTIz</code>
              </div>
            </div>
          </div>
          <p>
            Type or paste text to encode, or Base64 to decode. The tool detects
            automatically and processes instantly in your browser. No data leaves
            your device.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Embedding images in HTML or CSS</h3>
            <p className="text-sm text-muted-foreground">
              A frontend developer converts a small logo to Base64 and embeds it
              directly in CSS as a data URI. This reduces HTTP requests and speeds
              up page load for critical above-the-fold images.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sending binary data in JSON APIs</h3>
            <p className="text-sm text-muted-foreground">
              A backend engineer needs to include file attachments in JSON responses.
              They encode PDFs and images as Base64 strings so the binary data
              travels safely through the text-based JSON structure.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Storing credentials in environment variables</h3>
            <p className="text-sm text-muted-foreground">
              A DevOps engineer encodes API keys and certificates as Base64 before
              storing them in CI/CD environment variables. The encoded values avoid
              issues with special characters in shell scripts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Decoding email attachments manually</h3>
            <p className="text-sm text-muted-foreground">
              Someone receives a raw email file with Base64-encoded attachments.
              They extract the encoded block and use this tool to decode it back
              to the original file for saving.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing API authentication headers</h3>
            <p className="text-sm text-muted-foreground">
              A QA tester creates Basic Auth headers by encoding "username:password"
              in Base64. They paste the result into the Authorization header to
              test API endpoints during development.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Obfuscating data URLs in prototypes</h3>
            <p className="text-sm text-muted-foreground">
              A designer builds a quick prototype with placeholder images. They
              encode sample images as Base64 data URLs so the prototype works
              offline without external image dependencies.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Base64 is not encryption.</strong>
              Anyone can decode Base64. It's encoding, not security. Never use
              Base64 to hide sensitive data. Use proper encryption for that.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Base64 increases data size by about 33%.</strong>
              Every 3 bytes become 4 characters. For large files, this overhead
              matters. Consider compression before encoding if size is a concern.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Padding characters may be optional.</strong>
              Some systems omit the = padding at the end. This tool handles both
              padded and unpadded Base64, but be aware that different systems
              have different expectations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">URL-safe Base64 uses different characters.</strong>
              Standard Base64 uses + and / which aren't URL-safe. URL-safe variants
              use - and _ instead. This tool uses standard Base64. For URLs, you
              may need additional conversion.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> When embedding Base64 images in HTML, use
              them only for small files under 10KB. Large Base64 images bloat your
              HTML and slow down parsing. Keep external images external for anything
              substantial.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does Base64 stand for?</h3>
            <p className="text-sm text-muted-foreground">
              Base64 refers to the 64 characters used in the encoding scheme:
              uppercase A-Z (26), lowercase a-z (26), digits 0-9 (10), plus +,
              and slash /. That's 64 total characters, hence the name.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can Base64 decode back to the original file?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, Base64 encoding is reversible with no data loss. Decode the
              Base64 string and you get the exact original bytes back. This makes
              it reliable for data transmission.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my Base64 string end with equals signs?</h3>
            <p className="text-sm text-muted-foreground">
              The equals signs are padding. Base64 works in groups of 4 characters.
              If your input isn't divisible by 3 bytes, padding fills the gap.
              One = means 2 bytes of input, two == means 1 byte.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is Base64 safe for passwords?</h3>
            <p className="text-sm text-muted-foreground">
              No. Base64 provides zero security. Anyone who sees the encoded
              password can decode it instantly. Use proper password hashing
              algorithms like bcrypt or Argon2 for password storage.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I encode images to Base64?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, any binary file can be Base64 encoded. Images, PDFs, videos,
              executables—all work. The encoded result is a long text string
              that can be decoded back to the original file.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between Base64 and Base64URL?</h3>
            <p className="text-sm text-muted-foreground">
              Base64URL replaces + with - and / with _ to make the output safe
              for URLs and filenames. It also typically omits padding. Use
              Base64URL when the encoded string goes in a URL parameter.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I recognize Base64 encoded text?</h3>
            <p className="text-sm text-muted-foreground">
              Base64 contains only A-Z, a-z, 0-9, +, /, and optionally = at the
              end. The length is always a multiple of 4. If you see these patterns,
              it's likely Base64.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
