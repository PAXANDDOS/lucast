import { clipboard } from 'electron'

function App() {
	const addToClipboard = () => {
		clipboard.writeText('Example String', 'selection')
		console.log(clipboard.readText('selection'))
	}

	return (
		<div className="App">
			<button onClick={addToClipboard}>Click me</button>
		</div>
	)
}

export default App
