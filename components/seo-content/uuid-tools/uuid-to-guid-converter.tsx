export default function UuidToGuidConverterSEO() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How the UUID to GUID Converter Works</h2>
        <p className="text-muted-foreground">
          This converter transforms UUIDs between RFC 4122 standard format and Microsoft GUID format. The underlying 128-bit value stays identical—only the text representation changes.
        </p>
        <p className="text-muted-foreground">
          The tool auto-detects your input format. If you paste a UUID with curly braces, it converts to standard UUID format. If you paste a plain UUID, it converts to GUID format with optional braces.
        </p>
        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="text-sm font-medium mb-2">Format comparison:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            <div className="bg-muted p-3 rounded">
              <p className="text-xs text-muted-foreground mb-1">UUID (RFC 4122)</p>
              <code className="text-xs font-mono">550e8400-e29b-41d4-a716-446655440000</code>
            </div>
            <div className="bg-muted p-3 rounded">
              <p className="text-xs text-muted-foreground mb-1">GUID (Microsoft)</p>
              <code className="text-xs font-mono">{"{550E8400-E29B-41D4-A716-446655440000}"}</code>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Real Use Cases</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Windows Registry editing</p>
            <p className="text-sm text-muted-foreground">
              A system administrator copies a UUID from a Linux config file and needs it in GUID format with braces for Windows Registry entries.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">COM/ActiveX development</p>
            <p className="text-sm text-muted-foreground">
              A C# developer working with COM interfaces needs GUIDs in the brace-delimited format that Visual Studio expects for IID and CLSID attributes.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Cross-platform database migration</p>
            <p className="text-sm text-muted-foreground">
              Migrating from SQL Server (which uses GUID) to PostgreSQL (which uses UUID) requires converting the text representation while preserving the value.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">API integration</p>
            <p className="text-sm text-muted-foreground">
              An API returns UUIDs in RFC format, but a legacy Windows service expects GUIDs with braces. The converter bridges the format gap.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Configuration file standardization</p>
            <p className="text-sm text-muted-foreground">
              A DevOps engineer consolidates configs from multiple sources and needs all identifiers in a consistent format.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Debugging Windows event logs</p>
            <p className="text-sm text-muted-foreground">
              Event Viewer shows GUIDs with braces, but log aggregation tools expect standard UUID format without them.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What to Know Before Using</h2>
        <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Same value, different format:</strong> UUID and GUID represent the same 128-bit number. The conversion is purely cosmetic—like changing date formats from MM/DD/YYYY to DD-MM-YYYY.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Case convention:</strong> UUIDs are typically lowercase (RFC 4122 convention). GUIDs are typically uppercase (Microsoft convention). This tool follows those conventions automatically.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Braces are optional:</strong> When converting to GUID format, you can choose whether to include the curly braces. Some Windows APIs require them; others accept plain hyphenated format.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Byte order note:</strong> True GUID byte order conversion (little-endian vs big-endian) is NOT performed. This tool only changes text formatting. For most applications, this is correct—byte order matters only in binary serialization.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-base font-semibold">Are UUID and GUID the same thing?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. GUID (Globally Unique Identifier) is Microsoft's trademarked term for UUID (Universally Unique Identifier). They're both 128-bit values. The difference is purely in how they're typically written: GUIDs use uppercase with braces, UUIDs use lowercase without braces.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">When do I need curly braces around my GUID?</h3>
            <p className="text-sm text-muted-foreground">
              Windows Registry entries, COM/DCOM interfaces, and some .NET attributes require braces. Many modern Windows APIs accept GUIDs without braces. When in doubt, include them for Windows-specific contexts.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">Why does my GUID look different after conversion?</h3>
            <p className="text-sm text-muted-foreground">
              If only the case changed (lowercase to uppercase or vice versa), that's expected convention. If the actual hex digits changed, you may have encountered a byte-order conversion issue—this tool doesn't perform byte-order swaps, which is correct for most text-based conversions.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">Can I convert a GUID back to UUID?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, the conversion is reversible. Paste a GUID with or without braces, and the tool will output standard UUID format (lowercase, hyphenated, no braces).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">What happens if I paste an invalid format?</h3>
            <p className="text-sm text-muted-foreground">
              The tool validates that your input contains exactly 32 hexadecimal characters (ignoring hyphens and braces). If validation fails, you'll see an error message explaining the expected format.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">Does this work with UUID versions other than v4?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, the converter works with any valid UUID/GUID regardless of version (v1, v3, v4, v5, etc.). The version bits are preserved during conversion.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
