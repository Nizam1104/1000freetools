import React from "react"

export default function MarkdownToJsonConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This converter transforms Markdown documents into structured JSON
            data. It parses your Markdown and extracts content into a
            hierarchical JSON structure that represents the document's
            organization.
          </p>
          <p>
            The parser identifies Markdown elements (headers, paragraphs, lists,
            code blocks, etc.) and converts each into JSON objects with type
            information and content. This makes Markdown content programmatically
            accessible for applications and automation.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example JSON structure:</p>
            <pre className="text-sm bg-background p-3 rounded overflow-x-auto">
{`{
  "type": "document",
  "children": [
    {
      "type": "heading",
      "level": 1,
      "content": "My Document"
    },
    {
      "type": "paragraph",
      "content": "This is a paragraph."
    },
    {
      "type": "list",
      "listType": "bullet",
      "items": ["Item 1", "Item 2"]
    }
  ]
}`}
            </pre>
          </div>
          <p>
            The resulting JSON can be used in applications, stored in databases,
            or processed by other tools. Each element retains its type and
            properties for accurate reconstruction or transformation.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building content management APIs</h3>
            <p className="text-sm text-muted-foreground">
              A developer builds an API that serves documentation content. They
              convert Markdown docs to JSON, store them in a database, and
              serve structured content that frontends can render dynamically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating searchable documentation indexes</h3>
            <p className="text-sm text-muted-foreground">
              Someone needs to make their Markdown docs searchable. They
              convert to JSON, extract text content, and feed it into a search
              engine like Elasticsearch or Algolia for full-text search.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Migrating content between platforms</h3>
            <p className="text-sm text-muted-foreground">
              A team moves from a Markdown-based system to a headless CMS. They
              convert Markdown to JSON as an intermediate format, then transform
              the JSON into the CMS's required import structure.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Generating static site data files</h3>
            <p className="text-sm text-muted-foreground">
              A developer uses a JavaScript framework that loads content as
              JSON. They convert Markdown blog posts to JSON data files that
              their app fetches and renders at runtime.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing documentation structure</h3>
            <p className="text-sm text-muted-foreground">
              A tech lead analyzes their docs' structure programmatically. By
              converting to JSON, they can count sections, measure content
              distribution, and identify gaps in documentation coverage.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Powering content automation workflows</h3>
            <p className="text-sm text-muted-foreground">
              Someone automates content updates across multiple formats. They
              convert Markdown to JSON, manipulate the structured data
              programmatically, then generate output in multiple formats from
              the same source.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">JSON structure varies by converter.</strong>
              Different tools produce different JSON schemas. This tool's
              structure may not match what your application expects. You may
              need to transform the output to fit your needs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some Markdown features may not convert perfectly.</strong>
              Complex elements like tables with merged cells, footnotes, or
              custom HTML may not have direct JSON representations. Check how
              your specific content converts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Front matter is handled separately.</strong>
              YAML front matter may be extracted as a separate JSON field or
              merged into the document structure. Check the output format to
              understand how metadata is represented.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">JSON output can be verbose.</strong>
              Structured JSON includes type information for each element, making
              it larger than the original Markdown. This is expected and
              necessary for programmatic use.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For large documentation sets, consider
              batch conversion scripts. Converting many files individually is
              tedious. Automate with Node.js scripts using Markdown parsing
              libraries.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert JSON back to Markdown?</h3>
            <p className="text-sm text-muted-foreground">
              This tool only converts Markdown to JSON. For the reverse, you'd
              need a JSON-to-Markdown converter or write a script that
              reconstructs Markdown from the JSON structure.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are code blocks represented?</h3>
            <p className="text-sm text-muted-foreground">
              Code blocks become JSON objects with type "code" or "codeBlock",
              including the language identifier and the code content as a
              string. Special characters in code are preserved as-is.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this preserve formatting within elements?</h3>
            <p className="text-sm text-muted-foreground">
              Inline formatting (bold, italic, links) may be represented as
              nested structures or preserved as Markdown within the content
              string. Check the output format for how inline elements are
              handled.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I customize the JSON output format?</h3>
            <p className="text-sm text-muted-foreground">
              This tool provides a standard format. For custom schemas, you'd
              need to post-process the JSON or use a library that allows
              schema configuration for your specific use case.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are images handled?</h3>
            <p className="text-sm text-muted-foreground">
              Images become JSON objects with type "image", including the alt
              text and URL as separate properties. This makes it easy to
              process or validate image references programmatically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is the JSON output minified or pretty-printed?</h3>
            <p className="text-sm text-muted-foreground">
              Most converters offer both options. Pretty-printed JSON is
              readable for debugging. Minified JSON is smaller for storage or
              transmission. Choose based on your needs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert multiple files at once?</h3>
            <p className="text-sm text-muted-foreground">
              This tool handles one file at a time. For batch conversion, write
              a script using a Markdown parsing library (like remark or
              markdown-it) to process multiple files and output combined JSON.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about tables and complex structures?</h3>
            <p className="text-sm text-muted-foreground">
              Tables convert to JSON arrays of rows or objects with header
              mappings. Complex structures may have custom representations.
              Review the output to understand how your specific content is
              structured.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
