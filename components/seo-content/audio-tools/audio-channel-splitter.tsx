export default function AudioChannelSplitterSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Getting individual channels out of a stereo or surround file</h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Drop a stereo file and you get two downloads: left and right, each as a separate mono WebM file. If your file has more channels (up to 5.1 surround), you get up to six: left, right, center, LFE, left surround, right surround.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          This is different from the channel remover. The remover silences a channel but keeps the stereo wrapper. This tool tears the channels apart and hands you each one as its own file. No wrapper, no silent side. Just the raw signal from that channel.
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          The output is WebM with Opus encoding. Not MP3. Opus is more efficient at low bitrates and handles mono particularly well. If you need MP3, run the result through another converter.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What you can actually do with split channels</h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          A recording engineer has a stereo drum overhead recording where the hi-hat bleeds more into the left channel. By splitting and inspecting each channel separately in a DAW, they can see the imbalance and decide whether to EQ only the left side or re-record. The split gives them isolated control without affecting the whole mix.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Someone digitizing old vinyl finds a pressing where the surface noise is worse on the right channel (maybe the stylus wore unevenly). They split the stereo rip, clean up the right channel with noise reduction, and recombine. Much better than applying the same noise reduction to both sides and dulling the clean left channel.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          A music student analyzing a recording wants to hear what the guitar is doing in the right channel without the bass and drums from the left bleeding through. Splitting lets them solo that channel and study the performance.
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          Someone with a 5.1 surround file needs just the dialog, which usually lives in the center channel. Split, grab center, done. The other five channels get discarded.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Limits and gotchas</h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Splitting channels does not isolate instruments. If the guitar is panned center, it's in both left and right channels. If the vocal is slightly right of center, it's in both but louder on the right. Channel splitting gives you spatial separation, not stem separation. Different thing.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          The tool handles up to 6 channels. If you have a 7.1 or Atmos file, channels 7 and beyond get ignored. There's no warning, it just slices what it can reach.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Each output is mono. This trips people up: they split a stereo file, play the left channel, and hear audio from one speaker only. That's correct. Mono means one channel. To hear it on both speakers, you'd merge it to stereo using the mono-to-stereo converter, or just play it in software that routes mono to both outputs (most modern players do this).
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          The tool gives you all channels at once. You can't extract just one. Download the ones you want and ignore the rest.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">What will I actually get from a normal stereo file?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Two mono WebM files: one labeled left, one labeled right. If your stereo file has instruments panned center (like most vocals and bass), those will appear in both output files. If something is hard-panned to one side, it appears only in that channel's file.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Why WebM and not MP3?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              The tool uses the browser's built-in audio processing, and WebM/Opus is what the MediaRecorder API outputs. Opus handles mono well and the file sizes are small. If MP3 is non-negotiable, split first, then convert.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Can I split and then recombine later?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Yes. Split the file, do your edits on individual channels, then use an audio editor (or a merge tool that handles channel mapping) to rebuild the stereo or surround file. Just make sure your editing software preserves the channel assignments.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What happens with mono source files?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              You get one output. Mono files have one channel, so there's nothing to split. The tool won't create phantom channels.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Does this work on files from video?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Only if you extract the audio from the video first. The splitter takes audio files, not video containers. Combine this with the audio track extractor if your source is a video.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
