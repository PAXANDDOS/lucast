/* eslint-disable @typescript-eslint/consistent-type-imports */
export {}

declare global {
	interface Window {
		ipcRenderer: import('electron').IpcRenderer
		removeLoading: () => void
	}
}
