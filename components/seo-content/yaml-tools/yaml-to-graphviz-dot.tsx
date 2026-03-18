import React from "react"

export default function YamlToGraphvizDotSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How YAML to Graphviz DOT Conversion Works</h2>

        <div className="space-y-3 text-muted-foreground">
          <p>
            YAML to Graphviz DOT conversion transforms YAML-defined graph structures into DOT language syntax. YAML describes nodes, edges, and attributes in a readable format, which converts to DOT commands that Graphviz can render as diagrams.
          </p>

          <p>
            This tool maps YAML graph definitions to DOT syntax: nodes become node statements, edges become connection statements with arrows, and attributes like labels, colors, and shapes are applied as node/edge properties.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="text-sm font-medium">Here's the process:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>YAML graph structure is parsed</li>
              <li>Nodes are defined with attributes</li>
              <li>Edges are created between nodes</li>
              <li>DOT syntax output is generated</li>
            </ol>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example conversion:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">{`YAML Input:
nodes:
  - id: A
    label: Start
  - id: B
    label: End
edges:
  - from: A
    to: B

DOT Output:
digraph {
  A [label="Start"];
  B [label="End"];
  A -> B;
}`}</pre>
          </div>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Flowchart generation</h3>
            <p className="text-sm text-muted-foreground">
              Create flowcharts from YAML definitions. Define process flows in YAML, generate DOT for visualization with Graphviz tools.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Network topology diagrams</h3>
            <p className="text-sm text-muted-foreground">
              Document network structures. Define network nodes and connections in YAML, visualize as topology diagrams.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Organization charts</h3>
            <p className="text-sm text-muted-foreground">
              Generate org charts. Define reporting structures in YAML, create visual org charts for documentation.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Dependency graphs</h3>
            <p className="text-sm text-muted-foreground">
              Visualize dependencies. Define package or module dependencies in YAML, generate dependency visualization.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">State machine diagrams</h3>
            <p className="text-sm text-muted-foreground">
              Document state machines. Define states and transitions in YAML, create state diagram visualizations.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Documentation automation</h3>
            <p className="text-sm text-muted-foreground">
              Auto-generate diagrams for docs. Keep diagram definitions in version-controlled YAML, generate images for documentation.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know About DOT Format</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">DOT is a text description language.</strong> DOT describes graphs in text form. Graphviz tools (dot, neato, fdp) render DOT files as images (PNG, SVG, PDF).
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Directed vs undirected graphs.</strong> Use "digraph" for directed graphs (arrows), "graph" for undirected (lines). Choose based on your data relationships.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Node IDs must be unique.</strong> Each node needs a unique identifier. Labels can repeat, but IDs must be distinct within the graph.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Layout is automatic.</strong> Graphviz automatically positions nodes. You can hint at positioning, but the engine determines final layout.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Install Graphviz to render DOT files. Use command: dot -Tpng input.dot -o output.png. Many online DOT renderers also exist.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is Graphviz?</h3>
            <p className="text-sm text-muted-foreground">
              Graphviz is open-source graph visualization software. It reads DOT files and renders them as diagrams in various formats (PNG, SVG, PDF, etc.).
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I render the DOT output?</h3>
            <p className="text-sm text-muted-foreground">
              Install Graphviz, then use: dot -Tpng file.dot -o output.png. Or use online renderers like edotor.net or dreampuf.github.io/GraphvizOnline.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I customize node appearance?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. DOT supports many attributes: shape, color, style, font, etc. The converter passes through YAML-defined attributes to DOT output.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it support subgraphs?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. YAML can define subgraphs/clusters for grouping nodes. These become subgraph blocks in DOT for visual grouping.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What graph types are supported?</h3>
            <p className="text-sm text-muted-foreground">
              Both directed (digraph) and undirected (graph) graphs. Choose based on whether your relationships have direction (arrows) or not.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I create complex diagrams?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. DOT supports complex graphs with many nodes, edges, clusters, and custom attributes. YAML structure scales to handle complexity.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my data secure?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. All conversion happens locally in your browser. Your YAML and DOT content never leave your computer.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
