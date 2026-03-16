# Audio Processing

## Overview
The Audio Processing module provides capabilities for audio compression (adjusting bitrate and quality), audio trimming/cutting (extracting time ranges), audio resampling (changing sample rate), channel mixing (mono/stereo conversion, up/downmix), audio extraction (extracting audio from video), custom audio effects (via processing functions), and volume normalization (via custom processing).

## Key Capabilities

### 1. Audio Transformation
- Audio compression (adjust bitrate and quality)
- Audio trimming/cutting (extract time ranges)
- Audio resampling (change sample rate)
- Channel mixing (mono/stereo conversion, up/downmix)

### 2. Audio Extraction
- Audio extraction (extract audio from video)

### 3. Audio Enhancement
- Custom audio effects (via processing functions)
- Volume normalization (via custom processing)

## API Reference

### Audio Processing Options
```ts
type ConversionAudioOptions = {
    discard?: boolean;
    codec?: AudioCodec;
    bitrate?: number | Quality;
    numberOfChannels?: number;
    sampleRate?: number;
    forceTranscode?: boolean;
    process?: (sample: AudioSample) => MaybePromise<
        AudioSample | AudioSample[] | null
    >;
    processedNumberOfChannels?: number;
    processedSampleRate?: number;
};
```

### Audio Processing in Conversions
```ts
import { Conversion } from 'mediabunny';

const conversion = await Conversion.init({
    input,
    output,
    audio: {
        // Apply audio processing options
        numberOfChannels: 2,          // Stereo
        sampleRate: 44100,           // 44.1 kHz
        bitrate: 128000,             // 128 kbps
        codec: 'mp4a.40.2'          // AAC codec
    }
});
```

## Code Examples

### Example 1: Change Audio Channels (Mono/Stereo)
```ts
import { Conversion, Input, Output, Mp3OutputFormat, BufferTarget, BlobSource, ALL_FORMATS } from 'mediabunny';

async function convertChannels(inputFile, channels) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new Mp3OutputFormat(),
        target: new BufferTarget(),
    });
    
    const conversion = await Conversion.init({
        input,
        output,
        audio: {
            numberOfChannels: channels  // 1 for mono, 2 for stereo, etc.
        }
    });
    
    await conversion.execute();
    
    const convertedBuffer = output.target.buffer;
    const convertedBlob = new Blob([convertedBuffer], { type: 'audio/mpeg' });
    
    await input.end();
    
    return convertedBlob;
}
```

### Example 2: Resample Audio
```ts
async function resampleAudio(inputFile, newSampleRate) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new Mp3OutputFormat(),
        target: new BufferTarget(),
    });
    
    const conversion = await Conversion.init({
        input,
        output,
        audio: {
            sampleRate: newSampleRate  // e.g., 22050, 44100, 48000
        }
    });
    
    await conversion.execute();
    
    const resampledBuffer = output.target.buffer;
    const resampledBlob = new Blob([resampledBuffer], { type: 'audio/mpeg' });
    
    await input.end();
    
    return resampledBlob;
}
```

### Example 3: Audio Compression
```ts
async function compressAudio(inputFile, targetBitrate) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new Mp3OutputFormat(),
        target: new BufferTarget(),
    });
    
    const conversion = await Conversion.init({
        input,
        output,
        audio: {
            bitrate: targetBitrate  // e.g., 64000 for 64 kbps, 128000 for 128 kbps
        }
    });
    
    await conversion.execute();
    
    const compressedBuffer = output.target.buffer;
    const compressedBlob = new Blob([compressedBuffer], { type: 'audio/mpeg' });
    
    await input.end();
    
    return compressedBlob;
}
```

### Example 4: Extract Audio from Video
```ts
async function extractAudioFromVideo(videoFile) {
    const input = new Input({
        source: new BlobSource(videoFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new Mp3OutputFormat(),
        target: new BufferTarget(),
    });
    
    const conversion = await Conversion.init({
        input,
        output,
        video: {
            discard: true  // Remove video track
        }
    });
    
    await conversion.execute();
    
    const audioBuffer = output.target.buffer;
    const audioBlob = new Blob([audioBuffer], { type: 'audio/mpeg' });
    
    await input.end();
    
    return audioBlob;
}
```

