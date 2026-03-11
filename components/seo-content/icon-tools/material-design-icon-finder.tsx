import React from "react"

export default function MaterialDesignIconFinderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Material Design Icon Finder Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Search through Google's official Material Design icon library. Type keywords like "home", "settings", or "search" to find relevant icons. Results update as you type.
          </p>
          <p>
            Filter icons by style - Filled for solid icons, Outlined for line icons, Rounded for soft corners, or Sharp for angular designs. Each style gives a different visual feel.
          </p>
          <p>
            Click icons to add them to your selection. Choose download color and size. Download selected icons as SVG files or copy the HTML code for Google Fonts integration. The icons are ready to use immediately in any Material Design project.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building Android apps</h3>
            <p className="text-sm text-muted-foreground">
              Android apps follow Material Design guidelines. Use official Material icons for navigation, actions, and status. Ensures consistency with platform conventions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating Material Design websites</h3>
            <p className="text-sm text-muted-foreground">
              Following Material Design for web? Use matching icons throughout. The consistent style reinforces the design language across your entire site.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Prototyping with Material UI</h3>
            <p className="text-sm text-muted-foreground">
              Using Material UI components? Match icons to the component library. Creates cohesive prototypes that look production-ready from the start.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing Flutter applications</h3>
            <p className="text-sm text-muted-foreground">
              Flutter uses Material icons by default. Find the exact icon names in this library. Use the same names in your IconData references for perfect matches.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating design system documentation</h3>
            <p className="text-sm text-muted-foreground">
              Documenting your icon usage? Reference Material icon names in your design system. Developers can easily find and implement the correct icons.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building admin panels and dashboards</h3>
            <p className="text-sm text-muted-foreground">
              Admin interfaces need clear, recognizable icons. Material icons are well-tested for usability. Users immediately understand their meaning.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Icons are available via Google Fonts.</strong>
              Include the Google Fonts link in your HTML head. Then use icons with simple span tags. No download needed for web projects.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Four styles serve different purposes.</strong>
              Filled for primary actions, Outlined for secondary, Rounded for friendly interfaces, Sharp for technical products. Match style to your brand.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Icon names are consistent.</strong>
              Names use underscores, not hyphens. "settings" not "settings-icon". Use exact names when referencing in code or Google Fonts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some icons have multiple variants.</strong>
              Icons like "star" come in filled, outlined, and half-filled versions. Choose the variant that matches your UI state or design need.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For best performance, only load the icons you use. Instead of the full library, download individual SVGs or use icon font subsetting tools.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are Material icons free to use?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Material icons are open source under Apache License 2.0. Free for personal and commercial projects. No attribution required.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I use Material icons in my project?</h3>
            <p className="text-sm text-muted-foreground">
              Add the Google Fonts link to your HTML. Then use span tags with class "material-icons" and the icon name as content. See the usage code in the tool.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I change the icon size?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Set font-size in CSS or use size classes: material-icons-sm, material-icons-md, material-icons-lg, material-icons-xl.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do Material icons work offline?</h3>
            <p className="text-sm text-muted-foreground">
              Not with Google Fonts CDN. Download SVG files for offline use. Or self-host the icon font files on your server.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use Material icons in mobile apps?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Android includes Material icons by default. For iOS and cross-platform, use the icon font or SVG files in your app bundle.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many icons are in the library?</h3>
            <p className="text-sm text-muted-foreground">
              Over 2,500 icons across all categories. Covers navigation, actions, content, places, and more. One of the most comprehensive free icon sets.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I request new Material icons?</h3>
            <p className="text-sm text-muted-foreground">
              Google occasionally updates the library. Submit requests through the Material Design GitHub repository. Community feedback influences additions.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
