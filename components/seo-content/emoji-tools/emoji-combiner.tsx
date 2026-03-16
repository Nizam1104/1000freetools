import React from "react"

export default function EmojiCombinerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Emoji Combiner Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select emojis from the palette by clicking on them. Each click adds the emoji to your combination. Mix and match any emoji - faces, objects, symbols, animals, whatever you can imagine.
          </p>
          <p>
            Adjust combination settings to control how emojis blend. Set opacity for transparency effects. Change scale to make emoji larger or smaller. Rotate to create dynamic angled compositions.
          </p>
          <p>
            Click Combine Emojis to merge your selection. The result shows your custom emoji creation. Download as PNG with transparent background or copy the emoji sequence. Browse popular combinations for inspiration.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating custom reactions</h3>
            <p className="text-sm text-muted-foreground">
              Standard emoji don't express your exact feeling? Combine multiple emoji. Fire heart for passionate love. Crying laughing for extreme humor.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing Discord server emoji</h3>
            <p className="text-sm text-muted-foreground">
              Custom server emoji stand out. Combine emoji to create unique reactions for your community. Download and upload as custom emoji.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Making Instagram story stickers</h3>
            <p className="text-sm text-muted-foreground">
              Create custom emoji combos for stories. Heart plus sparkles for love posts. Cake plus party for birthdays. Makes stories more personalized.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Expressing complex emotions</h3>
            <p className="text-sm text-muted-foreground">
              Single emoji can't capture nuanced feelings? Combine them. Happy but nervous = smile plus sweat. Proud but humble = star plus folded hands.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating brand emoji signatures</h3>
            <p className="text-sm text-muted-foreground">
              Brands can create signature emoji combos. Coffee shop uses coffee plus heart. Gym uses muscle plus fire. Consistent emoji branding across posts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Making emoji art compositions</h3>
            <p className="text-sm text-muted-foreground">
              Arrange multiple emoji into scenes. Beach scene with sun, palm, wave. Space scene with rocket, stars, planet. Create mini emoji dioramas.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Combining creates sequences, not merged images.</strong>
              The tool places emoji side by side or layered. They don't fuse into a new single emoji. Each emoji remains distinct in the combination.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Order affects meaning.</strong>
              Heart then fire reads differently than fire then heart. First emoji sets the context. Arrange in the order you want them read.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Too many emoji looks cluttered.</strong>
              2-4 emoji work best together. More than that becomes visual noise. Edit combinations down to essential emoji only.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Platform rendering varies.</strong>
              Your combination may look different on other devices. Test on multiple platforms if consistency matters for your use case.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Popular combinations work because they're intuitive. Heart + fire = passion. Don't overthink it. The best combos feel obvious once you see them.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I save my custom combinations?</h3>
            <p className="text-sm text-muted-foreground">
              Download as PNG to save permanently. Or copy the emoji sequence to your clipboard. The tool doesn't store combinations server-side.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What are popular combinations?</h3>
            <p className="text-sm text-muted-foreground">
              Heart + fire (passion), Moon + stars (night), Sun + wave (beach), Cake + party (birthday). Browse the gallery for trending combos.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I adjust individual emoji in a combo?</h3>
            <p className="text-sm text-muted-foreground">
              Settings apply to the whole combination. For individual control, create separate combinations and merge them in an image editor.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do combined emoji work everywhere?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. You're sending multiple emoji in sequence. All platforms that support emoji will display them. Order and spacing are preserved.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I create emoji stories?</h3>
            <p className="text-sm text-muted-foreground">
              Absolutely. Chain combinations to tell stories. Wake up → coffee → work → gym → dinner → sleep. Emoji storytelling is a fun communication format.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the maximum number of emoji?</h3>
            <p className="text-sm text-muted-foreground">
              No hard limit but readability decreases after 6-8 emoji. Most platforms display long sequences fine. Consider your audience's patience.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I share combinations with friends?</h3>
            <p className="text-sm text-muted-foreground">
              Copy the emoji sequence and send via any messaging app. Or download as PNG and share the image. Both methods work for sharing.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
