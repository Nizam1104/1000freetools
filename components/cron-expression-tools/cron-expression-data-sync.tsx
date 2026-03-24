"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Database, RefreshCw, ArrowRightLeft, Server } from "lucide-react"
import { cn } from "@/lib/utils"

function getEtlScript(source: string, target: string, batch: string): string {
  return `#!/bin/bash
# ETL Pipeline
SOURCE="${source}"
TARGET="${target}"
BATCH_SIZE=${batch}

# Extract, Transform, Load
psql -d $SOURCE -c "COPY data TO STDOUT" | psql -d $TARGET -c "COPY staging FROM STDIN"`
}

function getSyncScript(source: string, target: string, frequency: string): string {
  return `#!/bin/bash
# Data Sync (${frequency})
SOURCE="${source}"
TARGET="${target}"

psql -d $SOURCE -c "COPY updated_data TO STDOUT" | psql -d $TARGET -c "COPY staging FROM STDIN ON CONFLICT DO UPDATE"`
}

function getIncrementalScript(source: string, target: string, batch: string): string {
  return `#!/bin/bash
# Incremental Load
SOURCE="${source}"
TARGET="${target}"
BATCH_SIZE=${batch}

last_sync=$(psql -d $TARGET -t -c "SELECT MAX(updated_at) FROM sync_log")
psql -d $SOURCE -c "COPY (SELECT * FROM data WHERE updated_at > '$last_sync' LIMIT $BATCH) TO STDOUT" | \\
  psql -d $TARGET -c "COPY staging FROM STDIN"`
}

function getFullLoadScript(source: string, target: string): string {
  return `#!/bin/bash
# Full Data Load
SOURCE="${source}"
TARGET="${target}"

psql -d $TARGET -c "TRUNCATE data CASCADE"
psql -d $SOURCE -c "COPY data TO STDOUT" | psql -d $TARGET -c "COPY data FROM STDIN"`
}

function getCdcScript(source: string, target: string): string {
  return `#!/bin/bash
# CDC Processing
SOURCE="${source}"
TARGET="${target}"

psql -d $SOURCE -c "SELECT * FROM pg_logical_slot_get_changes('cdc_slot', NULL, NULL)" | \\
  python3 /opt/etl/cdc_processor.py --target $TARGET`
}

function getDataQualityScript(target: string): string {
  return `#!/bin/bash
# Data Quality Check
TARGET="${target}"

# Row count validation
expected=$(psql -d source -t -c "SELECT COUNT(*) FROM data")
actual=$(psql -d $TARGET -t -c "SELECT COUNT(*) FROM data")
[ "$expected" != "$actual" ] && exit 1

# Null check
nulls=$(psql -d $TARGET -t -c "SELECT COUNT(*) FROM data WHERE critical_col IS NULL")
[ "$nulls" -gt 0 ] && exit 1`
}

function getPartitionScript(target: string): string {
  return `#!/bin/bash
# Partition Maintenance
TARGET="\${target}"

# Create next month's partition
next_month=\$(date -d "next month" +%Y%m)
psql -d \$TARGET -c "CREATE TABLE IF NOT EXISTS data_\\\${next_month} PARTITION OF data FOR VALUES FROM ('\\\${next_month}-01') TO ('\\\${next_month}-01' + INTERVAL '1 month')"

# Drop old partitions
old_month=\$(date -d "12 months ago" +%Y%m)
psql -d \$TARGET -c "DROP TABLE IF EXISTS data_\\\${old_month}"`
}

function getArchiveScript(target: string): string {
  return `#!/bin/bash
# Archive Old Data
TARGET="${target}"

# Move old data to archive
psql -d $TARGET -c \\
  "INSERT INTO archive.data SELECT * FROM data WHERE created_at < NOW() - INTERVAL '1 year'"
psql -d $TARGET -c "DELETE FROM data WHERE created_at < NOW() - INTERVAL '1 year'"`
}

