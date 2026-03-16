const fs = require("fs");
const path = require("path");

// Load your tools data from the JSON file
const toolsData = [
  {
    toolName: "audio-trimmer",
    description:
      "Trim or cut an audio file to a specific start and end time range, removing unwanted portions from the beginning or end.",
    h1: "Free Online Audio Trimmer – Cut Audio Files Instantly",
    p: "Trim any audio file to the exact duration you need. Upload your MP3, WAV, FLAC, or OGG file, set your start and end points, and download the trimmed audio in seconds — no software required.",
    metaTitle: "Audio Trimmer – Cut & Trim Audio Files Online Free",
    metaDescription:
      "Trim audio files online for free. Cut MP3, WAV, FLAC, and more to any time range instantly. No download or signup needed.",
    shortTailKeywords: "audio trimmer, cut audio, trim mp3",
    mediumTailKeywords:
      "online audio trimmer free, cut audio file online, trim mp3 online free, audio cutter no watermark",
    longTailKeywords:
      "how to trim an audio file online, free online mp3 cutter and trimmer, cut audio file to specific time, trim wav file without losing quality, best free audio trimmer online no signup",
  },
  {
    toolName: "audio-volume-adjuster",
    description:
      "Increase or decrease the volume (loudness) of an audio file by a specified decibel amount.",
    h1: "Online Audio Volume Adjuster – Increase or Decrease Loudness",
    p: "Easily boost or reduce the volume of any audio file online. Whether your audio is too quiet or too loud, adjust the decibel level and download the perfect result — no DAW needed.",
    metaTitle: "Audio Volume Adjuster – Change Audio Loudness Online Free",
    metaDescription:
      "Adjust the volume of audio files online. Boost or reduce loudness in MP3, WAV, FLAC and more. Free, fast, and no software needed.",
    shortTailKeywords:
      "audio volume adjuster, increase audio volume, mp3 volume booster",
    mediumTailKeywords:
      "boost audio volume online free, increase mp3 volume online, lower audio volume online, audio loudness adjuster tool",
    longTailKeywords:
      "how to increase volume of audio file online, make audio louder without distortion, free online mp3 volume booster tool, reduce audio volume without re-encoding, adjust audio decibel level online free",
  },
  {
    toolName: "audio-speed-changer",
    description:
      "Speed up or slow down audio playback rate while optionally preserving or adjusting pitch.",
    h1: "Audio Speed Changer – Speed Up or Slow Down Audio Online",
    p: "Change the playback speed of any audio file online. Perfect for podcasts, lectures, music practice, or language learning. Adjust speed without losing audio quality.",
    metaTitle: "Audio Speed Changer – Change Audio Playback Speed Online Free",
    metaDescription:
      "Speed up or slow down audio files online for free. Change MP3, WAV, and FLAC playback speed instantly. No software required.",
    shortTailKeywords: "audio speed changer, slow down audio, speed up mp3",
    mediumTailKeywords:
      "change audio speed online free, slow down mp3 online, speed up audio without changing pitch, audio tempo changer online",
    longTailKeywords:
      "how to slow down audio without changing pitch, speed up podcast audio online free, change mp3 playback speed online, slow down audio for transcription, free online audio speed changer tool",
  },
  {
    toolName: "audio-pitch-changer",
    description:
      "Shift the pitch of an audio file up or down by a specified number of semitones without changing speed.",
    h1: "Audio Pitch Changer – Shift Pitch Up or Down Online",
    p: "Transpose the pitch of any audio file online. Raise or lower the key of music, adjust vocal pitch, or create unique sound effects — all without changing the playback speed.",
    metaTitle: "Audio Pitch Changer – Change Audio Pitch Online Free",
    metaDescription:
      "Shift audio pitch up or down online for free. Change the key of MP3, WAV, and FLAC files without affecting speed. No install needed.",
    shortTailKeywords:
      "audio pitch changer, change pitch online, pitch shifter",
    mediumTailKeywords:
      "change audio pitch online free, shift mp3 pitch online, audio pitch shifter no software, transpose audio online",
    longTailKeywords:
      "how to change pitch of audio file online, shift audio pitch without changing speed, free online pitch shifter for music, change vocal pitch in mp3 online, transpose audio semitones online free",
  },
  {
    toolName: "audio-fade-in-out",
    description:
      "Apply smooth fade-in and fade-out effects to the beginning and/or end of an audio file.",
    h1: "Add Fade In & Fade Out to Audio – Free Online Tool",
    p: "Add professional fade-in and fade-out effects to any audio file online. Smooth transitions make your audio sound polished for music, podcasts, and video projects.",
    metaTitle: "Audio Fade In Fade Out – Add Fade Effects to Audio Online Free",
    metaDescription:
      "Add fade in and fade out effects to audio files online for free. Works with MP3, WAV, FLAC. Download instantly, no signup needed.",
    shortTailKeywords: "audio fade in out, fade audio online, add fade to mp3",
    mediumTailKeywords:
      "add fade in to audio online, add fade out effect audio, audio fade effect online free, apply fade to mp3 online",
    longTailKeywords:
      "how to add fade in to audio file online, add smooth fade out to mp3 free, fade in fade out audio editor online, apply audio fade effect without software, add fade transition to audio online free",
  },
  {
    toolName: "audio-normalizer",
    description:
      "Normalize the loudness of an audio file to a target level, balancing inconsistent volume throughout.",
    h1: "Audio Normalizer – Normalize Audio Loudness Online Free",
    p: "Normalize your audio files to a consistent loudness level online. Fix uneven volume across recordings, podcasts, and music tracks to meet broadcast standards instantly.",
    metaTitle: "Audio Normalizer – Normalize Audio Levels Online Free",
    metaDescription:
      "Normalize audio loudness online for free. Balance MP3, WAV, and FLAC audio levels to a consistent target. No software needed.",
    shortTailKeywords:
      "audio normalizer, normalize audio, audio level balancer",
    mediumTailKeywords:
      "normalize audio loudness online, audio normalization tool free, balance audio levels online, normalize mp3 volume online",
    longTailKeywords:
      "how to normalize audio levels online free, fix uneven audio volume online, audio loudness normalization to LUFS online, normalize podcast audio levels free, normalize audio for youtube online",
  },
  {
    toolName: "audio-mono-stereo-converter",
    description:
      "Convert audio between mono (single channel) and stereo (two channels) formats.",
    h1: "Mono to Stereo Audio Converter – Convert Audio Channels Online",
    p: "Convert audio files between mono and stereo formats online. Upmix mono recordings to stereo or downmix stereo tracks to mono for compatibility and file size optimization.",
    metaTitle:
      "Mono Stereo Audio Converter – Convert Audio Channels Online Free",
    metaDescription:
      "Convert audio between mono and stereo channels online for free. Works with MP3, WAV, FLAC, and more. Fast and easy, no software required.",
    shortTailKeywords:
      "mono to stereo converter, stereo to mono audio, audio channel converter",
    mediumTailKeywords:
      "convert mono audio to stereo online, stereo to mono converter free, audio channel converter online, change audio channels online free",
    longTailKeywords:
      "how to convert mono audio to stereo online free, convert stereo mp3 to mono online, mix stereo channels to mono audio, convert audio channel count online, mono to stereo audio upmix free",
  },
  {
    toolName: "audio-sample-rate-converter",
    description:
      "Resample an audio file to a different sample rate (e.g., 44100 Hz, 48000 Hz, 22050 Hz).",
    h1: "Audio Sample Rate Converter – Resample Audio Online Free",
    p: "Change the sample rate of any audio file online. Convert between 44.1 kHz, 48 kHz, 22.05 kHz and more to meet platform requirements or optimize file size and quality.",
    metaTitle: "Audio Sample Rate Converter – Change Sample Rate Online Free",
    metaDescription:
      "Convert audio sample rate online for free. Resample MP3, WAV, FLAC files to 44100, 48000 Hz and more. No installation needed.",
    shortTailKeywords:
      "audio sample rate converter, resample audio, change sample rate",
    mediumTailKeywords:
      "change audio sample rate online, convert audio to 44100hz online, resample audio file online free, audio frequency converter online",
    longTailKeywords:
      "how to change audio sample rate online free, convert audio sample rate to 48000hz, resample wav file to 44100hz online, change audio hz online without software, audio resampling tool online free",
  },
  {
    toolName: "audio-bitrate-changer",
    description:
      "Change the bitrate of an audio file to adjust the balance between file size and audio quality.",
    h1: "Audio Bitrate Changer – Change MP3 Bitrate Online Free",
    p: "Adjust the bitrate of any audio file online. Increase bitrate for higher quality or reduce it to compress file size — perfect for streaming, uploads, and storage optimization.",
    metaTitle: "Audio Bitrate Changer – Change Audio Bitrate Online Free",
    metaDescription:
      "Change audio bitrate online for free. Increase or decrease MP3, AAC, OGG bitrate to balance quality and file size. Fast and easy.",
    shortTailKeywords:
      "audio bitrate changer, change mp3 bitrate, audio quality changer",
    mediumTailKeywords:
      "change audio bitrate online free, increase mp3 bitrate online, reduce audio bitrate online, audio compression bitrate tool",
    longTailKeywords:
      "how to change mp3 bitrate online for free, increase audio bitrate without re-recording, reduce audio file size by changing bitrate, best bitrate for mp3 audio online, convert audio to 320kbps online free",
  },
  {
    toolName: "audio-compressor",
    description:
      "Reduce the file size of an audio file while preserving as much audio quality as possible.",
    h1: "Audio File Compressor – Compress Audio Files Online Free",
    p: "Compress large audio files online without sacrificing quality. Reduce MP3, WAV, FLAC and AAC file sizes for faster uploads, sharing, and storage savings — in seconds.",
    metaTitle: "Audio Compressor – Compress Audio Files Online Free",
    metaDescription:
      "Compress audio files online for free. Reduce MP3, WAV, FLAC file sizes without losing quality. No signup or software needed.",
    shortTailKeywords: "audio compressor, compress audio, reduce audio size",
    mediumTailKeywords:
      "compress audio file online free, reduce mp3 file size online, audio file size reducer online, compress wav file online",
    longTailKeywords:
      "how to compress audio file without losing quality, reduce audio file size for email online, compress mp3 online for free no signup, make audio file smaller online, best free online audio compressor tool",
  },
  {
    toolName: "audio-silence-remover",
    description:
      "Automatically detect and remove silent or near-silent sections from an audio file.",
    h1: "Remove Silence From Audio – Online Silence Remover Tool",
    p: "Automatically strip silent gaps and pauses from your audio files online. Speed up podcasts, lectures, and recordings by removing dead air with a single click.",
    metaTitle: "Audio Silence Remover – Remove Silence From Audio Online Free",
    metaDescription:
      "Remove silence from audio files online for free. Auto-detect and cut silent gaps in MP3, WAV, and FLAC. Save time on podcasts and lectures.",
    shortTailKeywords:
      "remove silence from audio, silence remover, cut silence audio",
    mediumTailKeywords:
      "remove silence from audio online free, auto silence remover mp3, cut dead air from audio, trim silence from podcast online",
    longTailKeywords:
      "how to remove silence from audio file automatically, free online tool to remove silence from mp3, cut out silent pauses in audio recording, auto remove dead air from podcast online, silence trimmer for audio files online free",
  },
  {
    toolName: "audio-reverse",
    description: "Reverse an audio file so it plays from end to beginning.",
    h1: "Reverse Audio Online – Play Audio Backwards Free",
    p: "Flip any audio file and play it backwards online. Create unique sound effects, explore hidden audio, or produce creative music tracks with our free reverse audio tool.",
    metaTitle: "Reverse Audio – Play Audio Backwards Online Free",
    metaDescription:
      "Reverse audio files online for free. Play MP3, WAV, and FLAC backwards instantly. No software or signup required.",
    shortTailKeywords: "reverse audio, play audio backwards, audio reverser",
    mediumTailKeywords:
      "reverse audio online free, play mp3 backwards online, audio reverse tool free, flip audio file online",
    longTailKeywords:
      "how to reverse an audio file online free, play music backwards online tool, reverse mp3 file online no signup, create backwards audio effect online, reverse audio for sound effects online",
  },
  {
    toolName: "audio-loop-maker",
    description:
      "Loop an audio segment a specified number of times to create a seamlessly repeating audio file.",
    h1: "Audio Loop Maker – Create Seamless Audio Loops Online Free",
    p: "Create perfect audio loops online from any audio file. Repeat segments for background music, game audio, ambiance tracks, and more — exported as a single seamless file.",
    metaTitle: "Audio Loop Maker – Create Audio Loops Online Free",
    metaDescription:
      "Create audio loops online for free. Repeat and loop MP3, WAV, and FLAC audio segments seamlessly. Download your loop instantly.",
    shortTailKeywords: "audio loop maker, create audio loop, loop mp3 online",
    mediumTailKeywords:
      "create audio loop online free, make seamless audio loop, loop mp3 file online, audio loop generator free online",
    longTailKeywords:
      "how to make an audio loop online free, create seamless looping audio file, loop mp3 multiple times online, make background music loop online, audio loop maker for game sounds free",
  },
  {
    toolName: "audio-splitter",
    description:
      "Split a single audio file into multiple segments based on time intervals or custom split points.",
    h1: "Audio Splitter – Split Audio Files Into Multiple Parts Online",
    p: "Split long audio files into multiple parts online. Define your split points by time or split evenly into equal segments — perfect for albums, interviews, and podcasts.",
    metaTitle: "Audio Splitter – Split Audio Files Online Free",
    metaDescription:
      "Split audio files online for free. Divide MP3, WAV, FLAC into multiple parts by time or custom points. No software needed.",
    shortTailKeywords: "audio splitter, split audio file, divide mp3",
    mediumTailKeywords:
      "split audio file online free, divide mp3 into parts online, audio file splitter tool, split wav file by time online",
    longTailKeywords:
      "how to split an audio file into parts online free, split mp3 by time interval online, divide audio file into equal segments, audio chapter splitter online free, split podcast audio file into clips",
  },
  {
    toolName: "audio-merger",
    description:
      "Combine two or more audio files into a single continuous audio file.",
    h1: "Audio Merger – Merge Multiple Audio Files Into One Online",
    p: "Join multiple audio files into one seamlessly online. Combine MP3s, WAV files, podcasts, voice recordings and more into a single download — fast and free.",
    metaTitle: "Audio Merger – Combine Audio Files Online Free",
    metaDescription:
      "Merge multiple audio files into one online for free. Join MP3, WAV, FLAC tracks seamlessly. No software or signup required.",
    shortTailKeywords: "audio merger, merge audio files, combine mp3 online",
    mediumTailKeywords:
      "merge audio files online free, combine mp3 files into one, join audio files online, audio file joiner free online",
    longTailKeywords:
      "how to merge audio files into one online free, combine multiple mp3 files into one, join wav files together online, merge podcast audio files free, audio joiner online no watermark",
  },
  {
    toolName: "audio-equalizer-basic",
    description:
      "Apply basic equalization to an audio file by adjusting bass and treble frequency levels.",
    h1: "Online Audio Equalizer – Adjust Bass & Treble Free",
    p: "Boost or cut bass and treble frequencies in any audio file online. Enhance the tone of music, voice recordings, and podcasts without any audio software.",
    metaTitle: "Audio Equalizer Online – Adjust Bass and Treble Free",
    metaDescription:
      "Equalize audio online for free. Adjust bass and treble levels in MP3, WAV, and FLAC files. Simple EQ tool, no installation required.",
    shortTailKeywords:
      "audio equalizer online, adjust bass treble, eq audio online",
    mediumTailKeywords:
      "online audio equalizer free, boost bass in mp3 online, adjust treble in audio file, basic eq tool for audio online",
    longTailKeywords:
      "how to equalize audio online for free, boost bass in mp3 without software, online audio eq bass treble adjuster, improve audio quality with equalizer online, free online eq tool for voice recordings",
  },
  {
    toolName: "audio-channel-remover",
    description:
      "Remove the left or right channel from a stereo audio file to isolate a single channel.",
    h1: "Remove Audio Channel – Delete Left or Right Channel Online",
    p: "Remove the left or right audio channel from any stereo file online. Isolate a single channel for karaoke creation, audio analysis, or mixing purposes.",
    metaTitle:
      "Audio Channel Remover – Remove Left or Right Audio Channel Online",
    metaDescription:
      "Remove left or right audio channel online for free. Isolate audio channels in MP3, WAV, FLAC files instantly. No software needed.",
    shortTailKeywords:
      "remove audio channel, delete audio channel, channel remover",
    mediumTailKeywords:
      "remove left audio channel online, delete right channel from stereo audio, audio channel remover free, isolate audio channel online",
    longTailKeywords:
      "how to remove left channel from stereo audio online, delete right audio channel from mp3 online free, isolate single audio channel online, remove vocal channel from audio file, strip audio channel from stereo file free",
  },
  {
    toolName: "audio-loudness-meter",
    description:
      "Measure and analyze the loudness, peak levels, and dynamic range of an audio file.",
    h1: "Audio Loudness Meter – Analyze Audio Loudness & Peak Levels",
    p: "Measure the loudness and peak levels of any audio file online. Get LUFS, RMS, and true peak readings instantly to ensure your audio meets streaming and broadcast standards.",
    metaTitle: "Audio Loudness Meter – Measure Audio Loudness Online Free",
    metaDescription:
      "Measure audio loudness online for free. Analyze LUFS, RMS, and peak levels in MP3, WAV, FLAC. Perfect for streaming platforms and broadcast.",
    shortTailKeywords:
      "audio loudness meter, measure audio loudness, LUFS meter",
    mediumTailKeywords:
      "audio loudness analyzer online, measure LUFS online free, audio peak level meter online, check audio loudness for streaming",
    longTailKeywords:
      "how to measure audio loudness in LUFS online, check audio loudness for Spotify free, measure true peak level of audio file, audio loudness meter for broadcast standards online, LUFS RMS analyzer online free",
  },
  {
    toolName: "audio-waveform-generator",
    description:
      "Generate a visual waveform image from an audio file showing the amplitude over time.",
    h1: "Audio Waveform Generator – Visualize Audio Waveform Online Free",
    p: "Generate a visual waveform image from any audio file online. Download beautiful waveform graphics for podcasts, music players, social media posts, and audio presentations.",
    metaTitle: "Audio Waveform Generator – Generate Audio Waveform Image Free",
    metaDescription:
      "Generate audio waveform images online for free. Visualize MP3, WAV, FLAC waveforms as PNG graphics. Perfect for podcasts and music promotion.",
    shortTailKeywords:
      "audio waveform generator, waveform visualizer, mp3 waveform",
    mediumTailKeywords:
      "generate audio waveform image online, audio waveform visualizer free, waveform generator for podcast, mp3 waveform image creator online",
    longTailKeywords:
      "how to generate audio waveform image online free, create waveform visualization from audio file, audio waveform PNG generator online, waveform image for podcast cover art, visualize mp3 waveform online free",
  },
  {
    toolName: "audio-frequency-analyzer",
    description:
      "Analyze and display the frequency spectrum of an audio file to identify dominant frequencies.",
    h1: "Audio Frequency Analyzer – Analyze Frequency Spectrum Online",
    p: "Analyze the frequency content of any audio file online. Visualize the full spectrum from bass to treble, identify problem frequencies, and optimize your audio mix.",
    metaTitle:
      "Audio Frequency Analyzer – Analyze Audio Frequency Spectrum Free",
    metaDescription:
      "Analyze audio frequency spectrum online for free. View frequency content of MP3, WAV, and FLAC files. Ideal for mixing and mastering.",
    shortTailKeywords:
      "audio frequency analyzer, frequency spectrum analyzer, audio spectrum tool",
    mediumTailKeywords:
      "analyze audio frequency online free, audio spectrum analyzer tool, frequency analysis of audio file, audio FFT analyzer online",
    longTailKeywords:
      "how to analyze audio frequency spectrum online, view frequency content of mp3 online free, audio spectrum analyzer for mixing online, identify dominant frequencies in audio, free online FFT audio frequency analyzer",
  },
  {
    toolName: "audio-thumbnail-generator",
    description:
      "Generate a short preview clip (audio thumbnail) from a longer audio file for quick previewing.",
    h1: "Audio Preview Generator – Create Short Audio Clips Online",
    p: "Generate short preview clips from any audio file online. Create 15–30 second samples for music stores, streaming platforms, podcast teasers, and audio previews.",
    metaTitle: "Audio Preview Generator – Create Audio Preview Clips Free",
    metaDescription:
      "Generate audio preview clips online for free. Create short sample excerpts from MP3, WAV, FLAC files for music stores and streaming. No signup needed.",
    shortTailKeywords:
      "audio preview generator, audio sample creator, mp3 preview clip",
    mediumTailKeywords:
      "create audio preview clip online, generate mp3 sample free, audio teaser clip maker online, short audio clip generator free",
    longTailKeywords:
      "how to create audio preview clip online free, generate short sample from mp3 for music store, create podcast teaser clip from audio, make 30 second audio preview online, audio thumbnail clip generator free online",
  },
  {
    toolName: "audio-metadata-editor",
    description:
      "View and edit embedded metadata tags in audio files such as title, artist, album, genre, and year.",
    h1: "Audio Metadata Editor – Edit MP3 Tags & Audio Info Online",
    p: "Edit audio file metadata online. Update the title, artist, album, genre, year, and other ID3 tags in MP3, FLAC, and OGG files without any software.",
    metaTitle:
      "Audio Metadata Editor – Edit MP3 Tags and Audio Metadata Online Free",
    metaDescription:
      "Edit audio metadata and MP3 tags online for free. Update title, artist, album, and genre in MP3, FLAC, OGG files. No software needed.",
    shortTailKeywords: "audio metadata editor, edit mp3 tags, ID3 tag editor",
    mediumTailKeywords:
      "edit mp3 metadata online free, audio tag editor online, change song metadata online, ID3 tag editor online free",
    longTailKeywords:
      "how to edit mp3 metadata online for free, change artist and album tags in mp3 online, free online ID3 tag editor for audio files, edit audio file info title artist album online, fix wrong song metadata online free",
  },
  {
    toolName: "audio-cover-art-adder",
    description:
      "Embed album cover artwork image into an audio file's metadata.",
    h1: "Add Cover Art to Audio – Embed Album Art Online Free",
    p: "Embed album artwork directly into your audio files online. Add cover images to MP3, FLAC, and OGG files so they display correctly in music players and streaming apps.",
    metaTitle: "Add Cover Art to Audio – Embed Album Artwork Online Free",
    metaDescription:
      "Add album cover art to audio files online for free. Embed artwork into MP3, FLAC, and OGG files. No software or signup required.",
    shortTailKeywords:
      "add cover art to audio, embed album art, mp3 cover art adder",
    mediumTailKeywords:
      "add album art to mp3 online free, embed cover image in audio file, add cover art to flac online, mp3 album artwork embedder online",
    longTailKeywords:
      "how to add cover art to mp3 file online free, embed album artwork into audio file online, add image to mp3 metadata online, attach cover art to flac file free, embed jpg as mp3 album art online",
  },
  {
    toolName: "audio-cover-art-extractor",
    description:
      "Extract and download the embedded cover art image from an audio file's metadata.",
    h1: "Extract Cover Art From Audio – Audio Artwork Extractor Online",
    p: "Extract embedded album artwork from any audio file online. Download the cover image from MP3, FLAC, and OGG files as a JPEG or PNG in seconds.",
    metaTitle:
      "Audio Cover Art Extractor – Extract Album Art From Audio Online Free",
    metaDescription:
      "Extract cover art from audio files online for free. Download embedded album artwork from MP3, FLAC, and OGG as images. No software needed.",
    shortTailKeywords:
      "extract cover art, audio artwork extractor, mp3 cover art extractor",
    mediumTailKeywords:
      "extract album art from mp3 online, download cover art from audio file, extract embedded image from audio, audio cover art downloader online",
    longTailKeywords:
      "how to extract cover art from mp3 file online free, download album artwork from flac online, extract embedded album image from audio file, save cover art from mp3 as jpeg free, extract music cover art online tool",
  },
  {
    toolName: "audio-track-extractor",
    description:
      "Extract the audio track from a media container file such as MP4, MKV, or AVI.",
    h1: "Extract Audio Track – Pull Audio From Video Files Online Free",
    p: "Extract the audio track from any video or media container file online. Pull audio from MP4, MKV, AVI, and MOV files and download it as MP3, WAV, or FLAC.",
    metaTitle: "Audio Track Extractor – Extract Audio From Video Online Free",
    metaDescription:
      "Extract audio tracks from video files online for free. Pull MP3 or WAV audio from MP4, MKV, MOV, and AVI. No software needed.",
    shortTailKeywords:
      "extract audio from video, audio track extractor, mp4 to mp3",
    mediumTailKeywords:
      "extract audio from mp4 online free, pull audio track from video online, audio extractor from video file, convert video to audio online free",
    longTailKeywords:
      "how to extract audio track from mp4 online free, pull audio from mkv file online, extract mp3 audio from video without software, convert video file to audio online free, extract audio track from avi online tool",
  },
  {
    toolName: "audio-format-converter",
    description:
      "Convert audio files between popular formats including MP3, WAV, FLAC, OGG, and AAC.",
    h1: "Audio Format Converter – Convert Audio Files Online Free",
    p: "Convert audio files between all major formats online. Transform MP3, WAV, FLAC, OGG, and AAC files instantly with no quality loss and no software required.",
    metaTitle:
      "Audio Format Converter – Convert MP3, WAV, FLAC, OGG Online Free",
    metaDescription:
      "Convert audio format online for free. Change MP3 to WAV, FLAC to MP3, OGG to AAC and more. Fast, free, no signup required.",
    shortTailKeywords:
      "audio format converter, convert mp3 to wav, audio converter online",
    mediumTailKeywords:
      "convert audio format online free, mp3 to wav converter online, flac to mp3 online converter, audio file format changer free",
    longTailKeywords:
      "how to convert mp3 to wav online free, convert flac to mp3 without losing quality, free online audio format converter no signup, convert ogg to mp3 online free, best online audio file converter tool",
  },
  {
    toolName: "audio-clip-maker",
    description:
      "Create small audio clips from a longer audio file by selecting a start and end time.",
    h1: "Audio Clip Maker – Create Short Audio Clips Online Free",
    p: "Cut out and save short clips from long audio files online. Select any start and end point to create shareable audio snippets perfect for social media, ringtones, and samples.",
    metaTitle: "Audio Clip Maker – Make Short Audio Clips Online Free",
    metaDescription:
      "Create short audio clips online for free. Extract snippets from MP3, WAV, and FLAC files. Perfect for ringtones and social media. No signup needed.",
    shortTailKeywords: "audio clip maker, create audio clip, mp3 clip cutter",
    mediumTailKeywords:
      "make audio clip online free, create short mp3 clip online, audio snippet creator online, cut audio clip from song free",
    longTailKeywords:
      "how to make short audio clip from song online free, create ringtone from mp3 online, extract audio snippet from recording online, make short audio clip for instagram online, free online audio clip cutter tool",
  },
  {
    toolName: "audio-resampler",
    description:
      "Change the sampling resolution (bit depth) of an audio file for compatibility or quality adjustment.",
    h1: "Audio Resampler – Change Audio Bit Depth & Resolution Online",
    p: "Change the audio sampling resolution and bit depth of any audio file online. Convert between 16-bit, 24-bit, and 32-bit audio for professional and consumer compatibility.",
    metaTitle: "Audio Resampler – Change Audio Bit Depth Online Free",
    metaDescription:
      "Resample audio and change bit depth online for free. Convert audio resolution between 16-bit, 24-bit, 32-bit. Works with WAV, FLAC, and more.",
    shortTailKeywords:
      "audio resampler, change bit depth, audio resolution changer",
    mediumTailKeywords:
      "change audio bit depth online free, resample audio file online, audio sampling resolution converter, convert 24 bit to 16 bit audio online",
    longTailKeywords:
      "how to change audio bit depth online free, convert 24 bit wav to 16 bit online, change audio sampling resolution online, resample audio for compatibility online, audio bit depth converter online free",
  },
  {
    toolName: "audio-gain-analyzer",
    description:
      "Analyze and report the gain levels and peak amplitudes of an audio file.",
    h1: "Audio Gain Analyzer – Analyze Gain & Peak Levels Online Free",
    p: "Analyze the gain and peak amplitude of any audio file online. Get instant gain level readings to help with normalization, mixing, and mastering decisions.",
    metaTitle: "Audio Gain Analyzer – Measure Audio Gain Levels Online Free",
    metaDescription:
      "Analyze audio gain and peak levels online for free. Measure amplitude in MP3, WAV, and FLAC files. Fast, accurate, no software needed.",
    shortTailKeywords:
      "audio gain analyzer, measure audio gain, peak level analyzer",
    mediumTailKeywords:
      "analyze audio gain online free, audio peak level detector online, measure audio amplitude online, gain level meter for audio free",
    longTailKeywords:
      "how to analyze gain level of audio file online, measure peak amplitude in audio free, audio gain and peak level analyzer online, check audio gain before normalizing online, free audio gain measurement tool online",
  },
  {
    toolName: "audio-channel-splitter",
    description:
      "Split a stereo audio file into two separate mono audio files, one for the left channel and one for the right.",
    h1: "Split Stereo Audio Channels – Separate Left & Right Channel Online",
    p: "Split any stereo audio file into separate left and right channel mono files online. Useful for audio analysis, remixing, and isolating individual tracks.",
    metaTitle:
      "Stereo Channel Splitter – Split Audio Into Left & Right Channels Online Free",
    metaDescription:
      "Split stereo audio into separate left and right channels online for free. Export mono files from MP3, WAV, FLAC. No software required.",
    shortTailKeywords:
      "stereo channel splitter, split audio channels, left right channel separator",
    mediumTailKeywords:
      "split stereo audio into mono online, separate left right audio channels online, stereo to dual mono audio splitter, split audio channels online free",
    longTailKeywords:
      "how to split stereo audio into left and right channels online free, separate stereo audio channels to mono files, extract left channel from stereo mp3 online, split stereo wav into two mono tracks, dual mono audio channel extractor online",
  },
  {
    toolName: "audio-sample-extractor",
    description:
      "Extract raw audio sample data from an audio file for analysis or processing purposes.",
    h1: "Audio Sample Extractor – Extract Raw Audio Samples Online",
    p: "Extract raw audio samples and PCM data from audio files online. Ideal for audio researchers, developers, and engineers needing low-level access to audio waveform data.",
    metaTitle: "Audio Sample Extractor – Extract Raw Audio Samples Online Free",
    metaDescription:
      "Extract raw audio samples from audio files online for free. Access PCM data from MP3, WAV, and FLAC files for analysis and development.",
    shortTailKeywords:
      "audio sample extractor, extract audio samples, raw audio data",
    mediumTailKeywords:
      "extract audio samples online free, raw PCM audio extractor, audio waveform data extractor, extract audio data from wav file",
    longTailKeywords:
      "how to extract raw audio samples from wav file online, get PCM data from audio file online free, audio sample extraction tool for developers, extract raw waveform data from mp3 online, audio data extractor for analysis free",
  },
  {
    toolName: "video-thumbnail-generator",
    description:
      "Extract thumbnail images from a video file at specified timestamps.",
    h1: "Video Thumbnail Generator – Extract Thumbnails From Video Online",
    p: "Generate thumbnail images from any video file online. Extract frames as JPEG or PNG at custom timestamps — perfect for YouTube thumbnails, previews, and video covers.",
    metaTitle:
      "Video Thumbnail Generator – Extract Video Thumbnails Online Free",
    metaDescription:
      "Generate video thumbnails online for free. Extract frames from MP4, AVI, MKV as images. Create YouTube thumbnails and previews instantly.",
    shortTailKeywords:
      "video thumbnail generator, extract thumbnail from video, video screenshot tool",
    mediumTailKeywords:
      "generate video thumbnail online free, extract frame from video as image, create youtube thumbnail from video, video screenshot extractor online",
    longTailKeywords:
      "how to extract thumbnail from video online free, generate youtube thumbnail from mp4 online, capture screenshot from video at specific time, extract frame from video as jpg online, free video thumbnail maker from video file",
  },
  {
    toolName: "video-frame-extractor",
    description:
      "Export individual frames from a video file as image files (JPEG or PNG).",
    h1: "Video Frame Extractor – Extract Frames From Video Online Free",
    p: "Extract individual frames from any video as high-quality images online. Export frames from MP4, MKV, AVI and more as JPEG or PNG — no video editing software needed.",
    metaTitle:
      "Video Frame Extractor – Extract Video Frames as Images Online Free",
    metaDescription:
      "Extract frames from video online for free. Export individual frames from MP4, MKV, AVI as JPEG or PNG images. Fast and easy, no software needed.",
    shortTailKeywords:
      "video frame extractor, extract frames from video, video to image",
    mediumTailKeywords:
      "extract video frames as images online, video frame to jpg online free, export frames from mp4 online, capture specific frame from video free",
    longTailKeywords:
      "how to extract frames from video online free, export individual frames from mp4 as images, capture video frame as jpg online free, extract image from specific moment in video, video to image frame extractor online free",
  },
  {
    toolName: "video-keyframe-extractor",
    description:
      "Extract only the keyframes (I-frames) from a video file to analyze or summarize content.",
    h1: "Video Keyframe Extractor – Extract Keyframes From Video Online",
    p: "Extract keyframes from any video online. Get only the important I-frames that represent scene changes and key moments — perfect for content analysis, indexing, and summarization.",
    metaTitle: "Video Keyframe Extractor – Extract Keyframes Online Free",
    metaDescription:
      "Extract keyframes from video online for free. Get I-frames from MP4, MKV, AVI for content analysis and scene detection. No software needed.",
    shortTailKeywords:
      "keyframe extractor, extract keyframes from video, video I-frame extractor",
    mediumTailKeywords:
      "extract keyframes from video online free, video keyframe detector online, get I-frames from mp4 online, keyframe image extractor free online",
    longTailKeywords:
      "how to extract keyframes from video online free, extract I-frames from mp4 for analysis, video scene change keyframe extractor online, get important frames from video online, video content analysis keyframe tool free",
  },
  {
    toolName: "video-speed-changer",
    description:
      "Speed up or slow down a video file while maintaining audio-video sync.",
    h1: "Video Speed Changer – Speed Up or Slow Down Video Online Free",
    p: "Change the playback speed of any video online. Create slow-motion effects, timelapse-style videos, or speed up long recordings — all with synced audio and no quality loss.",
    metaTitle: "Video Speed Changer – Change Video Speed Online Free",
    metaDescription:
      "Change video speed online for free. Speed up or slow down MP4, AVI, MKV videos. Create slow-motion or fast-forward effects instantly.",
    shortTailKeywords:
      "video speed changer, change video speed, slow motion video",
    mediumTailKeywords:
      "change video speed online free, slow down video online, speed up video online free, video tempo changer online",
    longTailKeywords:
      "how to change video playback speed online free, slow down video without losing quality, speed up video for timelapse effect online, make slow motion video from mp4 online free, change video speed and keep audio sync",
  },
  {
    toolName: "video-bitrate-changer",
    description:
      "Adjust the bitrate of a video file to control compression level and output file size.",
    h1: "Video Bitrate Changer – Adjust Video Bitrate Online Free",
    p: "Change the video bitrate of any file online. Reduce bitrate to shrink file size or increase it for higher quality — great for optimizing video for streaming, upload, or storage.",
    metaTitle: "Video Bitrate Changer – Change Video Bitrate Online Free",
    metaDescription:
      "Change video bitrate online for free. Increase or decrease MP4, AVI, MKV bitrate for file size and quality control. No software needed.",
    shortTailKeywords:
      "video bitrate changer, change video bitrate, reduce video bitrate",
    mediumTailKeywords:
      "change video bitrate online free, reduce video bitrate online, increase video quality bitrate online, video compression bitrate adjuster",
    longTailKeywords:
      "how to change video bitrate online for free, reduce video bitrate to compress file, increase video bitrate for better quality online, adjust video bitrate for streaming upload, best bitrate for mp4 video online free",
  },
  {
    toolName: "video-compressor-simple",
    description:
      "Compress a video file to reduce its size while maintaining acceptable visual quality.",
    h1: "Video Compressor – Compress Video Files Online Free",
    p: "Compress large video files online without sacrificing too much quality. Reduce MP4, MKV, AVI file sizes for easy sharing via email, WhatsApp, and social media — in seconds.",
    metaTitle: "Video Compressor – Compress Video Files Online Free",
    metaDescription:
      "Compress video files online for free. Reduce MP4, AVI, MKV file sizes for email and social sharing. No signup or software required.",
    shortTailKeywords:
      "video compressor, compress video online, reduce video size",
    mediumTailKeywords:
      "compress video file online free, reduce mp4 file size online, video file size reducer free, compress video for whatsapp online",
    longTailKeywords:
      "how to compress video file without losing quality, reduce mp4 size for email online free, compress video for whatsapp upload free, make video file smaller online no software, best free online video compressor tool",
  },
  {
    toolName: "video-frame-rate-analyzer",
    description:
      "Detect and report the frame rate (FPS) and frame timing information of a video file.",
    h1: "Video Frame Rate Analyzer – Detect Video FPS Online Free",
    p: "Analyze the frame rate of any video file online. Detect FPS, variable frame rates, and frame timing instantly — useful for editing, streaming, and compatibility checking.",
    metaTitle: "Video Frame Rate Analyzer – Check Video FPS Online Free",
    metaDescription:
      "Analyze video frame rate online for free. Detect FPS, frame timing, and frame count in MP4, AVI, MKV. Instant results, no software needed.",
    shortTailKeywords:
      "video frame rate analyzer, check video FPS, detect video frame rate",
    mediumTailKeywords:
      "detect video frame rate online free, check fps of video online, video FPS analyzer tool, measure video frame timing online",
    longTailKeywords:
      "how to check video frame rate online free, detect fps of mp4 file online, video frame rate and timing analyzer, check if video is 24 30 or 60fps online, variable frame rate detector online free",
  },
  {
    toolName: "video-duration-cutter",
    description:
      "Remove the beginning or ending portion of a video file without re-encoding.",
    h1: "Video Duration Cutter – Cut Video Start or End Online Free",
    p: "Cut unwanted parts from the beginning or end of any video online. Trim video duration quickly without full re-encoding for fast, lossless results.",
    metaTitle: "Video Duration Cutter – Cut Video Start and End Online Free",
    metaDescription:
      "Cut video duration online for free. Remove beginning or end of MP4, AVI, MKV files quickly. No software required.",
    shortTailKeywords:
      "video duration cutter, cut video online, trim video free",
    mediumTailKeywords:
      "cut start of video online free, remove end of video online, video trimmer online free, cut video duration without re-encoding",
    longTailKeywords:
      "how to cut beginning of video online free, remove intro from video online, trim end of mp4 video online free, cut video file to shorter duration, remove first few seconds of video online free",
  },
  {
    toolName: "video-frame-sequence-exporter",
    description:
      "Convert a video file into a sequence of image frames exported as individual files.",
    h1: "Export Video as Image Sequence – Frame Sequence Exporter Online",
    p: "Convert any video into an image frame sequence online. Export every frame as individual JPEG or PNG files — ideal for animation, motion analysis, and visual effects work.",
    metaTitle:
      "Video Frame Sequence Exporter – Convert Video to Image Sequence Online Free",
    metaDescription:
      "Export video as image sequence online for free. Convert MP4, AVI, MKV to individual JPEG/PNG frames. No software installation needed.",
    shortTailKeywords:
      "video to image sequence, frame sequence exporter, video to frames",
    mediumTailKeywords:
      "export video as image sequence online, convert video to frame sequence free, video to jpg sequence online, extract all frames from video online",
    longTailKeywords:
      "how to convert video to image sequence online free, export every frame from video as jpeg, video to png frame sequence converter online, extract all frames from mp4 as images, convert video file to image sequence online free",
  },
  {
    toolName: "video-frame-sequence-to-video",
    description:
      "Compile a sequence of image files into a video file at a specified frame rate.",
    h1: "Image Sequence to Video – Convert Frame Sequence to Video Online",
    p: "Turn a series of images into a video online. Upload your PNG or JPEG frame sequence, set the frame rate, and compile it into a smooth MP4 video instantly.",
    metaTitle:
      "Image Sequence to Video – Convert Image Frames to Video Online Free",
    metaDescription:
      "Convert image sequence to video online for free. Compile JPEG or PNG frames into MP4 at any frame rate. No software or signup needed.",
    shortTailKeywords:
      "image sequence to video, frames to video converter, png to mp4",
    mediumTailKeywords:
      "convert image sequence to video online, compile frames into video free, png sequence to mp4 online, image frames to video maker free",
    longTailKeywords:
      "how to convert image sequence to video online free, compile jpeg frames into mp4 online, create video from image sequence free, png to video frame sequence compiler, animation image sequence to video online",
  },
  {
    toolName: "video-audio-sync-fixer",
    description:
      "Fix audio and video synchronization issues by adjusting the audio delay in a video file.",
    h1: "Fix Audio Video Sync – Audio Delay Fixer for Video Online",
    p: "Fix out-of-sync audio in any video file online. Adjust the audio delay forward or backward to perfectly align sound and picture — no video editor required.",
    metaTitle: "Video Audio Sync Fixer – Fix Audio Delay in Video Online Free",
    metaDescription:
      "Fix audio video sync issues online for free. Adjust audio delay in MP4, AVI, MKV to resync sound and picture. No software needed.",
    shortTailKeywords:
      "audio video sync fixer, fix audio delay, video sync tool",
    mediumTailKeywords:
      "fix audio video sync online free, adjust audio delay in video, video audio out of sync fixer, sync audio and video online free",
    longTailKeywords:
      "how to fix audio video sync online free, adjust audio delay in mp4 online, video audio out of sync how to fix online, resync audio track in video file free, fix audio lag in video file online free",
  },
  {
    toolName: "video-metadata-editor",
    description:
      "Edit metadata fields embedded in a video file such as title, author, description, and date.",
    h1: "Video Metadata Editor – Edit Video Tags & Info Online Free",
    p: "Edit the metadata embedded in any video file online. Update title, description, author, date, and other fields in MP4, MKV, and AVI files without any software.",
    metaTitle: "Video Metadata Editor – Edit Video Metadata Online Free",
    metaDescription:
      "Edit video metadata online for free. Update title, author, description in MP4, MKV, AVI files instantly. No software or signup needed.",
    shortTailKeywords:
      "video metadata editor, edit video tags, video info editor",
    mediumTailKeywords:
      "edit video metadata online free, change video file info online, video tag editor online, update mp4 metadata online free",
    longTailKeywords:
      "how to edit video metadata online for free, change title of mp4 file online, update video file tags without software, edit video description metadata online, remove or update video author metadata online",
  },
  {
    toolName: "video-metadata-remover",
    description:
      "Strip all embedded metadata from a video file to protect privacy and reduce file size.",
    h1: "Remove Video Metadata – Strip Video Tags & Info Online Free",
    p: "Remove all metadata from video files online. Strip GPS data, timestamps, author info, and other embedded tags from MP4, MKV, and AVI to protect your privacy.",
    metaTitle: "Video Metadata Remover – Strip Video Metadata Online Free",
    metaDescription:
      "Remove video metadata online for free. Strip all tags and private info from MP4, MKV, AVI files. Protect privacy with one click.",
    shortTailKeywords:
      "remove video metadata, strip video tags, video metadata remover",
    mediumTailKeywords:
      "remove metadata from video online free, strip video file info online, video privacy cleaner online, delete video metadata online",
    longTailKeywords:
      "how to remove metadata from video file online free, strip GPS data from video online, remove private info from mp4 file, clear all tags from video file online, anonymize video by removing metadata free",
  },
  {
    toolName: "video-audio-remover",
    description:
      "Remove or mute the audio track from a video file, producing a silent video.",
    h1: "Remove Audio From Video – Mute Video Online Free",
    p: "Remove the audio track from any video file online. Mute your MP4, MKV, or AVI video to create a silent version for presentations, background videos, and overlays.",
    metaTitle: "Remove Audio From Video – Mute Video Online Free",
    metaDescription:
      "Remove audio from video online for free. Mute MP4, AVI, MKV videos instantly. Create silent videos for presentations and overlays. No signup needed.",
    shortTailKeywords:
      "remove audio from video, mute video online, video audio remover",
    mediumTailKeywords:
      "remove audio track from video online free, mute mp4 video online, strip audio from video file online, create silent video online free",
    longTailKeywords:
      "how to remove audio from video online free, mute video file without software, strip sound from mp4 online free, create silent mp4 video online, remove background audio from video online free",
  },
  {
    toolName: "video-track-remover",
    description:
      "Remove the video track from a media file, keeping only the audio track.",
    h1: "Remove Video Track – Extract Audio by Removing Video Online",
    p: "Remove the video track from a media file and keep only the audio online. Convert MP4, MKV, or AVI into audio-only files without re-encoding the audio stream.",
    metaTitle:
      "Video Track Remover – Remove Video Track & Keep Audio Online Free",
    metaDescription:
      "Remove video track from media files online for free. Keep only the audio from MP4, MKV, AVI. No re-encoding or software required.",
    shortTailKeywords:
      "remove video track, video to audio only, strip video track",
    mediumTailKeywords:
      "remove video track keep audio online, extract audio by removing video track, video track remover online free, convert video to audio only online",
    longTailKeywords:
      "how to remove video track and keep audio online free, strip video track from mp4 to get audio, convert mp4 to audio only by removing video track, keep audio remove video from file online, video track remover tool online free",
  },
  {
    toolName: "video-resolution-analyzer",
    description:
      "Analyze and report the resolution, dimensions, aspect ratio, and other properties of a video file.",
    h1: "Video Resolution Analyzer – Check Video Dimensions Online Free",
    p: "Analyze video resolution and properties online. Instantly check width, height, aspect ratio, frame rate, codec, and more for any MP4, MKV, or AVI file.",
    metaTitle: "Video Resolution Analyzer – Check Video Resolution Online Free",
    metaDescription:
      "Analyze video resolution online for free. Check dimensions, aspect ratio, FPS, and codec of MP4, MKV, AVI files. Fast and no signup required.",
    shortTailKeywords:
      "video resolution analyzer, check video resolution, video properties checker",
    mediumTailKeywords:
      "check video resolution online free, analyze video dimensions online, video properties analyzer tool, detect video resolution and fps online",
    longTailKeywords:
      "how to check video resolution online for free, view video file properties online, detect mp4 video dimensions and aspect ratio, check video codec and resolution online free, video resolution and quality inspector online",
  },
  {
    toolName: "video-fragmenter",
    description:
      "Split a video file into multiple smaller fragment files based on duration or size.",
    h1: "Video Fragmenter – Split Video Into Fragments Online Free",
    p: "Fragment any video into smaller clips online. Split MP4, MKV, and AVI files into equal-duration or custom-sized fragments — great for streaming, uploading, and distribution.",
    metaTitle: "Video Fragmenter – Split Video Into Fragments Online Free",
    metaDescription:
      "Fragment video files online for free. Split MP4, MKV, AVI into smaller parts by duration or size. No software or signup needed.",
    shortTailKeywords:
      "video fragmenter, split video into parts, video splitter online",
    mediumTailKeywords:
      "fragment video file online free, split mp4 into segments online, video file splitter by duration, divide video into equal parts online",
    longTailKeywords:
      "how to split video into fragments online free, divide mp4 into smaller clips online, fragment video file for upload online, split video into equal duration parts free, video file fragmenter and splitter online tool",
  },
];

