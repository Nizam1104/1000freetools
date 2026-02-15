import { ALL_FORMATS, BufferTarget, Conversion, Input, Mp4OutputFormat, Output, WebMOutputFormat, BlobSource } from 'mediabunny';

export interface CompressionSettings {
    width: number;
    height: number;
    bitrate: number;
    codec: string;
    format: string;
}

export interface CompressionProgressCallback {
    (progress: number): void;
}

/**
 * Compresses a video file using mediabunny
 * @param file The video file to compress
 * @param settings Compression settings
 * @param onProgress Callback for compression progress (0-100)
 * @returns Promise resolving to a blob URL of the compressed video
 */
export const compressVideo = async (
    file: File, 
    settings: CompressionSettings, 
    onProgress?: CompressionProgressCallback
): Promise<string> => {
    // Dynamically import mediabunny to ensure it's loaded client-side
    const mediabunny = await import('mediabunny');
    
    // Create input from the selected file
    const input = new Input({
        source: new mediabunny.BlobSource(file),
        formats: ALL_FORMATS,
    });

    // Create output based on selected format
    let outputFormat;
    switch (settings.format) {
        case 'webm':
            outputFormat = new WebMOutputFormat();
            break;
        case 'mp4':
            outputFormat = new Mp4OutputFormat();
            break;
        default:
            outputFormat = new WebMOutputFormat();
    }

    const output = new Output({
        format: outputFormat,
        target: new BufferTarget(),
    });

    // Initialize conversion with compression settings
    const conversion = await Conversion.init({
        input,
        output,
        video: {
            width: settings.width,
            height: settings.height,
            fit: 'contain', // Add the required fit property
            bitrate: settings.bitrate,
            codec: settings.codec as any,
        },
    });

    // Monitor progress
    conversion.onProgress = (progressValue: number) => {
        if (onProgress) {
            onProgress(progressValue * 100);
        }
    };

    // Execute the conversion
    await conversion.execute();

    // Get the compressed video buffer
    const compressedBuffer = output.target.buffer;

    if (!compressedBuffer) {
        throw new Error('Compression failed: no output buffer');
    }

    // Create a blob from the compressed video
    const blob = new Blob([new Uint8Array(compressedBuffer)], {
        type: `video/${settings.format}`
    });

    return URL.createObjectURL(blob);
};