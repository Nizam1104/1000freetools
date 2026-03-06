import React from "react";

export function CropImageSEO() {
  return (
    <>
      <section>
        <h2 className="text-2xl font-bold mb-4">What this tool does</h2>
        <p className="mb-4">
          This tool lets you crop images online - remove unwanted edges,
          reframe your subject, or cut out specific areas. Drag a crop box over
          your photo, adjust the boundaries, and download the trimmed result.
          It works with JPG, PNG, and WebP files, processing everything in your
          browser.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">How to use it</h2>
        <p className="mb-4">
          <strong>1. Upload your image</strong>
          <br />
          Drag a file into the workspace or click to browse. The image loads
          instantly into your browser's memory.
        </p>
        <p className="mb-4">
          <strong>2. Set your crop area</strong>
          <br />
          Drag the corners or edges of the crop box to frame your subject. You
          can lock the aspect ratio for specific platforms (1:1 for Instagram,
          16:9 for YouTube thumbnails) or crop freeform.
        </p>
        <p className="mb-4">
          <strong>3. Apply and download</strong>
          <br />
          Click the crop button to trim away the darkened outer areas. Download
          your newly framed image immediately.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">When you'd use this</h2>
        <p className="mb-4">
          <strong>Fixing social media profile pictures</strong>
          <br />
          Your portrait has too much headroom or cuts off at an awkward spot.
          Cropping tighter draws attention to your face and fits the circular
          crop that most platforms use.
        </p>
        <p className="mb-4">
          <strong>Removing watermarks or borders</strong>
          <br />
          Downloaded stock photos often have small watermarks in the corners.
          Scanned documents might have ugly white borders. A quick crop removes
          these distractions entirely.
        </p>
        <p className="mb-4">
          <strong>Creating website header banners</strong>
          <br />
          Your landscape photo is too tall for the header space. Cropping it to
          a wide panoramic slice (like 1920x400px) makes it fit perfectly
          without stretching.
        </p>
        <p className="mb-4">
          <strong>Zooming in on distant subjects</strong>
          <br />
          Shot a bird or wildlife photo where the subject looks tiny? Cropping
          heavily into the center effectively magnifies the subject, even if
          your camera lens couldn't get close enough.
        </p>
        <p className="mb-4">
          <strong>Preparing square thumbnails</strong>
          <br />
          Podcast directories, Spotify albums, and e-commerce grids all demand
          perfectly square images. The 1:1 preset guarantees your rectangular
          photo becomes an exact square without distortion.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">What to know before using it</h2>
        <p className="mb-4">
          <strong>Cropping reduces resolution</strong>
          <br />
          If you crop a 4000x3000 photo down to a small section, you're
          discarding pixels. The cropped area keeps its original quality, but
          the overall image dimensions shrink. Don't crop too aggressively if
          you need to print large.
        </p>
        <p className="mb-4">
          <strong>Aspect ratios are platform-specific</strong>
          <br />
          Instagram posts work best at 1:1 or 4:5, YouTube thumbnails need 16:9,
          and LinkedIn banners want something like 1584x396. Know your target
          platform's requirements before cropping.
        </p>
        <p className="mb-4">
          <strong>You can't uncrop</strong>
          <br />
          Once you download the cropped image, the discarded pixels are gone
          forever. Always keep the original file saved somewhere in case you
          need to re-crop differently later.
        </p>
        <p className="mb-4">
          <strong>Circular crops aren't supported</strong>
          <br />
          This tool only does rectangular crops, which matches how image files
          actually work. If you need a circular profile picture, crop to 1:1
          square first, then use CSS or another tool to round the corners.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">FAQs</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Does cropping reduce image quality?
            </h3>
            <p>
              The cropped area itself stays at full quality - no compression or
              degradation. However, you are reducing the total pixel count, so
              the image dimensions will be smaller than the original.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Are my photos uploaded anywhere?
            </h3>
            <p>
              No. Everything happens in your browser. Your images never leave
              your computer, which means instant processing and complete
              privacy.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Can I crop multiple images at once?
            </h3>
            <p>
              This tool processes one image at a time to give you precise
              control over each crop. For batch operations, you'd need desktop
              software.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              What formats are supported?
            </h3>
            <p>
              JPG, PNG, and WebP all work. The output format matches your input
              format unless you specify otherwise.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Can I rotate the image before cropping?
            </h3>
            <p>
              Basic rotation is available if your photo is sideways. For fine
              angle adjustments to straighten horizons, use the image editor
              tool instead.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Is there a size limit?
            </h3>
            <p>
              No enforced limit since processing is local. The only constraint
              is your browser's memory - extremely large files (50MB+) might
              load slowly on older devices.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
