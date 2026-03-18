import React from "react"

export default function Z85Base85EncoderDecoderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Z85/Base85 Encoder/Decoder Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter binary data or text to encode to Z85 (ZeroMQ Base85), or paste Z85-encoded data to decode. The tool processes the conversion instantly with validation.
          </p>
          <p>
            Z85 encodes 4 bytes into 5 ASCII characters. It uses 85 printable characters from the ASCII range. More efficient than Base64 while remaining text-safe and human-readable.
          </p>
          <p>
            The encoder pads input to multiples of 4 bytes. The decoder validates Z85 format and reconstructs the original binary. Error detection catches invalid characters.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with ZeroMQ messages</h3>
            <p className="text-sm text-muted-foreground">
              ZeroMQ uses Z85 for binary data in text protocols. Encode binary messages for transport. Decode received Z85 data back to binary.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Embedding binary in JSON</h3>
            <p className="text-sm text-muted-foreground">
              JSON doesn't handle binary. Encode binary data as Z85 strings. More compact than Base64. Parse as regular JSON strings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Git object encoding</h3>
            <p className="text-sm text-muted-foreground">
              Git uses Ascii85 (similar to Z85) in some formats. Understand the encoding for Git internals. Decode packed objects or patches.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">PDF stream encoding</h3>
            <p className="text-sm text-muted-foreground">
              PDF uses Ascii85 for stream compression. Decode PDF streams to analyze content. Understand PDF internal structure.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating compact API payloads</h3>
            <p className="text-sm text-muted-foreground">
              Reduce API payload size with Z85. 25% smaller than Base64. Faster transmission, less bandwidth. Good for mobile apps.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Storing binary in text databases</h3>
            <p className="text-sm text-muted-foreground">
              Some databases handle text better than binary. Encode binary as Z85 for storage. Decode when retrieving. Works with any text field.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Z85 differs from standard Base85.</strong>
              Z85 (ZeroMQ) uses a different character set than Ascii85 (Adobe). Both encode 4 bytes to 5 chars. Character mappings differ. This tool uses Z85.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Output is 25% larger than input.</strong>
              4 bytes become 5 characters. 25% overhead. Better than Base64's 33%. Still larger than raw binary.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">All characters are printable.</strong>
              Z85 uses ASCII 33-117 excluding backslash. No control characters. Safe for any text transport. Easy to read and debug.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Padding handles incomplete groups.</strong>
              Input not divisible by 4 gets padded. Padding is implicit in the output length. Decoder knows how to handle it.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Z85 is ideal when you need better efficiency than Base64 but can't use raw binary. Perfect for text protocols that need to carry binary data efficiently.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the Z85 character set?</h3>
            <p className="text-sm text-muted-foreground">
              85 printable ASCII characters: digits, letters, and symbols. Excludes backslash for easier string handling. Specific order defined by ZeroMQ spec.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How does Z85 compare to Base64?</h3>
            <p className="text-sm text-muted-foreground">
              Z85: 5 chars per 4 bytes (25% overhead). Base64: 4 chars per 3 bytes (33% overhead). Z85 is ~7% more efficient. Both are text-safe.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is Z85 URL-safe?</h3>
            <p className="text-sm text-muted-foreground">
              Mostly, but not entirely. Some Z85 characters have special URL meaning. For URLs, use Base64URL or percent-encode Z85 output.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I encode text directly?</h3>
            <p className="text-sm text-muted-foreground">
              Text is first converted to bytes (UTF-8), then encoded. The result is Z85 representation of the byte sequence. Decode reverses the process.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about Ascii85?</h3>
            <p className="text-sm text-muted-foreground">
              Ascii85 (Adobe) is similar but uses different characters. Z85 was designed to avoid problematic characters. Both encode 4 bytes to 5 chars.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is Z85 reversible?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, perfectly lossless. Encode then decode returns exact original data. Used for reliable binary transport over text channels.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Where is Z85 commonly used?</h3>
            <p className="text-sm text-muted-foreground">
              ZeroMQ messaging, some blockchain protocols, compact data serialization. Growing adoption where Base64 overhead matters.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
