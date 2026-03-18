import React from "react"

export default function HtmlSpecialCharactersLibrarySeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the HTML Special Characters Library Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool provides a searchable reference of HTML entities - special characters that need encoding in HTML. Instead of typing <code>&amp;copy;</code> from memory, search for "copyright" and get the entity code plus a preview.
          </p>
          <p>
            HTML entities come in two forms: named entities (<code>&amp;nbsp;</code>, <code>&amp;mdash;</code>) and numeric entities (<code>&amp;#160;</code>, <code>&amp;#xA0;</code> for hex). This library shows both formats plus the actual character for visual reference.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Character categories included:</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Punctuation - quotes, dashes, ellipsis, bullets</li>
              <li>Currency symbols - dollar, euro, pound, yen, bitcoin</li>
              <li>Mathematical operators - plus, minus, multiply, divide, equals</li>
              <li>Greek letters - alpha, beta, gamma, delta, pi, sigma</li>
              <li>Latin extended - accented characters (é, ñ, ü)</li>
              <li>Arrows - left, right, up, down, diagonal arrows</li>
              <li>Technical symbols - copyright, trademark, registered, section</li>
              <li>Emoji and symbols - hearts, stars, checkmarks</li>
            </ul>
          </div>
          <p>
            Click any character to copy its entity code to clipboard. Search by name ("em dash"), Unicode code point ("U+2014"), or the character itself ("—"). Filter by category to browse related symbols.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing content with proper typography</h3>
            <p className="text-sm text-muted-foreground">
              Your blog post needs proper quotes ("curly" not "straight"), em dashes (— not --), and ellipses (… not ...). Look up the entities, paste into your CMS, and your content looks professionally typeset.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating legal disclaimers</h3>
            <p className="text-sm text-muted-foreground">
              Footers need copyright (©), registered trademark (®), and trademark (™) symbols. Find them quickly, copy the entity, drop into your HTML. No hunting through character maps.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building international forms</h3>
            <p className="text-sm text-muted-foreground">
              Form labels need accented characters for multiple languages. "Café" not "Cafe", "Niño" not "Nino". Use proper HTML entities to ensure correct display across all browsers and systems.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing mathematical content</h3>
            <p className="text-sm text-muted-foreground">
              Math equations need proper operators: × not x for multiplication, ÷ not / for division, ≠ for not-equal. Find the right symbols, use correct entities, and equations render properly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging encoding issues</h3>
            <p className="text-sm text-muted-foreground">
              A character displays as "" or "?" on your site. Look it up in the library to find the correct entity. Replace the broken character with the proper HTML entity and it renders correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating email templates</h3>
            <p className="text-sm text-muted-foreground">
              Email clients have inconsistent character encoding support. Using HTML entities for special characters ensures they display correctly across Gmail, Outlook, Apple Mail, and mobile clients.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">UTF-8 makes many entities optional.</strong>
              With <code>&lt;meta charset="UTF-8"&gt;</code>, you can type most characters directly (é, ©, —). Entities are still useful for characters hard to type or for maximum compatibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some entities have limited support.</strong>
              Named entities like <code>&amp;Exists;</code> or <code>&amp;angmsd;</code> work in modern browsers but might not render in very old browsers. Numeric entities (<code>&amp;#x2203;</code>) have broader support.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Ampersands must be escaped.</strong>
              A literal & in HTML must be written as <code>&amp;amp;</code>. Otherwise browsers think you're starting an entity. This is the one entity you absolutely must use correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Angle brackets in content need entities.</strong>
              To display <code>&lt;div&gt;</code> as text (not as HTML), write <code>&amp;lt;div&amp;gt;</code>. Otherwise browsers try to parse it as a tag.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For content with many special characters, consider using a rich text editor that handles entities automatically. Or write in Markdown and let your static site generator handle encoding.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do I need entities with UTF-8 encoding?</h3>
            <p className="text-sm text-muted-foreground">
              Not strictly - UTF-8 supports virtually all characters directly. But entities are still useful for: characters hard to type, maximum compatibility, documenting intent, and avoiding encoding issues in transit.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between named and numeric entities?</h3>
            <p className="text-sm text-muted-foreground">
              Named entities (<code>&amp;copy;</code>) are human-readable but limited to ~2,000 characters. Numeric entities (<code>&amp;#169;</code> or <code>&amp;#xA9;</code>) work for any Unicode character - over 140,000 possibilities.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I find an entity if I don't know its name?</h3>
            <p className="text-sm text-muted-foreground">
              Search by description ("right arrow"), Unicode code point ("U+2192"), or paste the character itself. The library matches against multiple fields to help you find what you need.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use entities in CSS?</h3>
            <p className="text-sm text-muted-foreground">
              CSS uses Unicode escapes, not HTML entities. For content, use <code>content: "\2014"</code> (hex Unicode) not <code>"&amp;mdash;"</code>. HTML entities only work in HTML content, not CSS.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do some entities look different in different fonts?</h3>
            <p className="text-sm text-muted-foreground">
              Entity codes map to Unicode characters. How they render depends on the font. An em dash in Arial looks slightly different than in Georgia. The entity is correct; font choice affects appearance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are HTML entities case-sensitive?</h3>
            <p className="text-sm text-muted-foreground">
              Named entities are case-sensitive in XHTML (<code>&amp;Lt;</code> won't work) but most browsers accept them case-insensitively in HTML5. Stick to lowercase for consistency and compatibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use entities in JavaScript strings?</h3>
            <p className="text-sm text-muted-foreground">
              HTML entities don't work in JavaScript strings - they're an HTML feature. In JS, use Unicode escapes: <code>"\u00A9"</code> for copyright. Or just type the character directly in UTF-8 encoded files.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
