// src/EstimationForm.jsx

export default function EstimationForm({ 
    guess, setGuess,          // The Text Input
    confidence, setConfidence, // The Slider
    onSubmit                  // The "Submit" Button
}) {
    return (
        <div className="scene-container">
            <h3>Your Estimate</h3>
            
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