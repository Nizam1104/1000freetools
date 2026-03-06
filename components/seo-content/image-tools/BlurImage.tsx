import React from "react";

export function BlurImageSEO() {
  return (
    <>
      <section>
        <h2 className="text-2xl font-bold mb-4">What this tool does</h2>
        <p className="mb-4">
          This tool blurs specific areas of an image or the entire photo.
          Upload a file, select the area to obscure, adjust the blur
          intensity, and download. Use it to hide sensitive info or add
          artistic depth-of-field effects. Everything runs in your browser.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">How to use it</h2>
        <p className="mb-4">
          <strong>1. Upload your image</strong>
          <br />
          Drag a file into the workspace or click to browse. The image loads
          instantly into your browser.
        </p>
        <p className="mb-4">
          <strong>2. Select the area to blur</strong>
          <br />
          Choose whether to blur the entire image or a specific region. For
          selective blur, drag to create a rectangle over the area you want
          to obscure.
        </p>
        <p className="mb-4">
          <strong>3. Adjust intensity and download</strong>
          <br />
          Move the slider to control blur strength. Watch the preview update
          in real-time, then download when the sensitive info is hidden or
          the effect looks right.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">When you'd use this</h2>
        <p className="mb-4">
          <strong>Hiding private info in troubleshooting screenshots</strong>
          <br />
          Asking for tech help online often means sharing screenshots that
          contain email addresses or browser tabs. Blur out the private parts
          before posting to public forums.
        </p>
        <p className="mb-4">
          <strong>Obscuring faces to protect privacy</strong>
          <br />
          Posting group event photos where some people didn't consent to be
          pictured? Blur their faces to respect their privacy while still
          sharing the memory.
        </p>
        <p className="mb-4">
          <strong>Censoring license plates in car photos</strong>
          <br />
          Automotive enthusiasts who post vehicle photos often forget about
          visible license plates. Blurring them prevents malicious tracking or
          identity scraping.
        </p>
        <p className="mb-4">
          <strong>Creating artistic background blur</strong>
          <br />
          Great portrait, messy background? Applying blur outside the main
          subject simulates expensive camera lens depth-of-field, forcing
          attention to your subject.
        </p>
        <p className="mb-4">
          <strong>Anonymizing financial documents</strong>
          <br />
          Need to send a bank statement as proof but want to hide account
          numbers and balances? Blur out the sensitive fields before sharing.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">What to know before using it</h2>
        <p className="mb-4">
          <strong>Blur intensity determines readability</strong>
          <br />
          For hiding text, increase blur until characters are completely
          unreadable. Light blur might obscure at a glance but still be
          decipherable if someone zooms in.
        </p>
        <p className="mb-4">
          <strong>Pixelate vs Gaussian blur</strong>
          <br />
          Gaussian blur creates a smooth, soft effect that looks natural for
          artistic use. Pixelation creates blocky squares that clearly signal
          "this was censored" - better for privacy protection.
        </p>
        <p className="mb-4">
          <strong>The rest of your image stays sharp</strong>
          <br />
          Only the selected area gets blurred. The rest of your photo
          maintains its original quality and resolution.
        </p>
        <p className="mb-4">
          <strong>Blur is permanent after download</strong>
          <br />
          Once you download the blurred image, the effect is baked into the
          pixels. Keep an unblurred master copy saved separately in case you
          need it later.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">FAQs</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Is it safe to blur sensitive documents here?
            </h3>
            <p>
              Yes. The tool runs entirely in your browser. Bank statements,
              IDs, and other sensitive files never leave your computer.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Does blurring reduce overall image quality?
            </h3>
            <p>
              Only in the blurred area itself. The rest of your image stays
              at full quality. The blurred region is intentionally obscured,
              not degraded.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              How much blur do I need to hide text?
            </h3>
            <p>
              Start low and increase until characters are completely
              unreadable. For sensitive info, err on the side of more blur -
              you should not be able to make out any letter shapes.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Can I undo the blur if I make a mistake?
            </h3>
            <p>
              Yes, while working in the tool you can adjust or remove the blur
              before downloading. Your original file stays untouched on your
              device.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              What formats are supported?
            </h3>
            <p>
              JPG, PNG, and WebP all work. The output format matches your
              input unless you specify otherwise.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Is there a limit on how many images I can blur?
            </h3>
            <p>
              No. Process as many images as you need, one at a time. No
              signup, no quotas, no watermarks.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
