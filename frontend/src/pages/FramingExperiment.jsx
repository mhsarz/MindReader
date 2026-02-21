import { useState } from 'react'
import WelcomeScreen from '../components/WelcomeScreen'
import FramingQuestion from '../components/FramingQuestion'
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
        setStep(2)
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
        : 
        null 
      } 
    </div>
  )

}
