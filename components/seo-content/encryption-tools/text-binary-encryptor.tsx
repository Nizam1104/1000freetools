export default function TextBinaryEncryptorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This text-to-binary converter with XOR encryption transforms text into binary
            representation and optionally applies XOR encryption with a secret key. It demonstrates
            both character encoding and basic symmetric encryption.
          </p>
          <p className="text-muted-foreground">
            The conversion and encryption process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Text to bytes:</strong> Each character is converted to its ASCII/UTF-8 byte value (e.g., 'A' = 65 = 01000001).</li>
            <li><strong className="text-foreground">Binary representation:</strong> Each byte is displayed as 8 bits (0s and 1s).</li>
            <li><strong className="text-foreground">XOR encryption (optional):</strong> If a key is provided, each byte is XORed with the corresponding key byte (repeating the key as needed).</li>
            <li><strong className="text-foreground">Output:</strong> Result is shown as binary, with options to convert back to text or hex.</li>
          </ol>
          <p className="text-muted-foreground">
            XOR encryption is symmetric - applying the same key again decrypts the data.
            It's simple but not secure for serious applications without additional complexity.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Learning Binary Representation",
              description: "Understand how computers store text as binary numbers at the lowest level."
            },
            {
              title: "Understanding XOR Operations",
              description: "See how XOR works bit-by-bit and why it's fundamental to many encryption algorithms."
            },
            {
              title: "CTF Challenge Preparation",
              description: "Practice with XOR-based cryptography challenges common in cybersecurity competitions."
            },
            {
              title: "Debugging Encoding Issues",
              description: "Inspect the actual binary values of text to debug character encoding problems."
            },
            {
              title: "Teaching Basic Cryptography",
              description: "Demonstrate symmetric encryption concepts with a simple, visual algorithm."
            },
            {
              title: "Data Format Conversion",
              description: "Convert between text, binary, and hex representations for various programming tasks."
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
              caveat: "XOR encryption with short keys is weak",
              explanation: "If the key is shorter than the message, it repeats. This creates patterns that can be analyzed and broken with frequency analysis."
            },
            {
              caveat: "This is educational, not production security",
              explanation: "Real encryption uses complex algorithms like AES. Simple XOR is fine for learning but never for protecting sensitive data."
            },
            {
              caveat: "UTF-8 characters may use multiple bytes",
              explanation: "ASCII characters are 1 byte (8 bits). Unicode characters (emoji, accented letters) can be 2-4 bytes, affecting the binary output."
            },
            {
              caveat: "XOR is its own inverse",
              explanation: "Encrypting twice with the same key returns the original: (text XOR key) XOR key = text. This is why XOR is used in many encryption schemes."
            },
            {
              caveat: "Binary output can be very long",
              explanation: "Each character becomes 8 bits. A 100-character message becomes 800 bits of binary. Consider hex output for more compact representation."
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
              question: "How does XOR encryption work?",
              answer: "XOR (exclusive OR) compares bits: 0 XOR 0 = 0, 1 XOR 1 = 0, 0 XOR 1 = 1, 1 XOR 0 = 1. Each message bit is XORed with a key bit. Same operation decrypts."
            },
            {
              question: "Is XOR encryption secure?",
              answer: "Only with a truly random key as long as the message (one-time pad). With short repeating keys, it's easily broken. Not suitable for real security needs."
            },
            {
              question: "Why is binary representation useful?",
              answer: "It shows exactly how computers store data. Understanding binary helps with debugging, low-level programming, networking, and cryptography."
            },
            {
              question: "Can I decrypt without the key?",
              answer: "For simple XOR with short keys, yes - using frequency analysis or known-plaintext attacks. This is why real encryption is much more complex."
            },
            {
              question: "What's the difference between ASCII and UTF-8?",
              answer: "ASCII uses 7 bits (128 characters). UTF-8 is backward compatible with ASCII but extends to all Unicode characters using 1-4 bytes per character."
            },
            {
              question: "How do I convert binary back to text?",
              answer: "Group bits into 8-bit bytes, convert each byte to its decimal value, then map to the corresponding character. This tool does it automatically."
            },
            {
              question: "Where is XOR used in real cryptography?",
              answer: "XOR is a building block in AES, DES, and many other algorithms. But real ciphers combine XOR with substitution, permutation, and multiple rounds for security."
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
