import React from "react"

export default function JWTTokenStorageViewerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How JWT Storage Analysis Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            The storage viewer examines where and how JWTs persist in your application. It parses tokens from common storage locations: localStorage, sessionStorage, cookies, and IndexedDB entries.
          </p>
          <p>
            For each stored token, the tool extracts metadata without exposing the actual token value. You see storage type, key name, token size, creation time (if available), and expiry status.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Storage locations checked:</p>
            <ul className="text-sm space-y-1.5 ml-4 list-disc">
              <li><strong className="text-foreground">localStorage</strong> - Persistent key-value store (survives browser restart)</li>
              <li><strong className="text-foreground">sessionStorage</strong> - Tab-scoped storage (cleared when tab closes)</li>
              <li><strong className="text-foreground">Cookies</strong> - HTTP cookies with domain/path restrictions</li>
              <li><strong className="text-foreground">IndexedDB</strong> - Structured data storage for larger datasets</li>
            </ul>
          </div>
          <p>
            The viewer also flags security concerns: tokens in localStorage (XSS vulnerable), cookies without HttpOnly flag, or tokens stored past their expiry time.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Security audit of your application</h3>
            <p className="text-sm text-muted-foreground">
              You're reviewing your app's authentication implementation. The viewer shows all stored JWTs and highlights that tokens are in localStorage instead of secure cookies.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging stale session issues</h3>
            <p className="text-sm text-muted-foreground">
              Users report being logged in after password changes. You discover expired tokens lingering in localStorage that the app still tries to use.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cleaning up after development</h3>
            <p className="text-sm text-muted-foreground">
              Your dev environment has dozens of test tokens scattered across storage. The viewer lists them all so you can purge outdated credentials.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Comparing storage strategies</h3>
            <p className="text-sm text-muted-foreground">
              Evaluating localStorage vs. cookies for token storage? The viewer shows exactly what gets stored where, helping you understand the tradeoffs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Investigating token duplication</h3>
            <p className="text-sm text-muted-foreground">
              Your app stores tokens under multiple keys ("auth_token", "jwt", "user_token"). The viewer reveals the duplication, explaining increased storage usage.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Teaching web security concepts</h3>
            <p className="text-sm text-muted-foreground">
              Demonstrating XSS risks to junior developers? Show them how easily tokens in localStorage can be extracted with a simple console command.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Browser-based only.</strong>
              The tool runs in your browser's JavaScript context. It can only see storage for the current origin (domain). Cross-origin tokens remain invisible.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">HttpOnly cookies are hidden.</strong>
              Cookies marked HttpOnly cannot be read by JavaScript. The viewer can detect their existence but not inspect their contents.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Doesn't modify storage.</strong>
              The viewer is read-only. It shows what's stored but doesn't delete or modify anything. Use browser dev tools to actually clear tokens.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Token values are partially hidden.</strong>
              For security, the viewer shows token metadata (size, expiry) but masks the actual token value to prevent accidental exposure.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Security note:</strong> If the viewer shows tokens in localStorage, consider migrating to HttpOnly cookies. localStorage is vulnerable to XSS attacks—any script can read it.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why can't I see tokens in HttpOnly cookies?</h3>
            <p className="text-sm text-muted-foreground">
              HttpOnly is a security flag that prevents JavaScript access. This protects cookies from XSS attacks. The browser itself sends them with requests, but scripts can't read them.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I delete tokens the viewer finds?</h3>
            <p className="text-sm text-muted-foreground">
              Open browser dev tools (F12). For localStorage/sessionStorage: Application → Storage → Clear. For cookies: Application → Cookies → Delete specific cookies.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can this tool see tokens from other websites?</h3>
            <p className="text-sm text-muted-foreground">
              No. Same-origin policy prevents JavaScript from accessing storage belonging to other domains. You can only see tokens for the site you're currently on.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does "token size" tell me?</h3>
            <p className="text-sm text-muted-foreground">
              JWT size correlates with payload content. Typical tokens are 200-400 characters. Larger tokens (>1KB) may contain excessive claims that should be moved to your database.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why are there multiple tokens stored?</h3>
            <p className="text-sm text-muted-foreground">
              Apps often store access tokens and refresh tokens separately. Some also keep a decoded copy for quick access. Multiple tokens aren't necessarily a problem.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is it safe to run this on production?</h3>
            <p className="text-sm text-muted-foreground">
              The viewer is read-only and runs client-side. However, it displays token metadata that could reveal implementation details. Use in staging when possible.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
