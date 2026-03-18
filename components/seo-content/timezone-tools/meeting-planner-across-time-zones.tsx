import React from "react"

export default function MeetingPlannerAcrossTimeZonesSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Meeting Planner Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool finds suitable meeting times across multiple timezones. Add all participant locations, set your preferred meeting duration and working hours, and get a visual grid showing overlapping availability.
          </p>
          <p>
            The planner displays a 24-hour timeline with each participant's working hours highlighted. Overlapping regions where everyone is available are shown in green. Scroll through the week to find the best slot for everyone.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Key features:</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Add unlimited participant timezones</li>
              <li>Set custom working hours per location</li>
              <li>Specify meeting duration (30 min, 1 hour, etc.)</li>
              <li>Visual overlap highlighting</li>
              <li>Week view for flexible scheduling</li>
              <li>Export to calendar (Google, Outlook, iCal)</li>
              <li>Shareable meeting link for participants</li>
            </ul>
          </div>
          <p>
            The tool accounts for daylight saving time automatically. Schedule a meeting in March and the planner knows when DST starts in each timezone, adjusting times accordingly.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Scheduling international team meetings</h3>
            <p className="text-sm text-muted-foreground">
              Your team spans San Francisco, London, and Singapore. Finding a time when 9 AM in SF doesn't mean 5 AM in London and midnight in Singapore. The planner shows the narrow overlap window (usually 2-3 hours) when everyone's awake.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Client calls across continents</h3>
            <p className="text-sm text-muted-foreground">
              You're in New York, client is in Sydney. Their 2 PM is your 11 PM - not workable. Use the planner to find their morning (your evening) or their late afternoon ( your early morning) slots.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Webinar and event scheduling</h3>
            <p className="text-sm text-muted-foreground">
              Hosting a webinar for global attendees? Find times that work for major markets. Maybe 10 AM EST works for Americas and Europe (3 PM GMT) but excludes Asia. Or do two sessions for different regions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Remote job interviews</h3>
            <p className="text-sm text-muted-foreground">
              Hiring remotely means interviewing candidates worldwide. Schedule interviews at reasonable hours for both interviewer and candidate. No one wants a 6 AM or 10 PM interview.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Family calls across timezones</h3>
            <p className="text-sm text-muted-foreground">
              Family scattered across countries wants a group call. Grandma in India, you in California, cousin in Germany. Find the precious few hours when everyone can talk without waking the kids or disturbing dinner.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Conference call rotation fairness</h3>
            <p className="text-sm text-muted-foreground">
              Recurring meetings across timezones shouldn't always inconvenience the same people. Use the planner to rotate meeting times - this week favors Asia, next week favors Americas, ensuring no one always takes the 7 AM slot.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Working hours vary by culture.</strong>
              9-5 is common in the US but not universal. European colleagues might work 8-4 with long lunch. Middle Eastern work weeks often run Sunday-Thursday. Set accurate working hours per location.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some overlaps are impossibly small.</strong>
              California to India has maybe 1-2 hours of overlap on a good day. For 3+ timezones spanning 12+ hours, there may be no time when everyone's within working hours. Consider asynchronous alternatives.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">DST transitions create temporary chaos.</strong>
              When the US springs forward but Europe hasn't yet (or vice versa), time differences shift by an hour for 1-3 weeks. The planner handles this but be aware during transition periods.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Lunch hours matter.</strong>
              A slot might be within working hours but during typical lunch time in one location. Set lunch breaks in the planner if it supports it, or manually avoid 12-2 PM local times.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For recurring meetings, rotate times monthly. Use the planner to create a rotation schedule where no timezone always gets the inconvenient slot.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if there's no good overlap?</h3>
            <p className="text-sm text-muted-foreground">
              When timezones span too many hours, consider: recording meetings for async viewing, splitting into regional sessions, or accepting that some participants will join outside working hours occasionally.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I share the meeting time with participants?</h3>
            <p className="text-sm text-muted-foreground">
              Export to calendar format (iCal/ICS) and email invitations. Or share a link to the planner showing the selected time. Calendar invites automatically convert to each recipient's local timezone.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I schedule recurring meetings?</h3>
            <p className="text-sm text-muted-foreground">
              This planner finds individual meeting times. For recurring meetings, find a good slot then use your calendar's recurrence feature. Remember to account for DST changes in recurring events.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about half-hour timezone offsets?</h3>
            <p className="text-sm text-muted-foreground">
              India (UTC+5:30), Nepal (UTC+5:45), and others use half-hour or 45-minute offsets. The planner handles these correctly - they're part of the IANA timezone database.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I schedule during DST transition weeks?</h3>
            <p className="text-sm text-muted-foreground">
              Avoid if possible. The week when US and Europe change clocks at different times causes confusion. Schedule a week before or after transition periods when time differences are stable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How far in advance should I schedule?</h3>
            <p className="text-sm text-muted-foreground">
              For international meetings, 1-2 weeks minimum. People need time to adjust schedules, especially if the meeting is outside typical hours. Monthly recurring meetings should be scheduled a month ahead.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I block out holidays?</h3>
            <p className="text-sm text-muted-foreground">
              Advanced planners let you set holidays per country. If not available, manually avoid known holidays. Remember holidays differ by country - Christmas is universal but Diwali, Thanksgiving, or Golden Week are regional.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
