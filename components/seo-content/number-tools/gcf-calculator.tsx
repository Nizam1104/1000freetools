import React from "react"

export default function GcfCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter two or more positive integers to find their Greatest Common Factor (GCF), also called Greatest Common Divisor (GCD). The GCF is the largest number that divides all inputs without a remainder.
          </p>
          <p>
            The calculator also shows the Least Common Multiple (LCM) - the smallest number divisible by all inputs. Prime factorization displays show how each number breaks down into prime factors.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example calculations:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Numbers: 12, 18, 24

Prime factorization:
12 = 2² × 3
18 = 2 × 3²
24 = 2³ × 3

GCF = 2 × 3 = 6
LCM = 2³ × 3² = 72

Numbers: 15, 25
GCF = 5
LCM = 75</pre>
          </div>
          <p>
            The Euclidean algorithm efficiently computes the GCF even for large numbers. For multiple numbers, the GCF is found by repeatedly applying GCF to pairs of numbers.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Simplifying fractions</h3>
            <p className="text-sm text-muted-foreground">
              Reduce 48/60 to lowest terms. GCF(48, 60) = 12. Divide both by 12: 48÷12 = 4, 60÷12 = 5. Result: 4/5. The GCF gives the largest factor to divide by.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Tiling and flooring projects</h3>
            <p className="text-sm text-muted-foreground">
              A room is 12 feet by 18 feet. What's the largest square tile that fits exactly? GCF(12, 18) = 6. Use 6-inch tiles (or any divisor of 6) for no cutting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Scheduling repeating events</h3>
            <p className="text-sm text-muted-foreground">
              One task repeats every 12 days, another every 18 days. When do they coincide? LCM(12, 18) = 72 days. The GCF helps understand the pattern structure.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Gear ratio calculations</h3>
            <p className="text-sm text-muted-foreground">
              Two gears have 48 and 60 teeth. The GCF(48, 60) = 12 tells you the ratio simplifies to 4:5. Every 4 rotations of the first gear equals 5 rotations of the second.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Distributing items evenly</h3>
            <p className="text-sm text-muted-foreground">
              You have 48 cookies and 60 candies for gift bags. GCF(48, 60) = 12 means you can make 12 identical bags with 4 cookies and 5 candies each.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Music rhythm patterns</h3>
            <p className="text-sm text-muted-foreground">
              A 12/8 measure and a pattern repeating every 6 beats align every GCF(12, 6) = 6 beats. Understanding GCF helps musicians understand polyrhythms and time signature relationships.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">GCF and GCD are the same thing.</strong>
              Different textbooks use different names. Greatest Common Factor (GCF), Greatest Common Divisor (GCD), and Highest Common Factor (HCF) all mean the same value.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Coprime numbers have GCF of 1.</strong>
              Numbers like 7 and 11 share no common factors except 1. They're called coprime or relatively prime. Their LCM is simply their product: 7 × 11 = 77.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">GCF × LCM = product of numbers.</strong>
              For two numbers a and b: GCF(a,b) × LCM(a,b) = a × b. This relationship lets you find LCM if you know GCF: LCM = (a × b) / GCF.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Prime factorization reveals the GCF.</strong>
              Take the lowest power of each prime that appears in all factorizations. For 12 = 2²×3 and 18 = 2×3², GCF = 2¹×3¹ = 6.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For large numbers, the Euclidean algorithm is faster than prime factorization. Repeatedly replace the larger number with the remainder until you reach zero.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I find GCF by hand?</h3>
            <p className="text-sm text-muted-foreground">
              List all factors of each number, find common ones, pick the largest. Or use prime factorization. Or use the Euclidean algorithm: divide larger by smaller, repeat with remainder.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is the Euclidean algorithm?</h3>
            <p className="text-sm text-muted-foreground">
              To find GCF(48, 18): 48 ÷ 18 = 2 remainder 12. Then GCF(18, 12): 18 ÷ 12 = 1 remainder 6. Then GCF(12, 6): 12 ÷ 6 = 2 remainder 0. Answer: 6.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can GCF be calculated for more than 2 numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Find GCF of first two numbers, then find GCF of that result with the third number, and so on. GCF(12, 18, 24) = GCF(GCF(12, 18), 24) = GCF(6, 24) = 6.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between GCF and LCM?</h3>
            <p className="text-sm text-muted-foreground">
              GCF is the largest number that divides all inputs. LCM is the smallest number all inputs divide into. GCF ≤ smallest input. LCM ≥ largest input.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if one number is zero?</h3>
            <p className="text-sm text-muted-foreground">
              GCF with zero is undefined in most contexts. Every number divides zero, so there's no "greatest" common factor. This calculator requires positive integers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I use GCF to simplify fractions?</h3>
            <p className="text-sm text-muted-foreground">
              Find GCF of numerator and denominator. Divide both by the GCF. For 36/48: GCF(36, 48) = 12. Simplified: 36÷12 / 48÷12 = 3/4.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What are twin primes?</h3>
            <p className="text-sm text-muted-foreground">
              Twin primes are prime numbers that differ by 2, like 11 and 13. Any two different primes are coprime (GCF = 1). Twin primes are a special case of coprime pairs.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
