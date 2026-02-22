import '../index.css'

export default function WelcomeScreen({ onStart, title, description }) {
  return (
    // This wrapper centers everything perfectly on the screen
    <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '80vh', 
        padding: '20px' 
    }}>
      
      {/* Our new reusable glass box! */}
      <div className="glass-panel" style={{ maxWidth: '600px', textAlign: 'center' }}>
        
        <h1 style={{ fontSize: '3rem', marginBottom: '15px' }}>
            {title}<span style={{ color: 'var(--accent-primary)' }}>.</span>
        </h1>
        
        <p style={{ 
            fontSize: '1.2rem', 
            lineHeight: '1.6', 
            opacity: '0.8', 
            marginBottom: '40px' 
        }}>
            {description}
        </p>

        <button onClick={onStart} className="btn-primary">
            Begin Experiment
        </button>

        <br />

        <button onClick={() => window.location.href = '/'} className="btn-secondary">
            ← Return to Hub
        </button>
        
      </div>
    </div>
  )
}