import { useParams, useNavigate } from 'react-router-dom';
import { articles } from '../data/articles';
import '../index.css';

export default function ArticlePage() {
  const { id } = useParams(); // grab URL
  const navigate = useNavigate();

  const article = articles.find(a => a.id === id);

  if (!article) {
    return (
      <div style={{ color: 'white', textAlign: 'center', marginTop: '100px' }}>
        <h2>Article not found 😕</h2>
        <button onClick={() => navigate('/library')} className="btn-secondary">Back to Library</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px' }}>
      
      <button onClick={() => navigate('/library')} className="btn-secondary" style={{ marginBottom: '30px' }}>
        ← Back to Library
      </button>

      {/* The Article Container */}
      <div className="glass-panel" style={{ textAlign: 'left', padding: '50px' }}>
        
        {/* Header Section */}
        <div style={{ marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
            <div style={{ color: 'var(--accent-primary)', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '10px' }}>
                ⏱️ {article.readTime} Read
            </div>
            
            <h1 style={{ fontSize: '3rem', marginBottom: '15px', lineHeight: '1.2' }}>
                {article.title}
            </h1>
            
            <div style={{ display: 'flex', gap: '10px' }}>
                {article.tags.map(tag => (
                    <span key={tag} style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                        padding: '5px 12px', 
                        borderRadius: '15px', 
                        fontSize: '0.8rem', 
                        color: 'var(--text-main)' 
                    }}>
                        {tag}
                    </span>
                ))}
            </div>
        </div>

        {/* The Body Text */}
        <div style={{ lineHeight: '1.8', fontSize: '1.1rem', opacity: '0.9', whiteSpace: 'pre-line' }}>
            {article.content}
        </div>

      </div>
      
    </div>
  );
}