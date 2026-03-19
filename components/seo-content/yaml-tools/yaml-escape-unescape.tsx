import React from "react"

export default function YamlEscapeUnescapeSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How YAML Escaping and Unescaping Works</h2>

        <div className="space-y-3 text-muted-foreground">
          <p>
            YAML escaping adds necessary quotes and escape characters to strings that contain special characters. This ensures YAML parsers interpret your values correctly without syntax errors.
          </p>

          <p>
            Unescaping reverses the process, removing unnecessary quotes and converting escape sequences back to literal characters. This makes YAML more human-readable while maintaining validity.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="text-sm font-medium">Here's what gets escaped:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Colons followed by space (key/value separator)</li>
              <li>Hash symbols (comment indicator)</li>
              <li>Quotes (string delimiters)</li>
              <li>Backslashes (escape character)</li>
              <li>Leading/trailing spaces</li>
              <li>Control characters (newlines, tabs)</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">{`Unescaped: Hello: World # comment
Escaped: "Hello: World # comment"

Unescaped: Path: C:\new\file
Escaped: "Path: C:\\new\\file"`}</pre>
          </div>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Windows file paths</h3>
            <p className="text-sm text-muted-foreground">
              Handle backslashes in Windows paths. YAML uses backslash as escape character—paths like C:\new\file need escaping to prevent parsing errors.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Database connection strings</h3>
            <p className="text-sm text-muted-foreground">
              Escape special characters in connection URLs. Connection strings often contain colons, slashes, and special characters that need proper quoting.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Regular expressions</h3>
            <p className="text-sm text-muted-foreground">
              Include regex patterns in YAML config. Regex contains many special characters (backslashes, quotes) that must be escaped for YAML parsing.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">User-generated content</h3>
            <p className="text-sm text-muted-foreground">
              Safely include user input in YAML configs. Escape any user-provided strings to prevent YAML injection or parsing failures.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Multi-line text cleanup</h3>
            <p className="text-sm text-muted-foreground">
              Convert multi-line strings to escaped single-line format. Useful for embedding text in contexts where multi-line YAML blocks aren't supported.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">YAML debugging</h3>
            <p className="text-sm text-muted-foreground">
              Fix parsing errors caused by unescaped characters. When YAML fails to parse, use this to identify and escape problematic characters.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know About YAML Escaping</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Not all strings need escaping.</strong> Simple strings without special characters don't need quotes. Over-quoting reduces readability without adding value.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Single vs double quotes differ.</strong> Double quotes process escape sequences (\n becomes newline). Single quotes treat everything literally ('\\n' is backslash-n).
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some characters always need escaping.</strong> Colons followed by space, leading/trailing spaces, and certain special chars always require quotes or escaping.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Block scalars are alternatives.</strong> For multi-line text, consider YAML block scalars (| or &gt;) instead of escaping newlines.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> When in doubt, quote strings. While YAML allows unquoted strings in many cases, quoting ensures consistent interpretation across different parsers.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When do I need to quote strings?</h3>
            <p className="text-sm text-muted-foreground">
              Quote when strings contain: colons+space, #, leading/trailing spaces, or look like numbers/booleans. Also quote for consistency in team environments.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between ' and "?</h3>
            <p className="text-sm text-muted-foreground">
              Double quotes process escape sequences (\n, \t, \\). Single quotes are literal—everything inside is taken as-is except '' which becomes a single quote.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I include a literal backslash?</h3>
            <p className="text-sm text-muted-foreground">
              In double quotes: use \\\\ (escaped backslash). In single quotes: use \\\\ (two backslashes). Windows paths often need this treatment.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I escape newlines?</h3>
            <p className="text-sm text-muted-foreground">
              In double quotes: \\n represents a newline character. For actual multi-line strings, use block scalars (| for literal, &gt; for folded) instead of escaping.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my number need quotes?</h3>
            <p className="text-sm text-muted-foreground">
              Strings that look like numbers (123, 1.5) or booleans (true, false, yes, no) may be auto-converted by parsers. Quote them to preserve as strings.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this validate my YAML?</h3>
            <p className="text-sm text-muted-foreground">
              This tool escapes/unescapes strings but doesn't fully validate YAML structure. Use a YAML validator to check overall document syntax.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my data secure?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. All processing happens in your browser. Your YAML content never leaves your computer. This tool works completely offline.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