### Example 5: Trim Audio
```ts
async function trimAudio(audioFile, startSeconds, endSeconds) {
    const input = new Input({
        source: new BlobSource(audioFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new Mp3OutputFormat(),
        target: new BufferTarget(),
    });
    
    const conversion = await Conversion.init({
        input,
        output,
        trim: {
            start: startSeconds,
            end: endSeconds
        }
    });
    
    await conversion.execute();
    
    const trimmedBuffer = output.target.buffer;
    const trimmedBlob = new Blob([trimmedBuffer], { type: 'audio/mpeg' });
    
    await input.end();
    
    return trimmedBlob;
}
```

### Example 6: Apply Custom Audio Effects
```ts
async function applyReverbEffect(inputFile) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new Mp3OutputFormat(),
        target: new BufferTarget(),
    });
    
    const conversion = await Conversion.init({
        input,
        output,
        audio: {
            process: async (sample) => {
                // Get the underlying AudioBuffer
                const audioBuffer = sample.toAudioBuffer();
                
                // Create offline audio context for processing
                const offlineCtx = new OfflineAudioContext(
                    audioBuffer.numberOfChannels,
                    audioBuffer.length,
                    audioBuffer.sampleRate
                );
                
                // Create source node
                const source = offlineCtx.createBufferSource();
                source.buffer = audioBuffer;
                
                // Apply reverb effect using ConvolverNode (conceptual)
                const convolver = offlineCtx.createConvolver();
                
                // Create impulse response for reverb
                const length = audioBuffer.sampleRate * 2; // 2 seconds
                const impulse = offlineCtx.createBuffer(2, length, audioBuffer.sampleRate);
                
                // Fill impulse buffer with reverberation pattern
                for (let channel = 0; channel < 2; channel++) {
                    const channelData = impulse.getChannelData(channel);
                    for (let i = 0; i < length; i++) {
                        // Simple exponential decay
                        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2);
                    }
                }
                
                convolver.buffer = impulse;
                
                // Connect nodes
                source.connect(convolver);
                convolver.connect(offlineCtx.destination);
                
                source.start();
                
                // Render the audio with effect
                const processedBuffer = await offlineCtx.startRendering();
                
                // Convert back to AudioSample format
                // Note: This is conceptual; actual implementation may vary based on library API
                return sample; // Placeholder - actual implementation would convert processedBuffer back
            }
        }
    });
    
    await conversion.execute();
    
    const processedBuffer = output.target.buffer;
    const processedBlob = new Blob([processedBuffer], { type: 'audio/mpeg' });
    
    await input.end();
    
    return processedBlob;
}
```

### Example 7: Normalize Audio Volume
```ts
async function normalizeAudio(inputFile) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new Mp3OutputFormat(),
        target: new BufferTarget(),
    });
    
    let maxPeak = 0;
    
    const conversion = await Conversion.init({
        input,
        output,
        audio: {
            process: async (sample) => {
                // Get the underlying AudioBuffer
                const audioBuffer = sample.toAudioBuffer();
                
                // Find peak amplitude in this sample
                for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
                    const channelData = audioBuffer.getChannelData(channel);
                    for (let i = 0; i < channelData.length; i++) {
                        const amp = Math.abs(channelData[i]);
                        if (amp > maxPeak) {
                            maxPeak = amp;
                        }
                    }
                }
                
                // If maxPeak is > 1, we need to normalize
                if (maxPeak > 1) {
                    // Create offline context to process
                    const offlineCtx = new OfflineAudioContext(
                        audioBuffer.numberOfChannels,
                        audioBuffer.length,
                        audioBuffer.sampleRate
                    );
                    
                    // Create gain node to normalize
                    const gainNode = offlineCtx.createGain();
                    gainNode.gain.value = 1 / maxPeak; // Normalize to maximum of 1
                    
                    // Connect source -> gain -> destination
                    const source = offlineCtx.createBufferSource();
                    source.buffer = audioBuffer;
                    source.connect(gainNode);
                    gainNode.connect(offlineCtx.destination);
                    
                    source.start();
                    const normalizedBuffer = await offlineCtx.startRendering();
                    
                    // Return the normalized sample
                    // Note: Actual implementation would convert normalizedBuffer back to AudioSample
                }
                
                return sample; // Placeholder - return normalized version in real implementation
            }
        }
    });
    
    await conversion.execute();
    
    const normalizedBuffer = output.target.buffer;
    const normalizedBlob = new Blob([normalizedBuffer], { type: 'audio/mpeg' });
    
    await input.end();
    
    return normalizedBlob;
}
```

