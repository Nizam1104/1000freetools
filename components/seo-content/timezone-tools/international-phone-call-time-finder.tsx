import React from "react"

export default function InternationalPhoneCallTimeFinderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select your timezone and the country you're calling. Enter your preferred call time, and the tool shows what time it will be for the recipient and whether it's during their business hours.
          </p>
          <p>
            The calculator includes business hour information for each country and suggests alternative times that work for both parties. This prevents accidental late-night or early-morning calls.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example lookup:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Your time: 2:00 PM EST (New York)
Their country: United Kingdom
Their time: 7:00 PM GMT
Business hours: 9 AM - 5 PM
Status: Outside business hours

Alternative times during their business hours:
9:00 AM your time = 2:00 PM their time
10:00 AM your time = 3:00 PM their time</pre>
          </div>
          <p>
            The tool shows a list of times that fall within the recipient's typical business hours (9 AM to 5 PM local time for most countries). Pick a time that works for both schedules.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sales calls to international prospects</h3>
            <p className="text-sm text-muted-foreground">
              A sales rep in California wants to call a prospect in Germany. The tool shows 9 AM Pacific is 6 PM in Germany - too late. Better to call at 6 AM Pacific (3 PM Germany) or schedule for their morning.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Customer support follow-ups</h3>
            <p className="text-sm text-muted-foreground">
              Support agents return calls to customers in different countries. A ticket from Japan needs a callback. The tool ensures the agent calls during Japanese business hours, not at 2 AM Tokyo time.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Remote job interviews</h3>
            <p className="text-sm text-muted-foreground">
              A candidate in India interviews with a company in Toronto. The recruiter suggests 10 AM their time. The tool shows it's 8:30 PM in India - acceptable for an important interview but worth confirming.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Vendor and supplier coordination</h3>
            <p className="text-sm text-muted-foreground">
              A procurement manager in the US coordinates with suppliers in China. The 12-13 hour time difference means limited overlap. The tool finds the narrow window when both are in the office.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Freelancer client calls</h3>
            <p className="text-sm text-muted-foreground">
              A freelancer in the Philippines works with clients in New York and London. The tool helps schedule calls that don't require 3 AM wake-ups while still accommodating client timezones.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Family and personal calls abroad</h3>
            <p className="text-sm text-muted-foreground">
              Calling relatives in another country requires timing consideration. The tool helps avoid calling parents in Italy at midnight their time or waking children in Australia before school.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Business hours vary by country.</strong>
              Most Western countries use 9 AM to 5 PM, but some regions have different norms. Middle Eastern countries may have Sunday-Thursday work weeks. Spain has a midday siesta break.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Large countries span multiple timezones.</strong>
              The US has 4 main timezones, Russia has 11, Australia has 3. Select the specific city or region when possible. Calling "the US" at 9 AM Eastern wakes Californians at 6 AM.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Lunch hours matter in some cultures.</strong>
              In Mediterranean and Latin American countries, midday (12 PM to 2 PM) is often reserved for lunch. Avoid scheduling calls during this time even if it's technically business hours.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Friday afternoons may be unproductive.</strong>
              In many countries, Friday afternoon is quiet as people wrap up for the week. In Muslim-majority countries, Friday is part of the weekend. Monday mornings may also be slow.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> When in doubt, ask the recipient for their preferred call time in their timezone. Then use this tool to convert it to your time. This shows respect for their schedule.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the best time to call Europe from the US?</h3>
            <p className="text-sm text-muted-foreground">
              From Eastern Time, call between 8 AM and 11 AM your time (2 PM to 5 PM in London, 3 PM to 6 PM in Paris). From Pacific Time, call 5 AM to 8 AM your time for the same window.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When should I call Asia from Europe or the US?</h3>
            <p className="text-sm text-muted-foreground">
              From Europe, late afternoon (3-5 PM) reaches Asia in their evening. From the US West Coast, early morning (6-8 AM) reaches Asia in their late evening. Consider scheduling for their next morning instead.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle countries with multiple timezones?</h3>
            <p className="text-sm text-muted-foreground">
              Ask for the specific city. "I'll call you in Sydney" vs "I'll call you in Perth" makes a 2-3 hour difference in Australia. For the US, confirm Eastern, Central, Mountain, or Pacific.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if my call time falls on their weekend?</h3>
            <p className="text-sm text-muted-foreground">
              Reschedule. Most countries have Saturday-Sunday weekends, but some have Friday-Saturday (Middle East) or Sunday only (some Asian countries). The tool shows the day of week for their timezone.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is it rude to call outside business hours?</h3>
            <p className="text-sm text-muted-foreground">
              For business calls, yes - it's considered unprofessional. For personal calls to family or close colleagues, it depends on your relationship. When in doubt, send a message first asking if it's a good time.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I schedule a call that works for both of us?</h3>
            <p className="text-sm text-muted-foreground">
              Find the overlap between your business hours and theirs. For US-UK, early morning US works. For US-Asia, there's minimal overlap - one party may need to call early or late. Rotate the inconvenience for recurring calls.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about daylight saving time differences?</h3>
            <p className="text-sm text-muted-foreground">
              DST transitions happen on different dates worldwide. Between US and European transition dates, the time difference temporarily changes by an hour. Always verify times around March and November.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
