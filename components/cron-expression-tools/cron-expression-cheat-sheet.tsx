"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Search, BookOpen, Clock, Calendar } from "lucide-react"

export default function CronExpressionCheatSheet() {
  const [searchQuery, setSearchQuery] = useState("")
  const [copied, setCopied] = useState<string | null>(null)

  const commonPatterns = useMemo(() => [
    { category: "Basic", cron: "* * * * *", description: "Every minute", useCase: "Frequent tasks, testing" },
    { category: "Basic", cron: "*/5 * * * *", description: "Every 5 minutes", useCase: "Regular polling, monitoring" },
    { category: "Basic", cron: "*/10 * * * *", description: "Every 10 minutes", useCase: "Periodic checks" },
    { category: "Basic", cron: "*/15 * * * *", description: "Every 15 minutes", useCase: "Quarter-hour tasks" },
    { category: "Basic", cron: "*/30 * * * *", description: "Every 30 minutes", useCase: "Half-hourly tasks" },
    { category: "Basic", cron: "0 * * * *", description: "Every hour", useCase: "Hourly reports, syncs" },
    { category: "Basic", cron: "0 */2 * * *", description: "Every 2 hours", useCase: "Bi-hourly tasks" },
    { category: "Basic", cron: "0 */4 * * *", description: "Every 4 hours", useCase: "Regular intervals" },
    { category: "Basic", cron: "0 */6 * * *", description: "Every 6 hours", useCase: "Four times daily" },
    { category: "Basic", cron: "0 */12 * * *", description: "Every 12 hours", useCase: "Twice daily" },
    { category: "Daily", cron: "0 0 * * *", description: "Daily at midnight", useCase: "Daily resets, backups" },
    { category: "Daily", cron: "0 6 * * *", description: "Daily at 6 AM", useCase: "Morning tasks" },
    { category: "Daily", cron: "0 9 * * *", description: "Daily at 9 AM", useCase: "Business start" },
    { category: "Daily", cron: "0 12 * * *", description: "Daily at noon", useCase: "Midday tasks" },
    { category: "Daily", cron: "0 18 * * *", description: "Daily at 6 PM", useCase: "End of day" },
    { category: "Daily", cron: "0 23 * * *", description: "Daily at 11 PM", useCase: "Night tasks" },
    { category: "Weekly", cron: "0 0 * * 0", description: "Weekly on Sunday", useCase: "Weekly maintenance" },
    { category: "Weekly", cron: "0 0 * * 1", description: "Weekly on Monday", useCase: "Start of week" },
    { category: "Weekly", cron: "0 9 * * 1", description: "Monday at 9 AM", useCase: "Weekly meetings" },
    { category: "Weekly", cron: "0 0 * * 5", description: "Weekly on Friday", useCase: "End of week" },
    { category: "Weekly", cron: "0 0 * * 6", description: "Weekly on Saturday", useCase: "Weekend tasks" },
    { category: "Weekdays", cron: "0 9 * * 1-5", description: "Weekdays at 9 AM", useCase: "Business hours" },
    { category: "Weekdays", cron: "0 17 * * 1-5", description: "Weekdays at 5 PM", useCase: "End of workday" },
    { category: "Weekdays", cron: "0 */2 9-17 * * 1-5", description: "Every 2h, 9AM-5PM, weekdays", useCase: "Business hours polling" },
    { category: "Monthly", cron: "0 0 1 * *", description: "Monthly on 1st", useCase: "Monthly reports" },
    { category: "Monthly", cron: "0 0 15 * *", description: "Monthly on 15th", useCase: "Mid-month tasks" },
    { category: "Monthly", cron: "0 0 1,15 * *", description: "Twice monthly", useCase: "Bi-monthly reports" },
    { category: "Monthly", cron: "0 0 L * *", description: "Last day of month", useCase: "Month-end processing" },
    { category: "Quarterly", cron: "0 0 1 1,4,7,10 *", description: "Quarterly", useCase: "Quarterly reports" },
    { category: "Yearly", cron: "0 0 1 1 *", description: "Yearly on Jan 1", useCase: "Annual tasks" },
    { category: "Yearly", cron: "0 0 1 6 *", description: "Yearly on Jun 1", useCase: "Mid-year tasks" },
  ], [])

  const syntaxRules = useMemo(() => [
    { char: "*", name: "Asterisk", description: "Any value - matches all possible values", example: "* * * * * = every minute" },
    { char: ",", name: "Comma", description: "Value list separator - specifies multiple values", example: "0,15,30,45 * * * * = every 15 minutes" },
    { char: "-", name: "Hyphen", description: "Range of values - specifies a range", example: "0 9-17 * * * = 9 AM to 5 PM" },
    { char: "/", name: "Slash", description: "Step values - specifies increments", example: "*/5 * * * * = every 5 minutes" },
    { char: "?", name: "Question Mark", description: "No specific value (alternative to *)", example: "0 0 ? * * = daily at midnight" },
    { char: "L", name: "L Character", description: "Last day of month or last weekday", example: "0 0 L * * = last day of month" },
    { char: "W", name: "W Character", description: "Nearest weekday to specified day", example: "0 0 15W * * = nearest weekday to 15th" },
    { char: "#", name: "Hash", description: "Nth occurrence of weekday", example: "0 0 * * 1#2 = 2nd Monday" },
  ], [])

  const filteredPatterns = useMemo(() => {
    if (!searchQuery) return commonPatterns
    const query = searchQuery.toLowerCase()
    return commonPatterns.filter(
      (p) =>
        p.cron.includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.useCase.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    )
  }, [searchQuery, commonPatterns])

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="size-5" />
            CRON Expression Cheat Sheet & Reference
          </CardTitle>
          <CardDescription>
            Quick reference for common CRON patterns and syntax rules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search patterns, descriptions, or use cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Syntax Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Syntax Rules & Special Characters</CardTitle>
          <CardDescription>Understanding CRON special characters</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Character</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Example</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {syntaxRules.map((rule, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <code className="bg-primary/10 px-2 py-1 rounded font-mono font-bold">
                      {rule.char}
                    </code>
                  </TableCell>
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell>{rule.description}</TableCell>
                  <TableCell className="font-mono text-sm">{rule.example}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Field Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Field Reference</CardTitle>
          <CardDescription>CRON expression format: minute hour day-of-month month day-of-week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-5 gap-4">
            {[
              { name: "Minute", range: "0-59", description: "Minute of the hour" },
              { name: "Hour", range: "0-23", description: "Hour of the day" },
              { name: "Day of Month", range: "1-31", description: "Day of the month" },
              { name: "Month", range: "1-12", description: "Month of the year" },
              { name: "Day of Week", range: "0-6", description: "Day of the week (0=Sun)" },
            ].map((field, idx) => (
              <div key={idx} className="space-y-2 p-3 rounded-lg border bg-muted/30">
                <p className="font-medium">{field.name}</p>
                <code className="text-sm text-muted-foreground">{field.range}</code>
                <p className="text-xs text-muted-foreground">{field.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Common Patterns */}
      <Card>
        <CardHeader>
          <CardTitle>Common CRON Patterns</CardTitle>
          <CardDescription>
            {searchQuery ? `Found ${filteredPatterns.length} patterns` : "Click any pattern to copy"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {["Basic", "Daily", "Weekly", "Weekdays", "Monthly", "Quarterly", "Yearly"].map((category) => {
              const categoryPatterns = filteredPatterns.filter((p) => p.category === category)
              if (categoryPatterns.length === 0) return null

              return (
                <div key={category}>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    {category === "Basic" && <Clock className="size-4" />}
                    {category === "Daily" && <Clock className="size-4" />}
                    {category === "Weekly" && <Calendar className="size-4" />}
                    {category === "Weekdays" && <Calendar className="size-4" />}
                    {category === "Monthly" && <Calendar className="size-4" />}
                    {category} Patterns
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {categoryPatterns.map((pattern, idx) => (
                      <div
                        key={idx}
                        className="group p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => copyToClipboard(pattern.cron, `${category}-${idx}`)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <code className="font-mono text-sm font-medium">{pattern.cron}</code>
                          <Badge variant="outline" className="text-xs">
                            {copied === `${category}-${idx}` ? (
                              <Check className="size-3" />
                            ) : (
                              <Copy className="size-3" />
                            )}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{pattern.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{pattern.useCase}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Examples Table */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reference Table</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Frequency</TableHead>
                <TableHead>CRON Expression</TableHead>
                <TableHead>Human Readable</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { freq: "Every minute", cron: "* * * * *", human: "Every minute of every hour of every day" },
                { freq: "Every 5 minutes", cron: "*/5 * * * *", human: "At minutes 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55" },
                { freq: "Every hour", cron: "0 * * * *", human: "At minute 0 of every hour" },
                { freq: "Every day at midnight", cron: "0 0 * * *", human: "At 00:00 (midnight) every day" },
                { freq: "Every day at 9 AM", cron: "0 9 * * *", human: "At 09:00 every day" },
                { freq: "Every Monday at 9 AM", cron: "0 9 * * 1", human: "At 09:00 on every Monday" },
                { freq: "Weekdays at 9 AM", cron: "0 9 * * 1-5", human: "At 09:00 on Monday through Friday" },
                { freq: "First of every month", cron: "0 0 1 * *", human: "At 00:00 on day 1 of every month" },
                { freq: "Every Sunday", cron: "0 0 * * 0", human: "At 00:00 on every Sunday" },
                { freq: "Yearly on Jan 1", cron: "0 0 1 1 *", human: "At 00:00 on January 1st" },
              ].map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{row.freq}</TableCell>
                  <TableCell>
                    <code className="bg-muted px-2 py-1 rounded font-mono text-sm">{row.cron}</code>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{row.human}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Pro Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Use <code className="bg-muted px-1 rounded">*/N</code> for regular intervals (e.g., <code className="bg-muted px-1 rounded">*/15</code> for every 15 minutes)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Combine ranges and lists: <code className="bg-muted px-1 rounded">0 9-12,14-17 * * 1-5</code> for business hours</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Day of month and day of week are OR conditions - if both are specified, either can trigger</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Test your expressions before deploying to production</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
