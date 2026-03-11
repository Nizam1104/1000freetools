import React from "react"

export default function JavascriptEncryptionToolSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the JavaScript Encryption Tool Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select your cipher algorithm: Caesar, XOR, or Vigenère. Each uses different encryption techniques with varying complexity. Enter your text and any required keys or shift values.
          </p>
          <p>
            For Caesar cipher, set the shift amount (how many letters to rotate). For XOR and Vigenère, provide an encryption key. Toggle between encrypt and decrypt modes.
          </p>
          <p>
            Results appear instantly. Encrypted text can be copied or downloaded. Decryption reverses the process using the same algorithm and key. All processing happens locally in your browser.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning cryptography basics</h3>
            <p className="text-sm text-muted-foreground">
              Understand how classical ciphers work. Experiment with different keys and see the results. Great for computer science students and cryptography enthusiasts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating simple obfuscation</h3>
            <p className="text-sm text-muted-foreground">
              Hide text from casual viewing. Not secure, but prevents easy reading. Useful for hiding spoilers or easter eggs in code.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building CTF challenges</h3>
            <p className="text-sm text-muted-foreground">
              Create encryption puzzles for capture-the-flag competitions. Participants decrypt to find flags. Classic cryptography challenges.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing decryption code</h3>
            <p className="text-sm text-muted-foreground">
              Generate encrypted test data for your decryption functions. Verify your implementation handles various inputs correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Understanding encryption concepts</h3>
            <p className="text-sm text-muted-foreground">
              See how keys affect output. Learn why simple ciphers are insecure. Build foundation for understanding modern cryptography.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating puzzles and games</h3>
            <p className="text-sm text-muted-foreground">
              Hide messages in games or escape rooms. Players decrypt to progress. Adds an educational element to entertainment.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">These are educational ciphers, not secure.</strong>
              Caesar, XOR, and Vigenère are easily broken. Never use them for real security. Modern encryption uses AES, RSA, or similar algorithms.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Key management is crucial.</strong>
              Same key encrypts and decrypts. Share keys securely. Lost keys mean lost data. This is symmetric encryption.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Only letters are encrypted.</strong>
              Numbers, spaces, and punctuation pass through unchanged. This makes patterns easier to spot. Real encryption transforms everything.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">XOR output is Base64 encoded.</strong>
              XOR produces binary data. We encode it as Base64 for display. Decoding happens automatically during decryption.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Important:</strong> For real data protection, use Web Crypto API or libraries like TweetNaCl. These classical ciphers are for learning only. Never trust them with sensitive information.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Which cipher is most secure?</h3>
            <p className="text-sm text-muted-foreground">
              Vigenère is hardest to break of the three, but still trivial for computers. None are secure by modern standards. All are educational tools.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I decrypt without the key?</h3>
            <p className="text-sm text-muted-foreground">
              For these simple ciphers, yes. Caesar has only 25 possible shifts. Vigenère can be broken with frequency analysis. That's why they're insecure.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What makes a good key?</h3>
            <p className="text-sm text-muted-foreground">
              Longer keys are better. Avoid common words. Random character sequences work best. But remember: these ciphers are insecure regardless of key.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it support Unicode?</h3>
            <p className="text-sm text-muted-foreground">
              Basic support for Latin characters. Extended Unicode may not work correctly. These classical ciphers were designed for simple alphabets.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I encrypt files?</h3>
            <p className="text-sm text-muted-foreground">
              This tool handles text only. For files, you'd need to read them as text first. Binary files need different handling.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the Caesar shift range?</h3>
            <p className="text-sm text-muted-foreground">
              Any integer works. Shift of 26 equals no shift (full rotation). Negative shifts work too. Common shifts are 3 (original Caesar) or 13 (ROT13).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my encrypted data safe?</h3>
            <p className="text-sm text-muted-foreground">
              Processing is local, so data isn't transmitted. But the encryption itself is weak. Anyone can decrypt it. Don't rely on this for privacy.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
