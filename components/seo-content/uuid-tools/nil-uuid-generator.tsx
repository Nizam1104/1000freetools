export default function NilUuidGeneratorSEO() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How the Nil UUID Generator Works</h2>
        <p className="text-muted-foreground">
          This tool generates special-purpose UUIDs: the Nil UUID (all zeros), the Max UUID (all F's), and custom pattern UUIDs for testing scenarios. These aren't standard RFC 4122 UUIDs but are useful placeholders and sentinel values.
        </p>
        <p className="text-muted-foreground">
          The Nil UUID (<code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">00000000-0000-0000-0000-000000000000</code>) is defined in RFC 4122 as a special value representing "no UUID." The Max UUID is sometimes used as a sentinel or boundary marker. Custom patterns let you create predictable UUIDs for testing.
        </p>
        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="text-sm font-medium mb-2">Special UUID values:</p>
          <div className="space-y-2 text-sm">
            <div className="bg-muted p-3 rounded">
              <p className="font-medium">Nil UUID</p>
              <code className="text-xs font-mono">00000000-0000-0000-0000-000000000000</code>
              <p className="text-xs text-muted-foreground mt-1">Represents absence of a UUID, used for default/null values</p>
            </div>
            <div className="bg-muted p-3 rounded">
              <p className="font-medium">Max UUID</p>
              <code className="text-xs font-mono">ffffffff-ffff-ffff-ffff-ffffffffffff</code>
              <p className="text-xs text-muted-foreground mt-1">Sometimes used as a sentinel or upper boundary value</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Real Use Cases</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Default parameter values</p>
            <p className="text-sm text-muted-foreground">
              A developer needs a sentinel value to represent "no UUID provided" in function parameters, distinct from null or undefined.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Database default constraints</p>
            <p className="text-sm text-muted-foreground">
              Setting a default UUID value for a column where NULL isn't allowed but you need to distinguish uninitialized records.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Unit test fixtures</p>
            <p className="text-sm text-muted-foreground">
              Writing tests that need predictable UUID values. Using the Nil UUID or a custom pattern makes test output reproducible and readable.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">API mocking</p>
            <p className="text-sm text-muted-foreground">
              Creating mock API responses with valid-looking UUIDs that are clearly test data, not production identifiers.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Placeholder in templates</p>
            <p className="text-sm text-muted-foreground">
              A template system needs a UUID placeholder that will be replaced later. The Nil UUID signals "to be generated" clearly.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Boundary testing</p>
            <p className="text-sm text-muted-foreground">
              Testing UUID comparison logic by using the lexicographically smallest (Nil) and largest (Max) possible values.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What to Know Before Using</h2>
        <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Not RFC 4122 compliant:</strong> The Nil UUID is defined in RFC 4122 as a special case, but custom pattern UUIDs don't have valid version or variant bits. Don't use them in production systems that validate UUID structure.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Nil UUID purpose:</strong> The Nil UUID (<code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">00000000-0000-0000-0000-000000000000</code>) is reserved by RFC 4122 to represent "no such UUID." It's useful as a default value but shouldn't be used as an actual identifier.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Custom patterns for testing only:</strong> Pattern UUIDs like <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">deadbeef-dead-beef-dead-beefdeadbeef</code> are memorable for debugging but lack proper version/variant bits. Use only in test environments.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Padding behavior:</strong> If you enter a custom pattern shorter than 32 hex characters, it's padded with zeros. Longer patterns are truncated. This ensures valid 128-bit output.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-base font-semibold">What is a Nil UUID used for?</h3>
            <p className="text-sm text-muted-foreground">
              The Nil UUID represents the absence of a UUID value. It's used as a default or placeholder when a UUID field is required but no actual identifier exists yet. Think of it like zero for numbers—it's a valid value that means "nothing here."
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">Is the Nil UUID valid according to RFC 4122?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, RFC 4122 Section 4.1.7 explicitly defines the Nil UUID as a special case. It's the only all-zero UUID that's considered valid. However, it should never be used as an actual identifier—only as a sentinel value.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">Can I use custom pattern UUIDs in production?</h3>
            <p className="text-sm text-muted-foreground">
              No. Custom patterns like <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">deadbeef-...</code> don't have valid version or variant bits. Some UUID libraries will reject them. Use only for testing, mocking, or debugging where you control both ends of the system.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">What's the Max UUID for?</h3>
            <p className="text-sm text-muted-foreground">
              The Max UUID (all F's) is sometimes used as a sentinel value representing the upper bound of the UUID space. It's useful for testing comparison logic or as a marker for "end of list" in sorted UUID sequences.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">Why would I need a predictable UUID?</h3>
            <p className="text-sm text-muted-foreground">
              Predictable UUIDs are essential for testing. If your tests use random UUIDs, debugging failures is harder because IDs change every run. Pattern UUIDs like <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">12345678-1234-1234-1234-123456789abc</code> make test output consistent and readable.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">Will databases accept Nil UUIDs?</h3>
            <p className="text-sm text-muted-foreground">
              Most databases will accept the Nil UUID as a valid value since it's proper hexadecimal format. However, whether you should store it depends on your schema design. Consider using NULL instead if your database allows it.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
