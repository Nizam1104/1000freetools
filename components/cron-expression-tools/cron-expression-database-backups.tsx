"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Database, Server, HardDrive, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CronExpressionDatabaseBackups() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [dbType, setDbType] = useState<"mysql" | "postgresql" | "mongodb" | "sqlite">("mysql")
  const [backupHour, setBackupHour] = useState("2")
  const [backupMinute, setBackupMinute] = useState("0")
  const [retentionDays, setRetentionDays] = useState("7")
  const [copied, setCopied] = useState<string | null>(null)

  const backupTemplates = useMemo(() => [
    {
      id: "nightly_full",
      name: "Nightly Full Backup",
      icon: Database,
      description: "Complete database backup every night",
      cron: "0 2 * * *",
      schedule: "Daily at 2:00 AM",
      useCase: "Standard nightly backups during low-traffic hours",
      command: getBackupCommand(dbType, "full"),
    },
    {
      id: "weekly_full",
      name: "Weekly Full Backup",
      icon: HardDrive,
      description: "Complete backup every Sunday",
      cron: "0 1 * * 0",
      schedule: "Every Sunday at 1:00 AM",
      useCase: "Weekly full backup with daily incrementals",
      command: getBackupCommand(dbType, "full"),
    },
    {
      id: "daily_incremental",
      name: "Daily Incremental",
      icon: Database,
      description: "Incremental backup every day",
      cron: "0 3 * * *",
      schedule: "Daily at 3:00 AM",
      useCase: "Daily incremental backups for faster recovery",
      command: getBackupCommand(dbType, "incremental"),
    },
    {
      id: "hourly_transaction_log",
      name: "Hourly Transaction Log",
      icon: Server,
      description: "Transaction log backup every hour",
      cron: "0 * * * *",
      schedule: "Every hour",
      useCase: "Point-in-time recovery capability",
      command: getBackupCommand(dbType, "transaction"),
    },
    {
      id: "bi_daily",
      name: "Twice Daily Backup",
      icon: Database,
      description: "Backup at 2 AM and 2 PM",
      cron: "0 2,14 * * *",
      schedule: "2:00 AM and 2:00 PM daily",
      useCase: "High-availability requirements",
      command: getBackupCommand(dbType, "full"),
    },
    {
      id: "weekend_off",
      name: "Weekday Backups Only",
      icon: Shield,
      description: "Backup on weekdays only",
      cron: "0 2 * * 1-5",
      schedule: "Weekdays at 2:00 AM",
      useCase: "Skip weekend backups for non-critical systems",
      command: getBackupCommand(dbType, "full"),
    },
    {
      id: "monthly_archive",
      name: "Monthly Archive",
      icon: HardDrive,
      description: "Monthly archive backup",
      cron: "0 1 1 * *",
      schedule: "1st of every month at 1:00 AM",
      useCase: "Long-term archival and compliance",
      command: getBackupCommand(dbType, "archive"),
    },
    {
      id: "quarterly_full",
      name: "Quarterly Full Backup",
      icon: HardDrive,
      description: "Full backup each quarter",
      cron: "0 0 1 1,4,7,10 *",
      schedule: "First day of each quarter at midnight",
      useCase: "Quarterly compliance and audit requirements",
      command: getBackupCommand(dbType, "full"),
    },
  ], [dbType])

  const applyTemplate = useCallback((template: typeof backupTemplates[0]) => {
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

  const generateCustomCron = useMemo(() => {
    return `0 ${backupMinute} ${backupHour} * * *`
  }, [backupHour, backupMinute])

  const getBackupCommand = (type: string, backupType: string): string => {
    const commands: { [key: string]: { [key: string]: string } } = {
      mysql: {
        full: "mysqldump -u [user] -p[password] --all-databases > /backups/mysql_full_$(date +\\%Y\\%m\\%d).sql",
        incremental: "mysqldump -u [user] -p[password] --all-databases --single-transaction > /backups/mysql_incr_$(date +\\%Y\\%m\\%d).sql",
        transaction: "mysqlbinlog --read-from-remote-server --host=localhost --user=[user] --password=[password] --raw --result-file=/backups/binlog_$(date +\\%Y\\%m\\%d_\\%H).bin",
        archive: "mysqldump -u [user] -p[password] --all-databases --compress | gzip > /backups/mysql_archive_$(date +\\%Y\\%m).sql.gz",
      },
      postgresql: {
        full: "pg_dumpall -U [user] > /backups/pg_full_$(date +\\%Y\\%m\\%d).sql",
        incremental: "pg_basebackup -U [user] -D /backups/pg_base_$(date +\\%Y\\%m\\%d) -Ft -z",
        transaction: "pg_archivecleanup /backups/pg_wal $(cat /backups/last_backup_label)",
        archive: "pg_dumpall -U [user] | gzip > /backups/pg_archive_$(date +\\%Y\\%m).sql.gz",
      },
      mongodb: {
        full: "mongodump --out /backups/mongo_$(date +\\%Y\\%m\\%d)",
        incremental: "mongodump --oplog --out /backups/mongo_oplog_$(date +\\%Y\\%m\\%d)",
        transaction: "mongodump --oplog --out /backups/mongo_oplog_$(date +\\%Y\\%m\\%d_\\%H)",
        archive: "mongodump --archive=/backups/mongo_archive_$(date +\\%Y\\%m).gz --gzip",
      },
      sqlite: {
        full: "sqlite3 /path/to/db.sqlite \".backup '/backups/sqlite_$(date +\\%Y\\%m\\%d).db'\"",
        incremental: "rsync -av /path/to/db.sqlite /backups/sqlite_incr_$(date +\\%Y\\%m\\%d).db",
        transaction: "cp /path/to/db.sqlite /backups/sqlite_wal_$(date +\\%Y\\%m\\%d_\\%H).db",
        archive: "sqlite3 /path/to/db.sqlite \".backup '/backups/sqlite_archive_$(date +\\%Y\\%m).db'\" && gzip /backups/sqlite_archive_*.db",
      },
    }
    return commands[type]?.[backupType] || "command not available"
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="size-5" />
            CRON for Database Backups
          </CardTitle>
          <CardDescription>
            Templates and schedules for automated database backup operations
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Database Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Database Type</CardTitle>
          <CardDescription>Choose your database to see relevant backup commands</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-4 gap-3">
            {[
              { value: "mysql", label: "MySQL", icon: Database },
              { value: "postgresql", label: "PostgreSQL", icon: Server },
              { value: "mongodb", label: "MongoDB", icon: HardDrive },
              { value: "sqlite", label: "SQLite", icon: Shield },
            ].map((db) => {
              const Icon = db.icon
              return (
                <Button
                  key={db.value}
                  variant={dbType === db.value ? "default" : "outline"}
                  className="flex items-center gap-2"
                  onClick={() => setDbType(db.value as typeof dbType)}
                >
                  <Icon className="size-4" />
                  {db.label}
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Backup Templates</TabsTrigger>
          <TabsTrigger value="custom">Custom Schedule</TabsTrigger>
          <TabsTrigger value="scripts">Backup Scripts</TabsTrigger>
        </TabsList>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {backupTemplates.map((template) => {
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

        {/* Custom Schedule Tab */}
        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Backup Schedule</CardTitle>
              <CardDescription>Configure off-peak backup times for your environment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="backup-hour">Backup Hour (0-23)</Label>
                  <Select value={backupHour} onValueChange={setBackupHour}>
                    <SelectTrigger id="backup-hour">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Recommended: 1-5 AM (off-peak)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backup-minute">Minute (0-59)</Label>
                  <Select value={backupMinute} onValueChange={setBackupMinute}>
                    <SelectTrigger id="backup-minute">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["0", "15", "30", "45"].map((m) => (
                        <SelectItem key={m} value={m}>
                          :{m.padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              </div>

              <div className="rounded-lg border bg-muted/30 p-4">
                <Label>Generated CRON Expression</Label>
                <div className="flex items-center gap-2 mt-2">
                  <code className="flex-1 font-mono text-lg p-3 rounded-lg bg-background border">
                    {generateCustomCron}
                  </code>
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(generateCustomCron, "custom")}
                  >
                    {copied === "custom" ? <Check className="size-4" /> : <Copy className="size-4" />}
                  </Button>
                </div>
              </div>

              <div className="p-4 rounded-lg border bg-blue-50 dark:bg-blue-950/20">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Off-Peak Hours Recommendation</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Schedule backups during low-traffic periods (typically 1-5 AM) to minimize impact on database performance.
                  Avoid backup windows during peak business hours, batch processing, or other maintenance tasks.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scripts Tab */}
        <TabsContent value="scripts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Backup Script Templates</CardTitle>
              <CardDescription>Ready-to-use backup scripts for {dbType}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Full Backup Script",
                  cron: "0 2 * * *",
                  script: `#!/bin/bash
# ${dbType} Full Backup Script
# Schedule: Daily at 2:00 AM

BACKUP_DIR="/backups/${dbType}"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=${retentionDays}

# Create backup directory if not exists
mkdir -p $BACKUP_DIR

# Perform backup
${getBackupCommand(dbType, "full")}

# Remove old backups
find $BACKUP_DIR -name "*.sql*" -mtime +$RETENTION_DAYS -delete
find $BACKUP_DIR -name "*.gz" -mtime +$RETENTION_DAYS -delete

echo "Backup completed: $DATE"`,
                },
                {
                  name: "Incremental Backup Script",
                  cron: "0 3 * * *",
                  script: `#!/bin/bash
# ${dbType} Incremental Backup Script
# Schedule: Daily at 3:00 AM

BACKUP_DIR="/backups/${dbType}/incremental"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=${retentionDays}

mkdir -p $BACKUP_DIR

# Perform incremental backup
${getBackupCommand(dbType, "incremental")}

# Cleanup old incrementals
find $BACKUP_DIR -type f -mtime +$RETENTION_DAYS -delete

echo "Incremental backup completed: $DATE"`,
                },
                {
                  name: "Weekly Full + Daily Incremental",
                  cron: "0 1 * * 0 (weekly), 0 3 * * * (daily)",
                  script: `#!/bin/bash
# ${dbType} Combined Backup Strategy
# Weekly Full: Sunday 1:00 AM
# Daily Incremental: Every day 3:00 AM

BACKUP_DIR="/backups/${dbType}"
DATE=$(date +%Y%m%d)
DAY_OF_WEEK=$(date +%u)

mkdir -p $BACKUP_DIR/{full,incremental}

if [ $DAY_OF_WEEK -eq 7 ]; then
  # Sunday - Full backup
  ${getBackupCommand(dbType, "full")}
  echo "Weekly full backup completed"
else
  # Other days - Incremental
  ${getBackupCommand(dbType, "incremental")}
  echo "Daily incremental backup completed"
fi

# Monthly cleanup
find $BACKUP_DIR -type f -mtime +30 -delete`,
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
      </Tabs>

      {/* Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle>Database Backup Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-green-700 dark:text-green-300">Recommended Practices</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="size-4 mt-0.5 text-green-500" />
                  <span>Schedule during off-peak hours (1-5 AM)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="size-4 mt-0.5 text-green-500" />
                  <span>Use incremental backups for large databases</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="size-4 mt-0.5 text-green-500" />
                  <span>Store backups in multiple locations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="size-4 mt-0.5 text-green-500" />
                  <span>Test restore procedures regularly</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="size-4 mt-0.5 text-green-500" />
                  <span>Encrypt sensitive backup data</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-amber-700 dark:text-amber-300">Important Considerations</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Shield className="size-4 mt-0.5 text-amber-500" />
                  <span>Monitor backup success/failure</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="size-4 mt-0.5 text-amber-500" />
                  <span>Set up alerts for failed backups</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="size-4 mt-0.5 text-amber-500" />
                  <span>Document recovery procedures</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="size-4 mt-0.5 text-amber-500" />
                  <span>Comply with data retention policies</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="size-4 mt-0.5 text-amber-500" />
                  <span>Consider replication for HA systems</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function getBackupCommand(type: string, backupType: string): string {
  const commands: { [key: string]: { [key: string]: string } } = {
    mysql: {
      full: "mysqldump --all-databases > backup.sql",
      incremental: "mysqldump --single-transaction > backup.sql",
      transaction: "mysqlbinlog --raw binlog.* > binlog_backup",
      archive: "mysqldump --all-databases | gzip > backup.sql.gz",
    },
    postgresql: {
      full: "pg_dumpall > backup.sql",
      incremental: "pg_basebackup -D backup_dir",
      transaction: "pg_archivecleanup",
      archive: "pg_dumpall | gzip > backup.sql.gz",
    },
    mongodb: {
      full: "mongodump --out backup_dir",
      incremental: "mongodump --oplog",
      transaction: "mongodump --oplog",
      archive: "mongodump --archive=backup.gz --gzip",
    },
    sqlite: {
      full: "sqlite3 db.sqlite .backup backup.db",
      incremental: "rsync db.sqlite backup.db",
      transaction: "cp db.sqlite backup.db",
      archive: "sqlite3 db.sqlite .backup backup.db && gzip backup.db",
    },
  }
  return commands[type]?.[backupType] || "command not available"
}