export default function CronExpressionDataSync() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [sourceDb, setSourceDb] = useState("production_db")
  const [targetDb, setTargetDb] = useState("warehouse_db")
  const [batchSize, setBatchSize] = useState("1000")
  const [copied, setCopied] = useState<string | null>(null)

  const syncTemplates = useMemo(() => [
    {
      id: "nightly_etl",
      name: "Nightly ETL Job",
      icon: Database,
      description: "Full ETL process nightly",
      cron: "0 1 * * *",
      schedule: "Daily at 1:00 AM",
      useCase: "Data warehouse nightly updates",
      script: getEtlScript(sourceDb, targetDb, batchSize),
    },
    {
      id: "hourly_sync",
      name: "Hourly Data Sync",
      icon: RefreshCw,
      description: "Incremental sync every hour",
      cron: "0 * * * *",
      schedule: "Every hour on the hour",
      useCase: "Near real-time data synchronization",
      script: getSyncScript(sourceDb, targetDb, "hourly"),
    },
    {
      id: "incremental_load",
      name: "Incremental Load",
      icon: ArrowRightLeft,
      description: "Incremental data load",
      cron: "*/30 * * * *",
      schedule: "Every 30 minutes",
      useCase: "Frequent incremental updates",
      script: getIncrementalScript(sourceDb, targetDb, batchSize),
    },
    {
      id: "weekly_full",
      name: "Weekly Full Load",
      icon: Database,
      description: "Complete data reload weekly",
      cron: "0 2 * * 0",
      schedule: "Every Sunday at 2:00 AM",
      useCase: "Weekly full data refresh",
      script: getFullLoadScript(sourceDb, targetDb),
    },
    {
      id: "bi_daily_sync",
      name: "Twice Daily Sync",
      icon: RefreshCw,
      description: "Sync morning and evening",
      cron: "0 6,22 * * *",
      schedule: "6:00 AM and 10:00 PM daily",
      useCase: "Morning and evening data updates",
      script: getSyncScript(sourceDb, targetDb, "bi-daily"),
    },
    {
      id: "business_hours_sync",
      name: "Business Hours Sync",
      icon: RefreshCw,
      description: "Sync during business hours",
      cron: "0 */2 9-17 * * 1-5",
      schedule: "Every 2 hours, 9 AM - 5 PM, weekdays",
      useCase: "Business hours data freshness",
      script: getSyncScript(sourceDb, targetDb, "business"),
    },
    {
      id: "cdc_processor",
      name: "CDC Processor",
      icon: ArrowRightLeft,
      description: "Change data capture processing",
      cron: "*/5 * * * *",
      schedule: "Every 5 minutes",
      useCase: "Real-time change data capture",
      script: getCdcScript(sourceDb, targetDb),
    },
    {
      id: "data_quality",
      name: "Data Quality Check",
      icon: Server,
      description: "Validate data quality after sync",
      cron: "0 3 * * *",
      schedule: "Daily at 3:00 AM (after ETL)",
      useCase: "Post-ETL data validation",
      script: getDataQualityScript(targetDb),
    },
    {
      id: "partition_maintenance",
      name: "Partition Maintenance",
      icon: Database,
      description: "Manage table partitions",
      cron: "0 4 1 * *",
      schedule: "1st of every month at 4:00 AM",
      useCase: "Monthly partition management",
      script: getPartitionScript(targetDb),
    },
    {
      id: "archive_old_data",
      name: "Archive Old Data",
      icon: Database,
      description: "Archive historical data",
      cron: "0 5 * * 0",
      schedule: "Every Sunday at 5:00 AM",
      useCase: "Data archival and cleanup",
      script: getArchiveScript(targetDb),
    },
  ], [sourceDb, targetDb, batchSize])

  const applyTemplate = useCallback((template: typeof syncTemplates[0]) => {
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
            <RefreshCw className="size-5" />
            CRON for Data Sync & ETL Jobs
          </CardTitle>
          <CardDescription>
            Templates for data synchronization, ETL pipelines, and data warehouse updates
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Data Pipeline Configuration</CardTitle>
          <CardDescription>Customize the sync parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="source-db">Source Database</Label>
              <Input
                id="source-db"
                value={sourceDb}
                onChange={(e) => setSourceDb(e.target.value)}
                placeholder="production_db"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target-db">Target Database</Label>
              <Input
                id="target-db"
                value={targetDb}
                onChange={(e) => setTargetDb(e.target.value)}
                placeholder="warehouse_db"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="batch-size">Batch Size</Label>
              <Input
                id="batch-size"
                value={batchSize}
                onChange={(e) => setBatchSize(e.target.value)}
                placeholder="1000"
                type="number"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Sync Templates</TabsTrigger>
          <TabsTrigger value="scripts">ETL Scripts</TabsTrigger>
          <TabsTrigger value="pipelines">Pipeline Examples</TabsTrigger>
        </TabsList>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {syncTemplates.map((template) => {
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
              <CardTitle>ETL & Data Sync Scripts</CardTitle>
              <CardDescription>Ready-to-use scripts for data pipelines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Full ETL Pipeline",
                  cron: "0 1 * * *",
                  script: `#!/bin/bash
# Nightly ETL Pipeline
# Schedule: Daily at 1:00 AM

SOURCE_DB="${sourceDb}"
TARGET_DB="${targetDb}"
BATCH_SIZE=${batchSize}
LOG_FILE="/var/log/etl/pipeline_$(date +%Y%m%d).log"

mkdir -p /var/log/etl

echo "Starting ETL pipeline: $(date)" >> $LOG_FILE

# Step 1: Extract
echo "Extracting data from $SOURCE_DB..." >> $LOG_FILE
psql -h source_host -U etl_user -d $SOURCE_DB \\
  -c "COPY (SELECT * FROM transactions WHERE date = CURRENT_DATE - 1) TO STDOUT" \\
  | gzip > /tmp/etl_extract_$(date +%Y%m%d).gz

# Step 2: Transform
echo "Transforming data..." >> $LOG_FILE
# Add transformation logic here

# Step 3: Load
echo "Loading data into $TARGET_DB..." >> $LOG_FILE
psql -h warehouse_host -U etl_user -d $TARGET_DB \\
  -c "\\COPY staging.transactions FROM STDIN" < /tmp/etl_extract_*.gz

# Step 4: Validate
echo "Validating data..." >> $LOG_FILE
row_count=$(psql -h warehouse_host -U etl_user -d $TARGET_DB -t -c \\
  "SELECT COUNT(*) FROM staging.transactions WHERE date = CURRENT_DATE - 1")

echo "Loaded $row_count rows" >> $LOG_FILE
echo "ETL pipeline completed: $(date)" >> $LOG_FILE`,
                },
                {
                  name: "Incremental Sync",
                  cron: "*/30 * * * *",
                  script: `#!/bin/bash
# Incremental Data Sync
# Schedule: Every 30 minutes

SOURCE_DB="${sourceDb}"
TARGET_DB="${targetDb}"
BATCH_SIZE=${batchSize}

# Get last sync timestamp
last_sync=$(psql -d $TARGET_DB -t -c "SELECT COALESCE(MAX(updated_at), '1970-01-01') FROM sync_log")

# Sync new/updated records
psql -h source_host -U etl_user -d $SOURCE_DB -c \\
  "COPY (SELECT * FROM transactions WHERE updated_at > '$last_sync' LIMIT $BATCH_SIZE) TO STDOUT" \\
  | psql -h warehouse_host -U etl_user -d $TARGET_DB -c \\
  "COPY staging.transactions FROM STDIN ON CONFLICT (id) DO UPDATE SET ..."

# Update sync log
psql -d $TARGET_DB -c "INSERT INTO sync_log VALUES (NOW())"

echo "Incremental sync completed"`,
                },
                {
                  name: "CDC Processor",
                  cron: "*/5 * * * *",
                  script: `#!/bin/bash
# Change Data Capture Processor
# Schedule: Every 5 minutes

SOURCE_DB="${sourceDb}"
TARGET_DB="${targetDb}"

# Process CDC events from replication slot
psql -h source_host -U replication_user -d $SOURCE_DB -c \\
  "SELECT * FROM pg_logical_slot_get_changes('cdc_slot', NULL, NULL)" | \\
while read line; do
  # Parse and apply changes
  echo "$line" | python3 /opt/etl/cdc_processor.py --target $TARGET_DB
done

echo "CDC processing completed"`,
                },
                {
                  name: "Data Quality Check",
                  cron: "0 3 * * *",
                  script: `#!/bin/bash
# Data Quality Validation
# Schedule: Daily at 3:00 AM (after ETL)

TARGET_DB="${targetDb}"
ALERT_EMAIL="data-team@example.com"

# Check row counts
expected=$(psql -d $SOURCE_DB -t -c "SELECT COUNT(*) FROM transactions WHERE date = CURRENT_DATE - 1")
actual=$(psql -d $TARGET_DB -t -c "SELECT COUNT(*) FROM transactions WHERE date = CURRENT_DATE - 1")

if [ "$expected" != "$actual" ]; then
  echo "Data mismatch: Expected $expected, Got $actual"
  echo "Data quality alert: Mismatch in transaction counts" | \\
    mail -s "DQ Alert: Row Count Mismatch" $ALERT_EMAIL
  exit 1
fi

# Check for nulls in critical columns
null_count=$(psql -d $TARGET_DB -t -c \\
  "SELECT COUNT(*) FROM transactions WHERE amount IS NULL OR user_id IS NULL")

if [ "$null_count" -gt 0 ]; then
  echo "Found $null_count records with null values"
  exit 1
fi

echo "Data quality check passed"`,
                },
                {
                  name: "Partition Maintenance",
                  cron: "0 4 1 * *",
                  script: `#!/bin/bash
# Monthly Partition Maintenance
# Schedule: 1st of every month at 4:00 AM

TARGET_DB="\${targetDb}"
RETENTION_MONTHS=12

# Create new partition for next month
next_month=\$(date -d "next month" +%Y%m)
psql -d \$TARGET_DB -c \\
  "CREATE TABLE IF NOT EXISTS transactions_\\\${next_month} \\
   PARTITION OF transactions FOR VALUES FROM ('\\\${next_month}-01') TO ('\\\${next_month}-01' + INTERVAL '1 month')"

# Drop old partitions
old_month=\$(date -d "\\\${RETENTION_MONTHS} months ago" +%Y%m)
psql -d \$TARGET_DB -c "DROP TABLE IF EXISTS transactions_\\\${old_month}"

echo "Partition maintenance completed"`,
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

        {/* Pipelines Tab */}
        <TabsContent value="pipelines" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Pipeline Patterns</CardTitle>
              <CardDescription>Common ETL and data sync patterns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    pattern: "Lambda Architecture",
                    description: "Combine batch and stream processing",
                    cron: [
                      { expr: "*/5 * * * *", desc: "Stream processing" },
                      { expr: "0 1 * * *", desc: "Batch correction" },
                    ],
                  },
                  {
                    pattern: "Medallion Architecture",
                    description: "Bronze → Silver → Gold layers",
                    cron: [
                      { expr: "*/15 * * * *", desc: "Bronze ingestion" },
                      { expr: "0 */2 * * *", desc: "Silver transformation" },
                      { expr: "0 6 * * *", desc: "Gold aggregation" },
                    ],
                  },
                  {
                    pattern: "Change Data Capture",
                    description: "Real-time change replication",
                    cron: [
                      { expr: "*/5 * * * *", desc: "CDC processing" },
                      { expr: "0 */6 * * *", desc: "Reconciliation" },
                    ],
                  },
                  {
                    pattern: "Batch ETL",
                    description: "Traditional nightly batch",
                    cron: [
                      { expr: "0 1 * * *", desc: "Extract" },
                      { expr: "0 2 * * *", desc: "Transform" },
                      { expr: "0 3 * * *", desc: "Load & Validate" },
                    ],
                  },
                ].map((pipeline, idx) => (
                  <div key={idx} className="p-4 rounded-lg border">
                    <h4 className="font-medium mb-2">{pipeline.pattern}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{pipeline.description}</p>
                    <div className="space-y-2">
                      {pipeline.cron.map((c, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <code className="bg-muted px-2 py-1 rounded">{c.expr}</code>
                          <span className="text-muted-foreground">{c.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>ETL Best Practices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border bg-green-50 dark:bg-green-950/20">
                      <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Recommendations</h4>
                      <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                        <li>• Schedule ETL during off-peak hours</li>
                        <li>• Implement idempotent operations</li>
                        <li>• Add data quality validations</li>
                        <li>• Log all pipeline activities</li>
                        <li>• Set up alerting for failures</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg border bg-amber-50 dark:bg-amber-950/20">
                      <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Important Considerations</h4>
                      <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                        <li>• Handle schema changes gracefully</li>
                        <li>• Implement retry mechanisms</li>
                        <li>• Monitor data freshness</li>
                        <li>• Plan for data backfills</li>
                        <li>• Document data lineage</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
