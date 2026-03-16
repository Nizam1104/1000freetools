import React from "react"

export default function GanttChartMakerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your project tasks with start date, end date, and optional dependencies. Each task becomes a horizontal bar spanning its duration on the timeline. Tasks are listed vertically, time flows horizontally.
          </p>
          <p>
            Dependencies connect tasks with arrows showing which must finish before others start. Critical path highlighting shows tasks that directly impact project completion. Progress can be shown within bars.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Data format:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Task, Start, End, Progress, Dependencies
Planning, 2024-01-01, 2024-01-15, 100,
Design, 2024-01-16, 2024-02-15, 75, Planning
Development, 2024-02-16, 2024-04-15, 30, Design</pre>
          </div>
          <p>
            The chart renders with today's line showing current progress. Overdue tasks highlight in red. Export for project status reports and stakeholder updates.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Software development sprints</h3>
            <p className="text-sm text-muted-foreground">
              Plan and track development tasks. See which features are in progress. Teams coordinate work and identify blockers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Construction project scheduling</h3>
            <p className="text-sm text-muted-foreground">
              Sequence building phases properly. Foundation before framing, framing before roofing. Contractors coordinate trades.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Event planning timelines</h3>
            <p className="text-sm text-muted-foreground">
              Coordinate venue booking, catering, invitations, setup. Event managers ensure nothing is forgotten. Deadlines stay visible.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Marketing campaign launches</h3>
            <p className="text-sm text-muted-foreground">
              Plan creative, production, media buying, launch. Marketing teams coordinate across channels. Campaigns launch on schedule.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Research project management</h3>
            <p className="text-sm text-muted-foreground">
              Schedule literature review, data collection, analysis, writing. Academics track PhD progress. Grant reporting shows milestones.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Manufacturing production planning</h3>
            <p className="text-sm text-muted-foreground">
              Schedule production runs, maintenance, changeovers. Operations managers optimize capacity. Delivery commitments stay achievable.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Dependencies drive the schedule.</strong>
              Task relationships determine project duration. Wrong dependencies create unrealistic schedules. Map dependencies carefully.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Critical path shows minimum duration.</strong>
              Tasks on critical path have zero slack. Delaying them delays the project. Focus management attention there.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Progress tracking requires updates.</strong>
              Gantt charts become useless if not updated. Update weekly at minimum. Outdated charts mislead stakeholders.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Too much detail creates clutter.</strong>
              Break down to work packages, not individual actions. 20-50 tasks is manageable. Hundreds of tasks becomes unreadable.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Add milestones (diamonds) for key deliverables and decision points. They stand out from task bars and mark important dates.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How detailed should tasks be?</h3>
            <p className="text-sm text-muted-foreground">
              Tasks should be 1-4 weeks typically. Small enough to track, large enough to matter. Break down multi-month tasks.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the critical path?</h3>
            <p className="text-sm text-muted-foreground">
              Longest path through the project network. Determines minimum project duration. Any delay on critical path delays the project.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I show resource allocation?</h3>
            <p className="text-sm text-muted-foreground">
              Add resource names to task bars. Or create separate Gantt charts per resource. Resource leveling prevents overallocation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I handle task delays?</h3>
            <p className="text-sm text-muted-foreground">
              Update task dates as delays occur. Dependencies automatically push downstream tasks. See impact on project completion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about agile projects?</h3>
            <p className="text-sm text-muted-foreground">
              Gantt charts work for agile release planning. Sprints become tasks. For daily work, use Kanban boards instead.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I share with stakeholders?</h3>
            <p className="text-sm text-muted-foreground">
              Export as PDF for reports. PNG for presentations. Interactive versions work for project portals. Choose format for audience.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I track budget with Gantt?</h3>
            <p className="text-sm text-muted-foreground">
              Basic Gantt charts show schedule only. Earned value management combines schedule and cost. Advanced tools support this.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
