import React from "react"

export default function JavascriptUrlParserSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the JavaScript URL Parser Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste any URL into the input field and click Parse. The tool breaks it down into its component parts: protocol, hostname, port, pathname, query parameters, and hash fragment.
          </p>
          <p>
            Query parameters are extracted into a editable list. Add new parameters, modify existing ones, or remove them entirely. The URL builder reconstructs the full URL from your changes.
          </p>
          <p>
            All parsing uses the browser's native URL API, ensuring accurate results that match JavaScript's behavior. The built URL is ready to copy and use in your applications.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging API endpoints</h3>
            <p className="text-sm text-muted-foreground">
              Your API call isn't working. Parse the URL to verify the path, query parameters, and port are correct. Spot typos in parameter names instantly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building dynamic URLs</h3>
            <p className="text-sm text-muted-foreground">
              Construct URLs with multiple query parameters without manual string concatenation. Add parameters one by one and see the result build in real-time.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing tracking URLs</h3>
            <p className="text-sm text-muted-foreground">
              Marketing URLs have UTM parameters galore. Parse them to understand campaign tracking. See exactly what data is being passed to analytics.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning URL structure</h3>
            <p className="text-sm text-muted-foreground">
              New developers can visualize URL components. Understand the difference between pathname and query string. See how fragments work separately.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cleaning up messy URLs</h3>
            <p className="text-sm text-muted-foreground">
              Received a URL with dozens of tracking parameters? Parse it, remove unwanted params, and rebuild a clean version. Share cleaner links.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing redirect chains</h3>
            <p className="text-sm text-muted-foreground">
              Parse URLs at each redirect step. Compare parameters between redirects. Debug why certain query strings get lost in the chain.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">URLs must be absolute with protocol.</strong>
              Include http:// or https://. Relative URLs like "/path/to/page" won't parse correctly. The parser needs a complete URL structure.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Query values are automatically encoded.</strong>
              Special characters get URL-encoded when building. Spaces become %20, ampersands become %26. This ensures valid URLs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Duplicate parameters are preserved.</strong>
              URLs can have multiple params with the same name. The tool maintains all of them. Some APIs rely on this behavior.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Hash fragments are separate from query strings.</strong>
              Everything after # is the hash. It's not sent to servers - it's client-side only. Query params come before the hash.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For programmatic URL manipulation, use the URLSearchParams API in your code. This tool is perfect for visual debugging and one-off URL construction.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it handle URL-encoded values?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, encoded values are decoded when parsing. When building, values are re-encoded. The display shows human-readable versions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I parse URLs with authentication?</h3>
            <p className="text-sm text-muted-foreground">
              URLs with user:pass@host are parsed, but credentials are shown. Be careful not to share URLs containing sensitive authentication data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about IPv6 addresses?</h3>
            <p className="text-sm text-muted-foreground">
              IPv6 URLs like http://[::1]:8080/path are supported. The brackets are part of the standard IPv6 URL format and are handled correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it validate URLs?</h3>
            <p className="text-sm text-muted-foreground">
              The parser validates syntax. Invalid URLs show an error. But it doesn't check if the URL actually exists or is reachable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I parse relative URLs?</h3>
            <p className="text-sm text-muted-foreground">
              Not directly. Add a base URL first. The tool needs a complete URL with protocol to parse correctly using browser APIs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are fragments sent to servers?</h3>
            <p className="text-sm text-muted-foreground">
              No, hash fragments are client-side only. Servers never see them. They're used for in-page navigation and single-page app routing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between origin and hostname?</h3>
            <p className="text-sm text-muted-foreground">
              Origin includes protocol + hostname + port (https://example.com:8080). Hostname is just the domain (example.com). Origin is useful for CORS.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
