import React from "react";

export function FavoriteColorsManagerSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What Is the Favorite Colors Manager?
        </h2>
        <p className="text-muted-foreground">
          This is a personal color library where you save, name, and organize colors you use regularly. Unlike automatic history, you choose which colors to save and give them meaningful names like "Primary Button" or "Brand Blue".
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How It Works
        </h2>
        <p className="text-muted-foreground mb-4">
          Add colors manually by entering hex codes, or save colors from other tools. Each color can have a custom name and can be starred for quick access. Colors are stored in localStorage and persist between sessions.
        </p>
        <p className="text-muted-foreground">
          Filter your collection by name, sort by starred status, and export everything as JSON for backup or sharing.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Who Needs a Color Library
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Design System Maintainers</h3>
            <p className="text-sm text-muted-foreground">
              Store all your design token colors in one place. Name them consistently (primary-500, secondary-300) and reference them across projects.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Freelancers with Multiple Clients</h3>
            <p className="text-sm text-muted-foreground">
              Keep each client's brand colors organized. Name them by client and use ("Acme Corp - Primary", "Acme Corp - CTA") to avoid mixing up brand colors.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Content Creators</h3>
            <p className="text-sm text-muted-foreground">
              Save your thumbnail colors, brand accents, and recurring graphic elements. Consistent colors across videos build recognizable branding.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Anyone Who Reuses Colors</h3>
            <p className="text-sm text-muted-foreground">
              Stop searching through old projects for that perfect blue. Save it once, name it, and find it instantly next time.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Organizing Your Colors
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Name colors meaningfully.</strong> "Blue" isn't helpful. "Primary Button Hover" tells you exactly when to use it.
          </p>
          <p>
            <strong>Use stars for frequently used colors.</strong> Star your 5-10 most-used colors for quick access. Filter by starred to see only favorites within favorites.
          </p>
          <p>
            <strong>Group related colors.</strong> Use consistent naming prefixes: "Brand - Primary", "Brand - Secondary", "UI - Background", "UI - Text".
          </p>
          <p>
            <strong>Export regularly.</strong> Download your library as JSON for backup. Import it when switching browsers or sharing with teammates.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">How many colors can I save?</h3>
            <p className="text-sm text-muted-foreground">
              There's no hard limit, but localStorage typically holds about 5MB of data. That's thousands of colors. If you hit the limit, export and clear old colors.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I organize colors into folders?</h3>
            <p className="text-sm text-muted-foreground">
              This tool doesn't have folders, but you can use naming conventions for organization. Prefix names like "Client A - " or "Project X - " to group related colors.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What happens if I clear browser data?</h3>
            <p className="text-sm text-muted-foreground">
              Clearing localStorage deletes your favorites. Export your colors as JSON before clearing browser data to preserve your library.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I share my colors with someone else?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, export as JSON and send the file. They can import it into their own Favorite Colors Manager.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How is this different from Color History?</h3>
            <p className="text-sm text-muted-foreground">
              Color History automatically tracks everything you use. Favorites requires manual saving but lets you name and organize colors intentionally.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I edit a color after saving it?</h3>
            <p className="text-sm text-muted-foreground">
              You can edit the name, but not the hex value directly. To change a color, delete it and add a new one with the corrected value.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Tips for Building a Color Library
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Start with your brand colors.</strong> Save your primary, secondary, and accent colors first. These are your foundation.
          </p>
          <p>
            <strong>Add UI colors next.</strong> Background, text, border, and state colors (hover, active, disabled) make up most of your daily usage.
          </p>
          <p>
            <strong>Include variations.</strong> Save light and dark versions of important colors. You'll need them for different contexts.
          </p>
          <p>
            <strong>Review periodically.</strong> Delete colors you haven't used in months. A smaller, curated library is easier to navigate.
          </p>
        </div>
      </div>
    </section>
  );
}

export default FavoriteColorsManagerSEO;
