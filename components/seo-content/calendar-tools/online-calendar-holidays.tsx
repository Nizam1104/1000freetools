import React from "react"

export default function OnlineCalendarHolidaysSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Holiday Calendar Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select any year to view holidays for that period. The calendar includes US federal holidays, common observances, religious holidays, and allows custom additions.
          </p>
          <p>
            Filter holidays by type: public holidays, observances, religious, or custom. This helps focus on relevant holidays for your needs.
          </p>
          <p>
            Each holiday displays with its date, day of the week, and type badge. Weekend holidays are marked so you can plan accordingly.
          </p>
          <p>
            Add custom holidays with your own names, dates, and types. Choose whether they recur annually or are one-time events.
          </p>
          <p>
            Export all holidays as an ICS file to import into your calendar application. The monthly overview shows holiday distribution throughout the year.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">HR and payroll planning</h3>
            <p className="text-sm text-muted-foreground">
              Track paid time off policies around holidays. Plan holiday pay calculations. Ensure compliance with labor laws for holiday work.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Business operations scheduling</h3>
            <p className="text-sm text-muted-foreground">
              Know when banks, government offices, and partners are closed. Plan shipments and deadlines around holidays. Avoid delays from unexpected closures.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Marketing campaign planning</h3>
            <p className="text-sm text-muted-foreground">
              Schedule promotions around holidays. Plan email campaigns and social media content. Align marketing with holiday shopping seasons.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">School and childcare coordination</h3>
            <p className="text-sm text-muted-foreground">
              Know when schools are closed for holidays. Arrange childcare for working parents. Plan family activities during school breaks.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Travel and vacation planning</h3>
            <p className="text-sm text-muted-foreground">
              Avoid peak travel days around major holidays. Book flights and hotels early for holiday periods. Plan extended weekends efficiently.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">International team coordination</h3>
            <p className="text-sm text-muted-foreground">
              Track holidays across different countries. Schedule meetings when all team members are available. Respect cultural observances.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Federal holidays affect government operations.</strong>
              US federal holidays close government offices, banks, and post offices. Many businesses also observe these holidays. Private employers aren't required to give time off.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some holidays shift to weekdays.</strong>
              When federal holidays fall on weekends, they're often observed on adjacent weekdays. This calendar shows actual dates, not observed dates.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Religious holidays follow different calendars.</strong>
              Easter, Passover, Ramadan, and other religious holidays use lunar or lunisolar calendars. Dates change yearly in the Gregorian calendar.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Custom holidays can be recurring or one-time.</strong>
              Check the recurring option for annual events like birthdays or anniversaries. Uncheck for one-time events like special celebrations.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Note:</strong> Holiday dates are provided for planning purposes. Verify official dates with relevant authorities, especially for religious observances and international holidays.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What are US federal holidays?</h3>
            <p className="text-sm text-muted-foreground">
              Federal holidays are designated by the US government for federal employees. They include New Year's Day, Independence Day, Thanksgiving, Christmas, and others honoring historical figures and events.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I add company-specific holidays?</h3>
            <p className="text-sm text-muted-foreground">
              Use the Add Holiday feature. Enter your company holiday name, select the date, choose "Custom" type, and check recurring if it's annual. Save to include in your calendar.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I export to Google Calendar?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, export as ICS file and import to Google Calendar. Go to Settings, Import & Export, choose the file. Holidays appear in your selected calendar.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why are some holidays on different dates each year?</h3>
            <p className="text-sm text-muted-foreground">
              Some holidays follow lunar calendars (Easter, Chinese New Year). Others are set to specific weekdays (Thanksgiving is fourth Thursday of November). Fixed-date holidays stay the same.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between observances and public holidays?</h3>
            <p className="text-sm text-muted-foreground">
              Public holidays are official days off. Observances are recognized but typically not holidays - like Valentine's Day or Halloween. Businesses usually remain open.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I remove preset holidays?</h3>
            <p className="text-sm text-muted-foreground">
              Preset holidays can't be individually removed, but you can filter by type to hide categories. Custom holidays you add can be deleted with the X button.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How accurate are religious holiday dates?</h3>
            <p className="text-sm text-muted-foreground">
              Dates are estimates based on common calculations. Actual religious observance dates may vary by denomination, region, or local moon sightings. Verify with religious authorities.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
