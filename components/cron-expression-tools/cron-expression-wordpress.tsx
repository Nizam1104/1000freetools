"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Settings, RefreshCw, Package } from "lucide-react"
import { cn } from "@/lib/utils"

function getBackupCommand(wpPath: string): string {
  return `wp db export /backups/wp-db-$(date +%Y%m%d).sql --path=${wpPath} && \\
tar -czf /backups/wp-files-$(date +%Y%m%d).tar.gz ${wpPath}/wp-content`
}

function getAutoUpdateCommand(wpCliPath: string): string {
  return `${wpCliPath} core update && ${wpCliPath} plugin update --all && ${wpCliPath} theme update --all`
}

export default function CronExpressionWordpress() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [wpPath, setWpPath] = useState("/var/www/html")
  const [wpUrl, setWpUrl] = useState("https://example.com")
  const [wpCliPath, setWpCliPath] = useState("/usr/local/bin/wp")
  const [copied, setCopied] = useState<string | null>(null)

  const wordpressTemplates = useMemo(() => [
    {
      id: "wp_cron_hourly",
      name: "WP-Cron Hourly Events",
      icon: Settings,
      description: "Process hourly scheduled events",
      cron: "0 * * * *",
      schedule: "Every hour on the hour",
      useCase: "Default WordPress cron processing",
      command: `curl -s ${wpUrl}/wp-cron.php > /dev/null 2>&1`,
    },
    {
      id: "wp_cron_disabled",
      name: "Disable WP-Cron + System Cron",
      icon: Settings,
      description: "Use system cron instead of WP-Cron",
      cron: "*/15 * * * *",
      schedule: "Every 15 minutes",
      useCase: "Recommended production setup",
      command: `${wpCliPath} cron event run --due-now`,
    },
    {
      id: "wp_backup_daily",
      name: "Daily WordPress Backup",
      icon: RefreshCw,
      description: "Daily database and files backup",
      cron: "0 2 * * *",
      schedule: "Daily at 2:00 AM",
      useCase: "Regular WordPress backups",
      command: getBackupCommand(wpPath),
    },
    {
      id: "wp_update_check",
      name: "Update Check",
      icon: Package,
      description: "Check for WordPress updates",
      cron: "0 6 * * 1",
      schedule: "Every Monday at 6:00 AM",
      useCase: "Weekly update notifications",
      command: `${wpCliPath} core check-update && ${wpCliPath} plugin list --update=available`,
    },
    {
      id: "wp_auto_update",
      name: "Auto Apply Updates",
      icon: RefreshCw,
      description: "Automatically apply safe updates",
      cron: "0 4 * * 0",
      schedule: "Every Sunday at 4:00 AM",
      useCase: "Automated maintenance",
      command: getAutoUpdateCommand(wpCliPath),
    },
    {
      id: "wp_cache_clear",
      name: "Clear Cache",
      icon: Settings,
      description: "Clear WordPress object cache",
      cron: "0 0 * * *",
      schedule: "Daily at midnight",
      useCase: "Cache maintenance",
      command: `${wpCliPath} cache flush`,
    },
    {
      id: "wp_db_optimize",
      name: "Database Optimization",
      icon: Settings,
      description: "Optimize WordPress database",
      cron: "0 3 * * 0",
      schedule: "Every Sunday at 3:00 AM",
      useCase: "Database maintenance",
      command: `${wpCliPath} db optimize && ${wpCliPath} db clean`,
    },
    {
      id: "wp_security_scan",
      name: "Security Scan",
      icon: Settings,
      description: "Run security vulnerability scan",
      cron: "0 5 * * 1",
      schedule: "Every Monday at 5:00 AM",
      useCase: "Security monitoring",
      command: `${wpCliPath} plugin list --format=json | wp vuln check`,
    },
    {
      id: "wp_transients",
      name: "Clean Transients",
      icon: Settings,
      description: "Remove expired transients",
      cron: "0 1 * * *",
      schedule: "Daily at 1:00 AM",
      useCase: "Database cleanup",
      command: `${wpCliPath} transient delete --expired`,
    },
    {
      id: "wp_log_rotation",
      name: "Log Rotation",
      icon: Settings,
      description: "Rotate WordPress debug logs",
      cron: "0 0 1 * *",
      schedule: "1st of every month at midnight",
      useCase: "Log management",
      command: `mv ${wpPath}/wp-content/debug.log ${wpPath}/wp-content/debug-$(date +%Y%m).log`,
    },
    {
      id: "wp_health_check",
      name: "Site Health Check",
      icon: Settings,
      description: "Run WordPress health checks",
      cron: "0 */6 * * *",
      schedule: "Every 6 hours",
      useCase: "Monitoring site health",
      command: `${wpCliPath} health check status`,
    },
    {
      id: "wp_sitemap_generate",
      name: "Regenerate Sitemap",
      icon: Settings,
      description: "Regenerate XML sitemap",
      cron: "0 4 * * *",
      schedule: "Daily at 4:00 AM",
      useCase: "SEO maintenance",
      command: `${wpCliPath} yoast seo regenerate`,
    },
  ], [wpPath, wpUrl, wpCliPath])

  const applyTemplate = useCallback((template: typeof wordpressTemplates[0]) => {
    setSelectedTemplate(template.id)
  }, [])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="size-5" />
            CRON for WordPress Cron Jobs
          </CardTitle>
          <CardDescription>
            Templates for wp-cron.php, WP-CLI tasks, and WordPress maintenance
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>WordPress Configuration</CardTitle>
          <CardDescription>Customize the templates for your WordPress installation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="wp-path">WordPress Path</Label>
              <Input
                id="wp-path"
                value={wpPath}
                onChange={(e) => setWpPath(e.target.value)}
                placeholder="/var/www/html"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wp-url">WordPress URL</Label>
              <Input
                id="wp-url"
                value={wpUrl}
                onChange={(e) => setWpUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wp-cli">WP-CLI Path</Label>
              <Input
                id="wp-cli"
                value={wpCliPath}
                onChange={(e) => setWpCliPath(e.target.value)}
                placeholder="/usr/local/bin/wp"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">WP-Cron Templates</TabsTrigger>
          <TabsTrigger value="setup">Setup Guide</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance Tasks</TabsTrigger>
        </TabsList>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {wordpressTemplates.map((template) => {
              const Icon = template.icon
              const isSelected = selectedTemplate === template.id
              return (
                <Card
                  key={template.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md",
                    isSelected && "ring-2 ring-primary"
                  )}
                  onClick={() => applyTemplate(template)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "p-2 rounded-lg",
                          isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                        )}>
                          <Icon className="size-4" />
                        </div>
                        <CardTitle className="text-base">{template.name}</CardTitle>
                      </div>
                    </div>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="rounded-lg bg-muted/50 p-3">
                      <div className="flex items-center justify-between mb-1">
                        <code className="font-mono text-sm font-medium">{template.cron}</code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-6"
                          onClick={(e) => {
                            e.stopPropagation()
                            copyToClipboard(template.cron, template.id)
                          }}
                        >
                          {copied === template.id ? (
                            <Check className="size-3" />
                          ) : (
                            <Copy className="size-3" />
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">{template.schedule}</p>
                    </div>
                    <div className="p-2 rounded bg-background border font-mono text-xs overflow-x-auto">
                      {template.command}
                    </div>
                    <p className="text-xs text-muted-foreground">{template.useCase}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Setup Guide Tab */}
        <TabsContent value="setup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>WordPress Cron Setup Guide</CardTitle>
              <CardDescription>Configure WordPress to use system cron instead of WP-Cron</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "1. Disable WP-Cron in wp-config.php",
                  code: `// Add this to wp-config.php (before the "That's all" line)
define('DISABLE_WP_CRON', true);

// Optional: Set cron queue interval
define('WP_CRON_LOCK_TIMEOUT', 60);`,
                },
                {
                  title: "2. Add System Cron Job",
                  code: `# Edit crontab
crontab -e

# Add this line (runs every 15 minutes)
*/15 * * * * ${wpCliPath} cron event run --due-now --path=${wpPath}

# Or use curl to trigger wp-cron.php
*/15 * * * * curl -s ${wpUrl}/wp-cron.php > /dev/null 2>&1`,
                },
                {
                  title: "3. Verify WP-CLI Installation",
                  code: `# Check WP-CLI is installed
${wpCliPath} --info

# Test cron command
${wpCliPath} cron event list --path=${wpPath}

# Run due events manually
${wpCliPath} cron event run --due-now --path=${wpPath}`,
                },
                {
                  title: "4. Common WP-Cron Events",
                  code: `# List all scheduled events
${wpCliPath} cron event list

# List scheduled hooks
${wpCliPath} cron schedule list

# Run a specific event
${wpCliPath} cron event run wp_site_health_scheduled_check

# Delete all events (use with caution)
${wpCliPath} cron event delete --all`,
                },
                {
                  title: "5. Debug WP-Cron Issues",
                  code: `# Check if cron is working
${wpCliPath} cron test

# View cron debug log
tail -f wp-content/debug.log

# Check for missed events
${wpCliPath} cron event list --format=json | jq '.[] | select(.next_run | . < now)'`,
                },
              ].map((step, idx) => (
                <div key={idx} className="p-4 rounded-lg border bg-muted/30">
                  <h4 className="font-medium mb-2">{step.title}</h4>
                  <div className="flex items-center justify-between">
                    <pre className="text-xs font-mono bg-background p-3 rounded overflow-x-auto whitespace-pre-wrap flex-1">
                      {step.code}
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 shrink-0"
                      onClick={() => copyToClipboard(step.code, `setup-${idx}`)}
                    >
                      {copied === `setup-${idx}` ? (
                        <Check className="size-3" />
                      ) : (
                        <Copy className="size-3" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Maintenance Tasks Tab */}
        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>WordPress Maintenance Scripts</CardTitle>
              <CardDescription>Complete maintenance scripts for WordPress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Complete Backup Script",
                  cron: "0 2 * * *",
                  script: `#!/bin/bash
# WordPress Complete Backup
# Schedule: Daily at 2:00 AM

WP_PATH="${wpPath}"
BACKUP_DIR="/backups/wordpress"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Database backup
${wpCliPath} db export $BACKUP_DIR/db_$DATE.sql --path=$WP_PATH

# Files backup
tar -czf $BACKUP_DIR/files_$DATE.tar.gz \\
  $WP_PATH/wp-content/uploads \\
  $WP_PATH/wp-content/themes \\
  $WP_PATH/wp-content/plugins

# Upload to remote storage (optional)
# aws s3 cp $BACKUP_DIR s3://your-bucket/wordpress-backups/

# Remove old backups (keep 30 days)
find $BACKUP_DIR -name "*.sql" -mtime +30 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete

echo "Backup completed: $DATE"`,
                },
                {
                  name: "Auto Update Script",
                  cron: "0 4 * * 0",
                  script: `#!/bin/bash
# WordPress Auto Update
# Schedule: Every Sunday at 4:00 AM

WP_PATH="${wpPath}"
ALERT_EMAIL="admin@example.com"

cd $WP_PATH

# Create backup before updates
${wpCliPath} db export /tmp/pre-update-backup.sql

# Update WordPress core
${wpCliPath} core update

# Update plugins (excluding specific ones)
${wpCliPath} plugin update --all --exclude=custom-plugin

# Update themes
${wpCliPath} theme update --all

# Check site health after updates
health_status=$(${wpCliPath} health check status --format=json)

if echo "$health_status" | grep -q "critical"; then
  echo "CRITICAL: Site health issues after update"
  echo "WordPress update completed with issues" | \\
    mail -s "WP Update Alert" $ALERT_EMAIL
fi

echo "Update completed: $(date)"`,
                },
                {
                  name: "Database Cleanup Script",
                  cron: "0 3 * * 0",
                  script: `#!/bin/bash
# WordPress Database Cleanup
# Schedule: Every Sunday at 3:00 AM

WP_PATH="${wpPath}"

cd $WP_PATH

# Delete expired transients
${wpCliPath} transient delete --expired

# Delete post revisions (keep last 5 per post)
${wpCliPath} post delete $(\\
  ${wpCliPath} post list --post_type=revision --format=ids | \\
  awk 'NR>5' ) --force

# Clean spam comments
${wpCliPath} comment delete $(\\
  ${wpCliPath} comment list --status=spam --format=ids) --force

# Clean trashed items older than 30 days
${wpCliPath} post delete $(\\
  ${wpCliPath} post list --post_status=trash --format=ids) --force

# Optimize database
${wpCliPath} db optimize

echo "Database cleanup completed"`,
                },
                {
                  name: "Security Scan Script",
                  cron: "0 5 * * 1",
                  script: `#!/bin/bash
# WordPress Security Scan
# Schedule: Every Monday at 5:00 AM

WP_PATH="${wpPath}"
ALERT_EMAIL="security@example.com"

cd $WP_PATH

# Check for core integrity
${wpCliPath} core verify-checksums

# Check for plugin vulnerabilities
${wpCliPath} plugin list --format=json | \\
  jq -r '.[].name' | while read plugin; do
    wp plugin list $plugin --format=json | \\
      jq -r '.[].version'
  done

# Check file permissions
find $WP_PATH -type f -perm 777 -ls

# Check for suspicious files
find $WP_PATH/wp-content -name "*.php" -newermt "-7 days" -ls

# Generate security report
${wpCliPath} user list --role=administrator

echo "Security scan completed"`,
                },
              ].map((script, idx) => (
                <div key={idx} className="p-4 rounded-lg border bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{script.name}</h4>
                      <p className="text-xs text-muted-foreground">CRON: {script.cron}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(script.script, `maint-${idx}`)}
                    >
                      {copied === `maint-${idx}` ? (
                        <Check className="size-3 mr-1" />
                      ) : (
                        <Copy className="size-3 mr-1" />
                      )}
                      Copy
                    </Button>
                  </div>
                  <pre className="text-xs font-mono bg-background p-3 rounded overflow-x-auto whitespace-pre-wrap">
                    {script.script}
                  </pre>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>WordPress Cron Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border bg-green-50 dark:bg-green-950/20">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Best Practices</h4>
                  <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                    <li>• Disable WP-Cron and use system cron for reliability</li>
                    <li>• Run cron every 15 minutes for most sites</li>
                    <li>• Schedule heavy tasks during off-peak hours</li>
                    <li>• Always backup before auto-updates</li>
                    <li>• Monitor cron events for failures</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg border bg-amber-50 dark:bg-amber-950/20">
                  <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Important Notes</h4>
                  <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                    <li>• WP-Cron only runs on page visits (unreliable)</li>
                    <li>• Some plugins require specific cron schedules</li>
                    <li>• Test updates on staging before production</li>
                    <li>• Keep WP-CLI updated for security</li>
                    <li>• Log all cron activities for debugging</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
