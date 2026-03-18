import React from "react"

export default function PropertiesToTomlConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Properties to TOML Converter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool converts Java .properties files into TOML configuration format. Paste your KEY=value pairs and get properly structured TOML with sections, appropriate types, and clean formatting.
          </p>
          <p>
            The converter parses .properties syntax, handles escaped characters, and reconstructs hierarchy from dot-notation keys. Properties like database.host and database.port become a [database] table in TOML with host and port keys.
          </p>
          <p>
            Output is valid TOML with proper quoting, type inference (numbers, booleans, strings), and section organization. Copy into your config.toml file or use it to migrate Java projects to modern TOML configuration.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Modernizing Java application configs</h3>
            <p className="text-sm text-muted-foreground">
              Moving from .properties to TOML? Convert existing configs while maintaining settings. TOML offers better structure and readability than flat properties.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Migrating Spring Boot applications</h3>
            <p className="text-sm text-muted-foreground">
              Spring Boot supports multiple config formats. Convert application.properties to TOML for cleaner hierarchical configuration. Same settings, better organization.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Unifying configs across languages</h3>
            <p className="text-sm text-muted-foreground">
              Your polyglot project uses different config formats. Standardize on TOML. Convert Java .properties, YAML, JSON configs to one consistent format.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Improving config readability</h3>
            <p className="text-sm text-muted-foreground">
              Large .properties files are hard to navigate. Convert to TOML with sections. Related settings grouped together. Easier to find and modify configurations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating config documentation</h3>
            <p className="text-sm text-muted-foreground">
              TOML supports comments and structure. Convert .properties to TOML, add documentation comments. Better than .properties for documenting configuration options.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building migration tools</h3>
            <p className="text-sm text-muted-foreground">
              Creating a config migration tool? Use this converter as reference. Understand how .properties maps to TOML for building automated migration scripts.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Dot notation becomes sections.</strong>
              Keys like db.connection.host become [db.connection] section with host key. The converter detects hierarchy from dot-separated keys.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Type inference from string values.</strong>
              .properties values are all strings. The converter guesses types: "42" → integer, "true" → boolean. Review and adjust types as needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Comments are preserved.</strong>
              .properties comments (# or !) transfer to TOML comments (#). Use comments to document what each setting does for future maintainers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Unicode escapes are converted.</strong>
              Java \uXXXX escapes become actual Unicode characters in TOML. TOML supports UTF-8 natively. No need for escape sequences.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Review the generated TOML structure. You might want to reorganize sections for better logical grouping. TOML's flexibility lets you improve on the original .properties organization.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are keys grouped into sections?</h3>
            <p className="text-sm text-muted-foreground">
              Common prefixes become sections. database.url, database.user → [database] with url and user keys. The converter detects shared prefixes automatically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about properties without dots?</h3>
            <p className="text-sm text-muted-foreground">
              Flat keys (no dots) become top-level TOML keys. They appear before any sections. Mix of flat and hierarchical keys is valid in TOML.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert back from TOML to .properties?</h3>
            <p className="text-sm text-muted-foreground">
              This tool does .properties to TOML. For TOML to .properties, flatten sections to dot-notation keys. Many TOML libraries can help with this.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are lists handled?</h3>
            <p className="text-sm text-muted-foreground">
              Java .properties doesn't have native lists. Common patterns: comma-separated or indexed keys. Converter detects these and creates TOML arrays.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about property value escapes?</h3>
            <p className="text-sm text-muted-foreground">
              Java escapes (\n, \t, \\) are converted to TOML equivalents. TOML uses different escape sequences. The converter handles the translation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does Spring Boot support TOML?</h3>
            <p className="text-sm text-muted-foreground">
              Not natively. You'd need a custom PropertySource loader. Consider YAML instead—Spring Boot supports it natively and preserves structure like TOML.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I load TOML in Java?</h3>
            <p className="text-sm text-muted-foreground">
              Use a TOML library like tomllib-java or toml4j. Load and parse TOML, then map to your configuration objects. More work than .properties but doable.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
