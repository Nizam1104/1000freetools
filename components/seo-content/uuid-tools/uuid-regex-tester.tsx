import React from "react"

export default function UuidRegexTesterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter UUID strings to validate them against standard UUID regex patterns. The tester checks format, version, and variant compliance according to RFC 4122.
          </p>
          <p>
            The tool highlights valid UUIDs in green and invalid ones in red, showing exactly which part of the pattern failed. It supports UUIDs with or without hyphens, in upper or lowercase.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Pattern examples:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Standard format (with hyphens):
xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

Valid UUIDs:
550e8400-e29b-41d4-a716-446655440000 ✓
6ba7b810-9dad-11d1-80b4-00c04fd430c8 ✓

Invalid UUIDs:
550e8400e29b41d4a716446655440000 (no hyphens)
550e8400-e29b-41d4-a716-44665544000g (invalid char 'g')
550e8400-e29b-41d4-a716 (too short)</pre>
          </div>
          <p>
            The regex validates the 8-4-4-4-12 hexadecimal pattern. It also checks that version (bits 12-15 of time_hi_and_version) and variant (bits 64-65 of clock_seq) are valid.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Form input validation</h3>
            <p className="text-sm text-muted-foreground">
              Users paste UUIDs into web forms. Client-side regex validation catches typos before submission. Show immediate feedback: "Invalid UUID format" vs "UUID not found in database".
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Data import cleanup</h3>
            <p className="text-sm text-muted-foreground">
              Importing CSV files with UUID columns? Validate each entry before database insertion. Flag invalid UUIDs for manual review instead of letting bad data corrupt your tables.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">API request validation</h3>
            <p className="text-sm text-muted-foreground">
              REST APIs often use UUIDs in URLs: /api/users/550e8400-e29b-41d4-a716-446655440000. Validate the UUID format before querying the database to prevent injection attacks.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Log file parsing</h3>
            <p className="text-sm text-muted-foreground">
              Extract UUIDs from log files using regex. Validate extracted strings to ensure you're capturing actual UUIDs, not random hex strings that happen to be 32 characters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Database migration verification</h3>
            <p className="text-sm text-muted-foreground">
              After migrating UUID columns, run validation to ensure all values are properly formatted. Catch truncation or encoding issues before they cause application errors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing and QA</h3>
            <p className="text-sm text-muted-foreground">
              Generate test data with valid and invalid UUIDs. Verify your application handles both correctly. The regex tester helps create comprehensive test cases.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Standard UUID format includes hyphens.</strong>
              The canonical representation is 8-4-4-4-12 hex digits with hyphens: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx. Some systems store without hyphens for compactness.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Case doesn't matter for UUIDs.</strong>
              550E8400-E29B-41D4-A716-446655440000 and 550e8400-e29b-41d4-a716-446655440000 are identical. The regex accepts both uppercase and lowercase hex digits.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Version and variant bits have constraints.</strong>
              Version (bits 12-15 of third group) must be 1-5. Variant (bits 64-65 of fourth group) must be 10xx (8, 9, a, or b in hex). Strict regex enforces these.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Regex validates format, not authenticity.</strong>
              A valid-format UUID might not exist in your system. Regex confirms the string looks like a UUID, not that it's a real, assigned identifier.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For database storage, consider storing UUIDs without hyphens (32 chars) to save space. Add hyphens only for display using formatting functions.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the regex pattern for UUID validation?</h3>
            <p className="text-sm text-muted-foreground">
              Basic: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i. Strict (with version/variant): /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can UUIDs have uppercase letters?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, both uppercase and lowercase are valid. The RFC 4122 standard specifies lowercase for canonical form, but parsers should accept both. The regex uses case-insensitive matching.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What are the valid UUID versions?</h3>
            <p className="text-sm text-muted-foreground">
              Version 1 (time-based), 2 (DCE security), 3 (MD5 hash), 4 (random), and 5 (SHA-1 hash). Versions 1, 3, 4, and 5 are commonly used. Version 2 is rare.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I validate UUIDs in JavaScript?</h3>
            <p className="text-sm text-muted-foreground">
              Use the test() method: const uuidRegex = /^[0-9a-f]{8}-...$/i; uuidRegex.test(inputString). Returns true for valid format, false otherwise.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a nil UUID?</h3>
            <p className="text-sm text-muted-foreground">
              The nil UUID is all zeros: 00000000-0000-0000-0000-000000000000. It's a valid format but represents a null or uninitialized value. Some systems use it as a sentinel.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use UUID regex for GUID validation?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, GUIDs (Microsoft's implementation) use the same format as UUIDs. The terms are often used interchangeably. The same regex validates both.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if my UUIDs don't have hyphens?</h3>
            <p className="text-sm text-muted-foreground">
              Use a regex without hyphens: /^[0-9a-f]{32}$/i. Or add hyphens programmatically: insert '-' at positions 8, 12, 16, and 20 in the 32-character string.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
