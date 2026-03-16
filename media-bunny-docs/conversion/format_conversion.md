# Format Conversion

## Overview
The Format Conversion module provides capabilities for container format conversion (MP4 ↔ WebM ↔ MKV ↔ MOV, etc.), video codec conversion (AVC ↔ HEVC ↔ VP8 ↔ VP9 ↔ AV1), audio codec conversion (AAC ↔ Opus ↔ MP3 ↔ Vorbis ↔ FLAC), automatic transmuxing (copy when possible), automatic transcoding (re-encode when necessary), track removal and filtering, and Fast Start optimization for web streaming.

## Key Capabilities

### 1. Container Format Conversion
- Convert between different container formats (MP4 ↔ WebM ↔ MKV ↔ MOV, etc.)
- Maintain existing tracks during container conversion
- Preserve metadata during container conversion

### 2. Codec Conversion
- Video codec conversion (AVC ↔ HEVC ↔ VP8 ↔ VP9 ↔ AV1)
- Audio codec conversion (AAC ↔ Opus ↔ MP3 ↔ Vorbis ↔ FLAC)

### 3. Conversion Methods
- Automatic transmuxing (copy when possible)
- Automatic transcoding (re-encode when necessary)
- Fast Start optimization for web streaming

### 4. Track Management
- Track removal and filtering
- Preserve selected tracks while removing others

## API Reference

### Conversion Class
```ts
import { Conversion, Input, Output } from 'mediabunny';

const input = new Input({ ... });
const output = new Output({ ... });

const conversion = await Conversion.init({ input, output });
if (!conversion.isValid) {
    // Handle invalid conversion
    console.log(conversion.discardedTracks);
    return;
}

await conversion.execute();
```

### Conversion Options
```ts
const conversion = await Conversion.init({
    input,
    output,
    video: { /* video options */ },
    audio: { /* audio options */ },
    trim: { /* trimming options */ },
    tags: { /* metadata tags */ }
});
```

### Output Formats
- `Mp4OutputFormat` - MP4 container format
- `WebMOutputFormat` - WebM container format  
- `MatroskaOutputFormat` - MKV container format
- `QuickTimeOutputFormat` - MOV/QT container format
- `Mp3OutputFormat` - MP3 audio format
- `WaveOutputFormat` - WAV audio format
- `OggOutputFormat` - Ogg container format
- `FlacOutputFormat` - FLAC audio format
- `MpegTsOutputFormat` - MPEG-TS format

### Supported Video Codecs
- AVC (H.264) - `avc1.42E01E`
- HEVC (H.265) - `hev1.1.6.L93.B0`
- VP8 - `vp8`
- VP9 - `vp09.00.50.08`
- AV1 - `av01.0.04M.08`

### Supported Audio Codecs
- AAC - `mp4a.40.2`
- Opus - `opus`
- MP3 - `mp3` (requires @mediabunny/mp3-encoder)
- Vorbis - `vorbis`
- FLAC - `fLaC`

## Code Examples

### Example 1: Basic Format Conversion (MP4 to WebM)
```ts
import {
    Input,
    Output,
    Mp4OutputFormat,
    WebMOutputFormat,
    BufferTarget,
    BlobSource,
    Conversion,
    ALL_FORMATS
} from 'mediabunny';

async function convertMp4ToWebm(inputFile) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new WebMOutputFormat(),
        target: new BufferTarget(),
    });
    
    const conversion = await Conversion.init({ input, output });
    if (!conversion.isValid) {
        console.error('Invalid conversion:', conversion.discardedTracks);
        return null;
    }
    
    try {
        await conversion.execute();
        
        const webmBuffer = output.target.buffer;
        const webmBlob = new Blob([webmBuffer], { type: 'video/webm' });
        
        await input.end();
        
        return webmBlob;
    } catch (error) {
        console.error('Conversion failed:', error);
        await input.end();
        throw error;
    }
}
```

### Example 2: MP4 to MKV Conversion
```ts
async function convertMp4ToMkv(inputFile) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new MatroskaOutputFormat(),
        target: new BufferTarget(),
    });
    
    const conversion = await Conversion.init({ input, output });
    
    if (!conversion.isValid) {
        console.error('Conversion not valid:', conversion.discardedTracks);
        return null;
    }
    
    await conversion.execute();
    
    const mkvBuffer = output.target.buffer;
    const mkvBlob = new Blob([mkvBuffer], { type: 'video/x-matroska' });
    
    await input.end();
    
    return mkvBlob;
}
```

### Example 3: Audio Codec Conversion (AAC to MP3)
```ts
async function convertAacToMp3(inputFile) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    // MP3 encoder needs to be registered (if not natively supported)
    if (!(await canEncodeAudio('mp3'))) {
        registerMp3Encoder(); // Requires @mediabunny/mp3-encoder
    }
    
    const output = new Output({
        format: new Mp3OutputFormat(),
        target: new BufferTarget(),
    });
    
    const conversion = await Conversion.init({
        input,
        output,
        video: {
            discard: true // Remove video if present
        }
    });
    
    await conversion.execute();
    
    const mp3Buffer = output.target.buffer;
    const mp3Blob = new Blob([mp3Buffer], { type: 'audio/mpeg' });
    
    await input.end();
    
    return mp3Blob;
}
```

