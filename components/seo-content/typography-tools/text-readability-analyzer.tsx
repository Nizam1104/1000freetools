import React from "react"

export default function TextReadabilityAnalyzerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Text Readability Analyzer Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool analyzes your text using established readability formulas. Paste your content and get instant scores for Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog Index, and more.
          </p>
          <p>
            Each formula uses different combinations of sentence length, word length, syllable count, and complex word frequency. Flesch Reading Ease scores from 0-100 (higher is easier). Grade level formulas output U.S. school grade equivalents.
          </p>
          <p>
            The analyzer also counts total words, sentences, syllables, and calculates averages. It highlights complex words and long sentences that might reduce readability. Use these insights to revise your content for your target audience.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing for general audiences</h3>
            <p className="text-sm text-muted-foreground">
              You're creating blog content for a broad audience. Check that your readability score is 60+ (8th-9th grade level) so most readers can understand without effort.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating medical or legal content</h3>
            <p className="text-sm text-muted-foreground">
              Healthcare and legal documents should be readable by average patients or clients. Use this tool to simplify jargon-heavy text while maintaining accuracy.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing academic papers</h3>
            <p className="text-sm text-muted-foreground">
              Your professor requires specific readability levels. Analyze drafts early to see if you're writing too simply or unnecessarily complex for academic standards.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating marketing copy</h3>
            <p className="text-sm text-muted-foreground">
              Marketing content should be easily scannable. Aim for 70+ Flesch score. The tool identifies long sentences and complex words that might lose reader attention.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing technical documentation</h3>
            <p className="text-sm text-muted-foreground">
              Even technical docs should be clear. Use the analyzer to find unnecessarily complex phrasing. Technical terms are fine, but sentence structure should stay simple.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Editing non-native English content</h3>
            <p className="text-sm text-muted-foreground">
              You're editing content from ESL writers. The readability scores help identify passages that might confuse international readers, even if grammar is correct.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Formulas are estimates, not rules.</strong>
              Readability scores are guidelines. A high score doesn't guarantee good writing, and a low score doesn't mean bad writing—just complex.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Sentence length matters most.</strong>
              All formulas heavily weight average sentence length. Breaking long sentences into shorter ones improves scores more than simplifying vocabulary.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Syllable counting isn't perfect.</strong>
              Automated syllable counting has edge cases. Words like "fire" (1 or 2 syllables?) may be counted differently than you expect.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Context matters for "complex" words.</strong>
              The tool flags words with 3+ syllables as complex. But "important" might be familiar to your audience while shorter words aren't.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Different audiences need different scores. Consumer content: 60-70 Flesch. Academic: 30-50. Technical docs: 40-60. Adjust based on your readers' expertise.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a good Flesch Reading Ease score?</h3>
            <p className="text-sm text-muted-foreground">
              90-100: Very easy (5th grade). 60-70: Standard (8th-9th grade). 30-50: Difficult (college). Most web content should aim for 60-70 for broad accessibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do different formulas give different grades?</h3>
            <p className="text-sm text-muted-foreground">
              Each formula weights factors differently. Flesch-Kincaid emphasizes sentence length. Gunning Fog focuses on complex words. Use multiple scores for a complete picture.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work for non-English text?</h3>
            <p className="text-sm text-muted-foreground">
              No, these formulas are designed for English. They rely on English-specific patterns like syllable counting. Other languages need different readability metrics.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How can I improve my readability score?</h3>
            <p className="text-sm text-muted-foreground">
              Shorten sentences first—aim for 15-20 words average. Replace complex words with simpler alternatives. Use active voice. Break up dense paragraphs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I simplify everything to get high scores?</h3>
            <p className="text-sm text-muted-foreground">
              No. Match readability to your audience. Academic and technical content should be complex when necessary. Don't dumb down content—make it clear.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the Gunning Fog Index?</h3>
            <p className="text-sm text-muted-foreground">
              Gunning Fog estimates years of education needed to understand text. It counts complex words (3+ syllables) and average sentence length. Score of 12 = high school senior level.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does punctuation affect readability scores?</h3>
            <p className="text-sm text-muted-foreground">
              Indirectly. Periods, question marks, and exclamation points mark sentence endings. More sentences with same word count = shorter average sentence length = better scores.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
