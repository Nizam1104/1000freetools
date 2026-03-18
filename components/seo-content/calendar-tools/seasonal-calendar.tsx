import React from "react"

export default function SeasonalCalendarSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Seasonal Calendar Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select your hemisphere - Northern or Southern. The calendar displays the four astronomical seasons with their exact start and end dates for any year.
          </p>
          <p>
            Enter a specific date to see which season it falls in. The tool calculates based on equinox and solstice dates, which vary slightly each year.
          </p>
          <p>
            Current season information shows at the top with the season name, icon, and today's date. This updates automatically when you change the year or hemisphere.
          </p>
          <p>
            Each season card displays the start date, end date, and total duration in days. Spring and autumn are typically around 92-93 days, while summer and winter vary.
          </p>
          <p>
            A visual timeline shows the proportional length of each season throughout the year. Colors represent spring (green), summer (yellow), autumn (orange), and winter (blue).
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Gardening and planting schedules</h3>
            <p className="text-sm text-muted-foreground">
              Know exactly when seasons change for planting zones. Plan seed starting, transplanting, and harvest. Avoid frost damage by timing with seasons.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Event planning by season</h3>
            <p className="text-sm text-muted-foreground">
              Schedule outdoor events in appropriate seasons. Weddings, festivals, and sports depend on weather. Plan backup dates based on seasonal transitions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Educational lesson planning</h3>
            <p className="text-sm text-muted-foreground">
              Teach astronomy, earth science, or geography with real dates. Show students why seasons differ by hemisphere. Plan seasonal activities and experiments.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Travel and vacation planning</h3>
            <p className="text-sm text-muted-foreground">
              Understand opposite seasons when traveling internationally. Summer in the US is winter in Australia. Pack appropriately and book seasonal activities.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Photography and nature activities</h3>
            <p className="text-sm text-muted-foreground">
              Plan for fall foliage, spring blooms, or winter landscapes. Know when golden hour light changes with seasons. Schedule nature photography trips.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Agricultural planning</h3>
            <p className="text-sm text-muted-foreground">
              Farmers use seasons for crop rotation and livestock management. Plan harvest festivals and farmers markets. Coordinate with seasonal labor needs.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Astronomical vs meteorological seasons differ.</strong>
              Astronomical seasons begin on equinoxes and solstices (used here). Meteorological seasons start on the 1st of March, June, September, and December for consistent record-keeping.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Equinox and solstice dates vary.</strong>
              Seasons don't start on the same date every year. Leap years and Earth's orbit cause 1-2 day variations. Spring equinox can be March 19, 20, or 21.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Hemispheres have opposite seasons.</strong>
              When it's summer in the Northern Hemisphere, it's winter in the Southern Hemisphere. This tool adjusts all dates based on your hemisphere selection.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Season lengths aren't equal.</strong>
              Earth's elliptical orbit means seasons have different lengths. Northern summer is longer than winter because Earth moves slower when farther from the Sun.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Note:</strong> These are astronomical seasons based on Earth's position relative to the Sun. Weather patterns may not align exactly - meteorological spring can differ from astronomical spring.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When does spring start?</h3>
            <p className="text-sm text-muted-foreground">
              Spring begins on the vernal equinox, typically March 20 or 21 in the Northern Hemisphere. In the Southern Hemisphere, spring starts around September 22 or 23.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do equinox dates change?</h3>
            <p className="text-sm text-muted-foreground">
              Earth's orbit is 365.2422 days, not exactly 365. The calendar adds leap days to compensate, causing equinox times to shift. This results in date variations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is an equinox?</h3>
            <p className="text-sm text-muted-foreground">
              An equinox occurs when the Sun crosses the celestial equator. Day and night are approximately equal length worldwide. Happens twice yearly in March and September.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is a solstice?</h3>
            <p className="text-sm text-muted-foreground">
              A solstice occurs when the Sun reaches its highest or lowest point in the sky. Results in the longest day (summer) or shortest day (winter) of the year.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are seasons the same length?</h3>
            <p className="text-sm text-muted-foreground">
              No. Northern Hemisphere: spring ~92.8 days, summer ~93.6 days, autumn ~89.8 days, winter ~89.0 days. Variations are due to Earth's elliptical orbit.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do other planets have seasons?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, planets with axial tilt experience seasons. Mars has seasons like Earth. Uranus has extreme seasons due to its 98-degree tilt. Venus has virtually no seasons.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What causes seasons?</h3>
            <p className="text-sm text-muted-foreground">
              Earth's 23.5-degree axial tilt causes seasons. As Earth orbits the Sun, different hemispheres tilt toward or away from the Sun, changing sunlight intensity and duration.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
