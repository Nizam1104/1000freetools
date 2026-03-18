import React from "react"

export default function EmojiKeyboardPcMacSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Emoji Keyboard Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This is a virtual emoji keyboard that works in your browser. Browse emoji by category or search by name. Click any emoji to copy it to your clipboard, then paste it wherever you need it - messaging apps, documents, social media, code comments.
          </p>
          <p>
            The keyboard shows emoji in a grid layout organized by category tabs. Smileys, People, Animals, Food, Activities, Travel, Objects, Symbols, and Flags. Each category contains the most commonly used emoji in that group. Click a category to see all its emoji.
          </p>
          <p>
            Search finds emoji by name, keywords, or even by pasting an emoji to identify it. Type "happy" for smiling faces, "love" for hearts, or "celebration" for party emoji. The search is forgiving - partial matches work too.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Your computer doesn't have an emoji picker</h3>
            <p className="text-sm text-muted-foreground">
              Some Linux systems and older computers lack built-in emoji keyboards. This browser-based keyboard works anywhere. No installation needed - just open the page and start copying.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">You forgot the keyboard shortcut</h3>
            <p className="text-sm text-muted-foreground">
              Windows: Win + period. Mac: Cmd + Ctrl + Space. But if you can't remember or the shortcut isn't working, this keyboard is a reliable backup. Works in any browser.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing documentation or README files</h3>
            <p className="text-sm text-muted-foreground">
              GitHub READMEs look better with emoji. Use checkmarks for completed items, warning signs for important notes, or rockets for new features. Copy emoji directly into your markdown.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating social media content in advance</h3>
            <p className="text-sm text-muted-foreground">
              Drafting posts in a document before publishing? Add emoji as you write. Copy from this keyboard and paste into your drafts. When you're ready, paste the whole post into your social platform.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Naming files and folders visually</h3>
            <p className="text-sm text-muted-foreground">
              Add emoji to file names for quick visual identification. "📁 Projects" stands out from regular folders. "⚠️ Important" flags critical documents. Works on Mac, Windows, and most cloud storage.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">You need emoji that aren't on your phone's keyboard</h3>
            <p className="text-sm text-muted-foreground">
              Phone keyboards show frequently-used emoji first. Rare emoji are buried in submenus. This keyboard shows everything at once. Find that specific animal or object emoji faster.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using It</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">This copies emoji - it doesn't type them directly.</strong>
              Click an emoji to copy it to your clipboard. Then paste (Ctrl+V or Cmd+V) where you want it. This is different from your system's emoji keyboard which types directly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Emoji display depends on your system.</strong>
              The emoji you see is rendered by your browser using your operating system's emoji font. Apple users see Apple's design. Windows users see Microsoft's. The emoji character is the same - only the artwork differs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some platforms limit emoji usage.</strong>
              Twitter counts emoji toward character limits. Some older systems don't support emoji at all. Email clients vary in emoji support. Test how your emoji displays in the target platform.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Clipboard history may not save emoji.</strong>
              Some clipboard managers don't preserve emoji properly. If you need to keep an emoji, paste it into a note immediately. Don't rely on clipboard history for emoji storage.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For frequent emoji users, create a text expansion shortcut. Save common emoji sequences in a text expander like TextExpander or AutoHotkey. Type ":shrug:" and it expands to "¯\_(ツ)_/¯" or paste your most-used emoji.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the keyboard shortcut for emoji on Windows?</h3>
            <p className="text-sm text-muted-foreground">
              Press Win + . (period) or Win + ; (semicolon). This opens Windows' built-in emoji picker. Works in most apps. If it doesn't work, your keyboard or system may have the shortcut disabled.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the keyboard shortcut for emoji on Mac?</h3>
            <p className="text-sm text-muted-foreground">
              Press Cmd + Ctrl + Space. This opens Mac's Character Viewer with emoji selected. You can also enable "Show Emoji & Symbols in menu bar" in System Preferences for quicker access.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why can't I use emoji in some apps?</h3>
            <p className="text-sm text-muted-foreground">
              Older apps or specialized software may not support Unicode emoji. Terminal apps, some code editors, and legacy systems often lack emoji support. Modern browsers and messaging apps generally work fine.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use emoji in email?</h3>
            <p className="text-sm text-muted-foreground">
              Most modern email clients support emoji, but there are caveats. Outlook on Windows has had emoji issues historically. Gmail and Apple Mail work well. Test before sending important emails with emoji.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do emoji work in code comments?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, in most modern IDEs and version control systems. GitHub, GitLab, and Bitbucket all support emoji in comments and commit messages. Some teams use emoji conventions like "🐛" for bug fixes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I find a specific emoji quickly?</h3>
            <p className="text-sm text-muted-foreground">
              Use the search bar. Type keywords related to what you want - "cat", "happy", "money", "weather." The search matches emoji names and common associations. Much faster than browsing categories.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use emoji in passwords?</h3>
            <p className="text-sm text-muted-foreground">
              Technically yes, but don't. Some systems don't accept emoji in passwords. Even if accepted, emoji may not input correctly on all devices. Stick to standard characters for passwords.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do emoji look different on my phone vs computer?</h3>
            <p className="text-sm text-muted-foreground">
              Each platform designs their own emoji artwork. Apple, Google, Microsoft, and Samsung all have distinct styles. The emoji character is identical - only the visual design differs.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
