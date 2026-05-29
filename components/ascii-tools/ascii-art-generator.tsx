"use client"
import { useState, useCallback, useEffect } from "react"
import figlet from "figlet"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Download } from "lucide-react"

export default function AsciiArtGenerator() {
  const [inputText, setInputText] = useState("Hello World")
  const [asciiOutput, setAsciiOutput] = useState("")
  const [font, setFont] = useState("Standard")
  const [fontSize, setFontSize] = useState(12)
  const [copied, setCopied] = useState(false)

  // Configure figlet to load fonts from a CDN and preload the ones we expose.
  // Without this, figlet tries to fetch from a relative ./fonts path, which 404s in Next.js.
  useEffect(() => {
    // Use a reliable CDN path for figlet fonts
    figlet.defaults({ fontPath: "https://cdn.jsdelivr.net/npm/figlet/fonts" })

    // Preload the fonts we offer in the UI to avoid race conditions and 404 surprises
    try {
      figlet.preloadFonts([
        "Standard",
        "Big",
        "Block",
        "Banner",
        "Doom",
        "Slant",
        "Small",
      ] as figlet.Fonts[], () => {})
    } catch (e) {
      // Swallow errors; fallback will still attempt on-demand fetch
      console.warn("Figlet font preload failed", e)
    }
  }, [])

  const generateAsciiArt = useCallback(() => {
    figlet.text(
      inputText || " ",
      { font: font as figlet.Fonts },  // ✅ font now passed
      (err, result) => {               // ✅ proper callback usage
        if (err) {
          console.error(err)
          return
        }
        setAsciiOutput(result || "")
      }
    )
  }, [inputText, font])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(asciiOutput)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error(err)
    }
  }

  const downloadAscii = () => {
    const blob = new Blob([asciiOutput], {
      type: "text/plain",
    })

    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "ascii-art.txt"

    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      <div className="space-y-2">
        <Label>Input Text</Label>

        <Textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text..."
          maxLength={100}
          className="font-mono"
        />
      </div>

      <div className="space-y-2">
        <Label>Font Style</Label>

        <Select value={font} onValueChange={setFont}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Standard">Standard</SelectItem>
            <SelectItem value="Big">Big</SelectItem>
            <SelectItem value="Block">Block</SelectItem>
            <SelectItem value="Banner">Banner</SelectItem>
            <SelectItem value="Doom">Doom</SelectItem>
            <SelectItem value="Slant">Slant</SelectItem>
            <SelectItem value="Small">Small</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        className="w-full"
        onClick={generateAsciiArt}
      >
        Generate ASCII Art
      </Button>

      {asciiOutput && (
        <div className="space-y-3">

          <div className="flex justify-between items-center">
            <Label>ASCII Art Output</Label>

            <div className="flex gap-2">

              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <>
                    <Check className="size-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="size-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={downloadAscii}
              >
                <Download className="size-4 mr-2" />
                Download
              </Button>

            </div>
          </div>

          <div className="border rounded-lg p-4 overflow-auto bg-muted/30">
            <pre
              className="font-mono whitespace-pre"
              style={{
                fontSize: `${fontSize}px`,
              }}
            >
              {asciiOutput}
            </pre>
          </div>

        </div>
      )}
    </div>
  )
}
