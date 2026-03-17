"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Trash2, Info, Eye, EyeOff, Plus, Search, Shield } from "lucide-react"

interface PasswordEntry {
  id: string
  service: string
  username: string
  password: string
  url: string
  notes: string
  createdAt: string
  updatedAt: string
}

export default function PasswordManager() {
  const [passwords, setPasswords] = useState<PasswordEntry[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Form state
  const [service, setService] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [url, setUrl] = useState("")
  const [notes, setNotes] = useState("")
  
  const [copied, setCopied] = useState<string | null>(null)

  const addPassword = useCallback(() => {
    if (!service || !password) return

    const now = new Date().toISOString()
    const entry: PasswordEntry = {
      id: Date.now().toString(),
      service,
      username,
      password,
      url,
      notes,
      createdAt: now,
      updatedAt: now,
    }
    setPasswords((prev) => [...prev, entry])
    resetForm()
  }, [service, username, password, url, notes])

  const updatePassword = useCallback(() => {
    if (!editingId || !service || !password) return

    setPasswords((prev) =>
      prev.map((p) =>
        p.id === editingId
          ? { ...p, service, username, password, url, notes, updatedAt: new Date().toISOString() }
          : p
      )
    )
    resetForm()
    setEditingId(null)
  }, [editingId, service, username, password, url, notes])

  const removePassword = useCallback((id: string) => {
    setPasswords((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const editPassword = useCallback((entry: PasswordEntry) => {
    setService(entry.service)
    setUsername(entry.username)
    setPassword(entry.password)
    setUrl(entry.url)
    setNotes(entry.notes)
    setEditingId(entry.id)
    setIsAdding(true)
  }, [])

  const resetForm = useCallback(() => {
    setService("")
    setUsername("")
    setPassword("")
    setUrl("")
    setNotes("")
    setIsAdding(false)
    setEditingId(null)
  }, [])

  const togglePasswordVisibility = useCallback((id: string) => {
    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }))
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

  const filteredPasswords = useMemo(() => {
    if (!searchQuery) return passwords
    const query = searchQuery.toLowerCase()
    return passwords.filter(
      (p) =>
        p.service.toLowerCase().includes(query) ||
        p.username.toLowerCase().includes(query) ||
        p.url.toLowerCase().includes(query)
    )
  }, [passwords, searchQuery])

  const stats = useMemo(() => {
    return {
      total: passwords.length,
      weak: passwords.filter((p) => p.password.length < 8).length,
      strong: passwords.filter((p) => p.password.length >= 12 && /[A-Z]/.test(p.password) && /[0-9]/.test(p.password)).length,
    }
  }, [passwords])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Stats */}
      {passwords.length > 0 && (
        <section className="grid grid-cols-3 gap-4">
          <div className="rounded-lg border bg-background p-4 text-center">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total Passwords</p>
          </div>
          <div className="rounded-lg border bg-green-50 dark:bg-green-900/20 p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.strong}</p>
            <p className="text-sm text-muted-foreground">Strong</p>
          </div>
          <div className="rounded-lg border bg-red-50 dark:bg-red-900/20 p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{stats.weak}</p>
            <p className="text-sm text-muted-foreground">Weak</p>
          </div>
        </section>
      )}

      {/* Add/Edit Form */}
      {isAdding ? (
        <section className="space-y-4 rounded-lg border bg-background p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{editingId ? "Edit Password" : "Add New Password"}</h3>
            <Button variant="ghost" size="sm" onClick={resetForm}>
              <Trash2 className="size-4" />
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="service">Service *</Label>
              <Input
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                placeholder="e.g., Gmail"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username/Email</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g., user@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={editingId ? updatePassword : addPassword} disabled={!service || !password}>
              {editingId ? "Update" : "Add"} Password
            </Button>
            <Button variant="outline" onClick={resetForm}>Cancel</Button>
          </div>
        </section>
      ) : (
        <Button onClick={() => setIsAdding(true)} className="w-full">
          <Plus className="size-4 mr-2" />
          Add New Password
        </Button>
      )}

      {/* Search */}
      {passwords.length > 0 && (
        <section className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search passwords..."
              className="pl-9"
            />
          </div>
        </section>
      )}

      {/* Password List */}
      {filteredPasswords.length > 0 && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Saved Passwords ({filteredPasswords.length})</Label>
          <div className="rounded-lg border bg-background divide-y">
            {filteredPasswords.map((entry) => (
              <div key={entry.id} className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Shield className="size-4 text-muted-foreground" />
                      <p className="font-medium truncate">{entry.service}</p>
                    </div>
                    {entry.username && (
                      <p className="text-sm text-muted-foreground truncate">{entry.username}</p>
                    )}
                    {entry.url && (
                      <p className="text-xs text-muted-foreground truncate">{entry.url}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 rounded border bg-muted px-2 py-1">
                      <code className="text-sm">
                        {showPassword[entry.id] ? entry.password : "•".repeat(Math.min(entry.password.length, 10))}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => togglePasswordVisibility(entry.id)}
                      >
                        {showPassword[entry.id] ? <EyeOff className="size-3" /> : <Eye className="size-3" />}
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(entry.password, `pwd-${entry.id}`)}
                    >
                      {copied === `pwd-${entry.id}` ? <Check className="size-4" /> : <Copy className="size-4" />}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => editPassword(entry)}>
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
                {entry.notes && (
                  <p className="text-xs text-muted-foreground mt-2">{entry.notes}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Password Manager</h4>
            <p className="text-sm text-muted-foreground">
              Store and manage your passwords locally in your browser. This is a client-side
              only tool - passwords are not synced or backed up. For production use, consider
              a dedicated password manager with encryption, sync, and secure storage.
              Always use strong, unique passwords for each account.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
