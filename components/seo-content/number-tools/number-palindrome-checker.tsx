import React from "react"

export default function NumberPalindromeCheckerSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the Number Palindrome Checker Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool checks if a number reads the same forwards and backwards (a palindromic number).
            For non-palindromes, it can optionally show the reverse-and-add process that may eventually produce a palindrome.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Palindrome Checking Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Enter a non-negative integer to test</li>
            <li>The tool reverses the digits and compares to the original</li>
            <li>If they match, the number is a palindrome</li>
            <li>Optionally enable &quot;reverse-and-add&quot; to explore Lychrel number candidates</li>
            <li>The process shows each step: reverse the number, add to original, check if palindrome</li>
            <li>Sequence continues until a palindrome is found or 100 iterations are reached</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Mathematical Pattern Exploration</h3>
            <p className="text-sm text-muted-foreground">
              A math enthusiast explores palindromic numbers and their properties. They test various numbers
              to discover patterns like which numbers become palindromes quickly vs. those that take many iterations.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Programming Challenge Solutions</h3>
            <p className="text-sm text-muted-foreground">
              A developer solving coding interview problems uses this to verify their palindrome-checking algorithm
              works correctly on edge cases and large numbers.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Lychrel Number Research</h3>
            <p className="text-sm text-muted-foreground">
              Someone investigating Lychrel numbers (numbers that never form palindromes through reverse-and-add)
              uses this tool to test candidate numbers like 196, 295, and 394.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Educational Demonstrations</h3>
            <p className="text-sm text-muted-foreground">
              A teacher demonstrates number properties to students, showing how some numbers like 56 become
              palindromes (56 + 65 = 121) while others take many more steps.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Recreational Mathematics</h3>
            <p className="text-sm text-muted-foreground">
              A puzzle solver explores interesting number properties, finding palindromic dates (02/02/2020),
              palindromic prices, or creating palindromic sequences for fun.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Understanding palindromic numbers and the reverse-and-add process:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Only non-negative integers are supported (no decimals or negatives)</li>
            <li>Single-digit numbers (0-9) are all palindromes</li>
            <li>The reverse-and-add process is limited to 100 iterations</li>
            <li>Some numbers may not produce palindromes within 100 iterations (Lychrel candidates)</li>
            <li>The sequence display shows each step with the calculation explained</li>
            <li>Palindromic results are highlighted in green for easy identification</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What is a palindromic number?</h3>
            <p className="text-sm text-muted-foreground">
              A palindromic number reads the same forwards and backwards. Examples: 121, 12321, 1001, 7.
              The number 123 is not a palindrome because reversed it becomes 321.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What is the reverse-and-add process?</h3>
            <p className="text-sm text-muted-foreground">
              Take a number, reverse its digits, and add them together. Repeat until you get a palindrome.
              Example: 56 + 65 = 121 (palindrome in 1 step). Some numbers take many iterations.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What are Lychrel numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Lychrel numbers are numbers that never form a palindrome through the reverse-and-add process.
              196 is the smallest suspected Lychrel number, though it hasn&apos;t been mathematically proven.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Do all numbers eventually become palindromes?</h3>
            <p className="text-sm text-muted-foreground">
              Most numbers do, but some (like 196) have been tested for millions of iterations without
              producing a palindrome. These are suspected to be Lychrel numbers, though unproven.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What&apos;s the most iterations needed?</h3>
            <p className="text-sm text-muted-foreground">
              The number 89 takes 24 iterations to become the palindrome 8,813,200,023,188.
              This is one of the most iterations needed for numbers under 10,000.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Are there palindromic primes?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, palindromic primes are numbers that are both prime and palindromic.
              Examples: 2, 3, 5, 7, 11, 101, 131, 151. They become increasingly rare as numbers get larger.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
