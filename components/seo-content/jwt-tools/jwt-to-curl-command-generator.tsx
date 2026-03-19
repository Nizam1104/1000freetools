import React from "react"

export default function JwtToCurlCommandGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the JWT to cURL Command Generator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool generates ready-to-use cURL commands for testing JWT-protected APIs. Paste your JWT token, configure the HTTP method and endpoint, and get a properly formatted cURL command with the Authorization header set correctly.
          </p>
          <p>
            JWT authentication uses the Bearer token scheme: <code>Authorization: Bearer &lt;your-jwt-token&gt;</code>. The generator formats this header correctly, handles special characters in the token, and creates commands that work in bash, PowerShell, or Windows CMD.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Generated command formats:</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li><strong>cURL:</strong> Standard command-line HTTP client</li>
              <li><strong>Node.js (Axios):</strong> JavaScript code using Axios library</li>
              <li><strong>Python (requests):</strong> Python code using requests library</li>
              <li><strong>HTTPie:</strong> Alternative HTTP client with simpler syntax</li>
              <li><strong>PowerShell:</strong> Invoke-WebRequest for Windows</li>
            </ul>
          </div>
          <p>
            Configure the HTTP method (GET, POST, PUT, DELETE), set Content-Type headers, add request bodies for POST/PUT requests, and the generator creates complete, executable commands for API testing.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing protected API endpoints</h3>
            <p className="text-sm text-muted-foreground">
              You have a JWT from your login endpoint. Need to test the /api/users endpoint? Generate a cURL command, paste into terminal, verify the API responds correctly before integrating into your app.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging authentication issues</h3>
            <p className="text-sm text-muted-foreground">
              API returns 401 Unauthorized but you're not sure why. Generate a cURL command with your JWT, run it manually. If cURL works but your app doesn't, the issue is in your app's code, not the token.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Documenting API examples</h3>
            <p className="text-sm text-muted-foreground">
              Writing API documentation? Include cURL examples showing how to authenticate. Generate commands with sample tokens, replace the token with <code>&lt;YOUR_JWT&gt;</code> placeholder in docs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sharing reproducible test cases</h3>
            <p className="text-sm text-muted-foreground">
              Reporting a bug to an API provider? Include a cURL command that reproduces the issue. They can run it immediately without setting up your entire application environment.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating Postman/Insomnia imports</h3>
            <p className="text-sm text-muted-foreground">
              cURL commands import directly into Postman and Insomnia. Generate the command, import it, then save as a collection. Faster than manually configuring each request.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Automating API tests in scripts</h3>
            <p className="text-sm text-muted-foreground">
              Building a bash script to test your API? Generate cURL commands, paste into your script. Add assertions on the response to create automated integration tests.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">JWTs expire.</strong>
              Most JWTs have an <code>exp</code> claim with an expiration timestamp. A generated cURL command might work now but fail in an hour when the token expires. Generate fresh tokens for testing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Never share production tokens.</strong>
              The generated cURL command contains your full JWT. Don't paste it into public forums, commit it to git, or share it with untrusted parties. Use test environment tokens for examples.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Special characters need escaping.</strong>
              JWTs contain dots and sometimes other special characters. The generator handles shell escaping correctly. Don't manually edit the generated command without understanding shell quoting rules.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Different shells handle quotes differently.</strong>
              Bash, PowerShell, and Windows CMD have different quoting rules. The generator provides shell-specific commands. Use the version matching your terminal environment.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For repeated testing, store your JWT in an environment variable: <code>export TOKEN="your.jwt.here"</code> then use <code>$TOKEN</code> in cURL commands. Easier to update when tokens expire.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my cURL command return 401?</h3>
            <p className="text-sm text-muted-foreground">
              Common causes: expired token, wrong token format (missing "Bearer " prefix), token for wrong audience/issuer, or the API expects a different authentication method. Verify the token is valid and not expired.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I get a JWT token to test with?</h3>
            <p className="text-sm text-muted-foreground">
              Typically from a login endpoint: POST to /auth/login with credentials, receive JWT in response. Or check your application's developer tools Network tab after logging in - the token is in API request headers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for OAuth access tokens?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, OAuth access tokens (even non-JWT tokens) use the same Bearer authentication scheme. Paste any access token, and the generator creates the correct Authorization header format.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I send a POST request with JSON body?</h3>
            <p className="text-sm text-muted-foreground">
              Select POST method, set Content-Type to application/json, and enter your JSON body. The generator adds the appropriate headers and data flags to the cURL command.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if my API uses a custom header instead of Authorization?</h3>
            <p className="text-sm text-muted-foreground">
              Some APIs use custom auth headers like <code>X-API-Token</code>. Manually edit the generated cURL command, replacing <code>-H "Authorization: Bearer..."</code> with your API's required header format.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I save these commands for later use?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, save cURL commands in a text file or shell script. But remember tokens expire - you'll need to update the token value periodically. Consider using environment variables for the token portion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is it safe to use JWT in cURL commands?</h3>
            <p className="text-sm text-muted-foreground">
              For testing with development/staging tokens, yes. Never use production tokens in commands you might log, share, or commit. Shell history may store commands - clear it or use environment variables for sensitive tokens.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
