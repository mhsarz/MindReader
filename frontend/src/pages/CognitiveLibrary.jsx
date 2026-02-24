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
      
      {/* 2. The Filter Buttons (Simple for now) */}
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

      {/* 3. The Grid Container (OUTSIDE the loop!) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '30px' 
      }}>
        
        {filteredArticles.map((articles) => (
          // 4. The Card (Must have a unique 'key')
          <div 
            key={articles.id} 
            className="experiment-card" 
            onClick={() => navigate('/library/' + articles.id)}
            style={{ textAlign: 'left', padding: '30px' }} // Override centered text
          >
            <div style={{ marginBottom: '15px', color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
               ⏱️ {articles.readTime} Read
            </div>
            
            <h3 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>{articles.title}</h3>
            
            <p style={{ marginBottom: '20px', opacity: 0.8 }}>{articles.excerpt}</p>
            
            {/* The Tags Pill Box */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {articles.tags.map(tag => (
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