import { SupportedImageFormat, MAX_FILE_SIZE, SUPPORTED_FORMATS, BackgroundRemovalError } from './types'

export const validateImageFile = (file: File): BackgroundRemovalError | null => {
  if (!file) {
    return {
      code: 'NO_FILE',
      message: 'No file was provided'
    }
  }

  if (!SUPPORTED_FORMATS.includes(file.type as SupportedImageFormat)) {
    return {
      code: 'INVALID_FORMAT',
      message: `Unsupported file format. Supported formats are: ${SUPPORTED_FORMATS.join(', ')}`
    }
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      code: 'FILE_TOO_LARGE',
      message: `File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`
    }
  }

  return null
}

export const createObjectURL = (file: File): string => {
  return URL.createObjectURL(file)
}

export const revokeObjectURL = (url: string): void => {
  URL.revokeObjectURL(url)
}

export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      })
    }
    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }
    img.src = URL.createObjectURL(file)
  })
}

export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

