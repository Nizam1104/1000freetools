import React from "react"

export default function GCFLCMCalculatorSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the GCF and LCM Calculator Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool calculates the Greatest Common Factor (GCF) and Least Common Multiple (LCM) of two or more numbers.
            It uses the Euclidean algorithm for efficiency and displays prime factorizations for educational insight.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Calculation Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Enter two or more positive integers separated by commas or spaces</li>
            <li>The tool calculates GCF using the Euclidean algorithm iteratively</li>
            <li>LCM is computed using the relationship: LCM(a,b) = |a×b| / GCF(a,b)</li>
            <li>Prime factorization is shown for each input number</li>
            <li>Results display with step-by-step explanations</li>
            <li>Copy GCF or LCM values for use in other calculations</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Fraction Operations</h3>
            <p className="text-sm text-muted-foreground">
              A student adding 3/24 + 5/36 needs a common denominator. They find LCM(24,36) = 72,
              convert fractions, and get the answer. GCF helps simplify the final result.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Scheduling Repeating Events</h3>
            <p className="text-sm text-muted-foreground">
              Two buses run every 15 and 20 minutes. A commuter uses LCM(15,20) = 60 to find
              they&apos;ll both arrive together every hour, helping plan connections.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Simplifying Fractions</h3>
            <p className="text-sm text-muted-foreground">
              Someone simplifies 48/60 by finding GCF(48,60) = 12, then dividing both by 12
              to get the reduced fraction 4/5.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Tiling and Pattern Problems</h3>
            <p className="text-sm text-muted-foreground">
              A designer tiles a floor with 18&quot; and 24&quot; tiles. They find GCF(18,24) = 6
              to determine the largest square that fits evenly into both dimensions.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Gear Ratio Calculations</h3>
            <p className="text-sm text-muted-foreground">
              A mechanical engineer designs gears with 30 and 45 teeth. GCF(30,45) = 15
              helps determine the simplest gear ratio (2:3) for the mechanism.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Understanding GCF, LCM, and their relationship:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>GCF (Greatest Common Factor) is the largest number that divides all inputs evenly</li>
            <li>LCM (Least Common Multiple) is the smallest number divisible by all inputs</li>
            <li>Works with 2 or more numbers - calculations chain for multiple inputs</li>
            <li>Prime factorization shows how each number breaks down into prime factors</li>
            <li>Uses the Euclidean algorithm for efficient GCF computation</li>
            <li>Zero is excluded as it would make LCM undefined</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What is the Greatest Common Factor?</h3>
            <p className="text-sm text-muted-foreground">
              GCF is the largest number that divides all given numbers without remainder.
              For 12 and 18: factors of 12 are 1,2,3,4,6,12; factors of 18 are 1,2,3,6,9,18.
              GCF = 6 (the largest common factor).
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What is the Least Common Multiple?</h3>
            <p className="text-sm text-muted-foreground">
              LCM is the smallest number that all given numbers divide into evenly.
              For 4 and 6: multiples of 4 are 4,8,12,16...; multiples of 6 are 6,12,18...
              LCM = 12 (the first common multiple).
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How are GCF and LCM related?</h3>
            <p className="text-sm text-muted-foreground">
              For two numbers: GCF(a,b) × LCM(a,b) = a × b. This means if you know one,
              you can find the other. The tool uses this: LCM = |a×b| / GCF.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What is the Euclidean algorithm?</h3>
            <p className="text-sm text-muted-foreground">
              An efficient method to find GCF by repeated division. To find GCF(48,18):
              48÷18=2 remainder 12; 18÷12=1 remainder 6; 12÷6=2 remainder 0. GCF = 6.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I find GCF/LCM of more than 2 numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! Enter multiple numbers separated by commas. The tool calculates iteratively:
              GCF(a,b,c) = GCF(GCF(a,b), c). Same approach for LCM.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What does prime factorization show?</h3>
            <p className="text-sm text-muted-foreground">
              It breaks each number into its prime building blocks. For 60: 60 = 2² × 3 × 5.
              GCF uses the lowest power of common primes; LCM uses the highest power of all primes.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
