import * as React from "react"

export default function OctalToHexConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Enter an octal number (base-8, digits 0-7) in the input field. The converter transforms it to decimal as an intermediate step, then converts to hexadecimal (base-16) format.
          </p>
          <p>
            The converter accepts octal numbers with or without prefixes (0o or leading 0). Invalid octal digits (8 or 9) are flagged as errors since octal only uses digits 0-7.
          </p>
          <p>
            Results display instantly using BigInt for arbitrary precision. The hex output is shown in uppercase with optional "0x" prefix. Copy the result with a single click for use in code or documentation.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">File Permission Conversion</h3>
            <p className="text-sm text-muted-foreground">
              Convert Unix file permissions from octal (chmod values) to hex for documentation or analysis.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Legacy Code Migration</h3>
            <p className="text-sm text-muted-foreground">
              Update old codebases that use octal literals to modern hex notation.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">System Administration</h3>
            <p className="text-sm text-muted-foreground">
              Translate between octal permission values and hex representations in security tools.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Computer Science Studies</h3>
            <p className="text-sm text-muted-foreground">
              Practice base conversion and understand relationships between number systems.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Data Interpretation</h3>
            <p className="text-sm text-muted-foreground">
              Read octal dumps or outputs from legacy systems and convert to more common hex format.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Debugging</h3>
            <p className="text-sm text-muted-foreground">
              Compare values when different tools display the same data in octal vs hex format.
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
              <strong className="text-foreground">Valid octal digits:</strong> Only 0-7 are valid in octal. If you see 8 or 9, it's not octal - it might be decimal or a typo.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Octal prefixes:</strong> Traditional C uses leading 0 (0755), modern languages use 0o (0o755). Both are accepted.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Bit grouping:</strong> Octal groups binary by 3 bits, hex by 4 bits. Conversion requires regrouping bits or going through decimal.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Common octal values:</strong> File permissions like 644, 755, 777 are common octal values. Know what they represent.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Case convention:</strong> Hex output uses uppercase (A-F) by convention, though lowercase is equally valid.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">What is 755 octal in hex?</h3>
            <p className="text-sm text-muted-foreground">
              755₈ = 1ED₁₆ (493 decimal). Common file permission: owner rwx, group r-x, other r-x.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I convert octal to hex manually?</h3>
            <p className="text-sm text-muted-foreground">
              Convert octal to decimal (multiply each digit by 8^position), then decimal to hex (divide by 16, collect remainders).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Why can't I use 8 or 9 in octal?</h3>
            <p className="text-sm text-muted-foreground">
              Octal is base-8, meaning it only has 8 digits (0-7). Just like decimal has 10 digits (0-9), binary has 2 (0-1).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What is 0o100 in hex?</h3>
            <p className="text-sm text-muted-foreground">
              0o100 (octal) = 64 (decimal) = 0x40 (hex). This is a common permission value (owner read+write only).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I convert decimal to hex?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but use the decimal-to-hex converter for that. This tool specifically handles octal-to-hex conversion.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What's 777 octal?</h3>
            <p className="text-sm text-muted-foreground">
              777₈ = 511 decimal = 0x1FF. In permissions, this means full read/write/execute for everyone (security risk).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I verify the conversion?</h3>
            <p className="text-sm text-muted-foreground">
              Convert back using hex-to-octal, or check via decimal intermediate. Both paths should give consistent results.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
