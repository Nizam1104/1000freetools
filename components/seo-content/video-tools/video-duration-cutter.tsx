export default function VideoDurationCutterSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Cutting Video Duration by Time Range</h2>
        <div className="prose prose-slate dark:prose-invert">
          <p>
            This video duration cutter extracts a segment from your video by specifying start and 
            end times. Use the sliders or enter exact timestamps to define the portion you want to 
            keep. The tool processes everything in your browser.
          </p>
          <p>
            The interface shows your video's total duration and lets you set both start and end 
            points independently. The cut portion is extracted and re-encoded as a new MP4 file.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Real-World Applications</h2>
        <ul className="space-y-3">
          <li>
            <strong>Meeting recorders</strong> who recorded a long meeting but only need the 
            presentation portion. They cut out the before and after discussion.
          </li>
          <li>
            <strong>Content creators</strong> who have a 2-hour recording they want to split into 
            multiple shorter videos. They cut it into segments.
          </li>
          <li>
            <strong>TV recorders</strong> removing commercials from recorded TV who cut out the ad 
            breaks, keeping only the show content.
          </li>
          <li>
            <strong>Teachers</strong> who have a full lecture recording but want to share just one 
            topic. They extract the relevant segment.
          </li>
          <li>
            <strong>Highlight reel creators</strong> who cut the best moments from a longer video 
            before compiling them.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What to Know Before Using It</h2>
        <ul className="space-y-3">
          <li>
            Timestamps are in seconds, with 0.1-second precision. For frame-accurate cuts, you'd 
            need professional editing software.
          </li>
          <li>
            The cut portion is re-encoded, which takes time proportional to the output length, not 
            the original length.
          </li>
          <li>
            Very short cuts (under 1 second) might not encode properly due to video codec 
            requirements for minimum frame counts.
          </li>
          <li>
            The output is MP4/H.264 format. If your source is a different format, it gets converted 
            during processing.
          </li>
          <li>
            This tool makes one cut at a time. For multiple segments, you'd need to process the 
            file repeatedly or use editing software.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-semibold mb-2">How precise are the cuts?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Approximately 0.1 seconds (100 milliseconds). For frame-accurate cuts, use video 
              editing software.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I cut multiple segments?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Not in one operation. Download the first cut, then upload the original again for the 
              next segment.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Does cutting reduce quality?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              The cut portion is re-encoded, which introduces minor quality loss. At reasonable 
              bitrates, the difference is minimal.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">What happens to audio?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Audio is cut along with video and re-encoded together. The audio stays synchronized 
              with the video.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I preview the cut before processing?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No—this is a process-and-download tool. For preview, use video editing software with 
              timeline scrubbing.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Will the cut be seamless?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              The cut is clean, but re-encoding might introduce slight quality variations at the cut 
              points compared to the original.
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
