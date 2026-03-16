import React from "react"

export default function FontGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Font Generator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Type your text in the input field. Select from dozens of font styles: Bold, Italic, Script, Fraktur, Double-Struck, Monospace, Circled, and many more Unicode-based styles.
          </p>
          <p>
            Adjust the preview size with the slider. See all available styles at once in the comparison view. Each style transforms your text using Unicode characters.
          </p>
          <p>
            Copy any style with one click. Get CSS code for web implementation. Use styled text for social media bios, gaming usernames, or creative projects. All processing happens locally.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Social media bios</h3>
            <p className="text-sm text-muted-foreground">
              Stand out on Instagram, TikTok, Twitter. Styled text catches attention. Express personality through typography.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Gaming usernames</h3>
            <p className="text-sm text-muted-foreground">
              Create unique gamer tags. Styled text looks cool. Stand out in leaderboards and lobbies.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creative messaging</h3>
            <p className="text-sm text-muted-foreground">
              Add flair to texts and chats. Special occasions deserve special text. Make messages memorable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Design mockups</h3>
            <p className="text-sm text-muted-foreground">
              Quick styled text for prototypes. No design software needed. Fast iteration on typography ideas.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning Unicode</h3>
            <p className="text-sm text-muted-foreground">
              Discover Unicode mathematical and script characters. Understand how text styling works. Technical exploration.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Content decoration</h3>
            <p className="text-sm text-muted-foreground">
              Add visual interest to posts and comments. Decorative text draws eyes. Enhance your content's appeal.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">These are Unicode characters, not fonts.</strong>
              Text is transformed using special Unicode symbols. Not actual font files. Works anywhere Unicode is supported.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Not all characters are supported.</strong>
              Some styles only work with letters. Numbers and symbols may not transform. Results vary by style.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Screen readers may struggle.</strong>
              Styled text can confuse assistive technology. Don't use for important content. Accessibility matters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Search may not work.</strong>
              Styled text won't match normal text in search. Don't use for searchable content. Consider SEO impact.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Important:</strong> Use styled text for decoration only. Never for critical information, accessibility content, or SEO-important text. Keep main content in standard characters.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will this work on all platforms?</h3>
            <p className="text-sm text-muted-foreground">
              Most modern platforms support Unicode. iOS, Android, Windows, Mac all work. Older systems may show boxes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for my website?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but sparingly. Copy the CSS or paste styled text. Don't use for important content. Decorative use only.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why don't numbers always work?</h3>
            <p className="text-sm text-muted-foreground">
              Not all styles have number variants. Script and Fraktur often skip numbers. Letters have more Unicode support.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this the same as bold/italic?</h3>
            <p className="text-sm text-muted-foreground">
              No, CSS bold/italic styles actual fonts. This uses different Unicode characters. Different technical approach.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I combine styles?</h3>
            <p className="text-sm text-muted-foreground">
              Not directly. Each style is independent. Copy output from one, paste as input for another. Results may vary.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it work with emojis?</h3>
            <p className="text-sm text-muted-foreground">
              Emojis pass through unchanged. They're already special characters. Style applies to letters and numbers only.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this free to use?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, completely free. No registration required. Generate unlimited styled text. No restrictions on use.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
