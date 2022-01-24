export {}

declare global {
	interface Window {
		// fs: typeof import('fs')
		// ipcRenderer: import('electron').IpcRenderer
		removeLoading: () => void
	}
}
