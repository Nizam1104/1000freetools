import * as React from "react"

export default function WeekNumberCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            This calculator converts between dates and week numbers using either ISO 8601 or US standard week numbering. Select your preferred standard at the top - ISO 8601 is the international standard where weeks start on Monday and week 1 contains the first Thursday of the year, while US standard uses Sunday as the week start with week 1 being the first week of January.
          </p>
          <p>
            In the "Date to Week" tab, pick any date to instantly see its week number, along with the start and end dates of that week. The "Week to Date" tab does the reverse - enter a week number and year to get the exact date range. The "Browse Year" tab shows all 52 or 53 weeks of any year in a scrollable list.
          </p>
          <p>
            The current week is always highlighted at the top of the page, showing the week number and date range. Results can be copied to clipboard for easy sharing or documentation. The tool handles edge cases like weeks that span year boundaries correctly.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Project Management</h3>
            <p className="text-sm text-muted-foreground">
              Track project milestones by week number instead of dates for cleaner Gantt charts and status reports.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Payroll Processing</h3>
            <p className="text-sm text-muted-foreground">
              Calculate weekly pay periods and verify that payroll runs align with the correct week numbers.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Manufacturing Scheduling</h3>
            <p className="text-sm text-muted-foreground">
              Plan production runs and delivery schedules using week numbers that are consistent across international facilities.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Academic Planning</h3>
            <p className="text-sm text-muted-foreground">
              Map out semester weeks, assignment due dates, and exam periods using standardized week numbering.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Sprint Planning</h3>
            <p className="text-sm text-muted-foreground">
              Organize agile development sprints by week numbers for consistent tracking across teams and time zones.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Compliance Reporting</h3>
            <p className="text-sm text-muted-foreground">
              Generate weekly compliance reports that align with regulatory requirements using ISO week standards.
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
              <strong className="text-foreground">ISO 8601 vs US standard matters:</strong> The same date can have different week numbers depending on the standard. ISO week 1 of 2024 starts on January 1st (Monday), while US week 1 may start on December 31st if it's a Sunday.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Some years have 53 weeks:</strong> Under ISO 8601, years where January 1st falls on a Thursday (or Wednesday in leap years) have 53 weeks instead of 52. The browse view shows the correct count.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Week boundaries can cross months:</strong> A single week may span two months or even two years. Week 1 of 2025 under ISO 8601 actually starts on December 30, 2024.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Week start day varies:</strong> ISO weeks start on Monday and end on Sunday. US weeks start on Sunday and end on Saturday. This affects which dates belong to which week.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Copy results for documentation:</strong> Use the copy button to grab formatted results for reports, emails, or project documentation without manual typing.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">What week number is today?</h3>
            <p className="text-sm text-muted-foreground">
              The current week number is displayed prominently at the top of the page, along with the date range. It updates automatically and shows whether you're viewing ISO or US standard.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Why does week 1 sometimes start in December?</h3>
            <p className="text-sm text-muted-foreground">
              Under ISO 8601, week 1 is the week containing the first Thursday of the year. If January 1st is a Friday, Saturday, or Sunday, those days belong to the last week of the previous year, and week 1 starts on the following Monday.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I find all dates in week 25?</h3>
            <p className="text-sm text-muted-foreground">
              Use the "Week to Date" tab. Enter "25" as the week number and select your year. The result shows the exact start and end dates for that week.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Which standard should I use?</h3>
            <p className="text-sm text-muted-foreground">
              Use ISO 8601 for international business, European operations, or any context where consistency across borders matters. Use US standard for domestic US applications, especially those tied to traditional calendars.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I see all weeks for a specific year?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Go to the "Browse Year" tab and select any year from 2016 to 2035. You'll see a complete list of all weeks with their date ranges, with the current week highlighted if viewing the current year.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I calculate week numbers in Excel?</h3>
            <p className="text-sm text-muted-foreground">
              Excel's WEEKNUM function can calculate week numbers, but the results may differ from ISO 8601. For ISO weeks, use =ISOWEEKNUM(date). This tool provides a quick reference without spreadsheet formulas.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Are week numbers the same worldwide?</h3>
            <p className="text-sm text-muted-foreground">
              No. Different countries and industries use different standards. ISO 8601 is most common internationally, but the US, Middle East, and some other regions use Sunday-start weeks. Always specify which standard you're using.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
