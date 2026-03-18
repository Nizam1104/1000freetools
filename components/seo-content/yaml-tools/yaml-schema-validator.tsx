import React from "react"

export default function YamlSchemaValidatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How YAML Schema Validation Works</h2>

        <div className="space-y-3 text-muted-foreground">
          <p>
            YAML schema validation checks your YAML data against a JSON Schema definition. The schema specifies required fields, data types, value constraints, and structure rules. The validator reports any violations.
          </p>

          <p>
            This tool parses both your YAML data and JSON Schema, then validates the data structure against schema rules. Errors include missing required fields, type mismatches, constraint violations, and structural issues.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="text-sm font-medium">What gets validated:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Required fields presence</li>
              <li>Data type correctness (string, number, boolean)</li>
              <li>Value constraints (min/max, pattern, enum)</li>
              <li>Nested structure compliance</li>
              <li>Array item types and counts</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-green-500/30 bg-green-500/10 p-4">
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>Schema versions:</strong> Supports JSON Schema Draft 7 and Draft 2020-12. Choose based on your schema version for accurate validation.
            </p>
          </div>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Configuration validation</h3>
            <p className="text-sm text-muted-foreground">
              Validate config files against schema. Ensure application configurations meet required structure before deployment.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">CI/CD pipeline checks</h3>
            <p className="text-sm text-muted-foreground">
              Add validation to pipelines. Catch configuration errors early in CI before deployment causes failures.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">API request validation</h3>
            <p className="text-sm text-muted-foreground">
              Validate YAML API payloads. Ensure incoming YAML data matches expected schema before processing.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Kubernetes manifest validation</h3>
            <p className="text-sm text-muted-foreground">
              Validate K8s resources against schemas. Check Kubernetes manifests for required fields and correct types.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Data quality assurance</h3>
            <p className="text-sm text-muted-foreground">
              Ensure data quality in YAML files. Validate data exports, imports, and transformations against schemas.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Schema development</h3>
            <p className="text-sm text-muted-foreground">
              Test and refine JSON Schemas. Validate sample data against draft schemas during schema development.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know About Schema Validation</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">JSON Schema is the standard.</strong> JSON Schema is widely supported for validating JSON/YAML data. Many tools and languages have JSON Schema validators.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Validation is structural.</strong> Schema validates structure and types, not semantic correctness. Data can be valid but still wrong for your use case.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Error messages are specific.</strong> Validation errors include JSON Path to the problematic field, making it easy to locate and fix issues.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Schemas can be complex.</strong> Advanced schemas use references, conditionals, and complex constraints. Ensure your schema is valid before validating data.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Start with simple schemas and add complexity gradually. Test each constraint with sample data to ensure it works as expected.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is JSON Schema?</h3>
            <p className="text-sm text-muted-foreground">
              JSON Schema is a vocabulary for annotating and validating JSON documents. It works with YAML too since YAML is a superset of JSON.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Which schema versions are supported?</h3>
            <p className="text-sm text-muted-foreground">
              Draft 7 and Draft 2020-12 are commonly supported. Choose the version that matches your schema specification.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I write a schema?</h3>
            <p className="text-sm text-muted-foreground">
              Define type, required fields, and constraints. Example: {"{ type: object, required: ['name'], properties: { name: { type: string } } }"}
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I validate arrays?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Schemas can specify array item types, minimum/maximum items, and unique items constraints.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about nested validation?</h3>
            <p className="text-sm text-muted-foreground">
              Fully supported. Schemas can define nested object structures with their own constraints at any depth.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it support custom formats?</h3>
            <p className="text-sm text-muted-foreground">
              Standard format validators include email, uri, date, etc. Custom formats may require additional validation logic.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my data secure?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. All validation happens locally in your browser. Your YAML and schema never leave your computer.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
