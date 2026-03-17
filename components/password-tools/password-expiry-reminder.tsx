"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, Bell, Calendar } from "lucide-react"

interface PasswordExpiry {
  id: string
  service: string
  password: string
  expiryDate: string
  notified: boolean
}

export default function PasswordExpiryReminder() {
  const [passwords, setPasswords] = useState<PasswordExpiry[]>([])
  const [newService, setNewService] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [expiryDays, setExpiryDays] = useState("90")
  const [reminderDays, setReminderDays] = useState("7")
  const [copied, setCopied] = useState<string | null>(null)

  const addPassword = useCallback(() => {
    if (!newService || !newPassword) return
    
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + parseInt(expiryDays))
    
    const entry: PasswordExpiry = {
      id: Date.now().toString(),
      service: newService,
      password: newPassword,
      expiryDate: expiryDate.toISOString().split("T")[0],
      notified: false,
    }
    setPasswords((prev) => [...prev, entry])
    setNewService("")
    setNewPassword("")
  }, [newService, newPassword, expiryDays])

  const removePassword = useCallback((id: string) => {
    setPasswords((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const passwordsWithStatus = useMemo(() => {
    const today = new Date()
    const reminderThreshold = new Date()
    reminderThreshold.setDate(reminderThreshold.getDate() + parseInt(reminderDays))

    return passwords.map((p) => {
      const expiry = new Date(p.expiryDate)
      const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      const isExpiring = daysUntilExpiry <= parseInt(reminderDays) && daysUntilExpiry >= 0
      const isExpired = daysUntilExpiry < 0

      return {
        ...p,
        daysUntilExpiry,
        isExpiring,
        isExpired,
      }
    }).sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry)
  }, [passwords, reminderDays])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const handleClear = useCallback(() => {
    setPasswords([])
  }, [])

  const exportReminders = useCallback(() => {
    const today = new Date()
    const reminders = passwordsWithStatus
      .filter((p) => p.isExpiring || p.isExpired)
      .map((p) => `${p.service}: ${p.isExpired ? "EXPIRED" : `Expires in ${p.daysUntilExpiry} days`} (${p.expiryDate})`)
      .join("\n")

    if (reminders) {
      copyToClipboard(reminders, "export")
    }
  }, [passwordsWithStatus, copyToClipboard])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Add Password */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Add Password Expiry</Label>
        <div className="grid sm:grid-cols-4 gap-3">
          <Input
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
            placeholder="Service name"
            className="sm:col-span-1"
          />
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Password"
            className="sm:col-span-1"
          />
          <Input
            type="number"
            value={expiryDays}
            onChange={(e) => setExpiryDays(e.target.value)}
            placeholder="Days"
            min="1"
            max="365"
          />
          <Button onClick={addPassword} disabled={!newService || !newPassword}>
            Add
          </Button>
        </div>
      </section>

      {/* Reminder Settings */}
      <section className="space-y-2">
        <Label htmlFor="reminder-days">Remind Me Before Expiry (days)</Label>
        <Input
          id="reminder-days"
          type="number"
          value={reminderDays}
          onChange={(e) => setReminderDays(e.target.value)}
          min="1"
          max="30"
          className="w-32"
        />
      </section>

      {/* Stats */}
      {passwords.length > 0 && (
        <section className="grid grid-cols-3 gap-4">
          <div className="rounded-lg border bg-green-50 dark:bg-green-900/20 p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {passwordsWithStatus.filter((p) => p.daysUntilExpiry > parseInt(reminderDays)).length}
            </p>
            <p className="text-sm text-muted-foreground">Good</p>
          </div>
          <div className="rounded-lg border bg-yellow-50 dark:bg-yellow-900/20 p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {passwordsWithStatus.filter((p) => p.isExpiring).length}
            </p>
            <p className="text-sm text-muted-foreground">Expiring Soon</p>
          </div>
          <div className="rounded-lg border bg-red-50 dark:bg-red-900/20 p-4 text-center">
            <p className="text-2xl font-bold text-red-600">
              {passwordsWithStatus.filter((p) => p.isExpired).length}
            </p>
            <p className="text-sm text-muted-foreground">Expired</p>
          </div>
        </section>
      )}

      {/* Password List */}
      {passwordsWithStatus.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Password Expiries ({passwordsWithStatus.length})</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={exportReminders}>
                <Bell className="size-4 mr-1" />
                Export Reminders
              </Button>
              <Button variant="ghost" size="sm" onClick={handleClear}>
                <Trash2 className="size-4 mr-1" />
                Clear All
              </Button>
            </div>
          </div>

          <div className="rounded-lg border bg-background divide-y">
            {passwordsWithStatus.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{entry.service}</p>
                    {entry.isExpired && (
                      <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-700">Expired</span>
                    )}
                    {entry.isExpiring && !entry.isExpired && (
                      <span className="text-xs px-2 py-0.5 rounded bg-yellow-100 text-yellow-700">Expiring Soon</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Expires: {new Date(entry.expiryDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "text-right",
                    entry.isExpired ? "text-red-600" :
                    entry.isExpiring ? "text-yellow-600" :
                    "text-green-600"
                  )}>
                    <p className="font-medium">
                      {entry.isExpired ? `${Math.abs(entry.daysUntilExpiry)} days ago` :
                       entry.daysUntilExpiry === 0 ? "Today" :
                       `${entry.daysUntilExpiry} days left`
                      }
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removePassword(entry.id)}>
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Calendar className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Password Expiry</h4>
            <p className="text-sm text-muted-foreground">
              Track password expiration dates and get reminded before they expire.
              Regular password rotation is a good security practice. Set expiry
              periods based on your security policy (typically 60-90 days).
              Export reminders to add to your calendar or task manager.
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
