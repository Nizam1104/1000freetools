import VideoPlayer from "@/components/video-tools/VideoPlayer";
import Faqs from "@/components/utils/Faqs";

const faqData = [
  {
    question: "Can I play MKV files online without software?",
    answer:
      "Yes. Simply open this page, drag in your MKV file, and it plays instantly — no plugins or downloads needed, as long as your browser supports the codec.",
  },
  {
    question: "Is my video uploaded to any server?",
    answer:
      "No. This tool is a local video player that runs in the browser — your file never leaves your device, making it ideal for sensitive or private content.",
  },
  {
    question: "How do I add subtitles to my video online?",
    answer:
      'After loading your video, click "Add Subtitle" and select a .srt or .vtt file. The player automatically converts SRT to WebVTT and syncs it to your video.',
  },
  {
    question: "What is the best free online video player for multiple formats?",
    answer:
      "This tool supports over 15 video and audio formats — including MP4, WebM, MOV, MKV, AVI, MP3, AAC, and FLAC — making it one of the most versatile free multi-format video players available online.",
  },
  {
    question: "Does this work on mobile browsers?",
    answer:
      "Yes. The player is fully responsive and works on modern mobile browsers including Chrome for Android and Safari on iOS, with full touch controls.",
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
      name: "Image Compressor",
      description: "Single and bulk image compressor, No Limits",
      href: "/image-tools/image-compressor",
    },
    {
      name: "Video Compressor",
      description: "Compress videos online - reduce file size, No size limit",
      href: "/video-tools/video-compressor",
    },
    {
      name: "Video Format Converter",
      description:
        "Convert between video formats, Supports wide range of video formats",
      href: "/video-tools/video-format-converter",
    },
    {
      name: "Video MetaData Viewer",
      description: "See Video or Audio files metadata",
      href: "/video-tools/video-metadata-viewer",
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

      <section className="mt-12 mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          What Is This Tool?
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          This is a browser-based video player that lets you open and play local
          media files without uploading them to any server. Think of it as a
          lightweight, privacy-first alternative to desktop media players —
          accessible from any device with a modern browser, no installation
          required.
        </p>
      </section>

      <section className="mt-12 mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          What This Tool Does
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          This free online video player handles a wide range of everyday media
          tasks in one place. You can play popular video formats like MP4, WebM,
          MOV, MKV, AVI, and MPEG, as well as audio files including MP3, WAV,
          AAC, FLAC, and M4A. Need subtitles? Simply add a .srt or .vtt file and
          the player converts and syncs it automatically. You can load multiple
          subtitle tracks and switch between them — or turn them off — without
          restarting playback. Drag and drop your file or click to browse; it's
          ready in seconds.
        </p>
      </section>

      <section className="mt-12 mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Why Choose This Tool?
        </h2>
        <ul className="space-y-4">
          <li className="flex gap-3">
            <span className="font-semibold text-gray-900 dark:text-gray-100 flex-shrink-0">
              100% Free & Unlimited —
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              No paywalls, no daily limits, no subscriptions. Play as many files
              as you want, as often as you like.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-gray-900 dark:text-gray-100 flex-shrink-0">
              No File Uploads, Ever —
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              Your video never touches a server. Everything runs locally in your
              browser, so your files stay completely private.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-gray-900 dark:text-gray-100 flex-shrink-0">
              No Software to Install —
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              Works on Windows, Mac, Linux, and mobile — anywhere your browser
              runs.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-gray-900 dark:text-gray-100 flex-shrink-0">
              Broad Format Support —
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              One of the few online video players supporting MKV, MOV, and FLAC
              alongside mainstream formats.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-gray-900 dark:text-gray-100 flex-shrink-0">
              Built-in Subtitle Support —
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              Load SRT or VTT files and get automatic conversion — a rare
              feature for a free browser video player with subtitle support.
            </span>
          </li>
        </ul>
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
