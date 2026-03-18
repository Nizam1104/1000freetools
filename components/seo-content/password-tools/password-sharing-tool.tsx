export default function PasswordSharingToolSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This secure password sharing tool creates encrypted, self-destructing links
            that allow you to safely share passwords without exposing them in email or chat.
          </p>
          <p className="text-muted-foreground">
            The secure sharing process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Client-side encryption:</strong> Your password is encrypted in your browser before being sent anywhere.</li>
            <li><strong className="text-foreground">Link generation:</strong> A unique URL is created with the decryption key embedded in the fragment (after #).</li>
            <li><strong className="text-foreground">Secure storage:</strong> Only the encrypted data is stored temporarily on the server.</li>
            <li><strong className="text-foreground">One-time access:</strong> When the recipient opens the link, the password decrypts in their browser and the data is immediately deleted.</li>
          </ol>
          <p className="text-muted-foreground">
            The server never sees your actual password, and the decryption key never
            travels over the network separately from the encrypted data.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Sharing Account Access",
              description: "Give team members access to shared accounts without revealing passwords in Slack or email."
            },
            {
              title: "Temporary Contractor Access",
              description: "Provide vendors or contractors with credentials that self-destruct after viewing."
            },
            {
              title: "Family Password Sharing",
              description: "Share streaming service or utility account passwords with family members securely."
            },
            {
              title: "IT Support Scenarios",
              description: "Send password resets or temporary credentials to users without exposing them in tickets."
            },
            {
              title: "Emergency Access",
              description: "Create shareable links for emergency access to critical accounts that expire after use."
            },
            {
              title: "Avoiding Password Reuse",
              description: "Share unique passwords for shared accounts instead of using passwords you use elsewhere."
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
              caveat: "The link is the password",
              explanation: "Whoever has the link can access the password. Send it through a different channel than you normally communicate."
            },
            {
              caveat: "One view then gone",
              explanation: "After the recipient views the link, it's permanently deleted. Make sure they save the password before closing."
            },
            {
              caveat: "Set appropriate expiration",
              explanation: "Choose a reasonable time limit. Too short and they might miss it; too long increases exposure window."
            },
            {
              caveat: "Verify recipient identity",
              explanation: "Make sure you're sending to the right person. Once sent, you can't revoke access before they view it."
            },
            {
              caveat: "Not for highly sensitive credentials",
              explanation: "For critical accounts, use dedicated secret management tools or share in person when possible."
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
              question: "How is this more secure than emailing a password?",
              answer: "Emails are stored in multiple places (sent folder, recipient's inbox, servers). This link self-destructs after one view."
            },
            {
              question: "Can the server owner see my password?",
              answer: "No. Encryption happens in your browser. The server only stores encrypted data and never has the decryption key."
            },
            {
              question: "What happens if the link is intercepted?",
              answer: "Whoever opens it first sees the password, and it's deleted. Send links through trusted channels and verify recipient identity."
            },
            {
              question: "Can I set a password on the link itself?",
              answer: "Some implementations allow additional password protection. Check the specific tool's features for layered security."
            },
            {
              question: "How long should I set the expiration?",
              answer: "Short enough to minimize risk (15-60 minutes), long enough for the recipient to receive and open it. Consider their timezone."
            },
            {
              question: "What if they need the password again later?",
              answer: "They should save it to their password manager on first view. The link won't work a second time."
            },
            {
              question: "Is this suitable for business use?",
              answer: "For occasional sharing, yes. For regular business needs, consider enterprise secret management solutions."
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
