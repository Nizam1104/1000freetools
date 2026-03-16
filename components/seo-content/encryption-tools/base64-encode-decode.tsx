export default function Base64EncodeDecodeSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            Base64 encoding converts binary data into ASCII text by representing every 3 bytes
            (24 bits) as 4 characters from a 64-character alphabet. It's not encryption - it's
            encoding for safe transmission through text-only systems.
          </p>
          <p className="text-muted-foreground">
            The encoding process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Group bytes:</strong> Input is split into 3-byte groups (24 bits total).</li>
            <li><strong className="text-foreground">Split into 6-bit chunks:</strong> Each 24-bit group becomes four 6-bit values (0-63).</li>
            <li><strong className="text-foreground">Map to characters:</strong> Each 6-bit value maps to a character: A-Z (0-25), a-z (26-51), 0-9 (52-61), + and / (62-63).</li>
            <li><strong className="text-foreground">Add padding:</strong> If input isn't divisible by 3, = characters pad the output to maintain 4-character groups.</li>
          </ol>
          <p className="text-muted-foreground">
            URL-safe Base64 replaces + with - and / with _ to avoid issues in URLs and filenames.
            Decoding reverses this process, converting the ASCII back to original binary data.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Embedding Images in HTML/CSS",
              description: "Convert images to Base64 data URIs for embedding directly in code, reducing HTTP requests."
            },
            {
              title: "Email Attachments (MIME)",
              description: "Email systems use Base64 to encode binary attachments so they survive text-only mail servers."
            },
            {
              title: "API Token Transmission",
              description: "Encode binary data or special characters in API requests where only ASCII is safe."
            },
            {
              title: "Data URI Schemes",
              description: "Embed small files (icons, fonts) directly in CSS or HTML using data: URLs with Base64 content."
            },
            {
              title: "Encoding Binary in JSON",
              description: "Include binary data (like images or files) in JSON payloads by Base64 encoding them first."
            },
            {
              title: "Debugging Encoded Data",
              description: "Decode Base64 strings from logs, network captures, or configuration files to inspect the original content."
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-muted/30 p-4 space-y-2">
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">What to Know Before Using</h2>
        <div className="space-y-3">
          {[
            {
              caveat: "Base64 is NOT encryption or security",
              explanation: "Anyone can decode Base64 - it's just encoding. Never use it to hide sensitive data. It increases size by ~33%, making it inefficient for large files."
            },
            {
              caveat: "URL-safe Base64 differs from standard",
              explanation: "Standard uses + and / which have special meaning in URLs. URL-safe uses - and _ instead. Make sure you use the right variant for your context."
            },
            {
              caveat: "Padding (=) is sometimes optional",
              explanation: "Some systems omit padding characters. Most decoders handle this, but strict implementations may require proper padding (length divisible by 4)."
            },
            {
              caveat: "Line breaks may be inserted for long strings",
              explanation: "MIME Base64 often inserts newlines every 76 characters. This tool handles both single-line and multi-line Base64 input."
            },
            {
              caveat: "Invalid characters indicate corruption or wrong format",
              explanation: "Base64 only uses A-Z, a-z, 0-9, +, /, and =. Other characters mean the data isn't valid Base64 or uses a different encoding."
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-muted/30 p-4">
              <h3 className="font-semibold text-foreground mb-1">{item.caveat}</h3>
              <p className="text-sm text-muted-foreground">{item.explanation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Common Questions</h2>
        <div className="space-y-6">
          {[
            {
              question: "Why does Base64 encoded data end with = signs?",
              answer: "Padding! Base64 processes 3 bytes at a time. If input isn't divisible by 3, = characters pad the output. One = means 2 bytes input, two = means 1 byte."
            },
            {
              question: "What's the difference between Base64 and URL-safe Base64?",
              answer: "Standard Base64 uses + and / which need URL encoding. URL-safe Base64 uses - and _ instead, making it safe for URLs and filenames without additional encoding."
            },
            {
              question: "Can Base64 encode any type of file?",
              answer: "Yes! Base64 works on any binary data - images, videos, executables, anything. It treats everything as bytes, so file type doesn't matter for encoding."
            },
            {
              question: "How much does Base64 increase file size?",
              answer: "Approximately 33%. Every 3 bytes become 4 characters. For large files, this overhead matters. Consider compression before Base64 encoding if size is critical."
            },
            {
              question: "Is Base64 decoding reversible?",
              answer: "Yes, perfectly. Base64 encoding is lossless - decoding always produces the exact original bytes. This is why it's used for data transmission, not security."
            },
            {
              question: "Why use Base64 instead of hex encoding?",
              answer: "Base64 is more efficient. Hex uses 2 characters per byte (100% overhead). Base64 uses 4 characters per 3 bytes (33% overhead). Base64 is more compact."
            },
            {
              question: "Can I Base64 encode text that's already UTF-8?",
              answer: "Yes, but it's usually unnecessary. UTF-8 text is already safe for transmission. Base64 is mainly for binary data or when you need to ensure ASCII-only output."
            },
          ].map((item, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="font-semibold text-foreground">{item.question}</h3>
              <p className="text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
