import React from "react"

export default function TimelineMakerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your events with dates and descriptions. Each event becomes a point on the timeline. The tool arranges events chronologically from left to right or top to bottom.
          </p>
          <p>
            Customize the timeline orientation (horizontal or vertical), color scheme, and label styles. Add milestones, markers, or group events by category for complex timelines.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Timeline elements:</p>
            <ul className="text-sm space-y-1">
              <li><strong>Timeline axis:</strong> The main line showing time progression</li>
              <li><strong>Event markers:</strong> Points or icons marking specific dates</li>
              <li><strong>Labels:</strong> Date and description for each event</li>
              <li><strong>Time scale:</strong> Shows the overall date range</li>
            </ul>
          </div>
          <p>
            The timeline renders with clear visual hierarchy. Past events, current milestones, and future dates are distinguishable. Export for presentations, reports, or web display.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Project roadmap visualization</h3>
            <p className="text-sm text-muted-foreground">
              Show project phases, milestones, and deliverables. Stakeholders see the full project arc. Dependencies and critical path become visible.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Company history displays</h3>
            <p className="text-sm text-muted-foreground">
              Document founding, key hires, product launches, and acquisitions. About pages come alive with visual history. Builds brand narrative and credibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Historical event education</h3>
            <p className="text-sm text-muted-foreground">
              Students visualize historical sequences. Wars, discoveries, or political changes in order. Temporal relationships become clear and memorable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Product development tracking</h3>
            <p className="text-sm text-muted-foreground">
              Track feature releases, version history, and upcoming roadmap. Users see product evolution. Transparency builds trust with your user base.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Legal case chronology</h3>
            <p className="text-sm text-muted-foreground">
              Organize case events, filings, and hearings. Legal teams track case progression. Judges and juries understand case history quickly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Personal milestone documentation</h3>
            <p className="text-sm text-muted-foreground">
              Create timelines for weddings, anniversaries, or life events. Visual keepsakes for special occasions. Share with family and friends.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Time scale affects readability.</strong>
              Events close together need expanded scale. Events spread over years need compression. Adjust scale so events are distinguishable but not wasted space.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Too many events creates clutter.</strong>
              Select key milestones, not every detail. 10-15 events work well on one timeline. For more, create multiple timelines by category or period.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Date format consistency matters.</strong>
              Use consistent date formats throughout. Mixing "Jan 2024" and "01/15/2024" looks unprofessional. Choose one format and stick with it.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Horizontal vs vertical depends on content.</strong>
              Horizontal works for few events over long periods. Vertical works for many events or mobile display. Choose based on your use case.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Use color coding for event categories. Product launches in blue, funding in green, hires in orange. Visual grouping aids comprehension.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What date formats are supported?</h3>
            <p className="text-sm text-muted-foreground">
              Most standard formats work: YYYY-MM-DD, MM/DD/YYYY, Month DD YYYY. The tool parses common formats. Use four-digit years for clarity.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I show future events?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, timelines work for past, present, and future. Mark future events differently (dotted lines, different color) to distinguish from completed events.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle overlapping events?</h3>
            <p className="text-sm text-muted-foreground">
              Events on the same date stack vertically or use callout boxes. The tool handles overlaps automatically. For many same-day events, consider grouping.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add images to events?</h3>
            <p className="text-sm text-muted-foreground">
              This tool focuses on text timelines. For image-rich timelines, use specialized timeline software or add images after exporting the base timeline.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the maximum date range?</h3>
            <p className="text-sm text-muted-foreground">
              No hard limit, but very long ranges (centuries) compress event labels. Consider breaking into multiple timelines by era or century for readability.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I export to PowerPoint?</h3>
            <p className="text-sm text-muted-foreground">
              Download as PNG for easy insertion into slides. SVG works too and scales without quality loss. Both formats are PowerPoint-compatible.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I update the timeline later?</h3>
            <p className="text-sm text-muted-foreground">
              Save your input data separately. Re-enter it to regenerate. For frequently updated timelines, consider a dedicated timeline tool with save functionality.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
