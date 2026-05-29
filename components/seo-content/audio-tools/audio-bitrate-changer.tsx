export default function AudioBitrateChangerSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">What actually happens when you change a file's bitrate</h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          The tool re-encodes your audio at whatever bitrate you pick. Choose from 64, 96, 128, 192, 256, or 320 kbps. The output is always MP3, even if you fed it something else, because the encoder needs a target format and MP3 is the one every player understands.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Bitrate is how many bits get spent per second of audio. More bits means the encoder can keep more detail. Fewer bits means it throws more away. The tradeoff is file size. A 320 kbps MP3 of a 4-minute song runs about 9 MB. The same song at 128 kbps is about 3.5 MB. At 64 kbps, you're down to 1.8 MB but it starts sounding like a phone call from 2003.
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          This is lossy compression either way. You can't go lossless with this tool. If you need FLAC or WAV, you need a different converter.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The mistake people keep making</h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Converting a 128 kbps file to 320 kbps does not make it sound better. The detail that was thrown away during the original 128 kbps encode is gone. You're just wrapping the same limited audio in a bigger container. The file gets larger. The quality stays the same. If anything, re-encoding adds a second round of compression artifacts on top of the first.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          The only time going higher makes sense is when your source is lossless or the original bitrate is already high and you want to avoid additional degradation. For most people, 192 kbps is the sweet spot where the extra detail stops being audible unless you're sitting in a quiet room with decent headphones.
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          For spoken word (podcasts, lectures, audiobooks), 96 kbps is plenty. Speech only needs a fraction of the frequency range that music does. You're not going to notice the difference between 128 and 320 on a voice recording played through phone speakers.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When you'd actually use this</h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          You've got a bunch of lossless rips or high-bitrate downloads eating space on your phone. You know you're never going to listen critically, you just want background music on your commute. Dropping everything from 320 to 128 kbps clears gigabytes of space and you probably won't notice the difference on Bluetooth earbuds.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          You're uploading to a platform that rejects files above a certain bitrate. Some podcast hosts cap at 128 kbps. Some web audio players choke on 320. This gets your file under the limit without opening Audacity.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          You have variable-bitrate files that cause problems on older hardware. Some car stereos and budget MP3 players glitch on VBR. Converting to constant 128 or 192 fixes that.
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          You're making a website and need audio that loads fast. Background music at 64 kbps loads in under a second on most connections, versus 9 seconds for the same clip at 320.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Things the tool won't tell you</h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Every re-encode adds generation loss. If you take a 192 kbps MP3, convert it to 128, then later decide you want 320, you've stacked artifacts on artifacts. The file was already compressed once at 192, again at 128, and again at 320. Each pass degrades the audio a little more. Try to do your conversions in one shot from the best source you have.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Below 96 kbps, artifacts stop being subtle. You'll hear swishing on hi-hats, a muffled quality on vocals, and what sounds like underwater warbling on cymbals. If your music is dense or has lots of high-frequency content, 64 kbps can be genuinely unpleasant.
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          The tool uses constant bitrate (CBR) encoding, not variable. CBR is consistent and predictable, which is why it's the default. VBR can squeeze more quality out of the same average file size, but this tool doesn't do it. If you need VBR for some reason, look elsewhere.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">What bitrate for what purpose?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              64 kbps: background audio on websites, voice memos you need to archive. 96-128: podcasts, audiobooks, casual music listening. 192: the point where most people stop hearing the difference in blind tests. 256-320: archiving, DJ sets, anything you might edit or re-encode later. These aren't rules, just what tends to work in practice.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Why is my file still big after lowering the bitrate?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Check the duration. Bitrate × duration = file size. A 3-hour audiobook at 64 kbps is still going to be around 80 MB. The file isn't broken, it's just long.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Can I hear the difference between 256 and 320?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Probably not, unless you have trained ears, a quiet room, and good equipment. Most people fail ABX tests above 192. The difference exists on paper. In practice, it's academic for casual listening.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Is CBR better than VBR?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Better for compatibility. VBR is better for quality at the same average file size. This tool uses CBR. If your hardware or software struggles with VBR files, CBR will fix that.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Does this work on FLAC or WAV files?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Yes, the tool accepts various input formats. But converting lossless to MP3 through this tool means you're going lossy. If you started with FLAC, keep the FLAC as your master and only make MP3 copies when you need them.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What happens if I pick a bitrate higher than the original?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              You get a bigger file with the same audio quality. The extra bits aren't recovering lost detail, they're just storing the existing detail less efficiently. Don't do this unless you have a specific compatibility reason.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
