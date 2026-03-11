import React from "react"

export default function AnimatedSvgIconCreatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Animated SVG Icon Creator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select an animation type from the available presets - spinner for loading states, bounce for attention-grabbing effects, pulse for status indicators, slide for directional cues, or morph for shape transformations.
          </p>
          <p>
            Customize the animation duration to control speed. Faster durations (0.3-0.5s) create energetic animations. Slower durations (1-2s) feel more calm and deliberate. Adjust the color to match your design system.
          </p>
          <p>
            Set the icon size for your use case. Click Generate to create the animated SVG with embedded CSS animations. Preview shows the animation in action. Download the SVG file or copy the code to embed directly in your HTML.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating loading spinners</h3>
            <p className="text-sm text-muted-foreground">
              Need a loading indicator for your app? Generate a spinning circle SVG. Customize the color to match your brand. Embeds directly without external dependencies.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Adding micro-interactions to buttons</h3>
            <p className="text-sm text-muted-foreground">
              Make buttons more engaging with animated icons. A bounce effect on hover or a pulse when active. Small animations improve perceived responsiveness.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building notification indicators</h3>
            <p className="text-sm text-muted-foreground">
              Unread messages need attention. Use a pulsing dot or bouncing bell icon. The animation draws the eye without being distracting or annoying.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating onboarding step indicators</h3>
            <p className="text-sm text-muted-foreground">
              Guide users through setup with animated step icons. Slide animation shows progression. Morph effects indicate state changes between steps.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing success confirmation animations</h3>
            <p className="text-sm text-muted-foreground">
              Form submitted successfully? Show an animated checkmark. The motion confirms the action completed. More satisfying than a static icon.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building engaging 404 pages</h3>
            <p className="text-sm text-muted-foreground">
              Error pages don't have to be boring. Add an animated icon that moves or morphs. Makes the error experience less frustrating for users.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">CSS animations are embedded in the SVG.</strong>
              The animation code lives inside the SVG file. No external CSS needed. This makes the SVG self-contained but slightly larger in file size.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Animation loops infinitely by default.</strong>
              Most generated animations repeat forever. For one-time animations, you'll need to modify the CSS animation-iteration-count property.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Consider motion sensitivity.</strong>
              Some users are sensitive to motion. Provide a way to reduce or disable animations. Respect the prefers-reduced-motion media query.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Performance varies by animation type.</strong>
              Transform-based animations (rotate, scale) are GPU-accelerated and smooth. Opacity changes are also efficient. Avoid animating complex paths.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For loading spinners, use 0.8-1.2s duration. Faster feels frantic, slower feels sluggish. Match spinner speed to typical load times for perceived performance.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will this work in all browsers?</h3>
            <p className="text-sm text-muted-foreground">
              CSS animations work in all modern browsers. IE11 has limited support. For legacy browser support, consider JavaScript-based animation fallbacks.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I customize the animation further?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Download the SVG and edit the CSS directly. Change timing functions, add delays, or modify keyframes for custom animation behavior.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I stop the animation?</h3>
            <p className="text-sm text-muted-foreground">
              Add a CSS class that sets animation-play-state: paused. Toggle this class with JavaScript to start/stop the animation based on user interaction.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I animate my own SVG icons?</h3>
            <p className="text-sm text-muted-foreground">
              This tool generates preset animations. For custom icons, add CSS animations manually or use animation libraries like GSAP for complex sequences.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does animation increase file size significantly?</h3>
            <p className="text-sm text-muted-foreground">
              Minimal increase. CSS animation code is typically 200-500 bytes. The SVG paths dominate file size. Animation overhead is negligible.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use these in React/Vue components?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Import the SVG as a component or inline the code. The embedded CSS works within component scopes. No special framework integration needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I change animation direction?</h3>
            <p className="text-sm text-muted-foreground">
              Edit the SVG and modify the animation-direction CSS property. Change from "normal" to "reverse" or "alternate" for different animation patterns.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
