import React from "react"

export default function Rot13CipherSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the ROT13 Cipher Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Type or paste your text into the input field. The ROT13 transformation happens instantly, showing the encoded or decoded result in the output section. Since ROT13 is its own inverse, the same operation encodes and decodes.
          </p>
          <p>
            Each letter shifts 13 positions in the alphabet. A becomes N, B becomes O, through M which becomes Z. The pattern repeats: N becomes A, O becomes B, through Z which becomes M. Only letters are affected - numbers, punctuation, and spaces stay unchanged.
          </p>
          <p>
            Use the swap button to move the output back to input for double-encoding. The sample button loads example text to test with. Copy buttons let you quickly grab either the input or output for use elsewhere.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Hiding spoilers in forum posts</h3>
            <p className="text-sm text-muted-foreground">
              Discussing a movie plot on Reddit? Encode spoilers with ROT13 so readers choose whether to decode. "The hero dies" becomes "Gur ureb qvrf".
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating puzzle hunt clues</h3>
            <p className="text-sm text-muted-foreground">
              Scavenger hunts and escape rooms use ROT13 for coded messages. It's simple enough to solve with a reference but adds a fun decoding step.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing punchlines in Usenet style</h3>
            <p className="text-sm text-muted-foreground">
              Classic internet joke format puts the punchline in ROT13. Readers decode after guessing. This tradition dates back to 1980s newsgroups.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Teaching basic cryptography concepts</h3>
            <p className="text-sm text-muted-foreground">
              ROT13 demonstrates substitution ciphers without complex math. Students learn about encryption, decryption, and why simple ciphers aren't secure.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Obfuscating email addresses</h3>
            <p className="text-sm text-muted-foreground">
              Post "me at example dot com" in ROT13 to avoid spam bots while humans can still decode it. Not foolproof but reduces automated harvesting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Playing word games</h3>
            <p className="text-sm text-muted-foreground">
              Some words become other valid words in ROT13. "Jury" becomes "Whel". "Cheat" becomes "Purng". Find ROT13 pairs as a vocabulary challenge.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">ROT13 is not encryption.</strong>
              It's a cipher with no key. Anyone can decode it instantly. Never use for actual security - only for casual obfuscation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Only letters are transformed.</strong>
              Numbers, spaces, punctuation, and symbols pass through unchanged. "Hello123!" becomes "Uryyb123!".
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Case is preserved.</strong>
              Uppercase stays uppercase, lowercase stays lowercase. "Hello World" becomes "Uryyb Jbeyq", not "uRYYB jBEYQ".
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Applying ROT13 twice returns original.</strong>
              ROT13(ROT13(x)) = x. This makes it convenient - same operation encodes and decodes. No need to switch modes.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Some ROT13 word pairs are amusing. "PNG" becomes "CAT". "ABJ" becomes "NOW". "CLANG" becomes "PYNTA". Look for words that become other valid words.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why 13 specifically?</h3>
            <p className="text-sm text-muted-foreground">
              The alphabet has 26 letters. Half of 26 is 13. This makes ROT13 self-inverse - applying it twice returns to the start. Other shifts require separate encode/decode operations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is ROT13 secure?</h3>
            <p className="text-sm text-muted-foreground">
              Not at all. It provides zero security. Anyone who knows it's ROT13 can decode instantly. It's only for hiding content from casual viewers, not protecting secrets.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about non-English letters?</h3>
            <p className="text-sm text-muted-foreground">
              Standard ROT13 only handles A-Z and a-z. Accented characters like é or ñ pass through unchanged. This tool follows the traditional implementation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Where did ROT13 originate?</h3>
            <p className="text-sm text-muted-foreground">
              ROT13 appeared in early 1980s Usenet newsgroups, particularly net.jokes. It became standard for hiding punchlines and spoilers in online discussions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use ROT13 for passwords?</h3>
            <p className="text-sm text-muted-foreground">
              Absolutely not. ROT13 adds no security. Password crackers try ROT13 instantly. Use proper password hashing, not simple substitution ciphers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a Caesar cipher?</h3>
            <p className="text-sm text-muted-foreground">
              ROT13 is a special case of the Caesar cipher, named after Julius Caesar who used shift-3 for military messages. Caesar cipher can use any shift value.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are there ROT13 apps?</h3>
            <p className="text-sm text-muted-foreground">
              Many text editors have ROT13 plugins. Some email clients support it. Browser extensions exist. But a web tool like this is often fastest for quick conversions.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
