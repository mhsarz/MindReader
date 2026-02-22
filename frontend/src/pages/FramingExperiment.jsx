import { useState } from 'react'
import WelcomeScreen from '../components/WelcomeScreen'
import FramingQuestion from '../components/FramingQuestion'
import FramingResults from '../components/FramingResults'
import '../App.css'

export default function FramingExperiment() {
  const [step, setStep] = useState(0) // Scene Tracker
  const [gameData, setGameData] = useState(null) // Backpack
  const [stats, setStats] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const startGame = async () => {
    const response = await fetch('https://mindreader-api.onrender.com/api/experiments', {
          method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              bias_type: "framing"
            }),
          }
    )
    

    const data = await response.json()
    setGameData(data) 
    setStep(1) 
  } 

  const framingValue = gameData?.variant;

  const submitChoice = async (selectedChoice) => { 
   setErrorMessage(null) 
   try {
    const response = await fetch ('https://mindreader-api.onrender.com/api/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          experiment_id: gameData.id,
          value: selectedChoice
        })
    })
   
    if (response.ok) {
        setStep(3)
    } else {
        const errorData = await response.json()
        setErrorMessage(errorData.detail || "Something went wrong.")
    }
   } catch (error) {
      setErrorMessage("Network error. Please check your connection.")
   }
  }

  const fetchStats = async () => {
    const response = await fetch('https://mindreader-api.onrender.com/api/stats/framing')
    const data = await response.json()
    setStats(data) 
    setStep(4)    
  }

  return (
    <div className="App">
      {
        step === 0 ? (
          <WelcomeScreen 
            onStart={startGame} 
            title="The Framing Effect"
            description="Does the presentation of a scenario change your risk tolerance?"
          />
        ) : 
        step === 1 ?( 
          <FramingQuestion 
            variant={framingValue}     
            onNext={submitChoice}  
          />
        ) :   
        step == 2 ? (
          <div>
            <h1>Thanks! Results coming soon!</h1>
            <button onClick={() => window.location.href = '/'}>
              ← Return to Hub
            </button>
          </div>
        )
        : step === 3 ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="glass-panel" style={{ maxWidth: '600px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Choice <span style={{ color: 'var(--accent-primary)' }}>Recorded!</span></h2>
              <p style={{ marginBottom: '30px', opacity: '0.8', lineHeight: '1.6' }}>
                Thank you for participating in this scenario. Would you like to see how your choice compares to the rest of the community?
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
                <button onClick={fetchStats} className="btn-primary" style={{ width: '100%' }}>View Community Results</button>
                <button onClick={() => window.location.href = '/'} className="btn-secondary">
                  ← Return to Hub
                </button>
              </div>
            </div>
          </div>
        ) :
        step === 4 ? ( 
          <FramingResults 
            stats={stats} 
            onReset={() => window.location.href = '/'} 
          />
        )
        : null 
      } 
    </div>
  )

}
