export default function PasswordEntropyCalculatorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            Password entropy measures the randomness and unpredictability of your password in bits. 
            Think of it as a mathematical way to answer "how hard would this be to guess?"
          </p>
          <p className="text-muted-foreground">
            The calculator uses the formula: <strong className="font-mono bg-muted px-1 rounded">Entropy = Length × log₂(Charset Size)</strong>
          </p>
          <p className="text-muted-foreground">
            Here's what happens behind the scenes:
          </p>
          <ul className="text-muted-foreground space-y-2 list-disc list-inside">
            <li>It analyzes which character types you're using (lowercase, uppercase, numbers, symbols)</li>
            <li>Calculates your total charset size (26 for lowercase, 52 for mixed case, etc.)</li>
            <li>Multiplies by password length to get total possible combinations</li>
            <li>Converts to bits using logarithm base 2</li>
            <li>Estimates crack time at different attack speeds</li>
          </ul>
          <p className="text-muted-foreground">
            For example, "password123" has about 51 bits of entropy. A truly random 12-character 
            password with all character types hits around 78 bits - that's over 4 million times harder to crack.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Creating New Accounts",
              description: "Before signing up for a new service, verify your password has enough entropy to withstand attacks."
            },
            {
              title: "Security Audits",
              description: "IT teams use entropy calculations to enforce minimum password strength policies across organizations."
            },
            {
              title: "Password Manager Migration",
              description: "When moving to a password manager, check which existing passwords need upgrading based on their entropy scores."
            },
            {
              title: "Compliance Requirements",
              description: "Meet regulatory standards (SOC 2, HIPAA) that mandate minimum entropy thresholds for sensitive systems."
            },
            {
              title: "Educating Users",
              description: "Show team members concrete numbers about why 'Password1!' isn't as secure as they think."
            },
            {
              title: "Comparing Password Strategies",
              description: "Test whether a longer passphrase beats a shorter complex password for your specific threat model."
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
              caveat: "Entropy assumes random character selection",
              explanation: "If you use patterns like 'Password123!' or keyboard walks like 'qwerty', your actual security is much lower than the entropy suggests. The math assumes each character was chosen independently."
            },
            {
              caveat: "Doesn't check against breach databases",
              explanation: "A password can have high entropy but still be compromised if it appeared in a data breach. Always check passwords against Have I Been Pwned separately."
            },
            {
              caveat: "Crack times are theoretical estimates",
              explanation: "Real-world cracking depends on the hash algorithm (MD5 cracks faster than bcrypt), available hardware, and whether attackers use dictionary attacks instead of brute force."
            },
            {
              caveat: "80+ bits is the practical sweet spot",
              explanation: "Beyond 80-100 bits, you're in diminishing returns territory. A 128-bit password won't crack in your lifetime, but neither will a 100-bit one. Focus on usability after hitting 80 bits."
            },
            {
              caveat: "Length often beats complexity",
              explanation: "A 16-character lowercase-only password (about 75 bits) often beats an 8-character mixed password (about 52 bits) while being easier to remember and type."
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
              question: "What's a good entropy score for everyday passwords?",
              answer: "Aim for at least 60 bits for general accounts and 80+ bits for sensitive ones (banking, email, password manager). Below 40 bits is considered weak and could be cracked in hours by modern hardware."
            },
            {
              question: "How does password length affect entropy?",
              answer: "Length has a linear impact - each additional character adds log₂(charset) bits. With a 94-character charset (all printable ASCII), each character adds about 6.5 bits. That's why longer passwords are so much stronger."
            },
            {
              question: "Is a passphrase better than a complex password?",
              answer: "Often yes. Four random words from a 2000-word list give about 44 bits. Five words hit 55 bits. The advantage: passphrases are easier to remember and type, reducing the temptation to write them down."
            },
            {
              question: "Why do crack times vary so much between attack speeds?",
              answer: "Online attacks (guessing through a website) might only allow 100 attempts per second due to rate limiting. Offline attacks (cracking stolen password hashes) can try billions per second with GPU clusters. Always assume the worst case."
            },
            {
              question: "Does adding symbols significantly improve entropy?",
              answer: "Yes, but with diminishing returns. Adding symbols increases charset from 62 (letters + numbers) to 94, which adds about 0.6 bits per character. You'd get similar gains by just adding one more character."
            },
            {
              question: "Can entropy calculators be trusted?",
              answer: "For random passwords, yes. But they can't detect patterns, dictionary words, or personal information. Use entropy as one metric alongside breach checks and pattern detection for a complete security picture."
            },
            {
              question: "What's the maximum useful entropy?",
              answer: "Around 128 bits is the practical maximum. At 100 trillion guesses per second, a 128-bit password would take billions of years to crack. Higher entropy doesn't meaningfully increase security but may reduce usability."
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
