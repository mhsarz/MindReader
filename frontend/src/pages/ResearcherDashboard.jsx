import { useState } from 'react'
import '../App.css'

export default function ResearcherDashboard() {
  const [password, setPassword] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  
  const handleDownload = () => {
    window.location.href = `https://mindreader-api.onrender.com/api/export?code=${password}`;
  }

  const handleUnlock = (e) => {
    e.preventDefault()
    // A simple check to unlock the screen
    if (password) {
        setIsUnlocked(true)
    }
  }

  // 1. The Lock Screen (Renders if isUnlocked is false)
  if (!isUnlocked) {
    return (
      <div className="App">
        <div className="scene-container" style={{ maxWidth: '400px' }}>
          <h2>🔒 Admin Access</h2>
          <form onSubmit={handleUnlock} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              type="password" 
              placeholder="Enter passcode"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #333', backgroundColor: '#222', color: '#fff' }}
            />
            <button type="submit">Unlock</button>
          </form>
          <button onClick={() => window.location.href = '/'} style={{ marginTop: '20px', backgroundColor: 'transparent', color: '#888', border: 'none' }}>
            ← Back to Hub
          </button>
        </div>
      </div>
    )
  }

  // 2. The Unlocked Dashboard (Renders if isUnlocked is true)
  return (
    <div className="App">
      <div className="scene-container" style={{ maxWidth: '600px' }}>
        <h2>🔓 Researcher Dashboard</h2>
        <p style={{ marginBottom: '30px', color: '#ccc' }}>
          Welcome to the admin panel. Click below to export the complete PostgreSQL database as a Tidy Data CSV file for statistical analysis.
        </p>
        
        <div style={{ padding: '30px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '15px', color: '#4ade80' }}>Database Export</h3>
            <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '20px' }}>
                Includes all data from: Anchoring Effect, Framing Effect
            </p>
            <button 
                onClick={handleDownload}
                style={{ backgroundColor: '#4ade80', color: '#000', fontWeight: 'bold' }}
            >
                Download Master CSV
            </button>
        </div>

        <button onClick={() => window.location.href = '/'}>← Back to Hub</button>
      </div>
    </div>
  )
}