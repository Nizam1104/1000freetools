export default function VideoKeyframeExtractorSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Extracting Keyframes from Videos</h2>
        <div className="prose prose-slate dark:prose-invert">
          <p>
            This keyframe extractor identifies and saves all keyframes (I-frames) from your video 
            as individual JPEG images. Keyframes are the complete frames that other frames 
            reference—they're natural chapter points in the video.
          </p>
          <p>
            Unlike regular frame extraction, this only pulls frames that are actually encoded as 
            complete images. Keyframes typically appear every few seconds and mark scene changes 
            or important transitions.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Who Uses Keyframe Extraction</h2>
        <ul className="space-y-3">
          <li>
            <strong>Video editors</strong> who quickly scan a long video's content by reviewing 
            keyframes. They get a visual overview without watching the entire footage.
          </li>
          <li>
            <strong>Content indexers</strong> creating a video index or chapter list who use 
            keyframes as visual markers for different sections.
          </li>
          <li>
            <strong>Content auditors</strong> who review keyframes to understand video content 
            without full playback.
          </li>
          <li>
            <strong>Developers</strong> who generate visual timelines or scrubber previews showing 
            key moments in a video.
          </li>
          <li>
            <strong>Researchers</strong> analyzing video structure who use keyframes to identify 
            scene changes and content patterns.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What to Know Before Using It</h2>
        <ul className="space-y-3">
          <li>
            Keyframes aren't evenly spaced. They appear at scene changes and at regular intervals 
            (often every 2-10 seconds depending on encoding).
          </li>
          <li>
            Not all videos have the same keyframe density. Highly compressed videos might have fewer 
            keyframes; high-quality videos might have more.
          </li>
          <li>
            The extracted images are thumbnails (320px wide) for manageable file sizes. They're 
            meant for preview, not full-resolution analysis.
          </li>
          <li>
            Keyframe extraction is faster than extracting every frame because there are fewer frames 
            to process.
          </li>
          <li>
            The number of keyframes depends on the video's encoding, not just its length. Two 
            10-minute videos might have very different keyframe counts.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-semibold mb-2">What's a keyframe?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              A keyframe (I-frame) is a complete video frame that doesn't reference other frames. 
              Other frames (P-frames, B-frames) only store changes from keyframes.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Why extract keyframes instead of regular frames?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Keyframes are natural chapter points—they often mark scene changes. They're also 
              faster to extract since they're already complete images.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">How many keyframes will I get?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Depends on the video's encoding. A typical video might have a keyframe every 2-10 
              seconds, so a 10-minute video could have 60-300 keyframes.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I use keyframes for video quality analysis?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Yes—keyframes show the actual encoded quality without inter-frame compression artifacts.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">What format are the extracted images?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              JPEG format at 80% quality, 320 pixels wide. Suitable for preview and indexing purposes.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I get full-resolution keyframes?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No—this tool creates thumbnail-sized images. For full-resolution frame extraction, use 
              the frame extractor tool.
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
