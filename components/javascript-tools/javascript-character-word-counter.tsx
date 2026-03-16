'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, RotateCcw, FileUp } from 'lucide-react'
import { toast } from 'sonner'

export default function JavaScriptCharacterWordCounter() {
  const [text, setText] = useState('')
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    lines: 0,
    paragraphs: 0,
    readingTime: '0 sec',
  })

  useEffect(() => {
    calculateStats(text)
  }, [text])

  const calculateStats = (input: string) => {
    const characters = input.length
    const charactersNoSpaces = input.replace(/\s/g, '').length
    const words = input.trim() ? input.trim().split(/\s+/).length : 0
    const sentences = input.split(/[.!?]+/).filter(s => s.trim()).length
    const lines = input.split('\n').length
    const paragraphs = input.split(/\n\s*\n/).filter(p => p.trim()).length
    
    const wordsPerMinute = 200
    const readingTimeSeconds = Math.ceil(words / wordsPerMinute * 60)
    const readingTime = readingTimeSeconds < 60 
      ? `${readingTimeSeconds} sec` 
      : `${Math.ceil(readingTimeSeconds / 60)} min`

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      lines,
      paragraphs,
      readingTime,
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setText(content)
      toast.success(`Loaded ${file.name}`)
    }
    reader.readAsText(file)
  }

  const handleCopy = async () => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard')
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleClear = () => {
    setText('')
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Count Characters, Words, and Lines</h1>
        <p className="text-muted-foreground mt-2">
          Analyze your text with precise counts and statistics including reading time estimation.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6 mb-6">
        <Card className="p-4 text-center">
          <p className="text-3xl font-bold">{stats.characters}</p>
          <p className="text-sm text-muted-foreground">Characters</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-3xl font-bold">{stats.charactersNoSpaces}</p>
          <p className="text-sm text-muted-foreground">No Spaces</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-3xl font-bold">{stats.words}</p>
          <p className="text-sm text-muted-foreground">Words</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-3xl font-bold">{stats.sentences}</p>
          <p className="text-sm text-muted-foreground">Sentences</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-3xl font-bold">{stats.lines}</p>
          <p className="text-sm text-muted-foreground">Lines</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-3xl font-bold">{stats.readingTime}</p>
          <p className="text-sm text-muted-foreground">Read Time</p>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="text" className="text-base font-medium">Text Input</Label>
          <div className="flex gap-2">
            <label>
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                accept=".txt,.md,.json,.js,.ts,.jsx,.tsx"
              />
              <Button variant="outline" size="sm" asChild>
                <span>
                  <FileUp className="h-4 w-4 mr-2" />
                  Upload
                </span>
              </Button>
            </label>
            <Button variant="outline" size="sm" onClick={handleCopy} disabled={!text}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>
        <Textarea
          id="text"
          placeholder="Enter or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[400px]"
        />
      </div>
    </div>
  )
}
