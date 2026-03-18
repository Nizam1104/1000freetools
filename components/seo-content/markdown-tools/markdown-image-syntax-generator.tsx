import React from "react"

export default function MarkdownImageSyntaxGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool generates proper Markdown image syntax from your inputs.
            Instead of manually typing <code className="font-mono bg-background px-1.5 py-0.5 rounded">![alt text](image-url)</code>,
            you fill in fields for the image URL, alt text, and optional
            parameters, and the tool generates the correct syntax.
          </p>
          <p>
            Markdown images use a specific format that's easy to mistype. This
            generator ensures correct syntax every time and can handle multiple
            images at once, making it faster to add several images to your
            document.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Markdown image syntax:</p>
            <pre className="text-sm bg-background p-3 rounded overflow-x-auto">
{`![Alt text describing the image](https://example.com/image.png)

With optional title:
![Alt text](https://example.com/image.png "Hover title")`}
            </pre>
          </div>
          <p>
            Enter your image details, preview how it will look, and copy the
            generated syntax. Some tools also support size attributes or
            multiple image generation for galleries.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Adding screenshots to documentation</h3>
            <p className="text-sm text-muted-foreground">
              A developer writes API docs and needs to include multiple
              screenshots. They use this generator to quickly create properly
              formatted image syntax for each screenshot with descriptive alt
              text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating product image galleries</h3>
            <p className="text-sm text-muted-foreground">
              Someone writes a product review in Markdown with multiple photos.
              They generate image syntax for each photo quickly, ensuring
              consistent formatting and proper alt text for accessibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building README files with badges</h3>
            <p className="text-sm text-muted-foreground">
              A developer adds status badges to their GitHub README. They use
              this generator to create image syntax for each badge URL, making
              it easy to add multiple badges with correct formatting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing blog posts with embedded images</h3>
            <p className="text-sm text-muted-foreground">
              A blogger writes posts in Markdown with several images. Instead
              of typing image syntax repeatedly, they generate each one,
              focusing on writing good alt text for SEO and accessibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating tutorial step illustrations</h3>
            <p className="text-sm text-muted-foreground">
              Someone writes a step-by-step tutorial with an image for each
              step. They generate consistent image syntax for all steps,
              ensuring each has descriptive alt text explaining what the image
              shows.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Managing images across multiple Markdown files</h3>
            <p className="text-sm text-muted-foreground">
              A team maintains documentation with images in multiple files.
              They use this generator to ensure consistent image syntax across
              all files, making it easier to update image paths later if needed.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Alt text is important for accessibility.</strong>
              Alt text describes the image for screen readers and when images
              fail to load. Write descriptive alt text that conveys the image's
              purpose, not just "image" or "screenshot".
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Image URLs must be accessible.</strong>
              Images need publicly accessible URLs. Local file paths won't work
              when your Markdown is viewed elsewhere. Use absolute URLs or
              relative paths that work in your deployment context.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Markdown doesn't support image sizing natively.</strong>
              Standard Markdown has no way to specify image dimensions. Some
              platforms support HTML in Markdown for sizing, or use platform-
              specific extensions for size control.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Title text is optional.</strong>
              The title attribute appears on hover in some renderers. It's
              optional and often omitted. Use it for additional context if
              helpful, but don't rely on it for critical information.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For GitHub READMEs, use relative paths
              for images stored in your repo (like <code className="font-mono bg-background px-1.5 py-0.5 rounded">./images/screenshot.png</code>).
              This keeps images versioned with your code and works offline.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I resize images in Markdown?</h3>
            <p className="text-sm text-muted-foreground">
              Standard Markdown doesn't support sizing. Use HTML instead:{" "}
              <code className="font-mono bg-background px-1.5 py-0.5 rounded">&lt;img src="url" alt="text" width="300"&gt;</code>. Some
              platforms also support custom syntax like <code className="font-mono bg-background px-1.5 py-0.5 rounded">![alt](url =300x200)</code>.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add captions to images?</h3>
            <p className="text-sm text-muted-foreground">
              Markdown doesn't have native captions. Add a paragraph below the
              image with italic or small text for the caption. Some platforms
              support custom extensions or HTML figure elements for captions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between inline and reference images?</h3>
            <p className="text-sm text-muted-foreground">
              Inline images include the URL directly. Reference-style images use
              an ID that references a URL defined elsewhere. Reference style is
              cleaner for repeated images or long URLs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do animated GIFs work in Markdown?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Animated GIFs work like any other image. The animation plays
              in platforms that support it (GitHub, most web renderers). Some
              static PDF exports may only show the first frame.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I center images?</h3>
            <p className="text-sm text-muted-foreground">
              Markdown doesn't support alignment. Use HTML:{" "}
              <code className="font-mono bg-background px-1.5 py-0.5 rounded">&lt;div align="center"&gt;![alt](url)&lt;/div&gt;</code> or
              platform-specific solutions. GitHub centers images automatically
              in some contexts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I link images in Markdown?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Wrap the image syntax in a link:{" "}
              <code className="font-mono bg-background px-1.5 py-0.5 rounded">[![alt](image-url)](link-url)</code>. This creates a
              clickable image that navigates to the link when clicked.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What image formats are supported?</h3>
            <p className="text-sm text-muted-foreground">
              Any format your rendering platform supports. Common formats
              include PNG, JPG, GIF, SVG, and WebP. The Markdown syntax is the
              same regardless of format.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle images in local Markdown files?</h3>
            <p className="text-sm text-muted-foreground">
              Use relative paths from your Markdown file's location. For
              example, <code className="font-mono bg-background px-1.5 py-0.5 rounded">./images/photo.png</code> looks in an images
              subfolder. This keeps images organized with your documents.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
