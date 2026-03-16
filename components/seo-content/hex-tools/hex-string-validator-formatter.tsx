import * as React from "react"

export default function HexStringValidatorFormatterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Paste any hex string into the input field. The validator checks that all characters are valid hexadecimal digits (0-9, A-F, a-f) and optionally verifies the string meets length requirements.
          </p>
          <p>
            The formatter cleans up the input by removing invalid characters, normalizing case (uppercase or lowercase), and adding or removing prefixes like "0x" or "#" based on your preference.
          </p>
          <p>
            Additional options include grouping digits for readability (every 2, 4, or 8 characters), padding to specific lengths, and validating against common formats like MAC addresses, UUIDs, or color codes.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Data Cleaning</h3>
            <p className="text-sm text-muted-foreground">
              Clean and standardize hex data from multiple sources before processing or importing into systems.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">MAC Address Formatting</h3>
            <p className="text-sm text-muted-foreground">
              Validate and format MAC addresses to consistent notation (colon, hyphen, or dot separated).
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Hash Verification</h3>
            <p className="text-sm text-muted-foreground">
              Verify that cryptographic hashes (MD5, SHA-1, SHA-256) are valid hex strings of correct length.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Code Cleanup</h3>
            <p className="text-sm text-muted-foreground">
              Standardize hex literals in codebases to consistent formatting style across the project.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Input Validation</h3>
            <p className="text-sm text-muted-foreground">
              Validate user input in forms that require hex values like color pickers or configuration fields.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Log Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Extract and validate hex values from log files for analysis and correlation.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Valid hex characters:</strong> Only 0-9 and A-F (or a-f) are valid. Letters G-Z and special characters (except prefixes) are invalid.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Common hex formats:</strong> MAC addresses are 12 hex digits, MD5 is 32, SHA-1 is 40, SHA-256 is 64, UUIDs are 32 with hyphens.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Prefix conventions:</strong> 0x for programming, # for colors, no prefix for hashes and addresses. Choose based on your use case.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Case sensitivity:</strong> Hex values are case-insensitive. Uppercase is traditional for documentation, lowercase common in code.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Whitespace handling:</strong> Spaces, hyphens, and colons are typically separators, not part of the value. The formatter can add or remove them.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">What makes a valid hex string?</h3>
            <p className="text-sm text-muted-foreground">
              Only characters 0-9 and A-F (case insensitive) are valid. Optional prefixes like 0x or # may be included depending on format.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I format a MAC address?</h3>
            <p className="text-sm text-muted-foreground">
              MAC addresses are 12 hex digits. Common formats: AA:BB:CC:DD:EE:FF (colon), AA-BB-CC-DD-EE-FF (hyphen), or AABB.CCDD.EEFF (Cisco dot).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What's the length of an MD5 hash?</h3>
            <p className="text-sm text-muted-foreground">
              MD5 hashes are always 32 hex digits (128 bits). SHA-1 is 40 digits (160 bits), SHA-256 is 64 digits (256 bits).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I validate a UUID?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. UUIDs are 32 hex digits displayed as 8-4-4-4-12 with hyphens. The validator checks both format and hex validity.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I add 0x prefix to multiple values?</h3>
            <p className="text-sm text-muted-foreground">
              Paste your hex values, select "Add 0x prefix" option, and the formatter will prepend 0x to each value automatically.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What if my string has invalid characters?</h3>
            <p className="text-sm text-muted-foreground">
              The validator highlights invalid characters. You can choose to remove them automatically or fix them manually before formatting.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I convert lowercase to uppercase?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Select the case normalization option to convert all hex letters to uppercase or lowercase consistently.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
