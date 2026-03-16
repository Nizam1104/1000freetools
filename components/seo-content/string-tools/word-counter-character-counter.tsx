export default function WordCounterCharacterCounterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This word counter and character counter analyzes text and provides detailed
            statistics including word count, character count (with and without spaces),
            sentence count, paragraph count, and estimated reading time.
          </p>
          <p className="text-muted-foreground">
            The counting process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Character count:</strong> Every character is counted, including spaces, punctuation, and special characters.</li>
            <li><strong className="text-foreground">Word count:</strong> Text is split on whitespace and punctuation. Consecutive spaces don't create extra words.</li>
            <li><strong className="text-foreground">Sentence count:</strong> Sentences are identified by terminal punctuation (. ! ?) with handling for abbreviations.</li>
            <li><strong className="text-foreground">Reading time:</strong> Calculated based on average reading speed (typically 200-250 words per minute).</li>
          </ol>
          <p className="text-muted-foreground">
            Real-time updates show statistics as you type or paste text. Additional metrics
            like average word length, longest word, and paragraph count provide deeper insights.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Academic Writing",
              description: "Meet essay word count requirements for assignments, papers, and thesis documents."
            },
            {
              title: "Content Creation",
              description: "Write blog posts, articles, and web content within specified length guidelines."
            },
            {
              title: "Social Media Posts",
              description: "Stay within character limits for Twitter, Instagram captions, and other platforms."
            },
            {
              title: "SEO Writing",
              description: "Optimize content length for search engines and readability standards."
            },
            {
              title: "Professional Writing",
              description: "Meet requirements for reports, proposals, cover letters, and business documents."
            },
            {
              title: "Editing and Proofreading",
              description: "Track changes in document length during revision and editing processes."
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-muted/30 p-4 space-y-2">
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">What to Know Before Using</h2>
        <div className="space-y-3">
          {[
            {
              caveat: "Word count methods vary",
              explanation: "Different tools count words differently. Hyphenated words, contractions, and numbers may be counted differently."
            },
            {
              caveat: "Characters with vs without spaces",
              explanation: "With spaces includes all characters. Without spaces excludes only space characters. Both are useful for different purposes."
            },
            {
              caveat: "Reading time is an estimate",
              explanation: "Based on average 200-250 WPM. Technical content, non-native readers, or complex text may take longer."
            },
            {
              caveat: "Sentence detection isn't perfect",
              explanation: "Abbreviations (Mr., Dr., etc.) and decimal numbers can be misidentified as sentence endings."
            },
            {
              caveat: "Real-time counting may lag",
              explanation: "Very large texts (100,000+ characters) may cause slight delays in updating statistics."
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-muted/30 p-4">
              <h3 className="font-semibold text-foreground mb-1">{item.caveat}</h3>
              <p className="text-sm text-muted-foreground">{item.explanation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Common Questions</h2>
        <div className="space-y-6">
          {[
            {
              question: "How is word count calculated?",
              answer: "Text is split on whitespace and punctuation. 'Hello, world!' counts as 2 words. Hyphenated words like 'state-of-the-art' typically count as 1."
            },
            {
              question: "What's a good words per minute reading speed?",
              answer: "Average adult reads 200-250 WPM. Fast readers reach 300-400 WPM. Technical content is slower (100-150 WPM)."
            },
            {
              question: "How do I count characters without spaces?",
              answer: "Subtract space count from total character count. Useful for SMS limits, some social media, and certain formatting requirements."
            },
            {
              question: "What's the ideal blog post length?",
              answer: "SEO best practices suggest 1500-2500 words for in-depth posts. Shorter posts (500-800) work for news and updates. Quality matters more than length."
            },
            {
              question: "How many characters is a tweet?",
              answer: "Twitter/X allows 280 characters. Some languages (Chinese, Japanese) have different limits. Links and media affect available space."
            },
            {
              question: "Does this count numbers as words?",
              answer: "Yes, '123' or '2024' count as words. '1,000' may count as one word depending on the counting algorithm."
            },
            {
              question: "How accurate is the reading time estimate?",
              answer: "It's a rough estimate based on average reading speed. Actual time varies by reader, content complexity, and familiarity with the topic."
            },
          ].map((item, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="font-semibold text-foreground">{item.question}</h3>
              <p className="text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
