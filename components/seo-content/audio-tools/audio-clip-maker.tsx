export default function AudioClipMakerSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Grabbing a short piece of audio without opening a DAW</h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          You have a long file. You need 20 seconds from the middle. You don't want to install Audacity just for that.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Pick a start time with the slider. Set how many seconds you want (5 to 300). Download the chunk as an MP3. That's it. The tool reads your file's total duration so you can see where you are in the timeline. The slider gives you 1-second precision for positioning.
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          The clip limit is 300 seconds (5 minutes). Any longer and you should use a trimmer instead. The tool won't let you set a start time plus duration that exceeds the file length, so you won't accidentally export silence.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When the clip maker is the right tool</h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Making ringtones is the obvious one. You have a song, you know the hook starts at 1:12, you want 30 seconds. Set start to 72 seconds, duration to 30, download. Most phones accept MP3 ringtones without conversion.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Social media promo clips for podcasts. You recorded a 90-minute episode. Someone said something funny at the 34-minute mark. Pull a 45-second clip and post it. Faster than scrubbing through an editor timeline.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Teachers putting together study materials. A 2-hour lecture has five key concepts at different timestamps. Make five 2-minute clips instead of one giant file. Students can replay just the part they're stuck on.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Sampling for music production. A guitar riff from a live recording, a drum break from an old track, a vocal phrase you want to chop and pitch. Extract the moment without loading the full file into your sampler.
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          Presentation audio snippets. You're building a slide deck and need a 15-second quote from an interview. Pull the clip. Embed it. Don't make the audience wait through the full recording.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the slider falls short</h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          One-second precision is fine for ringtones and social clips. It's not fine for music production where you need sample-accurate cuts. If you're chopping a drum loop that needs to loop seamlessly, the slider won't cut it. You'll be off by a fraction of a second and the loop won't close right. That's DAW territory.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          The output is always MP3, re-encoded from whatever you put in. If your source is lossless and you want a lossless clip, this adds an unnecessary compression step. The quality is fine for most uses but the file won't be identical to the source section.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Very short clips (under 1 second) can break in some players. MP3 has a minimum frame size and some decoders don't handle sub-second files well. If you need a sub-second burst of audio, export to WAV instead.
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          You can't preview the clip before downloading. It's a blind cut. You set the time, click, download, listen, and if you missed the mark, you adjust and try again. For preview-based clipping, use an editor.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Why 300 seconds max?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              That's the boundary between "clip" and "trim." If you need more than 5 minutes, you're not making a clip, you're trimming a file. The trimmer tool handles that without the duration cap. Different tools for different jobs.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Can I grab clips from multiple parts of the same file?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Not in one action. Download your first clip, change the start time, download the second. Repeat as needed. There's no batch mode or queue for clips from the same file.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What happens if my clip goes past the end of the file?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              The tool adjusts automatically. If your file is 120 seconds and you set start to 110 with duration 30, it caps the duration at 10 seconds. You won't export silence at the end.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Is the clip quality the same as the original?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Close, but not identical. The tool re-encodes to MP3, so there's a small quality loss from the encode step. If your source is already MP3, you're stacking compression. For archival work, keep the original.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Can I use this to make notification sounds?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Yes, but keep the clip above 1 second. Some notification systems and phones expect tiny files to be in specific formats (like M4R for iPhone ringtones). MP3 works on Android and most desktop setups.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
