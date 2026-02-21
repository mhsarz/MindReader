import { useState } from 'react'
import '../App.css'

export default function ResearcherDashboard() {
  const [password, setPassword] = useState('')

  const handleDownload = (e) => {
    e.preventDefault() // Stops page refresh
    window.location.href = `https://mindreader-api.onrender.com/api/export?code=${password}`
  }

  return (
    <div className="App">
      <div className="scene-container" style={{ maxWidth: '600px' }}>
        <h2>🔒 Researcher Dashboard</h2>
        <p style={{ marginBottom: '30px', color: '#ccc' }}>
          Enter the secure admin passcode to access and download the PostgreSQL database.
        </p>
        
        <form onSubmit={handleDownload} style={{ padding: '30px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '15px', color: '#4ade80' }}>Database Export</h3>
            
            <input 
              type="password" 
              placeholder="Enter passcode"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                padding: '10px', borderRadius: '4px', border: '1px solid #333', 
                backgroundColor: '#222', color: '#fff', marginBottom: '15px', 
                width: '100%', boxSizing: 'border-box' 
              }}
            />

            <button 
                type="submit"
                style={{ backgroundColor: '#4ade80', color: '#000', fontWeight: 'bold', width: '100%' }}
            >
                Download Master CSV
            </button>
        </form>

        <button onClick={() => window.location.href = '/'} style={{ backgroundColor: 'transparent', color: '#888', border: 'none' }}>
          ← Back to Hub
        </button>
      </div>
    </div>
  )
}