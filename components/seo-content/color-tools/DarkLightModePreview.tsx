import React from "react";

export function DarkLightModePreviewSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Why Preview Colors in Both Light and Dark Mode
        </h2>
        <p className="text-muted-foreground">
          Modern apps need to work in both light and dark themes. A color that looks great on a white background can disappear or clash when the background switches to dark gray. This tool shows your palette side-by-side in both modes so you catch visibility issues before they reach production.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How Dark Mode Color Adjustment Works
        </h2>
        <p className="text-muted-foreground mb-4">
          The preview simulates how your colors behave when the UI theme changes. Light backgrounds get darkened, vibrant colors stay vibrant, and text colors invert for readability.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Light Mode Behavior</h3>
            <p className="text-sm text-muted-foreground">
              Colors display as-is. White or near-white backgrounds work well. Darker colors provide contrast for text and interactive elements.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Dark Mode Behavior</h3>
            <p className="text-sm text-muted-foreground">
              Light backgrounds automatically darken to prevent eye strain. Pure white becomes a dimmed gray. Accent colors remain visible against the darker surface.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Real Use Cases for This Preview Tool
        </h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Building a Design System</h3>
            <p className="text-sm text-muted-foreground">
              A design team defines their brand palette. They use this tool to verify that their primary blue works as a button background in both themes, and that their light gray surface color doesn't turn muddy when darkened.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Redesigning an Existing App</h3>
            <p className="text-sm text-muted-foreground">
              Someone's adding dark mode to their SaaS dashboard. They paste in their current brand colors, check the dark mode preview, and realize their light accent color vanishes. They adjust to a brighter shade before implementing.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Client Presentations</h3>
            <p className="text-sm text-muted-foreground">
              A freelancer shows a client two theme options. The split view lets the client see both modes simultaneously, making it easier to approve the palette without switching between mockups.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Accessibility Audits</h3>
            <p className="text-sm text-muted-foreground">
              A developer checks whether their color choices maintain sufficient contrast in both themes. They spot low-contrast text in dark mode and adjust the gray values before users complain.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Marketing Site Theming</h3>
            <p className="text-sm text-muted-foreground">
              A marketing team wants their landing page to support system preferences. They test their brand gradient in both modes and discover it needs a slightly different secondary color for dark backgrounds.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What to Know Before Using This Tool
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>The dark mode preview is a simulation.</strong> It approximates how colors behave in a dark theme, but your actual implementation may vary depending on your CSS framework and how you apply theme tokens.
          </p>
          <p>
            <strong>Background colors get special treatment.</strong> Very light colors (like #FFFFFF or #F3F4F6) are automatically darkened in dark mode. This mimics real-world dark theme behavior where pure white backgrounds would cause eye strain.
          </p>
          <p>
            <strong>Accent colors stay mostly unchanged.</strong> Vibrant brand colors like blues, purples, and greens don't get darkened — they're meant to pop against both light and dark surfaces.
          </p>
          <p>
            <strong>You can add up to 10 colors.</strong> Start with your core palette (primary, secondary, accent, background, surface) and add more as needed for states like success, warning, and error.
          </p>
          <p>
            <strong>Use split view for quick comparisons.</strong> The default split view shows both modes side-by-side. Switch to single-mode view if you want to focus on one theme at a time.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Tips for Better Dark Mode Colors
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Avoid pure black backgrounds.</strong> Use #1F2937 or #111827 instead of #000000. Pure black can cause smearing on OLED screens and feels harsh on the eyes.
          </p>
          <p>
            <strong>Desaturate your dark mode accents.</strong> Highly saturated colors can vibrate against dark backgrounds. If your bright yellow looks jarring in dark mode, try a slightly muted version.
          </p>
          <p>
            <strong>Test text contrast separately.</strong> This preview shows approximate readability, but use the Contrast Checker tool to verify your specific text/background combinations meet WCAG AA or AAA standards.
          </p>
          <p>
            <strong>Keep surface colors distinct.</strong> In dark mode, your card background should be noticeably lighter than your page background. A 10-15% lightness difference usually works.
          </p>
          <p>
            <strong>Don't invert your brand.</strong> Dark mode doesn't mean inverting every color. Your primary brand blue should still be blue — just make sure it has enough contrast against dark surfaces.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Why does my light gray turn dark in dark mode?</h3>
            <p className="text-sm text-muted-foreground">
              Light grays and whites are treated as background colors. In dark mode, backgrounds need to be dark to reduce eye strain. The tool automatically darkens colors with high luminance (above 200 on a 0-255 scale).
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I export my palette for use in my project?</h3>
            <p className="text-sm text-muted-foreground">
              This tool focuses on preview rather than export. Copy individual color values using the copy button next to each swatch. For full palette export, use the Palette Export Tool or CSS Variables Generator.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I create a dark mode-specific palette?</h3>
            <p className="text-sm text-muted-foreground">
              Start with your light mode colors, preview them in dark mode, then adjust any that don't work. For a dedicated dark mode palette tool, try the Color Palette Generator and manually set darker base values.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's the difference between this and the Contrast Checker?</h3>
            <p className="text-sm text-muted-foreground">
              This tool shows how colors look in different themes. The Contrast Checker calculates exact WCAG contrast ratios between two specific colors. Use both — preview here, then verify accessibility in the Contrast Checker.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I preview more than 5 colors at once?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, add as many colors as you need using the color editor panel. The preview cards show the first 5 colors in the main swatch row, but all your colors are available for UI component previews.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why do my vibrant colors look different in dark mode?</h3>
            <p className="text-sm text-muted-foreground">
              Colors appear more intense against dark backgrounds due to simultaneous contrast — a perceptual effect where colors look more saturated against dark gray than against white. The tool shows this visual difference.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Should I use different colors for light and dark mode?</h3>
            <p className="text-sm text-muted-foreground">
              Sometimes. Backgrounds and surfaces definitely need different values. Accent colors can often stay the same, but you might need slightly adjusted versions if they don't have enough contrast in one mode.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I implement dark mode in my actual app?</h3>
            <p className="text-sm text-muted-foreground">
              Use CSS custom properties (variables) for your colors, then swap the values based on a data-theme attribute or prefers-color-scheme media query. Export your palette as CSS variables and reference them throughout your stylesheets.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          When to Use This vs. Other Color Tools
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Use this preview tool when</strong> you need to see how your existing palette behaves in both light and dark themes. It's for validation, not generation.
          </p>
          <p>
            <strong>Use the Color Palette Generator when</strong> you're starting from scratch and need to create a monochromatic scale from a single base color.
          </p>
          <p>
            <strong>Use the Contrast Checker when</strong> you need to verify specific color pairs meet WCAG accessibility requirements for text readability.
          </p>
          <p>
            <strong>Use the Text Color Suggestion Tool when</strong> you have a background color and need recommendations for readable text colors.
          </p>
        </div>
      </div>
    </section>
  );
}

export default DarkLightModePreviewSEO;
