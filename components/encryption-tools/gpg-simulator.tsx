"use client"

import * as React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Terminal, Key, Lock, Unlock, FileSignature, Shield, Info, Download, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

interface KeyInfo {
  id: string
  fingerprint: string
  userId: string
  algorithm: string
  keySize: number
  created: Date
  expires?: Date
}

interface TerminalLine {
  type: "command" | "output" | "error" | "success" | "prompt"
  content: string
  timestamp: Date
}

export default function GpgSimulator() {
  const [command, setCommand] = useState<string>("")
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([])
  const [keys, setKeys] = useState<KeyInfo[]>([])
  const [encryptedMessage, setEncryptedMessage] = useState<string>("")
  const [signedMessage, setSignedMessage] = useState<string>("")
  const [inputMessage, setInputMessage] = useState<string>("")
  const [recipientKey, setRecipientKey] = useState<string>("")
  const [signingKey, setSigningKey] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalLines])

  const addLine = useCallback((type: TerminalLine["type"], content: string) => {
    setTerminalLines(prev => [...prev, { type, content, timestamp: new Date() }])
  }, [])

  const generateKeyId = useCallback((): string => {
    const array = new Uint8Array(8)
    crypto.getRandomValues(array)
    return Array.from(array, b => b.toString(16).padStart(2, "0")).join("").toUpperCase()
  }, [])

  const generateFingerprint = useCallback((): string => {
    const array = new Uint8Array(20)
    crypto.getRandomValues(array)
    const hex = Array.from(array, b => b.toString(16).padStart(2, "0")).join("").toUpperCase()
    return hex.match(/.{1,4}/g)?.join(" ") || hex
  }, [])

  // Simulate gpg --gen-key
  const simulateGenKey = useCallback(async (userId: string, algorithm: string, keySize: number) => {
    addLine("command", `gpg --gen-key`)
    addLine("output", "gpg: Generating key pair...")
    addLine("output", "")
    addLine("output", "Please select what kind of key you want:")
    addLine("output", "   (1) RSA and RSA")
    addLine("output", "   (2) DSA and Elgamal")
    addLine("output", "   (3) DSA (sign only)")
    addLine("output", "   (4) RSA (sign only)")
    addLine("output", "Your selection? 1")
    addLine("output", "")

    await new Promise(r => setTimeout(r, 500))

    addLine("output", `RSA keys may be between 1024 and 4096 bits long.`)
    addLine("output", `What keysize do you want? (${keySize})`)
    addLine("output", "")

    await new Promise(r => setTimeout(r, 500))

    addLine("output", `Requested keysize is ${keySize} bits`)
    addLine("output", "")

    await new Promise(r => setTimeout(r, 500))

    addLine("output", "Please specify how long the key should be valid.")
    addLine("output", "         0 = key does not expire")
    addLine("output", "      <n>  = key expires in n days")
    addLine("output", "      <n>w = key expires in n weeks")
    addLine("output", "      <n>m = key expires in n months")
    addLine("output", "      <n>y = key expires in n years")
    addLine("output", "Key is valid for? (0) ")
    addLine("output", "")

    await new Promise(r => setTimeout(r, 500))

    addLine("output", `You selected this USER-ID:`)
    addLine("output", `    "${userId}"`)
    addLine("output", "")

    await new Promise(r => setTimeout(r, 800))

    addLine("output", "gpg: Generating random prime numbers...")

    await new Promise(r => setTimeout(r, 1000))

    addLine("output", "gpg: Computing key parameters...")

    await new Promise(r => setTimeout(r, 1000))

    const keyId = generateKeyId()
    const fingerprint = generateFingerprint()
    const created = new Date()

    const newKey: KeyInfo = {
      id: keyId,
      fingerprint,
      userId,
      algorithm,
      keySize,
      created,
    }

    setKeys(prev => [...prev, newKey])

    addLine("output", "gpg: Key generation complete!")
    addLine("output", "")
    addLine("success", `pub   ${keySize}/${algorithm} ${created.toISOString().split("T")[0]} [expires: never]`)
    addLine("success", `      ${fingerprint}`)
    addLine("success", `uid                   ${userId}`)
    addLine("success", `sub   ${keySize}/${algorithm} ${created.toISOString().split("T")[0]}`)
    addLine("output", "")
    addLine("output", "gpg: Note: This is a simulation. In real GPG, you would be prompted for a passphrase.")
  }, [addLine, generateKeyId, generateFingerprint])

  // Simulate gpg --list-keys
  const simulateListKeys = useCallback(() => {
    addLine("command", "gpg --list-keys")

    if (keys.length === 0) {
      addLine("output", "gpg: no keys found")
      return
    }

    addLine("output", "")
    keys.forEach(key => {
      addLine("output", `pub   ${key.keySize}/${key.algorithm} ${key.created.toISOString().split("T")[0]}`)
      addLine("output", `      ${key.fingerprint}`)
      addLine("output", `uid                   ${key.userId}`)
      addLine("output", `sub   ${key.keySize}/${key.algorithm} ${key.created.toISOString().split("T")[0]}`)
      addLine("output", "")
    })
  }, [addLine, keys])

  // Simulate gpg --encrypt
  const simulateEncrypt = useCallback(async (message: string, recipientId: string) => {
    const recipient = keys.find(k => k.id === recipientId || k.userId.includes(recipientId))

    if (!recipient) {
      addLine("command", `gpg --encrypt --recipient ${recipientId}`)
      addLine("error", `gpg: ${recipientId}: skipped: No public key`)
      addLine("error", "gpg: [stdin]: encryption failed: No public key")
      return
    }

    addLine("command", `gpg --encrypt --recipient ${recipient.userId}`)
    addLine("output", "gpg: Checking key validity...")

    await new Promise(r => setTimeout(r, 300))

    addLine("output", `gpg: Using public key ${recipient.fingerprint}`)
    addLine("output", `gpg: Encrypting with ${recipient.algorithm} ${recipient.keySize}-bit key`)

    await new Promise(r => setTimeout(r, 500))

    // Simulate encryption
    const encoder = new TextEncoder()
    const data = encoder.encode(message)
    const encryptedBytes = crypto.getRandomValues(new Uint8Array(data.length + 16))

    let binary = ""
    for (let i = 0; i < encryptedBytes.byteLength; i++) {
      binary += String.fromCharCode(encryptedBytes[i])
    }
    const base64Encrypted = btoa(binary)
    const lines = base64Encrypted.match(/.{1,64}/g) || []

    const encryptedOutput = `-----BEGIN PGP MESSAGE-----
Version: GnuPG v2

${lines.join("\n")}
-----END PGP MESSAGE-----`

    setEncryptedMessage(encryptedOutput)
    addLine("output", "gpg: Encryption successful!")
    addLine("success", "Encrypted message generated (see output below)")
  }, [addLine, keys])

  // Simulate gpg --decrypt
  const simulateDecrypt = useCallback(async (encryptedMessage: string) => {
    if (!encryptedMessage.trim()) {
      addLine("command", "gpg --decrypt")
      addLine("error", "gpg: no input provided")
      return
    }

    addLine("command", "gpg --decrypt encrypted.asc")
    addLine("output", "gpg: encrypted with")
    addLine("output", `gpg:              ${keys[0]?.keySize}-bit ${keys[0]?.algorithm} key, ID ${keys[0]?.id}, created ${keys[0]?.created.toISOString().split("T")[0]}`)
    addLine("output", `gpg:              "${keys[0]?.userId}"`)

    await new Promise(r => setTimeout(r, 500))

    // For simulation, we'll just show a placeholder decrypted message
    addLine("output", "gpg: decryption successful")
    addLine("success", "Decrypted content:")
    addLine("output", "---")
    addLine("output", "[Decrypted message would appear here]")
    addLine("output", "---")
  }, [addLine, keys])

  // Simulate gpg --sign
  const simulateSign = useCallback(async (message: string, keyId: string) => {
    const key = keys.find(k => k.id === keyId || k.userId.includes(keyId))

    if (!key) {
      addLine("command", `gpg --sign --local-user ${keyId}`)
      addLine("error", `gpg: ${keyId}: skipped: No secret key`)
      addLine("error", "gpg: signing failed: No secret key")
      return
    }

    addLine("command", `gpg --sign --local-user ${key.userId}`)
    addLine("output", "gpg: Using default hash algorithm SHA256")
    addLine("output", `gpg: Signing with ${key.algorithm} ${key.keySize}-bit key, ID ${key.id}`)

    await new Promise(r => setTimeout(r, 500))

    // Simulate signature
    const signatureBytes = crypto.getRandomValues(new Uint8Array(256))
    let binary = ""
    for (let i = 0; i < signatureBytes.byteLength; i++) {
      binary += String.fromCharCode(signatureBytes[i])
    }
    const base64Sig = btoa(binary)
    const lines = base64Sig.match(/.{1,64}/g) || []

    const signedOutput = `-----BEGIN PGP SIGNATURE-----
Version: GnuPG v2

${lines.join("\n")}
-----END PGP SIGNATURE-----`

    setSignedMessage(signedOutput)
    addLine("output", "gpg: Signature created")
    addLine("success", "Signed message generated (see output below)")
  }, [addLine, keys])

  // Simulate gpg --verify
  const simulateVerify = useCallback(async (message: string, signature: string) => {
    if (!message || !signature) {
      addLine("command", "gpg --verify")
      addLine("error", "gpg: no input provided")
      return
    }

    addLine("command", "gpg --verify signature.asc message.txt")
    addLine("output", "gpg: Signature made " + new Date().toUTCString())
    addLine("output", `gpg:                using ${keys[0]?.algorithm} key ID ${keys[0]?.id}`)
    addLine("output", `gpg:                "${keys[0]?.userId}"`)

    await new Promise(r => setTimeout(r, 500))

    // For simulation, always verify as valid
    addLine("success", "gpg: Good signature from \"" + keys[0]?.userId + "\"")
    addLine("output", "gpg: WARNING: This key is not certified with a trusted signature!")
    addLine("output", "gpg:          There is no indication that the signature belongs to the owner.")
    addLine("output", "Primary key fingerprint: " + keys[0]?.fingerprint)
  }, [addLine, keys])

  // Process command
  const processCommand = useCallback(async (cmd: string) => {
    const trimmedCmd = cmd.trim()
    if (!trimmedCmd) return

    const parts = trimmedCmd.split(/\s+/)
    const command = parts[0]
    const args = parts.slice(1)

    switch (command) {
      case "gpg":
      case "gpg2":
        if (args.includes("--gen-key") || args.includes("-k")) {
          const userId = "Test User <test@example.com>"
          const algorithm = "RSA"
          const keySize = 2048
          await simulateGenKey(userId, algorithm, keySize)
        } else if (args.includes("--list-keys") || args.includes("-k")) {
          simulateListKeys()
        } else if (args.includes("--encrypt") || args.includes("-e")) {
          const recipientIdx = args.indexOf("-r") !== -1 ? args.indexOf("-r") + 1 : args.indexOf("--recipient") + 1
          const recipient = recipientIdx > 0 && recipientIdx < args.length ? args[recipientIdx] : keys[0]?.id
          await simulateEncrypt(inputMessage || "Hello, World!", recipient || "")
        } else if (args.includes("--decrypt") || args.includes("-d")) {
          await simulateDecrypt(encryptedMessage)
        } else if (args.includes("--sign") || args.includes("-s")) {
          const localUserIdx = args.indexOf("-u") !== -1 ? args.indexOf("-u") + 1 : args.indexOf("--local-user") + 1
          const signer = localUserIdx > 0 && localUserIdx < args.length ? args[localUserIdx] : keys[0]?.id
          await simulateSign(inputMessage || "Hello, World!", signer || "")
        } else if (args.includes("--verify")) {
          await simulateVerify(inputMessage, signedMessage)
        } else if (args.includes("--help") || args.includes("-h")) {
          addLine("command", trimmedCmd)
          addLine("output", "GnuPG Simulator - Available commands:")
          addLine("output", "  --gen-key, -k     Generate a new key pair")
          addLine("output", "  --list-keys       List all keys")
          addLine("output", "  --encrypt, -e     Encrypt a message")
          addLine("output", "  --decrypt, -d     Decrypt a message")
          addLine("output", "  --sign, -s        Sign a message")
          addLine("output", "  --verify          Verify a signature")
          addLine("output", "  --help, -h        Show this help")
        } else {
          addLine("command", trimmedCmd)
          addLine("error", "gpg: unknown command. Use --help for available options.")
        }
        break
      case "clear":
        setTerminalLines([])
        break
      case "help":
        addLine("command", trimmedCmd)
        addLine("output", "GPG Command Simulator")
        addLine("output", "=====================")
        addLine("output", "Type GPG commands to simulate:")
        addLine("output", "  gpg --gen-key     Generate a new key pair")
        addLine("output", "  gpg --list-keys   List all keys")
        addLine("output", "  gpg --encrypt -r <key>  Encrypt message")
        addLine("output", "  gpg --decrypt     Decrypt message")
        addLine("output", "  gpg --sign        Sign message")
        addLine("output", "  gpg --verify      Verify signature")
        addLine("output", "  clear             Clear terminal")
        break
      default:
        addLine("command", trimmedCmd)
        addLine("error", `Command not found: ${command}`)
        addLine("output", "Type 'help' for available commands")
    }
  }, [addLine, simulateGenKey, simulateListKeys, simulateEncrypt, simulateDecrypt, simulateSign, simulateVerify, inputMessage, encryptedMessage, signedMessage, keys])

  const handleExecute = useCallback(() => {
    if (!command.trim()) return
    processCommand(command)
    setCommand("")
  }, [command, processCommand])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleExecute()
    }
  }, [handleExecute])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const clearTerminal = useCallback(() => {
    setTerminalLines([])
  }, [])

  const quickCommands = [
    { label: "Generate Key", command: "gpg --gen-key" },
    { label: "List Keys", command: "gpg --list-keys" },
    { label: "Encrypt", command: "gpg --encrypt -r test@example.com" },
    { label: "Decrypt", command: "gpg --decrypt" },
    { label: "Sign", command: "gpg --sign" },
    { label: "Verify", command: "gpg --verify" },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Quick Commands */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Quick Commands</Label>
        <div className="flex flex-wrap gap-2">
          {quickCommands.map((qc) => (
            <Button
              key={qc.label}
              variant="outline"
              size="sm"
              onClick={() => setCommand(qc.command)}
              className="text-xs"
            >
              {qc.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Terminal */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium flex items-center gap-2">
            <Terminal className="size-5" />
            GPG Terminal Simulator
          </Label>
          <Button variant="ghost" size="xs" onClick={clearTerminal} className="h-7">
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>

        <div
          ref={terminalRef}
          className="rounded-lg border bg-black text-green-400 font-mono text-sm p-4 h-80 overflow-y-auto"
        >
          {terminalLines.length === 0 && (
            <div className="text-muted-foreground">
              <p>GPG Command Line Simulator</p>
              <p>Type 'help' for available commands or click a quick command above.</p>
              <p className="mt-4">Try: gpg --gen-key</p>
            </div>
          )}

          {terminalLines.map((line, idx) => (
            <div
              key={idx}
              className={cn(
                "whitespace-pre-wrap",
                line.type === "command" && "text-white mt-4",
                line.type === "prompt" && "text-blue-400",
                line.type === "output" && "text-green-400",
                line.type === "error" && "text-red-400",
                line.type === "success" && "text-green-300 font-medium"
              )}
            >
              {line.type === "command" && <span className="text-blue-400">$ </span>}
              {line.content}
            </div>
          ))}

          {/* Input line */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-blue-400">$</span>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-white"
              placeholder="Enter GPG command..."
              autoComplete="off"
            />
          </div>
        </div>
      </section>

      {/* Message Input */}
      <section className="space-y-3">
        <Label htmlFor="message-input" className="text-base font-medium">Message Input</Label>
        <Textarea
          id="message-input"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="font-mono text-sm min-h-[80px]"
          placeholder="Enter message to encrypt or sign..."
        />
      </section>

      {/* Key Selection */}
      {keys.length > 0 && (
        <section className="space-y-3">
          <Label>Key Selection</Label>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="recipient" className="text-sm">Recipient (for encryption)</Label>
              <Select value={recipientKey} onValueChange={setRecipientKey}>
                <SelectTrigger id="recipient">
                  <SelectValue placeholder="Select recipient key" />
                </SelectTrigger>
                <SelectContent>
                  {keys.map((key) => (
                    <SelectItem key={key.id} value={key.id}>
                      {key.userId} ({key.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="signer" className="text-sm">Signing Key</Label>
              <Select value={signingKey} onValueChange={setSigningKey}>
                <SelectTrigger id="signer">
                  <SelectValue placeholder="Select signing key" />
                </SelectTrigger>
                <SelectContent>
                  {keys.map((key) => (
                    <SelectItem key={key.id} value={key.id}>
                      {key.userId} ({key.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>
      )}

      {/* Output Sections */}
      {encryptedMessage && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium flex items-center gap-2">
              <Lock className="size-5" />
              Encrypted Message
            </Label>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="xs" onClick={() => copyToClipboard(encryptedMessage, "encrypted")} className="h-7">
                {copied === "encrypted" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
              <Button variant="ghost" size="xs" onClick={() => {
                const blob = new Blob([encryptedMessage], { type: "text/plain" })
                const url = URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.href = url
                a.download = "encrypted.asc"
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                URL.revokeObjectURL(url)
              }} className="h-7">
                <Download className="size-3.5" />
                <span className="text-xs">Download</span>
              </Button>
            </div>
          </div>
          <Textarea
            value={encryptedMessage}
            readOnly
            className="font-mono text-xs min-h-[120px] bg-muted/30"
          />
        </section>
      )}

      {signedMessage && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium flex items-center gap-2">
              <FileSignature className="size-5" />
              Digital Signature
            </Label>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="xs" onClick={() => copyToClipboard(signedMessage, "signed")} className="h-7">
                {copied === "signed" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
              <Button variant="ghost" size="xs" onClick={() => {
                const blob = new Blob([signedMessage], { type: "text/plain" })
                const url = URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.href = url
                a.download = "signature.asc"
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                URL.revokeObjectURL(url)
              }} className="h-7">
                <Download className="size-3.5" />
                <span className="text-xs">Download</span>
              </Button>
            </div>
          </div>
          <Textarea
            value={signedMessage}
            readOnly
            className="font-mono text-xs min-h-[120px] bg-muted/30"
          />
        </section>
      )}

      {/* Generated Keys */}
      {keys.length > 0 && (
        <section className="space-y-3">
          <Label className="text-base font-medium flex items-center gap-2">
            <Key className="size-5" />
            Generated Keys
          </Label>
          <div className="rounded-lg border bg-muted/30 overflow-hidden">
            {keys.map((key, idx) => (
              <div key={key.id} className={cn(
                "p-4 space-y-2",
                idx < keys.length - 1 && "border-b"
              )}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="size-4 text-green-600 dark:text-green-400" />
                    <span className="font-medium">{key.userId}</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">{key.id}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Algorithm:</span>
                    <span className="ml-2 font-mono">{key.algorithm}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Key Size:</span>
                    <span className="ml-2 font-mono">{key.keySize} bits</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Created:</span>
                    <span className="ml-2 font-mono">{key.created.toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Fingerprint:</span>
                    <span className="ml-2 font-mono text-xs">{key.fingerprint.slice(0, 20)}...</span>
                  </div>
                </div>
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
            <h4 className="text-sm font-medium">About GPG (GNU Privacy Guard)</h4>
            <p className="text-sm text-muted-foreground">
              GPG is a free implementation of the OpenPGP standard. It allows you to encrypt and sign
              data and communications, and features a versatile key management system.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Common Commands:</strong><br />
              - <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">gpg --gen-key</code> Generate a new key pair<br />
              - <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">gpg --list-keys</code> List all public keys<br />
              - <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">gpg --encrypt -r recipient</code> Encrypt for a recipient<br />
              - <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">gpg --decrypt</code> Decrypt a message<br />
              - <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">gpg --sign</code> Sign a message<br />
              - <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">gpg --verify</code> Verify a signature
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> This is an educational simulator. Real GPG operations require
              the actual GPG software installed on your system.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
