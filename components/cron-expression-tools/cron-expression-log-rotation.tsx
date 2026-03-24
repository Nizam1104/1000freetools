"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, FileText, Trash2, RotateCcw, FolderOpen } from "lucide-react"
import { cn } from "@/lib/utils"

function getRotationScript(frequency: string, logPath: string, retentionDays: string, compress: boolean): string {
  return `#!/bin/bash
# Log Rotation Script (${frequency})
LOG_DIR="\${logPath}"
RETENTION_DAYS=\${retentionDays}
DATE=\$(date +%Y%m%d)

mkdir -p \$LOG_DIR/archive

for log_file in \$LOG_DIR/*.log; do
  if [ -f "\$log_file" ]; then
    base_name=\$(basename "\$log_file" .log)
    ${compress ? `gzip -c "\$log_file" > "\$LOG_DIR/archive/\\\${base_name}_\$DATE.log.gz"
    > "\$log_file"` : `mv "\$log_file" "\$LOG_DIR/archive/\\\${base_name}_\$DATE.log"
    touch "\$log_file"`}
  fi
done

find \$LOG_DIR/archive -mtime +\$RETENTION_DAYS -delete`
}

function getCleanupScript(logPath: string, retentionDays: string): string {
  return `#!/bin/bash
# Hourly Cleanup Script
LOG_DIR="${logPath}"
RETENTION_DAYS=${retentionDays}

find $LOG_DIR -type f -mtime +$RETENTION_DAYS -delete
find $LOG_DIR -type d -empty -delete`
}

function getTempCleanupScript(): string {
  return `#!/bin/bash
# Temp File Cleanup
find /tmp -type f -atime +7 -delete
find /var/tmp -type f -atime +30 -delete`
}

function getCacheCleanupScript(): string {
  return `#!/bin/bash
# Cache Cleanup
apt-get clean
yum clean all
journalctl --vacuum-size=100M
find ~/.cache -type f -atime +7 -delete`
}

function getArchiveScript(logPath: string): string {
  return `#!/bin/bash
# Log Archive Script
LOG_DIR="${logPath}"
ARCHIVE_DIR="/backup/logs"
DATE=$(date +%Y%m%d)

mkdir -p $ARCHIVE_DIR
tar -czf $ARCHIVE_DIR/logs_$DATE.tar.gz $LOG_DIR/*.log.*
# Optional: Upload to cloud storage`
}

