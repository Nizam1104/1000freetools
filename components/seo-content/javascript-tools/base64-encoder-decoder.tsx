import React from "react"

export default function Base64EncoderDecoderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Base64 Encoder & Decoder Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter text to encode or Base64 string to decode. Toggle between encode and decode modes with a single click. The tool handles UTF-8 encoding properly for international characters.
          </p>
          <p>
            Encoding converts any text to Base64 format using the standard alphabet. Decoding reverses the process, handling padding and special characters correctly. Upload text files for batch processing.
          </p>
          <p>
            Results appear instantly with copy and download options. The swap button quickly reverses input and output. All processing happens locally - your data never leaves your browser.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Encoding data for URLs</h3>
            <p className="text-sm text-muted-foreground">
              Pass complex data in URL parameters. Base64 encoding handles special characters safely. Common for sharing state or tokens in links.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with API authentication</h3>
            <p className="text-sm text-muted-foreground">
              Basic Auth requires Base64-encoded credentials. Encode username:password strings for API headers. Decode received tokens for debugging.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Embedding binary data</h3>
            <p className="text-sm text-muted-foreground">
              Include images, files, or binary data in JSON or XML. Base64 converts binary to safe text. Essential for many API integrations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging encoded payloads</h3>
            <p className="text-sm text-muted-foreground">
              Received a Base64 string in logs or network traffic? Decode it to see the actual content. Understand what your application is sending.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Storing data in cookies</h3>
            <p className="text-sm text-muted-foreground">
              Cookies have character restrictions. Base64 encoding ensures safe storage. Decode on retrieval to get original values.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning about encoding</h3>
            <p className="text-sm text-muted-foreground">
              Understand how Base64 works by experimenting. See how input size relates to output. Learn about padding and character sets.
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
              Anyone can decode Base64. It's for safe transmission, not security. Don't use it to hide sensitive data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Output is about 33% larger.</strong>
              Base64 expands data size. Three bytes become four characters. Consider this for large payloads or bandwidth-constrained scenarios.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">UTF-8 handling is important.</strong>
              This tool properly handles Unicode characters. Simple Base64 implementations may corrupt non-ASCII text. We use encodeURIComponent for safety.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Padding may be omitted.</strong>
              Standard Base64 uses = for padding. Some implementations omit it. This tool handles both padded and unpadded input.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For URL-safe Base64, replace + with - and / with _. This tool uses standard Base64. Use URL-safe variants for query parameters.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What characters are in Base64?</h3>
            <p className="text-sm text-muted-foreground">
              A-Z, a-z, 0-9, +, /, and = for padding. 64 characters total, hence the name. URL-safe variants use - and _ instead of + and /.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I encode files?</h3>
            <p className="text-sm text-muted-foreground">
              Upload text files directly. Binary files need special handling. For images and other binaries, use a dedicated file-to-Base64 converter.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is my decoded text garbled?</h3>
            <p className="text-sm text-muted-foreground">
              The input may not be valid Base64. Or it might be binary data decoded as text. Ensure you're decoding the correct format.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is Base64 secure?</h3>
            <p className="text-sm text-muted-foreground">
              No, it's trivially reversible. Base64 provides no security. Use encryption (AES, RSA) for confidential data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the maximum input size?</h3>
            <p className="text-sm text-muted-foreground">
              Browser memory limits apply. Large inputs may slow down your browser. For huge files, use command-line tools or streaming approaches.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I decode Base64 images?</h3>
            <p className="text-sm text-muted-foreground">
              This tool decodes to text. For Base64 images, you need an image viewer or a Base64-to-image converter. The output would be binary image data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it work offline?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, once loaded, everything runs in your browser. No internet connection needed. Your data stays private on your device.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
