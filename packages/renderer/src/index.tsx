import TitleBar from '@/components/TitleBar'
import HomePage from '@/pages/index'
import { StrictMode } from 'react'
import { render } from 'react-dom'
import Toast from './components/Toast'
import './styles/index.css'

render(
	<StrictMode>
		<TitleBar />
		<main>
			<HomePage />
		</main>
		<Toast />
	</StrictMode>,
	document.getElementById('root'),
	window.removeLoading
)
