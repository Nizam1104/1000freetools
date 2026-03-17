export default function VideoFrameSequenceToVideoSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Creating Videos from Image Sequences</h2>
        <div className="prose prose-slate dark:prose-invert">
          <p>
            This tool converts a sequence of images into a video. Upload multiple images in order, 
            set the frame rate (1 to 60 fps), and the tool creates a video playing through your 
            images. Perfect for time-lapses, slideshows, or animation.
          </p>
          <p>
            Images are sorted alphabetically before processing. Name your files with sequential 
            numbers (frame001.jpg, frame002.jpg) to ensure correct ordering.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
        <ul className="space-y-3">
          <li>
            <strong>Time-lapse creators</strong> who shot a sunset every minute and want to play it 
            back at 30 fps.
          </li>
          <li>
            <strong>Animators</strong> who made frame-by-frame animation as individual images. They 
            compile it into a playable video.
          </li>
          <li>
            <strong>Content creators</strong> who make a slideshow from screenshots or product 
            photos for a presentation.
          </li>
          <li>
            <strong>GIF converters</strong> who convert a GIF animation into video format for 
            platforms that don't support GIFs.
          </li>
          <li>
            <strong>Researchers</strong> who create videos from scientific imaging sequences for 
            presentations or publications.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What to Know Before Using It</h2>
        <ul className="space-y-3">
          <li>
            Image order matters. Files are sorted alphabetically, so use consistent naming: img001, 
            img002, img003 (not img1, img2, img10).
          </li>
          <li>
            Frame rate determines video duration. 30 images at 30 fps = 1 second. 300 images at 30 
            fps = 10 seconds.
          </li>
          <li>
            All images should ideally be the same size. Different sizes will be scaled to match the 
            first image's dimensions.
          </li>
          <li>
            The output is WebM/VP9 format, which offers good compression. For MP4 output, you'd 
            need conversion software.
          </li>
          <li>
            Large numbers of images take time to process. 100+ images might take several minutes 
            depending on your device.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-semibold mb-2">How many images can I upload?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              There's no hard limit, but practical constraints apply. Hundreds of images will take 
              significant processing time.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">What format should images be?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              JPG and PNG work best. Other formats might work depending on browser support.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">How do I calculate video duration?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Duration = number of images ÷ frame rate. 60 images at 30 fps = 2 seconds. At 1 fps = 
              60 seconds.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">What if my images are different sizes?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              All images are scaled to match the first image's dimensions. For best results, use 
              consistently sized images.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I add audio to the video?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No—this tool creates video from images only. For adding audio, use video editing 
              software.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I adjust the order after uploading?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No—order is determined by alphabetical sorting. Rename files before uploading if you 
              need different ordering.
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
