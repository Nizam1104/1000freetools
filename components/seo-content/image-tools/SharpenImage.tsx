import React from "react";

export function SharpenImageSEO() {
  return (
    <>
      <section>
        <h2 className="text-2xl font-bold mb-4">What this tool does</h2>
        <p className="mb-4">
          This tool sharpens blurry photos by enhancing edge contrast. Upload
          a soft image, slide to increase sharpness, and download a crisper
          version. Works with JPG, PNG, and WebP files, all processed in your
          browser.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">How to use it</h2>
        <p className="mb-4">
          <strong>1. Upload your blurry photo</strong>
          <br />
          Drag a file into the workspace or click to browse. The image loads
          instantly into your browser.
        </p>
        <p className="mb-4">
          <strong>2. Adjust the sharpening intensity</strong>
          <br />
          Move the slider to increase edge contrast. Watch the preview update
          in real-time. Stop before you see unnatural halos around edges.
        </p>
        <p className="mb-4">
          <strong>3. Download the sharpened image</strong>
          <br />
          When the image looks crisp enough, click download. The enhanced
          version saves to your device.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">When you'd use this</h2>
        <p className="mb-4">
          <strong>Rescuing soft pet photos</strong>
          <br />
          Dogs and cats rarely sit still. A slightly blurred action shot can
          be tightened up - sharpening restores fur detail and makes eyes look
          glassy and alert.
        </p>
        <p className="mb-4">
          <strong>Fixing compressed web graphics</strong>
          <br />
          Logos and screenshots downloaded from social media often look muddy
          from compression. Sharpening tightens soft edges and makes text
          legible again.
        </p>
        <p className="mb-4">
          <strong>Enhancing macro product photography</strong>
          <br />
          Close-up jewelry or watch photos often lack definition due to
          shallow depth of field. Sharpening emphasizes metallic textures and
          gemstone facets that the camera softened.
        </p>
        <p className="mb-4">
          <strong>Improving scanned film photos</strong>
          <br />
          Scanned 35mm negatives often come out softer than expected. Gentle
          sharpening replicates the crisp micro-contrast of modern digital
          photos without destroying the analog film grain.
        </p>
        <p className="mb-4">
          <strong>Preparing large prints</strong>
          <br />
          Printing a photo at poster size inherently softens the image.
          Over-sharpening slightly before sending to the printer ensures the
          final physical print looks crisp on your wall.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">What to know before using it</h2>
        <p className="mb-4">
          <strong>Sharpening can't create detail that doesn't exist</strong>
          <br />
          If a photo is severely out of focus or motion-blurred, sharpening
          won't magically restore it. The tool works best on slightly soft
          images, not completely destroyed ones.
        </p>
        <p className="mb-4">
          <strong>Too much sharpening creates halos</strong>
          <br />
          Cranking the slider to maximum creates visible light/dark halos
          around edges. This looks artificial and unnatural. Stop increasing
          once details pop without obvious artifacts.
        </p>
        <p className="mb-4">
          <strong>Sharpening increases file size slightly</strong>
          <br />
          Enhanced edge contrast adds data to the image. The file size
          increase is usually minimal but noticeable with aggressive
          sharpening.
        </p>
        <p className="mb-4">
          <strong>Works on transparent PNGs</strong>
          <br />
          The sharpening algorithm respects transparency. It enhances edges
          within the opaque parts of your PNG without creating artifacts
          around the transparent boundaries.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">FAQs</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Is this sharpening tool free?
            </h3>
            <p>
              Yes. No signup, no limits, no watermarks. Use it as often as you
              need.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Are my photos uploaded to a server?
            </h3>
            <p>
              No. All processing happens in your browser. Your images stay on
              your computer.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Can I fix completely blurry images?
            </h3>
            <p>
              Sharpening helps with slightly soft photos and minor motion
              blur. Severely out-of-focus images can't be fully restored - the
              original detail simply wasn't captured.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Does sharpening increase file size?
            </h3>
            <p>
              Slightly. Enhanced edges add data to the compressed file, but
              the increase is usually minimal unless you apply extreme
              sharpening.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Is there a limit on how many images I can sharpen?
            </h3>
            <p>
              No. Process as many images as you need, one at a time. No daily
              quotas or usage restrictions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Does this work on transparent PNGs?
            </h3>
            <p>
              Yes. The tool sharpens the opaque parts of transparent images
              without creating ugly artifacts around the transparent edges.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
