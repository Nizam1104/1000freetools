import React from "react"

export default function JsonToYamlConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your JSON data into the input area. The converter parses the JSON structure and transforms it into equivalent YAML format. Nested objects and arrays convert naturally to YAML's indentation-based syntax.
          </p>
          <p>
            Options control output style: indentation width (2 or 4 spaces), quote style for strings, and null value representation. The prettify option creates readable, well-formatted YAML output.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Conversion example:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">{`JSON Input:
{"name": "John", "age": 30}

YAML Output:
name: John
age: 30`}</pre>
          </div>
          <p>
            The converter preserves data types: numbers stay numbers, booleans remain true/false, null converts to YAML null. Complex nested structures maintain their hierarchy through indentation.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Kubernetes configuration</h3>
            <p className="text-sm text-muted-foreground">
              K8s prefers YAML manifests. Convert JSON API responses. Create deployment configs. Simplify resource definitions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">API development</h3>
            <p className="text-sm text-muted-foreground">
              OpenAPI specs often in YAML. Convert JSON schemas. Document endpoints clearly. Standard format for APIs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Configuration management</h3>
            <p className="text-sm text-muted-foreground">
              Ansible, SaltStack use YAML. Convert existing JSON configs. Standardize infrastructure code. Team collaboration.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Data export and import</h3>
            <p className="text-sm text-muted-foreground">
              Export database as JSON. Convert to YAML for configs. Import into YAML-based systems. Data migration tasks.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Documentation generation</h3>
            <p className="text-sm text-muted-foreground">
              YAML is more readable in docs. Convert JSON examples. Include in README files. Better for humans.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">CI/CD workflows</h3>
            <p className="text-sm text-muted-foreground">
              GitHub Actions uses YAML. Convert from JSON configs. Set up pipelines. Automate deployments.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">YAML is more concise than JSON.</strong>
              No braces or quotes needed usually. Shorter file sizes. More readable. But whitespace matters significantly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some JSON doesn't convert cleanly.</strong>
              Keys with special chars need quotes. Very long lines may wrap. Review output for edge cases.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Indentation style is configurable.</strong>
              2 spaces is YAML convention. 4 spaces also common. Choose based on project standards. Be consistent.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">String quoting varies.</strong>
              Simple strings unquoted. Special chars need quotes. Converter chooses appropriately. Can force quoting if needed.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> YAML files should end with newline. Some tools require it. Add final newline for compatibility.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is the conversion lossless?</h3>
            <p className="text-sm text-muted-foreground">
              Data is preserved exactly. Structure maintained. Types converted appropriately. Can convert back to identical JSON.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it handle large files?</h3>
            <p className="text-sm text-muted-foreground">
              Browser-based, so memory limits apply. Most configs work fine. Very large files may be slow. Split if needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about JSON comments?</h3>
            <p className="text-sm text-muted-foreground">
              Standard JSON doesn't support comments. If present, may cause parse errors. Remove comments before converting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I download the YAML?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, download button saves as .yaml file. Or copy to clipboard. Direct use in projects. Ready for commit.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it validate the JSON first?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, invalid JSON shows error. Fix JSON before conversion. Ensures valid output. Clear error messages.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about JSON arrays?</h3>
            <p className="text-sm text-muted-foreground">
              Arrays convert to YAML lists with dashes. Nested arrays work correctly. Maintains order and structure.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this secure for sensitive data?</h3>
            <p className="text-sm text-muted-foreground">
              Conversion happens in browser. Data doesn't leave your computer. Safe for configs with secrets. Still, remove secrets before sharing.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
