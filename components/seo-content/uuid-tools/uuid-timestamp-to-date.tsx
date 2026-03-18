import React from "react"

export default function UuidTimestampToDateSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter a UUID version 1 to extract and decode its embedded timestamp. UUID v1 includes a 60-bit timestamp representing 100-nanosecond intervals since October 15, 1582.
          </p>
          <p>
            The tool parses the UUID structure, extracts the timestamp portion, converts it to a readable date and time, and shows the time in your local timezone.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example extraction:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">UUID: 6ba7b810-9dad-11d1-80b4-00c04fd430c8

Structure:
  Time-low: 6ba7b810
  Time-mid: 9dad
  Time-high: 11d1 (version 1)
  Clock seq: 80b4
  Node: 00c04fd430c8

Extracted timestamp:
November 1, 1997 at 1:30:00 AM UTC</pre>
          </div>
          <p>
            Only UUID version 1 contains timestamps. Versions 3, 4, and 5 use different generation methods and don't encode time information. The tool validates the UUID version before extraction.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Database record auditing</h3>
            <p className="text-sm text-muted-foreground">
              Legacy systems use UUID v1 as primary keys. The timestamp reveals when records were created without a separate created_at column. Useful for data forensics and migration planning.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Log file analysis</h3>
            <p className="text-sm text-muted-foreground">
              Application logs include UUID v1 for request tracking. Extracting timestamps helps correlate events across services without relying on separate timestamp fields that might be out of sync.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Security incident investigation</h3>
            <p className="text-sm text-muted-foreground">
              Session tokens or transaction IDs generated as UUID v1 reveal when activities occurred. This helps build timelines during security audits or incident response.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Data migration validation</h3>
            <p className="text-sm text-muted-foreground">
              When migrating from UUID v1 to v4, extract timestamps to verify data ordering. Ensure records maintain their chronological sequence after the migration.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging distributed systems</h3>
            <p className="text-sm text-muted-foreground">
              UUID v1's timestamp helps trace request flow across microservices. Compare timestamps to identify latency bottlenecks and understand event ordering.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Compliance and record retention</h3>
            <p className="text-sm text-muted-foreground">
              Regulations require knowing when records were created. UUID v1 timestamps provide creation dates for audit trails and retention policy enforcement.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Only UUID version 1 has timestamps.</strong>
              Check the version digit (13th hex character). Version 1 (like xxxxxxxx-xxxx-1xxx) contains a timestamp. Version 4 (xxxxxxxx-xxxx-4xxx) is random and has no time information.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">UUID v1 timestamp epoch is unusual.</strong>
              The timestamp counts 100-nanosecond intervals since October 15, 1582 - the start of the Gregorian calendar. This is different from Unix epoch (January 1, 1970).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Clock sequence prevents duplicates.</strong>
              UUID v1 includes a clock sequence that changes if the clock is set backward. This helps maintain uniqueness even with time adjustments.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Node ID may reveal MAC address.</strong>
              Original UUID v1 included the MAC address. Modern implementations often use random node IDs for privacy. Don't rely on node ID for machine identification.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> UUID v1 timestamps have microsecond precision but aren't guaranteed to be monotonic. Don't use them for strict ordering without additional sequence numbers.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I identify UUID version 1?</h3>
            <p className="text-sm text-muted-foreground">
              Look at the 13th character (after the second hyphen). Version 1 UUIDs have "1" there: xxxxxxxx-xxxx-1xxx-xxxx-xxxxxxxxxxxx. Version 4 has "4", version 5 has "5".
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does the timestamp start from 1582?</h3>
            <p className="text-sm text-muted-foreground">
              October 15, 1582 is when the Gregorian calendar began. This epoch was chosen for the DCE (Distributed Computing Environment) standard that defined UUID v1.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I generate UUID v1 with a specific timestamp?</h3>
            <p className="text-sm text-muted-foreground">
              Technically yes, but it's not recommended. UUID v1 generators use the current time to ensure uniqueness. Backdating UUIDs risks collisions with existing identifiers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the precision of UUID v1 timestamps?</h3>
            <p className="text-sm text-muted-foreground">
              100-nanosecond intervals (10 million per second). However, most systems don't generate UUIDs this fast, so practical precision is limited by the generation rate.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are UUID v1 timestamps timezone-aware?</h3>
            <p className="text-sm text-muted-foreground">
              The timestamp is stored in UTC. The converter displays it in your local timezone. The underlying value doesn't change based on where the UUID was generated.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why was UUID v1 replaced by v4?</h3>
            <p className="text-sm text-muted-foreground">
              UUID v1 reveals generation time and potentially the MAC address, creating privacy concerns. UUID v4 is completely random, providing better privacy and simpler implementation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I sort records by UUID v1?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, UUID v1 is roughly time-ordered, but not perfectly. The timestamp bits are rearranged in the UUID string. For strict ordering, use a dedicated timestamp column.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
