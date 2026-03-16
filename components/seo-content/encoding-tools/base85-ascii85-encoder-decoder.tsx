import * as React from "react"

export default function Base85Ascii85EncoderDecoderSEO() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 text-foreground">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How the Base85/Ascii85 Encoder/Decoder Works</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Our Base85/Ascii85 encoder/decoder converts binary data to and from Base85 format, a highly efficient binary-to-text encoding scheme. Base85 produces shorter output than Base64 (25% smaller) by encoding 4 bytes into 5 characters using 85 printable ASCII characters.
          </p>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Encoding Process</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Input data is divided into 4-byte groups</li>
              <li>Each group is treated as a 32-bit integer</li>
              <li>Integer is converted to base-85 representation</li>
              <li>Each digit maps to a printable ASCII character (! to u)</li>
              <li>Special case: all-zero groups encode as single 'z'</li>
              <li>Final output is compact ASCII string</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Common Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">PostScript and PDF</h3>
            <p className="text-sm text-muted-foreground">
              Ascii85 encoding is used in PostScript and PDF files for embedding binary data efficiently.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Git Internal Storage</h3>
            <p className="text-sm text-muted-foreground">
              Git uses Base85 (Z85 variant) for encoding binary data in packfiles and object storage.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">ZeroMQ Messaging</h3>
            <p className="text-sm text-muted-foreground">
              Z85 encoding is used in ZeroMQ for encoding binary keys and messages in text protocols.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Data Compression</h3>
            <p className="text-sm text-muted-foreground">
              Use Base85 when text encoding is required but output size matters more than with Base64.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What to Know Before Using This Tool</h2>
        <div className="space-y-4 text-muted-foreground">
          <div className="rounded-lg border p-4 space-y-3">
            <h3 className="font-semibold text-foreground">Base85 Variants</h3>
            <p className="text-sm">
              Multiple Base85 variants exist: Ascii85 (PostScript/PDF), Z85 (ZeroMQ), and RFC 1924. This tool supports standard Ascii85 encoding. Variants differ in character set and special handling.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-3">
            <h3 className="font-semibold text-foreground">Efficiency Comparison</h3>
            <p className="text-sm">
              Base85 produces 5 characters per 4 bytes (125% overhead). Base64 produces 4 characters per 3 bytes (133% overhead). Base85 is approximately 25% more efficient than Base64.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">What is the difference between Base85 and Ascii85?</h3>
            <p className="text-sm text-muted-foreground">
              Ascii85 is the original Base85 variant used in PostScript and PDF. Other Base85 variants (Z85, RFC 1924) use different character sets optimized for specific use cases.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Why use Base85 over Base64?</h3>
            <p className="text-sm text-muted-foreground">
              Base85 produces shorter output, reducing bandwidth and storage. Use when encoding efficiency matters and the slightly more complex character set is acceptable.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