export default function CronExpressionLogRotation() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [logPath, setLogPath] = useState("/var/log/myapp")
  const [retentionDays, setRetentionDays] = useState("30")
  const [compressOld, setCompressOld] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)

  const logTemplates = useMemo(() => [
    {
      id: "daily_rotation",
      name: "Daily Log Rotation",
      icon: RotateCcw,
      description: "Rotate logs every day",
      cron: "0 0 * * *",
      schedule: "Daily at midnight",
      useCase: "High-volume applications with daily log cycles",
      script: getRotationScript("daily", logPath, retentionDays, compressOld),
    },
    {
      id: "weekly_rotation",
      name: "Weekly Log Rotation",
      icon: FolderOpen,
      description: "Rotate logs every week",
      cron: "0 0 * * 0",
      schedule: "Every Sunday at midnight",
      useCase: "Lower volume applications, weekly archives",
      script: getRotationScript("weekly", logPath, retentionDays, compressOld),
    },
    {
      id: "monthly_rotation",
      name: "Monthly Log Rotation",
      icon: FileText,
      description: "Rotate logs monthly",
      cron: "0 0 1 * *",
      schedule: "1st of every month at midnight",
      useCase: "Compliance archives, monthly reporting",
      script: getRotationScript("monthly", logPath, retentionDays, compressOld),
    },
    {
      id: "twice_daily",
      name: "Twice Daily Rotation",
      icon: RotateCcw,
      description: "Rotate logs morning and evening",
      cron: "0 0,12 * * *",
      schedule: "Midnight and noon daily",
      useCase: "Very high-volume logging",
      script: getRotationScript("daily", logPath, retentionDays, compressOld),
    },
    {
      id: "hourly_cleanup",
      name: "Hourly Cleanup",
      icon: Trash2,
      description: "Clean up old logs every hour",
      cron: "0 * * * *",
      schedule: "Every hour",
      useCase: "Strict disk space management",
      script: getCleanupScript(logPath, retentionDays),
    },
    {
      id: "temp_cleanup",
      name: "Temp File Cleanup",
      icon: Trash2,
      description: "Remove temporary files daily",
      cron: "30 2 * * *",
      schedule: "Daily at 2:30 AM",
      useCase: "Temporary file management",
      script: getTempCleanupScript(),
    },
    {
      id: "cache_cleanup",
      name: "Cache Cleanup",
      icon: Trash2,
      description: "Clear cache directories weekly",
      cron: "0 3 * * 0",
      schedule: "Every Sunday at 3:00 AM",
      useCase: "Cache management and disk cleanup",
      script: getCacheCleanupScript(),
    },
    {
      id: "archive_old_logs",
      name: "Archive Old Logs",
      icon: FolderOpen,
      description: "Archive logs older than 7 days",
      cron: "0 4 * * 1",
      schedule: "Every Monday at 4:00 AM",
      useCase: "Long-term log archival",
      script: getArchiveScript(logPath),
    },
  ], [logPath, retentionDays, compressOld])

  const applyTemplate = useCallback((template: typeof logTemplates[0]) => {
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
            <FileText className="size-5" />
            CRON for Log Rotation & Cleanup
          </CardTitle>
          <CardDescription>
            Templates for automated log rotation, temp file cleanup, and system maintenance
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <CardDescription>Customize the templates for your environment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="log-path">Log Directory Path</Label>
              <Input
                id="log-path"
                value={logPath}
                onChange={(e) => setLogPath(e.target.value)}
                placeholder="/var/log/myapp"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="retention">Retention (Days)</Label>
              <Select value={retentionDays} onValueChange={setRetentionDays}>
                <SelectTrigger id="retention">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="14">14 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Compression</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="compress"
                  checked={compressOld}
                  onChange={(e) => setCompressOld(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="compress" className="text-sm font-normal">
                  Compress old logs (gzip)
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Rotation Templates</TabsTrigger>
          <TabsTrigger value="scripts">Scripts</TabsTrigger>
          <TabsTrigger value="logrotate">logrotate.conf</TabsTrigger>
        </TabsList>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {logTemplates.map((template) => {
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
                    <p className="text-xs text-muted-foreground">{template.useCase}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Scripts Tab */}
        <TabsContent value="scripts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Log Rotation Scripts</CardTitle>
              <CardDescription>Ready-to-use shell scripts for log management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Basic Log Rotation",
                  cron: "0 0 * * *",
                  script: `#!/bin/bash
# Log Rotation Script
# Schedule: Daily at midnight

LOG_DIR="\${logPath}"
RETENTION_DAYS=\${retentionDays}
DATE=\$(date +%Y%m%d)

# Create archive directory
mkdir -p \$LOG_DIR/archive

# Rotate current logs
for log_file in \$LOG_DIR/*.log; do
  if [ -f "\$log_file" ]; then
    base_name=\$(basename "\$log_file" .log)
    ${compressOld ? `# Compress and archive
    gzip -c "\$log_file" > "\$LOG_DIR/archive/\\\${base_name}_\$DATE.log.gz"
    # Truncate original
    > "\$log_file"` : `# Move to archive
    mv "\$log_file" "\$LOG_DIR/archive/\\\${base_name}_\$DATE.log"
    # Create new empty log
    touch "\$log_file"`}
  fi
done

# Remove old archives
find \$LOG_DIR/archive -name "*.gz" -mtime +\$RETENTION_DAYS -delete
find \$LOG_DIR/archive -name "*.log" -mtime +\$RETENTION_DAYS -delete

echo "Log rotation completed: \$DATE"`,
                },
                {
                  name: "Temp File Cleanup",
                  cron: "30 2 * * *",
                  script: `#!/bin/bash
# Temporary File Cleanup Script
# Schedule: Daily at 2:30 AM

# Common temp directories
TEMP_DIRS=(
  "/tmp"
  "/var/tmp"
  "/var/cache/apt/archives"
)

RETENTION_DAYS=${retentionDays}

for dir in "\${TEMP_DIRS[@]}"; do
  if [ -d "$dir" ]; then
    echo "Cleaning $dir..."
    # Remove old temp files
    find "$dir" -type f -mtime +$RETENTION_DAYS -delete 2>/dev/null
    # Remove empty directories
    find "$dir" -type d -empty -delete 2>/dev/null
  fi
done

echo "Temp cleanup completed"`,
                },
                {
                  name: "Cache Cleanup",
                  cron: "0 3 * * 0",
                  script: `#!/bin/bash
# Cache Cleanup Script
# Schedule: Every Sunday at 3:00 AM

CACHE_DIRS=(
  "/var/cache"
  "~/.cache"
  "/var/log/journal"
)

echo "Starting cache cleanup..."

# Clear package manager caches
apt-get clean 2>/dev/null
yum clean all 2>/dev/null

# Clear application caches
for dir in "\${CACHE_DIRS[@]}"; do
  if [ -d "$dir" ]; then
    find "$dir" -type f -atime +7 -delete 2>/dev/null
  fi
done

# Clear systemd journal (keep last 100MB)
journalctl --vacuum-size=100M 2>/dev/null

echo "Cache cleanup completed"`,
                },
                {
                  name: "Log Archive Script",
                  cron: "0 4 * * 1",
                  script: `#!/bin/bash
# Log Archive Script
# Schedule: Every Monday at 4:00 AM

LOG_DIR="\${logPath}"
ARCHIVE_DIR="/backup/logs"
DATE=\$(date +%Y%m%d)
WEEK=\$(date +%V)

mkdir -p "\$ARCHIVE_DIR"

# Create weekly archive
tar -czf "\$ARCHIVE_DIR/logs_week_\\\${WEEK}_\$(date +%Y).tar.gz" \\
  \$LOG_DIR/*.log.* 2>/dev/null

# Upload to remote storage (example: AWS S3)
# aws s3 cp "\$ARCHIVE_DIR/logs_week_\\\${WEEK}_\$(date +%Y).tar.gz" s3://your-bucket/logs/

# Remove local archive after upload (older than 4 weeks)
find "\$ARCHIVE_DIR" -name "*.tar.gz" -mtime +28 -delete

echo "Log archival completed: Week \\\${WEEK}"`,
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
                      onClick={() => copyToClipboard(script.script, `script-${idx}`)}
                    >
                      {copied === `script-${idx}` ? (
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
        </TabsContent>

        {/* logrotate.conf Tab */}
        <TabsContent value="logrotate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>logrotate Configuration</CardTitle>
              <CardDescription>Native Linux logrotate configuration examples</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Daily Rotation with Compression",
                  config: `/var/log/myapp/*.log {
    daily
    rotate ${retentionDays}
    compress
    delaycompress
    missingok
    notifempty
    create 0640 root adm
    postrotate
        systemctl reload myapp > /dev/null 2>&1 || true
    endscript
}`,
                },
                {
                  name: "Weekly Rotation",
                  config: `/var/log/myapp/*.log {
    weekly
    rotate 4
    compress
    missingok
    notifempty
    create 0640 root adm
    dateext
    dateformat -%Y%m%d
}`,
                },
                {
                  name: "Size-based Rotation",
                  config: `/var/log/myapp/*.log {
    size 100M
    rotate 10
    compress
    missingok
    notifempty
    create 0640 root adm
    copytruncate
}`,
                },
                {
                  name: "Multiple Applications",
                  config: `/var/log/{app1,app2,app3}/*.log {
    daily
    rotate ${retentionDays}
    compress
    delaycompress
    missingok
    notifempty
    sharedscripts
    postrotate
        for app in app1 app2 app3; do
            systemctl reload $app > /dev/null 2>&1 || true
        done
    endscript
}`,
                },
              ].map((config, idx) => (
                <div key={idx} className="p-4 rounded-lg border bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{config.name}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(config.config, `logrotate-${idx}`)}
                    >
                      {copied === `logrotate-${idx}` ? (
                        <Check className="size-3 mr-1" />
                      ) : (
                        <Copy className="size-3 mr-1" />
                      )}
                      Copy
                    </Button>
                  </div>
                  <pre className="text-xs font-mono bg-background p-3 rounded overflow-x-auto">
                    {config.config}
                  </pre>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle>Log Management Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border bg-green-50 dark:bg-green-950/20">
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Recommendations</h4>
              <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                <li>• Rotate logs during low-traffic hours</li>
                <li>• Compress old logs to save disk space</li>
                <li>• Set appropriate retention periods</li>
                <li>• Monitor disk space usage</li>
                <li>• Use log aggregation for critical systems</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border bg-amber-50 dark:bg-amber-950/20">
              <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Important Notes</h4>
              <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                <li>• Test rotation scripts before deploying</li>
                <li>• Ensure proper file permissions</li>
                <li>• Consider application log reopening</li>
                <li>• Archive logs before deletion for compliance</li>
                <li>• Set up alerts for rotation failures</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
