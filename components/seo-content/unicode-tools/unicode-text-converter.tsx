import React from "react"

export default function UnicodeTextConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Unicode Text Converter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your text and select the encoding format you need. The converter transforms your text into UTF-8 hex bytes, UTF-16 code units, UTF-32 code points, HTML entities, or escape sequences. Click Convert to see the result.
          </p>
          <p>
            Each encoding serves different purposes. UTF-8 is used for file storage and web transmission. UTF-16 is common in Windows and JavaScript. UTF-32 gives direct code point access. HTML entities escape special characters for web pages. Escape sequences are used in programming languages.
          </p>
          <p>
            The converter also works in reverse. Paste encoded text and it will decode back to readable characters. This is useful for debugging encoding issues or understanding what encoded strings actually contain.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging character encoding issues</h3>
            <p className="text-sm text-muted-foreground">
              Your API returns garbled text. Convert it to see the actual bytes. "M" showing as "MÃ¼" becomes clear when you see the UTF-8 bytes vs what was interpreted as Latin-1.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing HTML with special characters</h3>
            <p className="text-sm text-muted-foreground">
              Need to display code examples with angle brackets on a webpage? Convert to HTML entities so {"<"} and {">"} show as text instead of being interpreted as HTML tags.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating string literals in code</h3>
            <p className="text-sm text-muted-foreground">
              Your source file encoding doesn't support certain characters. Use escape sequences like \u00E9 for "e" to include Unicode in ASCII-only source files.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing binary file formats</h3>
            <p className="text-sm text-muted-foreground">
              Reverse engineering a file format? Convert text to UTF-8 hex to compare against the binary data. Match byte patterns to understand the file structure.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing data for legacy systems</h3>
            <p className="text-sm text-muted-foreground">
              Old databases may only accept ASCII. Convert Unicode text to escape sequences or entities that the system can store, then decode when reading back.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning about Unicode encodings</h3>
            <p className="text-sm text-muted-foreground">
              Students can see how the same text looks in different encodings. Compare UTF-8's variable-length bytes to UTF-16's fixed 2-byte units for understanding.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">UTF-8 uses variable-length encoding.</strong>
              ASCII characters are 1 byte, but emoji can be 4 bytes. "A" is 41 in hex, but "" is F0 9F 98 80. This is why UTF-8 is efficient for mostly-ASCII text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">UTF-16 may use surrogate pairs.</strong>
              Characters above U+FFFF (like emoji) need two 16-bit code units in UTF-16. JavaScript's charCodeAt() returns these separately, not the full code point.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">HTML entities have named alternatives.</strong>
              While this tool generates numeric entities like &#x00E9;, HTML also supports named entities like &eacute;. Both produce the same character.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">BOM markers may appear in files.</strong>
              UTF-8 files sometimes start with EF BB BF (the BOM). This is optional and often unnecessary. Most modern systems handle UTF-8 without BOM correctly.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> When debugging encoding issues, always check what encoding the source and destination expect. Mismatched encodings cause most "garbled text" problems, not actual data corruption.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between UTF-8 and UTF-16?</h3>
            <p className="text-sm text-muted-foreground">
              UTF-8 uses 1-4 bytes per character and is backward compatible with ASCII. UTF-16 uses 2 or 4 bytes and is more efficient for Asian languages. UTF-8 dominates on the web.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does emoji take 4 bytes in UTF-8?</h3>
            <p className="text-sm text-muted-foreground">
              Emoji have code points above U+FFFF. In UTF-8, anything above U+FFFF requires 4 bytes. The "" emoji is U+1F600, which encodes as F0 9F 98 80.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert entire files?</h3>
            <p className="text-sm text-muted-foreground">
              This tool works on text you paste in. For file conversion, use dedicated tools or programming libraries. Python's codecs module handles file encoding conversion well.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What are HTML entities used for?</h3>
            <p className="text-sm text-muted-foreground">
              HTML entities escape characters that have special meaning in HTML. &amp; becomes {"&amp;amp;"}, {"<"} becomes {"&lt;"}. This prevents them from being interpreted as markup.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is UTF-32 ever used in practice?</h3>
            <p className="text-sm text-muted-foreground">
              Rarely. It's simple (one 32-bit value per code point) but wasteful of space. Some internal systems use it for easy indexing, but storage and transmission favor UTF-8.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I know what encoding a file uses?</h3>
            <p className="text-sm text-muted-foreground">
              There's no reliable way without metadata. UTF-8 with BOM has a signature. Otherwise, you need to know from the file's source or try detection heuristics.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do some characters show as question marks?</h3>
            <p className="text-sm text-muted-foreground">
              The target encoding doesn't support that character. ASCII can't represent "". When converting, unsupported characters often become ? or replacement character .
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
