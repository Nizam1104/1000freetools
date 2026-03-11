import * as React from "react"

export default function MacFileTimestampConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Enter a macOS file timestamp (seconds since January 1, 2001 00:00:00 UTC) or a Unix timestamp. The converter transforms between macOS time and Unix time, accounting for the different epoch start dates.
          </p>
          <p>
            macOS uses the Cocoa date format where epoch is January 1, 2001 (the start of Mac OS X). Unix uses January 1, 1970. The offset between them is 978307200 seconds.
          </p>
          <p>
            Results display in multiple formats: macOS timestamp, Unix timestamp, ISO 8601 date, and human-readable format. Copy any format with a single click for use in file operations or scripting.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">File Metadata Extraction</h3>
            <p className="text-sm text-muted-foreground">
              Convert macOS file creation/modification timestamps to Unix time for cross-platform tools.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Backup Scripts</h3>
            <p className="text-sm text-muted-foreground">
              Compare file timestamps between macOS and Unix/Linux backup systems.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Forensics Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Interpret macOS file system timestamps during digital forensics investigations.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Cross-Platform Sync</h3>
            <p className="text-sm text-muted-foreground">
              Synchronize file timestamps between macOS and other operating systems.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Database Import</h3>
            <p className="text-sm text-muted-foreground">
              Convert macOS file timestamps when importing file metadata into databases.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Automation Scripts</h3>
            <p className="text-sm text-muted-foreground">
              Work with file dates in AppleScript, Automator, or shell scripts on macOS.
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
              <strong className="text-foreground">macOS epoch:</strong> macOS/Cocoa time starts January 1, 2001 00:00:00 UTC. This is when Mac OS X was released.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Conversion formula:</strong> Unix = macOS + 978307200. macOS = Unix - 978307200. The offset is exactly 31 years in seconds.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">File timestamps:</strong> macOS files have creation date, modification date, and last access date. All use the same timestamp format.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">HFS+ vs APFS:</strong> Both file systems use the same timestamp format (macOS epoch), though APFS has nanosecond precision.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Command line:</strong> On macOS, use "stat -f %c filename" for creation date or "stat -f %m filename" for modification date.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">What is macOS file timestamp?</h3>
            <p className="text-sm text-muted-foreground">
              macOS file timestamps count seconds since January 1, 2001 00:00:00 UTC. This is the Cocoa/NSDate epoch used throughout macOS.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I convert macOS time to Unix?</h3>
            <p className="text-sm text-muted-foreground">
              Add 978307200 seconds. macOS_timestamp + 978307200 = Unix_timestamp. This tool does it automatically.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Why does macOS use different epoch?</h3>
            <p className="text-sm text-muted-foreground">
              macOS (Cocoa) chose 2001 as it was when Mac OS X launched. Unix uses 1970. Both are arbitrary reference points.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I see file timestamps on Mac?</h3>
            <p className="text-sm text-muted-foreground">
              Use "ls -l" for modification time, "stat filename" for all timestamps, or Get Info in Finder (Cmd+I).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What timestamp is January 1, 2000?</h3>
            <p className="text-sm text-muted-foreground">
              January 1, 2000 is before macOS epoch. In macOS time it's negative: -31536000 seconds (one year before 2001).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I convert APFS nanosecond timestamps?</h3>
            <p className="text-sm text-muted-foreground">
              This tool handles second precision. For nanoseconds, divide by 1,000,000,000 to get seconds, then convert.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What's the macOS timestamp for now?</h3>
            <p className="text-sm text-muted-foreground">
              Current macOS timestamp is displayed when you enter current Unix time. Subtract 978307200 from current Unix timestamp.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
