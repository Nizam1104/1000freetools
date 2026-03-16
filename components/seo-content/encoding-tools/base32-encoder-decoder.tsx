import * as React from "react"

export default function Base32EncoderDecoderSEO() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 text-foreground">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How the Base32 Encoder/Decoder Works</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Our Base32 encoder/decoder converts binary data to and from Base32 format, a binary-to-text encoding scheme using 32 ASCII characters. Base32 is more human-readable than Base64 and case-insensitive, making it ideal for manual entry and voice transmission.
          </p>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Encoding Process</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Input data is converted to a stream of bits</li>
              <li>Bits are grouped into 5-bit chunks</li>
              <li>Each 5-bit value (0-31) maps to a Base32 character</li>
              <li>Base32 uses A-Z and 2-7 (32 characters total)</li>
              <li>Padding (=) is added to make output length divisible by 8</li>
              <li>Output is case-insensitive Base32 string</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Common Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Two-Factor Authentication</h3>
            <p className="text-sm text-muted-foreground">
              TOTP secrets for authenticator apps are commonly encoded in Base32 for easy manual entry.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">DNS Records</h3>
            <p className="text-sm text-muted-foreground">
              Base32 is used in DNS for encoding binary data in domain names (case-insensitive).
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Manual Data Entry</h3>
            <p className="text-sm text-muted-foreground">
              Encode data for voice transmission or manual entry where case sensitivity causes errors.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Filesystem Names</h3>
            <p className="text-sm text-muted-foreground">
              Use Base32 for encoding binary data in filenames on case-insensitive filesystems.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What to Know Before Using This Tool</h2>
        <div className="space-y-4 text-muted-foreground">
          <div className="rounded-lg border p-4 space-y-3">
            <h3 className="font-semibold text-foreground">Base32 Character Set</h3>
            <p className="text-sm">
              Base32 uses: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 2 3 4 5 6 7. Note: No digits 0, 1, 8, 9 to avoid confusion with letters O, I, B.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-3">
            <h3 className="font-semibold text-foreground">Size Overhead</h3>
            <p className="text-sm">
              Base32 increases data size by approximately 60% (8 characters encode 5 bytes). This is more overhead than Base64 but provides better human readability.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Why use Base32 instead of Base64?</h3>
            <p className="text-sm text-muted-foreground">
              Base32 is case-insensitive and uses only characters that are safe in filenames and URLs without encoding. Better for manual entry and voice transmission.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Is Base32 case-sensitive?</h3>
            <p className="text-sm text-muted-foreground">
              No, Base32 is case-insensitive by design. "ABC" and "abc" decode to the same value. This makes it ideal for manual entry where case errors are common.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">What is Base32-Hex?</h3>
            <p className="text-sm text-muted-foreground">
              Base32-Hex (RFC 4648) uses 0-9 and A-V instead of A-Z and 2-7. It sorts lexicographically like hex. This tool uses standard Base32 (RFC 4648 Section 6).
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
