import VideoPlayer from "@/components/video-tools/VideoPlayer";
import Faqs from "@/components/utils/Faqs";

const faqData = [
  {
    question:
      "Do I need to wait for a large video file to upload before I can watch it?",
    answer:
      "No. The player accesses the file directly from your local drive using a browser object URL. The video never leaves your device. Playback starts immediately, the same way a desktop media player would open the file.",
  },
  {
    question: "Why does an MKV file play the video but produce no audio?",
    answer:
      "This usually means the audio track uses a codec the browser does not support, such as AC3 (Dolby) or DTS. Browsers natively support AAC and Ogg Vorbis audio. If your MKV has an AC3 audio track, the video will play but the audio will be silent. Converting the audio track to AAC using the Video Format Converter resolves the issue.",
  },
  {
    question: "How do I add subtitles to a video in this player?",
    answer:
      "Open your video first, then use the subtitle upload button to load an .srt or .vtt file. The player converts the .srt timestamps to WebVTT format, which browsers display as an on-screen text track. The subtitle file is not permanently embedded into the video file.",
  },
  {
    question: "Will playing a large 4K video slow down or crash my device?",
    answer:
      "Modern browsers use hardware-accelerated decoding, which passes the video decode work to the GPU rather than the CPU. This means most devices can play 4K H.264 or H.265 video without significant CPU load. Very old GPUs or integrated graphics on low-power laptops may struggle with 4K 60fps files.",
  },
  {
    question: "Can an employer or ISP see which video files I am playing?",
    answer:
      "No. The file is read from your local drive and never transmitted over your network. No network request is made when you play a video. Your ISP and any network monitoring tools cannot detect which file you are viewing.",
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
          Open any video or audio file and play it directly in your browser. No software to install, no account required. Your file never leaves your device. Supports MP4, WebM, MKV, MOV, MP3, WAV, and external subtitles.
        </p>
      </div>

      <VideoPlayer />

      {/* What This Player Does */}
      <section className="mt-16 mb-16">
        <div className="rounded-3xl border border-muted/50 bg-gradient-to-br from-card to-muted/20 p-8 sm:p-12 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6 text-gray-900 dark:text-gray-100">
            What This Player Does
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-4">
            This player opens video and audio files from your local drive and plays them inside your browser. It uses your browser's built-in media decoder with hardware acceleration on most devices.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            Load external .srt or .vtt subtitle files and they display as text tracks over the video. No files are uploaded or transmitted — everything stays on your device. Safe for private, unreleased, or confidential footage.
          </p>
        </div>
      </section>

      {/* How to Use */}
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
              Open your file
            </h3>
            <p className="relative mt-2 text-sm text-gray-600 dark:text-gray-400 text-left">
              Click the file picker or drag your video onto the player. Works with MP4, WebM, MKV, MOV, AVI, MP3, WAV. The file is read locally — never uploaded.
            </p>
          </div>
          <div className="relative text-center">
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="relative font-semibold text-xl text-gray-900 dark:text-gray-100">
              Add subtitles if needed
            </h3>
            <p className="relative mt-2 text-sm text-gray-600 dark:text-gray-400 text-left">
              Have a separate .srt or .vtt file? Load it with the subtitle button. The player converts SRT to WebVTT and displays subtitles as an overlay — no permanent modification to your video.
            </p>
          </div>
          <div className="relative text-center">
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="relative font-semibold text-xl text-gray-900 dark:text-gray-100">
              Control playback
            </h3>
            <p className="relative mt-2 text-sm text-gray-600 dark:text-gray-400 text-left">
              Play, pause, skip, adjust volume — standard controls. Toggle fullscreen for larger viewing. If the video has multiple audio tracks, switch between them with the track selector.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="mt-16 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            When You'd Use This
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-muted/50 border-muted rounded-xl p-6">
            <h3 className="font-bold mb-2 text-gray-900 dark:text-gray-100">
              Reviewing confidential footage safely
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Editors working on unreleased projects or NDA-covered footage need to review without cloud uploads. This player reads files locally — footage never leaves your device. Can't be intercepted on the network.
            </p>
          </div>
          <div className="bg-muted/50 border-muted rounded-xl p-6">
            <h3 className="font-bold mb-2 text-gray-900 dark:text-gray-100">
              Playing MKV files with subtitles
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              MKV files often come with separate .srt subtitles. Most operating systems need third-party software to open them. This player handles MKV in the browser and loads .srt files alongside — no installation needed.
            </p>
          </div>
          <div className="bg-muted/50 border-muted rounded-xl p-6">
            <h3 className="font-bold mb-2 text-gray-900 dark:text-gray-100">
              Quick review of large video files
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Videographer with 3 GB of drone footage can open files immediately to check focus, exposure, and content. No upload or conversion needed. Decide which clips to process before committing time.
            </p>
          </div>
          <div className="bg-muted/50 border-muted rounded-xl p-6">
            <h3 className="font-bold mb-2 text-gray-900 dark:text-gray-100">
              Checking audio quality in WAV/MP3
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Audio engineer can open a long WAV recording and scrub through to find problems — clipping, static, etc. — without launching a full DAW like Audacity or Logic Pro.
            </p>
          </div>
          <div className="bg-muted/50 border-muted rounded-xl p-6">
            <h3 className="font-bold mb-2 text-gray-900 dark:text-gray-100">
              Opening MOV files on Windows
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              MOV files from iPhone/Mac sometimes fail on Windows without QuickTime codecs. Modern browsers support H.264 inside MOV natively. This player opens them without installing anything extra.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mt-16 mb-16">
        <div className="rounded-3xl border border-muted/50 bg-gradient-to-br from-card to-muted/20 p-8 sm:p-12 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6 text-gray-900 dark:text-gray-100">
            How It Works
          </h2>
          <div className="space-y-6 text-left">
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                Local Object URL
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                When you open a file, the browser creates a temporary local URL using URL.createObjectURL. This URL points to the file in your device's memory. The video element streams through this local URL — works like streaming but no data leaves your device.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                SRT to WebVTT Conversion
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Browsers only support WebVTT subtitles natively. When you load an .srt file, the player reads the timestamp and text blocks, converts them to WebVTT in memory, and links them as a text track. Original .srt file isn't modified.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                Hardware-Accelerated Decoding
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Modern browsers pass video decoding to the GPU when the codec is supported in hardware. H.264 and H.265 decoding is hardware-accelerated on most devices — CPU stays free, video plays smoothly even on lower-power machines.
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
