import React from "react"

export default function AsciiArtGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            The generator maps each character in your input to a small block
            pattern and prints those patterns side by side. The result is a
            banner made of text characters that is 5 lines tall.
          </p>

          <p>
            Everything runs in your browser. Nothing is uploaded. You can switch
            between character sets like Unicode block elements (███), hashes (###),
            or asterisks (**). The font size control affects on screen preview
            only. The text you copy or download is plain text.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Character set options</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">Standard</code>
                <span>Block characters (███), bold and clear</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">Simple</code>
                <span>Hash symbols (###), classic terminal look</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">Minimal</code>
                <span>Asterisks (**), lightweight and clean</span>
              </div>
            </div>
          </div>

          <p>
            When you are happy with the preview, copy the banner to your
            clipboard or download it as a .txt file for later use.
          </p>
        </div>
      </section>

      {/* Specific use cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating README headers for GitHub</h3>
            <p className="text-sm text-muted-foreground">
              A developer wants their project's README to stand out. They generate
              ASCII art for the project name and paste it at the top of the file.
              The art displays correctly in any text editor and adds visual appeal
              without requiring images.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Adding banners to CLI tool output</h3>
            <p className="text-sm text-muted-foreground">
              A developer builds a command-line tool and wants a welcome banner when
              users run it. They generate ASCII art for the tool name and embed it
              in the source code as a multi-line string that prints on startup.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Making code comments more visible</h3>
            <p className="text-sm text-muted-foreground">
              A programmer marks major sections in a large source file with ASCII
              art headers. The "SECTION: DATABASE CONNECTIONS" banner in ASCII art
              is much easier to spot when scrolling through hundreds of lines.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating signatures for forum posts</h3>
            <p className="text-sm text-muted-foreground">
              A forum user creates a unique ASCII art signature with their username
              or handle. The art works in any text-based environment and doesn't
              rely on external images that might break.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing terminal-based games</h3>
            <p className="text-sm text-muted-foreground">
              A developer creates a roguelike game that runs entirely in the terminal.
              They use ASCII art for the title screen, game over messages, and level
              transitions to maintain the retro aesthetic.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Making log files easier to navigate</h3>
            <p className="text-sm text-muted-foreground">
              A DevOps engineer adds ASCII art section markers to long log files.
              When searching through gigabytes of logs, the distinctive patterns
              help quickly locate specific sections or test runs.
            </p>
          </div>
        </div>
      </section>

      {/* What to know before using it */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Short inputs work best.</strong>
              The input is limited to 50 characters. Very long banners become
              wide and hard to read in narrow editors or terminals.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Stick to simple characters.</strong>
              Uppercase letters and digits render most reliably. Some symbols or
              accented characters may appear as spaces in the output.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Monospace fonts display best.</strong>
              ASCII art assumes each character has equal width. In proportional fonts,
              the alignment breaks and the art looks distorted. Always view the output
              in a monospace font like Courier, Consolas, or Monaco.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Block characters may not render everywhere.</strong>
              The Standard character set uses Unicode block elements (███). Some
              older terminals or systems may not display these correctly. Use Simple
              or Minimal sets for maximum compatibility.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For code comments, prefer the Simple or Minimal
              sets. Block elements can trigger encoding issues in some IDEs or when
              reviewing diffs on the web.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How tall is the output?</h3>
            <p className="text-sm text-muted-foreground">
              Banners are 5 lines tall. The width grows with your input length and
              the chosen character set.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I preserve alignment when pasting?</h3>
            <p className="text-sm text-muted-foreground">
              Always paste into a monospace font environment. In code editors, the
              spacing is preserved automatically. In word processors, use "Paste as
              plain text" and then apply a monospace font like Courier New.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do some characters disappear?</h3>
            <p className="text-sm text-muted-foreground">
              Some symbols and accented letters are not represented in the built in
              patterns and may render as spaces. Use uppercase letters and numbers
              for best results.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I customize the font patterns?</h3>
            <p className="text-sm text-muted-foreground">
              This tool ships with three predefined sets. For custom fonts, use a
              FIGlet compatible generator or modify the source code.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the maximum size I can create?</h3>
            <p className="text-sm text-muted-foreground">
              Input is capped at 50 characters. Height is fixed at 5 lines. For
              larger banners, split your text into multiple sections and stack them
              manually.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I use this in Python code?</h3>
            <p className="text-sm text-muted-foreground">
              Copy the generated art and paste it as a multi-line string. Use triple
              quotes: art = """[paste art here]""". Print it with print(art). For
              comments, prefix each line with #.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert images to ASCII here?</h3>
            <p className="text-sm text-muted-foreground">
              This page converts text into ASCII banners only. For image to ASCII,
              use a dedicated image converter that samples pixels and maps
              brightness to characters.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does any of my text leave the browser?</h3>
            <p className="text-sm text-muted-foreground">
              No. The generator runs entirely client side. Copy and download actions
              produce plain text on your device.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
