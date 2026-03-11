"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Copy, Check, Download, Trash2, Upload, Shuffle } from "lucide-react"

interface WordData {
  word: string
  count: number
  size: number
  color: string
  rotation: number
}

const COLOR_SCHEMES = {
  vibrant: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'],
  ocean: ['#0077B6', '#00B4D8', '#90E0EF', '#CAF0F8', '#03045E', '#023E8A', '#0096C7', '#48CAE4', '#ADE8F4', '#0077B6'],
  forest: ['#2D6A4F', '#40916C', '#52B788', '#74C69D', '#95D5B2', '#D8F3DC', '#1B4332', '#081C15', '#2D6A4F', '#40916C'],
  sunset: ['#FF6B35', '#F7C59F', '#EFEFD0', '#004E89', '#1A659E', '#FF6B35', '#FF9671', '#FFC75F', '#F9F871', '#FF6B35'],
  monochrome: ['#1a1a1a', '#333333', '#4d4d4d', '#666666', '#808080', '#999999', '#b3b3b3', '#cccccc', '#e6e6e6', '#ffffff'],
  rainbow: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3', '#FF1493', '#00CED1', '#32CD32'],
}

const STOP_WORDS = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'shall', 'can', 'need', 'dare', 'ought', 'used', 'it', 'its', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'we', 'they', 'what', 'which', 'who', 'whom', 'whose', 'where', 'when', 'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just', 'as', 'if', 'then', 'because', 'while', 'although', 'though', 'after', 'before', 'until', 'since', 'about', 'into', 'through', 'during', 'above', 'below', 'between', 'under', 'again', 'further', 'once', 'here', 'there', 'any', 'up', 'down', 'out', 'off', 'over', 'am']

