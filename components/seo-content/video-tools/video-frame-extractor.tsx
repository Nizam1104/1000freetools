export default function VideoFrameExtractorSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Extracting Specific Frames from Videos</h2>
        <div className="prose prose-slate dark:prose-invert">
          <p>
            This frame extractor pulls individual frames or frame ranges from your video as JPEG 
            images. Choose between extracting a single frame by number or a range of frames. The 
            tool processes everything in your browser.
          </p>
          <p>
            Frames are numbered sequentially from 1 to the total frame count (duration × frame rate). 
            At 30 fps, a 10-second video has approximately 300 frames.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
        <ul className="space-y-3">
          <li>
            <strong>Video editors</strong> who need specific frames for a storyboard or pitch deck. 
            They extract frames at key story points.
          </li>
          <li>
            <strong>Tutorial creators</strong> who capture exact frames to annotate with arrows and 
            callouts.
          </li>
          <li>
            <strong>Forensic analysts</strong> who extract frames from surveillance footage for 
            detailed examination.
          </li>
          <li>
            <strong>Meme creators</strong> who make meme images or GIFs by extracting specific funny 
            moments.
          </li>
          <li>
            <strong>Researchers</strong> studying video content who extract frames for analysis or 
            documentation.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What to Know Before Using It</h2>
        <ul className="space-y-3">
          <li>
            Frame count is estimated based on duration and assumed 30 fps. Actual frame count might 
            vary if the video uses variable frame rate.
          </li>
          <li>
            Single frame mode extracts one specific frame. Range mode extracts all frames from start 
            to end number.
          </li>
          <li>
            Extracting many frames creates many downloads. A 100-frame range generates 100 separate 
            JPEG files.
          </li>
          <li>
            Frame extraction quality is limited by the video's resolution. You can't get more detail 
            than the source contains.
          </li>
          <li>
            The tool extracts frames as JPEG images. For lossless frame extraction, you'd need 
            professional video software.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-semibold mb-2">How do I know which frame number I want?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Divide the timestamp (in seconds) by the frame rate. At 30 fps, 5 seconds into the 
              video is approximately frame 150.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">What's the difference between single frame and range?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Single frame extracts one specific frame. Range extracts all frames from start to end 
              number (useful for sequences).
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">How many frames can I extract at once?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              There's no hard limit, but extracting hundreds of frames will take time and create 
              many files. For large extractions, consider dedicated software.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">What format are the extracted frames?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              JPEG format at approximately 90% quality. This balances file size and image quality.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I extract frames at specific timestamps?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Not directly—you specify frame numbers. Convert timestamp to frame number using the 
              frame rate.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Will this work with variable frame rate videos?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              The extraction works, but frame numbers might not correspond exactly to expected 
              timestamps due to VFR.
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
