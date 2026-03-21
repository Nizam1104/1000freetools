#!/usr/bin/env node
// generate-tool-pages.mjs
// Run from project root: node generate-tool-pages.mjs

import fs from "fs";
import path from "path";

const BASE_URL = "https://1000freetools.com";
const OTHER_TOOLS_COUNT = 8;

// ── Skip list ────────────────────────────────────────────────────────────────
const SKIP_FILES = new Set([
  "VideoFormatsConverter.tsx",
  "VideoPlayer.tsx",
  "MetaDataViewer.tsx",
]);

// ── Tool definitions ─────────────────────────────────────────────────────────
// Each entry: { file, category, urlPrefix, breadcrumbCategory, breadcrumbHref }

const AUDIO_TOOLS = fs
  .readdirSync("components/audio-tools")
  .filter((f) => f.endsWith(".tsx") && !SKIP_FILES.has(f))
  .map((file) => ({
    file,
    category: "audio",
    urlPrefix: "/audio-tools",
    breadcrumbCategory: "Audio Tools",
    breadcrumbCategoryHref: "/audio-tools",
    componentDir: "audio-tools",
    seoDir: "audio-tools",
  }));

const VIDEO_TOOLS = fs
  .readdirSync("components/video-tools")
  .filter((f) => f.endsWith(".tsx") && !SKIP_FILES.has(f))
  .map((file) => ({
    file,
    category: "video",
    urlPrefix: "/video-tools",
    breadcrumbCategory: "Video Tools",
    breadcrumbCategoryHref: "/video-tools",
    componentDir: "video-tools",
    seoDir: "video-tools",
  }));

const ALL_TOOLS = [...AUDIO_TOOLS, ...VIDEO_TOOLS];

// ── Helpers ──────────────────────────────────────────────────────────────────

/** audio-trimmer.tsx → audio-trimmer */
function fileToSlug(file) {
  return file.replace(/\.tsx$/, "");
}

/** audio-trimmer → AudioTrimmer */
function slugToComponentName(slug) {
  return slug
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
}

