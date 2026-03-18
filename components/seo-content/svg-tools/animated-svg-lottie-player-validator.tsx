import React from "react"

export default function AnimatedSvgLottiePlayerValidatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Animated SVG/Lottie Validator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool checks your Lottie JSON or animated SVG files for common issues that cause playback problems. It validates structure, checks for unsupported features, and reports errors that might break animations in your app.
          </p>
          <p>
            Lottie files are JSON-based animations exported from After Effects via the Bodymovin plugin. The validator parses your JSON, checks required properties (v, fr, ip, fp, layers), and flags potential issues like missing assets, invalid keyframes, or properties that won't render on all platforms.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">What gets validated:</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>JSON structure - required Lottie properties present</li>
              <li>Version compatibility - bodymovin version checks</li>
              <li>Layer structure - null layers, shape layers, solids</li>
              <li>Keyframe data - valid timing, interpolation types</li>
              <li>Asset references - images, precomps, fonts linked correctly</li>
              <li>Expression usage - flagged (not supported in all players)</li>
              <li>File size warnings - large animations may cause performance issues</li>
            </ul>
          </div>
          <p>
            For animated SVGs, the tool checks for SMIL animation elements (<code>&lt;animate&gt;</code>, <code>&lt;animateTransform&gt;</code>), CSS animations, and JavaScript-based animations. It reports browser compatibility notes since SMIL is deprecated in some browsers.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Before deploying Lottie animations</h3>
            <p className="text-sm text-muted-foreground">
              Your designer exported a Lottie file but it's not playing in production. Run it through the validator first - it might have expressions that the web player doesn't support, or missing image assets.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging broken animations</h3>
            <p className="text-sm text-muted-foreground">
              An animation works in After Effects preview but fails in your React app. The validator shows what features are used - maybe it relies on effects that don't translate to Lottie format.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Checking Lottie files from third parties</h3>
            <p className="text-sm text-muted-foreground">
              Downloaded a free Lottie animation from a marketplace? Validate it before using. Some files use features that only work in specific players or have bloated file sizes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Optimizing animation performance</h3>
            <p className="text-sm text-muted-foreground">
              The validator reports file size and layer count. Animations with 100+ layers or 500KB+ JSON may cause jank on mobile. Use the report to identify optimization opportunities.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Verifying SVG animation compatibility</h3>
            <p className="text-sm text-muted-foreground">
              Created an animated SVG with SMIL? The validator checks if you're using deprecated elements. Modern browsers still support SMIL but Safari has limitations - you might need CSS or JS alternatives.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">QA for design handoffs</h3>
            <p className="text-sm text-muted-foreground">
              Designers hand off Lottie files as part of a sprint. Run validation as part of your acceptance checklist - catch issues before they reach development.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Lottie version matters.</strong>
              Different Lottie players support different bodymovin versions. The validator flags version mismatches - if your file uses v5.7+ features but you're using lottie-web 5.5, expect issues.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Expressions aren't universally supported.</strong>
              After Effects expressions (like <code>wiggle(2, 10)</code>) work in After Effects but many Lottie players can't execute them. The validator flags expression usage so you know to bake animations into keyframes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Image assets need separate handling.</strong>
              If your Lottie references external images, the validator shows the asset paths. You'll need to host these images separately or use base64-encoded assets in the JSON.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">SMIL animation is deprecated.</strong>
              SVG SMIL animations (<code>&lt;animate&gt;</code> elements) work in most browsers but aren't part of SVG 2.0. For critical animations, consider CSS animations or JavaScript libraries like GSAP.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> If the validator reports "expressions detected," ask your designer to pre-compose or bake the animation. Expressions add runtime complexity and often fail in mobile Lottie players.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between Lottie and animated SVG?</h3>
            <p className="text-sm text-muted-foreground">
              Lottie is JSON-based, exported from After Effects, and requires the lottie-web/player library. Animated SVG is native XML with SMIL, CSS, or JS animations. Lottie offers more complex animations; SVG has better browser support without dependencies.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my Lottie file show "unsupported features"?</h3>
            <p className="text-sm text-muted-foreground">
              After Effects has effects and layer styles that don't translate to Lottie format. Things like drop shadows, blurs, and certain blending modes may not render. The validator lists unsupported features so you can redesign around them.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I fix "missing assets" errors?</h3>
            <p className="text-sm text-muted-foreground">
              If your Lottie references external images, ensure the image files exist at the specified paths. For web use, either host images at those paths or re-export with "Embed assets" enabled to base64-encode them in the JSON.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can this validate Lottie files for iOS/Android?</h3>
            <p className="text-sm text-muted-foreground">
              The validator checks general Lottie compatibility. However, mobile Lottie libraries (lottie-ios, lottie-android) have their own limitations. Test on target platforms - some features work on web but not mobile.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a reasonable Lottie file size?</h3>
            <p className="text-sm text-muted-foreground">
              Aim for under 100KB for simple icons, under 300KB for complex animations. Files over 500KB may cause noticeable load delays on mobile. If your file is large, consider simplifying shapes or splitting into multiple animations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this tool play/preview animations?</h3>
            <p className="text-sm text-muted-foreground">
              This is a validator, not a player. It checks file structure and reports issues. For preview, use the LottieFiles previewer or drop your file into a test page with lottie-web.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I validate SVG files with CSS animations?</h3>
            <p className="text-sm text-muted-foreground">
              The validator checks for <code>&lt;style&gt;</code> blocks with <code>@keyframes</code> and animated properties. It reports which properties are animated but doesn't verify CSS syntax - use a CSS validator for that.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
