"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, ListTodo, Plus, Minus } from "lucide-react"

export function MarkdownTaskListGenerator() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [items, setItems] = useState<Array<{ text: string; checked: boolean }>>([])
  const [newItem, setNewItem] = useState("")

  const addItem = useCallback(() => {
    if (newItem.trim()) {
      setItems([...items, { text: newItem.trim(), checked: false }])
      setNewItem("")
    }
  }, [items, newItem])

  const removeItem = useCallback((index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }, [items])

  const toggleItem = useCallback((index: number) => {
    setItems(items.map((item, i) => 
      i === index ? { ...item, checked: !item.checked } : item
    ))
  }, [items])

  const moveItem = useCallback((index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= items.length) return
    
    const newItems = [...items]
    const temp = newItems[index]
    newItems[index] = newItems[newIndex]
    newItems[newIndex] = temp
    setItems(newItems)
  }, [items])

  const generateMarkdown = useCallback(() => {
    const markdown = items.map(item => 
      `- [${item.checked ? 'x' : ' '}] ${item.text}`
    ).join('\n')
    setOutput(markdown)
  }, [items])

  const parseInput = useCallback(() => {
    const lines = input.split('\n')
    const parsedItems: Array<{ text: string; checked: boolean }> = []

    for (const line of lines) {
      const match = line.match(/^- \[([ x])\] (.+)$/)
      if (match) {
        parsedItems.push({
          text: match[2],
          checked: match[1] === 'x'
        })
      } else if (line.trim()) {
        parsedItems.push({
          text: line.replace(/^[-*+]\s*/, ''),
          checked: false
        })
      }
    }

    setItems(parsedItems)
  }, [input])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setInput("")
    setOutput("")
    setItems([])
    setNewItem("")
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/markdown" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "task-list.md"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleClearCompleted = useCallback(() => {
    setItems(items.filter(item => !item.checked))
  }, [items])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Markdown Task List Generator</h2>
            <p className="text-sm text-muted-foreground">
              Create and manage Markdown task lists with checkboxes
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
          placeholder="Enter a new task..."
          className="flex-1 border rounded px-3 py-2 text-sm"
        />
        <Button onClick={addItem} size="sm">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {items.length > 0 && (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleItem(index)}
                className="rounded"
              />
              <span className={`flex-1 ${item.checked ? 'line-through text-muted-foreground' : ''}`}>
                {item.text}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveItem(index, 'up')}
                  disabled={index === 0}
                >
                  <Minus className="h-3 w-3 rotate-90" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveItem(index, 'down')}
                  disabled={index === items.length - 1}
                >
                  <Plus className="h-3 w-3 rotate-90" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(index)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button onClick={generateMarkdown} className="flex-1" disabled={items.length === 0}>
          <ListTodo className="h-4 w-4 mr-2" />
          Generate Markdown
        </Button>
        <Button onClick={parseInput} variant="outline" disabled={!input}>
          Parse Input
        </Button>
        <Button variant="outline" onClick={handleClearCompleted} disabled={!items.some(i => i.checked)}>
          Clear Completed
        </Button>
        <Button variant="outline" onClick={handleClear} title="Clear All">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {output && (
        <div className="space-y-4">
          <Label htmlFor="output">Markdown Output</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            className="min-h-[200px] font-mono text-sm bg-muted"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleCopy} disabled={!output} className="flex-1">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button variant="outline" onClick={handleDownload} disabled={!output} title="Download">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">Input Format</h3>
        <p className="text-sm text-muted-foreground">
          Paste existing task lists to parse them. Supported formats:
        </p>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li><code className="bg-background px-1 rounded">- [ ] Task</code> - Unchecked task</li>
          <li><code className="bg-background px-1 rounded">- [x] Task</code> - Checked task</li>
          <li><code className="bg-background px-1 rounded">- Task</code> - Regular list item</li>
        </ul>
      </div>
    </div>
  )
}
