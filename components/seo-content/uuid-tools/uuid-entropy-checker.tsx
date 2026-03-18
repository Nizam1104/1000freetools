import React from "react"

export default function UuidEntropyCheckerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Analyze the randomness and entropy of UUID strings to verify they were generated using a proper random number generator. The checker evaluates character distribution, bit patterns, and statistical randomness.
          </p>
          <p>
            Enter one or more UUIDs to test. The tool calculates entropy metrics, checks for suspicious patterns, and flags UUIDs that may have been generated with weak randomness.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Analysis metrics:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">UUID: f47ac10b-58cc-4372-a567-0e02b2c3d479

Character Distribution:
0-9: 45% (expected ~42%)
a-f: 55% (expected ~58%)

Shannon Entropy: 3.89 bits/char (max: 4.0)
Pattern Analysis: No suspicious patterns detected
Verdict: Good randomness ✓

Suspicious UUID:
00000000-0000-4000-8000-000000000000
Verdict: Low entropy - possibly test/fake ✗</pre>
          </div>
          <p>
            The entropy checker uses Shannon entropy calculation and chi-squared tests to evaluate randomness. High entropy indicates good randomness; low entropy suggests predictable or fake UUIDs.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Security audit of ID generation</h3>
            <p className="text-sm text-muted-foreground">
              Verify that your application's UUID generator produces truly random IDs. Low entropy could indicate a broken random number generator, making IDs predictable to attackers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Detecting fake or test data</h3>
            <p className="text-sm text-muted-foreground">
              Production databases sometimes contain test UUIDs like all-zeros or sequential patterns. The entropy checker flags these for cleanup before they cause issues.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Validating third-party integrations</h3>
            <p className="text-sm text-muted-foreground">
              External services send you UUIDs. Verify they're properly generated before storing. Malformed or low-entropy UUIDs might indicate integration problems or malicious input.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Compliance and quality assurance</h3>
            <p className="text-sm text-muted-foreground">
              Some standards require cryptographically secure random identifiers. Entropy analysis provides evidence that your UUID generation meets these requirements.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging random number generators</h3>
            <p className="text-sm text-muted-foreground">
              After changing RNG implementations, verify the output quality. Compare entropy before and after to ensure the new generator produces equally random UUIDs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Forensic analysis</h3>
            <p className="text-sm text-muted-foreground">
              Investigate suspicious activity by analyzing UUID patterns. Attackers might use predictable IDs. Low entropy could reveal automated tools or compromised systems.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">UUID v1 has lower entropy by design.</strong>
              Time-based UUIDs (v1) include structured timestamp data, reducing randomness. Don't flag them as suspicious - their lower entropy is expected and correct.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Version and variant bits are fixed.</strong>
              UUID v4 has 6 fixed bits (version and variant). Maximum entropy is slightly less than 128 bits of pure randomness. The checker accounts for this.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Single UUID analysis has limitations.</strong>
              One UUID might look random by chance. For reliable assessment, analyze batches of UUIDs. Patterns emerge across multiple samples.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">High entropy doesn't guarantee security.</strong>
              Random-looking UUIDs could still be predictable if the seed is known. Entropy measures distribution, not unpredictability to an attacker with inside knowledge.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For security-critical applications, use cryptographically secure random number generators (CSPRNG). Regular Math.random() is not sufficient for generating secure UUIDs.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is Shannon entropy?</h3>
            <p className="text-sm text-muted-foreground">
              Shannon entropy measures the average information content per character. For hex digits (0-9, a-f), maximum entropy is log2(16) = 4 bits per character. Higher is more random.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What entropy value indicates good randomness?</h3>
            <p className="text-sm text-muted-foreground">
              For UUID v4, expect 3.8-4.0 bits per character. Below 3.5 suggests potential issues. Below 3.0 indicates clearly non-random data (test values, sequential IDs, etc.).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this to compare RNG quality?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, generate UUIDs from different sources and compare entropy. crypto.getRandomValues() should score higher than Math.random(). This helps choose the best RNG for your needs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What patterns should I watch for?</h3>
            <p className="text-sm text-muted-foreground">
              Repeated sequences, all-zeros, all-ones, sequential values, or heavy bias toward certain characters. These indicate weak or broken random number generation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is UUID v4 always random?</h3>
            <p className="text-sm text-muted-foreground">
              By specification, yes. But poor implementations might use weak RNGs. Always verify the implementation uses crypto.getRandomValues() or equivalent, not Math.random().
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many UUIDs should I test?</h3>
            <p className="text-sm text-muted-foreground">
              For statistical significance, test at least 100-1000 UUIDs. Small samples might not reveal patterns. Larger samples give more confidence in the randomness assessment.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a nil UUID and is it valid?</h3>
            <p className="text-sm text-muted-foreground">
              The nil UUID (all zeros) is a valid format but represents a null value. It has zero entropy and should be flagged. Don't use it as an actual identifier.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
