export default function AudioSpeedChangerSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Change audio playback speed</h2>
        <div className="prose prose-slate dark:prose-invert">
          <p>
            This speed changer adjusts audio playback rate from 0.25x (quarter speed) to 4x (quadruple speed). 
            You can choose whether to preserve the original pitch or let it shift naturally with the speed change.
          </p>
          <p>
            When pitch preservation is enabled, the tool uses time-stretching algorithms to maintain the 
            original key. Disable it, and you get the classic "chipmunk" or "demon voice" effect from speed 
            changes. Processing happens entirely in your browser.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Who uses this</h2>
        <ul className="space-y-3">
          <li>
            Language learners slowing down fast speech to catch pronunciation details. 
            They play a French dialogue at 0.75x to hear liaison and elision clearly.
          </li>
          <li>
            Musicians learning solos by ear. They slow a guitar riff to 0.5x without 
            changing pitch, then gradually increase speed as they master it.
          </li>
          <li>
            Podcast consumers catching up on backlogs. Playing at 1.5x or 2x saves time 
            while keeping voices natural.
          </li>
          <li>
            Producers creating time-stretched samples for tracks. They slow a vocal 
            chop to 0.5x without pitch correction for that deep, warped effect.
          </li>
          <li>
            Students reviewing lecture recordings. Speeding up to 1.25x gets through 
            material faster; slowing to 0.75x helps with dense technical content.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What to know before you use it</h2>
        <ul className="space-y-3">
          <li>
            Pitch preservation works well for moderate changes (0.75x to 1.5x). Extreme values introduce 
            artifacts such as warbly tones at slow speeds and metallic sounds at high speeds.
          </li>
          <li>
            The output duration changes proportionally. A 10-minute file at 2x becomes 5 minutes. At 0.5x, 
            it becomes 20 minutes.
          </li>
          <li>
            Your browser's audio processing handles the time-stretching. Complex material (full mixes, 
            dense arrangements) may show more artifacts than simple material (solo voice, single instrument).
          </li>
          <li>
            The tool outputs MP3 format. If you need the speed-adjusted audio in its original format, 
            you'll need to convert it afterward.
          </li>
          <li>
            Disabling pitch preservation gives you the classic speed/pitch relationship. This is actually 
            useful for creative effects, not just a limitation.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-semibold mb-2">What's the maximum speed increase?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              4x, which makes a 1-minute file play in 15 seconds. Beyond that, intelligibility drops 
              sharply even with pitch preservation.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Does preserving pitch affect quality?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Time-stretching algorithms introduce some artifacts. At moderate speeds you won't notice, 
              but extreme values (below 0.5x or above 2x) can sound processed.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I slow down audio without changing pitch?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Yes, enable the "Preserve Pitch" toggle. The algorithm maintains the original key while 
              extending duration.
          </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">What happens if I disable pitch preservation?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Speed and pitch change together. Slowing down lowers pitch (like a tape machine), speeding 
              up raises it. This is sometimes desirable for creative effects.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Is there a file size limit?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Your browser's memory is the constraint. Files over 50MB might process slowly or fail on 
              devices with limited RAM.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I adjust speed for only part of the audio?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No, this applies to the entire file. For sectional speed changes, you'd need a DAW or 
              dedicated audio editor.
          </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
