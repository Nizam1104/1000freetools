import React from "react"

export default function EbcdicToAsciiConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool converts between EBCDIC and ASCII character encodings.
            EBCDIC (Extended Binary Coded Decimal Interchange Code) is an
            8-bit encoding used primarily on IBM mainframe systems.
          </p>
          <p>
            The converter maps each EBCDIC byte (0-255) to its corresponding
            ASCII character. The mapping isn't straightforward—EBCDIC has
            different character arrangements than ASCII, with letters not
            in sequential order and gaps in the code points.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Key differences:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">ASCII 'A'</code>
                <span>Code 65, EBCDIC code 193</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">ASCII 'a'</code>
                <span>Code 97, EBCDIC code 129</span>
              </div>
            </div>
          </div>
          <p>
            Paste EBCDIC data (as hex or text) to convert to ASCII, or ASCII
            text to convert to EBCDIC. The tool handles both directions for
            mainframe data interchange.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Migrating mainframe data to modern systems</h3>
            <p className="text-sm text-muted-foreground">
              A developer extracts data from an IBM mainframe and needs to
              convert EBCDIC files to ASCII for processing on Linux servers.
              They use this tool to verify the conversion is correct.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging mainframe integration issues</h3>
            <p className="text-sm text-muted-foreground">
              A systems engineer troubleshoots garbled text from a mainframe
              feed. They convert the EBCDIC bytes to ASCII to see what the
              mainframe is actually sending.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Processing legacy COBOL file formats</h3>
            <p className="text-sm text-muted-foreground">
              An analyst works with old COBOL data files stored in EBCDIC.
              They convert to ASCII to read the content in modern text
              editors and analysis tools.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing mainframe gateway software</h3>
            <p className="text-sm text-muted-foreground">
              A QA engineer tests software that interfaces with mainframes.
              They generate test data in both encodings to verify the
              gateway handles conversion correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing old IBM system dumps</h3>
            <p className="text-sm text-muted-foreground">
              A forensic analyst examines memory dumps from legacy IBM
              systems. They convert EBCDIC strings to ASCII to read text
              content in the dump.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building EBCDIC-aware data pipelines</h3>
            <p className="text-sm text-muted-foreground">
              A data engineer creates ETL processes that handle mainframe
              data. They use this tool to understand the character mapping
              and build correct conversion logic.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">EBCDIC has multiple variants.</strong>
              Different IBM systems use slightly different EBCDIC code pages.
              This tool uses the most common variant (EBCDIC US/Canada), but
              other regions have different mappings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Letters aren't sequential in EBCDIC.</strong>
              Unlike ASCII where A-Z is 65-90, EBCDIC has gaps. 'I' and 'J'
              have a 9-code gap, 'R' and 'S' have a 7-code gap. This breaks
              code that assumes sequential letters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some characters don't map directly.</strong>
              Certain EBCDIC characters have no ASCII equivalent and vice
              versa. The converter uses best-effort mapping for these cases.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Numbers are in order in both encodings.</strong>
              At least 0-9 are sequential in both EBCDIC and ASCII, making
              numeric data easier to convert than text.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Historical note:</strong> EBCDIC was designed for
              punch cards where certain bit patterns were avoided to prevent
              physical card damage. This historical constraint shaped the
              character arrangement still used today.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is EBCDIC used for today?</h3>
            <p className="text-sm text-muted-foreground">
              EBCDIC is still used on IBM z/OS mainframes, which run critical
              banking, insurance, and government systems. Many Fortune 500
              companies still rely on EBCDIC-based mainframe applications.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does EBCDIC exist?</h3>
            <p className="text-sm text-muted-foreground">
              EBCDIC was developed by IBM in 1963 for the System/360. It
              evolved from earlier punch card codes. ASCII was developed
              separately and became the standard for most other systems.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert EBCDIC files directly?</h3>
            <p className="text-sm text-muted-foreground">
              This tool handles text input. For files, use command-line tools
              like iconv: iconv -f IBM037 -t UTF-8 input.txt. Or use FTP in
              ASCII mode to convert during transfer.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is EBCDIC 8-bit like ASCII?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, both are 8-bit encodings. But ASCII uses 7 bits (0-127)
              for standard characters. EBCDIC uses all 8 bits (0-255) with
              different character assignments.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the EBCDIC code for space?</h3>
            <p className="text-sm text-muted-foreground">
              Space is EBCDIC code 64 (0x40). In ASCII, space is 32 (0x20).
              The @ symbol is at 64 in ASCII, showing how the encodings
              differ.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are there EBCDIC Unicode characters?</h3>
            <p className="text-sm text-muted-foreground">
              Unicode doesn't include EBCDIC as a separate character set.
              EBCDIC characters map to their Unicode equivalents through
              code page conversion tables.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I identify EBCDIC data?</h3>
            <p className="text-sm text-muted-foreground">
              If text looks garbled but comes from an IBM mainframe, it's
              likely EBCDIC. Common signs: readable characters mixed with
              unusual symbols, or data that makes sense when converted
              from EBCDIC to ASCII.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
