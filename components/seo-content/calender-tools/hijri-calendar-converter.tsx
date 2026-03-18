import React from "react"

export default function HijriCalendarConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Hijri Calendar Converter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool converts dates between the Islamic (Hijri) lunar calendar and the Gregorian solar calendar. Enter a date in either calendar system and get the equivalent date in the other.
          </p>
          <p>
            The Hijri calendar has 12 lunar months of 29 or 30 days, totaling 354 or 355 days per year—about 11 days shorter than the Gregorian year. This means Islamic dates shift earlier each Gregorian year. The converter uses astronomical calculations for accuracy.
          </p>
          <p>
            View monthly Hijri calendars with key Islamic dates highlighted—Ramadan, Eid al-Fitr, Eid al-Adha, and other important occasions. The tool shows both calendars side by side for easy reference and planning.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Planning around Ramadan</h3>
            <p className="text-sm text-muted-foreground">
              Find when Ramadan starts in Gregorian dates for scheduling work, school, or events. Plan ahead for the fasting month and Eid celebrations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Scheduling international meetings</h3>
            <p className="text-sm text-muted-foreground">
              Working with colleagues in Muslim-majority countries? Check Islamic holidays to avoid scheduling conflicts during Eid or other important dates.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Converting birth dates for documents</h3>
            <p className="text-sm text-muted-foreground">
              Official documents may require both calendar dates. Convert Hijri birth dates to Gregorian for passports, visas, or international applications.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Planning Islamic events and celebrations</h3>
            <p className="text-sm text-muted-foreground">
              Organize community iftars, Eid events, or religious programs. Convert dates to coordinate with venues, caterers, and attendees using Gregorian calendars.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Research and historical work</h3>
            <p className="text-sm text-muted-foreground">
              Historical Islamic texts use Hijri dates. Convert them to Gregorian for timelines, academic papers, or genealogy research.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Travel planning to Muslim countries</h3>
            <p className="text-sm text-muted-foreground">
              Visiting during Ramadan or Eid affects business hours and availability. Convert dates to understand local calendars before booking travel.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Calendar conversions are approximate.</strong>
              The Hijri calendar is based on moon sightings, which vary by location. Conversions are estimates—actual dates depend on local moon sighting announcements.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Different countries may observe different dates.</strong>
              Saudi Arabia, Pakistan, Indonesia, and other Muslim countries may announce Eid on different days based on local moon sightings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">The Hijri year is shorter than Gregorian.</strong>
              Islamic year is about 354 days—11 days shorter than solar year. Islamic dates move through all seasons over a 33-year cycle.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Month names vary by region.</strong>
              Muharram, Safar, Rabi' al-Awwal, etc. are standard, but transliterations differ (Ramadan/Ramadhan). The tool uses common English spellings.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Important:</strong> For religious observances, always confirm dates with local Islamic authorities. This tool provides calculations, not official religious rulings.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do Islamic dates change every year?</h3>
            <p className="text-sm text-muted-foreground">
              The Hijri calendar is lunar (354 days), while Gregorian is solar (365 days). Islamic dates shift about 11 days earlier each Gregorian year.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How accurate is the conversion?</h3>
            <p className="text-sm text-muted-foreground">
              Calculations are astronomically accurate but may differ by ±1 day from actual moon sightings. Religious observances depend on local announcements.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What are the Islamic month names?</h3>
            <p className="text-sm text-muted-foreground">
              1. Muharram, 2. Safar, 3. Rabi' al-Awwal, 4. Rabi' al-Thani, 5. Jumada al-Awwal, 6. Jumada al-Thani, 7. Rajab, 8. Sha'ban, 9. Ramadan, 10. Shawwal, 11. Dhu al-Qi'dah, 12. Dhu al-Hijjah.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When is the Islamic New Year?</h3>
            <p className="text-sm text-muted-foreground">
              Islamic New Year is 1 Muharram. It shifts through the Gregorian calendar over time. In 2024, it falls around July 7; in 2025, around June 26.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does Ramadan move through seasons?</h3>
            <p className="text-sm text-muted-foreground">
              Because the lunar year is shorter, Ramadan cycles through all seasons over 33 years. This means fasting hours vary dramatically depending on the year and location.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I print Hijri calendars?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, use the monthly view to see full Hijri months. Screenshot or print for reference. Many Muslims keep both calendars visible during Ramadan.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the current Hijri year?</h3>
            <p className="text-sm text-muted-foreground">
              The current Islamic year is 1446 AH (Anno Hegirae). Year 1 AH began with Prophet Muhammad's migration from Mecca to Medina in 622 CE.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
