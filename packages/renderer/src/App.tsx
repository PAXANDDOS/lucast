import { clipboard } from 'electron'

const App = () => {
	const addToClipboard = () => {
		clipboard.writeText('Example String', 'selection')
		console.log(clipboard.readText('selection'))
	}

	return (
		<div>
			<button onClick={addToClipboard}>Click me</button>
		</div>
	)
}

export default App
