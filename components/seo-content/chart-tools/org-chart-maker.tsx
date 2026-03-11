import React from "react"

export default function OrgChartMakerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Define your organizational hierarchy by specifying each person's name, title, and who they report to. The tool automatically arranges boxes in a tree structure showing reporting relationships.
          </p>
          <p>
            The chart displays with executives at the top, branching down through management to individual contributors. Each box shows name and role. Lines connect managers to their direct reports.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Data format:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Name, Title, Reports To
John Smith, CEO,
Jane Doe, CTO, John Smith
Bob Wilson, VP Eng, Jane Doe</pre>
          </div>
          <p>
            Interactive features allow expanding/collapsing branches for large organizations. Export for employee handbooks, onboarding materials, or company websites.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">New employee onboarding</h3>
            <p className="text-sm text-muted-foreground">
              Help new hires understand company structure. They learn who's who and reporting lines. Reduces confusion about who to approach for what.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Company website about page</h3>
            <p className="text-sm text-muted-foreground">
              Show leadership team to visitors. Builds credibility and transparency. Investors and customers want to know who runs the company.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Restructuring planning</h3>
            <p className="text-sm text-muted-foreground">
              HR plans reorganizations visually. See span of control, identify gaps, plan transitions. Change management starts with clear structure.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Project team visualization</h3>
            <p className="text-sm text-muted-foreground">
              Map project roles and reporting. Matrix organizations show dual reporting. Team members understand their place in project structure.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Board and governance display</h3>
            <p className="text-sm text-muted-foreground">
              Show board committees, officers, and governance structure. Annual reports include governance charts. Stakeholders understand oversight.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Department structure documentation</h3>
            <p className="text-sm text-muted-foreground">
              Document team structure within departments. Managers track their organization. Succession planning identifies key roles and backups.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Org charts show formal structure only.</strong>
              Informal influence and communication patterns aren't captured. Real decision-making may differ from the chart. Use alongside network analysis.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Keep it current.</strong>
              Outdated org charts cause confusion. Update when people join, leave, or change roles. Assign ownership for maintenance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Consider privacy.</strong>
              Public org charts expose employee names and titles. Internal charts can include more detail. Balance transparency with privacy.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Matrix structures are complex.</strong>
              Dual reporting (functional and project) needs careful representation. Use dotted lines for secondary reporting. May need multiple views.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Add photos to org chart boxes for larger organizations. Helps employees put faces to names, especially in remote companies.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle large organizations?</h3>
            <p className="text-sm text-muted-foreground">
              Create department-level charts rather than one giant chart. Link from executive chart to department charts. Interactive collapsing helps navigation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about contractors and consultants?</h3>
            <p className="text-sm text-muted-foreground">
              Include them where they fit in the workflow. Use different box styles or colors to distinguish from employees. Shows complete team structure.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I include contact information?</h3>
            <p className="text-sm text-muted-foreground">
              Internal charts can include email and phone. Public charts typically don't. Consider your audience and privacy policies.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I show vacancies?</h3>
            <p className="text-sm text-muted-foreground">
              Use a different style (dashed border, gray box) for open positions. Shows planned structure and hiring needs. Helps workforce planning.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I show salary ranges?</h3>
            <p className="text-sm text-muted-foreground">
              Internal compensation charts can include ranges. Highly sensitive - restrict access carefully. Most org charts don't include compensation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What format should I export?</h3>
            <p className="text-sm text-muted-foreground">
              PDF for printing and distribution. PNG for websites and presentations. SVG for editing in design tools. Choose based on use case.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How often should org charts be updated?</h3>
            <p className="text-sm text-muted-foreground">
              Update immediately for executive changes. Monthly review for larger organizations. Quarterly minimum for stable companies. Assign responsibility for updates.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
