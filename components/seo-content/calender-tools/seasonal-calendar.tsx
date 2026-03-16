import * as React from "react"

export default function SeasonalCalendarSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            This calendar displays the four astronomical seasons - spring, summer, autumn, and winter - with their exact start and end dates based on solstices and equinoxes. Select any year to see when each season begins and ends, down to the specific time of day.
          </p>
          <p>
            The calendar shows both Northern and Southern hemisphere seasons simultaneously, since they're opposite. When it's summer in the North, it's winter in the South. Each season's duration is calculated precisely based on Earth's orbit around the sun.
          </p>
          <p>
            Visual indicators show the current season with a progress bar indicating how far through the season we are. Upcoming season changes are highlighted, and you can see exactly how many days remain until the next equinox or solstice.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Gardening Planning</h3>
            <p className="text-sm text-muted-foreground">
              Know exactly when seasons change to plan planting, harvesting, and garden maintenance schedules.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Event Planning</h3>
            <p className="text-sm text-muted-foreground">
              Schedule seasonal events, festivals, or outdoor activities aligned with the natural calendar.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Educational Purposes</h3>
            <p className="text-sm text-muted-foreground">
              Teach students about Earth's orbit, axial tilt, and why we have seasons with concrete dates and times.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Photography Planning</h3>
            <p className="text-sm text-muted-foreground">
              Plan shoots around seasonal lighting conditions, golden hours, and natural scenery changes.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Travel Planning</h3>
            <p className="text-sm text-muted-foreground">
              Time trips to coincide with preferred seasons, whether it's cherry blossoms in spring or fall foliage.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Wellness and Self-Care</h3>
            <p className="text-sm text-muted-foreground">
              Align self-care routines, exercise goals, or lifestyle changes with seasonal rhythms and energy patterns.
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
              <strong className="text-foreground">Astronomical vs meteorological seasons:</strong> This tool uses astronomical seasons (based on Earth's position relative to the sun), which differ from meteorological seasons (fixed three-month periods).
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Times are in UTC:</strong> Season start times are shown in Coordinated Universal Time. Convert to your local time zone for precise local timing.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Season lengths vary:</strong> Due to Earth's elliptical orbit, seasons aren't exactly equal length. Summer in the Northern Hemisphere is actually a few days longer than winter.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Hemisphere matters:</strong> Always check which hemisphere's season you're viewing. The same date represents opposite seasons in Northern and Southern hemispheres.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Leap year effects:</strong> Season dates can shift slightly in leap years. The calendar accounts for this automatically when you select different years.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">When does spring start?</h3>
            <p className="text-sm text-muted-foreground">
              Spring starts at the vernal equinox, typically March 20 or 21 in the Northern Hemisphere (September 22 or 23 in the Southern). The exact date and time vary yearly based on Earth's orbit.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Why do season dates change each year?</h3>
            <p className="text-sm text-muted-foreground">
              Earth's orbit takes approximately 365.25 days, so our calendar drifts slightly relative to Earth's position. Leap years correct this, but season start times still vary by about 6 hours yearly.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What's the difference between solstice and equinox?</h3>
            <p className="text-sm text-muted-foreground">
              Solstices (summer and winter) mark when the sun reaches its highest or lowest point in the sky. Equinoxes (spring and autumn) occur when day and night are approximately equal length worldwide.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Are seasons the same length?</h3>
            <p className="text-sm text-muted-foreground">
              No. Northern Hemisphere summer is about 93.6 days, while winter is about 89 days. This is because Earth moves faster in its orbit when closer to the sun (perihelion in January).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I see seasons for past or future years?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Select any year to see its season dates. The calculations are based on astronomical formulas that work for years in the past and future.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What season is it right now?</h3>
            <p className="text-sm text-muted-foreground">
              The current season is highlighted at the top of the calendar with a progress indicator showing how far through the season we are and when the next season begins.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Do other planets have seasons?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, planets with tilted axes experience seasons. Mars has seasons like Earth but they're twice as long. Uranus has extreme seasons due to its 98-degree axial tilt.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
