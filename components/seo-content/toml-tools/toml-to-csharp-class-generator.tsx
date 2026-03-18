import React from "react"

export default function TomlToCsharpClassGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the TOML to C# Class Generator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool converts TOML configuration files into C# classes with JSON/TOML serialization attributes. Paste your TOML content and get ready-to-use C# POCO classes for deserializing configuration in .NET applications.
          </p>
          <p>
            The converter maps TOML types to C# types: strings to string, integers to int or long, floats to double, booleans to bool. Nested tables become nested classes. Arrays become List&lt;T&gt; or arrays.
          </p>
          <p>
            Generated classes include serialization attributes for Newtonsoft.Json, System.Text.Json, or TOML-specific libraries. Copy the code into your .NET project and deserialize TOML configs with a single method call.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building .NET applications with TOML config</h3>
            <p className="text-sm text-muted-foreground">
              Your .NET app uses TOML for configuration. Generate strongly-typed classes, deserialize with Tomlyn or NETToml, access settings with IntelliSense support.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating Unity game configurations</h3>
            <p className="text-sm text-muted-foreground">
              Unity games often use config files for game balance. Generate C# classes from TOML, load settings at runtime, tweak game parameters without recompiling.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Migrating from appsettings.json</h3>
            <p className="text-sm text-muted-foreground">
              Switching from JSON to TOML config in ASP.NET Core? Regenerate your configuration classes with TOML attributes. The class structure remains similar.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Documenting configuration options</h3>
            <p className="text-sm text-muted-foreground">
              Generated classes document available configuration options. Team members can browse properties in Visual Studio instead of reading separate documentation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Validating configuration at compile time</h3>
            <p className="text-sm text-muted-foreground">
              Strong typing catches configuration errors at compile time. Misspelled property names become compiler errors, not runtime surprises.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building configuration editors</h3>
            <p className="text-sm text-muted-foreground">
              Use generated classes to power config editors. Reflect over properties to build UI, validate input against property types, serialize back to TOML.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Choose the right serialization library.</strong>
              Tomlyn is popular for TOML in .NET. NETToml is another option. Some use Newtonsoft.Json with TOML converted to JSON first. Pick based on your project needs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Nullable types for optional fields.</strong>
              Use nullable types (string?, int?) for optional configuration values. Null indicates the field wasn't specified in the TOML file.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Property naming conventions.</strong>
              C# uses PascalCase for properties. TOML typically uses snake_case. Serialization attributes map between the two naming conventions automatically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Default values require initialization.</strong>
              Set default values in property initializers or constructors. TOML deserialization preserves defaults for missing fields.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Add XML documentation comments to your TOML before generating. Some tools preserve these as C# XML docs, making your classes self-documenting.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Which .NET TOML library is best?</h3>
            <p className="text-sm text-muted-foreground">
              Tomlyn is modern and well-maintained. NETToml is simpler. For ASP.NET Core, consider built-in configuration providers with TOML support.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle nested TOML tables?</h3>
            <p className="text-sm text-muted-foreground">
              Nested tables become nested C# classes. Each table level generates a new class. Properties reference nested classes for the full hierarchy.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add validation attributes?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, add DataAnnotations like [Required], [Range], [StringLength] to generated properties. Validate configuration with Validator.TryValidateObject().
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about TOML arrays?</h3>
            <p className="text-sm text-muted-foreground">
              TOML arrays become List&lt;T&gt; or T[] in C#. The element type T is inferred from array contents. Homogeneous arrays work best.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I deserialize TOML to my class?</h3>
            <p className="text-sm text-muted-foreground">
              With Tomlyn: var config = Toml.ToModel&lt;MyConfig&gt;(tomlString). With other libraries, use their deserialization API with your generated class type.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use records instead of classes?</h3>
            <p className="text-sm text-muted-foreground">
              For .NET 5+, you can modify generated code to use records. Records provide immutability and value equality. Great for configuration objects.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle missing fields?</h3>
            <p className="text-sm text-muted-foreground">
              Use nullable types or default values. Deserialization won't fail for missing fields unless your library is configured for strict mode.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
