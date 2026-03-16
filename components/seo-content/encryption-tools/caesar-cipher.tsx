export default function CaesarCipherSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            The Caesar cipher is one of the simplest encryption methods - each letter is shifted
            by a fixed number of positions in the alphabet. Julius Caesar reportedly used a shift
            of 3 to protect his military communications.
          </p>
          <p className="text-muted-foreground">
            The encryption process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Choose a shift value:</strong> Pick a number from 1 to 25 (shift of 0 or 26 does nothing).</li>
            <li><strong className="text-foreground">Shift each letter:</strong> For each letter, move forward in the alphabet by the shift amount. A with shift 3 becomes D.</li>
            <li><strong className="text-foreground">Wrap around:</strong> When you reach Z, wrap back to A. With shift 3, X becomes A, Y becomes B, Z becomes C.</li>
            <li><strong className="text-foreground">Preserve non-letters:</strong> Numbers, spaces, and punctuation remain unchanged.</li>
          </ol>
          <p className="text-muted-foreground">
            The brute force attack tries all 25 possible shifts and displays them. Since there are
            only 25 possible keys, a computer can crack it instantly. This is why Caesar cipher is
            only suitable for puzzles and education, not real security.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Solving Puzzle Games",
              description: "Decode Caesar-encrypted clues in escape rooms, geocaching puzzles, or mystery games."
            },
            {
              title: "Teaching Cryptography Basics",
              description: "Introduce students to encryption concepts with a simple cipher they can understand and break."
            },
            {
              title: "Creating Fun Secret Messages",
              description: "Encode playful notes or Easter eggs where security doesn't matter but discovery is fun."
            },
            {
              title: "CTF Competition Practice",
              description: "Many capture-the-flag challenges include Caesar cipher as an introductory cryptography problem."
            },
            {
              title: "Analyzing Historical Ciphers",
              description: "Study classical cryptography methods and understand why they're insecure by modern standards."
            },
            {
              title: "Building Crypto Foundations",
              description: "Learn substitution ciphers before moving to more complex algorithms like Vigenère or modern encryption."
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
              caveat: "Caesar cipher provides zero real security",
              explanation: "With only 25 possible keys, brute force cracking is trivial. Never use it for anything that needs actual protection. It's purely educational or recreational."
            },
            {
              caveat: "Frequency analysis breaks it instantly",
              explanation: "In English, E is the most common letter. The most frequent letter in ciphertext is likely E shifted. This single observation can reveal the key immediately."
            },
            {
              caveat: "Case sensitivity varies by implementation",
              explanation: "Some tools preserve uppercase/lowercase, others convert everything. This tool maintains the original case for each letter."
            },
            {
              caveat: "Non-ASCII characters aren't handled",
              explanation: "Standard Caesar cipher only works on A-Z. Accented characters, emoji, and non-Latin scripts pass through unchanged."
            },
            {
              caveat: "ROT13 is a special case (shift 13)",
              explanation: "Shift 13 is its own inverse - encode and decode are the same operation. ROT13 is commonly used on forums to hide spoilers."
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
              question: "How do I crack a Caesar cipher without the key?",
              answer: "Try all 25 shifts (brute force) and look for readable English. Or use frequency analysis - find the most common letter and assume it's E, then calculate the shift."
            },
            {
              question: "What's the difference between Caesar cipher and shift cipher?",
              answer: "They're the same thing. 'Caesar cipher' specifically refers to shift 3 (which Julius Caesar used), while 'shift cipher' is the general term for any shift value."
            },
            {
              question: "Can Caesar cipher handle numbers and symbols?",
              answer: "Traditional Caesar cipher only shifts letters A-Z. Numbers, spaces, and punctuation remain unchanged. Some variants extend to other characters, but that's non-standard."
            },
            {
              question: "Why is it called Caesar cipher?",
              answer: "Julius Caesar reportedly used a shift of 3 to protect his military correspondence. The Roman historian Suetonius documented this in 'The Twelve Caesars' around 121 AD."
            },
            {
              question: "What's ROT13 and how is it related?",
              answer: "ROT13 is Caesar cipher with shift 13. Since the alphabet has 26 letters, applying ROT13 twice returns the original text. It's used for hiding spoilers, not security."
            },
            {
              question: "How does frequency analysis work?",
              answer: "In English, certain letters appear more often (E, T, A, O, I, N). Count letter frequencies in the ciphertext, match the most common to E, and calculate the shift."
            },
            {
              question: "Is there any scenario where Caesar cipher is appropriate?",
              answer: "Only for education, puzzles, or fun - never for actual security. It's great for teaching cryptography concepts or creating game clues where you want easy decoding."
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
