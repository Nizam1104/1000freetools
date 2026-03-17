export default function VideoFrameRateAnalyzerSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Analyzing Video Frame Rate (FPS)</h2>
        <div className="prose prose-slate dark:prose-invert">
          <p>
            This frame rate analyzer measures your video's actual frames per second, including 
            average FPS, minimum FPS, maximum FPS, and total frame count. All processing happens 
            in your browser—no upload required.
          </p>
          <p>
            The tool reads each frame's timestamp and calculates the instantaneous frame rate. This 
            reveals whether your video maintains a consistent frame rate or varies throughout.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Who Needs Frame Rate Analysis</h2>
        <ul className="space-y-3">
          <li>
            <strong>Video editors</strong> who receive footage with playback issues. They analyze 
            frame rate to diagnose whether variable frame rate is causing problems.
          </li>
          <li>
            <strong>Gameplay recorders</strong> who want to verify their capture software is 
            maintaining the target frame rate. Analysis confirms consistent performance.
          </li>
          <li>
            <strong>Content creators</strong> troubleshooting stuttering playback who check if 
            frame rate drops are the culprit.
          </li>
          <li>
            <strong>Developers</strong> testing video playback performance who measure frame rate 
            consistency across different videos.
          </li>
          <li>
            <strong>Specification verifiers</strong> who confirm the actual frame rate matches the 
            claimed rate.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What to Know Before Using It</h2>
        <ul className="space-y-3">
          <li>
            Average FPS is the overall frame rate. A "30 fps" video should average close to 30, but 
            might vary.
          </li>
          <li>
            Min and max FPS show the range of variation. Large gaps indicate variable frame rate, 
            which can cause playback issues.
          </li>
          <li>
            Total frames divided by duration equals average FPS. This is a useful sanity check for 
            the analysis.
          </li>
          <li>
            Some videos use variable frame rate (VFR) intentionally. Screen recordings and gameplay 
            captures often vary based on content complexity.
          </li>
          <li>
            This is a measurement tool, not a fix. To convert VFR to constant frame rate, use video 
            editing software.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-semibold mb-2">What's a good frame rate?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Depends on the content: 24 fps for cinematic video, 30 fps for TV/web content, 60 fps 
              for smooth motion (sports, gameplay).
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">What causes variable frame rate?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Recording software adjusting to content complexity, screen captures matching display 
              refresh, or encoding optimizations.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Is variable frame rate bad?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Not inherently, but VFR can cause issues with some editing software and players that 
              expect constant frame rate.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">What does min/max FPS tell me?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Minimum FPS shows the worst frame rate drops. Maximum shows peaks. Large variations 
              indicate inconsistent frame timing.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can this detect dropped frames?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Indirectly—lower-than-expected FPS suggests dropped frames during recording or playback.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">How accurate is the analysis?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Very accurate—it reads actual frame timestamps. The analysis reflects what's encoded 
              in the file, not playback performance.
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