const baseComponentsDir = "components/seo-content";

/**
 * Generates the content for a .tsx file that exports the tool's JSON object.
 *
 * @param {object} tool - The tool object from your JSON array.
 * @returns {string} The content of the .tsx file, exporting the JSON object.
 */
function generateTsxContent(tool) {
  // Stringify the tool object with pretty printing (2 spaces)
  const toolJsonString = JSON.stringify(tool, null, 2);

  return `const toolData = ${toolJsonString};


`;
}

// Ensure the base 'components' directory exists
if (!fs.existsSync(baseComponentsDir)) {
  fs.mkdirSync(baseComponentsDir);
  console.log(`Created directory: ${baseComponentsDir}`);
}

// Iterate over each tool in the data array
toolsData.forEach((tool) => {
  let targetDir;
  const toolFileName = `${tool.toolName}.tsx`; // Still using .tsx for type safety if you define an interface later

  // Determine the category based on the toolName
  if (tool.toolName.includes("audio")) {
    targetDir = path.join(baseComponentsDir, "audio");
  } else if (tool.toolName.includes("video")) {
    targetDir = path.join(baseComponentsDir, "video-tools");
  } else {
    console.warn(
      `Could not categorize tool: "${tool.toolName}". Skipping this tool.`,
    );
    return; // Skip to the next tool if category cannot be determined
  }

  // Ensure the target directory (e.g., 'components/audio' or 'components/video-tools') exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    console.log(`Created directory: ${targetDir}`);
  }

  const filePath = path.join(targetDir, toolFileName);
  const fileContent = generateTsxContent(tool);

  // Write the generated content to the .tsx file
  fs.writeFileSync(filePath, fileContent, "utf8");
  console.log(`Created file: ${filePath}`);
});

console.log("\nScript finished creating data files.");
