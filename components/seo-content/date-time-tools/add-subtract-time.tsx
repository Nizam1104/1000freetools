import React from "react"

export default function AddSubtractTimeSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter a start time and choose whether to add or subtract time. Input hours, minutes, and seconds to modify. The calculator handles day rollover automatically when time crosses midnight.
          </p>
          <p>
            Select 12-hour or 24-hour format based on your preference. Optional start date shows the resulting date when days change. This is crucial for overnight calculations.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Time addition example:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Start: 10:30 PM
Add: 3 hours, 45 minutes
Result: 2:15 AM (next day)

Time subtraction:
Start: 6:00 AM
Subtract: 2 hours, 30 minutes
Result: 3:30 AM (same day)</pre>
          </div>
          <p>
            Quick preset buttons provide common additions and subtractions like +15 min, +1 hour, -30 min. Perfect for rapid calculations without manual input.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cooking and meal timing</h3>
            <p className="text-sm text-muted-foreground">
              Calculate when food will be ready. Add cooking times to start. Plan multi-dish meals. Coordinate oven schedules.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Travel arrival times</h3>
            <p className="text-sm text-muted-foreground">
              Add flight duration to departure. Calculate train arrivals. Plan pickup times. Account for time zone changes separately.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Meeting end times</h3>
            <p className="text-sm text-muted-foreground">
              Find when meetings end. Schedule back-to-back sessions. Plan buffer time. Avoid room conflicts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Medication schedules</h3>
            <p className="text-sm text-muted-foreground">
              Calculate next dose times. Add intervals between doses. Plan medication timing. Avoid missed doses.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Broadcast scheduling</h3>
            <p className="text-sm text-muted-foreground">
              Calculate show end times. Plan commercial breaks. Schedule programming blocks. Coordinate live events.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Shift handover planning</h3>
            <p className="text-sm text-muted-foreground">
              Calculate shift end times. Plan handover meetings. Ensure coverage overlap. Track overtime accurately.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Day rollover is automatic.</strong>
              Adding time past midnight shows next day. Subtracting before midnight shows previous day. Include date to see exact result date.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Both 12 and 24-hour formats work.</strong>
              12-hour needs AM/PM selection. 24-hour is unambiguous. Results show in both formats for verification.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Large additions span multiple days.</strong>
              Adding 48 hours shows 2 days rollover. Time wraps correctly. Date tracking becomes important for multi-day spans.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Negative results show previous day.</strong>
              Subtracting past midnight goes to previous day. -2 hours from 1 AM = 11 PM previous day. Clearly indicated in results.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For travel across time zones, calculate flight duration first, then adjust for timezone separately. Don't mix the calculations.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I subtract time?</h3>
            <p className="text-sm text-muted-foreground">
              Click the "Subtract Time" button. Enter the duration to subtract. Result shows earlier time. Previous day indicated if applicable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if I add more than 24 hours?</h3>
            <p className="text-sm text-muted-foreground">
              Calculator handles it correctly. 30 hours adds 1 day and 6 hours. Time shows correctly. Date changes if start date provided.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add seconds?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, all three units are supported. Add hours, minutes, and seconds. Useful for precise timing. Scientific and technical applications.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why include a start date?</h3>
            <p className="text-sm text-muted-foreground">
              Date shows when day changes occur. "Tomorrow" is clearer than just time. Essential for travel and event planning.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this handle time zones?</h3>
            <p className="text-sm text-muted-foreground">
              No, this is time arithmetic only. For timezone conversion, use the time zone converter. Combine both for travel planning.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I copy the result?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, copy buttons provide both formats. 12-hour and 24-hour available. Paste into documents or messages.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What are quick presets?</h3>
            <p className="text-sm text-muted-foreground">
              Common durations like +15 min, +1 hour. One-click application. Saves typing. Speeds up frequent calculations.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
