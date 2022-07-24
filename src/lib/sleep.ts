/**
 * Sleep for a given number of milliseconds.
 * @param ms Given number of milliseconds.
 */
export const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))
