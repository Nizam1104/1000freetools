export default function UrlRegexValidatorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This URL validator checks if strings match valid URL formats, ensuring web 
            addresses are properly structured before use.
          </p>
          <p className="text-muted-foreground">
            The validation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Protocol check:</strong> Verifies the URL starts with a valid protocol (http, https, ftp, etc.).</li>
            <li><strong className="text-foreground">Domain validation:</strong> Checks that the domain name follows valid naming conventions.</li>
            <li><strong className="text-foreground">Structure verification:</strong> Validates the overall URL structure including optional port, path, query, and fragment.</li>
            <li><strong className="text-foreground">Component extraction:</strong> Parses and displays individual URL components for verification.</li>
          </ol>
          <p className="text-muted-foreground">
            URL validation is essential for forms, link management, web scraping, 
            and any application that processes user-provided web addresses.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Form Input Validation",
              description: "Validate website and social media URL inputs in user profiles and forms."
            },
            {
              title: "Link Management Systems",
              description: "Verify URLs before storing in link databases or bookmarking services."
            },
            {
              title: "Content Moderation",
              description: "Screen user-submitted links for valid format before allowing publication."
            },
            {
              title: "Web Scraping",
              description: "Validate extracted URLs before making requests to avoid errors."
            },
            {
              title: "API Development",
              description: "Validate URL parameters and webhook endpoints in API implementations."
            },
            {
              title: "Data Cleaning",
              description: "Standardize and validate URL data in databases and spreadsheets."
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
              caveat: "Valid format doesn't mean the URL works",
              explanation: "Validation checks structure only, not whether the URL actually exists or is accessible. That requires an HTTP request."
            },
            {
              caveat: "Protocol-relative URLs are valid",
              explanation: "//example.com is a valid protocol-relative URL. It inherits the protocol from the current page."
            },
            {
              caveat: "International domains need special handling",
              explanation: "Non-ASCII domains use Punycode (xn--). Both forms are valid but look different."
            },
            {
              caveat: "Some valid URLs may be rejected",
              explanation: "Extremely permissive regex may accept invalid URLs. Strict regex may reject valid edge cases. Choose appropriate strictness."
            },
            {
              caveat: "URL encoding affects validation",
              explanation: "Special characters should be percent-encoded. Both encoded and decoded forms may be valid depending on context."
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
              question: "What's a valid URL pattern?",
              answer: "Basic: /^https?:\\/\\/.+/. Comprehensive patterns check domain format, optional port, path, query string, and fragment."
            },
            {
              question: "Do URLs need http://?",
              answer: "Technically yes for full URLs. Many systems accept 'example.com' and add the protocol automatically. For validation, require explicit protocol."
            },
            {
              question: "What about localhost URLs?",
              answer: "http://localhost and http://127.0.0.1 are valid URLs for local development. Include these in validation if needed."
            },
            {
              question: "Are IP addresses valid in URLs?",
              answer: "Yes, http://192.168.1.1 is a valid URL. IP-based URLs are common for local networks and some services."
            },
            {
              question: "What's the maximum URL length?",
              answer: "No official limit, but practical limits exist. IE supports ~2000 chars, Google crawls ~2000. Keep URLs under 2000 characters."
            },
            {
              question: "How do I validate URLs without protocol?",
              answer: "Add 'http://' temporarily for validation, or use a pattern that makes protocol optional: /^(https?:\\/\\/)?.+/"
            },
            {
              question: "What about mailto: and tel: URLs?",
              answer: "These are valid URI schemes but not HTTP URLs. Use separate validation for different URI schemes based on your needs."
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
