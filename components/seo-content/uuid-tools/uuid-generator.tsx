export default function UuidGeneratorSEO() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How the UUID Generator Works</h2>
        <p className="text-muted-foreground">
          This tool generates UUID version 4 (random) identifiers using your browser's built-in cryptographic random number generator. No data leaves your device.
        </p>
        <p className="text-muted-foreground">
          The generator uses the Web Crypto API's <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">crypto.randomUUID()</code> when available. For older browsers, it falls back to generating 16 random bytes and manually setting the version 4 and RFC 4122 variant bits.
        </p>
        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="text-sm font-medium mb-2">Generated UUID format:</p>
          <code className="text-xs bg-muted px-3 py-2 rounded block font-mono break-all">
            xxxxxxxx-xxxx-4xxx-Nxxx-xxxxxxxxxxxx
          </code>
          <p className="text-xs text-muted-foreground mt-2">
            The "4" indicates version 4 (random). N must be 8, 9, A, or B for RFC 4122 compliance.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Real Use Cases</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Database record IDs</p>
            <p className="text-sm text-muted-foreground">
              A backend developer needs unique primary keys for a distributed database where auto-increment won't work across multiple nodes.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Session tokens</p>
            <p className="text-sm text-muted-foreground">
              Generating anonymous session identifiers for users who haven't logged in yet, avoiding any PII in the token itself.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">File upload tracking</p>
            <p className="text-sm text-muted-foreground">
              A frontend app assigns each file upload a UUID before sending, letting users track progress without exposing server internals.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Test data generation</p>
            <p className="text-sm text-muted-foreground">
              QA engineers need realistic unique identifiers when populating staging environments with mock user accounts or orders.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">API request correlation</p>
            <p className="text-sm text-muted-foreground">
              Adding a UUID to each incoming request so logs across multiple microservices can be traced back to a single user action.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Offline-first app sync</p>
            <p className="text-sm text-muted-foreground">
              Mobile apps generate UUIDs locally for new records, avoiding conflicts when syncing back to the central database later.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What to Know Before Using</h2>
        <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Browser support:</strong> Requires a modern browser with Web Crypto API support (Chrome 37+, Firefox 34+, Safari 11+, Edge 79+). Older browsers will still work but use a JavaScript fallback.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Collision probability:</strong> With UUID v4, you'd need to generate about 2.71 quintillion UUIDs to have a 1 in a billion chance of a single collision. For practical purposes, they're unique.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Not cryptographically secure for secrets:</strong> While UUIDs use random bytes, they're not meant to be used as API keys or passwords. The structure is predictable (version and variant bits are fixed).
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Batch generation:</strong> You can generate up to 1000 UUIDs at once. Each is independent and equally random.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-base font-semibold">What is a UUID?</h3>
            <p className="text-sm text-muted-foreground">
              A UUID (Universally Unique Identifier) is a 128-bit number used to uniquely identify information. It's typically displayed as 32 hexadecimal digits in 5 groups separated by hyphens, like <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">550e8400-e29b-41d4-a716-446655440000</code>.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">What's the difference between UUID and GUID?</h3>
            <p className="text-sm text-muted-foreground">
              They're the same thing. GUID (Globally Unique Identifier) is Microsoft's term for UUID. The only practical difference is formatting: GUIDs are often uppercase with curly braces like <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">{"{550E8400-E29B-41D4-A716-446655440000}"}</code>, while UUIDs are lowercase without braces.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">What does UUID version 4 mean?</h3>
            <p className="text-sm text-muted-foreground">
              Version 4 means the UUID is generated from random numbers. Other versions exist: v1 uses timestamp and MAC address, v3 and v5 are name-based (using MD5 or SHA-1 hashes), and v2 is DCE Security. Version 4 is the most common for general use.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">Can I use UUIDs as primary keys in my database?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, UUIDs work well as primary keys, especially in distributed systems. They're 128 bits (16 bytes), so larger than typical integer keys. Consider using <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">CHAR(36)</code> or <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">BINARY(16)</code> storage. PostgreSQL has a native UUID type.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">Are UUIDs URL-safe?</h3>
            <p className="text-sm text-muted-foreground">
              Standard UUIDs contain hyphens, which are valid in URLs but sometimes need encoding. If you need URL-safe identifiers, consider removing hyphens (32 characters) or using base64url encoding. The hyphen-free format is still a valid UUID representation.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">How do I validate a UUID?</h3>
            <p className="text-sm text-muted-foreground">
              A valid RFC 4122 UUID matches this pattern: 8-4-4-4-12 hexadecimal digits. The version digit (13th character) should be 1-5, and the variant digit (17th character) should be 8, 9, A, or B for standard UUIDs. Use our UUID Validator tool to check specific values.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
