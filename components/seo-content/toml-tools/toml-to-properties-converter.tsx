import React from "react"

export default function TomlToPropertiesConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the TOML to Properties Converter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool converts TOML configuration files into Java .properties file format. Paste your TOML content and get flat KEY=value pairs compatible with Java's Properties class, Spring Boot, and other Java frameworks.
          </p>
          <p>
            The converter flattens TOML's hierarchical structure into dot-notation keys. A TOML table [database] with key "host" becomes database.host in properties format. Nested tables create deeper key hierarchies.
          </p>
          <p>
            Output follows Java properties syntax: key=value pairs, one per line. Special characters are escaped properly. Comments from TOML are preserved as Java comments. Copy into application.properties or load with Properties.load().
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating Spring Boot properties files</h3>
            <p className="text-sm text-muted-foreground">
              Your Spring Boot app needs application.properties. Define config in TOML, convert to properties format. Spring Boot handles dot-notation automatically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Migrating to legacy Java systems</h3>
            <p className="text-sm text-muted-foreground">
              Older Java apps require .properties files. Modernize your workflow: edit in TOML, convert to properties for deployment. Best of both worlds.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating Java resource bundles</h3>
            <p className="text-sm text-muted-foreground">
              Store localized strings in TOML, convert to properties files for Java i18n. One TOML per language, generate messages_en.properties, messages_de.properties, etc.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building JDBC connection configs</h3>
            <p className="text-sm text-muted-foreground">
              Database connection properties work well in .properties format. Define in TOML, convert for JDBC or connection pool configuration like HikariCP.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Generating build configuration</h3>
            <p className="text-sm text-muted-foreground">
              Build tools like Gradle use properties files. Define build settings in TOML, convert to gradle.properties. Better organization than raw properties.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Standardizing config across projects</h3>
            <p className="text-sm text-muted-foreground">
              Your organization uses TOML for new projects but has legacy .properties files. Convert between formats as needed during migration periods.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Properties files are flat.</strong>
              Java .properties has no nested structure. TOML tables become dot-separated keys. [db.connection] host becomes db.connection.host.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Special characters need escaping.</strong>
              Properties files escape colons, equals signs, and backslashes. The converter handles this. Unicode can use \uXXXX notation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Arrays become indexed keys.</strong>
              TOML arrays convert to keys like myarray.0, myarray.1, myarray.2. Your Java code needs to iterate over indexed keys to reconstruct arrays.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Type information is lost.</strong>
              Properties files store everything as strings. "42" and "forty-two" both become strings. Your Java code parses types as needed.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For Spring Boot, consider keeping TOML and using a custom loader, or convert to YAML. Spring Boot supports YAML natively and preserves structure better than flat properties files.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I load properties in Java?</h3>
            <p className="text-sm text-muted-foreground">
              Use {"Properties props = new Properties(); props.load(inputStream);"}. Then access with {"props.getProperty(\"key\")"}. Spring injects {"@Value(\"${key}\")"}.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert back from properties to TOML?</h3>
            <p className="text-sm text-muted-foreground">
              This tool does TOML to properties. For properties to TOML, parse dot-notation keys and reconstruct nested structure. Dedicated tools exist for this.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about boolean and number types?</h3>
            <p className="text-sm text-muted-foreground">
              Properties stores everything as strings. "true", "42", "3.14" are all strings. Java code parses them: Boolean.parseBoolean(), Integer.parseInt(), etc.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle lists in properties?</h3>
            <p className="text-sm text-muted-foreground">
              Spring Boot supports comma-separated: key=item1,item2,item3. Or indexed: key[0]=a, key[1]=b. The converter uses indexed format for clarity.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use UTF-8 in properties files?</h3>
            <p className="text-sm text-muted-foreground">
              Traditional properties use ISO-8859-1 with \u escapes. Java 6+ supports XML properties with UTF-8. Modern Java often uses UTF-8 directly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the properties file encoding?</h3>
            <p className="text-sm text-muted-foreground">
              Default is ISO-8859-1 (Latin-1). For Unicode, use \uXXXX escapes or XML properties format. Modern Java applications often use UTF-8 directly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I comment properties files?</h3>
            <p className="text-sm text-muted-foreground">
              Lines starting with # or ! are comments. The converter preserves TOML comments as Java comments. Use comments to document configuration options.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
