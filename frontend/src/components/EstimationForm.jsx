// src/EstimationForm.jsx

export default function EstimationForm({ 
    guess, setGuess,          // The Text Input
    confidence, setConfidence, // The Slider
    onSubmit, errorMessage                  // The "Submit" Button
}) {
    return (
        <div className="scene-container">
            <h3>Your Estimation</h3>
            
            {
                errorMessage && (
                <div style={{
                backgroundColor: '#fee2e2', // Light red background
                color: '#991b1b',           // Dark red text
                padding: '12px 20px',
                borderRadius: '8px',
                marginBottom: '20px',
                border: '1px solid #f87171',
                fontWeight: 'bold',
                animation: 'fadeIn 0.5s ease-in' // Gives it a nice pop!
                }}>
                ⚠️ {errorMessage}
                </div>
            )}
            
            <input 
                type="text" 
                value={guess} 
                onChange={(e) => setGuess(e.target.value)} 
                placeholder="Enter height in meters"
            />
            
            <div style={{ marginTop: '20px' }}>
                <p>Confidence: {confidence}/10</p>
                <input 
                    type="range" 
                    value={confidence} 
                    min="1" 
                    max="10" 
                    onChange={(e) => setConfidence(e.target.value)} 
                />
            </div>

            <button onClick={onSubmit} style={{ marginTop: '20px' }}>
                Submit Final Guess
            </button>
        </div>
    )
}