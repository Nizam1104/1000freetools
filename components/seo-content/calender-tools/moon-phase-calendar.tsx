import * as React from "react"

export default function MoonPhaseCalendarSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            This calendar displays the lunar cycle for any month and year, showing the exact dates and times of new moons, first quarters, full moons, and last quarters. Each day shows the moon's illumination percentage and current phase name.
          </p>
          <p>
            Select any month to see a complete lunar calendar with visual moon phase icons for each day. The current moon phase is highlighted, and upcoming major phases (new, full, quarters) are marked with special indicators.
          </p>
          <p>
            Click on any date to see detailed information including the moon's age (days since new moon), illumination percentage, distance from Earth, and the exact times of moonrise and moonset for that day.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Astrophotography</h3>
            <p className="text-sm text-muted-foreground">
              Plan night sky photography sessions around new moons for dark skies or full moons for lunar landscapes.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Gardening by the Moon</h3>
            <p className="text-sm text-muted-foreground">
              Follow lunar gardening traditions that suggest planting during certain moon phases for better growth.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Fishing and Hunting</h3>
            <p className="text-sm text-muted-foreground">
              Many anglers and hunters track moon phases as they affect animal behavior and feeding patterns.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Cultural and Religious Observances</h3>
            <p className="text-sm text-muted-foreground">
              Track Islamic, Jewish, Buddhist, and Hindu holidays that follow lunar calendars or moon phases.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Tide Planning</h3>
            <p className="text-sm text-muted-foreground">
              Moon phases affect tides. Plan beach activities, surfing, or coastal work around spring and neap tides.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Sleep Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Some people track how moon phases affect their sleep patterns and overall well-being.
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
              <strong className="text-foreground">Times are in UTC:</strong> Moon phase times are shown in Coordinated Universal Time. Convert to your local time zone for precise local timing of phase changes.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Moonrise/moonset vary by location:</strong> The displayed times are approximate. Actual moonrise and moonset depend on your specific geographic location.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Lunar cycle is 29.5 days:</strong> A complete lunar cycle (synodic month) averages 29.53 days, which is why full moons don't fall on the same date each month.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Blue moons are rare:</strong> A "blue moon" (second full moon in a calendar month) occurs roughly every 2-3 years. The calendar marks these special occurrences.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Illumination is approximate:</strong> Moon illumination percentages are calculated astronomically but actual visibility depends on weather, light pollution, and atmospheric conditions.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">What moon phase is tonight?</h3>
            <p className="text-sm text-muted-foreground">
              The current moon phase is displayed prominently at the top of the calendar, showing the phase name, illumination percentage, and days until the next major phase.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">When is the next full moon?</h3>
            <p className="text-sm text-muted-foreground">
              Upcoming full moons are marked on the calendar with a special indicator. The exact date and time are shown, along with how many days away it is from today.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Why doesn't the moon rise at the same time every day?</h3>
            <p className="text-sm text-muted-foreground">
              The moon rises about 50 minutes later each day on average because it orbits Earth while Earth rotates. This daily shift means moonrise times cycle through all hours over a month.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What's a supermoon?</h3>
            <p className="text-sm text-muted-foreground">
              A supermoon occurs when a full moon coincides with the moon's closest approach to Earth (perigee). It appears up to 14% larger and 30% brighter than a typical full moon.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I see moon phases for past years?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Navigate to any month in the past or future to see historical or predicted moon phases. The calculations are based on precise astronomical formulas.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How accurate are the moon phase times?</h3>
            <p className="text-sm text-muted-foreground">
              Phase times are accurate to within a minute for dates within a few centuries of today. For extreme past or future dates, small variations may occur due to long-term orbital changes.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What causes moon phases?</h3>
            <p className="text-sm text-muted-foreground">
              Moon phases result from the changing angles between the Sun, Earth, and Moon as the Moon orbits Earth. We see different portions of the sunlit side depending on the Moon's position.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
