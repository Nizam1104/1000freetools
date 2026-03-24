"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Activity, AlertTriangle, Eye, Server } from "lucide-react"
import { cn } from "@/lib/utils"

function getMonitoringScript(interval: string, endpoint: string, email: string): string {
  return String.raw`#!/bin/bash
# Health Check (every \${interval}s)
ENDPOINT="${endpoint}"
curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$ENDPOINT" | grep -q "200" || \\
  echo "Alert: $ENDPOINT is down" | mail -s "Service Alert" \${email}`
}

function getDiskCheckScript(): string {
  return `#!/bin/bash
THRESHOLD=85
df -h | awk 'NR>1 && int($5) >= '$THRESHOLD' {print "Disk alert: " $6 " is " $5 " full"}'`
}

function getMemoryCheckScript(): string {
  return String.raw`#!/bin/bash
THRESHOLD=90
usage=$(free | awk '/Mem:/ {printf("%.0f", $3/$2*100)}')
[ "$usage" -ge "$THRESHOLD" ] && echo "Memory alert: \${usage}% used"`
}

function getCpuCheckScript(): string {
  return `#!/bin/bash
THRESHOLD=80
load=$(uptime | awk -F'load average:' '{print $2}' | cut -d',' -f1 | tr -d ' ')
echo "CPU Load: $load"`
}

function getServiceCheckScript(service: string): string {
  return String.raw`#!/bin/bash
systemctl is-active --quiet \${service} || echo "Service alert: \${service} is down"`
}

function getDatabaseCheckScript(): string {
  return `#!/bin/bash
mysqladmin ping -h localhost --silent || echo "Database alert: MySQL is down"`
}

function getSslCheckScript(domain: string): string {
  return `#!/bin/bash
DOMAIN="${domain}"
expiry=$(echo | openssl s_client -servername $DOMAIN -connect $DOMAIN:443 2>/dev/null | openssl x509 -noout -enddate)
days_left=$(( ($(date -d "$(echo $expiry | cut -d= -f2)" +%s) - $(date +%s)) / 86400 ))
[ $days_left -lt 30 ] && echo "SSL alert: Certificate expires in $days_left days"`
}

function getLogErrorCheckScript(): string {
  return `#!/bin/bash
LOG_FILE="/var/log/app/error.log"
errors=$(grep -c "ERROR\\|CRITICAL" $LOG_FILE 2>/dev/null || echo 0)
[ "$errors" -gt 10 ] && echo "Error spike: $errors errors found"`
}

