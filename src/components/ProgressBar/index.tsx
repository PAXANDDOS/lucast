const style = {
    container: {
        width: '100%',
        height: 12,
        margin: '16px 0',
        borderRadius: 8,
        backgroundColor: '#e0e0de',
    } as React.CSSProperties,
    bar: {
        height: '100%',
        backgroundColor: '#6772eb',
        borderRadius: 'inherit',
        textAlign: 'right',
        transition: 'all 0.7s cubic-bezier(1, 0.3, 0.51, 0.6)',
    } as React.CSSProperties,
}

export const ProgressBar: React.FC<{ current?: string }> = ({ current }) => (
    <div style={style.container}>
        <div
            style={{
                ...style.bar,
                width: `${current}%`,
            }}
        />
    </div>
)
