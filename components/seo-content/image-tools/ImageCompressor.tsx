import React from "react";

export function ImageCompressorSEO() {
  return (
    <>
      <section>
        <h2 className="text-2xl font-bold mb-4">What this tool does</h2>
        <p className="mb-4">
          Large image files slow down websites and eat up storage space. This
          tool compresses JPEG, PNG, WebP, and AVIF images directly in your
          browser - no upload required. You can process a single photo or batch
          compress up to 50 files at once, then download them individually or as
          a ZIP archive.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">How it works</h2>
        <p className="mb-4">
          <strong>1. Upload your images</strong>
          <br />
          Drag files into the drop zone or select them from your device. The
          tool loads them into your browser's memory - they never leave your
          computer.
        </p>
        <p className="mb-4">
          <strong>2. Set the quality level</strong>
          <br />
          Move the quality slider to find your balance between file size and
          visual fidelity. Around 80-85% usually cuts file size in half without
          noticeable quality loss.
        </p>
        <p className="mb-4">
          <strong>3. Preview and download</strong>
          <br />
          See a side-by-side comparison of original vs compressed. When you're
          satisfied, download individual files or grab everything as a ZIP.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">When you'd use this</h2>
        <p className="mb-4">
          <strong>Speeding up a slow WordPress site</strong>
          <br />
          Hero images from your photographer are probably 5-10MB each.
          Compressing them to WebP at 85% quality can drop them to 200-500KB
          without visible degradation - your page load times will thank you.
        </p>
        <p className="mb-4">
          <strong>Getting past email attachment limits</strong>
          <br />
          Gmail cuts you off at 25MB. If you need to send 20 event photos that
          total 80MB, running them through this compressor first can shrink the
          batch down enough to fit in a single email.
        </p>
        <p className="mb-4">
          <strong>Freeing up phone or hard drive space</strong>
          <br />
          Raw photos from a weekend shoot can fill gigabytes fast. Compressing
          older images to 70-75% quality frees up substantial storage while
          keeping them perfectly viewable.
        </p>
        <p className="mb-4">
          <strong>Meeting upload requirements for portals</strong>
          <br />
          Government websites, job applications, and university portals often
          reject files over 2MB. You can dial down the quality until your
          passport scan or transcript fits within their limits.
        </p>
        <p className="mb-4">
          <strong>Reducing mobile app bundle size</strong>
          <br />
          If you're shipping a React Native or Flutter app, every megabyte
          matters. Compressing UI assets and background images with AVIF
          encoding can shave megabytes off your download size.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">What to know before using it</h2>
        <p className="mb-4">
          <strong>Lossy vs lossless compression</strong>
          <br />
          This tool uses lossy compression, which permanently removes some image
          data to reduce file size. At 85% quality or higher, the difference is
          typically invisible to the human eye. If you need mathematically
          identical output, use PNG format instead of JPEG.
        </p>
        <p className="mb-4">
          <strong>Format matters for file size</strong>
          <br />
          WebP and AVIF produce significantly smaller files than JPEG at
          equivalent quality levels - but older browsers may not support them.
          If you need universal compatibility, stick with JPEG.
        </p>
        <p className="mb-4">
          <strong>Transparent backgrounds require PNG or WebP</strong>
          <br />
          JPEG doesn't support transparency. If your image has a transparent
          background, choose PNG or WebP as the output format to preserve it.
        </p>
        <p className="mb-4">
          <strong>Browser performance depends on your hardware</strong>
          <br />
          Since processing happens locally, compressing 50 high-resolution
          images on an older laptop will take longer than on a newer machine.
          The tool won't crash - it just uses your available RAM and CPU.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">FAQs</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Will compressing images ruin the quality?
            </h3>
            <p>
              At 80-90% quality, most people can't spot the difference without
              pixel-peeping. The file size reduction is substantial - often
              50-70% smaller. If you need zero quality loss, use PNG format
              instead of JPEG.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Are my images uploaded to a server?
            </h3>
            <p>
              No. Everything happens in your browser using WebAssembly
              compression libraries. Your photos never leave your device, which
              means faster processing and complete privacy.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              How many images can I compress at once?
            </h3>
            <p>
              You can process up to 50 files in a single batch. The tool queues
              them and works through each one sequentially. When finished, you
              can download all of them as a ZIP file.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Which format gives the smallest file size?
            </h3>
            <p>
              AVIF typically produces the smallest files, followed by WebP, then
              JPEG. However, AVIF and WebP aren't supported in older browsers.
              For maximum compatibility with decent compression, JPEG at 85%
              quality is still the safe choice.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Can I resize images while compressing?
            </h3>
            <p>
              Yes. The advanced settings include width and height inputs.
              Reducing a 4000px-wide photo to 1920px before compressing will
              give you dramatically smaller files than compression alone.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Is there a file size limit?
            </h3>
            <p>
              There's no enforced limit since processing happens on your device.
              The only constraint is your browser's available memory - if you
              try to load a 100MB TIFF file on a laptop with 4GB RAM, your
              browser may struggle.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
