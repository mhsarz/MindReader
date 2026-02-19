import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function AnchoringResults({ showStats, stats, onFetchStats, onReset }) {
    
    if (!showStats) {
        return (
            <div className="scene-container">
                <h2>Thank You!</h2>
                <p>Your guess has been recorded.</p>
                <button onClick={onFetchStats}>See Community Results</button>
                <button onClick={onReset}>Play Again</button>
            </div>
        )
    }

    const chartData = stats ? [
        { name: 'High Anchor (500m)', average: Math.round(stats.high_anchor) },
        { name: 'Low Anchor (50m)', average: Math.round(stats.low_anchor) }
    ] : [];

    return (
        <div className="scene-container" style={{ width: '100%', maxWidth: '600px' }}>
            <h2>Community Results</h2>
            
            {/* The Magic Chart */}
            <div style={{ width: '100%', height: '300px', margin: '30px 0' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" stroke="#ffffff" />
                        <YAxis stroke="#ffffff" />
                        <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
                        <Bar dataKey="average" fill="#646cff" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <button onClick={onReset}>Play Again</button>
        </div>
    )
}