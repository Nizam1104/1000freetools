import React from "react";

export function ImageToolsIndexSEO() {
  return (
    <>
      <section className="container mx-auto px-4 py-12">
        <div className="prose max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">
            What these image tools do
          </h2>
          <p className="text-muted-foreground mb-6">
            This collection handles everyday image tasks directly in your
            browser. Compress photos to shrink file sizes, remove backgrounds
            automatically, crop and resize images, convert between formats like
            JPG and PNG, extract color codes, add watermarks, apply filters,
            create GIFs, sharpen blurry photos, or blur sensitive areas.
            Everything processes locally - your images never leave your device.
          </p>

          <h2 className="text-2xl font-semibold mb-4">How to use these tools</h2>
          <p className="text-muted-foreground mb-6">
            Each tool works the same way: drag your image into the workspace,
            adjust the settings you need, and download the result. No signup
            required, no watermarks added, no upload limits beyond what your
            browser can handle. Since processing happens on your device,
            results appear instantly without waiting for server uploads.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            When you'd use these tools
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Preparing website images</strong>
            <br />
            Compress hero photos to speed up page loads, convert to WebP for
            modern browsers, crop to fit your layout, and add your logo as a
            watermark.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Creating social media content</strong>
            <br />
            Resize photos to platform-specific dimensions, apply consistent
            filters across your feed, extract brand colors from logos, and
            create animated GIFs from product sequences.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Protecting your work</strong>
            <br />
            Add watermarks to photos before sharing online, blur out sensitive
            info in screenshots, and remove backgrounds to create professional
            product listings.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Fixing photo problems</strong>
            <br />
            Sharpen slightly blurry shots, crop out distracting backgrounds,
            adjust dimensions for print requirements, and convert iPhone HEIC
            files to JPG for Windows compatibility.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            What to know before using these tools
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>All processing is local</strong>
            <br />
            Your images are loaded into your browser's memory and never
            uploaded to any server. This means faster processing, complete
            privacy, and the ability to work offline after the page loads.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Browser performance varies</strong>
            <br />
            Since everything runs on your device, newer computers with more RAM
            will process images faster. Large batch operations (like compressing
            50 photos) work fine but may take longer on older hardware.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Keep your originals</strong>
            <br />
            Most of these tools create new files rather than editing in place.
            Still, it's good practice to keep original files saved separately
            in case you need to re-edit later.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 mb-12">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="prose max-w-4xl mx-auto space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Are all these tools really free?
            </h3>
            <p className="text-muted-foreground">
              Yes. No signup required, no watermarks on downloads, no daily
              limits, no premium tiers. Everything is free to use as often as
              you need.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Do you store my images on a server?
            </h3>
            <p className="text-muted-foreground">
              No. All image processing happens locally in your browser using
              WebAssembly and JavaScript. Your files never leave your device,
              which means faster processing and guaranteed privacy.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              What image formats do you support?
            </h3>
            <p className="text-muted-foreground">
              Most tools support JPG, PNG, and WebP. Some also handle GIF,
              BMP, AVIF, TIFF, ICO, and HEIC. Check each individual tool for
              specific format support.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Can I process multiple images at once?
            </h3>
            <p className="text-muted-foreground">
              Some tools support batch processing (like the image compressor
              which handles up to 50 files). Others work on one image at a time
              for precise control. Check each tool's description for details.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Do these tools work offline?
            </h3>
            <p className="text-muted-foreground">
              Once the page loads, most tools work without an internet
              connection since all processing is local. You need internet only
              to initially load the tool.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
