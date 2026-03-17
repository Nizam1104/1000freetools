export default function AudioSilenceRemoverSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Removing Silence from Audio Recordings</h2>
        <div className="prose prose-slate dark:prose-invert">
          <p>
            This silence remover automatically detects and cuts out quiet sections from your audio. 
            Set a threshold (how quiet is "silent") from -60 dB to -20 dB, and a minimum duration 
            (how long silence must last to be removed) from 0.1 to 3 seconds.
          </p>
          <p>
            The tool analyzes your audio's amplitude, identifies sections below your threshold that 
            last longer than your minimum duration, and removes them while keeping the audible content. 
            Processing happens in your browser using Web Audio API.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Who Needs Silence Removal</h2>
        <ul className="space-y-3">
          <li>
            <strong>Podcasters</strong> who have recordings with long pauses between sentences. They 
            remove dead air to create tighter, more engaging episodes.
          </li>
          <li>
            <strong>Lecture recorders</strong> who captured content with awkward gaps. They trim the 
            silence to reduce total runtime without losing content.
          </li>
          <li>
            <strong>Voice actors</strong> who need to deliver clean audio files without breathing room 
            between takes. Silence removal automates the cleanup.
          </li>
          <li>
            <strong>Audiobook creators</strong> who want consistent pacing. Removing silence between 
            paragraphs creates a more professional flow.
          </li>
          <li>
            <strong>Content creators</strong> who have rambling recordings with lots of pauses. 
            Silence removal tightens up the delivery.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What to Know Before Using It</h2>
        <ul className="space-y-3">
          <li>
            The threshold determines what counts as silence. -40 dB (default) works for most recordings. 
            Lower values (-60 dB) are more aggressive; higher values (-20 dB) are more conservative.
          </li>
          <li>
            Minimum duration prevents cutting brief pauses that are part of natural speech. Setting it 
            too low (0.1s) might create choppy audio.
          </li>
          <li>
            This isn't smart editing—it removes anything below the threshold, including quiet background 
            noise you might want to keep.
          </li>
          <li>
            The tool can create abrupt transitions. Natural recordings have some room tone; removing 
            all silence can sound jarring.
          </li>
          <li>
            Output is MP3 format. If you need lossless output, use a proper audio editor instead.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-semibold mb-2">What threshold should I use?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Start with -40 dB (default). For noisy recordings, try -35 dB. For very clean recordings, 
              -50 dB might work.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">How do I choose minimum silence duration?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              For tight pacing, 0.3-0.5 seconds. For natural speech, 0.5-1 second. For lectures or 
              interviews, 1-2 seconds.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Will this remove background noise?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Only noise below your threshold. If your "silence" has room tone or HVAC noise above 
              the threshold, it won't be removed.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can this remove "um" and "uh" sounds?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No—those are audible. This only removes sections below the threshold. You'd need manual 
              editing for filler words.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Does silence removal change the audio quality?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              The cutting itself doesn't affect quality. However, output is encoded to MP3, which 
              introduces standard compression artifacts.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I preview before downloading?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No—this is a process-and-download tool. For iterative editing with preview, use Audacity 
              or similar software.
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
