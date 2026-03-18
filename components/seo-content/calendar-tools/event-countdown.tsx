import React from "react"

export default function EventCountdownSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Event Countdown Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your event name, select the date and time, and watch the live countdown begin. The timer updates every second, showing days, hours, minutes, and seconds remaining until your event.
          </p>
          <p>
            The countdown calculates the difference between the current time and your event date using JavaScript's Date object. It continuously refreshes every second to display accurate, real-time progress.
          </p>
          <p>
            Use the quick preset buttons for common events like New Year, Valentine's Day, or Christmas. Or set any custom date for birthdays, weddings, project deadlines, or vacations.
          </p>
          <p>
            Copy the time remaining text to share on social media or in messages. The progress bar visually shows how much time has passed relative to a full year.
          </p>
          <p>
            When the event date passes, the countdown displays a "has passed" message. Clear any countdown and start fresh with a new event anytime.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">New Year's Eve countdown</h3>
            <p className="text-sm text-muted-foreground">
              Create excitement for January 1st. Share the countdown link with friends and family. Watch the seconds tick down together, even when apart.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Wedding day timer</h3>
            <p className="text-sm text-muted-foreground">
              Count down to your big day. Embed the countdown on your wedding website. Share with the wedding party to build anticipation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Product launch countdown</h3>
            <p className="text-sm text-muted-foreground">
              Build hype for a new product release. Add the timer to your landing page. Let customers know exactly when they can purchase.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Birthday countdown</h3>
            <p className="text-sm text-muted-foreground">
              Count down to someone's special day. Send them the link as a fun preview. Great for milestone birthdays like 18th, 21st, or 50th.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Project deadline tracker</h3>
            <p className="text-sm text-muted-foreground">
              Keep your team aware of approaching deadlines. Display on a shared screen. Visual pressure helps maintain focus and productivity.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Vacation countdown</h3>
            <p className="text-sm text-muted-foreground">
              Count down to your trip. Build excitement for the family. Check the timer daily to see how close you are to paradise.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Timezone uses your local time.</strong>
              The countdown calculates based on your device's timezone. If sharing with people in different timezones, they'll see the countdown relative to their local time.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Browser must stay open for live updates.</strong>
              The timer updates in real-time only when the page is open. Refresh the page when you return to see the current countdown.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">No account or signup required.</strong>
              Create unlimited countdowns without registering. Everything runs in your browser. No data is stored on servers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Share via URL or copy time text.</strong>
              Bookmark the page to return to your countdown. Copy the time remaining text to paste in messages or social posts.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For events that repeat yearly, create a new countdown each year. The preset buttons make this quick - just click and the date auto-fills.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I embed this countdown on my website?</h3>
            <p className="text-sm text-muted-foreground">
              This version doesn't provide embed code. Take a screenshot or screen recording of the countdown for static displays. For live embeds, consider dedicated countdown services.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does the countdown work on mobile?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, the countdown is fully responsive. Open it on any smartphone or tablet. The display adapts to fit smaller screens perfectly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I create multiple countdowns?</h3>
            <p className="text-sm text-muted-foreground">
              Create as many as you need. Clear the current one and start a new countdown. Bookmark different URLs for different events.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens after the event passes?</h3>
            <p className="text-sm text-muted-foreground">
              The countdown shows a "has passed" message with a clock icon. Clear it to start a new countdown for the next event.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How accurate is the timer?</h3>
            <p className="text-sm text-muted-foreground">
              Updates every second using your device's system clock. Accuracy depends on your device's time synchronization. Usually within milliseconds.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I customize the colors or style?</h3>
            <p className="text-sm text-muted-foreground">
              This basic version uses default styling. For branded countdowns, use the copy feature to get the time text and style it yourself.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is there a notification when the event arrives?</h3>
            <p className="text-sm text-muted-foreground">
              This version doesn't send notifications. Keep the page open and watch it reach zero. Set a separate alarm for the actual event time.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
