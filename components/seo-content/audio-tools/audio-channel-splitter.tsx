export default function AudioChannelSplitterSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Splitting Stereo Audio into Separate Channel Files</h2>
        <div className="prose prose-slate dark:prose-invert">
          <p>
            This channel splitter extracts each channel from a stereo audio file into separate mono 
            files. Upload a stereo file, and the tool creates individual files for left, right, 
            center, LFE, and surround channels (up to 6 channels total).
          </p>
          <p>
            Each channel becomes its own mono WebM file. This is useful for isolating specific 
            channel content, analyzing channel differences, or preparing stems for remixing.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
        <ul className="space-y-3">
          <li>
            <strong>Musicians</strong> who have a stereo mix and want to isolate instruments panned 
            to one side. They extract channels to access specific elements.
          </li>
          <li>
            <strong>Recording handlers</strong> who have a recording where one channel has noise or 
            issues. They extract the clean channel for use.
          </li>
          <li>
            <strong>Audio engineers</strong> who analyze channel content to check stereo imaging or 
            phase relationships.
          </li>
          <li>
            <strong>Remixers</strong> who extract individual channels as starting points for a remix 
            project.
          </li>
          <li>
            <strong>Surround sound handlers</strong> who have a multi-channel surround file and need 
            to isolate specific channels for a project.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What to Know Before Using It</h2>
        <ul className="space-y-3">
          <li>
            The output is WebM/Opus format for each channel. If you need MP3 or other formats, 
            convert after extraction.
          </li>
          <li>
            Standard stereo files have 2 channels (left and right). Multi-channel files (5.1 surround) 
            have 6 channels.
          </li>
          <li>
            Extracting channels doesn't isolate individual instruments perfectly. Instruments panned 
            center appear in both left and right channels.
          </li>
          <li>
            The tool processes up to 6 channels. Files with more channels (7.1, Atmos) will only 
            extract the first 6.
          </li>
          <li>
            Each channel file is mono. For stereo playback, you'd need to merge channels or use a 
            player that handles mono files.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-semibold mb-2">What channels will I get from a stereo file?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Left and right channels as separate mono files. Each contains only what was in that 
              channel of the original stereo file.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I extract center or surround from stereo?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No—stereo files only have left and right channels. Center and surround channels exist 
              only in multi-channel (5.1, 7.1) files.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">What format are the output files?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              WebM/Opus format. For MP3 or other formats, use the audio format converter after 
              extraction.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Will instruments be isolated?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Not perfectly. Instruments panned hard left or right will be isolated. Center-panned 
              instruments (vocals, bass, kick) appear in both channels.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I extract just one channel?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              The tool extracts all channels. You can download only the ones you need and ignore 
              the rest.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">How do I use the extracted channels?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Import them into audio editing software, use them for analysis, or process them 
              individually before recombining.
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
