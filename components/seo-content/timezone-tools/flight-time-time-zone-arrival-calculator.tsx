import React from "react"

export default function FlightTimeZoneArrivalCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your departure airport, arrival airport, departure date and time, and flight duration. The calculator shows your arrival time in the destination's local timezone.
          </p>
          <p>
            The tool accounts for the time difference between departure and arrival cities. A 7-hour flight from New York to London doesn't mean arriving 7 hours later - it's only 2 hours later London time due to the 5-hour timezone difference.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example calculation:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Departure: JFK (New York) at 6:00 PM EST
Flight Duration: 7 hours
Arrival: LHR (London) at 6:00 AM GMT (next day)
Time Difference: EST is 5 hours behind GMT
Local arrival: Monday 6:00 AM</pre>
          </div>
          <p>
            Select from major airports worldwide or enter flight duration manually. The calculator shows the day of week for arrival, which is crucial for long international flights that cross the date line.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Airport pickup coordination</h3>
            <p className="text-sm text-muted-foreground">
              You land at Narita Airport at 4:30 PM local time after a 14-hour flight from Los Angeles. Your colleague needs to pick you up but is in a different timezone. The calculator shows them exactly when to arrive.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Hotel check-in planning</h3>
            <p className="text-sm text-muted-foreground">
              Arriving at 5 AM local time means you can't check in until afternoon. The calculator helps you decide whether to book the previous night or find a day room. Red-eye flights often arrive early morning.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Connecting flight bookings</h3>
            <p className="text-sm text-muted-foreground">
              Booking separate tickets for a multi-city trip requires knowing actual arrival times. A flight arriving at 11 PM local time with a 6 AM connection the next day leaves little room for delays.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Business meeting scheduling</h3>
            <p className="text-sm text-muted-foreground">
              Flying from Chicago to Singapore for a meeting? The 16-hour flight plus 13-hour time difference means you arrive two days later locally. The calculator helps plan recovery time before meetings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Family travel coordination</h3>
            <p className="text-sm text-muted-foreground">
              Parents flying to visit family want to know when they'll actually land. A 9 AM departure from London to Sydney arrives at 7 AM Sydney time two days later - important for planning the first day.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cruise and tour departures</h3>
            <p className="text-sm text-muted-foreground">
              Flying to meet a cruise ship requires arriving before departure. A flight from Dallas to Barcelona with a 10-hour duration arrives at a specific local time. The calculator ensures you don't miss the ship.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Flight duration is block time.</strong>
              Airlines publish "block time" which includes taxiing, takeoff, and landing. Actual air time is usually 30-45 minutes less. Use the published flight time for planning purposes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Long flights cross the International Date Line.</strong>
              Flying from Los Angeles to Tokyo, you depart Tuesday and arrive Thursday - skipping Wednesday entirely. The calculator shows the correct arrival day.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Daylight saving affects arrival time.</strong>
              If either city observes DST and you're traveling during transition periods, the time difference may change. The calculator uses current timezone rules for the travel date.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Wind affects actual flight time.</strong>
              Westbound flights (US to Europe) often take longer than eastbound due to jet streams. A 7-hour eastbound flight might be 8-9 hours westbound. Check your specific flight's scheduled duration.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For international arrivals, add 1-2 hours for immigration and customs. A 3 PM arrival means you won't exit the airport until 4-5 PM local time. Plan ground transportation accordingly.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do I arrive before I left?</h3>
            <p className="text-sm text-muted-foreground">
              Flying west across timezones, you "gain" time. A 5 PM departure from London to New York (7-hour flight) arrives at 8 PM New York time - only 3 hours later despite 7 hours in the air.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I find my flight duration?</h3>
            <p className="text-sm text-muted-foreground">
              Check your airline ticket or booking confirmation. Flight duration is listed as "7h 30m" or similar. Flight tracking websites also show scheduled duration for any flight number.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about layovers and connections?</h3>
            <p className="text-sm text-muted-foreground">
              This calculator is for direct flights. For connections, calculate each segment separately. Add layover time to find total journey time. A 14-hour flight with a 3-hour layover is 17 hours total.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I account for jet lag?</h3>
            <p className="text-sm text-muted-foreground">
              The calculator shows local arrival time but not how you'll feel. Crossing 6+ timezones typically requires 1-2 days to adjust. Eastbound travel (losing time) is harder than westbound.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if my flight is overnight?</h3>
            <p className="text-sm text-muted-foreground">
              Overnight flights often arrive in the morning local time. A 10 PM departure from San Francisco to London (10-hour flight) arrives at 4 PM London time the next day - same calendar day due to time difference.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for train or bus travel?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, for any travel crossing timezones. A train from Paris to Moscow crosses timezones. Enter departure time and journey duration to find arrival time in the destination's local time.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How accurate is the arrival time?</h3>
            <p className="text-sm text-muted-foreground">
              The calculator shows scheduled arrival time. Actual arrival may vary due to weather, air traffic, or delays. Always check your flight status on the day of travel for real-time updates.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
