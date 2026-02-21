import '../App.css'

export default function ResearcherDashboard() {
  
const handleDownload = () => {
    // Attach the state password directly into the URL query parameter!
    // (Make sure to use the backticks ` ` so the ${password} variable works)
    window.location.href = `https://mindreader-api.onrender.com/api/export?code=${password}`;
}
  

  return (
    <div className="App">
      <div className="scene-container" style={{ maxWidth: '600px' }}>
        <h2>🔒 Researcher Dashboard</h2>
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