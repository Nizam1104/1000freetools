import React from "react"

export default function YamlToGoStructSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How YAML to Go Struct Conversion Works</h2>

        <div className="space-y-3 text-muted-foreground">
          <p>
            YAML to Go struct conversion analyzes your YAML structure and generates corresponding Go type definitions. Each YAML key becomes a struct field, nested objects become nested structs, and arrays become slices.
          </p>

          <p>
            This tool infers Go types from YAML values: strings become string, numbers become int or float64, booleans become bool, and null becomes interface{} or pointer types. YAML tags are added for proper marshaling.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="text-sm font-medium">Here's the process:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>YAML is parsed to analyze structure</li>
              <li>Types are inferred from values</li>
              <li>Go structs are generated with fields</li>
              <li>YAML tags are added for marshaling</li>
            </ol>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example conversion:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">{`YAML Input:
name: John
age: 30
active: true

Go Struct Output:
type Config struct {
  Name   string ` + "`yaml:\"name\"`" + `
  Age    int    ` + "`yaml:\"age\"`" + `
  Active bool   ` + "`yaml:\"active\"`" + `
}`}</pre>
          </div>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Go application configuration</h3>
            <p className="text-sm text-muted-foreground">
              Generate Go structs from YAML config files. Define type-safe configuration structures that match your YAML config files exactly.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">API response types</h3>
            <p className="text-sm text-muted-foreground">
              Create Go types for YAML API responses. Generate structs that match expected YAML response formats for type-safe API client code.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Kubernetes operator development</h3>
            <p className="text-sm text-muted-foreground">
              Generate Go types from Kubernetes CRD YAML. Create Go structs that match custom resource definitions for Kubernetes operator development.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Data model definition</h3>
            <p className="text-sm text-muted-foreground">
              Define data models from YAML schemas. Start with YAML data examples, generate Go structs, then implement business logic around them.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Rapid prototyping</h3>
            <p className="text-sm text-muted-foreground">
              Quickly scaffold Go code from YAML examples. Speed up development by auto-generating struct definitions instead of writing them manually.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Documentation generation</h3>
            <p className="text-sm text-muted-foreground">
              Show Go types alongside YAML examples. Generate documentation that includes both YAML examples and corresponding Go type definitions.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know About Go Struct Generation</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Type inference is automatic.</strong> Types are guessed from YAML values. Numbers without decimals become int, with decimals become float64. Verify types match your needs.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Field names are exported.</strong> Generated struct fields start with capital letters (exported in Go). YAML tags preserve the original key names for marshaling.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Nested structures create nested structs.</strong> YAML nesting becomes Go struct nesting. Each level generates a separate type definition with appropriate field types.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Arrays become slices.</strong> YAML arrays generate Go slices ([]Type). Element types are inferred from the first array element.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Review generated types before using in production. You may want to adjust types (int vs int64), add validation tags, or customize field names.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are types determined?</h3>
            <p className="text-sm text-muted-foreground">
              Types are inferred from values: text→string, integers→int, decimals→float64, true/false→bool, lists→slice, objects→struct, null→interface{}.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I customize the output?</h3>
            <p className="text-sm text-muted-foreground">
              The generated code is standard Go. Customize by editing the output—add validation tags, change types, or implement custom interfaces as needed.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it handle nested structures?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Nested YAML objects become nested Go structs. Each nesting level generates a separate type with appropriate field definitions.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about YAML anchors?</h3>
            <p className="text-sm text-muted-foreground">
              Anchors are resolved during parsing. The generated struct reflects the expanded structure, not the anchor references from the original YAML.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are comments preserved?</h3>
            <p className="text-sm text-muted-foreground">
              YAML comments can become Go comments above fields. This helps document the struct fields with original YAML documentation.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this with gopkg.in/yaml?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Generated structs work with both gopkg.in/yaml.v2 and yaml.v3 packages. The yaml tags are compatible with both versions.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my code secure?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. All processing happens locally in your browser. Your YAML and generated code never leave your computer. Safe for proprietary code.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
