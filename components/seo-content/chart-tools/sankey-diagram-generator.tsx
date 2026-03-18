import React from "react"

export default function SankeyDiagramGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Sankey Diagram Generator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool creates Sankey diagrams—flow visualizations that show quantities moving between nodes. Enter your flow data, customize colors and labels, and generate a professional diagram instantly.
          </p>
          <p>
            Sankey diagrams use arrow width proportional to flow quantity. Thick arrows represent large flows; thin arrows show small flows. This makes it easy to spot major pathways and bottlenecks at a glance.
          </p>
          <p>
            Input data as pairs: source node, target node, and flow value. The generator arranges nodes automatically to minimize crossing flows. Export as PNG or SVG for presentations, reports, or publications.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Visualizing energy or material flows</h3>
            <p className="text-sm text-muted-foreground">
              Track energy from sources to end uses, or materials through a manufacturing process. Sankey diagrams reveal where most energy/material goes and where losses occur.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Mapping website user journeys</h3>
            <p className="text-sm text-muted-foreground">
              Show how users flow through your site—from landing pages to conversions. Identify drop-off points and popular pathways for UX optimization.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing budget allocations</h3>
            <p className="text-sm text-muted-foreground">
              Visualize money flowing from revenue sources to expense categories. Stakeholders instantly see where budget goes and can spot imbalances.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Tracking supply chain movements</h3>
            <p className="text-sm text-muted-foreground">
              Map products from suppliers through distribution to customers. Identify bottlenecks, single points of failure, and optimization opportunities.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Displaying migration or transfer data</h3>
            <p className="text-sm text-muted-foreground">
              Show population migration between regions, data transfers between systems, or customer churn between plans. Flow visualization reveals patterns tables hide.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating sustainability reports</h3>
            <p className="text-sm text-muted-foreground">
              Illustrate carbon emissions by source and sector, waste flows through recycling systems, or water usage across operations. Essential for ESG reporting.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Flow conservation is key.</strong>
              Total flow into a node should equal total flow out (plus/minus any storage or loss at that node). Unbalanced flows confuse readers and indicate data errors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Limit the number of nodes.</strong>
              Sankey diagrams get cluttered with too many nodes. Aim for 5-10 nodes max. Group smaller categories into "Other" to keep diagrams readable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Order matters for readability.</strong>
              Arrange nodes logically—sources on left, destinations on right. Group related nodes together. Good layout reduces crossing flows and improves comprehension.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Color coding aids understanding.</strong>
              Use consistent colors for related flows. Differentiate categories clearly. Avoid similar colors that might confuse readers with color vision deficiencies.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Start with aggregated data, then drill down. Create a high-level Sankey first, then detailed diagrams for specific flows. This layered approach tells a clearer story.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What data format do I need?</h3>
            <p className="text-sm text-muted-foreground">
              Provide source, target, and value for each flow. Example: "Coal, Electricity Generation, 500" means 500 units flow from Coal to Electricity Generation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I import data from CSV or Excel?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, paste CSV-formatted data directly. Three columns: source, target, value. The tool parses and validates the data before generating the diagram.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What file formats can I export?</h3>
            <p className="text-sm text-muted-foreground">
              PNG for presentations and documents. SVG for editing in Illustrator or Inkscape. SVG scales infinitely without quality loss—best for publications.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle negative flows?</h3>
            <p className="text-sm text-muted-foreground">
              Sankey diagrams typically show positive flows only. For returns or reverse flows, create a separate arrow in the opposite direction with positive value.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I customize colors and styles?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, choose colors for each node or flow. Adjust font sizes, arrow opacity, and diagram dimensions. Match your organization's branding guidelines.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between Sankey and flow charts?</h3>
            <p className="text-sm text-muted-foreground">
              Flow charts show process steps and decisions. Sankey diagrams show quantities flowing between nodes. Sankey arrow width represents magnitude; flow chart arrows don't.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Who invented Sankey diagrams?</h3>
            <p className="text-sm text-muted-foreground">
              Named after Captain Matthew Sankey, who used them in 1898 for steam engine efficiency. They became standard in energy analysis and are now used across many fields.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
