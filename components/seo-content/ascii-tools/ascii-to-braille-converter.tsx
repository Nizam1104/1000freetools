import React from "react"

export default function AsciiToBrailleConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool converts ASCII text to Unicode Braille patterns. Each
            character maps to a combination of Braille dots (⠁⠂⠃⠄ etc.) based
            on the standard English Braille alphabet.
          </p>
          <p>
            The converter uses Unicode Braille characters (U+2800 to U+28FF)
            which represent all 256 possible dot combinations in a 2×4 Braille
            cell. Letters, numbers, and some symbols have direct Braille
            equivalents.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example conversions:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">A</code>
                <span>becomes</span>
                <code className="font-mono bg-background px-2 py-1 rounded">⠁</code>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">Hello</code>
                <span>becomes</span>
                <code className="font-mono bg-background px-2 py-1 rounded">⠓⠑⠇⠇⠕</code>
              </div>
            </div>
          </div>
          <p>
            Type text to see the Braille translation instantly. Copy the output
            for use in documents, websites, or accessibility testing. Note that
            this is a direct character mapping, not full Grade 2 Braille.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating accessibility training materials</h3>
            <p className="text-sm text-muted-foreground">
              A teacher creates materials to help sighted students understand
              how Braille works. They convert sample text to Braille so students
              can see the dot patterns and practice reading by touch.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing screen reader Braille output</h3>
            <p className="text-sm text-muted-foreground">
              A developer tests whether their app's accessibility features work
              with Braille displays. They convert expected output to Braille
              and compare against what the screen reader sends to the device.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing tactile signage mockups</h3>
            <p className="text-sm text-muted-foreground">
              A designer creates mockups for ADA-compliant signs with Braille.
              They convert the text to verify the Braille translation before
              sending to the sign manufacturer.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Making inclusive social media posts</h3>
            <p className="text-sm text-muted-foreground">
              Someone adds Braille text to an image for accessibility awareness.
              The Braille version lets Braille readers access the content while
              raising awareness about accessibility needs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning Braille as a new skill</h3>
            <p className="text-sm text-muted-foreground">
              A person studying Braille to communicate with a blind family member
              uses this tool to practice. They convert messages and check their
              manual transcription against the output.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating Braille art and designs</h3>
            <p className="text-sm text-muted-foreground">
              An artist incorporates Braille into visual artwork. They convert
              hidden messages to Braille patterns that become part of the
              composition, adding tactile meaning to visual pieces.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">This is Grade 1 (letter-by-letter) Braille.</strong>
              Full English Braille (Grade 2) uses contractions and shorthand.
              "The" becomes a single cell, not three. This tool does direct
              character mapping only.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Numbers use a number prefix in real Braille.</strong>
              In proper Braille, numbers use a special prefix followed by
              letters A-J for digits 1-0. This tool shows the basic character
              mapping without number mode.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Braille displays may render differently.</strong>
              Physical Braille displays show raised dots. Screen display depends
              on font support. Not all systems render Unicode Braille clearly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Case sensitivity is lost in Braille.</strong>
              Standard Braille doesn't distinguish uppercase from lowercase.
              A capital sign precedes capitalized words, but the letter cells
              are identical.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Accessibility note:</strong> For actual accessibility
              purposes, use proper screen readers and Braille displays. This
              tool is for visualization and learning, not for creating
              accessibility-compliant content.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between Grade 1 and Grade 2 Braille?</h3>
            <p className="text-sm text-muted-foreground">
              Grade 1 is letter-by-letter spelling. Grade 2 uses 189 contractions
              and shorthand. "And" becomes one cell, not three. Grade 2 is
              standard for most English Braille but harder to learn.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can blind people read Unicode Braille on screens?</h3>
            <p className="text-sm text-muted-foreground">
              No, Unicode Braille characters are visual representations. Blind
              readers use refreshable Braille displays that raise physical dots.
              Screen readers send text to these displays in Braille format.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many dots are in a Braille cell?</h3>
            <p className="text-sm text-muted-foreground">
              Standard Braille has 6 dots in a 2×3 grid. Computer Braille uses
              8 dots (2×4) for extended characters. Unicode Braille includes
              all 256 possible 8-dot combinations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is Braille the same in all languages?</h3>
            <p className="text-sm text-muted-foreground">
              No, each language has its own Braille system. English Braille
              differs from French, German, or Japanese Braille. The Unicode
              range covers the patterns, but the mappings vary by language.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I print Braille from this output?</h3>
            <p className="text-sm text-muted-foreground">
              Not directly. Printed Braille needs raised dots you can feel.
              Regular printers can't create tactile output. Use a Braille
              embosser or swell paper printer for physical Braille.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do some Braille characters look empty?</h3>
            <p className="text-sm text-muted-foreground">
              The empty Braille cell (⠐) represents no raised dots. It's used
              for spaces in 6-dot Braille. In Unicode, U+2800 is the blank
              pattern with all dots flat.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I learn to read Braille?</h3>
            <p className="text-sm text-muted-foreground">
              Start with the alphabet in Grade 1 Braille. Practice feeling dot
              patterns with your fingertips. Use online courses from organizations
              like the National Federation of the Blind. Consistent practice
              builds tactile recognition.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
