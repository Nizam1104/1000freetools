import React from "react"

export default function CountdownTimerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Create multiple countdown timers for different events. Each timer displays days, hours, minutes, and seconds remaining with live updates every second. Name your timers for easy identification.
          </p>
          <p>
            Enable browser notifications to get alerted when a timer reaches zero. Perfect for when you're working on other tasks and need to be reminded when an event starts or deadline arrives.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Timer display example:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Event: Product Launch
Target: March 15, 2024 at 9:00 AM
Remaining: 12d 05h 32m 18s

When complete:
"Time's Up! Product Launch has completed"</pre>
          </div>
          <p>
            Control each timer independently - pause, resume, reset, or delete. Share timer links with team members. Multiple timers run simultaneously for complex scheduling needs.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Live event coordination</h3>
            <p className="text-sm text-muted-foreground">
              Track multiple event segments. Conference sessions, breaks, keynotes. Keep program on schedule. Coordinate with speakers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Exam and test timing</h3>
            <p className="text-sm text-muted-foreground">
              Students track exam duration. Practice test timing. Manage sections. Avoid running out of time.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cooking multiple dishes</h3>
            <p className="text-sm text-muted-foreground">
              Time different foods simultaneously. Turkey, sides, desserts. Everything ready together. Stress-free holiday meals.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Workout intervals</h3>
            <p className="text-sm text-muted-foreground">
              HIIT workout timing. Work and rest periods. Circuit training rounds. Track exercise duration.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Project milestone tracking</h3>
            <p className="text-sm text-muted-foreground">
              Multiple deadline countdowns. Phase completions. Deliverable dates. Keep team aware of timelines.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Auction and bid tracking</h3>
            <p className="text-sm text-muted-foreground">
              Online auction end times. Multiple item tracking. Last-minute bidding. Never miss a close.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Notifications require permission.</strong>
              Browser will ask for notification access. Grant permission for alerts. Works even with tab in background. System notifications appear.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Timers persist in browser session.</strong>
              Timers stay while browser is open. Refreshing page may reset them. Don't close tab during important countdowns.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Multiple timers run independently.</strong>
              Each timer has separate controls. Pause one without affecting others. Delete completed timers. Organize your countdowns.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Share feature creates links.</strong>
              Share button copies timer URL. Recipients can recreate timer. Event details transfer. Coordinate with team members.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For critical events, set multiple timers. One on phone, one on computer. Redundancy prevents missing important moments.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many timers can I create?</h3>
            <p className="text-sm text-muted-foreground">
              No practical limit. Create as many as needed. Too many may clutter screen. Organize with clear names.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do timers work with closed browser?</h3>
            <p className="text-sm text-muted-foreground">
              No, browser must be open. Timers stop when tab closes. For background alerts, use phone timer apps. This is browser-based.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I set recurring timers?</h3>
            <p className="text-sm text-muted-foreground">
              Not automatically. Create new timer after completion. For daily events, recreate each day. Consider dedicated alarm apps for recurring needs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens when timer ends?</h3>
            <p className="text-sm text-muted-foreground">
              "Time's Up" message displays. Notification appears if enabled. Timer stops automatically. Reset or delete as needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I pause and resume?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, each timer has pause/play button. Pause stops countdown. Resume continues from where paused. Reset starts over.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I share a timer?</h3>
            <p className="text-sm text-muted-foreground">
              Click the share button. Timer URL copies to clipboard. Send link to others. They can recreate same timer.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work on mobile?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, works on mobile browsers. Touch controls work. Notifications supported on most devices. Add to home screen for quick access.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
