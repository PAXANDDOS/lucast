import TitleBar from '@/components/TitleBar'
import App from '@/pages/index'
import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'

ReactDOM.render(
	<React.StrictMode>
		<TitleBar />
		<main>
			<App />
		</main>
	</React.StrictMode>,
	document.getElementById('root'),
	window.removeLoading
)
