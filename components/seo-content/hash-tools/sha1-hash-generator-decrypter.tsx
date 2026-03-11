import React from "react"

export default function Sha1HashGeneratorDecrypterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How SHA-1 Hashing and Lookup Works</h2>

        <div className="space-y-3 text-muted-foreground">
          <p>
            SHA-1 takes your input and produces a 160-bit hash—always 40 hexadecimal characters.
            This tool does two things: it generates SHA-1 hashes from your text, and it attempts
            to look up common hashes in a rainbow table to find the original password.
          </p>

          <p>
            The hash generation uses a pure JavaScript implementation of the SHA-1 algorithm.
            The rainbow table lookup checks against a database of pre-computed hashes for common
            passwords like "password", "123456", "admin", and thousands of others.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="text-sm font-medium">Here's what happens step by step:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Type text and the tool computes its SHA-1 hash using the standard algorithm</li>
              <li>Paste a hash and it checks if it matches your generated hash</li>
              <li>The lookup feature searches the rainbow table for known password matches</li>
              <li>If found, you'll see the original password; if not, the hash is likely unique or salted</li>
            </ol>
          </div>

          <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
            <p className="text-sm text-yellow-600">
              <strong>Important:</strong> SHA-1 is cryptographically broken. The rainbow table
              feature is for educational purposes and security auditing only. Never use SHA-1 for
              new security applications.
            </p>
          </div>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Auditing legacy password databases</h3>
            <p className="text-sm text-muted-foreground">
              Found an old system storing SHA-1 password hashes? Use the rainbow table lookup to
              identify weak passwords and prioritize which accounts need immediate password resets.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Git commit verification</h3>
            <p className="text-sm text-muted-foreground">
              Git uses SHA-1 for commit hashes. If you're working with Git internals or debugging
              repository corruption, this helps you understand how Git identifies objects.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Security research and education</h3>
            <p className="text-sm text-muted-foreground">
              Teaching cryptography? Show students why SHA-1 is deprecated by demonstrating how
              quickly common passwords can be reversed through rainbow table lookup.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Verifying SHA-1 checksums</h3>
            <p className="text-sm text-muted-foreground">
              Some older software still distributes SHA-1 checksums for file verification. Generate
              hashes to confirm your downloads match the published values.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing password strength</h3>
            <p className="text-sm text-muted-foreground">
              Wondering if your password is too common? Hash it and see if it appears in the
              rainbow table. If it does, it's in every attacker's database.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Migrating from SHA-1 to stronger algorithms</h3>
            <p className="text-sm text-muted-foreground">
              Planning to upgrade your authentication system? Identify which user hashes can be
              cracked easily—these accounts are most at risk during the migration period.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using SHA-1</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
            <p className="text-sm">
              <strong className="text-foreground text-red-600">SHA-1 is broken for security use.</strong> In
              2017, Google demonstrated the first practical collision attack. Two different PDF
              files produced the same SHA-1 hash. Never use it for certificates, signatures, or
              password storage.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">The rainbow table is limited.</strong> It contains
              common passwords only. Complex passwords with symbols, length, or uniqueness won't
              be found. A missing match doesn't mean the hash is secure—it just isn't in this
              particular database.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Salts defeat rainbow tables.</strong> If a hash
              includes a salt (random data added before hashing), rainbow table lookup won't work.
              The same password with different salts produces completely different hashes.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Git still uses SHA-1, but it's okay.</strong> Git
              uses SHA-1 for content addressing, not security. The collision attacks don't affect
              Git's use case. Git is gradually migrating to SHA-256 anyway.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is SHA-1 considered broken?</h3>
            <p className="text-sm text-muted-foreground">
              Researchers found a way to create two different inputs that produce the same SHA-1
              hash—a collision. The "SHAttered" attack in 2017 demonstrated this with real PDF
              files. This breaks the fundamental security property that each input should have a
              unique hash.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How does the rainbow table lookup work?</h3>
            <p className="text-sm text-muted-foreground">
              A rainbow table is a pre-computed database of hashes for common passwords. Instead
              of cracking the hash mathematically, we just look it up like a phone book. If your
              hash is in the table, we return the password instantly.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can this crack any SHA-1 hash?</h3>
            <p className="text-sm text-muted-foreground">
              No. The rainbow table only contains common passwords. A password like
              "Tr0ub4dor&3" with symbols and mixed case likely won't be in the table. Long,
              complex, or unique passwords require brute-force attacks instead.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What should I use instead of SHA-1?</h3>
            <p className="text-sm text-muted-foreground">
              For general hashing: SHA-256 or SHA-3. For passwords specifically: bcrypt, Argon2,
              or scrypt. These are designed to be slow and memory-hard, making brute-force attacks
              impractical.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is 40 characters always SHA-1?</h3>
            <p className="text-sm text-muted-foreground">
              A 40-character hexadecimal hash is typically SHA-1, but it could also be RIPEMD-160
              or other 160-bit hash algorithms. Context matters—if it's from Git or an older
              security system, it's probably SHA-1.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does the hash verification show match/no match?</h3>
            <p className="text-sm text-muted-foreground">
              The verification feature lets you confirm that a given hash was generated from
              specific input. This is useful for testing, debugging, or confirming you've
              correctly implemented SHA-1 in your own code.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my data safe when using this tool?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Everything runs locally in your browser—no data is sent to servers. However,
              don't paste actual passwords from production systems. Use test data only.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
