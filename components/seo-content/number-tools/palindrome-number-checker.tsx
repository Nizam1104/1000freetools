import React from "react"

export default function PalindromeNumberCheckerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter a number to check if it's a palindrome - a number that reads the same forwards and backwards. Examples include 121, 12321, and 1001.
          </p>
          <p>
            For non-palindrome numbers, you can optionally run the reverse-and-add process. This repeatedly adds a number to its reverse until a palindrome is reached. Some numbers like 196 may never produce a palindrome (Lychrel numbers).
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Examples:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Palindrome check:
121 → Yes (reads same both ways)
123 → No (reverse is 321)
12321 → Yes
1001 → Yes

Reverse-and-add for 89:
89 + 98 = 187
187 + 781 = 968
968 + 869 = 1837
... (24 steps total) ...
8813200023188 (palindrome!)</pre>
          </div>
          <p>
            The tool shows each step of the reverse-and-add sequence, highlighting when a palindrome is finally reached or if the process exceeds the iteration limit.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Mathematics education</h3>
            <p className="text-sm text-muted-foreground">
              Teachers demonstrate number patterns to students. Palindromes are a fun way to explore symmetry in numbers. The reverse-and-add process shows iterative algorithms in action.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Programming exercises</h3>
            <p className="text-sm text-muted-foreground">
              Palindrome checking is a common coding interview question. Students practice string manipulation, number reversal, and algorithm design. The tool verifies their solutions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Recreational mathematics</h3>
            <p className="text-sm text-muted-foreground">
              Math enthusiasts explore Lychrel numbers and the 196 algorithm. Testing whether numbers eventually become palindromes is an unsolved problem that anyone can investigate.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Pattern recognition practice</h3>
            <p className="text-sm text-muted-foreground">
              Identifying palindromic patterns helps develop number sense. Students learn to spot symmetry and understand place value through palindrome exploration.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cryptographic curiosity</h3>
            <p className="text-sm text-muted-foreground">
              Some cryptographic schemes use palindromic structures. While not directly applicable, understanding palindromes helps recognize patterns in encoded data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Number theory exploration</h3>
            <p className="text-sm text-muted-foreground">
              Researchers study properties of palindromic numbers. How many palindromes exist below a certain value? What's the distribution? The tool helps gather data for analysis.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Single digits are palindromes.</strong>
              Numbers 0-9 read the same forwards and backwards. They're trivially palindromic. The tool correctly identifies them as palindromes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Leading zeros don't count.</strong>
              We don't write numbers with leading zeros, so 10 is not a palindrome (reverse would be 01 = 1). Only the standard decimal representation matters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some numbers take many steps.</strong>
              89 takes 24 reverse-and-add steps to reach a palindrome. 10,911 takes 55 steps. The process can be surprisingly long for certain numbers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Lychrel numbers may not converge.</strong>
              196 is the smallest suspected Lychrel number - it hasn't produced a palindrome after billions of iterations. Whether true Lychrel numbers exist is unproven.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Most numbers become palindromes quickly. If the reverse-and-add process goes beyond 100 iterations without finding a palindrome, you might have a Lychrel candidate.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the smallest palindrome?</h3>
            <p className="text-sm text-muted-foreground">
              Zero (0) is the smallest palindrome. Among positive integers, 1 is the smallest. Single-digit numbers 0-9 are all palindromes by definition.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many palindromes exist?</h3>
            <p className="text-sm text-muted-foreground">
              Infinitely many. For any number of digits, there are palindromes. Two-digit: 11, 22, ..., 99 (9 of them). Three-digit: 101, 111, ..., 999 (90 of them).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is a Lychrel number?</h3>
            <p className="text-sm text-muted-foreground">
              A Lychrel number never forms a palindrome through reverse-and-add. 196 is the smallest candidate. No one has proven any number is truly Lychrel - they might just need more iterations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can negative numbers be palindromes?</h3>
            <p className="text-sm text-muted-foreground">
              By convention, we check the absolute value. -121 is considered palindromic because 121 is. The negative sign isn't part of the digit sequence being checked.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's special about 196?</h3>
            <p className="text-sm text-muted-foreground">
              196 is the smallest number that hasn't been shown to produce a palindrome. After millions of iterations, it produces numbers with millions of digits but no palindrome yet.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do palindromes exist in other bases?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! A number can be palindromic in binary, hexadecimal, or any base. 5 is 101 in binary (palindrome). Some numbers are palindromic in multiple bases simultaneously.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the largest known palindrome from reverse-and-add?</h3>
            <p className="text-sm text-muted-foreground">
              The number 1,186,060,307,891,929,990 takes 261 iterations to produce a 119-digit palindrome. This was a computational challenge solved in 2005.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
