import { useState } from 'react'

import './App.css'

function App() {
  const [step, setStep] = useState(0) // Scene Tracker
  const [gameData, setGameData] = useState(null) // Backpack
  const [guess, setGuess] = useState('') // guessed value
  const [confidence, setConfidence] = useState(5) // initial confidence
  const [startTime, setStartTime] = useState(0) // start of timer

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

  return (
    <div className="App">
      {step === 0 ? (
        <button onClick={startGame}>Start Experiment</button> // if it's not next scene
      ) : step === 1 ?( 
        <div>
           <h2>The first guess</h2>
           <p>Do you thing the highest tree in the world is higher or lower than {anchorValue}?</p> 
           <button onClick = {handleStartEstimation}>Lower</button>
           <button onClick = {handleStartEstimation}>Higher</button>
        </div>
      ) : step === 2 ? (
        <div>
          <input type="text" value={guess} onChange={(e) => setGuess(e.target.value)} />
          <p>Confidence: {confidence}/10</p>
          <input type="range" value={confidence} min={1} max={10} onChange={(e) => setConfidence(e.target.value)}/>
          <button onClick={submitGuess}>Submit Final Guess</button>
        </div>
      ) :  step === 3 ? (
          <div>
            <h2>Thank You!</h2>
            <p>Your guess has been recorded.</p>
            <button onClick={() => window.location.reload()}>Play Again</button>
          </div>
      ) : null 
    } 
    </div>
  )
}

export default App
