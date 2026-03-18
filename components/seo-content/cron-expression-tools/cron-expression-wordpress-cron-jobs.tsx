import React from "react"

export default function CronExpressionWordpressSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">WordPress Cron Jobs Explained</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            WordPress uses cron jobs for scheduled tasks: publishing scheduled posts, checking for updates, sending email notifications, and running backups. The WordPress cron generator provides ready-to-use expressions for common WP tasks.
          </p>
          <p>
            Unlike system cron, WordPress's built-in WP-Cron only runs when someone visits the site. For reliable scheduling, you disable WP-Cron and set up real system cron jobs that call <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">wp cron event run --due-now</code> via WP-CLI.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Common WordPress cron schedules:</p>
            <ul className="text-sm space-y-1.5 ml-4 list-disc">
              <li><strong className="text-foreground">Process due events</strong> - <code className="font-mono text-xs">*/15 * * * *</code> (every 15 minutes)</li>
              <li><strong className="text-foreground">Daily backup</strong> - <code className="font-mono text-xs">0 2 * * *</code> (2 AM daily)</li>
              <li><strong className="text-foreground">Weekly update check</strong> - <code className="font-mono text-xs">0 6 * * 1</code> (Monday 6 AM)</li>
              <li><strong className="text-foreground">Hourly health check</strong> - <code className="font-mono text-xs">0 * * * *</code> (every hour)</li>
            </ul>
          </div>
          <p>
            The generator outputs both the cron expression and the exact command to run, whether that's WP-CLI for local tasks or curl for triggering WP-Cron remotely.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Moving from WP-Cron to system cron</h3>
            <p className="text-sm text-muted-foreground">
              Your low-traffic site misses scheduled posts because WP-Cron only fires on pageviews. Set up system cron to reliably process scheduled events every 15 minutes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Automating WordPress backups</h3>
            <p className="text-sm text-muted-foreground">
              Schedule daily database dumps and weekly full backups. The generator provides commands using WP-CLI or mysqldump with proper paths.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Running maintenance tasks</h3>
            <p className="text-sm text-muted-foreground">
              Clear transients weekly, optimize database monthly, flush caches daily. System cron ensures these run even when you don't visit wp-admin.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Managing multiple WordPress sites</h3>
            <p className="text-sm text-muted-foreground">
              Run the same cron jobs across 10 client sites. Standardize backup times, update checks, and monitoring across your entire portfolio.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Scheduling content publishing</h3>
            <p className="text-sm text-muted-foreground">
              Your editorial team schedules posts for specific times. System cron ensures they publish on schedule, not "whenever the next visitor arrives".
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Automating plugin-specific tasks</h3>
            <p className="text-sm text-muted-foreground">
              WooCommerce scheduled emails, membership expirations, subscription renewals—all rely on cron. System cron makes them reliable.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Disable WP-Cron first.</strong>
              Add <code className="font-mono text-xs">define('DISABLE_WP_CRON', true);</code> to wp-config.php before setting up system cron. Otherwise, you'll process events twice.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">WP-CLI must be installed.</strong>
              Commands like <code className="font-mono text-xs">wp cron event run</code> require WP-CLI. Install it (<code className="font-mono text-xs">wp cli info</code> to verify) and note the full path (often <code className="font-mono text-xs">/usr/local/bin/wp</code>).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Set the correct working directory.</strong>
              WP-CLI commands need to run from your WordPress root. Either <code className="font-mono text-xs">cd</code> into the directory in your cron command, or use the <code className="font-mono text-xs">--path=/var/www/html</code> flag.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Configure email for output.</strong>
              Cron emails command output to the server's admin. Redirect output (<code className="font-mono text-xs">> /dev/null 2>&1</code>) if you don't want emails, or set up proper log files.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Production tip:</strong> Test WP-CLI commands manually before adding to crontab. Run <code className="font-mono text-xs">sudo -u www-data wp cron event list</code> to verify permissions and paths work correctly.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why disable WP-Cron?</h3>
            <p className="text-sm text-muted-foreground">
              WP-Cron only runs when someone visits the site. Low-traffic sites miss scheduled events. High-traffic sites run WP-Cron too frequently. System cron provides predictable, controlled execution.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How often should I run WordPress cron?</h3>
            <p className="text-sm text-muted-foreground">
              Every 15 minutes is the WordPress default and works for most sites. For time-sensitive tasks (scheduled posts, expiring memberships), consider every 5 minutes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What user should run WordPress cron jobs?</h3>
            <p className="text-sm text-muted-foreground">
              Run as the web server user (www-data, apache, or nginx) so file permissions match. Example: <code className="font-mono text-xs">sudo -u www-data wp cron event run</code>.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I run different cron jobs for different sites?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, use the <code className="font-mono text-xs">--path</code> flag to specify each site's directory. Set up separate cron entries for each WordPress installation on your server.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I see what cron events are scheduled?</h3>
            <p className="text-sm text-muted-foreground">
              Run <code className="font-mono text-xs">wp cron event list</code> to see all scheduled events with their next run times. Use <code className="font-mono text-xs">wp cron event run --due-now</code> to execute any that are due.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if my cron job fails?</h3>
            <p className="text-sm text-muted-foreground">
              Cron will email you the error (if configured). Check that WP-CLI is in the PATH, the WordPress directory exists, and the web server user has correct permissions.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
