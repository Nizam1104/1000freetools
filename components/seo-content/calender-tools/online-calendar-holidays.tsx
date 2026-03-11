import * as React from "react"

export default function OnlineCalendarHolidaysSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            This interactive calendar displays public holidays from countries around the world. Select your country (or multiple countries) from the available options, and the calendar highlights all national holidays for the current month. Navigate between months and years using the arrow buttons, or jump to today with a single click.
          </p>
          <p>
            Each holiday is color-coded by type: public holidays appear in red, observances in blue, and religious holidays in purple. Click on any date to see detailed information about holidays occurring on that day, including descriptions and the countries that observe them. Toggle international holidays on or off depending on whether you want to see globally recognized dates like Earth Day or International Women's Day.
          </p>
          <p>
            The calendar pulls from a comprehensive database of national holidays for the US, UK, India, Canada, Australia, Germany, France, and Japan. You can filter by holiday type using the checkboxes, making it easy to focus on just public holidays or include observances and religious dates as needed.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Planning International Projects</h3>
            <p className="text-sm text-muted-foreground">
              Coordinate deadlines around holidays in different countries when working with remote teams or global clients.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Travel Planning</h3>
            <p className="text-sm text-muted-foreground">
              Check if your travel dates coincide with public holidays when banks, shops, and attractions might be closed.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">HR and Payroll</h3>
            <p className="text-sm text-muted-foreground">
              Verify holiday schedules for employees in different regions to ensure proper time-off policies and pay calculations.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Marketing Campaigns</h3>
            <p className="text-sm text-muted-foreground">
              Schedule promotions and email campaigns around holidays when engagement might be higher or lower depending on the occasion.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Customer Support Coverage</h3>
            <p className="text-sm text-muted-foreground">
              Plan support team schedules knowing which days are holidays in different regions to maintain adequate coverage.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Personal Planning</h3>
            <p className="text-sm text-muted-foreground">
              Keep track of holidays in your home country while living abroad, or plan around holidays when visiting family.
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
              <strong className="text-foreground">Holiday dates are fixed:</strong> This calendar shows holidays on their standard dates. Some holidays that fall on weekends may have observed dates on nearby weekdays, which aren't reflected here.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Regional variations not included:</strong> Many countries have state, provincial, or local holidays that vary by region. This tool shows national holidays only.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Lunar calendar holidays approximated:</strong> Holidays based on lunar calendars (like Diwali or Easter) are shown on their Gregorian calendar dates for the current year only.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Not legal advice:</strong> For employment law compliance, always verify holidays with official government sources as observance rules can change.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Limited country coverage:</strong> Currently supports 8 countries plus international observances. More countries may be added in future updates.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Can I view holidays for multiple countries at once?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Click on multiple country buttons to add them to your view. The calendar will display holidays from all selected countries, with each holiday labeled by its country of origin.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I find holidays for a specific month next year?</h3>
            <p className="text-sm text-muted-foreground">
              Use the year navigation buttons (the circular arrows) to jump forward or backward by a full year, or use the monthly arrows to navigate one month at a time until you reach your target date.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What's the difference between public holidays and observances?</h3>
            <p className="text-sm text-muted-foreground">
              Public holidays are official days when government offices, banks, and many businesses close. Observances are recognized dates like Earth Day or Valentine's Day that aren't typically days off work but are widely acknowledged.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I export or print this calendar?</h3>
            <p className="text-sm text-muted-foreground">
              While there's no built-in export feature, you can use your browser's print function (Ctrl+P or Cmd+P) to print the current month view. For regular exports, consider using dedicated calendar software that supports holiday imports.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Why don't I see holidays for my country?</h3>
            <p className="text-sm text-muted-foreground">
              The tool currently supports US, UK, India, Canada, Australia, Germany, France, and Japan. If your country isn't listed, you can still view international observances or check back for future updates that may add more countries.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Are the holiday descriptions accurate?</h3>
            <p className="text-sm text-muted-foreground">
              We've compiled holiday information from official government sources and widely recognized references. However, for critical planning purposes, always verify with your local government's official holiday calendar.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I use this for business planning?</h3>
            <p className="text-sm text-muted-foreground">
              Absolutely. Many users rely on this tool for scheduling international meetings, planning product launches, and coordinating with overseas partners. Just remember to double-check with local contacts for region-specific closures.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
