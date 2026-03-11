import * as React from "react"

export default function XxencodeXxdecodeToolSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the XXencode/XXdecode Tool Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            XXencode is a binary-to-text encoding scheme similar to Uuencode but uses a different character set. Instead of starting with space (ASCII 32), XXencode starts with plus (+) and minus (-). This avoids problems with systems that treat spaces specially or strip leading whitespace.
          </p>
          <p>
            The XXencode alphabet is: +-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz. That's 64 characters total. Each character represents a 6-bit value (0-63). The encoding takes 3 bytes (24 bits) and converts them to 4 characters from this alphabet.
          </p>
          <p>
            The first character of each line encodes the line length. Unlike Uuencode, XXencode doesn't include a header with filename and permissions. It's a simpler, cleaner format focused purely on the data encoding.
          </p>
          <p>
            To use: select XXencode mode to convert text to XXencoded format, or XXdecode mode to convert XXencoded data back to readable text. The conversion happens instantly when you click the encode/decode button.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Transmitting through whitespace-sensitive systems</h3>
            <p className="text-sm text-muted-foreground">
              Some systems strip leading/trailing spaces or collapse multiple spaces. XXencode's + and - characters survive where Uuencode's space-based encoding might get corrupted.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Decoding legacy XXencoded archives</h3>
            <p className="text-sm text-muted-foreground">
              Some older software and archives used XXencode instead of Uuencode. Decode these files to access historical data that was encoded with this less common format.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cross-platform file transfers</h3>
            <p className="text-sm text-muted-foreground">
              When transferring between systems with different whitespace handling, XXencode provides more consistent results. The character set avoids most special character conflicts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Embedding binary in text protocols</h3>
            <p className="text-sm text-muted-foreground">
              Custom text-based protocols sometimes need binary data embedded. XXencode provides a compact representation that's less likely to interfere with protocol delimiters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Comparing encoding schemes</h3>
            <p className="text-sm text-muted-foreground">
              Developers evaluating binary-to-text encodings can compare XXencode output with Uuencode and Base64. XXencode's character set offers different tradeoffs for specific use cases.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Handling corrupted Uuencode data</h3>
            <p className="text-sm text-muted-foreground">
              If Uuencoded data has space-related corruption, try decoding as XXencode. The different character mapping might recover data that Uuencode decoding would fail on.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">XXencode is rare compared to alternatives.</strong>
              Base64 and Uuencode are far more common. XXencode exists mainly in legacy systems. Use Base64 for new projects unless you have specific compatibility requirements.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">No filename or metadata in output.</strong>
              Unlike Uuencode, XXencode doesn't include headers with filenames or permissions. It's pure data encoding. You'll need to track filenames separately.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Character set avoids problematic characters.</strong>
              The +-0-9A-Za-z alphabet avoids spaces, control characters, and most punctuation. This makes XXencode more robust in text processing pipelines that might alter special characters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Same expansion ratio as Uuencode.</strong>
              XXencode expands data by about 35% (3 bytes become 4 characters). This is inherent to binary-to-text encoding using 64 characters. Plan for the size increase.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> XXencode and Uuencode use the same algorithm with different alphabets. If you have data that fails to decode with one, check if it was actually encoded with the other. The formats look similar but aren't interchangeable.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does XXencode use + and -?</h3>
            <p className="text-sm text-muted-foreground">
              The plus and minus characters replace Uuencode's space and ! characters. This avoids issues with systems that strip leading spaces or treat spaces as delimiters. Plus is ASCII 43, minus is ASCII 45.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is XXencode better than Base64?</h3>
            <p className="text-sm text-muted-foreground">
              Not really. Base64 is more widely supported. XXencode's advantage is avoiding spaces, but Base64's standard alphabet works well in most contexts. Use Base64 unless you need XXencode specifically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can XXencode handle binary files?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. XXencode works on bytes, not characters. Any binary data (images, executables, compressed files) encodes the same way as text. Decode restores the exact original bytes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does XX stand for?</h3>
            <p className="text-sm text-muted-foreground">
              There's no official meaning. It's likely just a variation name following the "uu" pattern from Uuencode. Some say "extended encoding" but this isn't documented.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is XXencode reversible?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, perfectly. XXdecode recovers the exact original data with no loss. It's a lossless encoding scheme, not compression or encryption. Every byte is preserved.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why would I choose XXencode over Uuencode?</h3>
            <p className="text-sm text-muted-foreground">
              Choose XXencode if your transmission channel has issues with spaces or Uuencode's specific character range. Otherwise, Uuencode is more widely recognized and includes useful metadata.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I decode XXencode in my programming language?</h3>
            <p className="text-sm text-muted-foreground">
              Most languages don't have built-in XXencode support. You'll need a library or implement the decoding yourself using the +-0-9A-Za-z alphabet. The algorithm is straightforward.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
