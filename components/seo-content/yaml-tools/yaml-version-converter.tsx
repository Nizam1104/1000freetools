import React from "react"

export default function YamlVersionConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How YAML Version and Format Conversion Works</h2>

        <div className="space-y-3 text-muted-foreground">
          <p>
            YAML version conversion handles differences between YAML 1.1 and YAML 1.2 specifications. While mostly compatible, there are subtle differences in type inference, boolean values, and octal number handling that this tool manages.
          </p>

          <p>
            Format conversion also includes style transformations: changing indentation, adjusting quoting rules, converting between flow and block style, and normalizing line endings for consistent output.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="text-sm font-medium">Key differences handled:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>YAML 1.1: yes/no, on/off are booleans; 1.2: only true/false</li>
              <li>YAML 1.1: leading zero means octal; 1.2: requires 0o prefix</li>
              <li>YAML 1.1: ~ means null; 1.2: also supports null and Null</li>
              <li>Indentation style and width normalization</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-green-500/30 bg-green-500/10 p-4">
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>Recommendation:</strong> YAML 1.2 is the current standard (ISO/IEC 19322). Use 1.2 for new projects unless you have specific compatibility requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Version compatibility</h3>
            <p className="text-sm text-muted-foreground">
              Ensure YAML works across tools. Some tools require specific YAML versions—convert to match your toolchain requirements.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Standardization</h3>
            <p className="text-sm text-muted-foreground">
              Standardize on YAML 1.2. Convert legacy YAML 1.1 files to current standard for consistency across projects.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Format normalization</h3>
            <p className="text-sm text-muted-foreground">
              Normalize formatting across team. Convert all YAML to consistent indentation, quoting, and style regardless of author.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Legacy system support</h3>
            <p className="text-sm text-muted-foreground">
              Support older YAML parsers. Some legacy systems only support YAML 1.1—convert modern YAML for compatibility.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">CI/CD pipeline consistency</h3>
            <p className="text-sm text-muted-foreground">
              Ensure consistent YAML in pipelines. Normalize format to prevent spurious diffs and ensure predictable parsing.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cross-platform sharing</h3>
            <p className="text-sm text-muted-foreground">
              Share YAML across platforms. Normalize line endings (CRLF vs LF) for clean cross-platform version control.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know About YAML Versions</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">YAML 1.2 is the ISO standard.</strong> YAML 1.2 was published as ISO/IEC 19322 in 2014. It's the current standard and recommended for new projects.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Boolean values differ.</strong> YAML 1.1 accepts yes/no, on/off, true/false as booleans. YAML 1.2 only recognizes true/false as booleans.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Octal numbers changed.</strong> YAML 1.1: 0666 is octal. YAML 1.2: 0o666 is octal, 0666 is decimal. This affects file permission configs.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Most YAML is compatible.</strong> The vast majority of YAML works identically in both versions. Only edge cases with specific values differ.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Add %YAML 1.2 directive at the top of files to explicitly declare version. This helps parsers handle your YAML correctly.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the main difference between 1.1 and 1.2?</h3>
            <p className="text-sm text-muted-foreground">
              Main differences: boolean recognition (yes/no), octal number syntax (0666 vs 0o666), and some Unicode handling. Most YAML works in both.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Which version should I use?</h3>
            <p className="text-sm text-muted-foreground">
              Use YAML 1.2 for new projects—it's the ISO standard. Only use 1.1 if you have legacy tool compatibility requirements.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does version affect my data?</h3>
            <p className="text-sm text-muted-foreground">
              Only for specific edge cases: values like "yes", "no", "on", "off", and numbers with leading zeros. Regular strings and structures are unaffected.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I change indentation style?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Convert between 2-space, 4-space, or tab indentation. Choose based on your project's style guide or team preferences.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about line endings?</h3>
            <p className="text-sm text-muted-foreground">
              Convert between Unix (LF) and Windows (CRLF) line endings. Use LF for cross-platform projects, CRLF for Windows-only environments.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this validate my YAML?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. The converter validates YAML during processing. Syntax errors are reported before conversion attempts.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my data secure?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. All conversion happens locally in your browser. Your YAML content never leaves your computer.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
