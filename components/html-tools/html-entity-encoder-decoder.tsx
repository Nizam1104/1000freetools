"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"

export function HtmlEntityEncoderDecoder() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [copied, setCopied] = useState(false)
  const [useNamedEntities, setUseNamedEntities] = useState(true)

  const htmlEntities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
    "©": "&copy;",
    "®": "&reg;",
    "™": "&trade;",
    "€": "&euro;",
    "£": "&pound;",
    "¥": "&yen;",
    "¢": "&cent;",
    "°": "&deg;",
    "±": "&plusmn;",
    "×": "&times;",
    "÷": "&divide;",
    "¼": "&frac14;",
    "½": "&frac12;",
    "¾": "&frac34;",
    "µ": "&micro;",
    "¶": "&para;",
    "·": "&middot;",
    "–": "&ndash;",
    "—": "&mdash;",
    "…": "&hellip;",
    "\u201c": "&ldquo;",
    "\u201d": "&rdquo;",
    "\u2018": "&lsquo;",
    "\u2019": "&rsquo;",
    "‹": "&lsaquo;",
    "›": "&rsaquo;",
    "¡": "&iexcl;",
    "¿": "&iquest;",
    "À": "&Agrave;",
    "Á": "&Aacute;",
    "Â": "&Acirc;",
    "Ã": "&Atilde;",
    "Ä": "&Auml;",
    "Å": "&Aring;",
    "Æ": "&AElig;",
    "Ç": "&Ccedil;",
    "È": "&Egrave;",
    "É": "&Eacute;",
    "Ê": "&Ecirc;",
    "Ë": "&Euml;",
    "Ì": "&Igrave;",
    "Í": "&Iacute;",
    "Î": "&Icirc;",
    "Ï": "&Iuml;",
    "Ð": "&ETH;",
    "Ñ": "&Ntilde;",
    "Ò": "&Ograve;",
    "Ó": "&Oacute;",
    "Ô": "&Ocirc;",
    "Õ": "&Otilde;",
    "Ö": "&Ouml;",
    "Ø": "&Oslash;",
    "Ù": "&Ugrave;",
    "Ú": "&Uacute;",
    "Û": "&Ucirc;",
    "Ü": "&Uuml;",
    "Ý": "&Yacute;",
    "Þ": "&THORN;",
    "ß": "&szlig;",
    "à": "&agrave;",
    "á": "&aacute;",
    "â": "&acirc;",
    "ã": "&atilde;",
    "ä": "&auml;",
    "å": "&aring;",
    "æ": "&aelig;",
    "ç": "&ccedil;",
    "è": "&egrave;",
    "é": "&eacute;",
    "ê": "&ecirc;",
    "ë": "&euml;",
    "ì": "&igrave;",
    "í": "&iacute;",
    "î": "&icirc;",
    "ï": "&iuml;",
    "ð": "&eth;",
    "ñ": "&ntilde;",
    "ò": "&ograve;",
    "ó": "&oacute;",
    "ô": "&ocirc;",
    "õ": "&otilde;",
    "ö": "&ouml;",
    "ø": "&oslash;",
    "ù": "&ugrave;",
    "ú": "&uacute;",
    "û": "&ucirc;",
    "ü": "&uuml;",
    "ý": "&yacute;",
    "þ": "&thorn;",
    "ÿ": "&yuml;",
    "α": "&alpha;",
    "β": "&beta;",
    "γ": "&gamma;",
    "δ": "&delta;",
    "ε": "&epsilon;",
    "ζ": "&zeta;",
    "η": "&eta;",
    "θ": "&theta;",
    "ι": "&iota;",
    "κ": "&kappa;",
    "λ": "&lambda;",
    "μ": "&mu;",
    "ν": "&nu;",
    "ξ": "&xi;",
    "ο": "&omicron;",
    "π": "&pi;",
    "ρ": "&rho;",
    "σ": "&sigma;",
    "τ": "&tau;",
    "υ": "&upsilon;",
    "φ": "&phi;",
    "χ": "&chi;",
    "ψ": "&psi;",
    "ω": "&omega;",
    "Ω": "&Omega;",
    "∞": "&infin;",
    "√": "&radic;",
    "∫": "&int;",
    "∑": "&sum;",
    "∏": "&prod;",
    "≠": "&ne;",
    "≤": "&le;",
    "≥": "&ge;",
    "≈": "&approx;",
    "≡": "&equiv;",
    "←": "&larr;",
    "→": "&rarr;",
    "↑": "&uarr;",
    "↓": "&darr;",
    "⇐": "&lArr;",
    "⇒": "&rArr;",
    "⇑": "&uArr;",
    "⇓": "&dArr;",
    "♠": "&spades;",
    "♣": "&clubs;",
    "♥": "&hearts;",
    "♦": "&diams;",
  }

  const namedEntityMap = new Map(Object.entries(htmlEntities))
  const reverseEntityMap = new Map(
    Object.entries(htmlEntities).map(([char, entity]) => [entity, char])
  )

  const encodeHTML = useCallback((text: string): string => {
    if (useNamedEntities) {
      return text.replace(/[&<>"'©®™€£¥¢°±×÷¼½¾µ¶·–—…"''''‹›¡¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿαβγδεζηθικλμνξοπρστυφχψωΩ∞√∫∑∏≠≤≥≈≡←→↑↓⇐⇒⇑⇓♠♣♥♦]/g, (char) => {
        return namedEntityMap.get(char) || `&#${char.charCodeAt(0)};`
      })
    } else {
      return text.replace(/[\u0080-\uFFFF]/g, (char) => `&#${char.charCodeAt(0)};`)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;")
    }
  }, [useNamedEntities])

  const decodeHTML = useCallback((text: string): string => {
    return text.replace(/&(#?[\w]+);/g, (match, entity) => {
      if (entity.startsWith("#")) {
        const code = parseInt(entity.slice(1), entity[1] === "x" ? 16 : 10)
        return String.fromCharCode(code)
      }
      return reverseEntityMap.get(match) || match
    })
  }, [])

  const handleConvert = useCallback(() => {
    try {
      const result = mode === "encode" ? encodeHTML(input) : decodeHTML(input)
      setOutput(result)
    } catch (error) {
      setOutput("Error: Conversion failed")
    }
  }, [input, mode, encodeHTML, decodeHTML])

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
  }, [])

  const handleSwap = useCallback(() => {
    setMode(mode === "encode" ? "decode" : "encode")
    setInput(output)
    setOutput(input)
  }, [mode, input, output])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">HTML Entity Encoder & Decoder</h2>
            <p className="text-sm text-muted-foreground">
              Convert special characters to HTML entities and back
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleSwap}>
            Swap Mode
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          variant={mode === "encode" ? "default" : "outline"}
          onClick={() => setMode("encode")}
        >
          Encode
        </Button>
        <Button
          variant={mode === "decode" ? "default" : "outline"}
          onClick={() => setMode("decode")}
        >
          Decode
        </Button>
        <label className="flex items-center gap-2 text-sm ml-auto">
          <input
            type="checkbox"
            checked={useNamedEntities}
            onChange={(e) => setUseNamedEntities(e.target.checked)}
            className="rounded border-gray-300"
            disabled={mode === "decode"}
          />
          Use named entities (&amp;nbsp;, &amp;copy;, etc.)
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">{mode === "encode" ? "Plain Text" : "Encoded HTML"}</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "Paste text to encode..." : "Paste encoded HTML to decode..."}
            className="min-h-[400px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleConvert} className="flex-1">
              {mode === "encode" ? "Encode" : "Decode"}
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">{mode === "encode" ? "Encoded HTML" : "Plain Text"}</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Result will appear here..."
            className="min-h-[400px] font-mono text-sm bg-muted"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleCopy} disabled={!output} className="flex-1">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
