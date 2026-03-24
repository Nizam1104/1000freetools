'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Copy, RotateCcw, Check, CircleHelp } from 'lucide-react'
import { toast } from 'sonner'

export default function JavaScriptRegexTester() {
  const [regexPattern, setRegexPattern] = useState('')
  const [testString, setTestString] = useState('')
  const [flags, setFlags] = useState({
    global: true,
    ignoreCase: false,
    multiline: false,
    dotAll: false,
    unicode: false,
    sticky: false,
  })
  const [matches, setMatches] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const testRegex = () => {
    setError(null)
    try {
      if (!regexPattern) {
        setMatches([])
        return
      }

      let flagString = ''
      if (flags.global) flagString += 'g'
      if (flags.ignoreCase) flagString += 'i'
      if (flags.multiline) flagString += 'm'
      if (flags.dotAll) flagString += 's'
      if (flags.unicode) flagString += 'u'
      if (flags.sticky) flagString += 'y'

      const regex = new RegExp(regexPattern, flagString)
      const allMatches = []
      
      if (flags.global) {
        let match
        while ((match = regex.exec(testString)) !== null) {
          allMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          })
          if (match[0].length === 0) regex.lastIndex++
        }
      } else {
        const match = regex.exec(testString)
        if (match) {
          allMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          })
        }
      }

      setMatches(allMatches)
      toast.success(`Found ${allMatches.length} match${allMatches.length !== 1 ? 'es' : ''}`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid regular expression'
      setError(errorMessage)
      setMatches([])
      toast.error('Invalid regex pattern')
    }
  }

  const highlightedText = () => {
    if (!regexPattern || matches.length === 0) return testString
    
    try {
      let flagString = ''
      if (flags.global) flagString += 'g'
      if (flags.ignoreCase) flagString += 'i'
      if (flags.multiline) flagString += 'm'
      if (flags.dotAll) flagString += 's'
      
      const regex = new RegExp(`(${regexPattern})`, flagString)
      const parts = testString.split(regex)
      
      return parts.map((part, i) => {
        if (regex.test(part)) {
          return <mark key={i} className="bg-yellow-200 dark:bg-yellow-800 rounded px-0.5">{part}</mark>
        }
        return part
      })
    } catch {
      return testString
    }
  }

  const handleCopy = async () => {
    const result = JSON.stringify(matches, null, 2)
    if (!result || result === '[]') return
    try {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleClear = () => {
    setRegexPattern('')
    setTestString('')
    setMatches([])
    setError(null)
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Test and Debug JavaScript Regular Expressions</h2>
        <p className="text-muted-foreground mt-2">
          Build, test, and debug regex patterns for JavaScript with real-time matching and detailed results.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Label htmlFor="regex-pattern" className="text-base font-medium">Regex Pattern</Label>
            <div className="flex gap-2">
              <span className="flex items-center text-2xl font-mono">/</span>
              <Input
                id="regex-pattern"
                placeholder="\d{3}-\d{3}-\d{4}"
                value={regexPattern}
                onChange={(e) => setRegexPattern(e.target.value)}
                className="font-mono text-lg flex-1"
              />
              <span className="flex items-center text-2xl font-mono">/</span>
            </div>
            
            <div className="space-y-2">
              <Label>Flags:</Label>
              <div className="flex flex-wrap gap-3">
                <label className="flex items-center gap-2 text-sm font-mono">
                  <input
                    type="checkbox"
                    checked={flags.global}
                    onChange={(e) => setFlags({ ...flags, global: e.target.checked })}
                    className="h-4 w-4"
                  />
                  g (global)
                </label>
                <label className="flex items-center gap-2 text-sm font-mono">
                  <input
                    type="checkbox"
                    checked={flags.ignoreCase}
                    onChange={(e) => setFlags({ ...flags, ignoreCase: e.target.checked })}
                    className="h-4 w-4"
                  />
                  i (ignoreCase)
                </label>
                <label className="flex items-center gap-2 text-sm font-mono">
                  <input
                    type="checkbox"
                    checked={flags.multiline}
                    onChange={(e) => setFlags({ ...flags, multiline: e.target.checked })}
                    className="h-4 w-4"
                  />
                  m (multiline)
                </label>
                <label className="flex items-center gap-2 text-sm font-mono">
                  <input
                    type="checkbox"
                    checked={flags.dotAll}
                    onChange={(e) => setFlags({ ...flags, dotAll: e.target.checked })}
                    className="h-4 w-4"
                  />
                  s (dotAll)
                </label>
                <label className="flex items-center gap-2 text-sm font-mono">
                  <input
                    type="checkbox"
                    checked={flags.unicode}
                    onChange={(e) => setFlags({ ...flags, unicode: e.target.checked })}
                    className="h-4 w-4"
                  />
                  u (unicode)
                </label>
                <label className="flex items-center gap-2 text-sm font-mono">
                  <input
                    type="checkbox"
                    checked={flags.sticky}
                    onChange={(e) => setFlags({ ...flags, sticky: e.target.checked })}
                    className="h-4 w-4"
                  />
                  y (sticky)
                </label>
              </div>
            </div>

            <Button onClick={testRegex} className="w-full">
              Test Regex
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="test-string" className="text-base font-medium">Test String</Label>
              <Button variant="ghost" size="sm" onClick={handleClear}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
            <Textarea
              id="test-string"
              placeholder="Enter text to test against your regex pattern..."
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
            />
          </div>
        </div>

        {error && (
          <Card className="p-4 bg-destructive/10 border-destructive">
            <p className="text-destructive font-mono text-sm">{error}</p>
          </Card>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Match Results</Label>
            <Button variant="outline" size="sm" onClick={handleCopy} disabled={matches.length === 0}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>

          <Card className="p-4 bg-muted">
            {matches.length > 0 ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Found <strong className="text-foreground">{matches.length}</strong> match{matches.length !== 1 ? 'es' : ''}
                </p>
                <div className="space-y-2">
                  {matches.map((m, i) => (
                    <div key={i} className="p-3 bg-background rounded-md border">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                          Match {i + 1}
                        </span>
                        <span className="text-xs text-muted-foreground">Index: {m.index}</span>
                      </div>
                      <p className="font-mono text-sm bg-muted p-2 rounded">
                        <span className="text-green-600 dark:text-green-400">Match:</span> "{m.match}"
                      </p>
                      {m.groups && m.groups.length > 0 && (
                        <div className="mt-2 space-y-1">
                          <p className="text-xs text-muted-foreground">Capture Groups:</p>
                          {m.groups.map((g: string, j: number) => (
                            <p key={j} className="font-mono text-sm ml-4">
                              <span className="text-blue-600 dark:text-blue-400">${j + 1}:</span> "{g || '(empty)'}"
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                {regexPattern ? 'No matches found' : 'Enter a regex pattern and test string to see matches'}
              </p>
            )}
          </Card>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-medium">Highlighted Text</Label>
          <Card className="p-4 bg-muted min-h-[100px]">
            <pre className="font-mono text-sm whitespace-pre-wrap break-all">
              {testString ? highlightedText() : 'Enter text to see highlighted matches'}
            </pre>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <CircleHelp className="h-4 w-4" />
              Common Patterns
            </h3>
            <ul className="text-sm space-y-1 font-mono">
              <li><code className="bg-muted px-1 rounded">\d+</code> - One or more digits</li>
              <li><code className="bg-muted px-1 rounded">[a-zA-Z]+</code> - Letters</li>
              <li><code className="bg-muted px-1 rounded">\w+</code> - Word characters</li>
              <li><code className="bg-muted px-1 rounded">\s+</code> - Whitespace</li>
              <li><code className="bg-muted px-1 rounded">^\w+@\w+\.\w+$</code> - Email</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
