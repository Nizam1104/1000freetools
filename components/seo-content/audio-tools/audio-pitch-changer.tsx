export default function AudioPitchChangerSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Pitch shifting that doesn't change the speed</h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Move the slider up or down by semitones. The pitch changes. The duration stays the same. A 3-minute song stays 3 minutes long whether you shift it up an octave or down.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          This is different from simple speed-based pitch shifting, where raising the pitch also makes the audio shorter. The tool uses the browser's Web Audio API to separate pitch from duration. It shifts the frequency content while keeping the timeline intact. The range is ±12 semitones, which is one full octave in either direction.
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          A semitone is one half-step in Western music. Moving from C to C# is one semitone. C to D is two. You're transposing the audio by exact musical intervals, not by arbitrary percentages. This matters if you're trying to match keys between tracks.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What the algorithm does well (and where it falls apart)</h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Simple material shifts cleanly. A solo vocal track shifted up 3 semitones sounds like the same person singing higher. A single guitar note shifted down 5 semitones sounds like a lower guitar note. Solo instruments, isolated vocals, and sparse recordings handle ±6 semitones without obvious artifacts.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Dense material falls apart faster. A full mix with drums, bass, vocals, and synths shifted 8 semitones will sound warbly and metallic, especially in the high frequencies. Cymbals get splashy. Vocals get a robotic tremolo. This is a limitation of real-time pitch shifting, not a bug in this specific tool. Professional DAW plugins do the same thing, just with more sophisticated algorithms that run offline.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Extreme shifts (±12 semitones, the max) will produce artifacts on almost anything. At a full octave up, voices sound like chipmunks. At a full octave down, they sound demonic and slow-motion, even though the duration didn't change. Fun for effects, not for transparent key changes.
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          For casual use (backing track transposed a few semitones, podcast voice adjusted slightly, a sample pitched to match your project key), the quality is fine. For a final music release, use a DAW with an offline pitch-shifting algorithm like Elastique or Zplane.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">People actually use this for</h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Singers who can't hit the original key. The backing track is in E but your range tops out at C#. Shift the track down 3 semitones. Now you can sing it comfortably. This is the most common use case by far.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          DJs and remixers matching keys between tracks. Track A is in D minor, track B is in F minor. Shift track A up 3 semitones. Now they're in the same key and you can blend them harmonically. The Camelot wheel system makes this even faster: if you know the key codes, the semitone shift is the number of steps between them.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Podcasters adjusting vocal tone. A host's voice sounds too deep or too thin on the recording. A +2 semitone shift brightens it without sounding unnatural. More than 3 semitones on speech starts sounding manipulated, but small adjustments are transparent.
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          Meme and content creators going for effect. The "deep voice" or "high voice" thing. Push it to the extremes, it sounds absurd, that's the point. The artifacty quality at ±12 semitones is a feature here, not a bug.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Is this the same as auto-tune?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              No. Auto-tune corrects individual notes within a performance. This shifts the entire recording by a fixed interval. You can't fix one off-key note with this. You'd need Melodyne, Auto-Tune, or similar pitch correction software.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Why does the shifted audio sound warbly?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              That's the algorithm struggling with complex material at extreme shifts. Try a smaller shift, or use a simpler source. Solo instruments shift cleaner than full mixes. If you need a perfect +12 shift on a complex track, you need offline pitch-shifting software, not a real-time browser tool.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Can I shift by less than a semitone?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              No. The slider moves in whole semitones. If you need cent-level precision (1/100th of a semitone) for fine-tuning, you need a DAW or a dedicated pitch plugin.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Will pitch shifting affect the tempo?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              No. The tool maintains the original duration. This is called time-domain pitch shifting or phase vocoding. Older pitch shifting (like speeding up a tape) changes both pitch and speed. This tool doesn't do that.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What output format do I get?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              MP3. If you need lossless output, use a DAW with a higher-quality pitch algorithm and export to WAV or FLAC. The browser-based tool is for convenience, not archival production.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
