import React from "react"

export default function MarkdownCodeBlockFormatterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool formats and beautifies code inside Markdown code blocks.
            It parses the code, fixes indentation, applies consistent styling,
            and can add syntax highlighting information for proper rendering.
          </p>
          <p>
            The formatter auto-detects the programming language based on the
            code block's language hint (like <code className="font-mono bg-background px-1.5 py-0.5 rounded">```javascript</code>). It
            then applies language-specific formatting rules to ensure consistent
            style throughout your documentation.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">What the formatter does:</p>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li>Normalizes indentation (spaces vs tabs)</li>
              <li>Fixes inconsistent spacing and alignment</li>
              <li>Adds or corrects language identifiers</li>
              <li>Removes trailing whitespace</li>
              <li>Ensures consistent line endings</li>
              <li>Optionally wraps long lines</li>
            </ul>
          </div>
          <p>
            Paste your Markdown with code blocks, and the tool processes each
            block individually. The output maintains your document structure
            while ensuring all code is properly formatted and readable.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cleaning up code examples in documentation</h3>
            <p className="text-sm text-muted-foreground">
              A developer writes API docs with code snippets copied from
              various sources. The indentation is inconsistent. They run the
              docs through this formatter to normalize all code blocks before
              publishing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing tutorials for publication</h3>
            <p className="text-sm text-muted-foreground">
              Someone writes a coding tutorial with examples from their IDE.
              The code has their personal indentation style. They format it to
              match the publication's style guide before submitting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fixing code blocks from copy-paste</h3>
            <p className="text-sm text-muted-foreground">
              A Stack Overflow answer has code with broken indentation from
              copying. The author pastes it through this formatter to restore
              proper formatting before including it in their documentation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Standardizing team documentation style</h3>
            <p className="text-sm text-muted-foreground">
              A team has multiple contributors writing docs with different code
              styles. They use this formatter to ensure all code blocks follow
              the same indentation and formatting conventions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Adding missing language hints</h3>
            <p className="text-sm text-muted-foreground">
              Someone's Markdown has code blocks without language identifiers.
              The formatter detects the language and adds proper hints,
              enabling syntax highlighting when the docs are rendered.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing README files for GitHub</h3>
            <p className="text-sm text-muted-foreground">
              A developer has a README with code examples that look messy. They
              format all code blocks for consistent appearance before pushing
              to GitHub, making their project look more professional.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Formatting may change intended style.</strong>
              Code formatters apply opinionated rules. If your code uses
              specific formatting for alignment or emphasis, the formatter
              might change it. Review formatted output for important code.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Language detection isn't perfect.</strong>
              Auto-detection works well for common languages but may misidentify
              obscure languages or code snippets without context. Specify
              language hints explicitly when possible.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some code should stay unformatted.</strong>
              ASCII art, aligned comments, or output examples with specific
              spacing may break when formatted. Use plain text blocks for
              content that needs exact spacing preserved.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Long lines may wrap unexpectedly.</strong>
              If the formatter wraps long lines, it can break code that needs
              to stay on one line. Disable line wrapping for code where line
              length matters.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For documentation, consistency matters
              more than any specific style. Pick formatting settings and apply
              them uniformly across all your docs.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this add syntax highlighting?</h3>
            <p className="text-sm text-muted-foreground">
              It adds language identifiers that enable syntax highlighting when
              your Markdown is rendered. The actual highlighting depends on
              your rendering platform (GitHub, your docs site, etc.).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I configure the formatting style?</h3>
            <p className="text-sm text-muted-foreground">
              This tool provides standard formatting. For custom styles (like
              specific tab widths or brace positions), you'd need a
              language-specific formatter like Prettier or ESLint with custom
              config.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What languages are supported?</h3>
            <p className="text-sm text-muted-foreground">
              Common languages like JavaScript, Python, Java, C++, Go, Ruby,
              and more are supported. The formatter uses language-specific
              rules for each. Exotic languages may fall back to generic
              formatting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will this break my code?</h3>
            <p className="text-sm text-muted-foreground">
              Formatting shouldn't change code behavior. It only adjusts
              whitespace and indentation. However, always review formatted
              code, especially for languages where whitespace matters (like
              Python).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it handle multiple code blocks?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. The formatter processes all code blocks in your Markdown
              document. Each block is formatted according to its specified
              language, preserving the document structure.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I format inline code?</h3>
            <p className="text-sm text-muted-foreground">
              Inline code (<code className="font-mono bg-background px-1.5 py-0.5 rounded">like this</code>) is typically left as-is since
              it's meant for short identifiers. This tool focuses on block code
              where formatting has more impact on readability.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I preserve intentional formatting?</h3>
            <p className="text-sm text-muted-foreground">
              For code that needs exact spacing (like aligned columns), use a
              plain text block (no language hint) or wrap in a section marked
              to skip formatting. Some formatters support ignore comments.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work with terminal output examples?</h3>
            <p className="text-sm text-muted-foreground">
              Terminal output should use plain text blocks (no language or{" "}
              <code className="font-mono bg-background px-1.5 py-0.5 rounded">text</code>). The formatter won't modify plain text blocks,
              preserving your output examples exactly as written.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
