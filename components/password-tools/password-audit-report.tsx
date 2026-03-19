"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info, FileText, Download } from "lucide-react"

interface PasswordEntry {
  id: string
  service: string
  username: string
  password: string
  dateAdded: string
  lastChanged: string
  strength: "weak" | "moderate" | "strong"
}

export default function PasswordAuditReport() {
  const [passwords, setPasswords] = useState<PasswordEntry[]>([
    { id: "1", service: "Gmail", username: "user@gmail.com", password: "weak123", dateAdded: "2024-01-01", lastChanged: "2024-01-01", strength: "weak" },
    { id: "2", service: "GitHub", username: "user@github.com", password: "Str0ng!Pass#2024", dateAdded: "2024-02-01", lastChanged: "2024-06-01", strength: "strong" },
    { id: "3", service: "Twitter", username: "@user", password: "medium456", dateAdded: "2024-03-01", lastChanged: "2024-03-01", strength: "moderate" },
  ])
  const [newService, setNewService] = useState("")
  const [newUsername, setNewUsername] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [reportOutput, setReportOutput] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const calculateStrength = useCallback((password: string): "weak" | "moderate" | "strong" => {
    let score = 0
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
    if (/\d/.test(password)) score++
    if (/[^a-zA-Z0-9]/.test(password)) score++

    if (score <= 2) return "weak"
    if (score <= 4) return "moderate"
    return "strong"
  }, [])

  const addPassword = useCallback(() => {
    if (!newService || !newPassword) return
    const entry: PasswordEntry = {
      id: Date.now().toString(),
      service: newService,
      username: newUsername,
      password: newPassword,
      dateAdded: new Date().toISOString().split("T")[0],
      lastChanged: new Date().toISOString().split("T")[0],
      strength: calculateStrength(newPassword),
    }
    setPasswords((prev) => [...prev, entry])
    setNewService("")
    setNewUsername("")
    setNewPassword("")
  }, [newService, newUsername, newPassword, calculateStrength])

  const removePassword = useCallback((id: string) => {
    setPasswords((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const generateReport = useCallback(() => {
    const total = passwords.length
    const weak = passwords.filter((p) => p.strength === "weak").length
    const moderate = passwords.filter((p) => p.strength === "moderate").length
    const strong = passwords.filter((p) => p.strength === "strong").length
    
    const oldPasswords = passwords.filter((p) => {
      const lastChanged = new Date(p.lastChanged)
      const sixMonthsAgo = new Date()
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
      return lastChanged < sixMonthsAgo
    }).length

    let report = `PASSWORD AUDIT REPORT\n`
    report += `Generated: ${new Date().toLocaleDateString()}\n`
    report += `${"=".repeat(50)}\n\n`
    
    report += `SUMMARY\n`
    report += `- Total passwords: ${total}\n`
    report += `- Strong passwords: ${strong} (${((strong/total)*100).toFixed(0)}%)\n`
    report += `- Moderate passwords: ${moderate} (${((moderate/total)*100).toFixed(0)}%)\n`
    report += `- Weak passwords: ${weak} (${((weak/total)*100).toFixed(0)}%)\n`
    report += `- Passwords older than 6 months: ${oldPasswords}\n\n`
    
    report += `RECOMMENDATIONS\n`
    if (weak > 0) {
      report += `⚠️ ${weak} weak password(s) should be strengthened immediately\n`
    }
    if (oldPasswords > 0) {
      report += `⚠️ ${oldPasswords} password(s) haven't been changed in over 6 months\n`
    }
    if (weak === 0 && oldPasswords === 0) {
      report += `✓ All passwords meet security standards\n`
    }
    
    report += `\nPASSWORD LIST\n`
    report += `${"=".repeat(50)}\n`
    passwords.forEach((p, idx) => {
      report += `${idx + 1}. ${p.service}\n`
      report += `   Username: ${p.username}\n`
      report += `   Strength: ${p.strength.toUpperCase()}\n`
      report += `   Last Changed: ${p.lastChanged}\n\n`
    })

    setReportOutput(report)
  }, [passwords])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const downloadReport = useCallback(() => {
    if (!reportOutput) return
    const blob = new Blob([reportOutput], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `password_audit_${new Date().toISOString().split("T")[0]}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }, [reportOutput])

  const handleClear = useCallback(() => {
    setPasswords([])
    setReportOutput("")
  }, [])

  const stats = useMemo(() => {
    const total = passwords.length
    if (total === 0) return null
    const weak = passwords.filter((p) => p.strength === "weak").length
    const moderate = passwords.filter((p) => p.strength === "moderate").length
    const strong = passwords.filter((p) => p.strength === "strong").length
    return { total, weak, moderate, strong }
  }, [passwords])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Add Password */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Add Password Entry</Label>
        <div className="grid sm:grid-cols-4 gap-3">
          <Input
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
            placeholder="Service name"
          />
          <Input
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Username/Email"
          />
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Password"
          />
          <Button onClick={addPassword} disabled={!newService || !newPassword}>
            Add
          </Button>
        </div>
      </section>

      {/* Stats */}
      {stats && (
        <section className="grid grid-cols-4 gap-4">
          <div className="rounded-lg border bg-background p-4 text-center">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </div>
          <div className="rounded-lg border bg-green-50 dark:bg-green-900/20 p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.strong}</p>
            <p className="text-sm text-muted-foreground">Strong</p>
          </div>
          <div className="rounded-lg border bg-yellow-50 dark:bg-yellow-900/20 p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.moderate}</p>
            <p className="text-sm text-muted-foreground">Moderate</p>
          </div>
          <div className="rounded-lg border bg-red-50 dark:bg-red-900/20 p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{stats.weak}</p>
            <p className="text-sm text-muted-foreground">Weak</p>
          </div>
        </section>
      )}

      {/* Password List */}
      {passwords.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Password Entries ({passwords.length})</Label>
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <Trash2 className="size-4 mr-1" />
              Clear All
            </Button>
          </div>
          <div className="rounded-lg border bg-background divide-y">
            {passwords.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-3">
                <div className="flex-1">
                  <p className="font-medium">{entry.service}</p>
                  <p className="text-sm text-muted-foreground">{entry.username}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "text-xs px-2 py-1 rounded capitalize",
                    entry.strength === "strong" ? "bg-green-100 text-green-700" :
                    entry.strength === "moderate" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  )}>
                    {entry.strength}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => removePassword(entry.id)}>
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Generate Report */}
      <section className="space-y-3">
        <Button onClick={generateReport} disabled={passwords.length === 0} className="w-full">
          <FileText className="size-4 mr-2" />
          Generate Audit Report
        </Button>

        {reportOutput && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Audit Report</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(reportOutput, "report")}>
                  {copied === "report" ? <Check className="size-4" /> : <Copy className="size-4" />}
                  <span className="ml-1">Copy</span>
                </Button>
                <Button variant="outline" size="sm" onClick={downloadReport}>
                  <Download className="size-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <pre className="font-mono text-sm whitespace-pre-wrap">{reportOutput}</pre>
            </div>
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Password Audit</h4>
            <p className="text-sm text-muted-foreground">
              Generate a comprehensive audit report of your passwords. The report includes
              strength analysis, age tracking, and security recommendations. Regular audits
              help identify weak passwords and ensure good password hygiene practices.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ")
}
