export default function UuidValidatorSEO() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How the UUID Validator Works</h2>
        <p className="text-muted-foreground">
          This validator checks if your input matches the RFC 4122 UUID format using a regular expression pattern. It extracts the version and variant bits from their fixed positions within the UUID structure.
        </p>
        <p className="text-muted-foreground">
          The validation happens entirely in your browser. The tool parses the 128-bit value, identifies which bits represent the version (bits 48-51) and variant (bits 64-67), then displays human-readable information about what those bits mean.
        </p>
        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="text-sm font-medium mb-2">UUID structure breakdown:</p>
          <code className="text-xs bg-muted px-3 py-2 rounded block font-mono break-all">
            xxxxxxxx-xxxx-Vxxx-Nxxx-xxxxxxxxxxxx
          </code>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-muted-foreground">V = Version (bits 48-51): </span>
              <span className="font-medium">1-5</span>
            </div>
            <div>
              <span className="text-muted-foreground">N = Variant (bits 64-67): </span>
              <span className="font-medium">8, 9, A, B (RFC 4122)</span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Real Use Cases</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Debugging API responses</p>
            <p className="text-sm text-muted-foreground">
              A developer receives a UUID from an API and needs to quickly verify it's properly formatted before using it in subsequent requests.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Data migration validation</p>
            <p className="text-sm text-muted-foreground">
              After migrating a database, an engineer checks that all UUID fields maintained their format and identifies any corrupted entries.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Log file analysis</p>
            <p className="text-sm text-muted-foreground">
              Someone parsing logs needs to extract and validate UUIDs to trace requests across distributed services.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Form input validation</p>
            <p className="text-sm text-muted-foreground">
              A frontend developer is building a form where users paste UUIDs and needs to show real-time validation feedback.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Learning UUID structure</p>
            <p className="text-sm text-muted-foreground">
              A student studying distributed systems wants to understand how version and variant bits work in practice.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Legacy system integration</p>
            <p className="text-sm text-muted-foreground">
              An engineer encounters GUIDs from a Windows system and needs to verify they're compatible with RFC 4122 UUIDs.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What to Know Before Using</h2>
        <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Format requirements:</strong> The validator expects the standard 8-4-4-4-12 hyphenated format. UUIDs without hyphens or with braces will fail validation even if the underlying value is valid.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Case insensitive:</strong> Both uppercase and lowercase hexadecimal characters are accepted. <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">550E8400</code> and <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">550e8400</code> are equally valid.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Version validation:</strong> Only versions 1-5 are considered valid. If you encounter version 0 or 6+, the UUID is either malformed or uses a non-standard extension.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Variant matters:</strong> RFC 4122 UUIDs (the standard) have variant bits 8, 9, A, or B. Other values indicate Microsoft GUIDs or reserved formats that may not be compatible with all UUID libraries.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-base font-semibold">What makes a UUID valid?</h3>
            <p className="text-sm text-muted-foreground">
              A valid UUID has exactly 32 hexadecimal digits displayed in 5 groups (8-4-4-4-12) separated by hyphens. The 13th character must be 1-5 (version), and the 17th character should be 8, 9, A, or B (RFC 4122 variant).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">What are the different UUID versions?</h3>
            <p className="text-sm text-muted-foreground">
              Version 1 uses timestamp and MAC address. Version 2 is DCE Security (rarely used). Version 3 is name-based with MD5. Version 4 is random. Version 5 is name-based with SHA-1. Each version serves different use cases.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">Why does my UUID show as invalid?</h3>
            <p className="text-sm text-muted-foreground">
              Common reasons: missing hyphens, wrong character count, invalid hex characters (G-Z), version digit outside 1-5, or variant digit not in 8, 9, A, B range. Check the exact format against the pattern shown above.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">What's the difference between RFC 4122 and Microsoft variants?</h3>
            <p className="text-sm text-muted-foreground">
              RFC 4122 UUIDs have variant bits 8, 9, A, or B. Microsoft GUIDs (older format) use variant bits C, D, E, or F. Modern systems typically use RFC 4122, but Windows systems may still generate the Microsoft variant.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">Can I validate UUIDs without hyphens?</h3>
            <p className="text-sm text-muted-foreground">
              This validator requires hyphens for consistency. If you have a hyphen-free UUID, add them at positions 8, 12, 16, and 20. Or use the UUID Case Formatter tool to convert between formats.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">What does "normalized" mean in the output?</h3>
            <p className="text-sm text-muted-foreground">
              Normalized means the UUID converted to lowercase with standard hyphenation. This is the canonical RFC 4122 text representation, useful for consistent comparison and storage.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
