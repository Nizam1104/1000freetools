import * as React from "react"

export default function BusinessHoursCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Define your business hours by setting open and close times for each day of the week. Configure different hours for different days - many businesses have shorter hours on weekends or extended hours on certain weekdays.
          </p>
          <p>
            Add holidays and special closure dates when your business is closed despite normal operating hours. Set up recurring holidays that apply every year, or one-time closures for specific dates.
          </p>
          <p>
            Calculate business hours between any two dates and times. The calculator excludes nights, weekends, and holidays, showing only the actual operating hours. Also calculate future dates by adding a specific number of business hours to a start time.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">SLA Compliance</h3>
            <p className="text-sm text-muted-foreground">
              Track service level agreement response times that count only business hours, not nights and weekends.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Customer Support</h3>
            <p className="text-sm text-muted-foreground">
              Set accurate expectations for response times by calculating when support will actually be available.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Project Deadlines</h3>
            <p className="text-sm text-muted-foreground">
              Calculate realistic delivery dates based on actual working hours available, not calendar time.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Shipping Estimates</h3>
            <p className="text-sm text-muted-foreground">
              Provide accurate delivery estimates that account for business days and processing time.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Legal Deadlines</h3>
            <p className="text-sm text-muted-foreground">
              Calculate filing deadlines and response periods that are defined in business days, not calendar days.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Staff Scheduling</h3>
            <p className="text-sm text-muted-foreground">
              Verify that scheduled hours align with business operating hours and identify coverage gaps.
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
              <strong className="text-foreground">Business hours vs working hours:</strong> Business hours are when your organization is open. Working hours are when individual employees work. This tool calculates based on business operating hours.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Time zone matters:</strong> All calculations use the time zone you specify. For multi-location businesses, calculate separately for each location's time zone.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Partial hours counted:</strong> If a period starts or ends mid-hour, the calculator includes the partial hour. 9:30 AM to 11:30 AM equals 2 business hours.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Lunch breaks:</strong> If your business closes for lunch, set separate morning and afternoon hours (e.g., 9 AM-12 PM and 1 PM-5 PM) to exclude lunch from calculations.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Holiday priority:</strong> Holidays override regular business hours. If a holiday falls on a day you're normally open, it's treated as closed unless you specify holiday hours.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">How do I calculate 3 business days from today?</h3>
            <p className="text-sm text-muted-foreground">
              Use the "add business time" function. Enter today's date and add 3 business days (or 24 business hours for standard 8-hour days). The result excludes weekends and holidays.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What if my business has different hours per location?</h3>
            <p className="text-sm text-muted-foreground">
              Create separate configurations for each location. Save each as a named preset if the tool supports it, or keep notes of each location's hours for quick reference.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Does this handle overnight business hours?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. For businesses open overnight (like 10 PM to 6 AM), set the hours accordingly. The calculator handles periods that span midnight correctly.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I exclude lunch breaks?</h3>
            <p className="text-sm text-muted-foreground">
              Set split hours for days with lunch closures. For example, Monday-Friday: 9:00-12:00 and 13:00-17:00. The calculator only counts time within these windows.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I calculate hours across multiple weeks?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. There's no limit on the date range. The calculator correctly handles any span, counting only hours within your defined business operating times.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What's the difference between business days and business hours?</h3>
            <p className="text-sm text-muted-foreground">
              Business days count full days (excluding weekends/holidays). Business hours count actual operating hours. 3 business days = 24 hours for an 8-hour business, but only if no holidays intervene.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I use this for 24/7 businesses?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Set all days to 24-hour operation (00:00-24:00). The calculator will then count all hours except those on dates you mark as holidays or closures.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
