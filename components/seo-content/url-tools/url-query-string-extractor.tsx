export default function UrlQueryStringExtractorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This tool extracts and parses query string parameters from URLs, making it easy to 
            see what data is being passed and manipulate individual parameters.
          </p>
          <p className="text-muted-foreground">
            The extraction process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">URL parsing:</strong> The tool identifies the query string portion (everything after ?).</li>
            <li><strong className="text-foreground">Parameter splitting:</strong> The query string is split on & characters to separate individual parameters.</li>
            <li><strong className="text-foreground">Key-value extraction:</strong> Each parameter is split on = to separate keys from values.</li>
            <li><strong className="text-foreground">Decoding:</strong> Percent-encoded values are decoded for human-readable display.</li>
          </ol>
          <p className="text-muted-foreground">
            The result is a clean list of all parameters with their keys and values, 
            making it easy to understand what data a URL contains or modify specific parameters.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Debugging Web Applications",
              description: "Inspect query parameters to understand what data your application is receiving."
            },
            {
              title: "Marketing Link Analysis",
              description: "Extract UTM parameters and other tracking data from campaign URLs."
            },
            {
              title: "API Testing",
              description: "View and verify query parameters in API endpoints during development."
            },
            {
              title: "Security Auditing",
              description: "Identify sensitive data being passed in URLs that should use POST instead."
            },
            {
              title: "URL Modification",
              description: "Extract parameters, modify values, and rebuild URLs for testing different scenarios."
            },
            {
              title: "Log Analysis",
              description: "Parse query strings from server logs to understand user behavior and traffic patterns."
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
              caveat: "Query strings are visible and logged",
              explanation: "Unlike POST data, query parameters appear in browser history, server logs, and referrer headers. Never pass passwords or sensitive data in query strings."
            },
            {
              caveat: "Parameter order doesn't matter",
              explanation: "?a=1&b=2 is the same as ?b=2&a=1. Some tools may reorder parameters, but the meaning remains the same."
            },
            {
              caveat: "Duplicate keys have special handling",
              explanation: "URLs can have ?tag=a&tag=b. Different systems handle this differently - arrays, last-wins, or first-wins."
            },
            {
              caveat: "Empty values are valid",
              explanation: "?flag= means the parameter exists but has no value. This is different from the parameter being absent."
            },
            {
              caveat: "Fragment identifiers aren't query parameters",
              explanation: "Everything after # is the fragment/hash, not part of the query string. It's handled separately by browsers."
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
              question: "What's the difference between query string and path parameters?",
              answer: "Query strings come after ? (example.com/search?q=term). Path parameters are part of the URL path (example.com/search/term). Query strings are optional; path params are required for the route."
            },
            {
              question: "How do I pass arrays in query strings?",
              answer: "Common conventions include: ?tags[]=a&tags[]=b (PHP style), ?tags=a,b (comma-separated), or ?tags=a&tags=b (repeated keys). The convention depends on your backend."
            },
            {
              question: "Is there a limit to query string length?",
              answer: "Technically no HTTP spec limit, but browsers and servers impose limits. IE has ~2000 character limits. Apache defaults to 8190 bytes. Keep query strings under 2000 characters for compatibility."
            },
            {
              question: "Why are some values encoded and others not?",
              answer: "Special characters (spaces, &, =, etc.) must be encoded. Alphanumerics and some symbols (-_.~) don't need encoding. The tool decodes everything for readability."
            },
            {
              question: "Can query strings affect SEO?",
              answer: "Yes, excessive parameters can create duplicate content issues. Use canonical tags, parameter handling in Search Console, or rewrite URLs to avoid SEO problems."
            },
            {
              question: "How do I remove query parameters from a URL?",
              answer: "Simply remove everything from ? onwards. Or use this tool to extract the base URL without the query string portion."
            },
            {
              question: "What about query parameters in POST requests?",
              answer: "POST requests can have both query parameters (in the URL) and body data. They're separate - query params are for routing/filtering, body data is the main payload."
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
