import React from "react"

export default function TextToAsciiArtSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool converts text into ASCII art—large decorative text made
            from regular ASCII characters. Each letter maps to a pattern of
            characters arranged to form the letter's shape at a larger scale.
          </p>
          <p>
            The converter uses predefined character patterns (fonts) where
            each letter is represented as a grid of characters. Common fonts
            use blocks (█), slashes (/), or standard characters to create
            the letter shapes.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example output styles:</p>
            <pre className="text-xs font-mono bg-background p-3 rounded overflow-x-auto">
{`  _   _      _ _        ___ 
 | | | | ___| | | ___  / _ \\
 | |_| |/ _ \\ | |/ _ \\| | | |
 |  _  |  __/ | | (_) | |_| |
 |_| |_|\\___|_|_|\\___/ \\___/ `}
            </pre>
          </div>
          <p>
            Type your text and select a font style. The tool generates ASCII
            art instantly. Copy the output for use in code comments, README
            files, terminal banners, or text documents.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating README headers for GitHub projects</h3>
            <p className="text-sm text-muted-foreground">
              A developer adds a decorative banner to their open source
              project's README. The ASCII art title makes the project stand
              out and adds personality to the documentation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Making terminal application banners</h3>
            <p className="text-sm text-muted-foreground">
              A sysadmin writes a shell script and adds an ASCII art banner
              that displays when the script runs. It makes the tool feel
              more polished and professional.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Adding decorative code comments</h3>
            <p className="text-sm text-muted-foreground">
              A programmer creates ASCII art section headers in their code
              to mark major divisions. The decorative comments make the
              code structure visually clear.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating text-based logos</h3>
            <p className="text-sm text-muted-foreground">
              Someone needs a logo for a text-only medium like IRC, email
              signatures, or code. ASCII art lets them create a recognizable
              visual identity using only characters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Making retro-style graphics</h3>
            <p className="text-sm text-muted-foreground">
              A game developer creates ASCII art for a roguelike game. The
              text-based graphics fit the retro aesthetic and work in any
              terminal without images.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing printable text art</h3>
            <p className="text-sm text-muted-foreground">
              A teacher creates worksheets with ASCII art headers for
              computer science class. Students can see how characters
              combine to create larger images.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">ASCII art requires monospace fonts.</strong>
              The art only looks correct with monospace (fixed-width) fonts.
              In proportional fonts, the alignment breaks. Use monospace
              when displaying ASCII art.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Line length matters for copy-paste.</strong>
              Long ASCII art may wrap incorrectly when pasted into editors
              with narrow windows. Keep lines under 80 characters for best
              compatibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some fonts use extended ASCII characters.</strong>
              Block characters (█) and special symbols may not display
              correctly on all systems. Standard ASCII fonts work everywhere.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Input length is typically limited.</strong>
              Long text creates very wide ASCII art. Most tools limit input
              to 20-30 characters for practical output sizes.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For code comments, use simple fonts
              that don't rely on special characters. Comments with extended
              ASCII may cause encoding issues in source files.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What fonts are available for ASCII art?</h3>
            <p className="text-sm text-muted-foreground">
              Common fonts include Standard (blocks), Simple (basic chars),
              Slant (italicized), Bubble (rounded), and many more. Each
              gives a different visual style.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert images to ASCII art?</h3>
            <p className="text-sm text-muted-foreground">
              This tool converts text to ASCII art. For image-to-ASCII
              conversion, use a dedicated image ASCII converter that maps
              pixel brightness to characters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I preserve ASCII art formatting?</h3>
            <p className="text-sm text-muted-foreground">
              Use triple backticks in Markdown, {'<pre>'} tags in HTML, or
              code blocks in documentation. These preserve spacing and
              monospace formatting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my ASCII art look wrong?</h3>
            <p className="text-sm text-muted-foreground">
              Check that you're using a monospace font. Proportional fonts
              make characters different widths, breaking the alignment.
              Also verify line breaks are preserved.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use ASCII art in emails?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but with caveats. Email clients may reflow text or use
              proportional fonts. Keep ASCII art simple and test how it
              renders in different email clients.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the history of ASCII art?</h3>
            <p className="text-sm text-muted-foreground">
              ASCII art originated in the 1960s with early computers and
              teletype machines. It flourished in the BBS era (1980s-90s)
              when graphics weren't practical. It's still used for
              text-only environments.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I make ASCII art smaller?</h3>
            <p className="text-sm text-muted-foreground">
              Choose a font with smaller character grids. Some fonts are
              5 characters tall, others 10+. Smaller fonts produce more
              compact ASCII art.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
