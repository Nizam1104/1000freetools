import React from "react"

export default function AsciiCodeTableSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool displays the complete ASCII character table, showing all
            128 standard ASCII codes (0-127) with their decimal, hexadecimal,
            octal, binary, and character representations.
          </p>
          <p>
            The table organizes characters by code value, making it easy to
            look up any ASCII character's various representations. Control
            characters (0-31) show their abbreviations, while printable
            characters (32-126) display directly.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">ASCII table sections:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">0-31</code>
                <span>Control characters (NUL, SOH, etc.)</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">32-126</code>
                <span>Printable characters (space to ~)</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">127</code>
                <span>Delete character (DEL)</span>
              </div>
            </div>
          </div>
          <p>
            Search by character, code, or description. Click any row to copy
            the character or code value. Use the filter to show only printable
            characters or include control codes.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Looking up ASCII codes for programming</h3>
            <p className="text-sm text-muted-foreground">
              A developer needs the ASCII code for newline in their code.
              They check the table and find LF (Line Feed) is code 10, or
              0x0A in hex, for use in their byte array.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Understanding control characters</h3>
            <p className="text-sm text-muted-foreground">
              A student learning about text files encounters \r\n line endings.
              They look up CR (13) and LF (10) to understand what these
              control characters actually do.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging character encoding issues</h3>
            <p className="text-sm text-muted-foreground">
              A QA engineer sees unexpected behavior with tab characters.
              They verify that tab is ASCII 9 (0x09) and check if their
              code handles it correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing character classification functions</h3>
            <p className="text-sm text-muted-foreground">
              A programmer writes isDigit() and isAlpha() functions. They
              reference the ASCII table to find that digits are 48-57,
              uppercase is 65-90, lowercase is 97-122.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating test data with special characters</h3>
            <p className="text-sm text-muted-foreground">
              A tester needs input with specific control characters. They
              use the table to find the codes and generate test strings
              with null bytes, tabs, or other special characters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning computer science fundamentals</h3>
            <p className="text-sm text-muted-foreground">
              A beginner studies how computers represent text. The ASCII
              table shows the mapping between characters and numbers,
              a fundamental concept in computing.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">ASCII only has 128 characters.</strong>
              Standard ASCII covers codes 0-127. Extended ASCII (128-255)
              varies by code page and isn't standardized. Unicode extends
              this to over 140,000 characters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Control characters aren't printable.</strong>
              Codes 0-31 and 127 are control characters. They affect text
              formatting (like tab, newline) or have historical meanings
              (like bell, escape) but don't display as visible symbols.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Case matters in ASCII.</strong>
              Uppercase and lowercase letters have different codes. 'A' is
              65, 'a' is 97. The 32-point difference is consistent—flip bit 5
              to toggle case.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some control characters are still used.</strong>
              NUL (0), TAB (9), LF (10), CR (13), and ESC (27) are still
              common in modern systems. Others like SOH, STX, ETX are mostly
              historical.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Memorize key ranges: 48-57 for digits,
              65-90 for uppercase, 97-122 for lowercase. These patterns help
              you quickly validate character types in code without looking
              them up.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is ASCII code for space?</h3>
            <p className="text-sm text-muted-foreground">
              Space is ASCII 32 (0x20 in hex, 040 in octal). It's the first
              printable character. Codes below 32 are control characters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between CR and LF?</h3>
            <p className="text-sm text-muted-foreground">
              CR (Carriage Return, 13) moves the cursor to the start of the
              line. LF (Line Feed, 10) moves down one line. Windows uses
              both (CRLF) for line endings. Unix uses just LF.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why are digits 48-57 not 0-9?</h3>
            <p className="text-sm text-muted-foreground">
              ASCII reserves codes 0-31 for control characters. Printable
              characters start at 32 (space). Digits begin at 48 so '0' is
              48, '1' is 49, etc. This leaves room for punctuation first.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What character is ASCII 0?</h3>
            <p className="text-sm text-muted-foreground">
              ASCII 0 is NUL, the null character. It's used to terminate
              strings in C and C++. You can't display it—it has no visual
              representation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is ASCII still used today?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, ASCII is the foundation of Unicode. The first 128 Unicode
              code points match ASCII exactly. Most English text is still
              pure ASCII even in UTF-8 encoding.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the ASCII code for newline?</h3>
            <p className="text-sm text-muted-foreground">
              It depends on the system. Unix/Linux/macOS use LF (10). Windows
              uses CR+LF (13, 10). Old Mac (pre-OS X) used just CR (13).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I type control characters?</h3>
            <p className="text-sm text-muted-foreground">
              Use keyboard shortcuts: Ctrl+@ for NUL, Ctrl+I for TAB,
              Ctrl+M for CR, Ctrl+[ for ESC. Or use escape sequences in
              code: \0, \t, \n, \r, \e.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
