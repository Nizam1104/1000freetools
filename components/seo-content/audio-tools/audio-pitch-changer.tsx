export default function AudioPitchChangerSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Shifting Audio Pitch by Semitones</h2>
        <div className="prose prose-slate dark:prose-invert">
          <p>
            This pitch changer shifts audio up or down by up to 12 semitones (one octave) in either 
            direction. Each semitone represents one half-step in Western music—moving from C to C#, for example.
          </p>
          <p>
            The tool works by changing playback speed and then compensating to maintain the original 
            duration. A +12 shift raises pitch by one octave; -12 lowers it by one octave. Everything 
            processes in your browser using Web Audio API.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
        <ul className="space-y-3">
          <li>
            <strong>Musicians</strong> who need to match a song's key to their vocal range. They shift 
            a backing track down 3 semitones to hit the notes comfortably.
          </li>
          <li>
            <strong>Remixers</strong> who want to blend two tracks in different keys. They pitch-shift 
            one to match the other's key for harmonic mixing.
          </li>
          <li>
            <strong>Podcasters</strong> who recorded narration that sounds too low. They raise it by 
            +2 semitones for a brighter, more energetic tone.
          </li>
          <li>
            <strong>Producers sampling vinyl</strong> who want to match a modern track's tempo and key. 
            They adjust pitch independently of speed to make elements work together.
          </li>
          <li>
            <strong>Social media creators</strong> using pitch shifts for comedic effect—deep voices, 
            high voices, character voices.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What to Know Before Using It</h2>
        <ul className="space-y-3">
          <li>
            The pitch shift range is ±12 semitones (one octave). That covers most practical needs, but 
            extreme key changes beyond an octave aren't supported.
          </li>
          <li>
            Shifting pitch affects timbre, not just fundamental frequency. A +8 shift on a male voice 
            will sound noticeably different, not just higher.
          </li>
          <li>
            Complex material (full mixes) doesn't pitch-shift as cleanly as simple material (solo vocals, 
            single instruments). Expect some artifacts with dense audio.
          </li>
          <li>
            The output is MP3 format. If you're doing professional music production, you'll want to use 
            a DAW with higher-quality pitch algorithms.
          </li>
          <li>
            This isn't auto-tune. It shifts the entire audio uniformly—it won't correct individual notes 
            or fix off-key singing.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-semibold mb-2">What's a semitone?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              One half-step in Western music. Moving from C to C# is one semitone. Twelve semitones 
              equal one octave.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I shift by fractional semitones?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No—the interface uses whole semitone steps. For cent-level precision (1/100th of a 
              semitone), you'd need professional pitch-shifting software.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Does pitch shifting change the duration?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No—the algorithm maintains the original duration while shifting pitch. A 3-minute song 
              stays 3 minutes regardless of pitch shift.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">What happens at extreme pitch shifts?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              ±12 semitones is the limit. At these extremes, you'll hear artifacts—warbly tones, 
              metallic sounds, especially on complex material.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I use this to fix out-of-tune vocals?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Not really. This shifts the entire recording uniformly. For note-by-note pitch correction, 
              you need auto-tune or Melodyne.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Is the quality good enough for music production?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              For demos and sketches, yes. For final releases, a DAW with professional pitch-shifting 
              plugins will give cleaner results.
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
