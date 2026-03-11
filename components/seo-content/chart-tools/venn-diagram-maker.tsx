import React from "react"

export default function VennDiagramMakerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Define your sets and their elements. For 2-set diagrams, enter items unique to each set and items in the intersection. For 3-set diagrams, specify all seven possible regions.
          </p>
          <p>
            The tool draws overlapping circles representing each set. Items appear in the appropriate region - unique items in non-overlapping areas, shared items in intersections. Colors distinguish the sets.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Data format for 3 sets:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Set A only: Apple, Banana
Set B only: Car, Dog
Set C only: Elephant
A and B only: Fruit Vehicle
B and C only: 
A and C only: 
All three: </pre>
          </div>
          <p>
            The diagram renders with clear labels and readable text. Overlapping areas are automatically calculated. Export for presentations showing relationships and commonalities.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Feature comparison between products</h3>
            <p className="text-sm text-muted-foreground">
              Show which features are unique vs shared between competing products. Customers see differentiation clearly. Marketing teams identify unique selling points.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Skills overlap in teams</h3>
            <p className="text-sm text-muted-foreground">
              Map team member skills to find overlaps and gaps. Project managers assign tasks based on unique vs shared skills. Team building benefits from skill visibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Logical set relationships</h3>
            <p className="text-sm text-muted-foreground">
              Math students visualize set theory concepts. Union, intersection, and complement become concrete. Foundation for probability and statistics.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Audience segmentation analysis</h3>
            <p className="text-sm text-muted-foreground">
              Show overlap between customer segments. Marketing sees which customers fit multiple personas. Targeting becomes more precise.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Research paper categorization</h3>
            <p className="text-sm text-muted-foreground">
              Academic papers often span multiple fields. Venn diagrams show interdisciplinary connections. Literature reviews organize by field overlap.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Decision criteria visualization</h3>
            <p className="text-sm text-muted-foreground">
              Show options that meet multiple criteria. Intersection contains options satisfying all requirements. Decision-making becomes systematic.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Venn diagrams work best for 2-3 sets.</strong>
              Two circles are clearest. Three circles work but get complex. Four+ sets require different visualizations (Euler diagrams, Upset charts).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Circle size doesn't represent quantity.</strong>
              Standard Venn diagrams show relationships, not proportions. Area-proportional Venn diagrams exist but are harder to read.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Empty intersections are valid.</strong>
              Some set combinations may have no members. Empty intersections show no overlap between those sets. This is meaningful information.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Text density affects readability.</strong>
              Too many items in small intersections becomes unreadable. Summarize with counts for large sets. Use "15 items" instead of listing all.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Use contrasting colors for sets. Overlapping areas blend colors naturally. Ensure text remains readable on blended backgrounds.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the maximum number of sets?</h3>
            <p className="text-sm text-muted-foreground">
              Practically, 3 sets is the limit for clear Venn diagrams. 4+ sets require complex shapes. Consider alternative visualizations for more sets.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I show set sizes proportionally?</h3>
            <p className="text-sm text-muted-foreground">
              Standard Venn diagrams don't scale circles by size. Area-proportional versions exist but are harder to create and read. Use bar charts for size comparison.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if circles don't overlap?</h3>
            <p className="text-sm text-muted-foreground">
              Non-overlapping circles mean disjoint sets - no common elements. This is valid and informative. Shows complete separation between categories.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How is this different from Euler diagrams?</h3>
            <p className="text-sm text-muted-foreground">
              Venn diagrams show all possible intersections. Euler diagrams only show existing relationships. Venn is more systematic, Euler is more flexible.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for probability?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, Venn diagrams illustrate probability concepts. P(A ∩ B) is the intersection area. Helpful for teaching conditional probability and Bayes' theorem.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle many items per region?</h3>
            <p className="text-sm text-muted-foreground">
              Use counts instead of listing: "12 items" instead of all 12. Or create a separate table. The diagram shows relationships, tables show details.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I export for presentations?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, download as PNG for slides or SVG for editing. Both formats work in PowerPoint and Google Slides. SVG scales without quality loss.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