### Example 8: Change Audio Codec
```ts
async function changeAudioCodec(inputFile, newCodec) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    // Select output format based on codec
    let outputFormat;
    switch (newCodec) {
        case 'mp4a.40.2':  // AAC
            outputFormat = new Mp4OutputFormat();
            break;
        case 'mp3':
            outputFormat = new Mp3OutputFormat();
            break;
        case 'opus':
            outputFormat = new WebMOutputFormat();
            break;
        case 'flac':
            outputFormat = new FlacOutputFormat();
            break;
        default:
            throw new Error(`Unsupported codec: ${newCodec}`);
    }
    
    const output = new Output({
        format: outputFormat,
        target: new BufferTarget(),
    });
    
    const conversion = await Conversion.init({
        input,
        output,
        audio: {
            codec: newCodec
        }
    });
    
    await conversion.execute();
    
    const convertedBuffer = output.target.buffer;
    const mimeType = await output.getMimeType(); // Get appropriate MIME type
    
    const convertedBlob = new Blob([convertedBuffer], { type: mimeType });
    
    await input.end();
    
    return convertedBlob;
}
```

### Example 9: Mix Multiple Audio Streams
```ts
// Note: This example assumes combining multiple audio files together
async function mixAudioStreams(audioFiles) {
    // This is a complex operation that requires more advanced processing
    // that goes beyond simple Mediabunny conversions
    // You would typically need to decode each audio separately, 
    // mix them in an audio context, and then encode the result
    
    // This is a simplified conceptual example
    const mixedBuffer = new ArrayBuffer(0); // Placeholder
    
    // In a real implementation, you would:
    // 1. Decode each audio file separately
    // 2. Resample all to the same sample rate
    // 3. Mix the audio buffers
    // 4. Re-encode using Mediabunny
    
    return new Blob([mixedBuffer], { type: 'audio/mpeg' });
}
```

### Example 10: Comprehensive Audio Processing
```ts
async function comprehensiveAudioProcessing(inputFile, options = {}) {
    const {
        targetChannels = 2,
        targetSampleRate = 44100,
        targetBitrate = 128000,
        trimStart = 0,
        trimEnd = null
    } = options;
    
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new Mp3OutputFormat(),
        target: new BufferTarget(),
    });
    
    // Determine trim options
    const trimOptions = trimEnd ? { start: trimStart, end: trimEnd } : 
                       trimStart ? { start: trimStart } : 
                       null;
    
    const conversionParams = {
        input,
        output,
        audio: {
            numberOfChannels: targetChannels,
            sampleRate: targetSampleRate,
            bitrate: targetBitrate
        }
    };
    
    if (trimOptions) {
        conversionParams.trim = trimOptions;
    }
    
    const conversion = await Conversion.init(conversionParams);
    
    await conversion.execute();
    
    const processedBuffer = output.target.buffer;
    const processedBlob = new Blob([processedBuffer], { type: 'audio/mpeg' });
    
    await input.end();
    
    return processedBlob;
}
```

## Performance Tips

- For complex audio processing, consider using Web Audio API alongside Mediabunny
- Batch process multiple audio adjustments in a single conversion when possible
- Be mindful of CPU usage when applying intensive audio effects
- Use appropriate sample rates for your use case (44.1kHz for CD quality, 48kHz for video)
- Consider the trade-off between audio quality and file size when choosing bitrates
- When extracting audio from video, the process can be combined with other operations to save processing time