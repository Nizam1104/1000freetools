import React from "react"

export default function CronExpressionLogRotationSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How CRON for Log Rotation Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool provides CRON templates and shell scripts for automated log rotation, temporary file cleanup,
            and system maintenance tasks. Instead of writing rotation scripts from scratch, use proven templates that handle compression, retention, and archival.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Template Categories</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><strong>Daily rotation:</strong> Rotate logs every day at midnight</li>
            <li><strong>Weekly rotation:</strong> Archive logs every Sunday</li>
            <li><strong>Monthly rotation:</strong> Create monthly log archives for compliance</li>
            <li><strong>Temp cleanup:</strong> Remove temporary files older than N days</li>
            <li><strong>Cache cleanup:</strong> Clear application caches on a schedule</li>
            <li><strong>Archive scripts:</strong> Move old logs to long-term storage</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Who Needs Log Rotation Templates</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">System Administrators</h3>
            <p className="text-sm text-muted-foreground">
              Managing servers that generate gigabytes of logs daily. Prevent disk space exhaustion with automated rotation.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">DevOps Engineers</h3>
            <p className="text-sm text-muted-foreground">
              Setting up logging infrastructure for containerized applications. Integrate with log aggregation systems.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Compliance Officers</h3>
            <p className="text-sm text-muted-foreground">
              Ensuring logs are retained for required periods (30, 90, 365 days) and archived properly for audits.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Application Developers</h3>
            <p className="text-sm text-muted-foreground">
              Building apps that write to log files. Provide operators with ready-to-use rotation configurations.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Database Administrators</h3>
            <p className="text-sm text-muted-foreground">
              Managing database query logs, slow query logs, and transaction logs that grow continuously.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Understanding Log Rotation Strategies</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Rotation Frequency</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Daily:</strong> Best for high-volume applications. Keeps individual log files manageable.
              Runs at midnight to capture a full day&apos;s activity in one file.
            </p>
            <p>
              <strong className="text-foreground">Weekly:</strong> Suitable for lower-traffic systems. Reduces the number of archived files.
              Typically runs Sunday morning when traffic is lowest.
            </p>
            <p>
              <strong className="text-foreground">Size-based:</strong> Rotate when logs exceed a threshold (e.g., 100MB).
              Useful for unpredictable traffic patterns. Requires monitoring rather than fixed schedules.
            </p>
          </div>

          <h3 className="text-lg font-semibold mt-6">Compression Options</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">gzip:</strong> Standard compression, good balance of speed and size reduction.
              Files become .log.gz, typically 90% smaller than original.
            </p>
            <p>
              <strong className="text-foreground">delaycompress:</strong> Keep the most recent rotated log uncompressed.
              Useful when you need to tail or grep recent logs without decompressing.
            </p>
            <p>
              <strong className="text-foreground">No compression:</strong> Faster rotation, larger disk usage.
              Only use when disk space is abundant or logs need immediate processing.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What&apos;s the difference between cron-based rotation and logrotate?</h3>
            <p className="text-sm text-muted-foreground">
              logrotate is a dedicated Linux utility with built-in rotation features (compression, email notifications, post-rotation scripts).
              Cron-based rotation uses shell scripts you control. Both can coexist—use logrotate for system logs and custom scripts for applications.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How do I handle applications that keep log files open?</h3>
            <p className="text-sm text-muted-foreground">
              Use the copytruncate method (copies then truncates the original) or send a signal to the application to reopen log files.
              Many services support SIGHUP or have a &quot;reload&quot; command that closes and reopens logs.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What retention period should I use?</h3>
            <p className="text-sm text-muted-foreground">
              It depends on your needs: 7-14 days for debugging recent issues, 30-90 days for operational analysis,
              1+ years for compliance requirements. Consider storage costs versus the likelihood of needing old logs.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Should I rotate logs locally or send them to a central system?</h3>
            <p className="text-sm text-muted-foreground">
              For single servers, local rotation works fine. For distributed systems, use log shipping (Fluentd, Logstash, Filebeat)
              to send logs to a central system (Elasticsearch, Splunk) before rotation deletes them.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How do I test rotation scripts safely?</h3>
            <p className="text-sm text-muted-foreground">
              Run scripts manually first with a test directory. Use the -n (dry-run) flag if available.
              Test on a non-production server. Verify that applications continue logging after rotation.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I rotate logs based on both time and size?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, combine conditions in your script. For example, rotate daily but also rotate immediately if the file exceeds 500MB.
              logrotate supports this with &quot;maxsize&quot; and &quot;size&quot; directives alongside time-based options.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">logrotate vs Custom Scripts</h2>
        <div className="rounded-lg border bg-muted/30 p-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-green-600 dark:text-green-400">Use logrotate When</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Rotating standard system logs</li>
                <li>You need built-in compression</li>
                <li>Email notifications on rotation</li>
                <li>Multiple applications share log directories</li>
                <li>Standard rotation patterns suffice</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400">Use Custom Scripts When</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Complex rotation logic is needed</li>
                <li>Uploading archives to cloud storage</li>
                <li>Custom naming or directory structures</li>
                <li>Integration with proprietary systems</li>
                <li>Specific compliance requirements</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
