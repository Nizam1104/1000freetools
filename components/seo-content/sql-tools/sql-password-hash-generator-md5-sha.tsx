export default function SqlPasswordHashGeneratorMd5ShaSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This SQL password hash generator creates INSERT and UPDATE statements with properly
            hashed passwords using MD5, SHA1, or SHA2 algorithms for direct database insertion.
          </p>
          <p className="text-muted-foreground">
            The generation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Password input:</strong> Enter the plaintext password you want to hash and store securely.</li>
            <li><strong className="text-foreground">Algorithm selection:</strong> Choose MD5, SHA1, SHA256, or SHA512 based on your security requirements and database capabilities.</li>
            <li><strong className="text-foreground">SQL dialect selection:</strong> Pick MySQL, PostgreSQL, SQL Server, or another database to get the correct hash function syntax.</li>
            <li><strong className="text-foreground">Statement generation:</strong> The tool produces ready-to-execute INSERT or UPDATE statements with the hash function embedded.</li>
          </ol>
          <p className="text-muted-foreground">
            Storing hashed passwords instead of plaintext is essential for security. Even if your
            database is compromised, attackers can't immediately see user passwords.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Initial User Migration",
              description: "Generate hash statements when migrating users from a legacy system to a new database."
            },
            {
              title: "Manual User Creation",
              description: "Create admin or test accounts directly in the database with properly hashed passwords."
            },
            {
              title: "Password Reset Scripts",
              description: "Build SQL scripts to reset multiple user passwords to a temporary value during security incidents."
            },
            {
              title: "Database Seeding",
              description: "Populate development databases with test users that have known, hashed passwords."
            },
            {
              title: "Legacy System Integration",
              description: "Match existing hash algorithms when integrating with older systems that use MD5 or SHA1."
            },
            {
              title: "Security Auditing",
              description: "Verify password storage by generating expected hashes and comparing against stored values."
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
              caveat: "MD5 and SHA1 are cryptographically broken",
              explanation: "These algorithms are fast and vulnerable to rainbow table attacks. Use SHA256 or better yet, bcrypt/argon2 for production systems."
            },
            {
              caveat: "Hash functions vary by database",
              explanation: "MySQL uses MD5(), PostgreSQL uses md5(), SQL Server uses HASHBYTES(). This tool generates the correct syntax for your database."
            },
            {
              caveat: "Salting is not included",
              explanation: "These statements hash passwords without salts. For real security, add random salts per user and store them separately."
            },
            {
              caveat: "No key stretching",
              explanation: "Simple hashes are fast to compute. Production systems should use PBKDF2, bcrypt, or argon2 for password-specific hashing."
            },
            {
              caveat: "Generated SQL executes immediately",
              explanation: "Running these statements will insert or update data. Always test on a development database first."
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
              question: "Which hash algorithm should I use for passwords?",
              answer: "For new systems, avoid MD5/SHA1 entirely. Use bcrypt, argon2, or PBKDF2 with salts. If limited to SQL functions, SHA256 with a salt is minimum acceptable."
            },
            {
              question: "What's the difference between MD5, SHA1, and SHA256?",
              answer: "MD5 produces 32 hex characters, SHA1 produces 40, SHA256 produces 64. More importantly, SHA256 is cryptographically stronger and resistant to known attacks."
            },
            {
              question: "Can I reverse a password hash?",
              answer: "Hashes are one-way functions - you can't decrypt them. To verify passwords, hash the input and compare to stored hash. Rainbow tables can crack weak passwords."
            },
            {
              question: "Why not just store plaintext passwords?",
              answer: "If your database is breached, plaintext passwords expose all user accounts. Hashes protect users even if attackers steal the database."
            },
            {
              question: "How do I add password salting in SQL?",
              answer: "Generate a random salt per user, concatenate with password before hashing, and store both. Example: CONCAT(salt, MD5(CONCAT(salt, password)))."
            },
            {
              question: "Can I use this for API authentication tokens?",
              answer: "For tokens, consider using UUID or cryptographically secure random strings instead of hashes. Hashes are designed for password verification, not token generation."
            },
            {
              question: "What if my database doesn't have SHA2 functions?",
              answer: "Older MySQL versions lack SHA2(). Use SHA1() as minimum, or compute hashes in application code before inserting into the database."
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
