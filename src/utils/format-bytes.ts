const kilobyte = 1024
const logKilobyte = Math.log(kilobyte)
const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

/**
 * Formats bytes as a human readable string.
 * @param bytes The number of bytes to format.
 * @param decimals The number of decimals to show.
 * @return The formatted bytes.
 * @example formatBytes(1024, 2) // '1.00KB'
 */
export const formatBytes = (bytes: number, decimals = 2): string => {
    if (bytes === 0) return '0 Bytes'

    const dm = decimals < 0 ? 0 : decimals
    const i = Math.floor(Math.log(bytes) / logKilobyte)

    return parseFloat((bytes / Math.pow(kilobyte, i)).toFixed(dm)) + ' ' + sizes[i]
}
