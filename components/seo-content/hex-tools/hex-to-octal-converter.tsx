import * as React from "react"

export default function HexToOctalConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Enter a hexadecimal number in the input field. The converter first transforms the hex value to decimal as an intermediate step, then converts the decimal to octal (base-8) format.
          </p>
          <p>
            The conversion handles hex numbers of any length using BigInt arithmetic for full precision. Both uppercase and lowercase hex letters are accepted, with or without the "0x" prefix.
          </p>
          <p>
            Results display instantly as you type. The octal output uses standard notation (digits 0-7 only), with optional "0o" prefix for programming contexts. Copy results with a single click.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Unix File Permissions</h3>
            <p className="text-sm text-muted-foreground">
              Convert hex values to octal for chmod commands and file permission calculations.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Legacy Systems</h3>
            <p className="text-sm text-muted-foreground">
              Work with older systems and documentation that use octal notation for values.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Computer Science Education</h3>
            <p className="text-sm text-muted-foreground">
              Learn base conversion between hex, decimal, and octal number systems.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Embedded Systems</h3>
            <p className="text-sm text-muted-foreground">
              Convert configuration values between formats used by different system components.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Data Encoding</h3>
            <p className="text-sm text-muted-foreground">
              Transform data between encoding schemes that use different number bases.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Debugging</h3>
            <p className="text-sm text-muted-foreground">
              Compare values displayed in different bases across various debugging tools.
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
              <strong className="text-foreground">Octal digits:</strong> Octal uses only digits 0-7. There's no 8 or 9 in octal. Each octal digit represents 3 binary bits.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Hex to octal ratio:</strong> Since hex is 4 bits per digit and octal is 3 bits, the conversion isn't digit-to-digit. Go through decimal or binary.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Prefix conventions:</strong> Octal may be prefixed with 0o (modern) or leading 0 (traditional C). This tool uses 0o for clarity.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">File permissions:</strong> Unix permissions like 755 are octal. Each digit represents read(4)+write(2)+execute(1) for user/group/other.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Large numbers:</strong> BigInt support means no overflow. Hex numbers of any length convert accurately to octal.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">What is 0xFF in octal?</h3>
            <p className="text-sm text-muted-foreground">
              0xFF (255 decimal) is 377 in octal. 255÷64=3 R63, 63÷8=7 R7, giving 377₈.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I convert hex to octal manually?</h3>
            <p className="text-sm text-muted-foreground">
              Convert hex to decimal first, then divide by 8 repeatedly, collecting remainders. Or convert hex→binary→octal (group bits by 3).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Why use octal for file permissions?</h3>
            <p className="text-sm text-muted-foreground">
              Octal conveniently represents 3-bit permission groups (read/write/execute). Each permission digit maps to exactly 3 bits, making 7=rwx, 0=---.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I convert octal back to hex?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Use the octal-to-hex converter which performs the reverse transformation through decimal or binary intermediate.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What does 0o mean?</h3>
            <p className="text-sm text-muted-foreground">
              "0o" is the modern prefix indicating octal (base-8) in languages like Python 3. It distinguishes octal from decimal and hex (0x).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Is octal still used today?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, primarily for Unix file permissions and in some embedded systems. Most other uses have been replaced by hex, but octal persists in specific domains.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What is chmod 755 in hex?</h3>
            <p className="text-sm text-muted-foreground">
              755 octal = 1ED hex (493 decimal). But permissions are usually kept in octal since that's how chmod expects them.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
