import React from "react"

export default function MoonPhaseCalendarSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Moon Phase Calendar Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select any year and month to view the moon phases for that period. The calendar displays each day with its corresponding moon phase icon and name.
          </p>
          <p>
            The current moon phase shows at the top with the phase name, icon, and moon age in days. A visual illumination bar shows the moon's current phase from new to full.
          </p>
          <p>
            Click any date in the calendar to see detailed information about that day's moon phase, including illumination percentage and moon age.
          </p>
          <p>
            The moon phase algorithm calculates based on the synodic month (29.53 days) - the time between consecutive new moons. This provides accurate phase predictions for any date.
          </p>
          <p>
            Eight distinct phases are displayed: New Moon, Waxing Crescent, First Quarter, Waxing Gibbous, Full Moon, Waning Gibbous, Last Quarter, and Waning Crescent.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Gardening by moon cycles</h3>
            <p className="text-sm text-muted-foreground">
              Some gardeners plant by moon phases. Root crops during waning moon, leafy greens during waxing. Track lunar gardening schedules throughout the year.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Astrophotography planning</h3>
            <p className="text-sm text-muted-foreground">
              Plan night sky photography around new moons for darkest skies. Schedule Milky Way shoots during moonless periods. Avoid full moon light pollution.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fishing and hunting schedules</h3>
            <p className="text-sm text-muted-foreground">
              Many anglers and hunters track moon phases. Fish and game activity often correlates with moon position. Plan trips around major and minor feeding times.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cultural and religious observances</h3>
            <p className="text-sm text-muted-foreground">
              Many religions follow lunar calendars. Islam, Judaism, and Buddhism have holidays based on moon phases. Track important religious dates and observances.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Tide prediction for coastal activities</h3>
            <p className="text-sm text-muted-foreground">
              Moon phases affect tides. Spring tides occur during new and full moons. Plan beach activities, surfing, or coastal hiking around extreme tides.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Educational astronomy lessons</h3>
            <p className="text-sm text-muted-foreground">
              Teach students about lunar cycles and Earth-Sun-Moon relationships. Track the moon through a complete cycle. Connect classroom learning to real observations.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Moon age is days since new moon.</strong>
              Moon age ranges from 0 to 29.5 days. Age 0 is new moon, age 14-15 is full moon. This helps predict when the next phase will occur.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Phases are the same worldwide.</strong>
              The moon phase is identical everywhere on Earth. However, the moon's orientation appears different in Northern vs Southern Hemispheres.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Calculations are astronomical estimates.</strong>
              The algorithm provides phase predictions based on average synodic month length. Actual phases may vary by a day due to orbital mechanics.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Waxing means growing, waning means shrinking.</strong>
              Waxing phases (crescent to gibbous) occur between new and full moon. Waning phases occur between full and new moon. Remember: "Light on the right is growing bright."
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Note:</strong> For precise astronomical observations, consult professional ephemeris data. This tool provides general phase information suitable for most purposes.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What causes moon phases?</h3>
            <p className="text-sm text-muted-foreground">
              Moon phases result from the changing angles between Sun, Earth, and Moon. We see different portions of the sunlit side as the Moon orbits Earth every 29.5 days.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How long is a lunar cycle?</h3>
            <p className="text-sm text-muted-foreground">
              A complete lunar cycle (synodic month) averages 29.53 days. This varies slightly due to the Moon's elliptical orbit and gravitational interactions with Earth and Sun.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is a blue moon?</h3>
            <p className="text-sm text-muted-foreground">
              A blue moon is the second full moon in a calendar month. Despite the name, the moon doesn't appear blue. This occurs roughly every 2-3 years.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does the moon rise at different times?</h3>
            <p className="text-sm text-muted-foreground">
              The moon rises about 50 minutes later each day due to its orbit around Earth. Full moons rise at sunset, new moons rise at sunrise.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between gibbous and crescent?</h3>
            <p className="text-sm text-muted-foreground">
              Crescent moons are less than half illuminated. Gibbous moons are more than half illuminated but not full. Quarter moons are exactly half illuminated.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I see the moon during the day?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, the moon is often visible during daytime, especially during first and last quarter phases. It's harder to see near new moon (too close to Sun) or full moon (only visible at night).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is moon illumination percentage?</h3>
            <p className="text-sm text-muted-foreground">
              Illumination shows what percentage of the moon's visible disk is lit by the Sun. New moon is 0%, full moon is 100%. First and last quarters are 50%.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
