import { contextBridge, ipcRenderer } from 'electron'
import useLoading from './use-loading'
import { domReady } from './utils'

const { appendLoading, removeLoading } = useLoading()

;(async () => {
	await domReady()

	appendLoading()
})()

const withPrototype = (obj: Record<string, any>) => {
	const protos = Object.getPrototypeOf(obj)

	for (const [key, value] of Object.entries(protos)) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) continue

		if (typeof value === 'function')
			obj[key] = (...args: any) => {
				return value.call(obj, ...args)
			}
		else obj[key] = value
	}
	return obj
}

contextBridge.exposeInMainWorld('removeLoading', removeLoading)
contextBridge.exposeInMainWorld('ipcRenderer', withPrototype(ipcRenderer))
