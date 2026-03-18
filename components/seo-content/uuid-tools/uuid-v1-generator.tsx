import React from "react"

export default function UuidV1GeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Generate UUID version 1 identifiers that embed the current timestamp and a unique node identifier. UUID v1 creates time-ordered unique IDs suitable for database keys and event tracking.
          </p>
          <p>
            The generator combines a 60-bit timestamp (100-nanosecond intervals since October 15, 1582), a 14-bit clock sequence, and a 48-bit node ID to create globally unique identifiers.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example generated UUIDs:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Generated UUID v1:
6ba7b810-9dad-11d1-80b4-00c04fd430c8

Structure breakdown:
6ba7b810  - Time low (32 bits)
9dad      - Time mid (16 bits)
11d1      - Time high + version (16 bits, version=1)
80b4      - Clock sequence + variant (16 bits)
00c04fd430c8 - Node ID (48 bits)

Key property: UUIDs generated later have higher values.</pre>
          </div>
          <p>
            Each generated UUID is unique even when created in rapid succession. The clock sequence increments to prevent collisions when multiple UUIDs are generated within the same timestamp tick.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Database primary keys</h3>
            <p className="text-sm text-muted-foreground">
              UUID v1 as primary keys are roughly time-ordered, improving index performance compared to random UUIDs. Inserts go to the end of the index, reducing page splits.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Event sourcing and audit logs</h3>
            <p className="text-sm text-muted-foreground">
              Events need unique IDs that preserve order. UUID v1's embedded timestamp means sorting by ID approximates sorting by time. Useful for replay and debugging.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Distributed system coordination</h3>
            <p className="text-sm text-muted-foreground">
              Multiple services generate UUIDs without coordination. The combination of timestamp and node ID ensures uniqueness across the entire distributed system.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Session and transaction tracking</h3>
            <p className="text-sm text-muted-foreground">
              Generate unique session IDs that encode creation time. Debugging becomes easier when you can see approximately when a session was created from its ID.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">File naming for uploads</h3>
            <p className="text-sm text-muted-foreground">
              User uploads need unique filenames. UUID v1 prevents collisions and groups files by upload time when sorted alphabetically. Better than sequential numbers for distributed storage.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Message queue correlation</h3>
            <p className="text-sm text-muted-foreground">
              Track messages through a pipeline with UUID v1 correlation IDs. The time component helps identify bottlenecks and understand message flow timing.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">UUID v1 reveals generation time.</strong>
              Anyone with a UUID v1 can extract approximately when it was created. This is a feature for auditing but a privacy concern for user-facing identifiers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Node ID may expose machine identity.</strong>
              Original UUID v1 used MAC addresses as node IDs. Modern implementations often use random node IDs to prevent tracking which machine generated a UUID.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Clock sequence handles time rollback.</strong>
              If the system clock is set backward, the clock sequence changes to maintain uniqueness. This prevents duplicate UUIDs during NTP adjustments or daylight saving transitions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">UUID v1 is not cryptographically secure.</strong>
              Don't use UUID v1 as security tokens or passwords. The predictable structure makes it unsuitable for authentication or authorization purposes.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For public-facing identifiers where you don't want to reveal creation time, use UUID v4 (random) instead. Reserve UUID v1 for internal system IDs.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between UUID v1 and v4?</h3>
            <p className="text-sm text-muted-foreground">
              UUID v1 is time-based with embedded timestamp and node ID. UUID v4 is completely random. v1 is time-ordered (better for databases), v4 is unpredictable (better for security).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can UUID v1 collisions occur?</h3>
            <p className="text-sm text-muted-foreground">
              Extremely unlikely. The combination of timestamp, clock sequence, and node ID provides 122 bits of uniqueness. You'd need to generate billions per second for years to have any risk.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I generate UUID v1 in code?</h3>
            <p className="text-sm text-muted-foreground">
              Most languages have libraries: Python (uuid.uuid1()), Node.js (uuid.v1()), Java (UUID.nameUUIDFromBytes for v3/v5, third-party for v1). Use established libraries, don't roll your own.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is UUID v1 still recommended?</h3>
            <p className="text-sm text-muted-foreground">
              For internal system IDs where time-ordering helps, yes. For public identifiers or security-sensitive uses, prefer UUID v4. Many modern systems use v4 or ULID for better privacy.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens if two machines have the same node ID?</h3>
            <p className="text-sm text-muted-foreground">
              Collisions could occur if they generate UUIDs at the same timestamp. This is why proper implementations use unique node IDs (MAC address or random) for each generating instance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I sort UUIDs v1 by time?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, UUID v1 is lexicographically sortable by time. Later-generated UUIDs have higher values. This makes them efficient for database indexes and time-range queries.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the timestamp resolution?</h3>
            <p className="text-sm text-muted-foreground">
              100-nanosecond intervals (10 million per second). The timestamp is a 60-bit counter. This provides fine granularity and won't overflow for thousands of years.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
