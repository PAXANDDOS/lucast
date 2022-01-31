interface Progress {
	current: string | undefined
}

const containerStyles = {
	width: '100%',
	height: 12,
	margin: '16px 0',
	borderRadius: 8,
	backgroundColor: '#e0e0de',
}

const ProgressBar = ({ current }: Progress) => {
	return (
		<div style={containerStyles}>
			<div
				style={{
					height: '100%',
					width: `${current}%`,
					backgroundColor: '#6772eb',
					borderRadius: 'inherit',
					textAlign: 'right',
					transition: 'all 0.7s cubic-bezier(1, 0.3, 0.51, 0.6)',
				}}
			/>
		</div>
	)
}

export default ProgressBar
