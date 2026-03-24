'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check, Shield } from 'lucide-react'
import { toast } from 'sonner'

export default function JavaScriptObfuscator() {
  const [jsInput, setJsInput] = useState('')
  const [obfuscatedOutput, setObfuscatedOutput] = useState('')
  const [options, setOptions] = useState({
    compact: true,
    controlFlowFlattening: true,
    stringArray: true,
    deadCodeInjection: false,
  })
  const [copied, setCopied] = useState(false)

  const obfuscate = () => {
    try {
      let output = jsInput
      
      // Basic obfuscation transformations
      if (options.stringArray) {
        output = encodeStrings(output)
      }
      
      if (options.compact) {
        output = minifyBasic(output)
      }
      
      if (options.controlFlowFlattening) {
        output = addControlFlowFlattening(output)
      }
      
      if (options.deadCodeInjection) {
        output = injectDeadCode(output)
      }
      
      // Variable renaming (simple version)
      output = renameVariables(output)
      
      setObfuscatedOutput(output)
      toast.success('JavaScript obfuscated successfully')
    } catch (err) {
      toast.error('Failed to obfuscate. Please check your JavaScript syntax.')
    }
  }

  const encodeStrings = (code: string): string => {
    // Simple string encoding simulation
    return code.replace(/"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/g, (match) => {
      if (match.startsWith("'") && match.endsWith("'")) {
        return match
      }
      const encoded = btoa(unescape(encodeURIComponent(match.slice(1, -1))))
      return `atob("${encoded}")`
    })
  }

  const minifyBasic = (code: string): string => {
    return code
      .replace(/\/\/.*$/gm, '') // Remove single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
      .replace(/\s+/g, ' ') // Normalize whitespace
      .replace(/\s*([{};:,+\-*/=<>!&|()[\]])\s*/g, '$1') // Remove spaces around operators
      .trim()
  }

  const addControlFlowFlattening = (code: string): string => {
    // Add a simple control flow wrapper
    const wrapper = `
(function() {
  var _0x = function() {
    var _0x1 = true;
    return function(_0x2, _0x3) {
      var _0x4 = _0x1 ? function() {
        if (_0x3) {
          var _0x5 = _0x3(_0x2);
          _0x3 = null;
          return _0x5;
        }
      } : function() {};
      _0x1 = false;
      return _0x4;
    };
  }();
  (function() {
    _0x(this, function() {
      var _0x6 = new RegExp('function *\\( *\\)');
      var _0x7 = new RegExp('\\\\+\\\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)', 'i');
      var _0x8 = _0x('init');
      if (!_0x6.test(_0x8 + 'chain') || !_0x7.test(_0x8 + 'input')) {
        _0x('0');
      } else {
        _0x();
      }
    })();
  })();
})();
`.trim()
    return wrapper + '\n\n' + code
  }

  const injectDeadCode = (code: string): string => {
    const deadCode = `
var _0x_dead = typeof window !== 'undefined' ? window : global;
var _0x_check = (function() { var _0x_a = 1; var _0x_b = 2; return _0x_a + _0x_b; })();
if (false) { var _0x_unused = Math.random() * 100; }
`.trim()
    return deadCode + '\n\n' + code
  }

  const renameVariables = (code: string): string => {
    // Simple variable renaming (doesn't handle all edge cases)
    let varCounter = 0
    const varMap = new Map<string, string>()
    
    return code.replace(/\b(var|let|const)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g, (match, kind, name) => {
      if (name.length > 2 && !name.startsWith('_0x')) {
        if (!varMap.has(name)) {
          varMap.set(name, '_0x' + varCounter++)
        }
        return `${kind} ${varMap.get(name)}`
      }
      return match
    })
  }

  const handleCopy = async () => {
    if (!obfuscatedOutput) return
    try {
      await navigator.clipboard.writeText(obfuscatedOutput)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = () => {
    if (!obfuscatedOutput) return
    const blob = new Blob([obfuscatedOutput], { type: 'text/javascript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'obfuscated.js'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded obfuscated.js')
  }

  const handleClear = () => {
    setJsInput('')
    setObfuscatedOutput('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Obfuscate JavaScript Code for Protection</h2>
        <p className="text-muted-foreground mt-2">
          Protect your JavaScript source code from theft and reverse engineering with advanced obfuscation.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="js-input" className="text-base font-medium">JavaScript Input</Label>
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
          <Textarea
            id="js-input"
            placeholder="function greet(name) {
  return 'Hello, ' + name;
}"
            value={jsInput}
            onChange={(e) => setJsInput(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
          />
          
          <div className="space-y-2">
            <Label>Obfuscation Options:</Label>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={options.compact}
                  onChange={(e) => setOptions({ ...options, compact: e.target.checked })}
                  className="h-4 w-4"
                />
                Compact (Minify)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={options.controlFlowFlattening}
                  onChange={(e) => setOptions({ ...options, controlFlowFlattening: e.target.checked })}
                  className="h-4 w-4"
                />
                Control Flow Flattening
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={options.stringArray}
                  onChange={(e) => setOptions({ ...options, stringArray: e.target.checked })}
                  className="h-4 w-4"
                />
                String Array Encoding
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={options.deadCodeInjection}
                  onChange={(e) => setOptions({ ...options, deadCodeInjection: e.target.checked })}
                  className="h-4 w-4"
                />
                Dead Code Injection
              </label>
            </div>
          </div>

          <Button onClick={obfuscate} className="w-full">
            <Shield className="h-4 w-4 mr-2" />
            Obfuscate JavaScript
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Obfuscated Output</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!obfuscatedOutput}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!obfuscatedOutput}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Card className="p-4 bg-muted min-h-[400px]">
            {obfuscatedOutput ? (
              <pre className="font-mono text-xs whitespace-pre-wrap break-all">{obfuscatedOutput}</pre>
            ) : (
              <p className="text-muted-foreground text-sm">Obfuscated code will appear here</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
