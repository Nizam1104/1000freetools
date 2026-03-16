"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Link, CheckCircle2, XCircle, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

interface UrlValidationResult {
  url: string
  valid: boolean
  protocol?: string
  domain?: string
  port?: string
  path?: string
  query?: string
  reason: string
}

export default function UrlRegexValidator() {
  const [urls, setUrls] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const urlPattern = useMemo(() => {
    return /^(?:https?|ftp):\/\/(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?::\d{1,5})?(?:\/[^\s]*)?(?:\?[^\s]*)?(?:#[^\s]*)?$/i
  }, [])

  const validateUrl = useCallback((url: string): UrlValidationResult => {
    const trimmed = url.trim()
    
    if (!trimmed) {
      return { url: trimmed, valid: false, reason: "Empty URL" }
    }
    
    if (!urlPattern.test(trimmed)) {
      return { url: trimmed, valid: false, reason: "Invalid URL format" }
    }
    
    try {
      const parsed = new URL(trimmed)
      return {
        url: trimmed,
        valid: true,
        protocol: parsed.protocol.replace(":", ""),
        domain: parsed.hostname,
        port: parsed.port || undefined,
        path: parsed.pathname !== "/" ? parsed.pathname : undefined,
        query: parsed.search || undefined,
        reason: "Valid URL format",
      }
    } catch {
      return { url: trimmed, valid: false, reason: "Failed to parse URL" }
    }
  }, [urlPattern])

  const results = useMemo(() => {
    const lines = urls.split(/[\n,;]/).map(u => u.trim()).filter(u => u)
    return lines.map(url => validateUrl(url))
  }, [urls, validateUrl])

  const stats = useMemo(() => {
    const valid = results.filter(r => r.valid).length
    const invalid = results.filter(r => !r.valid).length
    return { valid, invalid, total: results.length }
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

  const validUrls = useMemo(() => results.filter(r => r.valid).map(r => r.url).join("\n"), [results])
  const invalidUrls = useMemo(() => results.filter(r => !r.valid).map(r => r.url).join("\n"), [results])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* URL Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="url-input" className="text-base font-medium">
            URLs
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(urls, "input")}
              className="h-7"
              disabled={!urls}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setUrls("")}
              className="h-7"
              disabled={!urls}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>
        
        <Textarea
          id="url-input"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          className="font-mono text-sm min-h-[120px]"
          placeholder="Enter URLs (one per line, or separated by comma/semicolon)..."
        />
        <p className="text-xs text-muted-foreground">
          Supports HTTP, HTTPS, and FTP protocols with optional port, path, query, and fragment
        </p>
      </section>

      {/* Statistics */}
      {stats.total > 0 && (
        <section className="grid grid-cols-3 gap-4">
          <div className="rounded-lg border bg-background p-4 text-center">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </div>
          <div className="rounded-lg border bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900 p-4 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.valid}</div>
            <div className="text-sm text-green-700 dark:text-green-300">Valid</div>
          </div>
          <div className="rounded-lg border bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900 p-4 text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.invalid}</div>
            <div className="text-sm text-red-700 dark:text-red-300">Invalid</div>
          </div>
        </section>
      )}

      {/* Results */}
      {results.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Validation Results</h3>
            <div className="flex gap-2">
              {validUrls && (
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => copyToClipboard(validUrls, "valid")}
                >
                  <CheckCircle2 className="size-3.5 mr-1 text-green-600" />
                  Copy Valid
                </Button>
              )}
              {invalidUrls && (
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => copyToClipboard(invalidUrls, "invalid")}
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
                  <div className="font-mono text-sm break-all">{result.url}</div>
                  {result.valid && (
                    <div className="grid gap-1 mt-2 text-xs">
                      {result.protocol && (
                        <div className="flex gap-2">
                          <span className="text-muted-foreground">Protocol:</span>
                          <span className="font-medium">{result.protocol}</span>
                        </div>
                      )}
                      {result.domain && (
                        <div className="flex gap-2">
                          <span className="text-muted-foreground">Domain:</span>
                          <span className="font-medium">{result.domain}</span>
                        </div>
                      )}
                      {result.port && (
                        <div className="flex gap-2">
                          <span className="text-muted-foreground">Port:</span>
                          <span className="font-medium">{result.port}</span>
                        </div>
                      )}
                      {result.path && (
                        <div className="flex gap-2">
                          <span className="text-muted-foreground">Path:</span>
                          <span className="font-mono">{result.path}</span>
                        </div>
                      )}
                      {result.query && (
                        <div className="flex gap-2">
                          <span className="text-muted-foreground">Query:</span>
                          <span className="font-mono">{result.query}</span>
                        </div>
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

      {/* URL Examples */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Test Examples</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { url: "https://www.example.com", valid: true, desc: "Standard HTTPS URL" },
            { url: "http://example.com:8080/path", valid: true, desc: "HTTP with port and path" },
            { url: "https://example.com/page?id=123#section", valid: true, desc: "URL with query and fragment" },
            { url: "www.example.com", valid: false, desc: "Missing protocol" },
          ].map((example, idx) => (
            <button
              key={idx}
              onClick={() => setUrls(example.url)}
              className="text-left rounded-lg border bg-background p-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                {example.valid ? (
                  <CheckCircle2 className="size-4 text-green-600" />
                ) : (
                  <XCircle className="size-4 text-red-600" />
                )}
                <code className="text-xs font-mono truncate">{example.url}</code>
              </div>
              <span className="text-xs text-muted-foreground">{example.desc}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
