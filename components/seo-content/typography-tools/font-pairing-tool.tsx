import React from "react"

export default function FontPairingToolSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Font Pairing Tool Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool helps you find fonts that work well together. Select a primary font for headings, and the tool suggests complementary fonts for body text, or vice versa.
          </p>
          <p>
            Good font pairing combines contrast with harmony. Pair a decorative heading font with a simple body font. Or use different weights of the same font family for a clean, cohesive look.
          </p>
          <p>
            Preview your pairing with sample content that shows headings, body text, and accents. See how the fonts interact before committing to them in your design. Export CSS for immediate use.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Starting a new brand identity</h3>
            <p className="text-sm text-muted-foreground">
              Your brand needs a typography system. Test different font pairings to find one that matches your brand personality—professional, playful, modern, or classic.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Redesigning an existing website</h3>
            <p className="text-sm text-muted-foreground">
              Your site looks dated. Fresh font pairings can modernize it without a full redesign. Test combinations that maintain readability while updating the aesthetic.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating presentation slides</h3>
            <p className="text-sm text-muted-foreground">
              Slide decks need clear hierarchy. Pair a bold font for titles with a readable font for bullet points. Test pairings at presentation size before finalizing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing marketing materials</h3>
            <p className="text-sm text-muted-foreground">
              Brochures, flyers, and ads benefit from distinctive font pairings. Find combinations that grab attention while keeping body copy readable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building email templates</h3>
            <p className="text-sm text-muted-foreground">
              Email clients have limited font support. Test pairings using web-safe fonts or ensure your web fonts have good fallbacks for consistent rendering.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating YouTube thumbnails</h3>
            <p className="text-sm text-muted-foreground">
              Thumbnails need bold, readable fonts. Pair an attention-grabbing title font with a simpler font for supporting text. Test at thumbnail size.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Limit yourself to 2-3 fonts max.</strong>
              More fonts create visual chaos. One for headings, one for body, maybe an accent font. Restraint creates professionalism.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Contrast creates hierarchy.</strong>
              Pair serif with sans-serif, or script with geometric. Similar fonts compete; different fonts complement. But don't pair two decorative fonts together.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Consider font loading performance.</strong>
              Each web font adds HTTP requests and file size. Google Fonts is fast, but custom fonts may slow your site. Balance aesthetics with performance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Test on multiple devices.</strong>
              Fonts render differently on Mac, Windows, and mobile. A pairing that looks great on your monitor might look off on other screens.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> When in doubt, use different weights of the same font family. Bold for headings, regular for body. It always works and loads faster.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I pair two serif fonts?</h3>
            <p className="text-sm text-muted-foreground">
              It's risky but possible. They need clear contrast—one traditional, one modern; or very different weights. Usually safer to pair serif with sans-serif.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What fonts pair well with everything?</h3>
            <p className="text-sm text-muted-foreground">
              Sans-serif fonts like Inter, Open Sans, or Lato are versatile. For serif, Merriweather and Playfair Display pair well with many sans-serif body fonts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I use script fonts?</h3>
            <p className="text-sm text-muted-foreground">
              Script fonts work for accents—logos, pull quotes, decorative elements. Never for body text or long headings. Use sparingly for maximum impact.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I know if fonts clash?</h3>
            <p className="text-sm text-muted-foreground">
              Clashing fonts compete for attention or have conflicting moods. If your eye doesn't know where to look, or the vibe feels inconsistent, try different pairings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do free fonts look professional?</h3>
            <p className="text-sm text-muted-foreground">
              Absolutely. Google Fonts offers professional-quality fonts used by major brands. Font choice and pairing matter more than whether you paid for them.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about variable fonts?</h3>
            <p className="text-sm text-muted-foreground">
              Variable fonts offer multiple weights in one file. Great for pairing—you get light, regular, bold, and black from a single font family. Efficient and flexible.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I test font accessibility?</h3>
            <p className="text-sm text-muted-foreground">
              Check contrast ratios, test with screen readers, and ensure fonts are legible at small sizes. Avoid overly decorative fonts for essential content.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
