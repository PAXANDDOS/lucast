import { useLoading } from './loading'
import { domReady } from './utils'

const { appendLoading, removeLoading } = useLoading()

;(async () => {
	await domReady()

	appendLoading()
})()

window.removeLoading = removeLoading

// `exposeInMainWorld` can not detect `prototype` attribute and methods, manually patch it.
// function withPrototype(obj: Record<string, any>) {
// 	const protos = Object.getPrototypeOf(obj)

// 	for (const [key, value] of Object.entries(protos)) {
// 		if (Object.prototype.hasOwnProperty.call(obj, key)) continue

// 		if (typeof value === 'function') {
// 			// Some native API not work in Renderer-process, like `NodeJS.EventEmitter['on']`. Wrap a function patch it.
// 			obj[key] = function (...args: any) {
// 				return value.call(obj, ...args)
// 			}
// 		} else {
// 			obj[key] = value
// 		}
// 	}
// 	return obj
// }
