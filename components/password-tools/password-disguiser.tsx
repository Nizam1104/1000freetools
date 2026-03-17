"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, Eye, EyeOff } from "lucide-react"

export default function PasswordDisguiser() {
  const [input, setInput] = useState<string>("")
  const [disguiseType, setDisguiseType] = useState<"dots" | "stars" | "random" | "emoji">("dots")
  const [output, setOutput] = useState<string>("")
  const [showOriginal, setShowOriginal] = useState<boolean>(false)
  const [copied, setCopied] = useState<string | null>(null)

  const disguisePassword = useCallback(() => {
    if (!input) return

    switch (disguiseType) {
      case "dots":
        setOutput("•".repeat(input.length))
        break
      case "stars":
        setOutput("*".repeat(input.length))
        break
      case "random":
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        let random = ""
        const array = new Uint32Array(input.length)
        crypto.getRandomValues(array)
        for (let i = 0; i < input.length; i++) {
          random += chars.charAt(array[i] % chars.length)
        }
        setOutput(random)
        break
      case "emoji":
        const emojis = ["🔒", "🔑", "🛡️", "⭐", "🔐", "🔏", "✨", "🎯"]
        let emojiStr = ""
        const emojiArray = new Uint32Array(input.length)
        crypto.getRandomValues(emojiArray)
        for (let i = 0; i < input.length; i++) {
          emojiStr += emojis[emojiArray[i] % emojis.length]
        }
        setOutput(emojiStr)
        break
    }
  }, [input, disguiseType])

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
    setOutput("")
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">Password</Label>
          <Button variant="ghost" size="xs" onClick={handleClear} className="h-7">
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>
        <Input
          id="input"
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter password to disguise..."
        />
      </section>

      {/* Disguise Type */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Disguise Type</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { value: "dots", label: "Dots (•••)" },
            { value: "stars", label: "Stars (***)" },
            { value: "random", label: "Random Chars" },
            { value: "emoji", label: "Emoji" },
          ].map((type) => (
            <Button
              key={type.value}
              variant={disguiseType === type.value ? "default" : "outline"}
              onClick={() => setDisguiseType(type.value as any)}
            >
              {type.label}
            </Button>
          ))}
        </div>
        <Button onClick={disguisePassword} disabled={!input} className="w-full">
          Disguise Password
        </Button>
      </section>

      {/* Output */}
      {output && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Disguised Output</Label>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowOriginal(!showOriginal)}
              >
                {showOriginal ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </Button>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(output, "output")}
                className="h-7"
              >
                {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className={cn(
              "font-mono text-lg",
              showOriginal ? "text-muted-foreground" : ""
            )}>
              {showOriginal ? input : output}
            </p>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            Length: {output.length} characters (same as original)
          </p>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Password Disguiser</h4>
            <p className="text-sm text-muted-foreground">
              Disguise passwords for safe sharing in screenshots, documentation,
              or support tickets. The disguised version maintains the same length
              as the original but hides the actual characters. Useful for
              demonstrating password requirements without revealing secrets.
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
