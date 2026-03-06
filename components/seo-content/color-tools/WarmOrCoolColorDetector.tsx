import React from "react";

export function WarmOrCoolColorDetectorSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What Is Color Temperature?
        </h2>
        <p className="text-muted-foreground">
          Color temperature describes whether a color feels warm (reds, oranges, yellows) or cool (greens, blues, purples). It's determined by the hue value on a 0-360 degree scale. Warm colors fall between 0-60° and 300-360°. Cool colors fall between 60-300°.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How the Detection Works
        </h2>
        <p className="text-muted-foreground mb-4">
          The tool converts your input color to HSL format and checks the hue value. That's it — no complex algorithms, just a straightforward range check. The hue scale wraps around (0° and 360° are both pure red), so warm colors exist at both ends.
        </p>
        <p className="text-muted-foreground">
          Along with the warm/cool classification, the tool shows your color's complementary (opposite temperature) and analogous colors (same temperature neighborhood).
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          When Color Temperature Matters
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Maintaining Visual Consistency</h3>
            <p className="text-sm text-muted-foreground">
              A designer is building a wellness app and wants a calm, trustworthy feel. They stick to cool colors (blues, greens) throughout. When someone suggests adding an orange CTA button, this tool confirms it's warm — which would clash with the cool theme.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Creating Intentional Contrast</h3>
            <p className="text-sm text-muted-foreground">
              A landing page uses cool blues for the background. The designer wants the signup button to pop. They use this tool to find warm colors (oranges, reds) that will stand out against the cool background.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Brand Alignment</h3>
            <p className="text-sm text-muted-foreground">
              A financial services company wants to convey trust and stability. Their brand guidelines specify cool colors. A new marketer suggests a vibrant red logo — this tool quickly shows that red is warm, helping them explain why it doesn't fit the brand.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Seasonal Design Adjustments</h3>
            <p className="text-sm text-muted-foreground">
              An e-commerce site wants warmer colors for fall/winter promotions and cooler colors for spring/summer. The marketing team uses this tool to verify their promotional colors match the intended seasonal mood.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Warm vs. Cool: What Each Communicates
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Warm Colors (0-60°, 300-360°)</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Reds, oranges, yellows, and magentas. These feel energetic, urgent, and attention-grabbing.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Common uses:</strong> Sale badges, CTA buttons, food brands, entertainment, sports, children's products.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Cool Colors (60-300°)</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Greens, blues, and purples. These feel calm, professional, and trustworthy.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Common uses:</strong> Healthcare, finance, technology, corporate branding, environmental products, wellness.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">What about colors right on the boundary?</h3>
            <p className="text-sm text-muted-foreground">
              A hue of exactly 60° is pure yellow-green — technically cool by this tool's definition, but it feels borderline. Same with 300° (pure magenta). These boundary colors can work in both warm and cool palettes depending on context.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Does saturation or lightness affect temperature?</h3>
            <p className="text-sm text-muted-foreground">
              Not in this tool's classification — only hue matters. But perceptually, yes: a desaturated warm color (like beige) can feel more neutral, and a very dark cool color (like navy) can feel warmer than a light cool color (like sky blue).
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why does the complementary color have opposite temperature?</h3>
            <p className="text-sm text-muted-foreground">
              Complementary colors are 180° apart on the wheel. Since warm ranges are 0-60° and 300-360° (total 120°), and cool is 60-300° (240°), adding 180° to a warm hue lands you in the cool range, and vice versa.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can a color be both warm and cool?</h3>
            <p className="text-sm text-muted-foreground">
              Not by this tool's definition — it's binary based on hue. But in practice, some colors feel ambiguous. A teal (around 170°) might read as cool in one context and neutral in another. Purple-reds near 300° can go either way.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I use the analogous colors?</h3>
            <p className="text-sm text-muted-foreground">
              Analogous colors sit ±30° from your base color. They share the same temperature and create harmonious, low-contrast palettes. Use them when you want variety without introducing temperature tension.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What if I need a neutral color?</h3>
            <p className="text-sm text-muted-foreground">
              True neutrals (grays, black, white) have no hue, so this tool can't classify them. For near-neutrals like beige or taupe, the hue might technically fall in warm or cool range, but they'll feel mostly neutral in practice.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Using Temperature for Better Palettes
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Stick to one temperature for cohesion.</strong> A palette of all cool colors (or all warm) feels unified and calm. This works well for brands that want to convey stability.
          </p>
          <p>
            <strong>Mix temperatures for energy.</strong> Combining warm and cool creates visual tension and excitement. Use this for dynamic brands, entertainment, or when you want to draw attention.
          </p>
          <p>
            <strong>Use temperature for hierarchy.</strong> Make primary actions warm (urgent, attention-grabbing) and secondary elements cool (calm, receding). This guides the eye naturally.
          </p>
          <p>
            <strong>Consider your audience's context.</strong> Warm colors feel aggressive in some cultures, welcoming in others. Cool colors feel professional in the West but can feel cold or impersonal elsewhere.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WarmOrCoolColorDetectorSEO;
