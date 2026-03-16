import React from "react"

export default function WorldClockMeetingPlannerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Add all participant locations to see current times worldwide. The 24-hour comparison chart shows every hour and what time it would be in each location.
          </p>
          <p>
            Green highlighting indicates business hours (9 AM - 5 PM) in each timezone. The meeting time finder scores each hour based on how many participants are within working hours.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Finding overlap example:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">New York: 9 AM - 5 PM EST
London: 2 PM - 10 PM GMT
Tokyo: 10 PM - 6 AM JST (next day)
Best overlap: 2-3 PM GMT (9-10 AM NY)</pre>
          </div>
          <p>
            Weekend detection shows which hours fall on Saturday or Sunday in each location. Yellow highlighting warns of weekend times that may conflict with personal schedules.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Global team standups</h3>
            <p className="text-sm text-muted-foreground">
              Scrum masters schedule daily syncs. Distributed dev teams find overlap hours. Rotating times share the inconvenience fairly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">International client calls</h3>
            <p className="text-sm text-muted-foreground">
              Sales teams schedule demos globally. Account managers check in with overseas clients. Everyone gets reasonable meeting times.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Conference call planning</h3>
            <p className="text-sm text-muted-foreground">
              Event organizers schedule keynotes. Panel moderators coordinate speakers. Attendees across zones join live sessions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Remote family gatherings</h3>
            <p className="text-sm text-muted-foreground">
              Families video chat across continents. Holiday calls include everyone. Grandparents see grandkids at good times.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Broadcast scheduling</h3>
            <p className="text-sm text-muted-foreground">
              Media companies plan global releases. Streamers coordinate premiere times. Press releases go out simultaneously.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Trading and market analysis</h3>
            <p className="text-sm text-muted-foreground">
              Traders track market hours globally. Forex operates 24/5 across zones. Analysts coordinate across exchanges.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Business hours vary by culture.</strong>
              9-5 is US/UK standard. Europe may start earlier. Asia often has longer days. Adjust expectations for local norms.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some overlaps are impossible.</strong>
              US West Coast and Australia have minimal overlap. One will always meet outside business hours. Rotate times to share burden.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">DST changes affect different zones differently.</strong>
              US and Europe change clocks on different dates. Brief periods have shifted offsets. Verify times during transition weeks.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Lunch hours matter internationally.</strong>
              Europe has longer lunch breaks. Asia may have siesta time. Avoid scheduling during local meal times.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For US-Europe-Asia meetings, try 8 AM Pacific / 5 PM London / midnight Tokyo. Asia participant joins late evening or early morning.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the best time for US-Europe meetings?</h3>
            <p className="text-sm text-muted-foreground">
              2-4 PM London time works well. That's 9-11 AM Eastern, 6-8 AM Pacific. Europe ends day, US starts day.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I include Asia in meetings?</h3>
            <p className="text-sm text-muted-foreground">
              Three-way calls are tough. Try 8 AM London (3 PM Tokyo, 3 AM NY). Or rotate: one week Asia-friendly, next week US-friendly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I record meetings for absent members?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, always record when someone joins at odd hours. Share notes asynchronously. Respect those taking inconvenient times.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about Friday meetings?</h3>
            <p className="text-sm text-muted-foreground">
              Avoid Fridays for global calls. Europe leaves early. US checks out mentally. Monday-Wednesday works best.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How long should global meetings be?</h3>
            <p className="text-sm text-muted-foreground">
              Keep it under 60 minutes. Attention spans vary. Some participants are outside normal hours. Shorter respects everyone.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I save my team's locations?</h3>
            <p className="text-sm text-muted-foreground">
              Add locations each session. Bookmark the page with your zones. Some browsers remember form inputs. Consider a team wiki with time info.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What tools help with scheduling?</h3>
            <p className="text-sm text-muted-foreground">
              Use calendar tools with timezone support. Google Calendar shows multiple zones. World Clock apps help individuals. This planner finds the overlap.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
