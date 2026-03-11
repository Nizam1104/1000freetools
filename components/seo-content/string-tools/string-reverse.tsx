export default function StringReverseToolSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This string reverse tool flips text backwards, reversing the order of characters
            in any string. It handles Unicode characters properly and offers options to
            reverse words individually or the entire string.
          </p>
          <p className="text-muted-foreground">
            The reversal process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Character-by-character:</strong> The string is treated as a sequence of characters.</li>
            <li><strong className="text-foreground">Reverse order:</strong> The last character becomes first, second-to-last becomes second, and so on.</li>
            <li><strong className="text-foreground">Handle Unicode:</strong> Multi-byte characters (emoji, accented letters) are kept intact, not split.</li>
            <li><strong className="text-foreground">Preserve formatting:</strong> Line breaks, spaces, and special characters maintain their positions (reversed).</li>
          </ol>
          <p className="text-muted-foreground">
            For example: "Hello World" becomes "dlroW olleH". Word reversal option would
            produce "olleH dlroW" (each word reversed but word order preserved).
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Creating Fun Text Effects",
              description: "Generate backwards text for social media posts, puzzles, or creative content."
            },
            {
              title: "Solving Word Puzzles",
              description: "Check if words are palindromes or solve puzzles that involve reversed text."
            },
            {
              title: "Programming Challenges",
              description: "Test string manipulation code or solve coding interview problems involving reversal."
            },
            {
              title: "Data Transformation",
              description: "Reverse strings as part of data processing pipelines or encoding schemes."
            },
            {
              title: "Learning String Operations",
              description: "Understand how string reversal works with different character encodings."
            },
            {
              title: "Creating Secret Messages",
              description: "Hide messages in plain sight by reversing them (simple obfuscation, not security)."
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
              caveat: "Unicode characters stay intact",
              explanation: "Emoji and accented characters are reversed as whole characters, not split into bytes. 😀 stays 😀, not broken."
            },
            {
              caveat: "Reversing twice returns original",
              explanation: "Reverse(reverse(text)) = original text. This can be used to verify the reversal worked correctly."
            },
            {
              caveat: "Word reversal differs from string reversal",
              explanation: "String: 'Hello World' → 'dlroW olleH'. Word: 'Hello World' → 'olleH dlroW'. Choose based on your goal."
            },
            {
              caveat: "Line breaks are preserved (reversed)",
              explanation: "Multi-line text keeps its line structure, but each line is reversed. Line 1 stays first, but backwards."
            },
            {
              caveat: "Not encryption, just obfuscation",
              explanation: "Reversed text is trivially decoded. Don't use for security - only for fun or puzzles."
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
              question: "What's a palindrome?",
              answer: "A word/phrase that reads the same forwards and backwards: 'racecar', 'level', 'A man a plan a canal Panama'."
            },
            {
              question: "How do I reverse words but keep word order?",
              answer: "Use the 'reverse words' option. 'Hello World' becomes 'olleH dlroW' - each word reversed, but word order unchanged."
            },
            {
              question: "Can I reverse just part of a string?",
              answer: "This tool reverses the whole input. For partial reversal, extract the substring, reverse it, then recombine."
            },
            {
              question: "What happens to punctuation?",
              answer: "Punctuation is reversed like any character. 'Hello!' becomes '!olleH'. It moves to the 'beginning' of the reversed text."
            },
            {
              question: "Does this work with emoji?",
              answer: "Yes! Emoji are treated as single characters. 'Hi😀' becomes '😀iH'. Complex emoji (flags, families) may vary by implementation."
            },
            {
              question: "Why would I need to reverse text?",
              answer: "Mostly for fun, puzzles, or programming exercises. Some encoding schemes use reversal as one step. Rarely needed in production."
            },
            {
              question: "Can I reverse numbers?",
              answer: "Yes! '12345' becomes '54321'. This is useful for certain math problems or checking palindromic numbers."
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
