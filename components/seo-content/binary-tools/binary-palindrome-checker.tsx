export default function BinaryPalindromeCheckerSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This binary palindrome checker determines if a binary number reads the same
            forwards and backwards. It also identifies other symmetry patterns and can
            generate binary palindromes of specified lengths.
          </p>
          <p className="text-muted-foreground">
            The checking process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Normalize input:</strong> Remove any leading zeros (unless significant) and validate binary format.</li>
            <li><strong className="text-foreground">Compare bits:</strong> Compare the first bit with the last, second with second-to-last, and so on.</li>
            <li><strong className="text-foreground">Determine result:</strong> If all paired bits match, it's a palindrome. Otherwise, it's not.</li>
            <li><strong className="text-foreground">Highlight symmetry:</strong> Visual display shows which bits mirror each other.</li>
          </ol>
          <p className="text-muted-foreground">
            For example: 1001 is a palindrome (reads same both ways). 1010 is not.
            Binary palindromes have interesting mathematical properties and patterns.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Mathematical Exploration",
              description: "Discover patterns and properties of binary palindromic numbers for recreational mathematics."
            },
            {
              title: "Algorithm Practice",
              description: "Test and verify palindrome-checking algorithms for coding interviews and competitions."
            },
            {
              title: "Error Detection Studies",
              description: "Understand symmetric patterns used in error-detecting and error-correcting codes."
            },
            {
              title: "CTF Challenges",
              description: "Solve puzzles involving binary patterns and palindromic number properties."
            },
            {
              title: "Teaching Symmetry Concepts",
              description: "Demonstrate palindromic symmetry in binary for computer science and math education."
            },
            {
              title: "Data Pattern Analysis",
              description: "Identify symmetric patterns in binary data streams for analysis or compression."
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
              caveat: "Leading zeros affect palindrome status",
              explanation: "101 is a palindrome. 0101 is not (0≠1). Decide if leading zeros are significant for your use case."
            },
            {
              caveat: "All-zeros and all-ones are palindromes",
              explanation: "0000 and 1111 are trivially palindromic. Every bit matches its mirror."
            },
            {
              caveat: "Single bits are always palindromes",
              explanation: "0 and 1 are palindromes by definition - there's nothing to mismatch."
            },
            {
              caveat: "Palindrome density decreases with length",
              explanation: "For n bits, there are 2^ceil(n/2) palindromes out of 2^n total numbers. Rarer as length increases."
            },
            {
              caveat: "Binary palindromes have decimal equivalents",
              explanation: "Some decimal palindromes are also binary palindromes (like 9 = 1001), but most aren't."
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
              question: "What are some examples of binary palindromes?",
              answer: "1 (1), 3 (11), 5 (101), 7 (111), 9 (1001), 15 (1111), 17 (10001), 21 (10101), 27 (11011), 31 (11111)."
            },
            {
              question: "How many binary palindromes exist for n bits?",
              answer: "For n bits: 2^ceil(n/2). For 8 bits: 2^4 = 16 palindromes. First half determines the second half."
            },
            {
              question: "Can I generate binary palindromes?",
              answer: "Yes! Take any binary number, mirror it. For odd length, don't duplicate the middle bit. Example: 101 → 10101 or 101101."
            },
            {
              question: "Are there numbers that are palindromes in both binary and decimal?",
              answer: "Yes! Examples: 1, 3, 5, 7, 9, 33, 99, 313, 585, 717. These are rare but mathematically interesting."
            },
            {
              question: "What's the largest binary palindrome?",
              answer: "There's no largest - you can always create longer palindromes. For fixed bit width, all-ones (111...111) is the largest."
            },
            {
              question: "Do binary palindromes have practical uses?",
              answer: "Mainly theoretical and educational. Some error-correcting codes use symmetric patterns. Mostly they're mathematically interesting."
            },
            {
              question: "How do I check if a number is a binary palindrome?",
              answer: "Convert to binary, then check if the string reads the same forwards and backwards. Compare bits from both ends moving inward."
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
