import * as React from "react"

export default function Base58EncoderDecoderSEO() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 text-foreground">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How the Base58 Encoder/Decoder Works</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Our Base58 encoder/decoder converts data to and from Base58 format, a binary-to-text encoding scheme designed for Bitcoin addresses. Base58 removes easily confused characters (0, O, I, l) for improved human readability and error resistance.
          </p>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Encoding Process</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Input data is treated as a large integer</li>
              <li>Integer is repeatedly divided by 58</li>
              <li>Remainders map to Base58 alphabet characters</li>
              <li>Leading zero bytes become leading '1' characters</li>
              <li>Result is a compact, human-readable string</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Common Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Cryptocurrency Addresses</h3>
            <p className="text-sm text-muted-foreground">
              Bitcoin and other cryptocurrency addresses use Base58Check encoding for error detection.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">IPFS Content Identifiers</h3>
            <p className="text-sm text-muted-foreground">
              IPFS uses Base58 for encoding multihashes in content addresses.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Short URLs</h3>
            <p className="text-sm text-muted-foreground">
              URL shorteners use Base58 for compact, readable identifiers.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Private Keys</h3>
            <p className="text-sm text-muted-foreground">
              Cryptocurrency private keys are often encoded in Base58 for wallet import formats.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What to Know Before Using This Tool</h2>
        <div className="space-y-4 text-muted-foreground">
          <div className="rounded-lg border p-4 space-y-3">
            <h3 className="font-semibold text-foreground">Base58 Alphabet</h3>
            <p className="text-sm font-mono bg-muted/30 p-3 rounded">
              123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz
            </p>
            <p className="text-sm mt-2">
              Excluded: 0 (zero), O (capital o), I (capital i), l (lowercase L) to prevent visual confusion.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-3">
            <h3 className="font-semibold text-foreground">Base58Check</h3>
            <p className="text-sm">
              Bitcoin uses Base58Check which adds a 4-byte checksum for error detection. This tool handles raw Base58; for Base58Check, use cryptocurrency-specific tools.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Why was Base58 created?</h3>
            <p className="text-sm text-muted-foreground">
              Base58 was created for Bitcoin to provide a compact, human-readable encoding that avoids visually similar characters and is safe for copy-paste operations.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Is Base58 secure?</h3>
            <p className="text-sm text-muted-foreground">
              Base58 is encoding, not encryption. It provides no security. Use proper cryptographic functions for securing sensitive data.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
