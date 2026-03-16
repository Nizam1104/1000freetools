import React from "react"

export default function YamlMergeToolSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste two or more YAML documents into the input areas. The merge tool combines them intelligently, handling nested structures and arrays. Choose merge strategy: deep merge for nested objects, or shallow merge for flat replacement.
          </p>
          <p>
            When keys conflict, the tool applies your chosen strategy: override (second wins), keep first, or merge arrays. Complex nested structures merge recursively, preserving hierarchy from all sources.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Merge example:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">YAML 1:
database:
  host: localhost
  port: 5432

YAML 2:
database:
  host: production.db
  user: admin

Merged (override):
database:
  host: production.db
  port: 5432
  user: admin</pre>
          </div>
          <p>
            Array handling options include concatenate (combine all), unique (remove duplicates), or replace (second replaces first). Choose based on your use case and data semantics.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Environment-specific configs</h3>
            <p className="text-sm text-muted-foreground">
              Base config plus environment overrides. Dev, staging, production. Merge common settings with specific. DRY configuration management.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Helm chart values</h3>
            <p className="text-sm text-muted-foreground">
              Combine default values with custom. Override chart defaults. Environment-specific deployments. Kubernetes configuration layering.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Multi-team configurations</h3>
            <p className="text-sm text-muted-foreground">
              Each team maintains their section. Merge into unified config. Avoid merge conflicts. Parallel configuration editing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Template customization</h3>
            <p className="text-sm text-muted-foreground">
              Base template plus customizations. User overrides defaults. Preserve base while allowing changes. Flexible configuration system.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">CI/CD pipeline composition</h3>
            <p className="text-sm text-muted-foreground">
              Common steps plus job-specific. Reusable workflow components. Combine shared and unique. Maintainable pipeline configs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Feature flag configurations</h3>
            <p className="text-sm text-muted-foreground">
              Base flags plus experiment overrides. A/B test configurations. Rollout percentages. Merge feature states.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Deep merge preserves nested structure.</strong>
              Nested objects combine recursively. Only leaf values override. Parent structure preserved. Best for configuration layering.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Array merge strategy matters.</strong>
              Concatenate combines all elements. Unique removes duplicates. Replace uses second entirely. Choose based on data semantics.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Order affects results.</strong>
              First YAML is base, second overrides. Reverse order gives different result. Plan your merge sequence carefully.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Null values have special handling.</strong>
              Null in override may delete or keep. Configurable behavior. Understand how nulls affect your merge.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Document your merge strategy. Team members need to understand override behavior. Add comments to config files.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's deep merge vs shallow?</h3>
            <p className="text-sm text-muted-foreground">
              Deep merge combines nested objects recursively. Shallow merge replaces entire objects. Deep is usually what you want for configs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I merge more than two files?</h3>
            <p className="text-sm text-muted-foreground">
              Merge two at a time, then merge result with third. Or use command-line tools for multiple files. This tool handles two-way merge.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are conflicts resolved?</h3>
            <p className="text-sm text-muted-foreground">
              Configurable: first wins, last wins, or error. Default is last wins (override). Choose based on your needs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it preserve comments?</h3>
            <p className="text-sm text-muted-foreground">
              Comments may not survive merge. YAML parsers often drop them. Add comments to final output manually if needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I unmerge or diff?</h3>
            <p className="text-sm text-muted-foreground">
              This tool merges only. Use YAML diff tools to compare. Version control shows changes. Separate tools for different tasks.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about YAML anchors?</h3>
            <p className="text-sm text-muted-foreground">
              Anchors expand during merge. Result has no anchors. Values merge correctly. Anchors are pre-processing feature.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is the output valid YAML?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, output is always valid YAML. Passes validation. Ready for use. Can validate again if concerned.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
