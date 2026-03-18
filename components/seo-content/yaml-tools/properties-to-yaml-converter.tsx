import React from "react"

export default function PropertiesToYamlConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How Properties to YAML Conversion Works</h2>

        <div className="space-y-3 text-muted-foreground">
          <p>
            Properties to YAML conversion transforms flat Java .properties files into structured YAML format. Dot-separated keys are intelligently nested to create hierarchical YAML structures that are more readable and maintainable.
          </p>

          <p>
            This tool parses each properties line, splits keys on dots to determine nesting levels, and builds a YAML tree. Special characters and escape sequences are properly handled to preserve exact values.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="text-sm font-medium">Here's the process:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Properties file is parsed line by line</li>
              <li>Dot-separated keys are split into path segments</li>
              <li>Nested YAML structure is built from paths</li>
              <li>Values are unescaped and formatted as YAML</li>
            </ol>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example conversion:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">{`Properties Input:
database.host=localhost
database.port=5432

YAML Output:
database:
  host: localhost
  port: 5432`}</pre>
          </div>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Modernizing Java configurations</h3>
            <p className="text-sm text-muted-foreground">
              Convert legacy .properties to modern YAML. Spring Boot and other Java frameworks support YAML—upgrade your configs for better readability and structure.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Improving config readability</h3>
            <p className="text-sm text-muted-foreground">
              Transform flat properties into hierarchical YAML. Nested structure makes relationships between settings obvious and configs easier to understand.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Microservices migration</h3>
            <p className="text-sm text-muted-foreground">
              Update monolith configs for microservices. Convert properties files to YAML as part of migrating to containerized, cloud-native architectures.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Documentation improvement</h3>
            <p className="text-sm text-muted-foreground">
              Create better-documented configurations. YAML supports comments and clearer structure, making it easier to document configuration options.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Team onboarding</h3>
            <p className="text-sm text-muted-foreground">
              Make configs easier for new team members. YAML's visual structure helps newcomers understand configuration relationships faster than flat properties.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Configuration comparison</h3>
            <p className="text-sm text-muted-foreground">
              Compare configs across environments. Convert all to YAML for easier visual comparison and diff tool compatibility.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know About the Conversion</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Nesting is inferred from dots.</strong> Keys like app.database.host become nested YAML. Inconsistent key naming may produce awkward structures.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Lists require special format.</strong> Properties lists (mylist.0, mylist.1) convert to YAML arrays. Ensure your properties follow list conventions.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Escape sequences are handled.</strong> Java escape sequences (\n, \t, \uXXXX) are properly converted to YAML equivalents or literal characters.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Comments are preserved.</strong> Properties comments (! or #) are converted to YAML # comments, maintaining your documentation.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Review the output structure after conversion. Some properties files may benefit from manual restructuring to create more logical YAML hierarchies.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will all properties convert cleanly?</h3>
            <p className="text-sm text-muted-foreground">
              Most do. Simple key=value pairs convert perfectly. Complex cases (inconsistent key patterns, special list formats) may need manual adjustment after conversion.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does Spring Boot support the output?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Spring Boot natively supports YAML configuration files. The converted output works directly with @ConfigurationProperties and @Value annotations.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are lists handled?</h3>
            <p className="text-sm text-muted-foreground">
              Properties with indexed keys (items.0, items.1) become YAML arrays. Comma-separated values may also be converted to arrays depending on the format.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert back to properties?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, the conversion is reversible. Use the YAML to Properties converter to flatten YAML back to dot-notation properties format.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about Unicode characters?</h3>
            <p className="text-sm text-muted-foreground">
              Unicode escape sequences (\uXXXX) are converted to actual Unicode characters in YAML. YAML supports UTF-8 natively, so escapes aren't needed.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this validate the properties file?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, invalid properties lines are reported. The converter identifies syntax errors in the input before attempting conversion.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my data sent anywhere?</h3>
            <p className="text-sm text-muted-foreground">
              No. All conversion happens locally in your browser. Your configuration data never leaves your computer. Works offline after page load.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
