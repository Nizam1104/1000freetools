import React from "react"

export default function AsciiArtGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How It Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool transforms your input text into ASCII art by mapping each
            character to a pre-defined block pattern. Each letter becomes a small
            grid of characters (typically 5-7 lines tall) that when combined form
            recognizable text art.
          </p>

          <p>
            The generator uses character sets like block elements (███), hash symbols (###),
            or asterisks (**) to create the visual patterns. You can adjust the font size
            for display, brightness and contrast for visual effect, and choose different
            character styles for various aesthetics.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Character set options:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">Standard</code>
                <span>Block characters (███) - bold and clear</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">Simple</code>
                <span>Hash symbols (###) - classic terminal look</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">Minimal</code>
                <span>Asterisks (**) - lightweight and clean</span>
              </div>
            </div>
          </div>

          <p>
            After generating your ASCII art, you can copy it to the clipboard for pasting
            into code comments, README files, or terminal output. The download option
            saves the art as a plain text file for later use.
          </p>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

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

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Character limit applies to input text.</strong>
              The tool limits input to around 50 characters to keep the output
              manageable. Longer text produces very wide art that may not display
              correctly in all terminals or text editors.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Only basic characters are supported.</strong>
              The generator handles uppercase letters A-Z, digits 0-9, and common
              punctuation. Lowercase letters are converted to uppercase. Special
              characters and accented letters may not render correctly.
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
              <strong>Pro tip:</strong> For code comments, use the Simple or Minimal
              character set. Block characters can cause encoding issues in source
              files and may not display correctly in all IDEs.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I create multi-line ASCII art?</h3>
            <p className="text-sm text-muted-foreground">
              This tool generates single-line text art. For multi-line designs or
              complex images, use dedicated ASCII art generators that convert images
              to text or provide free-form drawing capabilities.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I preserve the art when pasting?</h3>
            <p className="text-sm text-muted-foreground">
              Always paste into a monospace font environment. In code editors, the
              formatting preserves automatically. In word processors, use "Paste as
              plain text" and apply a monospace font like Courier New.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my art look misaligned?</h3>
            <p className="text-sm text-muted-foreground">
              Misalignment usually means you're viewing the art in a proportional font
              where characters have different widths. Switch to a monospace font.
              Also ensure you're not mixing tabs and spaces in the output.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I customize the font patterns?</h3>
            <p className="text-sm text-muted-foreground">
              This tool uses predefined character sets. For custom fonts, you'd need
              to modify the source code or use a more advanced ASCII art tool that
              supports FIGlet or TOIlet font formats.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the maximum size I can create?</h3>
            <p className="text-sm text-muted-foreground">
              The input is limited to about 50 characters. The output height is fixed
              at 5-7 lines depending on the character set. For larger art, generate
              multiple sections and combine them manually.
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
            <h3 className="font-medium mb-2">Can I convert images to ASCII art?</h3>
            <p className="text-sm text-muted-foreground">
              This tool only converts text to ASCII art. For image conversion, use
              dedicated image-to-ASCII tools that analyze pixel brightness and map
              it to appropriate characters.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
