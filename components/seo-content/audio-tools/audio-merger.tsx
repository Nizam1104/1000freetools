export default function AudioMergerSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Merging Multiple Audio Files Into One</h2>
        <div className="prose prose-slate dark:prose-invert">
          <p>
            This audio merger combines multiple audio files into a single continuous track. Upload 
            two or more files, arrange them in order, and the tool concatenates them end-to-end. 
            Processing happens in your browser using Web Audio API.
          </p>
          <p>
            Files play sequentially: when the first ends, the second begins immediately. There are 
            no crossfades or gaps between segments—just clean concatenation.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Real-World Use Cases</h2>
        <ul className="space-y-3">
          <li>
            <strong>Podcasters</strong> who recorded an episode in multiple takes. They merge the 
            segments into one continuous episode.
          </li>
          <li>
            <strong>Audiobook creators</strong> who have individual chapters as separate files. They 
            merge them into a single file for easier playback.
          </li>
          <li>
            <strong>Musicians</strong> who have intro, main content, and outro as separate recordings. 
            They merge them into a complete track.
          </li>
          <li>
            <strong>Teachers</strong> who have multiple short lesson recordings they want to combine 
            into a full lecture. Merging creates one cohesive file.
          </li>
          <li>
            <strong>Mixtape creators</strong> compiling individual songs merge them for continuous 
            playback.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What to Know Before Using It</h2>
        <ul className="space-y-3">
          <li>
            Files merge in the order you arrange them. Use the up/down controls to get the sequence 
            right before merging.
          </li>
          <li>
            All files get converted to the same sample rate and channel count. Mismatched files will 
            be normalized to match.
          </li>
          <li>
            There are no crossfades between segments. If you need smooth transitions, edit them in 
            beforehand.
          </li>
          <li>
            The output format is WebM (Opus codec), not MP3. This is more efficient but might not be 
            compatible with all players.
          </li>
          <li>
            Very long merges (many files or very long files) might take time to process in your browser.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-semibold mb-2">How many files can I merge?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              There's no hard limit, but practical constraints apply. Merging 50+ files or files 
              totaling over 100MB might cause browser slowdowns.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Do files need to be the same format?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No—the tool accepts various audio formats and converts them during merging. However, 
              output is always WebM/Opus.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I overlap or crossfade files?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No—this tool concatenates files end-to-end. For crossfades or overlapping, use audio 
              editing software.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Will the merged file be huge?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Roughly the sum of the input files. Opus compression is efficient, so the output might 
              be smaller than the total input size.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I merge video files with audio?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No—this tool handles audio files only. For video merging, you need video editing software.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Is there a way to preview the merge?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No—files merge and then you download the result. For iterative editing with preview, 
              use a DAW or audio editor.
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
