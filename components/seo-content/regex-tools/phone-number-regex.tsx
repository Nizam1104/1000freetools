export default function PhoneNumberRegexSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This phone number validator checks if phone numbers match valid formats for 
            specific countries or regions, ensuring contact data is properly formatted.
          </p>
          <p className="text-muted-foreground">
            The validation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Format parsing:</strong> Input numbers are cleaned of common separators (spaces, dashes, parentheses, dots).</li>
            <li><strong className="text-foreground">Pattern matching:</strong> Numbers are checked against regex patterns for the selected country/region format.</li>
            <li><strong className="text-foreground">Length validation:</strong> Total digit count is verified against expected lengths for the region.</li>
            <li><strong className="text-foreground">Format normalization:</strong> Valid numbers are formatted to a standard display format.</li>
          </ol>
          <p className="text-muted-foreground">
            Phone number validation is essential for contact forms, user registration, 
            SMS services, and any application that needs to communicate with users by phone.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Form Validation",
              description: "Validate phone numbers in registration and contact forms before submission."
            },
            {
              title: "Data Cleaning",
              description: "Standardize phone number formats in customer databases for consistent storage."
            },
            {
              title: "SMS Campaign Setup",
              description: "Verify phone numbers before sending bulk SMS messages to reduce failures."
            },
            {
              title: "International User Support",
              description: "Validate phone numbers from users in different countries with appropriate formats."
            },
            {
              title: "Lead Verification",
              description: "Check phone numbers in lead generation systems before passing to sales teams."
            },
            {
              title: "Two-Factor Authentication",
              description: "Ensure phone numbers for 2FA are valid before sending verification codes."
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
              caveat: "Format doesn't guarantee the number works",
              explanation: "Validation checks format only, not whether the number is assigned, active, or belongs to the claimed person."
            },
            {
              caveat: "Country codes vary",
              explanation: "International format requires country code (+1 for US, +44 for UK). Domestic format may omit these. Know which your system expects."
            },
            {
              caveat: "Extensions aren't always handled",
              explanation: "Phone extensions (x123, ext. 456) may not be part of the core number validation. Handle separately if needed."
            },
            {
              caveat: "Mobile vs landline isn't detected",
              explanation: "Format validation doesn't distinguish mobile from landline. Some services (SMS) require mobile numbers specifically."
            },
            {
              caveat: "Number portability affects validity",
              explanation: "Numbers can be ported between carriers and regions. A number's format may not reflect its current service type."
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
              question: "What's the international phone number format?",
              answer: "E.164 format: +[country code][number] with no spaces or separators. Example: +14155551234 for a US number. This is the standard for international systems."
            },
            {
              question: "How do I validate US phone numbers?",
              answer: "US numbers have 10 digits (area code + 7-digit number). Valid formats: (555) 123-4567, 555-123-4567, 5551234567, +1 555 123 4567."
            },
            {
              question: "Can phone numbers start with 0?",
              answer: "In many countries, domestic numbers start with 0 (trunk prefix). International format drops this: UK 07911 123456 becomes +44 7911 123456."
            },
            {
              question: "What about vanity numbers (1-800-FLOWERS)?",
              answer: "Vanity numbers need conversion to digits (1-800-3569377). Validation typically works on numeric format only."
            },
            {
              question: "How do I handle extensions?",
              answer: "Store extensions separately from the main number. Format: +1-555-123-4567 ext. 123. Validate the main number, then handle extension separately."
            },
            {
              question: "Is there a maximum phone number length?",
              answer: "E.164 allows up to 15 digits including country code. Most national numbers are 7-12 digits. Anything longer is likely invalid."
            },
            {
              question: "Should I store phone numbers with formatting?",
              answer: "Store as plain digits (or E.164 format) in databases. Apply display formatting when showing to users. This enables searching and comparison."
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
