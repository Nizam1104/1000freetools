import React from "react";
import Link from "next/link";

export function ColorPalettesSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What Is a Color Palette?
        </h2>
        <p className="text-muted-foreground">
          A color palette is a curated selection of colors that work harmoniously together. Designers use palettes to create visual consistency across websites, apps, branding materials, and any design project. A well-chosen palette establishes mood, creates hierarchy, and ensures your design feels cohesive rather than chaotic.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Types of Color Palettes
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Monochromatic</h3>
            <p className="text-sm text-muted-foreground">
              Uses variations of a single hue. Different shades, tints, and tones of one base color create a clean, minimalist look that's easy on the eyes.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Complementary</h3>
            <p className="text-sm text-muted-foreground">
              Pairs colors opposite each other on the color wheel. High contrast and vibrant, perfect for making elements pop and creating visual energy.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Analogous</h3>
            <p className="text-sm text-muted-foreground">
              Uses colors next to each other on the wheel. Creates serene, comfortable designs found frequently in nature. Think sunset gradients.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Triadic</h3>
            <p className="text-sm text-muted-foreground">
              Three colors evenly spaced on the wheel. Offers strong visual contrast while maintaining balance. Vibrant but requires careful proportioning.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How to Use This Color Palette Explorer
        </h2>
        <p className="text-muted-foreground mb-4">
          This tool offers three ways to work with color palettes:
        </p>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Explore:</strong> Browse through dozens of pre-made color palettes. Search by name to find specific styles. Click any color to copy its hex code instantly.
          </p>
          <p>
            <strong>Generator:</strong> Create your own random 5-color palettes with a click. Lock colors you like and regenerate the rest. Fine-tune until you find the perfect combination.
          </p>
          <p>
            <strong>Favorites:</strong> Save palettes you love by clicking the heart icon. Access them anytime from the Favorites tab. Build a personal library of go-to palettes.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Exporting and Using Your Palettes
        </h2>
        <p className="text-muted-foreground mb-3">
          Once you've found or created a palette you love, export it in multiple formats:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>JSON:</strong> Download a .json file with the palette name and all color hex codes. Perfect for backing up or sharing with teammates.</li>
          <li><strong>CSS Variables:</strong> Copy ready-to-use CSS custom properties. Paste directly into your stylesheet and reference with var(--color-1), etc.</li>
          <li><strong>Individual Colors:</strong> Click any color swatch to copy just that hex code. Great for quick one-off usage.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Who Needs Color Palettes?
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Web Designers</h3>
            <p className="text-sm text-muted-foreground">
              Establish a consistent color system for buttons, backgrounds, text, and accents across entire websites. Maintain brand consistency.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">UI/UX Designers</h3>
            <p className="text-sm text-muted-foreground">
              Create accessible interfaces with proper contrast. Define states (hover, active, disabled) using palette variations.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Graphic Designers</h3>
            <p className="text-sm text-muted-foreground">
              Build brand identities with cohesive color schemes. Ensure print and digital materials feel unified.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Developers</h3>
            <p className="text-sm text-muted-foreground">
              Quickly grab hex codes for CSS. Generate CSS variables for theming. No need to manually pick colors in DevTools.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Tips for Choosing Great Palettes
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Start with mood.</strong> Warm colors (reds, oranges) feel energetic and urgent. Cool colors (blues, greens) feel calm and trustworthy. Choose your base hue accordingly.
          </p>
          <p>
            <strong>Follow the 60-30-10 rule.</strong> Use your dominant color for 60% of the design, a secondary color for 30%, and an accent for 10%. This creates balance.
          </p>
          <p>
            <strong>Check accessibility.</strong> Ensure sufficient contrast between text and background colors. Use the Contrast Checker tool to verify WCAG compliance.
          </p>
          <p>
            <strong>Consider color psychology.</strong> Blue suggests trust and professionalism. Green evokes nature and growth. Red creates urgency and excitement. Match colors to your message.
          </p>
          <p>
            <strong>Test in grayscale.</strong> Convert your palette to black and white. If the contrast still works, your lightness values are well-chosen.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Understanding Color Theory
        </h2>
        <p className="text-muted-foreground mb-4">
          Color theory is the framework for mixing colors and creating harmonious combinations. Key concepts include:
        </p>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>The Color Wheel:</strong> A circular diagram showing color relationships. Primary colors (red, blue, yellow) form the basis. Secondary and tertiary colors fill in between.
          </p>
          <p>
            <strong>Hue, Saturation, Lightness:</strong> Hue is the base color. Saturation is intensity (vivid vs. muted). Lightness is brightness (dark vs. light). Adjusting these creates variations.
          </p>
          <p>
            <strong>Color Temperature:</strong> Warm colors advance visually; cool colors recede. Use warm colors for focal points, cool colors for backgrounds.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">How many colors should a palette have?</h3>
            <p className="text-sm text-muted-foreground">
              Most effective palettes contain 3-5 colors. This provides enough variety for hierarchy without overwhelming the viewer. Some minimalist designs work with just 2-3 colors.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I use these palettes for commercial projects?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! All palettes in this tool are free to use for personal and commercial projects. No attribution required, though we appreciate the shout-out.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's the difference between hex, RGB, and HSL?</h3>
            <p className="text-sm text-muted-foreground">
              Hex (#FF5733) is shorthand for RGB values in hexadecimal. RGB (255, 87, 51) specifies red, green, blue channels. HSL (11°, 100%, 60%) describes hue, saturation, lightness — more intuitive for humans.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I make a palette accessible?</h3>
            <p className="text-sm text-muted-foreground">
              Ensure text has at least 4.5:1 contrast ratio against backgrounds (WCAG AA standard). Use our Contrast Checker tool. Also consider color blindness — don't rely solely on color to convey information.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I convert these palettes to Tailwind config?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! Use the Palette Export Tool to generate Tailwind-ready configuration. Or manually add the hex codes to your tailwind.config.js theme extension.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why do some colors look different on my screen?</h3>
            <p className="text-sm text-muted-foreground">
              Monitor calibration, ambient lighting, and display technology all affect color perception. Always test on multiple devices. For print, use CMYK conversion and request physical proofs.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Related Color Tools
        </h2>
        <p className="text-muted-foreground mb-4">
          Extend your color workflow with these complementary tools:
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/color-tools/color-palette-generator" className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
            <h3 className="font-medium mb-1">Color Palette Generator</h3>
            <p className="text-sm text-muted-foreground">Generate palettes from a base color</p>
          </Link>
          <Link href="/color-tools/palette-export-tool" className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
            <h3 className="font-medium mb-1">Palette Export Tool</h3>
            <p className="text-sm text-muted-foreground">Export to CSS, Tailwind, JSON & more</p>
          </Link>
          <Link href="/color-tools/favorite-colors-manager" className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
            <h3 className="font-medium mb-1">Favorite Colors Manager</h3>
            <p className="text-sm text-muted-foreground">Save and organize your colors</p>
          </Link>
          <Link href="/color-tools/css-variables-generator" className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
            <h3 className="font-medium mb-1">CSS Variables Generator</h3>
            <p className="text-sm text-muted-foreground">Create CSS custom properties</p>
          </Link>
          <Link href="/color-tools/contrast-checker" className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
            <h3 className="font-medium mb-1">Contrast Checker</h3>
            <p className="text-sm text-muted-foreground">Verify WCAG accessibility compliance</p>
          </Link>
          <Link href="/color-tools/color-harmony-generator" className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
            <h3 className="font-medium mb-1">Color Harmony Generator</h3>
            <p className="text-sm text-muted-foreground">Find complementary, analogous & triadic colors</p>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ColorPalettesSEO;
