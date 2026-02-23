import VideoPlayer from "@/components/video-tools/VideoPlayer";
import Faqs from "@/components/utils/Faqs";

const faqData = [
  {
    question:
      "Do I have to wait for my 2GB movie file to upload before I can watch it?",
    answer:
      "No. The system connects your raw MKV or MP4 directly through a secure local memory bridge. The video stream fundamentally never leaves your machine. This guarantees zero buffering, absolutely no uploading phases, and instantly bypasses terrible home Wi-Fi speeds.",
  },
  {
    question:
      "Why does my MKV file perfectly play the video but absolutely refuse to output audio?",
    answer:
      "The browser's internal playback engine explicitly rejects unsupported proprietary audio codecs like AC3. Even if the MKV structure heavily supports the visual track, if the underlying audio stream requires a restricted commercial license, Chrome and Safari will completely mute it.",
  },
  {
    question: "Can I illegally embed custom subtitles into a pirated movie?",
    answer:
      "You can successfully load independent .srt or .vtt subtitle files directly over the active video timeline. The WebVTT parsing engine violently injects the raw text track onto the visual layer without permanently burning the text into the actual video file.",
  },
  {
    question:
      "Will playing a massive 4K video instantly crash my older laptop processor?",
    answer:
      "Because the application runs native hardware acceleration directly through the browser architecture, it efficiently delegates heavy h.264 rendering tasks to your internal GPU. This heavily protects your CPU from aggressively spiking to 100% and crashing.",
  },
  {
    question:
      "Can a sketchy employer or internet provider secretly spy on what video I'm playing?",
    answer:
      "Absolutely not. Because the playback loop is completely sandboxed on your internal local drive, no network requests are ever triggered to a cloud server. Your private video metadata entirely remains hidden from any external traffic sniffers.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function VideoPlayerPage() {
  const relatedTools = [
    {
      name: "Video Compressor",
      description: "Compress videos online - reduce file size, No size limit",
      href: "/video-tools/video-compressor",
    },
    {
      name: "Video Metadata Viewer",
      description: "See Video or Audio files metadata",
      href: "/video-tools/video-metadata-viewer",
    },
    {
      name: "Video Format Converter",
      description:
        "Convert between video formats, Supports wide range of video formats",
      href: "/video-tools/video-format-converter",
    },
    {
      name: "Change Video FPS",
      description:
        "Change video frame rate to 24fps, 30fps, 60fps or custom FPS",
      href: "/video-tools/change-video-fps",
    },
    {
      name: "Crop Video",
      description: "Crop videos online - remove unwanted edges and reframe",
      href: "/video-tools/crop-video",
    },
    {
      name: "Enhance Video Quality",
      description: "Upscale, sharpen, denoise and improve video quality",
      href: "/video-tools/enhance-video-quality",
    },
    {
      name: "Extract Audio from Video",
      description: "Extract audio from video files - save as MP3, AAC, or WAV",
      href: "/video-tools/extract-audio-from-video",
    },
    {
      name: "Resize Video Dimensions",
      description: "Resize video to 4K, 1080p, 720p or custom dimensions",
      href: "/video-tools/resize-video-dimensions",
    },
    {
      name: "Rotate Video",
      description: "Rotate videos 90°, 180° or 270° - fix orientation",
      href: "/video-tools/rotate-video",
    },
    {
      name: "Video Color Space Transformation",
      description: "Adjust brightness, contrast, saturation, hue and more",
      href: "/video-tools/video-color-space-transformation",
    },
    {
      name: "Video Grayscale",
      description: "Convert videos to black and white instantly",
      href: "/video-tools/video-grayscale",
    },
    {
      name: "Video Overlays",
      description: "Add watermarks, logos or image overlays to videos",
      href: "/video-tools/video-overlays",
    },
    {
      name: "Video Transparency Maker",
      description:
        "Adjust video opacity and transparency with custom background",
      href: "/video-tools/video-transparency-maker",
    },
  ];
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Free Online Video Player — Play Any Video or Audio File Instantly
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Drop in a video or audio file and hit play — no software to install,
          no account to create, and nothing ever leaves your device. Whether you
          need a quick MP4 player online or want to watch an MKV with subtitles,
          this tool works entirely inside your browser. It's fast, private, and
          completely free.
        </p>
      </div>

      <VideoPlayer />

      {/* What it Does Section */}
      <section className="mt-16 mb-16">
        <div className="rounded-3xl border border-muted/50 bg-gradient-to-br from-card to-muted/20 p-8 sm:p-12 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6 text-gray-900 dark:text-gray-100">
            What it Does
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            When you aggressively download a strange MKV file that your desktop
            computer refuses to open, this tool forces it to play instantly.
            Acting as a brutally efficient offline environment, the system
            utilizes advanced Chrome and Safari APIs to parse raw video
            architecture straight from your hard drive memory. It entirely
            bypasses expensive, bloated media applications like VLC, decoding
            heavy visual tracks and injecting raw subtitle files seamlessly into
            the browser timeline without triggering a catastrophic internet
            upload.
          </p>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="mt-16 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            How to Use
          </h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="relative text-center">
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
              <span className="text-2xl font-bold">1</span>
            </div>
            <h3 className="relative font-semibold text-xl text-gray-900 dark:text-gray-100">
              Inject the media file
            </h3>
            <p className="relative mt-2 text-sm text-gray-600 dark:text-gray-400 text-left">
              Aggressively drag the unplayable MP4, WebM, or raw audio track
              right onto the viewing portal. The application instantaneously
              builds a secure digital bridge to your local memory, completely
              bypassing any agonizing cloud upload screens.
            </p>
          </div>
          <div className="relative text-center">
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="relative font-semibold text-xl text-gray-900 dark:text-gray-100">
              Force the external subs
            </h3>
            <p className="relative mt-2 text-sm text-gray-600 dark:text-gray-400 text-left">
              If the dialogue is heavily obscured, violently slap an unformatted
              .srt text file into the secondary upload slot. The background
              engine rapidly converts the raw script structure into a native
              WebVTT format and securely locks the timestamps.
            </p>
          </div>
          <div className="relative text-center">
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="relative font-semibold text-xl text-gray-900 dark:text-gray-100">
              Command the playback
            </h3>
            <p className="relative mt-2 text-sm text-gray-600 dark:text-gray-400 text-left">
              Seize total control of the hardware timeline. Instantly toggle
              between multiple audio languages silently buried in the file
              architecture, maximize the viewport to full screen resolution, and
              radically bypass slow buffering zones entirely.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="mt-16 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Use Cases
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-muted/50 border-muted rounded-xl p-6">
            <h3 className="font-bold mb-2 text-gray-900 dark:text-gray-100">
              Reviewing highly confidential edits
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Freelance editors handling unreleased corporate commercials
              desperately need to verify rendering timelines without violating
              non-disclosure agreements. Playing the secure file natively inside
              the browser strictly proves the rough cut is utterly safe from
              accidental digital leaks on open cloud networks.
            </p>
          </div>
          <div className="bg-muted/50 border-muted rounded-xl p-6">
            <h3 className="font-bold mb-2 text-gray-900 dark:text-gray-100">
              Decoding bizarre anime formats
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Otaku fans aggressively pirating obscure Japanese animation
              constantly acquire weirdly wrapped MKV files stuffed with
              disconnected SRT translation files. Dropping both elements into
              the system fuses the dialogue over the timeline instantly without
              installing shady third-party codec packs.
            </p>
          </div>
          <div className="bg-muted/50 border-muted rounded-xl p-6">
            <h3 className="font-bold mb-2 text-gray-900 dark:text-gray-100">
              Screening massive 4K raw drone footage
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Aerial videographers rushing to verify a massive 3GB MP4 shot on
              an old laptop routinely face terrible buffering in generic apps.
              Utilizing the browser’s highly optimized hardware decoding
              forcefully forces the 4K timeline to play completely smoothly by
              bypassing heavy software constraints.
            </p>
          </div>
          <div className="bg-muted/50 border-muted rounded-xl p-6">
            <h3 className="font-bold mb-2 text-gray-900 dark:text-gray-100">
              Auditing separated podcast tracks
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Audio engineers deeply investigating strange static on a massive
              two-hour WAV recording despise opening a sluggish editing
              interface like Logic Pro. Instantly mounting the raw audio file
              into the web portal mathematically bypasses loading screens and
              grants immediate scrub access to locate the bad frequency.
            </p>
          </div>
          <div className="bg-muted/50 border-muted rounded-xl p-6">
            <h3 className="font-bold mb-2 text-gray-900 dark:text-gray-100">
              Rescuing locked mobile formats
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Windows users occasionally receive older Apple QuickTime .MOV
              files that totally freeze their entire desktop when
              double-clicked. Passing the ancient file structure perfectly into
              the Chrome playback engine brutally overpowers the compatibility
              errors and forcibly renders the visual footage cleanly on a PC.
            </p>
          </div>
        </div>
      </section>

      {/* Settings Explained Section */}
      <section className="mt-16 mb-16">
        <div className="rounded-3xl border border-muted/50 bg-gradient-to-br from-card to-muted/20 p-8 sm:p-12 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6 text-gray-900 dark:text-gray-100">
            Settings Explained
          </h2>
          <div className="space-y-6 text-left">
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                The Local Object URL Array
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                To entirely circumvent catastrophic upload times, the browser
                leverages a secure `URL.createObjectURL` protocol. It
                aggressively hacks a temporary memory pathway straight to the
                physical file resting on your drive, successfully tricking the
                video tag into streaming the data exactly like a legitimate
                website server.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                WebVTT Subtitle Transmuxing
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Browsers absolutely reject older text formats like .srt files.
                By aggressively running a background parsing algorithm, the
                system brutally rips open the unformatted timestamp structures,
                heavily rewrites the coordinates into compliant WebVTT code
                blocks, and securely binds the raw text strings over the visual
                stream.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                Hardware Render Decoding
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Rather than heavily destroying your slow CPU with brutal math
                calculations, the interface fully relies on Google Chrome's
                native decoding layers. These specifically bypass software
                processing entirely and directly pipe massive 4K h.264 data
                right into your system's dedicated graphics processing unit for
                violent frame delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Frequently Asked Questions
        </h2>
        <Faqs faqs={faqData} />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
