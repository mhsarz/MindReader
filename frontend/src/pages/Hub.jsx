import { useNavigate } from 'react-router-dom';
import '../index.css'; 

export default function Hub({ onSelectExperiment }) {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 20px', textAlign: 'center' }}>
      
      {/* Sleek Header Section */}
      <h1 style={{ fontSize: '4rem', marginBottom: '15px', color: 'var(--text-main)' }}>
        MindReader<span style={{ color: 'var(--accent-primary)' }}>.</span>
      </h1>
      <p style={{ opacity: '0.6', marginBottom: '80px', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 80px', lineHeight: '1.6' }}>
        A cognitive science platform exploring the invisible biases that shape our decisions.
      </p>

      {/* The CSS Grid for Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '30px',
        textAlign: 'left' 
      }}>
        
        {/* Card 1: Anchoring */}
        <div className="experiment-card" onClick={() => navigate('/anchoring')}>
          <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>⚓</div>
          <h3>The Anchoring Effect</h3>
          <p>How do initial numbers and completely unrelated data bias our final estimations?</p>
          <div className="card-action-text">Start Experiment →</div>
        </div>

        {/* Card 2: Framing */}
        <div className="experiment-card" onClick={() => navigate('/framing')}>
          <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>🖼️</div>
          <h3>The Framing Effect</h3>
          <p>Does the presentation of a scenario fundamentally change your tolerance for risk?</p>
          <div className="card-action-text">Start Experiment →</div>
        </div>

        {/* Card 3: Library*/}
        <div className="experiment-card" onClick={() => navigate('/cognitive-library')}>
          <div style={{ fontSize: '2.5rem', marginBottom: '20px'}}>📚</div>
          <h3>Cognitive Library</h3>
          <p>Read the neuroscience and psychological research behind these cognitive biases.</p>
          <div className="card-action-text"> Read More →</div>
        </div>

      </div>
    </div>
  );
}