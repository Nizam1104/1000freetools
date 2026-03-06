import React from "react";

export function ImageToGifSEO() {
  return (
    <>
      <section>
        <h2 className="text-2xl font-bold mb-4">What this tool does</h2>
        <p className="mb-4">
          This tool turns multiple static images into an animated GIF. Upload
          up to 50 frames, set the speed for each one, arrange the order, and
          download a looping animation. Everything processes in your browser -
          no upload required.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">How to use it</h2>
        <p className="mb-4">
          <strong>1. Upload your frames</strong>
          <br />
          Drag a sequence of images into the timeline or select them from your
          device. They appear as thumbnails in order.
        </p>
        <p className="mb-4">
          <strong>2. Arrange and time the frames</strong>
          <br />
          Drag thumbnails to reorder them. Use the delay slider to set how
          long each frame displays - lower numbers mean faster animation.
        </p>
        <p className="mb-4">
          <strong>3. Set dimensions and download</strong>
          <br />
          Choose the output width and height. Click convert to generate the
          GIF, then download it directly.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">When you'd use this</h2>
        <p className="mb-4">
          <strong>Creating software tutorials for documentation</strong>
          <br />
          Explaining a multi-click workflow in text frustrates users. Combine
          4-5 sequential screenshots into a looping GIF that shows the exact
          steps visually.
        </p>
        <p className="mb-4">
          <strong>Showcasing product variations in emails</strong>
          <br />
          Instead of cramming separate photos of each color variant into your
          email, stack them into a rotating GIF. Customers see all options in
          one compact frame.
        </p>
        <p className="mb-4">
          <strong>Animating architectural before-and-after reveals</strong>
          <br />
          Drop progressive renderings (before, during, after) into the
          timeline. The resulting animation shows the transformation
          dynamically to clients.
        </p>
        <p className="mb-4">
          <strong>Making banner ads that grab attention</strong>
          <br />
          Static banners get ignored. Animate three text graphics flashing a
          promotional message rhythmically to command viewer attention and
          boost click-through rates.
        </p>
        <p className="mb-4">
          <strong>Turning burst photos into living portraits</strong>
          <br />
          Your phone captured 10 rapid shots of your kid's genuine smile.
          Compile the burst sequence into an animation that brings the subtle
          movements back to life.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">What to know before using it</h2>
        <p className="mb-4">
          <strong>GIF files can get large quickly</strong>
          <br />
          Each frame adds to the file size. A 30-frame animation at full
          resolution might be 10MB+. Reduce dimensions or frame count if you
          need to stay under email limits.
        </p>
        <p className="mb-4">
          <strong>Frame delay controls speed</strong>
          <br />
          Delay is measured in milliseconds. 100ms per frame = 10 frames per
          second (fast). 500ms = 2 frames per second (slideshow pace).
        </p>
        <p className="mb-4">
          <strong>Different-sized images get normalized</strong>
          <br />
          If you upload frames with different dimensions, the tool scales them
          to a uniform canvas. Set your target width and height before
          converting.
        </p>
        <p className="mb-4">
          <strong>GIFs loop forever by default</strong>
          <br />
          The output GIF will repeat continuously in browsers and most image
          viewers. This is standard GIF behavior.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">FAQs</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Is this GIF maker really free?
            </h3>
            <p>
              Yes. No watermarks, no subscriptions, no daily limits. You can
              create as many GIFs as you need.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              How many frames can I use?
            </h3>
            <p>
              Up to 50 images per GIF. For smooth animation, 15-30 frames
              usually works well. More frames = larger file size.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Are my images uploaded anywhere?
            </h3>
            <p>
              No. All processing happens in your browser. Your photos never
              leave your computer.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              What formats can I upload?
            </h3>
            <p>
              JPG, PNG, and WebP all work. You can mix formats in the same
              animation without issues.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Can I adjust the animation speed?
            </h3>
            <p>
              Yes. The delay slider controls how long each frame displays.
              Test different speeds using the live preview before downloading.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Will the GIF be smaller than my original photos?
            </h3>
            <p>
              Usually not - GIFs combine multiple frames into one file, so
              they're often larger than individual source images. Reducing
              dimensions helps keep file size manageable.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
