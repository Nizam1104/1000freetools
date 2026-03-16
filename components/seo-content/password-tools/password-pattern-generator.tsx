export default function PasswordPatternGeneratorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This passphrase generator creates memorable yet secure passwords by combining random 
            words from a curated list - the same approach popularized by the famous XKCD comic about password strength.
          </p>
          <p className="text-muted-foreground">
            The generation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Word selection:</strong> Using cryptographically secure random numbers, the tool selects words from a list of ~100 common, memorable words.</li>
            <li><strong className="text-foreground">Customization:</strong> You control the number of words (3-7), separator character, capitalization style, and whether to add numbers or symbols.</li>
            <li><strong className="text-foreground">Assembly:</strong> Words are joined with your chosen separator, then optional numbers and symbols are appended.</li>
            <li><strong className="text-foreground">Multiple options:</strong> Five passphrases are generated at once, giving you variety to choose from.</li>
          </ol>
          <p className="text-muted-foreground">
            The result is a password that's both strong and memorable - something like 
            "Purple-Elephant-Umbrella-42" that you can actually remember without writing down.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Master Password Creation",
              description: "Generate a memorable master password for your password manager that you'll actually remember without compromising security."
            },
            {
              title: "Device Encryption Keys",
              description: "Create passphrases for disk encryption (FileVault, BitLocker) that balance security with the need to type them manually."
            },
            {
              title: "Accounts You Type Frequently",
              description: "For accounts you log into daily without autofill, passphrases are easier to type than random character strings."
            },
            {
              title: "Sharing Passwords Verbally",
              description: "When you need to tell someone a password over the phone, 'correct-horse-battery-42' is much easier to communicate than 'xK9#mP2$'."
            },
            {
              title: "Security-Conscious but Memory-Limited Users",
              description: "Perfect for people who struggle to remember complex passwords but understand the importance of security."
            },
            {
              title: "Backup Authentication",
              description: "Create memorable recovery passwords for 2FA backup codes or account recovery scenarios."
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
              caveat: "Word list size affects security",
              explanation: "This tool uses about 100 words for demonstration. Real implementations like Diceware use 7,776 words. With 100 words, four words give ~26 bits of entropy. For serious use, consider a larger word list."
            },
            {
              caveat: "Common words may appear in dictionaries",
              explanation: "While random combinations are strong, individual words are common. Advanced cracking attacks include passphrase dictionaries, so more words = better protection."
            },
            {
              caveat: "Avoid customizing too much",
              explanation: "If you regenerate until you get a passphrase you like, you're reducing randomness. Take the first result or pick randomly from the options."
            },
            {
              caveat: "Numbers and symbols add modest security",
              explanation: 'Adding "42" or "!" provides some extra entropy but the real strength comes from the word count. Don\'t sacrifice memorability for minor security gains.'
            },
            {
              caveat: "Not ideal for high-security applications",
              explanation: "For extremely sensitive accounts, a truly random 20+ character password is still stronger. Passphrases excel at balancing security with human memorability."
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
              question: "How many words should I use?",
              answer: "For this tool's ~100-word list, use 6-7 words for good security. With a full Diceware list (7,776 words), 4-5 words is sufficient. More words always means more security."
            },
            {
              question: "Are passphrases really as secure as random passwords?",
              answer: "They can be even better. A 6-word passphrase from a 100-word list has about 40 bits of entropy and is more memorable than a random 8-character password with about 52 bits. Memorability means you're less likely to write it down or reuse it."
            },
            {
              question: "What separator should I use?",
              answer: "Hyphens (-) or spaces work well for memorability and typing. Avoid symbols that require shift keys if you'll type this frequently. The separator itself adds minimal security."
            },
            {
              question: "Should I capitalize words?",
              answer: "Capitalizing the first letter of each word (Title Case) adds a small amount of entropy and can aid memorability. All-caps is harder to type. Lowercase-only is easiest but slightly less secure."
            },
            {
              question: "Can I modify the generated passphrase?",
              answer: "Minor modifications are okay if it helps you remember it, but don't change so much that you reduce randomness. Swapping word order is fine; replacing words with personal choices reduces security."
            },
            {
              question: "Is this suitable for password managers?",
              answer: "Yes, especially for the master password. For other accounts, your password manager should generate random passwords. Use passphrases where you need to remember or type the password manually."
            },
            {
              question: "What if I don't like any of the generated options?",
              answer: "Generate again! The beauty of this approach is you can create unlimited options until you find one that sticks in your memory. Just don't spend so long that you're cherry-picking patterns."
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
