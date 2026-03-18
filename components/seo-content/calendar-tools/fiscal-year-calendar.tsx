import React from "react"

export default function FiscalYearCalendarSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Fiscal Year Calendar Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select a calendar year and choose a fiscal year preset or customize the start month and day. The tool calculates your fiscal year dates, quarters, and progress automatically.
          </p>
          <p>
            Presets include common fiscal year configurations: US Federal (October 1), UK Government (April 6), Australia (July 1), and standard calendar year (January 1).
          </p>
          <p>
            The calendar displays fiscal quarter breakdowns with exact start and end dates for each quarter. Each quarter spans 3 months from your fiscal year start date.
          </p>
          <p>
            A progress bar shows how far through the fiscal year you are, with days elapsed and days remaining. This helps with budget tracking and deadline planning.
          </p>
          <p>
            The monthly breakdown shows which quarter each month belongs to, with the fiscal start month highlighted. Copy fiscal year dates to share with your team.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Government contract compliance</h3>
            <p className="text-sm text-muted-foreground">
              Track federal fiscal year deadlines for grants and contracts. US federal FY starts October 1. Plan submissions and reports accordingly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Corporate budget planning</h3>
            <p className="text-sm text-muted-foreground">
              Align budgets with your company's fiscal year. Many corporations use non-calendar fiscal years. Plan quarterly reviews and annual budgets.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Tax preparation scheduling</h3>
            <p className="text-sm text-muted-foreground">
              Know your fiscal year end for tax filings. Different entities have different fiscal years. Plan CPA meetings and document collection.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Nonprofit grant management</h3>
            <p className="text-sm text-muted-foreground">
              Track grant periods that follow fiscal years. Report to funders on their timeline. Manage multiple grants with different fiscal calendars.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">International business operations</h3>
            <p className="text-sm text-muted-foreground">
              Coordinate with offices in different countries. UK uses April fiscal year start. Australia uses July. Plan consolidated reporting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Retail business analysis</h3>
            <p className="text-sm text-muted-foreground">
              Many retailers use fiscal years ending in January or February. This captures holiday sales in the same fiscal year. Compare year-over-year performance accurately.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Fiscal year naming can be confusing.</strong>
              FY2024 typically refers to the year ending in 2024, not starting. A fiscal year starting October 2023 and ending September 2024 is usually called FY2024.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Quarters are 3-month periods from your start date.</strong>
              Q1 begins on your fiscal year start date. Each quarter is exactly 3 months. Quarter end dates vary based on your fiscal year configuration.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some fiscal years don't align with calendar quarters.</strong>
              If your fiscal year starts mid-month (like UK's April 6), quarters also start mid-month. This affects reporting periods and deadline calculations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Progress calculation uses current date.</strong>
              The progress bar shows real-time completion percentage. Days elapsed counts from fiscal year start to today. Refresh the page for updated progress.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Important:</strong> Always verify your organization's official fiscal year dates. Some entities have unique fiscal calendars that don't match standard presets.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is a fiscal year?</h3>
            <p className="text-sm text-muted-foreground">
              A fiscal year is a 12-month period used for accounting and budgeting. It doesn't have to start January 1. Organizations choose fiscal years that align with their business cycles.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do companies use different fiscal years?</h3>
            <p className="text-sm text-muted-foreground">
              Businesses often end their fiscal year after peak seasons. Retailers end in January post-holidays. Schools end in summer. This provides cleaner financial snapshots.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the US federal fiscal year?</h3>
            <p className="text-sm text-muted-foreground">
              The US federal government's fiscal year runs October 1 to September 30. FY2024 started October 1, 2023 and ends September 30, 2024.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I change my fiscal year?</h3>
            <p className="text-sm text-muted-foreground">
              Businesses can change fiscal years with IRS approval (Form 1128 for corporations). There must be a valid business purpose. Consult a tax professional before changing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are fiscal quarters calculated?</h3>
            <p className="text-sm text-muted-foreground">
              Q1 starts on your fiscal year start date and runs 3 months. Q2, Q3, and Q4 follow sequentially. Each quarter is exactly 3 months regardless of your start date.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a 4-4-5 calendar?</h3>
            <p className="text-sm text-muted-foreground">
              Some retailers use a 4-4-5 week pattern within quarters for consistent week comparisons. This tool uses standard monthly quarters. 4-4-5 requires specialized calendars.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do nonprofits use fiscal years?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, nonprofits operate on fiscal years for budgeting and grant reporting. Many align with the federal fiscal year (October-September) for grant compatibility.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
