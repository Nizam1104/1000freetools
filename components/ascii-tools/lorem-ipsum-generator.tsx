"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, RefreshCw } from "lucide-react"
import { Slider } from "@/components/ui/slider"

const words = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea',
  'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit',
  'voluptate', 'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur',
  'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt',
  'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
]

const paragraphs = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
  "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
]

type TextType = 'words' | 'sentences' | 'paragraphs'

export default function LoremIpsumGenerator() {
  const [amount, setAmount] = useState<number>(5)
  const [textType, setTextType] = useState<TextType>('paragraphs')
  const [includeClassic, setIncludeClassic] = useState<boolean>(true)
  const [generatedText, setGeneratedText] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const generateLoremIpsum = useCallback(() => {
    let result = ""

    if (textType === 'paragraphs') {
      const selectedParagraphs: string[] = []
      
      if (includeClassic) {
        selectedParagraphs.push(paragraphs[0])
      }

      for (let i = selectedParagraphs.length; i < amount; i++) {
        const randomIdx = Math.floor(Math.random() * paragraphs.length)
        selectedParagraphs.push(paragraphs[randomIdx])
      }

      result = selectedParagraphs.join("\n\n")
    } else if (textType === 'sentences') {
      const sentences: string[] = []
      
      if (includeClassic) {
        sentences.push("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
      }

      const sentenceStarters = [
        "Sed ut perspiciatis", "Nemo enim ipsam", "Neque porro quisquam",
        "Ut enim ad minim", "Duis aute irure", "Excepteur sint occaecat",
        "Quis autem vel eum", "At vero eos et", "Nam libero tempore",
        "Temporibus autem quibusdam"
      ]

      const sentenceEnders = [
        "voluptatem accusantium doloremque laudantium.",
        "ipsam voluptatem quia voluptas sit aspernatur.",
        "dolorem ipsum quia dolor sit amet.",
        "veniam, quis nostrud exercitation ullamco.",
        "dolor in reprehenderit in voluptate.",
        "cupidatat non proident, sunt in culpa.",
        "iure reprehenderit qui in ea voluptate.",
        "accusamus et iusto odio dignissimos.",
        "cumque nihil impedit quo minus.",
        "officiis debitis aut rerum necessitatibus."
      ]

      for (let i = sentences.length; i < amount; i++) {
        const starter = sentenceStarters[Math.floor(Math.random() * sentenceStarters.length)]
        const middle = words.slice(0, 5).sort(() => Math.random() - 0.5).join(' ')
        const ender = sentenceEnders[Math.floor(Math.random() * sentenceEnders.length)]
        sentences.push(`${starter}, ${middle} ${ender}`)
      }

      result = sentences.join(" ")
    } else if (textType === 'words') {
      const selectedWords: string[] = []
      
      for (let i = 0; i < amount; i++) {
        const randomWord = words[Math.floor(Math.random() * words.length)]
        selectedWords.push(randomWord)
      }

      result = selectedWords.join(" ")
    }

    setGeneratedText(result)
  }, [amount, textType, includeClassic])

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
    setGeneratedText("")
  }, [])

  React.useEffect(() => {
    generateLoremIpsum()
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Options */}
      <section className="space-y-4">
        {/* Amount Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Amount</Label>
            <span className="font-mono text-sm font-medium">
              {amount} {textType}
            </span>
          </div>
          <Slider
            value={[amount]}
            onValueChange={([v]) => setAmount(v)}
            min={textType === 'words' ? 10 : 1}
            max={textType === 'words' ? 200 : 20}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{textType === 'words' ? 10 : 1}</span>
            <span>{textType === 'words' ? 200 : 20}</span>
          </div>
        </div>

        {/* Text Type */}
        <div className="space-y-2">
          <Label className="text-sm">Generate</Label>
          <div className="flex gap-2">
            <Button
              variant={textType === 'paragraphs' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTextType('paragraphs')}
              className="flex-1"
            >
              Paragraphs
            </Button>
            <Button
              variant={textType === 'sentences' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTextType('sentences')}
              className="flex-1"
            >
              Sentences
            </Button>
            <Button
              variant={textType === 'words' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTextType('words')}
              className="flex-1"
            >
              Words
            </Button>
          </div>
        </div>

        {/* Classic First */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="include-classic"
            checked={includeClassic}
            onChange={(e) => setIncludeClassic(e.target.checked)}
            className="size-4 rounded border-gray-300"
          />
          <Label htmlFor="include-classic" className="text-sm font-normal cursor-pointer">
            Start with classic "Lorem ipsum dolor sit amet..."
          </Label>
        </div>

        {/* Generate Button */}
        <Button onClick={generateLoremIpsum} className="w-full">
          <RefreshCw className="size-4 mr-2" />
          Generate Lorem Ipsum
        </Button>
      </section>

      {/* Output */}
      {generatedText && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Generated Text</Label>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(generatedText, "output")}
                className="h-7"
              >
                {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
              <Button
                variant="ghost"
                size="xs"
                onClick={handleClear}
                className="h-7"
              >
                <Trash2 className="size-3.5" />
                <span className="text-xs">Clear</span>
              </Button>
            </div>
          </div>

          <Textarea
            value={generatedText}
            readOnly
            className="font-mono text-sm min-h-[200px] bg-muted/30"
          />

          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Characters: <span className="font-medium text-foreground">{generatedText.length}</span></span>
            <span>Words: <span className="font-medium text-foreground">{generatedText.split(/\s+/).filter(w => w).length}</span></span>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Lorem Ipsum</h4>
            <p className="text-sm text-muted-foreground">
              Lorem Ipsum is placeholder text commonly used in the graphic, print, and publishing industries 
              for previewing layouts and visual mockups. It's derived from sections 1.10.32 and 1.10.33 of 
              Cicero's "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil), written in 45 BC.
            </p>
            <p className="text-sm text-muted-foreground">
              The text has been scrambled and modified over the centuries, making it nonsensical Latin that 
              resembles real text without distracting readers with meaningful content.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
