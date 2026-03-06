import React from "react";

export function ImageFormatConverterSEO() {
  return (
    <>
      <section>
        <h2 className="text-2xl font-bold mb-4">What this tool does</h2>
        <p className="mb-4">
          This tool converts images between different file formats - JPG to
          PNG, WebP to JPEG, HEIC to JPG, and more. Upload up to 200 files,
          pick your target format, and download them all at once as a ZIP.
          Everything processes in your browser, no upload required.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">How it works</h2>
        <p className="mb-4">
          <strong>1. Upload your images</strong>
          <br />
          Drag files into the drop zone or select them from your device. The
          tool shows thumbnails of everything you've loaded.
        </p>
        <p className="mb-4">
          <strong>2. Choose the output format</strong>
          <br />
          Pick from the dropdown - JPG, PNG, WebP, AVIF, BMP, GIF, TIFF, or
          ICO. Available options depend on what you uploaded.
        </p>
        <p className="mb-4">
          <strong>3. Convert and download</strong>
          <br />
          Click "Convert All" to process the entire batch. Download individual
          files or grab everything as a single ZIP archive.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">When you'd use this</h2>
        <p className="mb-4">
          <strong>Opening iPhone HEIC photos on Windows</strong>
          <br />
          iPhones shoot in HEIC format by default, which Windows can't open
          natively. Converting them to JPG makes them compatible with any
          device or app.
        </p>
        <p className="mb-4">
          <strong>Creating favicons from PNG logos</strong>
          <br />
          Your designer gave you a PNG logo, but you need an ICO file for the
          browser tab icon. This converter handles that specific format change.
        </p>
        <p className="mb-4">
          <strong>Preserving transparency when converting</strong>
          <br />
          You have a PNG with transparent background but need smaller file
          sizes. Converting to WebP keeps the transparency while cutting the
          file size in half.
        </p>
        <p className="mb-4">
          <strong>Preparing images for platforms with format restrictions</strong>
          <br />
          Some websites only accept JPG uploads. Others reject anything over a
          certain file size. Convert to their required format before uploading.
        </p>
        <p className="mb-4">
          <strong>Batch converting old photo collections</strong>
          <br />
          Scanned family photos in BMP or TIFF format take up massive storage
          space. Converting the entire archive to JPEG frees up gigabytes.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">What to know before using it</h2>
        <p className="mb-4">
          <strong>Transparency doesn't survive JPG conversion</strong>
          <br />
          JPEG doesn't support transparent backgrounds. If you convert a
          transparent PNG to JPG, the transparent areas become white. Use PNG
          or WebP if you need to preserve transparency.
        </p>
        <p className="mb-4">
          <strong>Format affects file size</strong>
          <br />
          Converting an uncompressed BMP to WebP can reduce file size by 90%
          with no visible quality loss. But converting JPG to PNG often makes
          files larger, not smaller.
        </p>
        <p className="mb-4">
          <strong>Some formats support animation</strong>
          <br />
          GIF and WebP can be animated; JPG and PNG cannot. Converting an
          animated GIF to PNG will only save the first frame as a static image.
        </p>
        <p className="mb-4">
          <strong>Browser compatibility varies</strong>
          <br />
          AVIF and WebP offer better compression than JPEG, but older browsers
          (especially Internet Explorer) don't support them. For maximum
          compatibility, stick with JPG and PNG.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">FAQs</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Is this converter really free for bulk use?
            </h3>
            <p>
              Yes. You can convert up to 200 images in a single batch with no
              watermarks, no signup, and no daily limits. The only constraint
              is your browser's memory.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Are my images uploaded anywhere?
            </h3>
            <p>
              No. All conversions happen locally in your browser using
              WebAssembly codecs. Your files never leave your computer.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              What formats can I convert?
            </h3>
            <p>
              Input: JPG, PNG, WebP, BMP, GIF, AVIF, TIFF, ICO, SVG, HEIC.
              Output options depend on what you upload, but generally include
              JPG, PNG, WebP, AVIF, and more.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Will converting reduce quality?
            </h3>
            <p>
              Converting between lossy formats (like JPG to WebP) can introduce
              minor quality loss. Converting to lossless formats (like PNG)
              preserves quality but may increase file size.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              How do I download multiple converted files?
            </h3>
            <p>
              After conversion, click "Download All" to get a ZIP file
              containing everything. Or download individual files by clicking
              the download button on each thumbnail.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Can I convert a JPG to PNG and back to JPG?
            </h3>
            <p>
              Yes, but each conversion to a lossy format like JPG degrades
              quality slightly. It's better to keep a master copy in a lossless
              format and convert from that.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