/** audio-trimmer → Audio Trimmer */
function slugToTitle(slug) {
  return slug
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

/** Pick N tools from ALL_TOOLS excluding the current slug */
function pickOtherTools(currentSlug, n) {
  const pool = ALL_TOOLS.filter((t) => fileToSlug(t.file) !== currentSlug);
  // Shuffle deterministically-ish (stable enough for codegen)
  const shuffled = pool.sort(() => {
    const a = currentSlug.charCodeAt(0) + currentSlug.length;
    return (a % 3) - 1;
  });
  return shuffled.slice(0, n);
}

// ── SEO content map ──────────────────────────────────────────────────────────
// Provides title, metaDescription, h1, intro, and toolCard description
// for every tool slug. Add / override entries here as needed.

const SEO_MAP = {
  // ── AUDIO ────────────────────────────────────────────────────────────────
  "audio-trimmer": {
    title: "Audio Trimmer – Cut & Crop Audio Files Online Free",
    metaDescription:
      "Trim and cut audio files instantly in your browser. Remove unwanted sections, crop to exact length. Supports MP3, WAV, FLAC and more. Free online audio trimmer.",
    h1: "Audio Trimmer",
    intro:
      "Precisely cut and crop any audio file right in your browser — no installs, no uploads to a server. Select your start and end points, preview the result, and download your trimmed clip in seconds. Supports MP3, WAV, FLAC, OGG, AAC and most common audio formats.",
    cardDescription:
      "Trim and cut audio files to exact length. Remove silence or unwanted sections. Free online audio cutter.",
  },
  "audio-format-converter": {
    title: "Audio Format Converter – Convert MP3, WAV, FLAC, OGG Free",
    metaDescription:
      "Convert audio files between MP3, WAV, FLAC, OGG, AAC and more formats instantly. Free online audio format converter with no quality loss.",
    h1: "Audio Format Converter",
    intro:
      "Convert audio between any popular format — MP3, WAV, FLAC, OGG, AAC, M4A and more — entirely in your browser. No server uploads, no waiting. Choose your target format, adjust quality settings if needed, and download the converted file instantly.",
    cardDescription:
      "Convert audio between MP3, WAV, FLAC, OGG and more formats. Free online audio converter.",
  },
  "audio-speed-changer": {
    title: "Audio Speed Changer – Change Playback Speed Free Online",
    metaDescription:
      "Speed up or slow down audio files without changing pitch. Free online audio speed changer supporting MP3, WAV, FLAC and more.",
    h1: "Audio Speed Changer",
    intro:
      "Change the playback speed of any audio file without altering its pitch. Perfect for speeding up lectures, slowing down music for practice, or creating time-stretched effects. Works entirely in your browser — drag in your file, set your speed multiplier, and download.",
    cardDescription:
      "Speed up or slow down audio without pitch shift. Free online audio speed changer.",
  },
  "audio-pitch-changer": {
    title: "Audio Pitch Changer – Shift Pitch Online Free",
    metaDescription:
      "Shift the pitch of audio files up or down in semitones without changing speed. Free online audio pitch shifter for MP3, WAV, FLAC.",
    h1: "Audio Pitch Changer",
    intro:
      "Shift the pitch of your audio up or down by semitones — without changing its tempo. Great for transposing music to a different key, creating harmonies, or correcting slightly off-pitch recordings. No plugins needed; everything runs in your browser.",
    cardDescription:
      "Shift audio pitch up or down in semitones. Free online pitch shifter.",
  },
  "audio-volume-adjuster": {
    title: "Audio Volume Adjuster – Increase or Decrease Volume Free",
    metaDescription:
      "Boost or reduce the volume of audio files online. Free audio volume adjuster supporting MP3, WAV, FLAC, OGG. No installation needed.",
    h1: "Audio Volume Adjuster",
    intro:
      "Quickly boost or reduce the volume of any audio file. Whether you need to make a quiet recording louder or bring an overpowering track down to a comfortable level, this tool handles it in seconds — all inside your browser.",
    cardDescription:
      "Boost or reduce audio volume instantly. Free online volume adjuster.",
  },
  "audio-normalizer": {
    title: "Audio Normalizer – Normalize Audio Levels Online Free",
    metaDescription:
      "Normalize audio files to a target loudness level. Balance volume across multiple tracks. Free online audio normalizer for MP3, WAV, FLAC.",
    h1: "Audio Normalizer",
    intro:
      "Normalize your audio to a consistent loudness level so every track sounds balanced. Ideal for podcast producers, musicians, and content creators who need uniform volume across multiple clips. Runs entirely in your browser with no file size limits.",
    cardDescription:
      "Normalize audio to a consistent loudness level. Free online audio normalizer.",
  },
  "audio-merger": {
    title: "Audio Merger – Merge & Join Audio Files Online Free",
    metaDescription:
      "Merge multiple audio files into one. Join MP3, WAV, FLAC tracks in order. Free online audio merger — no sign-up required.",
    h1: "Audio Merger",
    intro:
      "Combine multiple audio files into a single seamless track. Upload your clips, arrange them in the desired order, and merge them into one file — all without leaving your browser. Supports MP3, WAV, FLAC, OGG and more.",
    cardDescription:
      "Merge multiple audio files into one track. Free online audio joiner.",
  },
  "audio-splitter": {
    title: "Audio Splitter – Split Audio Files Online Free",
    metaDescription:
      "Split audio files into multiple parts by time or silence. Free online audio splitter for MP3, WAV, FLAC. No installation required.",
    h1: "Audio Splitter",
    intro:
      "Divide a long audio file into multiple parts with precision. Split by time intervals, at specific timestamps, or automatically on silence. Perfect for breaking up podcasts, albums, or long recordings into individual segments.",
    cardDescription:
      "Split audio into multiple parts by time or silence. Free online audio splitter.",
  },
  "audio-compressor": {
    title: "Audio Compressor – Compress Audio File Size Online Free",
    metaDescription:
      "Reduce audio file size without major quality loss. Free online audio compressor for MP3, WAV, FLAC, OGG. Fast and easy.",
    h1: "Audio Compressor",
    intro:
      "Shrink your audio file size for easier sharing, streaming, or storage — without sacrificing too much quality. Adjust the compression level to find the right balance between size and fidelity. Works directly in your browser.",
    cardDescription:
      "Compress audio to reduce file size. Free online audio compressor.",
  },
  "audio-bitrate-changer": {
    title: "Audio Bitrate Changer – Change MP3 Bitrate Online Free",
    metaDescription:
      "Change the bitrate of audio files to reduce size or improve quality. Free online bitrate changer for MP3, AAC, OGG and more.",
    h1: "Audio Bitrate Changer",
    intro:
      "Adjust the bitrate of your audio file to control the trade-off between file size and sound quality. Lower the bitrate to shrink the file for web delivery, or increase it for higher fidelity archiving. Supports MP3, AAC, OGG and more.",
    cardDescription:
      "Change audio bitrate to control size vs quality. Free online bitrate changer.",
  },
  "audio-sample-rate-converter": {
    title: "Audio Sample Rate Converter – Convert 44.1kHz, 48kHz Free",
    metaDescription:
      "Convert audio sample rate between 8kHz, 22kHz, 44.1kHz, 48kHz, 96kHz and more. Free online sample rate converter.",
    h1: "Audio Sample Rate Converter",
    intro:
      "Convert your audio file's sample rate to match the requirements of your project — whether it's 44.1 kHz for music, 48 kHz for video, or 8 kHz for telephony. Runs entirely in your browser with no software to install.",
    cardDescription:
      "Convert audio sample rate between 44.1kHz, 48kHz and more. Free online converter.",
  },
  "audio-channel-splitter": {
    title: "Audio Channel Splitter – Split Stereo to Mono Online Free",
    metaDescription:
      "Split stereo audio into separate left and right mono channels. Free online audio channel splitter for MP3, WAV, FLAC.",
    h1: "Audio Channel Splitter",
    intro:
      "Extract individual channels from a stereo or multi-channel audio file. Split a stereo track into separate left and right mono files — useful for audio editing, remixing, or isolating vocals and instruments.",
    cardDescription:
      "Split stereo audio into separate left/right mono channels. Free online splitter.",
  },
  "audio-channel-remover": {
    title: "Audio Channel Remover – Remove Left or Right Channel Free",
    metaDescription:
      "Remove the left or right audio channel from a stereo file. Free online audio channel remover for MP3, WAV, FLAC.",
    h1: "Audio Channel Remover",
    intro:
      "Drop an unwanted channel from a stereo audio file in one click. Remove the left channel, the right channel, or convert to mono by discarding one side. Handy for karaoke creation, vocal isolation prep, or fixing broken mic recordings.",
    cardDescription:
      "Remove left or right audio channel from stereo files. Free online tool.",
  },
  "audio-mono-stereo-converter": {
    title: "Mono to Stereo Converter – Convert Audio Channels Free Online",
    metaDescription:
      "Convert mono audio to stereo or stereo to mono instantly. Free online mono/stereo audio converter for MP3, WAV, FLAC.",
    h1: "Mono to Stereo Converter",
    intro:
      "Switch between mono and stereo audio with ease. Convert a mono recording to stereo for broader compatibility, or collapse a stereo file to mono to cut file size in half. Works in your browser — no installs needed.",
    cardDescription:
      "Convert mono audio to stereo or stereo to mono. Free online channel converter.",
  },
  "audio-fade-in-out": {
    title: "Audio Fade In & Fade Out – Add Audio Fades Online Free",
    metaDescription:
      "Add smooth fade-in and fade-out effects to audio files online. Free audio fade editor for MP3, WAV, FLAC. No installation required.",
    h1: "Audio Fade In & Fade Out",
    intro:
      "Add professional fade-in and fade-out effects to any audio file. Set the fade duration and curve to create smooth transitions at the beginning or end of your track. Perfect for intros, outros, and seamless audio editing.",
    cardDescription:
      "Add fade-in and fade-out effects to audio. Free online audio fade editor.",
  },
  "audio-reverse": {
    title: "Audio Reverser – Reverse Audio Files Online Free",
    metaDescription:
      "Reverse any audio file to play it backwards. Free online audio reverser for MP3, WAV, FLAC, OGG. Instant download.",
    h1: "Audio Reverser",
    intro:
      "Flip your audio file so it plays in reverse. Great for creative sound design, finding hidden messages, or just experimenting with backwards audio effects. Upload your file, reverse it instantly, and download the result.",
    cardDescription:
      "Reverse audio to play it backwards. Free online audio reverser.",
  },
  "audio-equalizer-basic": {
    title: "Audio Equalizer – Adjust EQ Bands Online Free",
    metaDescription:
      "Adjust bass, mid, and treble EQ bands on audio files online. Free basic audio equalizer for MP3, WAV, FLAC. No sign-up needed.",
    h1: "Audio Equalizer",
    intro:
      "Fine-tune the frequency balance of your audio with a simple multi-band equalizer. Boost the bass, cut harsh highs, or shape the mids — then download your EQ'd audio file. No DAW required, everything runs in the browser.",
    cardDescription:
      "Adjust bass, mid, and treble EQ bands on audio files. Free online equalizer.",
  },
  "audio-loudness-meter": {
    title: "Audio Loudness Meter – Measure LUFS & Loudness Free Online",
    metaDescription:
      "Measure audio loudness in LUFS, RMS, and peak levels. Free online audio loudness meter for MP3, WAV, FLAC. Instant analysis.",
    h1: "Audio Loudness Meter",
    intro:
      "Analyze the loudness of your audio file and get LUFS, RMS, and peak measurements instantly. Essential for meeting streaming platform loudness standards (Spotify, YouTube, Apple Music) before publishing. No software needed.",
    cardDescription:
      "Measure audio loudness in LUFS and RMS. Free online loudness meter.",
  },
  "audio-frequency-analyzer": {
    title: "Audio Frequency Analyzer – Analyze Audio Spectrum Free Online",
    metaDescription:
      "Visualize and analyze the frequency spectrum of audio files. Free online audio frequency analyzer for MP3, WAV, FLAC.",
    h1: "Audio Frequency Analyzer",
    intro:
      "Visualize the full frequency spectrum of any audio file. Identify dominant frequencies, spot resonances, and understand the tonal balance of your recording — all through an interactive spectrum display running in your browser.",
    cardDescription:
      "Analyze and visualize the frequency spectrum of audio files. Free online analyzer.",
  },
  "audio-gain-analyzer": {
    title: "Audio Gain Analyzer – Check Audio Gain Levels Free Online",
    metaDescription:
      "Analyze gain levels across an audio file. Check for clipping, peaks, and dynamic range. Free online audio gain analyzer.",
    h1: "Audio Gain Analyzer",
    intro:
      "Inspect the gain levels throughout your audio file to detect clipping, measure peaks, and assess dynamic range. A quick sanity check before mixing, mastering, or publishing your audio content.",
    cardDescription:
      "Check audio gain levels and detect clipping. Free online gain analyzer.",
  },
  "audio-waveform-generator": {
    title: "Audio Waveform Generator – Generate Waveform Image Free",
    metaDescription:
      "Generate a waveform image from any audio file online. Export waveform as PNG. Free online audio waveform generator for MP3, WAV, FLAC.",
    h1: "Audio Waveform Generator",
    intro:
      "Turn any audio file into a clean, exportable waveform image. Perfect for thumbnails, podcast covers, social media posts, or visualizing audio content. Download your waveform as a PNG in seconds — no design software needed.",
    cardDescription:
      "Generate waveform images from audio files. Export as PNG. Free online tool.",
  },
  "audio-silence-remover": {
    title: "Audio Silence Remover – Remove Silence from Audio Free Online",
    metaDescription:
      "Automatically detect and remove silence from audio files. Free online silence remover for MP3, WAV, FLAC. Speed up recordings instantly.",
    h1: "Audio Silence Remover",
    intro:
      "Strip out silent gaps from your audio file automatically. Speed up interviews, podcasts, or lecture recordings by removing dead air with a single click. Adjust the silence threshold to control how aggressively gaps are removed.",
    cardDescription:
      "Remove silence and dead air from audio files automatically. Free online tool.",
  },
  "audio-clip-maker": {
    title: "Audio Clip Maker – Create Audio Clips Online Free",
    metaDescription:
      "Create short audio clips from longer files. Extract and save specific portions as clips. Free online audio clip maker for MP3, WAV, FLAC.",
    h1: "Audio Clip Maker",
    intro:
      "Extract specific portions of a longer audio file and save them as standalone clips. Great for creating ringtones, sound bites, samples, or highlight reels. Set your in and out points, preview, and download your clip.",
    cardDescription:
      "Create short audio clips from longer files. Free online clip maker.",
  },
  "audio-loop-maker": {
    title: "Audio Loop Maker – Create Seamless Audio Loops Free Online",
    metaDescription:
      "Create seamless looping audio from any file. Perfect for background music, sound design, and game audio. Free online audio loop maker.",
    h1: "Audio Loop Maker",
    intro:
      "Create perfectly seamless audio loops from any file. Ideal for background music, ambient soundscapes, game audio, and repeating effects. Trim and crossfade to get a smooth, glitch-free loop ready to drop into your project.",
    cardDescription:
      "Create seamless audio loops for music and game audio. Free online loop maker.",
  },
  "audio-sample-extractor": {
    title: "Audio Sample Extractor – Extract Audio Samples Free Online",
    metaDescription:
      "Extract specific audio samples from longer recordings. Free online audio sample extractor for MP3, WAV, FLAC, OGG.",
    h1: "Audio Sample Extractor",
    intro:
      "Pull individual samples out of a longer audio file with precise control over start and end points. Useful for music producers, sound designers, and game developers who need to harvest specific sounds from recordings.",
    cardDescription:
      "Extract audio samples from recordings. Free online sample extractor.",
  },
  "audio-resampler": {
    title: "Audio Resampler – Resample Audio Files Online Free",
    metaDescription:
      "Resample audio files to a new sample rate. Free online audio resampler for MP3, WAV, FLAC. Maintain quality while changing sample rate.",
    h1: "Audio Resampler",
    intro:
      "Resample your audio to a different rate while preserving as much quality as possible. Whether you need 44.1 kHz for CD-quality, 48 kHz for video post, or a lower rate for voice applications, this tool handles the conversion in your browser.",
    cardDescription:
      "Resample audio to a different sample rate. Free online audio resampler.",
  },
  "audio-metadata-editor": {
    title: "Audio Metadata Editor – Edit ID3 Tags Online Free",
    metaDescription:
      "Edit audio metadata including title, artist, album, genre, and cover art. Free online ID3 tag editor for MP3, FLAC, OGG.",
    h1: "Audio Metadata Editor",
    intro:
      "View and edit the metadata embedded in your audio files — title, artist, album, year, genre, track number, and more. Update ID3 tags for MP3 or equivalent tags for FLAC and OGG without any software installation.",
    cardDescription:
      "Edit audio metadata and ID3 tags online. Free tag editor for MP3, FLAC.",
  },
  "audio-cover-art-adder": {
    title: "Audio Cover Art Adder – Add Album Art to Audio Files Free",
    metaDescription:
      "Add or replace album cover art in MP3, FLAC, and OGG files online. Free audio cover art adder. No installation required.",
    h1: "Audio Cover Art Adder",
    intro:
      "Embed album artwork directly into your audio file so it shows up in music players, streaming apps, and media libraries. Upload your audio and your image, and this tool handles the embedding — no ID3 tag editors or command-line tools needed.",
    cardDescription:
      "Add album cover art to MP3 and FLAC files. Free online cover art adder.",
  },
  "audio-cover-art-extractor": {
    title: "Audio Cover Art Extractor – Extract Album Art Free Online",
    metaDescription:
      "Extract embedded album artwork from MP3, FLAC, and OGG files. Free online cover art extractor. Save album art as PNG or JPG.",
    h1: "Audio Cover Art Extractor",
    intro:
      "Pull embedded cover art out of your audio files and save it as a standalone image. Useful for archiving, editing artwork before re-embedding, or simply viewing the art in full resolution.",
    cardDescription:
      "Extract embedded album artwork from audio files. Free online extractor.",
  },
  "audio-thumbnail-generator": {
    title: "Audio Thumbnail Generator – Generate Audio Thumbnails Free",
    metaDescription:
      "Generate visual thumbnails for audio files showing waveform and metadata. Free online audio thumbnail generator for MP3, WAV, FLAC.",
    h1: "Audio Thumbnail Generator",
    intro:
      "Create eye-catching visual thumbnails for your audio files featuring waveform visuals and track metadata. Perfect for YouTube uploads, podcast listings, SoundCloud covers, and social media previews.",
    cardDescription:
      "Generate visual thumbnails for audio files. Free online thumbnail creator.",
  },
  "audio-track-extractor": {
    title: "Audio Track Extractor – Extract Audio Tracks Free Online",
    metaDescription:
      "Extract individual audio tracks from multi-track files. Free online audio track extractor for MP3, WAV, FLAC, and more.",
    h1: "Audio Track Extractor",
    intro:
      "Isolate and extract individual tracks from multi-track audio files. Whether you're working with stems, multi-channel recordings, or bundled audio assets, this tool lets you pull out exactly the track you need.",
    cardDescription:
      "Extract individual tracks from multi-track audio files. Free online extractor.",
  },

  // ── VIDEO ────────────────────────────────────────────────────────────────
  "video-frame-sequence-exporter": {
    title: "Video Frame Sequence Exporter – Export Video Frames Free Online",
    metaDescription:
      "Export video frames as an image sequence (PNG/JPG). Free online frame sequence exporter for MP4, MOV, AVI and more.",
    h1: "Video Frame Sequence Exporter",
    intro:
      "Extract every frame — or a selected range — from a video file and export them as a numbered image sequence. Perfect for animation reference, motion analysis, visual effects work, or creating sprite sheets.",
    cardDescription:
      "Export video frames as a PNG/JPG image sequence. Free online exporter.",
  },
  "video-bitrate-changer": {
    title: "Video Bitrate Changer – Change Video Bitrate Online Free",
    metaDescription:
      "Change video bitrate to reduce file size or improve quality. Free online video bitrate changer for MP4, MOV, MKV and more.",
    h1: "Video Bitrate Changer",
    intro:
      "Adjust your video's bitrate to strike the right balance between file size and visual quality. Lower the bitrate for faster uploads and streaming, or raise it for higher fidelity archival copies — all without leaving your browser.",
    cardDescription:
      "Change video bitrate to control size vs quality. Free online bitrate changer.",
  },
  "video-audio-remover": {
    title: "Video Audio Remover – Remove Audio from Video Free Online",
    metaDescription:
      "Remove the audio track from any video file online. Free video audio remover for MP4, MOV, AVI. Download silent video instantly.",
    h1: "Video Audio Remover",
    intro:
      "Strip the audio track from any video file in seconds. Useful for muting videos before re-dubbing, removing background noise, or creating silent clips for social media. Download the audio-free video immediately after processing.",
    cardDescription:
      "Remove audio track from video files. Free online video audio remover.",
  },
  "video-track-remover": {
    title: "Video Track Remover – Remove Video or Audio Tracks Free",
    metaDescription:
      "Remove specific tracks from video files including audio, subtitle, or data tracks. Free online video track remover for MP4, MKV.",
    h1: "Video Track Remover",
    intro:
      "Remove any specific track — audio, subtitle, data, or secondary video — from a multi-track video file. Useful for cleaning up MKV files, removing unwanted language tracks, or stripping embedded subtitles before re-encoding.",
    cardDescription:
      "Remove specific tracks from video files. Free online track remover.",
  },
  "video-thumbnail-generator": {
    title: "Video Thumbnail Generator – Generate Video Thumbnails Free",
    metaDescription:
      "Generate thumbnail images from any video frame. Free online video thumbnail generator for MP4, MOV, AVI. Download as PNG or JPG.",
    h1: "Video Thumbnail Generator",
    intro:
      "Capture the perfect thumbnail from any frame in your video. Scrub through the timeline, pick your moment, and export it as a high-resolution PNG or JPG. Ideal for YouTube, Vimeo, social media, and video platform uploads.",
    cardDescription:
      "Generate thumbnail images from video frames. Free online thumbnail generator.",
  },
  "video-metadata-remover": {
    title: "Video Metadata Remover – Strip Video Metadata Free Online",
    metaDescription:
      "Remove metadata from video files to protect privacy. Free online video metadata remover for MP4, MOV, MKV. Strip GPS, camera info, and more.",
    h1: "Video Metadata Remover",
    intro:
      "Erase embedded metadata from video files before sharing them publicly. Remove GPS coordinates, camera model, creation date, software info, and other personal data with one click — protecting your privacy without re-encoding the video.",
    cardDescription:
      "Strip metadata from video files to protect privacy. Free online remover.",
  },
  "video-audio-sync-fixer": {
    title: "Video Audio Sync Fixer – Fix Audio Sync Issues Free Online",
    metaDescription:
      "Fix audio and video sync issues by adjusting audio delay. Free online video audio sync fixer for MP4, MOV, MKV and more.",
    h1: "Video Audio Sync Fixer",
    intro:
      "Fix annoying lip-sync and audio delay issues without re-encoding your entire video. Nudge the audio track forward or backward by milliseconds until it lines up perfectly with the video. Simple, fast, and free.",
    cardDescription:
      "Fix audio sync issues in video files. Free online audio delay adjuster.",
  },
  "video-frame-sequence-to-video": {
    title: "Frame Sequence to Video – Convert Image Sequence to Video Free",
    metaDescription:
      "Convert a sequence of PNG or JPG frames into a video file. Free online frame sequence to video converter. Set FPS and output format.",
    h1: "Frame Sequence to Video Converter",
    intro:
      "Turn a numbered sequence of image frames (PNG, JPG) into a smooth video file. Set your target frame rate, choose an output format (MP4, WebM, etc.), and compile your sequence into a video — perfect for animation renders and timelapse assembly.",
    cardDescription:
      "Convert PNG/JPG frame sequences into video files. Free online converter.",
  },
  "video-speed-changer": {
    title: "Video Speed Changer – Change Video Playback Speed Free Online",
    metaDescription:
      "Speed up or slow down video files online. Free video speed changer for MP4, MOV, AVI. Create slow motion or time-lapse effects.",
    h1: "Video Speed Changer",
    intro:
      "Change the playback speed of any video file — speed it up for time-lapse effects or slow it down for dramatic slow motion. Adjust to any speed multiplier and download the result instantly. No video editor required.",
    cardDescription:
      "Speed up or slow down video files. Free online video speed changer.",
  },
  "video-compressor-simple": {
    title: "Video Compressor – Compress Video File Size Free Online",
    metaDescription:
      "Compress video files to reduce size for sharing and uploading. Free online video compressor for MP4, MOV, AVI. Fast and easy.",
    h1: "Video Compressor",
    intro:
      "Reduce your video file size for easier sharing, email attachments, or faster uploads — without sacrificing too much visual quality. Choose your compression level and let the tool handle the encoding entirely in your browser.",
    cardDescription:
      "Compress video to reduce file size for sharing. Free online video compressor.",
  },
  "video-fragmenter": {
    title: "Video Fragmenter – Split Video into Fragments Free Online",
    metaDescription:
      "Split video files into equal fragments or by duration. Free online video fragmenter for MP4, MOV, MKV. No installation needed.",
    h1: "Video Fragmenter",
    intro:
      "Divide a video into multiple equal-length fragments or split at custom time intervals. Useful for creating social media clips, breaking up long recordings, or preparing files for platforms with upload size limits.",
    cardDescription:
      "Split video into equal fragments by duration. Free online video fragmenter.",
  },
  "video-metadata-editor": {
    title: "Video Metadata Editor – Edit Video Tags & Info Free Online",
    metaDescription:
      "Edit video file metadata including title, author, description, and tags. Free online video metadata editor for MP4, MOV, MKV.",
    h1: "Video Metadata Editor",
    intro:
      "View and edit the metadata stored inside your video files — title, author, description, copyright, creation date, and more. Clean up or update embedded info before publishing without needing a full video editing suite.",
    cardDescription:
      "Edit video metadata including title, author, and tags. Free online editor.",
  },
  "video-keyframe-extractor": {
    title: "Video Keyframe Extractor – Extract Keyframes Free Online",
    metaDescription:
      "Extract keyframes from video files as images. Free online keyframe extractor for MP4, MOV, AVI. Download keyframes as PNG or JPG.",
    h1: "Video Keyframe Extractor",
    intro:
      "Extract all keyframes from a video file and save them as individual images. Keyframes represent the most visually significant moments in a video and are ideal for generating previews, storyboards, or motion analysis datasets.",
    cardDescription:
      "Extract keyframes from video as images. Free online keyframe extractor.",
  },
  "video-frame-rate-analyzer": {
    title: "Video Frame Rate Analyzer – Check Video FPS Free Online",
    metaDescription:
      "Analyze the frame rate (FPS) of any video file. Free online video frame rate analyzer for MP4, MOV, AVI, MKV.",
    h1: "Video Frame Rate Analyzer",
    intro:
      "Instantly check the frame rate, duration, and frame count of any video file. Useful for verifying footage before editing, matching frame rates across clips, or diagnosing playback issues. No software needed.",
    cardDescription:
      "Check video frame rate and FPS. Free online frame rate analyzer.",
  },
  "video-resolution-analyzer": {
    title: "Video Resolution Analyzer – Check Video Resolution Free Online",
    metaDescription:
      "Check the resolution, aspect ratio, and dimensions of any video file. Free online video resolution analyzer for MP4, MOV, AVI.",
    h1: "Video Resolution Analyzer",
    intro:
      "Instantly inspect the resolution, dimensions, and aspect ratio of any video file. Confirm whether your footage is 1080p, 4K, or another resolution before editing, transcoding, or uploading to a platform.",
    cardDescription:
      "Check video resolution, dimensions, and aspect ratio. Free online analyzer.",
  },
  "video-frame-extractor": {
    title: "Video Frame Extractor – Extract Single Frames Free Online",
    metaDescription:
      "Extract individual frames from video files at any timestamp. Free online video frame extractor for MP4, MOV, AVI. Download as PNG.",
    h1: "Video Frame Extractor",
    intro:
      "Pull a specific frame from any point in a video and save it as a high-quality PNG or JPG image. Scrub to your exact timestamp and extract — useful for screenshots, thumbnails, reference images, and storyboarding.",
    cardDescription:
      "Extract individual frames from video at any timestamp. Free online extractor.",
  },
  "video-duration-cutter": {
    title: "Video Duration Cutter – Cut & Trim Video Duration Free Online",
    metaDescription:
      "Cut and trim video files to a specific duration. Free online video duration cutter for MP4, MOV, AVI, MKV. Fast in-browser trimming.",
    h1: "Video Duration Cutter",
    intro:
      "Trim your video to an exact duration by setting start and end points. Whether you need to cut a clip down for social media, remove a bad ending, or shorten a recording, this tool handles it quickly and entirely in your browser.",
    cardDescription:
      "Cut and trim video to a specific duration. Free online video cutter.",
  },
};

// ── Fallback SEO generator ────────────────────────────────────────────────────
function getSEO(slug) {
  if (SEO_MAP[slug]) return SEO_MAP[slug];
  const title = slugToTitle(slug);
  return {
    title: `${title} – Free Online Tool`,
    metaDescription: `Use our free online ${title.toLowerCase()} tool. Fast, easy, and no installation required.`,
    h1: title,
    intro: `Use this free online ${title.toLowerCase()} tool directly in your browser. No software installation required — simply upload your file, adjust the settings, and download the result instantly.`,
    cardDescription: `Free online ${title.toLowerCase()} tool. Fast and easy, no install needed.`,
  };
}

// ── Code generator ────────────────────────────────────────────────────────────

function generatePage(toolMeta) {
  const slug = fileToSlug(toolMeta.file);
  const componentName = slugToComponentName(slug);
  const seoComponentName = `${componentName}SEO`;
  const seo = getSEO(slug);
  const canonicalUrl = `${BASE_URL}${toolMeta.urlPrefix}/${slug}`;

  // Pick 8 other tools (mix of audio + video)
  const otherTools = pickOtherTools(slug, OTHER_TOOLS_COUNT);
  const toolsArray = otherTools
    .map((t) => {
      const tSlug = fileToSlug(t.file);
      const tSEO = getSEO(tSlug);
      return `  {
    name: "${slugToTitle(tSlug)}",
    description: "${tSEO.cardDescription}",
    href: "${t.urlPrefix}/${tSlug}",
  }`;
    })
    .join(",\n");

  // Breadcrumb last segment label
  const lastBreadcrumb = slugToTitle(slug);

  return `import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import ${componentName} from "@/components/${toolMeta.componentDir}/${slug}";
import ${seoComponentName} from "@/components/seo-content/${toolMeta.seoDir}/${slug}";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "${seo.title}",
  description: "${seo.metaDescription}",
  alternates: {
    canonical: "${canonicalUrl}",
  },
};

const tools = [
${toolsArray},
];

export default function ${componentName}Page() {
  return (
    <div className="flex flex-col gap-y-4 max-w-6xl">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="${toolMeta.urlPrefix}">${toolMeta.breadcrumbCategory}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="${toolMeta.urlPrefix}/${slug}">${lastBreadcrumb}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-3">${seo.h1}</h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          ${seo.intro}
        </p>
      </div>

      <${componentName} />

      <${seoComponentName} />

      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
`;
}

// ── Main ──────────────────────────────────────────────────────────────────────

let created = 0;
let skipped = 0;

for (const toolMeta of ALL_TOOLS) {
  const slug = fileToSlug(toolMeta.file);
  const category = toolMeta.urlPrefix.replace("/", ""); // "audio-tools" or "video-tools"
  const pageDir = path.join("app", category, slug);
  const pagePath = path.join(pageDir, "page.tsx");

  if (fs.existsSync(pagePath)) {
    console.log(`⏭  Skipped (exists): ${pagePath}`);
    skipped++;
    continue;
  }

  fs.mkdirSync(pageDir, { recursive: true });
  fs.writeFileSync(pagePath, generatePage(toolMeta), "utf8");
  console.log(`✅ Created: ${pagePath}`);
  created++;
}

console.log(
  `\nDone! Created: ${created} | Skipped: ${skipped} | Total: ${ALL_TOOLS.length}`,
);
