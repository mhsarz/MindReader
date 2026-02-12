// src/ResultsDisplay.jsx

export default function ResultsDisplay({ 
    showStats,           // Boolean: Are we showing numbers yet?
    stats,               // The data: { high_anchor: 650, low_anchor: 120 }
    onFetchStats,        // Function: Go get the numbers
    onReset              // Function: Play Again
}) {
    if (!showStats) {
        // State A: Thank You Screen
        return (
            <div className="scene-container">
                <h2>Thank You!</h2>
                <p>Your guess has been recorded.</p>
                
                <button onClick={onFetchStats}>See Community Results</button>
                <button onClick={onReset}>Play Again</button>
            </div>
        )
    }

    // State B: Results Screen
    return (
        <div className="scene-container">
            <h2>Community Results</h2>
            
            <div className="stat-box">
                <p>High Anchor Average:</p>
                <h3>{stats?.high_anchor ? Math.round(stats.high_anchor) + "m" : "No data"}</h3>
            </div>

            <div className="stat-box">
                <p>Low Anchor Average:</p>
                <h3>{stats?.low_anchor ? Math.round(stats.low_anchor) + "m" : "No data"}</h3>
            </div>

            <button onClick={onReset}>Play Again</button>
        </div>
    )
}