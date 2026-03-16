export default function SteganographyToolSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This steganography tool hides secret text messages inside PNG images using LSB
            (Least Significant Bit) encoding. The hidden data is invisible to the naked eye
            because it only modifies the least significant bits of pixel colors.
          </p>
          <p className="text-muted-foreground">
            The encoding process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Prepare the message:</strong> Your text is converted to binary, with a length header to know where it ends.</li>
            <li><strong className="text-foreground">Optional encryption:</strong> If you set a password, the message is encrypted before embedding.</li>
            <li><strong className="text-foreground">Embed in pixels:</strong> Each bit of your message replaces the least significant bit of pixel color values (R, G, B channels).</li>
            <li><strong className="text-foreground">Save the image:</strong> The modified image looks identical but contains your hidden message.</li>
          </ol>
          <p className="text-muted-foreground">
            Extraction reverses this: read the LSBs from pixels, reconstruct the binary data,
            decrypt if password-protected, and convert back to text.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Educational Demonstrations",
              description: "Teach information security concepts by showing how data can be hidden in plain sight."
            },
            {
              title: "CTF Competition Challenges",
              description: "Solve steganography challenges in capture-the-flag cybersecurity competitions."
            },
            {
              title: "Digital Watermarking Experiments",
              description: "Explore how invisible watermarks can be embedded in images for copyright protection."
            },
            {
              title: "Privacy Through Obscurity",
              description: "Hide sensitive notes in innocuous images as an additional layer of protection (not primary security)."
            },
            {
              title: "Steganography Detection Research",
              description: "Create test images with known hidden content to develop or test steganalysis tools."
            },
            {
              title: "Fun Secret Communications",
              description: "Send hidden messages in images for games, puzzles, or creative projects where discovery is part of the fun."
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-muted/30 p-4 space-y-2">
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">What to Know Before Using</h2>
        <div className="space-y-3">
          {[
            {
              caveat: "Steganography is NOT encryption",
              explanation: "It hides the existence of data, not the content. Anyone who knows to look can extract it. Use encryption too for real security."
            },
            {
              caveat: "Only works with lossless image formats",
              explanation: "PNG is required. JPEG compression destroys the hidden data. GIF and BMP can work but PNG is standard."
            },
            {
              caveat: "Image size increases with message length",
              explanation: "Each character needs 8 bits × 3 channels = 24 pixels (roughly). Long messages need large images."
            },
            {
              caveat: "Statistical analysis can detect hidden data",
              explanation: "Sophisticated steganalysis tools can detect LSB modifications. Don't rely on steganography alone for security."
            },
            {
              caveat: "Password protection adds real security",
              explanation: "Without a password, anyone can extract the message. With password-based encryption, extraction requires the key."
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-muted/30 p-4">
              <h3 className="font-semibold text-foreground mb-1">{item.caveat}</h3>
              <p className="text-sm text-muted-foreground">{item.explanation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Common Questions</h2>
        <div className="space-y-6">
          {[
            {
              question: "Is steganography legal?",
              answer: "Yes, in most countries. Steganography itself is just a technique. Like encryption, it's legal to use but may be regulated in some jurisdictions for certain purposes."
            },
            {
              question: "Can hidden data survive image editing?",
              answer: "Generally no. Cropping, resizing, filtering, or converting to JPEG will likely destroy the hidden data. The image must remain unchanged."
            },
            {
              question: "How much data can I hide in an image?",
              answer: "Approximately 1 byte per 3 pixels (using all RGB channels). A 1000×1000 image can hold about 333 KB. But larger hidden data is easier to detect."
            },
            {
              question: "Will the image look different after hiding data?",
              answer: "Not visibly. LSB changes alter colors by at most 1 part in 256 - imperceptible to human eyes. Statistical analysis can detect it, but not visual inspection."
            },
            {
              question: "What's the difference between steganography and watermarking?",
              answer: "Steganography hides arbitrary data secretly. Watermarking embeds identifying information (often robust against editing) to prove ownership or authenticity."
            },
            {
              question: "Can I hide files, not just text?",
              answer: "Yes, any binary data can be hidden. This tool focuses on text, but the same technique works for files. Just encode the file as binary first."
            },
            {
              question: "How do I know if an image has hidden data?",
              answer: "You can't tell by looking. Specialized steganalysis tools analyze statistical patterns. Or try extracting with this tool - if there's valid data, you'll find it."
            },
          ].map((item, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="font-semibold text-foreground">{item.question}</h3>
              <p className="text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
