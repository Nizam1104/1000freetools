import React from "react"

export default function JWTTokenBuilderTemplatesSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Building JWTs with Pre-Made Templates</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            The template builder provides starting points for common JWT scenarios. Instead of manually typing claims like <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">iss</code>, <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">sub</code>, and <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">aud</code>, you select a template and customize the values.
          </p>
          <p>
            Each template pre-fills standard claims with sensible defaults. The OAuth template includes <code className="font-mono text-xs">scope</code> and <code className="font-mono text-xs">azp</code> claims. The microservice template adds <code className="font-mono text-xs">roles</code> arrays and <code className="font-mono text-xs">tenant_id</code> for multi-tenant architectures.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Available templates:</p>
            <ul className="text-sm space-y-1.5 ml-4 list-disc">
              <li><strong className="text-foreground">Basic auth</strong> - Simple user authentication with issuer, subject, audience, expiry</li>
              <li><strong className="text-foreground">OAuth 2.0</strong> - Includes scope, authorized party (azp), and OAuth-specific claims</li>
              <li><strong className="text-foreground">API gateway</strong> - Service-to-service tokens with permissions arrays and rate limits</li>
              <li><strong className="text-foreground">Microservice</strong> - Multi-tenant setups with roles, tenant IDs, and active flags</li>
            </ul>
          </div>
          <p>
            After selecting a template, you can add custom claims with typed values (string, number, boolean, array). The builder validates JSON syntax for array claims before generating the final token.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When Templates Save You Time</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Setting up a new authentication system</h3>
            <p className="text-sm text-muted-foreground">
              You're implementing JWT auth from scratch. The basic template gives you the standard claims structure, so you don't have to look up what each claim name means.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating service account tokens</h3>
            <p className="text-sm text-muted-foreground">
              Your microservices need to authenticate with each other. The API template includes permissions arrays and rate limit claims that match your service mesh requirements.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing OAuth integrations</h3>
            <p className="text-sm text-muted-foreground">
              Before connecting to the real OAuth provider, you generate test tokens with the OAuth template. Your code can parse and validate them without hitting the actual auth server.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Documenting expected token structure</h3>
            <p className="text-sm text-muted-foreground">
              Your API docs need example JWTs. Generate tokens from templates to show developers exactly what claims they'll receive and what format each claim uses.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Onboarding new team members</h3>
            <p className="text-sm text-muted-foreground">
              Junior developers learning JWTs can experiment with templates to see how different claims affect token structure. It's faster than reading the RFC spec.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Prototyping multi-tenant features</h3>
            <p className="text-sm text-muted-foreground">
              You're adding tenant isolation. The microservice template includes <code className="font-mono text-xs">tenant_id</code> claims, letting you quickly test how your code handles tenant-scoped data.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Templates generate unsigned tokens.</strong>
              The builder creates the payload structure but doesn't sign tokens with a secret key. Use these for testing and documentation, not production authentication.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Custom claims are your responsibility.</strong>
              Templates include common claims, but your application may need additional ones. Add custom claims carefully—every claim increases token size.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Array claims require valid JSON.</strong>
              When adding array-type claims, enter valid JSON syntax: <code className="font-mono text-xs">["read", "write"]</code> not <code className="font-mono text-xs">[read, write]</code>. The builder validates before generating.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Expiry times are in seconds.</strong>
              The <code className="font-mono text-xs">exp</code> claim uses Unix timestamps. Templates show relative expiry (3600 = 1 hour), but actual tokens get absolute timestamps.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Important:</strong> Never use template-generated tokens in production without proper signing. Unsigned tokens provide zero security—anyone can modify the payload.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between iss and sub?</h3>
            <p className="text-sm text-muted-foreground">
              <code className="font-mono text-xs">iss</code> (issuer) identifies who created the token (e.g., "auth.example.com"). <code className="font-mono text-xs">sub</code> (subject) identifies the principal (user ID, email, or service account name).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When should I use the aud claim?</h3>
            <p className="text-sm text-muted-foreground">
              Always, if your tokens might be used by multiple services. <code className="font-mono text-xs">aud</code> (audience) prevents token confusion attacks where a token meant for Service A is used with Service B.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How long should JWTs be valid?</h3>
            <p className="text-sm text-muted-foreground">
              Short-lived access tokens: 15 minutes to 1 hour. Long-lived refresh tokens: 7-30 days. The template defaults to 3600 seconds (1 hour) as a reasonable starting point.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add nested objects as claims?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, JWT payloads support any valid JSON. However, keep claims flat when possible. Deep nesting increases parsing complexity and token size.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the maximum JWT size?</h3>
            <p className="text-sm text-muted-foreground">
              HTTP headers typically limit to 8-16KB. Aim for tokens under 4KB to leave room for other headers. If your token exceeds this, move data to your database and use the token as a reference.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do I need all the standard claims?</h3>
            <p className="text-sm text-muted-foreground">
              Only <code className="font-mono text-xs">sub</code> is technically required by the JWT spec. However, <code className="font-mono text-xs">iss</code>, <code className="font-mono text-xs">exp</code>, and <code className="font-mono text-xs">iat</code> are strongly recommended for security. <code className="font-mono text-xs">aud</code> is critical for multi-service architectures.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
