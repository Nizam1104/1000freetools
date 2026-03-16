"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Mail, Clock, Calendar, MailCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CronExpressionEmailScheduling() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [customHour, setCustomHour] = useState("9")
  const [customMinute, setCustomMinute] = useState("0")
  const [customDay, setCustomDay] = useState("1")
  const [copied, setCopied] = useState<string | null>(null)

  const emailTemplates = useMemo(() => [
    {
      id: "daily_digest",
      name: "Daily Digest",
      icon: Mail,
      description: "Send a daily summary email",
      cron: "0 9 * * *",
      schedule: "Every day at 9:00 AM",
      useCase: "Daily newsletters, summary reports, daily reminders",
    },
    {
      id: "daily_morning",
      name: "Daily Morning Report",
      icon: Mail,
      description: "Morning briefing email",
      cron: "0 8 * * 1-5",
      schedule: "Weekdays at 8:00 AM",
      useCase: "Morning briefings, daily standup reminders",
    },
    {
      id: "daily_evening",
      name: "Daily Evening Summary",
      icon: Mail,
      description: "End of day summary",
      cron: "0 18 * * 1-5",
      schedule: "Weekdays at 6:00 PM",
      useCase: "End of day reports, task summaries",
    },
    {
      id: "weekly_monday",
      name: "Weekly Monday Digest",
      icon: MailCheck,
      description: "Weekly summary every Monday",
      cron: "0 9 * * 1",
      schedule: "Every Monday at 9:00 AM",
      useCase: "Weekly newsletters, week start summaries",
    },
    {
      id: "weekly_friday",
      name: "Weekly Friday Report",
      icon: MailCheck,
      description: "End of week report",
      cron: "0 17 * * 5",
      schedule: "Every Friday at 5:00 PM",
      useCase: "Weekly reports, end of week summaries",
    },
    {
      id: "biweekly",
      name: "Bi-weekly Digest",
      icon: MailCheck,
      description: "Every two weeks",
      cron: "0 9 * * 1",
      schedule: "Every other Monday at 9:00 AM",
      useCase: "Bi-weekly newsletters, sprint summaries",
    },
    {
      id: "monthly_1st",
      name: "Monthly Report (1st)",
      icon: Calendar,
      description: "First day of every month",
      cron: "0 9 1 * *",
      schedule: "1st of every month at 9:00 AM",
      useCase: "Monthly reports, billing summaries",
    },
    {
      id: "monthly_15th",
      name: "Monthly Mid-month",
      icon: Calendar,
      description: "15th of every month",
      cron: "0 9 15 * *",
      schedule: "15th of every month at 9:00 AM",
      useCase: "Mid-month reports, payment reminders",
    },
    {
      id: "monthly_last",
      name: "Monthly End-of-Month",
      icon: Calendar,
      description: "Last day of every month",
      cron: "0 17 28-31 * *",
      schedule: "Last day of month at 5:00 PM",
      useCase: "Month-end reports, closing summaries",
    },
    {
      id: "quarterly",
      name: "Quarterly Report",
      icon: Calendar,
      description: "First day of each quarter",
      cron: "0 9 1 1,4,7,10 *",
      schedule: "Jan 1, Apr 1, Jul 1, Oct 1 at 9:00 AM",
      useCase: "Quarterly business reviews, financial reports",
    },
    {
      id: "hourly",
      name: "Hourly Notifications",
      icon: Clock,
      description: "Every hour during business hours",
      cron: "0 9-17 * * 1-5",
      schedule: "Every hour, 9 AM - 5 PM, weekdays",
      useCase: "Real-time alerts, frequent updates",
    },
    {
      id: "twice_daily",
      name: "Twice Daily",
      icon: Clock,
      description: "Morning and evening",
      cron: "0 9,17 * * 1-5",
      schedule: "9:00 AM and 5:00 PM, weekdays",
      useCase: "Morning/evening briefings, shift changes",
    },
  ], [])

  const applyTemplate = useCallback((template: typeof emailTemplates[0]) => {
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
    return `0 ${customMinute} ${customHour} ${customDay !== "every" ? customDay : "*"} * *`
  }, [customHour, customMinute, customDay])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="size-5" />
            CRON for Email Scheduling
          </CardTitle>
          <CardDescription>
            Templates and tools for scheduling automated emails, newsletters, and notifications
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
          <TabsTrigger value="custom">Custom Schedule</TabsTrigger>
          <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
        </TabsList>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {emailTemplates.map((template) => {
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
              <CardTitle>Custom Email Schedule</CardTitle>
              <CardDescription>Create a custom schedule for your email automation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="custom-hour">Hour (0-23)</Label>
                  <Select value={customHour} onValueChange={setCustomHour}>
                    <SelectTrigger id="custom-hour">
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-minute">Minute (0-59)</Label>
                  <Select value={customMinute} onValueChange={setCustomMinute}>
                    <SelectTrigger id="custom-minute">
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
                  <Label htmlFor="custom-day">Frequency</Label>
                  <Select value={customDay} onValueChange={setCustomDay}>
                    <SelectTrigger id="custom-day">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="every">Every day</SelectItem>
                      <SelectItem value="1-5">Weekdays only</SelectItem>
                      <SelectItem value="0,6">Weekends only</SelectItem>
                      <SelectItem value="1">Every Monday</SelectItem>
                      <SelectItem value="5">Every Friday</SelectItem>
                      <SelectItem value="1">1st of month</SelectItem>
                      <SelectItem value="15">15th of month</SelectItem>
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
            </CardContent>
          </Card>
        </TabsContent>

        {/* Best Practices Tab */}
        <TabsContent value="best-practices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Scheduling Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border bg-green-50 dark:bg-green-950/20">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Do</h4>
                  <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                    <li>• Schedule during business hours (9 AM - 5 PM)</li>
                    <li>• Avoid weekends for business emails</li>
                    <li>• Consider recipient time zones</li>
                    <li>• Use consistent scheduling patterns</li>
                    <li>• Test with small audiences first</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg border bg-red-50 dark:bg-red-950/20">
                  <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Don't</h4>
                  <ul className="space-y-2 text-sm text-red-700 dark:text-red-300">
                    <li>• Send late night or early morning emails</li>
                    <li>• Schedule during holidays without checking</li>
                    <li>• Over-send (respect frequency limits)</li>
                    <li>• Ignore unsubscribe requests</li>
                    <li>• Send at exactly :00 (use :05 or :10)</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg border bg-muted/30">
                <h4 className="font-medium mb-3">Recommended Email Schedules</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between p-2 rounded bg-background">
                    <span>Daily Newsletters</span>
                    <code className="font-mono text-xs bg-muted px-2 py-1 rounded">0 9 * * *</code>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-background">
                    <span>Weekly Reports</span>
                    <code className="font-mono text-xs bg-muted px-2 py-1 rounded">0 9 * * 1</code>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-background">
                    <span>Monthly Summaries</span>
                    <code className="font-mono text-xs bg-muted px-2 py-1 rounded">0 9 1 * *</code>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-background">
                    <span>Transaction Alerts</span>
                    <code className="font-mono text-xs bg-muted px-2 py-1 rounded">*/15 8-20 * * *</code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Integration Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Email Service Integration Examples</CardTitle>
          <CardDescription>How to use these CRON expressions with popular email services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                service: "SendGrid",
                example: `// SendGrid Scheduled Send
{
  "send_at": ${Math.floor(Date.now() / 1000) + 3600},
  "cron": "0 9 * * *"
}`,
              },
              {
                service: "Mailchimp",
                example: `// Mailchimp Campaign Schedule
{
  "schedule_time": "2024-01-15 09:00:00",
  "timewarp": true
}`,
              },
              {
                service: "AWS SES + EventBridge",
                example: `// EventBridge Rule
{
  "ScheduleExpression": "cron(0 9 * * ? *)",
  "Target": "ses-email-function"
}`,
              },
              {
                service: "Node.js (node-cron)",
                example: `// Node.js with node-cron
cron.schedule('0 9 * * *', () => {
  sendEmail();
});`,
              },
            ].map((integration, idx) => (
              <div key={idx} className="p-4 rounded-lg border bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{integration.service}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(integration.example, `integration-${idx}`)}
                  >
                    {copied === `integration-${idx}` ? (
                      <Check className="size-3 mr-1" />
                    ) : (
                      <Copy className="size-3 mr-1" />
                    )}
                    Copy
                  </Button>
                </div>
                <pre className="text-xs font-mono bg-background p-3 rounded overflow-x-auto">
                  {integration.example}
                </pre>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
