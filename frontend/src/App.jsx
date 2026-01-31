import { useState } from 'react'

import './App.css'

function App() {
  const [step, setStep] = useState(0) // Scene Tracker
  const [gameData, setGameData] = useState(null) // Backpack

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

  return (
    <div className="App">
      {step === 0 ? (
        <button onClick={startGame}>Start Experiment</button> // if it's not next scene
      ) : ( 
        <div>
           <h2>Scene 1</h2>
           <p>The game has started!</p> 
        </div>
      )} 
    </div>
  )
}

export default App
