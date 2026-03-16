import React from "react"

export default function UnicodeCharacterLookupSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool searches the Unicode standard's database of over 149,000
            characters. You can search by character name, code point (like U+0041),
            or even partial descriptions to find the character you need.
          </p>
          <p>
            The lookup queries Unicode's character properties including the official
            name, category (letter, digit, symbol), block (Basic Latin, Emoji, etc.),
            and all encoding representations (UTF-8, UTF-16, HTML entity, decimal).
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Search examples:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">U+1F600</code>
                <span>Finds: 😀 GRINNING FACE</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">euro sign</code>
                <span>Finds: € U+20AC</span>
              </div>
            </div>
          </div>
          <p>
            Type your search and browse results. Click any character to see full
            details and copy it in various formats for use in your code or documents.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Finding the right special character for design</h3>
            <p className="text-sm text-muted-foreground">
              A designer needs a specific decorative element for a logo. They
              search "ornament" or "fleuron" to find decorative Unicode symbols
              like ❧ (U+2767) instead of using images.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Looking up HTML entities for web development</h3>
            <p className="text-sm text-muted-foreground">
              A developer needs to display a copyright symbol. They search
              "copyright" to find © (U+00A9) and copy the HTML entity &amp;copy;
              for their webpage.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Identifying unknown characters in data</h3>
            <p className="text-sm text-muted-foreground">
              Someone receives text with an unfamiliar symbol. They paste it
              into the lookup to see it's U+2022 (BULLET), helping them
              understand and document the data format.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Finding mathematical symbols for papers</h3>
            <p className="text-sm text-muted-foreground">
              A researcher writes a math paper and needs specific symbols.
              They search "partial differential" to find ∂ (U+2202) or
              "nabla" for ∇ (U+2207).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Discovering emoji for social media</h3>
            <p className="text-sm text-muted-foreground">
              A social media manager wants emoji for a post. They search
              "celebration" or "party" to find relevant emoji like 🎉 (U+1F389)
              and 🥳 (U+1F973).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Verifying character encoding in testing</h3>
            <p className="text-sm text-muted-foreground">
              A QA engineer tests internationalization. They look up specific
              characters from different scripts to verify their application
              handles the full Unicode range correctly.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Not all characters display everywhere.</strong>
              Your system needs fonts that support the characters. Rare scripts
              or new emoji may show as boxes if your font lacks the glyphs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some characters look identical but are different.</strong>
              Homoglyphs like Latin 'A' (U+0041) and Cyrillic 'А' (U+0410)
              look the same but have different code points. This matters for
              security and data matching.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Unicode versions add new characters.</strong>
              New Unicode versions add emoji and scripts. Older systems may
              not support the newest characters. Check your target platform's
              Unicode version.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some characters are combining sequences.</strong>
              Characters like é can be one code point (U+00E9) or two (e +
              combining acute). Both display the same but have different
              code points.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Security note:</strong> Be careful with homoglyphs in
              security contexts. Attackers can register domains with lookalike
              characters from different scripts. Always verify character codes
              for sensitive applications.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many Unicode characters are there?</h3>
            <p className="text-sm text-muted-foreground">
              Unicode 15.1 defines over 149,000 characters across 161 scripts.
              The standard continues to grow with new versions adding more
              characters, especially emoji and historic scripts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between ASCII and Unicode?</h3>
            <p className="text-sm text-muted-foreground">
              ASCII has 128 characters for English. Unicode includes ASCII
              plus characters from all writing systems, symbols, and emoji.
              Unicode's first 128 code points match ASCII exactly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I find a character's code point?</h3>
            <p className="text-sm text-muted-foreground">
              Paste the character into this lookup tool. It shows the code
              point (U+XXXX), official name, and all encoding formats. You
              can also use your OS's character map utility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What are Unicode blocks?</h3>
            <p className="text-sm text-muted-foreground">
              Blocks group related characters. Basic Latin (0000-007F) has
              ASCII. Latin-1 Supplement (0080-00FF) has accented letters.
              Emoji blocks contain emoji. Blocks help organize the character
              space.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I search by drawing a character?</h3>
            <p className="text-sm text-muted-foreground">
              This tool searches by name and code point. For handwriting
              recognition, use specialized tools like Shapecatcher or
              Unicode's character picker with radical search.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the highest Unicode code point?</h3>
            <p className="text-sm text-muted-foreground">
              The maximum is U+10FFFF, giving about 1.1 million possible
              code points. About 15% are assigned. The rest are reserved
              for future characters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I type Unicode characters?</h3>
            <p className="text-sm text-muted-foreground">
              Use your OS's input method. Windows: Alt+X after hex code.
              Mac: Character Viewer. Linux: Ctrl+Shift+U then hex code.
              Or copy-paste from this tool.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
