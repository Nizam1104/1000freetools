import React from "react"

export default function CustomSaltedHashGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How Salted Hash Generation Works</h2>

        <div className="space-y-3 text-muted-foreground">
          <p>
            A salted hash adds random data (the salt) to your input before hashing. This tool
            combines your salt and input using the pattern <code className="bg-muted px-1 rounded text-xs">salt + input + salt</code>,
            then computes SHA-256 on the combined value.
          </p>

          <p>
            You can provide your own salt or generate a random one. Random salts are recommended
            for security applications because they ensure each hash is unique, even for identical
            inputs.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="text-sm font-medium">The salting process:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Enter your input (password, text, etc.)</li>
              <li>Provide a custom salt or click "Generate Random" for a cryptographically random salt</li>
              <li>The tool combines: salt + input + salt (double-salt pattern)</li>
              <li>SHA-256 is computed on the combined value</li>
              <li>Output shows the hash and breaks down the components used</li>
            </ol>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Why double-salt?</strong> This tool uses salt
              on both sides of the input (prefix and suffix). This provides additional protection
              against certain attack patterns, though standard practice is typically salt-prefix
              only.
            </p>
          </div>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning about password security</h3>
            <p className="text-sm text-muted-foreground">
              See firsthand how salting prevents rainbow table attacks. Hash the same password
              with different salts and watch how completely different hashes result—proving that
              pre-computed tables become useless.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing authentication implementations</h3>
            <p className="text-sm text-muted-foreground">
              Building a login system? Generate test cases with known salts and inputs to verify
              your password verification code produces matching hashes.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Generating API keys with salt</h3>
            <p className="text-sm text-muted-foreground">
              Some systems create API keys by hashing user data with a server-side salt. This
              tool helps prototype that workflow before implementing it in code.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Understanding hash determinism</h3>
            <p className="text-sm text-muted-foreground">
              Hash the same input twice with the same salt—identical results. Change the salt
              slightly—completely different hash. This demonstrates the deterministic nature of
              hashes and the importance of salt uniqueness.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating reproducible test data</h3>
            <p className="text-sm text-muted-foreground">
              Need consistent hashed test data for development? Use a fixed salt to generate
              predictable hashes that stay the same across test runs.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Migrating legacy password systems</h3>
            <p className="text-sm text-muted-foreground">
              Moving from unsalted to salted hashes? Generate test vectors to understand how
              existing passwords would be re-hashed with salts during migration.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using Salted Hashes</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Store the salt with the hash.</strong> The salt
              isn't secret—it's stored alongside the hash in your database. Without it, you can't
              verify passwords later. Security comes from uniqueness, not secrecy.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Use a unique salt per password.</strong> Never
              reuse salts across users. If two users have the same password and salt, they'll
              have the same hash—defeating the purpose of salting.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">This isn't production-ready password hashing.</strong>
              Real password systems use bcrypt, Argon2, or scrypt with built-in salting and key
              stretching. This tool demonstrates the concept but shouldn't be used for actual
              password storage.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Random salt generation uses crypto.getRandomValues().</strong>
              The random salt feature uses your browser's cryptographically secure random number
              generator—the same source used for generating encryption keys.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Salt length matters.</strong> Use at least 16
              bytes (32 hex characters) of salt. Shorter salts reduce the effectiveness against
              rainbow table attacks. The random salt generator creates 16-byte salts.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why add salt to a hash?</h3>
            <p className="text-sm text-muted-foreground">
              Salt prevents rainbow table attacks. Without salt, the same password always
              produces the same hash—attackers can pre-compute hashes for common passwords.
              With unique salts, each hash is different, making pre-computation useless.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should the salt be secret?</h3>
            <p className="text-sm text-muted-foreground">
              No. The salt is stored in plain text alongside the hash. Its purpose isn't secrecy
             —it's uniqueness. Even knowing the salt, attackers must brute-force each hash
              individually instead of using pre-computed tables.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between salt and pepper?</h3>
            <p className="text-sm text-muted-foreground">
              Salt is unique per password and stored with the hash. Pepper is a single secret
              value shared across all passwords, stored separately (like in environment config).
              Pepper adds defense-in-depth but requires secure key management.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does this tool use salt-input-salt order?</h3>
            <p className="text-sm text-muted-foreground">
              Double-salting (prefix and suffix) provides additional protection against certain
              length-extension attacks and is a common pattern. However, standard practice is
              often just prefix salting. The important part is consistency—use the same pattern
              for hashing and verification.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for actual password storage?</h3>
            <p className="text-sm text-muted-foreground">
              Not recommended. This uses plain SHA-256, which is too fast for password hashing.
              Use bcrypt, Argon2, or scrypt instead—they're designed to be slow and
              memory-hard, making brute-force attacks impractical.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How long should a salt be?</h3>
            <p className="text-sm text-muted-foreground">
              At least 128 bits (16 bytes, 32 hex characters). This provides enough uniqueness
              that salt collisions are virtually impossible. The random salt generator creates
              16-byte salts, which is the recommended minimum.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens if I lose the salt?</h3>
            <p className="text-sm text-muted-foreground">
              You can't verify passwords anymore. The salt is required to recompute the hash for
              comparison. This is why salts are stored in the database alongside the hash—they're
              essential data, not optional metadata.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
