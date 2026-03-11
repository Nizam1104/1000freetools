import * as React from "react"

export default function EventCountdownSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Create a live countdown timer by entering your event name, selecting a target date, and choosing a time. The timer immediately starts counting down, showing days, hours, minutes, and seconds remaining until your event. Pick from eight vibrant theme colors and six gradient backgrounds to match your event's style.
          </p>
          <p>
            Save multiple countdowns for different events and switch between them instantly. Each countdown is stored locally in your browser, so you can come back to check progress anytime. When the countdown reaches zero, the display changes to celebrate that your event has started.
          </p>
          <p>
            Share your countdown with a unique link that preserves all your settings, or grab the embed code to place the live timer directly on your website, blog, or company intranet. The embed code is self-contained HTML that works on any platform.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Product Launches</h3>
            <p className="text-sm text-muted-foreground">
              Build anticipation for a new product release by embedding a countdown on your landing page or sharing it with your team.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Wedding Planning</h3>
            <p className="text-sm text-muted-foreground">
              Keep track of days until the big day and share the excitement with your wedding party and family members.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Project Deadlines</h3>
            <p className="text-sm text-muted-foreground">
              Create urgency and accountability by displaying a countdown to project milestones on your team dashboard.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Holiday Anticipation</h3>
            <p className="text-sm text-muted-foreground">
              Count down to Christmas, New Year's, birthdays, or vacations with a visual timer the whole family can see.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Live Event Promotion</h3>
            <p className="text-sm text-muted-foreground">
              Promote webinars, conferences, or live streams with an embedded countdown that updates in real-time on your site.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Personal Goals</h3>
            <p className="text-sm text-muted-foreground">
              Track progress toward fitness goals, exam dates, or any personal milestone with a motivating visual countdown.
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
              <strong className="text-foreground">Browser-based storage:</strong> Your countdowns are saved in your browser's local storage. Clearing browser data will remove saved countdowns, so bookmark your share link as a backup.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Time zone awareness:</strong> The countdown uses your device's local time zone. Share links will show the countdown in each viewer's local time, which may differ from your intended time zone.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Embed code is static:</strong> The generated embed code creates a standalone countdown. Changes you make after copying the code won't update the embedded version - you'll need to copy new code.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Past events show completion:</strong> Once the target date passes, the countdown displays "Event Started!" instead of negative time. Create a new countdown for future milestones.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Mobile responsive:</strong> The countdown display and embed code are fully responsive and adapt to different screen sizes, from phones to large monitors.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">How accurate is the countdown timer?</h3>
            <p className="text-sm text-muted-foreground">
              The timer updates every second and uses your device's system clock. Accuracy depends on your device's time synchronization. For critical timing, ensure your device clock is synced with an internet time server.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I pause or reset the countdown?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Use the Pause button to temporarily stop the countdown without losing your progress. The Reset button restarts the countdown from the original target time.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How many countdowns can I save?</h3>
            <p className="text-sm text-muted-foreground">
              There's no hard limit, but each countdown uses browser storage space. Most users can save dozens of countdowns without issues. Older browsers may have stricter storage limits.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Will the embed code work on WordPress or Wix?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. The embed code is standard HTML with inline CSS and JavaScript. Add it using your platform's custom HTML block or widget. Some platforms may require a Business or Premium plan for custom code.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I customize the embed code styling?</h3>
            <p className="text-sm text-muted-foreground">
              The embed code includes its own styles to ensure consistent appearance. For advanced customization, you'd need to modify the HTML and CSS directly before embedding.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What happens when I share the link?</h3>
            <p className="text-sm text-muted-foreground">
              Recipients see your countdown with the event name, date, and color scheme you selected. The countdown calculates time remaining based on their local time zone, so everyone sees accurate time for their location.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I use this for recurring events?</h3>
            <p className="text-sm text-muted-foreground">
              This tool is designed for one-time events. For recurring countdowns (like "days until next Friday"), you'd need to manually create a new countdown each time or use a dedicated recurring timer app.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
