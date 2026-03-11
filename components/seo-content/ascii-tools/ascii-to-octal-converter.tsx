import React from "react"

export default function AsciiToOctalConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool converts ASCII text to octal (base-8) representation. Each
            character gets converted to its ASCII code (0-127), then that number
            is expressed in octal using digits 0-7.
          </p>
          <p>
            The conversion takes each character, finds its ASCII value, and divides
            by 8 repeatedly to get the octal digits. For example, 'A' is ASCII 65,
            which becomes 101 in octal (1×64 + 0×8 + 1×1 = 65).
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example conversions:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">A</code>
                <span>ASCII 65 →</span>
                <code className="font-mono bg-background px-2 py-1 rounded">101</code>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">Hello</code>
                <span>becomes</span>
                <code className="font-mono bg-background px-2 py-1 rounded">110 145 154 154 157</code>
              </div>
            </div>
          </div>
          <p>
            Enter text to see octal output instantly. Results appear with spaces
            between each character's octal value for readability. Copy the result
            with one click.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Setting Unix file permissions</h3>
            <p className="text-sm text-muted-foreground">
              A sysadmin works with chmod commands that use octal notation like
              755 or 644. They convert permission strings to octal to understand
              or construct the correct chmod command for file access control.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning computer science number systems</h3>
            <p className="text-sm text-muted-foreground">
              A student studies binary, octal, decimal, and hexadecimal conversions.
              They use this tool to verify their manual calculations and understand
              how different bases represent the same values.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging legacy systems</h3>
            <p className="text-sm text-muted-foreground">
              A developer maintains old code that outputs data in octal format.
              They convert between text and octal to understand what the legacy
              system is producing and decode the output.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with C string escapes</h3>
            <p className="text-sm text-muted-foreground">
              A programmer encounters octal escape sequences like \101 in C code.
              They convert to see that \101 equals 'A' and understand what the
              string literal actually contains.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating encoding challenges for CTF</h3>
            <p className="text-sm text-muted-foreground">
              A cybersecurity competition organizer creates puzzles where
              participants must decode octal-encoded messages to find flags.
              This tool helps generate and verify the challenge data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing data serialization formats</h3>
            <p className="text-sm text-muted-foreground">
              A QA engineer tests whether their serialization library correctly
              handles octal representations. They generate test cases with known
              octal outputs to verify correct encoding and decoding.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Octal only uses digits 0-7.</strong>
              You'll never see 8 or 9 in octal output. If you do, something's
              wrong. Each digit represents a power of 8, just like decimal uses
              powers of 10.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">ASCII only covers codes 0-127.</strong>
              This tool works with standard ASCII. Extended ASCII (128-255) and
              Unicode characters need more than 3 octal digits and may not convert
              correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Leading zeros may be omitted.</strong>
              ASCII 65 is 101 in octal, but ASCII 7 is just 7, not 007. Some
              systems pad to 3 digits (007), others don't. This tool omits
              unnecessary leading zeros.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Octal is less common than hex.</strong>
              Modern systems prefer hexadecimal (base-16) over octal. You'll see
              octal mainly in Unix permissions, some C code, and legacy systems.
              Hex is more universal for modern work.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Historical note:</strong> Octal was popular when computers
              used 12, 24, or 36-bit words—numbers divisible by 3. Each octal
              digit represents exactly 3 bits. Modern 8-bit bytes favor
              hexadecimal (4 bits per digit).
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I convert octal back to text?</h3>
            <p className="text-sm text-muted-foreground">
              Each octal number represents one character. Convert each octal
              value to decimal, then look up the ASCII character. 110 = 72 = 'H',
              145 = 101 = 'e', and so on.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why use octal instead of decimal?</h3>
            <p className="text-sm text-muted-foreground">
              Octal maps cleanly to binary—each digit is exactly 3 bits. This
              made it useful for older systems. Today it persists in Unix file
              permissions where 3 bits control read, write, and execute.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does 755 mean in file permissions?</h3>
            <p className="text-sm text-muted-foreground">
              In octal permissions, 755 means: owner gets 7 (read+write+execute),
              group gets 5 (read+execute), others get 5 (read+execute). Each
              digit is a sum: 4 for read, 2 for write, 1 for execute.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert numbers to octal?</h3>
            <p className="text-sm text-muted-foreground">
              This tool converts text characters to octal. For converting
              decimal numbers to octal, use a number base converter. The
              processes are related but different.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is octal still used today?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, mainly in Unix/Linux file permissions (chmod 755) and some
              programming language escape sequences. Outside these niches,
              hexadecimal has largely replaced octal.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many octal digits per character?</h3>
            <p className="text-sm text-muted-foreground">
              Standard ASCII (0-127) needs at most 3 octal digits. Characters
              0-7 use one digit, 8-63 use two digits, and 64-127 use three
              digits.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the octal for space character?</h3>
            <p className="text-sm text-muted-foreground">
              Space is ASCII code 32. In octal, that's 40 (4×8 + 0×1 = 32).
              So a space character converts to octal 40.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
