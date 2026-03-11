import React from "react"

export default function CharacterCounterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Character Counter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool counts everything in your text as you type. Paste your content into the text box and watch the numbers update in real time. You get character counts with and without spaces, plus word, sentence, paragraph, and line counts.
          </p>
          <p>
            The reading time estimate assumes 200 words per minute, which is the average adult reading speed. Speaking time uses 150 words per minute, a typical pace for presentations. Character frequency shows which letters appear most often, useful for cryptography or text analysis.
          </p>
          <p>
            Platform limit bars show how close you are to Twitter's 280 characters, Instagram's 2200 for captions, or SMS's 160 characters. The bar turns yellow at 80% and red when you exceed the limit.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing tweets that fit</h3>
            <p className="text-sm text-muted-foreground">
              You're drafting an important tweet and need to stay under 280 characters. The counter shows exactly where you stand so you can trim or expand without guessing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Meeting essay word requirements</h3>
            <p className="text-sm text-muted-foreground">
              Your professor requires 1500 words minimum. Paste your essay to see if you've hit the target, or check how much more you need to write.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing presentation scripts</h3>
            <p className="text-sm text-muted-foreground">
              You have a 5-minute slot for your talk. The speaking time estimate tells you if your script is too long or too short before you start rehearsing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing Instagram captions</h3>
            <p className="text-sm text-muted-foreground">
              Instagram allows 2200 characters but only shows the first 125 in feeds. The counter helps you front-load important info while staying under the cap.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Editing for conciseness</h3>
            <p className="text-sm text-muted-foreground">
              Your blog post feels bloated. Compare character counts before and after editing to see how much tighter your writing has become.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">SMS marketing campaigns</h3>
            <p className="text-sm text-muted-foreground">
              SMS messages over 160 characters split into multiple segments, costing more. The counter keeps your marketing texts in the single-message zone.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Spaces count as characters.</strong>
              The "characters" count includes every space, while "no spaces" removes them. Twitter counts spaces, so use the main count for tweet planning.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Emoji can count as multiple characters.</strong>
              Some emoji use multiple Unicode code points. A single emoji might register as 2-4 characters depending on the platform counting method.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Reading time is an estimate.</strong>
              Technical content with jargon reads slower than narrative text. Add 20-30% buffer if your content includes complex concepts or data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Sentence detection isn't perfect.</strong>
              The tool counts periods, exclamation marks, and question marks as sentence endings. Abbreviations like "Dr." or "etc." may inflate the count.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For LinkedIn posts, aim for 1300-1500 characters. Posts in this range get more engagement than very short or max-length posts.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why are there two character counts?</h3>
            <p className="text-sm text-muted-foreground">
              "Characters" includes every space and punctuation mark. "No spaces" removes all whitespace. Use the first for social media limits, the second for content density analysis.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How accurate is the word count?</h3>
            <p className="text-sm text-muted-foreground">
              Very accurate for standard text. Hyphenated words count as one word. Contractions like "don't" count as one. URLs and email addresses count as single words.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work for non-English text?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, character counting works for any language. Word counting may be less accurate for languages without spaces between words like Chinese or Japanese.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What counts as a paragraph?</h3>
            <p className="text-sm text-muted-foreground">
              Paragraphs are separated by blank lines (two or more consecutive line breaks). Single line breaks within a paragraph don't create a new paragraph count.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for academic writing?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but check your institution's counting method. Some count footnotes and references, others don't. This tool counts everything you paste into it.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does reading time change as I type?</h3>
            <p className="text-sm text-muted-foreground">
              Reading time is calculated from word count using 200 WPM. As you add or remove words, the estimate updates. It's recalculated every time you change the text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my text stored anywhere?</h3>
            <p className="text-sm text-muted-foreground">
              No. All processing happens in your browser. Close the tab and your text is gone. Nothing is sent to servers or stored in databases.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
