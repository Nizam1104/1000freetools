import React from "react";

export function CSSGradientGeneratorSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What This Tool Generates
        </h2>
        <p className="text-muted-foreground">
          This tool creates production-ready CSS gradient code for linear and radial gradients. You control the angle (for linear), shape and position (for radial), and add as many color stops as you need. The preview updates in real-time, and you can copy the CSS directly or copy the preview as a PNG image.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Linear vs. Radial Gradients
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Linear Gradients</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Colors transition along a straight line at a specified angle. 0deg goes bottom to top, 90deg goes left to right, 180deg goes top to bottom, 270deg goes right to left.
            </p>
            <p className="text-sm font-mono text-muted-foreground">
              linear-gradient(135deg, #6366f1 0%, #a855f7 100%)
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Radial Gradients</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Colors radiate outward from a center point. You can choose circle (equal radius) or ellipse (stretched), and position the center anywhere (center, top left, bottom right, etc.).
            </p>
            <p className="text-sm font-mono text-muted-foreground">
              radial-gradient(circle at center, #6366f1 0%, #a855f7 100%)
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Working with Color Stops
        </h2>
        <p className="text-muted-foreground mb-4">
          Each color stop has two properties: the color itself and its position (0-100%). The gradient interpolates smoothly between stops. Key points:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>You need at least 2 stops — a start and an end</li>
          <li>Stops don't need to be at 0% and 100% — you can have all stops clustered in the middle</li>
          <li>The order of stops matters — rearranging them changes the gradient flow</li>
          <li>Hard stops are possible by setting two stops at the same position with different colors</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Who Uses CSS Gradients and Why
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Backgrounds Without Images</h3>
            <p className="text-sm text-muted-foreground">
              Gradients load instantly (no HTTP request), scale to any size without pixelation, and can be modified with CSS variables for theme switching.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Button Hover States</h3>
            <p className="text-sm text-muted-foreground">
              A subtle gradient adds depth to buttons. On hover, shift the angle or adjust color stops for an interactive feel without JavaScript.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Card and Section Dividers</h3>
            <p className="text-sm text-muted-foreground">
              Use a gradient that transitions from your background color to transparent for smooth visual separation between sections.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Loading Skeletons</h3>
            <p className="text-sm text-muted-foreground">
              Animated gradients create the "shimmer" effect on loading placeholders. Generate the base gradient, then animate the background-position.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Tips for Better Gradients
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Use colors with similar lightness for subtle gradients.</strong> A gradient from #3B82F6 to #1E3A8A (both medium-dark blues) feels more sophisticated than one from bright blue to black.
          </p>
          <p>
            <strong>Add a middle stop for more control.</strong> Instead of just start and end, add a stop at 50% with a slightly different hue. This creates a more complex, interesting transition.
          </p>
          <p>
            <strong>Test on both light and dark backgrounds.</strong> If your gradient will sit on a colored background, preview it in context. A gradient that looks great on white might disappear on dark gray.
          </p>
          <p>
            <strong>Consider the angle carefully.</strong> Diagonal gradients (135deg or 315deg) often feel more dynamic than horizontal or vertical ones. But for UI elements, subtle vertical gradients (180deg, top to bottom) mimic natural light and feel more natural.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Can I use RGBA colors for transparent gradients?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but this tool doesn't have an alpha slider. Manually edit the CSS after copying — change {`#6366f1`} to {`rgba(99, 102, 241, 0.5)`} for 50% opacity.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I create a hard edge instead of a smooth transition?</h3>
            <p className="text-sm text-muted-foreground">
              Set two color stops at the same position. For example: {`linear-gradient(90deg, #6366f1 50%, #a855f7 50%)`} creates a sharp line at the 50% mark.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why does my radial gradient look cut off?</h3>
            <p className="text-sm text-muted-foreground">
              Radial gradients extend to the farthest corner by default. If your center is off-center (like "top left"), the gradient might extend beyond your visible area. Try adjusting the position or using "ellipse" instead of "circle".
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I animate CSS gradients?</h3>
            <p className="text-sm text-muted-foreground">
              You can't animate the gradient itself, but you can animate background-position for moving gradients, or transition between two different gradients (though this can be janky). For smooth animations, consider using CSS custom properties and animating those.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's the browser support for CSS gradients?</h3>
            <p className="text-sm text-muted-foreground">
              Excellent. All modern browsers support linear-gradient and radial-gradient without prefixes. IE10+ has support. You can safely use gradients in production without fallbacks for most use cases.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I copy the preview as an image?</h3>
            <p className="text-sm text-muted-foreground">
              Click the "Copy Preview" button. This renders the gradient to a canvas and copies it as a PNG to your clipboard. You can then paste it into design tools, documents, or image editors.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How This Compares to Other Gradient Tools
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>vs. CSS-Tricks Gradient Generator:</strong> This tool has a cleaner interface and lets you reorder color stops with up/down buttons. The preview also shows your gradient applied to sample UI elements (buttons, cards) so you can see it in context.
          </p>
          <p>
            <strong>vs. Grabient:</strong> Grabient is great for browsing pre-made gradients. This tool is for creating custom gradients from scratch with precise control over every stop.
          </p>
          <p>
            <strong>vs. Hand-coding:</strong> You could write gradient CSS manually, but adjusting angles and stop positions requires trial and error. This tool gives instant visual feedback.
          </p>
        </div>
      </div>
    </section>
  );
}

export default CSSGradientGeneratorSEO;
