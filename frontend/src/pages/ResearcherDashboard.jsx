import { useState } from 'react'
import '../App.css'

export default function ResearcherDashboard() {
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null) // 1. Added an error state!

  const handleDownload = async (e) => {
    e.preventDefault() 
    setErrorMessage(null) // Clear out old errors

    try {
      // 2. Instead of changing the URL, we use fetch() to ask Python for the file
      const response = await fetch(`https://mindreader-api.onrender.com/api/export?code=${password}`)

      if (response.ok) {
        // 3. SUCCESS! Python liked the password. 
        // We convert the data into a "Blob" (Binary Large Object) to trigger the download
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        
        // This is a neat React trick: Create a fake link, click it, and delete it instantly!
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = 'mindreader_data.csv'
        document.body.appendChild(link)
        link.click()
        link.remove()
        
      } else {
        // 4. FAILURE! Python rejected the password (401 error)
        setErrorMessage("Incorrect passcode! Access Denied.")
        setPassword('') // Clear the text box so they can try again
      }
    } catch (error) {
        setErrorMessage("Network error. Please try again later.")
    }
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
            
            {/* 5. Show the red error message if they guess wrong! */}
            {errorMessage && (
                <div style={{ color: '#f87171', marginBottom: '15px', fontWeight: 'bold' }}>
                    {errorMessage}
                </div>
            )}
            
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