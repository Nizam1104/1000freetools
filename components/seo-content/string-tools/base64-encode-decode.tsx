export default function Base64EncodeDecodeSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This Base64 encoder and decoder converts between plain text and Base64 format.
            Base64 encoding represents binary data as ASCII text, making it safe for
            transmission through text-only systems.
          </p>
          <p className="text-muted-foreground">
            The encoding process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Convert to bytes:</strong> Text is converted to its byte representation (UTF-8 encoding).</li>
            <li><strong className="text-foreground">Group into 6-bit chunks:</strong> Every 3 bytes (24 bits) are split into four 6-bit groups.</li>
            <li><strong className="text-foreground">Map to characters:</strong> Each 6-bit value (0-63) maps to a Base64 character: A-Z, a-z, 0-9, +, /.</li>
            <li><strong className="text-foreground">Add padding:</strong> If input isn't divisible by 3, = characters pad the output to maintain 4-character groups.</li>
          </ol>
          <p className="text-muted-foreground">
            URL-safe Base64 replaces + with - and / with _ to avoid special meaning in URLs.
            Decoding reverses this process, converting Base64 back to original text.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Data URI Creation",
              description: "Encode images and files as Base64 for embedding directly in HTML, CSS, or JSON."
            },
            {
              title: "Email Attachments",
              description: "Understand how email attachments are encoded as Base64 for MIME transmission."
            },
            {
              title: "API Token Handling",
              description: "Encode/decode API tokens, authentication headers, and JWT components."
            },
            {
              title: "Data Transmission",
              description: "Safely transmit binary data through text-only channels like JSON, XML, or forms."
            },
            {
              title: "Debugging Encoded Data",
              description: "Decode Base64 strings from logs, network traffic, or configuration files."
            },
            {
              title: "Learning Data Encoding",
              description: "Understand how binary-to-text encoding works and when to use it."
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
              caveat: "Base64 is NOT encryption",
              explanation: "Anyone can decode Base64. It's encoding, not security. Never use it to hide sensitive data."
            },
            {
              caveat: "Size increases by ~33%",
              explanation: "Every 3 bytes become 4 characters. For large files, this overhead matters. Consider compression first."
            },
            {
              caveat: "URL-safe variant exists",
              explanation: "Standard uses + and /. URL-safe uses - and _. Use URL-safe for URLs and filenames."
            },
            {
              caveat: "Padding may be optional",
              explanation: "Some systems omit = padding. Most decoders handle this, but strict implementations require it."
            },
            {
              caveat: "Line breaks may be inserted",
              explanation: "MIME Base64 often has newlines every 76 characters. Decoders typically handle both single-line and multi-line."
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
              question: "Why does Base64 end with = signs?",
              answer: "Padding! Base64 processes 3 bytes at a time. One = means 2 bytes input. Two = means 1 byte. Ensures output length is divisible by 4."
            },
            {
              question: "Can I Base64 encode any file?",
              answer: "Yes! Base64 works on any binary data - images, videos, executables, anything. It treats everything as bytes."
            },
            {
              question: "What's the difference between standard and URL-safe Base64?",
              answer: "Standard uses + and / which have special meaning in URLs. URL-safe uses - and _ instead, avoiding URL encoding issues."
            },
            {
              question: "How do I embed an image as Base64?",
              answer: "Encode the image file, then use: <img src='data:image/png;base64,[encoded data]'>. Works for CSS backgrounds too."
            },
            {
              question: "Is Base64 reversible?",
              answer: "Yes, perfectly! Decoding always produces the exact original bytes. It's lossless encoding, not compression."
            },
            {
              question: "Why use Base64 instead of hex?",
              answer: "Base64 is more efficient. Hex uses 2 characters per byte (100% overhead). Base64 uses 4 chars per 3 bytes (33% overhead)."
            },
            {
              question: "Can Base64 contain newlines?",
              answer: "Yes, MIME format inserts newlines every 76 characters. Most decoders ignore whitespace, but single-line is more portable."
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
