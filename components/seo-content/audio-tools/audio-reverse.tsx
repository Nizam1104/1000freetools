export default function AudioReverseSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Reverse an audio file</h2>
        <div className="prose prose-slate dark:prose-invert">
          <p>
            This audio reverser flips your audio backwards, what was at the end becomes the beginning, 
            and every sample plays in reverse order. Upload any audio file and get a reversed version 
            instantly, processed entirely in your browser.
          </p>
          <p>
            The reversal is sample-accurate: the last sample becomes the first, the second-to-last 
            becomes the second, and so on. Both channels (for stereo files) are reversed together, 
            maintaining their relationship.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Who actually uses reversed audio</h2>
        <ul className="space-y-3">
          <li>
            Musicians who want to create a reverse reverb effect. They reverse a 
            vocal, add reverb, then reverse it back for that swelling pre-hit sound.
          </li>
          <li>
            Audio analysts examining recordings for hidden messages or Easter eggs. 
            Reversing reveals backwards content that might be intentional or coincidental.
          </li>
          <li>
            Producers creating transition effects by reversing cymbal crashes or 
            vocal snippets. Reversed audio has an otherworldly quality.
          </li>
          <li>
            Psychoacoustics students experimenting with how the brain processes 
            reversed speech. It sounds completely different despite identical frequencies.
          </li>
          <li>
            Experimental musicians using reversed samples as source material for 
            textures and atmospheres.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What to know before you use it</h2>
        <ul className="space-y-3">
          <li>
            Reversed audio sounds strange because our brains expect attacks before decays. Cymbals 
            swell instead of crash. Speech becomes unrecognizable.
          </li>
          <li>
            The reversal is exact, no samples are added or removed. Duration stays identical to the 
            original.
          </li>
          <li>
            This isn't a "reverse and restore" tool. Once you download the reversed file, it's just 
            a normal audio file playing backwards content.
          </li>
          <li>
            Stereo imaging is preserved. If the original had something panned left, it stays left in 
            the reversed version.
          </li>
          <li>
            Output is MP3 format. If you need lossless reversed audio, you'll need desktop software.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-semibold mb-2">Why would anyone reverse audio?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Creative effects (reverse reverb, transitions), analysis (finding backwards content), 
              or experimental music production.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Does reversing change pitch or speed?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No, pitch and duration stay exactly the same. Only the temporal order changes.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I reverse only part of a file?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No, this reverses the entire file. For partial reversal, trim first, reverse, then merge 
              back using audio editing software.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">What happens to stereo files?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Both channels reverse together, maintaining their stereo relationship. Left stays left, 
              right stays right.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Is reversed audio useful for anything practical?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Beyond creative uses, not really. It's mostly a novelty or production technique.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I undo the reversal?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Yes, reversing a reversed file gives you the original. The operation is perfectly 
              invertible.
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
