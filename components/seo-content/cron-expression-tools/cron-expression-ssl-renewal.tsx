import React from "react"

export default function CronExpressionSslRenewalSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How SSL Certificate Renewal with CRON Works</h2>

        <div className="space-y-3 text-muted-foreground">
          <p>
            Let's Encrypt certificates expire every 90 days. Certbot (the standard ACME
            client) includes a renewal command that checks if certificates are due for
            renewal and only renews when necessary—typically when less than 30 days remain.
          </p>

          <p>
            The CRON job runs daily, letting Certbot decide whether renewal is needed.
            This approach is safer than manual renewal because it provides multiple
            opportunities to succeed before expiration.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="text-sm font-medium">The renewal workflow:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>CRON runs daily (typically at 2-4 AM) executing "certbot renew"</li>
              <li>Certbot checks all installed certificates for expiry dates</li>
              <li>If a certificate has less than 30 days remaining, Certbot renews it</li>
              <li>On successful renewal, the deploy-hook reloads your web server</li>
              <li>If renewal fails, alerts can notify you before expiration becomes critical</li>
            </ol>
          </div>

          <p>
            The monitoring scripts add an extra safety layer by checking certificate
            expiry dates and sending alerts when certificates approach expiration,
            giving you time to intervene if automatic renewal fails.
          </p>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preventing website downtime from expired certificates</h3>
            <p className="text-sm text-muted-foreground">
              A small business owner had their e-commerce site go down for hours when an
              SSL certificate expired over a weekend. Daily renewal checks with alerting
              ensure this never happens again—automatic renewal handles it silently.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Managing certificates across multiple domains</h3>
            <p className="text-sm text-muted-foreground">
              A hosting provider manages SSL for 50+ client domains. A single daily CRON
              job renews all certificates that need it. Monitoring scripts track expiry
              dates across all domains and alert only when manual intervention is needed.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Setting up certificates on a new server</h3>
            <p className="text-sm text-muted-foreground">
              A DevOps engineer deploys a new production server. They obtain the initial
              certificate with Certbot, then immediately set up the renewal CRON job as
              part of the deployment script—renewal is configured before the first
              certificate even nears expiration.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Compliance requirements for certificate monitoring</h3>
            <p className="text-sm text-muted-foreground">
              A financial services company must prove continuous SSL coverage for compliance.
              Daily expiry checks with logged results and alerting provide an audit trail
              showing proactive certificate management.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Handling certificate renewal during vacations</h3>
            <p className="text-sm text-muted-foreground">
              A solo sysadmin is going on vacation for two weeks. They verify renewal CRON
              jobs are working and set up email alerts to their phone. Certificates will
              renew automatically while they're away, with alerts if anything goes wrong.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Migrating from paid certificates to Let's Encrypt</h3>
            <p className="text-sm text-muted-foreground">
              A company switches from expensive annual certificates to free Let's Encrypt.
              They set up Certbot with automated renewal CRON jobs, eliminating both the
              cost and the annual renewal reminder emails from their previous provider.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know About SSL Renewal</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Let's Encrypt certificates expire in 90 days.</strong>
              This is intentional—short lifetimes limit damage from compromised certificates
              and encourage automation. Certbot renews when less than 30 days remain, giving
              a 60-day renewal window.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Rate limits apply to certificate issuance.</strong>
              Let's Encrypt limits you to 50 certificates per week per registered domain.
              Daily renewal checks spread out renewal attempts, avoiding rate limit issues
              that could block emergency renewals.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Web server reload is required after renewal.</strong>
              Certbot renews the certificate files, but your web server (nginx, Apache)
              must reload to use the new certificate. The --deploy-hook option handles
              this automatically on successful renewal.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Test renewal with --dry-run first.</strong>
              Before relying on automated renewal, run "certbot renew --dry-run" to verify
              the process works. This uses Let's Encrypt's staging environment, so it
              doesn't count against rate limits.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Critical:</strong> Set up expiry monitoring in addition to auto-renewal.
              If renewal fails (DNS issues, rate limits, server problems), you need to know
              with enough time to fix it manually. 30-day advance warning is standard.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How often should the renewal CRON job run?</h3>
            <p className="text-sm text-muted-foreground">
              Daily is standard and recommended. Certbot only renews when necessary (under
              30 days to expiry), so daily checks don't cause unnecessary renewals. The
              frequency ensures multiple chances to succeed before expiration.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What time should SSL renewal run?</h3>
            <p className="text-sm text-muted-foreground">
              Early morning (2-4 AM) is typical—low traffic means less impact if the web
              server needs to reload. Avoid business hours when a failed renewal could
              cause visible issues during peak usage.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I know if renewal failed?</h3>
            <p className="text-sm text-muted-foreground">
              Check /var/log/letsencrypt/letsencrypt.log for renewal attempts and errors.
              Set up the monitoring scripts to email you on failures. Certbot also returns
              non-zero exit codes on failure, which CRON can capture.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I renew certificates manually?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, run "certbot renew --force-renewal" to renew regardless of expiry date.
              This is useful when you've made configuration changes or need to add domains.
              Normal "certbot renew" only renews certificates expiring within 30 days.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens if my certificate expires?</h3>
            <p className="text-sm text-muted-foreground">
              Browsers show security warnings, visitors may be blocked from accessing your
              site, and search rankings can drop. Renewal still works after expiration,
              but the downtime makes prevention critical. This is why monitoring matters.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do I need separate CRON jobs for multiple domains?</h3>
            <p className="text-sm text-muted-foreground">
              No. A single "certbot renew" command checks all certificates managed by
              Certbot on that server. It renews any that are due. You only need multiple
              jobs if certificates are on different servers or use different Certbot
              configurations.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I verify my certificates are set to auto-renew?</h3>
            <p className="text-sm text-muted-foreground">
              Run "certbot certificates" to list all certificates and their expiry dates.
              Check your crontab with "crontab -l" or "sudo crontab -l" for the renewal
              job. Test with "certbot renew --dry-run" to confirm the process works.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
