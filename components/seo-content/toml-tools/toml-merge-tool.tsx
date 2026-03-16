import React from "react"

export default function TomlMergeToolSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the TOML Merge Tool Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool combines two TOML files into one, handling conflicts with your chosen strategy.
            Deep merge combines nested structures, while conflict resolution determines what happens
            when the same key exists in both files.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Merge Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Paste the base TOML in the first input area</li>
            <li>Paste the TOML to merge in the second input area</li>
            <li>Select a conflict strategy: overwrite, skip, or rename</li>
            <li>Click &quot;Merge TOML&quot; to combine</li>
            <li>Both files are parsed and validated</li>
            <li>Structures are deep-merged recursively</li>
            <li>Conflicts are resolved using your chosen strategy</li>
            <li>Copy or download the merged result</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Environment Configuration</h3>
            <p className="text-sm text-muted-foreground">
              Merge base config with environment-specific overrides.
              Base has defaults, environment file overrides specific values.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Multi-Project Configuration</h3>
            <p className="text-sm text-muted-foreground">
              Combine shared config with project-specific settings.
              Avoid duplicating common configuration across projects.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Plugin System Configuration</h3>
            <p className="text-sm text-muted-foreground">
              Merge core app config with plugin configurations.
              Each plugin adds its own settings to the base.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Configuration Inheritance</h3>
            <p className="text-sm text-muted-foreground">
              Implement config inheritance by merging parent and child configs.
              Child overrides specific values while inheriting the rest.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Template Customization</h3>
            <p className="text-sm text-muted-foreground">
              Start with a template config and merge user customizations.
              Users only specify what they want to change.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Understanding merge strategies:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Overwrite: second file&apos;s values replace first file&apos;s</li>
            <li>Skip: first file&apos;s values are kept, second&apos;s ignored</li>
            <li>Rename: conflicting keys from second file get suffix (_2, _3)</li>
            <li>Nested objects are merged recursively</li>
            <li>Arrays from second file replace arrays from first</li>
            <li>Keys only in one file are always included</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What does overwrite strategy do?</h3>
            <p className="text-sm text-muted-foreground">
              When the same key exists in both files, the second file&apos;s value wins.
              This is useful for override configurations.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">When should I use skip strategy?</h3>
            <p className="text-sm text-muted-foreground">
              Skip keeps the base file&apos;s values and ignores conflicts.
              Use when the base config should take precedence.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How does rename strategy work?</h3>
            <p className="text-sm text-muted-foreground">
              Conflicting keys from the second file get a suffix (_2, _3, etc.).
              This preserves all values without data loss.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Are nested structures merged?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, nested objects are deep-merged. Only leaf values are
              subject to conflict resolution.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I merge more than two files?</h3>
            <p className="text-sm text-muted-foreground">
              Merge files pairwise. Merge A and B, then merge the result with C.
              The order affects the final result with overwrite strategy.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What happens to arrays?</h3>
            <p className="text-sm text-muted-foreground">
              Arrays are replaced, not merged. The second file&apos;s array
              replaces the first file&apos;s array for the same key.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
