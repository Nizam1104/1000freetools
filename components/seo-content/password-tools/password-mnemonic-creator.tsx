export default function PasswordMnemonicCreatorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This tool creates memory aids (mnemonics) for your passwords by transforming 
            complex character sequences into memorable phrases and stories that your brain can actually retain.
          </p>
          <p className="text-muted-foreground">
            The mnemonic generation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Character parsing:</strong> The password is broken down into logical segments - letter groups, individual numbers, and symbols.</li>
            <li><strong className="text-foreground">Word association:</strong> Letters form word stems, numbers convert to word equivalents, and symbols map to descriptive names.</li>
            <li><strong className="text-foreground">Sentence construction:</strong> Components are assembled into memorable sentences using templates like "X is my secret code" or "Remember: X".</li>
            <li><strong className="text-foreground">Story generation:</strong> An alternative approach creates vivid mental images by associating each character with concrete objects (a=apple, b=bear, etc.).</li>
          </ol>
          <p className="text-muted-foreground">
            The result is a memorable phrase that helps you recall the exact password 
            without writing it down - leveraging how human memory actually works.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Master Password Memorization",
              description: "Create a memorable story for your password manager's master password that you need to recall without hints."
            },
            {
              title: "Infrequently Accessed Accounts",
              description: "For accounts you only log into quarterly (tax software, benefits portals), mnemonics prevent lockouts without saving passwords."
            },
            {
              title: "Emergency Access Scenarios",
              description: "Help family members remember emergency access passwords for critical accounts when you're unavailable."
            },
            {
              title: "Device Encryption Passwords",
              description: "Memorize disk encryption passwords that must be typed manually at boot without password manager access."
            },
            {
              title: "Security Certification Exams",
              description: "Students studying for security certifications can use mnemonics to remember example passwords for practical exams."
            },
            {
              title: "Transitioning to Password Managers",
              description: "While migrating to a password manager, use mnemonics to remember which passwords still need to be updated."
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
              caveat: "Mnemonics are memory aids, not security features",
              explanation: "The mnemonic itself might be easier to guess than your password. Never write down or share the mnemonic phrase - it's for your memory only."
            },
            {
              caveat: "Personal associations work best",
              explanation: "The tool provides generic mnemonics, but you'll remember them better if you customize the associations to things meaningful to you."
            },
            {
              caveat: "Complex passwords create complex mnemonics",
              explanation: "A 20-character random password creates a very long mnemonic. Consider using this for shorter, memorable passwords rather than maximum-security ones."
            },
            {
              caveat: "Practice is still required",
              explanation: "Mnemonics aren't magic - you still need to rehearse the association a few times for it to stick in long-term memory."
            },
            {
              caveat: "Not suitable for all password types",
              explanation: "Mnemonics work best for passwords you must memorize. For password manager-generated random passwords, just let the manager remember them."
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
              question: "How effective are mnemonics for password recall?",
              answer: "Very effective when done right. Studies show that vivid, unusual associations are remembered 2-3x better than rote repetition. The key is creating mental images that stick."
            },
            {
              question: "Should I use the generated mnemonic or create my own?",
              answer: "Use the generated one as a starting point, then personalize it. Your brain remembers things better when they connect to existing memories or emotions you have."
            },
            {
              question: "Can mnemonics help with multiple passwords?",
              answer: "Yes, but create distinct mnemonics for each password. Using similar patterns for multiple passwords creates interference and makes them harder to recall individually."
            },
            {
              question: "How long does it take to memorize a password with a mnemonic?",
              answer: "With a good mnemonic and 5-10 minutes of focused practice, most people can recall a password reliably within a day. Review once after an hour, once before sleep, and once the next morning."
            },
            {
              question: "What if the mnemonic doesn't work for me?",
              answer: "Try the story-based approach instead of the phonetic one. Some people remember narratives better than word associations. Or create your own system that matches how your memory works."
            },
            {
              question: "Is it safe to write down the mnemonic?",
              answer: "No more safe than writing the password itself. If someone decodes your mnemonic system, they have your password. Keep mnemonics in your head or in equally secure storage as the password."
            },
            {
              question: "Can I use mnemonics for PINs and short codes?",
              answer: "Absolutely! Mnemonics work great for numeric codes too. Convert numbers to words (1=one/won, 2=to/too) and create phrases. \"4729\" could be \"For 7 days 2 9 weeks\"."
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
