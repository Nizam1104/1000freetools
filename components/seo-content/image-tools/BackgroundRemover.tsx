import React from "react";

export function BackgroundRemoverSEO() {
  return (
    <>
      <section>
        <h2 className="text-2xl font-bold mb-4">What this tool does</h2>
        <p className="mb-4">
          This tool automatically removes backgrounds from images using AI that
          runs entirely in your browser. Upload a photo - it detects the main
          subject (person, product, or object) and extracts it as a transparent
          PNG. You can process up to 25 images at once, and nothing gets
          uploaded to any server.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">How it works</h2>
        <p className="mb-4">
          <strong>1. Drop your images</strong>
          <br />
          Drag files into the upload area or click to browse. The tool supports
          JPG, PNG, and WebP formats. Files load instantly since they stay on
          your device.
        </p>
        <p className="mb-4">
          <strong>2. Wait for automatic detection</strong>
          <br />
          The AI analyzes contrast and edges to identify your subject. No
          manual tracing or selection needed - it handles hair, fur, and
          complex boundaries automatically.
        </p>
        <p className="mb-4">
          <strong>3. Download the transparent PNG</strong>
          <br />
          Check the preview - the checkerboard pattern confirms transparency.
          Click download to save the background-free image.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">When you'd use this</h2>
        <p className="mb-4">
          <strong>E-commerce product listings</strong>
          <br />
          Amazon, Shopify, and Etsy all expect product photos on white or
          transparent backgrounds. Instead of paying for manual editing, you can
          batch-process your entire catalog and get consistent results.
        </p>
        <p className="mb-4">
          <strong>Presentation slides</strong>
          <br />
          Dropping a photo with a messy background onto a corporate template
          looks amateurish. Removing the background lets you overlay the
          subject cleanly on any colored slide.
        </p>
        <p className="mb-4">
          <strong>YouTube thumbnails</strong>
          <br />
          Creators often want cutout portraits over bright, eye-catching
          backgrounds. Extract yourself from your webcam photo and paste onto
          whatever background fits your thumbnail concept.
        </p>
        <p className="mb-4">
          <strong>Custom stickers and memes</strong>
          <br />
          Turning your cat or friend's face into a sticker requires removing
          everything else. The transparent PNG output drops right into meme
          generators or sticker printing tools.
        </p>
        <p className="mb-4">
          <strong>Headshot background replacement</strong>
          <br />
          Great LinkedIn photo, terrible office background behind you? Remove
          it and replace with a clean gradient or professional backdrop.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">What to know before using it</h2>
        <p className="mb-4">
          <strong>Contrast matters</strong>
          <br />
          The AI works best when your subject stands out clearly from the
          background. A person in a red shirt against a green wall? Perfect. A
          white product on a white table? It'll struggle.
        </p>
        <p className="mb-4">
          <strong>Complex edges work surprisingly well</strong>
          <br />
          Hair, fur, and wispy fabric used to be nightmare scenarios for
          background removal. Modern AI handles these edges well, but you
          should still check the preview at 100% zoom before downloading.
        </p>
        <p className="mb-4">
          <strong>Output is always PNG</strong>
          <br />
          Even if you upload a JPG, the tool saves as PNG because that's the
          only common format that supports transparency. PNG files are larger
          than JPEG but necessary for transparent backgrounds.
        </p>
        <p className="mb-4">
          <strong>Processing speed depends on your device</strong>
          <br />
          Since the AI runs locally, newer computers with more RAM will process
          images faster. A batch of 25 photos might take 30 seconds on a
          MacBook Pro but 2-3 minutes on an older laptop.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">FAQs</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Does background removal reduce image quality?
            </h3>
            <p>
              The subject itself stays at full resolution - the tool only
              removes background pixels. Your extracted person or product will
              be just as sharp as the original upload.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Are my photos sent to a server?
            </h3>
            <p>
              No. The AI model runs entirely in your browser using
              WebAssembly. Your images never leave your computer, which means
              faster processing and guaranteed privacy.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Can I process multiple images at once?
            </h3>
            <p>
              Yes, you can upload up to 25 images simultaneously. The tool
              processes them in sequence and lets you download each one
              individually or all together.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              What formats can I upload?
            </h3>
            <p>
              JPG, PNG, and WebP all work. The output is always PNG to preserve
              the transparent background, regardless of what format you upload.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Does this work on group photos?
            </h3>
            <p>
              It depends. The AI typically extracts all people as a single
              subject. If you need to separate individuals from each other,
              you'll need manual editing software.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Is this really free with no limits?
            </h3>
            <p>
              Yes. No watermarks, no subscriptions, no daily quotas. The 25
              image batch limit is just to prevent browser crashes from
              memory overload.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
