import React from "react"

export default function EmojiKeyboardSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Emoji Keyboard Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Browse emoji organized by category - Smileys, Hearts, Hands, Animals, Food, Activities, Travel, Objects, Symbols, and Flags. Click any category tab to see all emoji in that group.
          </p>
          <p>
            Search for specific emoji by typing keywords. Type "happy" to find smiling faces, "love" for hearts, "food" for food emoji. Search works across emoji names and descriptions.
          </p>
          <p>
            Click any emoji to copy it to your clipboard. Paste it anywhere - messages, documents, social media. Recent emoji are saved for quick access. Skin tone modifiers let you customize hand and people emoji.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Typing on computers without emoji keyboards</h3>
            <p className="text-sm text-muted-foreground">
              Work computer doesn't have emoji picker? Use this virtual keyboard. Click emoji to copy, paste into emails and documents. Works on any computer with a browser.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Finding emoji you can't locate on your phone</h3>
            <p className="text-sm text-muted-foreground">
              Phone keyboard hides many emoji. This shows everything in one place. Browse categories to discover emoji you didn't know existed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing accessible documents</h3>
            <p className="text-sm text-muted-foreground">
              Need specific emoji for documentation? Find the exact emoji by name. Copy Unicode information for accessibility reports and technical specs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating social media content calendars</h3>
            <p className="text-sm text-muted-foreground">
              Planning posts in advance? Build content with emoji in your scheduling tool. Copy emoji from keyboard into Buffer, Hootsuite, or spreadsheets.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Developing emoji-based features</h3>
            <p className="text-sm text-muted-foreground">
              Building apps with emoji? Use this keyboard to test emoji input. Copy emoji for testing databases, APIs, and user interfaces.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning emoji for language studies</h3>
            <p className="text-sm text-muted-foreground">
              Studying Japanese or Korean? Emoji are part of modern communication. Learn which emoji are popular in different cultures through organized browsing.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">This is a virtual keyboard, not system integration.</strong>
              You click to copy, not type directly. For direct typing, use your device's built-in emoji keyboard. This is for when that's not available.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Skin tones apply to specific emoji only.</strong>
              Hand gestures and people emoji support skin tones. Objects and animals don't. The modifier only affects compatible emoji.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Recent emoji are stored locally.</strong>
              Your recent emoji list is saved in your browser. Clearing browser data clears your recents. It's private to your device.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Not all emoji display the same everywhere.</strong>
              Apple, Google, Samsung design emoji differently. The emoji you copy may look different on the recipient's device. Meaning stays consistent.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Learn the keyboard shortcuts for your device. Windows: Win + period. Mac: Cmd + Ctrl + Space. iPhone: Globe key. Faster than any virtual keyboard.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I type emoji on Windows?</h3>
            <p className="text-sm text-muted-foreground">
              Press Windows key + period (.) or Windows key + semicolon (;). Opens the built-in emoji picker. Works in any text field on Windows 10 and 11.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I type emoji on Mac?</h3>
            <p className="text-sm text-muted-foreground">
              Press Command + Control + Space. Opens the Character Viewer with emoji. Pin favorites for quick access. Works in all Mac applications.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I type emoji on iPhone?</h3>
            <p className="text-sm text-muted-foreground">
              Tap the globe or smiley icon on the keyboard. Switches to emoji keyboard. Long-press emoji for variations like skin tones.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I type emoji on Android?</h3>
            <p className="text-sm text-muted-foreground">
              Tap the smiley icon on Gboard or your keyboard. Some keyboards require long-pressing the comma key. Varies by keyboard app.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why use this instead of my phone's keyboard?</h3>
            <p className="text-sm text-muted-foreground">
              This shows more emoji at once. Easier to browse categories. Search is more powerful. Good for finding emoji you can't locate on small phone keyboards.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this on my tablet?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Works on any device with a web browser. iPad, Android tablets, Chromebooks all work. Touch-friendly interface for tablet use.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are there emoji this keyboard doesn't have?</h3>
            <p className="text-sm text-muted-foreground">
              Includes all standard Unicode emoji. Some platforms have custom emoji (like Slack or Discord). Those aren't included - only universal emoji.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
