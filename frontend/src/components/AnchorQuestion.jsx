// src/components/AnchorQuestion.jsx

// Notice we are asking for TWO tools now:
// 1. anchorValue (The data: "50m" or "500m")
// 2. onNext (The function to go to the next scene)
export default function AnchorQuestion({ anchorValue, onNext }) {
    
    return (
        <div className="scene-container">
            <h2>The First Guess</h2>
            
            <p>Do you thing the highest tree in the world is higher or lower than {anchorValue}?</p> 
           <button onClick = {onNext}>Lower</button>
           <button onClick = {onNext}>Higher</button>
        
        </div>
    )
}