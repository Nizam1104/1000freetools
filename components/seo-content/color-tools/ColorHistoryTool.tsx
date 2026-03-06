import React from "react";

export function ColorHistoryToolSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What Is the Color History Tool?
        </h2>
        <p className="text-muted-foreground">
          This tool automatically tracks every color you use across the 1000 Free Tools platform. Each color is stored in your browser's localStorage with a timestamp, so you can revisit colors from previous sessions without manually saving them.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How Color History Works
        </h2>
        <p className="text-muted-foreground mb-4">
          When you use any color tool (Color Picker, Contrast Checker, Palette Generator, etc.), the colors you interact with are automatically added to your history. The tool stores:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>The hex color value</li>
          <li>A timestamp showing when you used it</li>
          <li>Up to 100 recent colors (oldest are removed as new ones are added)</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          Data persists between sessions and is stored locally — nothing is sent to any server.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Who Benefits from Color History
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Designers Working Across Sessions</h3>
            <p className="text-sm text-muted-foreground">
              You picked a perfect blue yesterday but didn't save it. Instead of trying to recreate it, check your color history and find it with the exact hex code.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Developers Testing Multiple Colors</h3>
            <p className="text-sm text-muted-foreground">
              You're iterating on a button color, trying 20 variations. History tracks them all, so you can compare and go back to earlier options without keeping a separate notes file.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Teams Sharing a Browser</h3>
            <p className="text-sm text-muted-foreground">
              On a shared design workstation, color history shows what colors have been explored. It's a lightweight way to see the design exploration process.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Anyone Who Forgets to Save</h3>
            <p className="text-sm text-muted-foreground">
              You know you'll forget to copy that hex code. History acts as a safety net — even if you navigate away, the color is still there when you come back.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Managing Your Color History
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Export your history.</strong> Download as JSON to backup colors or import them into another browser. Useful before clearing browser data.
          </p>
          <p>
            <strong>Import from JSON.</strong> Restore a previous history or share colors with a teammate by importing their history file.
          </p>
          <p>
            <strong>Clear selectively.</strong> Remove individual colors you no longer need, or clear everything at once for a fresh start.
          </p>
          <p>
            <strong>Copy with one click.</strong> Each color in history has a copy button — grab the hex and paste it directly into your project.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Where is my color history stored?</h3>
            <p className="text-sm text-muted-foreground">
              In your browser's localStorage under the key "colorHistory". This is local to your browser and device — it doesn't sync across devices or browsers.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How many colors are stored?</h3>
            <p className="text-sm text-muted-foreground">
              Up to 100 colors. When you exceed 100, the oldest color is automatically removed. This keeps storage usage reasonable while maintaining useful history.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Does this track colors from all tools?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, colors from Color Picker, Contrast Checker, Palette Generator, and other color tools are all tracked in the same history.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What happens if I clear my browser data?</h3>
            <p className="text-sm text-muted-foreground">
              Clearing localStorage will delete your history. Export your colors as JSON before clearing browser data if you want to keep them.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I edit color names or add notes?</h3>
            <p className="text-sm text-muted-foreground">
              This tool stores colors without names. For named colors, use the Favorite Colors Manager which lets you assign custom names to saved colors.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Is my color history private?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, colors are stored locally in your browser only. Nothing is sent to servers or shared with third parties.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Color History vs. Favorite Colors
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Color History (this tool):</strong> Automatic, passive tracking. Every color you use is recorded without action required. Best for "I might need this later" scenarios.
          </p>
          <p>
            <strong>Favorite Colors Manager:</strong> Manual, intentional saving. You choose which colors to save and can name them. Best for curated collections you actively manage.
          </p>
          <p>
            <strong>Use both together:</strong> Let history catch everything, then promote important colors to favorites for long-term storage with custom names.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ColorHistoryToolSEO;
