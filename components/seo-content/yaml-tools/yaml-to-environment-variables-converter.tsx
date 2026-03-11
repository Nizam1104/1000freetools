import React from "react"

export default function YamlToEnvironmentVariablesConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your YAML configuration file into the input area. The converter parses nested structures and flattens them into environment variable format. Each key becomes a variable name with its corresponding value.
          </p>
          <p>
            Nested YAML keys are joined with underscores to create valid environment variable names. Arrays convert to indexed variables. Boolean and null values convert to string representations suitable for shell environments.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Conversion example:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">YAML Input:
database:
  host: localhost
  port: 5432

Output:
DATABASE_HOST=localhost
DATABASE_PORT=5432</pre>
          </div>
          <p>
            Options control output format: prefix variables, choose separator style, handle special characters. Export directly to .env file format for immediate use in your projects.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Docker container configuration</h3>
            <p className="text-sm text-muted-foreground">
              Convert docker-compose YAML to env files. Pass configuration to containers. Manage environment-specific settings. Simplify deployment.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">CI/CD pipeline setup</h3>
            <p className="text-sm text-muted-foreground">
              GitHub Actions needs env vars. Convert workflow YAML configs. Set secrets and variables. Automate deployment configurations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Application deployment</h3>
            <p className="text-sm text-muted-foreground">
              Kubernetes config to environment. Heroku, Vercel, Netlify setups. Platform-specific env requirements. Streamline deployment process.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Development environment setup</h3>
            <p className="text-sm text-muted-foreground">
              Create .env files from templates. Onboard new developers quickly. Standardize local configurations. Version control friendly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Configuration migration</h3>
            <p className="text-sm text-muted-foreground">
              Moving from YAML to env-based config. Legacy system updates. Framework migrations. Preserve settings during transition.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Secret management</h3>
            <p className="text-sm text-muted-foreground">
              Extract secrets from YAML configs. Prepare for vault integration. Separate sensitive data. Security best practices.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Nested keys become prefixed variables.</strong>
              database.host becomes DATABASE_HOST. Deep nesting creates long names. Consider flattening complex structures. May need manual adjustment.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Special characters need handling.</strong>
              Hyphens, spaces, dots in keys convert to underscores. Some shells have restrictions. Review output for compatibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Arrays convert to indexed variables.</strong>
              items: [a, b, c] becomes ITEMS_0, ITEMS_1, ITEMS_2. Some apps expect comma-separated. May need format adjustment.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Values are quoted when needed.</strong>
              Spaces and special chars get quotes. Numbers stay unquoted. Booleans convert to strings. Shell-safe output.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Never commit .env files with secrets to version control. Add to .gitignore. Use secrets management for production.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What YAML features are supported?</h3>
            <p className="text-sm text-muted-foreground">
              Basic key-value, nested objects, arrays, scalars. Anchors and aliases may not convert well. Complex YAML may need simplification.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I customize variable names?</h3>
            <p className="text-sm text-muted-foreground">
              Add custom prefix to all variables. Separator style options available. Post-process output for specific naming conventions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are null values handled?</h3>
            <p className="text-sm text-muted-foreground">
              Null becomes empty string or omitted. Configurable in options. Choose based on your application's expectations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is the output shell-safe?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, values are properly quoted. Special characters escaped. Works in bash, zsh, and most shells. Windows PowerShell compatible.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert back from env to YAML?</h3>
            <p className="text-sm text-muted-foreground">
              This tool is one-way only. Use YAML to JSON converter, then format. Or use dedicated env-to-YAML tools.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I download the output?</h3>
            <p className="text-sm text-muted-foreground">
              Copy to clipboard button available. Or download as .env file. Direct import into projects. Ready for deployment.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this validate YAML syntax?</h3>
            <p className="text-sm text-muted-foreground">
              Basic validation during conversion. Invalid YAML shows errors. Fix syntax issues before converting. Use YAML validator for thorough checks.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
