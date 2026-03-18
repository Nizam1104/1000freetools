export default function PasswordDisguiserSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This password disguiser tool masks passwords on your screen as you type
            or review them, protecting against shoulder surfing and accidental exposure.
          </p>
          <p className="text-muted-foreground">
            The disguising process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Input capture:</strong> As you type, each character is immediately captured.</li>
            <li><strong className="text-foreground">Visual masking:</strong> Characters are displayed as bullets (••••••) or asterisks (****) instead of the actual text.</li>
            <li><strong className="text-foreground">Temporary reveal:</strong> Click or hold a reveal button to temporarily show the actual password for verification.</li>
            <li><strong className="text-foreground">Secure clearing:</strong> Clear the field to remove all data from memory instantly.</li>
          </ol>
          <p className="text-muted-foreground">
            This is especially useful when entering passwords in public spaces, during
            screen sharing, or when someone might glance at your screen.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Public Wi-Fi Hotspots",
              description: "Enter passwords at cafes, airports, or hotels without exposing them to nearby screens or cameras."
            },
            {
              title: "Screen Sharing Sessions",
              description: "Share your screen during support calls or presentations without revealing sensitive credentials."
            },
            {
              title: "Open Office Environments",
              description: "Work in shared spaces where colleagues might inadvertently see your screen."
            },
            {
              title: "Recording Tutorials",
              description: "Create video tutorials that demonstrate login processes without exposing actual passwords."
            },
            {
              title: "Privacy-Conscious Typing",
              description: "Develop the habit of always masking passwords, even when alone, for better security practices."
            },
            {
              title: "Assisted Data Entry",
              description: "Have someone help you type without them seeing the actual password characters."
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
              caveat: "Masking doesn't encrypt",
              explanation: "Password disguising only hides visual display. It doesn't protect against keyloggers or network interception."
            },
            {
              caveat: "Beware of shoulder surfers",
              explanation: "Even with masking, someone watching your keyboard can learn password length and potentially guess characters."
            },
            {
              caveat: "Temporary reveal is risky in public",
              explanation: "Only use the reveal feature when you're certain no one can see your screen."
            },
            {
              caveat: "Some sites don't allow paste",
              explanation: "Many password fields block pasting. You may need to type directly into the actual form."
            },
            {
              caveat: "Clear after use",
              explanation: "Always clear the field after copying your password to prevent accidental exposure later."
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
              question: "Why would I need to disguise my password?",
              answer: "Shoulder surfing is more common than you think. Masking protects against casual observation in public or shared spaces."
            },
            {
              question: "Can't I just use my browser's password field?",
              answer: "Yes, but this tool adds extra control - you decide exactly when to reveal, and it works anywhere, not just in forms."
            },
            {
              question: "Is the password stored anywhere?",
              answer: "No. Everything happens in your browser's memory and is cleared when you close the page or click clear."
            },
            {
              question: "What's the difference between bullets and asterisks?",
              answer: "Just visual preference. Bullets (•) are more common in modern interfaces. Asterisks (*) are the traditional masking character."
            },
            {
              question: "Can I adjust how long the reveal lasts?",
              answer: "Most implementations show while you hold the button and hide when released, giving you full control over visibility duration."
            },
            {
              question: "Does this work on mobile devices?",
              answer: "Yes, the masking works on any device with a browser. Touch and hold to reveal on mobile."
            },
            {
              question: "Should I always mask my password?",
              answer: "It's a good habit, especially in shared spaces. At home alone, it's less critical but still good practice."
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
