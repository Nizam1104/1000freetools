'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Copy, RotateCcw, Check, Link, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export default function JavaScriptUrlParser() {
  const [url, setUrl] = useState('')
  const [parsed, setParsed] = useState<any>(null)
  const [queryParams, setQueryParams] = useState<{ key: string; value: string }[]>([])
  const [newParam, setNewParam] = useState({ key: '', value: '' })
  const [builtUrl, setBuiltUrl] = useState('')
  const [copied, setCopied] = useState(false)

  const parseUrl = () => {
    try {
      const urlObj = new URL(url)
      setParsed({
        protocol: urlObj.protocol,
        hostname: urlObj.hostname,
        port: urlObj.port || 'none',
        pathname: urlObj.pathname,
        hash: urlObj.hash || 'none',
        origin: urlObj.origin,
      })
      
      const params: { key: string; value: string }[] = []
      urlObj.searchParams.forEach((value, key) => {
        params.push({ key, value })
      })
      setQueryParams(params)
      toast.success('URL parsed successfully')
    } catch (err) {
      toast.error('Invalid URL. Please enter a valid URL.')
      setParsed(null)
      setQueryParams([])
    }
  }

  const addQueryParam = () => {
    if (!newParam.key) return
    setQueryParams([...queryParams, { ...newParam }])
    setNewParam({ key: '', value: '' })
    toast.success('Parameter added')
  }

  const removeQueryParam = (index: number) => {
    setQueryParams(queryParams.filter((_, i) => i !== index))
    toast.success('Parameter removed')
  }

  const buildUrl = () => {
    try {
      const urlObj = new URL(url || 'http://example.com')
      
      // Clear existing params
      urlObj.search = ''
      
      // Add new params
      queryParams.forEach(param => {
        if (param.key) {
          urlObj.searchParams.append(param.key, param.value)
        }
      })
      
      setBuiltUrl(urlObj.toString())
      toast.success('URL built successfully')
    } catch (err) {
      toast.error('Please enter a base URL')
    }
  }

  const handleCopy = async () => {
    const textToCopy = parsed 
      ? JSON.stringify(parsed, null, 2) + '\n\nQuery Params:\n' + JSON.stringify(queryParams, null, 2)
      : builtUrl
    if (!textToCopy) return
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleClear = () => {
    setUrl('')
    setParsed(null)
    setQueryParams([])
    setBuiltUrl('')
    setNewParam({ key: '', value: '' })
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Parse URLs and Build Query Strings</h1>
        <p className="text-muted-foreground mt-2">
          Deconstruct any URL into its components or build a new one from scratch with query parameters.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="url" className="text-base font-medium">URL to Parse</Label>
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
          <div className="flex gap-2">
            <Input
              id="url"
              placeholder="https://example.com/path?name=value"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="font-mono"
            />
            <Button onClick={parseUrl}>
              <Link className="h-4 w-4 mr-2" />
              Parse
            </Button>
          </div>
        </div>

        {parsed && (
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">URL Components</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Protocol:</span>
                  <span className="font-mono">{parsed.protocol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hostname:</span>
                  <span className="font-mono">{parsed.hostname}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Port:</span>
                  <span className="font-mono">{parsed.port}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pathname:</span>
                  <span className="font-mono">{parsed.pathname}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hash:</span>
                  <span className="font-mono">{parsed.hash}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Origin:</span>
                  <span className="font-mono">{parsed.origin}</span>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Query Parameters</h3>
              {queryParams.length > 0 ? (
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {queryParams.map((param, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-muted rounded">
                      <div className="font-mono text-sm">
                        <span className="text-blue-600">{param.key}</span>
                        <span className="mx-2">=</span>
                        <span className="text-green-600">{param.value}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeQueryParam(i)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No query parameters found</p>
              )}
            </Card>
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Build URL with Query Parameters</h2>
          
          <div className="space-y-2">
            <Label>Base URL:</Label>
            <Input
              placeholder="https://example.com/api"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label>Add Query Parameters:</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Key"
                value={newParam.key}
                onChange={(e) => setNewParam({ ...newParam, key: e.target.value })}
                className="flex-1"
              />
              <Input
                placeholder="Value"
                value={newParam.value}
                onChange={(e) => setNewParam({ ...newParam, value: e.target.value })}
                className="flex-1"
              />
              <Button onClick={addQueryParam}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>

          <Button onClick={buildUrl} className="w-full">
            Build URL
          </Button>

          {builtUrl && (
            <Card className="p-4 bg-muted">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-base font-medium">Built URL</Label>
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="font-mono text-sm break-all">{builtUrl}</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
