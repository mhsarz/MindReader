import '../index.css'

export default function AnchorQuestion({ anchorValue, onNext }) {
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
      
      <div className="glass-panel" style={{ maxWidth: '600px', textAlign: 'center' }}>
        
        <h2 style={{ fontSize: '2.2rem', marginBottom: '25px', color: 'var(--text-main)' }}>
          Part 1: <span style={{ color: 'var(--accent-primary)' }}>The Setup</span>
        </h2>

        {/* The Question. Notice how we make the anchor value giant and orange! */}
        <p style={{ fontSize: '1.3rem', lineHeight: '1.6', marginBottom: '40px', opacity: '0.9' }}>
          Do you think the height of the tallest redwood tree in the world is more or less than <strong style={{ color: 'var(--accent-primary)', fontSize: '1.6rem', padding: '0 8px' }}>{anchorValue}</strong>?
        </p>

        {/* The Buttons. Both buttons trigger onNext because the actual data we want is the numerical estimate on the next screen! */}
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          
          <button 
            onClick={onNext} 
            className="btn-primary" 
            style={{ 
                backgroundColor: 'transparent', 
                border: '2px solid var(--accent-primary)', 
                color: 'var(--text-main)' 
            }}
          >
            More
          </button>

          <button 
            onClick={onNext} 
            className="btn-primary" 
            style={{ 
                backgroundColor: 'transparent', 
                border: '2px solid var(--accent-primary)', 
                color: 'var(--text-main)' 
            }}
          >
            Less
          </button>

        </div>
        
      </div>
    </div>
  )
}