### Example 4: Video Codec Conversion (H.264 to VP9)
```ts
async function convertH264ToVp9(inputFile) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new WebMOutputFormat(),  // VP9 is typically in WebM
        target: new BufferTarget(),
    });
    
    const conversion = await Conversion.init({
        input,
        output,
        video: {
            codec: 'vp09.00.50.08'  // VP9 codec
        }
    });
    
    await conversion.execute();
    
    const vp9Buffer = output.target.buffer;
    const vp9Blob = new Blob([vp9Buffer], { type: 'video/webm' });
    
    await input.end();
    
    return vp9Blob;
}
```

### Example 5: HEVC to AVC Conversion
```ts
async function convertHevcToAvch264(inputFile) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
    });
    
    const conversion = await Conversion.init({
        input,
        output,
        video: {
            codec: 'avc1.42E01E'  // H.264/AVC codec
        }
    });
    
    await conversion.execute();
    
    const avcBuffer = output.target.buffer;
    const avcBlob = new Blob([avcBuffer], { type: 'video/mp4' });
    
    await input.end();
    
    return avcBlob;
}
```

### Example 6: Transmuxing (Copy Without Re-encoding)
```ts
async function transmuxWithoutReencoding(inputFile) {
    // Transmuxing copies streams without re-encoding when codecs are compatible
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    // Example: MP4 to MOV with compatible codecs
    const output = new Output({
        format: new QuickTimeOutputFormat(),
        target: new BufferTarget(),
    });
    
    const conversion = await Conversion.init({ input, output });
    
    // If codecs are compatible, this will copy streams without transcoding
    // If codecs are incompatible, it will transcode automatically
    await conversion.execute();
    
    const movBuffer = output.target.buffer;
    const movBlob = new Blob([movBuffer], { type: 'video/quicktime' });
    
    await input.end();
    
    return movBlob;
}
```

### Example 7: Track Removal During Conversion
```ts
async function removeAudioTrack(inputFile) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
    });
    
    const conversion = await Conversion.init({
        input,
        output,
        audio: {
            discard: true  // Remove audio track
        }
    });
    
    await conversion.execute();
    
    const videoOnlyBuffer = output.target.buffer;
    const videoOnlyBlob = new Blob([videoOnlyBuffer], { type: 'video/mp4' });
    
    await input.end();
    
    return videoOnlyBlob;
}
```

### Example 8: Multiple Track Filtering
```ts
async function filterMultipleTracks(inputFile) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
    });
    
    // Filter tracks function - keep only first video and English audio
    const conversion = await Conversion.init({
        input,
        output,
        video: (track) => {
            if (track.number > 0) {  // Only keep first video track
                return { discard: true };
            }
            return {};  // Keep this track
        },
        audio: (track) => {
            if (track.languageCode !== 'eng') {  // Only keep English audio
                return { discard: true };
            }
            return {};
        }
    });
    
    await conversion.execute();
    
    const filteredBuffer = output.target.buffer;
    const filteredBlob = new Blob([filteredBuffer], { type: 'video/mp4' });
    
    await input.end();
    
    return filteredBlob;
}
```

### Example 9: Fast Start Optimization
```ts
async function createOptimizedMp4(inputFile) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    // Create MP4 with Fast Start optimization for web streaming
    const output = new Output({
        format: new Mp4OutputFormat({
            fastStart: true  // Move MOOV atom to beginning for faster streaming
        }),
        target: new BufferTarget(),
    });
    
    const conversion = await Conversion.init({ input, output });
    
    await conversion.execute();
    
    const optimizedBuffer = output.target.buffer;
    const optimizedBlob = new Blob([optimizedBuffer], { type: 'video/mp4' });
    
    await input.end();
    
    return optimizedBlob;
}
```

### Example 10: Batch Format Conversion
```ts
async function batchConvert(formats, inputFile) {
    const results = {};
    
    for (const format of formats) {
        try {
            const input = new Input({
                source: new BlobSource(inputFile),
                formats: ALL_FORMATS,
            });
            
            let outputFormat;
            let mimeType;
            
            switch (format) {
                case 'mp4':
                    outputFormat = new Mp4OutputFormat();
                    mimeType = 'video/mp4';
                    break;
                case 'webm':
                    outputFormat = new WebMOutputFormat();
                    mimeType = 'video/webm';
                    break;
                case 'mkv':
                    outputFormat = new MatroskaOutputFormat();
                    mimeType = 'video/x-matroska';
                    break;
                case 'mp3':
                    outputFormat = new Mp3OutputFormat();
                    mimeType = 'audio/mpeg';
                    break;
                default:
                    throw new Error(`Unsupported format: ${format}`);
            }
            
            const output = new Output({
                format: outputFormat,
                target: new BufferTarget(),
            });
            
            const conversion = await Conversion.init({ input, output });
            await conversion.execute();
            
            const buffer = output.target.buffer;
            results[format] = new Blob([buffer], { type: mimeType });
            
            await input.end();
        } catch (error) {
            console.error(`Failed to convert to ${format}:`, error);
            results[format] = null;
        }
    }
    
    return results;
}
```

## Performance Tips

- Use transmuxing when possible (same codecs) for faster conversion
- For web delivery, consider Fast Start optimization for MP4 files
- When removing tracks, do it during conversion rather than in a separate step
- Monitor conversion progress for large files to provide user feedback
- Check `conversion.isValid` before executing to prevent errors
- Handle discarded tracks appropriately to ensure expected output
- Use hardware acceleration when available to improve conversion speed
- Consider transcoding quality settings to balance file size and quality