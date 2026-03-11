import React from "react"

export default function AnimatedSvgLottiePlayerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Choose between SVG Animation mode for animated SVG files or Lottie JSON mode for After Effects exports. Upload your file or paste the code directly into the text area.
          </p>
          <p>
            Use the playback controls to play, pause, or reset the animation. Adjust the speed slider from 0.25x to 3x to preview at different rates. Toggle looping to see how the animation repeats.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Supported formats:</p>
            <ul className="text-sm space-y-1">
              <li><strong>Animated SVG:</strong> SVG with SMIL animations, CSS animations, or JavaScript-driven motion</li>
              <li><strong>Lottie JSON:</strong> Bodymovin exports from After Effects, standard .json format</li>
            </ul>
          </div>
          <p>
            The validation panel shows whether your file structure is valid. For Lottie files, it confirms JSON parsing success. For SVG, it checks for valid XML structure.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing Lottie animations before implementation</h3>
            <p className="text-sm text-muted-foreground">
              Preview animations exported from After Effects before handing off to developers. Catch timing issues, check loop points, verify all elements animate correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging animation problems</h3>
            <p className="text-sm text-muted-foreground">
              Animation not working in your app? Load it here to verify the file itself is valid. Isolate whether issues are in the file or your implementation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Reviewing animator deliverables</h3>
            <p className="text-sm text-muted-foreground">
              Clients and managers can preview animations without installing players. Share a quick preview link or screenshot from the tool for approval.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Checking animation speed</h3>
            <p className="text-sm text-muted-foreground">
              Use the speed control to test animations at different rates. Find the perfect timing before committing to code. Slow down to inspect frame-by-frame.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Validating file integrity</h3>
            <p className="text-sm text-muted-foreground">
              Confirm downloaded or received animation files aren't corrupted. The validator catches malformed JSON or broken SVG structure immediately.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Comparing animation versions</h3>
            <p className="text-sm text-muted-foreground">
              Load different versions of an animation to compare changes. Check if v2 fixed the issues from v1. Quick A/B testing for animation iterations.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Lottie playback is limited.</strong>
              Full Lottie animation requires a dedicated player library. This tool validates structure and shows basic preview. For complete playback, use lottie-web or lottie-react.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">SVG animations vary by type.</strong>
              SMIL animations have limited browser support. CSS animations work in most browsers. JavaScript-driven animations need their runtime environment.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Speed control is approximate.</strong>
              The speed slider adjusts timing visually. Actual implementation speed may vary based on your playback library and device performance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Large files may load slowly.</strong>
              Complex Lottie files with many layers can be several megabytes. Allow time for parsing and preview generation.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For production use, always test animations on actual target devices. Desktop preview may not reflect mobile performance. Check frame rates on older phones.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between SVG and Lottie?</h3>
            <p className="text-sm text-muted-foreground">
              SVG is a vector image format that can include animations. Lottie is a JSON-based animation format exported from After Effects. Lottie supports more complex animations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I edit the animation in this tool?</h3>
            <p className="text-sm text-muted-foreground">
              This is a preview and validation tool, not an editor. Make changes in After Effects for Lottie or your vector editor for SVG, then re-export.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why isn't my Lottie animation playing?</h3>
            <p className="text-sm text-muted-foreground">
              Full Lottie playback requires a dedicated library. This tool shows the JSON structure and validates it. Use lottie-web for complete browser playback.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What validation checks are performed?</h3>
            <p className="text-sm text-muted-foreground">
              For SVG: XML parsing, structure validity. For Lottie: JSON parsing, basic structure check. Deep animation validation requires specialized tools.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I download the animation from here?</h3>
            <p className="text-sm text-muted-foreground">
              This tool previews existing files. Download from your source (After Effects export, design tool, etc.). Use the validation to confirm file integrity.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I use Lottie in my website?</h3>
            <p className="text-sm text-muted-foreground">
              Include the lottie-web library, load your JSON file, and configure the player. Check the LottieFiles documentation for implementation guides.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are there file size limits?</h3>
            <p className="text-sm text-muted-foreground">
              Browser memory limits apply. Files under 5MB work best. Larger files may cause slow loading or crashes on low-memory devices.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
