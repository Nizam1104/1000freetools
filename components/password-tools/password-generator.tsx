"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Copy, Check, RefreshCw, Shield, ShieldAlert, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PasswordGenerator() {
  const [length, setLength] = useState<number>(16)
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true)
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true)
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true)
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true)
  const [excludeAmbiguous, setExcludeAmbiguous] = useState<boolean>(false)
  const [passwords, setPasswords] = useState<string[]>([])
  const [copied, setCopied] = useState<string | null>(null)

  const generatePassword = useCallback(() => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    const ambiguous = "Il1O0"

    let chars = ""
    if (includeUppercase) chars += uppercase
    if (includeLowercase) chars += lowercase
    if (includeNumbers) chars += numbers
    if (includeSymbols) chars += symbols

    if (excludeAmbiguous) {
      chars = chars.split("").filter(c => !ambiguous.includes(c)).join("")
    }

    if (chars.length === 0) {
      setPasswords([])
      return
    }

    // Ensure at least one character from each selected type
    const required: string[] = []
    if (includeUppercase && !excludeAmbiguous) required.push(uppercase[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] % uppercase.length)])
    else if (includeUppercase) required.push(uppercase.split("").filter(c => !ambiguous.includes(c))[Math.floor(Math.random() * (uppercase.length - ambiguous.length))])
    
    if (includeLowercase && !excludeAmbiguous) required.push(lowercase[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] % lowercase.length)])
    else if (includeLowercase) required.push(lowercase.split("").filter(c => !ambiguous.includes(c))[Math.floor(Math.random() * (lowercase.length - ambiguous.length))])
    
    if (includeNumbers && !excludeAmbiguous) required.push(numbers[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] % numbers.length)])
    else if (includeNumbers) required.push(numbers.split("").filter(c => !ambiguous.includes(c))[Math.floor(Math.random() * (numbers.length - ambiguous.length))])
    
    if (includeSymbols) required.push(symbols[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] % symbols.length)])

    // Generate random password
    const array = new Uint32Array(length)
    crypto.getRandomValues(array)
    
    let password = required.join("")
    for (let i = required.length; i < length; i++) {
      password += chars[array[i] % chars.length]
    }

    // Shuffle the password
    const shuffled = password.split("")
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = array[i] % (i + 1)
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    setPasswords([shuffled.join("")])
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeAmbiguous])

  const generateMultiple = useCallback((count: number) => {
    const newPasswords: string[] = []
    for (let i = 0; i < count; i++) {
      const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      const lowercase = "abcdefghijklmnopqrstuvwxyz"
      const numbers = "0123456789"
      const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"
      const ambiguous = "Il1O0"

      let chars = ""
      if (includeUppercase) chars += uppercase
      if (includeLowercase) chars += lowercase
      if (includeNumbers) chars += numbers
      if (includeSymbols) chars += symbols

      if (excludeAmbiguous) {
        chars = chars.split("").filter(c => !ambiguous.includes(c)).join("")
      }

      if (chars.length === 0) continue

      const array = new Uint32Array(length)
      crypto.getRandomValues(array)

      let password = ""
      for (let j = 0; j < length; j++) {
        password += chars[array[j] % chars.length]
      }
      newPasswords.push(password)
    }
    setPasswords(newPasswords)
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeAmbiguous])

  const calculateStrength = useCallback((password: string) => {
    let score = 0
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (password.length >= 16) score++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
    if (/\d/.test(password)) score++
    if (/[^a-zA-Z0-9]/.test(password)) score++
    
    if (score <= 2) return "weak"
    if (score <= 4) return "moderate"
    return "strong"
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

  React.useEffect(() => {
    generatePassword()
  }, [])

  const strength = passwords.length > 0 ? calculateStrength(passwords[0]) : null

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Generated Password Display */}
      {passwords.length > 0 && (
        <section className="space-y-3">
          {passwords.map((password, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 rounded-lg border bg-muted/30 p-4 font-mono text-lg break-all">
                  {password}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(password, `pwd-${idx}`)}
                  className="shrink-0"
                >
                  {copied === `pwd-${idx}` ? <Check className="size-5" /> : <Copy className="size-5" />}
                </Button>
              </div>
              {idx === 0 && strength && (
                <div className="flex items-center gap-2">
                  {strength === "strong" && <ShieldCheck className="size-4 text-green-500" />}
                  {strength === "moderate" && <Shield className="size-4 text-yellow-500" />}
                  {strength === "weak" && <ShieldAlert className="size-4 text-red-500" />}
                  <span className={cn(
                    "text-sm font-medium capitalize",
                    strength === "strong" && "text-green-500",
                    strength === "moderate" && "text-yellow-500",
                    strength === "weak" && "text-red-500"
                  )}>
                    {strength} password
                  </span>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Options */}
      <section className="space-y-4">
        {/* Length Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Password Length</Label>
            <span className="font-mono text-sm font-medium">{length} characters</span>
          </div>
          <Slider
            value={[length]}
            onValueChange={([v]) => setLength(v)}
            min={4}
            max={64}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>4</span>
            <span>64</span>
          </div>
        </div>

        {/* Character Type Options */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="uppercase"
              checked={includeUppercase}
              onCheckedChange={(v) => setIncludeUppercase(v as boolean)}
            />
            <Label htmlFor="uppercase" className="text-sm font-normal cursor-pointer">
              Uppercase (A-Z)
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="lowercase"
              checked={includeLowercase}
              onCheckedChange={(v) => setIncludeLowercase(v as boolean)}
            />
            <Label htmlFor="lowercase" className="text-sm font-normal cursor-pointer">
              Lowercase (a-z)
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="numbers"
              checked={includeNumbers}
              onCheckedChange={(v) => setIncludeNumbers(v as boolean)}
            />
            <Label htmlFor="numbers" className="text-sm font-normal cursor-pointer">
              Numbers (0-9)
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="symbols"
              checked={includeSymbols}
              onCheckedChange={(v) => setIncludeSymbols(v as boolean)}
            />
            <Label htmlFor="symbols" className="text-sm font-normal cursor-pointer">
              Symbols (!@#$...)
            </Label>
          </div>
        </div>

        {/* Additional Options */}
        <div className="flex items-center gap-2">
          <Checkbox
            id="exclude-ambiguous"
            checked={excludeAmbiguous}
            onCheckedChange={(v) => setExcludeAmbiguous(v as boolean)}
          />
          <Label htmlFor="exclude-ambiguous" className="text-sm font-normal cursor-pointer">
            Exclude ambiguous characters (I, l, 1, O, 0)
          </Label>
        </div>
      </section>

      {/* Generate Buttons */}
      <section className="flex gap-2">
        <Button onClick={generatePassword} className="flex-1">
          <RefreshCw className="size-4 mr-2" />
          Generate Password
        </Button>
        <Button variant="outline" onClick={() => generateMultiple(5)}>
          Generate 5
        </Button>
      </section>
    </div>
  )
}
