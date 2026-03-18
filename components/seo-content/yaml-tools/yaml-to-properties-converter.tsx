import React from "react"

export default function YamlToPropertiesConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How YAML to Properties Conversion Works</h2>

        <div className="space-y-3 text-muted-foreground">
          <p>
            YAML to Properties conversion flattens nested YAML structures into Java .properties format. Each nested path becomes a dot-separated key, and YAML values become property values with proper escaping.
          </p>

          <p>
            This tool handles special characters by escaping them according to Java properties specification. Unicode characters can be preserved or converted to \uXXXX escape sequences depending on your needs.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="text-sm font-medium">Here's the process:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>YAML is parsed into a nested data structure</li>
              <li>Nested paths are flattened with dot notation</li>
              <li>Values are escaped for properties format</li>
              <li>Output is valid .properties file content</li>
            </ol>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example conversion:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">{`YAML Input:
database:
  host: localhost
  port: 5432

Properties Output:
database.host=localhost
database.port=5432`}</pre>
          </div>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Spring Boot migration</h3>
            <p className="text-sm text-muted-foreground">
              Convert legacy .properties files to YAML or vice versa. Spring Boot supports both formats—use this to migrate between them during project modernization.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Java application configuration</h3>
            <p className="text-sm text-muted-foreground">
              Generate .properties files from YAML source of truth. Maintain configs in readable YAML, deploy as properties for Java applications that expect that format.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Internationalization files</h3>
            <p className="text-sm text-muted-foreground">
              Create i18n resource bundles. Convert YAML translations to .properties format for Java's ResourceBundle system used in localization.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Legacy system integration</h3>
            <p className="text-sm text-muted-foreground">
              Interface with older Java systems requiring .properties. Modern tools use YAML, but legacy systems may only accept properties format.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Build process automation</h3>
            <p className="text-sm text-muted-foreground">
              Generate properties files during build. Keep source configs in YAML, automatically generate .properties as part of your CI/CD pipeline.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Configuration comparison</h3>
            <p className="text-sm text-muted-foreground">
              Compare YAML configs with existing properties files. Convert to same format for diff tools to accurately show configuration differences.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know About Properties Format</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Nested structure becomes flat.</strong> YAML hierarchy is flattened to dot-separated keys. database.connection.host becomes database.connection.host in properties.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Special characters are escaped.</strong> Colons, equals signs, and backslashes in values are escaped with backslashes. Unicode can be escaped as \uXXXX.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Lists become indexed keys.</strong> YAML arrays convert to properties with numeric suffixes: mylist[0], mylist[1], etc., or mylist.0, mylist.1.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Comments use different syntax.</strong> YAML # comments become properties ! or # comments. Comment style changes but comments are preserved.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Spring Boot can read YAML directly—consider keeping YAML format if you're using Spring. Only convert to properties if required by specific tools or legacy systems.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are lists supported in properties?</h3>
            <p className="text-sm text-muted-foreground">
              Not natively. Lists are converted to indexed keys (list.0, list.1) or comma-separated values depending on convention. The receiving application must understand the convention.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about complex nested structures?</h3>
            <p className="text-sm text-muted-foreground">
              All nesting is flattened with dots. Deep nesting creates long key names. Very deep structures may be awkward in properties format—consider keeping as YAML.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is the conversion reversible?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, with limitations. Simple structures convert back cleanly. Complex cases (lists, special keys) may not round-trip perfectly. Keep YAML as source of truth.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are Unicode characters handled?</h3>
            <p className="text-sm text-muted-foreground">
              Unicode can be preserved as UTF-8 or escaped as \uXXXX sequences. Properties files traditionally used ASCII with Unicode escapes, but modern Java supports UTF-8.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can Spring Boot read the output?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Spring Boot natively supports .properties files. The converted output works directly with Spring's @Value and @ConfigurationProperties.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this preserve comments?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, comments are converted from YAML # style to properties ! or # style. Comment placement is preserved as closely as possible.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my data sent to a server?</h3>
            <p className="text-sm text-muted-foreground">
              No. All conversion happens locally in your browser. Your configuration data never leaves your computer. This tool works offline after page load.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
