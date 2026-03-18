import React from "react"

export default function FontStatisticsAnalyzerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Font/Text Statistics Analyzer Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool analyzes text and provides detailed statistics about character usage, word patterns, and readability. Paste any text and get instant metrics on character count, word frequency, vowel/consonant distribution, and readability scores.
          </p>
          <p>
            The analyzer processes your text character by character and word by word, building frequency distributions and calculating metrics. Results include both basic counts (characters, words, lines) and advanced analysis (readability scores, character frequency charts).
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Statistics provided:</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Character count (total and unique characters)</li>
              <li>Word count and average word length</li>
              <li>Line count and sentence count</li>
              <li>Vowel, consonant, number, and special character counts</li>
              <li>Most and least used characters</li>
              <li>Character frequency distribution (visual chart)</li>
              <li>Word frequency (top 20 most used words)</li>
              <li>Readability score (Flesch-Kincaid approximation)</li>
            </ul>
          </div>
          <p>
            Visual charts show character frequency as horizontal bars, making it easy to spot patterns. Word frequency lists help identify overused terms that might need variation in your writing.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Improving writing style</h3>
            <p className="text-sm text-muted-foreground">
              Notice you use "very" 50 times in a 1000-word article? The word frequency list exposes crutch words and repetitive phrasing. Replace overused terms with synonyms for better writing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Checking text complexity for audience</h3>
            <p className="text-sm text-muted-foreground">
              Writing for children? The readability score should be high (easy). Technical documentation? Lower scores are acceptable. Adjust sentence length and vocabulary based on target audience.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">SEO content optimization</h3>
            <p className="text-sm text-muted-foreground">
              Content should have adequate length for SEO. Check word count meets minimums (often 1000+ words for blog posts). Analyze keyword density by checking word frequency for target terms.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cryptogram and puzzle solving</h3>
            <p className="text-sm text-muted-foreground">
              Solving a substitution cipher? Character frequency analysis is key. In English, E, T, A, O, I, N are most common. Compare your cipher text's frequency to identify likely letter mappings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing author style</h3>
            <p className="text-sm text-muted-foreground">
              Studying writing patterns? Compare statistics across different authors. Hemingway uses short words and sentences. Academic writers use longer words and complex structures. Quantify stylistic differences.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Meeting content requirements</h3>
            <p className="text-sm text-muted-foreground">
              Assignment requires 500 words minimum? Essay needs specific character count? The analyzer shows exact counts so you know when you've met requirements without manual counting.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Readability scores are approximations.</strong>
              Flesch-Kincaid and similar scores use simple formulas (sentence length, syllable count). They correlate with difficulty but don't capture vocabulary complexity or conceptual difficulty.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Word frequency is case-insensitive.</strong>
              "The" and "the" count as the same word. This is usually desired for analysis. If you need case-sensitive counts, you'd need a different tool.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Stop words dominate frequency lists.</strong>
              "the", "a", "is", "of" will top your word frequency. For meaningful analysis, consider removing stop words first to see content-bearing words.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Syllable counting is imperfect.</strong>
              Readability scores need syllable counts. Automated syllable counting uses rules that fail on irregular words. Scores are estimates, not precise measurements.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For writing improvement, focus on the longest words and most frequent content words. These reveal your vocabulary range and topic focus more than function words.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a good readability score?</h3>
            <p className="text-sm text-muted-foreground">
              90-100: Very easy (elementary). 70-80: Fairly easy (middle school). 60-70: Standard (high school). 50-60: Fairly difficult (college). Below 50: Difficult (academic/professional). Aim for 60-70 for general audiences.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How accurate is the word count?</h3>
            <p className="text-sm text-muted-foreground">
              Very accurate for standard text. Hyphenated words count as one. Contractions (don't, can't) count as one. URLs and email addresses count as one word each.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I analyze multiple texts at once?</h3>
            <p className="text-sm text-muted-foreground">
              This tool analyzes one text at a time. For comparison, analyze each text separately and note the statistics. Or use a tool specifically designed for comparative text analysis.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work for non-English text?</h3>
            <p className="text-sm text-muted-foreground">
              Character counts work for any language. Word frequency works for space-separated languages. Readability scores are calibrated for English and may be inaccurate for other languages.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is my readability score so low?</h3>
            <p className="text-sm text-muted-foreground">
              Long sentences and multi-syllable words lower the score. Break long sentences. Replace complex words with simpler alternatives. Use active voice. These changes improve readability.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I export the statistics?</h3>
            <p className="text-sm text-muted-foreground">
              Use the copy button to copy statistics as text. Paste into a spreadsheet or document. For programmatic access, you'd need an API or library that provides text analysis functions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What counts as a sentence?</h3>
            <p className="text-sm text-muted-foreground">
              Sentences are split on periods, exclamation marks, and question marks. Abbreviations (Mr., Dr.) may incorrectly split sentences. The count is approximate for texts with many abbreviations.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
