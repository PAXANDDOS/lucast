;(async () => {
    console.log('Config path: ', await window.api.invoke('electron-store', 'path'))
})()

export default {
    /**
     * Get the value of a key in the store.
     * @param key The key to get.
     * @return The value of the key.
     */
    get: async (key: string): Promise<any> => {
        const { invoke } = window.api
        return JSON.parse(await invoke('electron-store', 'get', key))
    },

    /**
     * Set the value of a key in the store.
     * @param key The key to set.
     * @param value The value to set.
     */
    set: async (key: string, value: any) => {
        const { invoke } = window.api
        let val: any
        value && typeof value === 'object' ? (val = JSON.stringify(value)) : (val = value)
        await invoke('electron-store', 'set', key, val)
    },
}
