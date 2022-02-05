import TitleBar from '@/components/TitleBar'
import HomePage from '@/pages/index'
import { StrictMode } from 'react'
import { render } from 'react-dom'
import './styles/index.css'

render(
	<StrictMode>
		<TitleBar />
		<main>
			<HomePage />
		</main>
	</StrictMode>,
	document.getElementById('root'),
	window.removeLoading
)
