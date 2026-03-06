import React from "react";

export function AddWatermarkOnImageSEO() {
  return (
    <>
      <section>
        <h2 className="text-2xl font-bold mb-4">What this tool does</h2>
        <p className="mb-4">
          This tool adds watermarks to your images - either text or a logo.
          Position it where you want, adjust the opacity so it's visible but
          not distracting, and download the protected image. Works with JPG,
          PNG, and WebP files, all processed in your browser.
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
          <strong>2. Choose text or logo watermark</strong>
          <br />
          Type your copyright notice or upload a PNG logo with transparent
          background. Adjust font size, color, and opacity for text watermarks.
        </p>
        <p className="mb-4">
          <strong>3. Position and download</strong>
          <br />
          Drag the watermark to your preferred spot - corner for subtle
          branding, center for maximum protection. Download the watermarked
          image immediately.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">When you'd use this</h2>
        <p className="mb-4">
          <strong>Protecting client photo proofs</strong>
          <br />
          When sending unedited drafts to clients, you want to prevent
          unauthorized printing or sharing. A semi-transparent watermark across
          the center lets them evaluate the shot while protecting your work.
        </p>
        <p className="mb-4">
          <strong>Branding e-commerce product photos</strong>
          <br />
          Competitors can easily right-click and steal your product images. A
          subtle logo watermark in the corner makes your products instantly
          recognizable and harder to copy.
        </p>
        <p className="mb-4">
          <strong>Securing digital art before posting</strong>
          <br />
          Artists on Instagram and Twitter deal with constant art theft. Adding
          your signature or handle as a watermark ties the work to you
          permanently, even if it gets reposted without credit.
        </p>
        <p className="mb-4">
          <strong>Watermarking real estate photos</strong>
          <br />
          Property listings get scraped by aggregators constantly. Adding your
          agency logo protects your investment and drives leads back to your
          brokerage.
        </p>
        <p className="mb-4">
          <strong>Creating meme templates with credit</strong>
          <br />
          Content creators who design viral templates want recognition as their
          work spreads. A small watermark with your social handle ensures you
          get credit as the image circulates.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">What to know before using it</h2>
        <p className="mb-4">
          <strong>Opacity controls visibility</strong>
          <br />
          Lower opacity (30-40%) makes the watermark semi-transparent - good
          for corner placement where you want branding without obscuring the
          image. Higher opacity (70-100%) is better for center placement when
          protection is the priority.
        </p>
        <p className="mb-4">
          <strong>Position affects both protection and aesthetics</strong>
          <br />
          Corner watermarks are subtle and professional but easier to crop out.
          Center watermarks are nearly impossible to remove but more
          distracting. Choose based on your priority.
        </p>
        <p className="mb-4">
          <strong>Text vs logo depends on your needs</strong>
          <br />
          Text is quick and works for copyright notices ("© 2025 Your Name").
          Logos are better for established brands. You can only add one or the
          other per session - not both simultaneously.
        </p>
        <p className="mb-4">
          <strong>Watermarks are permanent after download</strong>
          <br />
          Once you download the watermarked image, the watermark is baked into
          the pixels. Keep an unwatermarked master copy saved separately in
          case you need it later.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">FAQs</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Does watermarking reduce image quality?
            </h3>
            <p>
              No. The tool preserves your original image dimensions and
              quality. The watermark is overlaid without compressing or
              degrading the underlying photo.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Are my images uploaded to a server?
            </h3>
            <p>
              No. Everything happens in your browser. Your photos and
              watermarks never leave your computer.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Can I add both text and logo at once?
            </h3>
            <p>
              Not in a single pass. You can add either text or a logo per
              session. If you need both, create a PNG that combines them first,
              then upload that as your watermark.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              What formats are supported?
            </h3>
            <p>
              Upload JPG, PNG, or WebP. The output format matches your input
              unless you specify otherwise.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              How do I make the watermark less distracting?
            </h3>
            <p>
              Lower the opacity to 30-40% and use a color that contrasts
              reasonably with the background without being harsh. White or
              light gray at low opacity works well on most images.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Is there a limit on how many images I can watermark?
            </h3>
            <p>
              No. Process as many images as you need, one at a time. No signup,
              no quotas, no watermarks on your watermarks.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
