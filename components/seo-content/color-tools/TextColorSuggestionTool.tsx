import React from "react";

export function TextColorSuggestionToolSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What This Tool Does
        </h2>
        <p className="text-muted-foreground">
          You provide a background color, and this tool generates 8 text color options ranked by contrast ratio. Each suggestion includes the WCAG compliance level (AA or AAA) and the exact contrast ratio, so you can pick an accessible color that also fits your design.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How the Suggestions Are Generated
        </h2>
        <p className="text-muted-foreground mb-4">
          The tool calculates contrast ratios between your background and a range of predefined text colors. It filters out any that fail WCAG AA (4.5:1 for normal text), then ranks the passing colors from highest to lowest contrast.
        </p>
        <p className="text-muted-foreground">
          The result is a curated list of accessible options — no guessing, no manual checking.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Who Needs This Tool
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Frontend Developers</h3>
            <p className="text-sm text-muted-foreground">
              Your designer specified a background color but didn't provide text colors. Instead of guessing and re-checking contrast, get instant accessible options.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Designers Building Component Libraries</h3>
            <p className="text-sm text-muted-foreground">
              You're defining text color tokens for a design system. This tool helps you select colors that work across multiple backgrounds while staying accessible.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Content Creators</h3>
            <p className="text-sm text-muted-foreground">
              You're making a social media graphic with colored text. This tool ensures your text is readable for everyone, including people with low vision.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Accessibility Auditors</h3>
            <p className="text-sm text-muted-foreground">
              You're reviewing a site and found inaccessible text. This tool quickly generates compliant alternatives to recommend to the design team.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Understanding the Contrast Ratios
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>4.5:1 (WCAG AA for normal text):</strong> The minimum acceptable contrast for body text. Anything below this fails accessibility requirements.
          </p>
          <p>
            <strong>7:1 (WCAG AAA for normal text):</strong> Enhanced contrast for critical content. Recommended for long-form text, error messages, and important instructions.
          </p>
          <p>
            <strong>3:1 (WCAG AA for large text):</strong> Acceptable for text 18px or larger (or 14px bold). Headings can use this lower threshold.
          </p>
          <p>
            <strong>21:1 (Maximum):</strong> Pure black on pure white. The highest possible contrast, but sometimes too harsh for comfortable reading.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Why are some suggestions gray instead of black?</h3>
            <p className="text-sm text-muted-foreground">
              Dark gray often provides sufficient contrast while feeling softer than pure black. A color like #374151 might score 12:1 on white — well above the 4.5:1 requirement — while looking more refined.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I use these colors on any background?</h3>
            <p className="text-muted-foreground text-sm">
              No, these suggestions are specific to your input background color. A color that works on white might fail on light gray. Always check contrast for each background you use.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What about colored text?</h3>
            <p className="text-sm text-muted-foreground">
              The suggestions include colored options that pass contrast requirements. A dark blue or deep purple might work well on light backgrounds while adding visual interest beyond neutral grays.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Do these work for dark backgrounds too?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, the tool works with any background color. For dark backgrounds, it will suggest light colors (white, light gray, pale yellows) that provide sufficient contrast.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I use these in CSS?</h3>
            <p className="text-sm text-muted-foreground">
              Copy the hex code from any suggestion. For example: {`.text { color: #374151; }`} or {`color: #374151;`} inline. The contrast ratio shown is for your reference.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What if none of the suggestions match my design?</h3>
            <p className="text-sm text-muted-foreground">
              Use the Contrast Checker to test your own colors. The suggestions are starting points — you might find a color between two suggestions that works better for your design.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Tips for Choosing Text Colors
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Higher isn't always better.</strong> 21:1 contrast (black on white) can cause eye strain for some readers. A contrast of 10-15:1 is often more comfortable for long-form content.
          </p>
          <p>
            <strong>Consider your audience.</strong> Older users and people with low vision benefit from higher contrast. For general audiences, AA (4.5:1) is sufficient.
          </p>
          <p>
            <strong>Test in context.</strong> A color that looks good as a swatch might feel different in actual text. Preview your choice at real font sizes before committing.
          </p>
          <p>
            <strong>Think about states.</strong> Your text color needs to work for normal, hover, and visited states. Check that all variations maintain adequate contrast.
          </p>
        </div>
      </div>
    </section>
  );
}

export default TextColorSuggestionToolSEO;
