import React from "react";

export function ResizeImageSEO() {
  return (
    <>
      <section>
        <h2 className="text-2xl font-bold mb-4">What this tool does</h2>
        <p className="mb-4">
          This tool changes the pixel dimensions of your images - making them
          larger or smaller. Type in a new width and height, and it resizes the
          photo while maintaining (or ignoring) the aspect ratio as you choose.
          Works with JPG, PNG, and WebP files, all processed in your browser.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">How to use it</h2>
        <p className="mb-4">
          <strong>1. Upload your image</strong>
          <br />
          Drag a file into the tool or click to select it. You'll see the
          current dimensions displayed (like 4000x3000 pixels).
        </p>
        <p className="mb-4">
          <strong>2. Enter new dimensions</strong>
          <br />
          Type your target width or height. With the aspect ratio lock enabled,
          the other dimension adjusts automatically to prevent stretching.
        </p>
        <p className="mb-4">
          <strong>3. Download the resized image</strong>
          <br />
          Preview the result, then click download. The resized image saves
          directly to your device.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">When you'd use this</h2>
        <p className="mb-4">
          <strong>Fitting images into website layouts</strong>
          <br />
          Your photographer sent 6000px-wide images, but your website template
          only displays them at 1200px. Resizing them before upload prevents
          slow page loads and layout breakage.
        </p>
        <p className="mb-4">
          <strong>Meeting passport or visa photo requirements</strong>
          <br />
          Government portals reject photos that aren't exact dimensions - like
          600x600 pixels for US passports. This tool lets you hit those
          specifications precisely.
        </p>
        <p className="mb-4">
          <strong>Preparing social media graphics</strong>
          <br />
          Instagram posts work best at 1080x1080 or 1080x1350, YouTube
          thumbnails need 1280x720. Resizing your artwork to these exact
          dimensions prevents awkward automatic cropping.
        </p>
        <p className="mb-4">
          <strong>Reducing email attachment size</strong>
          <br />
          Smartphone photos are often 3000-4000 pixels wide. Shrinking them to
          1920px before emailing cuts the file size dramatically while still
          looking sharp on screens.
        </p>
        <p className="mb-4">
          <strong>Creating dual-monitor wallpapers</strong>
          <br />
          Standard wallpapers don't span two different-sized monitors correctly.
          Unlock the aspect ratio and type the exact combined width of both
          screens for a seamless background.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">What to know before using it</h2>
        <p className="mb-4">
          <strong>Enlarging reduces quality</strong>
          <br />
          Making a small image bigger doesn't add real detail - it just
          stretches existing pixels. A 500px icon blown up to 2000px will look
          soft or pixelated. Shrinking works great; enlarging has limits.
        </p>
        <p className="mb-4">
          <strong>Aspect ratio lock prevents distortion</strong>
          <br />
          Keep this enabled unless you intentionally want to stretch or squash
          the image. Disabling it lets you force any dimensions, but people
          will look tall and thin or short and wide.
        </p>
        <p className="mb-4">
          <strong>File size usually decreases when shrinking</strong>
          <br />
          Fewer pixels means less data. A 4000x3000 photo resized to 1920x1080
          will have a much smaller file size even before compression.
        </p>
        <p className="mb-4">
          <strong>Print vs screen dimensions are different</strong>
          <br />
          This tool changes pixel dimensions, not physical print size. A
          3000x2400 image prints at 10x8 inches at 300 DPI, but the same file
          displays at different sizes depending on screen resolution.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">FAQs</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Will resizing make my image blurry?
            </h3>
            <p>
              Shrinking an image usually looks fine - you're just removing
              pixels. Enlarging makes it softer because the tool has to invent
              new pixels through interpolation. Small enlargements (up to 20%)
          are usually acceptable.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Are my images uploaded to a server?
            </h3>
            <p>
              No. The resizing happens entirely in your browser using
              JavaScript. Your photos stay on your computer throughout the
              process.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Can I resize multiple images at once?
            </h3>
            <p>
              This tool handles one image at a time for precise control. For
              batch resizing, you'd need desktop software or a dedicated batch
              tool.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              What's the maximum size I can resize to?
            </h3>
            <p>
              There's no artificial limit, but browsers struggle with images
              over 16,000 pixels in either dimension. For most practical uses,
              this isn't a constraint.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Does this change the DPI/PPI setting?
            </h3>
            <p>
              No. This tool only changes pixel dimensions. DPI (dots per inch)
              is a print metadata setting that doesn't affect how images
              display on screens.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Can I make an image smaller than 1 pixel?
            </h3>
            <p>
              Technically yes, but the minimum useful dimension is 1 pixel.
              Anything smaller than about 10x10 becomes unrecognizable anyway.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
