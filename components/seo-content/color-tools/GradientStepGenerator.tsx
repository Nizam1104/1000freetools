import React from "react";

export function GradientStepGeneratorSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What This Tool Does
        </h2>
        <p className="text-muted-foreground">
          Given two colors, this tool generates evenly spaced intermediate colors between them. Specify 2-20 steps and get a smooth gradient palette where each step transitions smoothly from the start color to the end color.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How Gradient Interpolation Works
        </h2>
        <p className="text-muted-foreground mb-4">
          The tool converts both colors to RGB, then calculates the difference for each channel. It divides this difference by the number of steps to find the increment for each step.
        </p>
        <p className="text-muted-foreground mb-4">
          For #3B82F6 (blue) to #10B981 (green) with 5 steps:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
          <li>Step 1: #3B82F6 (start)</li>
          <li>Step 2: #3591C4 (intermediate)</li>
          <li>Step 3: #2FA092 (middle)</li>
          <li>Step 4: #29AF60 (intermediate)</li>
          <li>Step 5: #10B981 (end)</li>
        </ul>
        <p className="text-muted-foreground">
          Each channel (R, G, B) changes by a fixed amount per step, creating a smooth transition.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          When to Use Gradient Steps
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Progress Indicators</h3>
            <p className="text-sm text-muted-foreground">
              A 5-step gradient from gray to green shows completion progress. Each step represents 20% completion with a corresponding color.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Heat Maps</h3>
            <p className="text-sm text-muted-foreground">
              Map data values to gradient steps. Low values get the start color, high values get the end color, middle values get intermediate steps.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Animation Keyframes</h3>
            <p className="text-sm text-muted-foreground">
              Create smooth color animations by tweening through gradient steps. Each step becomes a keyframe in your CSS animation.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Loading Skeletons</h3>
            <p className="text-sm text-muted-foreground">
              The "shimmer" effect on loading placeholders uses a gradient that animates across the element. Generate the steps and apply as keyframes.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Export Formats
        </h2>
        <p className="text-muted-foreground mb-3">
          CSS Variables export:
        </p>
        <pre className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto mb-4">
          {`:root {
  --gradient-step-1: #3B82F6;
  --gradient-step-2: #3591C4;
  --gradient-step-3: #2FA092;
  --gradient-step-4: #29AF60;
  --gradient-step-5: #10B981;
}`}
        </pre>
        <p className="text-muted-foreground">
          JavaScript array export for use in React, Vue, or animation libraries:
        </p>
        <pre className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          {`const gradientSteps = [
  '#3B82F6', '#3591C4', '#2FA092', '#29AF60', '#10B981'
];`}
        </pre>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Why do some gradients look muddy in the middle?</h3>
            <p className="text-sm text-muted-foreground">
              RGB interpolation can produce grayish middles when colors are far apart on the color wheel. For cleaner transitions, use colors that are closer together, or interpolate in HSL space (not yet supported).
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I create a 3-color gradient?</h3>
            <p className="text-sm text-muted-foreground">
              This tool handles 2-color gradients. For 3+ colors, use the Gradient Palette Generator which supports multiple color stops.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How many steps should I use?</h3>
            <p className="text-sm text-muted-foreground">
              5-10 steps works for most cases. More steps = smoother transitions but more CSS. For CSS animations, 10-20 steps give smoother results.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I reverse the gradient?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, swap the start and end colors. The tool will generate the same steps in reverse order.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I use this for animations?</h3>
            <p className="text-sm text-muted-foreground">
              Export as CSS variables, then create keyframes that animate through each step. Or use the JavaScript array with an animation library like Framer Motion or GSAP.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's the difference between this and Color Scale Generator?</h3>
            <p className="text-sm text-muted-foreground">
              Color Scale Generator creates variations of a single color (lighter/darker). This tool interpolates between two different colors for a transition effect.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Tips for Better Gradient Steps
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Choose compatible colors.</strong> Colors close on the color wheel (like blue to green) interpolate more smoothly than opposites (like red to green).
          </p>
          <p>
            <strong>Match lightness for subtlety.</strong> If both colors have similar lightness, the gradient feels more like a hue shift than a lightness change.
          </p>
          <p>
            <strong>Test at your target size.</strong> A gradient that looks smooth in a large preview might look banded on small elements. Add more steps if needed.
          </p>
          <p>
            <strong>Consider perceptual uniformity.</strong> Equal RGB steps don't always look equally spaced to human eyes. Trust your eyes over the math.
          </p>
        </div>
      </div>
    </section>
  );
}

export default GradientStepGeneratorSEO;
