import React from "react"

export default function EmojiCounterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Emoji Counter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste or type your text into the input field. The analyzer instantly counts total emojis, unique emojis, and calculates emoji density. Statistics update as you type.
          </p>
          <p>
            The tool identifies emoji using Unicode patterns, including complex emoji like family groups and skin tone variations. Each emoji is counted separately, even in sequences.
          </p>
          <p>
            The emoji breakdown shows each unique emoji with its count and name. Social media limit bars display how close you are to Twitter's 280 characters, Instagram's limits, and SMS's 160 characters. Use the Remove Emojis or Extract Only Emojis buttons to manipulate your text.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Optimizing tweets for Twitter</h3>
            <p className="text-sm text-muted-foreground">
              Twitter counts emoji as 2 characters each. Your 275-character tweet with 3 emoji is actually over the limit. This tool shows your true Twitter length.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing social media engagement</h3>
            <p className="text-sm text-muted-foreground">
              Track emoji usage in your posts. High emoji density might correlate with engagement. Use the counter to maintain consistent emoji strategy.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cleaning up text for professional use</h3>
            <p className="text-sm text-muted-foreground">
              Your casual message has too many emoji for the client email. Use Remove Emojis to strip them all at once while keeping the text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating emoji-only messages</h3>
            <p className="text-sm text-muted-foreground">
              Extract just the emoji from a message to create an emoji-only reaction. Use Extract Only Emojis to isolate them quickly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing Instagram captions</h3>
            <p className="text-sm text-muted-foreground">
              Instagram allows 2200 characters but only shows ~125 in feeds. Balance emoji and text. The counter shows your total and density percentage.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing competitor content</h3>
            <p className="text-sm text-muted-foreground">
              Copy a competitor's post to see their emoji strategy. How many emoji do they use? Which ones? Use this data to inform your own approach.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Twitter counts emoji differently.</strong>
              Most emoji count as 2 characters on Twitter, not 1. A tweet with 140 letters and 70 emoji is over the 280 limit, not at it.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Complex emoji use multiple code points.</strong>
              Family emoji like "family: man, woman, boy" are multiple emoji joined together. They count as several emoji, not one.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Emoji density affects readability.</strong>
              High emoji density (over 20%) can make text hard to read. Use density percentage to maintain balance between emoji and words.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some platforms limit emoji count.</strong>
              Instagram bio has a 150 character limit. Heavy emoji use eats into this quickly. Plan your emoji budget accordingly.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For Twitter, aim for 1-3 emoji per tweet. Research shows tweets with 1-2 emoji get 25% more engagement than text-only. More than 3 emoji sees diminishing returns.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does Twitter length differ from character count?</h3>
            <p className="text-sm text-muted-foreground">
              Twitter counts most emoji as 2 characters. The character count shows actual Unicode characters. Twitter length shows how Twitter's system counts them.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What counts as an emoji?</h3>
            <p className="text-sm text-muted-foreground">
              Unicode emoji including faces, objects, symbols, flags, and modifiers. Text symbols like :) are emoticons, not emoji, and aren't counted.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How accurate is the emoji detection?</h3>
            <p className="text-sm text-muted-foreground">
              Very accurate for standard emoji. Complex emoji with multiple skin tones or gender modifiers are detected as single emoji units.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I count emoji in other languages?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Emoji are universal across languages. The counter works the same for English, Spanish, Japanese, or any language text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's emoji density?</h3>
            <p className="text-sm text-muted-foreground">
              Emoji density is the percentage of characters that are emoji. 10 emoji in 100 characters = 10% density. Helps gauge emoji heaviness.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why remove emojis instead of deleting manually?</h3>
            <p className="text-sm text-muted-foreground">
              Manual deletion is tedious for long text with many emoji. The Remove Emojis button strips all emoji instantly while preserving your text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work for emoji reactions?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Paste emoji reactions from Slack, Discord, or other platforms. The counter identifies and counts each unique emoji in the reaction set.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
