export default function HexColorRegexSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This hex color validator checks if strings match valid hexadecimal color codes, 
            ensuring color values are properly formatted for web and design use.
          </p>
          <p className="text-muted-foreground">
            The validation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Format detection:</strong> Input is checked for hex color format (# followed by hex digits).</li>
            <li><strong className="text-foreground">Length validation:</strong> Colors must be 3 digits (#RGB), 6 digits (#RRGGBB), or optionally 8 digits (#RRGGBBAA).</li>
            <li><strong className="text-foreground">Character validation:</strong> Only valid hex characters (0-9, A-F, a-f) are accepted after the #.</li>
            <li><strong className="text-foreground">Result reporting:</strong> Each color is marked valid or invalid with specific error messages.</li>
          </ol>
          <p className="text-muted-foreground">
            Hex color validation is essential for design tools, CSS preprocessing, 
            and any application that accepts user-defined colors.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Design Tool Input",
              description: "Validate color inputs in design applications before applying to elements."
            },
            {
              title: "CSS Preprocessing",
              description: "Verify color variables and mixins contain valid hex values."
            },
            {
              title: "Theme Configuration",
              description: "Validate color schemes in configuration files for websites and apps."
            },
            {
              title: "Data Cleaning",
              description: "Standardize color data in databases by validating and normalizing formats."
            },
            {
              title: "Form Validation",
              description: "Check color picker fallback inputs for valid hex codes."
            },
            {
              title: "Brand Compliance",
              description: "Verify that user-submitted designs use valid color codes matching brand guidelines."
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-muted/30 p-4 space-y-2">
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">What to Know Before Using</h2>
        <div className="space-y-3">
          {[
            {
              caveat: "Case doesn't matter for validity",
              explanation: "#FFF, #fff, and #FfF are all valid and equivalent. Case affects appearance only, not the actual color."
            },
            {
              caveat: "3-digit colors are shorthand",
              explanation: "#RGB expands to #RRGGBB (each digit doubled). #F00 = #FF0000 (red). Not all colors can be represented in 3 digits."
            },
            {
              caveat: "Alpha channel is optional",
              explanation: "#RRGGBBAA includes transparency (00 = transparent, FF = opaque). Not all systems support 8-digit hex colors."
            },
            {
              caveat: "Hash is required",
              explanation: "Valid hex colors include the # prefix. Some systems accept colors without #, but standard CSS requires it."
            },
            {
              caveat: "Hex isn't the only color format",
              explanation: "RGB, RGBA, HSL, HSLA, and named colors are also valid. Hex validation doesn't verify these alternative formats."
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-muted/30 p-4">
              <h3 className="font-semibold text-foreground mb-1">{item.caveat}</h3>
              <p className="text-sm text-muted-foreground">{item.explanation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Common Questions</h2>
        <div className="space-y-6">
          {[
            {
              question: "What's the regex for hex colors?",
              answer: "Basic: /^#?[0-9A-Fa-f]{6}$/. With 3-digit support: /^#?([0-9A-Fa-f]{3}){1,2}$/. With alpha: /^#?([0-9A-Fa-f]{2}){3,4}$/"
            },
            {
              question: "Is #GGG a valid color?",
              answer: "No. G is not a valid hex digit. Hex uses 0-9 and A-F only. #GGG would be rejected by validation."
            },
            {
              question: "Can hex colors be lowercase?",
              answer: "Yes, #ffffff and #FFFFFF are identical. CSS is case-insensitive for hex colors. Choose a convention for consistency."
            },
            {
              question: "What about colors without #?",
              answer: "In CSS, # is required. Some design tools accept colors without #. Add # for web compatibility."
            },
            {
              question: "How do I convert hex to RGB?",
              answer: "Split #RRGGBB into pairs, convert each from hex to decimal. #FF0000 → R:255, G:0, B:0. Many online converters do this automatically."
            },
            {
              question: "What's the difference between #FFF and #FFFFFF?",
              answer: "No difference in final color. #FFF is shorthand that expands to #FFFFFF. Use #FFF for brevity, #FFFFFF for explicit clarity."
            },
            {
              question: "Can I use hex colors everywhere?",
              answer: "Hex works in CSS, HTML, SVG, and most design tools. Some contexts prefer RGB or HSL for programmatic manipulation."
            },
          ].map((item, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="font-semibold text-foreground">{item.question}</h3>
              <p className="text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
