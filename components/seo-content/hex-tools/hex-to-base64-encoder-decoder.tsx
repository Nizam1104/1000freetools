import * as React from "react"

export default function HexToBase64EncoderDecoderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Enter hexadecimal data in the input field. For encoding, the hex is first converted to binary bytes, then encoded to Base64 using the standard Base64 alphabet (A-Z, a-z, 0-9, +, /).
          </p>
          <p>
            For decoding, Base64 input is converted back to binary, then displayed as hex. The tool automatically detects input format and offers the appropriate conversion direction.
          </p>
          <p>
            Both URL-safe Base64 (using - and _ instead of + and /) and standard Base64 are supported. Padding with = signs is handled automatically. Copy results with a single click.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">API Data Transfer</h3>
            <p className="text-sm text-muted-foreground">
              Encode binary data as Base64 for JSON APIs that don't support raw binary in request bodies.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Image Embedding</h3>
            <p className="text-sm text-muted-foreground">
              Convert image hex data to Base64 for embedding directly in HTML or CSS as data URIs.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Cryptographic Keys</h3>
            <p className="text-sm text-muted-foreground">
              Encode/decode encryption keys and certificates between hex and Base64 formats.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Data Storage</h3>
            <p className="text-sm text-muted-foreground">
              Store binary data in text-only databases or configuration files using Base64 encoding.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Email Attachments</h3>
            <p className="text-sm text-muted-foreground">
              Understand how binary attachments are encoded for email transmission (MIME Base64).
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">CTF Challenges</h3>
            <p className="text-sm text-muted-foreground">
              Decode Base64-encoded flags and data in cybersecurity competitions.
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
              <strong className="text-foreground">Base64 encoding:</strong> Every 3 bytes (24 bits) become 4 Base64 characters (6 bits each). Padding (=) is added if input isn't divisible by 3.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Size expansion:</strong> Base64 is ~33% larger than original binary. Hex is 2x larger. Base64 is more compact than hex for binary data.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">URL-safe variant:</strong> Standard Base64 uses + and / which aren't URL-safe. URL-safe Base64 uses - and _ instead.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Padding:</strong> Base64 may end with = or == for padding. Some systems omit padding; this tool handles both cases.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Case sensitivity:</strong> Base64 is case-sensitive. ABC differs from abc. Hex input is case-insensitive.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">What is 0x48656C6C6F in Base64?</h3>
            <p className="text-sm text-muted-foreground">
              0x48656C6C6F ("Hello") encodes to SGVsbG8= in Base64. The = is padding since 5 bytes isn't divisible by 3.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I decode Base64 to hex?</h3>
            <p className="text-sm text-muted-foreground">
              Paste the Base64 string and select decode. The tool converts Base64→binary→hex, showing the original hex representation.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Why does Base64 have equals signs?</h3>
            <p className="text-sm text-muted-foreground">
              = is padding to make the output length divisible by 4. One = means 2 bytes of input, two = means 1 byte.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What's URL-safe Base64?</h3>
            <p className="text-sm text-muted-foreground">
              URL-safe Base64 replaces + with - and / with _ so the encoded string can be used in URLs without percent-encoding.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I encode images to Base64?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Convert image file to hex first, then encode to Base64. The result can be used in data:image/png;base64,... URIs.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Is Base64 encryption?</h3>
            <p className="text-sm text-muted-foreground">
              No. Base64 is encoding, not encryption. It's easily reversible and provides no security. Use encryption for sensitive data.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What's the Base64 for empty data?</h3>
            <p className="text-sm text-muted-foreground">
              Empty input produces empty output. No padding is needed for zero bytes.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
