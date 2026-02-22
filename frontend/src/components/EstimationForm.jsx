import '../index.css'

export default function EstimationForm({ guess, setGuess, confidence, setConfidence, onSubmit, errorMessage }) {
  return (
    // Centers the panel on the screen
    <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '80vh', 
        padding: '20px' 
    }}>
      
      <div className="glass-panel" style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
        
        <h2 style={{ fontSize: '2.2rem', marginBottom: '15px', color: 'var(--text-main)' }}>
          Part 2: <span style={{ color: 'var(--accent-primary)' }}>Your Estimate</span>
        </h2>

        <p style={{ fontSize: '1.1rem', marginBottom: '30px', opacity: '0.8' }}>
          Based on your intuition, what is the exact height of the tallest redwood tree in meters?
        </p>

        {errorMessage && (
          <div style={{ 
            backgroundColor: 'rgba(255, 100, 100, 0.1)', 
            border: '1px solid #ff6464', 
            color: '#ff6464', 
            padding: '12px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            fontWeight: 'bold',
            fontSize: '0.9rem'
          }}>
            ⚠ {errorMessage}
          </div>
        )}

        {/* The Guess Input */}
        <div style={{ marginBottom: '30px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
                Your Guess (in meters)
            </label>
            <input 
              type="number" 
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="e.g., 150"
              style={{ 
                  width: '100%', 
                  padding: '15px', 
                  fontSize: '1.2rem',
                  borderRadius: '8px', 
                  border: '1px solid rgba(255, 236, 209, 0.2)', 
                  backgroundColor: 'rgba(0, 0, 0, 0.3)', 
                  color: 'var(--text-main)',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 236, 209, 0.2)'}
            />
        </div>

        {/* The Confidence Slider */}
        <div style={{ marginBottom: '40px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
                Confidence Level: <span style={{ color: 'var(--text-main)' }}>{confidence}/10</span>
            </label>
            
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={confidence}
              onChange={(e) => setConfidence(e.target.value)}
              style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--accent-primary)' }}
            />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', opacity: '0.5', fontSize: '0.8rem', fontWeight: '600' }}>
                <span>Wild Guess</span>
                <span>Absolutely Certain</span>
            </div>
        </div>

        <button onClick={onSubmit} className="btn-primary" style={{ width: '100%' }}>
            Submit Answer
        </button>
        
      </div>
    </div>
  )
}