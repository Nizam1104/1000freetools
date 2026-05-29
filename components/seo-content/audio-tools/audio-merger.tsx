export default function AudioMergerSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Stitching audio files together, end to end</h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Upload two or more files. Drag them into the order you want. Click merge. You get one continuous track where each file plays immediately after the one before it. No gaps, no crossfades, just clean concatenation.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          This all runs in your browser using the Web Audio API. Files get decoded, lined up in sequence, and written out as a single WebM file with Opus encoding. Nothing uploaded anywhere. The tradeoff is speed. Very long merges (many files or files totaling more than 100 MB) can make the browser sluggish because all that audio needs to sit in memory at once.
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          Mismatched files get normalized automatically. If you mix a 44.1 kHz WAV with a 48 kHz MP3, the tool resamples everything to a common sample rate and channel count. You won't get speed changes or pitch warping from sample rate conflicts.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Why you'd merge instead of editing</h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          A podcaster recorded their episode in three takes because the phone rang twice. Instead of loading all three into an editor and arranging them on a timeline, they drag the files into the merger, put them in order, and get one continuous episode. The joins are hard cuts, but for spoken word that's usually fine. Listeners don't notice a clean splice between sentences.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          An audiobook narrator delivers chapters as separate files for the proofreader. After approval, they need to submit the full book. Merging 30 chapters into one 11-hour file in a DAW is a chore. The merger handles it in one action.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          A musician recorded an intro, verses, choruses, and outro as separate takes. They want to hear how the whole thing flows before committing to a full mix. Merge the parts, listen, iterate. Way faster than importing everything into a project file.
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          Someone has a folder of voice memos from a day of field recording. Each is a 30-second clip of a different location. They merge them chronologically into one file to send to a collaborator instead of sharing 15 separate files.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What the merger can't do</h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Crossfades. If you want file A to fade out while file B fades in, you need an editor. The merger butts files against each other. For music, this means an abrupt transition. For speech or sound effects, that's usually fine.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Volume normalization between files. If one recording is significantly louder than the others, the merged file will have an obvious jump in volume. Normalize your files before merging if consistent levels matter.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Video handling. If you drop a video file, it might extract the audio depending on browser support, but you're not getting a merged video. For audio-plus-video merging, you need a video editor.
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          The output is WebM/Opus, which some older players don't support. If you need MP3 for broad compatibility, run the merged file through a converter. It's an extra step, but Opus is genuinely better for concatenated content because it handles encoding boundaries cleanly.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">How many files can I merge at once?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              No hard limit, but your browser has one. After about 50 files or 100 MB total, things get slow. If you're merging a season of podcast episodes, do it in batches of 10 or 20.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What happens to files with different sample rates?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              They get resampled to a common rate automatically. A 44.1 kHz file next to a 48 kHz file won't cause pitch or speed changes. The tool handles the conversion internally.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Can I rearrange files after merging?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              No. The merge is a new file. If you need a different order, re-merge with the files rearranged. Keep your originals until you're sure the order is right.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Why not just use the WebM as-is?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              You can. Most modern browsers, media players, and podcast apps support WebM/Opus without issues. If you're uploading to a platform that demands MP3, convert afterward. But test your target platform first. Many accept Opus now.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Is there a gap between merged files?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              No. The tool places samples directly adjacent. No silence gets inserted. If your original files have silence at the end, that silence stays. Trim them first if you want tighter joins.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
