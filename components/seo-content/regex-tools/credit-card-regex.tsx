export default function CreditCardRegexSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This credit card validator checks if card numbers match valid formats for major 
            card issuers and verifies the checksum using the Luhn algorithm.
          </p>
          <p className="text-muted-foreground">
            The validation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Format cleaning:</strong> Input is cleaned of spaces, dashes, and other separators.</li>
            <li><strong className="text-foreground">Issuer detection:</strong> The card number prefix identifies the issuer (Visa, MasterCard, Amex, etc.).</li>
            <li><strong className="text-foreground">Length validation:</strong> Card length is checked against expected lengths for the detected issuer.</li>
            <li><strong className="text-foreground">Luhn check:</strong> The checksum algorithm verifies the number's mathematical validity.</li>
          </ol>
          <p className="text-muted-foreground">
            Credit card validation is essential for e-commerce, payment processing, 
            and any application that handles card data entry.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "E-commerce Checkout",
              description: "Validate card numbers before submission to reduce payment failures."
            },
            {
              title: "Payment Form UX",
              description: "Provide real-time feedback on card number format as users type."
            },
            {
              title: "Data Entry Verification",
              description: "Check manually entered card numbers for typos before processing."
            },
            {
              title: "Card Type Detection",
              description: "Identify the card issuer to display appropriate logos and apply correct rules."
            },
            {
              title: "Testing Payment Systems",
              description: "Validate test card numbers during payment gateway integration."
            },
            {
              title: "Fraud Prevention",
              description: "Catch obviously invalid card numbers before they reach payment processors."
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
              caveat: "Valid format doesn't mean active card",
              explanation: "Validation checks format and checksum only. The card may be expired, cancelled, or never issued."
            },
            {
              caveat: "Luhn check catches typos, not fraud",
              explanation: "The Luhn algorithm detects accidental errors, not intentionally fake numbers. Additional verification is needed."
            },
            {
              caveat: "Test cards pass validation",
              explanation: "Issuer-provided test numbers (like 4111111111111111) are mathematically valid but not real cards."
            },
            {
              caveat: "PCI compliance requirements apply",
              explanation: "If you handle card data, PCI-DSS compliance is mandatory. Validation doesn't replace security requirements."
            },
            {
              caveat: "Card number formats change",
              explanation: "Issuers occasionally update their number ranges. Keep validation patterns current."
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
              question: "How does the Luhn algorithm work?",
              answer: "Double every second digit from right, sum digits of results, add undoubled digits. If total % 10 = 0, the number is valid."
            },
            {
              question: "What card types do you support?",
              answer: "Major issuers: Visa (4xxx), MasterCard (51-55xx, 2221-2720), American Express (34xx, 37xx), Discover (6011, 65xx), JCB, Diners Club."
            },
            {
              question: "Why is my valid card showing as invalid?",
              answer: "Check for typos, ensure all digits are entered, verify the card hasn't been reformatted. Some newer card ranges may not be recognized."
            },
            {
              question: "Can I use this for real payments?",
              answer: "Use this for format validation only. Actual payment processing requires PCI-compliant payment gateways and processors."
            },
            {
              question: "What about CVV validation?",
              answer: "This tool validates card numbers only. CVV is separate (3-4 digits on card). CVV validation happens during payment processing."
            },
            {
              question: "How do I handle spaces in card numbers?",
              answer: "Remove all non-digit characters before validation. Spaces and dashes are formatting only, not part of the actual number."
            },
            {
              question: "Are prepaid cards validated differently?",
              answer: "Prepaid cards use the same number formats as regular cards. They're identified by BIN ranges, not format differences."
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
