import { getFileZippingWorker, releaseFileZippingWorker } from '@/lib/workerManager'

export interface ZipFile {
  name: string
  blob: Blob
}

export interface ZipOptions {
  zipName?: string
  onProgress?: (progress: number) => void
  onComplete?: (success: boolean) => void
  onError?: (error: Error) => void
}

/**
 * Create a ZIP file from multiple files using web worker
 */
export async function createZipFile(
  files: ZipFile[],
  options: ZipOptions = {}
): Promise<Blob> {
  const { zipName = 'archive.zip', onProgress, onComplete, onError } = options

  return new Promise((resolve, reject) => {
    getFileZippingWorker()
      .then(zipWorker => {
        // Convert files to array buffers for zipping
        Promise.all(
          files.map(async (file) => ({
            name: file.name,
            data: await file.blob.arrayBuffer()
          }))
        )
          .then(filesForZip => {
            zipWorker.postMessage({
              type: 'create-zip',
              files: filesForZip,
              zipName
            })

            zipWorker.onmessage = (event) => {
              const message = event.data

              if (message.type === 'zip-complete') {
                releaseFileZippingWorker()

                if (message.success && message.zipData) {
                  const zipBlob = new Blob([message.zipData], { type: 'application/zip' })
                  onComplete?.(true)
                  resolve(zipBlob)
                } else {
                  const error = new Error('Failed to create ZIP file')
                  onError?.(error)
                  onComplete?.(false)
                  reject(error)
                }
              }
            }

            zipWorker.onerror = (error) => {
              releaseFileZippingWorker()
              const err = new Error('ZIP worker error occurred')
              onError?.(err)
              onComplete?.(false)
              reject(err)
            }
          })
          .catch(reject)
      })
      .catch(reject)
  })
}

/**
 * Download a file (or ZIP file) to the user's computer
 */
export function downloadFile(file: ZipFile): void {
  const url = URL.createObjectURL(file.blob)
  const a = document.createElement('a')
  a.href = url
  a.download = file.name
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * Create and download a ZIP file from multiple files
 */
export async function createAndDownloadZip(
  files: ZipFile[],
  options: ZipOptions = {}
): Promise<void> {
  try {
    const zipBlob = await createZipFile(files, options)
    downloadFile({
      name: options.zipName || 'archive.zip',
      blob: zipBlob
    })
  } catch (error) {
    console.error('Error creating ZIP file:', error)
    throw error
  }
}
