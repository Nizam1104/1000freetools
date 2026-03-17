export default function VideoFrameSequenceExporterSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Exporting Video Frames as Image Sequences</h2>
        <div className="prose prose-slate dark:prose-invert">
          <p>
            This frame sequence exporter extracts frames from your video at regular intervals. 
            Choose to export every frame, every 2nd frame, every 5th, up to every 30th frame. The 
            tool generates a series of JPEG images.
          </p>
          <p>
            Exporting every frame gives you the complete video as individual images. Exporting 
            every Nth frame creates a time-lapse-like sequence showing the video's progression.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Who Uses Frame Sequence Export</h2>
        <ul className="space-y-3">
          <li>
            <strong>Video editors</strong> who create contact sheets or storyboards by exporting 
            frames at intervals. They get a visual overview of the entire video.
          </li>
          <li>
            <strong>Time-lapse creators</strong> making a time-lapse from regular video who export 
            every 10th or 30th frame to compress time.
          </li>
          <li>
            <strong>Researchers</strong> analyzing video content who extract frames at regular 
            intervals for frame-by-frame study.
          </li>
          <li>
            <strong>Developers</strong> who generate thumbnail strips or preview sequences for 
            video libraries.
          </li>
          <li>
            <strong>Artists</strong> who use exported frames as reference for animation or as 
            source material for video art.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What to Know Before Using It</h2>
        <ul className="space-y-3">
          <li>
            Exporting every frame creates many files. A 30 fps, 1-minute video produces 1800 images.
          </li>
          <li>
            The interval determines how many frames you get. Every 10th frame from a 300-frame 
            video gives you 30 images.
          </li>
          <li>
            All frames are exported as 320px-wide JPEG thumbnails. This keeps file sizes manageable 
            but isn't suitable for full-resolution work.
          </li>
          <li>
            Frame numbering starts at 0. Frame 0 is the first frame of the video.
          </li>
          <li>
            The export processes sequentially. Long videos or small intervals (every frame) take 
            significant time.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-semibold mb-2">How many frames will I get?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Divide total frames by your interval. A 60-second video at 30 fps has ~1800 frames. 
              Exporting every 30th frame gives about 60 images.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">What size are the exported images?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              320 pixels wide, height scaled to maintain aspect ratio. Suitable for preview and 
              storyboarding.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I export at full resolution?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No—this tool creates thumbnail-sized images. For full-resolution frame extraction, use 
              the single frame extractor.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">What format are the images?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              JPEG format at 80% quality. This balances file size and image quality for preview 
              purposes.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I choose specific frames instead of intervals?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No—this exports at regular intervals. For specific frame selection, use the frame 
              extractor tool.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">How are the files named?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Files are named with their frame number (frame-0, frame-30, frame-60, etc.) for easy 
              identification and sorting.
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
