import React from "react"

export default function JWTTokenScramblerObfuscatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Understanding JWT Token Obfuscation</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            JWT token scrambling takes the three segments (header, payload, signature) and applies transformations to hide the readable structure. Common techniques include character substitution, segment reordering, or applying reversible encryption to the payload portion.
          </p>
          <p>
            The obfuscation runs entirely in your browser using JavaScript. Your token never leaves your machine. The process is reversible—applying the same operation twice typically restores the original token.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Common scrambling techniques:</p>
            <ul className="text-sm space-y-1.5 ml-4 list-disc">
              <li><strong className="text-foreground">Character rotation</strong> - Shifting each character by N positions in the alphabet</li>
              <li><strong className="text-foreground">Base64 double-encoding</strong> - Encoding already-encoded segments again</li>
              <li><strong className="text-foreground">XOR masking</strong> - Applying XOR with a key to each byte</li>
              <li><strong className="text-foreground">Segment shuffling</strong> - Reordering header.payload.signature</li>
            </ul>
          </div>
          <p>
            After scrambling, the token looks like random gibberish. Only someone with the descrambling algorithm (or key) can restore the original JWT structure.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When Token Scrambling Makes Sense</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Hiding tokens in client-side code</h3>
            <p className="text-sm text-muted-foreground">
              You need to embed a service account JWT in frontend code for a demo. Scrambling prevents casual inspection from revealing the token structure, though it's not real security.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Obfuscating tokens in logs</h3>
            <p className="text-sm text-muted-foreground">
              Your application logs JWTs for debugging but you don't want them visible in plain text. Scramble before logging, descramble when analyzing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating puzzle/challenge tokens</h3>
            <p className="text-sm text-muted-foreground">
              Running a CTF or security training? Scramble JWTs as part of a challenge where participants must reverse-engineer the obfuscation to extract flags.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing token validation robustness</h3>
            <p className="text-sm text-muted-foreground">
              Your security team needs to verify that token parsers reject malformed or obfuscated tokens. Generate scrambled variants to test edge cases.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Demonstrating why JWTs aren't encrypted</h3>
            <p className="text-sm text-muted-foreground">
              Teaching a security workshop? Show how easily JWT payloads can be read, then demonstrate scrambling as a way to add obscurity (not security).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Protecting tokens in screenshots</h3>
            <p className="text-sm text-muted-foreground">
              Creating documentation with screenshots that include tokens. Scramble them first so viewers can't accidentally copy and misuse real credentials.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Important Limitations</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Obfuscation is not encryption.</strong>
              Scrambling hides the token structure but doesn't provide cryptographic security. Anyone with the algorithm can descramble. Never rely on this for actual protection.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Scrambled tokens won't work as-is.</strong>
              A scrambled JWT breaks the standard format. You must descramble before using the token for authentication. Don't send scrambled tokens to APIs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Signature validation breaks.</strong>
              If you scramble the signature segment, the token becomes invalid. Scrambling is for storage/transport obfuscation, not for creating valid alternative tokens.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">No standard descrambling method.</strong>
              Different tools use different algorithms. A token scrambled with one tool may not be descramblable by another. Document your method.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Critical warning:</strong> Never use token scrambling as a security measure. It provides obscurity only. For real protection, use proper encryption (JWE) or keep tokens in secure HTTP-only cookies.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is scrambling a JWT the same as encrypting it?</h3>
            <p className="text-sm text-muted-foreground">
              No. Encryption (like JWE) uses cryptographic keys and is computationally secure. Scrambling is reversible obfuscation—anyone who knows the algorithm can undo it without a key.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use a scrambled JWT for authentication?</h3>
            <p className="text-sm text-muted-foreground">
              No. Servers expect standard JWT format (header.payload.signature). Scramble only for storage or display. Descramble before sending in Authorization headers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the point of scrambling if it's not secure?</h3>
            <p className="text-sm text-muted-foreground">
              It prevents casual inspection. Like putting a cover on a password field—it stops shoulder surfers but won't stop a determined attacker with the right tools.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does scrambling affect token size?</h3>
            <p className="text-sm text-muted-foreground">
              Most scrambling methods preserve size or add minimal overhead. Double-base64 encoding increases size by ~33%. XOR masking keeps the same size.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I scramble just the payload?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, you can selectively scramble segments. Some implementations only scramble the payload to hide claims while keeping the header readable for algorithm detection.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I descramble a token?</h3>
            <p className="text-sm text-muted-foreground">
              Use the same tool with the descramble option (if available). Most simple scrambling algorithms are symmetric—applying the same operation twice restores the original.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
