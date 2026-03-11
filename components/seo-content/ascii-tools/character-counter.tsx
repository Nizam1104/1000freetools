import React from "react"

export default function CharacterCounterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How It Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool analyzes your text in real-time as you type or paste it. It counts
            every character including spaces, then separately counts characters excluding
            all whitespace. Words are identified by splitting on whitespace boundaries,
            and sentences are detected by finding periods, exclamation marks, and question
            marks.
          </p>

          <p>
            Paragraphs are counted by detecting double line breaks (\n\n), which is the
            standard paragraph separator in plain text. Lines are simply counted by
            splitting on single newlines. Reading time is estimated based on average
            reading speed of 200 words per minute.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">What gets counted:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <span>Characters</span>
                <span>Every single character including spaces and punctuation</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <span>Words</span>
                <span>Groups of characters separated by spaces</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <span>Sentences</span>
                <span>Text segments ending with . ! or ?</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <span>Paragraphs</span>
                <span>Blocks of text separated by blank lines</span>
              </div>
            </div>
          </div>

          <p>
            The character frequency analysis shows which characters appear most often,
            displayed as a horizontal bar chart. This helps identify overused letters
            or detect encoding issues when unexpected characters dominate.
          </p>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing Twitter/X posts within character limits</h3>
            <p className="text-sm text-muted-foreground">
              A social media manager drafts a tweet and needs to stay under 280 characters.
              They paste their draft and watch the character count in real-time, trimming
              words until it fits without losing the message.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Optimizing meta descriptions for SEO</h3>
            <p className="text-sm text-muted-foreground">
              A content writer crafts meta descriptions that should be 150-160 characters
              for optimal Google display. They use the counter to ensure each description
              is long enough to be informative but short enough to avoid truncation.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Meeting essay word count requirements</h3>
            <p className="text-sm text-muted-foreground">
              A student has a 1500-word essay assignment. They paste their draft to check
              if they've written enough, or if they need to expand certain sections. The
              reading time estimate helps them gauge presentation length too.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing text for readability</h3>
            <p className="text-sm text-muted-foreground">
              A technical writer wants to simplify documentation. They check sentence
              count and average sentence length to identify overly complex passages.
              Short sentences and paragraphs generally improve readability scores.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing SMS or push notification copy</h3>
            <p className="text-sm text-muted-foreground">
              A marketing team writes SMS campaigns limited to 160 characters per message.
              They use the counter to ensure messages don't split into multiple texts,
              which costs more and looks unprofessional.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Checking keyword density in content</h3>
            <p className="text-sm text-muted-foreground">
              An SEO specialist analyzes the character frequency to spot overused terms.
              If certain words appear too frequently, they might be flagged as keyword
              stuffing by search engines. The frequency chart helps identify this early.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Character counts vary by platform.</strong>
              Twitter counts characters differently for different scripts. Chinese and
              Japanese characters may count as multiple characters. Emoji can count as
              2-4 characters depending on skin tone modifiers. This tool uses simple
              Unicode character counting.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Word counting has edge cases.</strong>
              Hyphenated words like "state-of-the-art" count as one word. Contractions
              like "don't" count as one word. URLs and email addresses without spaces
              count as single words. Results may differ from other tools' algorithms.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Sentence detection isn't perfect.</strong>
              The tool counts periods, exclamation marks, and question marks as sentence
              endings. But "Dr. Smith arrived." counts as two sentences because of the
              period in "Dr." Abbreviations can inflate sentence counts.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Reading time is an estimate only.</strong>
              The 200 words-per-minute average assumes adult reading speed for simple
              prose. Technical content, non-native speakers, or complex material reads
              slower. Use the estimate for planning, not precise timing.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For SEO meta descriptions, aim for 150-160
              characters. Google typically truncates around 160 characters in search
              results. For title tags, stay under 60 characters to avoid truncation
              in search results.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do spaces count as characters?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, spaces count in the total character count. The "No Spaces" count
              excludes all whitespace (spaces, tabs, newlines). For most platforms
              like Twitter, spaces do count toward your character limit.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How accurate is the reading time estimate?</h3>
            <p className="text-sm text-muted-foreground">
              It's based on 200 words per minute, which is average for adults reading
              English prose. Technical content, dense academic writing, or non-native
              readers may be slower (100-150 wpm). Simple content can be faster
              (250+ wpm).
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's considered a good sentence length?</h3>
            <p className="text-sm text-muted-foreground">
              For general readability, aim for 15-20 words per sentence average.
              Technical writing can go longer. Marketing copy should be shorter
              (10-15 words). If your average exceeds 25 words, consider breaking
              up long sentences.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work for non-English text?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, character counting works for any language. Word counting may be
              inaccurate for languages without spaces (Chinese, Japanese, Thai).
              Sentence detection works best for languages using Latin punctuation.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are emojis counted?</h3>
            <p className="text-sm text-muted-foreground">
              Each emoji counts as one character in this tool. However, some platforms
              count emojis differently. A emoji with skin tone modifier may count as
              2 characters on some systems. Basic emojis are usually 1-2 characters.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I count characters in a PDF or Word doc?</h3>
            <p className="text-sm text-muted-foreground">
              Copy and paste the text from your document into this tool. Formatting
              won't transfer, but the character and word counts will be accurate.
              For large documents, paste in sections to analyze specific chapters.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between characters and unique characters?</h3>
            <p className="text-sm text-muted-foreground">
              Characters is the total count. Unique characters counts how many
              different characters appear. "hello" has 5 characters but only 4 unique
              characters (h, e, l, o—the letter l appears twice but counts once).
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
