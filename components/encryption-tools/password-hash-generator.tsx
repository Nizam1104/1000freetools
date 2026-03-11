"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PasswordHashGenerator() {
  const [input, setInput] = useState<string>("")
  const [hashes, setHashes] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState<string | null>(null)
  const [algorithm, setAlgorithm] = useState<"SHA-256" | "SHA-512" | "MD5">("SHA-256")
  const [inputMode, setInputMode] = useState<"text" | "password">("text")

  const computeHash = useCallback(async (text: string, algo: string): Promise<string> => {
    if (algo === "MD5") {
      // Simple MD5 implementation
      const rotateLeft = (value: number, shift: number): number => (value << shift) | (value >>> (32 - shift))
      const addUnsigned = (x: number, y: number): number => {
        const lsw = (x & 0xFFFF) + (y & 0xFFFF)
        const msw = (x >> 16) + (y >> 16) + (lsw >> 16)
        return (msw << 16) | (lsw & 0xFFFF)
      }
      const F = (x: number, y: number, z: number): number => (x & y) | ((~x) & z)
      const G = (x: number, y: number, z: number): number => (x & z) | (y & (~z))
      const H = (x: number, y: number, z: number): number => x ^ y ^ z
      const I = (x: number, y: number, z: number): number => y ^ (x | (~z))
      
      const FF = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number => {
        a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac))
        return addUnsigned(rotateLeft(a, s), b)
      }
      const GG = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number => {
        a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac))
        return addUnsigned(rotateLeft(a, s), b)
      }
      const HH = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number => {
        a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac))
        return addUnsigned(rotateLeft(a, s), b)
      }
      const II = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number => {
        a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac))
        return addUnsigned(rotateLeft(a, s), b)
      }

      const convertToWordArray = (str: string): number[] => {
        const lWordCountBase = ((str.length + 8 - ((str.length + 8) % 64)) / 4) + 2
        const lWordArray = new Array(lWordCountBase - 1)
        let lByteCount = 0
        let lWordCount = 0
        while (lByteCount < str.length) {
          lWordCount = (lByteCount - (lByteCount % 4)) / 4
          const lBytePosition = (lByteCount % 4) * 8
          lWordArray[lWordCount] = lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition)
          lByteCount++
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4
        const lBytePosition = (lByteCount % 4) * 8
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition)
        lWordArray[lWordArray.length - 2] = str.length << 3
        lWordArray[lWordArray.length - 1] = str.length >>> 29
        return lWordArray
      }

      const wordToHex = (value: number): string => {
        let wordToHexValue = ""
        for (let count = 0; count <= 3; count++) {
          const byte = (value >>> (count * 8)) & 255
          wordToHexValue += "0" + byte.toString(16)
        }
        return wordToHexValue.substr(wordToHexValue.length - 2, 2)
      }

      let a = 0x67452301, b = 0xEFCDAB89, c = 0x98BADCFE, d = 0x10325476
      const S11 = 7, S12 = 12, S13 = 17, S14 = 22
      const S21 = 5, S22 = 9, S23 = 14, S24 = 20
      const S31 = 4, S32 = 11, S33 = 16, S34 = 23
      const S41 = 6, S42 = 10, S43 = 15, S44 = 21

      const words = convertToWordArray(text)
      for (let k = 0; k < words.length; k += 16) {
        const AA = a, BB = b, CC = c, DD = d
        a = FF(a, b, c, d, words[k + 0], S11, 0xD76AA478)
        d = FF(d, a, b, c, words[k + 1], S12, 0xE8C7B756)
        c = FF(c, d, a, b, words[k + 2], S13, 0x242070DB)
        b = FF(b, c, d, a, words[k + 3], S14, 0xC1BDCEEE)
        a = FF(a, b, c, d, words[k + 4], S11, 0xF57C0FAF)
        d = FF(d, a, b, c, words[k + 5], S12, 0x4787C62A)
        c = FF(c, d, a, b, words[k + 6], S13, 0xA8304613)
        b = FF(b, c, d, a, words[k + 7], S14, 0xFD469501)
        a = FF(a, b, c, d, words[k + 8], S11, 0x698098D8)
        d = FF(d, a, b, c, words[k + 9], S12, 0x8B44F7AF)
        c = FF(c, d, a, b, words[k + 10], S13, 0xFFFF5BB1)
        b = FF(b, c, d, a, words[k + 11], S14, 0x895CD7BE)
        a = FF(a, b, c, d, words[k + 12], S11, 0x6B901122)
        d = FF(d, a, b, c, words[k + 13], S12, 0xFD987193)
        c = FF(c, d, a, b, words[k + 14], S13, 0xA679438E)
        b = FF(b, c, d, a, words[k + 15], S14, 0x49B40821)
        a = GG(a, b, c, d, words[k + 1], S21, 0xF61E2562)
        d = GG(d, a, b, c, words[k + 6], S22, 0xC040B340)
        c = GG(c, d, a, b, words[k + 11], S23, 0x265E5A51)
        b = GG(b, c, d, a, words[k + 0], S24, 0xE9B6C7AA)
        a = GG(a, b, c, d, words[k + 5], S21, 0xD62F105D)
        d = GG(d, a, b, c, words[k + 10], S22, 0x2441453)
        c = GG(c, d, a, b, words[k + 15], S23, 0xD8A1E681)
        b = GG(b, c, d, a, words[k + 4], S24, 0xE7D3FBC8)
        a = GG(a, b, c, d, words[k + 9], S21, 0x21E1CDE6)
        d = GG(d, a, b, c, words[k + 14], S22, 0xC33707D6)
        c = GG(c, d, a, b, words[k + 3], S23, 0xF4D50D87)
        b = GG(b, c, d, a, words[k + 8], S24, 0x455A14ED)
        a = GG(a, b, c, d, words[k + 13], S21, 0xA9E3E905)
        d = GG(d, a, b, c, words[k + 2], S22, 0xFCEFA3F8)
        c = GG(c, d, a, b, words[k + 7], S23, 0x676F02D9)
        b = GG(b, c, d, a, words[k + 12], S24, 0x8D2A4C8A)
        a = HH(a, b, c, d, words[k + 5], S31, 0xFFFA3942)
        d = HH(d, a, b, c, words[k + 8], S32, 0x8771F681)
        c = HH(c, d, a, b, words[k + 11], S33, 0x6D9D6122)
        b = HH(b, c, d, a, words[k + 14], S34, 0xFDE5380C)
        a = HH(a, b, c, d, words[k + 1], S31, 0xA4BEEA44)
        d = HH(d, a, b, c, words[k + 4], S32, 0x4BDECFA9)
        c = HH(c, d, a, b, words[k + 7], S33, 0xF6BB4B60)
        b = HH(b, c, d, a, words[k + 10], S34, 0xBEBFBC70)
        a = HH(a, b, c, d, words[k + 13], S31, 0x289B7EC6)
        d = HH(d, a, b, c, words[k + 0], S32, 0xEAA127FA)
        c = HH(c, d, a, b, words[k + 3], S33, 0xD4EF3085)
        b = HH(b, c, d, a, words[k + 6], S34, 0x4881D05)
        a = HH(a, b, c, d, words[k + 9], S31, 0xD9D4D039)
        d = HH(d, a, b, c, words[k + 12], S32, 0xE6DB99E5)
        c = HH(c, d, a, b, words[k + 15], S33, 0x1FA27CF8)
        b = HH(b, c, d, a, words[k + 2], S34, 0xC4AC5665)
        a = II(a, b, c, d, words[k + 0], S41, 0xF4292244)
        d = II(d, a, b, c, words[k + 7], S42, 0x432AFF97)
        c = II(c, d, a, b, words[k + 14], S43, 0xAB9423A7)
        b = II(b, c, d, a, words[k + 5], S44, 0xFC93A039)
        a = II(a, b, c, d, words[k + 12], S41, 0x655B59C3)
        d = II(d, a, b, c, words[k + 3], S42, 0x8F0CCC92)
        c = II(c, d, a, b, words[k + 10], S43, 0xFFEFF47D)
        b = II(b, c, d, a, words[k + 1], S44, 0x85845DD1)
        a = II(a, b, c, d, words[k + 8], S41, 0x6FA87E4F)
        d = II(d, a, b, c, words[k + 15], S42, 0xFE2CE6E0)
        c = II(c, d, a, b, words[k + 6], S43, 0xA3014314)
        b = II(b, c, d, a, words[k + 13], S44, 0x4E0811A1)
        a = II(a, b, c, d, words[k + 4], S41, 0xF7537E82)
        d = II(d, a, b, c, words[k + 11], S42, 0xBD3AF235)
        c = II(c, d, a, b, words[k + 2], S43, 0x2AD7D2BB)
        b = II(b, c, d, a, words[k + 9], S44, 0xEB86D391)
        a = addUnsigned(a, AA)
        b = addUnsigned(b, BB)
        c = addUnsigned(c, CC)
        d = addUnsigned(d, DD)
      }
      return wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)
    }
    
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hashBuffer = await crypto.subtle.digest(algo, data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
  }, [])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    if (value) {
      Promise.all([
        computeHash(value, "SHA-256"),
        computeHash(value, "SHA-512"),
        computeHash(value, "MD5")
      ]).then(([sha256, sha512, md5]) => {
        setHashes({ "SHA-256": sha256, "SHA-512": sha512, "MD5": md5 })
      })
    } else {
      setHashes({})
    }
  }, [computeHash])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            Password / Text
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(input, "input")}
              className="h-7"
              disabled={!input}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => {
                setInput("")
                setHashes({})
              }}
              className="h-7"
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Textarea
          id="input"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          className={cn(
            "font-mono text-sm min-h-[100px]",
            inputMode === "password" && "blur-sm focus:blur-none transition-all"
          )}
          placeholder="Enter password or text to hash..."
        />
      </section>

      {/* Hash Outputs */}
      {Object.keys(hashes).length > 0 && (
        <section className="space-y-4">
          <Label className="text-base font-medium">Hash Results</Label>
          
          {(["SHA-256", "SHA-512", "MD5"] as const).map((algo) => (
            <div key={algo} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">{algo}</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => setAlgorithm(algo)}
                    className={cn("h-7", algorithm === algo ? "bg-primary text-primary-foreground" : "")}
                  >
                    Select
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => copyToClipboard(hashes[algo], algo)}
                    className="h-7"
                  >
                    {copied === algo ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border bg-muted/30 p-3">
                <code className="font-mono text-xs break-all">{hashes[algo]}</code>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="text-sm font-medium mb-2">About Password Hashing</h4>
        <p className="text-sm text-muted-foreground">
          For production password storage, use bcrypt, Argon2, or PBKDF2 with salt and multiple iterations.
          SHA-256/SHA-512 are fast hashes not suitable for password storage. MD5 is cryptographically broken
          and should only be used for non-security purposes like checksums.
        </p>
      </section>
    </div>
  )
}
