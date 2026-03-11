import * as React from "react"

export default function FiscalYearCalendarSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Select your fiscal year start month to generate a calendar aligned with your organization's financial year. Common options include July (many governments and universities), October (US federal government), or any custom month that matches your business cycle.
          </p>
          <p>
            The calendar displays both fiscal periods (P1, P2, etc.) and calendar months side by side. Each fiscal period shows its start and end dates, making it easy to see which calendar dates belong to which fiscal period.
          </p>
          <p>
            Toggle between different fiscal year configurations - 4-4-5 retail calendar, 13 equal periods, or standard monthly periods. Export the calendar as PDF or CSV for integration with financial systems and reports.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Financial Reporting</h3>
            <p className="text-sm text-muted-foreground">
              Align financial statements, budgets, and forecasts with your organization's fiscal periods.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Retail Planning</h3>
            <p className="text-sm text-muted-foreground">
              Use the 4-4-5 retail calendar that aligns weeks with months for consistent year-over-year comparisons.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Tax Preparation</h3>
            <p className="text-sm text-muted-foreground">
              Track fiscal year deadlines and periods for businesses that don't use the calendar year for taxes.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Grant Management</h3>
            <p className="text-sm text-muted-foreground">
              Monitor grant periods and reporting deadlines that often follow fiscal rather than calendar years.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Academic Administration</h3>
            <p className="text-sm text-muted-foreground">
              Plan academic budgets and resources around the typical July-June academic fiscal year.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Sales Quotas</h3>
            <p className="text-sm text-muted-foreground">
              Set and track sales targets by fiscal period rather than calendar month for consistency.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Fiscal year naming:</strong> FY2024 typically refers to the year ending in 2024, not starting. A fiscal year starting July 2023 and ending June 2024 is usually called FY2024.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">4-4-5 calendar explained:</strong> In retail, each quarter has two 4-week months and one 5-week month, ensuring each quarter has exactly 13 weeks for comparable sales analysis.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Period end dates:</strong> Fiscal periods typically end on a specific day of the week (like the last Saturday of the month) rather than the calendar month-end.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Short periods:</strong> Some fiscal calendars have a "Period 13" or short year-end period to reconcile the difference between 52 weeks and 365 days.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">System alignment:</strong> Ensure your fiscal calendar matches what's configured in your ERP, accounting, and reporting systems to avoid reconciliation issues.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">What is the most common fiscal year?</h3>
            <p className="text-sm text-muted-foreground">
              The calendar year (January-December) is most common for individuals and many businesses. July-June is common for governments and universities. October-September is used by the US federal government.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I determine my fiscal year?</h3>
            <p className="text-sm text-muted-foreground">
              Check your organization's bylaws, tax filings, or accounting system settings. For new businesses, you can choose any 12-month period, but consistency is important once selected.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Why do retailers use 4-4-5 calendars?</h3>
            <p className="text-sm text-muted-foreground">
              It ensures each period has the same number of weekends, making week-over-week and year-over-year sales comparisons more meaningful since weekends typically have higher sales.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I change my fiscal year?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but it requires filing appropriate forms with tax authorities and may have tax implications. Consult with an accountant before changing your fiscal year.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What's a 53-week year?</h3>
            <p className="text-sm text-muted-foreground">
              Since 52 weeks equals 364 days, most years need an extra week added periodically. Companies using weekly fiscal calendars add a 53rd week every 5-6 years to stay aligned.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I export this for Excel?</h3>
            <p className="text-sm text-muted-foreground">
              Use the CSV export option to download a spreadsheet-compatible file with fiscal periods, start dates, and end dates that you can open in Excel or Google Sheets.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Are fiscal quarters the same as calendar quarters?</h3>
            <p className="text-sm text-muted-foreground">
              Only if your fiscal year starts in January. Otherwise, Q1 of your fiscal year will span different months than calendar Q1. The calendar shows both for reference.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
