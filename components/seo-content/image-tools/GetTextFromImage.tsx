import React from "react";

export function GetTextFromImageSEO() {
  return (
    <>
      <section>
        <h2 className="text-2xl font-bold mb-4">What this tool does</h2>
        <p className="mb-4">
          This tool extracts text from images using OCR (optical character
          recognition). Upload a screenshot, photo, or scanned document, then
          drag to select the text area or process the entire image. The
          extracted text appears in an editable field where you can copy,
          review, or make corrections. Everything runs locally in your browser
          using Tesseract.js - no server uploads required.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">How it works</h2>
        <p className="mb-4">
          <strong>1. Upload your image</strong>
          <br />
          Drag and drop a file, click to browse, or paste directly from
          clipboard (Ctrl+V / ⌘V). The tool accepts PNG, JPG, WEBP, GIF, and
          BMP files up to 20 MB.
        </p>
        <p className="mb-4">
          <strong>2. Select the text region (optional)</strong>
          <br />
          Drag a rectangle over the specific area containing text. This speeds
          up processing and improves accuracy by focusing only on relevant
          content. Skip this step to OCR the entire image.
        </p>
        <p className="mb-4">
          <strong>3. Extract and copy</strong>
          <br />
          Click "Extract Text" and watch the progress bar as Tesseract.js
          analyzes the image. The recognized text appears in an editable
          textarea where you can copy it or make corrections before using it.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">When you'd use this</h2>
        <p className="mb-4">
          <strong>Converting screenshot text to editable content</strong>
          <br />
          Someone sent you a meme, error message, or chat screenshot with
          information you need to reference or quote. Instead of retyping
          everything, extract the text in seconds.
        </p>
        <p className="mb-4">
          <strong>Pulling quotes from scanned documents</strong>
          <br />
          Researching with PDFs or scanned books? Extract specific paragraphs
          or citations without manual transcription. Select just the relevant
          section to avoid processing entire pages.
        </p>
        <p className="mb-4">
          <strong>Grabbing code from tutorial images</strong>
          <br />
          Development tutorials often show code as images rather than
          copyable text. Extract the code snippets directly, then paste into
          your editor and adjust formatting as needed.
        </p>
        <p className="mb-4">
          <strong>Digitizing business cards and receipts</strong>
          <br />
          Snap a photo of a business card or expense receipt, then extract
          the contact details or line items into a spreadsheet or CRM system.
        </p>
        <p className="mb-4">
          <strong>Recovering text from protected content</strong>
          <br />
          Some websites or apps display text as images to prevent copying.
          This tool lets you recover that text for legitimate uses like
          accessibility or personal notes.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">What to know before using it</h2>
        <p className="mb-4">
          <strong>Image quality affects accuracy</strong>
          <br />
          Clear, high-contrast images with standard fonts produce the best
          results. Blurry photos, unusual typefaces, or low-resolution
          screenshots may have recognition errors that need manual correction.
        </p>
        <p className="mb-4">
          <strong>Handwriting recognition is limited</strong>
          <br />
          This tool is optimized for printed text. Handwritten notes,
          cursive, or stylized lettering may not be recognized accurately.
        </p>
        <p className="mb-4">
          <strong>Complex layouts can confuse OCR</strong>
          <br />
          Tables, multi-column text, or mixed graphics may produce jumbled
          output. Use the selection tool to isolate individual sections for
          cleaner results.
        </p>
        <p className="mb-4">
          <strong>Processing happens in your browser</strong>
          <br />
          Tesseract.js runs entirely client-side, which means privacy but
          also means larger images take longer on slower devices. The
          progress bar shows recognition status in real-time.
        </p>
        <p className="mb-4">
          <strong>Non-English text requires additional setup</strong>
          <br />
          This tool is configured for English text only. Other languages
          would need different Tesseract language packs to be loaded.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">FAQs</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              How accurate is the text extraction?
            </h3>
            <p>
              For clear, printed text in standard fonts, accuracy is typically
              90-95%. Handwritten text, decorative fonts, or poor image quality
              will reduce accuracy. Always review the output before using it
              for important work.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Are my images uploaded to a server?
            </h3>
            <p>
              No. The OCR processing runs entirely in your browser using
              Tesseract.js. Your images never leave your computer, which
              makes this safe for sensitive documents.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Can I extract text from a PDF?
            </h3>
            <p>
              Only if the PDF contains scanned images rather than selectable
              text. For image-based PDFs, take a screenshot first, then upload
              the screenshot to this tool.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Why should I select a region instead of processing the whole image?
            </h3>
            <p>
              Selecting a specific area speeds up processing and improves
              accuracy by eliminating irrelevant content. It's especially
              useful for documents with mixed text and graphics.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Does this work on mobile devices?
            </h3>
            <p>
              Yes, the tool works on any modern browser including mobile.
              However, processing speed depends on your device's CPU - newer
              phones handle OCR faster than older models.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              What file formats are supported?
            </h3>
            <p>
              PNG, JPG, WEBP, GIF, and BMP files all work. PNG generally
              produces the best results due to lossless compression. Maximum
              file size is 20 MB.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Can I edit the extracted text?
            </h3>
            <p>
              Yes, the output appears in an editable textarea where you can
              fix any recognition errors, reformat paragraphs, or make
              corrections before copying.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
