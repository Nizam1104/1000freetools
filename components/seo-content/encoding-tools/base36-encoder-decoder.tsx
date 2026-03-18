import React from "react"

export default function Base36EncoderDecoderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Base36 Encoder/Decoder Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter a number to encode to Base36, or input a Base36 string to decode to decimal. The conversion happens instantly as you type. Supports arbitrarily large numbers.
          </p>
          <p>
            Base36 uses digits 0-9 and letters A-Z (case-insensitive). Each character represents a value 0-35. More compact than decimal for large numbers, URL-safe without special characters.
          </p>
          <p>
            The encoder converts decimal to Base36 by repeated division. The decoder multiplies each digit's value by powers of 36. Both operations handle big integers precisely.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating short URLs</h3>
            <p className="text-sm text-muted-foreground">
              URL shorteners convert IDs to Base36. Database ID 12345 becomes "9IX". Shorter than decimal, uses only URL-safe characters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Generating compact identifiers</h3>
            <p className="text-sm text-muted-foreground">
              Need short unique IDs? Encode timestamps or UUIDs to Base36. More compact than hex. Easier to read and transcribe.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">License key generation</h3>
            <p className="text-sm text-muted-foreground">
              Software license keys often use Base36. Encode serial numbers compactly. Mix with checksums for validation. User-friendly compared to hex.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Database ID obfuscation</h3>
            <p className="text-sm text-muted-foreground">
              Hide sequential database IDs from users. Encode to Base36 for URLs. Prevents guessing other record IDs. Simple obfuscation layer.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Spreadsheet column conversion</h3>
            <p className="text-sm text-muted-foreground">
              Excel columns are Base26 (A-Z). Similar concept to Base36. Understand the pattern for programmatic column handling.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating human-readable hashes</h3>
            <p className="text-sm text-muted-foreground">
              Hash values in Base36 are shorter than hex. SHA-256 becomes 52 chars instead of 64. Easier to compare and communicate.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Case is typically ignored.</strong>
              Base36 is case-insensitive. ABC and abc represent the same value. Most implementations use uppercase for output, accept either for input.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">No special characters needed.</strong>
              Base36 uses only 0-9 and A-Z. No +, /, or = like Base64. Completely URL-safe without encoding. Safe for filenames too.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Compression ratio varies.</strong>
              Base36 is ~21% more compact than decimal. Less compact than Base64 but more readable. Good balance of size and usability.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Leading zeros are optional.</strong>
              Like decimal, leading zeros don't change value. 007 and 7 are identical. Output typically omits leading zeros.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For URL shorteners, combine Base36 with a custom alphabet. Shuffle the character order for additional obfuscation. Makes IDs harder to guess sequentially.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What characters are in Base36?</h3>
            <p className="text-sm text-muted-foreground">
              Digits 0-9 (values 0-9) and letters A-Z (values 10-35). Total 36 characters. Case-insensitive: A and a both equal 10.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How does Base36 compare to Base64?</h3>
            <p className="text-sm text-muted-foreground">
              Base36 is less compact but more readable. Base64 uses + and / which need URL encoding. Base36 is always URL-safe. Choose based on needs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I encode text directly?</h3>
            <p className="text-sm text-muted-foreground">
              Base36 encodes numbers. For text, first convert to bytes, then to a number, then to Base36. Or encode each character separately.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the maximum value?</h3>
            <p className="text-sm text-muted-foreground">
              No theoretical limit. Limited only by your system's integer size. This tool handles arbitrarily large numbers using big integer arithmetic.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I validate Base36 input?</h3>
            <p className="text-sm text-muted-foreground">
              Check that all characters are 0-9 or A-Z (case-insensitive). Any other character is invalid. Reject or strip invalid characters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is Base36 reversible?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, perfectly. Encoding then decoding returns the original number. No information is lost. It's a lossless base conversion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why use Base36 over hex?</h3>
            <p className="text-sm text-muted-foreground">
              Base36 is ~25% more compact than hex. More human-readable. Still URL-safe. Good middle ground between decimal and Base64.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
