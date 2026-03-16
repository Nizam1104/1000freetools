"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, Trash2, CheckCircle2, XCircle, Server } from "lucide-react"
import { cn } from "@/lib/utils"

interface IpValidationResult {
  ip: string
  valid: boolean
  version: "IPv4" | "IPv6" | null
  type?: string
  reason: string
}

export default function IpAddressValidator() {
  const [ips, setIps] = useState<string>("")
  const [mode, setMode] = useState<"ipv4" | "ipv6" | "both">("both")
  const [copied, setCopied] = useState<string | null>(null)

  const ipv4Pattern = useMemo(() => {
    return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  }, [])

  const ipv6Pattern = useMemo(() => {
    return /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::(?:[0-9a-fA-F]{1,4}:){0,6}[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,7}:$|^(?:[0-9a-fA-F]{1,4}:){0,6}::(?:[0-9a-fA-F]{1,4}:){0,5}[0-9a-fA-F]{1,4}$|^([0-9a-fA-F]{1,4}:){1,4}:[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,3}:[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,2}:[0-9a-fA-F]{1,4}$|^[0-9a-fA-F]{1,4}::[0-9a-fA-F]{1,4}$/
  }, [])

  const validateIp = useCallback((ip: string, selectedMode: "ipv4" | "ipv6" | "both"): IpValidationResult => {
    const trimmed = ip.trim()
    
    if (!trimmed) {
      return { ip: trimmed, valid: false, version: null, reason: "Empty IP address" }
    }
    
    const isIpv4 = ipv4Pattern.test(trimmed)
    const isIpv6 = ipv6Pattern.test(trimmed)
    
    if (selectedMode === "ipv4") {
      if (isIpv4) {
        const parts = trimmed.split(".").map(Number)
        const isPrivate = (parts[0] === 10) || 
                         (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) || 
                         (parts[0] === 192 && parts[1] === 168) ||
                         (parts[0] === 127)
        return {
          ip: trimmed,
          valid: true,
          version: "IPv4",
          type: isPrivate ? "Private" : "Public",
          reason: "Valid IPv4 address",
        }
      }
      return { ip: trimmed, valid: false, version: null, reason: "Not a valid IPv4 address" }
    }
    
    if (selectedMode === "ipv6") {
      if (isIpv6) {
        const isLoopback = trimmed === "::1"
        const isLinkLocal = trimmed.toLowerCase().startsWith("fe80:")
        return {
          ip: trimmed,
          valid: true,
          version: "IPv6",
          type: isLoopback ? "Loopback" : isLinkLocal ? "Link-local" : "Global",
          reason: "Valid IPv6 address",
        }
      }
      return { ip: trimmed, valid: false, version: null, reason: "Not a valid IPv6 address" }
    }
    
    // Both mode
    if (isIpv4) {
      const parts = trimmed.split(".").map(Number)
      const isPrivate = (parts[0] === 10) || 
                       (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) || 
                       (parts[0] === 192 && parts[1] === 168) ||
                       (parts[0] === 127)
      return {
        ip: trimmed,
        valid: true,
        version: "IPv4",
        type: isPrivate ? "Private" : "Public",
        reason: "Valid IPv4 address",
      }
    }
    
    if (isIpv6) {
      const isLoopback = trimmed === "::1"
      const isLinkLocal = trimmed.toLowerCase().startsWith("fe80:")
      return {
        ip: trimmed,
        valid: true,
        version: "IPv6",
        type: isLoopback ? "Loopback" : isLinkLocal ? "Link-local" : "Global",
        reason: "Valid IPv6 address",
      }
    }
    
    return { ip: trimmed, valid: false, version: null, reason: "Invalid IP address format" }
  }, [ipv4Pattern, ipv6Pattern])

  const results = useMemo(() => {
    const lines = ips.split(/[\n,;]/).map(ip => ip.trim()).filter(ip => ip)
    return lines.map(ip => validateIp(ip, mode))
  }, [ips, mode, validateIp])

  const stats = useMemo(() => {
    const valid = results.filter(r => r.valid).length
    const invalid = results.filter(r => !r.valid).length
    const ipv4 = results.filter(r => r.version === "IPv4").length
    const ipv6 = results.filter(r => r.version === "IPv6").length
    return { valid, invalid, ipv4, ipv6, total: results.length }
  }, [results])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const validIps = useMemo(() => results.filter(r => r.valid).map(r => r.ip).join("\n"), [results])
  const invalidIps = useMemo(() => results.filter(r => !r.valid).map(r => r.ip).join("\n"), [results])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Mode Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">IP Address Version</Label>
        <Tabs value={mode} onValueChange={(v) => setMode(v as "ipv4" | "ipv6" | "both")}>
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="ipv4">IPv4 Only</TabsTrigger>
            <TabsTrigger value="ipv6">IPv6 Only</TabsTrigger>
            <TabsTrigger value="both">Both</TabsTrigger>
          </TabsList>
        </Tabs>
      </section>

      {/* IP Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="ip-input" className="text-base font-medium">
            IP Addresses
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(ips, "input")}
              className="h-7"
              disabled={!ips}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setIps("")}
              className="h-7"
              disabled={!ips}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>
        
        <Textarea
          id="ip-input"
          value={ips}
          onChange={(e) => setIps(e.target.value)}
          className="font-mono text-sm min-h-[120px]"
          placeholder="Enter IP addresses (one per line, or separated by comma/semicolon)..."
        />
      </section>

      {/* Statistics */}
      {stats.total > 0 && (
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-lg border bg-background p-4 text-center">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </div>
          <div className="rounded-lg border bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900 p-4 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.valid}</div>
            <div className="text-sm text-green-700 dark:text-green-300">Valid</div>
          </div>
          {mode !== "ipv4" && (
            <div className="rounded-lg border bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900 p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.ipv6}</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">IPv6</div>
            </div>
          )}
          {mode !== "ipv6" && (
            <div className="rounded-lg border bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900 p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.ipv4}</div>
              <div className="text-sm text-purple-700 dark:text-purple-300">IPv4</div>
            </div>
          )}
        </section>
      )}

      {/* Results */}
      {results.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Validation Results</h3>
            <div className="flex gap-2">
              {validIps && (
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => copyToClipboard(validIps, "valid")}
                >
                  <CheckCircle2 className="size-3.5 mr-1 text-green-600" />
                  Copy Valid
                </Button>
              )}
              {invalidIps && (
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => copyToClipboard(invalidIps, "invalid")}
                >
                  <XCircle className="size-3.5 mr-1 text-red-600" />
                  Copy Invalid
                </Button>
              )}
            </div>
          </div>
          
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {results.map((result, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-3",
                  result.valid 
                    ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900" 
                    : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900"
                )}
              >
                {result.valid ? (
                  <CheckCircle2 className="size-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="size-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-sm break-all">{result.ip}</div>
                  {result.valid && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className={cn(
                        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                        result.version === "IPv4" 
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                      )}>
                        {result.version}
                      </span>
                      {result.type && (
                        <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 px-2 py-0.5 text-xs font-medium">
                          {result.type}
                        </span>
                      )}
                    </div>
                  )}
                  {!result.valid && (
                    <div className="text-xs mt-1 text-red-700 dark:text-red-300">
                      {result.reason}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* IP Examples */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Test Examples</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { ip: "192.168.1.1", version: "IPv4", valid: true, desc: "Private IPv4" },
            { ip: "8.8.8.8", version: "IPv4", valid: true, desc: "Public IPv4 (Google DNS)" },
            { ip: "::1", version: "IPv6", valid: true, desc: "IPv6 Loopback" },
            { ip: "2001:0db8:85a3:0000:0000:8a2e:0370:7334", version: "IPv6", valid: true, desc: "Full IPv6" },
            { ip: "256.1.1.1", version: null, valid: false, desc: "Invalid IPv4" },
          ].map((example, idx) => (
            <button
              key={idx}
              onClick={() => setIps(example.ip)}
              className="text-left rounded-lg border bg-background p-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                {example.valid ? (
                  <CheckCircle2 className="size-4 text-green-600" />
                ) : (
                  <XCircle className="size-4 text-red-600" />
                )}
                <code className="text-xs font-mono truncate">{example.ip}</code>
              </div>
              <span className="text-xs text-muted-foreground">{example.desc}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
