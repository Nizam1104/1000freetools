import React from "react"

export default function MarkdownTaskListGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool generates Markdown task list syntax (checkboxes) through
            a visual interface. Instead of manually typing <code className="font-mono bg-background px-1.5 py-0.5 rounded">- [ ]</code> for
            each item, you add tasks through a form and the tool generates
            properly formatted Markdown.
          </p>
          <p>
            GitHub Flavored Markdown supports task lists using specific syntax.
            This generator ensures correct formatting and lets you visually
            manage tasks, mark them complete, and reorder them before exporting
            the final Markdown.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Task list syntax explained:</p>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li><code className="font-mono bg-background px-1.5 py-0.5 rounded">- [ ] Task description</code> - Unchecked task</li>
              <li><code className="font-mono bg-background px-1.5 py-0.5 rounded">- [x] Completed task</code> - Checked task</li>
              <li>Tasks must be in list items (starting with <code className="font-mono bg-background px-1.5 py-0.5 rounded">-</code> or <code className="font-mono bg-background px-1.5 py-0.5 rounded">*</code>)</li>
              <li>Space after brackets is required for proper rendering</li>
              <li>Nested tasks use additional indentation</li>
            </ul>
          </div>
          <p>
            Add tasks through the interface, check off completed ones, and
            copy the generated Markdown. Works great for GitHub issues, project
            documentation, or any Markdown file that supports GFM task lists.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating GitHub issue templates</h3>
            <p className="text-sm text-muted-foreground">
              A maintainer creates issue templates with checklists for
              contributors. They use this generator to build the task list
              syntax, ensuring reporters complete all required steps before
              submission.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building sprint planning documents</h3>
            <p className="text-sm text-muted-foreground">
              A team lead creates sprint plans in Markdown. They generate task
              lists for each team member's assignments, then track progress by
              updating checkboxes as work completes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Making release checklists</h3>
            <p className="text-sm text-muted-foreground">
              Before each release, a developer runs through a checklist: run
              tests, update version numbers, write changelog, deploy. They keep
              this as a Markdown task list and check items as they complete
              each release.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Tracking documentation progress</h3>
            <p className="text-sm text-muted-foreground">
              A tech writer tracks which docs need updating. Each page becomes
              a task, and they check them off as they review and update. The
              Markdown file serves as both plan and progress tracker.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating onboarding checklists</h3>
            <p className="text-sm text-muted-foreground">
              An engineering manager builds an onboarding checklist for new
              hires. New team members get the Markdown file and check off items
              as they complete setup steps, training modules, and intro
              meetings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Managing pull request requirements</h3>
            <p className="text-sm text-muted-foreground">
              A team adds a PR template with a task list: tests pass, docs
              updated, changelog entry added. Contributors check items before
              requesting review, ensuring consistent PR quality.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Task lists need GitHub Flavored Markdown support.</strong>
              Not all Markdown renderers support task lists. GitHub, GitLab,
              and many modern platforms do. Check that your target platform
              renders checkboxes before relying on them.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Checkboxes are interactive only in certain contexts.</strong>
              In GitHub issues and some apps, you can click checkboxes to
              toggle them. In static rendered Markdown, they're visual only.
              Edit the source to change their state.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Nested task lists have limited support.</strong>
              While you can indent task lists for nesting, not all platforms
              render nested checkboxes correctly. Test nested structures in
              your target environment.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Task lists don't auto-update progress.</strong>
              Unlike dedicated project management tools, Markdown task lists
              don't show progress bars or auto-calculate completion. They're
              static checklists.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For GitHub issues, task lists in the
              issue body automatically contribute to the issue's progress
              indicator. Use this for visible progress tracking in project
              boards.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I check boxes interactively in GitHub?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, in GitHub issues and some Markdown editors, you can click
              checkboxes to toggle them. This automatically updates the
              underlying Markdown. In static views, you need to edit the source.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do task lists work in README files?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. GitHub renders task lists in README files. They display as
              checkboxes but aren't interactive. Update them by editing the
              Markdown source and committing changes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I nest tasks under parent items?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, indent child tasks with 2-4 spaces. However, nested task
              list rendering varies by platform. GitHub supports it, but other
              renderers may not display nested checkboxes correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I show task list progress?</h3>
            <p className="text-sm text-muted-foreground">
              GitHub automatically shows progress for task lists in issues
              (like "3 of 5 tasks complete"). For other contexts, you'd need to
              manually track and display progress or use a tool that calculates
              it.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add descriptions to tasks?</h3>
            <p className="text-sm text-muted-foreground">
              Task descriptions are the text after the checkbox. For longer
              descriptions, you can add additional text on the same line or use
              paragraph breaks within list items for multi-line task details.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do completed tasks stay checked?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, <code className="font-mono bg-background px-1.5 py-0.5 rounded">- [x]</code> stays checked in rendered Markdown. To
              uncheck, change it back to <code className="font-mono bg-background px-1.5 py-0.5 rounded">- [ ]</code>. The state is
              determined by the source, not persistent storage.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I reorder tasks after creating them?</h3>
            <p className="text-sm text-muted-foreground">
              In the generated Markdown, reorder by cutting and pasting lines.
              This generator lets you reorder visually before exporting. After
              export, you'd edit the Markdown directly to change order.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are there alternatives to task lists?</h3>
            <p className="text-sm text-muted-foreground">
              For simple lists, use regular bullet points. For complex project
              management, consider dedicated tools like GitHub Projects, Jira,
              or Notion. Task lists work best for simple, linear checklists.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
