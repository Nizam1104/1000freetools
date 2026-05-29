export default function AudioChannelRemoverSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">The problem this solves</h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          You have a stereo file. One channel is wrecked. Maybe the left side has a constant buzz from a bad cable during recording. Maybe the right channel picked up someone coughing through the whole interview. Maybe you found a karaoke track where vocals are hard-panned to one side and you want them gone.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          This tool silences whichever channel you tell it to. The file stays stereo. The good side keeps playing. The bad side becomes digital silence. It's not converting to mono, it's not extracting anything. It just mutes one side while leaving the other completely intact.
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          I want to be clear about this because people confuse it with other tools: if you want a mono file from one channel, use the channel extractor. If you want both channels combined into one, use the mono converter. This does exactly one thing: silence left, or silence right.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">It works. Here's why that matters sometimes.</h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          A language teacher hands me a file where the instructor is on the left channel and the student responses are on the right. She wants to isolate the instructor so students can practice without hearing the responses. Mute the right channel. Done.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          A field recordist captured ambient sound with a stereo mic, but only the left side is usable because the right mic was too close to a generator. Silence the right channel. The left side plays clean with zero artifacts from the damaged channel bleeding through.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Someone digitized an old cassette tape where one side of the stereo image degraded faster than the other (it happens to tapes stored unevenly). The right channel is muffled and the left is fine. Kill the right and you still have the recording.
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          A podcaster recorded a two-person conversation with each mic going to a separate channel. They want to process each voice independently before mixing. Mute one side, export, mute the other, export. Two clean stems from one file, no extraction needed.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What it won't do (and when to walk away)</h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          It won't make your file smaller. A silent channel still takes up space in the MP3 container. The file size drop is negligible because the encoder spends almost nothing encoding silence, but the channel slot is still there.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          It won't remove vocals from a normal song. Most modern music has vocals centered, meaning they appear equally in both channels. Silencing one channel doesn't touch centered content. If the vocals aren't hard-panned to one side, this tool won't help.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          It won't truly extract a channel as a mono file. The silent channel is still part of the file structure. If you open it in an editor, you'll see waveform on one side and flatline on the other. For a clean single-channel file, use the splitter.
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          Output is MP3 regardless of input format. If you feed it FLAC or WAV, you're getting an MP3 back. The audio quality of the remaining channel stays the same, but the container changes.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">How is this different from extracting a channel?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Extraction creates a new mono file from one channel. Removal silences one channel but keeps the stereo structure. The output from removal still has two channels; one is just empty. If you need a mono file, use extraction.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Can I bring the silenced channel back later?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              No. Once you download the file, the silenced channel's audio is gone. If you might need that channel later, keep the original file. This is a destructive edit.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What if both channels are good but I only need one?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              This still works, but you might prefer the channel splitter, which gives you a clean mono file you can use anywhere. The remover is for when you specifically need a stereo file with one side muted.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Why does the file stay stereo after removing a channel?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Because that's what "removing" means here: the channel is silenced, not deleted. The file structure doesn't change. Only one channel's audio changes. This is by design so the remaining channel's stereo positioning is preserved.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Will this fix a recording where one person is too quiet?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Not if both people are on the same channel. This tool only works at the channel level. If one person is quiet because they were recorded quietly, you need a compressor or level adjustment, not channel removal.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
