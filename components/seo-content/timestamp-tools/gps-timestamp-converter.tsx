import * as React from "react"

export default function GpsTimestampConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Enter a GPS timestamp (seconds since January 6, 1980) or a Unix timestamp. The converter transforms between GPS time and Unix time, accounting for the different epoch start dates.
          </p>
          <p>
            GPS time doesn't include leap seconds, while Unix time is based on UTC which does. The converter applies the current leap second offset (currently 18 seconds as of 2024) for accurate conversion.
          </p>
          <p>
            Results display in multiple formats: GPS seconds, GPS week number + seconds of week, Unix timestamp, and human-readable UTC date. Copy any format with a single click.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">GNSS Data Processing</h3>
            <p className="text-sm text-muted-foreground">
              Convert GPS timestamps from receivers to Unix time for database storage and analysis.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Navigation Systems</h3>
            <p className="text-sm text-muted-foreground">
              Translate between GPS time used in navigation messages and Unix time for application logic.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Surveying Equipment</h3>
            <p className="text-sm text-muted-foreground">
              Process GPS survey data timestamps for integration with GIS and mapping systems.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Telemetry Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Convert vehicle tracking data from GPS time to standard timestamps for reporting.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Scientific Research</h3>
            <p className="text-sm text-muted-foreground">
              Synchronize GPS-timed observations with other data sources using Unix timestamps.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Aviation Systems</h3>
            <p className="text-sm text-muted-foreground">
              Convert ADS-B and other aviation data timestamps between GPS and UTC-based systems.
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
              <strong className="text-foreground">GPS epoch:</strong> GPS time started January 6, 1980 00:00:00 UTC. Unix time started January 1, 1970. The offset is 315964800 seconds.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Leap seconds:</strong> GPS time doesn't observe leap seconds. UTC does. The offset between them increases with each leap second (18 seconds as of 2024).
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">GPS week rollover:</strong> GPS week number is 10 bits, rolling over every 1024 weeks (~19.7 years). Rollovers occurred in 1999, 2019, and will in 2038.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Week + seconds format:</strong> GPS often uses week number + seconds into week (0-604799). This tool converts both continuous seconds and week formats.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">UTC vs TAI:</strong> GPS time is aligned with TAI (International Atomic Time) minus 19 seconds. UTC = TAI - leap seconds.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">What is GPS time?</h3>
            <p className="text-sm text-muted-foreground">
              GPS time is a continuous time scale used by GPS satellites. It started January 6, 1980 and doesn't include leap seconds.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I convert GPS to Unix time?</h3>
            <p className="text-sm text-muted-foreground">
              Add 315964800 seconds (GPS epoch offset) and subtract current leap seconds (18). GPS_time + 315964800 - 18 = Unix_time.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What is GPS week rollover?</h3>
            <p className="text-sm text-muted-foreground">
              GPS week number is 10 bits (0-1023). Every 1024 weeks (~19.7 years), it resets to 0. This happened in 1999, 2019, and will in 2038.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Why are GPS and Unix time different?</h3>
            <p className="text-sm text-muted-foreground">
              Different epochs (start dates) and leap second handling. GPS ignores leap seconds for continuous counting, UTC includes them.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What's the current leap second offset?</h3>
            <p className="text-sm text-muted-foreground">
              As of 2024, the offset is 18 seconds. The last leap second was added December 31, 2016. Future leap seconds are announced by IERS.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I read GPS week + seconds?</h3>
            <p className="text-sm text-muted-foreground">
              GPS week is weeks since January 6, 1980. Seconds of week is 0-604799 (7 days × 24 hours × 3600 seconds).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Is GPS time the same as UTC?</h3>
            <p className="text-sm text-muted-foreground">
              No. GPS time is ahead of UTC by the leap second offset (18 seconds). GPS time = UTC + 18 seconds (as of 2024).
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
