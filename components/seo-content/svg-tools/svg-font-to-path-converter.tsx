import React from "react"

export default function SvgFontToPathConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How SVG Font to Path Conversion Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This converter transforms SVG text elements into vector paths (outlines). Instead of storing "Hello" as text with a font reference, each letter becomes a <code>&lt;path&gt;</code> element with d-attributes describing its shape.
          </p>
          <p>
            The tool reads your SVG, identifies all <code>&lt;text&gt;</code> and <code>&lt;tspan&gt;</code> elements, then uses font data to calculate the exact vector outline of each character. The result is pure vector geometry - no font files needed to render it.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">What happens during conversion:</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Text elements are located and parsed</li>
              <li>Font family, weight, and size are extracted</li>
              <li>Each character is mapped to its glyph outline</li>
              <li>Glyphs are positioned according to kerning and spacing</li>
              <li>Text is replaced with equivalent path elements</li>
              <li>Fill and stroke attributes transfer to the paths</li>
            </ul>
          </div>
          <p>
            This process is called "outlining" or "creating outlines" in design software. Once converted, the text is no longer editable as text - it's just shapes. But it renders identically on any device, regardless of installed fonts.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Ensuring consistent logo rendering</h3>
            <p className="text-sm text-muted-foreground">
              Your logo uses a custom font. When clients open your SVG, they might not have that font installed. Convert to paths and the logo looks identical everywhere - no font substitution surprises.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing files for laser cutting or CNC</h3>
            <p className="text-sm text-muted-foreground">
              Manufacturing equipment reads vector paths, not text. Convert text to paths before sending SVG files to laser cutters, plotters, or CNC machines. The machine sees letters as cuttable shapes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating text effects that require path manipulation</h3>
            <p className="text-sm text-muted-foreground">
              Want to warp, distort, or morph text? You can't do that with live text. Convert to paths first, then apply SVG filters, path operations, or JavaScript transformations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Embedding SVGs in systems without font support</h3>
            <p className="text-sm text-muted-foreground">
              Some email clients, older browsers, or embedded systems don't handle web fonts reliably. Outlined text renders as shapes - guaranteed to display correctly everywhere.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Protecting text from extraction</h3>
            <p className="text-sm text-muted-foreground">
              Converting text to paths makes it harder (but not impossible) for others to copy your wording. Useful for watermarks, certificates, or designs where you don't want easy text extraction.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with decorative or icon fonts</h3>
            <p className="text-sm text-muted-foreground">
              Icon fonts like Font Awesome render as text but represent symbols. Convert to paths to use individual icons without loading the entire font file. Reduces dependencies and file size.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Text becomes uneditable.</strong>
              Once converted to paths, you can't change "Hello" to "World" by editing text. You'd need to modify individual path points or revert to the original SVG. Always keep a backup with live text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Font must be available for conversion.</strong>
              The converter needs access to the font data. System fonts work fine. Custom web fonts may not convert correctly unless they're embedded or the converter has access to them.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">File size may increase.</strong>
              A single text element becomes dozens of path commands. Simple text might grow from 50 bytes to 5KB. For large text blocks, consider keeping as text unless you specifically need paths.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Accessibility is lost.</strong>
              Screen readers can't read outlined text - it's just shapes to them. If accessibility matters, keep a hidden text element or use aria-label attributes for context.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For logos, convert to paths but keep the original text-based SVG in your asset library. Use the outlined version for distribution, the editable version for future modifications.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert paths back to text?</h3>
            <p className="text-sm text-muted-foreground">
              Not automatically. Path-to-text conversion requires optical character recognition (OCR) or manual tracing. Some vector tools like Illustrator have "Create Outlines" (text to path) but no reliable reverse operation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens to text animations?</h3>
            <p className="text-sm text-muted-foreground">
              Animations on text elements (like opacity fades) transfer to the path group. But text-specific animations (typewriter effects, character-by-character reveals) need to be reworked for path elements.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work with emoji?</h3>
            <p className="text-sm text-muted-foreground">
              Emoji are complex glyphs often composed of multiple colors and gradients. Basic converters may not handle color emoji correctly. Test your specific emoji - some convert as single-color silhouettes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will kerning be preserved?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, proper converters use the font's kerning tables to position each glyph exactly as the text renderer would. The visual result should be pixel-perfect identical to the original text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert only some text elements?</h3>
            <p className="text-sm text-muted-foreground">
              Some converters let you select which text elements to outline. If this tool converts all text, do a partial conversion in a vector editor, or split your SVG into multiple files.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I verify the conversion worked?</h3>
            <p className="text-sm text-muted-foreground">
              Open the converted SVG in a text editor. If you see <code>&lt;path d="M..."/&gt;</code> elements instead of <code>&lt;text&gt;</code>, conversion succeeded. Visually compare before and after - they should look identical.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this the same as "Create Outlines" in Illustrator?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, conceptually identical. Illustrator's "Create Outlines" and this converter both transform text to vector paths. The output format differs slightly but the visual result is the same.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
