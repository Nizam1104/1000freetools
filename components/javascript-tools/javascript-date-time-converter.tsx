'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Copy, Download, RotateCcw, Check, Calendar } from 'lucide-react'
import { toast } from 'sonner'

export default function JavaScriptDateTimeConverter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'toTimestamp' | 'fromTimestamp' | 'format' | 'manipulate'>('toTimestamp')
  const [format, setFormat] = useState('YYYY-MM-DD HH:mm:ss')
  const [operation, setOperation] = useState<'add' | 'subtract'>('add')
  const [value, setValue] = useState(1)
  const [unit, setUnit] = useState<'days' | 'hours' | 'minutes' | 'seconds' | 'months' | 'years'>('days')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    try {
      let result = ''

      switch (mode) {
        case 'toTimestamp':
          const date1 = new Date(input || Date.now())
          result = `Unix Timestamp: ${Math.floor(date1.getTime() / 1000)}\nMilliseconds: ${date1.getTime()}\nISO String: ${date1.toISOString()}`
          break

        case 'fromTimestamp':
          const timestamp = parseInt(input)
          const date2 = new Date(input.length > 12 ? parseInt(input) : parseInt(input) * 1000)
          result = `Date: ${date2.toLocaleString()}\nISO: ${date2.toISOString()}\nUTC: ${date2.toUTCString()}`
          break

        case 'format':
          const date3 = new Date(input || Date.now())
          result = formatDate(date3, format)
          break

        case 'manipulate':
          const date4 = new Date(input || Date.now())
          const multiplier = operation === 'add' ? 1 : -1
          manipulateDate(date4, value * multiplier, unit)
          result = `Result: ${date4.toLocaleString()}\nISO: ${date4.toISOString()}\nTimestamp: ${Math.floor(date4.getTime() / 1000)}`
          break
      }

      setOutput(result)
      toast.success('Conversion complete')
    } catch (err) {
      toast.error('Invalid input. Please check your date/timestamp.')
      setOutput('')
    }
  }

  const formatDate = (date: Date, formatStr: string): string => {
    const replacements: Record<string, string | number> = {
      'YYYY': date.getFullYear(),
      'YY': String(date.getFullYear()).slice(-2),
      'MM': String(date.getMonth() + 1).padStart(2, '0'),
      'DD': String(date.getDate()).padStart(2, '0'),
      'HH': String(date.getHours()).padStart(2, '0'),
      'hh': String(date.getHours() % 12 || 12).padStart(2, '0'),
      'mm': String(date.getMinutes()).padStart(2, '0'),
      'ss': String(date.getSeconds()).padStart(2, '0'),
      'A': date.getHours() >= 12 ? 'PM' : 'AM',
      'a': date.getHours() >= 12 ? 'pm' : 'am',
      'dddd': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()],
      'ddd': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()],
      'MMMM': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()],
      'MMM': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()],
    }

    return formatStr.replace(/YYYY|YY|MM|DD|HH|hh|mm|ss|A|a|dddd|ddd|MMMM|MMM/g, (match) => {
      return String(replacements[match])
    })
  }

  const manipulateDate = (date: Date, amount: number, unit: string) => {
    switch (unit) {
      case 'days':
        date.setDate(date.getDate() + amount)
        break
      case 'hours':
        date.setHours(date.getHours() + amount)
        break
      case 'minutes':
        date.setMinutes(date.getMinutes() + amount)
        break
      case 'seconds':
        date.setSeconds(date.getSeconds() + amount)
        break
      case 'months':
        date.setMonth(date.getMonth() + amount)
        break
      case 'years':
        date.setFullYear(date.getFullYear() + amount)
        break
    }
  }

  const handleCopy = async () => {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Convert and Format JavaScript Dates & Times</h2>
        <p className="text-muted-foreground mt-2">
          Work with JavaScript dates, timestamps, and timezones effortlessly.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={mode === 'toTimestamp' ? 'default' : 'outline'}
            onClick={() => setMode('toTimestamp')}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Date to Timestamp
          </Button>
          <Button
            variant={mode === 'fromTimestamp' ? 'default' : 'outline'}
            onClick={() => setMode('fromTimestamp')}
          >
            Timestamp to Date
          </Button>
          <Button
            variant={mode === 'format' ? 'default' : 'outline'}
            onClick={() => setMode('format')}
          >
            Format Date
          </Button>
          <Button
            variant={mode === 'manipulate' ? 'default' : 'outline'}
            onClick={() => setMode('manipulate')}
          >
            Add/Subtract
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="input" className="text-base font-medium">
              {mode === 'toTimestamp' && 'Date (or leave empty for now)'}
              {mode === 'fromTimestamp' && 'Unix Timestamp'}
              {mode === 'format' && 'Date (or leave empty for now)'}
              {mode === 'manipulate' && 'Date (or leave empty for now)'}
            </Label>
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
          <Input
            id="input"
            placeholder={
              mode === 'toTimestamp' ? '2024-01-15 10:30:00' :
              mode === 'fromTimestamp' ? '1705312200' :
              mode === 'format' ? '2024-01-15' :
              '2024-01-15'
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="font-mono"
          />

          {mode === 'format' && (
            <div className="space-y-2">
              <Label>Format Pattern:</Label>
              <Input
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                placeholder="YYYY-MM-DD HH:mm:ss"
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                YYYY=year, MM=month, DD=day, HH=hour (24h), hh=hour (12h), mm=minutes, ss=seconds, A/AM/PM, dddd=day name, MMMM=month name
              </p>
            </div>
          )}

          {mode === 'manipulate' && (
            <div className="flex gap-4 items-center">
              <div className="flex gap-2">
                <Button
                  variant={operation === 'add' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setOperation('add')}
                >
                  Add
                </Button>
                <Button
                  variant={operation === 'subtract' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setOperation('subtract')}
                >
                  Subtract
                </Button>
              </div>
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(parseInt(e.target.value) || 0)}
                className="w-24"
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as any)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="days">Days</option>
                <option value="hours">Hours</option>
                <option value="minutes">Minutes</option>
                <option value="seconds">Seconds</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
          )}

          <Button onClick={convert} className="w-full">
            Convert
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Result</Label>
            <Button variant="outline" size="sm" onClick={handleCopy} disabled={!output}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <Card className="p-4 bg-muted min-h-[150px]">
            {output ? (
              <pre className="font-mono text-sm whitespace-pre-wrap">{output}</pre>
            ) : (
              <p className="text-muted-foreground text-sm">Result will appear here</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
