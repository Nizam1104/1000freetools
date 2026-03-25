'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { distance } from 'fastest-levenshtein'

// ─── Types ────────────────────────────────────────────────────────────────────

interface SearchIndex {
  [category: string]: {
    [toolPath: string]: string[]
  }
}

interface SearchResult {
  href: string
  label: string
  category: string
  keywords: string[]
  score: number
}

// ─── Synonym / Intent Map ─────────────────────────────────────────────────────

const SYNONYM_MAP: Record<string, string[]> = {
  mp3: ['audio', 'format', 'sound'],
  wav: ['audio', 'format', 'sound'],
  flac: ['audio', 'format', 'sound'],
  aac: ['audio', 'format', 'sound'],
  ogg: ['audio', 'format', 'sound'],
  m4a: ['audio', 'format', 'sound'],
  aiff: ['audio', 'format', 'sound'],
  mp4: ['video', 'format'],
  webm: ['video', 'format'],
  avi: ['video', 'format'],
  mov: ['video', 'format'],
  mkv: ['video', 'format'],
  wmv: ['video', 'format'],
  jpg: ['image', 'photo', 'jpeg'],
  jpeg: ['image', 'photo'],
  png: ['image', 'photo'],
  webp: ['image', 'format'],
  gif: ['image', 'animate'],
  bmp: ['image', 'format'],
  tiff: ['image', 'format'],
  ico: ['icon', 'favicon'],
  svg: ['vector', 'image'],
  pdf: ['document', 'export'],
  docx: ['document', 'word'],
  xlsx: ['excel', 'spreadsheet'],
  csv: ['data', 'spreadsheet', 'table'],
  json: ['data', 'format', 'api'],
  xml: ['data', 'format', 'markup'],
  yaml: ['config', 'format'],
  toml: ['config', 'format'],
  sql: ['database', 'query'],
  html: ['web', 'markup'],
  css: ['style', 'design'],
  markdown: ['md', 'text', 'format'],
  md: ['markdown', 'text'],
  hex: ['color', 'hexadecimal'],
  rgb: ['color'],
  hsl: ['color'],
  hsv: ['color'],
  cmyk: ['color', 'print'],
  base64: ['encode', 'encoding'],
  utf8: ['encoding', 'unicode'],
  utf16: ['encoding', 'unicode'],
  ascii: ['character', 'encoding'],
  compressor: ['compress', 'reduce', 'size'],
  compress: ['compressor', 'reduce', 'size'],
  shrink: ['compress', 'reduce', 'size'],
  optimize: ['compress', 'minify', 'reduce'],
  minify: ['compress', 'minifier', 'optimize'],
  minifier: ['minify', 'compress', 'optimize'],
  reduce: ['compress', 'compressor', 'shrink'],
  convert: ['converter', 'transform', 'change'],
  converter: ['convert', 'transform'],
  transform: ['convert', 'converter'],
  change: ['convert', 'converter', 'changer'],
  changer: ['change', 'convert', 'converter'],
  decode: ['decoder', 'read', 'parse'],
  decoder: ['decode', 'read'],
  encode: ['encoder', 'convert'],
  encoder: ['encode', 'convert'],
  extract: ['extractor', 'get', 'pull'],
  extractor: ['extract', 'get'],
  split: ['splitter', 'divide', 'separate'],
  splitter: ['split', 'divide'],
  merge: ['merger', 'combine', 'join'],
  merger: ['merge', 'combine'],
  join: ['merge', 'merger', 'combine'],
  combine: ['merge', 'join', 'merger'],
  trim: ['trimmer', 'cut', 'crop'],
  trimmer: ['trim', 'cut'],
  cut: ['trim', 'clip', 'crop'],
  crop: ['trim', 'cut', 'resize'],
  resize: ['scale', 'dimensions', 'resizer'],
  resizer: ['resize', 'scale'],
  flip: ['reverse', 'invert'],
  reverse: ['flip', 'backwards'],
  remove: ['remover', 'delete', 'strip'],
  remover: ['remove', 'delete'],
  generate: ['generator', 'create', 'make'],
  generator: ['generate', 'create', 'make'],
  create: ['generator', 'generate', 'make'],
  make: ['generator', 'create', 'generate'],
  validate: ['validator', 'check', 'verify'],
  validator: ['validate', 'check'],
  check: ['validate', 'checker', 'verify'],
  checker: ['check', 'validate'],
  edit: ['editor', 'modify'],
  editor: ['edit', 'modify'],
  view: ['viewer', 'preview'],
  viewer: ['view', 'preview'],
  analyze: ['analyzer', 'inspect'],
  analyser: ['analyzer', 'inspect'],
  analyzer: ['analyze', 'inspect'],
  scan: ['scanner', 'read', 'decode'],
  scanner: ['scan', 'read'],
  fix: ['repair', 'restore'],
  repair: ['fix', 'restore'],
  sort: ['sorter', 'order', 'arrange'],
  sorter: ['sort', 'order'],
  find: ['finder', 'search', 'lookup'],
  finder: ['find', 'search'],
  detect: ['detector', 'find'],
  detector: ['detect', 'find'],
  format: ['formatter', 'beautify'],
  formatter: ['format', 'beautify'],
  beautify: ['formatter', 'format'],
  calculate: ['calculator'],
  calculator: ['calculate'],
  count: ['counter'],
  counter: ['count'],
  read: ['reader', 'scan', 'viewer'],
  reader: ['read', 'viewer'],
  play: ['player', 'preview'],
  player: ['play', 'preview'],
  build: ['builder', 'create'],
  builder: ['build', 'create'],
  binary: ['bits', 'base2'],
  decimal: ['number', 'base10'],
  octal: ['base8'],
  hexadecimal: ['hex', 'base16'],
  pitch: ['key', 'tone', 'frequency'],
  tempo: ['speed', 'bpm'],
  bpm: ['tempo', 'beat'],
  volume: ['loudness', 'gain', 'level'],
  bass: ['eq', 'equalizer'],
  treble: ['eq', 'equalizer'],
  eq: ['equalizer', 'bass', 'treble'],
  equalizer: ['eq', 'bass', 'treble'],
  stereo: ['channels', 'mono'],
  mono: ['channel', 'stereo'],
  loop: ['repeat'],
  fade: ['transition'],
  waveform: ['wave', 'visualize'],
  bitrate: ['kbps', 'quality'],
  sample: ['rate', 'frequency'],
  normalize: ['normalizer', 'level'],
  qr: ['qrcode', 'barcode'],
  barcode: ['qr', 'code'],
  regex: ['regexp', 'pattern'],
  regexp: ['regex', 'pattern'],
  jwt: ['token', 'auth'],
  cron: ['schedule', 'job'],
  uuid: ['guid', 'unique'],
  guid: ['uuid'],
  hash: ['checksum', 'md5', 'sha'],
  md5: ['hash', 'checksum'],
  sha: ['hash', 'checksum'],
  sha256: ['hash'],
  sha512: ['hash'],
  bcrypt: ['hash', 'password'],
  hmac: ['hash', 'keyed'],
  image: ['photo', 'picture'],
  photo: ['image', 'picture'],
  picture: ['image', 'photo'],
  text: ['string', 'words'],
  string: ['text'],
  password: ['passphrase', 'secret'],
  color: ['colour', 'hue', 'shade'],
  colour: ['color', 'hue'],
  font: ['typeface', 'typography'],
  icon: ['favicon', 'symbol'],
  chart: ['graph', 'plot'],
  graph: ['chart', 'plot'],
  diagram: ['chart', 'flowchart'],
  table: ['grid', 'spreadsheet'],
  calendar: ['date', 'schedule'],
  timer: ['countdown', 'clock'],
  clock: ['time', 'timer'],
  slug: ['url', 'permalink'],
  watermark: ['stamp', 'overlay'],
  thumbnail: ['preview', 'image'],
  metadata: ['tags', 'info'],
  steganography: ['hide', 'secret'],
  palette: ['colors', 'scheme'],
  gradient: ['blend', 'transition'],
  lorem: ['placeholder', 'dummy'],
  ipsum: ['placeholder', 'dummy'],
  braille: ['tactile', 'accessibility'],
  morse: ['dots', 'dashes', 'code'],
  leet: ['1337', 'hacker'],
}

