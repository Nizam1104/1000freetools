import React from "react"

export default function HashToHexBase64ConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How Hash Format Conversion Works</h2>

        <div className="space-y-3 text-muted-foreground">
          <p>
            Hashes are just bytes—binary data that can be represented in different text formats.
            This tool automatically detects whether you've pasted a hexadecimal or Base64 encoded
            hash and converts it to the other format.
          </p>

          <p>
            Hexadecimal uses 2 characters per byte (0-9 and a-f), while Base64 uses about 1.33
            characters per byte (A-Z, a-z, 0-9, +, /, with = padding). The underlying binary
            data is identical—only the text representation changes.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="text-sm font-medium">The conversion process:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Input is analyzed to detect format (hex uses only 0-9a-f, Base64 uses A-Za-z0-9+/=)</li>
              <li>For hex input: pairs of characters are converted to bytes, then encoded as Base64</li>
              <li>For Base64 input: decoded to bytes, then each byte becomes two hex characters</li>
              <li>Output is displayed in both formats for comparison</li>
            </ol>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Example:</strong> The MD5 hash of "hello" is
              <code className="bg-muted px-1 rounded text-xs mx-1">5d41402abc4b2a76b9719d911017c592</code> in
              hex, which becomes
              <code className="bg-muted px-1 rounded text-xs mx-1">XUFAKrxLKna5cZ2REYfFkg==</code> in
              Base64. Same 16 bytes, different text representation.
            </p>
          </div>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with web APIs</h3>
            <p className="text-sm text-muted-foreground">
              Some APIs return hashes in Base64 (common in JavaScript/Node.js), while others use
              hex (common in blockchain and security tools). Convert between formats to match
              what your code expects.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Comparing hashes across systems</h3>
            <p className="text-sm text-muted-foreground">
              Your database stores SHA-256 hashes in hex, but the verification library outputs
              Base64. Convert one format to confirm they match without manual character-by-character
              comparison.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Blockchain and cryptocurrency development</h3>
            <p className="text-sm text-muted-foreground">
              Bitcoin and Ethereum typically use hex for hashes, but some RPC APIs return Base64.
              Convert transaction hashes, block hashes, or public keys between formats as needed.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging cryptographic code</h3>
            <p className="text-sm text-muted-foreground">
              Your hash output doesn't match expected values? Convert to the same format as your
              test vectors to verify correctness. Different libraries default to different encodings.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with JWT tokens</h3>
            <p className="text-sm text-muted-foreground">
              JWT signatures and some claims use Base64URL encoding (a Base64 variant). Convert
              to hex for analysis or to match documentation examples that use hexadecimal.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Database storage optimization</h3>
            <p className="text-sm text-muted-foreground">
              Storing hashes in a database? Base64 is about 25% more compact than hex (22 chars
              vs 32 for 128-bit hashes). Convert to calculate storage requirements or migrate
              existing data.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Converting Hash Formats</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">The hash doesn't change—only the encoding.</strong> A
              SHA-256 hash is still SHA-256 whether it's displayed as hex or Base64. The
              underlying 32 bytes are identical.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Input must be valid.</strong> Hex input must have
              an even number of characters (each byte needs 2 hex digits). Base64 must have
              valid padding. Invalid input won't convert.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Base64URL is different from Base64.</strong> Some
              systems (like JWT) use Base64URL encoding, which replaces + with - and / with _.
              This tool handles standard Base64. For Base64URL, you may need to adjust characters
              first.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Padding matters in Base64.</strong> Base64 strings
              often end with = or == padding characters. These are part of the encoding and
              should be included when converting.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Size comparison:</strong> For a 256-bit (32-byte)
              hash: hex = 64 characters, Base64 = 44 characters (including padding). Base64
              saves about 31% in text length.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why are there two formats for the same hash?</h3>
            <p className="text-sm text-muted-foreground">
              Hashes are binary data, but we need text representations for display and storage.
              Hex is human-readable and universal. Base64 is more compact and common in web
              protocols. Different communities standardized on different formats.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Which format should I use for storage?</h3>
            <p className="text-sm text-muted-foreground">
              For databases: Base64 saves space (25% smaller than hex). For logs and debugging:
              hex is easier to read and search. For URLs: consider Base64URL (URL-safe Base64).
              For blockchain: hex is the convention. Match your ecosystem's standards.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert any hash between formats?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, as long as it's a raw hash value. MD5, SHA-1, SHA-256, SHA-512, and any other
              hash can be converted. The algorithm doesn't matter—only the underlying bytes.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between Base64 and Base64URL?</h3>
            <p className="text-sm text-muted-foreground">
              Base64URL replaces + with - and / with _ to make it URL-safe (no encoding needed
              in URLs). It also typically omits padding. Convert Base64 to Base64URL by
              replacing those characters and removing = padding.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my Base64 output have = at the end?</h3>
            <p className="text-sm text-muted-foreground">
              Base64 encodes 3 bytes into 4 characters. If the input isn't divisible by 3,
              padding characters (=) are added. One = means 2 bytes in the final group; two =
              means 1 byte. It's part of the standard.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I verify the conversion is correct?</h3>
            <p className="text-sm text-muted-foreground">
              Convert hex to Base64, then convert that Base64 back to hex. You should get your
              original input. This tool shows both outputs simultaneously, making verification
              easy.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work for encoded data, not just hashes?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Any binary data encoded as hex or Base64 can be converted between formats.
              This includes images, files, encryption keys, signatures—anything represented as
              encoded bytes.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
