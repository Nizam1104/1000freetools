export default function PasswordPronunciationGeneratorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This tool converts your password into a phonetic pronunciation guide, making it 
            easier to communicate complex passwords verbally or create memory aids.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Character classification:</strong> Each character is identified as a letter, number, or symbol.</li>
            <li><strong className="text-foreground">Phonetic mapping:</strong> Letters map to their spoken names, numbers to their word equivalents (0=&quot;zero&quot;, 1=&quot;one&quot;), and symbols to their common names (@=&quot;at&quot;, #=&quot;hash&quot;).</li>
            <li><strong className="text-foreground">Output generation:</strong> Creates both a character-by-character breakdown and a continuous phonetic string.</li>
            <li><strong className="text-foreground">Visual formatting:</strong> Displays each character with its type and pronunciation for easy reference.</li>
          </ol>
          <p className="text-muted-foreground">
            For example, "P@ssw0rd" becomes "P at s s w zero r d" - much easier to say 
            over the phone than trying to describe each character individually.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Phone Support Scenarios",
              description: "When support needs your password for verification, communicate it clearly without confusion between similar-sounding characters."
            },
            {
              title: "Password Sharing with Trusted Parties",
              description: "Share passwords verbally with family members or colleagues by giving them the pronunciation guide to follow."
            },
            {
              title: "Creating Memory Aids",
              description: "Convert complex passwords into pronounceable phrases that are easier to memorize through repetition."
            },
            {
              title: "Accessibility Support",
              description: "Help users with visual impairments communicate passwords to screen reader software or assistants."
            },
            {
              title: "Training and Documentation",
              description: "Include pronunciation guides in documentation for default passwords or shared credentials."
            },
            {
              title: "Voice Assistant Integration",
              description: "Create voice-friendly versions of passwords for smart home systems or voice-activated applications."
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
              caveat: "Pronunciation guides shouldn't be stored with passwords",
              explanation: "The phonetic version makes your password easier to guess if intercepted. Use pronunciation only for verbal communication, not written documentation."
            },
            {
              caveat: "Symbol names vary by region",
              explanation: "What Americans call &quot;pound sign&quot; (#), Brits call &quot;hash&quot;. The tool uses common US terminology. Adjust for your audience."
            },
            {
              caveat: "Similar-sounding words can still cause confusion",
              explanation: "Even with pronunciation guides, &quot;em&quot; and &quot;en&quot; or &quot;bee&quot; and &quot;dee&quot; can be confused. Consider using the NATO phonetic alphabet for critical communications."
            },
            {
              caveat: "Not a security feature",
              explanation: "This tool aids communication, not security. The pronunciation guide actually makes your password easier to understand if overheard."
            },
            {
              caveat: "Some symbols have multiple names",
              explanation: "The pipe character (|) might be called &quot;pipe&quot;, &quot;vertical bar&quot;, or &quot;stick&quot;. The tool picks one standard name for consistency."
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
              question: "Why would I need to pronounce my password?",
              answer: "There are legitimate scenarios: phone verification with support, sharing with family for emergency access, dictating to an assistant, or creating audio backups. Sometimes you need to say it out loud."
            },
            {
              question: "How do I use this for phone support?",
              answer: "Generate the pronunciation, then read it slowly: &quot;My password is: capital P, at sign, s, s, w, zero, r, d.&quot; The guide helps you stay consistent and clear."
            },
            {
              question: "Can I use this to memorize passwords?",
              answer: "Yes, but be careful. The phonetic version is easier to remember but also easier for others to guess if overheard. Use it as a temporary memory aid while transitioning to a password manager."
            },
            {
              question: "What about non-English characters?",
              answer: "This tool focuses on standard ASCII characters. Accented characters and non-Latin scripts would need locale-specific pronunciation guides not covered here."
            },
            {
              question: "Is there a standard for password pronunciation?",
              answer: "Not really. Some organizations use the NATO phonetic alphabet (Alpha, Bravo, Charlie). This tool uses common English names for simplicity and broad understanding."
            },
            {
              question: "Should I write down the pronunciation guide?",
              answer: "Generally no - it makes your password easier to crack if someone finds it. If you must write it down, use a code or store it separately from the hint itself."
            },
            {
              question: "Can this help with accessibility?",
              answer: "Yes! Screen readers can read the phonetic guide aloud, helping users with visual impairments verify or communicate their passwords more accurately."
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
