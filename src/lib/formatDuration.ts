/**
 * Format a duration in seconds to a HH:MM:SS string.
 * @param duration Duration in seconds.
 * @returns Formatted duration.
 * @example formatDuration(68) // '01:08'
 */
export const formatDuration = (duration: number): string => {
    const hrs = ~~(duration / 3600)
    const mins = ~~((duration % 3600) / 60)
    const secs = ~~duration % 60

    let result = ''

    if (hrs > 0) result += '' + hrs + ':' + (mins < 10 ? '0' : '')

    result += '' + mins + ':' + (secs < 10 ? '0' : '')
    result += '' + secs

    return result
}
