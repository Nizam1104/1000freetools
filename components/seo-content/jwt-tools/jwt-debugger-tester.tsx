import React from "react"

export default function JWTDebuggerTesterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How JWT Debugging Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            The debugger performs comprehensive validation on JWT tokens, checking structure, encoding, and claims. It splits the token into three parts and validates each segment independently.
          </p>
          <p>
            For the header and payload, it attempts Base64URL decoding followed by JSON parsing. The tool flags missing required fields, suspicious patterns, and potential security issues.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Validation checks performed:</p>
            <ul className="text-sm space-y-1.5 ml-4 list-disc">
              <li><strong className="text-foreground">Structure</strong> - Exactly 3 dot-separated segments</li>
              <li><strong className="text-foreground">Header validity</strong> - Contains <code className="font-mono text-xs">alg</code> field, valid JSON</li>
              <li><strong className="text-foreground">Payload validity</strong> - Valid JSON, no syntax errors</li>
              <li><strong className="text-foreground">Expiry status</strong> - Compares <code className="font-mono text-xs">exp</code> against current time</li>
              <li><strong className="text-foreground">Not-before check</strong> - Validates <code className="font-mono text-xs">nbf</code> if present</li>
              <li><strong className="text-foreground">Format warnings</strong> - Whitespace, unusual length, empty segments</li>
            </ul>
          </div>
          <p>
            Errors indicate the token is malformed and won't work. Warnings flag potential issues that might cause problems in production (like missing <code className="font-mono text-xs">exp</code> claims).
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Troubleshooting 401 authentication errors</h3>
            <p className="text-sm text-muted-foreground">
              Your API returns "invalid token" but you don't know why. The debugger reveals the token expired 2 hours ago or has a malformed header.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Validating tokens from new auth providers</h3>
            <p className="text-sm text-muted-foreground">
              Integrating Auth0 for the first time? Debug their sample tokens to understand the claim structure before writing parsing code.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing token generation code</h3>
            <p className="text-sm text-muted-foreground">
              You wrote a JWT signing function. Debug the output to catch bugs like missing claims, wrong timestamp formats, or encoding errors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Security code reviews</h3>
            <p className="text-sm text-muted-foreground">
              Reviewing auth code? Debug tokens to verify they include security-critical claims like <code className="font-mono text-xs">exp</code>, <code className="font-mono text-xs">iss</code>, and <code className="font-mono text-xs">aud</code>.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning JWT structure</h3>
            <p className="text-sm text-muted-foreground">
              New to JWTs? Debug various tokens to see how different providers structure headers and what claims they include by default.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Pre-flight token validation</h3>
            <p className="text-sm text-muted-foreground">
              Before sending tokens to your API, debug them locally. Catch formatting issues early instead of debugging network requests.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Debugger doesn't verify signatures.</strong>
              It checks format and claims, not cryptographic validity. A token can pass debugging but still be forged. Always verify signatures in production.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Errors vs. warnings matter.</strong>
              Errors mean the token is broken and won't work. Warnings indicate suboptimal configuration (like missing <code className="font-mono text-xs">exp</code>) that might work but isn't recommended.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Expiry is checked against your system clock.</strong>
              If your computer's clock is wrong, expiry warnings will be inaccurate. Sync your clock or use server-side validation for production.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some warnings are context-dependent.</strong>
              Missing <code className="font-mono text-xs">aud</code> might be fine for single-service apps but dangerous for microservices. Consider your architecture when evaluating warnings.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Security reminder:</strong> Never debug production tokens containing real user data in online tools. Use development tokens or locally-hosted debuggers for sensitive environments.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my token show "missing alg field"?</h3>
            <p className="text-sm text-muted-foreground">
              The header JSON doesn't include an <code className="font-mono text-xs">alg</code> property. This is required by the JWT spec. Check your token generation code—the header should be <code className="font-mono text-xs">{"{ alg: \"HS256\", typ: \"JWT\" }"}</code>.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does "token contains whitespace" mean?</h3>
            <p className="text-sm text-muted-foreground">
              JWTs shouldn't have spaces, newlines, or tabs. Whitespace often gets introduced when copying from logs or emails. Trim the token before using it.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is a warning about missing exp serious?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, for most use cases. Tokens without <code className="font-mono text-xs">exp</code> never expire—a security risk if the token is compromised. Add expiry unless you have a specific reason not to.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does the debugger say "invalid Base64URL"?</h3>
            <p className="text-sm text-muted-foreground">
              The segment uses standard Base64 characters (<code className="font-mono text-xs">+</code>, <code className="font-mono text-xs">/</code>) instead of URL-safe ones (<code className="font-mono text-xs">-</code>, <code className="font-mono text-xs">_</code>). Or padding is incorrect. Regenerate the token with proper Base64URL encoding.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can this debug encrypted JWTs (JWE)?</h3>
            <p className="text-sm text-muted-foreground">
              No. JWE tokens have 5 segments and encrypted payloads. This debugger handles standard JWS tokens (3 segments). JWE requires decryption with the appropriate key first.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">The debugger says my token is valid but my app rejects it. Why?</h3>
            <p className="text-sm text-muted-foreground">
              Format validity ≠ signature validity. The token might be well-formed but signed with the wrong key, or your app expects different claims. Check signature verification and claim validation separately.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
