import React from "react"

export default function Base64EncoderDecoderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Base64 Encoder/Decoder Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select encode mode to convert text to Base64, or decode mode to convert Base64 back to text. Type or paste your content in the input field. The conversion happens automatically as you type.
          </p>
          <p>
            Encoding transforms binary data into ASCII text using 64 characters: A-Z, a-z, 0-9, +, and /. The output is about 33% larger than the input. Padding with = signs ensures the length is a multiple of 4.
          </p>
          <p>
            URL-safe mode replaces + with - and / with _, removing = padding. This makes Base64 strings safe for URLs and filenames without additional encoding. Toggle the checkbox to enable URL-safe output.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Embedding images in HTML</h3>
            <p className="text-sm text-muted-foreground">
              Convert small images to Base64 data URIs. Embed directly in HTML without separate files. Useful for icons, logos, and single-file web pages.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sending binary data in JSON</h3>
            <p className="text-sm text-muted-foreground">
              JSON doesn't handle binary data. Encode files, images, or encrypted data as Base64 strings. The API receives text that decodes back to binary.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Including credentials in HTTP headers</h3>
            <p className="text-sm text-muted-foreground">
              HTTP Basic Auth encodes "username:password" in Base64. The Authorization header carries "Basic dXNlcjpwYXNz". Never use without HTTPS.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Storing data in URLs</h3>
            <p className="text-sm text-muted-foreground">
              Pass data through URL parameters using URL-safe Base64. Query strings can't contain certain characters. URL-safe Base64 avoids encoding issues.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Decoding JWT tokens</h3>
            <p className="text-sm text-muted-foreground">
              JWT payloads are Base64URL encoded. Decode the middle section to see the token claims. Useful for debugging authentication issues.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Email attachments (MIME)</h3>
            <p className="text-sm text-muted-foreground">
              Email uses Base64 for attachments. Binary files become text that travels through email systems. Decode received attachments to restore original files.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Base64 is encoding, not encryption.</strong>
              Anyone can decode Base64. It's for data representation, not security. Don't use to hide sensitive information.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Output is larger than input.</strong>
              Base64 adds about 33% overhead. Four output characters represent three input bytes. Consider compression for large data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Padding may be optional.</strong>
              Standard Base64 uses = for padding. Some implementations omit it. This tool handles both padded and unpadded input.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">URL-safe Base64 differs slightly.</strong>
              Standard uses + and /. URL-safe uses - and _. URL-safe omits padding. Both decode to the same data.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For JWT tokens, always use URL-safe Base64. Standard Base64 characters break URLs. JWT libraries handle this automatically, but manual decoding requires URL-safe mode.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is Base64 used?</h3>
            <p className="text-sm text-muted-foreground">
              Base64 converts binary to text. Text travels safely through systems designed for text (email, JSON, URLs). Binary data might get corrupted in text-only channels.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I encode files?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, use the upload button for text files. For binary files, you'd need a file-to-Base64 converter. This tool handles text input primarily.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does the padding mean?</h3>
            <p className="text-sm text-muted-foreground">
              Padding (=) makes the output length a multiple of 4. One = means 2 bytes in the last group. Two = means 1 byte. No = means 3 bytes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is Base64 reversible?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, perfectly. Decoding Base64 always returns the exact original data. No information is lost. It's a lossless encoding scheme.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What characters are in Base64?</h3>
            <p className="text-sm text-muted-foreground">
              A-Z (26), a-z (26), 0-9 (10), plus +, and slash /. That's 64 characters. URL-safe replaces + with - and / with _.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can Base64 contain spaces?</h3>
            <p className="text-sm text-muted-foreground">
              Standard Base64 doesn't include spaces. Some implementations add line breaks every 76 characters (MIME format). This tool produces continuous output.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is my decoded text garbled?</h3>
            <p className="text-sm text-muted-foreground">
              The Base64 might encode binary data, not text. Or the wrong character encoding was used. Try different encodings (UTF-8, Latin-1) if text looks wrong.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
