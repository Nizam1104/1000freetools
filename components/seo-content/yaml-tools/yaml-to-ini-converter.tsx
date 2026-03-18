import React from "react"

export default function YamlToIniConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How YAML to INI Conversion Works</h2>

        <div className="space-y-3 text-muted-foreground">
          <p>
            YAML to INI conversion transforms hierarchical YAML structures into the classic INI file format. Top-level YAML keys become INI sections (in brackets), and nested key-value pairs become section properties.
          </p>

          <p>
            This tool handles the structural differences between formats: YAML's unlimited nesting maps to INI's flat sections. Deep nesting is flattened using dot notation or similar conventions within section names.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="text-sm font-medium">Here's the process:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>YAML is parsed into nested structure</li>
              <li>Top-level keys become INI sections [section]</li>
              <li>Nested values become key=value pairs</li>
              <li>Deep nesting is flattened with delimiters</li>
            </ol>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example conversion:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">{`YAML Input:
database:
  host: localhost
  port: 5432

INI Output:
[database]
host = localhost
port = 5432`}</pre>
          </div>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Legacy system integration</h3>
            <p className="text-sm text-muted-foreground">
              Configure older Windows applications. Many legacy programs only accept INI format—convert modern YAML configs for compatibility.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">PHP application configuration</h3>
            <p className="text-sm text-muted-foreground">
              Generate INI files for PHP apps. PHP has native parse_ini_file() function—convert YAML source configs to INI for PHP consumption.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Windows application configs</h3>
            <p className="text-sm text-muted-foreground">
              Create configs for Windows software. Many Windows applications still use INI files for settings storage and configuration.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Game configuration files</h3>
            <p className="text-sm text-muted-foreground">
              Generate game config files. Many games use INI format for settings—create configs from YAML templates for easier management.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cross-platform compatibility</h3>
            <p className="text-sm text-muted-foreground">
              Maintain configs in YAML, deploy as INI. Use YAML for editing and version control, convert to INI for applications that require it.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Configuration migration</h3>
            <p className="text-sm text-muted-foreground">
              Migrate from modern to legacy systems. When downgrading or interfacing with older systems, convert YAML configs to INI format.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know About INI Format</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">INI has limited structure.</strong> INI only supports sections and key-value pairs. Complex YAML structures (arrays, deep nesting) require flattening or special handling.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">No standard for arrays.</strong> INI doesn't natively support lists. Arrays may become comma-separated values or indexed keys (key1, key2, key3).
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Section names have limits.</strong> Section names typically can't contain special characters. Complex YAML keys may need sanitization.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Comments use semicolons.</strong> INI comments start with ; not #. YAML comments are converted to INI-style comments.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Keep YAML structures simple when targeting INI. Flat structures with one level of nesting convert most cleanly to INI sections.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are nested structures handled?</h3>
            <p className="text-sm text-muted-foreground">
              Deep nesting is flattened. database.connection.host might become [database.connection] with host=value, or use dot notation in key names.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can INI handle arrays?</h3>
            <p className="text-sm text-muted-foreground">
              Not natively. Arrays become comma-separated values or multiple keys (items.0, items.1). The receiving application must understand the convention.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are comments preserved?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. YAML # comments convert to INI ; or # comments. Comment placement is preserved as closely as possible within sections.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about special characters in values?</h3>
            <p className="text-sm text-muted-foreground">
              Values with special characters may be quoted. INI doesn't have strict quoting rules—quotes are often optional but help with special chars.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert INI back to YAML?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Use the INI to YAML converter to reverse the process. Simple INI files convert cleanly; complex flattened structures may need adjustment.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is INI still used today?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, especially in Windows applications, games, PHP configs, and legacy systems. While outdated, INI remains relevant for compatibility.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my data secure?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. All conversion happens locally in your browser. Your configuration data never leaves your computer. Works offline after page load.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
