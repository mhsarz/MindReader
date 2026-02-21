import { useState } from 'react'
import WelcomeScreen from '../components/WelcomeScreen'
import AnchorQuestion from '../components/AnchorQuestion'
import EstimationForm from '../components/EstimationForm'
import AnchoringResults from '../components/AnchoringResults' 
import '../App.css'

export default function AnchoringExperiment() {
  const [step, setStep] = useState(0) // Scene Tracker
  const [gameData, setGameData] = useState(null) // Backpack
  const [guess, setGuess] = useState('') // guessed value
  const [confidence, setConfidence] = useState(5) // initial confidence
  const [startTime, setStartTime] = useState(0) // start of timer
  const [stats, setStats] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const startGame = async () => {
    const response = await fetch('https://mindreader-api.onrender.com/api/experiments', {
          method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              bias_type: "anchoring"
            }),
          }
    )
    

    // 2. When data comes back:
    const data = await response.json()
    setGameData(data) // Save
    
    setStep(1) // re-render -> next step
  } 

  const anchorValue = gameData?.variant === 'high_anchor' ? "500m" : "50m";

  const submitGuess = async () => {
   setErrorMessage(null) // Clear any old errors when they try again!
   
   try {
    const response = await fetch ('https://mindreader-api.onrender.com/api/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          experiment_id: gameData.id,
          value: guess,
          confidence: confidence,
          reaction_time: Date.now() - startTime
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

  const handleStartEstimation = () => {
    setStep(2)
    setStartTime(Date.now()) // The current timestamp in milliseconds
  }

  const fetchStats = async () => {
    const response = await fetch('https://mindreader-api.onrender.com/api/stats/anchoring')
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
            title="The Anchoring Effect"
            description="How do initial numbers bias our final estimations?"
          />
        ) : 
        step === 1 ?( 
          <AnchorQuestion 
            anchorValue={anchorValue}       // Pass the data down
            onNext={handleStartEstimation}  // Pass the function down
          />
        ) : 
        step === 2 ? (
          <EstimationForm 
            guess={guess}             
            setGuess={setGuess}       
            confidence={confidence}   
            setConfidence={setConfidence} 
            onSubmit={submitGuess}    
            errorMessage={errorMessage} 
          />
        ) :  
        step == 3 || step == 4 ? (
          <AnchoringResults 
            showStats={step === 4}      // If step is 4, show numbers. If 3, show "Thank You".
            stats={stats}               // The data
            onFetchStats={fetchStats}   // The button to get data
            onReset={() => window.location.reload()} // The Play Again button
          />
          
        )
        : 
        null 
      } 
    </div>
  )

//   return (
//   <div className="app-container">
//      <Hub onSelectExperiment={(bias) => console.log("User selected:", bias)} />
//   </div>
// )
}
