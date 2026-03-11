export default function TextToBinaryConverterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This text to binary converter translates any text string into its binary
            representation using ASCII or UTF-8 encoding. Each character becomes an 8-bit
            binary number corresponding to its character code.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Get character codes:</strong> Each character is converted to its ASCII/UTF-8 numeric value (A=65, a=97, etc.).</li>
            <li><strong className="text-foreground">Convert to binary:</strong> Each decimal value is converted to 8-bit binary (65 = 01000001).</li>
            <li><strong className="text-foreground">Format output:</strong> Binary bytes are displayed with optional spaces between them for readability.</li>
            <li><strong className="text-foreground">Handle special chars:</strong> Spaces, punctuation, and Unicode characters are all converted to their binary equivalents.</li>
          </ol>
          <p className="text-muted-foreground">
            For example: "Hi" becomes 01001000 01101001 (H=72=01001000, i=105=01101001).
            This is how computers internally store and process all text data.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Learning Binary Encoding",
              description: "Understand how computers represent text as binary at the fundamental level."
            },
            {
              title: "Programming Education",
              description: "Teach students about character encoding, ASCII values, and binary representation."
            },
            {
              title: "Data Encoding Projects",
              description: "Convert text to binary for steganography, encoding schemes, or data transmission projects."
            },
            {
              title: "Puzzle and CTF Challenges",
              description: "Encode or decode binary messages in cybersecurity competitions and puzzle games."
            },
            {
              title: "Debugging Encoding Issues",
              description: "Inspect the actual binary values of text to debug character encoding problems."
            },
            {
              title: "Creating Binary Art",
              description: "Generate binary patterns from text for visual art, QR codes, or creative projects."
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
              caveat: "ASCII vs UTF-8 encoding",
              explanation: "ASCII uses 8 bits per character (0-127). UTF-8 uses 1-4 bytes for Unicode. Basic text is the same in both."
            },
            {
              caveat: "Each character = 8 bits (1 byte)",
              explanation: "Standard ASCII text uses exactly 8 bits per character. 'Hello' (5 chars) = 40 bits of binary."
            },
            {
              caveat: "Spaces have binary values too",
              explanation: "Space character is ASCII 32 = 00100000. Don't forget to account for spaces in your text."
            },
            {
              caveat: "Case matters in text",
              explanation: "'A' (65 = 01000001) and 'a' (97 = 01100001) have different binary values. Case changes bit 5."
            },
            {
              caveat: "Output can get very long",
              explanation: "Binary representation is 8x longer than the original text. A 100-character message becomes 800 bits."
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
              question: "What's the binary for common letters?",
              answer: "A=01000001, B=01000010, C=01000011, a=01100001, b=01100010. Uppercase starts with 010, lowercase with 011."
            },
            {
              question: "How do I convert binary back to text?",
              answer: "Use a binary-to-text converter. Group bits into 8s, convert each to decimal, then map to ASCII characters."
            },
            {
              question: "Can I convert emoji to binary?",
              answer: "Yes, but emoji use multiple bytes in UTF-8 (up to 4 bytes = 32 bits). Simple 8-bit converters only handle basic ASCII."
            },
            {
              question: "What's the binary for numbers 0-9?",
              answer: "0=00110000, 1=00110001, ... 9=00111001. Digit characters are ASCII 48-57, not the numeric values themselves."
            },
            {
              question: "Why are there spaces in the binary output?",
              answer: "Spaces between bytes are for readability only. 01001000 01101001 is the same as 0100100001101001."
            },
            {
              question: "What's special about ASCII 128-255?",
              answer: "These are extended ASCII characters (accented letters, symbols). Values vary by encoding. UTF-8 uses multiple bytes for these."
            },
            {
              question: "Can I convert entire sentences to binary?",
              answer: "Yes! Every character including spaces and punctuation converts. Just expect long output - 8 bits per character."
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