// ─── Weights ──────────────────────────────────────────────────────────────────

const W = {
  EXACT_FULL_SLUG: 120,
  URL_WORD_EXACT: 60,
  KEYWORD_EXACT: 80,
  CATEGORY_WORD_EXACT: 20,
  URL_WORD_PARTIAL: 18,
  KEYWORD_PARTIAL: 14,
  CATEGORY_WORD_PARTIAL: 6,
  SYNONYM_URL_EXACT: 28,
  SYNONYM_KEYWORD_EXACT: 20,
  SYNONYM_URL_PARTIAL: 10,
  SYNONYM_CATEGORY_EXACT: 14,
  MULTI_WORD_BONUS: 25,
  CONSECUTIVE_BONUS: 15,
  VAGUE_PENALTY: -8,
  // Coverage penalties
  NOISE_WORD_PENALTY: -8,   // per unmatched URL word (beyond threshold)
  COVERAGE_BONUS: 40,       // max bonus when all query terms map to URL words
  // Typo tolerance: fuzzy matches score at this fraction of their exact equivalent
  FUZZY_WEIGHT: 0.55,
}

// Broad vague terms that should not dominate scoring
const VAGUE = new Set([
  'tool', 'tools', 'converter', 'generator', 'calculator', 'maker',
  'editor', 'viewer', 'checker', 'analyzer', 'analyser', 'online', 'free',
  'best', 'simple', 'easy', 'fast', 'quick', 'new', 'top',
])

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugWords(s: string): string[] {
  return s.replace(/^\//, '').split('-').filter(Boolean)
}

function norm(s: string): string {
  return s.toLowerCase().trim()
}

function tokenize(s: string): string[] {
  return norm(s).split(/\s+/).filter(Boolean)
}

function prettyLabel(p: string): string {
  return slugWords(p).map(w => w[0].toUpperCase() + w.slice(1)).join(' ')
}

function prettyCategory(c: string): string {
  return slugWords(c).map(w => w[0].toUpperCase() + w.slice(1)).join(' ')
}

// ─── Typo Tolerance ──────────────────────────────────────────────────────────

/**
 * Build a deduplicated vocabulary from all slug words and keyword tokens in
 * the search index.  Called once per search() invocation and passed down so
 * we pay the cost only once.
 */
function buildVocabulary(index: SearchIndex): string[] {
  const vocab = new Set<string>()
  for (const [category, tools] of Object.entries(index)) {
    for (const w of slugWords(category)) vocab.add(norm(w))
    for (const [toolPath, keywords] of Object.entries(tools)) {
      for (const w of slugWords(toolPath)) vocab.add(norm(w))
      for (const kw of keywords) {
        for (const w of norm(kw).split(/\s+/)) vocab.add(w)
      }
    }
  }
  // Also add every key of SYNONYM_MAP so common terms are always reachable
  for (const k of Object.keys(SYNONYM_MAP)) vocab.add(k)
  return Array.from(vocab).filter(w => w.length > 1)
}

/**
 * Maximum edit distance allowed for a given token length.
 * Very short words (≤3 chars) require an exact match to avoid noise.
 * 4-6 chars → allow 1 typo.  7+ chars → allow 2 typos.
 */
function maxDist(len: number): number {
  if (len <= 3) return 0
  if (len <= 6) return 1
  return 2
}

/**
 * Return vocabulary words that are within edit distance of `token`.
 * Results are marked as fuzzy so the scorer can discount them.
 */
function fuzzyMatches(token: string, vocab: string[]): string[] {
  const threshold = maxDist(token.length)
  if (threshold === 0) return []
  return vocab.filter(
    w =>
      w !== token &&
      // quick length gate — Levenshtein can never be < |len diff|
      Math.abs(w.length - token.length) <= threshold &&
      distance(token, w) <= threshold,
  )
}

function expandToken(
  token: string,
  vocab?: string[],
): { term: string; isSynonym: boolean; isFuzzy: boolean }[] {
  const syns = SYNONYM_MAP[token] ?? []
  const expanded = syns.flatMap(s => s.split(/\s+/))

  const base: { term: string; isSynonym: boolean; isFuzzy: boolean }[] = [
    { term: token, isSynonym: false, isFuzzy: false },
    ...expanded.map(t => ({ term: t, isSynonym: true, isFuzzy: false })),
  ]

  if (vocab) {
    const fuzzy = fuzzyMatches(token, vocab)
    for (const fuzzyTerm of fuzzy) {
      // Also expand synonyms of the fuzzy-matched word
      const fuzzySyns = (SYNONYM_MAP[fuzzyTerm] ?? []).flatMap(s => s.split(/\s+/))
      base.push({ term: fuzzyTerm, isSynonym: false, isFuzzy: true })
      for (const fs of fuzzySyns) {
        base.push({ term: fs, isSynonym: true, isFuzzy: true })
      }
    }
  }

  return base
}

// ─── Scoring ──────────────────────────────────────────────────────────────────

function scoreEntry(
  queryTokens: string[],
  category: string,
  toolPath: string,
  keywords: string[],
  vocab: string[],
): number {
  const toolSlug = norm(toolPath.replace(/\//g, '').replace(/-/g, ' '))
  const fullQuery = queryTokens.join(' ')

  const catWords = slugWords(category).map(norm)
  const toolWordList = slugWords(toolPath).map(norm)
  const normKws = keywords.map(kw => norm(kw))
  const kwTokens = normKws.flatMap(kw => kw.split(/\s+/))

  // All tokens that are queryable (category + tool slug words)
  const allUrlWords = [...catWords, ...toolWordList]

  let score = 0

  // ── 1. Full slug match ────────────────────────────────────────────────────
  if (toolSlug === fullQuery) {
    score += W.EXACT_FULL_SLUG
  } else if (fullQuery.length > 2 && toolSlug.includes(fullQuery)) {
    score += W.EXACT_FULL_SLUG * 0.65
  }

  const nonVague = queryTokens.filter(t => !VAGUE.has(t))
  let hitCount = 0
  // Track which tool URL words were "explained" by a query token
  const matchedToolWords = new Set<number>()

  // ── 2. Per-token scoring ──────────────────────────────────────────────────
  for (const rawToken of queryTokens) {
    if (VAGUE.has(rawToken)) {
      score += W.VAGUE_PENALTY
      continue
    }

    const expanded = expandToken(rawToken, vocab)
    let tokenHit = false

    for (const { term, isSynonym, isFuzzy } of expanded) {
      // Fuzzy matches are discounted so exact/synonym hits always rank higher
      const fuzzyMul = isFuzzy ? W.FUZZY_WEIGHT : 1

      // URL word exact
      const exactIdx = toolWordList.findIndex(w => w === term)
      if (exactIdx !== -1) {
        score += Math.round((isSynonym ? W.SYNONYM_URL_EXACT : W.URL_WORD_EXACT) * fuzzyMul)
        matchedToolWords.add(exactIdx)
        tokenHit = true
      } else {
        // URL word partial
        const partialIdx = toolWordList.findIndex(w => w.includes(term) || term.includes(w))
        if (partialIdx !== -1) {
          score += Math.round((isSynonym ? W.SYNONYM_URL_PARTIAL : W.URL_WORD_PARTIAL) * fuzzyMul)
          matchedToolWords.add(partialIdx)
          tokenHit = true
        }
      }

      // Keyword exact
      if (normKws.some(kw => kw === term) || kwTokens.includes(term)) {
        score += Math.round((isSynonym ? W.SYNONYM_KEYWORD_EXACT : W.KEYWORD_EXACT) * fuzzyMul)
        tokenHit = true
      } else if (normKws.some(kw => kw.includes(term) || term.includes(kw))) {
        score += Math.round((isSynonym ? W.SYNONYM_URL_PARTIAL : W.KEYWORD_PARTIAL) * fuzzyMul)
        tokenHit = true
      }

      // Category word
      if (catWords.includes(term)) {
        score += Math.round((isSynonym ? W.SYNONYM_CATEGORY_EXACT : W.CATEGORY_WORD_EXACT) * fuzzyMul)
        tokenHit = true
      } else if (catWords.some(w => w.includes(term) || term.includes(w))) {
        score += Math.round(W.CATEGORY_WORD_PARTIAL * fuzzyMul)
        tokenHit = true
      }
    }

    if (tokenHit) hitCount++
  }

  // ── 3. Multi-word bonus ───────────────────────────────────────────────────
  if (nonVague.length > 1 && hitCount === nonVague.length) {
    score += W.MULTI_WORD_BONUS
  }

  // ── 4. Consecutive match bonus ────────────────────────────────────────────
  const urlStr = allUrlWords.join(' ')
  if (fullQuery.length > 2 && urlStr.includes(fullQuery)) {
    score += W.CONSECUTIVE_BONUS
  }

  // ── 5. Coverage ratio bonus ───────────────────────────────────────────────
  // Reward URLs where query terms cover a high proportion of the URL words.
  // This prevents a URL like /svg-tools/svg-to-base64-encoder from beating
  // /encoding-tools/base64-encoder-decoder when user only typed "base64 encoder".
  //
  // matchedToolWords = how many tool slug words were explained by a query token
  // toolWordList.length = total tool slug words
  //
  // If ALL query terms appear in URL words, ratio = 1 → full bonus
  // If only 1 of 4 URL words is matched, ratio is low → smaller bonus

  if (toolWordList.length > 0 && matchedToolWords.size > 0) {
    const coverageRatio = matchedToolWords.size / toolWordList.length
    score += Math.round(W.COVERAGE_BONUS * coverageRatio)
  }

  // ── 6. Noise penalty ─────────────────────────────────────────────────────
  // Penalise each unmatched URL word — extra words that have nothing to do
  // with the query dilute relevance.
  // We only penalise words beyond the matched set (i.e. "extra baggage").
  // A small grace of 1 unmatched word is free (handles helper words like
  // "and", "to", "from" in slugs).

  const unmatchedCount = toolWordList.length - matchedToolWords.size
  const penalisedUnmatched = Math.max(0, unmatchedCount - 1)
  score += penalisedUnmatched * W.NOISE_WORD_PENALTY

  return Math.max(score, 0)
}

// ─── Search ───────────────────────────────────────────────────────────────────

function search(query: string, index: SearchIndex, limit = 8): SearchResult[] {
  const tokens = tokenize(query)
  if (!tokens.length) return []

  // Build vocabulary once per search call for typo tolerance
  const vocab = buildVocabulary(index)

  const results: SearchResult[] = []

  for (const [category, tools] of Object.entries(index)) {
    for (const [toolPath, keywords] of Object.entries(tools)) {
      const score = scoreEntry(tokens, category, toolPath, keywords, vocab)
      if (score <= 0) continue
      results.push({
        href: `${category}${toolPath}`,
        label: prettyLabel(toolPath),
        category: prettyCategory(category),
        keywords,
        score,
      })
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit)
}

// ─── Result Item ──────────────────────────────────────────────────────────────

function ResultItem({
  result,
  isActive,
}: {
  result: SearchResult
  isActive: boolean
}) {
  return (
    <a
      href={result.href}
      className={`flex items-center gap-3 px-4 py-3 border-l-2 no-underline transition-colors ${
        isActive
          ? 'bg-blue-50 border-blue-500'
          : 'border-transparent hover:bg-gray-50 hover:border-gray-200'
      }`}
    >
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-800">{result.label}</div>
        <div className="text-xs text-gray-400 font-mono">{result.href}</div>
      </div>
    </a>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function UniversalSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [searchIndex, setSearchIndex] = useState<SearchIndex | null>(null)
  const [loading, setLoading] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/search-index.json')
        const data: SearchIndex = await res.json()
        setSearchIndex(data)
      } catch (e) {
        console.error('Failed to load search index:', e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const doSearch = useCallback(
    (q: string) => {
      if (!searchIndex) return
      const r = search(q, searchIndex)
      setResults(r)
      setActiveIndex(0)
      setIsOpen(q.trim().length > 0)
    },
    [searchIndex],
  )

  useEffect(() => {
    const id = setTimeout(() => doSearch(query), 150)
    return () => clearTimeout(id)
  }, [query, doSearch])

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[activeIndex]) {
      window.location.href = results[activeIndex].href
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      inputRef.current?.blur()
    }
  }

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  const showDropdown = isOpen && query.trim().length > 0

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <div
        className={`flex items-center gap-2 px-3 py-2 bg-white border rounded-lg shadow-sm transition-all ${
          showDropdown
            ? 'border-blue-400 rounded-b-none ring-2 ring-blue-100'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <svg
          className={`w-4 h-4 shrink-0 transition-colors ${query ? 'text-blue-500' : 'text-gray-400'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="11" cy="11" r="7" />
          <path strokeLinecap="round" d="m16.5 16.5 4 4" />
        </svg>

        <input
          ref={inputRef}
          type="text"
          value={query}
          disabled={loading}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder={loading ? 'Loading index…' : 'All tools search'}
          className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
        />

        {query && (
          <button
            onClick={() => {
              setQuery('')
              setResults([])
              setIsOpen(false)
              inputRef.current?.focus()
            }}
            className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 bg-white border border-t-0 border-blue-400 rounded-b-lg shadow-lg z-50 overflow-hidden">
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-gray-400">
              No results for{' '}
              <span className="font-medium text-gray-600">"{query}"</span>
            </div>
          ) : (
            <>
              <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                {results.map((r, i) => (
                  <ResultItem key={r.href} result={r} isActive={i === activeIndex} />
                ))}
              </div>
              <div className="px-4 py-2 border-t border-gray-100 flex justify-between">
                <span className="text-xs text-gray-400">
                  {results.length} result{results.length !== 1 ? 's' : ''}
                </span>
                <span className="text-xs text-gray-300">↑↓ · ↵ open · esc</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// 'use client'

// import { useEffect, useRef, useState, useCallback } from 'react'

// // ─── Types ────────────────────────────────────────────────────────────────────

// interface SearchIndex {
//   [category: string]: {
//     [toolPath: string]: string[]
//   }
// }

// interface SearchResult {
//   href: string
//   label: string
//   category: string
//   keywords: string[]
//   score: number
// }

// // ─── Synonym / Intent Map ─────────────────────────────────────────────────────

// const SYNONYM_MAP: Record<string, string[]> = {
//   mp3: ['audio', 'format', 'sound'],
//   wav: ['audio', 'format', 'sound'],
//   flac: ['audio', 'format', 'sound'],
//   aac: ['audio', 'format', 'sound'],
//   ogg: ['audio', 'format', 'sound'],
//   m4a: ['audio', 'format', 'sound'],
//   aiff: ['audio', 'format', 'sound'],
//   mp4: ['video', 'format'],
//   webm: ['video', 'format'],
//   avi: ['video', 'format'],
//   mov: ['video', 'format'],
//   mkv: ['video', 'format'],
//   wmv: ['video', 'format'],
//   jpg: ['image', 'photo', 'jpeg'],
//   jpeg: ['image', 'photo'],
//   png: ['image', 'photo'],
//   webp: ['image', 'format'],
//   gif: ['image', 'animate'],
//   bmp: ['image', 'format'],
//   tiff: ['image', 'format'],
//   ico: ['icon', 'favicon'],
//   svg: ['vector', 'image'],
//   pdf: ['document', 'export'],
//   docx: ['document', 'word'],
//   xlsx: ['excel', 'spreadsheet'],
//   csv: ['data', 'spreadsheet', 'table'],
//   json: ['data', 'format', 'api'],
//   xml: ['data', 'format', 'markup'],
//   yaml: ['config', 'format'],
//   toml: ['config', 'format'],
//   sql: ['database', 'query'],
//   html: ['web', 'markup'],
//   css: ['style', 'design'],
//   markdown: ['md', 'text', 'format'],
//   md: ['markdown', 'text'],
//   hex: ['color', 'hexadecimal'],
//   rgb: ['color'],
//   hsl: ['color'],
//   hsv: ['color'],
//   cmyk: ['color', 'print'],
//   base64: ['encode', 'encoding'],
//   utf8: ['encoding', 'unicode'],
//   utf16: ['encoding', 'unicode'],
//   ascii: ['character', 'encoding'],
//   compressor: ['compress', 'reduce', 'size'],
//   compress: ['compressor', 'reduce', 'size'],
//   shrink: ['compress', 'reduce', 'size'],
//   optimize: ['compress', 'minify', 'reduce'],
//   minify: ['compress', 'minifier', 'optimize'],
//   minifier: ['minify', 'compress', 'optimize'],
//   reduce: ['compress', 'compressor', 'shrink'],
//   convert: ['converter', 'transform', 'change'],
//   converter: ['convert', 'transform'],
//   transform: ['convert', 'converter'],
//   change: ['convert', 'converter', 'changer'],
//   changer: ['change', 'convert', 'converter'],
//   decode: ['decoder', 'read', 'parse'],
//   decoder: ['decode', 'read'],
//   encode: ['encoder', 'convert'],
//   encoder: ['encode', 'convert'],
//   extract: ['extractor', 'get', 'pull'],
//   extractor: ['extract', 'get'],
//   split: ['splitter', 'divide', 'separate'],
//   splitter: ['split', 'divide'],
//   merge: ['merger', 'combine', 'join'],
//   merger: ['merge', 'combine'],
//   join: ['merge', 'merger', 'combine'],
//   combine: ['merge', 'join', 'merger'],
//   trim: ['trimmer', 'cut', 'crop'],
//   trimmer: ['trim', 'cut'],
//   cut: ['trim', 'clip', 'crop'],
//   crop: ['trim', 'cut', 'resize'],
//   resize: ['scale', 'dimensions', 'resizer'],
//   resizer: ['resize', 'scale'],
//   flip: ['reverse', 'invert'],
//   reverse: ['flip', 'backwards'],
//   remove: ['remover', 'delete', 'strip'],
//   remover: ['remove', 'delete'],
//   generate: ['generator', 'create', 'make'],
//   generator: ['generate', 'create', 'make'],
//   create: ['generator', 'generate', 'make'],
//   make: ['generator', 'create', 'generate'],
//   validate: ['validator', 'check', 'verify'],
//   validator: ['validate', 'check'],
//   check: ['validate', 'checker', 'verify'],
//   checker: ['check', 'validate'],
//   edit: ['editor', 'modify'],
//   editor: ['edit', 'modify'],
//   view: ['viewer', 'preview'],
//   viewer: ['view', 'preview'],
//   analyze: ['analyzer', 'inspect'],
//   analyser: ['analyzer', 'inspect'],
//   analyzer: ['analyze', 'inspect'],
//   scan: ['scanner', 'read', 'decode'],
//   scanner: ['scan', 'read'],
//   fix: ['repair', 'restore'],
//   repair: ['fix', 'restore'],
//   sort: ['sorter', 'order', 'arrange'],
//   sorter: ['sort', 'order'],
//   find: ['finder', 'search', 'lookup'],
//   finder: ['find', 'search'],
//   detect: ['detector', 'find'],
//   detector: ['detect', 'find'],
//   format: ['formatter', 'beautify'],
//   formatter: ['format', 'beautify'],
//   beautify: ['formatter', 'format'],
//   calculate: ['calculator'],
//   calculator: ['calculate'],
//   count: ['counter'],
//   counter: ['count'],
//   read: ['reader', 'scan', 'viewer'],
//   reader: ['read', 'viewer'],
//   play: ['player', 'preview'],
//   player: ['play', 'preview'],
//   build: ['builder', 'create'],
//   builder: ['build', 'create'],
//   binary: ['bits', 'base2'],
//   decimal: ['number', 'base10'],
//   octal: ['base8'],
//   hexadecimal: ['hex', 'base16'],
//   pitch: ['key', 'tone', 'frequency'],
//   tempo: ['speed', 'bpm'],
//   bpm: ['tempo', 'beat'],
//   volume: ['loudness', 'gain', 'level'],
//   bass: ['eq', 'equalizer'],
//   treble: ['eq', 'equalizer'],
//   eq: ['equalizer', 'bass', 'treble'],
//   equalizer: ['eq', 'bass', 'treble'],
//   stereo: ['channels', 'mono'],
//   mono: ['channel', 'stereo'],
//   loop: ['repeat'],
//   fade: ['transition'],
//   waveform: ['wave', 'visualize'],
//   bitrate: ['kbps', 'quality'],
//   sample: ['rate', 'frequency'],
//   normalize: ['normalizer', 'level'],
//   qr: ['qrcode', 'barcode'],
//   barcode: ['qr', 'code'],
//   regex: ['regexp', 'pattern'],
//   regexp: ['regex', 'pattern'],
//   jwt: ['token', 'auth'],
//   cron: ['schedule', 'job'],
//   uuid: ['guid', 'unique'],
//   guid: ['uuid'],
//   hash: ['checksum', 'md5', 'sha'],
//   md5: ['hash', 'checksum'],
//   sha: ['hash', 'checksum'],
//   sha256: ['hash'],
//   sha512: ['hash'],
//   bcrypt: ['hash', 'password'],
//   hmac: ['hash', 'keyed'],
//   image: ['photo', 'picture'],
//   photo: ['image', 'picture'],
//   picture: ['image', 'photo'],
//   text: ['string', 'words'],
//   string: ['text'],
//   password: ['passphrase', 'secret'],
//   color: ['colour', 'hue', 'shade'],
//   colour: ['color', 'hue'],
//   font: ['typeface', 'typography'],
//   icon: ['favicon', 'symbol'],
//   chart: ['graph', 'plot'],
//   graph: ['chart', 'plot'],
//   diagram: ['chart', 'flowchart'],
//   table: ['grid', 'spreadsheet'],
//   calendar: ['date', 'schedule'],
//   timer: ['countdown', 'clock'],
//   clock: ['time', 'timer'],
//   slug: ['url', 'permalink'],
//   watermark: ['stamp', 'overlay'],
//   thumbnail: ['preview', 'image'],
//   metadata: ['tags', 'info'],
//   steganography: ['hide', 'secret'],
//   palette: ['colors', 'scheme'],
//   gradient: ['blend', 'transition'],
//   lorem: ['placeholder', 'dummy'],
//   ipsum: ['placeholder', 'dummy'],
//   braille: ['tactile', 'accessibility'],
//   morse: ['dots', 'dashes', 'code'],
//   leet: ['1337', 'hacker'],
// }

// // ─── Weights ──────────────────────────────────────────────────────────────────

// const W = {
//   EXACT_FULL_SLUG: 120,
//   URL_WORD_EXACT: 60,
//   KEYWORD_EXACT: 80,
//   CATEGORY_WORD_EXACT: 20,
//   URL_WORD_PARTIAL: 18,
//   KEYWORD_PARTIAL: 14,
//   CATEGORY_WORD_PARTIAL: 6,
//   SYNONYM_URL_EXACT: 28,
//   SYNONYM_KEYWORD_EXACT: 20,
//   SYNONYM_URL_PARTIAL: 10,
//   SYNONYM_CATEGORY_EXACT: 14,
//   MULTI_WORD_BONUS: 25,
//   CONSECUTIVE_BONUS: 15,
//   VAGUE_PENALTY: -8,
//   // New: coverage penalties
//   NOISE_WORD_PENALTY: -8,   // per unmatched URL word (beyond threshold)
//   COVERAGE_BONUS: 40,       // max bonus when all query terms map to URL words
// }

// // Broad vague terms that should not dominate scoring
// const VAGUE = new Set([
//   'tool', 'tools', 'converter', 'generator', 'calculator', 'maker',
//   'editor', 'viewer', 'checker', 'analyzer', 'analyser', 'online', 'free',
//   'best', 'simple', 'easy', 'fast', 'quick', 'new', 'top',
// ])

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// function slugWords(s: string): string[] {
//   return s.replace(/^\//, '').split('-').filter(Boolean)
// }

// function norm(s: string): string {
//   return s.toLowerCase().trim()
// }

// function tokenize(s: string): string[] {
//   return norm(s).split(/\s+/).filter(Boolean)
// }

// function prettyLabel(p: string): string {
//   return slugWords(p).map(w => w[0].toUpperCase() + w.slice(1)).join(' ')
// }

// function prettyCategory(c: string): string {
//   return slugWords(c).map(w => w[0].toUpperCase() + w.slice(1)).join(' ')
// }

// function expandToken(token: string): { term: string; isSynonym: boolean }[] {
//   const syns = SYNONYM_MAP[token] ?? []
//   const expanded = syns.flatMap(s => s.split(/\s+/))
//   return [
//     { term: token, isSynonym: false },
//     ...expanded.map(t => ({ term: t, isSynonym: true })),
//   ]
// }

// // ─── Scoring ──────────────────────────────────────────────────────────────────

// function scoreEntry(
//   queryTokens: string[],
//   category: string,
//   toolPath: string,
//   keywords: string[],
// ): number {
//   const toolSlug = norm(toolPath.replace(/\//g, '').replace(/-/g, ' '))
//   const fullQuery = queryTokens.join(' ')

//   const catWords = slugWords(category).map(norm)
//   const toolWordList = slugWords(toolPath).map(norm)
//   const normKws = keywords.map(kw => norm(kw))
//   const kwTokens = normKws.flatMap(kw => kw.split(/\s+/))

//   // All tokens that are queryable (category + tool slug words)
//   const allUrlWords = [...catWords, ...toolWordList]

//   let score = 0

//   // ── 1. Full slug match ────────────────────────────────────────────────────
//   if (toolSlug === fullQuery) {
//     score += W.EXACT_FULL_SLUG
//   } else if (fullQuery.length > 2 && toolSlug.includes(fullQuery)) {
//     score += W.EXACT_FULL_SLUG * 0.65
//   }

//   const nonVague = queryTokens.filter(t => !VAGUE.has(t))
//   let hitCount = 0
//   // Track which tool URL words were "explained" by a query token
//   const matchedToolWords = new Set<number>()

//   // ── 2. Per-token scoring ──────────────────────────────────────────────────
//   for (const rawToken of queryTokens) {
//     if (VAGUE.has(rawToken)) {
//       score += W.VAGUE_PENALTY
//       continue
//     }

//     const expanded = expandToken(rawToken)
//     let tokenHit = false

//     for (const { term, isSynonym } of expanded) {
//       // URL word exact
//       const exactIdx = toolWordList.findIndex(w => w === term)
//       if (exactIdx !== -1) {
//         score += isSynonym ? W.SYNONYM_URL_EXACT : W.URL_WORD_EXACT
//         matchedToolWords.add(exactIdx)
//         tokenHit = true
//       } else {
//         // URL word partial
//         const partialIdx = toolWordList.findIndex(w => w.includes(term) || term.includes(w))
//         if (partialIdx !== -1) {
//           score += isSynonym ? W.SYNONYM_URL_PARTIAL : W.URL_WORD_PARTIAL
//           matchedToolWords.add(partialIdx)
//           tokenHit = true
//         }
//       }

//       // Keyword exact
//       if (normKws.some(kw => kw === term) || kwTokens.includes(term)) {
//         score += isSynonym ? W.SYNONYM_KEYWORD_EXACT : W.KEYWORD_EXACT
//         tokenHit = true
//       } else if (normKws.some(kw => kw.includes(term) || term.includes(kw))) {
//         score += isSynonym ? W.SYNONYM_URL_PARTIAL : W.KEYWORD_PARTIAL
//         tokenHit = true
//       }

//       // Category word
//       if (catWords.includes(term)) {
//         score += isSynonym ? W.SYNONYM_CATEGORY_EXACT : W.CATEGORY_WORD_EXACT
//         tokenHit = true
//       } else if (catWords.some(w => w.includes(term) || term.includes(w))) {
//         score += W.CATEGORY_WORD_PARTIAL
//         tokenHit = true
//       }
//     }

//     if (tokenHit) hitCount++
//   }

//   // ── 3. Multi-word bonus ───────────────────────────────────────────────────
//   if (nonVague.length > 1 && hitCount === nonVague.length) {
//     score += W.MULTI_WORD_BONUS
//   }

//   // ── 4. Consecutive match bonus ────────────────────────────────────────────
//   const urlStr = allUrlWords.join(' ')
//   if (fullQuery.length > 2 && urlStr.includes(fullQuery)) {
//     score += W.CONSECUTIVE_BONUS
//   }

//   // ── 5. Coverage ratio bonus ───────────────────────────────────────────────
//   // Reward URLs where query terms cover a high proportion of the URL words.
//   // This prevents a URL like /svg-tools/svg-to-base64-encoder from beating
//   // /encoding-tools/base64-encoder-decoder when user only typed "base64 encoder".
//   //
//   // matchedToolWords = how many tool slug words were explained by a query token
//   // toolWordList.length = total tool slug words
//   //
//   // If ALL query terms appear in URL words, ratio = 1 → full bonus
//   // If only 1 of 4 URL words is matched, ratio is low → smaller bonus

//   if (toolWordList.length > 0 && matchedToolWords.size > 0) {
//     const coverageRatio = matchedToolWords.size / toolWordList.length
//     score += Math.round(W.COVERAGE_BONUS * coverageRatio)
//   }

//   // ── 6. Noise penalty ─────────────────────────────────────────────────────
//   // Penalise each unmatched URL word — extra words that have nothing to do
//   // with the query dilute relevance.
//   // We only penalise words beyond the matched set (i.e. "extra baggage").
//   // A small grace of 1 unmatched word is free (handles helper words like
//   // "and", "to", "from" in slugs).

//   const unmatchedCount = toolWordList.length - matchedToolWords.size
//   const penalisedUnmatched = Math.max(0, unmatchedCount - 1)
//   score += penalisedUnmatched * W.NOISE_WORD_PENALTY

//   return Math.max(score, 0)
// }

// // ─── Search ───────────────────────────────────────────────────────────────────

// function search(query: string, index: SearchIndex, limit = 8): SearchResult[] {
//   const tokens = tokenize(query)
//   if (!tokens.length) return []

//   const results: SearchResult[] = []

//   for (const [category, tools] of Object.entries(index)) {
//     for (const [toolPath, keywords] of Object.entries(tools)) {
//       const score = scoreEntry(tokens, category, toolPath, keywords)
//       if (score <= 0) continue
//       results.push({
//         href: `${category}${toolPath}`,
//         label: prettyLabel(toolPath),
//         category: prettyCategory(category),
//         keywords,
//         score,
//       })
//     }
//   }

//   return results.sort((a, b) => b.score - a.score).slice(0, limit)
// }

// // ─── Result Item ──────────────────────────────────────────────────────────────

// function ResultItem({
//   result,
//   isActive,
// }: {
//   result: SearchResult
//   isActive: boolean
// }) {
//   return (
//     <a
//       href={result.href}
//       className={`flex items-center gap-3 px-4 py-3 border-l-2 no-underline transition-colors ${
//         isActive
//           ? 'bg-blue-50 border-blue-500'
//           : 'border-transparent hover:bg-gray-50 hover:border-gray-200'
//       }`}
//     >
//       <div className="flex-1 min-w-0">
//         <div className="text-sm font-medium text-gray-800">{result.label}</div>
//         <div className="text-xs text-gray-400 font-mono">{result.href}</div>
//       </div>
//     </a>
//   )
// }

// // ─── Main Component ───────────────────────────────────────────────────────────

// export default function UniversalSearch() {
//   const [query, setQuery] = useState('')
//   const [results, setResults] = useState<SearchResult[]>([])
//   const [isOpen, setIsOpen] = useState(false)
//   const [activeIndex, setActiveIndex] = useState(0)
//   const [searchIndex, setSearchIndex] = useState<SearchIndex | null>(null)
//   const [loading, setLoading] = useState(true)
//   const inputRef = useRef<HTMLInputElement>(null)
//   const containerRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     async function load() {
//       try {
//         const res = await fetch('/search-index.json')
//         const data: SearchIndex = await res.json()
//         setSearchIndex(data)
//       } catch (e) {
//         console.error('Failed to load search index:', e)
//       } finally {
//         setLoading(false)
//       }
//     }
//     load()
//   }, [])

//   const doSearch = useCallback(
//     (q: string) => {
//       if (!searchIndex) return
//       const r = search(q, searchIndex)
//       setResults(r)
//       setActiveIndex(0)
//       setIsOpen(q.trim().length > 0)
//     },
//     [searchIndex],
//   )

//   useEffect(() => {
//     const id = setTimeout(() => doSearch(query), 150)
//     return () => clearTimeout(id)
//   }, [query, doSearch])

//   function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
//     if (!isOpen) return
//     if (e.key === 'ArrowDown') {
//       e.preventDefault()
//       setActiveIndex(i => Math.min(i + 1, results.length - 1))
//     } else if (e.key === 'ArrowUp') {
//       e.preventDefault()
//       setActiveIndex(i => Math.max(i - 1, 0))
//     } else if (e.key === 'Enter' && results[activeIndex]) {
//       window.location.href = results[activeIndex].href
//     } else if (e.key === 'Escape') {
//       setIsOpen(false)
//       inputRef.current?.blur()
//     }
//   }

//   useEffect(() => {
//     function handle(e: MouseEvent) {
//       if (!containerRef.current?.contains(e.target as Node)) setIsOpen(false)
//     }
//     document.addEventListener('mousedown', handle)
//     return () => document.removeEventListener('mousedown', handle)
//   }, [])

//   const showDropdown = isOpen && query.trim().length > 0

//   return (
//     <div ref={containerRef} className="relative w-full max-w-xl">
//       <div
//         className={`flex items-center gap-2 px-3 py-2 bg-white border rounded-lg shadow-sm transition-all ${
//           showDropdown
//             ? 'border-blue-400 rounded-b-none ring-2 ring-blue-100'
//             : 'border-gray-300 hover:border-gray-400'
//         }`}
//       >
//         <svg
//           className={`w-4 h-4 shrink-0 transition-colors ${query ? 'text-blue-500' : 'text-gray-400'}`}
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth={2}
//         >
//           <circle cx="11" cy="11" r="7" />
//           <path strokeLinecap="round" d="m16.5 16.5 4 4" />
//         </svg>

//         <input
//           ref={inputRef}
//           type="text"
//           value={query}
//           disabled={loading}
//           onChange={e => setQuery(e.target.value)}
//           onKeyDown={onKeyDown}
//           onFocus={() => query.trim() && setIsOpen(true)}
//           placeholder={loading ? 'Loading index…' : 'Search tools… e.g. "mp3 compressor"'}
//           className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
//         />

//         {query && (
//           <button
//             onClick={() => {
//               setQuery('')
//               setResults([])
//               setIsOpen(false)
//               inputRef.current?.focus()
//             }}
//             className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" d="M18 6 6 18M6 6l12 12" />
//             </svg>
//           </button>
//         )}
//       </div>

//       {showDropdown && (
//         <div className="absolute top-full left-0 right-0 bg-white border border-t-0 border-blue-400 rounded-b-lg shadow-lg z-50 overflow-hidden">
//           {results.length === 0 ? (
//             <div className="px-4 py-6 text-center text-sm text-gray-400">
//               No results for{' '}
//               <span className="font-medium text-gray-600">"{query}"</span>
//             </div>
//           ) : (
//             <>
//               <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
//                 {results.map((r, i) => (
//                   <ResultItem key={r.href} result={r} isActive={i === activeIndex} />
//                 ))}
//               </div>
//               <div className="px-4 py-2 border-t border-gray-100 flex justify-between">
//                 <span className="text-xs text-gray-400">
//                   {results.length} result{results.length !== 1 ? 's' : ''}
//                 </span>
//                 <span className="text-xs text-gray-300">↑↓ · ↵ open · esc</span>
//               </div>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }