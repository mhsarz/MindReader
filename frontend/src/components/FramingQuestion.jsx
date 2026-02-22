import '../index.css'

export default function FramingQuestion({ variant, onNext }) {
  
  // We dynamically change the wording of the buttons based on the Python variant!
  const isPositive = variant === 'positive_framing';

  const safeText = isPositive 
    ? "Program A: 200 people will be saved." 
    : "Program A: 400 people will die.";
    
  const riskyText = isPositive 
    ? "Program B: 1/3 probability that 600 people will be saved, and 2/3 probability that no people will be saved." 
    : "Program B: 1/3 probability that nobody will die, and 2/3 probability that 600 people will die.";

  return (
    <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '80vh', 
        padding: '20px' 
    }}>
      
      <div className="glass-panel" style={{ maxWidth: '700px', textAlign: 'center' }}>
        
        <h2 style={{ fontSize: '2.2rem', marginBottom: '25px', color: 'var(--text-main)' }}>
          The <span style={{ color: 'var(--accent-primary)' }}>Scenario</span>
        </h2>

        {/* The Setup */}
        <p style={{ fontSize: '1.15rem', lineHeight: '1.7', marginBottom: '40px', opacity: '0.9', textAlign: 'left' }}>
          Imagine that the country is preparing for the outbreak of an unusual disease, which is expected to kill 600 people. Two alternative programs to combat the disease have been proposed. Assume that the exact scientific estimate of the consequences of the programs are as follows.
          <br /><br />
          Which of the two programs would you favor?
        </p>

        {/* The Choice Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <button 
            onClick={() => onNext("safe_choice")} 
            className="btn-primary" 
            style={{ 
                backgroundColor: 'rgba(0,0,0,0.3)', 
                border: '1px solid rgba(255, 236, 209, 0.2)', 
                color: 'var(--text-main)',
                textTransform: 'none',
                letterSpacing: 'normal',
                padding: '20px',
                textAlign: 'left',
                lineHeight: '1.5',
                fontSize: '1.05rem',
                fontWeight: 'normal'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 125, 0, 0.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 236, 209, 0.2)';
              e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.3)';
            }}
          >
            <strong>{safeText}</strong>
          </button>

          <button 
            onClick={() => onNext("risky_choice")} 
            className="btn-primary" 
            style={{ 
                backgroundColor: 'rgba(0,0,0,0.3)', 
                border: '1px solid rgba(255, 236, 209, 0.2)', 
                color: 'var(--text-main)',
                textTransform: 'none',
                letterSpacing: 'normal',
                padding: '20px',
                textAlign: 'left',
                lineHeight: '1.5',
                fontSize: '1.05rem',
                fontWeight: 'normal'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 125, 0, 0.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 236, 209, 0.2)';
              e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.3)';
            }}
          >
            <strong>{riskyText}</strong>
          </button>

        </div>
        
      </div>
    </div>
  )
}