import React from "react"

export default function TextShadowGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Text Shadow Generator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool creates CSS text shadow effects for your typography. Adjust shadow offset, blur radius, color, and opacity to create everything from subtle depth to dramatic glow effects.
          </p>
          <p>
            Text shadows use four values: horizontal offset, vertical offset, blur radius, and color. Positive offsets move the shadow right and down. Blur creates soft edges. Multiple shadows can be layered for complex effects.
          </p>
          <p>
            Preview your text with custom shadows in real time. The generator produces ready-to-use CSS code. Create subtle readability aids or bold decorative effects depending on your design needs.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Improving text readability on images</h3>
            <p className="text-sm text-muted-foreground">
              Text over photos needs contrast. A subtle text shadow (1px 1px 2px rgba(0,0,0,0.5)) makes text legible regardless of background variations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating retro or neon effects</h3>
            <p className="text-sm text-muted-foreground">
              Layer multiple colored shadows to create neon glow effects. Stack shadows with increasing blur for realistic light diffusion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Adding depth to headings</h3>
            <p className="text-sm text-muted-foreground">
              Subtle shadows give headings a slight lift off the page. Use 1-2px offset with minimal blur for a professional, understated 3D effect.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing YouTube thumbnails</h3>
            <p className="text-sm text-muted-foreground">
              Thumbnail text needs to pop. Bold text with strong shadows stands out against busy backgrounds and grabs attention in crowded feeds.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating embossed or engraved effects</h3>
            <p className="text-sm text-muted-foreground">
              Light shadows on dark text (or vice versa) create embossed effects. Use subtle offsets and complementary colors for realistic depth.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing game UI elements</h3>
            <p className="text-sm text-muted-foreground">
              Game interfaces often use stylized text shadows. Create bold, colorful shadows that match your game's aesthetic and ensure readability during gameplay.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Subtle shadows work best for readability.</strong>
              For body text or important content, use minimal shadows (1px offset, 1-2px blur). Heavy shadows distract and reduce legibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Shadow color affects perception.</strong>
              Black shadows feel natural. Colored shadows create mood. White shadows on dark text can be more subtle than black on light text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Multiple shadows add up.</strong>
              You can layer shadows with commas. But each shadow adds rendering cost. Use multiple shadows sparingly, especially on mobile.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Blur radius impacts performance.</strong>
              Large blur values require more GPU processing. On mobile devices, heavy blur can cause jank during scrolling or animations.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For text over images, try a 2px shadow with 50% opacity black. It's the sweet spot between visibility and subtlety for most use cases.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the text-shadow syntax?</h3>
            <p className="text-sm text-muted-foreground">
              text-shadow: horizontal-offset vertical-offset blur-radius color. Example: text-shadow: 2px 2px 4px rgba(0,0,0,0.5). Offset and color are required; blur is optional.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I animate text shadows?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, text-shadow is animatable. Hover effects that add or change shadows create depth. But animate thoughtfully—shadow animations can be performance-heavy.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I create a glow effect?</h3>
            <p className="text-sm text-muted-foreground">
              Use the same color as your text with large blur. Example: text-shadow: 0 0 10px #fff creates a white glow. Layer multiple shadows for stronger effect.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does text-shadow work on mobile?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, text-shadow is well-supported on mobile browsers. But heavy shadows can impact performance on low-end devices. Test on target devices.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use text-shadow for outlines?</h3>
            <p className="text-sm text-muted-foreground">
              Sort of. Layer four shadows (left, right, up, down) with no blur to fake an outline. But CSS text-stroke or -webkit-text-stroke is better for real outlines.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why isn't my text shadow showing?</h3>
            <p className="text-sm text-muted-foreground">
              Check that your text color contrasts with the shadow. A black shadow on black text won't show. Also verify you're not accidentally hiding it with overflow.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I use text-shadow or box-shadow?</h3>
            <p className="text-sm text-muted-foreground">
              Text-shadow follows text shape. Box-shadow creates a rectangular shadow. Use text-shadow for text effects, box-shadow for container depth.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
