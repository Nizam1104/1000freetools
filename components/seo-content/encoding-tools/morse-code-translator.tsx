import React from "react"

export default function MorseCodeTranslatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Morse Code Translator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select encode mode to convert text to Morse code, or decode mode to convert Morse code back to text. Type or paste your content in the input field and the translation appears instantly in the output field.
          </p>
          <p>
            For encoding, enter any text using letters, numbers, and common punctuation. Each character converts to its Morse equivalent using dots (.) and dashes (-). Letters are separated by spaces, words by forward slashes (/).
          </p>
          <p>
            For decoding, enter Morse code using dots and dashes. Use spaces between letters and forward slashes between words. The translator converts each Morse sequence back to its corresponding character. The reference chart shows all letters, numbers, and symbols.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning Morse code for ham radio</h3>
            <p className="text-sm text-muted-foreground">
              Study for your amateur radio license exam. Encode practice messages and decode received transmissions. The reference chart helps memorize character patterns.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating emergency communication plans</h3>
            <p className="text-sm text-muted-foreground">
              Prepare backup communication methods. Morse code works with flashlights, sound, or radio when other systems fail. SOS is ... --- ... (three dots, three dashes, three dots).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Solving puzzle hunt clues</h3>
            <p className="text-sm text-muted-foreground">
              Escape rooms and scavenger hunts often hide Morse code messages. Decode sequences of lights, sounds, or marks to reveal hidden instructions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Understanding historical communications</h3>
            <p className="text-sm text-muted-foreground">
              Read original telegraph messages or Titanic distress calls. Morse was the standard for maritime and military communication until the 1990s.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating unique passwords or codes</h3>
            <p className="text-sm text-muted-foreground">
              Encode a memorable phrase into Morse for a unique password format. Combine with other elements for security. Only use for personal reference, not critical accounts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Teaching coding fundamentals</h3>
            <p className="text-sm text-muted-foreground">
              Morse code demonstrates binary encoding concepts. Dots and dashes are like 0s and 1s. It's an accessible introduction to data representation.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">International Morse differs from American Morse.</strong>
              This tool uses International Morse, the modern standard. American Morse was used for landline telegraphs and has different patterns for some letters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Spacing matters in Morse code.</strong>
              One space between letters, three spaces between words (shown as / in written form). Incorrect spacing causes decoding errors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some letters have similar patterns.</strong>
              A (.-) and N (-.) are opposites. R (.-.) and K (-.-) are similar. Pay attention to dot-dash order when decoding manually.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Punctuation has Morse equivalents.</strong>
              Period is .-.-.-, comma is --..--, question mark is ..--.. . Not all symbols are supported, but common punctuation is included.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Memorize letters by sound rhythm, not dot-dash names. "A" sounds like "di-dah", "B" sounds like "dah-di-di-dit". This helps with audio reception.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is the SOS signal in Morse code?</h3>
            <p className="text-sm text-muted-foreground">
              SOS is ... --- ... (three dots, three dashes, three dots). It's not an abbreviation - it was chosen because the pattern is distinctive and easy to remember.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How fast should Morse code be sent?</h3>
            <p className="text-sm text-muted-foreground">
              Beginners start at 5-10 words per minute. Experienced operators reach 20-25 WPM. World records exceed 50 WPM. Speed depends on method (hand key, straight key, or electronic).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for numbers only?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Numbers have five-character codes: 0 is -----, 1 is .----, 2 is ..---, etc. They're longer than letters but follow a logical pattern.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does CQ mean in Morse?</h3>
            <p className="text-sm text-muted-foreground">
              CQ (-.-. --.-) is a general call meaning "seek you" - calling any station. CQD was the original distress signal before SOS.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is Morse code still used today?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, mainly by amateur radio operators. The military and maritime services have largely switched to digital, but Morse remains popular with hobbyists and preppers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I practice sending Morse?</h3>
            <p className="text-sm text-muted-foreground">
              Start by tapping out letters on a table. Use a flashlight for visual practice. Download a Morse key app. Listen to practice audio at slow speeds and gradually increase.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the longest Morse code character?</h3>
            <p className="text-sm text-muted-foreground">
              Most letters are 2-4 elements. Numbers are all 5 elements. Some punctuation is longer - the period .-.-.- is 6 elements. The error signal is 8 dots.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
