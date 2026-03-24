"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Shield, Lock, AlertTriangle, CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils"

function getExpiryCheckCommand(domain: string): string {
  return `echo | openssl s_client -servername ${domain} -connect ${domain}:443 2>/dev/null | openssl x509 -noout -enddate`
}

function getPreExpiryAlertCommand(domain: string, email: string, days: number): string {
  return `#!/bin/bash
expiry=$(echo | openssl s_client -servername ${domain} -connect ${domain}:443 2>/dev/null | openssl x509 -noout -enddate)
days_left=$(( ($(date -d "$(echo $expiry | cut -d= -f2)" +%s) - $(date +%s)) / 86400 ))
if [ $days_left -lt ${days} ]; then
  echo "SSL expires in $days_left days" | mail -s "SSL Alert: ${domain}" ${email}
fi`
}

export default function CronExpressionSslRenewal() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [domain, setDomain] = useState("example.com")
  const [email, setEmail] = useState("admin@example.com")
  const [webroot, setWebroot] = useState("/var/www/html")
  const [copied, setCopied] = useState<string | null>(null)

  const sslTemplates = useMemo(() => [
    {
      id: "certbot_daily",
      name: "Certbot Daily Check",
      icon: Shield,
      description: "Daily certificate renewal check",
      cron: "0 3 * * *",
      schedule: "Daily at 3:00 AM",
      useCase: "Standard Let's Encrypt auto-renewal",
      command: `certbot renew --quiet --deploy-hook "systemctl reload nginx"`,
    },
    {
      id: "certbot_weekly",
      name: "Certbot Weekly Check",
      icon: CalendarDays,
      description: "Weekly certificate renewal check",
      cron: "0 4 * * 0",
      schedule: "Every Sunday at 4:00 AM",
      useCase: "Less frequent renewal checks",
      command: `certbot renew --quiet --post-hook "systemctl reload nginx"`,
    },
    {
      id: "certbot_twice_daily",
      name: "Twice Daily Check",
      icon: Shield,
      description: "Morning and evening renewal checks",
      cron: "0 6,18 * * *",
      schedule: "6:00 AM and 6:00 PM daily",
      useCase: "High-availability environments",
      command: `certbot renew --quiet --deploy-hook "systemctl reload nginx"`,
    },
    {
      id: "acme_daily",
      name: "ACME Daily Renewal",
      icon: Lock,
      description: "Daily ACME protocol check",
      cron: "0 2 * * *",
      schedule: "Daily at 2:00 AM",
      useCase: "ACME.sh or similar tools",
      command: `acme.sh --cron --home /root/.acme.sh --reloadcmd "systemctl reload nginx"`,
    },
    {
      id: "expiry_check",
      name: "Certificate Expiry Check",
      icon: AlertTriangle,
      description: "Check certificate expiry and alert",
      cron: "0 9 * * *",
      schedule: "Daily at 9:00 AM",
      useCase: "Monitoring and alerting",
      command: getExpiryCheckCommand(domain),
    },
    {
      id: "manual_renewal",
      name: "Monthly Manual Check",
      icon: CalendarDays,
      description: "Monthly reminder for manual renewal",
      cron: "0 9 1 * *",
      schedule: "1st of every month at 9:00 AM",
      useCase: "Manual certificate management",
      command: `echo "Check SSL certificates for ${domain}" | mail -s "SSL Certificate Check" ${email}`,
    },
    {
      id: "pre_expiry_alert",
      name: "Pre-Expiry Alert (30 days)",
      icon: AlertTriangle,
      description: "Alert 30 days before expiry",
      cron: "0 9 * * *",
      schedule: "Daily at 9:00 AM",
      useCase: "Early warning system",
      command: getPreExpiryAlertCommand(domain, email, 30),
    },
    {
      id: "multi_domain",
      name: "Multi-Domain Renewal",
      icon: Shield,
      description: "Renew certificates for multiple domains",
      cron: "0 3 * * *",
      schedule: "Daily at 3:00 AM",
      useCase: "Multiple domain management",
      command: `certbot renew --quiet --deploy-hook "systemctl reload nginx"`,
    },
  ], [domain, email])

  const applyTemplate = useCallback((template: typeof sslTemplates[0]) => {
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
            <Shield className="size-5" />
            CRON for SSL Certificate Renewal
          </CardTitle>
          <CardDescription>
            Automate SSL/TLS certificate renewal with Let's Encrypt and Certbot
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Domain Configuration</CardTitle>
          <CardDescription>Customize the templates for your domain</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="domain">Domain Name</Label>
              <Input
                id="domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="webroot">Web Root Path</Label>
              <Input
                id="webroot"
                value={webroot}
                onChange={(e) => setWebroot(e.target.value)}
                placeholder="/var/www/html"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Renewal Templates</TabsTrigger>
          <TabsTrigger value="certbot">Certbot Setup</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sslTemplates.map((template) => {
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

        {/* Certbot Setup Tab */}
        <TabsContent value="certbot" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Certbot Installation & Setup</CardTitle>
              <CardDescription>Complete guide for setting up automatic SSL renewal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "1. Install Certbot",
                  code: `# Ubuntu/Debian
sudo apt update
sudo apt install certbot python3-certbot-nginx

# CentOS/RHEL
sudo yum install certbot python3-certbot-nginx

# Install nginx plugin
sudo apt install python3-certbot-nginx`,
                },
                {
                  title: "2. Obtain Certificate",
                  code: `# For nginx with webroot
sudo certbot certonly --webroot -w ${webroot} -d ${domain} -d www.${domain} --email ${email} --agree-tos --non-interactive

# Or use nginx plugin
sudo certbot --nginx -d ${domain} -d www.${domain} --email ${email} --agree-tos --non-interactive`,
                },
                {
                  title: "3. Set Up Auto-Renewal Cron Job",
                  code: `# Edit crontab
sudo crontab -e

# Add this line (renews daily at 3 AM)
0 3 * * * certbot renew --quiet --deploy-hook "systemctl reload nginx"

# Or create a dedicated script
sudo nano /usr/local/bin/ssl-renew.sh`,
                },
                {
                  title: "4. Create Renewal Script",
                  code: `#!/bin/bash
# /usr/local/bin/ssl-renew.sh

CERTBOT=/usr/bin/certbot
RENEWAL_LOG=/var/log/certbot-renewal.log

$CERTBOT renew --quiet --deploy-hook "systemctl reload nginx" >> $RENEWAL_LOG 2>&1

if [ $? -eq 0 ]; then
  echo "Certificate renewal successful: $(date)" >> $RENEWAL_LOG
else
  echo "Certificate renewal failed: $(date)" >> $RENEWAL_LOG
  # Send alert email
  echo "SSL renewal failed for ${domain}" | mail -s "SSL Alert" ${email}
fi`,
                },
                {
                  title: "5. Test Renewal",
                  code: `# Test renewal process (dry run)
sudo certbot renew --dry-run

# Check certificate expiry
sudo certbot certificates

# View renewal configuration
cat /etc/letsencrypt/renewal/${domain}.conf`,
                },
              ].map((step, idx) => (
                <div key={idx} className="p-4 rounded-lg border bg-muted/30">
                  <h4 className="font-medium mb-2">{step.title}</h4>
                  <div className="flex items-center justify-between mb-2">
                    <pre className="text-xs font-mono bg-background p-3 rounded overflow-x-auto whitespace-pre-wrap flex-1">
                      {step.code}
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 shrink-0"
                      onClick={() => copyToClipboard(step.code, `certbot-${idx}`)}
                    >
                      {copied === `certbot-${idx}` ? (
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

        {/* Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Certificate Monitoring Scripts</CardTitle>
              <CardDescription>Monitor certificate expiry and get alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Certificate Expiry Check",
                  cron: "0 9 * * *",
                  script: `#!/bin/bash
# SSL Certificate Expiry Check
DOMAIN="${domain}"
EXPIRY_WARNING_DAYS=30
ALERT_EMAIL="${email}"

# Get certificate expiry date
expiry_date=$(echo | openssl s_client -servername $DOMAIN -connect $DOMAIN:443 2>/dev/null | \\
  openssl x509 -noout -enddate 2>/dev/null | cut -d= -f2)

if [ -z "$expiry_date" ]; then
  echo "Failed to get certificate info for $DOMAIN"
  exit 1
fi

# Convert to timestamp
expiry_ts=$(date -d "$expiry_date" +%s)
current_ts=$(date +%s)
days_left=$(( (expiry_ts - current_ts) / 86400 ))

echo "Certificate for $DOMAIN expires in $days_left days ($expiry_date)"

# Alert if expiring soon
if [ $days_left -lt $EXPIRY_WARNING_DAYS ]; then
  echo "WARNING: Certificate expires in $days_left days!"
  echo "SSL Certificate for $DOMAIN expires in $days_left days" | \\
    mail -s "SSL Expiry Alert: $DOMAIN" $ALERT_EMAIL
  exit 1
fi

exit 0`,
                },
                {
                  name: "Multi-Domain Monitor",
                  cron: "0 8 * * *",
                  script: `#!/bin/bash
# Multi-Domain SSL Monitor
DOMAINS=("${domain}" "www.${domain}" "api.${domain}")
WARNING_DAYS=30
CRITICAL_DAYS=7

for domain in "\${DOMAINS[@]}"; do
  expiry=$(echo | openssl s_client -servername $domain -connect $domain:443 2>/dev/null | \\
    openssl x509 -noout -enddate 2>/dev/null)

  if [ -n "$expiry" ]; then
    expiry_date=$(echo $expiry | cut -d= -f2)
    days_left=$(( ($(date -d "$expiry_date" +%s) - $(date +%s)) / 86400 ))

    if [ $days_left -lt $CRITICAL_DAYS ]; then
      echo "CRITICAL: $domain expires in $days_left days"
    elif [ $days_left -lt $WARNING_DAYS ]; then
      echo "WARNING: $domain expires in $days_left days"
    else
      echo "OK: $domain expires in $days_left days"
    fi
  fi
done`,
                },
                {
                  name: "Certbot Renewal Monitor",
                  cron: "0 6 * * *",
                  script: `#!/bin/bash
# Certbot Renewal Status Check
LOG_FILE="/var/log/certbot-renewal.log"
ALERT_EMAIL="${email}"

# Check last renewal
if [ -f "$LOG_FILE" ]; then
  last_renewal=$(tail -1 "$LOG_FILE" | grep -oP '\\d{4}-\\d{2}-\\d{2}' | head -1)

  if [ -n "$last_renewal" ]; then
    days_since=$(( ($(date +%s) - $(date -d "$last_renewal" +%s)) / 86400 ))

    if [ $days_since -gt 7 ]; then
      echo "WARNING: Last renewal was $days_since days ago"
      echo "Certbot hasn't renewed in $days_since days" | \\
        mail -s "Certbot Alert" $ALERT_EMAIL
    fi
  fi
fi

# Check certificate files
for cert in /etc/letsencrypt/live/*/cert.pem; do
  if [ -f "$cert" ]; then
    domain=$(basename $(dirname $cert))
    expiry=$(openssl x509 -in "$cert" -noout -enddate | cut -d= -f2)
    echo "$domain: $expiry"
  fi
done`,
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
                      onClick={() => copyToClipboard(script.script, `monitor-${idx}`)}
                    >
                      {copied === `monitor-${idx}` ? (
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
              <CardTitle>SSL Renewal Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border bg-green-50 dark:bg-green-950/20">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Best Practices</h4>
                  <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                    <li>• Run renewal checks daily (Certbot handles actual renewal)</li>
                    <li>• Set up monitoring alerts for expiry warnings</li>
                    <li>• Test renewal with --dry-run periodically</li>
                    <li>• Keep Certbot updated for security patches</li>
                    <li>• Log all renewal attempts for auditing</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg border bg-amber-50 dark:bg-amber-950/20">
                  <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Important Notes</h4>
                  <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                    <li>• Let's Encrypt certificates expire in 90 days</li>
                    <li>• Certbot auto-renews when &lt;30 days remaining</li>
                    <li>• Always reload web server after renewal</li>
                    <li>• Monitor rate limits (50 certs/week/domain)</li>
                    <li>• Keep backup of certificate configurations</li>
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
