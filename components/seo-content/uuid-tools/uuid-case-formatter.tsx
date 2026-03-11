export default function UuidCaseFormatterSEO() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How the UUID Case Formatter Works</h2>
        <p className="text-muted-foreground">
          This tool normalizes UUID formatting by applying consistent case (uppercase or lowercase) and hyphenation (with hyphens, without hyphens, or with curly braces). It strips all existing formatting first, then reapplies your chosen style.
        </p>
        <p className="text-muted-foreground">
          The formatter accepts UUIDs in any input format—mixed case, missing hyphens, extra spaces, or curly braces—and produces clean, standardized output. All transformations happen locally in your browser.
        </p>
        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="text-sm font-medium mb-2">Available output formats:</p>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="bg-muted p-3 rounded space-y-1">
              <p className="text-xs font-medium">Standard (lowercase + hyphens)</p>
              <code className="text-xs font-mono">550e8400-e29b-41d4-a716-446655440000</code>
            </div>
            <div className="bg-muted p-3 rounded space-y-1">
              <p className="text-xs font-medium">Uppercase + Hyphens</p>
              <code className="text-xs font-mono">550E8400-E29B-41D4-A716-446655440000</code>
            </div>
            <div className="bg-muted p-3 rounded space-y-1">
              <p className="text-xs font-medium">No Hyphens</p>
              <code className="text-xs font-mono">550e8400e29b41d4a716446655440000</code>
            </div>
            <div className="bg-muted p-3 rounded space-y-1">
              <p className="text-xs font-medium">GUID (with braces)</p>
              <code className="text-xs font-mono">{"{550E8400-E29B-41D4-A716-446655440000}"}</code>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Real Use Cases</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Standardizing config files</p>
            <p className="text-sm text-muted-foreground">
              A DevOps engineer consolidates configuration from multiple sources where UUIDs appear in different formats and needs them all consistent.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Windows Registry editing</p>
            <p className="text-sm text-muted-foreground">
              Someone needs to paste a UUID into the Windows Registry in the specific format with curly braces that regedit expects.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">URL parameter preparation</p>
            <p className="text-sm text-muted-foreground">
              A developer removes hyphens from UUIDs to make them more compact for URL query parameters where every character counts.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Database storage optimization</p>
            <p className="text-sm text-muted-foreground">
              Converting UUIDs to hyphen-free format before storing as BINARY(16) instead of CHAR(36) to save space.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Code generation</p>
            <p className="text-sm text-muted-foreground">
              Generating C# code where GUID attributes require uppercase with braces: <code className="bg-muted px-1 rounded text-xs">[Guid("...")]</code>
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Log normalization</p>
            <p className="text-sm text-muted-foreground">
              A data pipeline ingests logs with UUIDs in inconsistent formats and needs them standardized before indexing in Elasticsearch.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What to Know Before Using</h2>
        <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Input flexibility:</strong> Paste UUIDs with any combination of uppercase/lowercase, with or without hyphens, with or without braces. The tool strips everything and reapplies your chosen format.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Validation:</strong> The formatter validates that your input contains exactly 32 hexadecimal characters. If validation fails, you'll see an error instead of malformed output.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Format doesn't change value:</strong> <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">550e8400...</code>, <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">550E8400...</code>, and <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">{"{550E8400...}"}</code> are all the same UUID. Formatting is purely for human readability and system compatibility.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Character count:</strong> The output shows the character length so you can verify it matches your storage requirements (36 with hyphens, 32 without, 38 with braces).
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-base font-semibold">Does changing the case affect the UUID value?</h3>
            <p className="text-sm text-muted-foreground">
              No. UUIDs are case-insensitive by specification. <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">550e8400</code> and <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">550E8400</code> represent the exact same 128-bit value. Case is purely a formatting convention.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">When should I use uppercase vs. lowercase?</h3>
            <p className="text-sm text-muted-foreground">
              Lowercase is the RFC 4122 standard and common in Unix/Linux environments. Uppercase is traditional in Microsoft/GUID contexts. For new projects, lowercase is generally preferred unless you have specific compatibility requirements.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">What happens if I remove the hyphens?</h3>
            <p className="text-sm text-muted-foreground">
              The UUID remains valid—hyphens are just visual separators. Many databases store UUIDs as 16-byte binary values (no hyphens). Just be aware that some APIs or libraries expect the hyphenated format.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">When do I need curly braces?</h3>
            <p className="text-sm text-muted-foreground">
              Curly braces are primarily used in Windows contexts: Registry entries, COM/DCOM interfaces, and some .NET attributes. Most modern APIs don't require them. Include braces when working with Windows-specific technologies.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">Can I convert multiple UUIDs at once?</h3>
            <p className="text-sm text-muted-foreground">
              This tool processes one UUID at a time. For batch conversion of many UUIDs, use the UUID Sort & Organize tool, which includes formatting options along with sorting and deduplication.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">Why does my formatted UUID look different?</h3>
            <p className="text-sm text-muted-foreground">
              If only the case or presence of hyphens/braces changed, that's expected. If the actual hex digits changed, your input may have been invalid. The formatter preserves all 32 hexadecimal characters exactly.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
