import React from "react"

export default function TextToMorseCodeSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool converts text to Morse code, a communication system that
            represents letters and numbers using dots (·) and dashes (—). Each
            character maps to a unique sequence defined by the International
            Morse Code standard.
          </p>
          <p>
            The converter looks up each character in a Morse code table and
            outputs the corresponding dot-dash pattern. Letters are separated
            by spaces, words by slashes or larger gaps. The tool handles both
            uppercase and lowercase input identically.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Common Morse code patterns:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">SOS</code>
                <span>··· --- ···</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">HELLO</code>
                <span>···· · ·-·· ·-·· ---</span>
              </div>
            </div>
          </div>
          <p>
            Type your message and see the Morse translation instantly. Play
            audio to hear the dots and dashes, or copy the text representation
            for use in projects or learning.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning amateur radio communication</h3>
            <p className="text-sm text-muted-foreground">
              A ham radio operator studies Morse code (CW mode) for their license
              exam. They practice converting messages to Morse and back, building
              the muscle memory needed for on-air communication.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating puzzle hunt clues</h3>
            <p className="text-sm text-muted-foreground">
              An escape room designer hides messages in Morse code as part of a
              multi-stage puzzle. Players find the encoded text and decode it to
              reveal the next clue location.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Adding Morse to jewelry or tattoos</h3>
            <p className="text-sm text-muted-foreground">
              Someone wants a meaningful message in Morse code on a bracelet or
              tattoo. They convert names, dates, or phrases to dots and dashes
              for the jeweler or artist to follow.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building accessibility communication tools</h3>
            <p className="text-sm text-muted-foreground">
              A developer creates an assistive device for someone with limited
              mobility. The device accepts Morse code input via a single button,
              converting taps to text for communication.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Teaching coding fundamentals</h3>
            <p className="text-sm text-muted-foreground">
              A computer science teacher uses Morse code to demonstrate binary
              encoding concepts. Students see how complex information reduces
              to simple two-state signals, introducing data representation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating themed party decorations</h3>
            <p className="text-sm text-muted-foreground">
              A party planner makes spy-themed decorations with Morse code
              messages hidden around the venue. Guests decode the messages
              to find treats or solve mysteries throughout the event.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Morse code has no lowercase.</strong>
              Morse treats A and a identically. The code represents the letter
              itself, not its case. Output is typically shown in uppercase for
              clarity.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Timing matters for audio Morse.</strong>
              A dot is one unit, a dash is three units. Space between parts of
              the same letter is one unit, between letters is three units,
              between words is seven units. Audio playback follows these rules.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Special characters have limited support.</strong>
              Standard Morse covers A-Z, 0-9, and basic punctuation. Accented
              characters, emoji, and symbols may not have standard Morse
              equivalents.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">SOS is not an abbreviation.</strong>
              SOS in Morse (··· --- ···) was chosen for its distinctive pattern,
              not because it stands for anything. It's a prosign—a continuous
              sequence without letter gaps.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Practical note:</strong> Morse code is no longer required
              for amateur radio licenses in most countries, but CW (continuous
              wave) communication remains popular among hams for its efficiency
              and long-distance capabilities.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is the Morse code for SOS?</h3>
            <p className="text-sm text-muted-foreground">
              SOS is ··· --- ··· (three dots, three dashes, three dots). It's
              the international distress signal, chosen because the pattern
              is unmistakable and easy to transmit even in poor conditions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How fast can Morse code be sent?</h3>
            <p className="text-sm text-muted-foreground">
              Skilled operators reach 40+ words per minute. The world record
              exceeds 75 WPM. Beginners start around 5-10 WPM. Speed is measured
              in words per minute using "PARIS" as the standard word.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can Morse code be used with lights?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, Morse works with any on/off signal: sound, light, radio waves,
              or even touch. Ships use signal lamps for visual Morse. Flashlights
              can transmit Morse in emergencies.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is Morse code still used today?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, though less than before. Amateur radio operators use it
              extensively. Some aviation beacons still transmit identifiers
              in Morse. It's also used in assistive technology for people
              with severe mobility limitations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I learn Morse code?</h3>
            <p className="text-sm text-muted-foreground">
              Start by learning the sound patterns, not visual dots and dashes.
              Use apps or online tools that play audio. Practice daily with
              short sessions. Listen to real CW operators on amateur radio
              bands to build recognition.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the longest Morse code character?</h3>
            <p className="text-sm text-muted-foreground">
              Numbers are longest at 5 elements each. For example, 0 is
              ----- (five dashes). Letters range from 2 elements (E is ·,
              T is —) to 4 elements (like J which is ·---).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I send Morse by tapping?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, tapping is a common way to send Morse. Short tap for dot,
              long press for dash. People have used this to communicate
              through walls, floors, or even by squeezing hands.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
