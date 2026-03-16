import React from "react"

export default function TextReverserSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Text Reverser Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your text in the input field and choose a reversal type. The output updates instantly as you type. Four modes are available: Reverse All, Reverse Words, Reverse Lines, and Upside Down.
          </p>
          <p>
            Reverse All flips the entire string character by character. "Hello" becomes "olleH". Reverse Words reverses each word individually while keeping word order. "Hello World" becomes "olleH dlroW". Reverse Lines reverses each line of multi-line text.
          </p>
          <p>
            Upside Down uses Unicode characters that look like inverted letters. "Hello" becomes "ʞɔǝɯoH" (read right to left). This mode combines character substitution with reversal for the upside-down effect.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating palindrome puzzles</h3>
            <p className="text-sm text-muted-foreground">
              Test if phrases are palindromes by reversing and comparing. "A man a plan a canal Panama" reversed helps verify the palindrome property.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing upside-down social media posts</h3>
            <p className="text-sm text-muted-foreground">
              Create eye-catching posts that make people tilt their heads. Upside-down text stands out in feeds and encourages engagement through curiosity.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging string manipulation code</h3>
            <p className="text-sm text-muted-foreground">
              Test your own reverse functions against this tool. Verify your algorithm handles edge cases like empty strings, single characters, and special symbols.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating secret messages for games</h3>
            <p className="text-sm text-muted-foreground">
              Hide clues in escape rooms or treasure hunts. Reversed text requires effort to read, adding a puzzle element without needing special tools.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Formatting code comments creatively</h3>
            <p className="text-sm text-muted-foreground">
              Add easter eggs to your codebase. Reversed comments in source files are fun discoveries for future developers reading the code.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Making unique usernames</h3>
            <p className="text-sm text-muted-foreground">
              Your desired username is taken? Reverse it. "Shadow" becomes "wodahS". Add upside-down styling for even more uniqueness.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Upside-down uses Unicode tricks.</strong>
              Not real rotation - it substitutes letters with visually similar inverted characters. Some letters like X and O look the same upside-down.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Not all characters have upside-down equivalents.</strong>
              Common letters and numbers work. Rare symbols may not have mappings and display normally. The tool handles missing mappings gracefully.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Reverse Words preserves spaces.</strong>
              Multiple spaces between words stay in place. Only the letters within each word reverse. Punctuation attached to words reverses with them.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Emoji may display oddly when reversed.</strong>
              Emoji are multi-byte characters. Most reverse correctly but complex emoji with modifiers might split. Test your specific emoji.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Upside-down text reads right-to-left. Write your message, convert to upside-down, then read from the end. "Hello" appears as "oʅʅǝH" but you read it starting from the right.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between Reverse All and Reverse Words?</h3>
            <p className="text-sm text-muted-foreground">
              Reverse All flips everything: "Hello World" becomes "dlroW olleH". Reverse Words keeps word order: "Hello World" becomes "olleH dlroW".
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I reverse multiple lines at once?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Reverse Lines mode reverses each line independently. Line order stays the same, but text within each line flips.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why doesn't upside-down work on my phone?</h3>
            <p className="text-sm text-muted-foreground">
              Your device's font may not include the Unicode characters used. Try a different app or browser. The characters are valid Unicode but not all fonts support them.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work for non-English text?</h3>
            <p className="text-sm text-muted-foreground">
              Reverse modes work for any text. Upside-down primarily supports Latin alphabet. Cyrillic, Greek, and other scripts have limited or no upside-down mappings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I reverse numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. "12345" reversed is "54321". Upside-down numbers use similar-looking characters: 6 becomes 9, 9 becomes 6, others use stylized versions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens to punctuation?</h3>
            <p className="text-sm text-muted-foreground">
              Punctuation reverses with the text. In Reverse All, "Hello!" becomes "!olleH". Upside-down has special inverted punctuation: ! becomes ¡, ? becomes ¿.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is there a character limit?</h3>
            <p className="text-sm text-muted-foreground">
              No hard limit, but very long text may be slow to process. Browser memory limits apply. For most uses - posts, messages, comments - there's no issue.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
