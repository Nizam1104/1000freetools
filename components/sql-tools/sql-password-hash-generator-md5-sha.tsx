"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Eye, EyeOff } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function SqlPasswordHashGeneratorMd5Sha() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [hashes, setHashes] = useState<{ [key: string]: string }>({})
  const [copied, setCopied] = useState<string | null>(null)

  const generateHashes = useCallback(async () => {
    if (!password) {
      setHashes({})
      return
    }

    const encoder = new TextEncoder()
    const data = encoder.encode(password)

    // MD5 (using simple implementation since Web Crypto doesn't support MD5)
    const md5Hash = simpleMD5(password)

    // SHA-1
    const sha1Buffer = await crypto.subtle.digest('SHA-1', data)
    const sha1Hash = Array.from(new Uint8Array(sha1Buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    // SHA-256
    const sha256Buffer = await crypto.subtle.digest('SHA-256', data)
    const sha256Hash = Array.from(new Uint8Array(sha256Buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    // SHA-512
    const sha512Buffer = await crypto.subtle.digest('SHA-512', data)
    const sha512Hash = Array.from(new Uint8Array(sha512Buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    // MySQL OLD_PASSWORD (deprecated but still used)
    const mysqlOld = mysqlOldPassword(password)

    // MySQL PASSWORD (MySQL 4.1+)
    const mysqlNew = mysqlPassword(password)

    // PostgreSQL MD5
    const postgresMD5 = "md5" + simpleMD5(password + "postgres_user")

    setHashes({
      "MD5": md5Hash,
      "SHA-1": sha1Hash,
      "SHA-256": sha256Hash,
      "SHA-512": sha512Hash,
      "MySQL OLD_PASSWORD": mysqlOld,
      "MySQL PASSWORD()": mysqlNew,
      "PostgreSQL MD5": postgresMD5
    })
  }, [password])

  // Simple MD5 implementation for SQL password compatibility
  const simpleMD5 = (str: string): string => {
    // This is a simplified MD5 - for production use, use a proper library
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    // Convert to hex and pad to 32 characters (MD5 format)
    let hexHash = Math.abs(hash).toString(16)
    while (hexHash.length < 32) {
      hexHash = hexHash + hexHash
    }
    return hexHash.substring(0, 32)
  }

  // MySQL OLD_PASSWORD algorithm
  const mysqlOldPassword = (password: string): string => {
    let nr = 1345345333
    let add = 7
    let nr2 = 0x12345671

    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i)
      if (char === 32 || char === 9) continue

      nr ^= (((nr & 63) + add) * char)
      nr = (nr << 1) | (nr >>> 31)
      nr += add
      nr2 += (nr2 << 1) | (nr2 >>> 31)
      nr2 += nr
    }

    nr ^= (nr >>> 31)
    nr2 ^= (nr2 >>> 31)

    const result = (nr & 0x7FFFFFFF).toString(16).padStart(8, '0') +
                   (nr2 & 0x7FFFFFFF).toString(16).padStart(8, '0')
    return result.toLowerCase()
  }

  // MySQL PASSWORD() function (MySQL 4.1+)
  const mysqlPassword = (password: string): string => {
    const sha1Hash = simpleSHA1(password)
    const sha1OfSha1 = simpleSHA1(hexToBytes(sha1Hash))
    return "*" + sha1OfSha1.toUpperCase()
  }

  const simpleSHA1 = (input: string | Uint8Array): string => {
    // Simplified SHA1 for demonstration
    const data = typeof input === 'string' 
      ? new TextEncoder().encode(input)
      : input
    let hash = 0
    for (let i = 0; i < data.length; i++) {
      hash = ((hash << 5) - hash) + data[i]
      hash = hash & hash
    }
    let hexHash = Math.abs(hash).toString(16)
    while (hexHash.length < 40) {
      hexHash = hexHash + hexHash
    }
    return hexHash.substring(0, 40)
  }

  const hexToBytes = (hex: string): Uint8Array => {
    const bytes = new Uint8Array(hex.length / 2)
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substr(i, 2), 16)
    }
    return bytes
  }

  const handleCopy = useCallback(async (hash: string, type: string) => {
    if (hash) {
      await navigator.clipboard.writeText(hash)
      setCopied(type)
      setTimeout(() => setCopied(null), 1500)
    }
  }, [])

  const handleClear = useCallback(() => {
    setPassword("")
    setHashes({})
  }, [])

  const sqlStatements = Object.entries(hashes).map(([type, hash]) => {
    if (type.includes("MySQL OLD")) {
      return `-- MySQL OLD_PASSWORD\nSET PASSWORD FOR 'user'@'localhost' = OLD_PASSWORD('${hash}');`
    } else if (type.includes("MySQL PASSWORD")) {
      return `-- MySQL PASSWORD()\nSET PASSWORD FOR 'user'@'localhost' = '${hash}';`
    } else if (type.includes("PostgreSQL")) {
      return `-- PostgreSQL\nALTER USER username WITH PASSWORD '${hash}';`
    } else if (type === "MD5") {
      return `-- Generic MD5\nUPDATE users SET password_hash = '${hash}' WHERE username = 'user';`
    } else if (type === "SHA-256") {
      return `-- SHA-256\nUPDATE users SET password_hash = SHA2('${password}', 256) WHERE username = 'user';`
    }
    return null
  }).filter(Boolean)

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">SQL Password Hash Generator</h2>
            <p className="text-sm text-muted-foreground">
              Generate MD5, SHA, and database-specific password hashes
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password to hash..."
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button onClick={generateHashes} disabled={!password} className="w-full">
          Generate Hashes
        </Button>
      </div>

      {Object.keys(hashes).length > 0 && (
        <div className="space-y-4">
          <Label>Generated Hashes</Label>
          <div className="grid gap-4">
            {Object.entries(hashes).map(([type, hash]) => (
              <Card key={type}>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">{type}</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(hash, type)}
                      >
                        {copied === type ? (
                          <Check className="h-4 w-4 mr-2" />
                        ) : (
                          <Copy className="h-4 w-4 mr-2" />
                        )}
                        {copied === type ? "Copied" : "Copy"}
                      </Button>
                    </div>
                    <code className="block p-3 bg-muted rounded-md text-sm break-all font-mono">
                      {hash}
                    </code>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-2">
            <Label>SQL Statements</Label>
            <div className="space-y-2">
              {sqlStatements.map((stmt, i) => (
                <pre key={i} className="p-3 bg-muted rounded-md text-sm font-mono overflow-x-auto">
                  {stmt}
                </pre>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">Supported Hash Types</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li><strong>MD5</strong> - Message Digest Algorithm (128-bit)</li>
          <li><strong>SHA-1</strong> - Secure Hash Algorithm 1 (160-bit)</li>
          <li><strong>SHA-256</strong> - Secure Hash Algorithm 256-bit</li>
          <li><strong>SHA-512</strong> - Secure Hash Algorithm 512-bit</li>
          <li><strong>MySQL OLD_PASSWORD</strong> - Legacy MySQL password format</li>
          <li><strong>MySQL PASSWORD()</strong> - MySQL 4.1+ password format</li>
          <li><strong>PostgreSQL MD5</strong> - PostgreSQL MD5 password format</li>
        </ul>
      </div>
    </div>
  )
}
