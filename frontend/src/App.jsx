import { useState } from 'react'
import WelcomeScreen from './WelcomeScreen'
import AnchorQuestion from './AnchorQuestion'
import EstimationForm from './EstimationForm'
import ResultsDisplay from './ResultsDisplay'
import './App.css'

function App() {
  const [step, setStep] = useState(0) // Scene Tracker
  const [gameData, setGameData] = useState(null) // Backpack
  const [guess, setGuess] = useState('') // guessed value
  const [confidence, setConfidence] = useState(5) // initial confidence
  const [startTime, setStartTime] = useState(0) // start of timer
  const [stats, setStats] = useState(null)

  const startGame = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/experiments', {
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
   try {
    const response = await fetch ('http://127.0.0.1:8000/api/responses', {
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
          }
    )
   
   if (response.ok) {
        setStep(3) // Only move forward if the save worked
      } else {
        console.error("Failed to save response")
      }
    } catch (error) {
      console.error("Error submitting guess:", error)
    }
  }

  const handleStartEstimation = () => {
    setStep(2)
    setStartTime(Date.now()) // The current timestamp in milliseconds
  }

  const fetchStats = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/stats')
    const data = await response.json()
    setStats(data) // Put the numbers in the backpack
    setStep(4) // Move to the new "Results" scene    
  }

  return (
    <div className="App">
      {
        step === 0 ? (
          <WelcomeScreen 
            onStart={startGame} 
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
            guess={guess}             // Wire 1: The current text
            setGuess={setGuess}       // Wire 2: The tool to change text
            confidence={confidence}   // Wire 3: The current slider value
            setConfidence={setConfidence} // Wire 4: The tool to move slider
            onSubmit={submitGuess}    // Wire 5: The submit button
          />
        ) :  
        step == 3 || step == 4 ? (
          <ResultsDisplay 
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
}

export default App
