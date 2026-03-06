import React from "react";

export function ImageEditorSEO() {
  return (
    <>
      <section>
        <h2 className="text-2xl font-bold mb-4">What this tool does</h2>
        <p className="mb-4">
          This is a full-featured image editor that runs in your browser. Crop,
          rotate, adjust brightness and contrast, apply filters, add text, and
          draw on images. No download required - everything works online with
          real-time previews.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">How to use it</h2>
        <p className="mb-4">
          <strong>1. Load your image</strong>
          <br />
          Drag a file into the editor or click to browse. The image appears on
          the canvas with toolbars around it.
        </p>
        <p className="mb-4">
          <strong>2. Apply your edits</strong>
          <br />
          Use the tabs to switch between adjustments (brightness, contrast),
          filters (vintage, black and white), cropping, text overlays, and
          freehand drawing. Changes preview instantly.
        </p>
        <p className="mb-4">
          <strong>3. Save your work</strong>
          <br />
          Click save, choose your output format (JPG, PNG, or WebP), and
          download the edited image. Use undo/redo to step back through changes
          as needed.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">When you'd use this</h2>
        <p className="mb-4">
          <strong>Fixing dull smartphone photos</strong>
          <br />
          Photos taken on cloudy days look flat and gray. Bumping up contrast
          and saturation slightly adds punch and makes them Instagram-ready.
        </p>
        <p className="mb-4">
          <strong>Straightening crooked horizons</strong>
          <br />
          Beach and landscape shots often have tilted horizons. The rotation
          tool lets you level them precisely before cropping out the resulting
          white edges.
        </p>
        <p className="mb-4">
          <strong>Adding text to screenshots for tutorials</strong>
          <br />
          A naked screenshot rarely explains itself. Drop arrows, boxes, and
          explanatory text directly onto the image to guide readers through
          your software tutorial.
        </p>
        <p className="mb-4">
          <strong>Highlighting details in document scans</strong>
          <br />
          Need to point out a specific clause in a contract or a signature line
          on a form? Use the drawing tool to circle the important areas before
          sending.
        </p>
        <p className="mb-4">
          <strong>Creating uniform employee headshots</strong>
          <br />
          Corporate "meet the team" pages look messy with inconsistently framed
          photos. Crop everyone to the same dimensions and apply the same
          brightness adjustments for a cohesive look.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">What to know before using it</h2>
        <p className="mb-4">
          <strong>Edits are non-destructive until download</strong>
          <br />
          You can undo any change while working in the editor. Your original
          file stays untouched on your device. Only the downloaded copy
          contains the edits.
        </p>
        <p className="mb-4">
          <strong>Filters are pre-configured adjustment stacks</strong>
          <br />
          Each filter combines multiple adjustments (contrast, saturation,
          color temperature) into one click. They're starting points - feel
          free to fine-tune afterward.
        </p>
        <p className="mb-4">
          <strong>Text and drawings are rasterized on export</strong>
          <br />
          Once you download, text overlays and drawn annotations become part of
          the pixel data. They can't be edited as separate layers afterward.
        </p>
        <p className="mb-4">
          <strong>Works offline after initial load</strong>
          <br />
          Once the editor loads in your browser, you can continue editing even
          if your internet connection drops. All processing is local.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">FAQs</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Is this editor really free?
            </h3>
            <p>
              Yes. All features are available with no signup, no watermarks,
              and no usage limits.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              What formats can I edit?
            </h3>
            <p>
              JPG, PNG, and WebP files all work. You can export to any of these
              formats regardless of what you uploaded.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Are my images uploaded anywhere?
            </h3>
            <p>
              No. All editing happens in your browser using your device's
              processing power. Your photos stay private.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Can I undo mistakes?
            </h3>
            <p>
              Yes. The undo button reverses your last action. You can undo
              multiple times to step back through your entire editing session.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Will the exported image have a watermark?
            </h3>
            <p>
              No. Your downloaded image is completely clean - no logos, no
              watermarks, no branding of any kind.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Does this work without internet?
            </h3>
            <p>
              Once the page loads, yes. All editing is done locally in your
              browser, so you can continue working even if your connection
              drops.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
