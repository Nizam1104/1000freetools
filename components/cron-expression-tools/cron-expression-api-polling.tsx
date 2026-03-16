"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, RefreshCw, Webhook, AlertTriangle, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CronExpressionApiPolling() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [apiEndpoint, setApiEndpoint] = useState("https://api.example.com/data")
  const [timeoutValue, setTimeoutValue] = useState("30")
  const [retryCount, setRetryCount] = useState("3")
  const [copied, setCopied] = useState<string | null>(null)

  const pollingTemplates = useMemo(() => [
    {
      id: "every_minute",
      name: "Every Minute Polling",
      icon: Activity,
      description: "Check API every minute",
      cron: "* * * * *",
      schedule: "Every minute",
      useCase: "Real-time monitoring, critical alerts",
      rateLimitWarning: "High frequency - ensure API allows 60 requests/hour minimum",
      script: getPollingScript("60", apiEndpoint, timeoutValue, retryCount),
    },
    {
      id: "every_5min",
      name: "5-Minute Polling",
      icon: RefreshCw,
      description: "Check API every 5 minutes",
      cron: "*/5 * * * *",
      schedule: "Every 5 minutes",
      useCase: "Frequent updates, status checks",
      rateLimitWarning: "Moderate frequency - 12 requests/hour",
      script: getPollingScript("300", apiEndpoint, timeoutValue, retryCount),
    },
    {
      id: "every_10min",
      name: "10-Minute Polling",
      icon: RefreshCw,
      description: "Check API every 10 minutes",
      cron: "*/10 * * * *",
      schedule: "Every 10 minutes",
      useCase: "Regular sync, data updates",
      rateLimitWarning: "Safe frequency - 6 requests/hour",
      script: getPollingScript("600", apiEndpoint, timeoutValue, retryCount),
    },
    {
      id: "every_15min",
      name: "15-Minute Polling",
      icon: RefreshCw,
      description: "Check API every 15 minutes",
      cron: "*/15 * * * *",
      schedule: "Every 15 minutes",
      useCase: "Quarterly updates, dashboard refresh",
      rateLimitWarning: "Safe frequency - 4 requests/hour",
      script: getPollingScript("900", apiEndpoint, timeoutValue, retryCount),
    },
    {
      id: "every_30min",
      name: "30-Minute Polling",
      icon: RefreshCw,
      description: "Check API every 30 minutes",
      cron: "*/30 * * * *",
      schedule: "Every 30 minutes",
      useCase: "Periodic sync, batch updates",
      rateLimitWarning: "Very safe - 2 requests/hour",
      script: getPollingScript("1800", apiEndpoint, timeoutValue, retryCount),
    },
    {
      id: "hourly",
      name: "Hourly Polling",
      icon: Webhook,
      description: "Check API every hour",
      cron: "0 * * * *",
      schedule: "Every hour on the hour",
      useCase: "Hourly reports, scheduled syncs",
      rateLimitWarning: "Very safe - 1 request/hour",
      script: getPollingScript("3600", apiEndpoint, timeoutValue, retryCount),
    },
    {
      id: "business_hours",
      name: "Business Hours Polling",
      icon: Activity,
      description: "Every 15 min during business hours",
      cron: "*/15 9-17 * * 1-5",
      schedule: "Every 15 min, 9 AM - 5 PM, weekdays",
      useCase: "Business-hour monitoring",
      rateLimitWarning: "Safe during business hours only",
      script: getPollingScript("900", apiEndpoint, timeoutValue, retryCount),
    },
    {
      id: "webhook_retry",
      name: "Webhook Retry",
      icon: Webhook,
      description: "Retry failed webhooks",
      cron: "0 */2 * * *",
      schedule: "Every 2 hours",
      useCase: "Webhook delivery retry queue",
      rateLimitWarning: "Low frequency - batch processing",
      script: getWebhookRetryScript(apiEndpoint, timeoutValue),
    },
    {
      id: "health_check",
      name: "API Health Check",
      icon: Activity,
      description: "Monitor API health",
      cron: "*/5 * * * *",
      schedule: "Every 5 minutes",
      useCase: "Uptime monitoring, health checks",
      rateLimitWarning: "Use dedicated health endpoint",
      script: getHealthCheckScript(apiEndpoint, timeoutValue),
    },
    {
      id: "rate_limited",
      name: "Rate-Limited Polling",
      icon: AlertTriangle,
      description: "Respect API rate limits",
      cron: "0 */6 * * *",
      schedule: "Every 6 hours",
      useCase: "Strict rate limit compliance",
      rateLimitWarning: "Designed for low-rate APIs",
      script: getRateLimitedScript(apiEndpoint, timeoutValue),
    },
  ], [apiEndpoint, timeoutValue, retryCount])

  const applyTemplate = useCallback((template: typeof pollingTemplates[0]) => {
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
            CRON for API Polling / Webhooks
          </CardTitle>
          <CardDescription>
            Templates for periodic API polling, webhook triggers, and rate-limited requests
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>Customize the polling parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="api-endpoint">API Endpoint</Label>
              <Input
                id="api-endpoint"
                value={apiEndpoint}
                onChange={(e) => setApiEndpoint(e.target.value)}
                placeholder="https://api.example.com/data"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeout">Timeout (seconds)</Label>
              <Select value={timeoutValue} onValueChange={setTimeoutValue}>
                <SelectTrigger id="timeout">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">60 seconds</SelectItem>
                  <SelectItem value="120">120 seconds</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="retry">Retry Count</Label>
              <Select value={retryCount} onValueChange={setRetryCount}>
                <SelectTrigger id="retry">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 retry</SelectItem>
                  <SelectItem value="3">3 retries</SelectItem>
                  <SelectItem value="5">5 retries</SelectItem>
                  <SelectItem value="10">10 retries</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Polling Templates</TabsTrigger>
          <TabsTrigger value="scripts">Scripts</TabsTrigger>
          <TabsTrigger value="rate-limits">Rate Limit Guide</TabsTrigger>
        </TabsList>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pollingTemplates.map((template) => {
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
                    <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/20 text-xs text-amber-700 dark:text-amber-300">
                      <AlertTriangle className="size-3 inline mr-1" />
                      {template.rateLimitWarning}
                    </div>
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
              <CardTitle>API Polling Scripts</CardTitle>
              <CardDescription>Ready-to-use scripts for API polling and webhook triggers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Basic API Polling",
                  cron: "*/5 * * * *",
                  script: `#!/bin/bash
# API Polling Script
# Schedule: Every 5 minutes

API_URL="${apiEndpoint}"
TIMEOUT=${timeoutValue}
MAX_RETRIES=${retryCount}
LOG_FILE="/var/log/api_poll.log"

poll_api() {
  local retry=0
  while [ $retry -lt $MAX_RETRIES ]; do
    response=$(curl -s -w "\\n%{http_code}" --max-time $TIMEOUT "$API_URL")
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n-1)

    if [ "$http_code" -eq 200 ]; then
      echo "$(date): Success" >> $LOG_FILE
      # Process response
      echo "$body" | jq '.' >> $LOG_FILE
      return 0
    fi

    retry=$((retry + 1))
    echo "$(date): Retry $retry/$MAX_RETRIES (HTTP $http_code)" >> $LOG_FILE
    sleep 5
  done

  echo "$(date): Failed after $MAX_RETRIES retries" >> $LOG_FILE
  return 1
}

poll_api`,
                },
                {
                  name: "Webhook Trigger",
                  cron: "0 * * * *",
                  script: `#!/bin/bash
# Webhook Trigger Script
# Schedule: Every hour

WEBHOOK_URL="${apiEndpoint}"
TIMEOUT=${timeoutValue}

# Get data to send
data=$(curl -s "https://internal-api/data")

# Send webhook
curl -X POST \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $WEBHOOK_TOKEN" \\
  -d "$data" \\
  --max-time $TIMEOUT \\
  "$WEBHOOK_URL"

if [ $? -eq 0 ]; then
  echo "Webhook sent successfully"
else
  echo "Webhook failed" >&2
  exit 1
fi`,
                },
                {
                  name: "Health Check with Alerting",
                  cron: "*/5 * * * *",
                  script: `#!/bin/bash
# API Health Check Script
# Schedule: Every 5 minutes

API_URL="${apiEndpoint}"
TIMEOUT=${timeoutValue}
ALERT_WEBHOOK="https://alerts.example.com/webhook"

start_time=$(date +%s)
response=$(curl -s -o /dev/null -w "%{http_code}" --max-time $TIMEOUT "$API_URL")
end_time=$(date +%s)
latency=$((end_time - start_time))

if [ "$response" -ne 200 ]; then
  # Send alert
  curl -X POST "$ALERT_WEBHOOK" \\
    -H "Content-Type: application/json" \\
    -d "{\\"status\\": \\"critical\\", \\"message\\": \\"API health check failed\\", \\"http_code\\": $response}"

  echo "ALERT: API health check failed (HTTP $response)"
  exit 1
fi

echo "OK: API healthy (latency: \${latency}s)"`,
                },
                {
                  name: "Rate-Limited Polling",
                  cron: "0 */6 * * *",
                  script: `#!/bin/bash
# Rate-Limited API Polling
# Schedule: Every 6 hours

API_URL="${apiEndpoint}"
TIMEOUT=${timeoutValue}
RATE_LIMIT_FILE="/tmp/api_rate_limit"

# Check rate limit status
if [ -f "$RATE_LIMIT_FILE" ]; then
  last_call=$(cat "$RATE_LIMIT_FILE")
  now=$(date +%s)
  diff=$((now - last_call))

  if [ $diff -lt 3600 ]; then
    echo "Rate limit: waiting $((3600 - diff)) seconds"
    exit 0
  fi
fi

# Make API call
response=$(curl -s --max-time $TIMEOUT "$API_URL")

# Update rate limit tracker
date +%s > "$RATE_LIMIT_FILE"

# Process response
echo "$response" | jq '.'

echo "API poll completed"`,
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

        {/* Rate Limits Tab */}
        <TabsContent value="rate-limits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Rate Limit Guide</CardTitle>
              <CardDescription>Choosing the right polling frequency for your API</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Polling Interval</th>
                      <th className="text-left p-2">Requests/Hour</th>
                      <th className="text-left p-2">Requests/Day</th>
                      <th className="text-left p-2">CRON Expression</th>
                      <th className="text-left p-2">Use Case</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { interval: "Every minute", perHour: 60, perDay: 1440, cron: "* * * * *", useCase: "Real-time monitoring" },
                      { interval: "Every 5 minutes", perHour: 12, perDay: 288, cron: "*/5 * * * *", useCase: "Frequent updates" },
                      { interval: "Every 10 minutes", perHour: 6, perDay: 144, cron: "*/10 * * * *", useCase: "Regular sync" },
                      { interval: "Every 15 minutes", perHour: 4, perDay: 96, cron: "*/15 * * * *", useCase: "Dashboard refresh" },
                      { interval: "Every 30 minutes", perHour: 2, perDay: 48, cron: "*/30 * * * *", useCase: "Periodic sync" },
                      { interval: "Every hour", perHour: 1, perDay: 24, cron: "0 * * * *", useCase: "Hourly reports" },
                      { interval: "Every 6 hours", perHour: 0.17, perDay: 4, cron: "0 */6 * * *", useCase: "Low-rate APIs" },
                      { interval: "Daily", perHour: 0.04, perDay: 1, cron: "0 0 * * *", useCase: "Daily sync" },
                    ].map((row, idx) => (
                      <tr key={idx} className="border-b hover:bg-muted/50">
                        <td className="p-2">{row.interval}</td>
                        <td className="p-2">{row.perHour}</td>
                        <td className="p-2">{row.perDay}</td>
                        <td className="p-2"><code className="bg-muted px-2 py-1 rounded">{row.cron}</code></td>
                        <td className="p-2 text-muted-foreground">{row.useCase}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border bg-blue-50 dark:bg-blue-950/20">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Rate Limit Best Practices</h4>
                  <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                    <li>• Always check API documentation for rate limits</li>
                    <li>• Implement exponential backoff on failures</li>
                    <li>• Use conditional requests (If-Modified-Since)</li>
                    <li>• Cache responses when possible</li>
                    <li>• Monitor your API usage metrics</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg border bg-amber-50 dark:bg-amber-950/20">
                  <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Avoiding Rate Limits</h4>
                  <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                    <li>• Use webhooks instead of polling when available</li>
                    <li>• Batch multiple requests together</li>
                    <li>• Implement request queuing</li>
                    <li>• Consider paid API tiers for higher limits</li>
                    <li>• Use API gateways for rate limit management</li>
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

function getPollingScript(intervalSeconds: string, endpoint: string, timeout: string, retries: string): string {
  return `#!/bin/bash
# API Polling Script (every ${intervalSeconds}s)
API_URL="${endpoint}"
TIMEOUT=${timeout}
MAX_RETRIES=${retries}

for i in $(seq 1 $MAX_RETRIES); do
  response=$(curl -s -w "\\n%{http_code}" --max-time $TIMEOUT "$API_URL")
  http_code=$(echo "$response" | tail -n1)

  if [ "$http_code" -eq 200 ]; then
    echo "Success"
    exit 0
  fi

  sleep 5
done

echo "Failed after $MAX_RETRIES retries"
exit 1`
}

function getWebhookRetryScript(endpoint: string, timeout: string): string {
  return `#!/bin/bash
# Webhook Retry Script
WEBHOOK_URL="${endpoint}"
TIMEOUT=${timeout}

# Get pending webhooks from queue
webhooks=$(curl -s "http://localhost:3000/webhooks/pending")

echo "$webhooks" | jq -r '.[] | @base64' | while read item; do
  payload=$(echo "$item" | base64 -d)
  curl -X POST -H "Content-Type: application/json" \\
    -d "$payload" --max-time $TIMEOUT "$WEBHOOK_URL"
done`
}

function getHealthCheckScript(endpoint: string, timeout: string): string {
  return `#!/bin/bash
# Health Check Script
API_URL="\${endpoint}"
TIMEOUT=\${timeout}

start=\$(date +%s)
http_code=\$(curl -s -o /dev/null -w "%{http_code}" --max-time $TIMEOUT "$API_URL")
end=\$(date +%s)
latency=\$((end - start))

if [ "$http_code" -eq 200 ]; then
  echo "OK: API healthy (latency: \${latency}s)"
  exit 0
else
  echo "CRITICAL: API unhealthy (HTTP $http_code)"
  exit 2
fi`
}

function getRateLimitedScript(endpoint: string, timeout: string): string {
  return `#!/bin/bash
# Rate-Limited Polling
API_URL="${endpoint}"
TIMEOUT=${timeout}

# Check if we should make request
last_call=$(cat /tmp/last_api_call 2>/dev/null || echo 0)
now=$(date +%s)
diff=$((now - last_call))

if [ $diff -lt 3600 ]; then
  echo "Rate limited: waiting $((3600 - diff))s"
  exit 0
fi

# Make request
curl -s --max-time $TIMEOUT "$API_URL"
date +%s > /tmp/last_api_call`
}
