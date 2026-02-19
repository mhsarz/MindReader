import { useNavigate } from 'react-router-dom';

export default function Hub({ onSelectExperiment }) {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>MindReader</h1>
      <p style={{ color: '#888', marginBottom: '40px', fontSize: '1.2rem' }}>
        A Cognitive Science & Human-Computer Interaction Platform
      </p>

      {/* The CSS Grid for our Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px' 
      }}>
        
        {/* Card 1: Anchoring (Active) */}
        <div onClick={() => navigate('/anchoring')}
          style={{
            backgroundColor: '#1a1a1a', border: '1px solid #646cff', borderRadius: '12px', 
            padding: '20px', cursor: 'pointer', transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⚓</div>
          <h3>The Anchoring Effect</h3>
          <p style={{ color: '#aaa', fontSize: '0.9rem' }}>How do initial numbers bias our final estimations?</p>
          <div style={{ marginTop: '15px', color: '#646cff', fontWeight: 'bold' }}>Start Experiment →</div>
        </div>

        {/* Card 2: Framing (Locked) */}
        <div style={{
            backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px', 
            padding: '20px', opacity: '0.6'
          }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🖼️</div>
          <h3>The Framing Effect</h3>
          <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Does the presentation of risk change your choices?</p>
          <div style={{ marginTop: '15px', color: '#555', fontWeight: 'bold' }}>In Development 🔒</div>
        </div>

        {/* Card 3: Library (Locked) */}
        <div style={{
            backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px', 
            padding: '20px', opacity: '0.6'
          }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📚</div>
          <h3>Cognitive Library</h3>
          <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Read the neuroscience and psychology behind the biases.</p>
          <div style={{ marginTop: '15px', color: '#555', fontWeight: 'bold' }}>Coming Soon 🔒</div>
        </div>

      </div>
    </div>
  );
}