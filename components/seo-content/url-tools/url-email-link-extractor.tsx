export default function UrlEmailLinkExtractorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This tool scans text or HTML content to find and extract all email addresses and 
            mailto: links, making it easy to compile contact lists or audit email link implementation.
          </p>
          <p className="text-muted-foreground">
            The extraction process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Content analysis:</strong> The input text or HTML is scanned for email patterns.</li>
            <li><strong className="text-foreground">Pattern matching:</strong> Regular expressions identify valid email address formats.</li>
            <li><strong className="text-foreground">Mailto link parsing:</strong> HTML anchor tags with href="mailto:" are extracted and parsed.</li>
            <li><strong className="text-foreground">Deduplication:</strong> Duplicate emails are removed, leaving a clean list of unique addresses.</li>
          </ol>
          <p className="text-muted-foreground">
            The tool validates basic email format (contains @ and domain) and presents 
            results in a copy-friendly format for further use.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Contact List Compilation",
              description: "Extract email addresses from web pages, documents, or email threads to build contact lists."
            },
            {
              title: "Website Auditing",
              description: "Verify all mailto: links on your website are correct and working."
            },
            {
              title: "Lead Generation Research",
              description: "Gather publicly available contact emails from company websites and directories."
            },
            {
              title: "Email Migration",
              description: "Extract email addresses from old documents or emails when switching systems."
            },
            {
              title: "Compliance Checking",
              description: "Audit websites for proper email contact information as required by some regulations."
            },
            {
              title: "Data Cleaning",
              description: "Extract emails from mixed content before importing into CRM or email marketing platforms."
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
              caveat: "Respect privacy and anti-spam laws",
              explanation: "Just because you can extract emails doesn't mean you should spam them. GDPR, CAN-SPAM, and other laws regulate unsolicited email."
            },
            {
              caveat: "Not all extracted emails are valid",
              explanation: "Format validation doesn't guarantee the email actually exists or receives mail. Some may be outdated, typos, or spam traps."
            },
            {
              caveat: "Obfuscated emails won't be detected",
              explanation: 'Emails written as "user [at] domain [dot] com" or protected by JavaScript won\'t be found by pattern matching.'
            },
            {
              caveat: "Mailto links may have additional parameters",
              explanation: "Mailto: links can include subject, body, cc, bcc parameters. This tool extracts the base email address."
            },
            {
              caveat: "Context matters for email use",
              explanation: "Emails found on contact pages are meant for contact. Emails in other contexts may not welcome unsolicited messages."
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
              question: "Is extracting emails from websites legal?",
              answer: "Extracting publicly available information is generally legal, but how you use those emails is regulated. Don't send unsolicited commercial email without proper consent and unsubscribe options."
            },
            {
              question: "Why aren't all emails being detected?",
              answer: "Emails may be obfuscated (images, JavaScript, text substitution), in non-standard formats, or the pattern might not match edge cases. No extractor catches 100% of emails."
            },
            {
              question: "Can this extract emails from PDFs?",
              answer: "Copy the text from the PDF and paste it into this tool. PDFs themselves need to be converted to text first."
            },
            {
              question: "How do I verify extracted emails are real?",
              answer: "Use an email verification service that checks MX records, SMTP responses, and mailbox existence. This tool only validates format, not deliverability."
            },
            {
              question: "What email formats does this recognize?",
              answer: "Standard formats like user@domain.com, user.name@domain.co.uk, user+tag@domain.com. International domains and unusual TLDs are supported."
            },
            {
              question: "Can I extract emails from social media?",
              answer: "If emails are visible in the page content, yes. But most social platforms hide emails behind interfaces that require login, which this tool can't access."
            },
            {
              question: "Should I use extracted emails for marketing?",
              answer: "Only if you have legitimate interest or consent. Cold emailing carries legal risks and reputation damage. Build permission-based lists instead."
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