export default function WordCloudGenerator() {
  const [textInput, setTextInput] = useState("The quick brown fox jumps over the lazy dog. The fox was very quick and the dog was very lazy. Quick foxes jump over lazy dogs every day. The quick brown fox is the fastest fox in the forest. Lazy dogs sleep all day while quick foxes hunt and play.")
  const [chartTitle, setChartTitle] = useState("Word Cloud")
  const [maxWords, setMaxWords] = useState(50)
  const [minWordLength, setMinWordLength] = useState(3)
  const [useStopWords, setUseStopWords] = useState(true)
  const [colorScheme, setColorScheme] = useState<'vibrant' | 'ocean' | 'forest' | 'sunset' | 'monochrome' | 'rainbow'>('vibrant')
  const [fontFamily, setFontFamily] = useState('Arial')
  const [rotation, setRotation] = useState<'none' | 'some' | 'many'>('some')
  const [shape, setShape] = useState<'rectangle' | 'circle' | 'diamond'>('rectangle')
  const [copied, setCopied] = useState<string | null>(null)

  const wordData = useMemo((): WordData[] => {
    const words = textInput.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length >= minWordLength)

    const wordCount: Record<string, number> = {}
    words.forEach(word => {
      if (useStopWords && STOP_WORDS.includes(word)) return
      wordCount[word] = (wordCount[word] || 0) + 1
    })

    const sorted = Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, maxWords)

    const maxCount = sorted[0]?.[1] || 1
    const minCount = sorted[sorted.length - 1]?.[1] || 1

    const colors = COLOR_SCHEMES[colorScheme]

    return sorted.map(([word, count], idx) => {
      const normalized = (count - minCount) / (maxCount - minCount || 1)
      const size = 12 + normalized * 36
      const colorIndex = Math.floor(normalized * (colors.length - 1))
      
      let rot = 0
      if (rotation === 'some' && idx % 3 === 0) rot = -90
      if (rotation === 'many') rot = idx % 2 === 0 ? 0 : -90

      return {
        word,
        count,
        size,
        color: colors[colorIndex] || colors[0],
        rotation: rot
      }
    })
  }, [textInput, maxWords, minWordLength, useStopWords, colorScheme, rotation])

  const totalWords = useMemo(() => {
    return wordData.reduce((sum, w) => sum + w.count, 0)
  }, [wordData])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const downloadChart = useCallback(() => {
    alert("Download functionality would export the word cloud as PNG/SVG")
  }, [])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setTextInput(content)
    }
    reader.readAsText(file)
  }, [])

  const shuffleWords = useCallback(() => {
    setTextInput(prev => {
      const words = prev.split(' ').sort(() => Math.random() - 0.5)
      return words.join(' ')
    })
  }, [])

  const wordPositions = useMemo(() => {
    const positions: { word: WordData; x: number; y: number }[] = []
    const centerX = 400
    const centerY = 250
    const placed: { x: number; y: number; width: number; height: number }[] = []

    const checkOverlap = (x: number, y: number, width: number, height: number) => {
      for (const p of placed) {
        if (
          x < p.x + p.width + 5 &&
          x + width + 5 > p.x &&
          y < p.y + p.height + 5 &&
          y + height + 5 > p.y
        ) {
          return true
        }
      }
      return false
    }

    const isInShape = (x: number, y: number, size: number) => {
      if (shape === 'circle') {
        const dx = x - centerX
        const dy = y - centerY
        return dx * dx + dy * dy <= 180 * 180
      }
      if (shape === 'diamond') {
        const dx = Math.abs(x - centerX)
        const dy = Math.abs(y - centerY)
        return dx + dy <= 200
      }
      return x >= 50 && x <= 750 && y >= 50 && y <= 450
    }

    wordData.forEach((wordData) => {
      const width = wordData.word.length * wordData.size * 0.6
      const height = wordData.size

      let placed_ = false
      let attempts = 0

      while (!placed_ && attempts < 100) {
        const angle = (attempts / 10) * Math.PI * 2
        const radius = 20 + attempts * 2
        let x = centerX + Math.cos(angle) * radius - width / 2
        let y = centerY + Math.sin(angle) * radius - height / 2

        if (wordData.rotation === -90) {
          const temp = width
          // Adjust position for rotated text
        }

        if (isInShape(x + width / 2, y + height / 2, wordData.size) && !checkOverlap(x, y, width, height)) {
          positions.push({ word: wordData, x, y })
          placed.push({ x, y, width, height })
          placed_ = true
        }
        attempts++
      }
    })

    return positions
  }, [wordData, shape])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Text Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="text-input" className="text-base font-medium">
            Text Input
          </Label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              id="file-upload"
              accept=".txt,.md"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button variant="ghost" size="xs" onClick={() => document.getElementById('file-upload')?.click()} className="h-7">
              <Upload className="size-3.5 mr-1" />
              <span className="text-xs">Import</span>
            </Button>
            <Button variant="ghost" size="xs" onClick={shuffleWords} className="h-7">
              <Shuffle className="size-3.5" />
              <span className="text-xs">Shuffle</span>
            </Button>
            <Button variant="ghost" size="xs" onClick={() => copyToClipboard(textInput, "input")} className="h-7">
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button variant="ghost" size="xs" onClick={() => setTextInput("")} className="h-7">
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>
        <Textarea
          id="text-input"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className="font-mono text-sm min-h-[150px]"
          placeholder="Enter or paste your text here..."
        />
        <p className="text-sm text-muted-foreground">
          Enter the text you want to visualize as a word cloud. Words will be sized by frequency.
        </p>
      </section>

      {/* Options */}
      <section className="space-y-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="chart-title" className="text-sm">Chart Title</Label>
            <Input
              id="chart-title"
              value={chartTitle}
              onChange={(e) => setChartTitle(e.target.value)}
              placeholder="Enter chart title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-words" className="text-sm">Max Words: {maxWords}</Label>
            <Slider
              id="max-words"
              value={[maxWords]}
              onValueChange={(v) => setMaxWords(v[0])}
              min={10}
              max={200}
              step={10}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="min-length" className="text-sm">Min Word Length: {minWordLength}</Label>
            <Slider
              id="min-length"
              value={[minWordLength]}
              onValueChange={(v) => setMinWordLength(v[0])}
              min={1}
              max={10}
              step={1}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="font-family" className="text-sm">Font Family</Label>
            <Select value={fontFamily} onValueChange={setFontFamily}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Arial">Arial</SelectItem>
                <SelectItem value="Georgia">Georgia</SelectItem>
                <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                <SelectItem value="Courier New">Courier New</SelectItem>
                <SelectItem value="Verdana">Verdana</SelectItem>
                <SelectItem value="Impact">Impact</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="color-scheme" className="text-sm">Color Scheme</Label>
            <Select value={colorScheme} onValueChange={(v) => setColorScheme(v as any)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vibrant">Vibrant</SelectItem>
                <SelectItem value="ocean">Ocean</SelectItem>
                <SelectItem value="forest">Forest</SelectItem>
                <SelectItem value="sunset">Sunset</SelectItem>
                <SelectItem value="monochrome">Monochrome</SelectItem>
                <SelectItem value="rainbow">Rainbow</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="rotation" className="text-sm">Rotation</Label>
            <Select value={rotation} onValueChange={(v) => setRotation(v as any)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="some">Some</SelectItem>
                <SelectItem value="many">Many</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="shape" className="text-sm">Shape</Label>
            <Select value={shape} onValueChange={(v) => setShape(v as any)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rectangle">Rectangle</SelectItem>
                <SelectItem value="circle">Circle</SelectItem>
                <SelectItem value="diamond">Diamond</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <Switch
              id="use-stop-words"
              checked={useStopWords}
              onCheckedChange={setUseStopWords}
            />
            <Label htmlFor="use-stop-words" className="text-sm cursor-pointer">Exclude Stop Words</Label>
          </div>
        </div>

        {/* Color Scheme Preview */}
        <div className="space-y-2">
          <Label className="text-sm">Color Scheme Preview</Label>
          <div className="flex h-8 rounded-md overflow-hidden">
            {COLOR_SCHEMES[colorScheme].map((color, idx) => (
              <div key={idx} className="flex-1" style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>
      </section>

      {/* Word Cloud Preview */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Word Cloud Preview</Label>
          <Button variant="outline" size="sm" onClick={downloadChart}>
            <Download className="size-4 mr-1" />
            Download
          </Button>
        </div>
        <div className="rounded-lg border bg-background p-6">
          <h3 className="text-lg font-semibold text-center mb-4">{chartTitle}</h3>
          <div className="h-[500px] relative overflow-hidden">
            {wordData.length > 0 ? (
              <svg className="w-full h-full" viewBox="0 0 800 500">
                <defs>
                  <clipPath id="circleClip">
                    <circle cx="400" cy="250" r="200" />
                  </clipPath>
                  <clipPath id="diamondClip">
                    <polygon points="400,50 750,250 400,450 50,250" />
                  </clipPath>
                </defs>
                <g clipPath={shape === 'circle' ? 'url(#circleClip)' : shape === 'diamond' ? 'url(#diamondClip)' : undefined}>
                  {wordPositions.map(({ word, x, y }, idx) => (
                    <text
                      key={idx}
                      x={x}
                      y={y + word.size * 0.35}
                      fill={word.color}
                      fontSize={word.size}
                      fontFamily={fontFamily}
                      fontWeight={word.count > 5 ? 'bold' : 'normal'}
                      transform={word.rotation ? `rotate(${word.rotation}, ${x + word.word.length * word.size * 0.3}, ${y + word.size * 0.35})` : undefined}
                      className="cursor-pointer hover:opacity-70 transition-opacity"
                    >
                      {word.word}
                    </text>
                  ))}
                </g>
              </svg>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Enter text to see the word cloud
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Word List */}
      {wordData.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Word Frequency ({wordData.length} words, {totalWords} total)</h3>
          </div>
          <div className="rounded-lg border bg-background overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-3 text-left font-medium">Word</th>
                  <th className="p-3 text-right font-medium">Count</th>
                  <th className="p-3 text-right font-medium">Frequency</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {wordData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-muted/30">
                    <td className="p-3 font-medium">{item.word}</td>
                    <td className="p-3 text-right">{item.count}</td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(item.count / wordData[0].count) * 100}%`,
                              backgroundColor: item.color
                            }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {((item.count / totalWords) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  )
}
