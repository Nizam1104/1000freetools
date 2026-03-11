import * as React from "react"

export default function DiscordTimestampGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Enter a date and time or select a preset to generate Discord-formatted timestamps. Discord uses a special syntax with angle brackets and format codes to display timestamps that automatically adjust to each user's timezone.
          </p>
          <p>
            Choose from Discord's timestamp styles: short time, long time, short date, long date, long date + time, relative time, or full date + time. Each style displays differently in Discord chat.
          </p>
          <p>
            Copy the formatted timestamp code and paste it directly into Discord messages. When sent, Discord renders it as a clickable timestamp that shows the time in each viewer's local timezone.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Event Announcements</h3>
            <p className="text-sm text-muted-foreground">
              Schedule Discord events with timestamps that show correct local time for all members.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Gaming Sessions</h3>
            <p className="text-sm text-muted-foreground">
              Organize gaming sessions across time zones with timestamps everyone can understand.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Community Meetings</h3>
            <p className="text-sm text-muted-foreground">
              Schedule server meetings, AMAs, or town halls with timezone-aware timestamps.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Countdown Messages</h3>
            <p className="text-sm text-muted-foreground">
              Use relative timestamps ("in 3 hours") for countdowns to launches or releases.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Support Tickets</h3>
            <p className="text-sm text-muted-foreground">
              Reference timestamps in support discussions that work for global support teams.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Bot Responses</h3>
            <p className="text-sm text-muted-foreground">
              Format bot message timestamps consistently with Discord's native timestamp style.
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
              <strong className="text-foreground">Discord syntax:</strong> Timestamps use format: &lt;t:TIMESTAMP:STYLE&gt;. The timestamp is Unix seconds, style is a single letter code.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Style codes:</strong> t=short time, T=long time, d=short date, D=long date, f=default (date+time), F=full, R=relative.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Timezone automatic:</strong> Discord timestamps automatically display in each viewer's local timezone. No manual conversion needed.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Clickable timestamps:</strong> Sent timestamps are clickable, showing a tooltip with full date/time and adding to calendar.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Seconds required:</strong> Discord uses Unix seconds (not milliseconds). Ensure you're using 10-digit timestamps.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">What are Discord timestamp styles?</h3>
            <p className="text-sm text-muted-foreground">
              t=4:20 PM, T=4:20:00 PM, d=01/15/2024, D=January 15, 2024, f=Jan 15, 2024 4:20 PM, F=Monday, January 15, 2024 4:20 PM, R=3 months ago.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I make a relative timestamp?</h3>
            <p className="text-sm text-muted-foreground">
              Use style 'R'. &lt;t:1705312200:R&gt; displays as "3 months ago" or "in 2 hours" depending on when it's viewed.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Why use Discord timestamps?</h3>
            <p className="text-sm text-muted-foreground">
              They automatically convert to each user's timezone. Perfect for international communities where members are in different time zones.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I edit timestamps after sending?</h3>
            <p className="text-sm text-muted-foreground">
              No. Edit the message and change the timestamp code. The displayed time updates when the message is edited.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What timestamp format does Discord use?</h3>
            <p className="text-sm text-muted-foreground">
              Unix timestamp in seconds (10 digits). Not milliseconds. For example: 1705312200 for January 15, 2024.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I show just the time?</h3>
            <p className="text-sm text-muted-foreground">
              Use style 't' for short time (4:20 PM) or 'T' for long time (4:20:00 PM). Example: &lt;t:1705312200:t&gt;.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can bots use these timestamps?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Bots can send messages with Discord timestamp syntax. The timestamps render the same way as user messages.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
