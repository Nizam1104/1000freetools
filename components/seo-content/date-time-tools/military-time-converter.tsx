import React from "react"

export default function MilitaryTimeConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter time in either 12-hour (AM/PM) or 24-hour (military) format. The converter instantly shows the equivalent in the other format. Both directions work simultaneously.
          </p>
          <p>
            The reference chart displays all 24 hours with both formats side by side. Quick lookup for common times without calculation. Period labels (morning, afternoon, night) provide context.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Conversion examples:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">12-hour → 24-hour:
3:00 PM → 15:00
12:00 AM → 00:00
12:00 PM → 12:00

24-hour → 12-hour:
18:30 → 6:30 PM
00:00 → 12:00 AM
13:00 → 1:00 PM</pre>
          </div>
          <p>
            Conversion rules are clearly explained: midnight is 00:00, noon is 12:00, afternoon hours add 12. The chart reinforces these patterns for learning.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Military and government work</h3>
            <p className="text-sm text-muted-foreground">
              Service members convert orders times. Veterans transition to civilian life. Government contractors work with both systems.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Healthcare settings</h3>
            <p className="text-sm text-muted-foreground">
              Medical charts use 24-hour time. Nurses read medication schedules. Doctors document procedures. Prevents AM/PM errors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Aviation and transportation</h3>
            <p className="text-sm text-muted-foreground">
              Flight schedules use 24-hour format. Train timetables are unambiguous. Dispatchers coordinate across zones. Safety-critical clarity.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">International communication</h3>
            <p className="text-sm text-muted-foreground">
              Most countries use 24-hour time. US travelers need conversion. Global teams coordinate meetings. Avoids confusion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Emergency services</h3>
            <p className="text-sm text-muted-foreground">
              911 dispatchers use 24-hour logs. Police reports need precision. Fire departments track incidents. No AM/PM ambiguity.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning and education</h3>
            <p className="text-sm text-muted-foreground">
              Students learn time formats. Teachers prepare materials. Test questions use both. Builds time literacy.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Midnight is 00:00, not 24:00.</strong>
              Day starts at 00:00 (12:00 AM). Ends at 23:59. Next day begins at 00:00. Some systems use 24:00 for end of day.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Noon is 12:00 in both systems.</strong>
              12:00 PM = 12:00. No conversion needed for noon. Only hours 1-11 PM change. 1 PM = 13:00, 2 PM = 14:00.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Leading zeros matter in 24-hour.</strong>
              09:00 not 9:00. Standard format is HH:MM. Four digits plus colon. Prevents reading errors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">No AM/PM in military time.</strong>
              24-hour format never uses AM/PM. The hour number indicates period. 0-11 is morning, 12-23 is afternoon/evening.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> In healthcare, always say "hours" when speaking 24-hour time. "1500 hours" not "1500". Prevents mishearing as "15-0".
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I convert PM times?</h3>
            <p className="text-sm text-muted-foreground">
              Add 12 to the hour. 3 PM = 3+12 = 15:00. Exception: 12 PM stays 12:00. Reverse: subtract 12 from 13-23.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is 0000 hours?</h3>
            <p className="text-sm text-muted-foreground">
              Midnight, start of the day. Same as 12:00 AM. Day begins at 0000. Sometimes written 2400 for end of previous day.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is it called military time?</h3>
            <p className="text-sm text-muted-foreground">
              Armed forces adopted it for clarity. Prevents AM/PM confusion in orders. Now used by many civilian fields. Healthcare, aviation, emergency services.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do I say "o'clock" with 24-hour?</h3>
            <p className="text-sm text-muted-foreground">
              No, say "hours". 1500 is "fifteen hundred hours". 0800 is "zero eight hundred hours". Formal but clear.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Which countries use 24-hour time?</h3>
            <p className="text-sm text-muted-foreground">
              Most countries use it primarily. UK, Europe, Asia, Africa, South America. US and Canada use both. International standards require it.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I write seconds?</h3>
            <p className="text-sm text-muted-foreground">
              Add colon and seconds. 14:30:45 is 2:30:45 PM. Military writes 143045Z with Z for Zulu (UTC). Civilian uses colons.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is 24-hour time harder to learn?</h3>
            <p className="text-sm text-muted-foreground">
              Takes a few days to adjust. Pattern is simple: add 12 for PM. Most people adapt quickly. Becomes automatic with practice.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
