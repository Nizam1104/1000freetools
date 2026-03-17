"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Copy, Check, Trash2, Info, Shield, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PasswordPolicyGenerator() {
  const [minLength, setMinLength] = useState(8)
  const [maxLength, setMaxLength] = useState(128)
  const [requireUppercase, setRequireUppercase] = useState(true)
  const [requireLowercase, setRequireLowercase] = useState(true)
  const [requireNumbers, setRequireNumbers] = useState(true)
  const [requireSpecial, setRequireSpecial] = useState(true)
  const [specialChars, setSpecialChars] = useState("!@#$%^&*()_+-=[]{}|;:,.<>?")
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false)
  const [policyOutput, setPolicyOutput] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const generatePolicy = useCallback(() => {
    const rules: string[] = []
    
    rules.push(`- Minimum length: ${minLength} characters`)
    if (maxLength < 128) {
      rules.push(`- Maximum length: ${maxLength} characters`)
    }
    if (requireUppercase) {
      rules.push("- Must contain at least one uppercase letter (A-Z)")
    }
    if (requireLowercase) {
      rules.push("- Must contain at least one lowercase letter (a-z)")
    }
    if (requireNumbers) {
      rules.push("- Must contain at least one number (0-9)")
    }
    if (requireSpecial) {
      rules.push(`- Must contain at least one special character (${specialChars})`)
    }
    if (excludeAmbiguous) {
      rules.push("- Ambiguous characters excluded (I, l, 1, O, 0)")
    }

    const policy = `Password Policy Requirements:\n\n${rules.join("\n")}`
    setPolicyOutput(policy)
  }, [minLength, maxLength, requireUppercase, requireLowercase, requireNumbers, requireSpecial, specialChars, excludeAmbiguous])

  const generateRegex = useCallback(() => {
    let regex = "^"
    
    if (requireUppercase) regex += "(?=.*[A-Z])"
    if (requireLowercase) regex += "(?=.*[a-z])"
    if (requireNumbers) regex += "(?=.*[0-9])"
    if (requireSpecial) {
      const escaped = specialChars.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
      regex += `(?=[^${escaped}]*[${escaped}])`
    }
    
    if (excludeAmbiguous) {
      regex += "[^Il1O0]"
    } else {
      regex += "[A-Za-z0-9" + specialChars.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") + "]"
    }
    
    regex += `{${minLength},${maxLength}}$`
    
    return regex
  }, [minLength, maxLength, requireUppercase, requireLowercase, requireNumbers, requireSpecial, specialChars, excludeAmbiguous])

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
    setMinLength(8)
    setMaxLength(128)
    setRequireUppercase(true)
    setRequireLowercase(true)
    setRequireNumbers(true)
    setRequireSpecial(true)
    setPolicyOutput("")
  }, [])

  const regexPattern = policyOutput ? generateRegex() : ""

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Length Settings */}
      <section className="space-y-4">
        <Label className="text-base font-medium">Password Length</Label>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="min-length" className="text-sm">Minimum Length</Label>
            <span className="font-mono text-sm font-medium">{minLength}</span>
          </div>
          <Slider
            id="min-length"
            value={[minLength]}
            onValueChange={([v]) => setMinLength(v)}
            min={4}
            max={32}
            step={1}
          />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="max-length" className="text-sm">Maximum Length</Label>
            <span className="font-mono text-sm font-medium">{maxLength}</span>
          </div>
          <Slider
            id="max-length"
            value={[maxLength]}
            onValueChange={([v]) => setMaxLength(v)}
            min={minLength}
            max={128}
            step={1}
          />
        </div>
      </section>

      {/* Character Requirements */}
      <section className="space-y-4">
        <Label className="text-base font-medium">Character Requirements</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="require-uppercase"
              checked={requireUppercase}
              onCheckedChange={(v) => setRequireUppercase(v as boolean)}
            />
            <Label htmlFor="require-uppercase" className="text-sm font-normal cursor-pointer">
              Uppercase (A-Z)
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="require-lowercase"
              checked={requireLowercase}
              onCheckedChange={(v) => setRequireLowercase(v as boolean)}
            />
            <Label htmlFor="require-lowercase" className="text-sm font-normal cursor-pointer">
              Lowercase (a-z)
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="require-numbers"
              checked={requireNumbers}
              onCheckedChange={(v) => setRequireNumbers(v as boolean)}
            />
            <Label htmlFor="require-numbers" className="text-sm font-normal cursor-pointer">
              Numbers (0-9)
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="require-special"
              checked={requireSpecial}
              onCheckedChange={(v) => setRequireSpecial(v as boolean)}
            />
            <Label htmlFor="require-special" className="text-sm font-normal cursor-pointer">
              Special Characters
            </Label>
          </div>
        </div>
      </section>

      {/* Special Characters */}
      {requireSpecial && (
        <section className="space-y-2">
          <Label htmlFor="special-chars">Allowed Special Characters</Label>
          <Input
            id="special-chars"
            value={specialChars}
            onChange={(e) => setSpecialChars(e.target.value)}
          />
        </section>
      )}

      {/* Additional Options */}
      <section className="flex items-center gap-2">
        <Checkbox
          id="exclude-ambiguous"
          checked={excludeAmbiguous}
          onCheckedChange={(v) => setExcludeAmbiguous(v as boolean)}
        />
        <Label htmlFor="exclude-ambiguous" className="text-sm font-normal cursor-pointer">
          Exclude ambiguous characters (I, l, 1, O, 0)
        </Label>
      </section>

      {/* Generate Button */}
      <Button onClick={generatePolicy} className="w-full">
        <Shield className="size-4 mr-2" />
        Generate Policy
      </Button>

      {/* Policy Output */}
      {policyOutput && (
        <section className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Policy Requirements</Label>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(policyOutput, "policy")}
                className="h-7"
              >
                {copied === "policy" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <pre className="font-mono text-sm whitespace-pre-wrap">{policyOutput}</pre>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Regex Pattern</Label>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(regexPattern, "regex")}
                className="h-7"
              >
                {copied === "regex" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <pre className="font-mono text-xs break-all">{regexPattern}</pre>
            </div>
          </div>
        </section>
      )}

      <Button variant="ghost" size="sm" onClick={handleClear} className="w-full">
        <Trash2 className="size-4 mr-2" />
        Reset
      </Button>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Password Policies</h4>
            <p className="text-sm text-muted-foreground">
              Define password requirements for your application or organization.
              Strong password policies help protect user accounts by enforcing
              complexity requirements. The generated regex pattern can be used
              for client-side or server-side validation.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
