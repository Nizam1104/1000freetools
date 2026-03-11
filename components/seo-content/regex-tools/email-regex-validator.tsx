export default function EmailRegexValidatorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This email validator checks if addresses match valid email format patterns, 
            ensuring proper structure before sending or storing.
          </p>
          <p className="text-muted-foreground">
            The validation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Structure check:</strong> Verifies the address has exactly one @ symbol separating local and domain parts.</li>
            <li><strong className="text-foreground">Local part validation:</strong> Checks the part before @ for valid characters and length.</li>
            <li><strong className="text-foreground">Domain validation:</strong> Verifies the domain has valid format with at least one dot and valid TLD.</li>
            <li><strong className="text-foreground">RFC compliance:</strong> Optionally checks against RFC 5322 specifications for full compliance.</li>
          </ol>
          <p className="text-muted-foreground">
            Email validation is essential for user registration, newsletter signups, 
            contact forms, and any application that collects email addresses.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "User Registration",
              description: "Validate email addresses during signup to ensure users can receive confirmation emails."
            },
            {
              title: "Newsletter Signups",
              description: "Check email format before adding subscribers to mailing lists."
            },
            {
              title: "Contact Forms",
              description: "Verify reply-to addresses before processing contact form submissions."
            },
            {
              title: "Data Import",
              description: "Validate email addresses in imported contact lists and customer databases."
            },
            {
              title: "Password Recovery",
              description: "Ensure recovery emails are sent to properly formatted addresses."
            },
            {
              title: "E-commerce Checkout",
              description: "Validate customer email addresses for order confirmations and receipts."
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
              caveat: "Format validation doesn't verify existence",
              explanation: "A valid format doesn't mean the email address actually exists or receives mail. That requires sending and verification."
            },
            {
              caveat: "RFC-compliant regex is complex",
              explanation: "Full RFC 5322 compliance requires a very complex regex. Most applications use simplified validation that catches 99% of cases."
            },
            {
              caveat: "Some valid emails may be rejected",
              explanation: "Unusual but valid addresses (quoted local parts, IP domains) may fail simplified validation."
            },
            {
              caveat: "Disposable emails pass validation",
              explanation: "Temporary email services create valid-format addresses. Use disposable email detection separately if needed."
            },
            {
              caveat: "International emails need special handling",
              explanation: "Non-ASCII characters in emails (internationalized addresses) require UTF-8 support and special validation."
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
              question: "What's the regex for email validation?",
              answer: "Simple: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/. Better: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/. RFC-compliant is much longer."
            },
            {
              question: "Should I allow plus signs in emails?",
              answer: "Yes, Gmail and others support plus addressing (user+tag@gmail.com). It's valid and useful for filtering."
            },
            {
              question: "What's the maximum email length?",
              answer: "RFC allows up to 254 characters total, 64 for local part. Most systems enforce similar limits."
            },
            {
              question: "Are numbers-only emails valid?",
              answer: "Yes, 12345@example.com is valid. Local parts can be any combination of allowed characters."
            },
            {
              question: "Do I need to verify emails?",
              answer: "Format validation catches typos. For important communications, send a confirmation email to verify the address works."
            },
            {
              question: "What about role-based emails?",
              answer: "admin@, info@, support@ are valid formats. Some businesses filter these for marketing. Format validation accepts them."
            },
            {
              question: "Can domains be just numbers?",
              answer: "No, domains must contain letters. IP addresses in brackets (user@[192.168.1.1]) are technically valid but rare."
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
