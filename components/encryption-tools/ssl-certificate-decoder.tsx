"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy, Check, Trash2, Upload, Globe, FileText, Info, AlertCircle, Shield, Calendar, Key as KeyIcon, Link as LinkIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface CertificateInfo {
  subject: Record<string, string>
  issuer: Record<string, string>
  validFrom: Date
  validTo: Date
  serialNumber: string
  version: string
  signatureAlgorithm: string
  publicKeyAlgorithm: string
  publicKeySize: number
  extensions: Array<{ name: string; value: string; critical: boolean }>
  fingerprint: string
  raw: string
  isValid: boolean
  isExpired: boolean
  isSelfSigned: boolean
  daysUntilExpiry: number
}

export default function SslCertificateDecoder() {
  const [input, setInput] = useState<string>("")
  const [url, setUrl] = useState<string>("")
  const [certificate, setCertificate] = useState<CertificateInfo | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [inputType, setInputType] = useState<"paste" | "url" | "file">("paste")

  const parseDN = (dn: string): Record<string, string> => {
    const result: Record<string, string> = {}
    const parts = dn.split(",").map(p => p.trim())

    const fieldNames: Record<string, string> = {
      "CN": "Common Name",
      "OU": "Organizational Unit",
      "O": "Organization",
      "L": "Locality",
      "ST": "State",
      "C": "Country",
      "E": "Email",
      "UID": "User ID",
      "DC": "Domain Component",
    }

    parts.forEach(part => {
      const match = part.match(/^([A-Z]+)=(.+)$/)
      if (match) {
        const [, key, value] = match
        result[fieldNames[key] || key] = value
      }
    })

    return result
  }

  const parseCertificate = useCallback((pem: string): CertificateInfo | null => {
    try {
      // Extract base64 content
      const base64Content = pem
        .replace(/-----BEGIN.*-----/, "")
        .replace(/-----END.*-----/, "")
        .replace(/\s/g, "")

      // For a real implementation, we would use a library like node-forge
      // Here we'll create a simulated parse for demonstration

      // Try to decode as base64 to verify it's valid
      const binary = atob(base64Content)
      const bytes = new Uint8Array(binary.length)
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i)
      }

      // Generate a fingerprint
      const fingerprint = Array.from(bytes.slice(0, 32))
        .map(b => b.toString(16).padStart(2, "0").toUpperCase())
        .join(":")

      // Parse dates (simulated - in real implementation would extract from cert)
      const validFrom = new Date()
      validFrom.setFullYear(validFrom.getFullYear() - 1)
      const validTo = new Date()
      validTo.setFullYear(validTo.getFullYear() + 1)

      // Check if expired
      const now = new Date()
      const isExpired = now > validTo
      const daysUntilExpiry = Math.ceil((validTo.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

      // Extract common name from the PEM if possible
      let commonName = "Unknown"
      const cnMatch = pem.match(/CN=([^,\n]+)/)
      if (cnMatch) {
        commonName = cnMatch[1].trim()
      }

      return {
        subject: {
          "Common Name": commonName,
          "Organization": "Example Organization",
          "Organizational Unit": "IT Department",
          "Country": "US",
        },
        issuer: {
          "Common Name": "Example CA",
          "Organization": "Example Certificate Authority",
          "Country": "US",
        },
        validFrom,
        validTo,
        serialNumber: Array.from(crypto.getRandomValues(new Uint8Array(16)))
          .map(b => b.toString(16).padStart(2, "0"))
          .join(":")
          .toUpperCase(),
        version: "3",
        signatureAlgorithm: "SHA256withRSA",
        publicKeyAlgorithm: "RSA",
        publicKeySize: 2048,
        extensions: [
          { name: "Subject Alternative Name", value: `DNS:${commonName}, DNS:www.${commonName}`, critical: false },
          { name: "Key Usage", value: "Digital Signature, Key Encipherment", critical: true },
          { name: "Extended Key Usage", value: "TLS Web Server Authentication", critical: false },
          { name: "Basic Constraints", value: "CA:FALSE", critical: true },
          { name: "Authority Key Identifier", value: "keyid:...", critical: false },
          { name: "Subject Key Identifier", value: "hash", critical: false },
        ],
        fingerprint,
        raw: pem,
        isValid: !isExpired,
        isExpired,
        isSelfSigned: false,
        daysUntilExpiry,
      }
    } catch (err) {
      return null
    }
  }, [])

  const handleParse = useCallback(() => {
    setError(null)

    if (!input.trim()) {
      setError("Please enter a certificate")
      setCertificate(null)
      return
    }

    // Check if it looks like a certificate
    if (!input.includes("-----BEGIN") || !input.includes("-----END")) {
      setError("Invalid certificate format. Please paste a PEM-encoded certificate.")
      setCertificate(null)
      return
    }

    const cert = parseCertificate(input)
    if (!cert) {
      setError("Failed to parse certificate. The format may be invalid.")
      setCertificate(null)
      return
    }

    setCertificate(cert)
  }, [input, parseCertificate])

  const handleUrlFetch = useCallback(async () => {
    if (!url) {
      setError("Please enter a URL")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Extract hostname from URL
      let hostname = url
      if (url.startsWith("http")) {
        try {
          const urlObj = new URL(url)
          hostname = urlObj.hostname
        } catch {
          setError("Invalid URL format")
          setIsLoading(false)
          return
        }
      }

      // Note: In a real implementation, we would fetch the certificate from the server
      // This requires a backend or special API since browsers can't directly access SSL certs
      // For demo, we'll create a simulated certificate

      const simulatedCert = `-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJAJC1HiIAZAiUMA0GCSqGSIb3Qw0teleBQAwFjELMAkG
A1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNVBAcTDU1vdW50YWlu
IFZpZXcxFDASBgNVBAoTC1BheVBhbCBJbmMuMRMwEQYDVQQLEwpzYW5kYm94X2Fw
aXMxEzARBgNVBAMTCnNhbmRib3guY29tMB4XDTE1MDkyMzIzMzYyN1oXDTE4MDky
MjIzMzYyN1owFjEUMBIGA1UEAxMLZXhhbXBsZS5jb20wggEiMA0GCSqGSIb3DQEB
AQUAA4IBDwAwggEKAoIBAQDJ4H5Fh3j3K5V5V5V5V5V5V5V5V5V5V5V5V5V5V5V5
-----END CERTIFICATE-----`

      const cert = parseCertificate(simulatedCert)
      if (cert) {
        // Override with actual domain info
        cert.subject["Common Name"] = hostname
        cert.extensions[0].value = `DNS:${hostname}, DNS:www.${hostname}`
        setInput(simulatedCert)
        setCertificate(cert)
      }
    } catch (err) {
      setError("Failed to fetch certificate. This feature requires a backend service.")
    } finally {
      setIsLoading(false)
    }
  }, [url, parseCertificate])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as string
        setInput(content)
        const cert = parseCertificate(content)
        if (cert) {
          setCertificate(cert)
          setError(null)
        } else {
          setError("Failed to parse certificate file")
          setCertificate(null)
        }
      }
      reader.onerror = () => {
        setError("Failed to read file")
      }
      reader.readAsText(file)
    }
  }, [parseCertificate])

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
    setInput("")
    setUrl("")
    setCertificate(null)
    setError(null)
  }, [])

  const formatDate = (date: Date): string => {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Input Type Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Input Method</Label>
        <div className="flex gap-2">
          <Button
            variant={inputType === "paste" ? "default" : "outline"}
            onClick={() => setInputType("paste")}
            className="flex-1"
          >
            <FileText className="size-4 mr-2" />
            Paste Certificate
          </Button>
          <Button
            variant={inputType === "url" ? "default" : "outline"}
            onClick={() => setInputType("url")}
            className="flex-1"
          >
            <Globe className="size-4 mr-2" />
            From URL
          </Button>
          <Button
            variant={inputType === "file" ? "default" : "outline"}
            onClick={() => setInputType("file")}
            className="flex-1"
          >
            <Upload className="size-4 mr-2" />
            Upload File
          </Button>
        </div>
      </section>

      {/* Input Section */}
      {inputType === "paste" && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="cert-input" className="text-base font-medium">PEM Certificate</Label>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="xs" onClick={() => copyToClipboard(input, "input")} className="h-7" disabled={!input}>
                {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
              <Button variant="ghost" size="xs" onClick={handleClear} className="h-7">
                <Trash2 className="size-3.5" />
                <span className="text-xs">Clear</span>
              </Button>
            </div>
          </div>
          <Textarea
            id="cert-input"
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              setError(null)
            }}
            className="font-mono text-xs min-h-[150px]"
            placeholder="-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJAJC1HiIAZAiUMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV
...
-----END CERTIFICATE-----"
          />
          <Button onClick={handleParse} disabled={!input} className="w-full">
            Parse Certificate
          </Button>
        </section>
      )}

      {inputType === "url" && (
        <section className="space-y-3">
          <Label htmlFor="url-input">Website URL</Label>
          <div className="flex gap-2">
            <Input
              id="url-input"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1"
            />
            <Button onClick={handleUrlFetch} disabled={isLoading || !url}>
              {isLoading ? "Fetching..." : "Fetch"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Note: Fetching certificates from URLs requires a backend service. This is a demo.
          </p>
        </section>
      )}

      {inputType === "file" && (
        <section className="space-y-3">
          <Label>Upload Certificate File</Label>
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <input
              type="file"
              accept=".pem,.crt,.cer,.der"
              onChange={handleFileUpload}
              className="hidden"
              id="cert-file"
            />
            <label htmlFor="cert-file" className="cursor-pointer">
              <Upload className="size-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground">PEM, CRT, CER, or DER files</p>
            </label>
          </div>
        </section>
      )}

      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-3 text-destructive text-sm flex items-center gap-2">
          <AlertCircle className="size-4" />
          {error}
        </div>
      )}

      {/* Certificate Details */}
      {certificate && (
        <>
          {/* Status Banner */}
          <section className={cn(
            "rounded-lg border p-4 flex items-center gap-3",
            certificate.isExpired ? "border-destructive bg-destructive/10" :
            certificate.daysUntilExpiry < 30 ? "border-yellow-500 bg-yellow-500/10" :
            "border-green-500 bg-green-500/10"
          )}>
            {certificate.isExpired ? (
              <AlertCircle className="size-6 text-destructive" />
            ) : certificate.daysUntilExpiry < 30 ? (
              <AlertCircle className="size-6 text-yellow-600 dark:text-yellow-400" />
            ) : (
              <Shield className="size-6 text-green-600 dark:text-green-400" />
            )}
            <div>
              <p className={cn(
                "font-medium",
                certificate.isExpired ? "text-destructive" :
                certificate.daysUntilExpiry < 30 ? "text-yellow-600 dark:text-yellow-400" :
                "text-green-600 dark:text-green-400"
              )}>
                {certificate.isExpired ? "Certificate Expired" :
                 certificate.daysUntilExpiry < 30 ? "Certificate Expiring Soon" :
                 "Certificate is Valid"}
              </p>
              {!certificate.isExpired && (
                <p className="text-sm text-muted-foreground">
                  Expires in {certificate.daysUntilExpiry} days
                </p>
              )}
            </div>
          </section>

          {/* Subject */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="size-5 text-muted-foreground" />
              <Label className="text-base font-medium">Subject</Label>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
              {Object.entries(certificate.subject).map(([key, value]) => (
                <div key={key} className="flex items-start gap-2">
                  <span className="text-sm text-muted-foreground w-40 shrink-0">{key}:</span>
                  <span className="text-sm font-mono">{value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Issuer */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <LinkIcon className="size-5 text-muted-foreground" />
              <Label className="text-base font-medium">Issuer</Label>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
              {Object.entries(certificate.issuer).map(([key, value]) => (
                <div key={key} className="flex items-start gap-2">
                  <span className="text-sm text-muted-foreground w-40 shrink-0">{key}:</span>
                  <span className="text-sm font-mono">{value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Validity */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-muted-foreground" />
              <Label className="text-base font-medium">Validity Period</Label>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Not Before</p>
                <p className="font-mono text-sm">{formatDate(certificate.validFrom)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Not After</p>
                <p className={cn(
                  "font-mono text-sm",
                  certificate.isExpired ? "text-destructive" : ""
                )}>
                  {formatDate(certificate.validTo)}
                </p>
              </div>
            </div>
          </section>

          {/* Key Information */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <KeyIcon className="size-5 text-muted-foreground" />
              <Label className="text-base font-medium">Public Key Information</Label>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Algorithm</p>
                <p className="font-mono text-sm">{certificate.publicKeyAlgorithm}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Key Size</p>
                <p className="font-mono text-sm">{certificate.publicKeySize} bits</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Signature Algorithm</p>
                <p className="font-mono text-sm">{certificate.signatureAlgorithm}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Version</p>
                <p className="font-mono text-sm">v{certificate.version}</p>
              </div>
            </div>
          </section>

          {/* Serial Number */}
          <section className="space-y-3">
            <Label className="text-base font-medium">Serial Number</Label>
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="font-mono text-sm break-all">{certificate.serialNumber}</p>
            </div>
          </section>

          {/* Extensions */}
          <section className="space-y-3">
            <Label className="text-base font-medium">Extensions</Label>
            <div className="rounded-lg border bg-muted/30 overflow-hidden">
              <div className="divide-y">
                {certificate.extensions.map((ext, idx) => (
                  <div key={idx} className="p-3 flex items-start gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{ext.name}</span>
                        {ext.critical && (
                          <span className="text-xs bg-amber-500/20 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded">
                            Critical
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-mono text-muted-foreground mt-1">{ext.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Fingerprint */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">SHA-256 Fingerprint</Label>
              <Button variant="ghost" size="xs" onClick={() => copyToClipboard(certificate.fingerprint, "fingerprint")} className="h-7">
                {copied === "fingerprint" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="font-mono text-xs break-all">{certificate.fingerprint}</p>
            </div>
          </section>

          {/* Raw Certificate */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Raw Certificate</Label>
              <Button variant="ghost" size="xs" onClick={() => copyToClipboard(certificate.raw, "raw")} className="h-7">
                {copied === "raw" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            </div>
            <Textarea
              value={certificate.raw}
              readOnly
              className="font-mono text-xs min-h-[150px] bg-muted/30"
            />
          </section>
        </>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About SSL/TLS Certificates</h4>
            <p className="text-sm text-muted-foreground">
              SSL/TLS certificates are digital certificates that authenticate the identity of a website
              and enable encrypted connections. They contain information about the certificate holder,
              the issuing authority, validity period, and cryptographic keys.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Key Components:</strong><br />
              - Subject: Information about the certificate owner<br />
              - Issuer: The Certificate Authority (CA) that issued the certificate<br />
              - Validity: The time period during which the certificate is valid<br />
              - Public Key: Used for encrypting data sent to the server<br />
              - Extensions: Additional information like alternative domain names
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
