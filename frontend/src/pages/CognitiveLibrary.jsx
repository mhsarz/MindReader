import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { articles } from '../data/articles'; 
import '../index.css';

export default function CognitiveLibrary() {
  const navigate = useNavigate();
  const [activeTag, setActiveTag] = useState("All");

  const filteredArticles = activeTag === "All" 
    ? articles 
    : articles.filter(article => article.tags.includes(activeTag));

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '50px 20px' }}>
      
      {/*Header Section*/}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center', 
        marginBottom: '40px' 
      }}>
        
        {/* Left Column: The Button */}
        <div style={{ textAlign: 'left' }}>
          <button 
            onClick={() => navigate('/')} 
            className="btn-secondary"
            style={{ margin: 0 }} 
          >
            ← Return to Hub
          </button>
        </div>
        
        {/* Center Column: The Title */}
        <h1 style={{ margin: 0, fontSize: '2.5rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
            Cognitive <span style={{ color: 'var(--accent-primary)' }}>Library</span>
        </h1>

        {/* balance */}
        <div></div>
        
      </div>

      {/* Filter Buttons */}
      <div style={{ marginBottom: '40px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {['All', 'Neuroscience', 'Biases', 'HCI'].map(tag => (
          <button 
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={activeTag === tag ? "btn-primary" : "btn-secondary"}
            style={{ padding: '8px 16px', fontSize: '0.9rem', marginTop: 0 }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* The Article Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '30px' 
      }}>
        
        {filteredArticles.map((article) => (
          <div 
            key={article.id} 
            className="experiment-card" 
            onClick={() => navigate('/library/' + article.id)}
            style={{ textAlign: 'left', padding: '30px' }}
          >
            <div style={{ marginBottom: '15px', color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
               ⏱️ {article.readTime} Read
            </div>
            
            <h3 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>{article.title}</h3>
            
            <p style={{ marginBottom: '20px', opacity: 0.8 }}>{article.excerpt}</p>
            
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {article.tags.map(tag => (
                <span key={tag} style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                  padding: '4px 10px', 
                  borderRadius: '12px', 
                  fontSize: '0.75rem', 
                  color: 'var(--text-main)' 
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
}