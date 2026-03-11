import React from "react"

export default function IconPickerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Icon Picker Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Browse through a curated collection of SVG icons organized by category - Navigation, Actions, Communication, Time, Security, and more. Each icon is displayed in a grid for easy visual scanning.
          </p>
          <p>
            Use the search bar to find icons by name or tags. Type "arrow" to find all directional icons, "delete" for trash and X icons. Search works across icon names and associated keywords.
          </p>
          <p>
            Click any icon to select it. Adjust the size and color to preview how it will look in your design. Copy the SVG code with one click or download the icon file. The SVG is ready to use in any project with customizable properties.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building UI component libraries</h3>
            <p className="text-sm text-muted-foreground">
              Creating a design system? Pick consistent icons for buttons, menus, and forms. Copy SVG code directly into your component library for reuse.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Prototyping new interfaces</h3>
            <p className="text-sm text-muted-foreground">
              Wireframing a new feature? Quickly add icons to mockups. Search for relevant icons, copy the SVG, paste into Figma or your prototyping tool.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Enhancing documentation</h3>
            <p className="text-sm text-muted-foreground">
              Technical docs need visual cues. Add icons for warnings, tips, code blocks. Makes documentation more scannable and professional looking.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating email templates</h3>
            <p className="text-sm text-muted-foreground">
              Email clients support inline SVG. Add icons to marketing emails for visual interest. Icons improve click-through rates compared to text-only links.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building admin dashboards</h3>
            <p className="text-sm text-muted-foreground">
              Dashboards need navigation and action icons. Pick from categories like Settings, Users, Reports. Consistent icon style makes interfaces cohesive.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Developing mobile app interfaces</h3>
            <p className="text-sm text-muted-foreground">
              Tab bars and toolbars need icons. Pick standard icons users recognize - home, search, profile. SVG scales perfectly for all device resolutions.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">All icons are SVG format.</strong>
              SVG is vector-based and scales infinitely. Perfect for responsive designs. Works at 16px or 512px without quality loss.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Icons use currentColor by default.</strong>
              Most icons inherit the text color. Change icon color by setting the CSS color property on the parent element.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Icon sizes are adjustable.</strong>
              Set width and height attributes or use CSS. Common sizes are 16px, 24px, 32px. Match icon size to surrounding text for visual harmony.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Icons are open source.</strong>
              These icons are free for personal and commercial use. No attribution required. Modify them as needed for your projects.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For accessible interfaces, always add aria-label or title to icon-only buttons. Screen readers need text alternatives for icon-only controls.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use these icons commercially?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. All icons are free for commercial use. No attribution required. Use them in client projects, products, or anything you're selling.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I change the icon color?</h3>
            <p className="text-sm text-muted-foreground">
              Icons use currentColor. Set the CSS color property on the icon or its parent. Example: color: #3B82F6 makes the icon blue.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I modify the icons?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Download the SVG and edit in any vector editor. Add elements, remove parts, or combine icons. They're fully customizable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the best way to include icons in my project?</h3>
            <p className="text-sm text-muted-foreground">
              Inline SVG gives best performance and styling control. Copy the SVG code directly into your HTML. Alternatively, save as files and reference with img tags.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do these icons work with React/Vue?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Paste SVG code directly into JSX templates. For React, convert class to className. Vue accepts SVG code as-is in templates.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are there more icons available?</h3>
            <p className="text-sm text-muted-foreground">
              This picker includes common UI icons. For specialized icons, check dedicated icon libraries like Heroicons, Feather Icons, or FontAwesome.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I animate these icons?</h3>
            <p className="text-sm text-muted-foreground">
              Apply CSS animations or transitions to the SVG element. Hover effects, loading spins, and pulse animations all work with standard CSS.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
