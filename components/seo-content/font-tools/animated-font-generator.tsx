import React from "react"

export default function AnimatedFontGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Animated Font Generator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your text and choose an animation type: gradient, glow, bounce, slide, or fade. Each creates a different visual effect for your text.
          </p>
          <p>
            Adjust animation speed with the slider. Pick multiple colors for gradient effects. Set font size for your display. Preview changes in real-time on a dark background.
          </p>
          <p>
            Copy the CSS code for use in your projects. Or download a complete HTML file with the animation ready to use. Share animated text for social media or websites. All processing happens locally.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Social media content</h3>
            <p className="text-sm text-muted-foreground">
              Create eye-catching text for Instagram stories. Animated posts get more attention. Stand out in crowded feeds.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Website headers</h3>
            <p className="text-sm text-muted-foreground">
              Add subtle animation to hero text. Draw attention to key messages. Modern, engaging first impressions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Video titles and overlays</h3>
            <p className="text-sm text-muted-foreground">
              Create animated text for YouTube intros. Overlay text for tutorials. Professional-looking video graphics.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Presentation openers</h3>
            <p className="text-sm text-muted-foreground">
              Animated title slides grab attention. Set the tone for your presentation. More engaging than static text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Digital signage</h3>
            <p className="text-sm text-muted-foreground">
              Create scrolling or animated messages. Capture attention in public spaces. Dynamic content for displays.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning CSS animations</h3>
            <p className="text-sm text-muted-foreground">
              See animation code in action. Understand keyframes and timing. Build CSS animation skills practically.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Animation should enhance, not distract.</strong>
              Subtle animations work best. Too much movement annoys users. Use animation purposefully, not everywhere.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Speed affects perception.</strong>
              Fast animations feel energetic. Slow feels calm. Match speed to your message and brand personality.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Consider accessibility.</strong>
              Some users are sensitive to motion. Provide options to reduce animation. Respect prefers-reduced-motion settings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Performance matters.</strong>
              Complex animations can slow pages. Use CSS transforms when possible. Test on mobile devices.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For production, consider using the Web Animations API or libraries like GSAP for more control. This tool is great for simple CSS animations.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Which animation type is best?</h3>
            <p className="text-sm text-muted-foreground">
              Depends on your goal. Gradient for modern feel. Glow for emphasis. Bounce for playful. Slide for introductions. Fade for subtlety.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this on mobile?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, CSS animations work on mobile. Test performance on older devices. Keep animations simple for best mobile experience.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I stop the animation?</h3>
            <p className="text-sm text-muted-foreground">
              CSS animations loop infinitely by default. Remove the animation property or set animation-iteration-count to 1 for one-time animation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I combine animations?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, chain multiple animations in CSS. This tool creates single animations. Combine manually for complex effects.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What browsers support these?</h3>
            <p className="text-sm text-muted-foreground">
              All modern browsers support CSS animations. IE11 has limited support. Check Can I Use for specific feature compatibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I export as video?</h3>
            <p className="text-sm text-muted-foreground">
              This tool exports HTML/CSS. Screen record the animation for video. Or use dedicated video tools for MP4 export.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this free to use?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, completely free. Use for personal or commercial projects. No attribution required. Create unlimited animations.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
