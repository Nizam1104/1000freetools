export default function UrlParserSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This URL parser breaks down any web address into its component parts, helping you 
            understand the structure and extract specific elements like domain, path, or query parameters.
          </p>
          <p className="text-muted-foreground">
            The parsing process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">URL normalization:</strong> Adds missing protocol (https://) if not specified.</li>
            <li><strong className="text-foreground">Component extraction:</strong> Uses standard URL parsing to identify each part according to RFC 3986.</li>
            <li><strong className="text-foreground">Structured display:</strong> Shows each component (protocol, hostname, port, path, query, hash) separately.</li>
            <li><strong className="text-foreground">Copy functionality:</strong> Each component can be individually copied for use elsewhere.</li>
          </ol>
          <p className="text-muted-foreground">
            Understanding URL structure is essential for web development, SEO, security analysis, 
            and troubleshooting web applications.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Web Development",
              description: "Understand URL structure when building routing, handling parameters, or debugging web applications."
            },
            {
              title: "SEO Analysis",
              description: "Analyze URL structure for SEO best practices - clean paths, proper parameters, and canonical forms."
            },
            {
              title: "Security Auditing",
              description: "Identify suspicious URL components, unexpected parameters, or potential injection points."
            },
            {
              title: "API Integration",
              description: "Parse API endpoint URLs to extract base URLs, paths, and query parameters for integration."
            },
            {
              title: "Data Extraction",
              description: "Extract domains from lists of URLs for deduplication, categorization, or analysis."
            },
            {
              title: "Learning Web Technologies",
              description: "Understand how URLs are structured and what each component means for web functionality."
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
              caveat: "Protocol defaults affect parsing",
              explanation: "URLs without explicit protocol may be parsed differently. This tool assumes https:// for protocol-less URLs."
            },
            {
              caveat: "Port numbers are often implicit",
              explanation: "Standard ports (80 for HTTP, 443 for HTTPS) aren't shown in URLs but are part of the connection. The parser shows explicit ports only."
            },
            {
              caveat: "Query parameters have special encoding",
              explanation: "Special characters in query strings are percent-encoded. The parser shows the encoded form; use a decoder for readable values."
            },
            {
              caveat: "Fragment identifiers aren't sent to servers",
              explanation: "The hash/fragment (#section) is client-side only. Servers never see this part - it's for browser navigation."
            },
            {
              caveat: "International domains need special handling",
              explanation: "Non-ASCII domains use Punycode encoding (xn--). The parser may show the encoded form depending on implementation."
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
              question: "What are the main parts of a URL?",
              answer: "Protocol (https://), hostname (www.example.com), port (:8080), path (/page/subpage), query (?param=value), and fragment (#section). Not all parts are required."
            },
            {
              question: "What's the difference between hostname and origin?",
              answer: "Hostname is just the domain (example.com). Origin includes protocol + hostname + port (https://example.com:443). Origin is important for security (CORS, same-origin policy)."
            },
            {
              question: "Why does the path start with a slash?",
              answer: "The leading slash indicates an absolute path from the domain root. Paths without leading slash would be relative to the current location."
            },
            {
              question: "Can a URL have multiple query parameters?",
              answer: "Yes, separated by & ampersands: ?first=1&second=2. Order doesn't matter semantically, but some applications may expect specific ordering."
            },
            {
              question: "What's a valid port number?",
              answer: "Ports range from 1-65535. Ports 1-1023 are \"well-known\" (80=HTTP, 443=HTTPS, 22=SSH). Web apps typically use 80, 443, or high ports like 3000, 8080."
            },
            {
              question: "Are URLs case-sensitive?",
              answer: "The path portion is case-sensitive on most servers (Linux). Domain names are case-insensitive. Query parameters depend on the application. Best practice: lowercase everything."
            },
            {
              question: "What's the maximum URL length?",
              answer: "No official HTTP limit, but browsers vary. IE has ~2000 character limits. Google crawls up to ~2000. Keep URLs under 2000 characters for maximum compatibility."
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
