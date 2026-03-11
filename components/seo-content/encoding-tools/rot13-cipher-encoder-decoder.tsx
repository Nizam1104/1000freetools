import * as React from "react"

export default function Rot13CipherEncoderDecoderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the ROT13 Cipher Tool Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            ROT13 (Rotate by 13) is a simple substitution cipher that replaces each letter with the letter 13 positions away in the alphabet. A becomes N, B becomes O, and so on. After M, it wraps around: N becomes A, O becomes B, etc.
          </p>
          <p>
            The magic of ROT13 is that it's its own inverse. Apply ROT13 twice and you get back the original text. This means the same function both encodes and decodes. There's no separate "decode" mode needed.
          </p>
          <p>
            Only letters are transformed. Numbers, punctuation, spaces, and symbols pass through unchanged. Uppercase letters stay uppercase, lowercase stay lowercase. "Hello, World!" becomes "Uryyb, Jbeyq!"
          </p>
          <p>
            Just type or paste your text in the input field. The ROT13 transformation happens instantly as you type. The output appears in real-time in the result section. Copy either the input or output with one click.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Hiding spoilers in forums</h3>
            <p className="text-sm text-muted-foreground">
              Online communities use ROT13 to hide plot spoilers, punchlines, or answers. Readers decode only if they want to see the hidden content. Common on Usenet and Reddit.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Solving puzzle games and geocaching</h3>
            <p className="text-sm text-muted-foreground">
              Puzzle creators hide clues using ROT13. Geocachers encode hint sections. Decode to reveal the hint without making it obvious to casual readers or spoiler-seekers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating simple word puzzles</h3>
            <p className="text-sm text-muted-foreground">
              Teachers and puzzle makers use ROT13 for word games. Students decode messages to find answers. It's simple enough for kids but adds a fun challenge element.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Obscuring email addresses</h3>
            <p className="text-sm text-muted-foreground">
              Post ROT13-encoded email addresses online to avoid spam bots. Humans can decode to contact you. Basic obfuscation that stops casual harvesting scripts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning about cryptography basics</h3>
            <p className="text-sm text-muted-foreground">
              ROT13 is a perfect introduction to substitution ciphers. Students learn about encryption, decryption, and why simple ciphers aren't secure. Great for CS education.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating easter eggs in software</h3>
            <p className="text-sm text-muted-foreground">
              Developers hide secret messages in code using ROT13. Users who discover and decode them get a fun surprise. Classic programmer humor and hidden features.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">ROT13 provides zero security.</strong>
              Anyone who knows about ROT13 can decode instantly. It's for obfuscation, not protection. Never use to hide sensitive information. It's equivalent to writing backwards.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Only affects letters A-Z and a-z.</strong>
              Numbers (0-9), punctuation, spaces, and special characters are unchanged. "Hello 123!" becomes "Uryyb 123!" The numbers and exclamation mark stay the same.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Works the same in all languages using Latin alphabet.</strong>
              ROT13 only transforms A-Z. Accented characters (é, ñ, ü) and non-Latin scripts (Cyrillic, Greek, Chinese) pass through unchanged. It's English-centric.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">ROT13 is a special case of Caesar cipher.</strong>
              Caesar cipher shifts by any amount. ROT13 shifts by exactly 13. Since the alphabet has 26 letters, shifting by 13 twice returns to the start (13 + 13 = 26 = 0).
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> ROT13 is so common that many systems have it built-in. Linux has the "tr" command: echo "hello" | tr 'A-Za-z' 'N-ZA-Mn-za-m'. Some email clients and forum software auto-detect and offer to decode ROT13.
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
              The Latin alphabet has 26 letters. Half of 26 is 13. This makes ROT13 self-inverse: encode twice = decode. Other shift amounts would need separate encode/decode functions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is ROT13 the same as Caesar cipher?</h3>
            <p className="text-sm text-muted-foreground">
              ROT13 is a specific Caesar cipher with shift=13. Caesar cipher can use any shift (ROT1, ROT5, etc.). Julius Caesar reportedly used ROT3 for military messages.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can ROT13 be cracked?</h3>
            <p className="text-sm text-muted-foreground">
              There's nothing to crack. ROT13 has no key. Everyone uses the same transformation. It's not encryption, it's a fixed substitution. Just apply ROT13 to decode.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does "ur" mean in ROT13?</h3>
            <p className="text-sm text-muted-foreground">
              "ur" decodes to "he". Common ROT13 abbreviations: "ur" = he, "gur" = the, "naq" = and. Internet slang sometimes uses ROT13 for shorthand that looks like gibberish.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does ROT13 work on non-English text?</h3>
            <p className="text-sm text-muted-foreground">
              Only for letters A-Z. Spanish, French, German text with accented letters will have those accents unchanged. Non-Latin scripts (Arabic, Chinese) are completely unaffected.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Where did ROT13 originate?</h3>
            <p className="text-sm text-muted-foreground">
              ROT13 became popular on Usenet in the 1980s for hiding spoilers and offensive content. It was built into early newsreaders. The exact origin is unclear but predates widespread internet use.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use ROT13 for passwords?</h3>
            <p className="text-sm text-muted-foreground">
              Absolutely not. ROT13 is trivially reversible. Any attacker would decode instantly. Use proper password hashing (bcrypt, Argon2) for password storage. ROT13 is for fun, not security.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
