// src/WelcomeScreen.jsx

export default function WelcomeScreen({ onStart }) {
    
    return (
        <div className="welcome-container">
            <h1>The Anchoring Effect</h1>
            <p>Welcome to the experiment.</p>
            
            <button onClick={onStart}>Start The Experiment</button>
            
        </div>
    )
}