export default function CronExpressionMonitoring() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [checkEndpoint, setCheckEndpoint] = useState("https://api.example.com/health")
  const [alertEmail, setAlertEmail] = useState("ops@example.com")
  const [alertWebhook, setAlertWebhook] = useState("https://hooks.slack.com/services/xxx")
  const [copied, setCopied] = useState<string | null>(null)

  const monitoringTemplates = useMemo(() => [
    {
      id: "every_minute",
      name: "Every Minute Check",
      icon: Activity,
      description: "Monitor every minute",
      cron: "* * * * *",
      schedule: "Every minute",
      useCase: "Critical services, high-availability monitoring",
      script: getMonitoringScript("60", checkEndpoint, alertEmail),
    },
    {
      id: "every_5min",
      name: "5-Minute Check",
      icon: Activity,
      description: "Monitor every 5 minutes",
      cron: "*/5 * * * *",
      schedule: "Every 5 minutes",
      useCase: "Standard production monitoring",
      script: getMonitoringScript("300", checkEndpoint, alertEmail),
    },
    {
      id: "every_10min",
      name: "10-Minute Check",
      icon: Eye,
      description: "Monitor every 10 minutes",
      cron: "*/10 * * * *",
      schedule: "Every 10 minutes",
      useCase: "Non-critical services, cost-effective",
      script: getMonitoringScript("600", checkEndpoint, alertEmail),
    },
    {
      id: "business_hours",
      name: "Business Hours Monitoring",
      icon: Activity,
      description: "Monitor during business hours only",
      cron: "*/5 9-17 * * 1-5",
      schedule: "Every 5 min, 9 AM - 5 PM, weekdays",
      useCase: "Business-hour SLA monitoring",
      script: getMonitoringScript("300", checkEndpoint, alertEmail),
    },
    {
      id: "disk_check",
      name: "Disk Space Check",
      icon: Server,
      description: "Monitor disk usage",
      cron: "*/15 * * * *",
      schedule: "Every 15 minutes",
      useCase: "Disk space monitoring and alerts",
      script: getDiskCheckScript(),
    },
    {
      id: "memory_check",
      name: "Memory Usage Check",
      icon: Server,
      description: "Monitor memory usage",
      cron: "*/10 * * * *",
      schedule: "Every 10 minutes",
      useCase: "Memory leak detection",
      script: getMemoryCheckScript(),
    },
    {
      id: "cpu_check",
      name: "CPU Load Check",
      icon: Server,
      description: "Monitor CPU load",
      cron: "*/5 * * * *",
      schedule: "Every 5 minutes",
      useCase: "CPU overload detection",
      script: getCpuCheckScript(),
    },
    {
      id: "service_check",
      name: "Service Status Check",
      icon: Activity,
      description: "Monitor service status",
      cron: "*/2 * * * *",
      schedule: "Every 2 minutes",
      useCase: "Critical service monitoring",
      script: getServiceCheckScript("nginx"),
    },
    {
      id: "database_check",
      name: "Database Health Check",
      icon: Server,
      description: "Monitor database connectivity",
      cron: "*/5 * * * *",
      schedule: "Every 5 minutes",
      useCase: "Database availability monitoring",
      script: getDatabaseCheckScript(),
    },
    {
      id: "ssl_expiry",
      name: "SSL Expiry Check",
      icon: AlertTriangle,
      description: "Monitor SSL certificate expiry",
      cron: "0 9 * * *",
      schedule: "Daily at 9:00 AM",
      useCase: "Certificate expiry monitoring",
      script: getSslCheckScript(checkEndpoint.replace("https://", "").split("/")[0]),
    },
    {
      id: "log_error_check",
      name: "Log Error Check",
      icon: AlertTriangle,
      description: "Monitor logs for errors",
      cron: "*/10 * * * *",
      schedule: "Every 10 minutes",
      useCase: "Error pattern detection",
      script: getLogErrorCheckScript(),
    },
    {
      id: "off_peak_batch",
      name: "Off-Peak Batch Check",
      icon: Eye,
      description: "Monitoring during off-peak hours",
      cron: "0 */2 0-6 * * *",
      schedule: "Every 2 hours, midnight to 6 AM",
      useCase: "Off-peak batch job monitoring",
      script: getMonitoringScript("7200", checkEndpoint, alertEmail),
    },
  ], [checkEndpoint, alertEmail])

  const applyTemplate = useCallback((template: typeof monitoringTemplates[0]) => {
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
            <Activity className="size-5" />
            CRON for Monitoring & Alerts
          </CardTitle>
          <CardDescription>
            Templates for system monitoring, health checks, and alerting
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Monitoring Configuration</CardTitle>
          <CardDescription>Customize the monitoring parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="endpoint">Health Check Endpoint</Label>
              <Input
                id="endpoint"
                value={checkEndpoint}
                onChange={(e) => setCheckEndpoint(e.target.value)}
                placeholder="https://api.example.com/health"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Alert Email</Label>
              <Input
                id="email"
                value={alertEmail}
                onChange={(e) => setAlertEmail(e.target.value)}
                placeholder="ops@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhook">Alert Webhook (Slack/PagerDuty)</Label>
              <Input
                id="webhook"
                value={alertWebhook}
                onChange={(e) => setAlertWebhook(e.target.value)}
                placeholder="https://hooks.slack.com/..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Monitoring Templates</TabsTrigger>
          <TabsTrigger value="scripts">Monitoring Scripts</TabsTrigger>
          <TabsTrigger value="alerting">Alerting Setup</TabsTrigger>
        </TabsList>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {monitoringTemplates.map((template) => {
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
              <CardTitle>Monitoring Scripts</CardTitle>
              <CardDescription>Ready-to-use scripts for system monitoring</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "HTTP Health Check",
                  cron: "*/5 * * * *",
                  script: String.raw`#!/bin/bash
# HTTP Health Check Script
# Schedule: Every 5 minutes

ENDPOINT="${checkEndpoint}"
ALERT_EMAIL="${alertEmail}"
TIMEOUT=10

start_time=$(date +%s%3N)
http_code=$(curl -s -o /dev/null -w "%{http_code}" --max-time $TIMEOUT "$ENDPOINT")
end_time=$(date +%s%3N)
latency=$((end_time - start_time))

if [ "$http_code" -eq 200 ]; then
  echo "OK: Endpoint healthy (latency: \${latency}ms)"
  exit 0
else
  echo "CRITICAL: Endpoint returned HTTP $http_code"
  echo "Health check failed for $ENDPOINT (HTTP $http_code)" | \\
    mail -s "ALERT: Service Down" $ALERT_EMAIL
  exit 2
fi`,
                },
                {
                  name: "Disk Space Monitor",
                  cron: "*/15 * * * *",
                  script: String.raw`#!/bin/bash
# Disk Space Monitor
# Schedule: Every 15 minutes

THRESHOLD=85
ALERT_EMAIL="${alertEmail}"

df -h | awk 'NR>1 {print $5, $6}' | while read usage mount; do
  usage_num=\${usage%\%}
  if [ "$usage_num" -ge "$THRESHOLD" ]; then
    echo "WARNING: $mount is \${usage} full"
    echo "Disk alert: $mount is \${usage} full on $(hostname)" | \\
      mail -s "Disk Space Alert" $ALERT_EMAIL
  fi
done`,
                },
                {
                  name: "Memory Usage Monitor",
                  cron: "*/10 * * * *",
                  script: String.raw`#!/bin/bash
# Memory Usage Monitor
# Schedule: Every 10 minutes

THRESHOLD=90
ALERT_EMAIL="${alertEmail}"

# Get memory usage percentage
usage=$(free | awk '/Mem:/ {printf("%.0f", $3/$2*100)}')

if [ "$usage" -ge "$THRESHOLD" ]; then
  echo "WARNING: Memory usage at \${usage}%"
  free -h
  echo "Memory alert: \${usage}% used on $(hostname)" | \\
    mail -s "Memory Alert" $ALERT_EMAIL
fi`,
                },
                {
                  name: "Service Status Check",
                  cron: "*/2 * * * *",
                  script: String.raw`#!/bin/bash
# Service Status Check
# Schedule: Every 2 minutes

SERVICES=("nginx" "mysql" "redis")
ALERT_EMAIL="${alertEmail}"

for service in "\${SERVICES[@]}"; do
  if ! systemctl is-active --quiet $service; then
    echo "CRITICAL: $service is not running"
    echo "Service alert: $service is down on $(hostname)" | \\
      mail -s "Service Down: $service" $ALERT_EMAIL

    # Attempt to restart
    systemctl start $service
  fi
done`,
                },
                {
                  name: "Database Connection Check",
                  cron: "*/5 * * * *",
                  script: String.raw`#!/bin/bash
# Database Connection Check
# Schedule: Every 5 minutes

ALERT_EMAIL="${alertEmail}"

# MySQL check
if ! mysqladmin ping -h localhost --silent; then
  echo "CRITICAL: MySQL is not responding"
  echo "Database alert: MySQL is down on $(hostname)" | \\
    mail -s "Database Down: MySQL" $ALERT_EMAIL
fi

# PostgreSQL check
# if ! pg_isready -h localhost; then
#   echo "CRITICAL: PostgreSQL is not responding"
# fi`,
                },
                {
                  name: "Log Error Monitor",
                  cron: "*/10 * * * *",
                  script: String.raw`#!/bin/bash
# Log Error Monitor
# Schedule: Every 10 minutes

LOG_FILE="/var/log/application/error.log"
ALERT_EMAIL="${alertEmail}"
CHECK_INTERVAL=600  # 10 minutes in seconds

if [ -f "$LOG_FILE" ]; then
  # Count errors in last interval
  error_count=$(find $LOG_FILE -mmin -10 -exec grep -c "ERROR\\|CRITICAL\\|FATAL" {} \\;)

  if [ "$error_count" -gt 10 ]; then
    echo "WARNING: $error_count errors in last 10 minutes"
    tail -20 $LOG_FILE | mail -s "Error Spike Alert: $error_count errors" $ALERT_EMAIL
  fi
fi`,
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

        {/* Alerting Tab */}
        <TabsContent value="alerting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alerting Integration</CardTitle>
              <CardDescription>Set up alerts for monitoring failures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Email Alert Function",
                  code: String.raw`#!/bin/bash
# Email Alert Function
send_alert() {
  local subject="$1"
  local message="$2"
  local priority="$3"  # normal, high, critical

  case $priority in
    critical)
      echo "$message" | mail -s "[CRITICAL] $subject" \${alertEmail}
      ;;
    high)
      echo "$message" | mail -s "[HIGH] $subject" \${alertEmail}
      ;;
    *)
      echo "$message" | mail -s "$subject" \${alertEmail}
      ;;
  esac
}

# Usage:
# send_alert "Service Down" "Web server is not responding" "critical"`,
                },
                {
                  name: "Slack Webhook Alert",
                  code: String.raw`#!/bin/bash
# Slack Webhook Alert
SLACK_WEBHOOK="${alertWebhook}"

send_slack_alert() {
  local title="$1"
  local message="$2"
  local color="$3"  # good, warning, danger

  curl -X POST -H 'Content-type: application/json' \\
    --data "{
      \\"attachments\\": [{
        \\"color\\": \\"$color\\",
        \\"title\\": \\"$title\\",
        \\"text\\": \\"$message\\",
        \\"ts\\": $(date +%s)
      }]
    }" \\
    "$SLACK_WEBHOOK"
}

# Usage:
# send_slack_alert "Service Down" "API is not responding" "danger"`,
                },
                {
                  name: "PagerDuty Alert",
                  code: String.raw`#!/bin/bash
# PagerDuty Alert
PAGERDUTY_KEY="your-pagerduty-routing-key"

send_pagerduty() {
  local summary="$1"
  local severity="$2"  # critical, error, warning, info

  curl -X POST https://events.pagerduty.com/v2/enqueue \\
    -H 'Content-Type: application/json' \\
    -d "{
      \\"routing_key\\": \\"$PAGERDUTY_KEY\\",
      \\"event_action\\": \\"trigger\\",
      \\"payload\\": {
        \\"summary\\": \\"$summary\\",
        \\"severity\\": \\"$severity\\",
        \\"source\\": \\"$(hostname)\\",
        \\"timestamp\\": \\"$(date -Iseconds)\\"
      }
    }"
}

# Usage:
# send_pagerduty "Database connection failed" "critical"`,
                },
              ].map((alert, idx) => (
                <div key={idx} className="p-4 rounded-lg border bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{alert.name}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(alert.code, `alert-${idx}`)}
                    >
                      {copied === `alert-${idx}` ? (
                        <Check className="size-3 mr-1" />
                      ) : (
                        <Copy className="size-3 mr-1" />
                      )}
                      Copy
                    </Button>
                  </div>
                  <pre className="text-xs font-mono bg-background p-3 rounded overflow-x-auto whitespace-pre-wrap">
                    {alert.code}
                  </pre>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monitoring Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border bg-green-50 dark:bg-green-950/20">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Recommendations</h4>
                  <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                    <li>• Use appropriate intervals based on criticality</li>
                    <li>• Implement alert deduplication</li>
                    <li>• Set up escalation policies</li>
                    <li>• Monitor the monitoring system itself</li>
                    <li>• Document runbooks for common alerts</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg border bg-amber-50 dark:bg-amber-950/20">
                  <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Alert Fatigue Prevention</h4>
                  <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                    <li>• Set meaningful thresholds</li>
                    <li>• Use alert aggregation</li>
                    <li>• Implement maintenance windows</li>
                    <li>• Regular alert review and tuning</li>
                    <li>• Distinguish between warnings and critical</li>
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
